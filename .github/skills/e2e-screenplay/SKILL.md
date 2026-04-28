---
name: e2e-screenplay
description: >-
  Writes parallel-safe Playwright E2E tests using the Screenplay pattern only
  (actors, tasks, questions). Use when creating or refactoring E2E specs, adding
  tasks/questions, or when the user mentions e2e, end-to-end tests, Playwright,
  or Screenplay.
---
# jonatas-portfolio E2E — Screenplay only

This project does **not** use page objects. Every UI interaction belongs in a **task**; every assertion uses a **question** (or data derived from one). Read [screenplay-guide.md](screenplay-guide.md) for the full guide.

## Before you start (discovery)

1. [e2e/fixtures/types.ts](e2e/fixtures/types.ts) — `task()` / `question()` factories + `Actor` type
2. [e2e/fixtures/index.ts](e2e/fixtures/index.ts) — `test` + **`actor`** (`attemptsTo`, `asks`)
3. [e2e/fixtures/tasks/](e2e/fixtures/tasks/) and [e2e/fixtures/questions/](e2e/fixtures/questions/) — extend these for new flows
4. [e2e/helpers/timeouts.ts](e2e/helpers/timeouts.ts) — `E2E_TIMEOUT_MS` for all `{timeout: …}` options
5. [e2e/helpers/waits.ts](e2e/helpers/waits.ts) — condition-based waits (no `waitForTimeout`)

## Screenplay model (required)

- **Actor** — `attemptsTo(...tasks)` and `asks(...questions)`; holds `page`.
- **Task** — one user-observable action (navigation, fill, click sequence).
- **Question** — read-only observation; return a value or boolean the spec asserts on.

**Spec shape:**

```typescript
import {expect, test} from '../fixtures'
import {PageTitleContains} from '../fixtures/questions'
import {NavigateToBlog, ClickFirstPost} from '../fixtures/tasks'

test('opens blog post', async ({actor}) => {
  await actor.attemptsTo(NavigateToBlog(), ClickFirstPost())
  expect(await actor.asks(PageTitleContains('Blog'))).toBe(true)
})
```

Define reusable work in `task()` / `question()` factories in `e2e/fixtures/types.ts`. **Locators live only inside tasks and questions** — never in specs as one-off chains.

## Timeouts (`E2E_TIMEOUT_MS`)

Import from `e2e/helpers/timeouts.ts`. Use **only** as `{timeout: E2E_TIMEOUT_MS.…}` on real awaits (`expect`, `locator.waitFor`, `page.goto`, `waitForResponse`).

| Key          |    ms | Use                                                |
| ------------ | ----: | -------------------------------------------------- |
| `short`      |   500 | Brief UI / idle gaps                               |
| `long`       |  2000 | Default locator and assertion windows              |
| `superLong`  |  5000 | Navigation, hard refresh, whole-page readiness     |
| `unreliable` | 15000 | Slow or flaky network-dependent assertions         |

**Forbidden:** `page.waitForTimeout` and any fixed sleep.

## Creating tasks

```typescript
// e2e/fixtures/tasks/navigation.ts
import {E2E_TIMEOUT_MS} from '../helpers/timeouts'
import {task} from '../types'

export const NavigateToBlog = () =>
  task('Navigate to /blog', async ({page}) => {
    await page.goto('/blog', {timeout: E2E_TIMEOUT_MS.superLong})
    await page.waitForLoadState('networkidle')
  })
```

Export from `e2e/fixtures/tasks/index.ts`.

## Creating questions

```typescript
// e2e/fixtures/questions/page.ts
import {E2E_TIMEOUT_MS} from '../helpers/timeouts'
import {question} from '../types'

export const PageTitleContains = (text: string) =>
  question(`Does page title contain "${text}"?`, async ({page}) => {
    await page.waitForLoadState('domcontentloaded', {timeout: E2E_TIMEOUT_MS.long})
    return (await page.title()).includes(text)
  })
```

Export from `e2e/fixtures/questions/index.ts`.

## Directory layout

```text
e2e/
├── fixtures/
│   ├── index.ts          # test + actor
│   ├── types.ts          # task() / question() + Actor
│   ├── tasks/
│   │   ├── index.ts
│   │   └── navigation.ts
│   └── questions/
│       ├── index.ts
│       └── page.ts
├── helpers/
│   ├── timeouts.ts
│   └── waits.ts
└── specs/
    └── blog.spec.ts
```

## Commands

```bash
pnpm e2e:headless
pnpm e2e:ui
```

## Do / don't

**Do:** composable tasks/questions, `data-testid` + roles, `E2E_TIMEOUT_MS` on await options, register `waitForResponse` before the action.

**Don't:** page-object classes, raw locator soup in specs, `waitForTimeout`, magic millisecond literals in E2E code, shared mutable cross-test state.
