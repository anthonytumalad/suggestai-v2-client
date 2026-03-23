<script setup lang="ts">
const icons: Record<string, string> = {
  success: 'pi pi-check-circle',
  error: 'pi pi-times-circle',
  warn: 'pi pi-exclamation-triangle',
  info: 'pi pi-info-circle',
}

const colors: Record<string, string> = {
  success: 'text-success',
  error: 'text-error',
  warn: 'text-warning',
  info: 'text-info',
}
</script>

<template>
  <Toast
    :pt="{
      root: {
        class: 'flex flex-col w-80'
      },
      message: {
        class: 'bg-bg border border-border rounded shadow overflow-hidden'
      },
      messageContent: {
        class: 'flex items-start gap-10 p-4'
      },
      messageIcon: {
        class: 'hidden'
      },
      messageText: {
        class: 'flex flex-col gap-0.5 flex-1 min-w-0'
      },
      summary: {
        class: 'text-sm font-medium text-content'
      },
      detail: {
        class: 'text-sm text-content-muted'
      },
      closeButton: {
        class: 'ml-auto p-1 rounded-md text-content-muted hover:text-content hover:bg-surface transition-colors duration-150 cursor-pointer self-start'
      },
      closeIcon: {
        class: 'w-3.5 h-3.5'
      },
    }"
  >
    <template #message="{ message }">
      <div class="flex items-start gap-3 w-full">

        <i
          v-if="message.group?.startsWith('loading-')"
          class="pi pi-spinner animate-spin text-content-muted text-base mt-0.5 shrink-0"
        />

        <i
          v-else
          :class="[icons[message.severity ?? 'info'], colors[message.severity ?? 'info'], 'text-base mt-0.5 shrink-0']"
        />

        <div class="flex flex-col gap-1 flex-1 min-w-0">
          <span class="text-sm font-medium text-content">{{ message.summary }}</span>
          <span v-if="message.detail" class="text-sm text-content-muted">{{ message.detail }}</span>
        </div>
      </div>
    </template>
  </Toast>
</template>
