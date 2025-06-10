import React from 'react'
import { Navigate, useParams } from 'react-router'
import useGetPlaylist from '../hooks/useGetPlaylist';
import { Avatar, Box, Grid, styled, Typography } from '@mui/material';
import Loading from '../core/inform/Loading';
import Error from '../core/inform/Error';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const Img = styled('img')({
  width: "100%",
  height: "auto",
  borderRadius:"20px",
})
const ImageGrid = styled(Grid) (({ theme }) =>({
    borderRadius:"20px",
    backgroundColor: theme.palette.background.paper,
    display:"flex",
    justifyContent: "center",
    alignItems:"center"

}));
const PliTnform = styled(Grid) ({
  backgroundColor: 'black',
  padding: "16px",
  borderRadius:"20px",

})
const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  if (id === undefined) return <Navigate to="/" />
  const { data: detail, error, isLoading } = useGetPlaylist({ playlist_id: id });
  console.log("detail", detail)
  if (isLoading) return <Loading />;
  if (error) return <Error errorMessage={error.message} />;
 
 
  return (
    <div>
      <PliTnform container spacing={2} >
        <ImageGrid size={{ xs: 12, md: 2 }} >
          {detail?.images ? (
            <Img src={detail.images[0]?.url} alt="" />
          ) : (
              <MusicNoteIcon fontSize="large" />
          )}
        </ImageGrid>
        <Grid  size={{ xs: 12, md: 10 }}>
          <h2>{detail?.name}</h2>
          <Box sx={{ display: "flex" }}>
            <Avatar sx={{ width: "20px", height: "20px" }}
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png" />
            <Typography fontWeight={700} marginLeft={'7px'}>{detail?.owner?.display_name
              ? detail?.owner?.display_name
            :  "unknown" } </Typography>
            <Typography fontWeight={700} marginLeft={'5px'}>• {detail?.tracks?.total
              ? detail?.tracks?.total
            : "0"} song</Typography>
          </Box>
        </Grid>
      </PliTnform>
    {/* 리스트 */}
      
    </div>
  )
}

export default PlaylistDetailPage

