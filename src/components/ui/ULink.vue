<script setup lang="ts">
import { computed } from 'vue'
import { RouterLinkProps } from 'vue-router'

interface LinkProps {
  variant?: 'primary' | 'secondary' | 'tertiary'
  to?: RouterLinkProps['to']
  href?: string
}

const props = defineProps<LinkProps>()

const isRouterLink = computed(() => !!props.to)

const styles = computed(() => {
  if (props.variant === 'primary') {
    return 'px-4 py-2 text-sm font-medium transition-all border border-primary-300/50 dark:border-primary-600/50 bg-secondary-600/90 dark:bg-secondary-700/90 text-primary-50 dark:text-primary-200 !rounded-full'
  }

  if (props.variant === 'secondary') {
    return 'px-4 py-2 text-sm font-medium transition-all border border-primary-300/50 dark:border-primary-600/50 backdrop-blur-sm !rounded-full'
  }

  if (props.variant === 'tertiary') {
    return 'px-6 py-3 bg-primary-600 dark:bg-primary-500 text-primary-50 dark:text-primary-200 font-semibold'
  }

  return 'text-primary-700 dark:text-primary-300'
})
</script>
<template>
  <RouterLink
    v-if="isRouterLink"
    :to="props.to!"
    :class="['hover:opacity-80', 'transition-opacity', 'u-focus-ring', styles]"
  >
    <slot></slot>
  </RouterLink>
  <a
    v-else
    :href="props.href"
    :class="['hover:opacity-80', 'transition-opacity', 'u-focus-ring', styles]"
  >
    <slot></slot>
  </a>
</template>
