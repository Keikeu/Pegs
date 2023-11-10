import React from "react";
import T from "prop-types";
import { PEGS } from "../constants";
import styled, { css } from "styled-components";

const PegShape = styled.div`
  width: 80%;
  height: 80%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  margin: 5px;
  transition: box-shadow 0.1s ease-in-out;
  z-index: var(--z-index-above);

  ${({ variant }) => {
    if (variant === PEGS.EMPTY) {
      return css`
        border: 2px solid var(--peg-empty);
      `;
    } else if (variant === PEGS.REGULAR) {
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

const Peg = ({ value, handlePegClick }) => <PegShape variant={value} onClick={handlePegClick} />;

Peg.propTypes = {
  handlePegClick: T.func,
  value: T.number,
};

export default Peg;
