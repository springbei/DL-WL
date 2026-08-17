document.addEventListener("click", event => {
  const switcher = event.target.closest("[data-screen]");
  if (switcher) {
    const root = switcher.closest(".mobile-prototype") || document;
    const screen = switcher.dataset.screen;
    root.querySelectorAll("[data-screen]").forEach(item => item.classList.toggle("active", item === switcher));
    root.querySelectorAll("[data-page]").forEach(page => page.classList.toggle("active", page.dataset.page === screen));
    return;
  }

  const action = event.target.closest("[data-action]");
  if (action) {
    const root = action.closest(".mobile-prototype") || document;
    const target = action.dataset.target;
    if (target) {
      root.querySelectorAll("[data-page]").forEach(page => page.classList.toggle("active", page.dataset.page === target));
      root.querySelectorAll("[data-screen]").forEach(item => item.classList.toggle("active", item.dataset.screen === target));
    }
    const toast = root.querySelector(".toast");
    if (toast) {
      toast.textContent = action.dataset.message || "操作已提交";
      toast.classList.add("show");
      window.clearTimeout(toast._timer);
      toast._timer = window.setTimeout(() => toast.classList.remove("show"), 1800);
    }
  }
});
