//ACTION TYPE
export const SUBMIT_GUESS = 'SUBMIT_GUESS'
export const SAVE_DISTANCE = "SAVE_DISTANCE";
export const SAVE_SCORE = "SAVE_SCORE";

//ACTION CREATOR
export const submitGuess = (guess) => {
  return {
    type: SUBMIT_GUESS,
    guess
  }
}

const initialState = {
  latitude: '',
  longitude: '',
}

//REDUCER
export default function guessReducer(state = initialState, action) {
  switch (action.type) {
    case SUBMIT_GUESS:
      return action.guess
    default:
      return state
  }
}

