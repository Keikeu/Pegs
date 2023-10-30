import React from "react";

const pegsMap = {
  "-1": "",
  0: "peg peg-blank",
  1: "peg peg-alive",
  2: "peg peg-highlighted",
  3: "peg peg-active",
};

const Peg = ({ value, onClick }) => <div className={pegsMap[value]} onClick={onClick}></div>;

export default Peg;
