import React from "react";
import T from "prop-types";
import Peg from "./Peg.js";
import styled, { css } from "styled-components";
import { BOARD_TYPES } from "../constants.js";

const BoardBox = styled.div`
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: grid;

  @media (max-width: 480px) {
    height: 95vw;
    width: 95vw;
    max-height: 380px;
    max-width: 380px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  ${({ $boardType }) => {
    if ($boardType === BOARD_TYPES.TUTORIAL) {
      return css`
        height: 260px;
        width: 260px;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(4, 1fr);

        @media (max-width: 480px) {
          max-height: 200px;
          max-width: 200px;
        }
      `;
    } else if ($boardType === BOARD_TYPES.ENGLISH) {
      return css`
        height: 440px;
        width: 440px;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: repeat(7, 1fr);
      `;
    } else if ($boardType === BOARD_TYPES.GERMAN) {
      return css`
        height: 510px;
        width: 510px;
        grid-template-columns: repeat(9, 1fr);
        grid-template-rows: repeat(9, 1fr);
      `;
    } else if ($boardType === BOARD_TYPES.ASYMMETRICAL) {
      return css`
        height: 480px;
        width: 480px;
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(8, 1fr);
      `;
    } else if ($boardType === BOARD_TYPES.SQUARE) {
      return css`
        height: 400px;
        width: 400px;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(6, 1fr);
      `;
    } else if ($boardType === BOARD_TYPES.DIAMOND) {
      return css`
        height: 510px;
        width: 510px;
        grid-template-columns: repeat(9, 1fr);
        grid-template-rows: repeat(9, 1fr);
      `;
    }
  }}
`;

const Board = ({ pegs, width, height, handlePegClick, boardType }) => {
  const pegIndexArray = Array.from({ length: width * height }, (_, i) => i);

  return (
    <BoardBox $boardType={boardType}>
      {pegIndexArray.map((pegIndex) => {
        const x = Math.floor(pegIndex / width);
        const y = pegIndex % width;
        return <Peg key={pegIndex} value={pegs[x][y]} handlePegClick={() => handlePegClick(x, y)} />;
      })}
    </BoardBox>
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
