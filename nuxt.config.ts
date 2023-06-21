// https://nuxt.com/docs/api/configuration/nuxt-config
import type { NuxtConfig } from "@nuxt/types"
import { RichTextSchema } from "@storyblok/js"
import { fetchStories } from "./utils/fetchStories"

const config: NuxtConfig = {
  target: "static",
  css: ["@/assets/css/main.css"],
  modules: ["@storyblok/nuxt", "@nuxtjs/tailwindcss", "@nuxt/image", "nuxt-icon", "@pinia/nuxt", "nuxt-swiper"],
  buildModules: ["@nuxt/typescript-build"],
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
  vite: {
    resolve: {
      alias: process.env.NODE_ENV === "development" ? { vue: "vue/dist/vue.esm-bundler.js" } : {}
    },
    vue: {
      customElement: true
    },
    vueJsx: {
      mergeProps: true
    },
    optimizeDeps: {
      exclude: ["fsevents"]
    },
    server: {
      hmr: {
        // protocol: "wss" // Use with proxy
        protocol: "ws" // Use without proxy
      }
    }
  },
  storyblok: {
    accessToken: process.env.STORYBLOCK_TOKEN,
    bridge: process.env.NODE_ENV === "development",
    devtools: process.env.NODE_ENV === "development",
    richText: {
      shcema: RichTextSchema
    },
    apiOptions: {
      region: "us" // Set 'US" if your space is created in US region (EU default)
    }
  },
  image: {
    provider: "storyblok",
    storyblok: {
      baseURL: "https://a-us.storyblok.com"
    }
  },
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in"
    }
  },
  hooks: {
    async "nitro:config"(nitroConfig) {
      if (!nitroConfig || nitroConfig.dev) {
        return
      }
      const token = process.env.STORYBLOCK_TOKEN

      let cache_version = 0

      console.log(`https://api-us.storyblok.com/v2/cdn/spaces/me?token=${token}`)

      // other routes that are not in Storyblok with their slug.
      let routes = ["/"] // adds home directly but with / instead of /home
      try {
        const result = await fetch(`https://api-us.storyblok.com/v2/cdn/spaces/me?token=${token}`)

        if (!result.ok) {
          throw new Error("Could not fetch Storyblok data")
        }
        // timestamp of latest publish
        const space = await result.json()
        cache_version = space.space.version

        // Recursively fetch all routes and set them to the routes array
        await fetchStories(routes, cache_version)
        // Adds the routes to the prerenderer
        nitroConfig.prerender.routes.push(...routes)
      } catch (error) {
        console.error(error)
      }
    }
  }
}

export default config
