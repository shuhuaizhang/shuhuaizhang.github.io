function setupResearchTabs() {
  const page = document.querySelector("[data-research-page]");
  if (!page) return;

  const tablist = page.querySelector('[role="tablist"]');
  const tabs = [...page.querySelectorAll("[data-research-tab]")];
  const panels = [...page.querySelectorAll("[data-research-panel]")];
  const reading = page.querySelector("[data-research-reading]");
  const scrollIndicator = page.querySelector("[data-research-scroll-indicator]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!tablist || !tabs.length || !panels.length) return;

  let activeIndex = tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true");
  if (activeIndex < 0) activeIndex = 0;
  let isSwitching = false;
  let transitionTimer;

  const updateScrollIndicator = () => {
    if (!reading || !scrollIndicator) return;
    const scrollable = reading.scrollHeight > reading.clientHeight + 1;
    const visibleRatio = scrollable ? reading.clientHeight / reading.scrollHeight : 1;
    const travel = 100 - visibleRatio * 100;
    const progress = scrollable ? reading.scrollTop / (reading.scrollHeight - reading.clientHeight) : 0;
    scrollIndicator.style.height = `${visibleRatio * 100}%`;
    scrollIndicator.style.top = `${travel * progress}%`;
    scrollIndicator.parentElement?.classList.toggle("is-visible", scrollable);
  };

  const activate = (tab, { focus = false, resetScroll = true, animate = true } = {}) => {
    if (reduceMotion.matches) animate = false;
    const target = tab.dataset.researchTab;
    const nextIndex = tabs.indexOf(tab);
    if (nextIndex === activeIndex && animate) {
      if (focus) tab.focus();
      return;
    }
    if (isSwitching) return;

    const outgoing = panels[activeIndex];
    const incoming = panels[nextIndex];
    const direction = nextIndex > activeIndex ? "down" : "up";
    page.dataset.researchDirection = direction;

    for (const item of tabs) {
      const selected = item === tab;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
    }

    if (resetScroll && reading) reading.scrollTop = 0;

    if (!animate) {
      activeIndex = nextIndex;
      for (const panel of panels) {
        const selected = panel.dataset.researchPanel === target;
        panel.classList.toggle("is-active", selected);
        panel.hidden = !selected;
        panel.setAttribute("aria-hidden", String(!selected));
      }
      window.requestAnimationFrame(updateScrollIndicator);
      if (focus) tab.focus();
      return;
    }

    isSwitching = true;
    incoming.hidden = false;
    incoming.setAttribute("aria-hidden", "false");
    outgoing.setAttribute("aria-hidden", "true");
    incoming.classList.add("is-entering");
    outgoing.classList.add("is-leaving");
    void incoming.offsetWidth;
    page.classList.add("is-research-switching");

    window.clearTimeout(transitionTimer);
    transitionTimer = window.setTimeout(() => {
      outgoing.hidden = true;
      outgoing.classList.remove("is-active", "is-leaving");
      incoming.classList.remove("is-entering");
      incoming.classList.add("is-active");
      page.classList.remove("is-research-switching");
      activeIndex = nextIndex;
      isSwitching = false;
      updateScrollIndicator();
    }, 320);

    if (focus) tab.focus();
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activate(tab));
  });

  tablist.addEventListener("keydown", (event) => {
    const current = tabs.indexOf(document.activeElement);
    if (current === -1) return;

    let next = current;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (current + 1) % tabs.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next === current && !["Home", "End"].includes(event.key)) return;

    event.preventDefault();
    activate(tabs[next], { focus: true });
  });

  const initial = tabs.find((tab) => tab.getAttribute("aria-selected") === "true") || tabs[0];
  activate(initial, { resetScroll: false, animate: false });
  reading?.addEventListener("scroll", updateScrollIndicator, { passive: true });
  window.addEventListener("resize", updateScrollIndicator, { passive: true });
  window.addEventListener("load", updateScrollIndicator, { once: true });
}

function setupPerformanceCarousel() {
  const carousel = document.querySelector("[data-performance-carousel]");
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll("[data-performance-slide]")];
  const previous = carousel.querySelector("[data-carousel-previous]");
  const next = carousel.querySelector("[data-carousel-next]");
  const current = carousel.querySelector("[data-carousel-current]");
  const viewport = carousel.querySelector("[data-carousel-viewport]");

  if (!slides.length || !previous || !next || !current) return;

  let activeIndex = 0;
  let isAnimating = false;
  let transitionTimer;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const loadFrame = (slide) => {
    const frame = slide.querySelector("iframe[data-src]");
    if (frame && !frame.hasAttribute("src")) frame.src = frame.dataset.src;
  };

  const unloadFrame = (slide) => {
    const frame = slide.querySelector("iframe[data-src]");
    if (frame?.hasAttribute("src")) frame.removeAttribute("src");
  };

  const show = (index, { animate = true } = {}) => {
    if (reduceMotion.matches) animate = false;
    const nextIndex = (index + slides.length) % slides.length;
    if (nextIndex === activeIndex && animate) return;
    if (isAnimating) return;
    const outgoing = slides[activeIndex];
    const incoming = slides[nextIndex];
    const direction = index > activeIndex || (activeIndex === slides.length - 1 && nextIndex === 0) ? "next" : "previous";

    if (!animate) {
      activeIndex = nextIndex;
      slides.forEach((slide, slideIndex) => {
        const selected = slideIndex === activeIndex;
        slide.classList.toggle("is-active", selected);
        slide.hidden = !selected;
        slide.setAttribute("aria-hidden", String(!selected));
        if (selected) loadFrame(slide);
        else unloadFrame(slide);
      });
      current.textContent = String(activeIndex + 1).padStart(2, "0");
      return;
    }

    isAnimating = true;
    carousel.dataset.carouselDirection = direction;
    incoming.hidden = false;
    incoming.setAttribute("aria-hidden", "false");
    incoming.classList.add("is-entering");
    outgoing.classList.add("is-leaving");
    loadFrame(incoming);
    void incoming.offsetWidth;
    carousel.classList.add("is-sliding");

    window.clearTimeout(transitionTimer);
    transitionTimer = window.setTimeout(() => {
      outgoing.hidden = true;
      outgoing.setAttribute("aria-hidden", "true");
      outgoing.classList.remove("is-active", "is-leaving");
      incoming.classList.remove("is-entering");
      incoming.classList.add("is-active");
      unloadFrame(outgoing);
      carousel.classList.remove("is-sliding");
      if (viewport) viewport.style.removeProperty("height");
      activeIndex = nextIndex;
      isAnimating = false;
      current.textContent = String(activeIndex + 1).padStart(2, "0");
      if (viewport) viewport.scrollTop = 0;
    }, 380);
  };

  previous.addEventListener("click", () => show(activeIndex - 1));
  next.addEventListener("click", () => show(activeIndex + 1));

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      show(activeIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      show(activeIndex + 1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      show(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      show(slides.length - 1);
    }
  });

  let touchStartX = 0;
  let touchStartY = 0;

  carousel.addEventListener("touchstart", (event) => {
    const touch = event.changedTouches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }, { passive: true });

  carousel.addEventListener("touchend", (event) => {
    const touch = event.changedTouches[0];
    const distanceX = touch.clientX - touchStartX;
    const distanceY = touch.clientY - touchStartY;

    if (Math.abs(distanceX) < 52 || Math.abs(distanceX) <= Math.abs(distanceY)) return;
    show(activeIndex + (distanceX < 0 ? 1 : -1));
  }, { passive: true });

  show(0, { animate: false });
}

setupResearchTabs();
setupPerformanceCarousel();
