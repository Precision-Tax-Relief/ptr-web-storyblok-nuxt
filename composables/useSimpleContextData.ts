import { useRoute } from "#app"
import type { RouteLocationNormalizedLoadedGeneric } from "vue-router"

export function useSimpleContextData() {
  // Return a function that gets context data when called
  return (): ContextInput => {
    // These calls are now deferred until the function is actually called
    let route: RouteLocationNormalizedLoadedGeneric
    let path: string | undefined

    try {
      route = useRoute()
      path = route.path
    } catch (e) {
      console.warn("Context data could not access route or cookies")
      path = undefined
    }

    // Safe query parameter function
    function getSafeQueryParam(query: string): string | undefined {
      let value = route.query?.[query]
      if (value === null) return ""
      if (Array.isArray(value)) return value.join(",")
      return value
    }

    return {
      page_url: process.client ? window.location.href : undefined,
      path: path,
      gclid: getSafeQueryParam("gclid"),
      msclkid: getSafeQueryParam("msclkid"),
      gbraid: getSafeQueryParam("gbraid"),
      mobile: detectMobileBrowser()
    }
  }
}
