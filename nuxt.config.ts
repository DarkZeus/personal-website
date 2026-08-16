import tailwindcss from '@tailwindcss/vite'
import { defineNuxtConfig } from 'nuxt/config'
import { getExperienceYearsLabel } from './utils/experience'

const experienceYears = getExperienceYearsLabel()

const designContract = `<!--
THESIS: Quiet Systems Studio presents engineering evidence through calm, open compositions instead of card-heavy portfolio templates.
OWN-WORLD: Cool Paper, Signal Cobalt, Archivo, fine structural rules, oversized editorial titles, clipped circles, and frosted navigation.
STORY: Visitors identify Serhii, inspect concrete work and experience, then reach a direct contact route.
FIRST VIEWPORT: A compact glass navigation floats above an asymmetric title-and-evidence composition with Cobalt carrying action and active state.
FORM: User-pinned Quiet Systems Studio page family, adapted from the approved visual prototypes; seed key: user-pinned.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  appConfig: {
    experienceYears,
  },
  components: false,
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  modules: ['motion-v/nuxt', '@nuxt/content', '@nuxt/image', '@nuxtjs/seo', '@nuxtjs/sitemap', 'nuxt-og-image', '@nuxtjs/color-mode'],

  experimental: {
    viewTransition: true,
    crossOriginPrefetch: true,
    componentIslands: true,
    payloadExtraction: true,
    renderJsonPayloads: true,
    asyncContext: true,
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
    build: {
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  },

  nitro: {
    hooks: {
      'prerender:generate'(route) {
        if (typeof route.contents === 'string' && route.fileName?.endsWith('.html')) {
          route.contents = route.contents.replace(/(<body[^>]*>)/, `$1${designContract}`)
        }
      },
    },
    minify: true,
    prerender: {
      crawlLinks: true,
    },
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark-dimmed',
          },
        },
      },
    },
  },

  sitemap: {
    zeroRuntime: true,
  },

  app: {
    head: {
      title: 'Serhii Resnianskyi - Software Engineer',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: `Personal website of Serhii Resnianskyi, an experienced Software Engineer with ${experienceYears} architecting scalable web solutions and leading technical decision-making in complex environments. Expert in React and Vue ecosystems.` },
        { name: 'keywords', content: 'software engineer, web development, full-stack developer, Serhii Resnianskyi' },
        { name: 'author', content: 'Serhii Resnianskyi' },
        { name: 'robots', content: 'index, follow' },
        
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Serhii Resnianskyi' },
        { property: 'og:description', content: `Personal website of Serhii Resnianskyi, an experienced Software Engineer with ${experienceYears} architecting scalable web solutions and leading technical decision-making in complex environments. Expert in React and Vue ecosystems.` },
        { property: 'og:image', content: 'https://fuad.work/images/og-image.png' },
        
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://fuad.work/images/og-image.png' },
        
        // Additional SEO
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#f4f7fb' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&display=swap' },
      ]
    }
  },

  site: {
    url: "https://fuad.work/",
    name: "Serhii Resnianskyi - Software Engineer"
  },

  compatibilityDate: '2026-01-25',
})
