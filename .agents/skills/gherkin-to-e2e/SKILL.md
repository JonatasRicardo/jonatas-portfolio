---
name: gherkin-to-e2e
description: >-
  Translates Gherkin Given/When/Then statements into Playwright E2E tests using
  the Screenplay pattern (actor, tasks, questions) with automatic fixture
  discovery and creation. Use when the user provides a Gherkin scenario, BDD
  statement, or asks to create an E2E test from acceptance criteria.
---
# Gherkin-to-E2E Task

## Objective

Translate a Gherkin scenario into a Playwright E2E spec using the Screenplay pattern. Reuse existing Tasks and Questions; create missing ones.

## Gherkin-to-Screenplay Mapping

| Gherkin keyword     | Screenplay concept   | Implementation                                 |
| ------------------- | -------------------- | ---------------------------------------------- |
| `Given`             | Navigation setup     | Initial `NavigateTo` task                      |
| `When`              | Task(s)              | `actor.attemptsTo(TaskName())`                 |
| `Then`              | Question + assertion | `expect(await actor.asks(QuestionName())).toBe(...)` |
| `And` (after When)  | Additional Task      | Another task in `attemptsTo` or a second call  |
| `And` (after Then)  | Additional Question  | Another `expect(await actor.asks(...))`        |

## Instructions

### Phase 1 — Parse

1. **Parse the Gherkin scenario** into three blocks: **Given** (preconditions/navigation), **When** (actions), **Then** (expected outcomes). Include any `And`/`But` lines with their parent block. Record the scenario name for the `test()` title.

2. **Determine the target URL path.** If the Gherkin scenario does not specify a page or URL, ask the user for the path (e.g. `/blog`, `/`). The first action in every test must be a `NavigateTo` task that navigates to this path.

### Phase 2 — Discover

3. **Search for existing Tasks.** For each `When` step (including the `NavigateTo` task from step 2), search `e2e/fixtures/tasks/` for a Task that already performs that action. Check barrel exports in `e2e/fixtures/tasks/index.ts`. Record matches and gaps.

4. **Search for existing Questions.** For each `Then` step, search `e2e/fixtures/questions/` for a Question that observes the expected outcome. Check barrel exports in `e2e/fixtures/questions/index.ts`. Record matches and gaps.

5. **Report the discovery results.** List each Gherkin step with its mapped fixture (existing or to-be-created) before proceeding. Confirm with the user.

### Phase 3 — Create Missing Fixtures

6. **Create missing Tasks.** For each unmatched `When` step:
   - Create a file at `e2e/fixtures/tasks/{task-name}.ts`
   - Use the `task()` factory from `../types`
   - Use explicit waits from Playwright (`locator.waitFor`, `page.waitForLoadState`, `page.waitForResponse`)
   - Register `waitForResponse` **before** the triggering click when the task submits data

   **Navigation task template:**

   ```typescript
   import {E2E_TIMEOUT_MS} from '../helpers/timeouts'
   import {task} from '../types'

   export const NavigateToBlog = () =>
     task('Navigate to /blog', async ({page}) => {
       await page.goto('/blog', {timeout: E2E_TIMEOUT_MS.superLong})
       await page.waitForLoadState('networkidle')
     })
   ```

   **Action task template:**

   ```typescript
   import {E2E_TIMEOUT_MS} from '../helpers/timeouts'
   import {task} from '../types'

   export const ClickFirstPost = () =>
     task('Click the first blog post', async ({page}) => {
       const card = page.getByTestId('post-card').first()
       await card.waitFor({state: 'visible', timeout: E2E_TIMEOUT_MS.long})
       await card.click()
       await page.waitForLoadState('networkidle')
     })
   ```

   **Parameterized template:**

   ```typescript
   import {E2E_TIMEOUT_MS} from '../helpers/timeouts'
   import {task} from '../types'

   export interface FillSearchInput {
     query: string
   }

   export const SearchFor = ({query}: FillSearchInput) =>
     task(`Search for "${query}"`, async ({page}) => {
       const input = page.getByTestId('search-input')
       await input.waitFor({state: 'visible', timeout: E2E_TIMEOUT_MS.long})
       await input.fill(query)
       await input.press('Enter')
       await page.waitForLoadState('networkidle')
     })
   ```

7. **Create missing Questions.** For each unmatched `Then` step:
   - Add to the appropriate file at `e2e/fixtures/questions/{domain}.ts`
   - Use the `question()` factory from `../types`
   - Use `E2E_TIMEOUT_MS` for timeout options
   - Return a value or boolean the spec asserts on

   **Template:**

   ```typescript
   import {E2E_TIMEOUT_MS} from '../helpers/timeouts'
   import {question} from '../types'

   export const ElementVisible = (testId: string) =>
     question(`Is "${testId}" visible?`, async ({page}) => {
       const loc = page.getByTestId(testId)
       try {
         await loc.waitFor({state: 'visible', timeout: E2E_TIMEOUT_MS.superLong})
         return true
       } catch {
         return false
       }
     })
   ```

8. **Update barrel exports.** For every new file:
   - Tasks: re-export from `e2e/fixtures/tasks/index.ts`
   - Questions: re-export from `e2e/fixtures/questions/index.ts`

### Phase 4 — Compose the Spec

9. **Create the spec file** at `e2e/specs/{domain}/{scenario-slug}.spec.ts`.

   **Spec template:**

   ```typescript
   import {expect, test} from '../../fixtures'
   import {SomeQuestion} from '../../fixtures/questions'
   import {NavigateToPage, SomeTask} from '../../fixtures/tasks'

   test.describe('Feature Area', () => {
     test('scenario name from gherkin', async ({actor}) => {
       // Given — navigate first
       await actor.attemptsTo(NavigateToPage())

       // When — perform actions
       await actor.attemptsTo(SomeTask())

       // Then — questions + assertions
       expect(await actor.asks(SomeQuestion())).toBe(true)
     })
   })
   ```

   **Rules for the spec:**
   - Import `test` and `expect` from `../../fixtures` (never from `@playwright/test` directly)
   - Import Tasks and Questions from barrel files (`../../fixtures/tasks`, `../../fixtures/questions`)
   - No raw locator chains in the spec — all UI interaction belongs in Tasks/Questions
   - Always navigate first as the initial `attemptsTo` action

10. **Verify.** Confirm the spec file type-checks correctly.

## Do's and Don'ts

**Do:**

- Always start the test with a `NavigateTo{Page}` task as the first action in `attemptsTo`
- Reuse existing Tasks/Questions before creating new ones
- Keep locators and interaction sequences inside Tasks/Questions — never in specs
- Use `E2E_TIMEOUT_MS` constants for all timeout options
- Register `waitForResponse` before the triggering click action
- Export new Tasks/Questions from their respective barrel `index.ts` files
- Wrap the test in `test.describe()` grouped by feature area

**Don't:**

- Put raw locator chains in spec files
- Use `page.waitForTimeout` or any fixed sleep
- Create page-object classes
- Use `test.describe.configure({ mode: 'serial' })` unless explicitly required
- Hard-code timeout millisecond values
- Skip barrel re-exports when adding new fixtures
- Skip the initial `NavigateTo` task — every test must navigate to a page first

## TODO Composition

Create todos at task start:

1. `gherkin-parse` — "Parse Gherkin scenario into Given/When/Then blocks"
2. `gherkin-discover` — "Search existing Tasks and Questions for matches"
3. `gherkin-create-tasks` — "Create missing Task files and update barrel exports"
4. `gherkin-create-questions` — "Create missing Question files and update barrel exports"
5. `gherkin-compose` — "Compose the spec file with tasks, questions, and assertions"
6. `gherkin-verify` — "Verify no type errors were introduced"

Update status: Mark `in_progress` when starting each, `completed` when done.
