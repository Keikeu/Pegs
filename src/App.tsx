import React from "react";

import Board from "./components/Board";
import Music from "./components/Music";
import Snow from "./components/Snow";
import Score from "./components/Score";
import Navigation from "./components/Navigation";
import ThemeSelect from "./components/ThemeSelect";
import RulesModal from "./components/RulesModal";
import StateModal from "./components/StateModal";
import BoardsModal from "./components/BoardsModal";
import { THEMES } from "./constants";
import styled, { css } from "styled-components";
import NeonJPG from "./media/images/neon.jpg";

const Container = styled.div<{ theme: string }>`
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
  margin: 16px;
  font-size: 32px;
  font-weight: 700;

  @media (max-width: 480px) {
    font-size: 24px;
    margin: 12px;
  }
`;

interface Props {
  isAudioOn: boolean;
  toggleAudio: () => void;
  rulesModalOpen: boolean;
  toggleRulesModal: () => void;
  boardsModalOpen: boolean;
  toggleBoardsModal: () => void;
  theme: string;
  changeTheme: (theme: string) => void;
  stepNumber: number;
  pegs: number[][];
  handlePegClick: (x: number, y: number) => void;
  width: number;
  height: number;
  boardType: string;
  pegNumber: number;
  gameState: string | null;
  setGameState: (state: string | null) => void;
  changeBoard: (index: number) => void;
  undo: () => void;
  restart: () => void;
  pegsToMove: number[][];
  activePegs: number[][];
}

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
  pegsToMove,
  activePegs,
}: Props) => {
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

      <Board
        handlePegClick={handlePegClick}
        pegs={pegs}
        pegsToMove={pegsToMove}
        activePegs={activePegs}
        width={width}
        height={height}
        boardType={boardType}
      />

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
          initialIndex={parseInt(localStorage.getItem("board") || "0")}
          changeBoard={changeBoard}
          closeModal={toggleBoardsModal}
        />
      )}
    </Container>
  );
};

export default App;
