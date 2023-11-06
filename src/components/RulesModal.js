import React from "react";
import T from "prop-types";
import Button from "@mui/material/Button";
import rules from "../media/rules.gif";
import Icon from "./Icon";

const RulesModal = ({ closeModal }) => (
  <div>
    <div className="dialog-container" onClick={closeModal}></div>
    <div className="dialog">
      <h2>How to play</h2>
      <Button className="close-btn" onClick={closeModal}>
        <Icon name="close" />
      </Button>
      <p>Remove as many pegs as you can.</p>
      <p>To remove a peg, jump over it with an adjacent peg and land in an empty spot.</p>
      <img src={rules} alt="rules" className="rules" />
    </div>
  </div>
);

RulesModal.propTypes = {
  closeModal: T.func,
};

export default RulesModal;
