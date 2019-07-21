import React from 'react';
import Button from '@material-ui/core/Button';

function State(props) {
  if(props.value === null) {
    return null;
  } else if(props.value === 'defeat') {
    return (
      <div>
        <div className="dialog-container" onClick={props.onClose}></div>
        <div className="dialog dialog--defeat">
          <Button className="close-btn" onClick={props.onClose}><i className="material-icons">close</i></Button>
          <i className="material-icons">sentiment_very_dissatisfied</i>
          <h2>You lost</h2>
          <p>Moves: {Math.floor(props.stepNumber/2)}</p>
          <p>Pegs left: {props.pegsNumber}</p>
          <p><br/>Better luck next time!<br/><br/></p>
          <Button variant="contained" onClick={props.onClick}>Try again</Button>
        </div>
      </div>
    );
  } else if(props.value === 'part-win') {
    return (
      <div>
        <div className="dialog-container" onClick={props.onClose}></div>
        <div className="dialog dialog--win">
          <Button className="close-btn" onClick={props.onClose}><i className="material-icons">close</i></Button>
          <i className="material-icons">sentiment_satisfied_alt</i>
          <h2>Almost there!</h2>
          <p>Moves: {Math.floor(props.stepNumber/2)}</p>
          <p>Pegs left: {props.pegsNumber}</p>
          <p><br/>There's only one peg left on the board but it's not in the center. You can do better!<br/><br/></p>
          <Button variant="outlined" onClick={props.onClick}>Play again</Button>
        </div>
      </div>
    );
  } else if(props.value === 'full-win') {
    return (
      <div>
        <div className="dialog-container" onClick={props.onClose}></div>
        <div className="dialog dialog--win">
          <Button className="close-btn" onClick={props.onClose}><i className="material-icons">close</i></Button>
          <i className="material-icons">sentiment_very_satisfied</i>
          <h2>Woah! You did it!</h2>
          <p>Moves: {Math.floor(props.stepNumber/2)}</p>
          <p>Pegs left: {props.pegsNumber}</p>
          <p><br/>Amazing job, I'm proud.<br/><br/></p>
          <Button variant="outlined" onClick={props.onClick}>Play again</Button>
        </div>
      </div>
    );
  }
}

export default State;
