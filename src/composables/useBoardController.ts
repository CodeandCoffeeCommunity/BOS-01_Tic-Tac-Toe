import { ref, computed } from 'vue'

export type Marker = 'X' | 'O' | ''
type Board = Marker[]

export const useBoardController = (boardDimension: number) => {

  const currentPlayer = ref<Marker>('X')

  const createBoard = (): Board => {
    return Array(boardDimension ** 2).fill('')
  }
  
  const board = ref(createBoard())

  const calculateWinner = () => {

    const getReducer = (getIndexInAcc: (i: number) => number) => (acc: Marker[][], curr: Marker, i: number) => {
      return getIndexInAcc(i) === -1 ? acc : (acc[i].push(curr), acc)
    }

    const diagonalMatch = (index: number) => {
      const leftDiagonalCongruent = index % (boardDimension + 1) === 0
      const rightDiagonalCongruent = index % (boardDimension - 1) === 0
      if (leftDiagonalCongruent) return 0
      if (rightDiagonalCongruent && !leftDiagonalCongruent) return 1
      return -1
    }

    const cols = board.value.reduce<Marker[][]>(getReducer((i) => i % boardDimension), [[], [], []])
    const rows = board.value.reduce<Marker[][]>(getReducer((i) => Math.floor(i / boardDimension)), [[], [], []])
    const diagonals = board.value.reduce<Marker[][]>(getReducer(diagonalMatch), [[], []])

    return [...cols, ...rows, ...diagonals].some((combo) => combo.join() === currentPlayer.value.repeat(boardDimension))
  }
  
  const isBoardFull = () => {
    return board.value.every(cell => cell !== '')
  }

  const playMove = (cell: number) => {
    if (cell > boardDimension ** 2 || cell < 0) return false
    if (board.value[cell]) return false
    board.value[cell] = currentPlayer.value
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
    return true
  }

  return {
    board: computed(() => board.value),
    currentPlayer: computed(() => currentPlayer.value),

    calculateWinner,
    isBoardFull,
    playMove,
  }
}