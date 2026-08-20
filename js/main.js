// ============================================================
// RISE FILMS — Entry point
// ============================================================
import { initPreloader } from './preloader.js';
import { initCustomCursor } from './cursor.js';
import { initNav } from './nav.js';
import { initHero } from './hero.js';
import { initMarquee } from './marquee.js';
import { initSolutions } from './solutions.js';
import { initSpotlightCards } from './spotlight-card.js';
import { initAccordionGallery } from './accordion-gallery.js';
import { initProcess } from './process.js';
import { initFooter } from './footer.js';
import { initContactForm } from './contact.js';
import { initCaseLightbox } from './lightbox.js';
import { initMotion } from './motion.js';
import { initTextLoop } from './text-loop.js';

document.documentElement.classList.remove('no-js');

async function boot() {
  initCustomCursor();
  initNav();
  initHero();
  initMarquee();
  initSolutions();
  initSpotlightCards('.solution-panel');
  initAccordionGallery('[data-accordion-gallery]', { defaultIndex: 2 });
  initProcess();
  initTextLoop(document.querySelector('[data-text-loop]'), {
    text: 'Rise Films',
    separator: '✦',
  });
  initFooter();
  initContactForm();
  initCaseLightbox();
  initMotion();

  await initPreloader();
}

boot();
