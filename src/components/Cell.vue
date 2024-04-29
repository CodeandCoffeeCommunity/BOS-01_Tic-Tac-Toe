<template>
  <div :style="`width: ${size}px; height: ${size}px; background-color: rgb(25, 25, 25); display: flex; align-items: center; justify-content: center; border-radius: 5px; font-style: black; font-size: larger; cursor: ${props.displayValue ? 'not-allowed' : 'pointer'};`">
    {{ props.displayValue ?? props.displayValue}}
  </div>
</template>

<script setup lang="ts">
import type { Marker } from '../composables/useBoardController'

const props = defineProps<{
  displayValue: Marker,
  size: number,
}>()
</script>