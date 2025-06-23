<script setup lang="ts">
import { onMounted } from "vue"
import { useBusinessHours } from "@/composables/useBusinessHours"

const { isBusinessOpen } = useBusinessHours()

onMounted(() => {
  const invoca = window?.Invoca
  if (invoca?.PNAPI?.run) {
    invoca.PNAPI.run()
  }
})

interface PropTypes {
  lighter_text?: boolean
}
defineProps<PropTypes>()
</script>

<template>
  <!-- Business OPEN -->
  <div v-if="isBusinessOpen" class="mx-auto flex max-w-2xl flex-col items-center justify-center text-center">
    <InvocaPhoneTrackingLink
      data-click-name="ClickBody - Form Scroll  Below What To Expect"
      class="mb-4 flex items-center justify-center gap-2 rounded-md bg-green-600 px-6 py-3 hover:bg-green-700 lg:px-6 lg:py-3"
    >
      <Icon name="fa-solid:phone-alt" class="text-4xl text-white sm:text-5xl lg:text-6xl" />
      <div class="col-span-3 flex flex-col justify-center text-left text-white">
        <span class="text-base font-medium uppercase md:text-xl">GET A FREE CONSULTATION</span>
        <p class="text-2xl font-bold sm:text-3xl md:text-4xl">(855) 444-7551</p>
      </div>
    </InvocaPhoneTrackingLink>

    <div>
      <a
        class="activate-form hidden underline lg:block"
        :class="{ 'text-neutral-500': !lighter_text, 'text-neutral-400': lighter_text }"
        href="#contact"
        data-modal-open=""
        data-click-name="ClickBodyM - Callback Form Modal Below What To Expect"
        >or click here to request a call back</a
      >
    </div>

    <div class="lg:hidden">
      <ContactFormPopup :class="{ 'text-neutral-500': !lighter_text, 'text-neutral-400': lighter_text }" />
    </div>
  </div>

  <!-- Business CLOSED -->
  <div v-else class="mx-auto flex max-w-2xl flex-col items-center justify-center text-center">
    <div class="hidden lg:block">
      <a
        href="#contact"
        data-modal-open=""
        data-click-name="ClickBody - Form Scroll  Below What To Expect"
        class="activate-form mb-4 flex items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-1 hover:bg-green-700 lg:px-6 lg:py-3"
      >
        <div class="col-span-3 flex flex-col py-4 text-left text-white">
          <span class="text-base font-medium uppercase md:text-xl">GET A FREE CONSULTATION</span>
        </div>
      </a>
    </div>
    <div class="block lg:hidden">
      <ContactFormPopup class="mb-4">
        <div
          class="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-1 hover:bg-green-700 lg:px-6 lg:py-3"
        >
          <div class="col-span-3 flex flex-col py-4 text-left text-white">
            <span class="text-base font-medium uppercase md:text-xl">GET A FREE CONSULTATION</span>
          </div>
        </div>
      </ContactFormPopup>
    </div>
  </div>
</template>
