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
    "@zadigetvoltaire/nuxt-gtm",
    "maz-ui/nuxt",
    "nuxt-delay-hydration",
    "@nuxtjs/critters",
    [
      "@storyblok/nuxt",
      {
        accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
        bridge: process.env.NODE_ENV === "development",
        devtools: process.env.NODE_ENV === "development",
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
          autoprefixer: {},
          ...(process.env.NODE_ENV === "production"
            ? {
                cssnano: {
                  preset: [
                    "default",
                    {
                      discardComments: { removeAll: true },
                      minifyFontValues: { removeQuotes: false }
                    }
                  ]
                }
              }
            : {})
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.URL || "https://localhost:3000",
      storyblokVersion: process.env.STORYBLOK_VERSION || "published",
      useGtm: !!process.env.GTM_ID,
      gtmId: process.env.GTM_ID
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
    quality: 75,
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
      crawlLinks: false,
      failOnError: true
    }
  },
  googleFonts: {
    prefetch: true,
    preconnect: true,
    preload: true,
    families: {
      "Open Sans": true
    }
  },
  gtm: {
    id: process.env.GTM_ID || "GTM-XXXXXX", // Replace with your new GTM container ID
    defer: true, // This improves performance by deferring script loading
    compatibility: true, // For SSR compatibility
    enabled: false, // This is enabled in the gtm.client.ts plug after page load
    loadScript: true,
    enableRouterSync: true // Track page views automatically
  },
  future: {
    // Enable auto-imports in shared/utils/ and shared/types/
    compatibilityVersion: 4
  },
  delayHydration: {
    mode: "init",
    debug: true
  },
  mazUi: {
    injectCss: true,
    injectAos: false,
    injectUseToast: false,
    injectUseWait: false,
    injectUseThemeHandler: false,
    injectUseIdleTimeout: false,
    injectUseUserVisibility: false,
    injectUseTimer: false,
    injectUseWindowSize: false,
    injectUseBreakpoints: false,
    installVZoomImg: false,
    installVClickOutside: false,
    installVFullscreenImg: false,
    installVLazyImg: false,
    installVTooltip: false,
    injectComponents: false,
    defaultMazIconPath: false
  }
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

export default config
