<script setup lang="ts">
import { type YoutubeEmbedStoryblok } from "~/types/component-types-sb"
import { ref } from "vue"

interface PropTypes {
  blok: YoutubeEmbedStoryblok
}

const props = defineProps<PropTypes>()
const showYouTube = ref(false)
const showFacade = ref(true)
const isFallbackImg = ref(false)

// Extract YouTube video ID from URL
const getYoutubeId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : ""
}

const videoId = getYoutubeId(props.blok.youtubeLink.url)
const thumbnailUrl = ref(`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`)

// Fallback if high-res thumbnail not available
const handleImgError = () => {
  thumbnailUrl.value = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
  isFallbackImg.value = true
}

const loadYouTube = () => {
  showYouTube.value = true
  showFacade.value = false
}
</script>

<template>
  <div v-editable="props.blok" class="youtube-container">
    <!-- Lightweight facade - loads YouTube only on click -->
    <div v-if="showFacade" class="youtube-facade aspect-video w-full cursor-pointer relative" @click="loadYouTube">
      <img
        :src="thumbnailUrl"
        @error="handleImgError"
        alt="YouTube video thumbnail"
        class="w-full h-full object-cover"
        loading="lazy"
        fetchpriority="low"
      />
      <div class="play-button absolute inset-0 flex items-center justify-center">
        <div class="play-icon w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
          <div
            class="w-0 h-0 ml-1 border-solid border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-white"
          ></div>
        </div>
        <div
          class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 py-2 text-white text-sm md:text-base text-center"
        >
          Click to play video
        </div>
      </div>
    </div>

    <!-- Actual YouTube embed - only loaded when needed -->
    <div v-if="showYouTube" class="youtube-iframe-container aspect-video w-full">
      <iframe
        class="w-full h-full"
        :src="`${props.blok.youtubeLink.url}?modestbranding=1&autoplay=1`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
.youtube-facade {
  background-color: #000;
}

.play-icon {
  transition:
    transform 0.2s ease-in-out,
    background-color 0.2s ease-in-out;
}

.youtube-facade:hover .play-icon {
  transform: scale(1.1);
  background-color: #ff0000;
}

/* Triangle play icon */
.border-l-12 {
  border-left-width: 12px;
}
</style>
