import React, { Component } from 'react';
import styled from 'styled-components'

import { connect } from 'react-redux'
import { MOVE_EMPTY, UPDATE_MOVE } from '../action'

const Item = styled.div`
	width: 25%;
	height: 25%;
	padding: 10px;
	position: absolute;
	transition: .5s;
	@media (max-width: 667px) {
		padding: 6px
	}
`

const ItemContent = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #efefef;
	background-color: #313747;
	color: white;
	border-radius: 12px;
	font-size: 36px;
	cursor: pointer;
	transition: 0.5s;
	&:hover {
		background-color: #252a37
	}
	@media (max-width: 667px)  {
		font-size: 28px;
	}
`

const mapStateToProps = state => {
	const { emptyArray, complete } = state
	return { emptyArray, complete }
}

const mapDispatchToProps = dispatch => {
	return {
		moveEmpty: index => {
			dispatch(MOVE_EMPTY(index))
		},
		updateMove: (num) => {
			dispatch(UPDATE_MOVE(num))
		}
	}
}

class PuzzleItem extends Component {

	handleClick = () => {
		const { position } = this.props.item
		const { emptyArray, index, complete } = this.props
    /** 差幾列 */
    const col = Math.abs(emptyArray[0] - position[0]);
    /** 差幾行 */
		const row = Math.abs(emptyArray[1] - position[1]);
    /** 判斷該物件是否相鄰 */
		const isNeighbor = col + row === 1;
		if (!complete && isNeighbor) {
			/** 改變點選物件座標 */
			this.props.moveEmpty(index)
			/** 更新計步器 */
			this.props.updateMove(true)
		}
	}

	render() {
		const { number, position } = this.props.item
		const { itemWidth } = this.props
		/** 物件 style */
		const styleObject = {
			top: `${position[1] * itemWidth}px`,
			left: `${position[0] * itemWidth}px`
		}
		return(
			<Item style={ styleObject }>
				<ItemContent onClick={ this.handleClick }>
					{ number }
				</ItemContent>
			</Item>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PuzzleItem)