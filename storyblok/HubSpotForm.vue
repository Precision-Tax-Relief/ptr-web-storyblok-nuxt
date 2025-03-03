<script setup lang="ts">
import type { HubSpotFormStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  blok: HubSpotFormStoryblok
}

const props = defineProps<PropTypes>()

useHead({
  script: [{ src: "//js.hsforms.net/forms/embed/v2.js", defer: true }]
})
const createForm = () => {
  if (
    typeof hbspt === "undefined" ||
    typeof hbspt?.forms === "undefined" ||
    typeof hbspt?.forms?.create === "undefined"
  ) {
    setTimeout(createForm, 200)
    return
  }

  hbspt.forms.create({
    region: props.blok.region,
    portalId: props.blok.portalId,
    formId: props.blok.formId,
    target: `#form-${props.blok.formId}`
  })
}

onMounted(() => {
  createForm()
})
</script>

<template>
  <div :id="`form-${props.blok.formId}`" v-editable="props.blok" class="mx-auto max-w-xl"/>
</template>
