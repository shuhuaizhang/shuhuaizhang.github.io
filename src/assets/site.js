function setupResearchTabs() {
  const page = document.querySelector("[data-research-page]");
  if (!page) return;

  const tablist = page.querySelector('[role="tablist"]');
  const tabs = [...page.querySelectorAll("[data-research-tab]")];
  const panels = [...page.querySelectorAll("[data-research-panel]")];
  const reading = page.querySelector("[data-research-reading]");

  if (!tablist || !tabs.length || !panels.length) return;

  const activate = (tab, { focus = false, resetScroll = true } = {}) => {
    const target = tab.dataset.researchTab;

    for (const item of tabs) {
      const selected = item === tab;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
    }

    for (const panel of panels) {
      const selected = panel.dataset.researchPanel === target;
      panel.classList.toggle("is-active", selected);
      panel.hidden = !selected;
    }

    if (resetScroll && reading) reading.scrollTop = 0;
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
  activate(initial, { resetScroll: false });
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

  const loadFrame = (slide) => {
    const frame = slide.querySelector("iframe[data-src]");
    if (frame && !frame.hasAttribute("src")) frame.src = frame.dataset.src;
  };

  const unloadFrame = (slide) => {
    const frame = slide.querySelector("iframe[data-src]");
    if (frame?.hasAttribute("src")) frame.removeAttribute("src");
  };

  const show = (index) => {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const selected = slideIndex === activeIndex;
      slide.classList.toggle("is-active", selected);
      slide.hidden = !selected;
      slide.setAttribute("aria-hidden", String(!selected));
      if (selected) loadFrame(slide);
      else unloadFrame(slide);
    });

    current.textContent = String(activeIndex + 1).padStart(2, "0");
    if (viewport) viewport.scrollTop = 0;
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

  show(0);
}

setupResearchTabs();
setupPerformanceCarousel();
