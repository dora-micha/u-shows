<script setup lang="ts">
import { ref } from 'vue'
import type { SearchResult } from '../types/tvmaze'
import { searchShows } from '../services/api'
import { useQuery } from '../composables/useQuery'
import { RouteName } from '../router'

const searchQuery = ref('')

const { data, isFetching, isError, error, fetchData } = useQuery<SearchResult[]>(
  () => searchShows(searchQuery.value),
  { immediate: false }
)

const handleSearch = async () => {
  if (searchQuery.value.trim()) {
    await fetchData()
  }
}
</script>

<template>
  <div>
    <div>
      <input
        v-model="searchQuery"
        type="search"
        placeholder="Search shows..."
        @keyup.enter="handleSearch"
      />
    </div>

    <div v-if="searchQuery.trim() && data">
      <h2>Search Results ({{ data.length }})</h2>
      <div v-if="isFetching">Searching...</div>
      <div v-else-if="isError">
        <p>Something went wrong. Please try again.</p>
      </div>
      <ul v-else>
        <li v-for="result in data" :key="result.show.id">
          <RouterLink :to="{ name: RouteName.ShowDetail, params: { id: result.show.id } }">{{
            result.show.name
          }}</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>
