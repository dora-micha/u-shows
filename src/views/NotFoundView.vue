<script setup lang="ts">
import { RouteName } from '../router'
import { UTypography, ULink } from '../components/ui'
</script>

<template>
  <article class="flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
    <UTypography size="xl" as="h1">404</UTypography>
    <UTypography>Oops! This page doesn't exist... yet. </UTypography>
    <ULink variant="tertiary" :to="{ name: RouteName.Dashboard }">Back to dashboard</ULink>
  </article>
</template>
