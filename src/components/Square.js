import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './Square.css'
import { move } from '../actions/game'
import { connect } from 'react-redux'


class Square extends PureComponent {
  static PropTypes = {
    value: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    col: PropTypes.number.isRequired,
    locked: PropTypes.bool,
    dupe: PropTypes.bool,
    error: PropTypes.bool
  }

  handleClick = () => {
    const row = this.props.row
    const col = this.props.col
    const locked = this.props.locked
    if (locked) return

    this.props.move(row,col)
  }

  makeClassName() {
    const {value, locked, dupe, error} = this.props

    let classNameArray = ['Square']
    classNameArray.push(`fill-${value || 0}`)
    if (locked) classNameArray.push('locked')
    if (dupe) classNameArray.push('dupe')
    if (error) classNameArray.push('error')

    return classNameArray.join(' ')
  }

  render() {
    return (
      <div className={this.makeClassName()}
      onClick={this.handleClick}
      />

    )
  }
}

const mapStateToProps = ({ locked }, { row, col }) => ({
  locked: locked.filter(l => l[0] === row && l[1] === col).length > 0
})

export default connect(mapStateToProps, { move })(Square)
