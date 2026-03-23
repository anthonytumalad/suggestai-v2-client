import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from '@/routes/auth.routes'
import { dashboardRoutes } from '@/routes/dashboard.routes'
import { suggestionRoutes } from '@/routes/suggestion.routes'
import { reportsRoutes } from '@/routes/reports.routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authRoutes,
    {
      path: '/',
      component: () => import('@/assets/layouts/AppLayout.vue'),
      meta: { requiresAuth: true },
      redirect: { name: 'dashboard' },
      children: [
        ...dashboardRoutes,
        ...suggestionRoutes,
        ...reportsRoutes
      ]
    },
    {
      path: '/suggestion-form',
      component: () => import('@/views/suggestion/SuggestionFormView.vue'),
      meta: { title: 'Suggestion Form' }
    },
  ],
})

export default router
