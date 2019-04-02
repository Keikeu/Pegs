import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import Tooltip from '@material-ui/core/Tooltip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import rules from './rules.png';
import christmas from './christmas.mp3';
import vaporwave from './vaporwave.mp3';

import Snow from './snow-animation.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRules: false,
      showAbout: false,
      history: [{
        pegs: [
          [-1,-1, 1, 1, 1,-1,-1],
          [-1,-1, 1, 1, 1,-1,-1],
          [ 1, 1, 1, 1, 1, 1, 1],
          [ 1, 1, 1, 0, 1, 1, 1],
          [ 1, 1, 1, 1, 1, 1, 1],
          [-1,-1, 1, 1, 1,-1,-1],
          [-1,-1, 1, 1, 1,-1,-1]
        ],
      }],
      stepNumber: 0,
      pegsNumber: 32,
      gameState: null,
      boardType: 'english',
      theme: 'default',
    }
  }

  changeBoard(current) {
    if(current === 'english') {
      this.setState ({
        boardType: 'european',
        history: [{
          pegs: [
            [-1,-1, 1, 1, 1,-1,-1],
            [-1, 1, 1, 1, 1, 1,-1],
            [ 1, 1, 1, 0, 1, 1, 1],
            [ 1, 1, 1, 1, 1, 1, 1],
            [ 1, 1, 1, 1, 1, 1, 1],
            [-1, 1, 1, 1, 1, 1,-1],
            [-1,-1, 1, 1, 1,-1,-1]
          ],
        }],
        pegsNumber: 36,
        stepNumber: 0,
      })
    } else if(current === 'european') {
      this.setState ({
        boardType: 'english',
        history: [{
          pegs: [
            [-1,-1, 1, 1, 1,-1,-1],
            [-1,-1, 1, 1, 1,-1,-1],
            [ 1, 1, 1, 1, 1, 1, 1],
            [ 1, 1, 1, 0, 1, 1, 1],
            [ 1, 1, 1, 1, 1, 1, 1],
            [-1,-1, 1, 1, 1,-1,-1],
            [-1,-1, 1, 1, 1,-1,-1]
          ],
        }],
        pegsNumber: 32,
        stepNumber: 0,
      })
    }
  }

  toggleRules() {
    this.setState({
      showRules: !this.state.showRules,
    })
  }

  toggleAbout() {
    this.setState({
      showAbout: !this.state.showAbout,
    })
  }

  jumpTo(where) {
    if(this.state.boardType === 'english') {
      this.setState ({
        stepNumber: where,
        history: this.state.history.slice(0, this.state.stepNumber + 1),
        pegsNumber: 32 - Math.floor(where/2),
        gameState: null,
      });
    }
    else if(this.state.boardType === 'european') {
      this.setState ({
        stepNumber: where,
        history: this.state.history.slice(0, this.state.stepNumber + 1),
        pegsNumber: 36 - Math.floor(where/2),
        gameState: null,
      });
    }
  }

  findPegsActive(pegs) {
    let pegsActive = [];

    for(let i=0; i<7; i++) {
      for(let j=0; j<7; j++) {
        if(pegs[i][j] === 3) {
          pegsActive.push([i,j]);
        }
      }
    }
    return pegsActive;
  }

  findPegsToMove(pegs) {
    let pegsToMove = [];

    if(this.findPegsActive(pegs).length === 0) {
      for(let i=0; i<7; i++) {
        for(let j=0; j<7; j++) {
          if(pegs[i][j] === 1 && (
            (i-2>=0 && pegs[i-1][j] === 1 && pegs[i-2][j] === 0) ||
            (i+2<=6 && pegs[i+1][j] === 1 && pegs[i+2][j] === 0) ||
            (j-2>=0 && pegs[i][j-1] === 1 && pegs[i][j-2] === 0) ||
            (j+2<=6 && pegs[i][j+1] === 1 && pegs[i][j+2] === 0)
          )) {
            pegsToMove.push([i,j]);
          }
        }
      }
    }

    return pegsToMove;
  }

  findHolesToFill(pegs, i, j) {
    let holesToFill = [];

    if (i-2>=0 && pegs[i-1][j] === 1 && pegs[i-2][j] === 0) {
      holesToFill.push([i-2,j]);
    }
    if (i+2<=6 && pegs[i+1][j] === 1 && pegs[i+2][j] === 0) {
      holesToFill.push([i+2,j]);
    }
    if (j-2>=0 && pegs[i][j-1] === 1 && pegs[i][j-2] === 0) {
      holesToFill.push([i,j-2]);
    }
    if (j+2<=6 && pegs[i][j+1] === 1 && pegs[i][j+2] === 0) {
      holesToFill.push([i,j+2]);
    }

    return holesToFill;
  }

  deleteTheMiddlePeg(i,j,holesToFill,pegs) {
    if(i > holesToFill[0][0]) {
     pegs[i-1][j] = 0;
    }
    else if (i < holesToFill[0][0]) {
     pegs[i+1][j] = 0;
    }
    else if(j > holesToFill[0][1]) {
     pegs[i][j-1] = 0;
    }
    else {
     pegs[i][j+1] = 0;
    }

    return pegs;
  }

  handlePegClick(i,j) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const pegs = current.pegs.map(x => ({...x}));
    const pegsToMove = this.findPegsToMove(pegs);
    const holesToFill = this.findHolesToFill(pegs,i,j);

    // clickable peg
    if(isInArray(pegsToMove, [i,j])) {
      for(let i=0; i<holesToFill.length; i++) {
        pegs[holesToFill[i][0]][holesToFill[i][1]] = 2;
      }
      pegs[i][j] = 3;

      this.setState({
        history: history.concat([{
          pegs: pegs,
        }]),
        stepNumber: history.length,
      })
    }
    // clickable hole
    else if(pegs[i][j] === 2) {
      let a, b;

      for(let x=0; x<7; x++) {
        for(let y=0; y<7; y++) {
          if(pegs[x][y] === 3) {
            pegs[x][y] = 0;
            pegs[i][j] = 1;
            a = x;
            b = y;
          } else if(pegs[x][y] === 2) {
            pegs[x][y] = 0;
          }
        }
      }

      this.setState({
        history: history.concat([{
          // middle peg(1) -> (0)
          pegs: this.deleteTheMiddlePeg(a,b,[[i,j]],pegs)
        }]),
        stepNumber: history.length,
        pegsNumber: this.state.pegsNumber - 1,
      })
    }
  }

  changeTheme = (event) => {
    this.setState({
      theme: event.target.value,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const pegs = current.pegs.slice();
    const pegsToMove = this.findPegsToMove(pegs);
    const pegsActive = this.findPegsActive(pegs);

    let theme = this.state.theme;
    const stepNumber = this.state.stepNumber;
    const pegsNumber = this.state.pegsNumber;
    let showRules = this.state.showRules;
    let showAbout = this.state.showAbout;
    let gameState = this.state.gameState;

    if(calculateWin(pegsNumber, pegsToMove, pegsActive, pegs)) {
      setTimeout(() => {
        this.setState({
          gameState : calculateWin(pegsNumber, pegsToMove, pegsActive, pegs),
        })
      }, 1000)
    }


    return (
      <div className={"container " + theme}>

      {theme === "christmas" && (
        <div>
          <audio autoPlay loop>
            <source src={christmas} type="audio/mpeg"/>
            <embed src={christmas} autostart="true" loop={true} hidden={true}/>
          </audio>
          <Snow></Snow>
          <svg className="ground" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="100%" stop-color="#8fa5b3" />
            </linearGradient>
          </defs>
            <path d="M -40 100 Q 10 -70 60 100 " fill="url(#gradient)"/>
            <path d="M 15 100 Q 80 -100 120 100 " fill="url(#gradient)"/>
          </svg>
        </div>
        )
      }
      {theme === "vaporwave" && (
        <audio autoPlay loop>
          <source src={vaporwave} type="audio/mpeg"/>
          <embed src={vaporwave} autostart="true" loop={true} hidden={true}/>
        </audio>
        )
      }
        <div className="top-panel">
          <Button className="top-panel__btn" onClick={() => this.toggleAbout()}>About</Button>
          <h1>Peg Solitaire</h1>
          <Button className="top-panel__btn" onClick={() => this.toggleRules()}>How to play</Button>
        </div>

        <div className="options">
          <Tooltip title="Undo">
            <span>
              <IconButton onClick={() => this.jumpTo(pegsActive.length === 0 ? stepNumber - 2 : stepNumber - 1)}>
                <i className="material-icons">keyboard_backspace</i>
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Restart">
            <span>
              <IconButton onClick={() => this.jumpTo(0)}>
                <i className="material-icons">replay</i>
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Change board">
            <span>
              <IconButton onClick={() => this.changeBoard(this.state.boardType)}>
                <i className="material-icons">grain</i>
              </IconButton>
            </span>
          </Tooltip>
        </div>

        <div>
          <Board
            onClick={(i,j) => this.handlePegClick(i,j)}
            pegs = {pegs}
          />
        </div>

        <div className="score">
          <div>Number of moves: {Math.floor(stepNumber/2)}</div>
          <div>Pegs left: {pegsNumber}</div>
        </div>
        <div className="theme-select">
          <span>Theme:</span>
          <Select onChange={this.changeTheme} value={this.state.theme} className="select">
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="christmas">Christmas</MenuItem>
            <MenuItem value="vaporwave">Vaporwave</MenuItem>
          </Select>
        </div>
        <div>
          <State value={gameState} stepNumber={stepNumber} pegsNumber={pegsNumber} onClick={() => this.jumpTo(0)}/>
        </div>
        <div>
          <Rules value={showRules} onClick={() => this.toggleRules()}/>
        </div>
        <div>
          <About value={showAbout} onClick={() => this.toggleAbout()}/>
        </div>
      </div>
    )

  }
}

class Board extends React.Component {
  renderPeg(i) {
    return (
      <Peg
        key={i}
        value={this.props.pegs[Math.floor(i/7)][i%7]}
        onClick={() => this.props.onClick(Math.floor(i/7),i%7)}
      />
    );
  }

  render() {
    const board = [];

    for(let i=0; i<49; i++) {
      board.push(this.renderPeg(i))
    }

    return(
      <div className="board">
        {board}
      </div>
    )
  }
}

function Peg(props) {
  // peg removed from the board by the player
  if(props.value === -1) {
    return (
      <div className="peg-dead"></div>
    )
  // empty space, no pegs here from the very begining
  } else if(props.value === 0) {
    return (
      <div className="peg-blank"></div>
    )
  // normal peg
  } else if(props.value === 1) {
    return (
      <div className="peg" onClick={props.onClick}></div>
    )
  // clickable hole - active peg will jump here
  } else if(props.value === 2){
    return (
      <div className="peg-highlighted" onClick={props.onClick}></div>
    )
  // active peg - the one that will jump to a choosen hole
  } else if(props.value === 3){
    return (
      <div className="peg-active" onClick={props.onClick}></div>
    )
  }
}

function isInArray(array, item) {
  for(let i=0; i<array.length; i++) {
    if(array[i][0] === item[0] && array[i][1] === item[1]) {
      return true;
    }
  }
  return false;
}

function calculateWin(pegsNumber, pegsToMove, pegsActive, pegs) {
  console.log("calcWin");
  if(pegsToMove.length === 0 && pegsActive.length === 0) {
    if(pegsNumber === 1 && pegs[3][3] === 1) {
      return 'full-win';
    } else if(pegsNumber === 1) {
      return 'part-win';
    } else {
      return 'defeat';
    }
  }
  return null;
}

function Rules(props) {
  if(props.value) {
    return (
      <div className="dialog-container">
        <div className="dialog">
          <h3>How to play</h3>
          <Button className="close-btn" onClick={props.onClick}><i className="material-icons">close</i></Button>
          <p>Remove all the pegs from the boards until only one is left.</p>
          <p>Click a peg to jump over a peg next to it and land in the empty spot,
          so that the peg being jumped over can be removed from the board.</p>
          <img src={rules} alt="rules" className="rules"/>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

function About(props) {
  if(props.value) {
    return (
      <div className="dialog-container">
        <div className="dialog dialog--about">
          <h3>About Peg Solitaire</h3>
          <Button className="close-btn" onClick={props.onClick}><i className="material-icons">close</i></Button>
          <p className="p-left">
            Wanna read some useless stuff about this game? Here you go: <br/><br/>
            Peg solitaire (or Solo Noble) is a board game for one player involving movement of pegs
            on a board with holes. Some sets use marbles in a board with indentations.
            The game is known simply as Solitaire in the United Kingdom where the card games are called Patience.
            It is also referred to as Brainvita (especially in India).
            The first evidence of the game can be traced back to the court of Louis XIV,
            and the specific date of 1687(wow, it's so old!), with an engraving made that year by Claude Auguste Berey of Anne de Rohan-Chabot,
            Princess of Soubise, the Unburnt, Queen of the Andals and the First Men, Khaleesi of the Great Grass Sea,
            Breaker of Chains, and Mother of Dragons, with the puzzle by her side. The August 1687 edition of the French literary
            magazine Mercure galant contains a description of the board, rules and sample problems.<br/><br/>
            Created by Karolina Placek btw.
          </p>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

function State(props) {
  if(props.value === null) {
    return null;
  } else if(props.value === 'defeat') {
    return (
      <div className="dialog-container">
        <div className="dialog dialog--defeat">
          <i className="material-icons">clear</i>
          <h2>You fucked up</h2>
          <p>Moves: {Math.floor(props.stepNumber)}</p>
          <p>Pegs left: {props.pegsNumber}</p>
          <p><br/>Better luck next time!<br/><br/></p>
          <Button variant="contained" color="primary" onClick={props.onClick}>Try again</Button>
        </div>
      </div>
    );
  } else if(props.value === 'part-win') {
    return (
      <div className="dialog-container">
        <div className="dialog dialog--win">
          <i className="material-icons">check</i>
          <h2>Almost there!</h2>
          <p>Moves: {Math.floor(props.stepNumber/2)}</p>
          <p>Pegs left: {props.pegsNumber}</p>
          <p><br/>There's only one peg left on the board but it's not in the center. Blisko niewystarczająco.<br/><br/></p>
          <Button variant="outlined" onClick={props.onClick}>Try again, looser</Button>
        </div>
      </div>
    );
  } else if(props.value === 'full-win') {
    return (
      <div className="dialog-container">
        <div className="dialog dialog--win">
          <i className="material-icons">check</i>
          <h2>Woah! You did it!</h2>
          <p>Moves: {Math.floor(props.stepNumber/2)}</p>
          <p>Pegs left: {props.pegsNumber}</p>
          <p><br/>I know you cheated, asshole.<br/><br/></p>
          <Button variant="outlined" onClick={props.onClick}>Do it again, bitch</Button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
