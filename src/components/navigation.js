import React from "react";
import T from "prop-types";
import Button from "@mui/material/Button";
import Icon from "./Icon";
import styled from "styled-components";
import { styled as styledMUI } from "@mui/system";

const Options = styled.nav`
  text-align: center;
  color: var(--text);
`;

const OptionsButton = styledMUI(Button)`
  font-size: 14px;
	font-weight: 600;
	letter-spacing: -0.2px;
  color: inherit;

	i {
	  margin-right: 4px;
	}

	@media (max-width: 480px) {
    font-size: 12px;
		i {
    	font-size: 20px;
  	}
	}
`;

const Navigation = ({ undo, restart, toggleBoardsModal, toggleRulesModal }) => (
  <Options>
    <OptionsButton onClick={undo}>
      <Icon name="keyboard_backspace" />
      Undo
    </OptionsButton>
    <OptionsButton onClick={restart}>
      <Icon name="replay" />
      Restart
    </OptionsButton>
    <OptionsButton onClick={toggleBoardsModal}>
      <Icon name="image_aspect_ratio" />
      Other boards
    </OptionsButton>
    <OptionsButton onClick={toggleRulesModal}>
      <Icon name="help_outline" />
      How to play
    </OptionsButton>
  </Options>
);

Navigation.propTypes = {
  undo: T.func,
  restart: T.func,
  toggleBoardsModal: T.func,
  toggleRulesModal: T.func,
};

export default Navigation;
