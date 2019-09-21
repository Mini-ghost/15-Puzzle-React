import React from 'react';
import styled from 'styled-components'

import Completed from './Completed'

const Cover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  flex-direction: column;
  background-color: rgba(37, 38, 39, 0.5);
  border-radius: 16px;
  font-weight: bold;
  z-index: 9
`
const Button = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
  color: #61dafb;
  font-size: 72px;
`

export default function PuzzleCover({ complete, playToggle }) {
  return (
    <Cover>
      { complete && <Completed /> }
      <Button onClick={ () => playToggle() }>Play</Button>
    </Cover>
  )
}
