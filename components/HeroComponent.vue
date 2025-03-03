<script setup lang="ts">
import { useSlots } from "vue"
interface PropTypes {
  image: object
}

const props = defineProps<PropTypes>()
const slots = useSlots()
</script>

<template>
  <div class="relative bg-white">
    <div class="pb-10 lg:grid lg:auto-rows-min lg:grid-cols-11 lg:gap-x-8 lg:px-0 lg:pb-20">
      <div
        :class="[
          'mx-auto px-6 md:pl-20 lg:col-span-6 lg:mx-0 xl:col-span-5',
          slots['small-text'] ? 'lg:row-span-1' : 'lg:row-span-2'
        ]"
      >
        <div class="max-w-2xl pt-12 lg:ml-auto">
          <h1 class="text-4xl font-bold tracking-tight text-charcoal-900 sm:mt-10 sm:text-6xl">
            <slot name="title"/>
          </h1>
          <p class="mt-6 whitespace-pre-wrap text-lg leading-8 text-charcoal-700">
            <slot name="big-text"/>
          </p>
        </div>
      </div>
      <div class="relative h-full pb-6 pt-6 lg:col-span-5 lg:row-span-2 xl:col-span-6">
        <NuxtPicture
          :img-attrs="{
            class:
              'aspect-square sm:aspect-[4/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full'
          }"
          :src="props.image?.filename"
          :alt="props.image?.alt"
        />
      </div>
      <div class="px-6 md:pl-20 lg:col-span-6 lg:mx-0 xl:col-span-5">
        <div class="max-w-2xl lg:ml-auto">
          <div class="mt-10 hidden max-w-2xl border-t-2 border-charcoal-600/50 pt-10 lg:block"/>
          <p class="whitespace-pre-wrap text-base leading-7 text-charcoal-600">
            <slot name="small-text"/>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
