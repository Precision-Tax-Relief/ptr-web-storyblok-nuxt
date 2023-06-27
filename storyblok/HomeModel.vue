<script setup lang="ts">
import { HomeModelStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  blok: HomeModelStoryblok
}

const props = defineProps<PropTypes>()

</script>

<template>
  <div v-editable="props.blok">
    <div class="relative aspect-22/11 w-full flex">
     <div class="relative z-20 self-end w-full pt-48 pb-16 bg-gradient-to-b from-transparent via-charcoal-900/75 to-charcoal-900">
       <div class="mx-auto w-full max-w-screen-lg flex gap-9 justify-between">
         <div class="max-w-2xl">
           <p class="p-2 px-3  uppercase font-semibold bg-sand-800 text-sand-100 inline-block tracking-wider">
             {{ props.blok.series }} Series</p>
           <h1 class="font-bold text-6xl text-white py-4">{{ props.blok.model }}</h1>
           <ul class="flex flex-row gap-3 justify-between text-white">
             <li>Single-Family Home</li>
             <li>Available in MT & ID</li>
             <li>Starting At $000,000</li>
           </ul>
         </div>
         <a href="#test"
            class="self-end font-semibold tracking-wider text-sand-800 bg-sand-200 p-4 px-6 rounded-xl uppercase hover:bg-sand-50 hover:text-sand-1000">
           View Floorplan
         </a>
       </div>
     </div>
      <NuxtPicture
        :src="props.blok.featuredImage.filename"
        :imgAttrs="{
          class: 'absolute inset-0 object-cover h-full w-full',
          alt: props.blok.featuredImage.alt
        }"
      />
    </div>
    <div class="w-full px-16 pt-8 bg-charcoal-900">
      <div class="border-t border-charcoal-600 flex flex-row justify-between py-8">
        <div v-for="stat in blok.stats" :key="stat._uid" v-editable="stat" class="flex flex-col-reverse">
          <dt class="text-sm tracking-wider font-semibold leading-6 text-charcoal-300 uppercase">{{ stat.label }}</dt>
          <dd class="text-3xl font-semibold tracking-tight text-charcoal-100">{{ stat.value }}</dd>
          <Icon :name="stat.icon" class="w-12 h-12 text-charcoal-500" />
        </div>
      </div>
    </div>
    <StoryblokComponent v-for="child_block in blok.body" :key="child_block._uid" :blok="child_block" />
  </div>
</template>
