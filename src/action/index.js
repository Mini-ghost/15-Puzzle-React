/** 初始化遊戲 */
const INIT_PUZZLE = num => {
  return {
    type: 'INIT_PUZZLE',
    num
  }
}

/** 滑動物件 */
const MOVE_EMPTY = index => {
  return {
    type: 'MOVE_EMPTY',
    index
  }
}

const UPDATE_MOVE = () => {
  return {
    type: 'UPDATE_MOVE'
  }
}

const TOGGLE_PLAY = () => {
  return {
    type: 'TOGGLE_PLAY'
  }
}

const SET_COMPLETE = complete => {
  return {
    type: 'SET_COMPLETE',
    complete
  }
}

export {
  INIT_PUZZLE,
  MOVE_EMPTY,
  UPDATE_MOVE,
  TOGGLE_PLAY,
  SET_COMPLETE
}