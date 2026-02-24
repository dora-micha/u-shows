<script setup lang="ts">
import UTypography from './UTypography.vue'

interface QueryStateProps {
  isLoading?: boolean
  isError?: boolean
  isEmpty?: boolean
  loadingMessage?: string
  errorMessage?: string
  emptyMessage?: string
}

withDefaults(defineProps<QueryStateProps>(), {
  isLoading: false,
  isError: false,
  isEmpty: false,
  loadingMessage: 'Loading...',
  errorMessage: 'Something went wrong. Please try again.',
  emptyMessage: 'No data found.'
})
</script>

<template>
  <section v-if="isLoading || isError || isEmpty">
    <UTypography v-if="isLoading" class="text-center py-12">
      {{ loadingMessage }}
    </UTypography>
    <UTypography v-else-if="isError" class="text-center py-12">
      {{ errorMessage }}
    </UTypography>
    <UTypography v-else-if="isEmpty" class="text-center py-12">
      {{ emptyMessage }}
    </UTypography>
  </section>
</template>
