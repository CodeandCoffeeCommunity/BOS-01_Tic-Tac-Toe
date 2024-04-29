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
      const indexIntoAcc = getIndexInAcc(i)
      const arr = acc[indexIntoAcc]
      if (!arr) {
        console.log('not able to find arr for index', indexIntoAcc)
        return acc
      }

      arr.push(curr)
      return acc
    }

    const cols = board.value.reduce<Marker[][]>(getReducer((i) => i % boardDimension), [[], [], []])
    const rows = board.value.reduce<Marker[][]>(getReducer((i) => Math.floor(i / boardDimension)), [[], [], []])
    
    const diag1: Marker[] = []
    for (let i = 0; i < board.value.length; i += boardDimension + 1) {
      diag1.push(board.value[i])
    }

    const diag2: Marker[] = []
    for (let i = boardDimension - 1; i < board.value.length - 1; i += boardDimension -  1) {
      diag2.push(board.value[i])
    }


    console.log(JSON.stringify(diag1, null, 2))
    console.log(JSON.stringify(diag2, null, 2))
    return [...cols, ...rows, diag1, diag2].some((combo) => combo.join() === currentPlayer.value.repeat(boardDimension))
  }
  
  const isBoardFull = () => {
    return board.value.every(cell => cell !== '')
  }

  const playMove = (cell: number) => {
    if (cell > boardDimension ** 2 || cell < 0) return false
    if (board.value[cell]) return false
    board.value[cell] = currentPlayer.value
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
    calculateWinner()
    return true
  }

  return {
    board: computed(() => board.value),
    currentPlayer: computed(() => currentPlayer.value),

    calculateWinner,
    isBoardFull, // should be computed and calc win too
    playMove, 
  }
}