import React from "react";
import T from "prop-types";
import rules from "../media/images/rules.gif";
import Modal from "./Modal";
import styled from "styled-components";

const RulesImg = styled.img`
  margin: 24px auto 0;
  width: 172px;

  @media (max-width: 480px) {
    width: 104px;
  }
`;

const RulesModal = ({ closeModal }) => (
  <Modal closeModal={closeModal}>
    <h2>How to play</h2>
    <p>Remove as many pegs as you can.</p>
    <p>To remove a peg, jump over it with an adjacent peg and land in an empty spot.</p>
    <RulesImg src={rules} alt="rules" />
  </Modal>
);

RulesModal.propTypes = {
  closeModal: T.func,
};

export default RulesModal;
