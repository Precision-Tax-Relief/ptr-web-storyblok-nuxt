<script setup lang="ts">
import type { TestimonialSliderStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  blok: TestimonialSliderStoryblok
}

const props = defineProps<PropTypes>()
</script>

<template>
  <ClientOnly>
    <swiper-container
      :init="true"
      :pagination="{ type: 'progressbar' }"
      :navigation="true"
      :style="{
        '--swiper-navigation-color': '#46aaac',
        '--swiper-pagination-color': '#46aaac'
      }"
      :space-between="20"
      :speed="1500"
      :autoplay="{
        delay: 7500,
        disableOnInteraction: true
      }"
      loop
    >
      <swiper-slide
        v-for="tm in blok.testimonials"
        :key="tm.name"
        v-editable="tm"
        class="flex flex-row px-12 py-6 bg-white gap-6"
      >
        <LazyYoutubeFacade
          v-for="child_block in tm.youtube"
          :key="child_block._uid"
          class="basis-1/3 grow-0"
          :blok="child_block"
        />
        <div class="basis-2/3">
          <ul class="flex lg:gap-8 gap-4 flex-wrap justify-between mb-2">
            <li class="lg:ml-0 w-full lg:w-auto">
              <div class="user_title">
                <p class="text-4xl text-primaryDark font-bold">{{ tm.name }}</p>
              </div>
            </li>
            <li class="lg:ml-0">
              <strong class="text-3xl text-rose-900"><span class="text-rose-600">Owed: </span>{{ tm.owed }}</strong>
            </li>
            <li>
              <strong class="text-3xl text-emerald-900">
                <span class="text-emerald-600">Paid: </span>{{ tm.paid }}</strong
              >
            </li>
          </ul>
          <p class="mt-1 text-lg text-stone-800">{{ tm.text }}</p>
        </div>
      </swiper-slide>
    </swiper-container>
  </ClientOnly>
</template>
