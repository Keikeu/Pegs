import React from 'react';
import Peg from './Peg.js';

class Board extends React.Component {
  renderPeg(i) {
    return (
      <Peg
        key={i}
        value={this.props.pegs[Math.floor(i/this.props.width)][i%this.props.height]}
        onClick={() => this.props.onClick(Math.floor(i/this.props.width), i%this.props.height)}
      />
    );
  }

  render() {
    const board = [];

    for (let i = 0; i < this.props.width * this.props.height; i++) {
      board.push(this.renderPeg(i))
    }

    return (
      <div className={"board " + this.props.boardType}>
        {board}
      </div>
    )
  }
}

export default Board;
