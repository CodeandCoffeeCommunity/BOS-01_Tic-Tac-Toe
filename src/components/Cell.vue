<template>
  <div>
    {{ props.displayValue ?? 'empty' }}
  </div>
</template>

<script setup lang="ts">
import type { Marker } from '../composables/useBoardController'

const props = defineProps<{
  displayValue: Marker
}>()
</script>