<script setup lang="ts">
import { watch } from 'vue'
import type { Show } from '../types/tvmaze'
import { fetchShows } from '../services/api'
import { useQuery } from '../composables/useQuery'
import { useShowsStore } from '../stores/shows'
import { useShows } from '../composables/useShows'
import SearchShows from '../components/SearchShows.vue'
import { RouteName } from '../router'

const store = useShowsStore()

const { data, isLoading, isFetching, isError, fetchData } = useQuery<Show[]>(
  () => fetchShows(store.nextPage),
  { immediate: true }
)

watch(data, (newData) => {
  if (newData && newData.length > 0) {
    store.addShows(newData)
    store.incrementPage()
  }
})

const { showsByGenre } = useShows()
</script>

<template>
  <div>
    <h1>Dashboard</h1>

    <SearchShows />

    <div v-if="isLoading">Loading...</div>

    <div v-else-if="isError">
      <p>Something went wrong. Please try again.</p>
    </div>

    <div v-else>
      <div v-for="(showList, genre) in showsByGenre" :key="genre">
        <h2>{{ genre }} ({{ showList.length }})</h2>
        <ul>
          <li v-for="show in showList" :key="show.id">
            <RouterLink :to="{ name: RouteName.ShowDetail, params: { id: show.id } }">{{
              show.name
            }}</RouterLink>
          </li>
        </ul>
        <button :disabled="isFetching" @click="fetchData">
          {{ isFetching ? 'Loading...' : 'Load more' }}
        </button>
      </div>
    </div>
  </div>
</template>
