import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

type Theme = "pain" | "education" | "proof";
type Visual =
  | "linkBio"
  | "website"
  | "lessons"
  | "holiday"
  | "catalog"
  | "ai"
  | "orders"
  | "proof";
type SlideLayout = "cover" | "text" | "list" | "steps" | "lesson" | "cta";
type AssetName =
  | "avatar"
  | "sites"
  | "strategy"
  | "whatsapp"
  | "coverBackground"
  | "calvinKlein"
  | "walmart"
  | "havaianas"
  | "riachuelo"
  | "cea";

type Tone = "default" | "accent" | "blue" | "green" | "rust" | "muted" | "cream";

interface RichLine {
  text: string;
  tone?: Tone;
}

interface Slide {
  layout: SlideLayout;
  headline?: RichLine[];
  eyebrow?: string;
  body?: RichLine[];
  bullets?: RichLine[];
  callout?: RichLine[];
  footer?: string;
  visual?: Visual;
  size?: "large" | "regular" | "compact";
}

interface CarouselPost {
  id: number;
  title: string;
  category: "Dor" | "Educação" | "Prova";
  theme: Theme;
  accent: Tone;
  slides: Slide[];
  caption: string;
  hashtags: string;
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "../../..");
const outputDir = path.join(scriptDir, "out");
const captionsDir = path.join(scriptDir, "captions");
const reelDir = path.join(scriptDir, "reel");

const assetPaths = {
  avatar: "assets/imgs/jonatas-ricardo-santos-frontend-avatar.png",
  sites: "public/consultoria/imagem-sites-apps.png",
  strategy: "public/consultoria/imagem-estrategia.png",
  whatsapp: "public/consultoria/imagem-whatsapp-ia.png",
  coverBackground: "docs/instagram-carousel/vendas-insta-whatsapp/assets/background-instagram-whatsapp-1080x1350.png",
  calvinKlein: "public/consultoria/logos/calvin-klein.png",
  walmart: "public/consultoria/logos/walmart.png",
  havaianas: "public/consultoria/logos/havaianas.png",
  riachuelo: "public/consultoria/logos/riachuelo.png",
  cea: "public/consultoria/logos/cea.png",
} satisfies Record<AssetName, string>;

const carouselPosts: CarouselPost[] = [
  {
    id: 2,
    title: "Tá no link da bio",
    category: "Dor",
    theme: "pain",
    accent: "accent",
    slides: [
      {
        layout: "cover",
        visual: "linkBio",
        size: "regular",
        headline: [
          { text: "\"Tá tudo no link da bio!\"" },
          { text: "E aí o cliente clica, se perde... e desiste.", tone: "accent" },
        ],
        footer: "arrasta →",
      },
      {
        layout: "text",
        visual: "linkBio",
        headline: [{ text: "A pessoa te viu no story, se interessou, clicou no link..." }],
        body: [{ text: "e caiu num monte de botão, link velho e \"me chama no WhatsApp\".", tone: "muted" }],
      },
      {
        layout: "text",
        size: "large",
        headline: [
          { text: "Cada clique a mais é uma chance da venda morrer.", tone: "accent" },
        ],
        body: [
          { text: "Cliente confuso não compra." },
          { text: "Cliente que espera resposta, esfria." },
        ],
      },
      {
        layout: "text",
        size: "large",
        headline: [{ text: "O problema não é a sua oferta." }],
        callout: [{ text: "É que falta um lugar pronto pra receber e convencer quem chega.", tone: "accent" }],
      },
      {
        layout: "text",
        visual: "website",
        headline: [{ text: "Um site ou uma loja simples bem feita resolve:" }],
        bullets: [
          { text: "a pessoa entra" },
          { text: "entende" },
          { text: "escolhe" },
          { text: "compra" },
        ],
        callout: [{ text: "sem depender de você responder na hora.", tone: "green" }],
      },
      {
        layout: "cta",
        headline: [{ text: "Quer ver como ficaria no seu negócio?" }],
        body: [{ text: "Me manda um \"oi\" no direct.", tone: "accent" }],
      },
    ],
    caption: `Quantas vendas você já perdeu no "tá no link da bio"?

A pessoa tava quente, clicou... e esbarrou em link quebrado, botão demais e "me chama no zap". Aí esfria e some.

Não é a sua oferta que tá ruim — falta um lugar pronto pra receber quem chega. Um site ou uma loja simples que vende mesmo quando você não tá online.

Se você vive perdendo gente nesse caminho, me manda um "oi" no direct. Salva esse post pra não esquecer.`,
    hashtags:
      "#linknabio #vendasonline #vendanoinstagram #lojavirtual #sitequevende #pequenosnegocios #empreendedorismo #marketingdigital #presencadigital #negociosdigitais #vendamais",
  },
  {
    id: 3,
    title: "Site bonito x site que vende",
    category: "Educação",
    theme: "education",
    accent: "blue",
    slides: [
      {
        layout: "cover",
        visual: "website",
        headline: [
          { text: "Seu site não precisa ser bonito." },
          { text: "Precisa VENDER.", tone: "blue" },
        ],
      },
      {
        layout: "text",
        headline: [
          { text: "Tem site lindo que não vende nada." },
          { text: "E tem site simples que fatura todo dia.", tone: "blue" },
        ],
        body: [{ text: "A diferença não é o visual.", tone: "muted" }],
      },
      {
        layout: "list",
        eyebrow: "A diferença é:",
        bullets: [
          { text: "deixa claro o que você faz?" },
          { text: "é fácil de comprar ou falar com você?" },
          { text: "carrega rápido no celular?" },
        ],
      },
      {
        layout: "text",
        size: "large",
        headline: [{ text: "Bonito sem estratégia é enfeite caro.", tone: "rust" }],
        body: [{ text: "Site que vende é o que guia a pessoa até o \"sim\"." }],
      },
      {
        layout: "text",
        size: "large",
        headline: [{ text: "Antes de pensar em cor e fonte, pensa:" }],
        callout: [{ text: "o que eu quero que a pessoa FAÇA quando entrar aqui?", tone: "blue" }],
      },
      {
        layout: "cta",
        headline: [{ text: "Quer um site feito pra vender, não só pra ser bonito?" }],
        body: [{ text: "Chama no direct.", tone: "blue" }],
      },
    ],
    caption: `"Mas o site não precisa ser bonito?"

Bonito ajuda. Mas bonito sem estratégia é só enfeite caro. Já vi site lindíssimo que não vende nada e site simples que fatura todo dia.

A diferença é clareza, facilidade de comprar e velocidade no celular. Antes de escolher cor e fonte, decida o que você quer que a pessoa faça ao entrar. O resto é detalhe.

Me segue pra mais sobre vender pela internet sem complicar.`,
    hashtags:
      "#criacaodesites #sitequevende #vendasonline #marketingdigital #empreendedorismo #negociosdigitais #pequenosnegocios #presencadigital #webdesign #vendamais #dicasdevendas",
  },
  {
    id: 4,
    title: "15 anos, 5 lições",
    category: "Prova",
    theme: "proof",
    accent: "accent",
    slides: [
      {
        layout: "cover",
        visual: "proof",
        headline: [
          { text: "15 anos construindo negócios na internet." },
          { text: "Brasil e Estados Unidos.", tone: "accent" },
          { text: "5 coisas que aprendi." },
        ],
      },
      {
        layout: "lesson",
        headline: [{ text: "1." }],
        body: [
          { text: "Quem vende mais não é quem trabalha mais." },
          { text: "É quem tem a estrutura certa rodando por trás.", tone: "accent" },
        ],
      },
      {
        layout: "lesson",
        headline: [{ text: "2." }],
        body: [
          { text: "Site bonito não vende sozinho." },
          { text: "Clareza vende. Facilidade vende. Confiança vende.", tone: "accent" },
        ],
      },
      {
        layout: "lesson",
        headline: [{ text: "3." }],
        body: [
          { text: "O cliente não quer esperar." },
          { text: "Quem responde rápido, nem que seja no automático, ganha a venda.", tone: "accent" },
        ],
      },
      {
        layout: "lesson",
        headline: [{ text: "4." }],
        body: [
          { text: "Ferramenta cara não é sinal de bom resultado." },
          { text: "O que importa é como tudo trabalha junto.", tone: "accent" },
        ],
      },
      {
        layout: "lesson",
        headline: [{ text: "5." }],
        body: [
          { text: "Negócio que depende 100% de você não é liberdade." },
          { text: "É um emprego que você mesmo criou.", tone: "accent" },
        ],
      },
      {
        layout: "cta",
        headline: [{ text: "Quero ajudar o seu negócio a parar de depender só de você." }],
        body: [{ text: "Bora conversar? Chama no direct.", tone: "accent" }],
      },
    ],
    caption: `Faz 15 anos que eu construo negócios na internet — no Brasil e nos EUA, de marca grande a quem tá começando.

Se tem uma coisa que esse tempo todo me ensinou: quem cresce não é quem mais se esforça, é quem monta a estrutura certa e deixa ela trabalhar.

Reuni 5 lições nesse carrossel. A número 5 é a que mais dói. Se você se vê nela, me manda um "oi" no direct.

Salva e compartilha com quem tá fazendo tudo sozinho.`,
    hashtags:
      "#empreendedorismo #negociosdigitais #vendasonline #marketingdigital #pequenosnegocios #empreendedorismobrasil #produtividade #dicasdenegocio #liberdadefinanceira #mentoria #vendamais",
  },
  {
    id: 5,
    title: "O negócio para quando você para",
    category: "Dor",
    theme: "pain",
    accent: "accent",
    slides: [
      {
        layout: "cover",
        visual: "holiday",
        headline: [
          { text: "Tira um dia de folga." },
          { text: "As vendas param junto.", tone: "accent" },
          { text: "Isso não é negócio. É um emprego sem chefe." },
        ],
      },
      {
        layout: "list",
        eyebrow: "Você é o",
        bullets: [
          { text: "atendimento" },
          { text: "marketing" },
          { text: "vendedor" },
          { text: "entrega" },
          { text: "financeiro" },
        ],
        callout: [{ text: "Tudo ao mesmo tempo.", tone: "accent" }],
      },
      {
        layout: "text",
        size: "large",
        headline: [{ text: "Funciona até o dia que você cansa, adoece ou só quer descansar." }],
        callout: [{ text: "Aí tudo trava.", tone: "accent" }],
      },
      {
        layout: "text",
        size: "large",
        headline: [{ text: "Negócio de verdade roda mesmo quando o dono não tá." }],
        callout: [{ text: "O seu já consegue fazer isso?", tone: "green" }],
      },
      {
        layout: "text",
        visual: "website",
        headline: [{ text: "A boa notícia: dá pra montar isso aos poucos." }],
        bullets: [
          { text: "atendimento que responde sozinho" },
          { text: "loja que recebe pedido" },
          { text: "site que vende de madrugada" },
        ],
      },
      {
        layout: "cta",
        headline: [{ text: "Quer começar a tirar o negócio das suas costas?" }],
        body: [{ text: "Me chama no direct.", tone: "accent" }],
      },
    ],
    caption: `Faz o teste: tira um dia 100% de folga. As vendas continuam?

Se a resposta for "não", você não tem um negócio — tem um emprego que você mesmo criou, sem férias e sem folga.

Não é sobre trabalhar menos do nada. É sobre montar, aos poucos, uma estrutura que segura as pontas quando você não está: atendimento automático, loja que recebe pedido, site que vende de madrugada.

Quer começar a tirar o peso das suas costas? Me manda um "oi" no direct. Salva pra lembrar disso na próxima folga.`,
    hashtags:
      "#empreendedorismo #pequenosnegocios #produtividade #vendasonline #automacaodevendas #negociosdigitais #qualidadedevida #empreendedorismobrasil #liberdade #dicasdenegocio #vendamais",
  },
  {
    id: 6,
    title: "Catálogo no Insta não é loja",
    category: "Educação",
    theme: "education",
    accent: "blue",
    slides: [
      {
        layout: "cover",
        visual: "catalog",
        headline: [
          { text: "Catálogo no Instagram não é loja." },
          { text: "E isso pode estar travando suas vendas.", tone: "blue" },
        ],
      },
      {
        layout: "steps",
        eyebrow: "No catálogo, o cliente:",
        bullets: [
          { text: "vê o produto" },
          { text: "te chama" },
          { text: "pergunta preço" },
          { text: "espera resposta" },
          { text: "espera o pix" },
          { text: "às vezes desiste no meio" },
        ],
      },
      {
        layout: "steps",
        eyebrow: "Numa loja de verdade, ele:",
        bullets: [
          { text: "vê o produto" },
          { text: "vê o preço" },
          { text: "escolhe" },
          { text: "paga" },
          { text: "pronto" },
        ],
        callout: [{ text: "Sem fila, sem espera, sem você no meio.", tone: "green" }],
      },
      {
        layout: "text",
        size: "large",
        headline: [{ text: "Toda etapa a mais é uma chance de perder a venda.", tone: "rust" }],
        body: [{ text: "Loja boa tira as etapas. E trabalha 24h." }],
      },
      {
        layout: "text",
        visual: "catalog",
        headline: [{ text: "E não precisa ser uma loja gigante." }],
        callout: [{ text: "Uma loja simples, com a sua cara e seus produtos, já muda o jogo.", tone: "blue" }],
      },
      {
        layout: "cta",
        headline: [{ text: "Quer ver sua loja funcionando assim?" }],
        body: [{ text: "Chama no direct que eu te mostro.", tone: "blue" }],
      },
    ],
    caption: `Vender pelo catálogo do Insta dá uma sensação de loja — mas não é.

No catálogo, o cliente precisa te chamar, perguntar preço, esperar resposta, esperar o pix... e cada etapa dessas é uma chance dele desistir.

Numa loja de verdade ele vê, escolhe, paga e pronto. Sem fila e sem depender de você responder na hora. E não precisa ser nada gigante — uma loja simples já muda o jogo.

Quer ver como ficaria pro seu negócio? Me manda um "oi" no direct. Me segue pra mais sobre vender nas redes.`,
    hashtags:
      "#lojavirtual #ecommerce #vendanoinstagram #vendasonline #pequenosnegocios #empreendedorismo #marketingdigital #negociosdigitais #lojaonline #vendapelainternet #vendamais",
  },
  {
    id: 7,
    title: "IA não é robô sem graça",
    category: "Educação",
    theme: "education",
    accent: "green",
    slides: [
      {
        layout: "cover",
        visual: "ai",
        headline: [
          { text: "\"IA no atendimento?\"" },
          { text: "Eu não quero parecer um robô.", tone: "green" },
          { text: "Calma — não é isso." },
        ],
      },
      {
        layout: "text",
        size: "large",
        headline: [{ text: "O medo é real:" }],
        body: [
          { text: "ninguém quer aquele atendimento travado, frio, que responde tudo errado." },
          { text: "Isso afasta cliente.", tone: "rust" },
        ],
      },
      {
        layout: "text",
        visual: "ai",
        headline: [{ text: "Mas IA bem feita é o contrário:" }],
        bullets: [
          { text: "responde na hora" },
          { text: "com o seu jeito de falar" },
          { text: "passa pra você quando precisa de gente" },
        ],
      },
      {
        layout: "text",
        size: "large",
        headline: [{ text: "Imagina:" }],
        body: [
          { text: "cliente manda mensagem às 23h" },
          { text: "e já recebe resposta, tira dúvida, vê o preço — sem você largar o jantar.", tone: "green" },
        ],
      },
      {
        layout: "text",
        size: "large",
        headline: [{ text: "Não é robô no seu lugar." }],
        callout: [{ text: "É um ajudante que atende o básico pra você focar no que importa.", tone: "green" }],
      },
      {
        layout: "cta",
        headline: [{ text: "Quer um atendimento assim, com a sua voz?" }],
        body: [{ text: "Me chama no direct.", tone: "green" }],
      },
    ],
    caption: `"Não quero que meu cliente fale com um robô." Eu entendo — e concordo.

O problema nunca foi a IA. Foi a IA mal feita: fria, travada, respondendo tudo errado. Isso espanta cliente.

IA bem feita é o oposto: responde na hora, com o SEU jeito de falar, e te passa a conversa quando precisa de toque humano. O cliente é atendido às 23h sem você largar o jantar.

Quer ver como fica com a sua cara? Me manda um "oi" no direct. Salva pra quando quiser parar de responder as mesmas perguntas 30x por dia.`,
    hashtags:
      "#inteligenciaartificial #atendimentoaocliente #automacao #vendanowhatsapp #vendasonline #pequenosnegocios #empreendedorismo #marketingdigital #negociosdigitais #chatbot #vendamais",
  },
  {
    id: 9,
    title: "Pedido no caderno, pagamento no print",
    category: "Dor",
    theme: "pain",
    accent: "accent",
    slides: [
      {
        layout: "cover",
        visual: "orders",
        headline: [
          { text: "Pedido no caderno." },
          { text: "Pagamento no print.", tone: "accent" },
          { text: "Controle... na sua cabeça. Vai dar ruim." },
        ],
      },
      {
        layout: "text",
        size: "large",
        headline: [{ text: "Funciona quando são 5 pedidos." }],
        body: [
          { text: "Mas quando começa a vender de verdade?" },
          { text: "Some pedido. Some pagamento. Some cliente.", tone: "accent" },
        ],
      },
      {
        layout: "list",
        eyebrow: "Já passou por isso?",
        bullets: [
          { text: "\"Já te paguei!\"" },
          { text: "\"Cadê meu produto?\"" },
          { text: "\"Você esqueceu do meu pedido?\"" },
        ],
      },
      {
        layout: "text",
        size: "large",
        headline: [{ text: "Cada pedido perdido é dinheiro que saiu e cliente que não volta." }],
        callout: [
          { text: "E a culpa não é sua — é a falta de organização automática.", tone: "accent" },
        ],
      },
      {
        layout: "text",
        visual: "orders",
        headline: [{ text: "Dá pra ter tudo num lugar só:" }],
        bullets: [
          { text: "pedido" },
          { text: "pagamento" },
          { text: "status" },
        ],
        callout: [{ text: "sem caderno, sem print, sem depender da memória.", tone: "green" }],
      },
      {
        layout: "cta",
        headline: [{ text: "Quer organizar seus pedidos sem dor de cabeça?" }],
        body: [{ text: "Me chama no direct.", tone: "accent" }],
      },
    ],
    caption: `Pedido no caderno, comprovante no print, e o resto você guarda "de cabeça".

Funciona com 5 pedidos. Mas quando o negócio cresce, começa o caos: some pedido, some pagamento, cliente cobrando o que já entregou (ou dizendo que pagou sem ter pago).

Isso não é desorganização sua — é falta de um sistema simples que junta pedido, pagamento e status num lugar só.

Quer parar de perder venda por bagunça? Me manda um "oi" no direct. Salva pra quando a correria apertar.`,
    hashtags:
      "#gestao #pequenosnegocios #vendasonline #empreendedorismo #organizacao #lojavirtual #vendanoinstagram #negociosdigitais #produtividade #empreendedorismobrasil #vendamais",
  },
];

const reelMarkdown = `# Post 8 — Reel: antes x depois

Duração alvo: ~25 segundos.

## Gancho (0–2s)

Texto grande na tela:

\`\`\`text
Tirei o catálogo do story e botei numa loja de verdade. Olha o que mudou:
\`\`\`

## Cena 1 — Antes (2–10s)

Imagem: gravação de tela do jeito antigo — produtos no story, várias mensagens no WhatsApp ("qual o valor?", "tem disponível?").

Texto na tela:

\`\`\`text
ANTES: tudo no story + zap
\`\`\`

Narração/legenda:

\`\`\`text
Cliente perguntando preço o dia todo. Eu respondendo um por um. Venda travando.
\`\`\`

## Cena 2 — Depois (10–18s)

Imagem: gravação de tela da loja/mini-site — produto com foto, preço, botão de comprar, pedido caindo.

Texto na tela:

\`\`\`text
DEPOIS: loja que vende sozinha
\`\`\`

Narração/legenda:

\`\`\`text
Agora o cliente vê, escolhe e paga. Sem me chamar, sem esperar. A qualquer hora.
\`\`\`

## Cena 3 — Fechamento (18–25s)

Imagem: você falando pra câmera ou só texto na tela.

Texto na tela:

\`\`\`text
Não precisa ser gigante. Uma loja simples já muda tudo.
\`\`\`

CTA na tela:

\`\`\`text
Quer a sua? Me chama no direct.
\`\`\`

Áudio: use um áudio em alta da semana no próprio Instagram. Melhor algo calmo/satisfatório, com clima de antes e depois.

## Legenda

Cansei de responder "qual o valor?" o dia inteiro.

Então tirei meus produtos do story e botei numa loja simples: o cliente vê, escolhe e paga sozinho — a qualquer hora, sem depender de eu responder.

Não precisa ser uma loja gigante. A simples já resolve a maior parte. Se você vende pelo story e pelo zap e quer parar de ser o "atendente" do próprio negócio, me manda um "oi" no direct.

## Hashtags

#lojavirtual #vendasonline #vendanoinstagram #ecommerce #pequenosnegocios #empreendedorismo #vendanowhatsapp #negociosdigitais #antesedepois #vendamais

## Checklist de gravação

- Usar tela real da loja ou uma demo sua.
- Usar print real de WhatsApp, com nomes e dados borrados.
- Evitar tela falsa demais: prova real vale mais que efeito bonito.
- Manter cortes rápidos e legíveis.
`;

function assetSrc(assetName: AssetName) {
  const absolutePath = path.join(projectRoot, assetPaths[assetName]);

  return path.relative(scriptDir, absolutePath).split(path.sep).join("/");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;");
}

function postSlug(postId: number) {
  return `post-${String(postId).padStart(2, "0")}`;
}

function coverBackgroundSrc(post: CarouselPost) {
  return `assets/backgrounds/${postSlug(post.id)}-bg.png`;
}

function renderBrand(post: CarouselPost, slideNumber: number) {
  return `
    <div class="brand">
      <span>Jonatas Santos</span>
      <span>Web para negócios</span>
    </div>
    <div class="slide-count">${String(slideNumber).padStart(2, "0")}/${String(post.slides.length).padStart(2, "0")}</div>
  `;
}

function renderLine(line: RichLine, className = "") {
  const tone = line.tone ?? "default";

  return `<span class="${className} tone-${tone}">${escapeHtml(line.text)}</span>`;
}

function renderLines(lines: RichLine[] | undefined, className: string) {
  if (!lines?.length) {
    return "";
  }

  return `<div class="${className}">${lines.map((line) => renderLine(line, `${className}-line`)).join("")}</div>`;
}

function renderBullets(lines: RichLine[] | undefined, mode: "bullets" | "steps" = "bullets") {
  if (!lines?.length) {
    return "";
  }

  return `
    <div class="${mode}">
      ${lines
        .map((line, index) => {
          const marker = mode === "steps" ? String(index + 1) : "•";

          return `
            <div class="${mode}-row">
              <span class="${mode}-marker">${marker}</span>
              ${renderLine(line, `${mode}-text`)}
            </div>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderLogo(assetName: AssetName, label: string) {
  return `
    <div class="logo-tile">
      <img src="${assetSrc(assetName)}" alt="${escapeHtml(label)}" />
    </div>
  `;
}

function renderProofStrip() {
  return `
    <div class="proof-strip">
      <p>Marcas no caminho</p>
      <div class="logo-row">
        ${renderLogo("calvinKlein", "Calvin Klein")}
        ${renderLogo("walmart", "Walmart")}
        ${renderLogo("havaianas", "Havaianas")}
        ${renderLogo("riachuelo", "Riachuelo")}
        ${renderLogo("cea", "C&A")}
      </div>
    </div>
  `;
}

function renderVisual(visual: Visual | undefined, theme: Theme) {
  if (!visual) {
    return "";
  }

  if (visual === "linkBio") {
    return `
      <div class="visual visual-link-bio" aria-hidden="true">
        <div class="phone-shell">
          <div class="phone-pill"></div>
          <div class="mini-avatar"></div>
          <div class="bio-button stale"></div>
          <div class="bio-button"></div>
          <div class="bio-button"></div>
          <div class="bio-button muted-button"></div>
        </div>
        <div class="lost-cursor"></div>
      </div>
    `;
  }

  if (visual === "website") {
    return `
      <div class="visual visual-website" aria-hidden="true">
        <div class="browser-frame">
          <div class="browser-top"><span></span><span></span><span></span></div>
          <div class="browser-hero"></div>
          <div class="browser-copy short"></div>
          <div class="browser-copy"></div>
          <div class="browser-button"></div>
        </div>
        <img src="${assetSrc("sites")}" alt="" />
      </div>
    `;
  }

  if (visual === "proof") {
    return `
      <div class="visual visual-proof" aria-hidden="true">
        <div class="avatar-frame">
          <img src="${assetSrc("avatar")}" alt="" />
        </div>
        ${renderProofStrip()}
      </div>
    `;
  }

  if (visual === "lessons") {
    return `
      <div class="visual visual-lessons" aria-hidden="true">
        ${[1, 2, 3, 4, 5].map((item) => `<div class="lesson-chip">${item}</div>`).join("")}
      </div>
    `;
  }

  if (visual === "holiday") {
    return `
      <div class="visual visual-holiday" aria-hidden="true">
        <div class="closed-sign"></div>
        <div class="desk-line"></div>
        <div class="empty-chair"></div>
        <div class="notification-stack">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
  }

  if (visual === "catalog") {
    return `
      <div class="visual visual-catalog" aria-hidden="true">
        <div class="social-grid">
          <span></span><span></span><span></span><span></span>
        </div>
        <div class="shop-panel">
          <div></div><div></div><div></div>
        </div>
      </div>
    `;
  }

  if (visual === "ai") {
    return `
      <div class="visual visual-ai" aria-hidden="true">
        <img src="${assetSrc("whatsapp")}" alt="" />
        <div class="ai-bubbles">
          <span></span><span></span><span></span><span></span>
        </div>
      </div>
    `;
  }

  if (visual === "orders") {
    return `
      <div class="visual visual-orders ${theme === "pain" ? "visual-orders-dark" : ""}" aria-hidden="true">
        <div class="notebook">
          <span></span><span></span><span></span><span></span>
        </div>
        <div class="receipt"></div>
        <div class="payment-proof"></div>
      </div>
    `;
  }

  return "";
}

function renderSlide(post: CarouselPost, slide: Slide, slideIndex: number) {
  const slideNumber = slideIndex + 1;
  const slideId = `${postSlug(post.id)}-slide-${String(slideNumber).padStart(2, "0")}`;
  const hasPhotoBackground = slide.layout === "cover";
  const visualHtml = renderVisual(slide.visual, post.theme);

  return `
    <section
      aria-label="Post ${post.id}, slide ${slideNumber}"
      class="slide theme-${post.theme} accent-${post.accent} layout-${slide.layout} size-${slide.size ?? "regular"} ${hasPhotoBackground ? "has-photo-bg" : ""}"
      id="${slideId}"
    >
      ${hasPhotoBackground ? `<img class="photo-bg" src="${coverBackgroundSrc(post)}" alt="" />` : ""}
      ${hasPhotoBackground ? "<div class=\"photo-overlay\"></div>" : ""}
      ${renderBrand(post, slideNumber)}
      <div class="slide-content">
        ${slide.eyebrow ? `<p class="eyebrow">${escapeHtml(slide.eyebrow)}</p>` : ""}
        ${renderLines(slide.headline, "headline")}
        ${renderLines(slide.body, "body-copy")}
        ${slide.layout === "steps" ? renderBullets(slide.bullets, "steps") : renderBullets(slide.bullets)}
        ${renderLines(slide.callout, "callout")}
        ${slide.footer ? `<div class="footer-pill">${escapeHtml(slide.footer)}</div>` : ""}
      </div>
      ${visualHtml}
    </section>
  `;
}

function renderHtml() {
  const postSections = carouselPosts
    .map(
      (post) => `
        <section class="post-preview">
          <div class="post-heading">
            <p>Post ${String(post.id).padStart(2, "0")}</p>
            <h2>${escapeHtml(post.title)}</h2>
          </div>
          <div class="slides-grid">
            ${post.slides.map((slide, index) => renderSlide(post, slide, index)).join("")}
          </div>
        </section>
      `
    )
    .join("");

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Posts 02–09 · Grade Instagram</title>
    <style>
      :root {
        --cream: #f7f0e4;
        --white: #ffffff;
        --navy: #003144;
        --navy-dark: #011a24;
        --orange: #ff8000;
        --peach: #ffb359;
        --blue: #007ba1;
        --green: #159a0f;
        --rust: #914a33;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background: #101820;
        color: var(--cream);
        font-family: Inter, "Avenir Next", "Helvetica Neue", Arial, sans-serif;
      }

      .preview-shell {
        display: grid;
        gap: 64px;
        padding: 48px;
      }

      .index-header {
        max-width: 1080px;
      }

      .index-header p {
        margin: 0 0 12px;
        color: rgb(247 240 228 / 72%);
        font-size: 22px;
        font-weight: 700;
      }

      .index-header h1 {
        margin: 0;
        font-size: 54px;
        line-height: 1.05;
      }

      .post-preview {
        display: grid;
        gap: 24px;
      }

      .post-heading {
        max-width: 1080px;
      }

      .post-heading p,
      .post-heading h2 {
        margin: 0;
        letter-spacing: 0;
      }

      .post-heading p {
        color: var(--peach);
        font-size: 22px;
        font-weight: 800;
      }

      .post-heading h2 {
        margin-top: 6px;
        font-size: 34px;
        line-height: 1.1;
      }

      .slides-grid {
        display: grid;
        gap: 36px;
        justify-items: start;
      }

      .slide {
        position: relative;
        width: 1080px;
        height: 1350px;
        overflow: hidden;
        padding: 88px;
        background: var(--cream);
        color: var(--navy);
      }

      .slide::after {
        position: absolute;
        inset: 32px;
        z-index: 30;
        border: 2px solid rgb(0 49 68 / 12%);
        content: "";
        pointer-events: none;
      }

      .theme-pain,
      .theme-proof.layout-cover {
        background: var(--navy-dark);
        color: var(--cream);
      }

      .theme-pain::after,
      .theme-proof.layout-cover::after {
        border-color: rgb(247 240 228 / 22%);
      }

      .theme-education {
        background:
          linear-gradient(180deg, rgb(0 123 161 / 8%), rgb(247 240 228 / 0) 34%),
          var(--cream);
      }

      .theme-education.layout-cover {
        background:
          linear-gradient(180deg, rgb(255 179 89 / 22%), rgb(247 240 228 / 0) 34%),
          var(--cream);
      }

      .theme-proof:not(.layout-cover) {
        background:
          linear-gradient(180deg, rgb(255 179 89 / 24%), rgb(247 240 228 / 0) 34%),
          var(--cream);
      }

      .layout-cover.has-photo-bg {
        background: var(--navy-dark);
        color: var(--cream);
      }

      .layout-cover.has-photo-bg::after {
        border-color: rgb(247 240 228 / 22%);
      }

      .photo-bg {
        position: absolute;
        inset: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        filter: saturate(1.06) contrast(1.04) brightness(1.12);
      }

      .photo-overlay {
        position: absolute;
        inset: 0;
        z-index: 1;
        background:
          linear-gradient(90deg, rgb(1 26 36 / 82%) 0%, rgb(1 26 36 / 56%) 44%, rgb(1 26 36 / 6%) 100%),
          linear-gradient(180deg, rgb(1 26 36 / 16%) 0%, rgb(1 26 36 / 0%) 46%, rgb(1 26 36 / 34%) 100%);
      }

      .brand,
      .slide-count {
        position: absolute;
        top: 46px;
        z-index: 35;
        display: flex;
        align-items: center;
        gap: 14px;
        color: rgb(0 49 68 / 72%);
        font-size: 22px;
        font-weight: 800;
        letter-spacing: 0;
      }

      .brand {
        left: 88px;
      }

      .brand span + span {
        border-left: 2px solid currentcolor;
        padding-left: 14px;
        opacity: 0.58;
      }

      .slide-count {
        right: 88px;
      }

      .theme-pain .brand,
      .theme-pain .slide-count,
      .theme-proof.layout-cover .brand,
      .theme-proof.layout-cover .slide-count {
        color: rgb(247 240 228 / 80%);
      }

      .layout-cover.has-photo-bg .brand,
      .layout-cover.has-photo-bg .slide-count {
        color: rgb(247 240 228 / 80%);
      }

      .slide-content {
        position: relative;
        z-index: 10;
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: center;
      }

      .layout-cover .slide-content {
        max-width: 820px;
        justify-content: center;
        padding-bottom: 58px;
      }

      .layout-cover.has-photo-bg .slide-content {
        max-width: 700px;
      }

      .layout-text .slide-content,
      .layout-list .slide-content,
      .layout-steps .slide-content,
      .layout-lesson .slide-content {
        padding-top: 82px;
      }

      .layout-cta .slide-content {
        justify-content: center;
      }

      .eyebrow {
        margin: 0 0 32px;
        color: var(--blue);
        font-size: 38px;
        font-weight: 950;
        line-height: 1.1;
      }

      .theme-pain .eyebrow {
        color: var(--peach);
      }

      .headline,
      .body-copy,
      .callout {
        display: grid;
        gap: 20px;
      }

      .layout-cover.has-photo-bg .headline {
        max-width: 700px;
      }

      .headline-line {
        display: block;
        font-size: 74px;
        font-weight: 950;
        line-height: 1.03;
        letter-spacing: 0;
      }

      .size-large .headline-line {
        font-size: 82px;
      }

      .size-compact .headline-line {
        font-size: 62px;
      }

      .layout-cover .headline-line {
        font-size: 72px;
        text-shadow: 0 4px 28px rgb(1 26 36 / 58%);
      }

      .theme-education.layout-cover .headline-line {
        text-shadow: none;
      }

      .layout-cover.has-photo-bg .headline-line {
        font-size: 68px;
        text-shadow: 0 4px 28px rgb(1 26 36 / 58%);
      }

      .layout-lesson .headline-line {
        color: var(--orange);
        font-size: 170px;
        line-height: 0.86;
      }

      .body-copy {
        margin-top: 42px;
      }

      .body-copy-line,
      .callout-line {
        display: block;
        max-width: 900px;
        font-size: 44px;
        font-weight: 820;
        line-height: 1.17;
      }

      .layout-lesson .body-copy-line {
        font-size: 58px;
        font-weight: 900;
        line-height: 1.1;
      }

      .callout {
        margin-top: 54px;
        padding-top: 34px;
        border-top: 8px solid var(--orange);
      }

      .layout-cta .callout,
      .layout-cover .callout {
        border-top: 0;
        padding-top: 0;
      }

      .tone-default {
        color: currentcolor;
      }

      .tone-accent {
        color: var(--orange);
      }

      .tone-blue {
        color: var(--blue);
      }

      .tone-green {
        color: var(--green);
      }

      .tone-rust {
        color: var(--rust);
      }

      .layout-cover.has-photo-bg .tone-accent {
        color: var(--peach);
      }

      .layout-cover.has-photo-bg .tone-blue {
        color: #89c8ff;
      }

      .layout-cover.has-photo-bg .tone-green {
        color: #8ee986;
      }

      .layout-cover.has-photo-bg .tone-rust {
        color: var(--peach);
      }

      .tone-muted {
        color: rgb(0 49 68 / 70%);
      }

      .theme-pain .tone-muted,
      .theme-proof.layout-cover .tone-muted,
      .layout-cover.has-photo-bg .tone-muted {
        color: rgb(247 240 228 / 70%);
      }

      .tone-cream {
        color: var(--cream);
      }

      .bullets,
      .steps {
        display: grid;
        gap: 22px;
        margin-top: 52px;
      }

      .bullets-row,
      .steps-row {
        display: grid;
        grid-template-columns: 68px 1fr;
        align-items: center;
        gap: 24px;
        min-height: 82px;
        border-bottom: 2px solid rgb(0 49 68 / 13%);
      }

      .theme-pain .bullets-row,
      .theme-pain .steps-row {
        border-bottom-color: rgb(247 240 228 / 18%);
      }

      .bullets-marker,
      .steps-marker {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        background: var(--orange);
        border-radius: 8px;
        color: var(--navy-dark);
        font-size: 24px;
        font-weight: 950;
      }

      .bullets-marker {
        border-radius: 50%;
        color: transparent;
      }

      .bullets-text,
      .steps-text {
        display: block;
        font-size: 46px;
        font-weight: 900;
        line-height: 1.08;
      }

      .steps-row {
        grid-template-columns: 78px 1fr;
        min-height: 74px;
      }

      .steps-marker {
        width: 58px;
        height: 58px;
        font-size: 28px;
      }

      .steps-text {
        font-size: 39px;
      }

      .footer-pill {
        position: absolute;
        bottom: 0;
        left: 0;
        display: inline-flex;
        align-items: center;
        min-height: 78px;
        padding: 0 28px;
        background: var(--orange);
        border-radius: 8px;
        color: var(--navy-dark);
        font-size: 32px;
        font-weight: 950;
      }

      .layout-cta .headline {
        max-width: 900px;
      }

      .layout-cta .headline-line {
        font-size: 74px;
      }

      .layout-cta .body-copy {
        width: min(100%, 850px);
        margin-top: 64px;
        padding: 42px;
        background: var(--white);
        border: 2px solid rgb(0 49 68 / 12%);
        border-radius: 8px;
      }

      .theme-pain.layout-cta .body-copy {
        background: rgb(247 240 228 / 96%);
        color: var(--navy-dark);
      }

      .layout-cta .body-copy-line {
        font-size: 58px;
        font-weight: 950;
      }

      .visual {
        position: absolute;
        z-index: 4;
        pointer-events: none;
      }

      .layout-text .visual,
      .layout-list .visual,
      .layout-steps .visual {
        opacity: 0.34;
      }

      .layout-cover.has-photo-bg .visual {
        display: none;
      }

      .visual-link-bio {
        right: 34px;
        bottom: 66px;
        width: 300px;
        height: 474px;
        opacity: 0.7;
      }

      .phone-shell {
        position: absolute;
        inset: 0;
        padding: 58px 34px;
        background: rgb(247 240 228 / 94%);
        border: 10px solid rgb(1 26 36 / 76%);
        border-radius: 34px;
        box-shadow: 0 32px 70px rgb(1 26 36 / 38%);
      }

      .phone-pill {
        position: absolute;
        top: 22px;
        left: 50%;
        width: 84px;
        height: 12px;
        background: rgb(1 26 36 / 28%);
        border-radius: 8px;
        transform: translateX(-50%);
      }

      .mini-avatar {
        width: 82px;
        height: 82px;
        margin: 0 auto 34px;
        background: var(--orange);
        border-radius: 50%;
      }

      .bio-button {
        width: 100%;
        height: 58px;
        margin-top: 18px;
        background: rgb(0 123 161 / 18%);
        border: 2px solid rgb(0 49 68 / 18%);
        border-radius: 8px;
      }

      .bio-button.stale {
        background: rgb(145 74 51 / 20%);
      }

      .bio-button.muted-button {
        opacity: 0.45;
      }

      .lost-cursor {
        position: absolute;
        right: -20px;
        bottom: 108px;
        width: 88px;
        height: 88px;
        background: var(--orange);
        clip-path: polygon(0 0, 100% 46%, 56% 58%, 44% 100%);
      }

      .visual-website {
        right: 58px;
        bottom: 76px;
        width: 390px;
        height: 410px;
      }

      .browser-frame {
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 2;
        width: 360px;
        height: 280px;
        padding: 44px 24px 24px;
        background: var(--white);
        border: 2px solid rgb(0 49 68 / 14%);
        border-radius: 8px;
        box-shadow: 0 24px 70px rgb(0 49 68 / 14%);
      }

      .browser-top {
        position: absolute;
        top: 18px;
        left: 22px;
        display: flex;
        gap: 8px;
      }

      .browser-top span {
        width: 12px;
        height: 12px;
        background: var(--orange);
        border-radius: 50%;
      }

      .browser-hero {
        height: 86px;
        background: rgb(0 123 161 / 16%);
        border-radius: 8px;
      }

      .browser-copy {
        width: 78%;
        height: 18px;
        margin-top: 20px;
        background: rgb(0 49 68 / 18%);
        border-radius: 8px;
      }

      .browser-copy.short {
        width: 52%;
      }

      .browser-button {
        width: 140px;
        height: 44px;
        margin-top: 22px;
        background: var(--orange);
        border-radius: 8px;
      }

      .visual-website img {
        position: absolute;
        left: 0;
        top: 0;
        width: 196px;
        height: 246px;
        object-fit: cover;
        border-radius: 8px;
        box-shadow: 0 18px 46px rgb(0 49 68 / 18%);
      }

      .theme-education.layout-cover .visual {
        right: 64px;
        bottom: 84px;
        width: 390px;
        height: 390px;
        opacity: 1;
      }

      .theme-education.layout-cover .visual-website img,
      .theme-education.layout-cover .visual-ai img {
        display: none;
      }

      .theme-education.layout-cover .browser-frame,
      .theme-education.layout-cover .shop-panel,
      .theme-education.layout-cover .ai-bubbles span {
        box-shadow: none;
      }

      .theme-education.layout-cover .browser-frame {
        right: 0;
        bottom: 0;
        width: 284px;
        height: 238px;
        padding: 44px 24px 24px;
        background: var(--white);
        border-color: rgb(0 49 68 / 14%);
      }

      .theme-education.layout-cover .visual-website::before,
      .theme-education.layout-cover .visual-website::after {
        position: absolute;
        border: 2px solid rgb(0 49 68 / 12%);
        border-radius: 8px;
        content: "";
      }

      .theme-education.layout-cover .visual-website::before {
        left: 8px;
        top: 26px;
        width: 210px;
        height: 300px;
        background: rgb(246 232 232 / 78%);
        transform: rotate(-5deg);
      }

      .theme-education.layout-cover .visual-website::after {
        left: 40px;
        top: 78px;
        width: 170px;
        height: 118px;
        background: rgb(0 123 161 / 16%);
        transform: rotate(-5deg);
      }

      .theme-education.layout-cover .browser-hero {
        height: 56px;
        background: rgb(47 101 179 / 18%);
      }

      .theme-education.layout-cover .browser-button {
        height: 48px;
      }

      .visual-proof {
        right: 76px;
        bottom: 94px;
        left: 76px;
        display: grid;
        grid-template-columns: 260px 1fr;
        gap: 30px;
        align-items: end;
      }

      .avatar-frame {
        width: 260px;
        height: 260px;
        overflow: hidden;
        background: var(--orange);
        border: 8px solid var(--orange);
        border-radius: 50%;
      }

      .avatar-frame img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .proof-strip {
        min-width: 0;
      }

      .proof-strip p {
        margin: 0 0 16px;
        color: rgb(247 240 228 / 74%);
        font-size: 24px;
        font-weight: 850;
      }

      .logo-row {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 10px;
      }

      .logo-tile {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 92px;
        padding: 14px;
        background: rgb(247 240 228 / 94%);
        border-radius: 8px;
      }

      .logo-tile img {
        max-width: 100%;
        max-height: 58px;
        object-fit: contain;
      }

      .visual-holiday {
        right: 56px;
        bottom: 88px;
        width: 360px;
        height: 360px;
        opacity: 0.72;
      }

      .closed-sign {
        position: absolute;
        top: 20px;
        left: 78px;
        width: 184px;
        height: 94px;
        border: 6px solid var(--orange);
        border-radius: 8px;
        transform: rotate(-5deg);
      }

      .desk-line {
        position: absolute;
        right: 0;
        bottom: 78px;
        left: 0;
        height: 10px;
        background: rgb(247 240 228 / 62%);
        border-radius: 8px;
      }

      .empty-chair {
        position: absolute;
        right: 94px;
        bottom: 90px;
        width: 120px;
        height: 140px;
        border: 12px solid rgb(247 240 228 / 78%);
        border-bottom: 0;
        border-radius: 8px 8px 0 0;
      }

      .notification-stack {
        position: absolute;
        right: 0;
        top: 110px;
        display: grid;
        gap: 16px;
      }

      .notification-stack span {
        display: block;
        width: 170px;
        height: 42px;
        background: rgb(255 128 0 / 70%);
        border-radius: 8px;
      }

      .visual-catalog {
        right: 76px;
        bottom: 106px;
        width: 390px;
        height: 390px;
      }

      .social-grid {
        position: absolute;
        left: 0;
        top: 0;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 14px;
        width: 238px;
      }

      .social-grid span {
        display: block;
        height: 110px;
        background: rgb(0 123 161 / 16%);
        border: 2px solid rgb(0 49 68 / 12%);
        border-radius: 8px;
      }

      .shop-panel {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 270px;
        height: 250px;
        padding: 26px;
        background: var(--white);
        border: 2px solid rgb(0 49 68 / 12%);
        border-radius: 8px;
        box-shadow: 0 20px 54px rgb(0 49 68 / 14%);
      }

      .shop-panel div {
        height: 42px;
        margin-bottom: 22px;
        background: var(--orange);
        border-radius: 8px;
      }

      .shop-panel div:nth-child(2) {
        width: 70%;
        background: rgb(0 49 68 / 16%);
      }

      .shop-panel div:nth-child(3) {
        width: 88%;
        background: var(--green);
      }

      .theme-education.layout-cover .visual-catalog {
        right: 64px;
        bottom: 84px;
      }

      .theme-education.layout-cover .social-grid {
        left: 0;
        top: 0;
        width: 210px;
        transform: rotate(-4deg);
      }

      .theme-education.layout-cover .social-grid span {
        height: 104px;
        background: rgb(0 123 161 / 12%);
        border-color: rgb(0 49 68 / 12%);
      }

      .theme-education.layout-cover .shop-panel {
        width: 284px;
        height: 238px;
        background: var(--white);
      }

      .theme-education.layout-cover .shop-panel div:first-child {
        background: var(--orange);
      }

      .theme-education.layout-cover .shop-panel div:nth-child(2) {
        background: rgb(0 49 68 / 14%);
      }

      .theme-education.layout-cover .shop-panel div:nth-child(3) {
        background: var(--green);
      }

      .visual-ai {
        right: 62px;
        bottom: 86px;
        width: 360px;
        height: 420px;
      }

      .visual-ai img {
        position: absolute;
        inset: 0;
        width: 260px;
        height: 326px;
        object-fit: cover;
        border-radius: 8px;
        opacity: 0.92;
      }

      .ai-bubbles {
        position: absolute;
        right: 0;
        bottom: 0;
        display: grid;
        gap: 16px;
      }

      .ai-bubbles span {
        display: block;
        width: 230px;
        height: 56px;
        background: var(--white);
        border: 2px solid rgb(0 49 68 / 12%);
        border-radius: 8px;
        box-shadow: 0 14px 32px rgb(0 49 68 / 12%);
      }

      .ai-bubbles span:nth-child(2),
      .ai-bubbles span:nth-child(4) {
        margin-left: 46px;
        background: rgb(21 154 15 / 16%);
      }

      .theme-education.layout-cover .visual-ai::before {
        position: absolute;
        left: 0;
        top: 28px;
        width: 220px;
        height: 310px;
        background: rgb(21 154 15 / 13%);
        border: 2px solid rgb(0 49 68 / 12%);
        border-radius: 8px;
        content: "";
        transform: rotate(-4deg);
      }

      .theme-education.layout-cover .visual-ai::after {
        position: absolute;
        left: 58px;
        top: 76px;
        width: 120px;
        height: 120px;
        background: rgb(255 128 0 / 18%);
        border-radius: 50%;
        content: "";
      }

      .theme-education.layout-cover .ai-bubbles {
        right: 0;
        bottom: 0;
        z-index: 2;
      }

      .theme-education.layout-cover .ai-bubbles span {
        width: 250px;
        height: 58px;
        background: var(--white);
        border-color: rgb(0 49 68 / 12%);
      }

      .theme-education.layout-cover .ai-bubbles span:nth-child(2),
      .theme-education.layout-cover .ai-bubbles span:nth-child(4) {
        background: rgb(21 154 15 / 16%);
      }

      .visual-orders {
        right: 44px;
        bottom: 84px;
        width: 390px;
        height: 360px;
      }

      .notebook {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 244px;
        height: 286px;
        padding: 42px 28px;
        background: var(--white);
        border: 2px solid rgb(0 49 68 / 14%);
        border-radius: 8px;
        transform: rotate(-4deg);
      }

      .visual-orders-dark .notebook {
        background: rgb(247 240 228 / 94%);
      }

      .notebook span {
        display: block;
        height: 20px;
        margin-bottom: 26px;
        background: rgb(0 49 68 / 18%);
        border-radius: 8px;
      }

      .receipt,
      .payment-proof {
        position: absolute;
        right: 0;
        background: var(--orange);
        border-radius: 8px;
        box-shadow: 0 22px 54px rgb(1 26 36 / 20%);
      }

      .receipt {
        top: 42px;
        width: 198px;
        height: 130px;
      }

      .payment-proof {
        right: 40px;
        bottom: 52px;
        width: 190px;
        height: 112px;
        background: rgb(0 123 161 / 86%);
      }
    </style>
  </head>
  <body>
    <main class="preview-shell">
      <header class="index-header">
        <p>Grade Instagram · Posts 02–09</p>
        <h1>Carrosséis e roteiro de Reel para vender mais sem depender do celular.</h1>
      </header>
      ${postSections}
    </main>
  </body>
</html>`;
}

function renderPanelHtml() {
  const gridItems = [
    {
      href: "../vendas-insta-whatsapp/out/slide-01.png",
      image: "../vendas-insta-whatsapp/out/slide-01.png",
      marker: "fixed",
      text: "Site, loja e automação pra quem vende nas redes — começa aqui",
    },
    {
      href: "out/post-02/slide-01.png",
      image: "out/post-02/slide-01.png",
      marker: "pain",
      text: "\"Tá no link da bio\" — e o cliente some no caminho?",
    },
    {
      href: "out/post-03/slide-01.png",
      image: "out/post-03/slide-01.png",
      marker: "education",
      text: "Não precisa de site bonito. Precisa de um que vende",
    },
    {
      href: "out/post-04/slide-01.png",
      image: "out/post-04/slide-01.png",
      marker: "proof",
      text: "15 anos construindo na internet. Brasil + EUA",
    },
    {
      href: "out/post-05/slide-01.png",
      image: "out/post-05/slide-01.png",
      marker: "pain",
      text: "Seu negócio não pode parar quando você para",
    },
    {
      href: "out/post-06/slide-01.png",
      image: "out/post-06/slide-01.png",
      marker: "education",
      text: "Link da bio não é loja. Veja a diferença que faz",
    },
    {
      href: "out/post-07/slide-01.png",
      image: "out/post-07/slide-01.png",
      marker: "education",
      text: "IA no atendimento não é robô — responde com a sua voz",
    },
    {
      href: "reel/post-08-roteiro.md",
      image: "out/post-08/cover.png",
      marker: "proof",
      text: "Antes: catálogo no story. Depois: loja vendendo sozinha",
    },
    {
      href: "out/post-09/slide-01.png",
      image: "out/post-09/slide-01.png",
      marker: "pain",
      text: "Pedido no caderno, pagamento no print, controle na cabeça?",
    },
  ];

  const highlights = ["Como funciona", "O que faço", "Resultados", "Quem sou eu"];
  const legendItems = [
    { marker: "fixed", label: "Fixado / boas-vindas" },
    { marker: "pain", label: "Dor" },
    { marker: "proof", label: "Prova / autoridade" },
    { marker: "education", label: "Educação" },
  ];

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Painel da grade · jonatas.web</title>
    <style>
      :root {
        --screen: #f5f3ec;
        --line: #bdbdb9;
        --soft-line: #dad9d2;
        --ink: #111111;
        --muted: #3d3b37;
        --blue: #2f65b3;
        --blue-bg: #d7e6f6;
        --proof-bg: #d6e6f8;
        --proof-text: #2f65b3;
        --pain-bg: #f6e8e8;
        --pain-text: #8a2e2e;
        --education-bg: #e9f4df;
        --education-text: #24661f;
        --fixed-bg: #f2f1ea;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background: var(--screen);
        color: var(--ink);
        font-family: Inter, "Avenir Next", "Helvetica Neue", Arial, sans-serif;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      .panel-page {
        display: grid;
        justify-items: center;
        min-height: 100vh;
        padding: 40px 24px 28px;
      }

      .phone {
        width: 720px;
        overflow: hidden;
        background: #ffffff;
        border: 2px solid var(--line);
        border-radius: 24px;
      }

      .top-bar {
        display: grid;
        grid-template-columns: 80px 1fr 80px;
        align-items: center;
        height: 90px;
        border-bottom: 1px solid var(--soft-line);
      }

      .top-icon {
        width: 28px;
        height: 28px;
        margin: 0 auto;
        border: 4px solid var(--ink);
      }

      .username {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        font-size: 30px;
        font-weight: 850;
        letter-spacing: 0;
      }

      .verified {
        width: 20px;
        height: 20px;
        border: 3px solid var(--blue);
      }

      .profile {
        padding: 32px 28px 26px;
      }

      .profile-row {
        display: grid;
        grid-template-columns: 180px 1fr;
        align-items: center;
        gap: 28px;
      }

      .avatar {
        display: grid;
        place-items: center;
        width: 148px;
        height: 148px;
        margin: 0 auto;
        background: #d4e3f7;
        border-radius: 50%;
        color: var(--blue);
        font-size: 46px;
        font-weight: 850;
      }

      .stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        text-align: center;
      }

      .stat strong {
        display: block;
        font-size: 34px;
        line-height: 1;
      }

      .stat span {
        display: block;
        margin-top: 8px;
        color: var(--muted);
        font-size: 25px;
        line-height: 1.08;
      }

      .bio {
        margin-top: 28px;
        font-size: 27px;
        line-height: 1.36;
      }

      .bio strong,
      .bio span,
      .bio a {
        display: block;
      }

      .bio strong {
        font-size: 29px;
        line-height: 1.18;
      }

      .bio .muted {
        color: var(--muted);
      }

      .bio a {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-top: 14px;
        color: var(--blue);
      }

      .bio a::before {
        width: 19px;
        height: 19px;
        border: 3px solid currentcolor;
        content: "";
      }

      .profile-actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-top: 28px;
      }

      .profile-actions button {
        height: 64px;
        background: #ffffff;
        border: 2px solid var(--line);
        border-radius: 16px;
        color: var(--ink);
        font: inherit;
        font-size: 27px;
      }

      .profile-actions button:first-child {
        background: #d5e5f7;
        border-color: #d5e5f7;
        color: var(--blue);
        font-weight: 800;
      }

      .highlights {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 18px;
        margin-top: 36px;
        text-align: center;
      }

      .highlight {
        display: grid;
        justify-items: center;
        gap: 12px;
        min-width: 0;
      }

      .highlight-icon {
        display: grid;
        place-items: center;
        width: 112px;
        height: 112px;
        border: 2px solid var(--line);
        border-radius: 50%;
        background: var(--screen);
      }

      .highlight-icon::before {
        width: 28px;
        height: 28px;
        border: 4px solid #4b4a45;
        content: "";
      }

      .highlight span {
        font-size: 23px;
        line-height: 1.12;
      }

      .tabs {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        height: 86px;
        border-top: 1px solid var(--soft-line);
        border-bottom: 1px solid var(--soft-line);
      }

      .tab {
        position: relative;
        display: grid;
        place-items: center;
      }

      .tab:first-child::before {
        position: absolute;
        top: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--ink);
        content: "";
      }

      .tab-icon {
        width: 28px;
        height: 28px;
        border: 4px solid currentcolor;
      }

      .tab:nth-child(2),
      .tab:nth-child(3) {
        color: #77756e;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 3px;
        background: #ffffff;
      }

      .tile {
        position: relative;
        display: grid;
        place-items: center;
        aspect-ratio: 4 / 5;
        overflow: hidden;
        background: var(--fixed-bg);
        text-align: center;
      }

      .tile img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .tile-label {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
      }

      .tile::before {
        position: absolute;
        inset: 0;
        border: 1px solid rgb(0 0 0 / 8%);
        content: "";
        pointer-events: none;
      }

      .tile:hover img {
        transform: scale(1.025);
      }

      .tile img {
        transition: transform 180ms ease;
      }

      .tile span {
        max-width: 190px;
        font-size: 23px;
        font-weight: 850;
        line-height: 1.22;
        letter-spacing: 0;
      }

      .tile::after {
        position: absolute;
        top: 18px;
        right: 18px;
        width: 19px;
        height: 19px;
        border: 3px solid currentcolor;
        background: rgb(255 255 255 / 62%);
        content: "";
      }

      .tile-fixed {
        color: var(--ink);
      }

      .tile-pain {
        color: var(--pain-text);
      }

      .tile-proof {
        color: var(--proof-text);
      }

      .tile-education {
        color: var(--education-text);
      }

      .legacy-tile {
        min-height: 238px;
        padding: 30px 22px;
        text-align: center;
      }

      .legacy-tile span {
        max-width: 190px;
        font-size: 23px;
        font-weight: 850;
        line-height: 1.22;
        letter-spacing: 0;
      }

      .legacy-tile::after {
        position: absolute;
        top: 18px;
        right: 26px;
        width: 19px;
        height: 19px;
        border: 3px solid currentcolor;
        content: "";
      }

      .legacy-tile.tile-fixed {
        background: var(--fixed-bg);
        color: var(--ink);
      }

      .legacy-tile.tile-pain {
        background: var(--pain-bg);
        color: var(--pain-text);
      }

      .legacy-tile.tile-proof {
        background: var(--proof-bg);
        color: var(--proof-text);
      }

      .legacy-tile.tile-education {
        background: var(--education-bg);
        color: var(--education-text);
      }

      .legend {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 22px;
        width: min(900px, 100%);
        margin-top: 18px;
        color: #3b3934;
        font-size: 23px;
      }

      .legend-item {
        display: inline-flex;
        align-items: center;
        gap: 12px;
      }

      .legend-dot {
        width: 20px;
        height: 20px;
        border-radius: 6px;
      }

      .legend-dot-fixed {
        background: var(--ink);
      }

      .legend-dot-pain {
        background: var(--pain-text);
      }

      .legend-dot-proof {
        background: var(--proof-text);
      }

      .legend-dot-education {
        background: var(--education-text);
      }

      @media (max-width: 780px) {
        .panel-page {
          align-items: start;
          padding: 0;
        }

        .phone,
        .legend {
          width: 100%;
          border-right: 0;
          border-left: 0;
          border-radius: 0;
        }

        .profile-row {
          grid-template-columns: 140px 1fr;
        }

        .avatar {
          width: 116px;
          height: 116px;
          font-size: 38px;
        }

        .tile {
          aspect-ratio: 4 / 5;
        }

        .legacy-tile {
          min-height: 190px;
          padding: 24px 14px;
        }

        .legacy-tile span {
          font-size: 19px;
        }
      }
    </style>
  </head>
  <body>
    <main class="panel-page">
      <section class="phone" aria-label="Painel visual da grade do Instagram">
        <header class="top-bar">
          <div class="top-icon" aria-hidden="true"></div>
          <div class="username">
            <span>jonatas.web</span>
            <span class="verified" aria-hidden="true"></span>
          </div>
          <div class="top-icon" aria-hidden="true"></div>
        </header>

        <section class="profile">
          <div class="profile-row">
            <div class="avatar" aria-label="Avatar JR">JR</div>
            <div class="stats">
              <div class="stat"><strong>9</strong><span>posts</span></div>
              <div class="stat"><strong>86</strong><span>seguidores</span></div>
              <div class="stat"><strong>153</strong><span>seguindo</span></div>
            </div>
          </div>

          <div class="bio">
            <strong>Jonatas · sites, lojas e automação</strong>
            <span class="muted">Web pra quem vende no Insta e no WhatsApp</span>
            <br />
            <span>Ajudo quem vende nas redes a vender mais sem viver grudado no celular.</span>
            <span>Sites · apps · loja online · automação com IA</span>
            <span>15 anos · Brasil + EUA</span>
            <a href="https://jonatassantos.com">jonatassantos.com</a>
          </div>

          <div class="profile-actions" aria-label="Ações do perfil">
            <button type="button">Seguir</button>
            <button type="button">Mensagem</button>
          </div>

          <div class="highlights" aria-label="Destaques">
            ${highlights
              .map(
                (highlight) => `
                  <div class="highlight">
                    <div class="highlight-icon" aria-hidden="true"></div>
                    <span>${escapeHtml(highlight)}</span>
                  </div>
                `
              )
              .join("")}
          </div>
        </section>

        <nav class="tabs" aria-label="Abas do perfil">
          <div class="tab"><span class="tab-icon" aria-hidden="true"></span></div>
          <div class="tab"><span class="tab-icon" aria-hidden="true"></span></div>
          <div class="tab"><span class="tab-icon" aria-hidden="true"></span></div>
        </nav>

        <section class="grid" aria-label="Grade de posts">
          ${gridItems
            .map(
              (item) => `
                <a class="tile tile-${item.marker}" href="${item.href}" aria-label="${escapeHtml(item.text)}">
                  <img src="${item.image}" alt="" />
                  <span class="tile-label">${escapeHtml(item.text)}</span>
                </a>
              `
            )
            .join("")}
        </section>
      </section>

      <aside class="legend" aria-label="Legenda da grade">
        ${legendItems
          .map(
            (item) => `
              <div class="legend-item">
                <span class="legend-dot legend-dot-${item.marker}" aria-hidden="true"></span>
                <span>${escapeHtml(item.label)}</span>
              </div>
            `
          )
          .join("")}
      </aside>
    </main>
  </body>
</html>`;
}

function renderReelCoverHtml() {
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font-family: Inter, "Avenir Next", "Helvetica Neue", Arial, sans-serif;
      }

      .reel-cover {
        position: relative;
        width: 1080px;
        height: 1350px;
        overflow: hidden;
        padding: 88px;
        background: #011a24;
        color: #f7f0e4;
      }

      .reel-cover::after {
        position: absolute;
        inset: 32px;
        z-index: 4;
        border: 2px solid rgb(247 240 228 / 22%);
        content: "";
        pointer-events: none;
      }

      .photo-bg {
        position: absolute;
        inset: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        filter: saturate(1.06) contrast(1.04) brightness(1.12);
      }

      .photo-overlay {
        position: absolute;
        inset: 0;
        z-index: 1;
        background:
          linear-gradient(90deg, rgb(1 26 36 / 82%) 0%, rgb(1 26 36 / 56%) 44%, rgb(1 26 36 / 6%) 100%),
          linear-gradient(180deg, rgb(1 26 36 / 16%) 0%, rgb(1 26 36 / 0%) 46%, rgb(1 26 36 / 34%) 100%);
      }

      .brand,
      .slide-count {
        position: absolute;
        top: 46px;
        z-index: 3;
        display: flex;
        align-items: center;
        gap: 14px;
        color: rgb(247 240 228 / 80%);
        font-size: 22px;
        font-weight: 800;
      }

      .brand {
        left: 88px;
      }

      .brand span + span {
        border-left: 2px solid currentcolor;
        padding-left: 14px;
        opacity: 0.58;
      }

      .slide-count {
        right: 88px;
      }

      .content {
        position: relative;
        z-index: 2;
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        max-width: 850px;
      }

      h1,
      p {
        margin: 0;
        letter-spacing: 0;
      }

      h1 {
        font-size: 78px;
        font-weight: 950;
        line-height: 1.03;
      }

      .blue {
        color: #89c8ff;
      }

      .orange {
        color: #ffb359;
      }

      .tag {
        width: fit-content;
        margin-bottom: 34px;
        padding: 14px 20px;
        background: rgb(247 240 228 / 12%);
        border: 2px solid rgb(247 240 228 / 18%);
        border-radius: 8px;
        color: #f7f0e4;
        font-size: 28px;
        font-weight: 900;
      }

      .before-after {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 18px;
        width: 520px;
        margin-top: 62px;
      }

      .mini-card {
        min-height: 170px;
        padding: 22px;
        border: 2px solid rgb(247 240 228 / 18%);
        border-radius: 8px;
        font-size: 28px;
        font-weight: 900;
        line-height: 1.08;
      }

      .mini-card:first-child {
        background: rgb(247 240 228 / 10%);
        color: #f7f0e4;
      }

      .mini-card:last-child {
        background: rgb(137 200 255 / 14%);
        color: #89c8ff;
      }

      .visual {
        display: none;
      }

      .story,
      .shop {
        position: absolute;
        border-radius: 8px;
        box-shadow: 0 24px 64px rgb(0 49 68 / 16%);
      }

      .story {
        left: 0;
        top: 0;
        width: 210px;
        height: 300px;
        background: #f6e8e8;
        border: 2px solid rgb(138 46 46 / 18%);
        transform: rotate(-5deg);
      }

      .shop {
        right: 0;
        bottom: 0;
        width: 284px;
        height: 238px;
        padding: 28px;
        background: #ffffff;
        border: 2px solid rgb(0 49 68 / 14%);
      }

      .shop span,
      .story span {
        display: block;
        height: 22px;
        margin-bottom: 20px;
        background: rgb(0 49 68 / 16%);
        border-radius: 8px;
      }

      .shop span:first-child {
        height: 56px;
        background: rgb(47 101 179 / 18%);
      }

      .shop span:last-child {
        width: 150px;
        height: 48px;
        background: #ff8000;
      }

      .story span:first-child {
        height: 120px;
        background: rgb(138 46 46 / 16%);
      }
    </style>
  </head>
  <body>
    <section class="reel-cover" id="reel-cover" aria-label="Capa do Reel Post 08">
      <img class="photo-bg" src="assets/backgrounds/post-08-bg.png" alt="" />
      <div class="photo-overlay"></div>
      <div class="brand">
        <span>Jonatas Santos</span>
        <span>Web para negócios</span>
      </div>
      <div class="slide-count">REEL</div>
      <div class="content">
        <p class="tag">Antes x depois</p>
        <h1>
          Tirei o catálogo do story.
          <br />
          <span class="blue">Botei numa loja de verdade.</span>
          <br />
          <span class="orange">Olha o que mudou.</span>
        </h1>
        <div class="before-after">
          <div class="mini-card">ANTES:<br />story + zap</div>
          <div class="mini-card">DEPOIS:<br />loja vendendo sozinha</div>
        </div>
      </div>
      <div class="visual" aria-hidden="true">
        <div class="story"><span></span><span></span><span></span></div>
        <div class="shop"><span></span><span></span><span></span><span></span></div>
      </div>
    </section>
  </body>
</html>`;
}

function renderReadme() {
  const postList = carouselPosts
    .map((post) => `- Post ${String(post.id).padStart(2, "0")} · ${post.category}: ${post.title} (${post.slides.length} slides)`)
    .join("\n");

  return `# Posts 02–09 · Grade Instagram

Pacote com 7 carrosséis renderizados em PNG e 1 roteiro de Reel.

## Arquivos

- \`index.html\`: prévia navegável de todos os carrosséis.
- \`panel.html\`: painel estilo perfil do Instagram para visualizar a grade.
- \`out/panel-preview.png\`: imagem rápida do painel.
- \`out/post-XX/slide-YY.png\`: imagens prontas para postagem.
- \`out/post-08/cover.png\`: capa 4:5 do Reel para visualizar na grade.
- \`assets/backgrounds/post-XX-bg.png\`: backgrounds realistas finais, em 2160x2700.
- \`assets/backgrounds/raw/post-XX-bg.png\`: imagens brutas geradas antes do crop/resample.
- \`captions/post-XX.txt\`: legenda e hashtags de cada carrossel.
- \`reel/post-08-roteiro.md\`: roteiro, legenda, hashtags e checklist do Reel.
- \`render-posts.mts\`: fonte TypeScript para editar copy, cor e layout.

## Posts

${postList}
- Post 08 · Prova: antes x depois (Reel)

## Ordem sugerida

Depois do post fixado:

1. Post 02 · Dor · Tá no link da bio
2. Post 03 · Educação · Site bonito x site que vende
3. Post 04 · Prova · 15 anos, 5 lições
4. Post 05 · Dor · O negócio para quando você para
5. Post 06 · Educação · Catálogo no Insta não é loja
6. Post 07 · Educação · IA não é robô sem graça
7. Post 08 · Prova · Antes x depois (Reel)
8. Post 09 · Dor · Pedido no caderno, pagamento no print

Ritmo recomendado: 2 a 3 publicações por semana.

## Regras de legibilidade aplicadas

- Capas usam background realista escuro, com overlay e coluna segura de texto.
- Elementos decorativos ficam com baixa opacidade quando se aproximam da copy.
- Chamadas principais ficam direto sobre a imagem, sem card pesado.
- Slides internos mantêm ilustrações no canto inferior direito e texto em área limpa.

## Gerar novamente

\`\`\`bash
node --experimental-strip-types docs/instagram-carousel/posts-02-09/render-posts.mts
\`\`\`

Ordem sugerida: alternar dor, educação e prova para manter variedade visual e narrativa na grade.
`;
}

async function writeSources() {
  await mkdir(outputDir, { recursive: true });
  await mkdir(captionsDir, { recursive: true });
  await mkdir(reelDir, { recursive: true });
  await writeFile(path.join(scriptDir, "index.html"), renderHtml(), "utf8");
  await writeFile(path.join(scriptDir, "panel.html"), renderPanelHtml(), "utf8");
  await writeFile(path.join(scriptDir, "README.md"), renderReadme(), "utf8");
  await writeFile(path.join(reelDir, "post-08-roteiro.md"), reelMarkdown, "utf8");

  await Promise.all(
    carouselPosts.map((post) =>
      writeFile(path.join(captionsDir, `${postSlug(post.id)}.txt`), `${post.caption}\n\n${post.hashtags}\n`, "utf8")
    )
  );
}

async function renderSlides() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    deviceScaleFactor: 1,
    viewport: {
      width: 1080,
      height: 1350,
    },
  });

  await page.goto(pathToFileURL(path.join(scriptDir, "index.html")).href);
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() =>
    Promise.all(
      Array.from(document.images).map((image) => {
        if (image.complete) {
          return undefined;
        }

        return new Promise((resolve) => {
          image.onload = resolve;
          image.onerror = resolve;
        });
      })
    )
  );
  await page.addStyleTag({
    content: `
      .preview-shell,
      .post-preview,
      .slides-grid {
        gap: 0 !important;
        padding: 0 !important;
      }

      .index-header,
      .post-heading {
        display: none !important;
      }
    `,
  });

  for (const post of carouselPosts) {
    const postOutputDir = path.join(outputDir, postSlug(post.id));
    await mkdir(postOutputDir, { recursive: true });

    for (let slide = 1; slide <= post.slides.length; slide += 1) {
      await page.locator(`#${postSlug(post.id)}-slide-${String(slide).padStart(2, "0")}`).screenshot({
        animations: "disabled",
        path: path.join(postOutputDir, `slide-${String(slide).padStart(2, "0")}.png`),
      });
    }
  }

  const reelOutputDir = path.join(outputDir, "post-08");
  await mkdir(reelOutputDir, { recursive: true });
  await page.setViewportSize({
    width: 1080,
    height: 1350,
  });
  await page.setContent(renderReelCoverHtml());
  await page.evaluate(() => document.fonts.ready);
  await page.locator("#reel-cover").screenshot({
    animations: "disabled",
    path: path.join(reelOutputDir, "cover.png"),
  });

  await page.setViewportSize({
    width: 1280,
    height: 1900,
  });
  await page.goto(pathToFileURL(path.join(scriptDir, "panel.html")).href);
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() =>
    Promise.all(
      Array.from(document.images).map((image) => {
        if (image.complete) {
          return undefined;
        }

        return new Promise((resolve) => {
          image.onload = resolve;
          image.onerror = resolve;
        });
      })
    )
  );
  await page.locator(".panel-page").screenshot({
    animations: "disabled",
    path: path.join(outputDir, "panel-preview.png"),
  });

  await browser.close();
}

async function main() {
  await writeSources();
  await renderSlides();

  console.log(`Generated posts in ${scriptDir}`);
}

await main();
