import React from 'react'
import NewRelease from './components/NewRelease'
import Tracks from './components/Tracks'
import { Album } from '@mui/icons-material'
import Albums from './components/Albums'

const Homepage = () => {
  return (
    <div>
    <NewRelease/>
    <Tracks />
    <Albums />
    </div>
  )
}

export default Homepage

