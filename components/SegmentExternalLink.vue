<script setup lang="ts">
import { useSegment } from "~/composables/useSegment"

interface Props {
  to: string
  label: string
  eventName?: string
  properties?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  eventName: "Outbound Link Clicked",
  properties: () => ({})
})

const segment = useSegment()

const trackLinkClick = async () => {
  await segment.track(props.eventName, {
    page_url: window.location.href,
    click_url: props.to,
    label: props.label,
    ...props.properties
  })
}
</script>
<template>
  <NuxtLink :to="to" target="_blank" rel="noopener noreferrer" @click="trackLinkClick">
    <slot></slot>
  </NuxtLink>
</template>
