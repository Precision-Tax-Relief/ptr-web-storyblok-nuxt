<script setup lang="ts">
import { ref, reactive } from "vue"
import type { ContactAnswerInput } from "#shared/types/api"
import { ContactFormSchema } from "#shared/utils/validators/contact"

// Props for the component
interface Props {
  title?: string
  submitText?: string
  phoneNumber?: string
  apiEndpoint?: string
  showPhoneNumber?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: "Set up your FREE Consultation",
  submitText: "Get My Free Consultation",
  phoneNumber: "1-877-635-2025",
  apiEndpoint: "/api/contact",
  showPhoneNumber: true
})

// Form state
const formData = reactive<ContactAnswerInput>({
  name: "",
  email: "",
  phone: ""
})

// Form state management
const isSubmitting = ref(false)
const isSuccess = ref(false)
const isError = ref(false)
const errorMessage = ref("")

// Form validation
const errors = reactive({
  name: "",
  email: "",
  phone: ""
})

const validateForm = (): boolean => {
  let isValid = true

  // Reset errors
  errors.name = ""
  errors.email = ""
  errors.phone = ""

  const result = ContactFormSchema.safeParse(formData)

  if (!result.success) {
    console.log(result.error)
    return false
  }
  console.log(result.data)

  // // Validate name
  // if (!formData.name.trim()) {
  //   errors.name = "Name is required"
  //   isValid = false
  // }
  //
  // // Validate phone
  // const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
  // if (!formData.phone.trim()) {
  //   errors.phone = "Phone number is required"
  //   isValid = false
  // } else if (!phoneRegex.test(formData.phone)) {
  //   errors.phone = "Please enter a valid phone number"
  //   isValid = false
  // }
  //
  // // Validate email
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  // if (!formData.email.trim()) {
  //   errors.email = "Email is required"
  //   isValid = false
  // } else if (!emailRegex.test(formData.email)) {
  //   errors.email = "Please enter a valid email address"
  //   isValid = false
  // }

  return isValid
}

// Form submission
const submitForm = async () => {
  const anonymousId = window?.analytics?.user()?.anonymousId()
  const ga_client_id = useCookie("_ga")
  const route = useRoute()
  const wdata = {
    anonymousId: anonymousId,
    ga_client_id: ga_client_id.value,
    page_url: document.URL,
    referrer: document.referrer,
    path: route.path,
    tax_amount_id: 14,
    gclid: route.query.gclid,
    msclkid: route.query.msclkid,
    gbraid: route.query.gbraid,
    utm_source: route.query.utm_source,
    utm_medium: route.query.utm_medium,
    utm_campaign: route.query.utm_campaign,
    utm_content: route.query.utm_content
  }

  if (!validateForm()) return

  isSubmitting.value = true
  isSuccess.value = false
  isError.value = false
  errorMessage.value = ""

  try {
    const response = await fetch(props.apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        form: formData,
        ...wdata
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Something went wrong")
    }

    let resp = await response.json()
    console.log(resp)

    const router = useRouter()
    router.push({ path: "form/" + resp?.lead_id + "/" })
    // Reset form on success
    formData.name = ""
    formData.phone = ""
    formData.email = ""
    isSuccess.value = true
  } catch (error: any) {
    isError.value = true
    errorMessage.value = error.message || "Failed to submit form"
    console.error("Form submission error:", error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="mx-auto">
    <div class="bg-secondary px-1 py-2 text-center font-bold text-white">
      <h3 class="m-0 py-2 text-center text-xl font-bold lg:text-xl">{{ title }}</h3>
    </div>
    <div class="bg-white p-6">
      <div id="main-form" class="main-form">
        <!-- Success message -->
        <div v-if="isSuccess" class="mb-6 rounded border-l-4 border-green-500 bg-green-100 p-4 text-green-700">
          <p>Thank you for your message!<br />We'll get back to you soon.</p>
        </div>

        <!-- Error message -->
        <div v-if="isError" class="mb-6 rounded border-l-4 border-red-500 bg-red-100 p-4 text-red-700">
          <p>{{ errorMessage || "An error occurred. Please try again." }}</p>
        </div>
        <form onsubmit="return false;">
          <input id="abid_1" type="hidden" name="AbId1" />
          <input id="abid_2" type="hidden" name="AbId2" />
          <input id="abid_type" type="hidden" name="AbIdType" />
          <input id="abid_r" type="hidden" name="AbIdR" />
          <input id="referrer" type="hidden" name="Referrer" />
          <input id="request_url" type="hidden" name="RequestUrl" />
          <input type="hidden" name="TaxAmountId" value="14" />
          <input id="anonymous_id" type="hidden" name="AnonymousId" />
          <input id="ga_client_id" type="hidden" name="GaClientId" />
          <input id="iis_id" type="hidden" name="IisId" />
          <h4 class="mb-6 text-center text-base font-bold lg:text-lg">Let us know how we can reach you.</h4>

          <!-- Name field -->
          <div class="form-group mb-4">
            <div class="relative">
              <Icon name="fa-solid:user-alt" class="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400" />
              <input
                id="form-name"
                v-model="formData.name"
                class="form-control h-12 w-full bg-slate-200 pl-14"
                :class="{ 'border-2 border-red-500': errors.name }"
                name="Name"
                placeholder="Full Name"
              />
              <div
                v-if="errors.name"
                class="error-message absolute right-0 top-0 z-10 bg-red-500 p-1 text-lg leading-5 text-white"
              >
                {{ errors.name }}
              </div>
            </div>
          </div>

          <!-- Phone field -->
          <div class="form-group mb-4">
            <div class="input-group_icon input-group_icon-phone relative">
              <Icon name="fa-solid:phone-alt" class="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400" />
              <input
                id="PhoneNumber"
                v-model="formData.phone"
                class="form-control h-12 w-full bg-slate-200 pl-14"
                :class="{ 'border-2 border-red-500': errors.phone }"
                name="Phone"
                placeholder="Phone Number"
              />
              <div
                v-if="errors.phone"
                class="error-message absolute right-0 top-0 z-10 bg-red-500 p-1 text-lg leading-5 text-white"
              >
                {{ errors.phone }}
              </div>
            </div>
          </div>

          <!-- Email field -->
          <div class="form-group mb-6">
            <div class="input-group_icon input-group_icon-email relative">
              <Icon name="fa-solid:envelope" class="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400" />
              <input
                id="my-email"
                v-model="formData.email"
                class="form-control h-12 w-full bg-slate-200 pl-14"
                :class="{ 'border-2 border-red-500': errors.email }"
                name="Email"
                type="email"
                placeholder="Example@email.com"
              />
              <div
                v-if="errors.email"
                class="error-message absolute right-0 top-0 z-10 bg-red-500 p-1 text-lg leading-5 text-white"
              >
                {{ errors.email }}
              </div>
            </div>
          </div>

          <!-- Submit button -->
          <button
            id="btn-submit"
            @click.prevent="submitForm"
            class="w-full cursor-pointer rounded-sm bg-green-500 px-4 py-4 text-center font-sans text-xl font-bold tracking-wider text-white hover:bg-green-600 lg:rounded-md"
            :disabled="isSubmitting"
            :class="{ 'opacity-70': isSubmitting }"
            data-click-name="ClickForm - Submit"
          >
            <span v-if="isSubmitting">Sending...</span>
            <span v-else>{{ submitText }}</span>
          </button>

          <!-- Phone number display -->
          <div v-if="showPhoneNumber" class="form-summary mt-4 text-center">
            <strong class="text-center text-2xl text-black" style="font-weight: bolder"
              >or Call {{ phoneNumber }}</strong
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
