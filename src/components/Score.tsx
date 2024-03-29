import React from "react";
import styled from "styled-components";

const ScoreBox = styled.div`
  position: absolute;
  bottom: 40px;
  left: 40px;

  @media (max-width: 768px) {
    bottom: 64px;
    left: 32px;
  }
  @media (max-width: 480px) {
    bottom: 48px;
    left: 16px;
    font-size: 14px;
  }
`;

interface Props {
  stepNumber: number;
  pegNumber: number;
  boardType: string;
}

const Score = ({ stepNumber, pegNumber, boardType }: Props) => {
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

export default Score;
