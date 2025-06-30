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

// Cleanup on unmount to avoid stuck overflow
onUnmounted(() => {
  document.body.style.overflow = ""
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
      class="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75 p-0 shadow-xl transition-opacity"
      @click="closePopup"
    >
      <div class="w-md relative max-w-md" @click.stop>
        <!-- Close Button -->
        <div class="absolute -top-10 right-0 z-50">
          <button
            type="button"
            class="flex rounded-md bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primaryDark focus:ring-offset-2"
            @click="closePopup"
          >
            <span class="sr-only">Close</span>
            <Icon name="mdi:close" class="size-8" />
          </button>
        </div>

        <div>
          <ContactForm :show-phone-number="isBusinessOpen" />
        </div>
      </div>
    </div>
  </div>
</template>
