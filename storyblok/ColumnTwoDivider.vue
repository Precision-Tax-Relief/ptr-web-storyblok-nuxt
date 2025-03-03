<script setup lang="ts">
import type { ColumnTwoDividerStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  blok: ColumnTwoDividerStoryblok
}

const props = defineProps<PropTypes>()
</script>

<template>
  <div v-editable="props.blok" class="mx-auto my-16 max-w-7xl px-6 sm:my-24 lg:px-8">
    <h2 class="mb-12 text-center text-3xl font-bold text-charcoal-900 md:text-5xl" v-html="props.blok.header"/>
    <div class="mx-auto grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-2">
      <div class="flex flex-col pb-10 sm:pb-16 lg:pb-10 lg:pr-8 xl:pr-20">
        <figure class="mt-10 flex flex-auto flex-col">
          <h3 class="pb-2 text-3xl font-semibold text-charcoal-700 md:text-2xl">
            {{ props.blok.headerOne }}
          </h3>
          <p class="text-lg leading-8 text-charcoal-700">
            {{ props.blok.contentOne }}
          </p>
        </figure>
      </div>
      <div
        class="flex flex-col border-t border-charcoal-100 pt-10 sm:pt-16 lg:border-l lg:border-t-0 lg:pb-10 lg:pl-8 lg:pt-0 xl:pl-20"
      >
        <figure class="mt-10 flex flex-auto flex-col">
          <h3 class="pb-2 text-3xl font-semibold text-charcoal-700 md:text-2xl">
            {{ props.blok.headerTwo }}
          </h3>
          <p class="text-lg leading-8 text-charcoal-700">
            {{ props.blok.contentTwo }}
          </p>
        </figure>
      </div>
    </div>
  </div>
</template>
