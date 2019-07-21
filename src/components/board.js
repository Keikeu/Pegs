import React from 'react';
import Peg from './peg.js';

class Board extends React.Component {
  renderPeg(i) {
    return (
      <Peg
        key={i}
        value={this.props.pegs[Math.floor(i/7)][i%7]}
        onClick={() => this.props.onClick(Math.floor(i/7),i%7)}
      />
    );
  }

  render() {
    const board = [];

    for(let i=0; i<49; i++) {
      board.push(this.renderPeg(i))
    }

    return(
      <div className="board">
        {board}
      </div>
    )
  }
}

export default Board;
