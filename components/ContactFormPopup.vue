<script setup lang="ts">
import { ref, watch } from "vue"
import { useBusinessHours } from "@/composables/useBusinessHours"

const { isBusinessOpen } = useBusinessHours()

const showPopup = ref(false)

const openPopup = () => {
  showPopup.value = true
}

const closePopup = () => {
  showPopup.value = false
}

// Prevent body scroll when modal is open
watch(showPopup, (isOpen) => {
  document.body.style.overflow = isOpen ? "hidden" : ""
})
</script>

<template>
  <div>
    <!-- Use slot for custom trigger content, with fallback -->
    <div @click.prevent="openPopup">
      <slot>
        <a class="cursor-pointer underline">or click here to request a call back</a>
      </slot>
    </div>

    <div
      v-if="showPopup"
      class="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75 p-4"
      @click="closePopup"
    >
      <div class="relative w-full max-w-md rounded-lg bg-white shadow-xl" @click.stop>
        <!-- Close Button -->
        <button
          @click="closePopup"
          class="absolute right-3 top-3 z-10 h-10 w-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
          type="button"
          aria-label="Close"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="px-4 pb-4 pt-5 sm:p-6">
          <ContactForm :show-phone-number="isBusinessOpen" />
        </div>
      </div>
    </div>
  </div>
</template>