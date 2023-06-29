<script setup lang="ts">
import { GetInTouchStoryblok } from "~/types/component-types-sb"
import GetInTouchComponent from "~/components/GetInTouchComponent.vue"

interface PropTypes {
  blok: GetInTouchStoryblok
}

const props = defineProps<PropTypes>()
</script>

<template>
  <GetInTouchComponent>
    <template #title>{{ props.blok.title }}</template>
    <template #description>{{ props.blok.description }}</template>
    <template #address>
      <a class="hover:text-gray-900" :href="props.blok.mapsLink.url">
        {{ props.blok.addressLineOne }}
        <br />
        {{ props.blok.addressLineTwo }}
      </a>
    </template>
    <template #telephone>
      <a class="hover:text-gray-900" :href="props.blok.telLink.url">{{ props.blok.telNumber }}</a>
    </template>
    <template #email>
      <a class="hover:text-gray-900" :href="props.blok.emailLink.url">{{ props.blok.email }}</a>
    </template>
    <template #form>
      <StoryblokComponent v-for="child_blok in props.blok.form" :key="child_blok._uid" :blok="child_blok" />
    </template>
  </GetInTouchComponent>
</template>
