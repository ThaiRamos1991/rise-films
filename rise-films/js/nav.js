// ============================================================
// RISE FILMS — Header (scroll state) + menu mobile fullscreen
// ============================================================
import { qs, qsa } from './utils.js';

export function initNav() {
  const header = qs('[data-header]');
  const toggle = qs('[data-menu-toggle]');
  const mobileMenu = qs('[data-mobile-menu]');
  const mobileLinks = qsa('[data-mobile-link]');

  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (toggle && mobileMenu) {
    const closeMenu = () => {
      mobileMenu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    const openMenu = () => {
      mobileMenu.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };
    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });
    mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }
}
