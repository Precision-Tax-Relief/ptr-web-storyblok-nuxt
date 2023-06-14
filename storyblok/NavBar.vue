<script setup lang="ts">
import NavBarMenu from '~/components/NavBarComponent.vue'
defineProps({ blok: Object })
</script>

<template>
  <NavBarMenu v-editable="blok">
    <template #desktop-nav="{ isOverlay }">
      <StoryblokComponent
        v-for="childBlok in blok.desktopNavigation"
        :key="childBlok._uid"
        :blok="childBlok"
        :isOverlay="isOverlay"
      />
    </template>
    <template #desktop-social="{ isOverlay }">
      <StoryblokComponent
        v-for="childBlok in blok.desktopSocial"
        :key="childBlok._uid"
        :blok="childBlok"
        :isOverlay="isOverlay"
      />
    </template>
    <template #mobile-nav>
      <StoryblokComponent v-for="childBlok in blok.mobileNavigation" :key="childBlok._uid" :blok="childBlok" />
    </template>
    <template #mobile-social>
      <StoryblokComponent v-for="childBlok in blok.mobileSocial" :key="childBlok._uid" :blok="childBlok" />
    </template>
  </NavBarMenu>
</template>
