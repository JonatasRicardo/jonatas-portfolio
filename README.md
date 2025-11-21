
## Jonatas Portfolio

Personal portfolio built with Next.js 15, Tailwind CSS 4, and TypeScript. It includes Markdown-based blog posts, a resume page, reusable components with Storybook, a complete test setup (unit and E2E), and helpful integrations for developer productivity.

### Tech stack
- **Next.js 15** (App Router)
- **React 19** and **TypeScript**
- **Tailwind CSS 4**
- **Vitest** + **Testing Library** for unit tests
- **Playwright** for E2E tests
- **Storybook 8** for component docs
- **Radix UI** and **CVA** for UI foundations

### Requirements
- Node.js >= 20
- pnpm (recommended via Corepack)

Enable Corepack and install dependencies:

```bash
corepack enable
pnpm install
```

### Running
- Dev server: `pnpm dev` (http://localhost:3000)
- Production build: `pnpm build`
- Serve build: `pnpm start`

### Storybook
- Run: `pnpm storybook` (http://localhost:6006)
- Static build: `pnpm build-storybook`

### Tests
- Unit: `pnpm test`
- Watch mode: `pnpm test:watch`
- Tests UI: `pnpm test:ui`
- Coverage: `pnpm test:coverage` (report in `coverage/`)
- E2E headless: `pnpm e2e:headless`
- E2E UI: `pnpm e2e:ui` (automatically starts `pnpm dev` via Playwright config)

### Linting and formatting
- Lint: `pnpm lint`
- Lint (fix): `pnpm lint:fix`
- Prettier check: `pnpm prettier`
- Prettier fix: `pnpm prettier:fix`
- Format all (ts, tsx, md): `pnpm format`

### Bundle analysis
- `pnpm analyze` with `ANALYZE=true` enables the bundle analyzer during build.

### Environment variables
This project uses `@t3-oss/env-nextjs` for typed envs. Available variables:

- `ANALYZE` (optional): "true" | "false" — enables bundle report when "true".

Define them in your environment or in a `.env` file when needed.

### Additional scripts
- Generate coupling graph: `pnpm coupling-graph` (produces `graph.svg`)
- RAG (optional): `pnpm rag` runs `rag/crawl-and-index.ts` with `dotenv` loaded

### Project structure
```text
app/
  (pages)/             # Main pages (home, posts, resume, APIs)
components/            # Components (base UI, layout, portfolio, resume, etc.)
public/                # Public images and post assets
styles/                # Global CSS and Tailwind
lib/                   # Helpers (APIs, utils)
e2e/                   # E2E tests (Playwright)
rag/                   # Crawling/index scripts (optional)
.storybook/            # Storybook config
```

### Commit conventions
This repo follows **Conventional Commits**. Message format: `type(scope): subject`.

### Deploy
Recommended via **Vercel**. After building (`pnpm build`), you can publish by configuring the project in the Vercel dashboard.

### Credits
This project was bootstrapped from Blazity's Next.js Enterprise Boilerplate and customized for Jonatas' portfolio.

### License
MIT
