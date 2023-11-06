import React from "react";
import T from "prop-types";
import Button from "@mui/material/Button";
import { GAME_STATES } from "../constants";
import Icon from "./Icon";

const StateModal = ({ value, stepNumber, pegNumber, closeModal, replay, playEnglishBoard }) => {
  if (value === null) {
    return null;
  } else if (value === GAME_STATES.DEFEAT) {
    return (
      <>
        <div className="dialog-container" onClick={closeModal}></div>
        <div className="dialog dialog--defeat">
          <Button className="close-btn" onClick={closeModal}>
            <Icon name="close" />
          </Button>
          <Icon name="sentiment_very_dissatisfied" />
          <h2>You lost</h2>
          <p>Moves: {Math.floor(stepNumber / 2)}</p>
          <p>Pegs left: {pegNumber}</p>
          <p>
            <br />
            Better luck next time!
            <br />
            <br />
          </p>
          <Button variant="outlined" onClick={replay}>
            Try again
          </Button>
        </div>
      </>
    );
  } else if (value === GAME_STATES.PART_WIN) {
    return (
      <>
        <div className="dialog-container" onClick={closeModal}></div>
        <div className="dialog dialog--win">
          <Button className="close-btn" onClick={closeModal}>
            <Icon name="close" />
          </Button>
          <Icon name="sentiment_satisfied_alt" />
          <h2>Almost there!</h2>
          <p>Moves: {Math.floor(stepNumber / 2)}</p>
          <p>Pegs left: {pegNumber}</p>
          <p>
            <br />
            There&apos;s only one peg left on the board but it&apos;s not in the right place (the one that&apos;s empty
            at the beginning). You can do better!
            <br />
            <br />
          </p>
          <Button variant="outlined" onClick={replay}>
            Play again
          </Button>
        </div>
      </>
    );
  } else if (value === GAME_STATES.FULL_WIN) {
    return (
      <>
        <div className="dialog-container" onClick={closeModal}></div>
        <div className="dialog dialog--win">
          <Button className="close-btn" onClick={closeModal}>
            <Icon name="close" />
          </Button>
          <Icon name="sentiment_very_satisfied" />
          <h2>Wow! You did it!</h2>
          <p>Moves: {Math.floor(stepNumber / 2)}</p>
          <p>Pegs left: {pegNumber}</p>
          <p>
            <br />
            Amazing job, you should be proud of yourself.
            <br />
            <br />
          </p>
          <Button variant="outlined" onClick={replay}>
            Play again
          </Button>
        </div>
      </>
    );
  } else if (value === GAME_STATES.TUTORIAL_WIN) {
    return (
      <>
        <div className="dialog-container" onClick={closeModal}></div>
        <div className="dialog dialog--win">
          <Button className="close-btn" onClick={closeModal}>
            <Icon name="close" />
          </Button>
          <Icon name="sentiment_very_satisfied" />
          <h2>Nice!</h2>
          <p>Moves: {Math.floor(stepNumber / 2)}</p>
          <p>Pegs left: {pegNumber}</p>
          <p>
            <br />
            You are ready for the real game now.
            <br />
            <br />
          </p>
          <Button variant="outlined" onClick={playEnglishBoard}>
            Play
          </Button>
        </div>
      </>
    );
  }
};

StateModal.propTypes = {
  value: T.string,
  stepNumber: T.number,
  pegNumber: T.number,
  closeModal: T.func,
  replay: T.func,
  playEnglishBoard: T.func,
};

export default StateModal;
