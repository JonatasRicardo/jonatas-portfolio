# Conventions

- New code should be TypeScript, 2-space indentation, semicolons, double quotes, and trailing commas in multiline literals.
- Prefer feature-oriented folders and keeping related components/tests/stories near each other.
- Existing pages under `app/(pages)` export a default page function and use Tailwind classes directly.
- Root layout wraps pages with `components/template/Template` and sets `<html lang="pt-BR">`.
- Components generally use named exports in component folders; route files use default exports. Preserve existing user edits in dirty worktrees.