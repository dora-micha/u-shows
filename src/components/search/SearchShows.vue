<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import type { SearchResult } from '../../types/tvmaze'
import { searchShows } from '../../services/api'
import { useQuery } from '../../composables/useQuery'
import { RouteName } from '../../router'
import {
  ComboboxRoot,
  ComboboxInput,
  ComboboxPortal,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxViewport,
  ComboboxAnchor
} from 'reka-ui'
import { UTypography } from '../ui'
import SearchShowsResultCard from './SearchShowsResultCard.vue'

const MIN_SEARCH_LENGTH = 3
const DEBOUNCE_DELAY = 300

const router = useRouter()
const searchTerm = ref('')
const selectedValue = ref<SearchResult | null>(null)
const open = ref(false)
let debounceTimeout: ReturnType<typeof setTimeout> | null = null

const { data, isFetching, isError, fetchData } = useQuery<SearchResult[]>(
  () => searchShows(searchTerm.value),
  { immediate: false }
)

watch(searchTerm, (newValue) => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout)
  }

  if (newValue.trim().length >= MIN_SEARCH_LENGTH) {
    debounceTimeout = setTimeout(async () => {
      await fetchData()
      open.value = true
    }, DEBOUNCE_DELAY)
  } else {
    data.value = null
  }
})

const handleSelect = (value: SearchResult | null) => {
  if (value) {
    open.value = false
    ;(document.activeElement as HTMLElement)?.blur()
    router.push({ name: RouteName.ShowDetail, params: { id: value.show.id.toString() } })
  }
}

// Cleanup debounce timer to prevent memory leaks
onUnmounted(() => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout)
  }
})
</script>

<template>
  <ComboboxRoot
    v-model="selectedValue"
    v-model:open="open"
    :ignore-filter="true"
    class="max-w-xs flex-1"
    @update:model-value="handleSelect"
  >
    <ComboboxAnchor class="relative">
      <ComboboxInput
        v-model="searchTerm"
        data-testid="search-input"
        placeholder="Search shows..."
        aria-label="Search TV shows"
        class="w-full px-4 py-2 pr-10 rounded-lg bg-primary-50/60 dark:bg-primary-900/60 backdrop-blur-sm border border-primary-300/50 dark:border-primary-700/50 text-primary-900 dark:text-primary-100 placeholder-primary-500 dark:placeholder-primary-400 transition-all u-focus-ring"
      />
    </ComboboxAnchor>

    <ComboboxPortal>
      <ComboboxContent
        v-if="searchTerm.trim().length >= MIN_SEARCH_LENGTH"
        position="popper"
        class="w-80 rounded-lg overflow-hidden bg-primary-50/95 dark:bg-primary-900/95 backdrop-blur-xl border border-primary-300/50 dark:border-primary-700/50 shadow-lg z-50"
      >
        <ComboboxViewport class="min-h-20 max-h-96 overflow-auto">
          <ComboboxEmpty v-if="isFetching" as-child>
            <UTypography size="xs" class="text-center p-4"> Searching... </UTypography>
          </ComboboxEmpty>

          <ComboboxEmpty v-else-if="!data || data.length === 0 || isError" as-child>
            <UTypography size="xs" class="text-center p-4">
              No shows found. Please try again.
            </UTypography>
          </ComboboxEmpty>

          <template v-else>
            <ComboboxItem v-for="result in data" :key="result.show.id" :value="result" as-child>
              <SearchShowsResultCard :show="result.show" />
            </ComboboxItem>
          </template>
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxPortal>
  </ComboboxRoot>
</template>
