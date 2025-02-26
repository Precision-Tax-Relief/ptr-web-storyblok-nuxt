export default defineNuxtPlugin({
  name: "gtm-delayed-init",
  enforce: "post", // Run after other plugins
  setup(nuxtApp) {
    // Only run on client
    if (process.server) return

    // Wait until after page is loaded and interactive
    window.addEventListener("load", () => {
      // Delay GTM initialization to improve TBT
      setTimeout(() => {
        const { $gtm } = nuxtApp
        if ($gtm) {
          $gtm.init()
        }
      }, 2000) // 2-second delay for better TBT - adjust as needed
    })
  }
})
