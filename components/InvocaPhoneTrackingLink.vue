<script setup lang="ts">
import { ref } from "vue"
import { useSegment } from "~/composables/useSegment"

interface Props {
  phone?: string
  eventName?: string
  properties?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  phone: "+18554447551",
  eventName: "Telephone Clicked",
  properties: () => ({})
})

type invocaSessionCookie = {
  config: {
    ce: boolean
    fv: boolean
    rn: boolean
    ba: boolean
    br: boolean
  }
  session: {
    invoca_id: string
  }
  ttl: string
}

const segment = useSegment()
const phoneLink = ref<HTMLAnchorElement | null>(null)

const trackPhoneClick = (event: MouseEvent) => {
  // Don't prevent default - let the click continue

  // Get the current href from the DOM in case Invoca changed it
  const currentHref = phoneLink.value?.getAttribute("href") || props.phone
  const phoneNumber = currentHref.replace("tel:", "")

  const invocaSession = useCookie<invocaSessionCookie | undefined>("invoca_session", { readonly: true }).value
  const invocaId = invocaSession?.session.invoca_id

  let invocaPhone = undefined
  if (props.phone !== phoneNumber) {
    invocaPhone = phoneNumber
  }

  // Track the event with the current phone number
  segment.track(props.eventName, {
    click_url: currentHref,
    initial_phone_number: props.phone,
    invoca_id: invocaId,
    phone_number: phoneNumber,
    invoca_phone: invocaPhone,
    ...props.properties
  })
}

onMounted(() => {
  const invoca = window?.Invoca
  if (invoca != undefined) {
    invoca.PNAPI.run()
  }
})
</script>

<template>
  <a ref="phoneLink" :href="'tel:' + phone" @click.capture="trackPhoneClick">
    <slot />
  </a>
</template>
