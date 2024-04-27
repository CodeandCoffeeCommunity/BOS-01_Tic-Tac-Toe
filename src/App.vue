<template>
  <div>{{ currentPlayer }}</div>
  <Cell 
    v-for="(cell, index) in board"
    :display-value="cell"
    @click="playMove(currentPlayer, index)"
  />
</template>

<script setup lang="ts">
import Cell from './components/Cell.vue'

import { useBoardController } from './composables/useBoardController'

const { board, currentPlayer, playMove } = useBoardController()
</script>