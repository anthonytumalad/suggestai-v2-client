<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const offices = [
  { id: 1, name: 'Office 1', description: 'Description for Office 1' },
  { id: 2, name: 'Office 2', description: 'Description for Office 2' },
  { id: 3, name: 'Office 3', description: 'Description for Office 3' },
  { id: 4, name: 'Office 4', description: 'Description for Office 4' },
]

function goToSuggestion() {
  router.push({ name: 'suggestion-overview' })
}
</script>

<template>
  <div class="space-y-10">

    <div class="flex items-center justify-between">
      <h2 class="text-lg font-medium">All Suggestion Box</h2>
      <BaseButton
        label="Add Suggestion Box"
        variant="primary"
        size="small"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <BaseCard
        v-for="office in offices"
        :key="office.id"
        :title="office.name"
        :subtitle="office.description"
        icon="pi pi-box"
        class="cursor-pointer"
        @click="goToSuggestion"
      />
    </div>

  </div>
</template>
