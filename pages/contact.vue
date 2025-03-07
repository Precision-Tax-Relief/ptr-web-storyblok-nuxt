<script setup lang="ts">
import ContactForm from "~/components/ContactForm.vue"

useHead({
  title: "Contact Us",
  meta: [
    {
      name: "description",
      content: "Get in touch with our team. We're here to help with any questions you may have."
    }
  ]
})
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl md:text-4xl font-bold text-charcoal-800 mb-6">Contact Us</h1>

      <div class="bg-neutralLight rounded-lg shadow-sm p-6 md:p-8 mb-8">
        <p class="text-charcoal-700 mb-6">
          Have a question or need assistance? Fill out the form below and our team will get back to you as soon as
          possible.
        </p>

        <ContactForm />
      </div>

      <div class="grid md:grid-cols-2 gap-8 mt-12">
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h2 class="text-xl font-semibold text-charcoal-800 mb-4">Our Location</h2>
          <p class="text-charcoal-600 mb-2">123 Business Avenue</p>
          <p class="text-charcoal-600 mb-2">Suite 456</p>
          <p class="text-charcoal-600">San Francisco, CA 94107</p>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h2 class="text-xl font-semibold text-charcoal-800 mb-4">Contact Information</h2>
          <p class="text-charcoal-600 mb-2"><strong class="text-charcoal-700">Email:</strong> info@company.com</p>
          <p class="text-charcoal-600 mb-2"><strong class="text-charcoal-700">Phone:</strong> (555) 123-4567</p>
          <p class="text-charcoal-600"><strong class="text-charcoal-700">Hours:</strong> Mon-Fri: 9am-5pm</p>
        </div>
      </div>
    </div>
  </div>
</template>
