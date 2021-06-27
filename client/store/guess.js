//ACTION TYPE
export const SUBMIT_GUESS = 'SUBMIT_GUESS'
export const SAVE_DISTANCE = "SAVE_DISTANCE";
export const SAVE_SCORE = "SAVE_SCORE";
export const RESET_GUESS = 'RESET_GUESS'

//ACTION CREATOR
export const submitGuess = (guess) => {
  return {
    type: SUBMIT_GUESS,
    guess
  }
}

export const resetGuess = () => {
  return {
    type: RESET_GUESS
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
    case RESET_GUESS:
      return initialState
    default:
      return state
  }
}

