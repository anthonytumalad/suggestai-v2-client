<script setup lang="ts">
defineProps<{
  label?: string
  placeholder?: string
  disabled?: boolean
}>()

const model = defineModel<Date | null>()

interface DayContext {
  selected: boolean
  disabled: boolean
  today: boolean
}

interface SelectionContext {
  selected: boolean
}

const pt = {
  root: { class: 'relative w-full' },
  pcInputText: {
    root: {
      class: 'w-full px-3 py-1.5 text-sm rounded-md transition duration-200 border border-border bg-bg text-content placeholder:text-content-muted cursor-pointer focus-within:border-border-focus focus-within:outline-none'
    }
  },
  panel: {
    class: 'absolute z-50 mt-1 bg-bg border border-border rounded-md shadow-lg p-3 min-w-[280px]'
  },
  header: {
    class: 'flex items-center justify-between mb-3'
  },
  title: {
    class: 'flex items-center gap-1'
  },
  selectmonth: {
    class: 'text-sm font-semibold text-content cursor-pointer bg-transparent border-none outline-none'
  },
  selectyear: {
    class: 'text-sm font-semibold text-content cursor-pointer bg-transparent border-none outline-none'
  },
  previousbutton: {
    class: 'flex items-center justify-center w-7 h-7 rounded-md text-content-muted hover:bg-surface-overlay hover:text-content cursor-pointer transition duration-200'
  },
  nextbutton: {
    class: 'flex items-center justify-center w-7 h-7 rounded-md text-content-muted hover:bg-surface-overlay hover:text-content cursor-pointer transition duration-200'
  },
  dayview: {
    class: 'w-full'
  },
  weekheader: {
    class: 'flex mb-1'
  },
  weekheadercell: {
    class: 'flex-1 text-center text-xs font-medium text-content-muted py-1'
  },
  weekrow: {
    class: 'flex'
  },
  daycell: {
    class: 'flex-1 p-0.5'
  },
  pcday: ({ context }: { context: DayContext }) => ({
    root: {
      class: [
        'w-full aspect-square flex items-center justify-center text-sm rounded-md cursor-pointer transition duration-200',
        context.selected
          ? 'bg-surface-overlay text-content font-semibold'
          : context.disabled
          ? 'text-content-muted opacity-40 cursor-not-allowed'
          : context.today
          ? 'text-content font-semibold border border-border'
          : 'text-content-muted hover:bg-surface-overlay hover:text-content'
      ]
    }
  }),
  monthpicker: {
    class: 'grid grid-cols-3 gap-1 mt-2'
  },
  month: ({ context }: { context: SelectionContext }) => ({
    class: [
      'text-sm px-2 py-1.5 rounded-md text-center cursor-pointer transition duration-200',
      context.selected
        ? 'bg-surface-overlay text-content font-semibold'
        : 'text-content-muted hover:bg-surface-overlay hover:text-content'
    ]
  }),
  yearpicker: {
    class: 'grid grid-cols-3 gap-1 mt-2'
  },
  year: ({ context }: { context: SelectionContext }) => ({
    class: [
      'text-sm px-2 py-1.5 rounded-md text-center cursor-pointer transition duration-200',
      context.selected
        ? 'bg-surface-overlay text-content font-semibold'
        : 'text-content-muted hover:bg-surface-overlay hover:text-content'
    ]
  }),
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-sm font-medium text-content">
      {{ label }}
    </label>
    <DatePicker
      v-model="model"
      :placeholder="placeholder ?? 'Select a date'"
      :disabled="disabled"
      :pt="pt"
      show-button-bar
    />
  </div>
</template>
