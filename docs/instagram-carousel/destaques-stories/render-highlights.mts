import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

type HighlightIcon = "person" | "briefcase" | "steps" | "chart";
type HighlightTone = "orange" | "blue" | "green" | "rust";
type StoryVariant = "cover" | "photo" | "text" | "logos" | "service" | "step" | "guarantee" | "proof" | "cta";
type AssetName = "avatar" | "sites" | "whatsapp" | "strategy" | "calvinKlein" | "walmart" | "havaianas" | "riachuelo" | "cea";

interface StoryCard {
  id: string;
  variant: StoryVariant;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  body?: string[];
  accent?: string;
  image?: "avatar" | "sites" | "whatsapp" | "strategy";
  logos?: Array<"calvinKlein" | "walmart" | "havaianas" | "riachuelo" | "cea">;
  stepNumber?: string;
  placeholder?: string;
  sticker?: string;
}

interface HighlightDeck {
  id: string;
  title: string;
  label: string;
  icon: HighlightIcon;
  tone: HighlightTone;
  stories: StoryCard[];
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "../../..");
const outputDir = path.join(scriptDir, "out");

const assetPaths = {
  avatar: "../../../assets/imgs/jonatas-ricardo-santos-frontend-avatar.png",
  sites: "../../../public/consultoria/imagem-sites-apps.png",
  whatsapp: "../../../public/consultoria/imagem-whatsapp-ia.png",
  strategy: "../../../public/consultoria/imagem-estrategia.png",
  calvinKlein: "../../../public/consultoria/logos/calvin-klein.png",
  walmart: "../../../public/consultoria/logos/walmart.png",
  havaianas: "../../../public/consultoria/logos/havaianas.png",
  riachuelo: "../../../public/consultoria/logos/riachuelo.png",
  cea: "../../../public/consultoria/logos/cea.png",
} satisfies Record<AssetName, string>;

const decks: HighlightDeck[] = [
  {
    id: "quem-sou",
    title: "Quem sou eu",
    label: "Quem sou",
    icon: "person",
    tone: "orange",
    stories: [
      {
        id: "slide-01",
        variant: "photo",
        image: "avatar",
        eyebrow: "Quem sou",
        title: "Oi, eu sou o Jonatas.",
      },
      {
        id: "slide-02",
        variant: "text",
        eyebrow: "Experiência",
        title: "15 anos construindo negócios na internet.",
        body: ["No Brasil e nos Estados Unidos."],
      },
      {
        id: "slide-03",
        variant: "logos",
        eyebrow: "Marcas",
        title: "Já trabalhei com marcas como",
        accent: "Calvin Klein, Walmart e Havaianas.",
        logos: ["calvinKlein", "walmart", "havaianas", "riachuelo", "cea"],
      },
      {
        id: "slide-04",
        variant: "text",
        eyebrow: "Hoje",
        title: "Uso tudo isso pra ajudar empreendedor brasileiro a vender mais.",
        body: ["Sem complicação.", "Sem papo técnico.", "Só resultado."],
      },
      {
        id: "slide-05",
        variant: "cta",
        eyebrow: "Vamos conversar?",
        title: "Quer trocar uma ideia sobre o seu negócio?",
        sticker: "Me chama aqui",
      },
    ],
  },
  {
    id: "o-que-faco",
    title: "O que faço",
    label: "O que faço",
    icon: "briefcase",
    tone: "blue",
    stories: [
      {
        id: "slide-01",
        variant: "text",
        eyebrow: "Serviços",
        title: "O que eu construo pro seu negócio:",
      },
      {
        id: "slide-02",
        variant: "service",
        image: "sites",
        eyebrow: "Site & app",
        title: "Presença profissional que atrai, convence e vende.",
        body: ["Até enquanto você dorme."],
      },
      {
        id: "slide-03",
        variant: "service",
        image: "strategy",
        eyebrow: "Loja / mini e-commerce",
        title: "O cliente vê, escolhe e paga sozinho.",
        body: ["Pedidos organizados no automático."],
      },
      {
        id: "slide-04",
        variant: "service",
        image: "whatsapp",
        eyebrow: "Automação com IA",
        title: "Atendimento que responde 24h.",
        body: ["Com a sua voz e do seu jeito."],
      },
      {
        id: "slide-05",
        variant: "text",
        eyebrow: "Estratégia de vendas",
        title: "Um plano claro pra vender mais.",
        body: ["Sem depender de post diário.", "Sem viver online."],
      },
      {
        id: "slide-06",
        variant: "cta",
        eyebrow: "Começo certo",
        title: "Não sabe por onde começar?",
        sticker: "A gente descobre junto. Me chama.",
      },
    ],
  },
  {
    id: "como-funciona",
    title: "Como funciona",
    label: "Como funciona",
    icon: "steps",
    tone: "green",
    stories: [
      {
        id: "slide-01",
        variant: "text",
        eyebrow: "Processo",
        title: "Do jeito que tá hoje até o negócio rodando sozinho.",
        body: ["Em 4 passos."],
      },
      {
        id: "slide-02",
        variant: "step",
        stepNumber: "1",
        title: "A gente se fala",
        body: ["Você me conta como vende e atende hoje.", "Sem compromisso.", "Sem formulário longo."],
      },
      {
        id: "slide-03",
        variant: "step",
        stepNumber: "2",
        title: "Eu entendo o problema",
        body: ["Mapeio onde você perde tempo e venda.", "Você recebe um diagnóstico claro."],
      },
      {
        id: "slide-04",
        variant: "step",
        stepNumber: "3",
        title: "A gente constrói junto",
        body: ["Site, loja, app, automação.", "O que fizer sentido pro seu caso.", "Você acompanha cada etapa."],
      },
      {
        id: "slide-05",
        variant: "step",
        stepNumber: "4",
        title: "Você vende mais e trabalha menos",
        body: ["Eu fico por perto 30 dias pra garantir que tá tudo certo."],
      },
      {
        id: "slide-06",
        variant: "guarantee",
        eyebrow: "Sem risco",
        title: "E se não funcionar pro seu negócio?",
        accent: "Devolvo 100% do valor.",
        body: ["Sem pergunta.", "Sem burocracia."],
      },
      {
        id: "slide-07",
        variant: "cta",
        eyebrow: "Próximo passo",
        title: "Bora começar?",
        sticker: "Me chama no direct.",
      },
    ],
  },
  {
    id: "resultados",
    title: "Resultados",
    label: "Resultados",
    icon: "chart",
    tone: "rust",
    stories: [
      {
        id: "slide-01",
        variant: "text",
        eyebrow: "Prova",
        title: "O que muda quando o negócio para de depender só de você:",
      },
      {
        id: "slide-02",
        variant: "proof",
        eyebrow: "Antes x depois",
        title: "Mostre aqui um site ou loja que você fez.",
        placeholder: "print / foto",
        body: ["Legenda curta: o que melhorou."],
      },
      {
        id: "slide-03",
        variant: "proof",
        eyebrow: "Depoimento",
        title: "Um cliente falando do resultado.",
        placeholder: "print de conversa",
        body: ["Peça autorização antes de postar."],
      },
      {
        id: "slide-04",
        variant: "proof",
        eyebrow: "Número concreto",
        title: "Use um resultado que dê pra medir.",
        placeholder: "resultado",
        body: ["Ex.: pedidos organizados, cliente atendido na hora, site no ar em X dias."],
      },
      {
        id: "slide-05",
        variant: "cta",
        eyebrow: "Quer também?",
        title: "Quer resultado assim no seu negócio?",
        sticker: "Me chama no direct.",
      },
    ],
  },
];

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;");
}

function image(asset: AssetName, className = "") {
  return `<img alt="" class="${className}" src="${assetPaths[asset]}" />`;
}

function renderIcon(icon: HighlightIcon) {
  if (icon === "person") {
    return `
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <circle cx="48" cy="34" r="16" />
        <path d="M22 78c4-16 14-25 26-25s22 9 26 25" />
      </svg>
    `;
  }

  if (icon === "briefcase") {
    return `
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <path d="M28 34h40a10 10 0 0 1 10 10v27a9 9 0 0 1-9 9H27a9 9 0 0 1-9-9V44a10 10 0 0 1 10-10Z" />
        <path d="M36 34v-7a7 7 0 0 1 7-7h10a7 7 0 0 1 7 7v7" />
        <path d="M18 51h60" />
      </svg>
    `;
  }

  if (icon === "steps") {
    return `
      <svg viewBox="0 0 96 96" aria-hidden="true">
        <circle cx="26" cy="26" r="10" />
        <circle cx="70" cy="48" r="10" />
        <circle cx="30" cy="72" r="10" />
        <path d="M36 30c12 2 20 6 27 13" />
        <path d="M62 55c-8 8-16 12-25 15" />
      </svg>
    `;
  }

  return `
    <svg viewBox="0 0 96 96" aria-hidden="true">
      <path d="M18 76h60" />
      <path d="M22 66l16-16 13 10 24-31" />
      <path d="M61 29h14v14" />
    </svg>
  `;
}

function renderCover(deck: HighlightDeck) {
  return `
    <article class="story-card cover tone-${deck.tone}" data-kind="cover">
      <div class="noise"></div>
      <div class="cover-center">
        <div class="cover-icon">${renderIcon(deck.icon)}</div>
        <h1>${escapeHtml(deck.label)}</h1>
        <p>jonatasricardo.web</p>
      </div>
    </article>
  `;
}

function renderProgress(deck: HighlightDeck, storyIndex: number) {
  return `
    <div class="progress" aria-hidden="true">
      ${deck.stories.map((_, index) => `<span class="${index <= storyIndex ? "active" : ""}"></span>`).join("")}
    </div>
  `;
}

function renderBody(story: StoryCard) {
  if (!story.body?.length) {
    return "";
  }

  return `<div class="story-body">${story.body.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}</div>`;
}

function renderLogos(story: StoryCard) {
  if (!story.logos?.length) {
    return "";
  }

  return `
    <div class="logos-card">
      ${story.logos.map((logo) => `<div class="logo-slot">${image(logo, "brand-logo")}</div>`).join("")}
    </div>
  `;
}

function renderVisual(story: StoryCard) {
  if (story.variant === "photo" && story.image === "avatar") {
    return `<div class="avatar-photo">${image("avatar", "avatar-image")}</div>`;
  }

  if (story.variant === "service" && story.image) {
    return `
      <div class="service-visual">
        ${image(story.image, "service-image")}
      </div>
    `;
  }

  if (story.variant === "proof") {
    return `
      <div class="proof-placeholder">
        <span>${escapeHtml(story.placeholder ?? "print / foto")}</span>
      </div>
    `;
  }

  return "";
}

function renderStory(deck: HighlightDeck, story: StoryCard, storyIndex: number) {
  const parts = [
    story.eyebrow ? `<p class="eyebrow">${escapeHtml(story.eyebrow)}</p>` : "",
    story.stepNumber ? `<div class="step-badge">${escapeHtml(story.stepNumber)}</div>` : "",
    story.title ? `<h1>${escapeHtml(story.title)}</h1>` : "",
    story.accent ? `<p class="accent-line">${escapeHtml(story.accent)}</p>` : "",
    renderVisual(story),
    renderLogos(story),
    renderBody(story),
    story.sticker ? `<div class="message-sticker">${escapeHtml(story.sticker)}</div>` : "",
  ];

  return `
    <article class="story-card story ${story.variant} tone-${deck.tone}" data-kind="story">
      <div class="noise"></div>
      ${renderProgress(deck, storyIndex)}
      <div class="story-content">
        ${parts.join("")}
      </div>
      <div class="story-footer">
        <span>${escapeHtml(deck.label)}</span>
        <span>jonatasricardo.web</span>
      </div>
    </article>
  `;
}

function cardShell(exportId: string, title: string, html: string) {
  return `
    <figure class="card-shell" data-export-id="${escapeHtml(exportId)}">
      ${html}
      <figcaption>${escapeHtml(title)}</figcaption>
    </figure>
  `;
}

function renderDeckSection(deck: HighlightDeck) {
  const cards = [
    cardShell(`${deck.id}-cover`, `${deck.label} · capa`, renderCover(deck)),
    ...deck.stories.map((story, index) =>
      cardShell(`${deck.id}-${story.id}`, `${deck.label} · ${index + 1}`, renderStory(deck, story, index))
    ),
  ];

  return `
    <section class="deck-section">
      <div class="section-heading">
        <div>
          <p>${escapeHtml(deck.title)}</p>
          <h2>${escapeHtml(deck.label)}</h2>
        </div>
        <span>${deck.stories.length} stories + capa</span>
      </div>
      <div class="card-grid">${cards.join("")}</div>
    </section>
  `;
}

function renderHtml() {
  const allCards = decks.flatMap((deck) => [
    { id: `${deck.id}-cover`, title: `${deck.label} · capa` },
    ...deck.stories.map((story, index) => ({ id: `${deck.id}-${story.id}`, title: `${deck.label} · ${index + 1}` })),
  ]);

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Destaques do Instagram · jonatasricardo.web</title>
    <style>
      :root {
        --page: #f5f3ec;
        --ink: #011a24;
        --muted: rgba(1, 26, 36, 0.62);
        --cream: #fdf7ed;
        --peach: #fce2bd;
        --orange: #ff8000;
        --blue: #007ba1;
        --green: #159a0f;
        --rust: #914a33;
        --card-scale: 0.22;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background: var(--page);
        color: var(--ink);
        font-family: Inter, "Avenir Next", "Helvetica Neue", Arial, sans-serif;
      }

      img {
        display: block;
      }

      .page {
        max-width: 1260px;
        margin: 0 auto;
        padding: 48px 28px 72px;
      }

      .hero {
        display: grid;
        gap: 12px;
        margin-bottom: 34px;
      }

      .hero p {
        margin: 0;
        color: var(--muted);
        font-size: 16px;
        font-weight: 750;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .hero h1 {
        max-width: 800px;
        margin: 0;
        font-size: clamp(34px, 5vw, 64px);
        line-height: 0.98;
        letter-spacing: 0;
      }

      .hero small {
        max-width: 720px;
        color: var(--muted);
        font-size: 18px;
        line-height: 1.5;
      }

      .covers-strip {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 18px;
        margin-bottom: 34px;
      }

      .cover-preview {
        display: grid;
        justify-items: center;
        gap: 10px;
        padding: 18px;
        background: rgba(255, 255, 255, 0.6);
        border: 1px solid rgba(1, 26, 36, 0.08);
        border-radius: 18px;
      }

      .cover-preview .mini-icon {
        display: grid;
        place-items: center;
        width: 82px;
        height: 82px;
        border: 2px solid rgba(1, 26, 36, 0.12);
        border-radius: 50%;
        background: #fff8ec;
      }

      .cover-preview svg {
        width: 46px;
        height: 46px;
        fill: none;
        stroke: var(--orange);
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 6;
      }

      .cover-preview span {
        font-size: 15px;
        font-weight: 800;
      }

      .deck-section {
        margin-top: 42px;
      }

      .section-heading {
        display: flex;
        align-items: end;
        justify-content: space-between;
        gap: 20px;
        margin-bottom: 18px;
        border-top: 1px solid rgba(1, 26, 36, 0.1);
        padding-top: 28px;
      }

      .section-heading p,
      .section-heading h2,
      .section-heading span {
        margin: 0;
      }

      .section-heading p,
      .section-heading span {
        color: var(--muted);
        font-size: 14px;
        font-weight: 750;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .section-heading h2 {
        margin-top: 4px;
        font-size: 36px;
        line-height: 1;
      }

      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(238px, 1fr));
        gap: 22px;
      }

      .card-shell {
        width: calc(1080px * var(--card-scale));
        height: calc(1920px * var(--card-scale) + 30px);
        margin: 0;
      }

      .card-shell figcaption {
        margin-top: 8px;
        color: var(--muted);
        font-size: 13px;
        font-weight: 750;
      }

      .story-card {
        position: relative;
        width: 1080px;
        height: 1920px;
        overflow: hidden;
        transform: scale(var(--card-scale));
        transform-origin: top left;
        border-radius: 44px;
        background:
          radial-gradient(circle at 100% 0%, rgba(255, 128, 0, 0.23), transparent 38%),
          linear-gradient(180deg, #fce2bd 0%, #fdf7ed 47%, #f7f0e4 100%);
        box-shadow: 0 28px 70px rgba(1, 26, 36, 0.18);
      }

      .story-card::before,
      .story-card::after {
        position: absolute;
        content: "";
        pointer-events: none;
      }

      .story-card::before {
        inset: 0;
        background:
          linear-gradient(90deg, rgba(255, 255, 255, 0.42), transparent 38%),
          radial-gradient(circle at 16% 76%, rgba(255, 255, 255, 0.58), transparent 24%);
      }

      .story-card::after {
        top: 190px;
        right: -200px;
        width: 560px;
        height: 560px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.28);
        filter: blur(4px);
      }

      .tone-blue {
        --accent: var(--blue);
      }

      .tone-green {
        --accent: var(--green);
      }

      .tone-orange {
        --accent: var(--orange);
      }

      .tone-rust {
        --accent: var(--rust);
      }

      .noise {
        position: absolute;
        inset: 0;
        opacity: 0.11;
        background-image:
          linear-gradient(rgba(1, 26, 36, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(1, 26, 36, 0.08) 1px, transparent 1px);
        background-size: 62px 62px;
        mask-image: linear-gradient(to bottom, transparent 0%, black 18%, black 70%, transparent 100%);
      }

      .cover-center,
      .story-content {
        position: relative;
        z-index: 2;
      }

      .cover-center {
        display: grid;
        min-height: 100%;
        align-content: center;
        justify-items: center;
        padding: 160px 96px;
        text-align: center;
      }

      .cover-icon {
        display: grid;
        place-items: center;
        width: 380px;
        height: 380px;
        margin-bottom: 64px;
        border: 5px solid rgba(1, 26, 36, 0.12);
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.48);
        backdrop-filter: blur(22px);
      }

      .cover-icon svg {
        width: 212px;
        height: 212px;
        fill: none;
        stroke: var(--accent);
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 6;
      }

      .cover-center h1 {
        margin: 0;
        font-size: 118px;
        line-height: 0.96;
        letter-spacing: -0.02em;
      }

      .cover-center p {
        margin: 34px 0 0;
        color: var(--muted);
        font-size: 34px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .progress {
        position: absolute;
        z-index: 5;
        top: 44px;
        left: 54px;
        right: 54px;
        display: grid;
        grid-auto-flow: column;
        gap: 8px;
      }

      .progress span {
        height: 8px;
        border-radius: 99px;
        background: rgba(1, 26, 36, 0.16);
      }

      .progress span.active {
        background: var(--accent);
      }

      .story-content {
        display: grid;
        align-content: center;
        min-height: 100%;
        padding: 172px 88px 170px;
      }

      .eyebrow {
        margin: 0 0 30px;
        color: var(--accent);
        font-size: 36px;
        font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .story h1 {
        max-width: 900px;
        margin: 0;
        font-size: 88px;
        line-height: 1.03;
        letter-spacing: -0.025em;
      }

      .story.text h1,
      .story.cta h1 {
        font-size: 96px;
      }

      .accent-line {
        margin: 38px 0 0;
        color: var(--accent);
        font-size: 70px;
        line-height: 1.08;
        font-weight: 900;
        letter-spacing: -0.015em;
      }

      .story-body {
        display: grid;
        gap: 20px;
        margin-top: 42px;
      }

      .story-body p {
        margin: 0;
        color: rgba(1, 26, 36, 0.78);
        font-size: 48px;
        line-height: 1.22;
        font-weight: 750;
      }

      .avatar-photo {
        width: 520px;
        height: 520px;
        margin: 64px auto 70px;
        overflow: hidden;
        border: 12px solid var(--orange);
        border-radius: 50%;
        background: var(--orange);
        box-shadow: 0 28px 64px rgba(1, 26, 36, 0.18);
      }

      .avatar-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .logos-card {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 26px;
        margin-top: 64px;
      }

      .logo-slot {
        display: grid;
        place-items: center;
        min-height: 180px;
        border: 2px solid rgba(1, 26, 36, 0.08);
        border-radius: 30px;
        background: rgba(255, 255, 255, 0.58);
        backdrop-filter: blur(18px);
      }

      .brand-logo {
        max-width: 190px;
        max-height: 110px;
        object-fit: contain;
      }

      .service-visual {
        width: 100%;
        height: 500px;
        margin-top: 58px;
        margin-bottom: 58px;
        overflow: hidden;
        border-radius: 38px;
        background: #111;
        box-shadow: 0 28px 64px rgba(1, 26, 36, 0.2);
      }

      .service-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .step-badge {
        display: grid;
        place-items: center;
        width: 150px;
        height: 150px;
        margin-bottom: 46px;
        border-radius: 50%;
        background: var(--accent);
        color: white;
        font-size: 74px;
        font-weight: 950;
      }

      .guarantee .accent-line {
        padding: 34px;
        border-radius: 32px;
        background: rgba(255, 255, 255, 0.55);
        backdrop-filter: blur(18px);
      }

      .proof-placeholder {
        display: grid;
        place-items: center;
        height: 640px;
        margin-bottom: 54px;
        border: 5px dashed rgba(1, 26, 36, 0.22);
        border-radius: 42px;
        background: rgba(255, 255, 255, 0.34);
        backdrop-filter: blur(18px);
      }

      .proof-placeholder span {
        color: var(--muted);
        font-size: 56px;
        font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .message-sticker {
        display: inline-flex;
        justify-self: start;
        margin-top: 64px;
        padding: 34px 44px;
        border-radius: 999px;
        background: var(--accent);
        color: #fff;
        font-size: 42px;
        font-weight: 900;
        box-shadow: 0 18px 46px rgba(1, 26, 36, 0.16);
      }

      .story-footer {
        position: absolute;
        z-index: 3;
        left: 84px;
        right: 84px;
        bottom: 76px;
        display: flex;
        justify-content: space-between;
        color: rgba(1, 26, 36, 0.56);
        font-size: 28px;
        font-weight: 850;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      body.export {
        background: transparent;
      }

      body.export .page > :not(.deck-section),
      body.export .section-heading,
      body.export .card-shell figcaption {
        display: none;
      }

      body.export .page {
        max-width: none;
        padding: 0;
      }

      body.export .deck-section {
        margin: 0;
      }

      body.export .card-grid {
        display: block;
      }

      body.export .card-shell {
        width: 1080px;
        height: 1920px;
        margin: 0 0 80px;
      }

      body.export .story-card {
        transform: none;
        border-radius: 0;
        box-shadow: none;
      }

      @media (max-width: 720px) {
        :root {
          --card-scale: 0.16;
        }

        .page {
          padding: 32px 18px 54px;
        }

        .covers-strip {
          grid-template-columns: repeat(2, 1fr);
        }

        .section-heading {
          display: grid;
        }

        .card-grid {
          grid-template-columns: repeat(auto-fill, minmax(174px, 1fr));
        }
      }
    </style>
  </head>
  <body>
    <main class="page">
      <header class="hero">
        <p>Destaques do Instagram</p>
        <h1>Stories para transformar o perfil em uma mini landing page.</h1>
        <small>Ordem recomendada: Quem sou · O que faço · Como funciona · Resultados.</small>
      </header>

      <div class="covers-strip">
        ${decks
          .map(
            (deck) => `
              <div class="cover-preview tone-${deck.tone}">
                <div class="mini-icon">${renderIcon(deck.icon)}</div>
                <span>${escapeHtml(deck.label)}</span>
              </div>
            `
          )
          .join("")}
      </div>

      ${decks.map(renderDeckSection).join("")}
    </main>

    <script>
      if (new URLSearchParams(window.location.search).get("export") === "1") {
        document.body.classList.add("export");
      }

      window.__highlightCards = ${JSON.stringify(allCards)};
    </script>
  </body>
</html>`;
}

function renderReadme() {
  return `# Destaques do Instagram

Pacote visual para os destaques do perfil \`jonatasricardo.web\`.

## Ordem Recomendada

1. Quem sou
2. O que faço
3. Como funciona
4. Resultados

## Arquivos

- Preview: \`index.html\`
- Export PNG 9:16: \`out/{destaque}/cover.png\` e \`out/{destaque}/slide-XX.png\`
- Tamanho das imagens: \`1080x1920\`

## Nota Sobre Resultados

Os stories de \`Resultados\` estão com placeholders honestos para você trocar por prints, depoimentos e números reais conforme tiver material.
`;
}

async function renderImages() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 }, deviceScaleFactor: 1 });
  const previewUrl = pathToFileURL(path.join(scriptDir, "index.html")).href;

  await page.goto(previewUrl);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(outputDir, "panel-preview.png"), fullPage: false });

  await page.setViewportSize({ width: 1200, height: 2200 });
  await page.goto(`${previewUrl}?export=1`);
  await page.evaluate(() => document.fonts.ready);

  for (const deck of decks) {
    const deckDir = path.join(outputDir, deck.id);
    await mkdir(deckDir, { recursive: true });

    await page.locator(`[data-export-id="${deck.id}-cover"] .story-card`).screenshot({
      path: path.join(deckDir, "cover.png"),
    });

    for (const story of deck.stories) {
      await page.locator(`[data-export-id="${deck.id}-${story.id}"] .story-card`).screenshot({
        path: path.join(deckDir, `${story.id}.png`),
      });
    }
  }

  await browser.close();
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(scriptDir, "index.html"), renderHtml(), "utf8");
  await writeFile(path.join(scriptDir, "README.md"), renderReadme(), "utf8");
  await renderImages();

  console.log(`Generated ${decks.length} highlight decks in ${path.relative(projectRoot, scriptDir)}`);
}

await main();
