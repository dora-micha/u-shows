import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Show } from '../types/tvmaze'

const INITIAL_PAGE = 0

export const useShowsStore = defineStore('shows', () => {
  const shows = ref<Show[]>([])
  const nextPage = ref(INITIAL_PAGE)

  const addShows = (newShows: Show[]): void => {
    if (newShows.length > 0) {
      shows.value.push(...newShows)
    }
  }

  const incrementPage = (): void => {
    nextPage.value++
  }

  const reset = (): void => {
    shows.value = []
    nextPage.value = INITIAL_PAGE
  }

  return {
    shows,
    nextPage,
    addShows,
    incrementPage,
    reset
  }
})
