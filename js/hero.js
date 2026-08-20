// ============================================================
// RISE FILMS — Hero cinematográfico (3 mensagens, transição automática)
// ============================================================
import { qs, qsa, prefersReducedMotion } from './utils.js';
import { initMagicRings } from './magic-rings.js';
import { initWarpText } from './warp-text.js';

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
  const prevBtn = qs('[data-hero-prev]', hero);
  const nextBtn = qs('[data-hero-next]', hero);

  // Duas linhas do título — cada uma com seu próprio mount para o efeito de vidro (warp text).
  const lineEls = qsa('[data-hero-line]', headlineEl || hero);
  const warpInstances = [null, null];

  let index = 0;
  const total = slidesContent.length;
  const interval = 6500;
  let timer = null;

  function renderText(i) {
    const data = slidesContent[i];
    lineEls.forEach((lineEl, li) => {
      const textEl = qs('[data-hero-line-text]', lineEl);
      const text = data.headline[li] || '';
      if (textEl) textEl.textContent = text;
      const warp = warpInstances[li];
      if (warp) warp.update({ text });
    });
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

  function prev() {
    goTo((index - 1 + total) % total);
  }

  function startAutoplay() {
    if (prefersReducedMotion()) return;
    clearInterval(timer);
    timer = window.setInterval(next, interval);
  }

  function resetAutoplayAfterManualNav() {
    startAutoplay();
    hero.dispatchEvent(new CustomEvent('rise:hero-reset'));
  }

  goTo(0);
  startAutoplay();

  // Setas de navegação manual entre os banners.
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prev();
      resetAutoplayAfterManualNav();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      next();
      resetAutoplayAfterManualNav();
    });
  }

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

  // Efeito de vidro/distorção no título — progressive enhancement:
  // se o WebGL2/OGL falhar, o texto normal (já visível) continua exatamente como estava.
  if (!prefersReducedMotion()) {
    lineEls.forEach((lineEl, li) => {
      const warpMount = qs('[data-hero-headline-warp]', lineEl);
      if (!warpMount) return;
      const isAccent = li === 1;
      initWarpText(warpMount, {
        text: slidesContent[index].headline[li] || '',
        color: isAccent ? '#65F461' : '#ffffff',
        fontSize: 'inherit',
        fontWeight: 600,
        fontFamily: 'inherit',
        letterSpacing: '-0.01em',
        lineHeight: 0.98,
        warpStrength: 0.06,
        warpScale: 1.6,
        speed: 0.5,
        pointerInfluence: 0.4,
        pointerStrength: 0.3,
        refraction: 0.015,
        ripple: true,
      }).then((instance) => {
        if (!instance) return; // WebGL2/OGL indisponível — mantém o texto normal.
        warpInstances[li] = instance;
        lineEl.classList.add('is-warped');
      });
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
