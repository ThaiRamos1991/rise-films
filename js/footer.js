// ============================================================
// RISE FILMS — Footer: copyright dinâmico
// ============================================================
import { qs } from './utils.js';

export function initFooter() {
  const yearEl = qs('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}
