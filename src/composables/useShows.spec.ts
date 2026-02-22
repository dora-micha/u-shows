import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useShows } from './useShows'
import { useShowsStore } from '../stores/shows'
import type { Show } from '../types/tvmaze'

describe('useShows', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('groups shows by genre', () => {
    const store = useShowsStore()
    const { showsByGenre } = useShows()

    store.addShows([
      { id: 1, name: 'Show 1', genres: ['Drama'] } as Show,
      { id: 2, name: 'Show 2', genres: ['Comedy'] } as Show
    ])

    expect(showsByGenre.value).toHaveProperty('Drama')
    expect(showsByGenre.value).toHaveProperty('Comedy')
    expect(showsByGenre.value.Drama).toHaveLength(1)
    expect(showsByGenre.value.Comedy).toHaveLength(1)
  })

  it('handles shows with multiple genres', () => {
    const store = useShowsStore()
    const { showsByGenre } = useShows()

    store.addShows([{ id: 1, name: 'Show 1', genres: ['Drama', 'Thriller'] } as Show])

    expect(showsByGenre.value.Drama).toHaveLength(1)
    expect(showsByGenre.value.Thriller).toHaveLength(1)
    expect(showsByGenre.value.Drama[0].id).toBe(1)
    expect(showsByGenre.value.Thriller[0].id).toBe(1)
  })

  it('handles shows with no genres', () => {
    const store = useShowsStore()
    const { showsByGenre } = useShows()

    store.addShows([{ id: 1, name: 'Show 1' } as Show])

    expect(showsByGenre.value).toHaveProperty('Other')
    expect(showsByGenre.value.Other).toHaveLength(1)
  })

  it('returns empty object for empty shows', () => {
    const { showsByGenre } = useShows()

    expect(showsByGenre.value).toEqual({})
  })
})
