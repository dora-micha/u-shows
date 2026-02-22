import { computed } from 'vue'
import { useShowsStore } from '../stores/shows'
import type { Show } from '../types/tvmaze'

export type ShowsByGenre = Record<string, Show[]>

export const useShows = () => {
  const store = useShowsStore()

  const showsByGenre = computed<ShowsByGenre>(() => {
    const grouped: ShowsByGenre = {}

    store.shows.forEach((show) => {
      if (show.genres?.length > 0) {
        show.genres.forEach((genre) => {
          ;(grouped[genre] ??= []).push(show)
        })
      } else {
        ;(grouped['Other'] ??= []).push(show)
      }
    })

    return grouped
  })

  return {
    showsByGenre
  }
}
