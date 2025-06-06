import { Button } from '@mui/material'
import React from 'react'
import { getSpotifyAuthUrl } from '../../utill/auth'

const LoginBtn = () => {
  const login=()=> {
      getSpotifyAuthUrl()
  }
  return (
      <Button variant="contained" color='secondary' size='large' onClick={login}>
        LogIn
      </Button>
  )
}

export default LoginBtn

