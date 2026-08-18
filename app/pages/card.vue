<template>
  <div class="card-page">
    <main class="card-stage" aria-labelledby="card-name">
      <HoloIdentityCard>
        <article class="credential-face">
          <header class="credential-header">
            <div class="identity-mark" aria-hidden="true"><span>SR</span><i></i></div>
            <p class="availability"><i aria-hidden="true"></i> Open to opportunities</p>
          </header>

          <div class="credential-main">
            <section class="identity-copy">
              <h1 id="card-name"><span>Serhii</span><span>Resnianskyi</span></h1>
              <p class="role">Software Engineer · Chernihiv, Ukraine</p>
              <a class="email-link focus-ring" href="mailto:serhii.resnyanskyi@gmail.com">
                <span>Start a conversation</span>
                <strong>serhii.resnyanskyi@gmail.com</strong>
                <ArrowUpRightIcon aria-hidden="true" />
              </a>
            </section>

            <div class="qr-tile">
              <div class="qr-heading">
                <span>Scan to visit</span>
                <a
                  class="qr-download focus-ring"
                  href="/serhii-resnianskyi.vcf"
                  download
                  aria-label="Share or download Serhii Resnianskyi's contact card"
                  @click="shareContact"
                >
                  <ArrowDownTrayIcon aria-hidden="true" />
                </a>
              </div>
              <a
                class="qr-code focus-ring"
                href="/"
                aria-label="Open fuad.work"
              >
                <QrcodeVue
                  value="https://fuad.work/"
                  :size="252"
                  :margin="1"
                  level="M"
                  render-as="svg"
                  background="#ffffff"
                  foreground="#16131d"
                />
              </a>
              <span class="qr-caption">fuad.work · web</span>
            </div>
          </div>

          <footer class="credential-footer">
            <a
              v-for="contact in contacts"
              :key="contact.label"
              class="contact-link focus-ring"
              :href="contact.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{{ contact.label }}</span>
              <strong>{{ contact.value }}</strong>
              <ArrowUpRightIcon aria-hidden="true" />
            </a>
          </footer>
        </article>
      </HoloIdentityCard>
    </main>
  </div>
</template>

<script setup lang="ts">
import QrcodeVue from 'qrcode.vue'
import { ArrowDownTrayIcon, ArrowUpRightIcon } from '@heroicons/vue/24/outline'
import HoloIdentityCard from '~/components/business-card/HoloIdentityCard.vue'

definePageMeta({ layout: 'card' })

useSeoMeta({
  title: 'Business Card — Serhii Resnianskyi',
  description: 'Contact Serhii Resnianskyi through an interactive holographic business card.',
  ogTitle: 'Serhii Resnianskyi — Software Engineer',
  ogDescription: 'An interactive digital business card and direct contact channels.',
  twitterCard: 'summary_large_image',
})

useHead({
  bodyAttrs: { class: 'business-card-body' },
  meta: [
    { name: 'theme-color', content: '#000000' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
    },
  ],
  link: [{ rel: 'canonical', href: 'https://fuad.work/card' }],
})

const contacts = [
  { label: 'Telegram', value: '@fuad_first', href: 'https://t.me/fuad_first' },
  { label: 'LinkedIn', value: '/in/serhii-resnianskyi', href: 'https://www.linkedin.com/in/serhii-resnianskyi' },
  { label: 'GitHub', value: '@DarkZeus', href: 'https://github.com/DarkZeus' },
  { label: 'Web', value: 'fuad.work', href: '/' },
]

async function shareContact(event: MouseEvent) {
  if (!navigator.share) return
  event.preventDefault()

  const contactUrl = new URL('/serhii-resnianskyi.vcf', window.location.origin).href
  try {
    const response = await fetch(contactUrl)
    if (!response.ok) throw new Error('Contact file unavailable')
    const file = new File([await response.blob()], 'serhii-resnianskyi.vcf', { type: 'text/vcard' })

    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        title: 'Serhii Resnianskyi — contact',
        text: 'Save Serhii Resnianskyi as a contact.',
        files: [file],
      })
      return
    }

    await navigator.share({
      title: 'Serhii Resnianskyi — contact',
      text: 'Save Serhii Resnianskyi as a contact.',
      url: contactUrl,
    })
  }
  catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') return
    const download = document.createElement('a')
    download.href = contactUrl
    download.download = 'serhii-resnianskyi.vcf'
    download.click()
  }
}
</script>

<style scoped>
:global(.business-card-body) {
  margin: 0;
  overflow-x: hidden;
  background: #000;
  touch-action: none;
}

:global(.business-card-body *) {
  -webkit-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
}

:global(.business-card-body ::selection) {
  background: #5939ff;
  color: #fff;
}

.card-page {
  --ink: #17141e;
  --muted: #696470;
  display: grid;
  width: 100%;
  min-height: 100dvh;
  place-items: center;
  padding: clamp(1rem, 2dvw, 2rem);
  overflow: hidden;
  background: #000;
  color: var(--ink);
  font-family: 'Archivo', ui-sans-serif, system-ui, sans-serif;
}

.card-stage {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: min(72rem, calc(100dvw - 4rem), calc((100dvh - 4rem) * 1.58));
  min-width: 42rem;
  margin: 0;
}

.credential-face {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
  padding: clamp(1.4rem, 3.2dvw, 2.8rem);
  color: var(--ink);
}

.credential-header {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: clamp(0.8rem, 1.6dvw, 1.5rem);
}

.identity-mark {
  position: relative;
  display: grid;
  width: clamp(2.5rem, 4.5dvw, 3.75rem);
  aspect-ratio: 1;
  place-items: center;
  border: 1px solid rgb(23 20 30 / 0.65);
  border-radius: 50%;
  font-size: clamp(0.66rem, 1dvw, 0.82rem);
  font-weight: 750;
  letter-spacing: 0.04em;
}

.identity-mark i {
  position: absolute;
  top: 9%;
  right: 9%;
  width: 0.34rem;
  height: 0.34rem;
  border-radius: 50%;
  background: #6854ef;
  box-shadow: 0 0 0 3px rgb(104 84 239 / 0.14);
}

.availability {
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 0.55rem;
  margin: 0;
  font-size: clamp(0.64rem, 0.9dvw, 0.75rem);
  font-weight: 680;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.availability i {
  width: 0.42rem;
  height: 0.42rem;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #1eaf6d;
  box-shadow: 0 0 0 0.24rem rgb(30 175 109 / 0.12);
}

.credential-main {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: clamp(2rem, 5dvw, 5rem);
  padding-block: clamp(1.4rem, 3dvw, 2.8rem);
}

.identity-copy { min-width: 0; }

h1 {
  margin: 0;
  font-size: clamp(3.25rem, 7.3dvw, 6.35rem);
  font-weight: 590;
  letter-spacing: -0.065em;
  line-height: 0.78;
}

h1 span { display: block; }

h1 span:last-child {
  color: transparent;
  -webkit-text-stroke: clamp(1px, 0.12dvw, 1.5px) var(--ink);
}

.role {
  margin: clamp(1.2rem, 2.4dvw, 2rem) 0 0;
  font-size: clamp(0.82rem, 1.2dvw, 1rem);
  font-weight: 650;
}

.email-link {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.28rem 1rem;
  width: min(29rem, 100%);
  margin-top: clamp(1rem, 2dvw, 1.8rem);
  padding: 0.8rem 2.4rem 0.8rem 0;
  border-top: 1px solid rgb(23 20 30 / 0.28);
  border-bottom: 1px solid rgb(23 20 30 / 0.28);
  color: inherit;
  text-decoration: none;
}

.email-link span {
  color: var(--muted);
  font-size: 0.64rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.email-link strong {
  min-width: 0;
  overflow-wrap: anywhere;
  font-size: clamp(0.72rem, 1.12dvw, 0.92rem);
  font-weight: 680;
}

.email-link svg {
  position: absolute;
  right: 0;
  bottom: 0.9rem;
  width: 1rem;
  transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
}

.email-link:hover svg,
.contact-link:hover svg { transform: translate(0.12rem, -0.12rem); }

.qr-tile {
  display: block;
  width: clamp(11rem, 20.5dvw, 15.75rem);
  padding: clamp(0.55rem, 1.2dvw, 0.9rem);
  border: 1px solid rgb(23 20 30 / 0.09);
  border-radius: 0.75rem;
  background: #fff;
  box-shadow: 0 0.8rem 2.3rem rgb(49 43 74 / 0.14);
  color: var(--ink);
  text-decoration: none;
}

.qr-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 0.18rem 0.55rem;
  font-size: clamp(0.58rem, 0.8dvw, 0.68rem);
  font-weight: 720;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.qr-heading svg { width: 0.9rem; }

.qr-download {
  display: grid;
  width: 1.8rem;
  height: 1.8rem;
  margin: -0.45rem -0.35rem -0.45rem 0;
  place-items: center;
  border-radius: 50%;
  color: inherit;
}

.qr-code,
.qr-code :deep(svg) {
  display: block;
  width: 100%;
  height: auto;
}

.qr-caption {
  display: block;
  padding: 0.45rem 0.18rem 0;
  color: var(--muted);
  font-size: 0.6rem;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.credential-footer {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid rgb(23 20 30 / 0.34);
}

.contact-link {
  position: relative;
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 0.28rem;
  padding: clamp(0.8rem, 1.45dvw, 1.2rem) clamp(0.7rem, 1.35dvw, 1.1rem) 0 0;
  color: inherit;
  text-decoration: none;
}

.contact-link:not(:first-child) {
  padding-left: clamp(0.7rem, 1.35dvw, 1.1rem);
  border-left: 1px solid rgb(23 20 30 / 0.18);
}

.contact-link span {
  color: var(--muted);
  font-size: clamp(0.56rem, 0.78dvw, 0.66rem);
  font-weight: 690;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.contact-link strong {
  overflow: hidden;
  font-size: clamp(0.63rem, 0.95dvw, 0.8rem);
  font-weight: 680;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.contact-link svg {
  position: absolute;
  top: clamp(0.8rem, 1.45dvw, 1.2rem);
  right: clamp(0.7rem, 1.35dvw, 1.1rem);
  width: 0.75rem;
  transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
}

.focus-ring:focus-visible {
  border-radius: 0.25rem;
  outline: 3px solid #684cff;
  outline-offset: 4px;
}

@media (max-width: 42rem) {
  .card-page { padding: 0.75rem; }

  .card-stage {
    width: min(28rem, calc(100dvw - 1.5rem), calc((100dvh - 1.5rem) * 0.68));
    min-width: 0;
    margin: 0;
  }

  .credential-face { padding: 1.25rem; }
  .credential-header { grid-template-columns: auto 1fr; }

  .credential-main {
    grid-template-columns: 1fr;
    grid-template-rows: auto minmax(1rem, 1fr) auto;
    align-content: stretch;
    gap: 1.2rem;
    padding-block: 1.15rem;
  }

  h1 { font-size: clamp(2.8rem, 13.4dvw, 4.1rem); }
  .role { margin-top: 1rem; }

  .email-link {
    margin-top: 0.85rem;
    padding-block: 0.65rem;
  }

  .email-link svg { bottom: 0.75rem; }

  .qr-tile {
    grid-row: 3;
    width: clamp(11.5rem, 58dvw, 14.5rem);
    align-self: end;
    justify-self: center;
    padding: 0.55rem;
  }

  .email-link,
  .credential-footer { display: none; }

}

@media (max-width: 32rem) {
  .card-stage {
    width: min(calc(100dvw - 1.5rem), calc((100dvh - 1.5rem) * 0.56));
  }
}

@media (prefers-reduced-motion: reduce) {
  .email-link svg,
  .contact-link svg { transition: none; }
}
</style>
