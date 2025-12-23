(function () {
  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("mobileMenu");
  const year = document.getElementById("y");

  if (year) year.textContent = new Date().getFullYear();

  if (!btn || !menu) return;

  function openMenu() {
    menu.classList.add("open");
    btn.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-hidden", "false");
  }

  function closeMenu() {
    menu.classList.remove("open");
    btn.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
  }

  function toggleMenu() {
    if (menu.classList.contains("open")) closeMenu();
    else openMenu();
  }

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMenu();
  });

  // Close if you click outside
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
})();
