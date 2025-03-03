<template>
  <div class="mt-28 mb-10">
    <h4 class="font-bold text-primary text-center md:text-left text-4xl md:text-7xl px-4 lg:px-0 mb-5">
      Our Recent Client Results:
    </h4>
    <div class="container mx-auto overflow-hidden lg:px-0 px-4">
      <ClientOnly>
        <swiper-container
          :init="true"
          class="pt-8 pb-8 lg:pb-16"
          slides-per-view="auto"
          :space-between="20"
          :speed="2500"
          :autoplay="{
            delay: 7000,
            disableOnInteraction: false
          }"
          loop
        >
          <swiper-slide v-for="client in bloks" :key="client.name" class="w-auto max-w-md md:max-w-2xl">
            <div class="flex items-center">
              <div
                class="flex md:items-center shadow-md w-full bg-white rounded-lg justify-between py-6 px-7 md:flex-row flex-col gap-10 md:gap-0"
              >
                <div class="flex">
                  <figure>
                    <NuxtPicture
                      :src="client.profile.filename"
                      loading="lazy"
                      :img-attrs="{ class: 'h-12 w-12' }"
                    />
                  </figure>
                  <div class="user_title ml-5 flex flex-col justify-center">
                    <h4 class="font-bold text-3xl leading-tight mb-2">{{ client.name }}</h4>
                    <p class="text-neutral-400 text-2xl font-normal">{{ client.location }}</p>
                  </div>
                </div>
                <ul
                  class="flex flex-col md:flex-row md:items-center justify-between lg:gap-16 gap-6 font-bold ml-24 md:ml-0"
                >
                  <li class="flex sm:ml-16 lg:ml-0 gap-2">
                    <p class="text-rose-600">Owed:</p>
                    <p>${{ client.owed.toLocaleString() }}</p>
                  </li>
                  <li class="flex gap-2">
                    <p class="text-green-600">Paid:</p>
                    <p>${{ client.paid.toLocaleString() }}</p>
                  </li>
                  <li class="flex gap-2">
                    <p class="text-blue-800">Saved:</p>
                    <p>${{ (client.owed - client.paid).toLocaleString() }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </swiper-slide>
        </swiper-container>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SlideClientResultsStoryblok } from "~/types/component-types-sb"
const containerRef = ref(null)

interface PropTypes {
  bloks: [SlideClientResultsStoryblok]
}

const props = defineProps<PropTypes>()
</script>

<style>
swiper-slide {
  width: auto;
  transition-timing-function: linear;
}

swiper-container {
  overflow: visible;
}
</style>
