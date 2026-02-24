import { computed } from 'vue'
import { useShowsStore } from '../stores/shows'
import type { Show } from '../types/tvmaze'

type GenreShows = {
  genreLabel: string
  genreShows: Show[]
}

export type ShowsByGenre = Record<string, GenreShows>

const getGenreId = (genre: string) => genre.toLowerCase().replace(/\s+/g, '-')

export const useShows = () => {
  const store = useShowsStore()

  // Group shows by genre - shows with multiple genres appear in multiple groups
  const showsByGenre = computed<ShowsByGenre>(() => {
    const grouped: ShowsByGenre = {}

    store.shows.forEach((show) => {
      if (show.genres?.length > 0) {
        show.genres.forEach((genre) => {
          const genreId = getGenreId(genre)
          if (grouped[genreId]) {
            grouped[genreId].genreShows.push(show)
          } else {
            grouped[genreId] = { genreLabel: genre, genreShows: [show] }
          }
        })
      } else {
        const otherGenre = grouped['other']
        if (otherGenre) {
          otherGenre.genreShows.push(show)
        } else {
          grouped['other'] = { genreLabel: 'Other', genreShows: [show] }
        }
      }
    })

    return grouped
  })

  const genres = computed(() =>
    Object.keys(showsByGenre.value).map((genreId) => ({
      value: genreId,
      label: showsByGenre.value[genreId].genreLabel
    }))
  )

  return {
    showsByGenre,
    genres
  }
}
