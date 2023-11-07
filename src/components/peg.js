import React from "react";
import T from "prop-types";
import { PEGS } from "../constants";

const pegsMap = {
  [PEGS.NONE]: "",
  [PEGS.EMPTY]: "peg peg-blank",
  [PEGS.REGULAR]: "peg peg-alive",
  [PEGS.EMPTY_HIGHLIGHTED]: "peg peg-highlighted",
  [PEGS.ACTIVE]: "peg peg-active",
};

const Peg = ({ value, handlePegClick }) => <div className={pegsMap[value]} onClick={handlePegClick} />;

Peg.propTypes = {
  handlePegClick: T.func,
  value: T.number,
};

export default Peg;
