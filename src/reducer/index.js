/** 數字轉座標 */
const initMultiArrays = num => {
  return [ num % 4, Math.floor(num / 4) ]
}
/** 初始化拼圖資料 */
const initPuzzle = num => {
  const sum = num * num
  const puzzle = []
  for (let number = 1; number <= sum; number++) {
    const value = initMultiArrays(number - 1)
    puzzle.push({ number, value, position: [0, 0]})
  }
  return puzzle
}
/** 比對資料是否有解答 */
const checkResolvable = ary=> {
  /** 16 的序號 */
  const space = ary.findIndex(item => item.number === 16)
  /** 16 的列（X軸位置） */
  const spaceX = initMultiArrays(space)[0] + 1
  // splice 會動到原本的陣列，所以這裡解構出一個陣列來操作
  const newAry = (ary => {
    ary.splice(space, 1)
    return ary
  })([...ary])
  /** 逆序列數 */
  const count = countComputed(newAry)
  return count % 2 + spaceX % 2 !== 0
}
/** 逆序列累加 */
const countComputed = ary => {
  let count = 0
  ary.forEach((item, index, _ary) => {
    const length = ary.length
    let _index = index + 1
    while (_index < length) {
      // item.number 後面的數字只要有比我小的就加 1
      if (item.number > _ary[_index].number) count++
      _index++
    }
  })
  return count
}

/** 初始化 puzzle 資料 */
const INIT_PUZZLE = (state, { num }) => {
  const puzzle = initPuzzle(num)
  let emptyIndex = 0
  let emptyArray = [0, 0]
  let resolvable = false
  while (!resolvable) {
    /** 打亂初始化的 puzzle 資料 */
    puzzle.sort(() => (Math.random() > 0.5 ? 1 : -1))
    resolvable = checkResolvable(puzzle)
  }
  /** 排組亂數後賦予定位 */
  puzzle.forEach((item, index) => {
    item.position = initMultiArrays(index)
  })
  /** 設定空格資料 */
  emptyIndex = puzzle.findIndex(item => item.number === 16)
  emptyArray = initMultiArrays(emptyIndex)
  puzzle.splice(emptyIndex, 1)

  return { ...state, puzzle, emptyArray }
}
/** 滑塊移動，改變現有 state */
const MOVE_EMPTY = (state, { index }) => {
  let { puzzle, emptyArray } = state
  const { position } = puzzle[index]
  const emptyPosition = [...emptyArray]
  emptyArray = [...position]
  puzzle = puzzle.map((item, id) => {
    if (id === index) return {...item,position: emptyPosition}
    return item
  })
  return { ...state, puzzle, emptyArray }
}

/** 更新計步器 */
const UPDATE_MOVE = (state, { update }) => {
  let { move } = state
  update? move += 1 : move = 0
  return { ...state, move }
}

/** 遊戲狀態切換 */
const TOGGLE_PLAY = (state, action) => {
  const { play } = state
  return { ...state, play: !play }
}

const SET_COMPLETE = (state, { complete }) => {
  return { ...state, complete }
}

const storeState = {
  puzzle: [],
  emptyArray: [],
  move: 0,
  complete: false,
  play: false
}

const puzzleStore = (state = storeState, action) => {
  switch (action.type) {
    case 'INIT_PUZZLE':
      return INIT_PUZZLE(state, action)
    case 'MOVE_EMPTY':
      return MOVE_EMPTY(state, action)
    case 'UPDATE_MOVE':
      return UPDATE_MOVE(state, action) 
    case 'TOGGLE_PLAY':
      return TOGGLE_PLAY(state, action)
    case 'SET_COMPLETE':
      return SET_COMPLETE(state, action)
    default:
      return state
  }
}

export default puzzleStore