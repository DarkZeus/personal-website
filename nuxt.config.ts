import tailwindcss from '@tailwindcss/vite'
import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  components: false,
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  modules: [
    'motion-v/nuxt',
    '@nuxtjs/seo',
    '@nuxtjs/sitemap',
    'nuxt-og-image',
  ],

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
    compressPublicAssets: true,
    minify: true,
    routeRules: {
      '/**': {
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      },
    },
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
        { name: 'description', content: 'Personal website of Serhii Resnianskyi, an experienced Software Engineer with 7+ years architecting scalable web solutions and leading technical decision-making in complex environments. Expert in React and Vue ecosystems.' },
        { name: 'keywords', content: 'software engineer, web development, full-stack developer, Serhii Resnianskyi' },
        { name: 'author', content: 'Serhii Resnianskyi' },
        { name: 'robots', content: 'index, follow' },
        
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://fuad.work/' },
        { property: 'og:title', content: 'Serhii Resnianskyi' },
        { property: 'og:description', content: 'Personal website of Serhii Resnianskyi, an experienced Software Engineer with 7+ years architecting scalable web solutions and leading technical decision-making in complex environments. Expert in React and Vue ecosystems.' },
        { property: 'og:image', content: 'https://fuad.work/images/og-image.png' },
        
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: 'https://fuad.work/' },
        { name: 'twitter:title', content: 'Serhii Resnianskyi - Software Engineer' },
        { name: 'twitter:description', content: 'Personal website of Serhii Resnianskyi, an experienced Software Engineer with 7+ years architecting scalable web solutions and leading technical decision-making in complex environments. Expert in React and Vue ecosystems.' },
        { name: 'twitter:image', content: 'https://fuad.work/images/og-image.png' },
        
        // Additional SEO
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#ffffff' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'canonical', href: 'https://fuad.work/' }
      ]
    }
  },

  site: {
    url: "https://fuad.work/",
    name: "Serhii Resnianskyi - Software Engineer"
  },

  compatibilityDate: '2025-04-22',
  future: {
    compatibilityVersion: 4,
  },
})