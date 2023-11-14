import React from "react";
import { PEGS } from "../constants";
import styled, { css } from "styled-components";
import { useDraggable, useDroppable } from "@dnd-kit/core";

const PegShape = styled.div<{ variant: number }>`
  border-radius: 50%;
  transition: box-shadow 0.1s ease-in-out;
  position: relative;
  touch-action: none;

  ${({ variant }) => {
    if (variant === PEGS.REGULAR) {
      return css`
        background-color: var(--peg-100);
        background-image: linear-gradient(to top, var(--peg-100), var(--peg-110));
        box-shadow: var(--shadow-1);
        cursor: pointer;

        &:hover {
          box-shadow: var(--shadow-2);
        }

        @media (max-width: 768px) {
          &:hover {
            box-shadow: var(--shadow-1);
          }
        }
      `;
    } else if (variant === PEGS.EMPTY_HIGHLIGHTED) {
      return css`
        background-color: var(--background-highlight);
        border: 2px solid var(--highlight);
        cursor: pointer;
      `;
    } else if (variant === PEGS.ACTIVE) {
      return css`
        background-color: var(--peg-100);
        background-image: linear-gradient(to top, var(--peg-100), var(--peg-110));
        box-shadow: var(--shadow-2);
        border: 2px solid var(--highlight);
        cursor: pointer;

        &:active {
          -webkit-tap-highlight-color: transparent;
        }
      `;
    }
  }}
`;

interface Props {
  id?: number;
  value: number;
  handlePegClick?: () => void;
  isMovable?: boolean;
}

const Peg = ({ id, value, handlePegClick, isMovable }: Props) => {
  const { isOver, setNodeRef: setDroppableNodeRef } = useDroppable({
    id: String(id),
  });
  const droppableStyle = {
    backgroundColor: isOver ? "rgba(0, 0, 0, 0.15)" : undefined,
  };

  const {
    attributes,
    listeners,
    setNodeRef: setDraggableNodeRef,
    transform,
  } = useDraggable({
    id: String(id),
  });

  const draggableStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 1,
      }
    : undefined;

  if (value === PEGS.EMPTY_HIGHLIGHTED) {
    return <PegShape variant={value} onClick={handlePegClick} ref={setDroppableNodeRef} style={droppableStyle} />;
  }

  if (isMovable && (value === PEGS.ACTIVE || value === PEGS.REGULAR)) {
    return (
      <PegShape
        variant={value}
        onClick={handlePegClick}
        ref={setDraggableNodeRef}
        style={draggableStyle}
        {...listeners}
        {...attributes}
      />
    );
  }

  return <PegShape variant={value} onClick={handlePegClick} />;
};

export default Peg;
