# Screenplay E2E testing (jonatas-portfolio)

Companion to the **e2e-screenplay** skill. **Only** the Screenplay pattern is supported: **actors**, **tasks**, and **questions**. Page objects are out of scope — do not add them.

## Overview

- **Parallel-safe:** Playwright runs tests concurrently by default; no shared mutable state.
- **Screenplay:** Specs call `actor.attemptsTo(...tasks)` and `expect(await actor.asks(...))`.
- **Extension points:** New UI flows → new files under `fixtures/tasks/` and `fixtures/questions/`, exported from the index files.

### Layout

```text
e2e/
├── fixtures/
│   ├── index.ts          # test + actor
│   ├── types.ts          # task / question / Actor
│   ├── tasks/            # one file per domain area
│   │   └── index.ts
│   └── questions/
│       └── index.ts
├── helpers/
│   ├── timeouts.ts
│   └── waits.ts
└── specs/
```

## Concepts

| Concept      | Role                                                             |
| ------------ | ---------------------------------------------------------------- |
| **Actor**    | Performs tasks and answers questions (holds `page`)              |
| **Task**     | One coherent user action                                         |
| **Question** | Observation for assertions                                       |
| **Ability**  | What the actor uses (Playwright `page`, optionally API helpers)  |

### Example spec

```typescript
import {expect, test} from '../fixtures'
import {PageHeadingVisible} from '../fixtures/questions'
import {NavigateToBlog, ClickFirstPost} from '../fixtures/tasks'

test('navigates to a blog post', async ({actor}) => {
  await actor.attemptsTo(NavigateToBlog(), ClickFirstPost())
  expect(await actor.asks(PageHeadingVisible('Blog'))).toBe(true)
})
```

Keep **selectors and interaction sequences inside tasks/questions** only.

## Task / question factories

Implement using `task` and `question` from `e2e/fixtures/types.ts`. Pass `{timeout: E2E_TIMEOUT_MS.…}` from `e2e/helpers/timeouts.ts` when you override defaults — never `page.waitForTimeout` or raw sleep.

## QA step → task / question

| QA step              | Task                  | Question                               |
| -------------------- | --------------------- | -------------------------------------- |
| Open home page       | `NavigateToHome`      | `PageTitleContains`                    |
| Open blog listing    | `NavigateToBlog`      | `PostCardVisible`                      |
| Open a blog post     | `ClickPostByTitle`    | `PageHeadingVisible`                   |
| Submit contact form  | `FillContactForm`     | `SuccessMessageVisible`                |

## Checklist

- [ ] New UI steps implemented as tasks, not inline spec locators
- [ ] Assertions use questions, not scattered `expect(page.locator(...))` in specs
- [ ] No page-object classes
- [ ] No `waitForTimeout`; use `E2E_TIMEOUT_MS` on await options instead of magic ms values

## Further reading

- [Playwright docs](https://playwright.dev/)
- [Serenity/JS Screenplay handbook](https://serenity-js.org/handbook/design/screenplay-pattern.html)
