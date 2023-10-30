import React from "react";
import T from "prop-types";
import Button from "@material-ui/core/Button";
import Icon from "./Icon";

const Navigation = ({ jumpTo, toggleBoardsModal, toggleRulesModal, pegsActive, stepNumber }) => (
  <div className="options">
    <Button className="options__btn" onClick={() => jumpTo(pegsActive.length === 0 ? stepNumber - 2 : stepNumber - 1)}>
      <Icon name="keyboard_backspace" />
      Undo
    </Button>
    <Button className="options__btn" onClick={() => jumpTo(0)}>
      <Icon name="replay" />
      Restart
    </Button>
    <Button className="options__btn" onClick={() => toggleBoardsModal()}>
      <Icon name="image_aspect_ratio" />
      Other boards
    </Button>
    <Button className="options__btn" onClick={() => toggleRulesModal()}>
      <Icon name="help_outline" />
      How to play
    </Button>
  </div>
);

Navigation.propTypes = {
  jumpTo: T.func,
  toggleBoardsModal: T.func,
  toggleRulesModal: T.func,
  pegsActive: T.array,
  stepNumber: T.number,
};

export default Navigation;
