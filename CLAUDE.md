# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Serhii Resnianskyi built with Nuxt 3 (Vue 3), Tailwind CSS v4, and motion-v for animations. Deployed at https://fuad.work/.

## Commands

```bash
pnpm dev          # Start dev server on http://localhost:3000
pnpm build        # Build for SSR production
pnpm generate     # Generate static site (SSG)
pnpm preview      # Preview production build locally
```

## Architecture

### Directory Structure
- `app/` - Main application code (Nuxt 3 convention)
  - `pages/` - File-based routing (index, about, projects, contact)
  - `components/` - Vue components (NOT auto-imported, must be explicitly imported)
  - `layouts/` - Page layouts (default.vue wraps all pages)
  - `composables/` - Shared composition functions
  - `assets/css/main.css` - Global styles with custom theme variables

### Key Configuration
- `nuxt.config.ts` - Main config with SEO, site metadata, experimental features
- `tailwind.config.js` - Tailwind with dark mode set to 'media' (system preference)

### Technology Stack
- **Framework:** Nuxt 3.17.7 with Vue 3 Composition API
- **Styling:** Tailwind CSS v4 with custom oklch color theme
- **Animation:** motion-v (Framer Motion wrapper for Vue)
- **Icons:** @heroicons/vue
- **SEO:** @nuxtjs/seo, @nuxtjs/sitemap, nuxt-og-image
- **Package Manager:** pnpm

### Important Patterns
1. Components use `<script setup>` syntax
2. Components must be explicitly imported (auto-import disabled in nuxt.config.ts)
3. Animation-heavy design using motion-v for scroll animations and page transitions
4. Custom CSS variables defined in main.css using oklch color space
5. Production build drops console/debugger statements via terser
