<script setup lang="ts">
import type { SlideClientResultsStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  bloks: [SlideClientResultsStoryblok]
}

const props = defineProps<PropTypes>()
</script>

<template>
  <div class="mx-auto my-12 mt-12 max-w-6xl">
    <h4
      class="px-4 text-center text-2xl font-bold text-primary md:text-left md:text-4xl lg:mx-auto lg:px-0 lg:text-4xl"
    >
      Our Recent Client Results:
    </h4>
    <div class="container px-2 lg:px-0">
      <ClientOnly>
        <swiper-container
          :init="true"
          class="my-8"
          slides-per-view="auto"
          :space-between="20"
          :speed="3500"
          :autoplay="{
            delay: 6000,
            disableOnInteraction: false
          }"
          loop
        >
          <swiper-slide
            v-for="client in bloks"
            :key="client.name"
            class="w-auto max-w-md rounded-lg border border-slate-200 bg-white md:max-w-3xl"
          >
            <div class="flex items-center">
              <div class="flex w-full flex-row flex-wrap justify-between gap-3 px-6 py-4 md:items-center md:gap-6">
                <figure>
                  <NuxtPicture
                    :src="client.profile.filename"
                    :alt="client.profile.alt"
                    format="webp"
                    loading="lazy"
                    sizes="48px"
                    width="48"
                    height="48"
                    quality="70"
                    :img-attrs="{ class: 'h-12 w-12 rounded-full' }"
                  />
                </figure>
                <div class="flex flex-col gap-x-8 gap-y-3 md:flex-row">
                  <div class="user_title flex flex-col justify-center">
                    <h4 class="text-lg font-bold leading-tight">{{ client.name }}</h4>
                    <p class="font-normal text-neutral-400">{{ client.location }}</p>
                  </div>
                  <ul class="flex flex-col justify-between gap-x-4 gap-y-1 font-bold md:flex-row md:items-center">
                    <li><span class="text-rose-600">Owed:</span> ${{ parseInt(client.owed).toLocaleString() }}</li>
                    <li><span class="text-[#49924d]">Paid:</span> ${{ parseInt(client.paid).toLocaleString() }}</li>
                    <li>
                      <span class="text-[#174887]">Saved:</span> ${{
                        (parseInt(client.owed) - parseInt(client.paid)).toLocaleString()
                      }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper-container>
      </ClientOnly>
    </div>
  </div>
</template>
<style>
swiper-slide {
  width: auto;
  transition-timing-function: linear;
}

swiper-container {
  overflow: visible;
}
</style>
