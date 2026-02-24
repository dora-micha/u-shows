import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useShowsStore } from './shows'
import type { Show } from '../types/tvmaze'

describe('useShowsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with empty shows and nextPage 0', () => {
    const store = useShowsStore()

    expect(store.shows).toEqual([])
    expect(store.nextPage).toBe(0)
  })

  it('adds shows and increments nextPage', () => {
    const store = useShowsStore()
    const newShows = [{ id: 1, name: 'Show 1' } as Show, { id: 2, name: 'Show 2' } as Show]

    store.addShows(newShows)
    store.incrementPage()

    expect(store.shows).toHaveLength(2)
    expect(store.nextPage).toBe(1)
  })

  it('accumulates shows across multiple updates', () => {
    const store = useShowsStore()

    store.addShows([{ id: 1, name: 'Show 1' } as Show])
    store.incrementPage()
    store.addShows([{ id: 2, name: 'Show 2' } as Show])
    store.incrementPage()

    expect(store.shows).toHaveLength(2)
    expect(store.nextPage).toBe(2)
  })

  it('does not add shows with empty array', () => {
    const store = useShowsStore()

    store.addShows([])

    expect(store.shows).toEqual([])
    expect(store.nextPage).toBe(0)
  })

  it('resets store to initial state', () => {
    const store = useShowsStore()

    store.addShows([{ id: 1, name: 'Show 1' } as Show])
    store.incrementPage()
    store.reset()

    expect(store.shows).toEqual([])
    expect(store.nextPage).toBe(0)
  })
})
