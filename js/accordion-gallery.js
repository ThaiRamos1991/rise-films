// ============================================================
// RISE FILMS — Accordion Gallery (port do componente React Bits)
// Painéis que expandem no hover (ponteiro fino) e no foco/clique
// (teclado/touch). Toda a animação (flex-grow, grayscale, fade da
// legenda) é feita via transições CSS — sem depender do GSAP, para
// manter o efeito robusto mesmo se algum CDN externo falhar.
// ============================================================
import { qs, qsa, isFinePointer } from './utils.js';

export function initAccordionGallery(selector, options = {}) {
  const root = qs(selector);
  if (!root) return;

  const panels = qsa('[data-ag-panel]', root);
  if (!panels.length) return;

  const defaultIndex = Math.min(Math.max(options.defaultIndex ?? 0, 0), panels.length - 1);
  let active = defaultIndex;

  function setActive(i) {
    active = i;
    panels.forEach((panel, idx) => {
      const isActive = idx === active;
      panel.classList.toggle('ag-panel--active', isActive);
      panel.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  setActive(active);

  const hoverEnabled = isFinePointer();

  panels.forEach((panel, i) => {
    if (hoverEnabled) {
      panel.addEventListener('mouseenter', () => setActive(i));
    }
    panel.addEventListener('focus', () => setActive(i));
    panel.addEventListener('click', () => setActive(i));
    panel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        panels[(i + 1) % panels.length]?.focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        panels[(i - 1 + panels.length) % panels.length]?.focus();
      }
    });
  });
}
