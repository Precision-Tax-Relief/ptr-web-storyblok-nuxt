<script setup lang="ts">
import type { PtrFooterStoryblok } from "~/types/component-types-sb"
import { useBusinessHours } from "@/composables/useBusinessHours"
import MBG30Day from "~/assets/svg/30d-mbg.svg"

const { isBusinessOpen } = useBusinessHours()
interface PropTypes {
  blok: PtrFooterStoryblok
}

const props = defineProps<PropTypes>()
</script>

<template>
  <footer v-editable="props.blok" class="bg-primaryDark pt-8 sm:pt-16">
    <div class="container px-2 pb-0 sm:px-8">
      <div class="lg:px-10">
        <div>
          <div class="mx-auto text-center">
            <figure class="flex flex-col items-center justify-center">
              <NuxtPicture
                height="380"
                :modifiers="{ smart: true }"
                :src="blok.groupPhoto.filename"
                :alt="blok.groupPhoto.alt ?? undefined"
                loading="lazy"
                :img-attrs="{
                  class: 'mx-auto'
                }"
              />
              <figcaption class="text-lg font-light text-slate-300">
                Our team consists of proven tax professionals that include CPAs, Tax Attorneys, and federally licensed
                Enrolled Agents.
              </figcaption>
            </figure>
          </div>
          <aside class="my-8 text-center text-white">
            <h4 class="pb-3 text-3xl font-bold sm:text-4xl">If you have a tax problem, the time to act is now.</h4>
            <p class="pb-4 text-lg text-white sm:text-xl">
              Trust the experts at Precision Tax Relief to put it behind you for good.
            </p>
            <PTRCallConsultationButton :lighter_text="true" />
          </aside>
        </div>
        <div class="hidden flex-wrap items-center justify-center gap-8 pb-16 sm:py-16 md:flex">
          <span class="shrink-0 uppercase text-slate-300">Proud members of:</span>
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
        <div class="mx-auto my-8 flex flex-col items-center gap-6 md:hidden">
          <NuxtImg
            src="https://a-us.storyblok.com/f/1023258/479x120/ab7cca33fc/bbb-mobile.png"
            alt="BBB A+ Accredited Business"
            format="webp"
            loading="eager"
            fetchpriority="high"
            width="240"
            height="60"
          ></NuxtImg>
          <MBG30Day width="240" class="max-w-full" />
        </div>
        <div class="mb-1 text-center text-sm text-slate-400">
          <p>
            We will not rent, share, or sell your information I <a id="open-privacy-modal" href="#">Privacy Policy</a>
          </p>
          <p>Contact us: Precision Tax Relief 1-855-444-7551 I Address: 233 E Locust Ave, Coeur d' Alene, ID 83814</p>
          <p>Copyright 2025 Precision Tax Relief, LLC | All Rights Reserved</p>
        </div>
        <div id="disclaimers" class="flex flex-col gap-2 py-4 text-xs text-slate-300">
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
