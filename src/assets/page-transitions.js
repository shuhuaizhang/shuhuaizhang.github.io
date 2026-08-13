(function setupDirectionalPageTransitions() {
  const transitionKey = "shuhuai-page-transition";
  const pageOrder = new Map([
    ["about", 0],
    ["research", 1],
    ["music", 2],
  ]);

  const pageIdFromPath = (pathname) => {
    const normalized = pathname.replace(/\/+$/, "") || "/";
    if (normalized.endsWith("/research")) return "research";
    if (normalized.endsWith("/another-me")) return "music";
    return "about";
  };

  const transitionType = (fromUrl, toUrl) => {
    if (!fromUrl || !toUrl) return "reload";
    const from = pageOrder.get(pageIdFromPath(new URL(fromUrl).pathname));
    const to = pageOrder.get(pageIdFromPath(new URL(toUrl).pathname));
    if (from === to) return "reload";
    return from < to ? "forwards" : "backwards";
  };

  const applyType = (event, fromUrl, toUrl) => {
    if (!event.viewTransition?.types) return;
    event.viewTransition.types.add(transitionType(fromUrl, toUrl));
  };

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || link.target || link.origin !== window.location.origin) return;
    sessionStorage.setItem(transitionKey, JSON.stringify({
      from: window.location.href,
      to: link.href,
    }));
  });

  window.addEventListener("pageswap", (event) => {
    const fromUrl = event.activation?.from?.url || window.location.href;
    const toUrl = event.activation?.entry?.url;
    if (toUrl) {
      sessionStorage.setItem(transitionKey, JSON.stringify({ from: fromUrl, to: toUrl }));
    }
    applyType(event, fromUrl, toUrl);
  });

  window.addEventListener("pagereveal", (event) => {
    const activation = globalThis.navigation?.activation;
    let fromUrl = activation?.from?.url;
    let toUrl = activation?.entry?.url || window.location.href;

    if (!fromUrl) {
      try {
        const stored = JSON.parse(sessionStorage.getItem(transitionKey));
        if (stored?.to === window.location.href) {
          fromUrl = stored.from;
          toUrl = stored.to;
        }
      } catch {
        // A missing or malformed hint simply falls back to no spatial transition.
      }
    }

    applyType(event, fromUrl, toUrl);
    sessionStorage.removeItem(transitionKey);
  });
})();
