function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  const root = document.documentElement;
  const saved = localStorage.getItem("portfolio-theme");
  if (saved === "light") root.classList.add("light");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      root.classList.toggle("light");
      localStorage.setItem("portfolio-theme", root.classList.contains("light") ? "light" : "dark");
    });
  }
}
