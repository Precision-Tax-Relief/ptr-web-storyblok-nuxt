<template>
  <div class="mt-20">
    <h4 class="font-bold text-primary text-center md:text-left text-3xl px-4 lg:px-0">Our Recent Client Results:</h4>
    <div class="container mx-auto overflow-hidden lg:px-0 px-2">
      <ClientOnly>
        <swiper-container
          :init="true"
          class="py-6 lg:pb-10"
          slides-per-view="auto"
          :space-between="20"
          :speed="3500"
          :autoplay="{
            delay: 6000,
            disableOnInteraction: false
          }"
          loop
        >
          <swiper-slide v-for="client in bloks" :key="client.name" class="w-auto max-w-md md:max-w-3xl">
            <div class="flex items-center">
              <div
                class="flex md:items-center shadow-md w-full bg-white rounded-lg justify-between py-4 px-6 md:flex-row flex-col gap-10 md:gap-6"
              >
                <div class="flex">
                  <figure>
                    <NuxtPicture :src="client.profile.filename" loading="lazy" :img-attrs="{ class: 'h-12 w-12' }" />
                  </figure>
                  <div class="user_title ml-5 flex flex-col justify-center">
                    <h4 class="font-bold text-lg leading-tight">{{ client.name }}</h4>
                    <p class="text-neutral-400 font-normal">{{ client.location }}</p>
                  </div>
                </div>
                <ul class="flex flex-col md:flex-row md:items-center justify-between gap-4 font-bold ml-24 md:ml-0">
                  <li class="flex sm:ml-16 lg:ml-0 gap-2">
                    <p class="text-rose-600">Owed:</p>
                    <p>${{ parseInt(client.owed).toLocaleString() }}</p>
                  </li>
                  <li class="flex gap-2">
                    <p class="text-[#49924d]">Paid:</p>
                    <p>${{ parseInt(client.paid).toLocaleString() }}</p>
                  </li>
                  <li class="flex gap-2">
                    <p class="text-[#174887]">Saved:</p>
                    <p>${{ (parseInt(client.owed) - parseInt(client.paid)).toLocaleString() }}</p>
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
