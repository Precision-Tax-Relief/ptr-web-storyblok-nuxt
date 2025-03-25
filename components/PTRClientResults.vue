<script setup lang="ts">
import type { SlideClientResultsStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  bloks: [SlideClientResultsStoryblok]
}

const props = defineProps<PropTypes>()
</script>

<template>
  <div class="mt-12">
    <h4 class="font-bold text-primary text-center md:text-left text-3xl px-4 lg:px-0">Our Recent Client Results:</h4>
    <div class="container lg:px-0 px-2">
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
            class="w-auto max-w-md md:max-w-3xl border bg-white border-slate-200 rounded-lg"
          >
            <div class="flex items-center">
              <div class="flex md:items-center w-full justify-between py-4 px-6 flex-wrap flex-row gap-3 md:gap-6">
                <figure>
                  <NuxtPicture
                    :src="client.profile.filename"
                    :alt="client.profile.alt"
                    loading="lazy"
                    :img-attrs="{ class: 'h-12 w-12' }"
                  />
                </figure>
                <div class="flex flex-col md:flex-row gap-x-8 gap-y-3">
                  <div class="user_title flex flex-col justify-center">
                    <h4 class="font-bold text-lg leading-tight">{{ client.name }}</h4>
                    <p class="text-neutral-400 font-normal">{{ client.location }}</p>
                  </div>
                  <ul class="flex flex-col gap-x-4 gap-y-1 md:flex-row md:items-center justify-between font-bold">
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
