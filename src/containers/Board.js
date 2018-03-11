import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Square from '../components/Square'
import './Board.css'
import {duplicateRows, duplicateCols, threeOrMoreInARow, cols} from '../lib/game'


export class Board extends PureComponent {
  static propTypes = {
    board: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number) //array on an array of numbers = array of rows
    ).isRequired, //when board is created it requires array of array of numbers called board
    dupeRows: PropTypes.arrayOf(PropTypes.number),
    dupeCols: PropTypes.arrayOf(PropTypes.number),

    errors: PropTypes.shape({
      rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
      cols: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    }).isRequired
  }

//creates div called row with key = index each time it is called, then inside the div it calls renderSquare for each element, below
  renderRow = (row, index) => {
    return (
      <div key={index} className="row">
        {row.map(this.renderSquare(index))}
      </div>
    )
  }

// creates square component each time its called, plus list of parameters square components needs
  renderSquare = rowIndex => (value, index) => {  //square is a component that we use several times
    const {dupeRows, dupeCols, errors, board} = this.props

    const dupe = dupeCols.includes(index) || dupeRows.includes(rowIndex)

    const error = errors.cols[index].includes(rowIndex) ||
      errors.rows[rowIndex].includes(index) ||
      board[rowIndex].filter(v => v !== 0 && v === value).length > board.length / 2 ||
      cols(board)[index].filter(v => v !== 0 && v === value).length > board.length / 2
//copied paste, don't understand

    return (
      <Square
      key={index}
      value={value}
      row={rowIndex}
      col={index}
      dupe={dupe}
      error={error}
      />
    )
  }

//makes a div of class Board, inisde of it for each row we call renderRow function above
  render() {
    return (
      <div className="Board">
        {this.props.board.map(this.renderRow)}
      </div>
    )
  }
}

const mapStateToProps = ({ board }) => ({
  board,
  dupeRows: duplicateRows(board),
  dupeCols: duplicateCols(board),
  errors: {
    rows: board.map(threeOrMoreInARow),
    cols: cols(board).map(threeOrMoreInARow)
  }

 })

// Then pass it to connect:
export default connect(mapStateToProps)(Board)
