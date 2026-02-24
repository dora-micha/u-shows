<script setup lang="ts">
import { RouteName } from './router'
import { UPage, UHeader, UFooter, UMain, UTypography, ULink } from './components/ui'
import SearchShows from './components/search/SearchShows.vue'
import Logo from './assets/logo.svg?component'
</script>

<template>
  <UPage>
    <UHeader>
      <template #left>
        <ULink :to="{ name: RouteName.Dashboard }" aria-label="Go to dashboard">
          <Logo />
        </ULink>
      </template>
      <template #right>
        <SearchShows />
      </template>
    </UHeader>

    <UMain>
      <RouterView v-slot="{ Component }">
        <!-- KeepAlive preserves component state when navigating away.
             Only cache DashboardView to preserve scroll position in carousels.
        -->
        <KeepAlive include="DashboardView">
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
    </UMain>

    <UFooter>
      <UTypography size="xs"> Built with passion and lots of coffee ☕️ • by Dora. </UTypography>
    </UFooter>
  </UPage>
</template>
