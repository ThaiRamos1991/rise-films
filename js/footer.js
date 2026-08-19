// ============================================================
// RISE FILMS — Footer: copyright dinâmico + Footer Reveal Animation
// ============================================================
import { qs, prefersReducedMotion } from './utils.js';

export function initFooter() {
  const yearEl = qs('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const wrap = qs('[data-footer-wrap]');
  const footer = wrap ? qs('.site-footer', wrap) : null;
  if (!wrap || !footer || prefersReducedMotion()) return;

  // Footer Reveal: o footer nasce "escondido" atrás da última seção e é
  // progressivamente revelado (clip) conforme o usuário chega ao final do scroll.
  wrap.style.overflow = 'hidden';

  const update = () => {
    const rect = wrap.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = Math.min(1, Math.max(0, (vh - rect.top) / rect.height));
    footer.style.transform = `translateY(${(1 - progress) * 12}%)`;
    footer.style.opacity = String(0.4 + progress * 0.6);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}
