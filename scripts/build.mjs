import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(projectRoot, "dist");

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

function parseProfile(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error("profile.md needs a front-matter block.");

  const meta = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    meta[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  }

  const paragraphs = match[2]
    .trim()
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " "))
    .filter(Boolean);

  return { meta, paragraphs };
}

function parseEntries(markdown) {
  const groups = [];
  let group;
  let entry;

  for (const rawLine of markdown.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith("# ")) {
      group = { title: line.slice(2).trim(), entries: [] };
      groups.push(group);
      entry = undefined;
      continue;
    }

    if (line.startsWith("## ")) {
      if (!group) throw new Error("An entry appeared before its group heading.");
      entry = { title: line.slice(3).trim(), links: {} };
      group.entries.push(entry);
      continue;
    }

    if (!entry) continue;
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    if (key.startsWith("link.")) entry.links[key.slice(5)] = value;
    else entry[key] = value;
  }

  return groups;
}

function nav(base, active, variant = "academic") {
  const links = [
    ["about", "About", `${base}`],
    ["research", "Research", `${base}research/`],
    ["music", "Another Me", `${base}another-me/`],
  ];

  return `
    <header class="site-header site-header--${variant}">
      <a class="skip-link" href="#main">Skip to content</a>
      <div class="header-inner">
        <a class="wordmark" href="${base}" aria-label="Shuhuai Zhang, home">
          <span class="wordmark-mark">SZ</span>
          <span class="wordmark-name">Shuhuai Zhang</span>
        </a>
        <nav class="site-nav" aria-label="Primary navigation">
          ${links.map(([id, label, href]) => `<a${id === active ? ' aria-current="page"' : ""} href="${href}">${label}</a>`).join("")}
        </nav>
      </div>
    </header>`;
}

function footer(base, variant = "academic") {
  return `
    <footer class="site-footer site-footer--${variant}">
      <div class="footer-inner">
        <p>© 2026 Shuhuai Zhang</p>
      </div>
    </footer>`;
}

function layout({ title, description, body, base = "./", active, variant = "academic", bodyClass = "" }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="theme-color" content="${variant === "music" ? "#eee5da" : "#f3f1ea"}">
    <title>${escapeHtml(title)}</title>
    <link rel="stylesheet" href="${base}assets/styles.css">
  </head>
  <body class="page page--${variant} ${bodyClass}">
    ${nav(base, active, variant)}
    ${body}
    ${footer(base, variant)}
  </body>
</html>`;
}

function researchLinks(links = {}) {
  const entries = Object.entries(links);
  if (!entries.length) return "";
  return `<div class="paper-links">${entries.map(([label, url]) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(label)} <span aria-hidden="true">↗</span></a>`).join("")}</div>`;
}

function homePage(profile) {
  const meta = profile.meta;

  const body = `
    <main id="main">
      <section class="home-hero shell" aria-labelledby="home-title">
        <h1 id="home-title">${escapeHtml(meta.name)}</h1>
        <p class="email">${escapeHtml(meta.email)}</p>
      </section>

      <section class="home-about" aria-label="Biography">
        <div class="home-about-inner shell">
          <div class="about-copy">
            ${profile.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
          </div>
        </div>
      </section>
    </main>`;

  return layout({
    title: `${meta.name} · Economist`,
    description: `${meta.name}, Assistant Professor of Economics at Central University of Finance and Economics.`,
    body,
    active: "about",
    bodyClass: "page--home",
  });
}

function researchPage(profile, groups) {
  const body = `
    <main id="main">
      <section class="page-intro shell">
        <h1>Research</h1>
      </section>
      <div class="research-archive shell">
        ${groups.map((group) => `
          <section class="research-group" aria-labelledby="${group.title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}">
            <div class="research-group-heading">
              <h2 id="${group.title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}">${escapeHtml(group.title)}</h2>
            </div>
            <ol class="paper-list">
              ${group.entries.map((paper) => `
                <li class="paper-item">
                  <div class="paper-main">
                    <h3>${escapeHtml(paper.title)}</h3>
                    <p>${escapeHtml(paper.authors)}</p>
                    ${paper.venue ? `<p class="paper-venue"><em>${escapeHtml(paper.venue)}</em>${paper.year ? `, ${escapeHtml(paper.year)}` : ""}${paper.citation ? `, ${escapeHtml(paper.citation)}` : ""}</p>` : ""}
                    ${paper.status ? `<p class="paper-venue"><em>${escapeHtml(paper.status)}</em></p>` : ""}
                  </div>
                  <div class="paper-side">
                    ${researchLinks(paper.links)}
                  </div>
                </li>`).join("")}
            </ol>
          </section>`).join("")}
      </div>
    </main>`;

  return layout({
    title: `Research · ${profile.meta.name}`,
    description: `Publications and working papers by ${profile.meta.name}.`,
    body,
    base: "../",
    active: "research",
    bodyClass: "page--research",
  });
}

function performanceFrame(performance) {
  return `<div class="video-frame">
    <iframe
      src="${escapeHtml(performance.embed)}"
      title="Performance video: ${escapeHtml(performance.title)}"
      loading="lazy"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowfullscreen
      referrerpolicy="strict-origin-when-cross-origin"></iframe>
  </div>`;
}

function musicPage(profile, performances) {
  const entries = performances[0]?.entries || [];
  const meta = profile.meta;
  const body = `
    <main id="main">
      <section class="music-hero shell" aria-labelledby="music-title">
        <div class="music-title-grid">
          <div>
            <h1 id="music-title">Another Me</h1>
          </div>
          <div class="music-intro">
            <p>I am a violinist. I was at the ${escapeHtml(meta.orchestra)} from ${escapeHtml(meta.orchestra_years)}, serving as orchestra chair during 2017–2018.</p>
            <p>Here are recordings of some of my previous performances.</p>
          </div>
        </div>
      </section>

      <section class="performance-archive shell" aria-label="Performance recordings">
        <ol class="performance-list">
          ${entries.map((performance) => `
            <li class="performance-item">
              <div class="performance-media">
                ${performanceFrame(performance)}
              </div>
              <div class="performance-copy">
                <p class="performance-year">${escapeHtml(performance.year)}</p>
                <h3>${escapeHtml(performance.title)}</h3>
                ${performance.detail ? `<p class="performance-detail">${escapeHtml(performance.detail)}</p>` : ""}
                <p class="performance-credit">${escapeHtml(performance.credit)}</p>
              </div>
            </li>`).join("")}
        </ol>
      </section>
    </main>`;

  return layout({
    title: `Another Me · ${meta.name}`,
    description: `Selected violin performances by ${meta.name}.`,
    body,
    base: "../",
    active: "music",
    variant: "music",
  });
}

function notFoundPage(profile) {
  const body = `
    <main id="main" class="not-found shell">
      <p class="eyebrow">404</p>
      <h1>That page is off the score.</h1>
      <p>The page may have moved, or the link may be incomplete.</p>
      <a class="text-link" href="./">Return home <span aria-hidden="true">↗</span></a>
    </main>`;
  return layout({ title: `Page not found · ${profile.meta.name}`, description: "Page not found.", body, active: "" });
}

await rm(distDir, { recursive: true, force: true });
await mkdir(path.join(distDir, "assets"), { recursive: true });
await mkdir(path.join(distDir, "research"), { recursive: true });
await mkdir(path.join(distDir, "another-me"), { recursive: true });

const [profileSource, researchSource, performanceSource] = await Promise.all([
  readFile(path.join(projectRoot, "content/profile.md"), "utf8"),
  readFile(path.join(projectRoot, "content/research.md"), "utf8"),
  readFile(path.join(projectRoot, "content/performances.md"), "utf8"),
]);

const profile = parseProfile(profileSource);
const research = parseEntries(researchSource);
const performances = parseEntries(performanceSource);

await Promise.all([
  writeFile(path.join(distDir, "index.html"), homePage(profile, research)),
  writeFile(path.join(distDir, "research/index.html"), researchPage(profile, research)),
  writeFile(path.join(distDir, "another-me/index.html"), musicPage(profile, performances)),
  writeFile(path.join(distDir, "404.html"), notFoundPage(profile)),
  writeFile(path.join(distDir, ".nojekyll"), ""),
  writeFile(path.join(distDir, "robots.txt"), "User-agent: *\nAllow: /\n"),
  cp(path.join(projectRoot, "src/assets/styles.css"), path.join(distDir, "assets/styles.css")),
]);

console.log(`Built ${research.flatMap((group) => group.entries).length} research entries and ${performances[0]?.entries.length || 0} performances.`);
