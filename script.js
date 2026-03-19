const yearNode = document.querySelector("#year");

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const navLinks = document.querySelectorAll(".nav-links a");

for (const link of navLinks) {
  const href = link.getAttribute("href");
  if (!href || href.startsWith("#")) continue;
  if (href === currentPage) {
    link.setAttribute("aria-current", "page");
  }
}
