<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { fetchShow } from '../services/api'
import type { Show } from '../types/tvmaze'
import { useQuery } from '../composables/useQuery'
import { RouteName } from '../router'

const route = useRoute()
const router = useRouter()

const {
  data: show,
  isLoading,
  isError
} = useQuery<Show>(() => fetchShow(Number(route.params.id)), { immediate: true })

const goBack = () => {
  router.push({ name: RouteName.Dashboard })
}
</script>

<template>
  <div>
    <button @click="goBack">Back</button>

    <div v-if="isLoading">Loading...</div>

    <div v-else-if="isError">
      <p>Something went wrong. Please try again.</p>
    </div>

    <div v-else-if="show">
      <h1>{{ show.name }}</h1>

      <div v-if="show.image">
        <img :src="show.image.medium" :alt="show.name" />
      </div>

      <div>
        <p><strong>Type:</strong> {{ show.type }}</p>
        <p v-if="show.premiered"><strong>Premiered:</strong> {{ show.premiered }}</p>
        <p v-if="show.rating.average"><strong>Rating:</strong> {{ show.rating.average }}</p>
        <p v-if="show.genres.length > 0"><strong>Genres:</strong> {{ show.genres.join(', ') }}</p>
      </div>
    </div>
  </div>
</template>
