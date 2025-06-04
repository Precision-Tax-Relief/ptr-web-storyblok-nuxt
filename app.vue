<script setup lang="ts">
provideHeadlessUseId(() => useId())
useHead({
  meta: [{ name: "robots", content: "noindex" }]
})
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
