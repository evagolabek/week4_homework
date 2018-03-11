import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Square from '../components/Square'
import './Board.css'


export class Board extends PureComponent {
  static propTypes = {
    board: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number) //array on an array of numbers = array of rows
    ).isRequired //when board is created it requires array of array of numbers called board
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
    return (
      <Square
      key={index}
      value={value}
      row={index}
      col={rowIndex}
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

const mapStateToProps = ({ board }) => ({ board })

// Then pass it to connect:
export default connect(mapStateToProps)(Board)
