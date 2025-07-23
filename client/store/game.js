export const SAVE_DISTANCE = "SAVE_DISTANCE";
export const SAVE_SCORE = "SAVE_SCORE";
export const SAVE_ROUND_DATA = "SAVE_ROUND_DATA";
export const RESET_GAME = 'RESET_GAME'

export const saveDistance = (distance) => {
  return {
    type: SAVE_DISTANCE,
    distance,
  };
};

export const saveScore = (score) => {
  return {
    type: SAVE_SCORE,
    score,
  };
};

export const saveRoundData = (roundData) => {
  return {
    type: SAVE_ROUND_DATA,
    roundData,
  };
};

export const resetGame = () => {
  return {
    type: RESET_GAME
  }
}

const initialState = {
  distances: [],
  scores: [],
  rounds: [],
}

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_DISTANCE:
      return {...state, distances: [...state.distances, action.distance]}
    case SAVE_SCORE:
      return {...state, scores: [...state.scores, action.score]}
    case SAVE_ROUND_DATA:
      return {...state, rounds: [...state.rounds, action.roundData]}
    case RESET_GAME:
      return initialState
    default:
      return state
  }
}
