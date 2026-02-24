<script setup lang="ts">
import type { Show } from '../../types/tvmaze'
import { UTypography, UImage } from '../ui'

defineProps<{
  show: Show
}>()
</script>

<template>
  <div
    class="flex items-center gap-3 p-3 cursor-pointer transition-colors hover:bg-primary-100 dark:hover:bg-primary-800 data-[highlighted]:bg-primary-100 dark:data-[highlighted]:bg-primary-800 data-[highlighted]:inset-ring-2 data-[highlighted]:inset-ring-secondary-500 rounded-lg outline-none"
  >
    <UImage :src="show.image?.medium" size="sm" alt="show.name" />
    <div>
      <UTypography size="sm" as="h4" class="truncate">{{ show.name }}</UTypography>
      <UTypography v-if="show.premiered" size="xs">
        {{ show.premiered.split('-')[0] }}
        <span v-if="show.genres && show.genres.length > 0"> • {{ show.genres[0] }} </span>
      </UTypography>
    </div>
  </div>
</template>
