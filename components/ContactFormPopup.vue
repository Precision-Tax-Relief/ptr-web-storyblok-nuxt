<script setup lang="ts">
import { ref, reactive } from "vue"
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue"
const { isBusinessOpen } = useBusinessHours()
import { detectMobileBrowser } from "~/utils/mobileDetect"

// SSR-safe mobile detection
const isMobile = ref(false)
onMounted(() => {
  isMobile.value = detectMobileBrowser()
})
import { useContactFormPopUp } from "~/composables/ContactFormPopUp"

const { showPopup, openPopup, closePopup } = useContactFormPopUp()
onMounted(() => {
  const link = document.querySelector(".activate-form")
  if (link) {
    link.addEventListener("click", (e) => {
      if (isMobile.value) {
        e.preventDefault()
        openPopup()
      }
    })
  }
})
const analytics = useSegment()
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
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 w-screen overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
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
              <ContactForm :show-phone-number="isBusinessOpen" />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
