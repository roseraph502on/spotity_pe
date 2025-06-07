import { Avatar, Box } from '@mui/material'
import React from 'react'
import LoginBtn from '../../components/LoginBtn'
import useGetCrruentUserProfile from '../../../hooks/useGetCurrentUserProfile'

const NavBar = () => {
  const {data:userProfile}=useGetCrruentUserProfile()
  console.log("userProfile",userProfile);
  return (
      <Box display="flex" justifyContent="flex-end" alignItems="center" height="64px">
       {userProfile? (<Avatar src={userProfile.images[0]?.url} />
)
       :( <LoginBtn/> ) } 
      </Box>
    
  )
}

export default NavBar

