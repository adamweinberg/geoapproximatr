import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GoogleStreetview from 'react-google-streetview'
import { getLocation } from '../store/location'

const StreetView = () => {
  const dispatch = useDispatch()
  const { location } = useSelector(state => state)

  const [ gotNewLocation, setGotNewLocation ] = useState(false) //none of this is really necessary, im just trying to not render the streetview until the new location is loaded on state. will pick this up for future improvements

  useEffect(() => {
    dispatch(getLocation())
  }, [])

  useEffect(() => {
    setGotNewLocation(true)
  }, [location])

  const API_KEY="AIzaSyCRpVQa_Ey33lyDwTc3OpOhHVcfyD0YVAE" //move this elsewhere
  const panoramaOptions = {
    position: {
      lat: location.latitude,
      lng: location.longitude
    },
    addressControl: false,
    showRoadLabels: false,
    zoom: 0,
    fullscreenControl: false,
  }

  return (
    <div style={{height: '80vh'}}>
      {!gotNewLocation ? <span>loading</span> : <GoogleStreetview apiKey={API_KEY} streetViewPanoramaOptions={panoramaOptions} /> }
    </div>
  )
}

export default StreetView
