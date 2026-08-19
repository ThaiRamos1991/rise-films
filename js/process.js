// ============================================================
// RISE FILMS — Processo: linha de progresso acompanhando o scroll da seção
// ============================================================
import { qs, clamp } from './utils.js';

export function initProcess() {
  const section = document.getElementById('processo');
  const fill = qs('[data-process-fill]');
  if (!section || !fill) return;

  const update = () => {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height + vh;
    const traveled = vh - rect.top;
    const pct = clamp(0, traveled / total, 1);
    fill.style.width = `${pct * 100}%`;
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}
