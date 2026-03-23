<script setup lang="ts">
import { ref } from 'vue'
import { useAppToast } from '@/composables/toast/useAppToast'

const toast = useAppToast()
const loader = ref<ReturnType<typeof toast.loading> | null>(null)
</script>

<template>
  <div class="flex gap-2">
    <BaseButton label="Success" variant="primary" size="small" @click="toast.success('Success! Your changes have been saved.')" />
    <BaseButton label="Error" variant="danger" size="small" @click="toast.error('Error!', 'Something went wrong.')" />
    <BaseButton label="Warn" variant="secondary" size="small" @click="toast.warn('Warning!', 'Please review before continuing.')" />
    <BaseButton label="Info" variant="secondary" size="small" @click="toast.info('Info', 'Here is some useful information.')" />
    <BaseButton label="Start Loading" variant="secondary" size="small" @click="loader = toast.loading('Saving...', 'Please wait')" />
    <BaseButton label="Resolve ✓" variant="primary" size="small" @click="loader?.success('Saved!', 'Your changes have been saved.')" />
    <BaseButton label="Resolve ✗" variant="danger" size="small" @click="loader?.error('Failed', 'Something went wrong.')" />
  </div>
</template>
