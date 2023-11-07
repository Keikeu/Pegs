import React from "react";
import T from "prop-types";

const Score = ({ stepNumber, pegNumber, boardType }) => {
  const bestScoreMoves = localStorage.getItem("best-score-moves-" + boardType);
  const bestScorePegs = localStorage.getItem("best-score-pegs-" + boardType);

  return (
    <div className="score">
      <div>Moves: {Math.floor(stepNumber / 2)}</div>
      <div>Pegs left: {pegNumber}</div>
      <div>
        Best score for this board:
        {bestScoreMoves ? `${bestScoreMoves} moves` : "-"}
        &nbsp;/&nbsp;
        {bestScorePegs ? `${bestScorePegs} ${bestScorePegs === "1" ? "peg" : "pegs"} left` : "-"}
      </div>
    </div>
  );
};

Score.propTypes = {
  stepNumber: T.number,
  pegNumber: T.number,
  boardType: T.string,
};

export default Score;
