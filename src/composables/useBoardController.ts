import { ref, computed } from 'vue'

export type Marker = 'X' | 'O' | null
type Board = Marker[]

export const useBoardController = () => {

  const currentPlayer = ref<Marker>('X')

  const createBoard = (): Board => {
    return Array(9).fill(null)
  }
  
  const board = ref(createBoard())

  const computeWinner = computed(() => {
    const winLines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ]
  
    for (const line of winLines) {
      const [a, b, c] = line
      if (board.value[a] && board.value[a] === board.value[b] && board.value[a] === board.value[c]) return true
    }
    return false
  })
  
  const computeIsBoardFull = computed(() => {
    return board.value.every(cell => cell !== null)
  })

  const playMove = (cell: number) => {
    if (cell > 8 || cell < 0) return false
    if (board.value[cell]) return false
    board.value[cell] = currentPlayer.value
    if (!computeWinner.value) currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
    return true
  }

  return {
    board: computed(() => board.value),
    currentPlayer: computed(() => currentPlayer.value),
    computeWinner,
    computeIsBoardFull,
    playMove,
    resetBoard: () => board.value = createBoard(),
  }
}