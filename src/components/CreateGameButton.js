import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './CreateGameButton.css'
import { connect } from 'react-redux'
import { createGame } from '../actions/game'

export class CreateGameButton extends PureComponent {
  static propTypes = {
    createGame: PropTypes.func.isRequired,
    label: PropTypes.string
  }

  handleClick = () => {
    this.props.createGame(6)
  }

  render() {
    return (
      <button
        onClick={this.handleClick}
        className="CreateGameButton"
      >
        { this.props.label || 'New Game'}
      </button>
    )
  }
}

export default connect(null, { createGame })(CreateGameButton)
