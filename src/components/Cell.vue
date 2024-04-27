<template>
  <div>
    {{ props.displayValue === '' ? 'empty' : props.displayValue}}
  </div>
</template>

<script setup lang="ts">
import type { Marker } from '../composables/useBoardController'

const props = defineProps<{
  displayValue: Marker
}>()
</script>