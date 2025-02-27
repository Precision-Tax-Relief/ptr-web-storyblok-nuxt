export default defineNuxtPlugin({
  name: "gtm-delayed-init",
  enforce: "post", // Run after other plugins
  setup(nuxtApp) {
    // Only run on client
    if (process.server || !nuxtApp.$config.public.useGtm) {
      console.log("Skipping GTM")
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
      }, 50) // 2-second delay for better TBT - adjust as needed
    })
  }
})
