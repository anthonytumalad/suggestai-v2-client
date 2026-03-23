<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  id?: string
  modelValue: string
  label?: string
  type?: string
  error?: string
  disabled?: boolean
  required?: boolean
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (val: string) => {
    if (!props.disabled) {
      emit('update:modelValue', val)
    }
  }
})
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" :for="id" class="text-base text-content">
      {{ label }}
      <span v-if="required" class="text-error">*</span>
    </label>

    <InputText
      :id="id"
      v-model="value"
      :type="type || 'text'"
      :disabled="disabled"
      :placeholder="placeholder"
      fluid
      :class="[
        'rounded-md px-3 py-0.5 border transition duration-200 text-base text-content placeholder:text-content-muted',
        error
          ? 'border-error focus:ring-error focus:outline-none'
          : 'border-border focus:outline-none focus:border-content focus:ring-content',
        disabled
          ? 'bg-surface text-content-disabled cursor-not-allowed opacity-70'
          : 'bg-bg'
      ]"
    />

    <small v-if="error" class="text-error text-xs">
      {{ error }}
    </small>
  </div>
</template>
