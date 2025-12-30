(function () {
  // Run after DOM is ready (works with or without "defer")
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(() => {
    const btn = document.getElementById("menuBtn");
    const menu = document.getElementById("mobileMenu");
    const backdrop = document.getElementById("mobileBackdrop");
    const year = document.getElementById("y");

    // Footer year
    if (year) year.textContent = new Date().getFullYear();

    if (!btn || !menu) {
      // Helpful for debugging if something is missing
      console.warn("IronByte menu: missing #menuBtn or #mobileMenu", { btn, menu });
      return;
    }

    function showBackdrop() {
      if (!backdrop) return;
      backdrop.hidden = false;
      document.body.style.overflow = "hidden"; // prevent background scroll when menu open
    }

    function hideBackdrop() {
      if (!backdrop) return;
      backdrop.hidden = true;
      document.body.style.overflow = ""; // restore scroll
    }

    function openMenu() {
      menu.classList.add("open");
      btn.classList.add("is-open");

      btn.setAttribute("aria-expanded", "true");
      menu.setAttribute("aria-hidden", "false");

      showBackdrop();
    }

    function closeMenu() {
      menu.classList.remove("open");
      btn.classList.remove("is-open");

      btn.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-hidden", "true");

      hideBackdrop();
    }

    function toggleMenu() {
      if (menu.classList.contains("open")) closeMenu();
      else openMenu();
    }

    // Main toggle
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu();
    });

    // Backdrop click closes (best UX on mobile)
    if (backdrop) {
      backdrop.addEventListener("click", () => closeMenu());
    }

    // Close if you click outside (desktop / fallback)
    document.addEventListener("click", (e) => {
      const clickedInside = menu.contains(e.target) || btn.contains(e.target);
      if (!clickedInside) closeMenu();
    });

    // Close when a link inside the menu is clicked
    menu.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) closeMenu();
    });

    // Close on ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    // Safety: if window is resized to desktop, close the mobile menu
    window.addEventListener("resize", () => {
      if (window.innerWidth > 920) closeMenu();
    });
  });
})();
