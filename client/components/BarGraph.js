import React from 'react'
import { LinearProgress } from '@material-ui/core'

const BarGraph = (props) => {
  const { score } = props

  return (
    <LinearProgress id='score-slider' variant="determinate" value={score / 50} /> //value = score * 100 / possible 5000
  )
}

export default BarGraph
