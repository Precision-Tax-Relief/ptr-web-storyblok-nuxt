<script setup lang="ts">
import { type PTRDiscoverWhyStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  blok: PTRDiscoverWhyStoryblok
}

const props = defineProps<PropTypes>()
</script>

<template>
  <div v-editable="props.blok" class="bg-slate-100"></div>
</template>
