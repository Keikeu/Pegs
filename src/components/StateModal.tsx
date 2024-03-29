import React from "react";
import Button from "@mui/material/Button";
import { GAME_STATES } from "../constants";
import Icon from "./Icon";
import Modal from "./Modal";

interface Props {
  gameState: string | null;
  stepNumber: number;
  pegNumber: number;
  closeModal: () => void;
  restart: () => void;
  playEnglishBoard: () => void;
}

const StateModal = ({ gameState, stepNumber, pegNumber, closeModal, restart, playEnglishBoard }: Props) => {
  if (gameState === GAME_STATES.DEFEAT) {
    return (
      <Modal closeModal={closeModal} variant="defeat">
        <Icon name="sentiment_very_dissatisfied" size={48} />
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
        <Icon name="sentiment_satisfied_alt" size={48} />
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
        <Icon name="sentiment_very_satisfied" size={48} />
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
        <Icon name="sentiment_very_satisfied" size={48} />
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

  return null;
};

export default StateModal;
