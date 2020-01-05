import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.css';

import Board from './components/board.js';
import Theme from './components/theme.js';
import Score from './components/score.js';
import Navigation from './components/navigation.js';
import ThemeSelect from './components/theme-select.js';
import RulesModal from './components/rules-modal.js';
import StateModal from './components/state-modal.js';
import BoardsModal from './components/boards-modal.js';

import { boards } from './boardsMap.js';

class Game extends React.Component {
  constructor(props) {
    super(props);

    const index = localStorage.getItem('board') || 0;

    this.state = {
      rulesModalOpen: localStorage.getItem('board') === '0' ? true : false,
      boardsModalOpen: false,
      audio: false,
      boardType: boards[index].boardType,
      history: boards[index].history,
      height: boards[index].height,
      width: boards[index].width,
      pegsNumber: boards[index].defaultPegsNumber,
      defaultPegsNumber: boards[index].defaultPegsNumber,
      gameState: null,
      stepNumber: 0,
      theme: localStorage.getItem('theme') || 'default',
    }
  }

  changeBoard(index) {
    this.setState ({
      rulesModalOpen: false,
      boardsModalOpen: false,
      boardType: boards[index].boardType,
      history: boards[index].history,
      height: boards[index].height,
      width: boards[index].width,
      pegsNumber: boards[index].defaultPegsNumber,
      defaultPegsNumber: boards[index].defaultPegsNumber,
      gameState: null,
      stepNumber: 0,
    });

    localStorage.setItem('board', index);
  }

  toggleRulesModal() {
    this.setState({
      rulesModalOpen: !this.state.rulesModalOpen,
    })
  }

  toggleBoardsModal() {
    this.setState({
      boardsModalOpen: !this.state.boardsModalOpen,
    })
  }

  toggleAudio() {
    this.setState({
      audio: !this.state.audio,
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
    const {width, height} = this.state;

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (pegs[i][j] === 3) {
          pegsActive.push([i, j]);
        }
      }
    }
    return pegsActive;
  }

  findHolesActive(pegs) {
    let holesActive = [];
    const {width, height} = this.state;

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (pegs[i][j] === 2) {
          holesActive.push([i, j]);
        }
      }
    }
    return holesActive;
  }

  findPegsToMove(pegs) {
    let pegsToMove = [];
    const {width, height} = this.state;

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (pegs[i][j] === 1 && (
          (i - 2 >= 0          && pegs[i-1][j] === 1 && (pegs[i-2][j] === 0 || pegs[i-2][j] === 2)) ||
          (i + 2 <= (height-1) && pegs[i+1][j] === 1 && (pegs[i+2][j] === 0 || pegs[i+2][j] === 2)) ||
          (j - 2 >= 0          && pegs[i][j-1] === 1 && (pegs[i][j-2] === 0 || pegs[i][j-2] === 2)) ||
          (j + 2 <= (width-1)  && pegs[i][j+1] === 1 && (pegs[i][j+2] === 0 || pegs[i][j+2] === 2))
        )) {
          pegsToMove.push([i,j]);
        }
      }
    }

    return pegsToMove;
  }

  findHolesToFill(pegs, i, j) {
    let holesToFill = [];
    const {width, height} = this.state;

    if (i - 2 >= 0          && pegs[i-1][j] === 1 && pegs[i-2][j] === 0) { holesToFill.push([i-2,j]); }
    if (i + 2 <= (height-1) && pegs[i+1][j] === 1 && pegs[i+2][j] === 0) { holesToFill.push([i+2,j]); }
    if (j - 2 >= 0          && pegs[i][j-1] === 1 && pegs[i][j-2] === 0) { holesToFill.push([i,j-2]); }
    if (j + 2 <= (width-1)  && pegs[i][j+1] === 1 && pegs[i][j+2] === 0) { holesToFill.push([i,j+2]); }

    return holesToFill;
  }

  deleteTheMiddlePeg(i, j, holesToFill, pegs) {
    if      (i > holesToFill[0][0]) { pegs[i-1][j] = 0; }
    else if (i < holesToFill[0][0]) { pegs[i+1][j] = 0; }
    else if (j > holesToFill[0][1]) { pegs[i][j-1] = 0; }
    else                            { pegs[i][j+1] = 0; }

    return pegs;
  }

  handlePegClick(i,j) {
    const {pegsNumber, stepNumber, boardType} = this.state;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const pegs = current.pegs.map(x => ({...x}));
    const pegsToMove = this.findPegsToMove(pegs);
    const holesToFill = this.findHolesToFill(pegs,i,j);
    const pegsActive = this.findPegsActive(pegs);

    // clickable peg -> activate
    if (!pegsActive.length && isInArray(pegsToMove, [i, j])) {
      for (let i = 0; i < holesToFill.length; i++) {
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
    else if (pegs[i][j] === 2) {
      let a, b;
      for (let x = 0; x < this.state.height; x++) {
        for (let y = 0; y < this.state.width; y++) {
          if (pegs[x][y] === 3) {
            pegs[x][y] = 0;
            pegs[i][j] = 1;
            a = x;
            b = y;
          } else if (pegs[x][y] === 2) {
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
        setTimeout(() => {
          this.setState({
            gameState: calculateGameState(pegsNumber - 1, this.findPegsToMove(pegs), this.findPegsActive(pegs), pegs, boardType, stepNumber + 1)
          });
        }, 500);
      });
    }

    // active peg -> deactivate
    else if (isInArray(pegsActive, [i,j])) {
      this.jumpTo(stepNumber - 1);
    }

    // different clickable peg -> switch focus to this one
    else if (pegsActive.length && isInArray(pegsToMove, [i,j])) {
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
    
    localStorage.setItem('theme', event.target.value);
  }

  render() {
    const {history, theme, stepNumber, pegsNumber, rulesModalOpen, boardsModalOpen, audio, gameState, boardType} = this.state;
    const current = history[this.state.stepNumber];
    const pegs = current.pegs.slice();
    const pegsActive = this.findPegsActive(pegs);

    return (
      <div className={"container " + theme}>

        <Theme theme={theme} audio={audio} toggleAudio={this.toggleAudio.bind(this)} />

        <h1 className="title">Peg Solitaire</h1>

        <Navigation
          jumpTo={this.jumpTo.bind(this)}
          toggleBoardsModal={this.toggleBoardsModal.bind(this)}
          toggleRulesModal={this.toggleRulesModal.bind(this)}
          pegsActive={pegsActive}
          stepNumber={stepNumber}
        />

        <Board
          onClick={(i,j) => this.handlePegClick(i,j)}
          pegs={pegs}
          width={this.state.width}
          height={this.state.height}
          boardType={this.state.boardType}
        />

        <Score
          stepNumber={stepNumber}
          pegsNumber={pegsNumber}
          boardType={boardType}
        />

        <ThemeSelect
          changeTheme={this.changeTheme.bind(this)}
          theme={theme}
        />

        <StateModal
          value={gameState}
          stepNumber={stepNumber}
          pegsNumber={pegsNumber}
          onClick={() => this.jumpTo(0)}
          onClose={() => this.setState({gameState: null})}
        />

        {rulesModalOpen &&
          <RulesModal onClose={() => this.toggleRulesModal()} />
        }

        {boardsModalOpen &&
          <BoardsModal
            onClick={(index) => this.changeBoard(index)}
            onClose={() => this.toggleBoardsModal()}
          />
        }
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

function calculateGameState(pegsNumber, pegsToMove, pegsActive, pegs, boardType, stepNumber) {
  let state = null;

  if (pegsToMove.length === 0 && pegsActive.length === 0) {
    if (pegsNumber === 1) {
      if (boardType === "tutorial" ||
         (boardType === "english"      && pegs[3][3] === 1) ||
         (boardType === "german"       && pegs[4][4] === 1) ||
         (boardType === "asymmetrical" && pegs[3][4] === 1) ||
         (boardType === "square"       && pegs[2][3] === 1) ||
         (boardType === "diamond"      && pegs[4][4] === 1)
      ) {
        state = 'full-win';
      } else {
        state = 'part-win';
      }
    } else {
      state = 'defeat';
    }

    if(!localStorage.getItem('best-score-pegs-' + boardType) || localStorage.getItem('best-score-pegs-' + boardType) > pegsNumber) {
      localStorage.setItem('best-score-pegs-' + boardType, pegsNumber);
      localStorage.setItem('best-score-moves-' + boardType, Math.floor(stepNumber/2));
    }
  }

  return state;
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
