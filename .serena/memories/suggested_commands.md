# Suggested Commands

- Install deps: `pnpm install`.
- Dev server: `pnpm dev`.
- Production build: `pnpm build`.
- Unit tests: `pnpm test`; targeted Vitest runs can pass a file path after `pnpm test`.
- E2E: `pnpm e2e:headless`.
- Formatting/lint checks: `pnpm prettier`, `pnpm lint`; auto-fix via `pnpm prettier:fix` or `pnpm lint:fix`.
- Docker image check: `pnpm docker:build`, then `pnpm docker:run`.