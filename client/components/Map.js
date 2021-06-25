import React from 'react'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'

const Map = withScriptjs(withGoogleMap(() => {
  return (
    <GoogleMap defaultZoom={2} defaultCenter={{lat: 0, lng: 0}} />
  )
}))

export default Map
