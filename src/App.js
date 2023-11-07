import React from "react";
import "./styles/style.css";
import T from "prop-types";

import Board from "./components/Board.js";
import Music from "./components/Music.js";
import Snow from "./components/Snow.js";
import Score from "./components/Score.js";
import Navigation from "./components/Navigation.js";
import ThemeSelect from "./components/ThemeSelect.js";
import RulesModal from "./components/RulesModal.js";
import StateModal from "./components/StateModal.js";
import BoardsModal from "./components/BoardsModal.js";
import { THEMES } from "./constants.js";

const App = ({
  isAudioOn,
  toggleAudio,
  rulesModalOpen,
  toggleRulesModal,
  boardsModalOpen,
  toggleBoardsModal,
  theme,
  changeTheme,
  jumpToPointInHistory,
  stepNumber,
  pegs,
  handlePegClick,
  width,
  height,
  boardType,
  pegNumber,
  gameState,
  setGameState,
  changeBoard,
  undo,
  restart,
}) => {
  return (
    <div className={"container " + theme}>
      {theme !== THEMES.DEFAULT && <Music theme={theme} isAudioOn={isAudioOn} toggleAudio={toggleAudio} />}

      {theme === THEMES.CHRISTMAS && <Snow />}

      <h1 className="title">Peg Solitaire</h1>

      <Navigation
        undo={undo}
        restart={restart}
        toggleBoardsModal={toggleBoardsModal}
        toggleRulesModal={toggleRulesModal}
      />

      <Board onClick={handlePegClick} pegs={pegs} width={width} height={height} boardType={boardType} />

      <Score stepNumber={stepNumber} pegNumber={pegNumber} boardType={boardType} />

      <ThemeSelect changeTheme={changeTheme} theme={theme} />

      <StateModal
        value={gameState}
        stepNumber={stepNumber}
        pegNumber={pegNumber}
        replay={() => jumpToPointInHistory(0)}
        playEnglishBoard={() => changeBoard(1)}
        closeModal={() => setGameState(null)}
      />

      {rulesModalOpen && <RulesModal closeModal={toggleRulesModal} />}

      {boardsModalOpen && (
        <BoardsModal
          initialIndex={parseInt(localStorage.getItem("board"))}
          changeBoard={changeBoard}
          closeModal={toggleBoardsModal}
        />
      )}
    </div>
  );
};

App.propTypes = {
  isAudioOn: T.bool,
  toggleAudio: T.func,
  rulesModalOpen: T.bool,
  toggleRulesModal: T.func,
  boardsModalOpen: T.bool,
  toggleBoardsModal: T.func,
  theme: T.string,
  changeTheme: T.func,
  jumpToPointInHistory: T.func,
  stepNumber: T.number,
  pegs: T.array,
  handlePegClick: T.func,
  width: T.number,
  height: T.number,
  boardType: T.string,
  pegNumber: T.number,
  gameState: T.string,
  setGameState: T.func,
  changeBoard: T.func,
  undo: T.func,
  restart: T.func,
};

export default App;
