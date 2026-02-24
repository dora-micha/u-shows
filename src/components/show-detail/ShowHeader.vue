<script setup lang="ts">
import type { Show } from '../../types/tvmaze'
import { UImage, UTypography } from '../ui'

defineProps<{
  show: Show
}>()
</script>

<template>
  <section class="flex gap-6 flex-col-reverse sm:flex-row">
    <UImage :src="show.image?.medium" :alt="show.name" size="lg" />
    <div class="flex-1">
      <UTypography size="xl" as="h1" class="mb-6">{{ show.name }}</UTypography>
      <div class="flex flex-wrap gap-2 mb-6">
        <UTypography
          v-for="genre in show.genres"
          :key="genre"
          size="xs"
          as="span"
          class="px-3 py-2 bg-secondary-100 dark:bg-secondary-950 rounded-full"
        >
          {{ genre }}
        </UTypography>
      </div>

      <ul class="space-y-4">
        <li v-if="show.type">
          <UTypography size="sm">Type: {{ show.type }}</UTypography>
        </li>
        <li v-if="show.premiered">
          <UTypography size="sm">Premiered: {{ show.premiered }}</UTypography>
        </li>
        <li v-if="show.rating?.average">
          <UTypography size="sm">Rating: {{ show.rating.average }}/10</UTypography>
        </li>
        <li v-if="show.status">
          <UTypography size="sm">Status: {{ show.status }}</UTypography>
        </li>
        <li v-if="show.network">
          <UTypography size="sm"
            >Network: {{ show.network.name }}, {{ show.network.country.name }}</UTypography
          >
        </li>
      </ul>
    </div>
  </section>
</template>
