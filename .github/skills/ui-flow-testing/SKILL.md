---
name: ui-flow-testing
description: >-
  Write and run prompt-based UI flow tests using agent-browser for
  development-time verification
---
# Prompt-Based UI Flow Testing with agent-browser

## When to Use

Invoke this skill when:

- Verifying a UI flow works end-to-end during development
- Validating that a feature renders correctly after implementation
- Capturing screenshots for PR documentation or review
- Debugging a UI interaction that is hard to verify from code alone

## Important Constraints

**E2E tests in `e2e/specs/` use the Screenplay pattern and are the authoritative test suite.** This skill does NOT create or modify those Playwright E2E specs.

agent-browser is for **development-time verification** — quick, disposable checks to confirm a UI flow works before marking a task complete. These are NOT committed as test suites.

## What is agent-browser

[agent-browser](https://github.com/vercel-labs/agent-browser) is a headless browser CLI for AI agents:

- Navigation, clicking, typing, form submission
- CSS selectors, ARIA roles, and semantic locators
- Screenshots (annotated and plain) and accessibility tree snapshots
- Session state save/restore for multi-step flows

## Quick Start

```bash
# Navigate and take accessibility snapshot
npx agent-browser@latest navigate http://localhost:3000 --wait-until networkidle
npx agent-browser@latest snapshot
```

## Core Commands

```bash
# Navigation
npx agent-browser@latest navigate http://localhost:3000/blog --wait-until networkidle

# Accessibility tree snapshot (preferred for AI — structured, fast)
npx agent-browser@latest snapshot

# Screenshot with annotated interactive elements
npx agent-browser@latest screenshot --annotate --path "verification.png"

# Click by data-testid or ARIA role
npx agent-browser@latest click '[data-testid="post-card"]'
npx agent-browser@latest click role=link --name "Read more"

# Fill inputs
npx agent-browser@latest fill '[data-testid="search-input"]' "Next.js"

# Wait for conditions
npx agent-browser@latest wait '[data-testid="results-list"]' --state visible
npx agent-browser@latest wait --text "No results found"
npx agent-browser@latest wait --url "**/blog/**"
```

## Verification Flow Pattern

### 1. Ensure Dev Server Running

```bash
curl -s http://localhost:3000 || echo "Start dev server first: pnpm dev"
```

### 2. Navigate and Verify Initial Render

```bash
npx agent-browser@latest navigate http://localhost:3000/blog --wait-until networkidle
npx agent-browser@latest snapshot
```

### 3. Perform the Interaction

```bash
npx agent-browser@latest click '[data-testid="post-card"]:first-child'
npx agent-browser@latest wait --url "**/blog/**"
npx agent-browser@latest snapshot
```

### 4. Verify the Outcome

```bash
npx agent-browser@latest wait --text "Posted on"
npx agent-browser@latest screenshot --annotate --path "post-view.png"
```

## Selector Priority

1. **data-testid** — `[data-testid="post-card"]` (most stable)
2. **ARIA role + name** — `role=link --name "Read more"` (semantic)
3. **Text content** — `text="Latest Posts"` (readable but fragile)
4. **CSS selectors** — `.post-card > h2` (last resort)

Never use: XPath, positional selectors, auto-generated class names.

## Anti-Patterns

**Do NOT create or modify Playwright E2E specs.** Those use the Screenplay pattern.
**Do NOT commit agent-browser verification scripts.** These are disposable.
**Do NOT use agent-browser in CI/CD.** It is a development-time tool.
**Do NOT hardcode timeouts.** Use explicit wait conditions.
