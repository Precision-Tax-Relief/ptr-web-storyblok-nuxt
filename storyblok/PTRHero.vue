<script setup lang="ts">
import type { PtrHeroStoryblok } from "~/types/component-types-sb"
import BBBTorchAwards from "~/components/svg/BBBTorchAwards.vue"
const { isBusinessOpen } = useBusinessHours()

interface PropTypes {
  blok: PtrHeroStoryblok
}

const props = defineProps<PropTypes>()
</script>

<template>
  <div class="bg-slate-100 py-16">
    <div class="px-0 sm:px-4 md:px-8 container">
      <div class="flex flex-col lg:flex-row gap-16 lg:items-start lg:justify-between">
        <div>
          <div class="px-2 sm:px-0 mb-8 lg:mx-auto lg:max-w-7xl text-center text-primary">
            <h1 class="mb-12 text-4xl md:text-6xl font-bold tracking-wider lg:mb-10">
              BBB Approved <span class="md:whitespace-nowrap">Tax Attourney</span>
            </h1>
            <h3 class="text-xl md:text-3xl/8 font-normal">
              <span>
                Get <strong class="font-bold">Immediate</strong> Help with a
                <strong class="font-bold">FREE</strong> Confidential Consultation from the BBB's
                <strong class="whitespace-nowrap font-bold">#1 Rated Tax Relief Attorney</strong> in the US
              </span>
            </h3>
          </div>
          <figure class="splash-thumb">
            <NuxtPicture
              :modifiers="{ smart: true }"
              :src="blok.image.filename"
              :img-attrs="{
                class: 'sm:m-2 w-full'
              }"
              quality="75"
            />
            <figcaption
              class="text-pretty lg:leading-1 px-2 pb-0 pt-6 sm:px-0 text-center text-sm leading-normal text-[#666] lg:pt-2 lg:text-left xl:text-xl"
            >
              <p>
                <strong>Precision Tax</strong>, under the leadership of Scott Gettis, Michele Mulkey, and Gene Haag,
                proudly maintains an <strong>A+&nbsp;BBB</strong> rating and has been awarded the
                <strong>Torch Award for Ethics in 2019, 2023, and 2024.</strong>
              </p>
            </figcaption>
          </figure>
        </div>
        <div class="shrink-0 basis-auto lg:block lg:grow-0" :class="{ hidden: isBusinessOpen }">
          <ContactForm />
        </div>
      </div>
      <div class="px-3 sm:px-0 py-12">
        <ul class="grid grid-cols-2 items-center justify-between max-w-xl mx-auto lg:max-w-full lg:flex">
          <li class="flex flex-col items-center">
            <span class="text-center">
              <BBBTorchAwards />
            </span>
          </li>
          <li class="mt-5 flex flex-col items-center lg:mt-0">
            <div class="badge badge_google">
              <a
                href="/pdf/TorchAwards_Certificate_Recipient_2023.pdf"
                target="_blank"
                data-click-name="ClickG2 TorchAwards_Certificate_2023"
              >
                <picture
                  class="lozad m-0 h-auto w-[141px] lg:w-[200px]"
                  data-iesrc="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/TAFE2023.png"
                  data-alt="Torch"
                  data-loaded="true"
                >
                  <source
                    srcset="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/TAFE2023.png"
                    type="image/png" />
                  <img src="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/TAFE2023.png" alt="Torch"
                /></picture>
              </a>
            </div>
          </li>
          <li class="mt-5 flex flex-col items-center lg:mt-0">
            <div class="badge badge_google">
              <a
                href="/pdf/TorchAwards_Certificate_Recipient_2019.pdf"
                target="_blank"
                data-click-name="ClickG2 TorchAwards_Certificate_2019"
              >
                <picture
                  class="lozad m-0 h-auto w-[141px] lg:w-[200px]"
                  data-iesrc="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/TAFE2019.png"
                  data-alt="Torch"
                  data-loaded="true"
                >
                  <source
                    srcset="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/TAFE2019.png"
                    type="image/png" />
                  <img src="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/TAFE2019.png" alt="Torch"
                /></picture>
              </a>
            </div>
          </li>
          <li class="mt-5 flex flex-col items-center lg:mt-0">
            <div class="badge badge_google">
              <picture
                class="lozad m-0 h-auto w-[100px] lg:w-[140px]"
                data-iesrc="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/bbb-mobile.png"
                data-alt="Torch"
                data-loaded="true"
              >
                <source
                  srcset="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/bbb-mobile.png"
                  type="image/png"
                />
                <img
                  class="m-0 h-auto w-[140px] lg:w-[200px]"
                  src="//prod-taxattorney-bbb.azureedge.net/assets/images/shared/bbb-mobile.png"
                  alt="Torch"
                />
              </picture>
            </div>
          </li>
        </ul>
      </div>
      <div class="pt-5 px-3 md:px-0 text-xl md:text-center xl:text-2xl">
        <h5 class="mb-5 text-center text-xl font-bold text-primary underline lg:hidden">Our promise:</h5>
        <p>
          <strong class="hidden lg:inline-block">Our Promise:</strong> Precision Tax Relief
          <strong>will never share or sell</strong> your information. Everything you discuss with us is
          <strong>completely confidential.</strong>
        </p>
      </div>
    </div>
  </div>
</template>
