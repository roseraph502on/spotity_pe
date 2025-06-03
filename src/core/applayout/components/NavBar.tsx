import { Box } from '@mui/material'
import React from 'react'
import LoginBtn from '../../components/LoginBtn'

const NavBar = () => {
  return (
      <Box display="flex" justifyContent="flex-end" alignItems="center" height="64px">
        <LoginBtn/>
      </Box>
    
  )
}

export default NavBar

