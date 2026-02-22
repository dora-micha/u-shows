import { describe, it, expect, vi } from 'vitest'
import { useQuery } from './useQuery'

describe('useQuery', () => {
  it('auto-executes when immediate is true', async () => {
    const mockFn = vi.fn().mockResolvedValue(['data'])

    const { data, isLoading } = useQuery(mockFn, { immediate: true })

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(isLoading.value).toBe(true)

    await vi.waitFor(() => {
      expect(data.value).toEqual(['data'])
      expect(isLoading.value).toBe(false)
    })
  })

  it('does not execute when immediate is false', () => {
    const mockFn = vi.fn().mockResolvedValue(['data'])

    const { data, isLoading } = useQuery(mockFn, { immediate: false })

    expect(mockFn).not.toHaveBeenCalled()
    expect(data.value).toBeNull()
    expect(isLoading.value).toBe(false)
  })

  it('executes when fetchData is called manually', async () => {
    const mockFn = vi.fn().mockResolvedValue(['data'])

    const { data, fetchData } = useQuery(mockFn, { immediate: false })

    expect(mockFn).not.toHaveBeenCalled()

    await fetchData()

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(data.value).toEqual(['data'])
  })

  it('isLoading is true only on initial fetch', async () => {
    const mockFn = vi.fn().mockResolvedValue(['data'])

    const { isLoading, isFetching, fetchData } = useQuery(mockFn, { immediate: false })

    expect(isLoading.value).toBe(false)

    const promise1 = fetchData()
    expect(isLoading.value).toBe(true)
    expect(isFetching.value).toBe(true)

    await promise1

    expect(isLoading.value).toBe(false)
    expect(isFetching.value).toBe(false)

    const promise2 = fetchData()
    expect(isLoading.value).toBe(false) // data is not null anymore
    expect(isFetching.value).toBe(true)

    await promise2
  })

  it('sets error state when query fails', async () => {
    const mockFn = vi.fn().mockRejectedValue(new Error('API Error'))

    const { data, isError, error, isLoading } = useQuery(mockFn, { immediate: true })

    await vi.waitFor(() => {
      expect(isError.value).toBe(true)
      expect(error.value?.message).toBe('API Error')
      expect(data.value).toBeNull()
      expect(isLoading.value).toBe(false)
    })
  })

  it('can refetch after error', async () => {
    const mockFn = vi
      .fn()
      .mockRejectedValueOnce(new Error('API Error'))
      .mockResolvedValueOnce(['data'])

    const { data, isError, error, fetchData } = useQuery(mockFn, { immediate: false })

    // First call fails
    await fetchData()
    expect(isError.value).toBe(true)
    expect(error.value?.message).toBe('API Error')

    // Second call succeeds
    await fetchData()
    expect(isError.value).toBe(false)
    expect(error.value).toBeNull()
    expect(data.value).toEqual(['data'])
  })
})
