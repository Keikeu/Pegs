import React from 'react';

const Score = ({ stepNumber, pegsNumber, boardType }) => {
  let bsm = localStorage.getItem('best-score-moves-' + boardType);
  let bsp = localStorage.getItem('best-score-pegs-' + boardType);
  
  return (
    <div className="score">
      <div>Moves: {Math.floor(stepNumber/2)}</div>
      <div>Pegs left: {pegsNumber}</div>
      <div>
        Best score for this board: 
        {bsm && <span> {bsm} moves </span>} 
        {!bsm && <span> - </span>} 
        /
        {bsp > 1 && <span> {bsp} pegs left </span>}
        {bsp === '1' && <span> {bsp} peg left </span>}
        {!bsp && <span> - </span>} 
      </div>
    </div>
  );
};

export default Score;
