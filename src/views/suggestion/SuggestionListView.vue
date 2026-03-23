<script setup lang="ts">
import { ref, computed } from 'vue'

const columns = [
  { field: 'user', header: 'User', sortable: true },
  { field: 'suggestion', header: 'Suggestion' },
  { field: 'createdAt', header: 'Created At', sortable: true },
]

const data = [
  { user: 'Suggestion 1', suggestion: 'This is a great suggestion!', createdAt: '2026-01-01', anonymous: false },
  { user: 'Suggestion 2', suggestion: 'I have a better idea.', createdAt: '2026-01-02', anonymous: true },
  { user: 'Suggestion 3', suggestion: 'This is another suggestion.', createdAt: '2026-01-03', anonymous: false },
  { user: 'Suggestion 4', suggestion: 'I like this one.', createdAt: '2026-01-04', anonymous: true },
  { user: 'Suggestion 5', suggestion: 'What do you think?', createdAt: '2026-01-05', anonymous: false },
  { user: 'Suggestion 6', suggestion: 'This is not a good idea.', createdAt: '2026-01-06', anonymous: true },
]

const selectedUser = ref<string | null>(null)
const selectedType = ref<boolean | null>(null)
const selectedExport = ref<string | null>(null)

const userOptions = computed(() => [
  { label: 'All Users', value: null },
  ...data.map(d => ({ label: d.user, value: d.user }))
])

const typeOptions = [
  { label: 'All', value: null, icon: 'pi pi-users' },
  { label: 'Named', value: false, icon: 'pi pi-user' },
  { label: 'Anonymous', value: true, icon: 'pi pi-eye-slash' },
]

const exportOptions = [
  { label: 'Export as CSV', value: 'csv' },
  { label: 'Export as Excel', value: 'xlsx' },
  { label: 'Export as PDF', value: 'pdf' },
]

const filteredData = computed(() =>
  data.filter(d => {
    const matchUser = !selectedUser.value || d.user === selectedUser.value
    const matchType = selectedType.value === null || d.anonymous === selectedType.value
    return matchUser && matchType
  })
)
</script>

<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <BaseDatePicker />
        <BaseSelect
          v-model="selectedUser"
          :options="userOptions"
          option-label="label"
          option-value="value"
          placeholder="Filter by user"
          icon="pi pi-user"
        />
        <BaseSelect
          v-model="selectedType"
          :options="typeOptions"
          option-label="label"
          option-value="value"
          placeholder="All"
          icon="pi pi-filter"
        />
        <div class="border border-border h-7 mx-2"></div>
        <BaseSelect
          v-model="selectedExport"
          :options="exportOptions"
          option-label="label"
          option-value="value"
          placeholder="Export"
        />
        <BaseButton
          label="Summarize"
          variant="primary"
          size="small"
        />
      </div>
      <BaseButton
        icon="pi pi-refresh"
        variant="secondary"
        size="small"
      />
    </div>
    <BaseTable
      :data="filteredData"
      :columns="columns"
      :paginator="true"
      :rows="15"
    >
      <template #actions="{ row }">
        <button @click="() => console.log(row)">
          <i class="pi pi-trash text-content-muted hover:text-error transition" />
        </button>
      </template>
    </BaseTable>
  </div>
</template>
