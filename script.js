/* === LanternFox Games === */

// Year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Nav active state
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link, .legal-nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href && !href.startsWith('#') && href === currentPage) {
    link.setAttribute('aria-current', 'page');
  }
});

// Header scroll state (home page only)
const siteHeader = document.getElementById('site-header');
if (siteHeader) {
  const handleScroll = () => siteHeader.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  // Apply stagger delays to sibling reveal elements
  const parents = new Set(Array.from(revealEls).map(el => el.parentElement));
  parents.forEach(parent => {
    const siblings = Array.from(parent.querySelectorAll(':scope > .reveal'));
    siblings.forEach((el, i) => {
      if (i > 0) el.style.transitionDelay = `${i * 0.12}s`;
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

// Periodic tile pop animation on the board
const boardTiles = document.querySelectorAll('.board-grid .tile:not(.t-empty)');
if (boardTiles.length) {
  const popTile = () => {
    const tile = boardTiles[Math.floor(Math.random() * boardTiles.length)];
    const originalTransform = tile.style.transform;
    tile.style.transition = 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s ease';
    tile.style.transform = 'scale(1.18) translateY(-2px)';
    tile.style.boxShadow = '0 0 24px rgba(232, 165, 52, 0.25)';
    setTimeout(() => {
      tile.style.transform = originalTransform;
      tile.style.boxShadow = '';
    }, 250);
  };

  // Stagger the initial pops
  setTimeout(popTile, 1500);
  setInterval(popTile, 2200);
}
