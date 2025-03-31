export function useLeadIdCookie() {
  return useCookie("lead_id", {
    maxAge: 60 * 60 * 24 // 1 day
  })
}
