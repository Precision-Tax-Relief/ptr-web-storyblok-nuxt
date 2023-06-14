<script setup lang="ts">
interface PropTypes {
  blok: Object
}

const props = defineProps<PropTypes>()
</script>

<template>
  <NuxtLink
    v-editable="props.blok"
    :href="props.blok.link.url"
    class="rounded-md bg-sand-1000 px-3.5 py-2.5 text-sm font-semibold text-charcoal-50 shadow-sm hover:bg-sand-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
    >{{ props.blok.text }}
  </NuxtLink>
</template>
