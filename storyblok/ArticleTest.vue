<!--<script setup lang="ts">-->
<!--interface PropTypes {-->
<!--  blok: Object-->
<!--}-->
<!--const props = defineProps<PropTypes>()-->

<!--// const resolvedRichText = computed(() => renderRichText(props.blok.content))-->
<!--</script>-->
<!--<template>-->
<!--  <div v-editable="props.blok" class="mx-auto mb-16 max-w-3xl px-6 pt-24 text-base leading-7 text-gray-700">-->
<!--    <h2 class="mt-2 text-3xl font-bold tracking-tight text-charcoal-900">-->
<!--      {{ props.blok.title }}-->
<!--    </h2>-->
<!--    <pre>{{ props.blok.content }}</pre>-->
<!--    <div-->
<!--      class="prose-xl mr-0 pt-10 text-justify text-xl text-charcoal-700"-->
<!--      v-html="renderRichText(props.blok.content)"-->
<!--    />-->
<!--    <div class="mx-auto pt-16">-->
<!--      <NuxtPicture :imgAttrs="{ alt: props.blok.image.alt }" :src="props.blok.image.filename"></NuxtPicture>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<script setup lang="ts">
import { HomeFeaturesPanelStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  blok: Object
}

const props = defineProps<PropTypes>()
</script>

<template>
  <div v-editable="props.blok" class="flex flex-col gap-x-8 gap-y-8 sm:gap-y-20 md:grid md:grid-cols-2 lg:items-start">
    <client-only>
      <div class="prose" v-html="renderRichText(props.blok.content)"></div>
    </client-only>
  </div>
</template>
