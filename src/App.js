import React from "react";
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
import styled, { css } from "styled-components";
import NeonJPG from "./media/images/neon.jpg";

const Container = styled.div`
  height: 100%;
  font-family: "Poppins", sans-serif;
  margin: 0;
  overflow: hidden;
  color: var(--text);

  ${({ theme }) => {
    if (theme === THEMES.DEFAULT) {
      return css`
        background-color: var(--background);
      `;
    } else if (theme === THEMES.CHRISTMAS) {
      return css`
        background-color: var(--background-100);
        background-image: linear-gradient(to bottom, var(--background-110), var(--background-100));
      `;
    } else if (theme === THEMES.NEON) {
      return css`
        background-image: url(${NeonJPG});
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      `;
    }
  }}
`;

const Title = styled.h1`
  text-align: center;
  margin: 20px;
  font-size: 32px;
  font-weight: 700;

  @media (max-width: 480px) {
    font-size: 24px;
    margin: 10px;
  }
`;

const App = ({
  isAudioOn,
  toggleAudio,
  rulesModalOpen,
  toggleRulesModal,
  boardsModalOpen,
  toggleBoardsModal,
  theme,
  changeTheme,
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
    <Container theme={theme} className={theme}>
      {theme !== THEMES.DEFAULT && <Music theme={theme} isAudioOn={isAudioOn} toggleAudio={toggleAudio} />}

      {theme === THEMES.CHRISTMAS && <Snow />}

      <Title>Peg Solitaire</Title>

      <Navigation
        undo={undo}
        restart={restart}
        toggleBoardsModal={toggleBoardsModal}
        toggleRulesModal={toggleRulesModal}
      />

      <Board handlePegClick={handlePegClick} pegs={pegs} width={width} height={height} boardType={boardType} />

      <Score stepNumber={stepNumber} pegNumber={pegNumber} boardType={boardType} />

      <ThemeSelect changeTheme={changeTheme} theme={theme} />

      <StateModal
        gameState={gameState}
        stepNumber={stepNumber}
        pegNumber={pegNumber}
        restart={restart}
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
    </Container>
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
