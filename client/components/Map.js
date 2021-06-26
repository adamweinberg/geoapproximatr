import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GoogleMapReact from 'google-map-react'
import guessMarker from '../../public/guess-marker.png'

const Map = () => {
  const dispatch = useDispatch()

  const [coords, setCoords] = useState({latitude: 0, longitude: 0})

  const defaultProps = {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 2
  }

  const API_KEY="AIzaSyDS1KQ2VDCVYv0pTJzcrRIN3xbWzzChJLg" //move this elsewhere

  const placeMarker = (event) => {
    setCoords({latitude: event.lat, longitude: event.lng})
  }

  return (
    <div style={{height: '300px', width: '100%'}}>
      <GoogleMapReact bootstrapURLKeys={{ key: API_KEY }} defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom} yesIWantToUseGoogleMapApiInternals onClick={placeMarker}>
        <img src={guessMarker} lat={coords.latitude} lng={coords.longitude} height='30px' width='30px' style={{transform: 'translate(-15px, -30px)'}}/>
      </GoogleMapReact>
    </div>
  )
}

export default Map
