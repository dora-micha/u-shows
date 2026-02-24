<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { fetchShow } from '../services/api'
import type { Show } from '../types/tvmaze'
import { useQuery } from '../composables/useQuery'
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from 'reka-ui'
import { UQueryState, UButton } from '../components/ui'
import ShowHeader from '../components/show-detail/ShowHeader.vue'
import ShowOverview from '../components/show-detail/ShowOverview.vue'
import ShowCast from '../components/show-detail/ShowCast.vue'
import ShowEpisodes from '../components/show-detail/ShowEpisodes.vue'

const route = useRoute()

const {
  data: show,
  isLoading,
  isError,
  fetchData
} = useQuery<Show>(() => fetchShow(Number(route.params.id)), { immediate: false })

// Guard prevents NaN errors when route.params.id becomes undefined
watch(
  () => route.params.id,
  (id) => {
    if (id) {
      fetchData()
    }
  },
  { immediate: true }
)
</script>

<template>
  <div>
    <UQueryState
      :is-loading="isLoading"
      :is-error="isError"
      :is-empty="!isLoading && !isError && !show"
      empty-message="Show not found."
    />

    <div v-if="show" class="space-y-6">
      <ShowHeader :show="show" />

      <TabsRoot default-value="overview" class="w-full">
        <TabsList
          class="flex gap-4 border-b border-primary-200 dark:border-primary-700"
          aria-label="Show information"
        >
          <TabsTrigger value="overview" as-child>
            <UButton>Overview</UButton>
          </TabsTrigger>
          <TabsTrigger
            v-if="show._embedded?.cast && show._embedded.cast.length > 0"
            value="cast"
            as-child
          >
            <UButton>Cast ({{ show._embedded.cast.length }})</UButton>
          </TabsTrigger>
          <TabsTrigger
            v-if="show._embedded?.episodes && show._embedded.episodes.length > 0"
            value="episodes"
            as-child
          >
            <UButton>Episodes ({{ show._embedded.episodes.length }})</UButton>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" class="py-6 u-focus-ring">
          <ShowOverview :summary="show.summary" />
        </TabsContent>

        <TabsContent
          v-if="show._embedded?.cast && show._embedded.cast.length > 0"
          value="cast"
          class="py-6 u-focus-ring"
        >
          <ShowCast :cast="show._embedded.cast" />
        </TabsContent>

        <TabsContent
          v-if="show._embedded?.episodes && show._embedded.episodes.length > 0"
          value="episodes"
          class="py-6 u-focus-ring"
        >
          <ShowEpisodes :episodes="show._embedded.episodes" />
        </TabsContent>
      </TabsRoot>
    </div>
  </div>
</template>
