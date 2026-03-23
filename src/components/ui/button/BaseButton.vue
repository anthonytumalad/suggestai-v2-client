<script setup lang="ts">
defineProps<{
  label: string
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  size?: 'small' | 'normal' | 'large'
  variant?: 'primary' | 'secondary' | 'danger'
  icon?: string
  fluid?: boolean
}>()
</script>

<template>
  <Button
    :label="loading ? 'Loading...' : label"
    :icon="icon"
    :disabled="disabled || loading"
    :type="type || 'button'"
    :loading="loading"
    :class="[
      'rounded-md font-medium transition duration-200 pointer-events-auto!',

      size === 'small' && 'px-3 py-1.5 text-sm',
      size === 'large' && 'px-5 py-3 text-lg',
      (!size || size === 'normal') && 'px-4 py-2 text-base',

      !(disabled || loading) && variant === 'primary' &&
        'bg-action text-content-inverse cursor-pointer hover:bg-action-hover active:bg-action-active',

      !(disabled || loading) && variant === 'secondary' &&
        'bg-surface-raised text-content cursor-pointer hover:bg-surface-overlay border border-border hover:border-border-strong',

      !(disabled || loading) && variant === 'danger' &&
        'bg-error text-content-inverse cursor-pointer hover:bg-error-dark',

      (disabled || loading) &&
        'cursor-not-allowed! opacity-70 bg-surface-raised text-content-disabled',

      fluid && 'w-full'
    ]"
  />
</template>
