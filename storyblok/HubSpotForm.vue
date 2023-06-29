<script setup lang="ts">
import { HubSpotFormStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  blok: HubSpotFormStoryblok
}

const props = defineProps<PropTypes>()

useHead({
  script: [{ src: "//js.hsforms.net/forms/embed/v2.js" }]
})

onMounted(() => {
  hbspt.forms.create({
    region: props.blok.region,
    portalId: props.blok.portalId,
    formId: props.blok.formId,
    target: `#form-${props.blok.formId}`
  })
})
</script>

<template>
  <div :id="`form-${props.blok.formId}`" v-editable="props.blok" class="mx-auto max-w-xl"></div>
</template>
