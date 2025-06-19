import React, { useMemo } from 'react';
import Error from '../../core/inform/Error';
import Card from '../../core/components/MusicCard';
import { Grid, Typography, Box, CircularProgress } from '@mui/material';
import useSearchItemsByKeyword from '../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../models/serach';
import { Track as SpotifyTrack } from '../../models/Track';
import LoadingSpinner from '../../core/inform/LoadingSpinner';

const randomKeyword = [
  'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
]
const Tracks = () => {
  const selectedKeyword = useMemo(() => {
  const randomIndex = Math.floor(Math.random() * randomKeyword.length);
  return randomKeyword[randomIndex];
  }, []);
  const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage }
    = useSearchItemsByKeyword({
      q: selectedKeyword,
      type: [SEARCH_TYPE.Track],
      limit: 6
    });
  if (isLoading) { return <LoadingSpinner /> }
  if (error) { return <Error errorMessage={error.message} /> }
  return (
    <Box sx={{ mt: 2 }}>
      <h2>Tracks</h2>

      {data && data.pages && data.pages.length > 0 && data.pages.some(page => page.tracks?.items && page.tracks.items.length > 0) ? (
        <Grid container spacing={2}>
          {data.pages.map((page, pageIndex) => (
            page.tracks?.items && Array.isArray(page.tracks.items) &&
            page.tracks.items.map((track: SpotifyTrack, trackIndex) => (
              <Grid size={{ xs: 6, sm: 4, lg: 2 }} key={track.id}>
                <Card
                  image={track.album?.images?.[0]?.url}
                  name={track.name}
                  artistName={track.artists?.map(artist => artist.name).join(', ') || 'Unknown Artist'}
                />
              </Grid>
            ))
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" sx={{ mt: 2 }}>No tracks found for keyword "{'a'}"</Typography>
      )}

      {isFetchingNextPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}

export default Tracks;
