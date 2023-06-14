// https://nuxt.com/docs/api/configuration/nuxt-config
import type { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  css: ['@/assets/css/main.css'],
  modules: [
    '@storyblok/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/image-edge',
    'nuxt-icon',
    '@pinia/nuxt',
    'nuxt-swiper'
  ],
  buildModules: ['@nuxt/typescript-build'],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {}
        }
      }
    }
  },
  storyblok: {
    accessToken: process.env.STORYBLOCK_TOKEN,
    bridge: process.env.NODE_ENV === 'development',
    devtools: process.env.NODE_ENV === 'development',
    apiOptions: {
      region: 'us' // Set 'US" if your space is created in US region (EU default)
    }
  },
  vite: {
    optimizeDeps: { exclude: ['fsevents'] },
    server: {
      hmr: {
        protocol: 'wss'
      }
    }
  },
  image: {
    provider: 'storyblok',
    storyblok: {
      baseURL: 'https://a-us.storyblok.com'
    }
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  }
}

export default config
