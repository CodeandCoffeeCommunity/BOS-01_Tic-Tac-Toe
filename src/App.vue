<template>
  <p style="margin-bottom: 30px;">Winner: {{ isGameOver ? ( computeWinner ? currentPlayer : 'Tie') : 'Game Ongoing' }}</p>
  <div :style="`display: flex; flex-wrap: wrap; gap: ${SQUARE_GAP}px; width: ${boardSize * (SQUARE_GAP * 2 + SQUARE_SIZE)}px;`">
    <Cell 
      v-for="(cell, index) in board" 
      :display-value="cell"
      :size="SQUARE_SIZE"
      @click="playMove(index)" 
    />
  </div>
  <div style="display: block;">
    <div style="margin: 30px;">
      Board Size
      <input 
        v-model="boardSize"
        type="range" 
        id="slider" 
        name="slider" 
        min="3" 
        max="10"
      >
    </div>
    <button @click="resetBoard">Reset</button>
  </div>
</template>

<script setup lang="ts">
import Cell from './components/Cell.vue'
import { computed, ref } from 'vue'
import { useBoardController } from './composables/useBoardController'

const boardSize = ref(3)

const SQUARE_SIZE = 50
const SQUARE_GAP = 3

const { board, currentPlayer, playMove, computeWinner, computeIsBoardFull, resetBoard } = useBoardController(boardSize)

const isGameOver = computed(() => computeWinner.value || computeIsBoardFull.value)
</script>