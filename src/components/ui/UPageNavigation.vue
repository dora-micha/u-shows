<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ScrollAreaRoot, ScrollAreaViewport, ScrollAreaScrollbar, ScrollAreaThumb } from 'reka-ui'
import ULink from '../ui/ULink.vue'

type Item = {
  value: string
  label: string
}

defineProps<{
  items: Item[]
}>()

const route = useRoute()
const activeItem = ref<string | null>(null)

watch(
  () => route.hash,
  (hash) => {
    activeItem.value = hash ? hash.slice(1) : null
  },
  { immediate: true }
)
</script>

<template>
  <aside
    class="sticky top-0 z-10 px-2 backdrop-blur-xl bg-primary-50/70 dark:bg-primary-900/70 border-b border-primary-200/50 dark:border-primary-700/50"
  >
    <ScrollAreaRoot class="w-full" type="hover">
      <ScrollAreaViewport class="u-focus-ring w-full">
        <nav class="flex gap-3 pb-4 pt-4">
          <ULink
            v-for="item in items"
            :key="item.value"
            :href="`#${item.value}`"
            :aria-current="activeItem === item.value ? 'location' : undefined"
            :variant="activeItem === item.value ? 'primary' : 'secondary'"
            class="flex-shrink-0"
          >
            {{ item.label }}
          </ULink>
        </nav>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar
        orientation="horizontal"
        class="flex h-1 touch-none select-none flex-col bg-transparent"
      >
        <ScrollAreaThumb
          class="relative flex-1 rounded-full bg-primary-400/50 dark:bg-primary-500/50"
        />
      </ScrollAreaScrollbar>
    </ScrollAreaRoot>
  </aside>
</template>
