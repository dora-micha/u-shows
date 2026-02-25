<script setup lang="ts">
import { watch, onMounted } from 'vue'
import type { Show } from '../types/tvmaze'
import { fetchShows } from '../services/api'
import { useQuery } from '../composables/useQuery'
import { useShowsStore } from '../stores/shows'
import { useShows } from '../composables/useShows'
import { UPageNavigation, UCarousel, UTypography, UQueryState } from '../components/ui'
import CardShow from '../components/dashboard/CardShow.vue'

const INITIAL_PAGES_TO_FETCH = 3

const showsStore = useShowsStore()
const { showsByGenre, genres } = useShows()
const { data, isLoading, isFetching, isError, fetchData } = useQuery<Show[]>(
  () => fetchShows(showsStore.nextPage),
  { immediate: false }
)

// Fetch initial pages sequentially (not Promise.all) because:
// 1. TVMaze API has rate limits - sequential requests prevent 429 errors
// 2. Each fetch must complete for store.nextPage to increment (via watch)
// 3. Shows content imediatelly from the 1st fetch request
const fetchInitialShows = async () => {
  for (let i = 0; i < INITIAL_PAGES_TO_FETCH; i++) {
    await fetchData()

    // Stop fetching if error occurred or no more data available
    if (isError.value || !data.value || data.value.length === 0) {
      break
    }

    // Small delay between requests to:
    // - Respect API rate limits
    // - Allow watch to complete store updates (incrementPage) before next fetch
    if (i < INITIAL_PAGES_TO_FETCH - 1) {
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
  }
}

onMounted(() => {
  if (showsStore.shows.length === 0) {
    fetchInitialShows()
  }
})

watch(data, async (newData) => {
  if (newData && newData.length > 0) {
    showsStore.addShows(newData)
    showsStore.incrementPage()
  }
})
</script>

<template>
  <div>
    <UQueryState
      :is-loading="isLoading"
      :is-error="isError"
      :is-empty="!isLoading && !isError && showsStore.shows.length === 0"
      loading-message="Loading shows..."
      empty-message="No shows found. Please try again later."
    />

    <template v-if="!isLoading && !isError && showsStore.shows.length > 0">
      <UPageNavigation class="-mx-5" :items="genres" />

      <UTypography size="xl" as="h1" class="my-2 sm:my-6">Your TV Shows hub</UTypography>

      <section
        v-for="(genre, genreId) in showsByGenre"
        :id="genreId"
        :key="genreId"
        class="scroll-mt-34 mb-6"
      >
        <UTypography size="lg" as="h2" class="mb-2 sm:mb-4">{{ genre.genreLabel }}</UTypography>
        <UCarousel :is-fetching="isFetching" @reach-end="fetchData">
          <CardShow v-for="show in genre.genreShows" :key="show.id" :show="show" />
        </UCarousel>
      </section>
    </template>
  </div>
</template>
