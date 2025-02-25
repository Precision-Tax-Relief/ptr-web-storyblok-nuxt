// https://nuxt.com/docs/api/configuration/nuxt-config
import type { NuxtConfig } from "@nuxt/types"

import fetch from "node-fetch"

const toIgnore = ["index", "layouts/default"]

async function fetchStories(routes: string[], cacheVersion: number, page = 1) {
  const token = process.env.STORYBLOK_ACCESS_TOKEN
  const version = "published"
  const perPage = 100

  try {
    const response = await fetch(
      `https://api-us.storyblok.com/v2/cdn/links?token=${token}&version=${version}&per_page=${perPage}&page=${page}&cv=${cacheVersion}`
    )
    const data = (await response.json()) as any

    // Add routes to the array
    Object.values(data.links).forEach((link: any) => {
      if (!toIgnore.includes(link.slug) && !link.is_folder && !link.slug.startsWith("layouts")) {
        routes.push("/" + link.slug)
      }
    })

    // Check if there are more pages with links

    const total = response.headers.get("total") as any
    const maxPage = Math.ceil(total / perPage)

    if (maxPage > page) {
      await fetchStories(routes, cacheVersion, ++page)
    }
  } catch (error) {
    console.error(error)
  }
}

const config: NuxtConfig = {
  compatibilityDate: "2025-02-25",
  target: "static",
  css: ["@/assets/css/main.css"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "nuxt-headlessui",
    "@nuxt/image",
    "@nuxt/eslint",
    "@nuxt/icon",
    "nuxt-swiper",
    "@nuxtjs/google-fonts",
    "@nuxtjs/sitemap",
    // "@zadigetvoltaire/nuxt-gtm",
    [
      "@storyblok/nuxt",
      {
        accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
        bridge: process.env.DEV_TOOLS,
        devtools: process.env.DEV_TOOLS,
        apiOptions: {
          region: "us" // Set "US" if your space is created in US region (EU default)
        }
      }
    ]
  ],
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
  runtimeConfig: {
    public: {
      siteUrl: process.env.URL || "https://localhost:3000",
      storyblokVersion: process.env.STORYBLOK_VERSION || "published"
    }
  },
  vite: {
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
        protocol: process.env.WS_PROTOCOL ? process.env.WS_PROTOCOL : "wss" // Use with proxy
      }
    }
  },
  swiper: {
    styleLazyLoad: true
  },
  headlessui: {
    prefix: "Headless"
  },
  image: {
    provider: "storyblok",
    storyblok: {
      baseURL: "https://a-us.storyblok.com"
    }
  },
  hooks: {
    async "nitro:config"(nitroConfig) {
      if (!nitroConfig || nitroConfig.dev) {
        return
      }
      const token = process.env.STORYBLOK_ACCESS_TOKEN

      let cache_version = 0

      // other routes that are not in Storyblok with their slug.
      const routes = ["/"] // adds home directly but with / instead of /index
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
  },
  nitro: {
    prerender: {
      crawlLinks: false
    }
  },
  googleFonts: {}
}
// sitemap: {
//   // manually chunk into multiple sitemaps
//   sitemaps: {
//     post: {
//       include: ["/blog/**"]
//     },
//     model: {
//       include: ["/model/**"]
//     },
//     page: {
//       exclude: ["/blog/**", "/model/**"]
//     }
//   }
// },
// gtm: {
//   id: "GTM-NG5ZNPS",
//   defer: true,
//   enabled: process.env.NODE_ENV !== "development",
//   debug: false,
//   devtools: false
// }

export default config
