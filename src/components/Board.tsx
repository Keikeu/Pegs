import React from "react";
import Peg from "./Peg";
import styled, { css } from "styled-components";
import { BOARD_TYPES, PEGS } from "../constants";
import { DndContext, DragEndEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { isInArray } from "../util";

const BoardBox = styled.div<{ $boardType: string }>`
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: grid;
  gap: 12px;

  @media (max-width: 480px) {
    height: 380px;
    width: 380px;
    max-height: 95vw;
    max-width: 95vw;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    gap: 8px;
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

const ShadowPeg = styled.div`
  display: block;
  border-radius: 50%;
  border: 2px solid var(--peg-empty);
  z-index: var(--z-index-0);
`;

interface Props {
  pegs: number[][];
  pegsToMove: number[][];
  activePegs: number[][];
  width: number;
  height: number;
  handlePegClick: (x: number, y: number) => void;
  boardType: string;
}

const Board = ({ pegs, pegsToMove, activePegs, width, height, handlePegClick, boardType }: Props) => {
  const pegIndexArray = Array.from({ length: width * height }, (_, i) => i);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    })
  );

  function calcX(index: number) {
    return Math.floor(index / width);
  }

  function calcY(index: number) {
    return index % width;
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const pegIndex = over.id;
      const x = calcX(+pegIndex);
      const y = calcY(+pegIndex);
      handlePegClick(x, y);
    }
  }

  function handleDragStart(event: DragStartEvent) {
    const { id: pegIndex } = event.active;
    const x = calcX(+pegIndex);
    const y = calcY(+pegIndex);
    if (!isInArray(activePegs, [x, y])) {
      handlePegClick(x, y);
    }
  }

  return (
    <>
      <BoardBox $boardType={boardType}>
        {pegIndexArray.map((pegIndex) => {
          const x = calcX(pegIndex);
          const y = calcY(pegIndex);
          const value = pegs[x][y];
          if (value === PEGS.NONE) return <Peg key={pegIndex} value={value} />;
          return <ShadowPeg key={pegIndex} />;
        })}
      </BoardBox>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges]}
      >
        <BoardBox $boardType={boardType}>
          {pegIndexArray.map((pegIndex) => {
            const x = calcX(pegIndex);
            const y = calcY(pegIndex);
            return (
              <Peg
                key={pegIndex}
                id={pegIndex}
                value={pegs[x][y]}
                handlePegClick={() => handlePegClick(x, y)}
                isMovable={isInArray(pegsToMove, [x, y]) || isInArray(activePegs, [x, y])}
              />
            );
          })}
        </BoardBox>
      </DndContext>
    </>
  );
};

export default Board;
