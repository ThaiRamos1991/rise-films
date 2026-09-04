// ============================================================
// RISE FILMS — Novidades (mini feed estilo "Twitter" da Rise)
// ============================================================
// COMO ADICIONAR UMA NOVIDADE NOVA (sem precisar programar):
//
// 1. Salve a foto em /assets/news/ (formato .jpg ou .webp, largura mínima
//    de 800px, de preferência no formato paisagem/quadrado).
// 2. Copie um dos blocos { ... } abaixo, cole no TOPO da lista NEWS_ITEMS
//    (para aparecer primeiro) e ajuste os campos:
//
//      date      -> data no formato "DD Mês AAAA", ex: "04 Set 2026"
//      image     -> caminho da foto que você salvou, ex: "/assets/news/minha-foto.jpg"
//      imageAlt  -> um texto curto descrevendo a foto (acessibilidade e SEO)
//      text      -> texto curto da novidade (recomendado até ~220 caracteres)
//      videoUrl  -> (opcional) link do vídeo — YouTube, Instagram, Vimeo etc.
//                   Deixe como '' (vazio) se não tiver vídeo nessa novidade.
//
// 3. Salve o arquivo, comite e dê push como sempre — a Vercel publica sozinha.
//
// Não precisa apagar itens antigos: todos continuam aparecendo na grade,
// do mais novo (topo da lista) para o mais antigo.
// ============================================================

export const NEWS_ITEMS = [
  {
    date: '04 Set 2026',
    image: '/assets/news/novo-site-no-ar.jpg',
    imageAlt: 'Capa de lançamento do novo site da Rise Films',
    text: 'Nosso novo site está no ar! Uma nova casa digital para a Rise Films, feita para mostrar com ainda mais força quem somos e o que produzimos.',
    videoUrl: '',
  },
];
