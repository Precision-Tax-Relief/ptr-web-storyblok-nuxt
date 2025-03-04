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
      :loop="true"
      :autoplay="{
        delay: 75000,
        disableOnInteraction: false
      }"
    >
      <swiper-slide
        v-for="tm in blok.testimonials"
        :key="tm.name"
        v-editable="tm"
        class="flex flex-row px-12 py-6 bg-white gap-6"
      >
        <StoryblokComponent
          v-for="child_block in tm.youtube"
          :key="child_block._uid"
          class="basis-1/2"
          :blok="child_block"
        />
        <div class="basis-2/3 grow">
          <ul class="flex lg:gap-8 gap-4 flex-wrap justify-between">
            <li class="lg:ml-0 w-full lg:w-auto">
              <div class="user_title">
                <p class="text-4xl font-bold">{{ tm.name }}</p>
              </div>
            </li>
            <li class="lg:ml-0">
              <strong class="text-3xl text-rose-950"><span class="text-rose-600">Owed: </span>{{ tm.owed }}</strong>
              <p />
            </li>
            <li>
              <strong class="text-3xl text-emerald-950">
                <span class="text-emerald-600">Paid: </span>{{ tm.paid }}</strong
              >
            </li>
          </ul>
          <p class="mt-1 text-2xl lg:text-2xl/8 text-stone-800">{{ tm.text }}</p>
        </div>
      </swiper-slide>
    </swiper-container>
  </ClientOnly>
</template>
