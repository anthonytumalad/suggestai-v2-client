<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'

const route = useRoute()
const router = useRouter()
const selectedOffice = ref<number | null>(null)
const isOfficeExpanded = ref(true)

const isSettingsActive = computed(() => route.name === 'suggestion-settings')

function toggleOffice() {
  if (isSettingsActive.value) {
    isOfficeExpanded.value = true
    router.push({ name: 'suggestion-overview' })
  }
}

const tooltipPt = {
  root: { class: 'absolute z-[9999]' },
  text: { class: 'relative bg-gray-900 text-white text-xs px-2 py-1 rounded-md shadow whitespace-nowrap before:content-[""] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-[5px] before:border-y-[5px] before:border-y-transparent before:border-r-[5px] before:border-r-gray-900' },
  arrow: { class: 'hidden' },
}

const offices = [
  { id: 1, name: 'Office 1' },
  { id: 2, name: 'Office 2' },
  { id: 3, name: 'Office 3' },
]

const navItems = [
  { icon: 'pi pi-home', label: 'Dashboard', to: { name: 'dashboard' } },
  { icon: 'pi pi-box', label: 'Suggestion Box', to: { name: 'suggestion-box' } },
  { icon: 'pi pi-chart-bar', label: 'Reports', to: { name: 'reports' } },
]

const suggestionNavItems = [
  { label: 'Overview', to: { name: 'suggestion-overview' } },
  { label: 'List', to: { name: 'suggestion-list' } },
  { label: 'Summary', to: { name: '' } },
]

const showSecondarySidebar = computed(() =>
  ['suggestion-overview', 'suggestion-list', 'suggestion-summary', 'suggestion-settings'].includes(route.name as string)
)

watch(isSettingsActive, (val) => {
  if (val) isOfficeExpanded.value = false
})
</script>

<template>
  <div class="min-h-screen bg-surface/80">

    <aside class="fixed left-0 top-0 h-screen w-16 flex flex-col items-center py-4 gap-1 z-50">

      <nav class="flex flex-col items-center gap-1 px-2">
        <RouterLink
          v-for="item in navItems"
          :key="item.to.name"
          v-tooltip.right="{ value: item.label, pt: tooltipPt }"
          :to="item.to"
          :class="[
            'w-full flex items-center rounded-md p-2 transition duration-200',
            route.name === item.to.name
              ? 'bg-surface-overlay text-content'
              : 'text-content-muted hover:bg-surface-overlay hover:text-content'
          ]"
        >
          <i :class="[item.icon, 'text-base']" />
        </RouterLink>
      </nav>

      <div class="mt-auto flex flex-col items-center gap-1 px-2">
        <button
          v-tooltip.right="{ value: 'Profile', pt: tooltipPt }"
          class="w-full flex items-center justify-center rounded-md p-2 text-content-muted hover:bg-surface-overlay hover:text-content cursor-pointer transition duration-200"
        >
          <i class="pi pi-cog text-base" />
        </button>

        <button
          v-tooltip.right="{ value: 'Settings', pt: tooltipPt }"
          class="w-full flex items-center justify-center rounded-md p-2 text-content-muted hover:bg-surface hover:text-content cursor-pointer transition duration-200"
        >
          <i class="pi pi-user text-base" />
        </button>
      </div>

    </aside>

    <main class="ml-14 h-screen px-2 py-2 flex space-x-2">

      <aside
        v-if="showSecondarySidebar"
        class="bg-bg border border-border rounded-md w-60 flex flex-col"
      >
        <div class="text-sm border-b border-border py-4 px-3 mb-4">
          <BaseSelect
            v-model="selectedOffice"
            :options="offices"
            optionLabel="name"
            optionValue="id"
          />
        </div>

        <nav class="flex flex-col gap-0.5 px-3">
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <RouterLink
              v-if="showSecondarySidebar"
              :to="{ name: 'suggestion-settings' }"
              :class="[
                'flex items-center mb-4 gap-2 px-2 py-1.5 rounded-md text-sm cursor-pointer transition duration-200',
                isSettingsActive
                  ? 'bg-surface-overlay text-content font-medium'
                  : 'text-content hover:bg-surface-overlay'
              ]"
            >
              <i class="pi pi-cog text-sm" />
              <span>Settings</span>
            </RouterLink>
          </Transition>

          <div
            class="
              flex items-center justify-between mb-2 gap-2 px-2 py-1.5 uppercase text-xs font-medium text-content-secondary
            ">
            <span>Suggestion Box</span>
            <button class="cursor-pointer">
              <i class="pi pi-plus"></i>
            </button>
          </div>

          <div
            :class="[
              'flex items-center gap-2 px-2 py-1.5 rounded-md text-sm font-medium cursor-pointer transition duration-200',
              !isSettingsActive && isOfficeExpanded
                ? 'bg-surface-overlay text-content font-medium'
                : 'text-content hover:bg-surface-overlay'
            ]"
            @click="toggleOffice"
          >
            <i class="pi pi-box text-sm" />
            <span>Office 1</span>
          </div>

          <TransitionGroup
            tag="div"
            class="flex flex-col gap-0.5"
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <RouterLink
              v-for="(item, index) in (isOfficeExpanded && !isSettingsActive ? suggestionNavItems : [])"
              :key="item.label"
              :to="item.to"
              :style="{ transitionDelay: `${index * 50}ms` }"
              :class="[
                'text-sm ml-4 px-2 py-1.5 rounded-md transition duration-200',
                route.name === item.to.name
                  ? 'bg-surface-overlay text-content font-medium'
                  : 'text-content hover:bg-surface-overlay'
              ]"
            >
              {{ item.label }}
            </RouterLink>
          </TransitionGroup>
        </nav>
      </aside>

      <div class="bg-bg border border-border rounded-md p-10 flex-1 overflow-auto">
        <router-view />
      </div>
    </main>

  </div>
</template>
