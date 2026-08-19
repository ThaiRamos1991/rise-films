// ============================================================
// RISE FILMS — Marquee de clientes: duplica os itens para loop contínuo
// ============================================================
import { qs } from './utils.js';

export function initMarquee() {
  const track = qs('[data-marquee-track]');
  if (!track) return;

  const items = Array.from(track.children);
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
}
