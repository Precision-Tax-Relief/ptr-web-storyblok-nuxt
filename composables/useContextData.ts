// composables/useContextData.ts
import { useRoute } from "#app"
import { useCookie } from "#app"
import type { RouteLocationNormalizedLoadedGeneric } from "vue-router"

export function useContextData() {
  // Return a function that gets context data when called
  return () => {
    // These calls are now deferred until the function is actually called
    let route: RouteLocationNormalizedLoadedGeneric
    let gaCookie

    try {
      route = useRoute()
      gaCookie = useCookie("_ga")
    } catch (e) {
      console.warn("Context data could not access route or cookies")
      return {
        tax_amount_id: 14,
        path: "/"
        // Default empty values for other fields
      }
    }

    // Safe query parameter function
    function getSafeQueryParam(query: string): string | undefined {
      let value = route.query?.[query]
      if (value === null) return ""
      if (Array.isArray(value)) return value.join(",")
      return value
    }

    return {
      anonymous_id: process.client ? window?.analytics?.user?.()?.anonymousId?.() : undefined,
      ga_client_id: gaCookie.value ?? undefined,
      page_url: process.client ? window.location.href : undefined,
      referrer: process.client ? document.referrer : undefined,
      path: route.path,
      tax_amount_id: 14,
      gclid: getSafeQueryParam("gclid"),
      msclkid: getSafeQueryParam("msclkid"),
      gbraid: getSafeQueryParam("gbraid"),
      utm_source: getSafeQueryParam("utm_source"),
      utm_medium: getSafeQueryParam("utm_medium"),
      utm_campaign: getSafeQueryParam("utm_campaign"),
      utm_content: getSafeQueryParam("utm_content")
    }
  }
}
