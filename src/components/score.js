import React from 'react';

const Score = ({ stepNumber, pegsNumber }) => (
  <div className="score">
    <div>Moves: {Math.floor(stepNumber/2)}</div>
    <div>Pegs left: {pegsNumber}</div>
  </div>
);

export default Score;
