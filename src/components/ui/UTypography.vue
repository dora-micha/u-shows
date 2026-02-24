<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'

interface TypographyProps {
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  as?: string
}

const props = withDefaults(defineProps<TypographyProps>(), {
  size: 'md',
  as: 'p'
})

const styleMap: Record<string, string> = {
  xl: 'text-xl sm:text-2xl font-bold text-primary-900 dark:text-primary-100',
  lg: 'text-lg sm:text-xl font-bold text-primary-900 dark:text-primary-100',
  md: 'text-lg font-semibold text-primary-900 dark:text-primary-100',
  sm: 'text-sm sm:text-base text-primary-700 dark:text-primary-300',
  xs: 'text-xs text-primary-600 dark:text-primary-400'
}

const defaultAsMap: Record<string, string> = {
  xl: 'h1',
  lg: 'h2',
  md: 'h3',
  sm: 'p',
  xs: 'small'
}

const styles = computed(() => styleMap[props.size])
const element = computed(() => props.as || defaultAsMap[props.size])
</script>

<template>
  <Primitive :as="element" :class="styles">
    <slot></slot>
  </Primitive>
</template>
