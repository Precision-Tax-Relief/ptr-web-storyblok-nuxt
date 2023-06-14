<template>
  <footer class="relative overflow-hidden bg-charcoal-900">
    <svg
      class="absolute -top-2 w-screen -translate-y-1/2 transform"
      viewBox="0 0 1024 1024"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <circle cx="512" cy="512" r="512" fill="url(#0e5cb4c7-10e5-4dc5-b523-ba382132f3fb)" fill-opacity="1" />
      <defs>
        <radialGradient id="0e5cb4c7-10e5-4dc5-b523-ba382132f3fb">
          <stop stop-color="#080809" />
          <stop offset="1" stop-color="#171718" />
        </radialGradient>
      </defs>
    </svg>
    <div class="relative z-10 mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
      <nav class="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
        <slot name="links" />
      </nav>
      <div class="mt-10 flex justify-center space-x-10">
        <slot name="icons" />
      </div>
      <p class="mt-10 text-center text-xs leading-5 text-charcoal-300">
        <slot name="copy" />
      </p>
    </div>
  </footer>
</template>
