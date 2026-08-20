// ============================================================
// RISE FILMS — Dados reutilizáveis das seções
// Centraliza conteúdo para evitar repetição nos componentes.
// ============================================================

export const heroSlides = [
  {
    headline: ["Luz,", "câmera e emoção."],
    supporting: "Rompemos limites,\ndespertamos emoções.",
    cta: "Saiba mais",
    href: "#solucoes",
    video: "/assets/videos/hero-01.mp4",
  },
  {
    headline: ["Do início ao fim,", "do play ao like"],
    supporting: "",
    cta: "Saiba mais",
    href: "#processo",
    video: "/assets/videos/hero-02.mp4",
  },
  {
    headline: ["Histórias que", "atravessam fronteiras."],
    supporting: "Ideias ganham forma.\nMarcas ganham movimento.",
    cta: "Saiba mais",
    href: "#cases",
    video: "/assets/videos/hero-03.mp4",
  },
];

export const services = [
  { number: "01", name: "Produção Audiovisual", video: "/assets/videos/service-producao.mp4" },
  { number: "02", name: "Motions e Renders", video: "/assets/videos/service-motion.mp4" },
  { number: "03", name: "Podcast e Videocast", video: "/assets/videos/service-podcast.mp4" },
  { number: "04", name: "Jingles e Voice Production", video: "/assets/videos/service-jingles.mp4" },
];

export const clients = [
  { name: "OPAS — Organização Pan-Americana da Saúde", logo: "/assets/logos/opas.svg" },
  { name: "Rockefeller", logo: "/assets/logos/rockefeller.svg" },
  { name: "SUS", logo: "/assets/logos/sus.svg" },
  { name: "Horsch", logo: "/assets/logos/horsch.svg" },
  { name: "Hospital São Vicente", logo: "/assets/logos/hospital-sao-vicente.svg" },
  { name: "voarmais.com", logo: "/assets/logos/voarmais.svg" },
  { name: "Girassol Incorporadora", logo: "/assets/logos/girassol.svg" },
  { name: "Premier Niveau", logo: "/assets/logos/premier-niveau.svg" },
  { name: "Gentell Brasil", logo: "/assets/logos/gentell.svg" },
];

export const solutions = [
  {
    number: "01",
    title: "Produção Audiovisual",
    text: "Somos contadores de histórias que dão vida às ideias através do audiovisual. Cada cena é uma oportunidade de elevar sua mensagem. Não apenas produzimos vídeos; tecemos narrativas cativantes. Moldamos ideias em imagens, capturamos emoções e ascendemos a sua mensagem. Somos a essência do audiovisual, elevando sua história a novas alturas.",
    media: "/assets/videos/solution-producao.mp4",
  },
  {
    number: "02",
    title: "Motions e Renders",
    text: "Combinamos a magia do motion design com renders incríveis para dar vida a cada frame. Transformamos conceitos em realidade, impulsionando sua história além das telas.",
    media: "/assets/videos/solution-motion.mp4",
  },
  {
    number: "03",
    title: "Podcast e Videocast",
    text: "Desbloqueie seu potencial no nosso estúdio de podcasts: o lugar onde ideias fluem e marcas ganham personalidade. Com equipamentos de ponta e um ambiente inspirador e ultra versátil, estamos prontos para dar vida às suas histórias, entrevistas e paixões.",
    media: "/assets/videos/solution-podcast.mp4",
  },
  {
    number: "04",
    title: "Jingles e Voice Production",
    text: "Seu som, sua identidade! É em nosso estúdio que as melodias contagiantes e vozes envolventes se encontram. Criamos jingles que ecoam na mente e locuções que dão vida às palavras. De comerciais a projetos criativos, cada som é uma assinatura única.",
    media: "/assets/videos/solution-jingles.mp4",
  },
];

export const processSteps = [
  {
    phase: "Pré-produção",
    items: ["Conceituação", "Roteirização", "Visita técnica de alinhamento", "Cronograma de execução"],
  },
  {
    phase: "Pós-produção",
    items: ["Edição", "Animação", "Color Grading", "Sound Effect"],
  },
];

export const cases = [
  { number: "01", name: "Hospital São Vicente", thumb: "/assets/cases/hospital-sao-vicente.jpg", video: "/assets/cases/hospital-sao-vicente.mp4" },
  { number: "02", name: "Rockefeller", thumb: "/assets/cases/rockfeller.jpg", video: "/assets/cases/rockfeller.mp4" },
  { number: "03", name: "Royal Face", thumb: "/assets/cases/royal-face.jpg", video: "/assets/cases/royal-face.mp4" },
  { number: "04", name: "Premier Niveau", thumb: "/assets/cases/premier-niveau.jpg", video: "/assets/cases/premier-niveau.mp4" },
  { number: "05", name: "Windy City", thumb: "/assets/cases/windy-city.jpg", video: "/assets/cases/windy-city.mp4" },
  // Everest Unlimited: aguardando envio do vídeo (arquivo original de 93MB não foi transferido ainda).
];

export const team = [
  {
    name: "Thiago Berardi",
    role: "Diretor Comercial",
    photo: "/assets/team/thiago-berardi.webp",
    bio: [
      "Com mais de 20 anos de experiência em estratégia, branding, marketing e novos negócios, Thiago Berardi traz para a Rise Films uma visão que conecta criatividade, mercado e resultado.",
      "Fundador da BDDB.ag e cofundador do TBS Group, atua na construção e no desenvolvimento de marcas, projetos e negócios em diferentes segmentos. Na Rise Films, lidera a frente comercial aproximando marcas de ideias capazes de ganhar força por meio do audiovisual.",
      "Sua atuação combina visão estratégica, sensibilidade criativa e entendimento de negócio para transformar necessidades em projetos relevantes, histórias em conexões e produções em experiências que geram valor para marcas e pessoas.",
    ],
  },
  {
    name: "Bruno Schultz",
    role: "Diretor de Arte",
    photo: "/assets/team/bruno-schultz.webp",
    bio: [
      "Com mais de 15 anos de experiência em direção de arte, publicidade e linguagem visual, Bruno Schultz é responsável por transformar conceitos em imagens capazes de comunicar, envolver e permanecer na memória.",
      "Na Rise Films, conduz a construção estética dos projetos, conectando narrativa, composição, movimento e identidade para que cada produção tenha personalidade própria e coerência com os objetivos de cada marca.",
      "Seu olhar combina sensibilidade criativa, repertório visual e visão estratégica, garantindo que cada frame tenha intenção. Da concepção à entrega final, Bruno traduz ideias em experiências visuais marcantes e transforma histórias em imagens que despertam emoção.",
    ],
  },
  {
    name: "Vinicius Lima",
    role: "CCO — Chief Creative Officer",
    photo: "/assets/team/vinicius-lima.webp",
    bio: [
      "Com uma visão estratégica, inquieta e orientada à inovação, Vinicius Lima lidera a direção criativa da Rise Films, transformando ideias em narrativas capazes de gerar impacto, conexão e relevância.",
      "Sua experiência em criatividade, comunicação e marketing digital permite unir conceito, linguagem e estratégia em produções que vão além da estética. Na Rise, conduz o pensamento criativo por trás de cada projeto, garantindo personalidade, consistência e força para cada história.",
      "Sob sua liderança criativa, a Rise Films conecta estratégia e emoção para desenvolver experiências audiovisuais que rompem padrões, ampliam possibilidades e fazem marcas serem vistas, lembradas e sentidas.",
    ],
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Cases", href: "#cases" },
  { label: "Quem Somos", href: "#equipe" },
  { label: "Contato", href: "#contato" },
];
