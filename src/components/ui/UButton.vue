<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'

interface ButtonProps {
  variant?: 'primary' | 'tab'
  as?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'tab',
  as: 'button'
})

const variantMap: Record<string, string> = {
  primary:
    'px-4 py-2 text-sm font-medium rounded-lg bg-secondary-500 text-white hover:bg-secondary-600 dark:bg-secondary-600 dark:hover:bg-secondary-700 transition-colors',
  tab: 'px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-100 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400 data-[state=active]:border-b-2 data-[state=active]:border-primary-600 dark:data-[state=active]:border-primary-400'
}

const styles = computed(() => variantMap[props.variant])
</script>

<template>
  <Primitive :as="as" :class="['cursor-pointer', 'u-focus-ring', styles]">
    <slot></slot>
  </Primitive>
</template>
