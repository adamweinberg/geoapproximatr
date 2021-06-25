import axios from "axios"

//ACTION TYPE
export const GOT_LOCATION = 'GOT_LOCATION'

//ACTION CREATOR
export const gotLocation = location => {
  return {
    type: GOT_LOCATION,
    location
  }
}

//THUNK
export const getLocation = () => {
  return async dispatch => {
    const location = {latitude: 34.0880321, longitude: -118.3255821}
    dispatch(gotLocation(location))
  }
}

//REDUCER
export default function locationReducer (state = {}, action) {
  switch(action.type) {
    case GOT_LOCATION:
      return action.location
    default:
      return state
  }
}
