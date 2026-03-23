<script setup lang="ts">
defineProps<{
  title?: string
  subtitle?: string
  icon?: string
}>()
</script>

<template>
  <Card class="rounded-md border border-border shadow-none p-6">

    <template #title>
      <div class="flex items-center justify-between">

        <div>
          <div v-if="title" class="text-base font-semibold mb-1">
            {{ title }}
          </div>

          <div v-if="subtitle" class="text-sm text-content-muted">
            {{ subtitle }}
          </div>
        </div>

        <div v-if="icon" class="flex items-center justify-center">
          <i :class="[icon, 'text-xl text-content-muted']" />
        </div>

      </div>
    </template>

    <template #content>
      <slot name="content" />
    </template>

  </Card>
</template>
