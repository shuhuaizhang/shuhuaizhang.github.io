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
          Shuhuai Zhang
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

function layout({ title, description, body, base = "./", active, variant = "academic", bodyClass = "", themeColor, heroImage, showFooter = true }) {
  const resolvedThemeColor = themeColor ?? (variant === "music" ? "#24181f" : "#4f626b");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="theme-color" content="${resolvedThemeColor}">
    <title>${escapeHtml(title)}</title>
    <link rel="preload" href="${base}assets/fonts/archivo-latin.woff2" as="font" type="font/woff2" crossorigin>
    ${variant === "music" ? `<link rel="preload" href="${base}assets/fonts/alegreya-latin.woff2" as="font" type="font/woff2" crossorigin>` : ""}
    ${heroImage ? `<link rel="preload" href="${base}${heroImage}" as="image" fetchpriority="high">` : ""}
    <script>document.documentElement.classList.add("js")</script>
    <script src="${base}assets/page-transitions.js"></script>
    <link rel="stylesheet" href="${base}assets/styles.css">
    <script src="${base}assets/site.js" defer></script>
  </head>
  <body class="page page--${variant} ${bodyClass}"><!--
    THESIS: Two genuine registers share one precise line; this refuses the boxed portfolio hero and permanent side rail.
    OWN-WORLD: Low-saturation slate blue and mineral blue structure academic pages; a painterly portrait enters only on About; aubergine, ivory, and apricot carry music. Full-width fields, square media, and ruled rows form the language.
    STORY: Visitors identify Shuhuai Zhang, read his biography and research, then may enter a warmer musical register without leaving the same identity.
    FIRST VIEWPORT: Transparent horizontal navigation stays inside the quiet left extension of each full-height canvas. About, Research, and Another Me form a left-to-right sequence; Research pairs its two-node selector with a mineral reading mist, while Another Me pairs its introduction with one horizontally sliding performance at a time.
    FORM: User-pinned Two Registers, One Line; grounded direction; seed c3c10a7f.
    FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
  -->
    ${nav(base, active, variant)}
    ${body}
    ${showFooter ? footer(base, variant) : ""}
  </body>
</html>`;
}

function externalArrow() {
  return `<svg class="external-arrow" aria-hidden="true" viewBox="0 0 12 12" focusable="false">
    <path d="M3 9 9 3M4 3h5v5" />
  </svg>`;
}

function researchLinks(links = {}) {
  const entries = Object.entries(links);
  if (!entries.length) return "";
  return `<div class="paper-links">${entries.map(([label, url]) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(label)} ${externalArrow()}</a>`).join("")}</div>`;
}

function homePage(profile) {
  const meta = profile.meta;

  const body = `
    <main id="main">
      <section class="home-hero page-canvas" aria-labelledby="home-title">
        <div class="home-hero-inner shell">
          <div class="home-copy">
            <h1 id="home-title"><span>Shuhuai</span><span>Zhang</span></h1>
            <div class="home-profile" aria-label="Biography">
              ${profile.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
              <p class="email">${escapeHtml(meta.email)}</p>
            </div>
          </div>
        </div>
      </section>
    </main>`;

  return layout({
    title: meta.name,
    description: `${meta.name}, Assistant Professor of Economics at Central University of Finance and Economics.`,
    body,
    active: "about",
    bodyClass: "page--home",
    themeColor: "#5d7078",
    heroImage: "assets/hero-portrait-wide.jpg",
    showFooter: false,
  });
}

function researchPage(profile, groups) {
  const groupId = (title) => title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replaceAll(/^-|-$/g, "");
  const body = `
    <main id="main" class="research-canvas page-canvas" data-research-page>
      <div class="research-canvas-inner shell">
        <section class="research-rail" aria-labelledby="research-title">
          <h1 id="research-title">Research</h1>
          <div class="research-tabs" role="tablist" aria-label="Research categories">
            ${groups.map((group, index) => {
              const id = groupId(group.title);
              return `<button class="research-tab${index === 0 ? " is-active" : ""}" id="research-tab-${id}" type="button" role="tab" aria-selected="${index === 0 ? "true" : "false"}" aria-controls="research-panel-${id}" tabindex="${index === 0 ? "0" : "-1"}" data-research-tab="${id}">
                <span class="research-tab-node" aria-hidden="true"></span>
                <span>${escapeHtml(group.title)}</span>
              </button>`;
            }).join("")}
          </div>
        </section>

        <div class="research-reading-frame">
          <div class="research-reading" data-research-reading>
            ${groups.map((group, index) => {
              const id = groupId(group.title);
              return `<section class="research-panel${index === 0 ? " is-active" : ""}" id="research-panel-${id}" role="tabpanel" aria-labelledby="research-tab-${id}" data-research-panel="${id}">
                <header class="research-panel-heading">
                  <h2>${escapeHtml(group.title)}</h2>
                </header>
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
              </section>`;
            }).join("")}
          </div>
          <span class="research-scroll-track" data-research-scroll-track aria-hidden="true">
            <span data-research-scroll-indicator></span>
          </span>
        </div>
      </div>
    </main>`;

  return layout({
    title: `Research · ${profile.meta.name}`,
    description: `Publications and working papers by ${profile.meta.name}.`,
    body,
    base: "../",
    active: "research",
    variant: "research",
    themeColor: "#687b83",
    heroImage: "assets/research-background.jpg",
    showFooter: false,
  });
}

function performanceFrame(performance) {
  return `<div class="video-frame">
    <iframe
      data-src="${escapeHtml(performance.embed)}"
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
    <main id="main" class="music-canvas page-canvas">
      <div class="music-canvas-inner shell">
        <section class="music-rail" aria-labelledby="music-title">
          <h1 id="music-title"><span>Another</span><span>Me</span></h1>
          <div class="music-intro">
            <p>I am a violinist. I was at the ${escapeHtml(meta.orchestra)} from ${escapeHtml(meta.orchestra_years)}, serving as orchestra chair during 2017–2018.</p>
            <p>Here are recordings of some of my previous performances.</p>
          </div>
        </section>

        <section class="performance-carousel" aria-label="Performance recordings" aria-roledescription="carousel" tabindex="0" data-performance-carousel>
          <div class="carousel-viewport" data-carousel-viewport>
            <ol class="performance-slides">
              ${entries.map((performance, index) => `
                <li class="performance-slide${index === 0 ? " is-active" : ""}" aria-label="${index + 1} of ${entries.length}" aria-roledescription="slide" data-performance-slide>
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
          </div>

          <div class="carousel-controls">
            <button class="carousel-button" type="button" aria-label="Previous performance" data-carousel-previous>
              <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false"><path d="m14.5 5-7 7 7 7" /></svg>
            </button>
            <p class="carousel-status" aria-live="polite" aria-atomic="true">
              <span data-carousel-current>01</span><span aria-hidden="true"> / </span><span>${String(entries.length).padStart(2, "0")}</span>
            </p>
            <button class="carousel-button" type="button" aria-label="Next performance" data-carousel-next>
              <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false"><path d="m9.5 5 7 7-7 7" /></svg>
            </button>
          </div>
        </section>
      </div>
    </main>`;

  return layout({
    title: `Another Me · ${meta.name}`,
    description: `Selected violin performances by ${meta.name}.`,
    body,
    base: "../",
    active: "music",
    variant: "music",
    themeColor: "#1d1826",
    heroImage: "assets/another-me-background.jpg",
    showFooter: false,
  });
}

function notFoundPage(profile) {
  const body = `
    <main id="main" class="not-found shell">
      <p class="eyebrow">404</p>
      <h1>That page is off the score.</h1>
      <p>The page may have moved, or the link may be incomplete.</p>
      <a class="text-link" href="./">Return home ${externalArrow()}</a>
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
  cp(path.join(projectRoot, "src/assets"), path.join(distDir, "assets"), { recursive: true }),
]);

console.log(`Built ${research.flatMap((group) => group.entries).length} research entries and ${performances[0]?.entries.length || 0} performances.`);
