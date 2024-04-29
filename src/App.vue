<template>
  winner: {{ isGameOver ? ( computeWinner ? currentPlayer : 'Tie') : 'Game Ongoing' }}
  <div :style="`display: flex; flex-wrap: wrap; gap: ${SQUARE_GAP}px; width: ${boardSize * (SQUARE_GAP * 2 + SQUARE_SIZE)}px;`">
    <Cell 
      v-for="(cell, index) in board" 
      :display-value="cell"
      :size="SQUARE_SIZE"
      @click="playMove(index)" 
    />
  </div>
  <input 
    v-model="boardSize"
    type="range" 
    id="slider" 
    name="slider" 
    min="3" 
    max="10"
  >

</template>

<script setup lang="ts">
import Cell from './components/Cell.vue'
import { computed, ref } from 'vue'
import { useBoardController } from './composables/useBoardController'

const boardSize = ref(3)

const SQUARE_SIZE = 50
const SQUARE_GAP = 3

const { board, currentPlayer, playMove, computeWinner, computeIsBoardFull } = useBoardController(boardSize)

const isGameOver = computed(() => computeWinner.value || computeIsBoardFull.value)
</script>