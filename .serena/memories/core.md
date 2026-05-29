# Core

- Next.js App Router project rooted at `app/(pages)` for user-facing routes; route groups mean `/resume`, `/posts`, etc. live under that folder without adding the group to URLs.
- Reusable UI lives in `components/`; base primitives in `components/base-ui`, feature components grouped by domain.
- Global Tailwind entry is `styles/tailwind.css`; app metadata/layout are in `app/(pages)/layout.tsx`.
- Blog content uses Markdown in `_posts` and helper accessors in `lib/api.ts`.
- Read stack/build specifics in `mem:tech_stack`; read local style and architecture choices in `mem:conventions`; read completion checks in `mem:task_completion`.