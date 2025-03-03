<script setup lang="ts">
interface PropTypes {
  blok: object
}

const props = defineProps<PropTypes>()
</script>

<template>
  <NuxtLink
    v-editable="props.blok"
    :href="props.blok.link.url"
    class="rounded-md bg-sand-1000 px-3.5 py-2.5 text-sm font-semibold text-charcoal-50 shadow-sm hover:bg-sand-900 hover:text-white"
    >{{ props.blok.text }}
  </NuxtLink>
</template>
