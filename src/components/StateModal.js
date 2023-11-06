import React from "react";
import T from "prop-types";
import Button from "@mui/material/Button";
import { GAME_STATES } from "../constants";
import Icon from "./Icon";

const StateModal = ({ value, stepNumber, pegsNumber, onClose, onClick }) => {
  if (value === null) {
    return null;
  } else if (value === GAME_STATES.DEFEAT) {
    return (
      <div>
        <div className="dialog-container" onClick={onClose}></div>
        <div className="dialog dialog--defeat">
          <Button className="close-btn" onClick={onClose}>
            <Icon name="close" />
          </Button>
          <Icon name="sentiment_very_dissatisfied" />
          <h2>You lost</h2>
          <p>Moves: {Math.floor(stepNumber / 2)}</p>
          <p>Pegs left: {pegsNumber}</p>
          <p>
            <br />
            Better luck next time!
            <br />
            <br />
          </p>
          <Button variant="outlined" onClick={onClick}>
            Try again
          </Button>
        </div>
      </div>
    );
  } else if (value === GAME_STATES.PART_WIN) {
    return (
      <div>
        <div className="dialog-container" onClick={onClose}></div>
        <div className="dialog dialog--win">
          <Button className="close-btn" onClick={onClose}>
            <Icon name="close" />
          </Button>
          <Icon name="sentiment_satisfied_alt" />
          <h2>Almost there!</h2>
          <p>Moves: {Math.floor(stepNumber / 2)}</p>
          <p>Pegs left: {pegsNumber}</p>
          <p>
            <br />
            There's only one peg left on the board but it's not in the right place (the one that's empty at the
            beginning). You can do better!
            <br />
            <br />
          </p>
          <Button variant="outlined" onClick={onClick}>
            Play again
          </Button>
        </div>
      </div>
    );
  } else if (value === GAME_STATES.FULL_WIN) {
    return (
      <div>
        <div className="dialog-container" onClick={onClose}></div>
        <div className="dialog dialog--win">
          <Button className="close-btn" onClick={onClose}>
            <Icon name="close" />
          </Button>
          <Icon name="sentiment_very_satisfied" />
          <h2>Wow! You did it!</h2>
          <p>Moves: {Math.floor(stepNumber / 2)}</p>
          <p>Pegs left: {pegsNumber}</p>
          <p>
            <br />
            Amazing job, you should be proud of yourself.
            <br />
            <br />
          </p>
          <Button variant="outlined" onClick={onClick}>
            Play again
          </Button>
        </div>
      </div>
    );
  } else if (value === GAME_STATES.TUTORIAL_WIN) {
    return (
      <div>
        <div className="dialog-container" onClick={onClose}></div>
        <div className="dialog dialog--win">
          <Button className="close-btn" onClick={onClose}>
            <Icon name="close" />
          </Button>
          <Icon name="sentiment_very_satisfied" />
          <h2>Nice!</h2>
          <p>Moves: {Math.floor(stepNumber / 2)}</p>
          <p>Pegs left: {pegsNumber}</p>
          <p>
            <br />
            You are ready for the real game now.
            <br />
            <br />
          </p>
          <Button variant="outlined" onClick={onClick}>
            Play
          </Button>
        </div>
      </div>
    );
  }
};

StateModal.propTypes = {
  value: T.string,
  stepNumber: T.number,
  pegsNumber: T.number,
  onClose: T.func,
  onClick: T.func,
};

export default StateModal;
