<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue"
import { ref } from "vue"
interface PropTypes {
  blok: blok
}

const props = defineProps<PropTypes>()

const activeTabHeading = ref("")

const setActiveHeading = (heading: string) => {
  activeTabHeading.value = heading // Set the active heading
}
const getTabHeading = computed(() => (activeTabHeading.value ? activeTabHeading.value : props.blok?.panels[0].heading))
</script>

<template>
  <div v-editable="props.blok" class="mb-10 pt-20">
    <div class="relative flex h-48 overflow-hidden bg-charcoal-900">
      <div class="relative z-10 m-auto text-center">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Gallery</h2>
        <div>
          <h3 class="mt-4 text-2xl tracking-tight text-white">{{ getTabHeading }}</h3>
          <div class="mt-2 justify-center border-t-2 border-white"></div>
        </div>
      </div>
      <svg
        class="absolute -top-2 w-screen -translate-y-1/2 transform"
        viewBox="0 0 1024 1024"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle cx="512" cy="512" r="512" fill="url(#0e5cb4c7-10e5-4dc5-b523-ba382132f3fb)" fill-opacity="1" />
        <defs>
          <radialGradient id="0e5cb4c7-10e5-4dc5-b523-ba382132f3fb">
            <stop stop-color="#080809" />
            <stop offset="1" stop-color="#171718" />
          </radialGradient>
        </defs>
      </svg>
      <NuxtPicture
        :src="props.blok?.headingImage.filename"
        :imgAttrs="{
          class: 'opacity-75 absolute inset-0 w-full object-cover h-full',
          alt: props.blok?.headingImage.alt
        }"
      ></NuxtPicture>
    </div>
    <div class="mx-auto mt-16 flex flex-col items-center px-3 lg:px-8">
      <TabGroup>
        <TabList
          class="mb-4 flex max-w-full space-x-1 overflow-y-scroll rounded-xl bg-charcoal-100/50 p-1 md:mb-2 lg:overflow-hidden"
        >
          <Tab v-for="tab in props.blok.panels" :key="tab._uid" v-slot="{ selected }" as="template">
            <button
              :class="[
                'rounded-lg px-6 py-3',
                selected ? 'bg-white text-charcoal-900' : 'text-charcoal-700 hover:bg-charcoal-100'
              ]"
              @click="setActiveHeading(tab.heading)"
            >
              {{ tab.heading }}
              <div
                :class="['border-t-2 border-charcoal-600/50 transition-all duration-300', selected ? 'w-full' : 'w-0']"
              ></div></button
          ></Tab>
        </TabList>
        <TabPanels>
          <TabPanel v-for="child_block in blok.panels" class="mx-auto w-screen max-w-6xl overflow-hidden md:w-full">
            <StoryblokComponent :key="child_block._uid" :blok="child_block" />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  </div>
</template>
