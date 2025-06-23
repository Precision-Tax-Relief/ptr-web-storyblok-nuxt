<script setup lang="ts">
import type { PtrHeaderStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  blok: PtrHeaderStoryblok
}

const props = defineProps<PropTypes>()
</script>

<template>
  <header v-editable="props.blok" class="bg-primary">
    <div class="container px-2 py-1 leading-6 sm:px-8 md:py-2 lg:py-3">
      <div class="mx-auto flex w-full max-w-5-5xl flex-row items-center gap-6">
        <NuxtLink to="/" data-click-name="ClickHdr - Logo">
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="50" height="50" viewBox="0.5 0.5 266.4 368.6">
            <title>Better Business Bureau</title>
            <path
              d="M185.1 231.5H44l-5.2 16.9h37.7l7.2 23.2h61.9l7.1-23.2h37.6l-5-17zM67 136.6a33.4 33.4 0 0 0 7.4 46.7l33.8 24.5a8.4 8.4 0 0 1 2 11.7l5 3.7 17.9-24.7a33.2 33.2 0 0 0 6.3-19.5 34 34 0 0 0-.4-5.4 33.2 33.2 0 0 0-13.4-21.7l-33.8-24.6a8.3 8.3 0 0 1-3.4-5.4 9 9 0 0 1 0-1.4 8.2 8.2 0 0 1 1.5-4.8l-5-3.7zM87.3 38A48 48 0 0 0 78 66.2a49 49 0 0 0 .6 7.7A48.1 48.1 0 0 0 98 105.5l42.5 30.8a25.8 25.8 0 0 1 10.4 16.9 26.4 26.4 0 0 1 .3 4.1 25.8 25.8 0 0 1-5 15.2l4.1 3 33.5-46.3A48.4 48.4 0 0 0 173 61.6l-51.3-37.3a15 15 0 0 1-3.3-20.9l-4-2.9zM.5 285.8h38.7c9.5 0 17 2.6 21.8 7.3a19.1 19.1 0 0 1 5.7 14.2v.2c0 9.4-5 14.7-11 18 9.6 3.7 15.6 9.3 15.6 20.5v.2c0 15.3-12.4 22.9-31.2 22.9H.5zm34.8 33.6c8 0 13.2-2.6 13.2-8.8v-.2c0-5.5-4.3-8.6-12-8.6H18.4v17.6zm4.9 33.6c8 0 13-2.8 13-9v-.2c0-5.6-4.2-9-13.6-9H18.4V353zm39.1-67.3H118c9.6 0 17 2.7 21.8 7.4a19.1 19.1 0 0 1 5.7 14.2v.2c0 9.4-5 14.7-11 18 9.7 3.7 15.6 9.3 15.6 20.5v.2c0 15.3-12.4 22.9-31.2 22.9H79.3zm34.8 33.8c8 0 13.2-2.7 13.2-8.9v-.2c0-5.5-4.3-8.6-12-8.6H97.2v17.6zM119 353c8 0 13-2.8 13-9v-.2c0-5.6-4.2-9-13.6-9H97.2V353zm39.1-67.3H197c9.5 0 17 2.7 21.7 7.4a19.1 19.1 0 0 1 5.8 14.2v.2c0 9.4-5 14.7-11 18 9.6 3.7 15.6 9.3 15.6 20.5v.2c0 15.3-12.4 22.9-31.2 22.9h-39.6zm34.8 33.8c8.1 0 13.2-2.7 13.2-8.9v-.2c0-5.5-4.2-8.6-12-8.6h-18v17.6zm4.9 33.5c8.1 0 13-2.8 13-9v-.2c0-5.6-4.2-9-13.6-9H176V353zm35-1.3v-.1a17 17 0 0 1 34-.1 17 17 0 0 1-34 .2m32-.1v-.1a15 15 0 1 0-30 0v.2a15 15 0 1 0 30-.1m-22-9.5h8a7.6 7.6 0 0 1 5.6 2 5.4 5.4 0 0 1 1.6 4 5.6 5.6 0 0 1-4 5.6l4.5 6.4h-4.7l-3.8-5.8h-3.2v5.8h-4zm8 8.8c2 0 3.2-1 3.2-2.6 0-1.8-1.3-2.7-3.2-2.7h-4v5.3z"
            />
          </svg>
        </NuxtLink>
        <div class="flex flex-col lg:text-lg">
          <div class="align-super font-semibold text-white">
            <span class="hidden lg:inline">Better Business Bureau</span>
            <span class="inline hidden text-lg">BBB</span>
            <span class="hidden align-super text-sm lg:inline">®</span>
          </div>
          <div class="text-md text-sm font-semibold text-white">
            Recommends <br class="block md:hidden" />Precision&nbsp;Tax&nbsp;Relief
          </div>
        </div>
        <div class="ml-auto hidden text-right md:block">
          <span class="block text-base uppercase text-slate-300 lg:text-sm"> Get your FREE consultation now: </span>

          <InvocaPhoneTrackingLink class="text-3xl font-black text-white lg:text-3xl">
            1-855-444-7551
          </InvocaPhoneTrackingLink>
        </div>

        <div class="ml-auto block md:hidden">
          <InvocaPhoneTrackingLink
            class="flex items-center gap-2 rounded-md bg-green-600 px-4 py-1 text-base/5 font-bold uppercase text-white hover:bg-green-700 sm:text-lg"
          >
            <Icon name="fa-solid:phone-alt" class="text-2xl text-white sm:text-xl" />
            <div class="flex flex-col gap-x-1 sm:flex-row">
              <span>Call Now</span>
            </div>
          </InvocaPhoneTrackingLink>
        </div>
      </div>
    </div>
  </header>
</template>
