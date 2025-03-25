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
  <!-- Start of ChatBot (www.chatbot.com) code -->
<script>
  window.__ow = window.__ow || {};
  window.__ow.organizationId = "cfb0fb80-73a9-47bc-83f6-66e008f13fad";
  window.__ow.template_id = "54b85032-dd54-4e73-92e5-14a2c33c3e62";
  window.__ow.integration_name = "manual_settings";
  window.__ow.product_name = "chatbot";   
  ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[OpenWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.openwidget.com/openwidget.js",t.head.appendChild(n)}};!n.__ow.asyncInit&&e.init(),n.OpenWidget=n.OpenWidget||e}(window,document,[].slice))
</script>
<noscript>You need to <a href="https://www.chatbot.com/help/chat-widget/enable-javascript-in-your-browser/" rel="noopener nofollow">enable JavaScript</a> in order to use the AI chatbot tool powered by <a href="https://www.chatbot.com/" rel="noopener nofollow" target="_blank">ChatBot</a></noscript>
<!-- End of ChatBot code -->
</template>
