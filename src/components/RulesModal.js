import React from "react";
import T from "prop-types";
import Button from "@material-ui/core/Button";
import rules from "../media/rules.gif";
import Icon from "./Icon";

const RulesModal = ({ onClose }) => (
  <div>
    <div className="dialog-container" onClick={onClose}></div>
    <div className="dialog">
      <h2>How to play</h2>
      <Button className="close-btn" onClick={onClose}>
        <Icon name="close" />
      </Button>
      <p>Remove as many pegs as you can.</p>
      <p>To remove a peg, jump over it with an adjacent peg and land in an empty spot.</p>
      <img src={rules} alt="rules" className="rules" />
    </div>
  </div>
);

RulesModal.propTypes = {
  onClose: T.func,
};

export default RulesModal;
