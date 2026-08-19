# Rise Films — Website institucional

Site one-page cinematográfico para a Rise Films, construído em HTML, CSS e JavaScript puro (ES modules), com GSAP + ScrollTrigger e Lenis para o smooth scroll e as animações de scroll.

## Por que não Astro/React?

O ambiente onde este projeto foi gerado não tinha acesso ao registro do npm, então não foi possível rodar um build com Astro. O site foi construído como HTML/CSS/JS estático — sem passo de build — o que também o deixa 100% compatível com deploy direto na Vercel, sem CI extra. Se quiser migrar para Astro depois, a estrutura de componentes (`js/*.js`, seções isoladas no `index.html`) já está organizada para isso.

## Estrutura

```
index.html        # marcação de todas as seções (semântica, SEO, no-JS friendly)
css/style.css      # design tokens (cores, tipografia clamp(), grid 12 col) + estilos
js/
  data.js          # modelo de conteúdo de referência (serviços, clientes, cases, equipe)
  main.js          # ponto de entrada, inicializa todos os módulos
  preloader.js      # preloader RISE 00->100 com mask reveal
  cursor.js         # cursor customizado (desktop / ponteiro fino)
  nav.js            # header com estado de scroll + menu fullscreen mobile
  hero.js           # hero com 3 mensagens e transição automática
  marquee.js         # duplica a lista de clientes para loop contínuo
  solutions.js       # sincroniza navegação lateral sticky da seção Soluções
  process.js         # linha de progresso da seção Processo
  footer.js           # copyright dinâmico + footer reveal
  contact.js          # validação e feedback do formulário (submit ainda sem backend)
  motion.js            # Lenis + GSAP ScrollTrigger + scroll reveals
assets/               # placeholders — ver "Substituindo mídias" abaixo
favicon.svg, robots.txt, sitemap.xml, vercel.json
```

## Rodando localmente

Não há build. Basta servir a pasta como arquivos estáticos, por exemplo:

```bash
npx serve .
# ou
python3 -m http.server 4321
```

## Mídias — o que já é real e o que ainda é placeholder

**Já integrados (arquivos reais da Rise Films):**
- `assets/logos/rise-logo.png` e `rise-logo-white.png` — logo oficial, recortado (fundo do PNG original veio com o xadrez de transparência "queimado" nos pixels; foi reprocessado para virar um PNG com alpha de verdade) e disponível em preto e branco (o header troca entre as duas versões via `filter: invert()` conforme o scroll).
- `assets/team/vinicius-lima.webp` — foto real do Vinícius, recortada do fundo original (também veio sem transparência real) via segmentação (OpenCV GrabCut).
- `assets/cases/hospital-sao-vicente.mp4`, `kaminski-law.mp4`, `atacado-connect.mp4` — os 3 vídeos de case reais, recomprimidos (H.264, 720px de largura) para caber no limite de 25MB do upload web do GitHub e carregar mais rápido. Cada um tem uma thumbnail `.jpg` extraída do próprio vídeo. Clicar no card abre um lightbox/modal (`js/lightbox.js`) com o vídeo vertical, controles e áudio — não é mais autoplay em loop mudo.
- A seção Cases agora mostra só esses 3 (os 6 nomes fictícios do briefing original foram removidos a pedido da Thaís).

**Ainda placeholder (pendente de arquivo real):**
- `assets/videos/hero-01.mp4`, `hero-02.mp4`, `hero-03.mp4`
- `assets/videos/service-*.mp4` (produção, motion, podcast, jingles)
- `assets/videos/solution-*.mp4`
- `assets/team/thiago-berardi.webp`, `bruno-schultz.webp`
- `assets/logos/*.svg` (clientes: OPAS, Rockefeller, SUS, Horsch, voarmais.com, Girassol Incorporadora, Premier Niveau, Gentell Brasil)
- `assets/images/og-cover.jpg` (imagem de compartilhamento social, 1200x630)

Essas áreas continuam com fallback discreto (gradiente escuro / iniciais) até que os arquivos reais sejam enviados.

## Formulário de contato

O formulário de contato (`js/contact.js`) hoje só simula o envio no front-end. Para receber os leads de verdade, plugue um endpoint — por exemplo uma Vercel Function em `/api/contact`, ou um serviço como Formspree/HubSpot — e troque o bloco marcado com `Placeholder` nesse arquivo.

## Deploy

O projeto já foi publicado na Vercel via MCP (deploy direto de arquivos, sem repositório Git). Para conectar a um repositório GitHub e ter deploy automático a cada push, crie o repositório no GitHub, suba este código e conecte o repositório ao projeto Vercel pelo painel (Project Settings → Git).
