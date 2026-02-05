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
            :specs="item.specs"
          />
        </div>
      </CategorySection>

      <!-- PC Hardware -->
      <CategorySection title="PC Hardware" :icon="CpuChipIcon">
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <PcHardwareCard
            v-for="item in gear.pcHardware"
            :key="item.name"
            :name="item.name"
            :category="item.category"
            :image="item.image"
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
            :specs="item.specs"
          />
        </div>
      </CategorySection>

      <!-- Software -->
      <CategorySection title="Software" :icon="CommandLineIcon">
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <SoftwareCard
            v-for="item in gear.software"
            :key="item.name"
            :name="item.name"
            :category="item.category"
            :description="item.description"
            :icon="item.icon"
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
  CommandLineIcon,
  CpuChipIcon
} from '@heroicons/vue/24/outline'
import HeroSection from '~/components/sections/hero-section.vue'
import GearCard from '~/components/ui/gear-card.vue'
import SoftwareCard from '~/components/ui/software-card.vue'
import PcHardwareCard from '~/components/ui/pc-hardware-card.vue'
import CategorySection from '~/components/ui/category-section.vue'

const gear = {
  pcHardware: [
    {
      name: 'NCASE M2',
      category: 'Case',
      image: 'https://ncased.com/cdn/shop/files/M2_R_GMG_TG_1_20250808.jpg?v=1759164274',
      specs: [
        { label: 'Form', value: 'SFF' }
      ]
    },
    {
      name: 'AMD Ryzen 9700X',
      category: 'CPU',
      image: '//cdna.pcpartpicker.com/static/forever/images/product/a0f5a161d8c7ff3c6b0827423537a029.1600.jpg',
      specs: [
        { label: 'Cores', value: '8C/16T' },
        { label: 'Arch', value: 'Zen 5' }
      ]
    },
    {
      name: 'Inno3D iChill X3 RTX 3090',
      category: 'GPU',
      image: 'https://cdna.pcpartpicker.com/static/forever/images/product/011fa7bb0d458ed609df0f96ad640db6.1600.jpg',
      specs: [
        { label: 'VRAM', value: '24GB' }
      ]
    },
    {
      name: 'Corsair Vengeance DDR5',
      category: 'RAM',
      image: 'https://cdna.pcpartpicker.com/static/forever/images/product/894ce2f4aaaf96e8a0cc61288f9ff27d.1600.jpg',
      specs: [
        { label: 'Capacity', value: '64GB' },
        { label: 'Speed', value: '6400 MHz' },
        { label: 'Config', value: '2x32GB' }
      ]
    },
    {
      name: 'ASUS TUF Gaming B650M-Plus',
      category: 'Motherboard',
      image: 'https://cdna.pcpartpicker.com/static/forever/images/product/41f2fc275ab34cc9fcd97bea2a63ba7d.1600.jpg',
      specs: [
        { label: 'Socket', value: 'AM5' },
        { label: 'Form', value: 'mATX' },
        { label: 'WiFi', value: 'Yes' }
      ]
    },
    {
      name: 'Noctua NH-D12L',
      category: 'CPU Cooler',
      image: 'https://m.media-amazon.com/images/I/51d7un7JmNL.jpg',
      specs: [
        { label: 'Type', value: 'Air' }
      ]
    },
    {
      name: 'Noctua NF-A12x25',
      category: 'Case Fan',
      image: 'https://m.media-amazon.com/images/I/41ZywTiOj0L.jpg',
      specs: [
        { label: 'Size', value: '120mm' }
      ]
    },
    {
      name: 'CoolerMaster V SFX Platinum',
      category: 'PSU',
      image: 'https://cdna.pcpartpicker.com/static/forever/images/product/b27076b32ce1d0b5258e14594db71c8a.1600.jpg',
      specs: [
        { label: 'Wattage', value: '1300W' },
        { label: 'Form', value: 'SFX' },
        { label: 'Rating', value: '80+ Plat' }
      ]
    },
    {
      name: 'Lexar NM790',
      category: 'SSD',
      image: 'https://m.media-amazon.com/images/I/21voKXWSvhL.jpg',
      specs: [
        { label: 'Capacity', value: '4TB' },
        { label: 'Type', value: 'NVMe' }
      ]
    },
    {
      name: 'Crucial P3 Plus',
      category: 'SSD',
      image: 'https://cdna.pcpartpicker.com/static/forever/images/product/2830bf3ba317c794ccde742efe4304be.1600.jpg',
      specs: [
        { label: 'Capacity', value: '1TB' },
        { label: 'Type', value: 'NVMe' }
      ]
    }
  ],
  computer: [
    {
      name: 'MacBook Air M4 13"',
      category: 'Laptop',
      description: 'Main development machine',
      image: 'https://m.media-amazon.com/images/I/712dp0yAydL._AC_SL1500_.jpg',
      specs: ['M4', '24GB RAM']
    },
    {
      name: 'Samsung Odyssey OLED G6',
      category: 'Monitor',
      description: 'Primary 27" OLED gaming monitor',
      image: 'https://m.media-amazon.com/images/I/8127skgs+ML._AC_SL1500_.jpg',
      specs: ['27"', 'OLED', '360Hz']
    },
    {
      name: 'Asus TUF Gaming VG27AQ',
      category: 'Monitor',
      description: 'Secondary 27" IPS monitor',
      image: 'https://m.media-amazon.com/images/I/71bw2y-2ZRL._AC_SL1500_.jpg',
      specs: ['27"', 'IPS', '165Hz']
    },
    {
      name: 'Ultradesk UPLIFT Black',
      category: 'Desk',
      description: 'Electric sit/stand desk',
      image: 'https://ultra-desk.com/wp-content/uploads/2023/07/wd-4.png',
      specs: ['Electric', 'Black']
    }
  ],
  peripherals: [
    {
      name: 'Keychron K1',
      category: 'Keyboard',
      description: 'Low-profile mechanical keyboard',
      image: 'https://www.keychron.com/cdn/shop/products/keychron-k1-v5-ultra-slim-wireless-mechanical-keyboard-87-keys-white-backlight-gateron-mechanical-low-profile-brown-switch.jpg?v=1638354448&width=900',
      specs: ['Gateron Brown', 'Wireless']
    },
    {
      name: 'Leopold FC750RBT',
      category: 'Keyboard',
      description: 'Premium tenkeyless mechanical',
      image: 'https://mechanicalkeyboards.com/cdn/shop/files/6162_62a3d1ca32231_FC750RBT-Bluetooth-GrayBlue-PD.jpg?v=1707269949&width=2400',
      specs: ['Cherry MX Brown', 'Bluetooth']
    },
    {
      name: 'Keychron M6',
      category: 'Mouse',
      description: 'High-performance wireless mouse',
      image: 'https://www.keychron.com/cdn/shop/files/Keychron-M6-wireless-8K-mouse-white..jpg?v=1762586831&width=900',
      specs: ['8K polling', 'Wireless']
    }
  ],
  audio: [
    {
      name: 'Steinberg UR22C',
      category: 'Audio Interface',
      description: 'USB-C audio interface for recording',
      image: 'https://ocl-steinberg-live.steinberg.net/_storage/asset/260287/storage/PNG_extra-large_5500px/260287-extra-large.png',
      specs: ['USB-C', '32-bit/192kHz']
    },
    {
      name: 'AKG K240 Mk.II',
      category: 'Headphones',
      description: 'Semi-open studio headphones',
      image: 'https://www.akg.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwe2efc33e/AKG_k240mkII_white1.png?sw=1605&sh=1605',
      specs: ['55 Ohm', 'Semi-open']
    },
    {
      name: 'Rode NT1',
      category: 'Microphone',
      description: 'Large diaphragm condenser mic',
      image: 'https://edge.rode.com/images/page/1856/modules/4368/R%C3%98DE_NT1_SM6_KIT_3-QUARTER_LEFT_FRONT_1080x1080.png',
      specs: ['Cardioid', 'Low noise']
    },
    {
      name: 'Apple AirPods 4',
      category: 'Earbuds',
      description: 'Wireless earbuds for mobile',
      image: 'https://m.media-amazon.com/images/I/51ppBwqC4xL._AC_SL1500_.jpg',
      specs: ['Spatial Audio']
    },
    {
      name: 'KZ ZS10 Pro',
      category: 'IEMs',
      description: 'In-ear monitors',
      image: 'https://kz-audio.com/images/kz-zs10pro-s13-01.jpg',
      specs: ['4BA+1DD', 'Hybrid']
    }
  ],
  software: [
    {
      name: 'WebStorm',
      category: 'IDE',
      description: 'JetBrains IDE for web development',
      icon: ''
    },
    {
      name: 'VS Code',
      category: 'Editor',
      description: 'Lightweight code editor',
      icon: ''
    },
    {
      name: 'Claude Code',
      category: 'AI Coding',
      description: 'AI-powered coding assistant',
      icon: ''
    },
    {
      name: 'Ghostty',
      category: 'Terminal',
      description: 'GPU-accelerated terminal',
      icon: ''
    },
    {
      name: 'Brave',
      category: 'Browser',
      description: 'Privacy-focused browser',
      icon: ''
    },
    {
      name: 'Chrome',
      category: 'Browser',
      description: 'Web development & testing',
      icon: ''
    },
    {
      name: 'Raycast',
      category: 'Productivity',
      description: 'Spotlight replacement with extensions',
      icon: ''
    },
    {
      name: 'Obsidian',
      category: 'Notes',
      description: 'Local-first markdown notes',
      icon: ''
    }
  ]
}
</script>
