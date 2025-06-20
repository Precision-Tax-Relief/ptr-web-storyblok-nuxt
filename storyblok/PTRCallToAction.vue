<script setup lang="ts">
import type { PtrCallToActionStoryblok } from "~/types/component-types-sb"

interface PropTypes {
  blok: PtrCallToActionStoryblok
}
const props = defineProps<PropTypes>()
</script>

<template>
  <div v-editable="props.blok" class="container max-w-6xl px-2 py-20 md:px-8">
    <div class="section-head">
      <h2
        class="mx-auto mb-12 max-w-5xl text-center text-2xl font-black font-bold leading-tight text-primary sm:text-2xl md:px-24 md:text-4xl lg:-mt-8 lg:mb-20 lg:text-4xl"
      >
        What To Expect During Your<br /><span class="md:whitespace-nowrap">Free Consultation</span>
      </h2>
    </div>
    <div class="my-10 flex flex-col justify-between gap-12 px-2 sm:px-0 lg:flex-row">
      <PTRCallToActionStep>
        <template v-slot:number> 1 </template>
        <template v-slot:header>
          Speak to a licensed <br class="hidden sm:inline" />
          tax expert
        </template>
        <template v-slot:default>
          <div>
            Share details about your situation in a <strong>free, confidential consultation,</strong> and ask our tax
            professional any questions you have.
          </div>
        </template>
      </PTRCallToActionStep>
      <PTRCallToActionStep>
        <template v-slot:number> 2 </template>
        <template v-slot:header> Get an honest assessment <br class="hidden sm:inline" />of your situation </template>
        <template v-slot:default>
          <div>
            Our tax professionals will assess your <strong>options for reaching a favorable solution</strong> to your
            tax problem. We may even be able to <strong>help you resolve your issue for free.</strong>
          </div>
        </template>
      </PTRCallToActionStep>
      <PTRCallToActionStep hasCheck>
        <template v-slot:number> 3 </template>
        <template v-slot:header> Get a transparent quote with affordable payments </template>
        <template v-slot:default>
          <div>
            If your situation requires professional assistance, we'll provide you a transparent quote for our services
            with <strong>flexible payment options based on what you can afford.</strong> We NEVER request full payment
            up front.
          </div>
        </template>
      </PTRCallToActionStep>
    </div>
    <PTRCallConsultationButton />
  </div>
</template>
