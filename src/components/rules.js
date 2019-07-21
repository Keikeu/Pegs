import React from 'react';
import Button from '@material-ui/core/Button';
import rules from '../media/rules.png';

function Rules(props) {
  if(props.value) {
    return (
      <div>
        <div className="dialog-container" onClick={props.onClick}></div>
        <div className="dialog">
          <h2>How to play</h2>
          <Button className="close-btn" onClick={props.onClick}><i className="material-icons">close</i></Button>
          <p>Remove pegs until only one is left in the center.</p>
          <p>To remove a peg, jump over it with an adjacent peg and land in an empty spot.</p>
          <img src={rules} alt="rules" className="rules"/>
        </div>
      </div>
    );
  } else {
    return null;
  }
}


export default Rules;
