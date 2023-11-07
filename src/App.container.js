import React, { useCallback, useMemo, useState } from "react";
import "./styles/style.css";

import { boards } from "./boards-map.js";
import { THEMES } from "./constants";
import App from "./App";
import {
  calculateGameState,
  deleteTheMiddlePeg,
  findActivePegs,
  findHolesToFill,
  findPegsToMove,
  isInArray,
} from "./util.js";

const AppContainer = () => {
  const [boardIndex, setBoardIndex] = useState(parseInt(localStorage.getItem("board")) || 0);
  const [rulesModalOpen, setRulesModalOpen] = useState(boardIndex === 0 ? false : false); //
  const [boardsModalOpen, setBoardsModalOpen] = useState(false);
  const [isAudioOn, setAudio] = useState(false);

  const [history, setHistory] = useState(boards[boardIndex].history);
  const [gameState, setGameState] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || THEMES.DEFAULT);

  const boardType = useMemo(() => boards[boardIndex].boardType, [boardIndex]);
  const height = useMemo(() => boards[boardIndex].height, [boardIndex]);
  const width = useMemo(() => boards[boardIndex].width, [boardIndex]);
  const defaultPegNumber = useMemo(() => boards[boardIndex].defaultPegsNumber, [boardIndex]);
  const stepNumber = useMemo(() => history.length - 1, [history]);
  const pegNumber = useMemo(() => defaultPegNumber - Math.floor(stepNumber / 2), [defaultPegNumber, stepNumber]);
  const pegs = useMemo(() => history[stepNumber].pegs.slice(), [history, boardIndex, stepNumber]);
  const activePegs = useMemo(() => findActivePegs(pegs, width, height), [pegs]);

  function toggleRulesModal() {
    setRulesModalOpen((open) => !open);
  }

  function toggleBoardsModal() {
    setBoardsModalOpen((open) => !open);
  }

  function toggleAudio() {
    setAudio((on) => !on);
  }

  function changeTheme(theme) {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  }

  function changeBoard(index) {
    setBoardIndex(index);
    setBoardsModalOpen(false);
    setGameState(null);
    setHistory(boards[index].history);
    localStorage.setItem("board", index);
  }

  function jumpToPointInHistory(where) {
    if (where < 0) return;
    setHistory(history.slice(0, where + 1));
    setGameState(null);
  }

  const handlePegClick = useCallback(
    (i, j) => {
      const currentPegs = JSON.parse(JSON.stringify(history[stepNumber].pegs));
      const pegsToMove = findPegsToMove(currentPegs, width, height);
      const holesToFill = findHolesToFill(currentPegs, i, j, width, height);
      const pegsActive = findActivePegs(currentPegs, width, height);

      // clickable peg -> activate
      if (!pegsActive.length && isInArray(pegsToMove, [i, j])) {
        for (let i = 0; i < holesToFill.length; i++) {
          currentPegs[holesToFill[i][0]][holesToFill[i][1]] = 2;
        }
        currentPegs[i][j] = 3;

        setHistory((currentHistory) => [...currentHistory, { pegs: currentPegs }]);
      }

      // clickable hole -> jump to it
      else if (currentPegs[i][j] === 2) {
        let a, b;
        for (let x = 0; x < height; x++) {
          for (let y = 0; y < width; y++) {
            if (currentPegs[x][y] === 3) {
              currentPegs[x][y] = 0;
              currentPegs[i][j] = 1;
              a = x;
              b = y;
            } else if (currentPegs[x][y] === 2) {
              currentPegs[x][y] = 0;
            }
          }
        }

        setHistory((currentHistory) => [...currentHistory, { pegs: deleteTheMiddlePeg(a, b, [[i, j]], currentPegs) }]);

        const newGameState = calculateGameState(
          pegNumber - 1,
          findPegsToMove(currentPegs, width, height),
          findActivePegs(currentPegs, width, height),
          currentPegs,
          boardType,
          stepNumber + 1
        );

        if (gameState !== newGameState) {
          setTimeout(() => {
            setGameState(newGameState);
          }, 500);
        }
      }

      // active peg -> deactivate
      else if (isInArray(pegsActive, [i, j])) {
        jumpToPointInHistory(stepNumber - 1);
      }

      // different clickable peg -> switch focus to this one
      else if (pegsActive.length && isInArray(pegsToMove, [i, j])) {
        const previousPegs = JSON.parse(JSON.stringify(history[stepNumber - 1].pegs));
        for (let i = 0; i < holesToFill.length; i++) {
          previousPegs[holesToFill[i][0]][holesToFill[i][1]] = 2;
        }
        previousPegs[i][j] = 3;

        setHistory((currentHistory) => [...currentHistory.slice(0, stepNumber), { pegs: previousPegs }]);
      }
    },
    [stepNumber, history]
  );

  return (
    <App
      isAudioOn={isAudioOn}
      toggleAudio={toggleAudio}
      rulesModalOpen={rulesModalOpen}
      toggleRulesModal={toggleRulesModal}
      boardsModalOpen={boardsModalOpen}
      toggleBoardsModal={toggleBoardsModal}
      theme={theme}
      changeTheme={changeTheme}
      jumpToPointInHistory={jumpToPointInHistory}
      activePegs={activePegs}
      stepNumber={stepNumber}
      pegs={pegs}
      handlePegClick={handlePegClick}
      width={width}
      height={height}
      boardType={boardType}
      pegNumber={pegNumber}
      gameState={gameState}
      setGameState={setGameState}
      changeBoard={changeBoard}
    />
  );
};

export default AppContainer;
