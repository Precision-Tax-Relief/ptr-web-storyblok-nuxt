<template>
  <div v-editable="blok" class="w-full rounded-[5px] bg-[#f7f6fd] p-12 text-center">
    <h3 class="text-2xl font-bold text-[#1d243d]">
      {{ blok.name }}
    </h3>
  </div>
</template>

<script setup>
defineProps({ blok: Object })
</script>
