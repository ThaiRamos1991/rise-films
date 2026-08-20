// ============================================================
// RISE FILMS — Soluções: navegação lateral sticky sincronizada ao scroll
// ============================================================
import { qs, qsa } from './utils.js';

export function initSolutions() {
  const panels = qsa('[data-solution-panel]');
  const navItems = qsa('[data-solution-nav-item]');
  if (!panels.length || !navItems.length) return;

  const setActive = (i) => {
    navItems.forEach((item, idx) => item.classList.toggle('is-active', idx === i));
  };

  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      const i = Number(item.getAttribute('data-solution-nav-item'));
      panels[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = Number(entry.target.getAttribute('data-solution-panel'));
            setActive(i);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    panels.forEach((panel) => observer.observe(panel));
  }
}
