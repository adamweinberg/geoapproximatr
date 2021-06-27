import axios from "axios"

//ACTION TYPE
export const GOT_LOCATION = 'GOT_LOCATION'
export const RESET_LOCATION = 'RESET_LOCATION'

//ACTION CREATOR
export const gotLocation = location => {
  return {
    type: GOT_LOCATION,
    location
  }
}

export const resetLocation = () => {
  return {
    type: RESET_LOCATION
  }
}

//THUNK
export const getLocation = () => {
  return async dispatch => {
    const location = {latitude: 34.0880321, longitude: -118.3255821}
    dispatch(gotLocation(location))
  }
}

const initialState = {
  latitude: '',
  longitude: ''
}

//REDUCER
export default function locationReducer (state = initialState, action) {
  switch(action.type) {
    case GOT_LOCATION:
      return action.location
    case RESET_LOCATION:
      return initialState
    default:
      return state
  }
}
