// ============================================================
// RISE FILMS — Lightbox de vídeo para os Cases
// Abre um modal com o vídeo vertical (9:16, com áudio) ao
// clicar em um case-card. Fecha com ESC, clique no backdrop
// ou no botão de fechar, e pausa o vídeo ao fechar.
// ============================================================
import { qs, qsa } from './utils.js';

export function initCaseLightbox() {
  const lightbox = qs('[data-case-lightbox]');
  const video = qs('[data-case-lightbox-video]', lightbox || undefined);
  const titleEl = qs('[data-case-lightbox-title]', lightbox || undefined);
  const cases = qsa('[data-case]');

  if (!lightbox || !video || cases.length === 0) return;

  let lastFocused = null;

  function open(source, title) {
    lastFocused = document.activeElement;
    video.setAttribute('src', source);
    if (titleEl) titleEl.textContent = title || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    video.currentTime = 0;
    video.play().catch(() => {});
    const closeBtn = qs('[data-case-lightbox-close]', lightbox);
    closeBtn?.focus();
    document.addEventListener('keydown', onKeydown);
  }

  function close() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    video.pause();
    video.removeAttribute('src');
    video.load();
    document.removeEventListener('keydown', onKeydown);
    if (lastFocused instanceof HTMLElement) lastFocused.focus();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') close();
  }

  cases.forEach((card) => {
    card.addEventListener('click', () => {
      const source = card.getAttribute('data-case-video');
      const title = card.getAttribute('data-case-title');
      if (source) open(source, title);
    });
  });

  qsa('[data-case-lightbox-close]', lightbox).forEach((el) => {
    el.addEventListener('click', close);
  });
}
