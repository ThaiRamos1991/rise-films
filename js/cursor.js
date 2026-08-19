// ============================================================
// RISE FILMS — Cursor customizado (apenas desktop / ponteiro fino)
// ============================================================
import { isFinePointer, qs, qsa } from './utils.js';

export function initCustomCursor() {
  if (!isFinePointer()) return;

  document.documentElement.classList.add('has-custom-cursor');
  const cursor = qs('[data-cursor]');
  const label = qs('[data-cursor-label]');
  if (!cursor) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let curX = mouseX;
  let curY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function raf() {
    curX += (mouseX - curX) * 0.18;
    curY += (mouseY - curY) * 0.18;
    cursor.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  const setState = (state, text) => {
    if (state) {
      cursor.dataset.state = state;
      if (label) label.textContent = text || '';
    } else {
      delete cursor.dataset.state;
      if (label) label.textContent = '';
    }
  };

  const bindTargets = () => {
    qsa('[data-cursor-target]').forEach((el) => {
      const state = el.getAttribute('data-cursor-target');
      const text = state === 'play' ? 'Play' : state === 'view' ? 'Ver' : '';
      el.addEventListener('mouseenter', () => setState(state, text));
      el.addEventListener('mouseleave', () => setState(null));
    });
  };
  bindTargets();

  // Re-bind if content is added dynamically later.
  window.addEventListener('rise:rebind-cursor', bindTargets);
}
