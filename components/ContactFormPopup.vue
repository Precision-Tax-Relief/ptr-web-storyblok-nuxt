<script setup lang="ts">
const { isBusinessOpen } = useBusinessHours()

import { useContactFormPopUp } from "~/composables/ContactFormPopUp"
const { showPopup, openPopup, closePopup } = useContactFormPopUp()

interface PropTypes {
  lighter_text?: Boolean
}

defineProps<PropTypes>()

const openPopuPmodal = async (event: MouseEvent): Promise<void> => {
  openPopup()
}

const handleBackdropClick = (): void => {
  closePopup()
}

const handleModalClick = (event: MouseEvent): void => {
  // Prevent backdrop close when clicking inside modal
  event.stopPropagation()
}

// Prevent body scroll when modal is open
watch(showPopup, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = ""
  }
})
</script>

<template>
  <div>
    <a
      class="activate-form cursor-pointer underline"
      :class="{ 'text-neutral-500': !lighter_text, 'text-black-400': lighter_text }"
      @click.prevent="openPopuPmodal"
      >or click here to request a call back</a
    >

    <!-- Animated Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showPopup"
          class="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75 p-4"
          @click="handleBackdropClick"
        >
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 scale-95 translate-y-4"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 translate-y-4"
          >
            <div
              v-if="showPopup"
              class="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white shadow-xl md:max-w-2xl"
              @click="handleModalClick"
            >
              <!-- Close Button - Large and easy to tap -->
              <button
                @click="closePopup"
                class="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors duration-150 hover:bg-gray-200 active:bg-gray-300"
                type="button"
                aria-label="Close"
              >
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <!-- Form Content -->
              <div class="px-4 pb-4 pt-5 sm:p-6">
                <ContactForm :show-phone-number="isBusinessOpen" />
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
