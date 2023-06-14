<script setup lang="ts">
import HeroVideoComponent from "~/components/HeroVideoComponent.vue"

interface PropTypes {
  blok: Object
}

const props = defineProps<PropTypes>()

console.log("props.blok", props.blok)
</script>

<template>
  <div>
    <HeroVideoComponent v-editable="props.blok" :videoSrc="blok.video?.filename">
      <template #big-text>{{ props.blok.bigText }}</template>
      <template #small-text>{{ props.blok.smallText }}</template>
      <template #cta>
        <StoryblokComponent v-for="childBlok in blok.cta" :key="childBlok._uid" :blok="childBlok" />
      </template>
    </HeroVideoComponent>
    <pre>{{ JSON.stringify(props.blok, null, 2) }}</pre>
  </div>
</template>

<!--<template>-->
<!--  <NavBarMenu v-editable="blok">-->
<!--    <template #desktop-nav="{isOverlay}">-->
<!--      <StoryblokComponent v-for="childBlok in blok.desktopNavigation" :key="childBlok._uid" :blok="childBlok" :isOverlay="isOverlay" />-->
<!--    </template>-->
<!--    <template #desktop-social="{isOverlay}">-->
<!--      <StoryblokComponent v-for="childBlok in blok.desktopSocial" :key="childBlok._uid" :blok="childBlok" :isOverlay="isOverlay" />-->
<!--    </template>-->
<!--    <template #mobile-nav>-->
<!--      <StoryblokComponent v-for="childBlok in blok.mobileNavigation" :key="childBlok._uid" :blok="childBlok" />-->
<!--    </template>-->
<!--    <template #mobile-social>-->
<!--      <StoryblokComponent v-for="childBlok in blok.mobileSocial" :key="childBlok._uid" :blok="childBlok" />-->
<!--</template>-->
