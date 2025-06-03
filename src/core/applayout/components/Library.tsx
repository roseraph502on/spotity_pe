import AddIcon from '@mui/icons-material/Add';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { styled } from '@mui/system';
import { green } from '@mui/material/colors';
import React from 'react'
import { EmptyPlaylist } from './EmptyPlaylist';

const Library = () => {
  const Head = styled('ul')(({ theme }) => ({
    display: 'flex',
    width:"100%",
    alignItems: 'center',
    padding: theme.spacing(1),
}));
const LibraryText = styled('h3')(({ theme }) => ({
      margin: 'auto',

}));
  return (
    <div>
      <Head>
        <BookmarkIcon/>
        <LibraryText>Your Library</LibraryText>
        <AddIcon />        
      </Head>
      <div>
        <EmptyPlaylist/>
      </div>
    </div>
  )
}

export default Library

