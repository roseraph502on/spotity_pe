import { Avatar, Box, Menu, MenuItem } from '@mui/material'
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
  //로그아웃
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogoutClose = () => {
    setAnchorEl(null)
    localStorage.removeItem("access_token");
    window.location.reload;
  };
  return (
      <Box display="flex" justifyContent="flex-end" alignItems="center" height="64px">
        <Avatar src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png"
        onClick={logoClk}
        sx={{marginRight:"auto",cursor:"pointer"}} />
       {userProfile? (
        <Avatar src={userProfile.images[0]?.url}
        onClick={handleClick}
         />
)
       :( <LoginBtn/> ) }
       <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleLogoutClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem onClick={handleLogoutClose}>Logout</MenuItem>
      </Menu> 
      </Box>
    
  )
}

export default NavBar

