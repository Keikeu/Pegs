import React from "react";
import T from "prop-types";
import styled from "styled-components";

const ScoreBox = styled.div`
  position: absolute;
  bottom: 50px;
  left: 50px;

  @media (max-width: 768px) {
    bottom: 60px;
    left: 30px;
  }
  @media (max-width: 480px) {
    bottom: 50px;
    left: 20px;
    font-size: 14px;
  }
`;

const Score = ({ stepNumber, pegNumber, boardType }) => {
  const bestScoreMoves = localStorage.getItem("best-score-moves-" + boardType);
  const bestScorePegs = localStorage.getItem("best-score-pegs-" + boardType);

  return (
    <ScoreBox>
      <div>Moves: {Math.floor(stepNumber / 2)}</div>
      <div>Pegs left: {pegNumber}</div>
      <div>
        Best score for this board:&nbsp;
        {bestScoreMoves ? `${bestScoreMoves} moves` : "-"}
        &nbsp;/&nbsp;
        {bestScorePegs ? `${bestScorePegs} ${bestScorePegs === "1" ? "peg" : "pegs"} left` : "-"}
      </div>
    </ScoreBox>
  );
};

Score.propTypes = {
  stepNumber: T.number,
  pegNumber: T.number,
  boardType: T.string,
};

export default Score;
