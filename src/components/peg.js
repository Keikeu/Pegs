import React from 'react';

function Peg(props) {
  if(props.value === -1) {
    return ( <div className="peg-dead"></div> ) // empty space, no pegs here from the very begining
  } else if(props.value === 0) {
    return ( <div className="peg peg-blank"></div> ) // peg removed from the board by the player
  } else if(props.value === 1) {
    return ( <div className="peg peg-alive" onClick={props.onClick}></div> ) // normal peg
  } else if(props.value === 2){
    return ( <div className="peg peg-highlighted" onClick={props.onClick}></div> ) // clickable hole - active peg will jump over here
  } else if(props.value === 3){
    return ( <div className="peg peg-active" onClick={props.onClick}></div> ) // active peg - the one that will jump to a chosen hole
  }
}

export default Peg;
