<script setup lang="ts">
import type { TestimonialSliderStoryblok } from "~/types/component-types-sb"
import { Navigation } from "swiper/modules"

interface PropTypes {
  blok: TestimonialSliderStoryblok
}
const SwiperNavigation = Navigation
const props = defineProps<PropTypes>()
</script>

<template>
  <ClientOnly>
    <div class="testimonial-slider-container max-h-xl mx-auto w-full max-w-6xl px-2">
      <swiper-container
        :init="true"
        :pagination="{ type: 'progressbar' }"
        :navigation="{
          enabled: true
        }"
        :breakpoints="{
          768: {
            navigation: {
              enabled: true
            }
          }
        }"
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
          class="flex flex-col gap-6 bg-white pb-6 pt-1 sm:px-6 sm:py-6 md:px-12 lg:flex-row"
        >
          <LazyYoutubeFacade
            v-for="child_block in tm.youtube"
            :key="child_block._uid"
            class="grow-0 basis-1/3"
            :blok="child_block"
          />
          <div class="basis-2/3">
            <ul class="mb-2 flex flex-wrap justify-between gap-4 px-3 sm:py-0 lg:gap-8">
              <li class="w-full lg:ml-0 lg:w-auto">
                <div class="user_title">
                  <p class="text-4xl font-bold text-primaryDark">{{ tm.name }}</p>
                </div>
              </li>
              <li class="lg:ml-0">
                <strong class="text-2xl text-rose-900"><span class="text-rose-600">Owed: </span>{{ tm.owed }}</strong>
              </li>
              <li>
                <strong class="text-2xl text-emerald-900">
                  <span class="text-emerald-600">Paid: </span>{{ tm.paid }}</strong
                >
              </li>
            </ul>
            <div class="my-12">
              <p class="text-md mt-1 hidden text-stone-800 md:block">{{ tm.text }}</p>
            </div>
          </div>
        </swiper-slide>
      </swiper-container>
    </div>
  </ClientOnly>
</template>
