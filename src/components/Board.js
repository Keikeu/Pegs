import React from "react";
import T from "prop-types";
import Peg from "./Peg.js";

const Board = ({ pegs, width, height, handlePegClick, boardType }) => {
  const pegIndexArray = Array.from({ length: width * height }, (_, i) => i);

  return (
    <div className={"board " + boardType}>
      {pegIndexArray.map((pegIndex) => {
        const x = Math.floor(pegIndex / width);
        const y = pegIndex % width;
        return <Peg key={pegIndex} value={pegs[x][y]} handlePegClick={() => handlePegClick(x, y)} />;
      })}
    </div>
  );
};

Board.propTypes = {
  pegs: T.array,
  width: T.number,
  height: T.number,
  handlePegClick: T.func,
  boardType: T.string,
};

export default Board;
