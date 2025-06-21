import AddIcon from '@mui/icons-material/Add';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Box, styled } from '@mui/system';
import { EmptyPlaylist } from './EmptyPlaylist';
import useGetCurrentUserPlaylists from '../../../hooks/useGetCurrentUserPlayList';
import Error from '../../inform/Error';
import Loading from '../../inform/Loading';
import useGetCrruentUserProfile from '../../../hooks/useGetCurrentUserProfile';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import Playlist from './Playlist';
import { Button } from '@mui/material';
import useCreatePlaylist from '../../../hooks/useCreatePlaylist';

const Head = styled('ul')(({ theme }) => ({
  display: 'flex',
  width: "100%",
  alignItems: 'center',
  padding: theme.spacing(1),
}));
const HeadBTN = styled(Button)(({ theme }) => ({
  minWidth: '25px',
  padding: '2px'
}));
const LibraryText = styled('h3')(({ theme }) => ({
  margin: 'auto',

}));


const Library = () => {
  //유저 정보
  const { data: user, isLoading: isUserLoading, error: userError } = useGetCrruentUserProfile();
  //플레이 리스트
  const { ref, inView } = useInView();
  const { data: playlist, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetCurrentUserPlaylists(
    { limit: 7, offset: 0 })
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView])
  const { mutate: createList } = useCreatePlaylist()
  // console.log("playlist", playlist)
  // 유저 정보 로딩 중 또는 에러 발생 시 처리
  if (isUserLoading) return <>loading ...</>;
  if (userError) return <Error errorMessage={userError.message} />;
  // 유저 정보는 로드되었지만 데이터가 없는 경우 (예: 로그인 안 함) 처리
  if (!user) return <EmptyPlaylist />;

  // 플레이리스트 로딩 중 또는 에러 발생 시 처리 (유저 정보 로드 후에만 이 로직 실행)
  if (isLoading) return <Loading />;
  if (error) return <Error errorMessage={error.message} />;

  const createListClk = () => {
    createList({ name: "my playist" })
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Head>
        <HeadBTN>
          <BookmarkIcon />
        </HeadBTN>
        <LibraryText>Your Library</LibraryText>
        <HeadBTN onClick={createListClk}>
          <AddIcon />
        </HeadBTN>
      </Head>
      <Box sx={{
        height:{xs:'100%',md:'300px'},
        flexGrow: 1,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        backgroundColor:'#111'
      }} >
        {!playlist || playlist?.pages[0].total === 0 ?
          <EmptyPlaylist />
          : (
            <div>
              {playlist?.pages.map((page, index) => (
                <Playlist playlists={page.items} key={index} />
              ))}
              <div ref={ref}></div>
            </div>
          )

        }
      </Box>
    </Box>
  )
}

export default Library

