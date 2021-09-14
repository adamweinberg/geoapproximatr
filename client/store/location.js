import randomStreetView from '../../script/random-streetview'
//import randomStreetView from 'random-streetview'

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
    const location = await randomStreetView.getRandomLocation()
    const locationObj = {latitude: location[0], longitude: location[1]}
    //const locationObj = {latitude: 54.7141104563471, longitude: 45.010128021240234 } //for testing
    dispatch(gotLocation(locationObj))
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
