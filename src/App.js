import React, { Component } from 'react';
import './App.css';
import Board from './containers/Board'
import CreateGameButton from './components/CreateGameButton'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="title">0hh1</h1>
        <Board />
        <CreateGameButton />
      </div>
    );
  }
}

export default App;
