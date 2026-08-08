<template>
  <picture>
    <source
      media="(prefers-color-scheme: dark)"
      type="image/avif"
      :sizes="darkSources.avif.sizes"
      :srcset="darkSources.avif.srcset"
    >
    <source
      media="(prefers-color-scheme: dark)"
      type="image/webp"
      :sizes="darkSources.webp.sizes"
      :srcset="darkSources.webp.srcset"
    >
    <source
      media="(prefers-color-scheme: dark)"
      type="image/png"
      :sizes="darkSources.png.sizes"
      :srcset="darkSources.png.srcset"
    >
    <source
      type="image/avif"
      :sizes="lightSources.avif.sizes"
      :srcset="lightSources.avif.srcset"
    >
    <source
      type="image/webp"
      :sizes="lightSources.webp.sizes"
      :srcset="lightSources.webp.srcset"
    >
    <img
      :src="lightSources.png.src"
      :srcset="lightSources.png.srcset"
      :sizes="lightSources.png.sizes"
      :alt="alt"
      :width="width"
      :height="height"
      loading="lazy"
      decoding="async"
    >
  </picture>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type ImageFormat = 'avif' | 'webp' | 'png'

interface ResponsiveSource {
  src: string
  srcset: string
  sizes?: string
}

const props = withDefaults(defineProps<{
  light: string
  dark: string
  alt: string
  width: number | string
  height: number | string
  sizes?: string
  quality?: number | string
}>(), {
  sizes: 'xs:100vw sm:92vw md:704px',
  quality: 90,
})

const image = useImage()

function createSource(src: string, format: ImageFormat): ResponsiveSource {
  return image.getSizes(src, {
    sizes: props.sizes,
    densities: 'x1 x2',
    modifiers: {
      format,
      ...(format === 'png' ? {} : { quality: props.quality }),
    },
  })
}

function createSources(src: string): Record<ImageFormat, ResponsiveSource> {
  return {
    avif: createSource(src, 'avif'),
    webp: createSource(src, 'webp'),
    png: createSource(src, 'png'),
  }
}

const lightSources = computed(() => createSources(props.light))
const darkSources = computed(() => createSources(props.dark))
</script>
