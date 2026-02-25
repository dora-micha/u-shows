<script setup lang="ts">
import { ref, computed } from 'vue'

interface ImageProps {
  size?: 'lg' | 'md' | 'sm'
  src: string | undefined
  alt: string
}

const props = withDefaults(defineProps<ImageProps>(), {
  size: 'md'
})

const styleMap: Record<string, string> = {
  lg: 'w-50 h-74',
  md: 'w-40 h-60',
  sm: 'w-12 h-16'
}

const styles = computed(() => styleMap[props.size])
const isLoading = ref(true)

const handleLoad = () => {
  isLoading.value = false
}
</script>

<template>
  <div :class="styles">
    <div
      v-if="src && isLoading"
      class="w-full h-full rounded bg-primary-200 dark:bg-primary-800 animate-pulse"
    />
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      :class="['w-full h-full object-cover rounded', { hidden: isLoading }]"
      loading="lazy"
      @load="handleLoad"
    />
    <div v-if="!src" class="w-full h-full rounded bg-primary-200 dark:bg-primary-800" />
  </div>
</template>
