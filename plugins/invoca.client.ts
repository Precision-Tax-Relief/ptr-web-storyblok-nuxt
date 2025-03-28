export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:created", () => {
    window.InvocaTagId = "2085/4188255346"
  })

  useHead({
    script: [
      {
        type: "text/javascript",
        async: true,
        src: "https://solutions.invocacdn.com/js/invoca-latest.min.js"
      }
    ]
  })
})
