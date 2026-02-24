<script setup lang="ts">
import type { Show } from '../../types/tvmaze'
import { RouteName } from '../../router'
import { UImage, UTypography } from '../ui'

defineProps<{
  show: Show
}>()
</script>

<template>
  <RouterLink
    :to="{ name: RouteName.ShowDetail, params: { id: show.id } }"
    class="w-40 u-focus-ring m-2"
  >
    <div
      class="group relative overflow-hidden rounded-xl backdrop-blur-sm bg-primary-50/10 dark:bg-primary-800/10 border border-primary-100/20 dark:border-primary-700/20 shadow-lg hover:shadow-2xl hover:border-primary-100/30 dark:hover:border-primary-600/30 transition-all duration-300"
    >
      <UImage
        :src="show.image?.medium"
        :alt="show.name"
        size="md"
        class="group-hover:scale-110 transition-transform duration-500"
      />
    </div>
    <div class="mt-3 space-y-1">
      <UTypography as="h3" size="sm">{{ show.name }}</UTypography>
      <UTypography as="p" size="xs" class="flex items-center gap-2">
        <span v-if="show.rating.average" class="flex items-center gap-1">
          <span class="text-secondary-500">⭐</span>
          {{ show.rating.average }}
        </span>
        <span v-if="show.rating.average && show.premiered">•</span>
        <span v-if="show.premiered">{{ show.premiered.split('-')[0] }}</span>
      </UTypography>
    </div>
  </RouterLink>
</template>
