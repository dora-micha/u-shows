<script setup lang="ts">
import { computed } from 'vue'
import { UTypography } from '../ui'
import { sanitizeHtml } from '../../utils/sanitizer'

const props = defineProps<{
  summary?: string | null
}>()

const computedSummary = computed(() =>
  props.summary ? sanitizeHtml(props.summary) : 'No summary available'
)
</script>

<template>
  <div class="w-full sm:w-[80%]">
    <UTypography size="sm">{{ computedSummary }}</UTypography>
  </div>
</template>
