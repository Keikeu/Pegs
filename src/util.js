import { BOARD_TYPES, GAME_STATES, PEGS } from "./constants";

export function findActivePegs(pegs, width, height) {
  let pegsActive = [];

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (pegs[i][j] === PEGS.ACTIVE) {
        pegsActive.push([i, j]);
      }
    }
  }
  return pegsActive;
}

export function findPegsToMove(pegs, width, height) {
  let pegsToMove = [];

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (
        pegs[i][j] === PEGS.REGULAR &&
        ((i - 2 >= 0 &&
          [PEGS.REGULAR, PEGS.ACTIVE].includes(pegs[i - 1][j]) &&
          [PEGS.EMPTY, PEGS.EMPTY_HIGHLIGHTED].includes(pegs[i - 2][j])) ||
          (i + 2 <= height - 1 &&
            [PEGS.REGULAR, PEGS.ACTIVE].includes(pegs[i + 1][j]) &&
            [PEGS.EMPTY, PEGS.EMPTY_HIGHLIGHTED].includes(pegs[i + 2][j])) ||
          (j - 2 >= 0 &&
            [PEGS.REGULAR, PEGS.ACTIVE].includes(pegs[i][j - 1]) &&
            [PEGS.EMPTY, PEGS.EMPTY_HIGHLIGHTED].includes(pegs[i][j - 2])) ||
          (j + 2 <= width - 1 &&
            [PEGS.REGULAR, PEGS.ACTIVE].includes(pegs[i][j + 1]) &&
            [PEGS.EMPTY, PEGS.EMPTY_HIGHLIGHTED].includes(pegs[i][j + 2])))
      ) {
        pegsToMove.push([i, j]);
      }
    }
  }

  return pegsToMove;
}

export function findHolesToFill(pegs, i, j, width, height) {
  let holesToFill = [];

  if (
    i - 2 >= 0 &&
    [PEGS.REGULAR, PEGS.ACTIVE].includes(pegs[i - 1][j]) &&
    [PEGS.EMPTY, PEGS.EMPTY_HIGHLIGHTED].includes(pegs[i - 2][j])
  ) {
    holesToFill.push([i - 2, j]);
  }
  if (
    i + 2 <= height - 1 &&
    [PEGS.REGULAR, PEGS.ACTIVE].includes(pegs[i + 1][j]) &&
    [PEGS.EMPTY, PEGS.EMPTY_HIGHLIGHTED].includes(pegs[i + 2][j])
  ) {
    holesToFill.push([i + 2, j]);
  }
  if (
    j - 2 >= 0 &&
    [PEGS.REGULAR, PEGS.ACTIVE].includes(pegs[i][j - 1]) &&
    [PEGS.EMPTY, PEGS.EMPTY_HIGHLIGHTED].includes(pegs[i][j - 2])
  ) {
    holesToFill.push([i, j - 2]);
  }
  if (
    j + 2 <= width - 1 &&
    [PEGS.REGULAR, PEGS.ACTIVE].includes(pegs[i][j + 1]) &&
    [PEGS.EMPTY, PEGS.EMPTY_HIGHLIGHTED].includes(pegs[i][j + 2])
  ) {
    holesToFill.push([i, j + 2]);
  }

  return holesToFill;
}

export function deleteTheMiddlePeg(i, j, holesToFill, pegs) {
  if (i > holesToFill[0][0]) {
    pegs[i - 1][j] = PEGS.EMPTY;
  } else if (i < holesToFill[0][0]) {
    pegs[i + 1][j] = PEGS.EMPTY;
  } else if (j > holesToFill[0][1]) {
    pegs[i][j - 1] = PEGS.EMPTY;
  } else {
    pegs[i][j + 1] = PEGS.EMPTY;
  }

  return pegs;
}

export function isInArray(array, item) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][0] === item[0] && array[i][1] === item[1]) {
      return true;
    }
  }
  return false;
}

export function calculateGameState(pegsNumber, pegsToMove, pegsActive, pegs, boardType, stepNumber) {
  let state = null;

  if (pegsToMove.length === 0 && pegsActive.length === 0) {
    if (pegsNumber === 1) {
      if (boardType === BOARD_TYPES.TUTORIAL) {
        state = GAME_STATES.TUTORIAL_WIN;
      } else if (
        (boardType === BOARD_TYPES.ENGLISH && pegs[3][3] === PEGS.REGULAR) ||
        (boardType === BOARD_TYPES.GERMAN && pegs[4][4] === PEGS.REGULAR) ||
        (boardType === BOARD_TYPES.ASYMMETRICAL && pegs[3][4] === PEGS.REGULAR) ||
        (boardType === BOARD_TYPES.SQUARE && pegs[2][3] === PEGS.REGULAR) ||
        (boardType === BOARD_TYPES.DIAMOND && pegs[4][4] === PEGS.REGULAR)
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
