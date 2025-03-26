<script setup lang="ts">
import { ref } from "vue"
import { useSegment } from "~/composables/useSegment"

interface Props {
  phone: string
  eventName?: string
  properties?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  phone: "+18779091449",
  eventName: "Phone Link Clicked",
  properties: () => ({})
})

const segment = useSegment()
const phoneLink = ref<HTMLAnchorElement | null>(null)

const trackPhoneClick = (event: MouseEvent) => {
  // Don't prevent default - let the click continue

  // Get the current href from the DOM in case Invoca changed it
  const currentHref = phoneLink.value?.getAttribute("href") || props.phone
  const phoneNumber = currentHref.replace("tel:", "")

  // Track the event with the current phone number
  segment.track(props.eventName, {
    initialPhoneNumber: props.phone,
    phoneNumber: phoneNumber,
    ...props.properties
  })
}
</script>

<template>
  <a
    ref="phoneLink"
    class="flex items-center gap-2 bg-green-500 hover:bg-green-600 rounded-md font-bold text-white uppercase text-base/5 sm:text-lg px-4 py-1"
    :href="'tel:' + phone"
    @click.capture="trackPhoneClick"
  >
    <slot />
  </a>
</template>
