// components/ExitIntentPopup.vue
<template>
  <TransitionRoot as="template" :show="showPopup">
    <Dialog class="relative z-50" @close="closePopup">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6"
            >
              <div class="absolute right-0 top-0 pr-4 pt-4">
                <button
                  type="button"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 flex focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  @click="closePopup"
                >
                  <span class="sr-only">Close</span>
                  <Icon name="mdi:close" class="size-8" />
                </button>
              </div>
              <div>
                <div
                  class="mx-auto flex size-14 items-center justify-center rounded-full bg-primaryLight bg-opacity-20"
                >
                  <Icon name="fa-solid:envelope" class="size-8 text-primary" />
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-lg font-semibold leading-6 text-gray-900">
                    Did you know that 90% of tax issues can be resolved without professional help?
                  </DialogTitle>
                </div>
              </div>
              <div class="mt-4">
                <p class="text-sm text-gray-600">Get our Free DIY Guide to Resolving IRS Tax Problems</p>
              </div>
              <form @submit.prevent="handleSubmit" class="mt-1">
                <div class="space-y-4">
                  <div>
                    <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                    <div class="mt-2">
                      <input
                        type="text"
                        id="name"
                        v-model="name"
                        required
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                  <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                    <div class="mt-2">
                      <input
                        type="email"
                        id="email"
                        v-model="email"
                        required
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                </div>
                <div class="mt-5">
                  <button
                    type="submit"
                    class="inline-flex w-full justify-center rounded-md bg-primaryDark px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Subscribe
                  </button>
                </div>
                <div class="mt-3 text-center">
                  <button type="button" class="text-sm text-gray-500 hover:text-gray-700" @click="closePopup">
                    No thanks
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue"

const props = defineProps({
  // Time in milliseconds before showing popup on mobile due to inactivity
  mobileTimeout: {
    type: Number,
    default: 15000
  },
  // Number of days to wait before showing the popup again
  cookieExpiration: {
    type: Number,
    default: 30
  },
  // Time in milliseconds to delay the popup after page load
  initialDelay: {
    type: Number,
    default: 5000
  }
})

const showPopup = ref(false)
const name = ref("")
const email = ref("")
const inactivityTimer = ref(null)
let hasShownPopup = false

// Function to close popup
const closePopup = () => {
  showPopup.value = false
  setCookie()
}

// Form submission handler
const handleSubmit = () => {
  // Handle form submission logic here
  showPopup.value = false
  setCookie()
}

// Check if cookie exists to prevent showing popup repeatedly
const hasCookie = () => {
  // TODO remove this after testing
  return false
  if (process.server) return false
  return document.cookie.split(";").some((c) => {
    return c.trim().startsWith("exitIntentShown=")
  })
}

// Set cookie when popup is closed
const setCookie = () => {
  if (process.server) return
  const date = new Date()
  date.setTime(date.getTime() + props.cookieExpiration * 24 * 60 * 1000) // One day timeout
  document.cookie = `exitIntentShown=true; expires=${date.toUTCString()}; path=/`
}

// Desktop exit intent detection
const detectDesktopExitIntent = (e) => {
  if (!hasShownPopup && !hasCookie() && e.clientY <= 0) {
    showPopup.value = true
    hasShownPopup = true
  }
}

// Reset inactivity timer for mobile
const resetInactivityTimer = () => {
  if (process.server) return
  clearTimeout(inactivityTimer.value)
  inactivityTimer.value = setTimeout(() => {
    if (!hasShownPopup && !hasCookie()) {
      showPopup.value = true
      hasShownPopup = true
    }
  }, props.mobileTimeout)
}

// Detect mobile back button press or tab change
const handleVisibilityChange = () => {
  if (document.visibilityState === "hidden" && !hasShownPopup && !hasCookie()) {
    // User is navigating away, show popup when they return
    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.visibilityState === "visible" && !hasShownPopup) {
          showPopup.value = true
          hasShownPopup = true
        }
      },
      { once: true }
    )
  }
}

onMounted(() => {
  if (process.server) return

  // Skip if cookie exists
  if (hasCookie()) return

  // Initial delay before enabling exit intent
  setTimeout(() => {
    // const isMobile = detectMobileBrowser()
    const isMobile = true

    if (isMobile) {
      // Mobile exit intent detection
      // document.addEventListener("touchstart", resetInactivityTimer)
      // document.addEventListener("touchmove", resetInactivityTimer)
      document.addEventListener("visibilitychange", handleVisibilityChange)
      resetInactivityTimer()
    } else {
      // Desktop exit intent detection
      document.addEventListener("mouseout", detectDesktopExitIntent)
    }
  }, props.initialDelay)
})

onUnmounted(() => {
  if (process.server) return

  clearTimeout(inactivityTimer.value)
  document.removeEventListener("mouseout", detectDesktopExitIntent)
  document.removeEventListener("touchstart", resetInactivityTimer)
  document.removeEventListener("touchmove", resetInactivityTimer)
  document.removeEventListener("visibilitychange", handleVisibilityChange)
})
</script>
