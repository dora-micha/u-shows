<script setup lang="ts">
import { computed } from 'vue'

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
</script>

<template>
  <img v-if="src" :src="src" :alt="alt" :class="['object-cover', 'rounded', styles]" />
  <div
    v-else
    :class="['object-cover', 'rounded', 'bg-primary-200', 'dark:bg-primary-800', styles]"
  ></div>
</template>
