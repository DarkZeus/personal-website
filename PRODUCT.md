# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary users are recruiters, hiring managers, and engineering leaders evaluating Serhii Resnianskyi for senior software-engineering roles. They need to establish his experience, technical range, judgment, and fit quickly enough to decide whether to start a conversation.

Technical peers are a secondary audience. They use the projects and Blog to understand how Serhii approaches architecture, performance, interfaces, tooling, and engineering tradeoffs.

## Product Purpose

The portfolio is Serhii's public evidence hub. It brings his experience, capabilities, selected projects, technical writing, CV, and contact routes into one place so prospective employers and collaborators can evaluate his work and contact him.

Success means generating relevant conversations about full-time remote or hybrid software-engineering opportunities and suitable project work, while giving technical readers useful, credible material.

## Positioning

The portfolio presents Serhii as an experienced software engineer with 7+ years of work in complex web environments, combining hands-on React and Vue expertise with architecture, scalability, performance optimization, modernization, technical decision-making, and mentorship. Its position is supported by specific career outcomes, working projects, and technical case studies rather than an unsubstantiated list of technologies.

## Operating Context

- Visitors evaluate Serhii through the home, About, Projects, Blog, Gear, Links, and Contact surfaces.
- The CV is available as a direct download, and contact is handled through email, Telegram, LinkedIn, and GitHub rather than an on-site submission workflow.
- The Blog is authored as Markdown in Git, listed newest-first, and published through static generation with the rest of the website. Each Blog Post has its own public URL.
- The portfolio is public, English-language, and intended to work across desktop and mobile browsers in light and dark system themes.
- Serhii is based in Chernihiv, Ukraine and is looking for full-time remote or hybrid positions.

## Capabilities and Constraints

- The site is a statically generated Nuxt application; public content must remain usable without a runtime content database.
- The Blog remains a lightweight Git-authored Markdown section. It does not currently require a CMS, visual editor, tags, search, draft workflow, or runtime D1 dependency.
- Projects may link to external repositories or demonstrations. The portfolio itself does not imply that every project is complete or commercially available.
- Some client work is covered by confidentiality agreements. Future content must preserve those boundaries and must not invent or expose client details.
- Career claims, project status, metrics, and technical results must remain traceable to real evidence and should not be embellished.
- The public interface must meet WCAG 2.2 AA.

## Brand Commitments

- Use the public name **Serhii Resnianskyi** and the canonical domain **fuad.work**.
- Keep the voice professional, direct, technically credible, and grounded in concrete work.
- Preserve the existing CV, professional profiles, contact routes, authored Blog Posts, and project ownership unless Serhii explicitly updates them.
- Keep the public product terminology **Blog** and **Blog Post**; do not rename them to publication-oriented alternatives such as “Writing,” “Notes,” or “Articles.”

## Evidence on Hand

- CV: `public/Serhii_Resnianskyi_CV.pdf`
- Career history, responsibilities, education, certifications, and skills: `app/pages/about/index.vue`
- Selected projects and their current status: `app/pages/projects/index.vue`
- Technical case study about a career-page monitor: `content/blog/career-page-monitor-case-study.md`
- Technical case study about building Yata, a translation application: `content/blog/building-yata-a-translation-app-in-a-couple-of-evenings.md`
- Portfolio and project imagery: `public/images/`
- Public GitHub, LinkedIn, Telegram, email, and CV routes: `app/pages/links/index.vue` and `app/pages/contact/index.vue`
- The About page records a 60% build-time reduction from a Webpack-to-Vite migration and other concrete modernization work.

There are no confirmed testimonials, customer logos, press mentions, compensation claims, commercial benchmarks, or client identities available for reuse. Future work must not fabricate them.

## Product Principles

1. **Evidence over assertion.** Support expertise with specific outcomes, artifacts, projects, and written reasoning.
2. **Make evaluation fast.** Help busy decision-makers understand Serhii's level, strengths, and relevance without unnecessary friction.
3. **Reward deeper inspection.** Give technical readers enough substance to assess judgment, tradeoffs, and implementation quality.
4. **Protect truth and confidentiality.** Keep claims current, distinguish completed work from work in progress, and respect NDA boundaries.
5. **Be broadly usable.** Keep the experience accessible to WCAG 2.2 AA, responsive, performant, and functional across supported themes.

## Accessibility & Inclusion

The public website must meet WCAG 2.2 AA. Core information, navigation, project evidence, Blog Posts, CV access, and contact routes must remain usable with keyboard navigation, assistive technology, reduced-motion preferences, zoom, and reflow on small screens. Meaning must not depend on color, animation, hover, or pointer input alone.
