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
import { initProcess } from './process.js';
import { initFooter } from './footer.js';
import { initContactForm } from './contact.js';
import { initCaseLightbox } from './lightbox.js';
import { initMotion } from './motion.js';

document.documentElement.classList.remove('no-js');

async function boot() {
  initCustomCursor();
  initNav();
  initHero();
  initMarquee();
  initSolutions();
  initSpotlightCards('.solution-panel');
  initProcess();
  initFooter();
  initContactForm();
  initCaseLightbox();
  initMotion();

  await initPreloader();
}

boot();
