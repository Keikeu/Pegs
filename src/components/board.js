import React from "react";
import T from "prop-types";
import Peg from "./Peg.js";

const Board = ({ pegs, width, height, onClick, boardType }) => {
  function renderPeg(i) {
    return (
      <Peg
        key={i}
        value={pegs[Math.floor(i / width)][i % height]}
        onClick={() => onClick(Math.floor(i / width), i % height)}
      />
    );
  }

  const board = [];

  for (let i = 0; i < width * height; i++) {
    board.push(renderPeg(i));
  }

  return <div className={"board " + boardType}>{board}</div>;
};

Board.propTypes = {
  pegs: T.array,
  width: T.number,
  height: T.number,
  onClick: T.func,
  boardType: T.string,
};

export default Board;
