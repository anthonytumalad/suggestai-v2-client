export const suggestionRoutes = [
  {
    path: 'suggestion-box',
    component: () => import('@/assets/layouts/SuggestionBoxLayout.vue'),
    children: [
      {
        path: '',
        name: 'suggestion-box',
        component: () => import('@/views/suggestion/SuggestionBoxListView.vue'),
      },
      {
        path: 'suggestions',
        name: 'suggestions',
        component: () => import('@/assets/layouts/SuggestionLayout.vue'),
        children: [
          {
            path: '',
            redirect: { name: 'suggestion-overview' }
          },
          {
            path: 'overview',
            name: 'suggestion-overview',
            component: () => import('@/views/suggestion/SuggestionOverviewView.vue'),
          },
          {
            path: 'list',
            name: 'suggestion-list',
            component: () => import('@/views/suggestion/SuggestionListView.vue'),
          },
          {
            path: 'settings',
            name: 'suggestion-settings',
            component: () => import('@/views/suggestion/settings/SuggestionBoxSettingsView.vue'),
          },
        ]
      }
    ]
  }
]
