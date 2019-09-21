import React, { Component } from 'react';
import styled from 'styled-components'

import { connect } from 'react-redux'
import { INIT_PUZZLE, TOGGLE_PLAY, SET_COMPLETE } from './action'

// components
import PuzzleItem from './components/PuzzleItem'
import PuzzleCover from './components/PuzzleCover'

const sec = 5
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
  font-size: 40px;
`
const Moves = styled.p`
  font-weight: bold;
  font-size: 24px;

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
`
const Reset = styled.div` 
`

const ResetItem = styled.div`
  position: relative;
  color: #61dafb;
  font-size: 36px;
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
    }
  }
}

class App extends Component {

  startPuzzle = () => {
    this.props.initPuzzle();
    this.props.togglePlay()
  }

  componentDidUpdate(prevProps) {
    const { puzzle, play } = this.props
    const complete = puzzle.every(item => item.position.join('') === item.value.join(''))
    if (complete && play) {
      this.props.setComplete(complete)
      setTimeout(() => {
        this.props.togglePlay()
      }, 1000);
    }
  }

  render() {
    const { puzzle, complete, move, play } = this.props
    return (
      <Content>
        <Title> 15 puzzle </Title>
        <Moves> MOVE{ move > 1 && 'S' }：{ move }</Moves>
        <Puzzle>
          <PuzzleContent>
            {
              !play && <PuzzleCover playToggle={ this.startPuzzle } complete={ complete }/>
            }
            <PuzzleGroup>
              {
                puzzle.map((item, index) => (
                  <PuzzleItem item={item} index={index} key={item.number}/>
                ))
              }
            </PuzzleGroup>
          </PuzzleContent>
        </Puzzle>
        {
          play && <Reset>
            <ResetItem onClick={() => this.props.initPuzzle()}>reset</ResetItem>
          </Reset>
        }
      </Content>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)