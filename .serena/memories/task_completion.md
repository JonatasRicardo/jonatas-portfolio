# Task Completion

- For most code changes run a focused test when one exists, then `pnpm prettier` and/or `pnpm build` depending on risk.
- For route/UI changes, prefer at least `pnpm build`; add a browser smoke check when a dev server is involved.
- For component behavior changes, run the corresponding `*.test.tsx` with Vitest when available.
- Before finishing, inspect `git status --short` and report any tests/checks that could not be run.