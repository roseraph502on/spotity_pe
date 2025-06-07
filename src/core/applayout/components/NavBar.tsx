import { Avatar, Box } from '@mui/material'
import React from 'react'
import LoginBtn from '../../components/LoginBtn'
import useGetCrruentUserProfile from '../../../hooks/useGetCurrentUserProfile'
import { useNavigate } from 'react-router'

const NavBar = () => {
  const {data:userProfile}=useGetCrruentUserProfile()
  console.log("userProfile",userProfile);

  const navigate = useNavigate();
  const logoClk = ()=>{
    navigate('/');
  }
  return (
      <Box display="flex" justifyContent="flex-end" alignItems="center" height="64px">
        <Avatar src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png"
        onClick={logoClk}
        sx={{marginRight:"auto",cursor:"pointer"}} />
       {userProfile? (<Avatar src={userProfile.images[0]?.url} />
)
       :( <LoginBtn/> ) } 
      </Box>
    
  )
}

export default NavBar

