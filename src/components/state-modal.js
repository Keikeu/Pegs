import React from 'react';
import Button from '@material-ui/core/Button';

const StateModal = ({ value, stepNumber, pegsNumber, onClose, onClick }) => {
  if (value === null) {
    return null;
  } else if (value === 'defeat') {
    return (
      <div>
        <div className="dialog-container" onClick={onClose}></div>
        <div className="dialog dialog--defeat">
          <Button className="close-btn" onClick={onClose}><i className="material-icons">close</i></Button>
          <i className="material-icons">sentiment_very_dissatisfied</i>
          <h2>You lost</h2>
          <p>Moves: {Math.floor(stepNumber/2)}</p>
          <p>Pegs left: {pegsNumber}</p>
          <p><br/>Better luck next time!<br/><br/></p>
          <Button variant="outlined" onClick={onClick}>Try again</Button>
        </div>
      </div>
    );
  } else if (value === 'part-win') {
    return (
      <div>
        <div className="dialog-container" onClick={onClose}></div>
        <div className="dialog dialog--win">
          <Button className="close-btn" onClick={onClose}><i className="material-icons">close</i></Button>
          <i className="material-icons">sentiment_satisfied_alt</i>
          <h2>Almost there!</h2>
          <p>Moves: {Math.floor(stepNumber/2)}</p>
          <p>Pegs left: {pegsNumber}</p>
          <p><br/>There's only one peg left on the board but it's not in the right place (the one that's empty at the beginning). You can do better!<br/><br/></p>
          <Button variant="outlined" onClick={onClick}>Play again</Button>
        </div>
      </div>
    );
  } else if (value === 'full-win') {
    return (
      <div>
        <div className="dialog-container" onClick={onClose}></div>
        <div className="dialog dialog--win">
          <Button className="close-btn" onClick={onClose}><i className="material-icons">close</i></Button>
          <i className="material-icons">sentiment_very_satisfied</i>
          <h2>Wow! You did it!</h2>
          <p>Moves: {Math.floor(stepNumber/2)}</p>
          <p>Pegs left: {pegsNumber}</p>
          <p><br/>Amazing job, you should be proud of yourself.<br/><br/></p>
          <Button variant="outlined" onClick={onClick}>Play again</Button>
        </div>
      </div>
    );
  }
}

export default StateModal;
