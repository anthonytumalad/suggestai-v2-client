import { useToast } from 'primevue/usetoast'

export type ToastSeverity = 'success' | 'error' | 'warn' | 'info'

export function useAppToast() {
  const toast = useToast()

  function show(severity: ToastSeverity, summary: string, detail?: string) {
    toast.add({ severity, summary, detail, life: 4000 })
  }

  function loading(summary: string, detail?: string) {
    const group = `loading-${Date.now()}`
    toast.add({ severity: 'info', summary, detail, group, life: undefined })

    return {
      success: (s: string, d?: string) => {
        toast.removeGroup(group)
        show('success', s, d)
      },
      error: (s: string, d?: string) => {
        toast.removeGroup(group)
        show('error', s, d)
      },
    }
  }

  return {
    success: (summary: string, detail?: string) => show('success', summary, detail),
    error: (summary: string, detail?: string) => show('error', summary, detail),
    warn: (summary: string, detail?: string) => show('warn', summary, detail),
    info: (summary: string, detail?: string) => show('info', summary, detail),
    loading,
  }
}
