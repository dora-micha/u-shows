<script setup lang="ts">
import type { Episode } from '../../types/tvmaze'
import { UTypography } from '../ui'

defineProps<{
  episodes: Episode[]
}>()
</script>

<template>
  <div class="w-full sm:w-[80%]">
    <div
      v-for="episode in episodes"
      :key="episode.id"
      class="flex justify-between items-center px-4 py-2"
    >
      <div class="flex-1">
        <UTypography size="sm" as="h4">
          {{ episode.name }}
        </UTypography>
        <UTypography size="xs">
          S{{ episode.season }} E{{ episode.number }}
          <span v-if="episode.airdate"> • {{ episode.airdate }}</span>
        </UTypography>
      </div>
      <UTypography v-if="episode.rating?.average" size="xs">
        {{ episode.rating.average }}/10
      </UTypography>
    </div>
  </div>
</template>
