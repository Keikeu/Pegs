import React from "react";
import T from "prop-types";
import Button from "@mui/material/Button";
import Icon from "./Icon";

const Navigation = ({ undo, restart, toggleBoardsModal, toggleRulesModal }) => (
  <nav className="options">
    <Button className="options__btn" onClick={undo}>
      <Icon name="keyboard_backspace" />
      Undo
    </Button>
    <Button className="options__btn" onClick={restart}>
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
  </nav>
);

Navigation.propTypes = {
  undo: T.func,
  restart: T.func,
  toggleBoardsModal: T.func,
  toggleRulesModal: T.func,
};

export default Navigation;
