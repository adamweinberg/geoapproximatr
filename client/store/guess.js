import { calculateDistance } from "../../script/calcs";

//ACTION TYPE
export const SUBMIT_GUESS = 'SUBMIT_GUESS'
export const GOT_DISTANCE = "GOT_DISTANCE";
export const GOT_SCORE = "GOT_SCORE";

//ACTION CREATOR
export const submitGuess = (guess) => {
  return {
    type: SUBMIT_GUESS,
    guess
  }
}

export const gotDistance = (distance) => {
  return {
    type: GOT_DISTANCE,
    distance,
  };
};

export const gotScore = (score) => {
  return {
    type: GOT_SCORE,
    score,
  };
};

//THUNK
export const getDistance = (guess, location) => {
  return async (dispatch) => {
    const distance = calculateDistance(guess, location);
    dispatch(gotDistance(distance))
  };
};

//REDUCER
export default function guessReducer(state = {}, action) {
  switch (action.type) {
    case SUBMIT_GUESS:
      return action.guess
    case GOT_DISTANCE:
      return {...state, distance: action.distance}
    default:
      return state
  }
}

