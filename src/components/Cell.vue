<template>
  <div>
    {{ props.displayValue }}
  </div>
</template>

<script setup lang="ts">
type Marker = 'X' | 'O' | null

const props = defineProps<{
  displayValue: Marker
}>()
</script>