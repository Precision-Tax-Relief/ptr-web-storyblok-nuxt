<script setup lang="ts">
import type { FaqItemStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  title: string
  subtitle?: string
  items?: [FaqItemStoryblok]
}
defineProps<PropTypes>()

// Animation enter/leave functions
function beforeEnter(el: Element) {
  const element = el as HTMLElement
  element.style.height = "0"
  element.style.overflow = "hidden"
}

function enter(el: Element, done: () => void): void {
  const element = el as HTMLElement
  const targetHeight = element.scrollHeight

  // Start animation with easing
  const animation = element.animate([{ height: "0px" }, { height: targetHeight + "px" }], {
    duration: 300,
    easing: "cubic-bezier(0.25, 0.1, 0.25, 1.0)", // Use ease-out cubic
    fill: "forwards"
  })

  animation.onfinish = () => {
    done()
  }
}

function afterEnter(el: Element): void {
  const element = el as HTMLElement
  element.style.height = "auto"
  element.style.overflow = "visible"
}

function beforeLeave(el: Element): void {
  const element = el as HTMLElement
  // Set height to current height before animating
  element.style.height = element.scrollHeight + "px"
  element.style.overflow = "hidden"

  // Force a repaint to make sure the height is applied
  element.offsetHeight
}

function leave(el: Element, done: () => void): void {
  const element = el as HTMLElement
  // Animate to height 0 with easing
  const animation = element.animate([{ height: element.scrollHeight + "px" }, { height: "0px" }], {
    duration: 300,
    easing: "cubic-bezier(0.4, 0.0, 0.2, 1)", // Use ease-in-out cubic
    fill: "forwards"
  })

  animation.onfinish = () => {
    done()
  }
}
</script>

<template>
  <div class="container px-4 pt-8 sm:px-2 md:py-12 lg:px-0">
    <header class="px-2 sm:px-0">
      <h2
        class="mx-auto mb-8 max-w-4xl text-center text-2xl font-bold leading-tight text-primary md:text-4xl lg:text-4xl"
      >
        {{ title }}
      </h2>
      <h5 v-if="subtitle" class="mx-auto mb-6 hidden max-w-3xl px-4 text-center text-lg md:block lg:px-0">
        {{ subtitle }}
      </h5>
    </header>

    <div class="mx-auto mb-10 lg:max-w-3xl xl:max-w-4xl">
      <HeadlessDisclosure
        v-for="(item, index) in items"
        :key="index"
        v-slot="{ open }"
        as="div"
        class="mb-3 overflow-hidden bg-white"
      >
        <div class="content">
          <HeadlessDisclosureButton
            class="relative flex w-full items-center gap-4 rounded-xl p-1 transition-colors duration-300 hover:bg-neutralLight md:gap-8"
            :id="`accordion-button-${index}`"
            :aria-expanded="open"
            :aria-controls="`accordion-panel-${index}`"
          >
            <span class="flex items-center justify-center" aria-hidden="true">
              <Icon
                name="mdi:add-circle"
                class="h-10 w-10 transform text-primaryDark transition-transform duration-300 ease-in-out"
                :class="{ 'rotate-45': open }"
              />
            </span>
            <h3 class="text-left text-lg font-bold leading-normal text-primary md:text-xl">
              {{ item.question }}
            </h3>
          </HeadlessDisclosureButton>

          <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
            @before-leave="beforeLeave"
            @leave="leave"
            :css="false"
          >
            <HeadlessDisclosurePanel
              :id="`accordion-panel-${index}`"
              class="prose px-4 sm:px-8 md:max-w-full md:px-24"
              v-html="item.answer"
            />
          </transition>
        </div>
      </HeadlessDisclosure>
    </div>
  </div>
</template>
