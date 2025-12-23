(function () {
  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("mobileMenu");
  const year = document.getElementById("y");

  // Footer year
  if (year) year.textContent = new Date().getFullYear();

  if (!btn || !menu) return;

  function openMenu() {
    menu.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-hidden", "false");
  }

  function closeMenu() {
    menu.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
  }

  btn.addEventListener("click", () => {
    const isOpen = menu.classList.contains("open");
    isOpen ? closeMenu() : openMenu();
  });

  // Close when clicking a link
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) closeMenu();
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("open")) return;
    if (menu.contains(e.target) || btn.contains(e.target)) return;
    closeMenu();
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();

