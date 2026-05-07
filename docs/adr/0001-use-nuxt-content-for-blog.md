# Use Nuxt Content for Blog

The personal website needs a lightweight **Blog** authored by Serhii in Markdown and published from Git. We will use Nuxt Content as the content system for **Blog Posts** because it fits the existing Nuxt stack, provides first-class Markdown pages with typed metadata, and keeps the door open for Nuxt Studio later without starting with a full CMS.

## Considered Options

- Nuxt Content for Git-authored Markdown.
- A custom Markdown loader.
- A headless CMS or visual editing workflow.

## Consequences

- Blog content lives in the repository under `content/blog`.
- Blog routes use `/blog` and `/blog/<slug>`.
- Blog post metadata starts with only title, description, and publication date.
- The first version does not include a visual editor or external CMS.
- Production deploys are static site generation builds using `nuxt generate`.
- Local development and static builds use Nuxt Content's Node SQLite path with `better-sqlite3`.
- The generated site serves pre-rendered HTML and static Content database assets; client-side Content queries use WASM SQLite.
- The Blog does not use Cloudflare D1 at runtime.
