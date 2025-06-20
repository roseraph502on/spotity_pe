import React from 'react'
import { Outlet } from 'react-router'
import { Box, Grid, styled } from '@mui/material'
import NavBox from './components/NavBox';
import Library from './components/Library';
import NavBar from './components/NavBar';
import BottomNav from './components/BottomNav';

const Layout = styled("div")({
  display: "flex",
  height: "100vh",
  maxHeight:'100vh',
  padding: "8px",
  gap: '10px',
})
const Sidebar = styled("div")(({ theme }) => ({
  width: "331px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
  gap: '10px',
}));
const ContentBox = styled(Box)(({ theme }) => ({
    borderRadius: '10px',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    width: '100%',
    padding: '10px',
}));
const BottomBar = styled('div')(({ theme }) => ({
  width:'100%',
  height:'10vh',
  display: 'none',
  [theme.breakpoints.down("sm")]: {
    display: 'block',
  },
}))
const AppLayout = () => {
  return (
    <Layout>
      {/* 왼쪽 Sidebar 영역 */}
      <Sidebar>
        {/* 1 */}
        <ContentBox>
          <NavBox/>
        </ContentBox>
        {/* 2 */}
        <ContentBox sx={{ flexGrow: 1}}>
          <Library />
        </ContentBox>
      </Sidebar>
      {/* 3  : Sidebar 옆의 메인 콘텐츠 영역 */}
      <Box  sx={{display: 'flex', flexGrow: 1,flexDirection: 'column'}}>
        <ContentBox  height={{xs:'90vh', sm:'100vh'}}
        sx={{ padding:"0 20px", display: 'flex',flexDirection: 'column',}}>
          <NavBar/>
          <Box sx={{overflowY: 'auto','&::-webkit-scrollbar': { display: 'none' } , marginTop:'10px'}}>
           <Outlet />
          </Box>
        </ContentBox>
        <BottomBar>
          <BottomNav />
        </BottomBar>
      </Box>

    </Layout>
  )
}

export default AppLayout
