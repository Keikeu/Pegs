import React from "react";
import rules from "../media/images/rules.gif";
import Modal from "./Modal";
import styled from "styled-components";
import { Button } from "@mui/material";

const RulesImg = styled.img`
  margin: 24px auto;
  width: 172px;

  @media (max-width: 480px) {
    width: 104px;
  }
`;

interface Props {
  closeModal: () => void;
  playTutorial: () => void;
}

const RulesModal = ({ closeModal, playTutorial }: Props) => (
  <Modal closeModal={closeModal}>
    <h2>How to play</h2>
    <p>Remove as many pegs as you can.</p>
    <p>To remove a peg, jump over it with an adjacent peg and land in an empty spot.</p>
    <RulesImg src={rules} alt="rules" />
    <Button variant="outlined" onClick={playTutorial}>
      Play tutorial
    </Button>
  </Modal>
);

export default RulesModal;
