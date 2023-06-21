<script setup lang="ts">
import { computed } from "vue"
import { loadStateStore } from "~/stores/loadState"
const loadStore = loadStateStore()
const videoDelay = computed(() => {
  return loadStore.loadState === "loaded" ? "#t=1" : ""
})

interface PropTypes {
  videoSrc: String
}

const props = defineProps<PropTypes>()
</script>

<template>
  <div class="relative isolate overflow-hidden bg-neutral-900 pt-14">
    <video autoplay loop playsinline muted class="absolute inset-0 -z-10 h-full w-full object-cover brightness-50">
      <source :src="props.videoSrc + videoDelay" />
    </video>
    <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      <div
        class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#F9F4ED] to-[#47423E] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      />
    </div>

    <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div class="hidden sm:mb-8 sm:flex sm:justify-center">
        <div
          class="relative rounded-full px-3 py-1 text-sm leading-6 text-white ring-1 ring-white/10 hover:ring-white/50"
        >
          <slot name="top-button"></slot>
          <a href="props.blok.topButtonLink" class="font-semibold text-white">
            <span class="absolute inset-0" aria-hidden="true" /> Read more <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
      <div class="text-center">
        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          <slot name="big-text"></slot>
        </h1>
        <p class="mt-6 text-lg leading-8 text-charcoal-100">
          <slot name="small-text"></slot>
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <slot name="ctas"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
