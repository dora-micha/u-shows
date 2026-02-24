<script setup lang="ts">
import type { Cast } from '../../types/tvmaze'
import { AvatarRoot, AvatarFallback, AvatarImage } from 'reka-ui'
import { UTypography } from '../ui'

defineProps<{
  cast: Cast[]
}>()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div v-for="member in cast" :key="member.person.id" class="flex gap-3 p-4 rounded-lg">
      <AvatarRoot class="w-16 h-16 overflow-hidden rounded-full">
        <AvatarImage
          :src="member.person?.image?.medium || ''"
          :alt="member.person.name"
          class="h-full w-full rounded-[inherit] object-cover"
        />
        <AvatarFallback
          class="bg-primary-200 dark:bg-primary-800 flex h-full w-full items-center justify-center"
        >
          {{ member.person.name.charAt(0) }}
        </AvatarFallback>
      </AvatarRoot>
      <div class="flex-1 min-w-0">
        <UTypography size="sm" class="truncate">
          {{ member.person.name }}
        </UTypography>
        <UTypography size="xs" class="truncate"> as {{ member.character.name }} </UTypography>
      </div>
    </div>
  </div>
</template>
