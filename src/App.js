import React from "react";
import "./styles/style.css";
import T from "prop-types";

import Board from "./components/Board.js";
import Theme from "./components/Theme.js";
import Score from "./components/Score.js";
import Navigation from "./components/Navigation.js";
import ThemeSelect from "./components/ThemeSelect.js";
import RulesModal from "./components/RulesModal.js";
import StateModal from "./components/StateModal.js";
import BoardsModal from "./components/BoardsModal.js";

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
  activePegs,
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
}) => {
  return (
    <div className={"container " + theme}>
      <Theme theme={theme} isAudioOn={isAudioOn} toggleAudio={toggleAudio} />

      <h1 className="title">Peg Solitaire</h1>

      <Navigation
        jumpToPointInHistory={jumpToPointInHistory}
        toggleBoardsModal={toggleBoardsModal}
        toggleRulesModal={toggleRulesModal}
        activePegs={activePegs}
        stepNumber={stepNumber}
      />

      <Board onClick={(i, j) => handlePegClick(i, j)} pegs={pegs} width={width} height={height} boardType={boardType} />

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
  activePegs: T.array,
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
};

export default App;
