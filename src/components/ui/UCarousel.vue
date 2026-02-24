<script setup lang="ts">
import { ref, onActivated } from 'vue'
import { ScrollAreaRoot, ScrollAreaViewport, ScrollAreaScrollbar, ScrollAreaThumb } from 'reka-ui'

const NEAR_END_THRESHOLD = 128

const props = defineProps<{
  isFetching: boolean
}>()

const emit = defineEmits<{
  reachEnd: []
}>()

const scrollAreaRoot = ref<InstanceType<typeof ScrollAreaRoot>>()
const savedScrollPosition = ref(0)

const handleScroll = (event: Event) => {
  const viewport = event.target as HTMLElement
  const { scrollLeft, scrollWidth, clientWidth } = viewport

  // Save scroll position
  savedScrollPosition.value = scrollLeft

  const isNearEnd = scrollLeft >= scrollWidth - clientWidth - NEAR_END_THRESHOLD

  if (isNearEnd && !props.isFetching) {
    emit('reachEnd')
  }
}

// Restore scroll position when component is reactivated (KeepAlive)
onActivated(() => {
  const viewport = scrollAreaRoot.value?.viewport
  if (viewport && savedScrollPosition.value > 0) {
    viewport.scrollLeft = savedScrollPosition.value
  }
})
</script>

<template>
  <ScrollAreaRoot ref="scrollAreaRoot" class="w-full" type="always">
    <ScrollAreaViewport class="w-full u-focus-ring" @scroll="handleScroll">
      <div class="flex gap-4 pb-4 snap-x snap-proximity scroll-smooth">
        <slot></slot>
      </div>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar
      orientation="horizontal"
      class="flex h-2 touch-none select-none flex-col bg-primary-100/20 dark:bg-primary-800/20 rounded-full backdrop-blur-sm"
    >
      <ScrollAreaThumb
        class="relative flex-1 rounded-full bg-primary-400/60 dark:bg-primary-600/60 hover:bg-primary-500/80 dark:hover:bg-primary-500/80 transition-colors"
      />
    </ScrollAreaScrollbar>
  </ScrollAreaRoot>
</template>
