import React from 'react'
import { Outlet } from 'react-router'
import { styled } from '@mui/material'
import NavBox from './components/NavBox';
import Library from './components/Library';

const Layout = styled("div")({
  display: "flex",
  height: "100vh",
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
const ContentBox = styled('div')(({ theme }) => ({
    borderRadius: '10px',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    width: '100%',
    padding: '10px',
}));
const AppLayout = () => {
  return (
    <Layout>
      <Sidebar>
        {/* 1 */}
        <ContentBox>
          <NavBox/>
        </ContentBox>
        {/* 2 */}
        <ContentBox sx={{ flexGrow: 1 }}>
          <Library />
        </ContentBox>
        {/* 3 */}

      </Sidebar>
        <ContentBox  sx={{ padding:"20px"}}>
           <Outlet />
        </ContentBox>
    </Layout>
  )
}

export default AppLayout
