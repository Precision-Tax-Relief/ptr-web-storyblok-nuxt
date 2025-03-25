<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue"
import { TransitionRoot, TransitionChild } from "@headlessui/vue"

import type { QuestionnairePayloadInput, QuestionnaireAnswerInput } from "#shared/types/api"
interface PropTypes {
  blok: QuestionnaireStoryblok
}

const props = defineProps<PropTypes>()

// Questionnaire state management
const isValid = ref(false) // Default to false until validated
const currentStep = ref(0)
const userAnswers = ref<QuestionnaireAnswerInput>({
  "3_plus_unfiled": false,
  levied: false,
  contacted_by_ro: false,
  "self-employed": "undefined",
  owe_irs: "undefined"
})
const isCompleted = ref(false)
const isLoading = ref(true) // Start with loading state
const hasError = ref(false)
const errorMessage = ref("")

// Height management for smooth transitions
const containerHeight = ref(500) // Default minimum height
const q1Ref = ref<HTMLElement | null>(null)
const q2Ref = ref<HTMLElement | null>(null)
const q3Ref = ref<HTMLElement | null>(null)
const loadingRef = ref<HTMLElement | null>(null)
const errorRef = ref<HTMLElement | null>(null)
const completedRef = ref<HTMLElement | null>(null)
const invalidRef = ref<HTMLElement | null>(null)

// Track selected answers for multi-select questions
const selectedMultiAnswers = ref<Record<string, boolean>>({
  "your_situation-3_plus_unfiled": false,
  "your_situation-levied": false,
  "your_situation-contacted_by_ro": false,
  "your_situation-no_answer": false
})

// Method to select an answer for single-select questions
const selectSingleAnswer = (questionId: string, answerId: string | number) => {
  userAnswers.value[questionId] = answerId
  moveToNextStep()
}

// Method to handle multi-select questions
const toggleMultiAnswer = (questionId: string, answerId: string) => {
  // If "no_answer" is selected, deselect all other options
  if (answerId === "no_answer") {
    // Set all options to false
    userAnswers.value["3_plus_unfiled"] = false
    userAnswers.value["levied"] = false
    userAnswers.value["contacted_by_ro"] = false

    selectedMultiAnswers.value["your_situation-3_plus_unfiled"] = false
    selectedMultiAnswers.value["your_situation-levied"] = false
    selectedMultiAnswers.value["your_situation-contacted_by_ro"] = false

    // Toggle the no_answer visual selection for UI purposes only
    selectedMultiAnswers.value[`${questionId}-${answerId}`] = !selectedMultiAnswers.value[`${questionId}-${answerId}`]
    return
  }

  // Deselect "no_answer" if any other option is selected
  selectedMultiAnswers.value[`${questionId}-no_answer`] = false

  // Toggle the current answer
  userAnswers.value[answerId] = !userAnswers.value[answerId]
  selectedMultiAnswers.value[`${questionId}-${answerId}`] = userAnswers.value[answerId]
}

// Method to submit multi-select answers and move to next step
const submitMultiAnswers = () => {
  moveToNextStep()
}

// Navigation methods
const moveToNextStep = () => {
  if (currentStep.value < 2) {
    // 3 questions (0-indexed)
    currentStep.value++
  } else {
    completeQuestionnaire()
  }
}

const moveToPrevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const submitQuestionnaire = async (data: QuestionnairePayloadInput) => {
  isLoading.value = true
  hasError.value = false
  errorMessage.value = ""

  try {
    const response = await fetch("/api/questionnaire", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Something went wrong")
    }

    let resp = await response.json()
    console.log(resp)
    // TODO change local storage now that form is completed
  } catch (error: any) {
    hasError.value = true
    errorMessage.value = error.message || "Failed to submit form"
    console.error("Form submission error:", error)
  } finally {
    setTimeout(() => {
      isLoading.value = false
    }, 1000)
  }
}

const completeQuestionnaire = async () => {
  isCompleted.value = true

  submitQuestionnaire({
    form: userAnswers.value,
    context: useContextData()()
  })
}

// Function to update container height based on current view
const updateContainerHeight = () => {
  let currentHeight = 500 // Default minimum height

  if (isLoading.value && loadingRef.value) {
    currentHeight = loadingRef.value.scrollHeight + 20
  } else if (!isValid.value && invalidRef.value) {
    currentHeight = invalidRef.value.scrollHeight + 20
  } else if (hasError.value && errorRef.value) {
    currentHeight = errorRef.value.scrollHeight + 20
  } else if (isCompleted.value && completedRef.value) {
    currentHeight = completedRef.value.scrollHeight + 20
  } else if (currentStep.value === 0 && q1Ref.value) {
    currentHeight = q1Ref.value.scrollHeight + 60 // Added extra padding for back button
  } else if (currentStep.value === 1 && q2Ref.value) {
    currentHeight = q2Ref.value.scrollHeight + 60 // Added extra padding for back button
  } else if (currentStep.value === 2 && q3Ref.value) {
    currentHeight = q3Ref.value.scrollHeight + 60 // Added extra padding for back button
  }

  containerHeight.value = Math.max(currentHeight, 500)
}

// Watch for changes that would affect container height
watch([currentStep, isLoading, isValid, isCompleted, hasError], () => {
  // Longer delay to ensure DOM has updated
  setTimeout(updateContainerHeight, 200)
})

// Watch for changes that would affect container height
watch([currentStep, isLoading, isValid, isCompleted, hasError], () => {
  // Small delay to ensure DOM has updated
  setTimeout(updateContainerHeight, 50)
})

onMounted(() => {
  let lead_id = localStorage.getItem("lead_id")
  const route = useRoute()
  let q_lead_id = route.query.form_id

  // Validate lead_id after a short delay to simulate checking
  setTimeout(() => {
    isValid.value = q_lead_id === lead_id
    isLoading.value = false

    // Update container height after state changes
    setTimeout(updateContainerHeight, 300)
  }, 500)

  // Initial height calculation
  window.addEventListener("resize", updateContainerHeight)

  // Run height calculation after initial render
  setTimeout(updateContainerHeight, 300)
})
</script>

<template>
  <div v-editable="props.blok" class="py-16">
    <div class="px-0 sm:px-4 md:px-8 pb-16 mx-auto container text-center">
      <h1 class="text-3xl md:text-4xl text-primary font-bold">Thank you for trusting Precision Tax Relief!</h1>
      <p class="mt-4 text-xl md:text-2xl">
        In the next 2 minutes, you'll receive a text from us.<br />Please respond with the best time for us to reach
        you.
      </p>
    </div>

    <section class="container mx-auto">
      <div class="mx-auto max-w-4xl text-center bg-neutral-100 border border-primaryLight rounded-md p-8">
        <p class="text-xl mb-8">
          Our team of 50+ specialized experts includes CPAs, tax attorneys, and enrolled agents. To
          <b>save you time</b> and ensure you <b>get the most personalized solution,</b> answer 3 simple questions; it
          takes 30 seconds.
        </p>

        <!-- Main component with state transitions -->
        <TransitionRoot
          appear
          :show="true"
          enter="transition-opacity duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
        >
          <div
            class="bg-slate-200 text-left relative"
            :style="{ height: `${containerHeight}px`, transition: 'height 0.3s ease' }"
          >
            <!-- Loading state -->
            <TransitionRoot :show="isLoading">
              <div class="bg-primary p-3">
                <h3 class="text-white font-bold flex items-center gap-1 text-2xl">Loading your questionnaire...</h3>
              </div>
              <div ref="loadingRef" class="text-center text-neutral-800 py-8">
                <div class="flex justify-center mt-4">
                  <Icon name="eos-icons:three-dots-loading" class="h-24 w-24 py-32 text-slate-500" />
                </div>
              </div>
            </TransitionRoot>

            <!-- Invalid lead_id state -->
            <TransitionRoot
              :show="!isLoading && !isValid"
              enter="transition-opacity duration-300 delay-200"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="transition-opacity duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="w-full z-10 bg-primary p-3">
                <h3 class="text-white font-bold flex items-center gap-1 text-2xl">Questionnaire Unavailable</h3>
              </div>
              <div class="bg-slate-200 text-center text-neutral-800 py-8">
                <div class="flex justify-center mt-4">
                  <Icon name="mdi:alert-circle" class="h-20 w-20 text-red-600" />
                </div>
                <h4 class="text-2xl leading-8 my-8 font-bold">This questionnaire is no longer available.</h4>
                <p class="text-lg lg:text-xl leading-7 lg:leading-8">
                  It appears that this form has either already been submitted or the link is invalid. For immediate
                  assistance, please <b>call us directly at <b>(855) 444-7551</b></b>
                  to speak with a tax specialist who can help with your situation.
                </p>
              </div>
            </TransitionRoot>

            <!-- Active questionnaire -->
            <TransitionRoot
              :show="!isLoading && isValid && !isCompleted && !hasError"
              enter="transition-opacity duration-300 delay-200"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="transition-opacity duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="w-full z-10 bg-primary p-3">
                <h3 class="text-white font-bold flex items-center gap-1 text-2xl">
                  Question
                  <span class="w-10 h-10 rounded-full bg-[#78A7E9] flex items-center justify-center">
                    {{ currentStep + 1 }}
                  </span>
                  of 3
                </h3>
              </div>

              <!-- Questions Area -->
              <div class="text-center text-neutral-800 relative">
                <!-- Question 1: Self-employed -->
                <TransitionRoot
                  :show="currentStep === 0"
                  enter="transition ease-out duration-300 delay-200"
                  enter-from="transform opacity-0 translate-y-4"
                  enter-to="transform opacity-100 translate-y-0"
                  leave="transition ease-in duration-200"
                  leave-from="transform opacity-100 translate-y-0"
                  leave-to="transform opacity-0 translate-y-4"
                >
                  <div ref="q1Ref" class="px-4 py-6 absolute inset-0">
                    <div class="flex justify-center items-center relative text-slate-900">
                      <h4 class="text-2xl font-bold px-2 py-10">Are you currently self-employed?</h4>
                      <div class="flex justify-center">
                        <div class="group has-tooltip flex justify-center">
                          <div
                            class="tooltip z-50 absolute left-0 bottom-20 md:left-auto rounded-md bg-white md:max-w-sm border border-black shadow-lg p-4 hidden group-hover:block"
                          >
                            <p class="text-blue-800 text-left text-lg tracking-wide font-bold pb-2">
                              Why are we asking?
                            </p>
                            <p class="text-left">
                              To better assist you, please let us know if you are self-employed. This is a common
                              situation for many clients who reach out to us.
                            </p>
                          </div>
                          <span>
                            <Icon name="mdi:question-mark-circle-outline" class="text-lg" />
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Single Select Answers -->
                    <div class="mx-auto mb-8">
                      <div class="grid grid-cols-2 justify-center gap-6 max-w-2xl mx-auto px-4">
                        <button
                          class="text-lg lg:text-2xl py-4 lg:py-5 bg-white hover:bg-primaryDark hover:text-white border border-gray-300 rounded-lg transition-colors col-span-2 sm:col-span-1"
                          @click="selectSingleAnswer('self-employed', 'true')"
                        >
                          Yes
                        </button>
                        <button
                          class="text-lg lg:text-2xl py-4 lg:py-5 bg-white hover:bg-primaryDark hover:text-white border border-gray-300 rounded-lg transition-colors col-span-2 sm:col-span-1"
                          @click="selectSingleAnswer('self-employed', 'false')"
                        >
                          No
                        </button>
                        <button
                          class="text-lg lg:text-2xl py-4 lg:py-5 bg-white hover:bg-primaryDark hover:text-white border border-gray-300 rounded-lg transition-colors col-span-2"
                          @click="selectSingleAnswer('self-employed', 'no_answer')"
                        >
                          I prefer not to say
                        </button>
                      </div>
                    </div>
                  </div>
                </TransitionRoot>

                <!-- Question 2: Owe IRS -->
                <TransitionRoot
                  :show="currentStep === 1"
                  enter="transition ease-out duration-300 delay-200"
                  enter-from="transform opacity-0 translate-y-4"
                  enter-to="transform opacity-100 translate-y-0"
                  leave="transition ease-in duration-200"
                  leave-from="transform opacity-100 translate-y-0"
                  leave-to="transform opacity-0 translate-y-4"
                >
                  <div ref="q2Ref" class="px-4 py-6 absolute inset-0">
                    <div class="flex justify-center items-center relative text-slate-900">
                      <h4 class="text-2xl font-bold px-2 py-10">How much do you owe to the IRS?</h4>
                      <div class="flex justify-center">
                        <div class="group has-tooltip flex justify-center">
                          <div
                            class="tooltip z-50 absolute left-0 bottom-20 md:left-auto rounded-md bg-white md:max-w-sm border border-black shadow-lg p-4 hidden group-hover:block"
                          >
                            <p class="text-blue-800 text-left text-lg tracking-wide font-bold pb-2">
                              Why are we asking?
                            </p>
                            <p class="text-left">
                              It's okay if you're not certain about the amount you owe the IRS. Just give us your best
                              estimate and we'll figure it out during the call.
                            </p>
                          </div>
                          <span>
                            <Icon name="mdi:question-mark-circle-outline" class="text-lg" />
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Single Select Answers -->
                    <div class="mx-auto mb-8">
                      <div class="grid grid-cols-2 justify-center gap-6 max-w-2xl mx-auto px-4">
                        <button
                          class="text-lg lg:text-2xl py-4 lg:py-5 bg-white hover:bg-primaryDark hover:text-white border border-gray-300 rounded-lg transition-colors col-span-2 sm:col-span-1"
                          @click="selectSingleAnswer('owe_irs', '1')"
                        >
                          $0 – $9,999
                        </button>
                        <button
                          class="text-lg lg:text-2xl py-4 lg:py-5 bg-white hover:bg-primaryDark hover:text-white border border-gray-300 rounded-lg transition-colors col-span-2 sm:col-span-1"
                          @click="selectSingleAnswer('owe_irs', '2')"
                        >
                          $10,000 – $49,999
                        </button>
                        <button
                          class="text-lg lg:text-2xl py-4 lg:py-5 bg-white hover:bg-primaryDark hover:text-white border border-gray-300 rounded-lg transition-colors col-span-2 sm:col-span-1"
                          @click="selectSingleAnswer('owe_irs', '3')"
                        >
                          $50,000 – $99,999
                        </button>
                        <button
                          class="text-lg lg:text-2xl py-4 lg:py-5 bg-white hover:bg-primaryDark hover:text-white border border-gray-300 rounded-lg transition-colors col-span-2 sm:col-span-1"
                          @click="selectSingleAnswer('owe_irs', '4')"
                        >
                          $100,000 or more
                        </button>
                        <button
                          class="text-lg lg:text-2xl py-4 lg:py-5 bg-white hover:bg-primaryDark hover:text-white border border-gray-300 rounded-lg transition-colors col-span-2 sm:col-span-1"
                          @click="selectSingleAnswer('owe_irs', 'unknown')"
                        >
                          I don't know
                        </button>
                        <button
                          class="text-lg lg:text-2xl py-4 lg:py-5 bg-white hover:bg-primaryDark hover:text-white border border-gray-300 rounded-lg transition-colors col-span-2 sm:col-span-1"
                          @click="selectSingleAnswer('owe_irs', 'no_answer')"
                        >
                          I prefer not to say
                        </button>
                      </div>
                    </div>

                    <!-- Navigation buttons -->
                    <div class="flex justify-between px-8 py-4 mt-auto">
                      <button class="text-primary underline" @click="moveToPrevStep">Back</button>
                    </div>
                  </div>
                </TransitionRoot>

                <!-- Question 3: Your situation (Multi-select) -->
                <TransitionRoot
                  :show="currentStep === 2"
                  enter="transition ease-out duration-300 delay-200"
                  enter-from="transform opacity-0 translate-y-4"
                  enter-to="transform opacity-100 translate-y-0"
                  leave="transition ease-in duration-200"
                  leave-from="transform opacity-100 translate-y-0"
                  leave-to="transform opacity-0 translate-y-4"
                >
                  <div ref="q3Ref" class="px-4 py-6 absolute inset-0">
                    <div class="flex justify-center items-center relative text-slate-900">
                      <h4 class="text-2xl font-bold px-2 py-10">Do any of the following apply to your situation?</h4>
                      <div class="flex justify-center">
                        <div class="group has-tooltip flex justify-center">
                          <div
                            class="tooltip z-50 absolute left-0 bottom-20 md:left-auto rounded-md bg-white md:max-w-sm border border-black shadow-lg p-4 hidden group-hover:block"
                          >
                            <p class="text-left">
                              Check any issues that apply. Recognizing these give us a head start in finding the urgent
                              tax resolutions you might need.
                            </p>
                          </div>
                          <span>
                            <Icon name="mdi:question-mark-circle-outline" class="text-lg" />
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Multi Select Answers -->
                    <div class="mx-auto mb-8">
                      <div class="grid grid-cols-1 justify-center gap-4 max-w-2xl mx-auto px-4">
                        <button
                          class="text-left p-4 border rounded-lg transition-colors flex items-center"
                          :class="[
                            selectedMultiAnswers['your_situation-3_plus_unfiled']
                              ? 'bg-primary bg-opacity-10 border-primary'
                              : 'bg-white border-gray-300'
                          ]"
                          @click="toggleMultiAnswer('your_situation', '3_plus_unfiled')"
                        >
                          <div
                            class="w-6 h-6 border rounded mr-4 flex items-center justify-center"
                            :class="[
                              selectedMultiAnswers['your_situation-3_plus_unfiled']
                                ? 'bg-primary border-primary'
                                : 'border-gray-400'
                            ]"
                          >
                            <Icon
                              v-if="selectedMultiAnswers['your_situation-3_plus_unfiled']"
                              name="mdi:check"
                              class="text-white"
                            />
                          </div>
                          I have more than 3+ years of unfiled taxes
                        </button>
                        <button
                          class="text-left p-4 border rounded-lg transition-colors flex items-center"
                          :class="[
                            selectedMultiAnswers['your_situation-levied']
                              ? 'bg-primary bg-opacity-10 border-primary'
                              : 'bg-white border-gray-300'
                          ]"
                          @click="toggleMultiAnswer('your_situation', 'levied')"
                        >
                          <div
                            class="w-6 h-6 border rounded mr-4 flex items-center justify-center"
                            :class="[
                              selectedMultiAnswers['your_situation-levied']
                                ? 'bg-primary border-primary'
                                : 'border-gray-400'
                            ]"
                          >
                            <Icon
                              v-if="selectedMultiAnswers['your_situation-levied']"
                              name="mdi:check"
                              class="text-white"
                            />
                          </div>
                          My wages or bank account is being levied
                        </button>
                        <button
                          class="text-left p-4 border rounded-lg transition-colors flex items-center"
                          :class="[
                            selectedMultiAnswers['your_situation-contacted_by_ro']
                              ? 'bg-primary bg-opacity-10 border-primary'
                              : 'bg-white border-gray-300'
                          ]"
                          @click="toggleMultiAnswer('your_situation', 'contacted_by_ro')"
                        >
                          <div
                            class="w-6 h-6 border rounded mr-4 flex items-center justify-center"
                            :class="[
                              selectedMultiAnswers['your_situation-contacted_by_ro']
                                ? 'bg-primary border-primary'
                                : 'border-gray-400'
                            ]"
                          >
                            <Icon
                              v-if="selectedMultiAnswers['your_situation-contacted_by_ro']"
                              name="mdi:check"
                              class="text-white"
                            />
                          </div>
                          I've been contacted by a Revenue Officer
                        </button>
                        <button
                          class="text-left p-4 border rounded-lg transition-colors flex items-center"
                          :class="[
                            selectedMultiAnswers['your_situation-no_answer']
                              ? 'bg-primary bg-opacity-10 border-primary'
                              : 'bg-white border-gray-300'
                          ]"
                          @click="toggleMultiAnswer('your_situation', 'no_answer')"
                        >
                          <div
                            class="w-6 h-6 border rounded mr-4 flex items-center justify-center"
                            :class="[
                              selectedMultiAnswers['your_situation-no_answer']
                                ? 'bg-primary border-primary'
                                : 'border-gray-400'
                            ]"
                          >
                            <Icon
                              v-if="selectedMultiAnswers['your_situation-no_answer']"
                              name="mdi:check"
                              class="text-white"
                            />
                          </div>
                          I prefer not to say or none of these
                        </button>
                      </div>

                      <!-- Continue button for multi-select -->
                      <div class="flex justify-center mt-6">
                        <button
                          class="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                          @click="submitMultiAnswers"
                        >
                          Continue
                        </button>
                      </div>
                    </div>

                    <!-- Navigation buttons -->
                    <div class="flex justify-between px-8 py-4 mt-auto">
                      <button class="text-primary underline" @click="moveToPrevStep">Back</button>
                    </div>
                  </div>
                </TransitionRoot>
              </div>
            </TransitionRoot>

            <!-- Submitting Screen-->
            <TransitionRoot
              :show="isLoading && isCompleted"
              enter="transition-opacity duration-300 delay-200"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="transition-opacity duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute w-full z-10 bg-primary p-3">
                <h3 class="text-white font-bold flex items-center gap-1 text-2xl">Submitting your responses...</h3>
              </div>
              <div ref="loadingRef" class="text-center text-neutral-800 py-8">
                <div class="text-center py-8 max-w-xl px-4 sm:px-8 mx-auto">
                  <div class="flex justify-center mt-4">
                    <Icon name="eos-icons:three-dots-loading" class="h-24 w-24 py-32 text-slate-500" />
                  </div>
                </div>
              </div>
            </TransitionRoot>

            <!-- Error Screen-->
            <TransitionRoot
              :show="hasError"
              enter="transition-opacity duration-300 delay-200"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="transition-opacity duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute w-full z-10 bg-primary p-3">
                <h3 class="text-white font-bold flex items-center gap-1 text-2xl">Error</h3>
              </div>
              <div ref="errorRef" class="text-center text-neutral-800 py-8">
                <div class="text-center py-8 max-w-xl px-4 sm:px-8 mx-auto">
                  <div class="flex justify-center mt-4">
                    <Icon name="ix:cloud-fail" class="h-20 w-20 text-black" />
                  </div>
                  <h4 class="text-2xl leading-8 my-8 font-bold">Oops! Sorry something went wrong.</h4>
                  <p class="text-lg lg:text-xl leading-7 lg:leading-8">
                    We were unable to process your submission due to a technical issue. For immediate assistance, please
                    <b>call us directly at <b>(855) 444-7551</b></b> to speak with a tax specialist who can help with
                    your situation. We apologize for the inconvenience.
                  </p>
                </div>
              </div>
            </TransitionRoot>

            <!-- Thank You / Completion Screen -->
            <TransitionRoot
              :show="isCompleted && !isLoading && !hasError"
              enter="transition-opacity duration-300 delay-200"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="transition-opacity duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute w-full z-10 bg-primary p-3">
                <h3 class="text-white font-bold flex items-center gap-1 text-2xl">Thank You</h3>
              </div>
              <div ref="completedRef" class="text-center text-neutral-800 py-8">
                <div class="text-center py-8 max-w-xl px-4 sm:px-8 mx-auto">
                  <div class="flex justify-center mt-4">
                    <Icon name="line-md:email-check" class="h-20 w-20 text-blue-700" />
                  </div>
                  <h4 class="text-2xl leading-8 my-8 font-bold">Thank you for answering.</h4>
                  <p class="text-lg lg:text-xl leading-7 lg:leading-8">
                    This information will be used to assign you to the right tax specialist for your situation. If you
                    haven't already, <b> please respond to our text with the best time for us to reach you,</b> or call
                    us now at <b>(855) 444-7551,</b> and speak with someone immediately.
                  </p>
                </div>
              </div>
            </TransitionRoot>
          </div>
        </TransitionRoot>

        <div class="flex py-6 mx-auto items-start justify-center gap-2 md:px-16">
          <Icon name="mdi:shield-account" class="w-12 h-12 shrink-0 text-slate-600" />
          <p class="text-center text-slate-800">
            Your data is completely confidential. We will NEVER share your answers with 3rd parties. Please read our
            <a class="underline decoration-1 decoration-black/50 open-privacy-modal" href="#contact">Privacy Policy</a>
            for more information.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
