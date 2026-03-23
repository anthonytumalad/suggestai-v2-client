<script setup lang="ts">
import { ref, computed } from 'vue'

const email = ref('')
const password = ref('')
const loading = ref(false)

const isValidEmail = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()))
const isFormValid = computed(() => isValidEmail.value && password.value.trim() !== '')
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="flex flex-col max-w-md w-full">

      <form class="space-y-10">
        <div class="space-y-5">
          <BaseInput
            id="email"
            v-model="email"
            label="Email or username"
            required
          />

          <BaseInput
            id="password"
            v-model="password"
            type="password"
            label="Password"
            required
          />

          <div class="flex justify-end">
            <a href="#" class="text-sm font-medium text-action hover:text-action-hover transition duration-200">
              Forgot password?
            </a>
          </div>
        </div>

        <BaseButton
          label="Login"
          type="submit"
          variant="primary"
          size="small"
          :loading="loading"
          :disabled="!isFormValid"
          fluid
        />
      </form>

    </div>
  </div>
</template>
