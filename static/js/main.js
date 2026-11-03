// Comparison sliders: the handle follows the pointer while it is pressed (or the mouse while hovering)
document.querySelectorAll(".compare").forEach((el) => {
  const set = (clientX) => {
    const r = el.getBoundingClientRect();
    const pos = Math.min(Math.max((clientX - r.left) / r.width, 0), 1);
    el.style.setProperty("--pos", `${pos * 100}%`);
  };
  el.addEventListener("pointermove", (e) => {
    if (e.pointerType === "mouse" || e.buttons) set(e.clientX);
  });
  el.addEventListener("pointerdown", (e) => set(e.clientX));
});

// Videos play only while visible
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.play().catch(() => {});
    else entry.target.pause();
  });
}, { threshold: 0.3 });
document.querySelectorAll("video[data-autoplay]").forEach((v) => observer.observe(v));

function copyBibTeX() {
  const text = document.getElementById("bibtex-code").textContent;
  const label = document.querySelector(".copy-bibtex-btn .copy-text");
  navigator.clipboard.writeText(text).then(() => {
    label.textContent = "Copied";
    setTimeout(() => { label.textContent = "Copy"; }, 2000);
  });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("scroll", () => {
  document.querySelector(".scroll-to-top").classList.toggle("visible", window.pageYOffset > 300);
});
