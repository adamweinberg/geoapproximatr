export const SAVE_DISTANCE = "SAVE_DISTANCE";
export const SAVE_SCORE = "SAVE_SCORE";
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

export const resetGame = () => {
  return {
    type: RESET_GAME
  }
}

const initialState = {
  distances: [],
  scores: [],
}

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_DISTANCE:
      return {...state, distances: [...state.distances, action.distance]}
    case SAVE_SCORE:
      return {...state, scores: [...state.scores, action.score]}
    case RESET_GAME:
      return initialState
    default:
      return state
  }
}
