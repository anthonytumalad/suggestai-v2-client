<script setup lang="ts">
defineProps<{
  visible: boolean
  header?: string
  closable?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

function close() {
  emit('update:visible', false)
}
</script>

<template>
  <Dialog
    :visible="visible"
    :closable="false"
    :modal="true"
    :draggable="false"
    @update:visible="emit('update:visible', $event)"
    @click-outside="close"
    class="w-full max-w-md"
    :pt="{
      mask: {
        class: 'bg-white/20 backdrop-blur-xs',
        onClick: close
      }
    }"
  >
    <template #container>
      <div
        class="bg-bg border border-border rounded-md shadow overflow-hidden"
        @click.stop
      >

        <div class="flex items-center justify-between px-6 py-4 border-b border-border">
          <span class="text-base font-medium text-content">{{ header }}</span>
          <button
            v-if="closable !== false"
            @click="close"
            class="text-content-muted hover:text-content transition-colors duration-150 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div class="px-6 py-4">
          <slot />
        </div>

        <div v-if="$slots.footer" class="px-6 py-4 border-t border-border flex justify-end gap-2">
          <slot name="footer" />
        </div>

      </div>
    </template>
  </Dialog>
</template>
