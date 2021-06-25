import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GoogleStreetview from 'react-google-streetview'
import { getLocation } from '../store/location'

const StreetView = () => {
  const dispatch = useDispatch()
  const { location } = useSelector(state => state)

  useEffect(() => {
    dispatch(getLocation())
  }, [])

  const API_KEY="AIzaSyCRpVQa_Ey33lyDwTc3OpOhHVcfyD0YVAE"
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
    <div style={{height: '800px'}}>
      {location ? <GoogleStreetview apiKey={API_KEY} streetViewPanoramaOptions={panoramaOptions} /> : <span>loading</span> }
    </div>
  )
}

export default StreetView
