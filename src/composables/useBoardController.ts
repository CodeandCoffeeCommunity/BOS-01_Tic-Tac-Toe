import { ref } from 'vue'

export type Marker = 'X' | 'O' | null
type Board = Marker[]

export const useBoardController = () => {

  const currentPlayer = ref<Marker>('X')

  const createBoard = (): Board => {
    return Array(9).fill(null)
  }
  
  const board = ref(createBoard())

  const calculateWinner = (board: Board): Marker => {
    const winLines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ]
  
    for (const line of winLines) {
      const [a, b, c] = line
      if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a]
    }
    return null
  }
  
  const isBoardFull = (board: Board): boolean => {
    return board.every(cell => cell !== null)
  }

  const playMove = (marker: Marker, cell: number) => {
    if (cell > 8 || cell < 0) return false
    if (board.value[cell]) return false
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
    board.value[cell] = marker
    return true
  }

  return {
    board,
    currentPlayer,

    calculateWinner,
    isBoardFull,
    playMove,
  }
}