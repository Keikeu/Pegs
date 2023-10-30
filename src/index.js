import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles/style.css";

import Board from "./components/Board.js";
import Theme from "./components/Theme.js";
import Score from "./components/Score.js";
import Navigation from "./components/Navigation.js";
import ThemeSelect from "./components/ThemeSelect.js";
import RulesModal from "./components/RulesModal.js";
import StateModal from "./components/StateModal.js";
import BoardsModal from "./components/BoardsModal.js";

import { boards } from "./boards-map.js";
import { BOARD_TYPES, GAME_STATES } from "./constants";

const Game = () => {
  const index = parseInt(localStorage.getItem("board")) || 0;

  const [rulesModalOpen, setRulesModalOpen] = useState(index === 0 ? true : false);
  const [boardsModalOpen, setBoardsModalOpen] = useState(false);
  const [audio, setAudio] = useState(false);

  const [boardType, setBoardType] = useState(boards[index].boardType);
  const [history, setHistory] = useState(boards[index].history);
  const [height, setHeight] = useState(boards[index].height);
  const [width, setWidth] = useState(boards[index].width);
  const [pegsNumber, setPegsNumber] = useState(boards[index].defaultPegsNumber);
  const [defaultPegsNumber, setDefaultPegsNumber] = useState(boards[index].defaultPegsNumber);
  const [gameState, setGameState] = useState(null);
  const [stepNumber, setStepNumber] = useState(0);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "default");

  function changeBoard(index) {
    setRulesModalOpen(false);
    setBoardsModalOpen(false);
    setBoardType(boards[index].boardType);
    setHistory(boards[index].history);
    setHeight(boards[index].height);
    setWidth(boards[index].width);
    setPegsNumber(boards[index].defaultPegsNumber);
    setDefaultPegsNumber(boards[index].defaultPegsNumber);
    setGameState(null);
    setStepNumber(0);

    localStorage.setItem("board", index);
  }

  function toggleRulesModal() {
    setRulesModalOpen((open) => !open);
  }

  function toggleBoardsModal() {
    setBoardsModalOpen((open) => !open);
  }

  function toggleAudio() {
    setAudio((on) => !on);
  }

  function jumpTo(where) {
    if (where < 0) return;

    setStepNumber(where);
    setHistory(history.slice(0, stepNumber + 1));
    setPegsNumber(defaultPegsNumber - Math.floor(where / 2));
    setGameState(null);
  }

  function findPegsActive(pegs) {
    let pegsActive = [];

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (pegs[i][j] === 3) {
          pegsActive.push([i, j]);
        }
      }
    }
    return pegsActive;
  }

  function findHolesActive(pegs) {
    let holesActive = [];

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (pegs[i][j] === 2) {
          holesActive.push([i, j]);
        }
      }
    }
    return holesActive;
  }

  function findPegsToMove(pegs) {
    let pegsToMove = [];

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (
          pegs[i][j] === 1 &&
          ((i - 2 >= 0 &&
            (pegs[i - 1][j] === 1 || pegs[i - 1][j] === 3) &&
            (pegs[i - 2][j] === 0 || pegs[i - 2][j] === 2)) ||
            (i + 2 <= height - 1 &&
              (pegs[i + 1][j] === 1 || pegs[i + 1][j] === 3) &&
              (pegs[i + 2][j] === 0 || pegs[i + 2][j] === 2)) ||
            (j - 2 >= 0 &&
              (pegs[i][j - 1] === 1 || pegs[i][j - 1] === 3) &&
              (pegs[i][j - 2] === 0 || pegs[i][j - 2] === 2)) ||
            (j + 2 <= width - 1 &&
              (pegs[i][j + 1] === 1 || pegs[i][j + 1] === 3) &&
              (pegs[i][j + 2] === 0 || pegs[i][j + 2] === 2)))
        ) {
          pegsToMove.push([i, j]);
        }
      }
    }

    return pegsToMove;
  }

  function findHolesToFill(pegs, i, j) {
    let holesToFill = [];

    if (i - 2 >= 0 && pegs[i - 1][j] === 1 && pegs[i - 2][j] === 0) {
      holesToFill.push([i - 2, j]);
    }
    if (i + 2 <= height - 1 && pegs[i + 1][j] === 1 && pegs[i + 2][j] === 0) {
      holesToFill.push([i + 2, j]);
    }
    if (j - 2 >= 0 && pegs[i][j - 1] === 1 && pegs[i][j - 2] === 0) {
      holesToFill.push([i, j - 2]);
    }
    if (j + 2 <= width - 1 && pegs[i][j + 1] === 1 && pegs[i][j + 2] === 0) {
      holesToFill.push([i, j + 2]);
    }

    return holesToFill;
  }

  function deleteTheMiddlePeg(i, j, holesToFill, pegs) {
    if (i > holesToFill[0][0]) {
      pegs[i - 1][j] = 0;
    } else if (i < holesToFill[0][0]) {
      pegs[i + 1][j] = 0;
    } else if (j > holesToFill[0][1]) {
      pegs[i][j - 1] = 0;
    } else {
      pegs[i][j + 1] = 0;
    }

    return pegs;
  }

  function handlePegClick(i, j) {
    const currentHistory = history.slice(0, stepNumber + 1);
    const current = currentHistory[stepNumber];
    const pegs = current.pegs.map((x) => ({ ...x }));
    const pegsToMove = findPegsToMove(pegs);
    const holesToFill = findHolesToFill(pegs, i, j);
    const pegsActive = findPegsActive(pegs);

    // clickable peg -> activate
    if (!pegsActive.length && isInArray(pegsToMove, [i, j])) {
      for (let i = 0; i < holesToFill.length; i++) {
        pegs[holesToFill[i][0]][holesToFill[i][1]] = 2;
      }
      pegs[i][j] = 3;

      setHistory(currentHistory.concat([{ pegs: pegs }]));
      setStepNumber(currentHistory.length);
    }

    // clickable hole -> jump to it
    else if (pegs[i][j] === 2) {
      let a, b;
      for (let x = 0; x < height; x++) {
        for (let y = 0; y < width; y++) {
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

      setHistory(currentHistory.concat([{ pegs: deleteTheMiddlePeg(a, b, [[i, j]], pegs) }]));
      setStepNumber(currentHistory.length);
      setPegsNumber(pegsNumber - 1);

      setTimeout(() => {
        setGameState(
          calculateGameState(
            pegsNumber - 1,
            findPegsToMove(pegs),
            findPegsActive(pegs),
            pegs,
            boardType,
            stepNumber + 1
          )
        );
      }, 500);
    }

    // active peg -> deactivate
    else if (isInArray(pegsActive, [i, j])) {
      jumpTo(stepNumber - 1);
    }

    // different clickable peg -> switch focus to this one
    else if (pegsActive.length && isInArray(pegsToMove, [i, j])) {
      setStepNumber(stepNumber - 1);
      setHistory(currentHistory.slice(0, stepNumber + 1));
      setPegsNumber(defaultPegsNumber - Math.floor((stepNumber - 1) / 2));
      setGameState(null);
      handlePegClick(i, j);
    }
  }

  function changeTheme(event) {
    setTheme(event.target.value);

    localStorage.setItem("theme", event.target.value);
  }

  const current = history[stepNumber];
  const pegs = current.pegs.slice();
  const pegsActive = findPegsActive(pegs);

  return (
    <div className={"container " + theme}>
      <Theme theme={theme} audio={audio} toggleAudio={toggleAudio} />

      <h1 className="title">Peg Solitaire</h1>

      <Navigation
        jumpTo={jumpTo}
        toggleBoardsModal={toggleBoardsModal}
        toggleRulesModal={toggleRulesModal}
        pegsActive={pegsActive}
        stepNumber={stepNumber}
      />

      <Board onClick={(i, j) => handlePegClick(i, j)} pegs={pegs} width={width} height={height} boardType={boardType} />

      <Score stepNumber={stepNumber} pegsNumber={pegsNumber} boardType={boardType} />

      <ThemeSelect changeTheme={changeTheme} theme={theme} />

      <StateModal
        value={gameState}
        stepNumber={stepNumber}
        pegsNumber={pegsNumber}
        onClick={() => jumpTo(0)}
        onClose={() => setGameState(null)}
      />

      {rulesModalOpen && <RulesModal onClose={() => toggleRulesModal()} />}

      {boardsModalOpen && (
        <BoardsModal
          initialIndex={parseInt(localStorage.getItem("board"))}
          onClick={(index) => changeBoard(index)}
          onClose={() => toggleBoardsModal()}
        />
      )}
    </div>
  );
};

function isInArray(array, item) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][0] === item[0] && array[i][1] === item[1]) {
      return true;
    }
  }
  return false;
}

function calculateGameState(pegsNumber, pegsToMove, pegsActive, pegs, boardType, stepNumber) {
  let state = null;

  if (pegsToMove.length === 0 && pegsActive.length === 0) {
    if (pegsNumber === 1) {
      if (boardType === BOARD_TYPES.TUTORIAL) {
        state = GAME_STATES.TUTORIAL_WIN;
      } else if (
        (boardType === BOARD_TYPES.ENGLISH && pegs[3][3] === 1) ||
        (boardType === BOARD_TYPES.GERMAN && pegs[4][4] === 1) ||
        (boardType === BOARD_TYPES.ASYMMETRICAL && pegs[3][4] === 1) ||
        (boardType === BOARD_TYPES.SQUARE && pegs[2][3] === 1) ||
        (boardType === BOARD_TYPES.DIAMOND && pegs[4][4] === 1)
      ) {
        state = GAME_STATES.FULL_WIN;
      } else {
        state = GAME_STATES.PART_WIN;
      }
    } else {
      state = GAME_STATES.DEFEAT;
    }

    if (
      !parseInt(localStorage.getItem("best-score-pegs-" + boardType)) ||
      parseInt(localStorage.getItem("best-score-pegs-" + boardType)) > pegsNumber
    ) {
      localStorage.setItem("best-score-pegs-" + boardType, pegsNumber);
      localStorage.setItem("best-score-moves-" + boardType, Math.floor(stepNumber / 2));
    }
  }

  return state;
}

ReactDOM.render(<Game />, document.getElementById("root"));
