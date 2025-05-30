<script setup lang="ts">
import { ref, reactive } from "vue"
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue"
import { ServerResponseSchema } from "#shared/utils/validators/apiResponse"
import { EbookFormSchema } from "#shared/utils/validators/ebook"
import { formatZodErrors } from "#shared/utils/validators/errorFormaters"
import MazInput from "maz-ui/components/MazInput"
const analytics = useSegment()

const props = defineProps({
  // Time in milliseconds before showing popup on mobile due to inactivity
  mobileTimeout: {
    type: Number,
    default: 20000
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
const inactivityTimer = ref<NodeJS.Timeout | undefined>(undefined)
let hasShownPopup = false
const formData = reactive<EbookFormInput>({
  name: "",
  email: ""
})

const exitIntentCookie = useCookie("exitIntentShown", {
  maxAge: props.cookieExpiration * 24 * 60 * 60 // One day expiration
})

const openPopup = () => {
  analytics.track("Exit Popup Open")
  showPopup.value = true
  hasShownPopup = true
}

const closePopup = () => {
  if (!isSuccess.value) {
    analytics.track("Exit Popup Close")
  }
  showPopup.value = false
  setCookie()
}

// Check if cookie exists
const hasCookie = () => {
  return !!exitIntentCookie.value
}

// Set cookie when popup is closed
const setCookie = () => {
  exitIntentCookie.value = "true"
}

// Desktop exit intent detection
const detectDesktopExitIntent = (e: MouseEvent) => {
  if (!hasShownPopup && !hasCookie() && e.clientY <= 0) {
    openPopup()
  }
}

// Reset inactivity timer for mobile
const resetInactivityTimer = () => {
  if (process.server) return
  clearTimeout(inactivityTimer.value)
  inactivityTimer.value = setTimeout(() => {
    if (!hasShownPopup && !hasCookie()) {
      openPopup()
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
          openPopup()
        }
      },
      { once: true }
    )
  }
}

// Track scroll position and direction
const lastScrollTop = ref(0)
const scrollingUp = ref(false)
const scrollUpThreshold = 900
const scrollUpDistance = ref(0)

// Detect rapid upward scrolling (could indicate user is going to close tab)
const handleScroll = () => {
  if (hasShownPopup || hasCookie()) return

  const st = window.pageYOffset || document.documentElement.scrollTop

  // Check if we're scrolling up
  if (st < lastScrollTop.value) {
    scrollingUp.value = true
    scrollUpDistance.value += lastScrollTop.value - st

    // If user has scrolled up significantly and we're near the top
    if (scrollUpDistance.value > scrollUpThreshold && st < 700) {
      openPopup()
    }
  } else {
    // Reset when scrolling down
    scrollingUp.value = false
    scrollUpDistance.value = 0
  }

  lastScrollTop.value = st <= 0 ? 0 : st
}

// Form validation
type errorsType = {
  name?: string
  email?: string
}
let errors: errorsType = reactive({})

const validateForm = (): boolean => {
  errors.name = undefined
  errors.email = undefined

  const result = EbookFormSchema.safeParse(formData)

  if (!result.success) {
    let zodErrors = formatZodErrors<typeof errors>(result.error)
    console.log(zodErrors)
    errors.name = zodErrors?.name
    errors.email = zodErrors?.email
    return false
  }
  return true
}

async function submitEbookForm(data: EbookPayloadInput): Promise<ServerResponse> {
  try {
    const response = await fetch("/api/ebook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const jsonResponse = await response.json()

    // Use safeParse instead of parse
    const result = ServerResponseSchema.safeParse(jsonResponse)

    if (!result.success) {
      return {
        success: false,
        message: "Unexpected Server Response"
      }
    }

    return result.data
  } catch (error) {
    // Handle any other errors (network errors, etc.)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error occurred"
    } satisfies ServerErrorResponse
  }
}

const isSubmitting = ref(false)
const isSuccess = ref(false)
const errorMessage = ref<string>("")

const submitForm = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  isSuccess.value = false
  errorMessage.value = ""

  const contextData = useContextData()
  const resp = await submitEbookForm({ form: formData, context: contextData() })

  if (!resp.success) {
    if (resp?.errors?.form && typeof resp.errors.form !== "string") {
      errors = resp.errors.form
    } else {
      errorMessage.value = resp.message
    }
    isSubmitting.value = false
    return
  }

  isSubmitting.value = false
  isSuccess.value = true
  setCookie()
}

onMounted(() => {
  if (process.server) return

  // Skip if cookie exists
  if (hasCookie()) return

  // Initial delay before enabling exit intent
  setTimeout(() => {
    const isMobile = detectMobileBrowser()

    if (isMobile) {
      // Mobile exit intent detection
      document.addEventListener("touchstart", resetInactivityTimer)
      document.addEventListener("touchmove", resetInactivityTimer)
      resetInactivityTimer()
    } else {
      // Desktop exit intent detection
      document.addEventListener("mouseout", detectDesktopExitIntent)
    }

    // Common handlers for both desktop and mobile
    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("scroll", handleScroll, { passive: true })
  }, props.initialDelay)
})

onUnmounted(() => {
  if (process.server) return

  clearTimeout(inactivityTimer.value)
  document.removeEventListener("mouseout", detectDesktopExitIntent)
  document.removeEventListener("touchstart", resetInactivityTimer)
  document.removeEventListener("touchmove", resetInactivityTimer)
  document.removeEventListener("visibilitychange", handleVisibilityChange)
  window.removeEventListener("scroll", handleScroll)
})
</script>

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
        <div class="fixed inset-0 z-10 bg-gray-500/75 transition-opacity" />
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
              class="relative w-full transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:max-w-md sm:p-6 md:max-w-2xl"
            >
              <div class="absolute right-0 top-0 z-10 pr-4 pt-4">
                <button
                  type="button"
                  class="flex rounded-md bg-white text-gray-400 focus:outline-none focus:ring-2 focus:ring-primaryDark focus:ring-offset-2"
                  :class="{ 'hover:text-gray-500': !isSubmitting }"
                  @click="closePopup"
                  :disabled="isSubmitting"
                >
                  <span class="sr-only">Close</span>
                  <Icon name="mdi:close" class="size-8" />
                </button>
              </div>
              <div class="flex justify-center gap-6">
                <NuxtImg
                  src="https://a-us.storyblok.com/f/1023258/220x276/6e4d600673/how-to-guide-5-step-we-use-to-tax-issues.webp"
                  alt="Free How-To Guide: 5 steps we use to clear up over 1,500 tax issues every year"
                  class="my-auto hidden md:block"
                  format="webp"
                  width="220"
                  height="276"
                ></NuxtImg>
                <div class="relative flex flex-col justify-center">
                  <span
                    class="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform opacity-0 transition-opacity"
                    :class="{ 'opacity-100': isSubmitting }"
                  >
                    <Icon name="line-md:loading-twotone-loop" class="size-16 rounded-full text-primary" />
                  </span>
                  <div>
                    <div class="mr-8 text-lg">
                      <DialogTitle as="h3" class="text-lg font-semibold leading-6 text-gray-900">
                        Did you know that 90% of tax issues can be resolved without professional help?
                      </DialogTitle>
                    </div>
                  </div>
                  <div class="my-4">
                    <p class="text-sm text-gray-600">Get our Free DIY Guide to Resolving IRS Tax Problems</p>
                  </div>

                  <div v-if="!!errorMessage" class="mb-6 rounded border-l-4 border-red-500 bg-red-100 p-4 text-red-700">
                    <p>{{ errorMessage || "An error occurred. Please try again." }}</p>
                  </div>
                  <form
                    onsubmit="return false"
                    class="relative mt-1 transition-opacity"
                    :class="{ 'opacity-60': isSubmitting }"
                  >
                    <transition
                      enter-active-class="transition ease-out duration-200"
                      enter-from-class="opacity-0"
                      enter-to-class="opacity-100"
                    >
                      <div
                        v-if="isSuccess"
                        class="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-white pb-10"
                      >
                        <span class="flex rounded-full bg-primaryLight bg-opacity-40 p-2">
                          <Icon name="line-md:email-check" class="size-10 text-primaryDark" />
                        </span>
                        <span class="text-lg font-semibold text-gray-900">Check your email to download the guide</span>
                      </div>
                    </transition>
                    <div class="space-y-4">
                      <div>
                        <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                        <div class="mt-2">
                          <MazInput
                            v-model="formData.name"
                            type="text"
                            :assistive-text="errors.name"
                            :error="!!errors.name"
                            :disabled="isSubmitting"
                            size="sm"
                            block
                          />
                        </div>
                      </div>
                      <div>
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                        <div class="mt-2">
                          <MazInput
                            v-model="formData.email"
                            label="you@example.com"
                            type="email"
                            :assistive-text="errors.email"
                            :error="!!errors.email"
                            :disabled="isSubmitting"
                            size="sm"
                            block
                          />
                        </div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <button
                        type="submit"
                        class="inline-flex w-full justify-center rounded-md bg-primaryDark px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        :class="{ 'hover:opacity-85': !isSubmitting }"
                        @click.prevent="submitForm"
                        :disabled="isSubmitting"
                      >
                        Submit
                      </button>
                    </div>
                    <div class="mt-3 text-center">
                      <button
                        type="button"
                        class="text-sm text-gray-500"
                        :class="{ 'hover:text-gray-700': !isSubmitting }"
                        @click="closePopup"
                        :disabled="isSubmitting"
                      >
                        No thanks
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
