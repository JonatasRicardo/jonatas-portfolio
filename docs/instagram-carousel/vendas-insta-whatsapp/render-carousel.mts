import { chromium } from "@playwright/test"
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

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
  | "cea"

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(scriptDir, "../../..")
const outputDir = path.join(scriptDir, "out")

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
} satisfies Record<AssetName, string>

const colors = {
  cream: "#f7f0e4",
  white: "#ffffff",
  navy: "#003144",
  navyDark: "#011a24",
  orange: "#ff8000",
  peach: "#ffb359",
  blue: "#007ba1",
  green: "#159a0f",
  rust: "#914a33",
}

const caption = `Se você vende pelo Insta ou pelo WhatsApp, talvez já tenha sentido isso: o negócio só anda quando VOCÊ empurra.

Você atende, posta, fecha venda, organiza entrega... e quando vê, o dia acabou e você continua no mesmo lugar.

Faz 15 anos que eu construo negócios na internet: site, loja, app e automação com IA. E o que eu mais vejo é gente boa travada por falta de estrutura, não por falta de esforço.

A boa notícia: dá pra montar um negócio que roda com menos você. Que atende, vende e organiza no automático, do seu jeito.

Se isso fez sentido, me manda um "oi" aqui no direct. Atendo poucos negócios por mês, então a conversa é tranquila e sem enrolação.

Salva esse post e me segue se você vende nas redes e quer vender mais sem viver grudado no celular.

#vendasonline #vendanowhatsapp #vendanoinstagram #pequenosnegocios #empreendedorismo #lojavirtual #marketingdigital #automacaodevendas #inteligenciaartificial #negociosdigitais #empreendedorismobrasil #sitequevende #presencadigital
`

function assetSrc(assetName: AssetName) {
  const absolutePath = path.join(projectRoot, assetPaths[assetName])

  return path.relative(scriptDir, absolutePath).split(path.sep).join("/")
}

function renderBrand(currentSlide: number) {
  return `
    <div class="brand">
      <span>Jonatas Santos</span>
      <span>Web para negócios</span>
    </div>
    <div class="slide-count">${String(currentSlide).padStart(2, "0")}/07</div>
  `
}

function renderLogo(assetName: AssetName, name: string) {
  return `
    <div class="logo-tile">
      <img src="${assetSrc(assetName)}" alt="${name}" />
    </div>
  `
}

function renderServiceCard(assetName: AssetName, title: string, description: string) {
  return `
    <article class="service-card">
      <div class="service-image">
        <img src="${assetSrc(assetName)}" alt="" />
      </div>
      <div>
        <h3>${title}</h3>
        <p>${description}</p>
      </div>
    </article>
  `
}

const html = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Carrossel Instagram - Vendas Insta WhatsApp</title>
    <style>
      :root {
        --cream: ${colors.cream};
        --white: ${colors.white};
        --navy: ${colors.navy};
        --navy-dark: ${colors.navyDark};
        --orange: ${colors.orange};
        --peach: ${colors.peach};
        --blue: ${colors.blue};
        --green: ${colors.green};
        --rust: ${colors.rust};
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background: #101820;
        color: var(--navy);
        font-family:
          Inter,
          Avenir Next,
          Helvetica Neue,
          Arial,
          sans-serif;
      }

      .preview {
        display: grid;
        gap: 48px;
        justify-items: center;
        padding: 48px;
      }

      .slide {
        position: relative;
        width: 1080px;
        height: 1350px;
        overflow: hidden;
        background: var(--cream);
        color: var(--navy);
        padding: 88px;
      }

      .slide::after {
        position: absolute;
        inset: 32px;
        border: 2px solid rgb(0 49 68 / 12%);
        content: "";
        pointer-events: none;
      }

      .cover::after,
      .dark::after,
      .cta::after {
        border-color: rgb(247 240 228 / 24%);
      }

      .brand,
      .slide-count {
        position: absolute;
        top: 46px;
        z-index: 10;
        display: flex;
        align-items: center;
        gap: 14px;
        color: rgb(0 49 68 / 72%);
        font-size: 22px;
        font-weight: 700;
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

      .cover .brand,
      .cover .slide-count,
      .dark .brand,
      .dark .slide-count,
      .cta .brand,
      .cta .slide-count {
        color: rgb(247 240 228 / 78%);
      }

      .accent-bar {
        width: 112px;
        height: 12px;
        margin-bottom: 40px;
        background: var(--orange);
        border-radius: 8px;
      }

      .eyebrow {
        margin: 0 0 24px;
        color: var(--blue);
        font-size: 34px;
        font-weight: 800;
        line-height: 1.12;
        letter-spacing: 0;
      }

      h1,
      h2,
      h3,
      p {
        margin: 0;
        letter-spacing: 0;
      }

      h1 {
        font-size: 86px;
        font-weight: 900;
        line-height: 1.03;
      }

      h2 {
        font-size: 60px;
        font-weight: 900;
        line-height: 1.06;
      }

      p {
        font-size: 38px;
        font-weight: 650;
        line-height: 1.24;
      }

      .muted {
        opacity: 0.76;
      }

      .orange {
        color: var(--orange);
      }

      .green {
        color: var(--green);
      }

      .blue {
        color: var(--blue);
      }

      .cream {
        color: var(--cream);
      }

      .cover {
        background: var(--navy-dark);
        color: var(--cream);
      }

      .cover::before {
        position: absolute;
        inset: 0;
        z-index: 1;
        background:
          linear-gradient(90deg, rgb(1 26 36 / 94%) 0%, rgb(1 26 36 / 84%) 42%, rgb(1 26 36 / 52%) 72%, rgb(1 26 36 / 40%) 100%),
          linear-gradient(180deg, rgb(1 26 36 / 62%) 0%, rgb(1 26 36 / 16%) 46%, rgb(1 26 36 / 84%) 100%);
        content: "";
      }

      .cover-bg {
        position: absolute;
        inset: 0;
        z-index: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        filter: saturate(1.05) contrast(1.04);
      }

      .cover .cover-content {
        position: relative;
        z-index: 2;
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        padding-bottom: 46px;
      }

      .cover h1 {
        max-width: 890px;
        font-size: 78px;
        text-shadow: 0 4px 24px rgb(1 26 36 / 34%);
      }

      .cover h1 strong {
        color: var(--peach);
        font-weight: 900;
      }

      .cover .aside-note {
        max-width: 720px;
        margin-top: 46px;
        color: rgb(247 240 228 / 78%);
        font-size: 46px;
        font-weight: 760;
        line-height: 1.14;
        text-shadow: 0 3px 18px rgb(1 26 36 / 42%);
      }

      .drag {
        position: absolute;
        bottom: 88px;
        left: 88px;
        z-index: 5;
        display: inline-flex;
        align-items: center;
        min-height: 78px;
        padding: 0 28px;
        background: var(--orange);
        border-radius: 8px;
        color: var(--navy-dark);
        font-size: 32px;
        font-weight: 900;
      }

      .cover-shape {
        position: absolute;
        right: -176px;
        bottom: -154px;
        z-index: 1;
        width: 560px;
        height: 560px;
        border: 86px solid rgb(255 128 0 / 16%);
        border-radius: 50%;
      }

      .light-layout {
        position: relative;
        z-index: 2;
        display: flex;
        height: 100%;
        flex-direction: column;
        padding-top: 96px;
      }

      .task-list {
        display: grid;
        gap: 22px;
        margin-top: 56px;
      }

      .task-row {
        display: grid;
        grid-template-columns: 38px 1fr;
        align-items: center;
        gap: 24px;
        min-height: 76px;
        border-bottom: 2px solid rgb(0 49 68 / 12%);
        font-size: 45px;
        font-weight: 820;
        line-height: 1.05;
      }

      .task-dot {
        width: 22px;
        height: 22px;
        background: var(--orange);
        border-radius: 50%;
      }

      .alone {
        margin-top: auto;
        color: var(--rust);
        font-size: 94px;
        font-weight: 950;
        line-height: 0.96;
      }

      .truth-grid {
        display: grid;
        gap: 36px;
        margin-top: 54px;
      }

      .truth-callout {
        padding: 36px 38px;
        background: var(--navy);
        border-radius: 8px;
        color: var(--cream);
      }

      .truth-callout p {
        font-size: 48px;
        font-weight: 900;
        line-height: 1.08;
      }

      .closing-line {
        margin-top: 50px;
        padding-top: 34px;
        border-top: 8px solid var(--orange);
        font-size: 45px;
        font-weight: 860;
        line-height: 1.15;
      }

      .service-slide h1 {
        font-size: 68px;
      }

      .service-intro {
        max-width: 820px;
        margin-top: 22px;
        font-size: 34px;
      }

      .service-grid {
        display: grid;
        gap: 18px;
        margin-top: 32px;
      }

      .service-card {
        display: grid;
        grid-template-columns: 136px 1fr;
        gap: 24px;
        align-items: center;
        min-height: 164px;
        padding: 18px 20px;
        background: var(--white);
        border: 2px solid rgb(0 49 68 / 13%);
        border-radius: 8px;
      }

      .service-image {
        width: 136px;
        height: 126px;
        overflow: hidden;
        background: rgb(255 179 89 / 22%);
        border-radius: 8px;
      }

      .service-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center top;
      }

      .service-card h3 {
        margin-bottom: 8px;
        color: var(--blue);
        font-size: 31px;
        font-weight: 900;
        line-height: 1.08;
      }

      .service-card p {
        font-size: 30px;
        font-weight: 720;
        line-height: 1.14;
      }

      .choice {
        margin-top: auto;
        color: var(--rust);
        font-size: 39px;
        font-weight: 900;
      }

      .profile-layout {
        position: relative;
        z-index: 2;
        display: grid;
        height: 100%;
        grid-template-rows: auto auto 1fr auto;
        padding-top: 86px;
      }

      .profile-header {
        display: grid;
        grid-template-columns: 292px 1fr;
        gap: 42px;
        align-items: center;
      }

      .avatar-frame {
        width: 292px;
        height: 292px;
        overflow: hidden;
        background: #e9e1d5;
        border: 8px solid var(--orange);
        border-radius: 50%;
      }

      .avatar-frame img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .profile-header h1 {
        font-size: 76px;
      }

      .profile-copy {
        display: grid;
        gap: 28px;
        margin-top: 48px;
      }

      .profile-copy p {
        font-size: 37px;
        line-height: 1.22;
      }

      .years {
        display: inline-flex;
        width: fit-content;
        align-items: baseline;
        gap: 16px;
        color: var(--orange);
      }

      .years strong {
        font-size: 96px;
        font-weight: 950;
        line-height: 0.9;
      }

      .proof {
        margin-top: auto;
      }

      .proof p {
        margin-bottom: 18px;
        color: rgb(0 49 68 / 74%);
        font-size: 27px;
        font-weight: 800;
      }

      .logo-row {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 12px;
      }

      .logo-tile {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 116px;
        padding: 18px;
        background: var(--white);
        border: 2px solid rgb(0 49 68 / 12%);
        border-radius: 8px;
      }

      .logo-tile img {
        max-width: 100%;
        max-height: 76px;
        object-fit: contain;
      }

      .steps {
        display: grid;
        gap: 20px;
        margin-top: 44px;
      }

      .step {
        display: grid;
        grid-template-columns: 76px 1fr;
        gap: 22px;
        align-items: start;
      }

      .step-number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 76px;
        height: 76px;
        background: var(--orange);
        border-radius: 8px;
        color: var(--navy-dark);
        font-size: 34px;
        font-weight: 950;
      }

      .step h3 {
        margin-bottom: 6px;
        font-size: 34px;
        font-weight: 950;
      }

      .step p {
        color: rgb(0 49 68 / 78%);
        font-size: 29px;
        font-weight: 690;
        line-height: 1.18;
      }

      .guarantee {
        margin-top: auto;
        padding: 36px;
        background: var(--navy);
        border-radius: 8px;
        color: var(--cream);
      }

      .guarantee p {
        font-size: 39px;
        font-weight: 850;
        line-height: 1.12;
      }

      .guarantee strong {
        color: var(--peach);
        font-size: 55px;
        font-weight: 950;
      }

      .cta {
        background: var(--orange);
        color: var(--navy-dark);
      }

      .cta .light-layout {
        justify-content: center;
      }

      .cta h1 {
        max-width: 850px;
        color: var(--navy-dark);
        font-size: 88px;
      }

      .direct-box {
        margin-top: 72px;
        padding: 42px;
        background: var(--cream);
        border-radius: 8px;
      }

      .direct-box p {
        color: var(--navy-dark);
        font-size: 53px;
        font-weight: 920;
        line-height: 1.08;
      }

      .oi {
        display: inline-block;
        margin-top: 14px;
        color: var(--blue);
        font-size: 104px;
        font-weight: 950;
        line-height: 1;
      }

      .cta-footer {
        margin-top: 54px;
        color: rgb(1 26 36 / 84%);
        font-size: 38px;
        font-weight: 850;
        line-height: 1.16;
      }

      .arrow {
        display: inline-block;
        margin-left: 12px;
        color: var(--cream);
      }
    </style>
  </head>
  <body>
    <main class="preview">
      <section class="slide cover" id="slide-1" aria-label="Slide 1">
        <img class="cover-bg" src="${assetSrc("coverBackground")}" alt="" />
        ${renderBrand(1)}
        <div class="cover-content">
          <div class="accent-bar"></div>
          <h1>
            Você vende pelo Insta e pelo WhatsApp.
            <br /><br />
            Mas o negócio inteiro <strong>depende de você.</strong>
          </h1>
          <p class="aside-note">(e isso tá te esgotando, né?)</p>
        </div>
        <div class="drag">arrasta →</div>
        <div class="cover-shape" aria-hidden="true"></div>
      </section>

      <section class="slide" id="slide-2" aria-label="Slide 2">
        ${renderBrand(2)}
        <div class="light-layout">
          <p class="eyebrow">No dia a dia, você faz tudo.</p>
          <div class="task-list">
            <div class="task-row"><span class="task-dot"></span><span>Responde mensagem.</span></div>
            <div class="task-row"><span class="task-dot"></span><span>Cria conteúdo.</span></div>
            <div class="task-row"><span class="task-dot"></span><span>Corre atrás do cliente.</span></div>
            <div class="task-row"><span class="task-dot"></span><span>Fecha a venda.</span></div>
            <div class="task-row"><span class="task-dot"></span><span>Cuida da entrega.</span></div>
            <div class="task-row"><span class="task-dot"></span><span>E ainda tenta ter uma vida.</span></div>
          </div>
          <h1 class="alone">Tudo isso.<br />Sozinho.</h1>
        </div>
      </section>

      <section class="slide" id="slide-3" aria-label="Slide 3">
        ${renderBrand(3)}
        <div class="light-layout">
          <div class="accent-bar"></div>
          <h1>
            O problema não é você trabalhar pouco.
            <br /><br />
            É que <span class="orange">nada acontece sem você.</span>
          </h1>
          <div class="truth-grid">
            <div class="truth-callout">
              <p>Você some por um dia e as vendas param.</p>
            </div>
          </div>
          <p class="closing-line">
            A internet devia trabalhar <span class="green">pra você</span>.
            <br />
            Não te deixar ainda mais preso.
          </p>
        </div>
      </section>

      <section class="slide service-slide" id="slide-4" aria-label="Slide 4">
        ${renderBrand(4)}
        <div class="light-layout">
          <p class="eyebrow">É aí que eu entro.</p>
          <h1>Eu construo a estrutura que falta no seu negócio.</h1>
          <p class="service-intro muted">Você não precisa começar por tudo. Precisa começar pelo que destrava venda.</p>
          <div class="service-grid">
            ${renderServiceCard("sites", "Site que vende", "Atrai, convence e vende até enquanto você dorme.")}
            ${renderServiceCard(
              "strategy",
              "Loja ou catálogo",
              "Organiza pedidos e deixa o cliente comprar sem depender do improviso."
            )}
            ${renderServiceCard(
              "sites",
              "App para o negócio",
              "Dá cara de gente grande e melhora a experiência de quem compra."
            )}
            ${renderServiceCard("whatsapp", "Atendimento com IA", "Responde 24h, com a sua voz e do seu jeito.")}
          </div>
          <p class="choice">Você escolhe por onde começar.</p>
        </div>
      </section>

      <section class="slide" id="slide-5" aria-label="Slide 5">
        ${renderBrand(5)}
        <div class="profile-layout">
          <div class="profile-header">
            <div class="avatar-frame">
              <img src="${assetSrc("avatar")}" alt="Foto de rosto de Jonatas Santos" />
            </div>
            <h1>Eu sou o Jonatas.</h1>
          </div>
          <div class="profile-copy">
            <p class="years"><strong>15</strong><span>anos construindo negócios na internet.</span></p>
            <p>No Brasil e nos Estados Unidos, criando site, loja, app e automação para negócio vender melhor.</p>
            <p><span class="orange">Sem complicação.</span> Sem papo técnico. Só resultado.</p>
          </div>
          <div></div>
          <div class="proof">
            <p>Marcas com as quais já trabalhei</p>
            <div class="logo-row">
              ${renderLogo("calvinKlein", "Calvin Klein")}
              ${renderLogo("walmart", "Walmart")}
              ${renderLogo("havaianas", "Havaianas")}
              ${renderLogo("riachuelo", "Riachuelo")}
              ${renderLogo("cea", "C&A")}
            </div>
          </div>
        </div>
      </section>

      <section class="slide" id="slide-6" aria-label="Slide 6">
        ${renderBrand(6)}
        <div class="light-layout">
          <div class="accent-bar"></div>
          <h1>Como funciona?</h1>
          <div class="steps">
            <article class="step">
              <div class="step-number">1</div>
              <div>
                <h3>Conversa de 15 minutos.</h3>
                <p>Sem compromisso. Eu entendo seu negócio, seus gargalos e onde a internet pode ajudar primeiro.</p>
              </div>
            </article>
            <article class="step">
              <div class="step-number">2</div>
              <div>
                <h3>Você enxerga o caminho.</h3>
                <p>Te mostro o que dá pra fazer: site, loja, app, WhatsApp com IA ou uma automação simples.</p>
              </div>
            </article>
            <article class="step">
              <div class="step-number">3</div>
              <div>
                <h3>A gente constrói junto.</h3>
                <p>Com entrega clara, linguagem simples e foco no que muda a rotina do seu negócio.</p>
              </div>
            </article>
          </div>
          <div class="guarantee">
            <p>
              E se a gente trabalhar junto e não rolar?
              <br />
              <strong>Devolvo 100%.</strong>
              <br />
              Sem pergunta, sem burocracia.
            </p>
          </div>
        </div>
      </section>

      <section class="slide cta" id="slide-7" aria-label="Slide 7">
        ${renderBrand(7)}
        <div class="light-layout">
          <h1>Cansou de fazer tudo sozinho?</h1>
          <div class="direct-box">
            <p>Me manda um</p>
            <span class="oi">"oi"</span>
            <p>aqui no direct.</p>
          </div>
          <p class="cta-footer">
            Atendo poucos negócios por mês, pra fazer bem feito.
            <br />
            Bora conversar?<span class="arrow">→</span>
          </p>
        </div>
      </section>
    </main>
  </body>
</html>
`

const readme = `# Carrossel Instagram: Vendas pelo Insta e WhatsApp

Formato: 7 slides em 1080x1350 px, pensados para feed/carrossel do Instagram.

## Arquivos

- \`index.html\`: prévia navegável dos slides.
- \`out/slide-01.png\` até \`out/slide-07.png\`: imagens prontas para postagem.
- \`assets/background-instagram-whatsapp-1080x1350.png\`: imagem gerada usada como fundo da capa.
- \`caption.txt\`: legenda e hashtags.
- \`render-carousel.mts\`: fonte TypeScript para alterar texto, cor, imagem ou marcas.

## Gerar novamente

\`\`\`bash
node --experimental-strip-types docs/instagram-carousel/vendas-insta-whatsapp/render-carousel.mts
\`\`\`

As cores e imagens vêm da página de consultoria do portfólio para manter a identidade visual.
`

async function writeSources() {
  await mkdir(outputDir, { recursive: true })
  await writeFile(path.join(scriptDir, "index.html"), html, "utf8")
  await writeFile(path.join(scriptDir, "caption.txt"), caption, "utf8")
  await writeFile(path.join(scriptDir, "README.md"), readme, "utf8")
}

async function renderSlides() {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({
    deviceScaleFactor: 1,
    viewport: {
      width: 1080,
      height: 1350,
    },
  })

  await page.goto(pathToFileURL(path.join(scriptDir, "index.html")).href)
  await page.evaluate(() => document.fonts.ready)

  for (let slide = 1; slide <= 7; slide += 1) {
    await page.locator(`#slide-${slide}`).screenshot({
      animations: "disabled",
      path: path.join(outputDir, `slide-${String(slide).padStart(2, "0")}.png`),
    })
  }

  await browser.close()
}

async function main() {
  await writeSources()
  await renderSlides()

  console.log(`Generated carousel in ${scriptDir}`)
}

await main()
