<script setup lang="ts">
import { MultilinkStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  imageSources: Array<String>
  viewMoreLink: MultilinkStoryblok
}

const props = defineProps<PropTypes>()
</script>

<template>
  <div class="mt-32 overflow-hidden sm:mt-40">
    <div class="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
      <div class="mx-auto grid max-w-2xl grid-cols-1 gap-4 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-8">
        <div class="flex flex-col lg:col-end-1 lg:w-full">
          <h2 class="pr-4 text-5xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            <slot name="title"></slot>
          </h2>
          <NuxtLink :href="viewMoreLink.url" class="group block py-6 text-2xl leading-8 text-gray-600">
            View More
            <span aria-hidden="true" class="pr-1.5 transition-all group-hover:pl-1.5 group-hover:pr-0">→</span>
          </NuxtLink>
        </div>

        <div class="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
          <div class="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
            <NuxtPicture
              :src="imageSources[0]"
              loading="lazy"
              :imgAttrs="{
                class: 'aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover'
              }"
            />
          </div>
          <div
            class="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8"
          >
            <div class="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
              <NuxtPicture
                :src="imageSources[1]"
                loading="lazy"
                :imgAttrs="{
                  class: 'aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover'
                }"
              />
            </div>
            <div class="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
              <NuxtPicture
                :src="imageSources[2]"
                loading="lazy"
                :imgAttrs="{
                  class: 'aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover'
                }"
              />
            </div>
            <div class="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
              <NuxtPicture
                :src="imageSources[3]"
                loading="lazy"
                :imgAttrs="{
                  class: 'aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover'
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
