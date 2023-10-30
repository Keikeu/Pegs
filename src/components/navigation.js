import React from "react";
import Button from "@material-ui/core/Button";

const Navigation = ({ jumpTo, toggleBoardsModal, toggleRulesModal, pegsActive, stepNumber }) => (
  <div className="options">
    <Button className="options__btn" onClick={() => jumpTo(pegsActive.length === 0 ? stepNumber - 2 : stepNumber - 1)}>
      <i className="material-icons">keyboard_backspace</i>
      Undo
    </Button>
    <Button className="options__btn" onClick={() => jumpTo(0)}>
      <i className="material-icons">replay</i>
      Restart
    </Button>
    <Button className="options__btn" onClick={() => toggleBoardsModal()}>
      <i className="material-icons">image_aspect_ratio</i>
      Other boards
    </Button>
    <Button className="options__btn" onClick={() => toggleRulesModal()}>
      <i className="material-icons">help_outline</i>
      How to play
    </Button>
  </div>
);

export default Navigation;
