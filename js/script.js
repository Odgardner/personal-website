(() => {
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  /* Theme toggle: persists explicit choice, otherwise follows system */
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const STORAGE_KEY = "og-theme";

  const applyStoredTheme = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark") {
        root.setAttribute("data-theme", stored);
      }
    } catch (e) { /* storage unavailable — fall back to system theme */ }
  };
  applyStoredTheme();

  toggle.addEventListener("click", () => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const current = root.getAttribute("data-theme") || (prefersDark ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* ignore */ }
  });

  /* Fade sections in as they enter view */
  const sections = document.querySelectorAll(".section");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  sections.forEach((section) => revealObserver.observe(section));

  /* Scrollspy for the top nav */
  const navLinks = document.querySelectorAll(".nav-links a");
  const linkByRef = new Map();
  navLinks.forEach((link) => linkByRef.set(link.getAttribute("href").slice(1), link));

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = linkByRef.get(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  document.querySelectorAll("main .section").forEach((el) => spyObserver.observe(el));
})();
