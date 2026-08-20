// ============================================================
// RISE FILMS — Smooth scroll (Lenis) + GSAP ScrollTrigger
// Carregados via CDN como globais (window.Lenis, window.gsap,
// window.ScrollTrigger) antes deste módulo. Ver index.html.
// ============================================================
import { qsa, prefersReducedMotion } from './utils.js';

export function initMotion() {
  const reduced = prefersReducedMotion();
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  // ---------- Lenis smooth scroll ----------
  let lenis = null;
  if (window.Lenis && !reduced) {
    lenis = new window.Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
    });

    if (gsap && ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }
  }

  // ---------- Ancoragem suave para os links internos ----------
  qsa('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: -8 });
      } else {
        target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      }
      history.pushState(null, '', id);
    });
  });

  // ---------- Reveal on scroll ----------
  const revealEls = qsa('[data-reveal]');
  if (reduced || !revealEls.length) return;

  if (gsap && ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    revealEls.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        }
      );
    });

    // Header hide/reveal handled purely via CSS class; refresh on load.
    window.addEventListener('load', () => ScrollTrigger.refresh());
  } else if ('IntersectionObserver' in window) {
    // Fallback sem GSAP.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.transition = 'opacity 800ms ease, transform 800ms ease';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'none';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }
}
