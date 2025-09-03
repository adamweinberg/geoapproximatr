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
    try {
      const location = await randomStreetView.getRandomLocation()
      
      // Validate that we got a valid location
      if (!location || location === false || !Array.isArray(location) || location.length !== 2) {
        throw new Error('Invalid location returned from randomStreetView')
      }
      
      const [lat, lng] = location
      
      // Validate coordinates are valid numbers
      if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) {
        throw new Error('Invalid coordinates received')
      }
      
      // Validate coordinates are in valid ranges
      if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        throw new Error('Coordinates out of valid range')
      }
      
      const locationObj = {latitude: lat, longitude: lng}
      dispatch(gotLocation(locationObj))
      
    } catch (error) {
      console.error('Error getting location:', error)
      // You could dispatch an error action here if you have one
      throw error // Re-throw so the component can handle it
    }
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
