// ============================================================
// RISE FILMS — Novidades: renderiza o feed a partir de news-data.js
// ============================================================
import { NEWS_ITEMS } from './news-data.js';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function initNews(mount) {
  if (!mount) return;

  if (!Array.isArray(NEWS_ITEMS) || !NEWS_ITEMS.length) {
    const section = mount.closest('section');
    if (section) section.hidden = true;
    return;
  }

  mount.innerHTML = NEWS_ITEMS.map((item) => `
    <article class="news-card" role="listitem" data-reveal>
      <div class="news-card__media">
        <img src="${escapeHtml(item.image || '')}" alt="${escapeHtml(item.imageAlt || '')}" loading="lazy">
      </div>
      <div class="news-card__body">
        ${item.date ? `<span class="news-card__date">${escapeHtml(item.date)}</span>` : ''}
        <p class="news-card__text">${escapeHtml(item.text || '')}</p>
        ${item.videoUrl ? `<a class="news-card__video link-underline" href="${escapeHtml(item.videoUrl)}" target="_blank" rel="noopener noreferrer" data-cursor-target="view">Assistir vídeo →</a>` : ''}
      </div>
    </article>
  `).join('');
}
