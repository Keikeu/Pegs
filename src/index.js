import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.css';

import Button from '@material-ui/core/Button';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import christmas from './media/christmas.mp3';
import vaporwave from './media/vaporwave.mp3';

import Snow from './snow-animation.js';

import Board from './components/board.js';
import Rules from './components/rules.js';
import State from './components/state.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRules: false,
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
      height: 7,
      width: 7,
      stepNumber: 0,
      pegsNumber: 32,
      defaultPegsNumber: 32,
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
        height: 7,
        width: 7,
        stepNumber: 0,
        pegsNumber: 36,
        defaultPegsNumber: 36,
        gameState: null
      });
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
        height: 7,
        width: 7,
        stepNumber: 0,
        pegsNumber: 32,
        defaultPegsNumber: 32,
        gameState: null
      });
    }
  }

  toggleRules() {
    this.setState({
      showRules: !this.state.showRules,
    })
  }

  jumpTo(where) {
    if (where < 0) return;

    this.setState ({
      stepNumber: where,
      history: this.state.history.slice(0, this.state.stepNumber + 1),
      pegsNumber: this.state.defaultPegsNumber - Math.floor(where/2),
      gameState: null,
    });
  }

  findPegsActive(pegs) {
    let pegsActive = [];

    for(let i=0; i<this.state.height; i++) {
      for(let j=0; j<this.state.width; j++) {
        if(pegs[i][j] === 3) {
          pegsActive.push([i,j]);
        }
      }
    }
    return pegsActive;
  }

  findHolesActive(pegs) {
    let holesActive = [];

    for(let i=0; i<this.state.height; i++) {
      for(let j=0; j<this.state.width; j++) {
        if(pegs[i][j] === 2) {
          holesActive.push([i,j]);
        }
      }
    }
    return holesActive;
  }

  findPegsToMove(pegs) {
    let pegsToMove = [];

    for(let i=0; i<this.state.height; i++) {
      for(let j=0; j<this.state.width; j++) {
        if(pegs[i][j] === 1 && (
          (i-2>=0 && pegs[i-1][j] === 1 && (pegs[i-2][j] === 0 || pegs[i-2][j] === 2)) ||
          (i+2<=6 && pegs[i+1][j] === 1 && (pegs[i+2][j] === 0 || pegs[i+2][j] === 2)) ||
          (j-2>=0 && pegs[i][j-1] === 1 && (pegs[i][j-2] === 0 || pegs[i][j-2] === 2)) ||
          (j+2<=6 && pegs[i][j+1] === 1 && (pegs[i][j+2] === 0 || pegs[i][j+2] === 2))
        )) {
          pegsToMove.push([i,j]);
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
    const pegsNumber = this.state.pegsNumber;
    const stepNumber = this.state.stepNumber;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const pegs = current.pegs.map(x => ({...x}));
    const pegsToMove = this.findPegsToMove(pegs);
    const holesToFill = this.findHolesToFill(pegs,i,j);
    const pegsActive = this.findPegsActive(pegs);

    // clickable peg -> activate
    if(!pegsActive.length && isInArray(pegsToMove, [i,j])) {
      for(let i=0; i<holesToFill.length; i++) {
        pegs[holesToFill[i][0]][holesToFill[i][1]] = 2;
      }
      pegs[i][j] = 3;

      this.setState({
        history: history.concat([{
          pegs: pegs,
        }]),
        stepNumber: history.length,
      });
    }

    // clickable hole -> jump to it
    else if(pegs[i][j] === 2) {
      let a, b;
      for(let x = 0; x < this.state.height; x++) {
        for(let y = 0; y < this.state.width; y++) {
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
          pegs: this.deleteTheMiddlePeg(a,b,[[i,j]],pegs)
        }]),
        stepNumber: history.length,
        pegsNumber: pegsNumber - 1,
      }, () => {
        this.setState({
          gameState: calculateGameState(pegsNumber - 1, this.findPegsToMove(pegs), this.findPegsActive(pegs), pegs)
        });
      });
    }

    // active peg -> deactivate
    else if(isInArray(pegsActive, [i,j])) {
      this.jumpTo(stepNumber - 1);
    }

    // different clickable peg -> switch focus to this one
    else if(pegsActive.length && isInArray(pegsToMove, [i,j])) {
      this.setState({
        stepNumber: stepNumber-1,
        history: this.state.history.slice(0, stepNumber + 1),
        pegsNumber: this.state.defaultPegsNumber - Math.floor((stepNumber-1)/2),
        gameState: null,
      }, () => {this.handlePegClick(i,j); });
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
    const pegsActive = this.findPegsActive(pegs);

    const theme = this.state.theme;
    const stepNumber = this.state.stepNumber;
    const pegsNumber = this.state.pegsNumber;
    const showRules = this.state.showRules;
    const gameState = this.state.gameState;

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
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#8fa5b3" />
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
        <h1 className="title">Peg Solitaire</h1>

        <div className="options">
            <Button className="options__btn" onClick={() => this.jumpTo(pegsActive.length === 0 ? stepNumber - 2 : stepNumber - 1)}>
               <i className="material-icons">keyboard_backspace</i>
               Undo
            </Button>
            <Button className="options__btn" onClick={() => this.jumpTo(0)}>
               <i className="material-icons">replay</i>
               Restart
            </Button>
            <Button className="options__btn" onClick={() => this.changeBoard(this.state.boardType)}>
               <i className="material-icons">grain</i>
               Switch board
            </Button>
            <Button className="options__btn" onClick={() => this.toggleRules()}>
               <i className="material-icons">help_outline</i>
               How to play
            </Button>
        </div>

        <div>
          <Board
            onClick={(i,j) => this.handlePegClick(i,j)}
            pegs = {pegs}
          />
        </div>

        <div className="score">
          <div>Moves: {Math.floor(stepNumber/2)}</div>
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
          <State value={gameState} stepNumber={stepNumber} pegsNumber={pegsNumber} onClick={() => this.jumpTo(0)} onClose={() => this.setState({gameState: null})}/>
        </div>
        <div>
          <Rules value={showRules} onClick={() => this.toggleRules()}/>
        </div>
      </div>
    )
  }
}


function isInArray(array, item) {
  for(let i = 0; i < array.length; i++) {
    if(array[i][0] === item[0] && array[i][1] === item[1]) {
      return true;
    }
  }
  return false;
}

function calculateGameState(pegsNumber, pegsToMove, pegsActive, pegs) {
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

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
