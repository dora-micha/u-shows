import { ref, computed } from 'vue'
import { logError } from '../utils/logger'

export interface UseQueryOptions {
  immediate: boolean // Required to force explicit fetch strategy (true: auto-execute, false: manual)
}

export const useQuery = <T>(queryFn: () => Promise<T>, options: UseQueryOptions) => {
  const data = ref<T | null>(null)
  const isFetching = ref(false) // true during any fetch (initial or refetch)
  const isError = ref(false)
  const error = ref<Error | null>(null)

  const isLoading = computed(() => isFetching.value && data.value === null) // true only on initial fetch (no data yet)

  const fetchData = async (): Promise<void> => {
    isFetching.value = true
    isError.value = false
    error.value = null

    try {
      const result = await queryFn()
      data.value = result
    } catch (err) {
      isError.value = true
      error.value = err instanceof Error ? err : new Error('Query failed')
      logError('Query failed', error.value, {
        component: 'useQuery',
        action: 'fetchData'
      })
    } finally {
      isFetching.value = false
    }
  }

  if (options.immediate) {
    fetchData()
  }

  return {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    fetchData
  }
}
