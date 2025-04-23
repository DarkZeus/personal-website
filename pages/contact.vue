<template>
  <div>
    <HeroSection>
      <template #title>Get in Touch</template>
      <template #description>
        Have a project in mind or want to collaborate? I'd love to hear from you.
      </template>
    </HeroSection>

    <!-- Contact Section -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid gap-16 lg:grid-cols-2">
          <!-- Contact Information -->
          <div class="space-y-8">
            <div class="bg-surface rounded-lg shadow-card p-8">
              <h2 class="text-3xl font-display font-semibold text-text mb-6">Contact Information</h2>
              <div class="space-y-6">
                <ContactInfo title="Email">
                  <template #icon>
                    <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </template>
                  <template #content>
                    <p class="text-text-light">serhii.resnyanskyi@gmail.com</p>
                  </template>
                </ContactInfo>

                <ContactInfo title="Telegram">
                  <template #icon>
                    <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </template>
                  <template #content>
                    <a href="https://t.me/fuad_first" class="text-text-light hover:text-primary transition-colors duration-300">@fuad_first</a>
                  </template>
                </ContactInfo>

                <ContactInfo title="Location">
                  <template #icon>
                    <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </template>
                  <template #content>
                    <p class="text-text-light">Kyiv, Ukraine</p>
                  </template>
                </ContactInfo>
              </div>
            </div>

            <div class="bg-surface rounded-lg shadow-card p-8">
              <h2 class="text-3xl font-display font-semibold text-text mb-6">Social Media</h2>
              <div class="flex gap-4">
                <a href="https://www.linkedin.com/in/serhii-resnianskyi" class="group relative w-12 h-12 rounded-md overflow-hidden flex items-center justify-center">
                  <div class="absolute inset-0 bg-primary/10 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
                  <div class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <svg class="relative z-10 w-6 h-6 text-text-light group-hover:text-primary transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="https://github.com/DarkZeus" class="group relative w-12 h-12 rounded-md overflow-hidden flex items-center justify-center">
                  <div class="absolute inset-0 bg-primary/10 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
                  <div class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <svg class="relative z-10 w-6 h-6 text-text-light group-hover:text-primary transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="bg-surface rounded-lg shadow-card p-8">
            <h2 class="text-3xl font-display font-semibold text-text mb-6">Send a Message</h2>
            <form class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-text-light mb-2">Name</label>
                <input type="text" id="name" name="name" class="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-300" required>
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-text-light mb-2">Email</label>
                <input type="email" id="email" name="email" class="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-300" required>
              </div>
              <div>
                <label for="message" class="block text-sm font-medium text-text-light mb-2">Message</label>
                <textarea id="message" name="message" rows="4" class="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-300" required></textarea>
              </div>
              <button type="submit" class="group relative px-8 py-3 text-base font-medium rounded-md text-white overflow-hidden">
                <span class="relative z-10">Send Message</span>
                <div class="absolute inset-0 bg-primary opacity-100 group-hover:opacity-90 transition-opacity duration-300"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import HeroSection from '~/components/sections/HeroSection.vue'
import ContactInfo from '~/components/ui/ContactInfo.vue'
</script>