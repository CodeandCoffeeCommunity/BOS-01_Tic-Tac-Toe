<template>
  <div>{{ currentPlayer }}</div>
  _
  <Cell 
    v-for="(cell, index) in board"
    :display-value="cell"
    @click="playMove(index)"
  />
</template>

<script setup lang="ts">
import Cell from './components/Cell.vue'

import { useBoardController } from './composables/useBoardController'

const BOARD_SIZE = 5

const { board, currentPlayer, playMove } = useBoardController(BOARD_SIZE)
</script>