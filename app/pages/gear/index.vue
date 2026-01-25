<template>
  <div>
    <HeroSection>
      <template #title>Gear</template>
      <template #description>
        The tools and equipment I use daily
      </template>
    </HeroSection>

    <!-- Gear Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Computer & Desk -->
      <CategorySection title="Computer & Desk" :icon="ComputerDesktopIcon">
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <GearCard
            v-for="item in gear.computer"
            :key="item.name"
            :name="item.name"
            :category="item.category"
            :description="item.description"
            :image="item.image"
            :link="item.link"
            :specs="item.specs"
          />
        </div>
      </CategorySection>

      <!-- Peripherals -->
      <CategorySection title="Peripherals" :icon="CursorArrowRaysIcon">
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <GearCard
            v-for="item in gear.peripherals"
            :key="item.name"
            :name="item.name"
            :category="item.category"
            :description="item.description"
            :image="item.image"
            :link="item.link"
            :specs="item.specs"
          />
        </div>
      </CategorySection>

      <!-- Audio & Video -->
      <CategorySection title="Audio & Video" :icon="SpeakerWaveIcon">
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <GearCard
            v-for="item in gear.audio"
            :key="item.name"
            :name="item.name"
            :category="item.category"
            :description="item.description"
            :image="item.image"
            :link="item.link"
            :specs="item.specs"
          />
        </div>
      </CategorySection>

      <!-- Software -->
      <CategorySection title="Software" :icon="CommandLineIcon">
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <GearCard
            v-for="item in gear.software"
            :key="item.name"
            :name="item.name"
            :category="item.category"
            :description="item.description"
            :image="item.image"
            :link="item.link"
            :specs="item.specs"
          />
        </div>
      </CategorySection>
    </div>
  </div>
</template>

<script setup>
import {
  ComputerDesktopIcon,
  CursorArrowRaysIcon,
  SpeakerWaveIcon,
  CommandLineIcon
} from '@heroicons/vue/24/outline'
import HeroSection from '~/components/sections/hero-section.vue'
import GearCard from '~/components/ui/gear-card.vue'
import CategorySection from '~/components/ui/category-section.vue'

const gear = {
  computer: [
    {
      name: 'MacBook Pro 14"',
      category: 'Laptop',
      description: 'My main development machine with excellent performance and battery life',
      image: '',
      specs: ['M3 Pro', '18GB RAM', '512GB SSD'],
      link: '#'
    },
    {
      name: 'Dell UltraSharp U2723QE',
      category: 'Monitor',
      description: '27-inch 4K USB-C monitor with excellent color accuracy',
      image: '',
      specs: ['27"', '4K', 'USB-C', 'IPS'],
      link: '#'
    },
    {
      name: 'IKEA BEKANT',
      category: 'Desk',
      description: 'Sit/stand desk for ergonomic working throughout the day',
      image: '',
      specs: ['160x80cm', 'Electric', 'White'],
      link: '#'
    }
  ],
  peripherals: [
    {
      name: 'Logitech MX Master 3S',
      category: 'Mouse',
      description: 'Wireless ergonomic mouse with excellent scrolling and multi-device support',
      image: '',
      specs: ['Wireless', 'USB-C', '8K DPI'],
      link: '#'
    },
    {
      name: 'Keychron K2 Pro',
      category: 'Keyboard',
      description: 'Wireless mechanical keyboard with hot-swappable switches',
      image: '',
      specs: ['75%', 'Wireless', 'Hot-swap'],
      link: '#'
    },
    {
      name: 'Logitech MX Palm Rest',
      category: 'Accessory',
      description: 'Memory foam palm rest for comfortable typing',
      image: '',
      specs: ['Memory Foam', 'Anti-slip'],
      link: '#'
    }
  ],
  audio: [
    {
      name: 'Sony WH-1000XM5',
      category: 'Headphones',
      description: 'Industry-leading noise cancellation for focused work',
      image: '',
      specs: ['ANC', 'Wireless', '30h Battery'],
      link: '#'
    },
    {
      name: 'Blue Yeti X',
      category: 'Microphone',
      description: 'USB condenser microphone for calls and recordings',
      image: '',
      specs: ['USB', 'Condenser', '4 Patterns'],
      link: '#'
    },
    {
      name: 'Elgato Wave Mic Arm',
      category: 'Accessory',
      description: 'Low-profile boom arm for clean desk setup',
      image: '',
      specs: ['Low Profile', 'Cable Channel'],
      link: '#'
    }
  ],
  software: [
    {
      name: 'VS Code',
      category: 'Editor',
      description: 'Primary code editor with extensive extension ecosystem',
      image: '',
      specs: ['Free', 'Cross-platform'],
      link: 'https://code.visualstudio.com/'
    },
    {
      name: 'Figma',
      category: 'Design',
      description: 'Collaborative design tool for UI/UX work',
      image: '',
      specs: ['Free tier', 'Web-based'],
      link: 'https://figma.com/'
    },
    {
      name: 'Warp',
      category: 'Terminal',
      description: 'Modern terminal with AI-powered features',
      image: '',
      specs: ['macOS', 'AI-powered'],
      link: 'https://warp.dev/'
    },
    {
      name: 'Arc',
      category: 'Browser',
      description: 'Innovative browser that reimagines web browsing',
      image: '',
      specs: ['Free', 'Chromium-based'],
      link: 'https://arc.net/'
    },
    {
      name: 'Raycast',
      category: 'Productivity',
      description: 'Spotlight replacement with powerful extensions',
      image: '',
      specs: ['Free', 'macOS'],
      link: 'https://raycast.com/'
    },
    {
      name: '1Password',
      category: 'Security',
      description: 'Password manager for secure credential storage',
      image: '',
      specs: ['Cross-platform', 'Team sharing'],
      link: 'https://1password.com/'
    }
  ]
}
</script>
