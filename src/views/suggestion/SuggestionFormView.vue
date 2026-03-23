<script setup lang="ts">
import { ref, computed } from 'vue'

defineProps<{
  boxName?: string
  boxDescription?: string
}>()

const roleOptions = [
  { label: 'Student', value: 'student' },
  { label: 'Parent', value: 'parent' },
  { label: 'Faculty', value: 'faculty' },
  { label: 'Others', value: 'others' },
]

const role = ref<string | null>(null)
const isAnonymous = ref(false)
const email = ref('')
const message = ref('')
const submitted = ref(false)

const canSubmit = computed(() => message.value.trim().length > 0 && role.value !== null)

function handleSubmit() {
  if (!canSubmit.value) return
  submitted.value = true
}

function resetForm() {
  role.value = null
  isAnonymous.value = false
  email.value = ''
  message.value = ''
  submitted.value = false
}
</script>

<template>
  <div class="min-h-screen bg-surface py-12">
    <div class="max-w-xl mx-auto space-y-4 p-8">

      <!-- Header Card -->
      <BaseCard>
        <template #title>
          <div class="flex items-center gap-1.5 text-content-muted text-xs uppercase tracking-wider">
            <i class="pi pi-box text-xs" />
            <span>Suggestion Box</span>
          </div>
        </template>
        <template #content>
          <div class="space-y-1">
            <h2 class="text-xl font-medium text-content">{{ boxName ?? 'Office of Student Affairs' }}</h2>
            <p class="text-sm text-content-muted leading-relaxed">
              {{ boxDescription ?? 'Your voice matters. Share your thoughts, concerns, or ideas.' }}
            </p>
          </div>
        </template>
      </BaseCard>

      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="!submitted" class="space-y-4">

          <!-- Role Card -->
          <BaseCard title="I am a" subtitle="Select your role">
            <template #content>
              <div class="flex flex-wrap gap-1.5 mt-2">
                <button
                  v-for="option in roleOptions"
                  :key="option.value"
                  :class="[
                    'px-3 py-1.5 text-xs rounded-md border transition duration-150',
                    role === option.value
                      ? 'border-content bg-surface-overlay text-content font-medium'
                      : 'border-border text-content-muted hover:border-content hover:text-content'
                  ]"
                  @click="role = option.value"
                >
                  {{ option.label }}
                </button>
              </div>
            </template>
          </BaseCard>

          <!-- Anonymous Card -->
          <BaseCard>
            <template #title>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-content">Submit anonymously</p>
                  <p class="text-xs text-content-muted mt-0.5">Your identity will not be recorded</p>
                </div>
                <button
                  :class="[
                    'relative w-9 h-5 rounded-full transition-colors duration-200 shrink-0',
                    isAnonymous ? 'bg-content' : 'bg-border'
                  ]"
                  @click="isAnonymous = !isAnonymous"
                >
                  <span
                    :class="[
                      'absolute top-[3px] w-[14px] h-[14px] rounded-full bg-bg transition-transform duration-200',
                      isAnonymous ? 'translate-x-[18px]' : 'translate-x-[3px]'
                    ]"
                  />
                </button>
              </div>
            </template>
            <template #content />
          </BaseCard>

          <!-- Email Card -->
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <BaseCard v-if="!isAnonymous" title="Email" subtitle="Optional — we'll only use this to follow up if needed">
              <template #content>
                <input
                  v-model="email"
                  type="email"
                  placeholder="you@example.com"
                  class="w-full mt-2 px-3 py-2 text-sm rounded-md border border-border bg-bg text-content placeholder:text-content-muted focus:outline-none focus:border-content transition duration-200"
                />
              </template>
            </BaseCard>
          </Transition>

          <!-- Message Card -->
          <BaseCard title="Your feedback" subtitle="Be as detailed as you'd like">
            <template #content>
              <div class="space-y-1.5 mt-2">
                <BaseTextareaField
                  id="message"
                  v-model="message"
                  placeholder="Write your suggestion or feedback here..."
                  :rows="5"
                  :auto-resize="true"
                />
                <p class="text-xs text-content-muted text-right">{{ message.length }} characters</p>
              </div>
            </template>
          </BaseCard>

          <!-- Submit -->
          <div class="flex justify-between items-center">
            <button
              class="text-sm text-content-muted hover:text-content transition duration-200"
              @click="resetForm"
            >
              Clear form
            </button>
            <BaseButton
              label="Submit feedback"
              variant="primary"
              size="small"
              :disabled="!canSubmit"
              @click="handleSubmit"
            />
          </div>

        </div>
      </Transition>

    </div>
  </div>
</template>
