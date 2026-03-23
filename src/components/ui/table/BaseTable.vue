<script setup lang="ts" generic="T extends Record<string, any>">
export interface TableColumn {
  field: string
  header: string
  sortable?: boolean
}

defineProps<{
  data: T[]
  columns: TableColumn[]
  loading?: boolean
  rows: number
  paginator?: boolean
}>()
</script>

<template>
  <DataTable
    :value="data"
    :loading="loading"
    :paginator="paginator"
    :rows="rows"
    :rowsPerPageOptions="[15, 30, 40, 50]"
    :pt="{
      root: {
        class: 'w-full flex flex-col gap-4'
      },
      table: {
        class: 'w-full'
      },
      thead: {
        class: 'border-b border-border'

      },
      tbody: {
        class: 'divide-y divide-border'
      },
      loadingoverlay: {
        class: 'hidden'
      },
      pcPaginator: {
        root: {
          class: 'flex items-center justify-between px-4 py-3 border-t border-border'
        },
        first: {
          class: 'p-1.5 rounded-md text-content-muted hover:text-content hover:bg-surface transition-colors duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'
        },
        prev: {
          class: 'p-1.5 rounded-md text-content-muted hover:text-content hover:bg-surface transition-colors duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'
        },
        next: {
          class: 'p-1.5 rounded-md text-content-muted hover:text-content hover:bg-surface transition-colors duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'
        },
        last: {
          class: 'p-1.5 rounded-md text-content-muted hover:text-content hover:bg-surface transition-colors duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'
        },
        pages: {
          class: 'flex items-center gap-1'
        },
        page: {
          class: 'min-w-8 h-8 flex items-center justify-center rounded-md text-sm text-content-muted hover:bg-surface hover:text-content transition-colors duration-150 cursor-pointer'
        },
        pcRowPerPageDropdown: {
          root: {
            class: 'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border text-sm text-content bg-bg cursor-pointer hover:border-content transition-colors duration-150'
          },
          label: {
            class: 'text-sm text-content'
          },
          dropdownicon: {
            class: 'text-content-muted w-3.5 h-3.5'
          },
        }
      }
    }"
  >
    <Column
      v-for="col in columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
      :pt="{
        headercell: { class: 'px-4 py-3 text-left text-sm font-semibold text-content tracking-wider' },
        bodycell: { class: 'px-4 py-6 text-sm text-content' },
        sort: { class: 'ml-1 text-content-muted' },
      }"
    />

    <Column
      v-if="$slots['actions']"
      header="Actions"
      :pt="{
        headercell: { class: 'px-4 py-3 text-left text-sm font-semibold text-content tracking-wider' },
        bodycell: { class: 'px-4 py-6 text-sm text-content' },
      }"
    >
      <template #body="{ data: rowData }">
        <slot name="actions" :row="rowData" />
      </template>
    </Column>

    <template #empty>
      <div class="flex flex-col items-center justify-center py-10 text-center gap-2">
        <i class="pi pi-inbox text-2xl text-content-muted" />
        <p class="text-sm text-content-muted">No data available</p>
      </div>
    </template>

  </DataTable>
</template>
