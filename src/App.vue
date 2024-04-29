<template>
  Winner: {{ isGameOver ? ( computeWinner ? currentPlayer : 'Tie' ) : 'Game Ongoing' }}
  <div :style="`display: flex; flex-wrap: wrap; gap: ${SQUARE_GAP}px; width: ${3 * (SQUARE_GAP * 2 + SQUARE_SIZE)}px; margin: 50px;`">
    <Cell 
      v-for="(cell, index) in board" 
      :display-value="cell"
      :size="SQUARE_SIZE"
      @click="playMove(index)" 
    />
  </div>
  <button @click="resetBoard()">Reset</button>
</template>

<script setup lang="ts">
import Cell from './components/Cell.vue'
import { computed } from 'vue'
import { useBoardController } from './composables/useBoardController'

const SQUARE_SIZE = 50
const SQUARE_GAP = 3

const { board, currentPlayer, playMove, computeWinner, computeIsBoardFull, resetBoard } = useBoardController()

const isGameOver = computed(() => computeWinner.value || computeIsBoardFull.value)
</script>