import React from "react";
import T from "prop-types";
import Button from "@mui/material/Button";
import { GAME_STATES } from "../constants";
import Icon from "./Icon";
import Modal from "./Modal";

const StateModal = ({ gameState, stepNumber, pegNumber, closeModal, restart, playEnglishBoard }) => {
  if (gameState === null) {
    return null;
  } else if (gameState === GAME_STATES.DEFEAT) {
    return (
      <Modal closeModal={closeModal} variant="defeat">
        <Icon name="sentiment_very_dissatisfied" />
        <h2>You lost</h2>
        <p>Moves: {Math.floor(stepNumber / 2)}</p>
        <p>Pegs left: {pegNumber}</p>
        <p>Better luck next time!</p>
        <Button variant="outlined" onClick={restart}>
          Try again
        </Button>
      </Modal>
    );
  } else if (gameState === GAME_STATES.PART_WIN) {
    return (
      <Modal closeModal={closeModal} variant="win">
        <Icon name="sentiment_satisfied_alt" />
        <h2>Almost there!</h2>
        <p>Moves: {Math.floor(stepNumber / 2)}</p>
        <p>Pegs left: {pegNumber}</p>
        <p>
          There&apos;s only one peg left on the board but it&apos;s not in the right place (the one that&apos;s empty at
          the beginning). You can do better!
        </p>
        <Button variant="outlined" onClick={restart}>
          Play again
        </Button>
      </Modal>
    );
  } else if (gameState === GAME_STATES.FULL_WIN) {
    return (
      <Modal closeModal={closeModal} variant="win">
        <Icon name="sentiment_very_satisfied" />
        <h2>Wow! You did it!</h2>
        <p>Moves: {Math.floor(stepNumber / 2)}</p>
        <p>Pegs left: {pegNumber}</p>
        <p>Amazing job, you should be proud of yourself.</p>
        <Button variant="outlined" onClick={restart}>
          Play again
        </Button>
      </Modal>
    );
  } else if (gameState === GAME_STATES.TUTORIAL_WIN) {
    return (
      <Modal closeModal={closeModal} variant="win">
        <Icon name="sentiment_very_satisfied" />
        <h2>Nice!</h2>
        <p>Moves: {Math.floor(stepNumber / 2)}</p>
        <p>Pegs left: {pegNumber}</p>
        <p>You are ready for the real game now.</p>
        <Button variant="outlined" onClick={playEnglishBoard}>
          Play
        </Button>
      </Modal>
    );
  }
};

StateModal.propTypes = {
  gameState: T.string,
  stepNumber: T.number,
  pegNumber: T.number,
  closeModal: T.func,
  restart: T.func,
  playEnglishBoard: T.func,
};

export default StateModal;
