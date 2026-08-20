// ============================================================
// RISE FILMS — Hero cinematográfico (3 mensagens, transição automática)
// ============================================================
import { qs, qsa, prefersReducedMotion } from './utils.js';
import { initMagicRings } from './magic-rings.js';

const slidesContent = [
  {
    headline: ['Luz,', 'câmera e emoção.'],
    supporting: 'Rompemos limites,\ndespertamos emoções.',
    href: '#solucoes',
  },
  {
    headline: ['Do início ao fim,', 'do play ao like'],
    supporting: '',
    href: '#processo',
  },
  {
    headline: ['Histórias que', 'atravessam fronteiras.'],
    supporting: 'Ideias ganham forma.\nMarcas ganham movimento.',
    href: '#cases',
  },
];

export function initHero() {
  const hero = qs('[data-hero]');
  if (!hero) return;

  const slides = qsa('[data-hero-slide]', hero);
  const headlineEl = qs('[data-hero-headline]', hero);
  const supportingEl = qs('[data-hero-supporting]', hero);
  const ctaEl = qs('[data-hero-cta]', hero);
  const currentEl = qs('[data-hero-current]', hero);
  const progressEl = qs('[data-hero-progress]', hero);

  let index = 0;
  const total = slidesContent.length;
  const interval = 6500;
  let timer = null;

  function renderText(i) {
    const data = slidesContent[i];
    if (headlineEl) {
      headlineEl.innerHTML = `<span>${data.headline[0]}</span><span><em>${data.headline[1]}</em></span>`;
    }
    if (supportingEl) supportingEl.textContent = data.supporting;
    if (ctaEl) ctaEl.setAttribute('href', data.href);
    if (currentEl) currentEl.textContent = String(i + 1).padStart(2, '0');
  }

  function goTo(i) {
    slides.forEach((s, idx) => {
      s.classList.toggle('is-active', idx === i);
      const video = s.querySelector('video');
      if (video) {
        if (idx === i) {
          video.play?.().catch(() => {});
        } else {
          video.pause?.();
        }
      }
    });
    renderText(i);
    index = i;
  }

  function next() {
    goTo((index + 1) % total);
  }

  function startAutoplay() {
    if (prefersReducedMotion()) return;
    clearInterval(timer);
    timer = window.setInterval(next, interval);
  }

  goTo(0);
  startAutoplay();

  // Fundo animado (anéis de luz) — decorativo, some sozinho se o WebGL falhar.
  const ringsMount = qs('[data-hero-rings]', hero);
  if (ringsMount) {
    initMagicRings(ringsMount, {
      color: '#65F461',
      colorTwo: '#ffffff',
      speed: 0.8,
      ringCount: 5,
      opacity: 0.85,
    });
  }

  // Pause autoplay while tab hidden, resume on visibility.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(timer);
    } else {
      startAutoplay();
    }
  });

  // Progress bar animation synced to interval (purely decorative).
  if (progressEl && !prefersReducedMotion()) {
    let raf;
    let start = performance.now();
    const step = (now) => {
      const elapsed = (now - start) % interval;
      progressEl.style.width = `${(elapsed / interval) * 100}%`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    hero.addEventListener('rise:hero-reset', () => { start = performance.now(); });
  }
}
