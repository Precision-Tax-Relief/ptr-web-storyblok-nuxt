<script setup lang="ts">
import { useBusinessHours } from "@/composables/useBusinessHours"
const { isBusinessOpen } = useBusinessHours()
import { detectMobileBrowser } from "~/utils/mobileDetect"
// SSR-safe mobile detection

const isMobile = ref(false)
const hasMounted = ref(false)

onMounted(() => {
  const invoca = window?.Invoca

  if (invoca != undefined) {
    invoca.PNAPI.run()
  }

  isMobile.value = detectMobileBrowser()
  hasMounted.value = true
})

interface PropTypes {
  lighter_text?: Boolean
}

defineProps<PropTypes>()
</script>

<template>
  <div v-if="isBusinessOpen" class="mx-auto flex max-w-2xl flex-col items-center justify-center text-center">
    <!-- CTA -->
    <a
      href="#contact"
      data-click-name="ClickBody - Form Scroll  Below What To Expect"
      class="mb-4 flex items-center justify-center gap-2 rounded-md bg-green-600 px-6 py-3 hover:bg-green-700 lg:px-6 lg:py-3"
    >
      <Icon name="fa-solid:phone-alt" class="text-4xl text-white sm:text-5xl lg:text-6xl" />
      <div class="col-span-3 flex flex-col justify-center text-left text-white">
        <span class="text-base font-medium uppercase md:text-xl">GET A FREE CONSULTATION</span>
        <p class="text-2xl font-bold sm:text-3xl md:text-4xl">(855) 444-7551</p>
      </div>
    </a>

    <!-- Only render after detection -->
    <template v-if="hasMounted">
      <div v-if="!isMobile">
        <a
          class="activate-form underline"
          :class="{ 'text-neutral-500': !lighter_text, 'text-neutral-400': lighter_text }"
          href="#contact"
          data-modal-open=""
          data-click-name="ClickBodyM - Callback Form Modal Below What To Expect"
          >or click here to request a call back</a
        >
      </div>
      <div v-else>
        <ContactFormPopup :class="{ 'text-neutral-500': !lighter_text, 'text-neutral-400': lighter_text }" />
      </div>
    </template>
  </div>
</template>
