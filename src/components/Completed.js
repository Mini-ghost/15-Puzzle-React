import React from 'react'
import styled from 'styled-components'

const Content = styled.div`
  margin: 2rem 0
`
const Title = styled.h2`
  font-size: 36px;
  color: #ffe564;
`

const Depiction = styled.p`
font-size: 16px;
margin-top: 8px;
margin-botton: 8px
color: rgb(255, 229, 100);
letter-spacing: 1.5px
`

export default function Completed() {
  return (
    <Content>
      <Title>Congratulations </Title>
      <Depiction>
        You have successfully completed this 
        <strong> 15 puzzle </strong>
      </Depiction>
    </Content>
  );
}