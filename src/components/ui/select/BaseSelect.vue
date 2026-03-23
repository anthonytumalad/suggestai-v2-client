<script setup lang="ts" generic="T = unknown">
import { computed } from 'vue'

type Option = Record<string, unknown>

const props = defineProps<{
  modelValue: T
  options: Option[]
  label?: string
  placeholder?: string
  optionLabel?: string
  optionValue?: string
  disabled?: boolean
  error?: string
  icon?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: T): void
}>()

const value = computed({
  get: () => props.modelValue,
  set: (val: T) => emit('update:modelValue', val),
})
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-sm font-medium text-content">
      {{ label }}
    </label>
    <Select
      v-model="value"
      :options="options"
      :optionLabel="optionLabel || 'label'"
      :optionValue="optionValue || 'value'"
      :placeholder="placeholder || 'Select option'"
      :disabled="disabled"
      :pt="{
        root: {
          class: 'relative w-full border border-border px-3 py-1.5 rounded-md transition duration-200 text-sm text-content flex items-center justify-between cursor-pointer bg-bg focus-within:border-border-focus focus-within:outline-none'
        },
        label: {
          class: 'flex-1 text-sm text-content'
        },
        placeholder: {
          class: 'text-sm text-content-muted'
        },
        dropdown: {
          class: 'flex items-center justify-center text-content-muted ml-2'
        },
        overlay: {
          class: 'absolute z-50 mt-1 bg-bg border border-border rounded-md shadow-lg overflow-hidden min-w-full'
        },
        listcontainer: {
          class: 'max-h-56 overflow-y-auto'
        },
        list: {
          class: 'py-1'
        },
        option: ({ context }) => ({
          class: [
            'px-3 py-2 text-sm cursor-pointer transition duration-200',
            context.selected
              ? 'bg-surface-overlay text-content font-medium'
              : 'text-content hover:bg-surface-overlay'
          ]
        }),
        optiongroup: {
          class: 'px-3 py-1.5 text-xs font-semibold text-content-muted uppercase tracking-wider'
        },
        emptyMessage: {
          class: 'px-3 py-2 text-sm text-content-muted'
        },
      }"
    >
      <template #value="{ value: selected, placeholder: ph }">
        <div class="flex items-center gap-2">
          <i v-if="icon" :class="[icon, 'text-content-muted text-xs shrink-0']" />
          <span :class="selected ? 'text-content' : 'text-content-muted'">
            {{ selected ? (options.find(o => o[(optionValue || 'value')] === selected) as Option)?.[optionLabel || 'label'] as string : ph }}
          </span>
        </div>
      </template>
    </Select>
    <span v-if="error" class="text-xs text-error">{{ error }}</span>
  </div>
</template>
