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

    expect(showsByGenre.value).toHaveProperty('drama')
    expect(showsByGenre.value).toHaveProperty('comedy')
    expect(showsByGenre.value.drama.genreLabel).toBe('Drama')
    expect(showsByGenre.value.drama.genreShows).toHaveLength(1)
    expect(showsByGenre.value.comedy.genreLabel).toBe('Comedy')
    expect(showsByGenre.value.comedy.genreShows).toHaveLength(1)
  })

  it('handles shows with multiple genres', () => {
    const store = useShowsStore()
    const { showsByGenre } = useShows()

    store.addShows([{ id: 1, name: 'Show 1', genres: ['Drama', 'Thriller'] } as Show])

    expect(showsByGenre.value.drama.genreShows).toHaveLength(1)
    expect(showsByGenre.value.thriller.genreShows).toHaveLength(1)
    expect(showsByGenre.value.drama.genreShows[0].id).toBe(1)
    expect(showsByGenre.value.thriller.genreShows[0].id).toBe(1)
  })

  it('handles shows with no genres', () => {
    const store = useShowsStore()
    const { showsByGenre } = useShows()

    store.addShows([{ id: 1, name: 'Show 1' } as Show])

    expect(showsByGenre.value).toHaveProperty('other')
    expect(showsByGenre.value.other.genreLabel).toBe('Other')
    expect(showsByGenre.value.other.genreShows).toHaveLength(1)
  })

  it('returns empty object for empty shows', () => {
    const { showsByGenre } = useShows()

    expect(showsByGenre.value).toEqual({})
  })

  it('generates genres list for navigation', () => {
    const store = useShowsStore()
    const { genres } = useShows()

    store.addShows([
      { id: 1, name: 'Show 1', genres: ['Drama'] } as Show,
      { id: 2, name: 'Show 2', genres: ['Science Fiction'] } as Show
    ])

    expect(genres.value).toHaveLength(2)
    expect(genres.value).toEqual([
      { value: 'drama', label: 'Drama' },
      { value: 'science-fiction', label: 'Science Fiction' }
    ])
  })
})
