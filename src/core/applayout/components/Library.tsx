import AddIcon from '@mui/icons-material/Add';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Box, styled } from '@mui/system';
import { EmptyPlaylist } from './EmptyPlaylist';
import useGetCurrentUserPlaylists from '../../../hooks/useGetCurrentUserPlayList';
import Error from '../../inform/Error';
import Loading from '../../inform/Loading';

const Library = () => {
  const Head = styled('ul')(({ theme }) => ({
    display: 'flex',
    width: "100%",
    alignItems: 'center',
    padding: theme.spacing(1),
  }));
  const LibraryText = styled('h3')(({ theme }) => ({
    margin: 'auto',

  }));

  const { data: playlist, error, isLoading } = useGetCurrentUserPlaylists({ limit: 7, offset: 0 })
  console.log("playlist", playlist)
  if (isLoading) { return <Loading /> }
  if (error) { return <Error errorMessage={error.message} /> }
  return (
    <div>
      <Head>
        <BookmarkIcon />
        <LibraryText>Your Library</LibraryText>
        <AddIcon />
      </Head>
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {playlist ? (<div></div>) :
          <EmptyPlaylist />
        }
      </Box>
    </div>
  )
}

export default Library

