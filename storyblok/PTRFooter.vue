<script setup lang="ts">
import type { PtrFooterStoryblok } from "~/types/component-types-sb"
import { useBusinessHours } from "@/composables/useBusinessHours"
// const { isBusinessOpen } = useBusinessHours()

interface PropTypes {
  blok: PtrFooterStoryblok
}

const props = defineProps<PropTypes>()
</script>

<template>
  <footer v-editable="props.blok" class="bg-primaryDark pt-8 sm:pt-16">
    <div class="container px-2 sm:px-8 pb-0">
      <div class="lg:px-10">
        <div>
          <div class="mx-auto text-center">
            <figure class="flex items-center justify-center flex-col">
              <NuxtPicture
                height="380"
                :modifiers="{ smart: true }"
                :src="blok.groupPhoto.filename"
                :alt="blok.groupPhoto.alt"
                loading="lazy"
                :img-attrs="{
                  class: 'mx-auto'
                }"
              />
              <figcaption class="text-slate-300 text-lg font-light">
                Our team consists of proven tax professionals that include CPAs, Tax Attorneys, and federally licensed
                Enrolled Agents.
              </figcaption>
            </figure>
          </div>
          <aside class="text-center text-white my-8">
            <h4 class="font-bold text-3xl sm:text-4xl pb-3">If you have a tax problem, the time to act is now.</h4>
            <p class="text-white text-lg sm:text-xl pb-4">
              Trust the experts at Precision Tax Relief to put it behind you for good.
            </p>
            <a
              class="flex-col mx-auto bg-green-500 hover:bg-green-600 py-3 px-8 hidden sm:inline-flex items-center justify-center gap-1 select-none rounded-sm lg:rounded-md"
              href="#contact"
              v-if="true"
            >
              <span class="text-xl">Call us today:</span><strong class="text-4xl">1-844-229-6966</strong>
              <span>
                <span class="underline text-2xl" href="#contact" data-click-name="ClickFtr - Form Scroll"
                  >or fill out the form above</span
                >
              </span>
            </a>
            <a
              class="flex-col mx-auto font-medium text-3xl bg-green-500 hover:bg-green-600 py-3 px-8 hidden sm:inline-flex items-center justify-center gap-1 select-none rounded-sm lg:rounded-md"
              href="#"
              v-else
              >Get a Free Consultation</a
            >
          </aside>
        </div>
        <div class="pb-16 sm:py-16 flex flex-wrap justify-center items-center gap-8">
          <span class="text-slate-300 uppercase shrink-0">Proud members of:</span>
          <NuxtPicture
            loading="lazy"
            src="https://a-us.storyblok.com/f/1023258/120x58/71e700f6c8/naea.webp"
            alt="National Association of Enrolled Agents"
            width="120"
            height="58"
          />
          <NuxtPicture
            loading="lazy"
            src="https://a-us.storyblok.com/f/1023258/184x58/f890c5ffb6/aicpa.webp"
            alt="American Institute of CPAs"
            width="184"
            height="58"
          />
          <NuxtPicture
            loading="lazy"
            src="https://a-us.storyblok.com/f/1023258/483x58/03376c781c/astps.webp"
            alt="American Society of Tax Problem Solvers, A Non-Profit Professional Association"
            width="483"
            height="58"
          />
        </div>
        <div class="text-center text-slate-400 text-sm mb-1">
          <p>
            We will not rent, share, or sell your information I <a id="open-privacy-modal" href="#">Privacy Policy</a>
          </p>
          <p>Contact us: Precision Tax Relief 1-844-229-6966 I Address: 233 E Locust Ave, Coeur d' Alene, ID 83814</p>
          <p>Copyright 2025 Precision Tax Relief, LLC | All Rights Reserved</p>
        </div>
        <div id="disclaimers" class="text-slate-300 gap-2 flex flex-col text-xs py-4">
          <p>
            [1] Precision Tax Relief is a registered trademark of Precision Tax Relief, LLC. All other trademarks, trade
            names, product names, logos, and brands are property of their respective owners. Use of these trademarks,
            trade names, product names, logos, and brands does not imply endorsement.
          </p>
          <p>
            [2] Statistics are based on prior results for clients. Estimates are based on prior results; individual
            results will vary based on circumstances.
          </p>
          <p>
            [3] The company data presented in the competitor chart on our website is updated on a monthly basis. This
            data is sourced directly from BBB.org, Google.com, and Trustpilot.com,. While we strive to ensure the
            accuracy and completeness of the information, we cannot guarantee that it is always up-to-date or
            error-free. Please verify the details from the respective sources for the most current information.
          </p>
        </div>
      </div>
    </div>
  </footer>

</template>
