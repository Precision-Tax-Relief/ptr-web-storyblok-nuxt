import { useRoute } from "#app"
import { useCookie } from "#app"
import type { RouteLocationNormalizedLoadedGeneric } from "vue-router"

export function useContextData() {
  // Return a function that gets context data when called
  return (): ContextInput => {
    // These calls are now deferred until the function is actually called
    let route: RouteLocationNormalizedLoadedGeneric
    let gaCookie: string | undefined
    let path: string | undefined

    try {
      route = useRoute()
      gaCookie = useCookie("_ga").value ?? undefined
      path = route.path
    } catch (e) {
      console.warn("Context data could not access route or cookies")
      path = undefined
      gaCookie = undefined
    }

    // Safe query parameter function
    function getSafeQueryParam(query: string): string | undefined {
      let value = route.query?.[query]
      if (value === null) return ""
      if (Array.isArray(value)) return value.join(",")
      return value
    }

    return {
      // @ts-ignore
      anonymous_id: process.client ? window?.analytics?.user?.()?.anonymousId?.() : undefined,
      ga_client_id: gaCookie,
      page_url: process.client ? window.location.href : undefined,
      referrer: process.client ? document.referrer : undefined,
      path: path,
      gclid: getSafeQueryParam("gclid"),
      msclkid: getSafeQueryParam("msclkid"),
      gbraid: getSafeQueryParam("gbraid"),
      utm_source: getSafeQueryParam("utm_source"),
      utm_medium: getSafeQueryParam("utm_medium"),
      utm_campaign: getSafeQueryParam("utm_campaign"),
      utm_content: getSafeQueryParam("utm_content"),
      mobile: detectMobileBrowser()
    }
  }
}
