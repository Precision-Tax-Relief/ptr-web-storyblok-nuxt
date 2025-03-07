export default defineNuxtPlugin({
  name: "gtm-delayed-init",
  enforce: "post", // Run after other plugins
  setup(nuxtApp) {
    // Only run on client
    if (import.meta.server || !nuxtApp.$config.public.useGtm) {
      return
    }

    // Wait until after page is loaded and interactive
    window.addEventListener("load", () => {
      // Delay GTM initialization to improve TBT
      setTimeout(() => {
        const gtm = useGtm()
        if (gtm) {
          gtm.enable(true)
        }
      }, 150) // 2-second delay for better TBT - adjust as needed
    })
  }
})
