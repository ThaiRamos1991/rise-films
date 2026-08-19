// ============================================================
// RISE FILMS — Preloader "RISE 00 -> 100" com mask reveal
// ============================================================
import { qs, prefersReducedMotion } from './utils.js';

export function initPreloader() {
  return new Promise((resolve) => {
    const preloader = qs('[data-preloader]');
    const countEl = qs('[data-preloader-count]');
    const barEl = qs('[data-preloader-bar]');

    if (!preloader) return resolve();

    if (prefersReducedMotion()) {
      preloader.classList.add('preloader--hidden');
      setTimeout(() => {
        preloader.remove();
        resolve();
      }, 50);
      return;
    }

    let progress = 0;
    const duration = 1400; // ms
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      progress = Math.min(100, Math.round((elapsed / duration) * 100));
      if (countEl) countEl.textContent = String(progress).padStart(2, '0');
      if (barEl) barEl.style.width = progress + '%';

      if (progress < 100) {
        requestAnimationFrame(tick);
      } else {
        preloader.classList.add('preloader--hidden');
        window.setTimeout(() => {
          preloader.remove();
          resolve();
        }, 950);
      }
    }
    requestAnimationFrame(tick);
  });
}
