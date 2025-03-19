<script setup lang="ts">
import { ref, computed } from "vue"

interface PropTypes {
  blok: QuestionnaireStoryblok
}

const questions = [
  {
    id: "self-employed",
    text: "Are you currently self-employed?",
    tooltip: {
      title: "Why are we asking?",
      content:
        "To better assist you, please let us know if you are self-employed. This is a common situation for many clients who reach out to us."
    },
    type: "single_select",
    answers: [
      {
        id: "true",
        text: "Yes"
      },
      {
        id: "false",
        text: "No"
      },
      {
        id: "no_answer",
        text: "I prefer not to say"
      }
    ]
  },
  {
    id: "owe_irs",
    text: "How much do you owe to the IRS?",
    tooltip: {
      title: "Why are we asking?",
      content:
        "It's okay if you're not certain about the amount you owe the IRS. Just give us your best estimate and we'll figure it out during the call."
    },
    type: "single_select",
    answers: [
      {
        id: "1",
        text: "$0 – $9,999"
      },
      {
        id: "2",
        text: "$10,000 – $49,999"
      },
      {
        id: "3",
        text: "$50,000 – $99,999"
      },
      {
        id: "4",
        text: "$100,000 or more"
      },
      {
        id: "unknown",
        text: "I don't know"
      },
      {
        id: "no_answer",
        text: "I prefer not to say"
      }
    ]
  },
  {
    id: "your_situation",
    text: "Do any of the following apply to your situation?",
    tooltip: {
      content:
        "Check any issues that apply. Recognizing these give us a head start in finding the urgent tax resolutions you might need."
    },
    type: "multi_select",
    answers: [
      {
        id: "3_plus_unfiled",
        text: "I have more than 3+ years of unfiled taxes"
      },
      {
        id: "levied",
        text: "My wages or bank account is being levied"
      },
      {
        id: "contacted_by_ro",
        text: "I've been contacted by a Revenue Officer"
      },
      {
        id: "no_answer",
        text: "I prefer not to say or none of these"
      }
    ]
  }
]
const props = defineProps<PropTypes>()

// Questionnaire state management
const currentStep = ref(0)
const userAnswers = ref<Record<string, any>>({})
const isCompleted = ref(false)
const isSubmitting = ref(false)
const hasError = ref(false)
const errorMessage = ref("")

// Track selected answers for multi-select questions
const selectedMultiAnswers = ref<Record<string, boolean>>({})

// Initialize each multi-select question's answers to false
const initializeMultiSelectAnswers = () => {
  questions.forEach((question) => {
    if (question.type === "multi_select") {
      question.answers.forEach((answer) => {
        if (answer.id !== "no_answer") {
          userAnswers.value[answer.id as string] = false
        }
      })
    }
  })
}

// Call initialization when component is mounted
initializeMultiSelectAnswers()

// Computed properties
const currentQuestion = computed(() => {
  return currentStep.value < questions.length ? questions[currentStep.value] : null
})

// Method to select an answer for single-select questions
const selectSingleAnswer = (questionId: string, answerId: string | number) => {
  userAnswers.value[questionId] = answerId
  moveToNextStep()
}

// Method to handle multi-select questions
const toggleMultiAnswer = (questionId: string, answerId: string, answerText: string) => {
  // If "no_answer" is selected, deselect all other options
  if (answerId === "no_answer") {
    // Set all options to false
    currentQuestion.value?.answers.forEach((answer) => {
      if (answer.id !== "no_answer") {
        userAnswers.value[answer.id as string] = false
        selectedMultiAnswers.value[`${questionId}-${answer.id}`] = false
      }
    })
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
  if (currentStep.value < questions.length - 1) {
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
  // Here you could add API calls to submit the data
  isSubmitting.value = true
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
  } catch (error: any) {
    hasError.value = true
    errorMessage.value = error.message || "Failed to submit form"
    console.error("Form submission error:", error)
  } finally {
    isSubmitting.value = false
  }
}

const completeQuestionnaire = async () => {
  isCompleted.value = true

  submitQuestionnaire({
    form: userAnswers.value,
    context: useContextData()
  })
}
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
        <div class="text-left">
          <div class="bg-primary p-3">
            <h3 class="text-white font-bold flex items-center gap-1 text-2xl">
              Question
              <span class="w-10 h-10 rounded-full bg-[#78A7E9] flex items-center justify-center">
                {{ currentStep + 1 }}
              </span>
              of 3
            </h3>
          </div>

          <!-- Questions Area -->
          <div class="bg-slate-200 text-center text-neutral-800">
            <div v-if="!isCompleted" :key="currentStep">
              <div class="flex justify-center items-center relative text-slate-900">
                <h4 class="text-2xl font-bold px-2 py-10">{{ currentQuestion?.text }}</h4>
                <div class="flex justify-center" v-if="currentQuestion?.tooltip">
                  <div class="group has-tooltip flex justify-center">
                    <div
                      class="tooltip z-50 absolute left-0 bottom-20 md:left-auto rounded-md bg-white md:max-w-sm border border-black shadow-lg p-4 hidden group-hover:block"
                    >
                      <p
                        v-if="currentQuestion.tooltip.title"
                        class="text-blue-800 text-left text-lg tracking-wide font-bold pb-2"
                      >
                        {{ currentQuestion.tooltip.title }}
                      </p>
                      <p class="text-left">
                        {{ currentQuestion.tooltip.content }}
                      </p>
                    </div>
                    <span>
                      <Icon name="mdi:question-mark-circle-outline" class="text-lg" />
                    </span>
                  </div>
                </div>
              </div>

              <!-- Single Select Answers -->
              <div v-if="currentQuestion?.type === 'single_select'" class="mx-auto mb-8">
                <div class="grid grid-cols-2 justify-center gap-6 max-w-2xl mx-auto px-4">
                  <button
                    v-for="(answer, index) in currentQuestion.answers"
                    :key="answer.id"
                    :class="[
                      'text-lg lg:text-2xl py-4 lg:py-5 bg-white  hover:bg-primaryDark hover:text-white border border-gray-300 rounded-lg transition-colors',
                      'col-span-2',
                      {
                        'sm:col-span-2':
                          index === currentQuestion.answers.length - 1 && currentQuestion.answers.length % 2 === 1
                      },
                      {
                        'sm:col-span-1': !(
                          index === currentQuestion.answers.length - 1 && currentQuestion.answers.length % 2 === 1
                        )
                      }
                    ]"
                    @click="selectSingleAnswer(currentQuestion.id, answer.id)"
                  >
                    {{ answer.text }}
                  </button>
                </div>
              </div>

              <!-- Multi Select Answers -->
              <div v-if="currentQuestion?.type === 'multi_select'" class="mx-auto mb-8">
                <div class="grid grid-cols-1 justify-center gap-4 max-w-2xl mx-auto px-4">
                  <button
                    v-for="answer in currentQuestion.answers"
                    :key="answer.id"
                    class="text-left p-4 border rounded-lg transition-colors flex items-center"
                    :class="[
                      selectedMultiAnswers[`${currentQuestion.id}-${answer.id}`]
                        ? 'bg-primary bg-opacity-10 border-primary'
                        : 'bg-white border-gray-300'
                    ]"
                    @click="toggleMultiAnswer(currentQuestion.id, answer.id, answer.text)"
                  >
                    <div
                      class="w-6 h-6 border rounded mr-4 flex items-center justify-center"
                      :class="[
                        selectedMultiAnswers[`${currentQuestion.id}-${answer.id}`]
                          ? 'bg-primary border-primary'
                          : 'border-gray-400'
                      ]"
                    >
                      <Icon
                        v-if="selectedMultiAnswers[`${currentQuestion.id}-${answer.id}`]"
                        name="mdi:check"
                        class="text-white"
                      />
                    </div>
                    {{ answer.text }}
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
              <div class="flex justify-between px-8 py-4" v-if="currentStep > 0">
                <button class="text-primary underline" @click="moveToPrevStep">Back</button>
              </div>
            </div>

            <!-- Submitting Screen-->
            <div v-else-if="isSubmitting" class="py-8">
              <div class="text-center py-8 max-w-xl px-4 sm:px-8 mx-auto">
                <div class="flex justify-center mt-4">
                  <Icon name="eos-icons:three-dots-loading" class="h-24 w-24 py-32 text-slate-500" />
                </div>
              </div>
            </div>

            <!-- Error Screen-->
            <div v-else-if="hasError" class="py-8">
              <div class="text-center py-8 max-w-xl px-4 sm:px-8 mx-auto">
                <div class="flex justify-center mt-4">
                  <Icon name="ix:cloud-fail" class="h-20 w-20 text-black" />
                </div>
                <h4 class="text-2xl leading-8 my-8 font-bold">Oops! Sorry something went wrong.</h4>
                <p class="text-lg lg:text-xl leading-7 lg:leading-8">
                  We were unable to process your submission due to a technical issue. For immediate assistance, please
                  <b>call us directly at <b>(877) 686-6539</b></b> to speak with a tax specialist who can help with your
                  situation. We apologize for the inconvenience.
                </p>
              </div>
            </div>

            <!-- Thank You / Completion Screen -->
            <div v-else class="py-8">
              <div class="text-center py-8 max-w-xl px-4 sm:px-8 mx-auto">
                <div class="flex justify-center mt-4">
                  <Icon name="line-md:email-check" class="h-20 w-20 text-blue-700" />
                </div>
                <h4 class="text-2xl leading-8 my-8 font-bold">Thank you for answering.</h4>
                <p class="text-lg lg:text-xl leading-7 lg:leading-8">
                  This information will be used to assign you to the right tax specialist for your situation. If you
                  haven't already, <b> please respond to our text with the best time for us to reach you,</b> or call us
                  now at <b>(877) 686-6539,</b> and speak with someone immediately.
                </p>
              </div>
            </div>

            <div class="flex py-6 mx-auto items-start justify-center gap-2 md:px-16">
              <Icon name="mdi:shield-account" class="w-12 h-12 shrink-0 text-slate-600" />
              <p class="text-center text-slate-800">
                Your data is completely confidential. We will NEVER share your answers with 3rd parties. Please read our
                <a class="underline decoration-1 decoration-black/50 open-privacy-modal" href="#">Privacy Policy</a>
                for more information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
