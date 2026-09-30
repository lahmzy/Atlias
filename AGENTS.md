<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Atlias

Single Next.js 16 App Router app in `src/` (TypeScript, Tailwind v4), Drizzle ORM over Neon Postgres, Better Auth. One `package.json`, no workspaces.

## Commands

- Package manager is **pnpm** (`pnpm-lock.yaml`). Do not run `npm install` or recreate `package-lock.json`.
- `pnpm dev` — dev server. It rewrites the managed block above in this file; keep it committed.
- `pnpm build` / `pnpm start` — production build and serve.
- `pnpm lint` — ESLint 9 flat config (`eslint.config.mjs`); takes no file arguments.
- No typecheck script: use `pnpm exec tsc --noEmit`.
- No tests exist (no test framework, no test script). Don't invent a test command.
- Verify with `pnpm lint` && `pnpm exec tsc --noEmit`.
- `pnpm build` needs network: `next/font/google` in `src/app/layout.tsx` downloads Geist/Geist Mono at build time, so with `fonts.gstatic.com` unreachable it dies with `Module not found: '@vercel/turbopack-next/internal/font/google/font'`. That failure is not caused by your code change.

## Environment

- `.env.local` holds real values (Next loads it automatically; `drizzle.config.ts` loads it explicitly via `dotenv`). `.env.example` lists the keys: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`. `.env*` is gitignored.
- `src/db/index.ts` reads `process.env.DATABASE_URL` at module load, so anything importing `@/db` needs it set.
- Path alias: `@/*` → `./src/*` (tsconfig `paths`).

## Data layer (Drizzle)

- `drizzle.config.ts`: schema `src/db/schema/index.ts`, output `src/db/migrations/`. That migrations folder does not exist yet and there are no `db:*` scripts in `package.json` — generate with `pnpm exec drizzle-kit generate` (verified: `drizzle-kit` reads `.env.local` itself, so no need to export vars).
- Schema files: `src/db/schema/auth.ts`, `src/db/schema/ecommerce.ts`, both re-exported by `src/db/schema/index.ts` (import from the barrel or the file consistently).
- Client is the **neon-http** driver (`drizzle-orm/neon-http`), not a connection pool: exports `db` and type `Database` from `src/db/index.ts`.

## Design system

- Tokens live in `src/app/globals.css` (`@theme` → Tailwind v4 utilities like `bg-blush-200`, `text-espresso-900`, `font-display`). Brand palette is blush/rose/cocoa sampled from a reference image; the app is light-only (no dark theme yet).
- Fonts load in `src/app/layout.tsx` via `next/font/google`: **Jost** (`--font-jost`, body/UI) + **Playfair Display** (`--font-playfair`, headings). Shared type/button/card classes: `.type-hero`, `.type-heading`, `.type-eyebrow`, `.type-body`, `.btn-primary`, `.card` (defined unlayered in `globals.css`, so they win over utilities — override with Tailwind's `px-4!` suffix syntax).
- `/style-guide` renders the palette, type scale, buttons and a product card for visual checks.

## Auth (Better Auth)

- Server config `src/lib/auth.ts`, React client `src/lib/auth-client.ts`, catch-all handler `src/app/api/auth/[...all]/route.ts`. The `[...all]` segment name must not change.
- The drizzle adapter maps tables explicitly (`user` / `session` / `account` / `verification` → `src/db/schema/auth.ts`), so renaming auth tables means updating that map too.
- Email+password sign-in is enabled; a dev fallback secret is used when `BETTER_AUTH_SECRET` is unset.
