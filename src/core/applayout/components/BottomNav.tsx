import { Button, Grid, styled } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { NavLink } from 'react-router-dom';

const NavButtonGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

}))
const NavButton = styled(NavLink)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  textDecoration: 'none',
  color: theme.palette.text.secondary,

  '&:hover': {
    color: theme.palette.text.primary,
  },
  '&.active': {
    color: theme.palette.text.primary,
  },
}))
const BottomNav = () => {
  return (
    <Grid container  height="100%">
      <NavButtonGrid size={4}>
        <NavButton to='/search'>
          <SearchIcon />
          search
        </NavButton>
      </NavButtonGrid>
      <NavButtonGrid size={4}>
        <NavButton to='/'>
          <HomeIcon />
          Home
        </NavButton>
      </NavButtonGrid>
      <NavButtonGrid size={4}>
        <NavButton to='/library'>
          <BookmarkIcon />
          My Library
        </NavButton>
      </NavButtonGrid>
    </Grid>
  )
}

export default BottomNav

