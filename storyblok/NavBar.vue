<script setup lang="ts">
import NavBarMenu from "~/components/NavBarComponent.vue"
interface PropTypes {
  blok: object
}

const props = defineProps<PropTypes>()
</script>

<template>
  <NavBarMenu v-editable="props.blok">
    <template #desktop-nav="{ isOverlay }">
      <StoryblokComponent
        v-for="childBlok in props.blok.desktopNavigation"
        :key="childBlok._uid"
        :blok="childBlok"
        :is-overlay="isOverlay"
      />
    </template>
    <template #desktop-social="{ isOverlay }">
      <StoryblokComponent
        v-for="childBlok in props.blok.desktopSocial"
        :key="childBlok._uid"
        :blok="childBlok"
        :is-overlay="isOverlay"
      />
    </template>
    <template #mobile-nav>
      <StoryblokComponent v-for="childBlok in props.blok.mobileNavigation" :key="childBlok._uid" :blok="childBlok" />
    </template>
    <template #mobile-social>
      <StoryblokComponent v-for="childBlok in props.blok.mobileSocial" :key="childBlok._uid" :blok="childBlok" />
    </template>
  </NavBarMenu>
</template>
