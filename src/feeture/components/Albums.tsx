import { Grid, Box, CircularProgress } from '@mui/material';
import useSearchItemsByKeyword from '../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../models/serach';
import LoadingSpinner from '../../core/inform/LoadingSpinner';
import Error from '../../core/inform/Error';
import Card from '../../core/components/MusicCard';
import { useMemo } from 'react';

const randomKeyword = [
  'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
]
const Albums = () => {
    const selectedKeyword = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * randomKeyword.length);
    return randomKeyword[randomIndex];
    }, []);
  const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage }
    = useSearchItemsByKeyword({
      q: selectedKeyword,
      type: [SEARCH_TYPE.Album],
      limit: 6
    });
  if (isLoading) { return <LoadingSpinner /> }
  if (error) { return <Error errorMessage={error.message} /> }
  return (
    <Box sx={{ mt: 2 }}>
      <h2>Albums</h2>

      {data && data.pages && data.pages.length > 0 && data.pages.some(page => page.albums?.items && page.albums.items.length > 0) ? (
        <Grid container spacing={2}>
          {data.pages.map((page, pageIndex) => (
            page.albums?.items && Array.isArray(page.albums.items) &&
            page.albums.items.map((albums, trackIndex) => (
              <Grid size={{ xs: 6 ,sm:4, lg: 2 }} key={albums.id}>
                <Card
                  image={albums.images?.[0]?.url}
                  name={albums.name}
                  artistName={albums.artists?.map(artist => artist.name).join(', ') || 'Unknown Artist'}
                />
              </Grid>
            ))
          ))}
        </Grid>
      ) : (
        <h2>No tracks found for keyword "{'a'}"</h2>
      )}

    </Box>
  )
}

export default Albums

