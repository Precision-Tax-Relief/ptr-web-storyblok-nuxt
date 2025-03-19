// composables/useContextData.ts
import { useRoute } from "vue-router"
import { useCookie } from "nuxt/app"

/**
 * Safe query parameter retrieval function
 */
function getSafeQueryParam(query: string): string | undefined {
  const route = useRoute()
  let value = route.query?.[query]
  if (value === null) return ""
  if (Array.isArray(value)) return value.join(",")
  return value
}

/**
 * Composable to get context data for tracking and submissions
 * @returns Context data object
 */
export function useContextData(): ContextInput {
  const route = useRoute()
  const anonymousId = process.client ? window?.analytics?.user()?.anonymousId() : undefined
  const ga_client_id = useCookie("_ga").value ?? undefined

  return {
    anonymousId,
    ga_client_id,
    page_url: process.client ? document.URL : undefined,
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
