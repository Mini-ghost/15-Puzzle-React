import React, { Component } from 'react';
import styled from 'styled-components'

import { connect } from 'react-redux'
import { INIT_PUZZLE, TOGGLE_PLAY, SET_COMPLETE, UPDATE_MOVE } from './action'

// components
import PuzzleItem from './components/PuzzleItem'
import PuzzleCover from './components/PuzzleCover'

const sec = 0.5
/** 外層容器 */
const Content = styled.div`
  font-family: "Shadows Into Light", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #61dafb;
  margin-top: 60px;
  user-select: none;
`
const Title = styled.h1`
  font-weight: bold;
  font-size: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
`
const Moves = styled.p`
  font-weight: bold;
  font-size: 24px;
  margin-top: 16px;
  margin-bottom: 16px;

`
const Puzzle = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  margin-top: 2.5vw;
  margin-right: auto;
  margin-left: auto;
  box-shadow: 0 0 10px rgba(0, 0 ,0 , .35);
  border-radius: 16px;
  overflow: hidden;
  transition: ${sec}s;
  background-color: #1f2229;
  @media (max-width: 667px) {
    width: 320px;
    height: 320px
  }
`

const PuzzleContent = styled.div`
  padding: 5px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const PuzzleGroup = styled.div`
  position: relative;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  display: flex;
  flex-wrap: wrap;
  font-size: 2.125rem;
  @media (max-width: 667px) {
    width: calc(100% - 6px);
    height: calc(100% - 6px)
  }
`
const Reset = styled.div`
  font-size: 36px;
  margin-top: 18px;
  margin-bottom: 18px
`

const ResetItem = styled.div`
  position: relative;
  color: #61dafb;
  font-weight: bold;
  cursor: pointer
`

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => {
  return {
    initPuzzle: (num = 4) => {
      dispatch(SET_COMPLETE(false))
      dispatch(INIT_PUZZLE(num))
    },
    togglePlay: () => {
      dispatch(TOGGLE_PLAY())
    },
    setComplete: (type) => {
      dispatch(SET_COMPLETE(type))
    },
		updateMove: (update) => {
			dispatch(UPDATE_MOVE(update))
		}
  }
}

class App extends Component {

  state = { width: 0 }

  get itemWidth() {
    return this.state.width > 667? 120 : 77
  }

  componentDidUpdate(prevProps) {
    const { puzzle, play } = this.props
    const complete = puzzle.every(item => item.position.join('') === item.value.join(''))
    if (complete && play) {
      this.props.setComplete(complete)
      setTimeout(() => { this.props.togglePlay() }, 1000);
    }
  }

  componentDidMount() {
    this.getWindowWidth()
    window.addEventListener('resize', this.getWindowWidth)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getWindowWidth)
  }

  getWindowWidth = () => {
    this.setState(() => ({ width: window.innerWidth }))
  }

  /** 開始遊戲 */ 
  handleStart = () => {
    this.props.initPuzzle();
    this.props.togglePlay()
  }

  /** 重新開始 */
  handleReset = () => {
    this.props.initPuzzle();
    this.props.updateMove(false)
  }

  render() {
    const { puzzle, complete, move, play } = this.props
    const { itemWidth } = this
    return (
      <Content>
        <Title> 15 puzzle </Title>
        <Moves> MOVE{ move > 1 && 'S' }：{ move }</Moves>
        <Puzzle>
          <PuzzleContent>
            {
              !play && <PuzzleCover playToggle={ this.handleStart } complete={ complete }/>
            }
            <PuzzleGroup>
              {
                puzzle.map((item, index) => (
                  <PuzzleItem
                    item={item}
                    index={index}
                    itemWidth={itemWidth}
                    key={item.number}
                  />
                ))
              }
            </PuzzleGroup>
          </PuzzleContent>
        </Puzzle>
        {
          play && <Reset>
            <ResetItem onClick={() => this.handleReset()}>reset</ResetItem>
          </Reset>
        }
      </Content>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)