// ============================================================
// RISE FILMS — Spotlight Card (port do componente React Bits "SpotlightCard")
// Efeito puramente CSS (radial-gradient seguindo o mouse); este módulo só
// atualiza as custom properties --mouse-x / --mouse-y a cada movimento.
// ============================================================
import { qsa, isFinePointer } from './utils.js';

export function initSpotlightCards(selector, options = {}) {
  const cards = qsa(selector);
  if (!cards.length) return;

  const spotlightColor = options.spotlightColor || 'rgba(101, 244, 97, 0.16)';

  cards.forEach((card) => {
    card.style.setProperty('--spotlight-color', spotlightColor);

    // Sem ponteiro fino (touch), o hover não existe — não há necessidade de
    // rastrear o mouse; o CSS simplesmente não ativa o brilho.
    if (!isFinePointer()) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
  });
}
