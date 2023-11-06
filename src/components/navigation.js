import React from "react";
import T from "prop-types";
import Button from "@mui/material/Button";
import Icon from "./Icon";

const Navigation = ({ jumpToPointInHistory, toggleBoardsModal, toggleRulesModal, activePegs, stepNumber }) => (
  <div className="options">
    <Button
      className="options__btn"
      onClick={() => jumpToPointInHistory(activePegs.length === 0 ? stepNumber - 2 : stepNumber - 1)}
    >
      <Icon name="keyboard_backspace" />
      Undo
    </Button>
    <Button className="options__btn" onClick={() => jumpToPointInHistory(0)}>
      <Icon name="replay" />
      Restart
    </Button>
    <Button className="options__btn" onClick={toggleBoardsModal}>
      <Icon name="image_aspect_ratio" />
      Other boards
    </Button>
    <Button className="options__btn" onClick={toggleRulesModal}>
      <Icon name="help_outline" />
      How to play
    </Button>
  </div>
);

Navigation.propTypes = {
  jumpToPointInHistory: T.func,
  toggleBoardsModal: T.func,
  toggleRulesModal: T.func,
  activePegs: T.array,
  stepNumber: T.number,
};

export default Navigation;
