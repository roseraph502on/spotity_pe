import { styled, Grid, Typography, Box, Menu, MenuItem, Alert } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import useGetCrruentUserProfile from '../../hooks/useGetCurrentUserProfile';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlayList';
import { useInView } from 'react-intersection-observer';
import useAddPlaylist from '../../hooks/useAddPlaylist';

const CardContainer = styled(Grid)(({ theme }) => ({
  width: "100%",
  height: "auto",
  maxHeight: '70px',
  padding: "12px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translate3d(0px, 0px, 0px)",
    transition: "opacity 0.3s ease-in-out",
  },
  "&:hover .overlay": {
    opacity: 1,
  },
  '@media (max-width: 396px)': {
    padding: "6px",
  },
}));
const Image = styled("img")({
  maxWidth: '40px',
  width: "100%",
  aspectRatio: '1 / 1',
  borderRadius: "8px",
  marginBottom: "8px",
});
const EllipsisTypography = styled(Typography)({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
const Overlay = styled('button')(({ theme }) => ({
  position: "absolute",
  opacity: 0,
  transform: "translate3d(0px, 0px, 0px)",
  transition: "opacity 0.3s ease-in-out",
  top: '10px',
  right: '20px',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  "&:hover .plus": {
    color: theme.palette.success.main,
  }
}));
interface CardProps {
  name: string | undefined;
  artistName?: string | undefined;
  image: string | undefined;
  duration_ms?: number | undefined;
  uri?: string | undefined;
}
const TrackCard = ({ name, artistName, image, duration_ms, uri }: CardProps) => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  // 검색된 노래 플리에 추가
  const { data: user } = useGetCrruentUserProfile();
  const { ref, inView } = useInView();
  const { data: playlist, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage }
    = useGetCurrentUserPlaylists({ limit: 7, offset: 0 })
  const { mutate: addList, isPending, isSuccess } = useAddPlaylist()
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {

      fetchNextPage();
    }
  }, [inView])

  // console.log("user", user)
  // 추가 버튼 클릭 시
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!user) {

      return;
    }
    setAnchorEl(event.currentTarget);
  };
  // 플리 선택 시
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlePlaylistSelect 
  = (selectedPlaylist: string | undefined, 
    name: string | undefined, 
    uri: string | undefined,
    albumName: string | undefined,) => {
    if (selectedPlaylist && name && uri) {
      addList({
        playlist_id: selectedPlaylist, uris: [uri]
        , trackName: name ,albumName: albumName
      })
    }

    handleClose();
  }
  return (
    <CardContainer size={12} container>
      <Grid size={2}><Image src={image} /></Grid>
      <Grid size={8} container style={{ position: "relative" }}>
        <Box sx={{ width: '85%' }}>
          <EllipsisTypography variant="h2">{name || "No name"}</EllipsisTypography>
          <EllipsisTypography variant="body1" color="text.secondary">
            {artistName || "No artist"}
          </EllipsisTypography>
        </Box>
        <Overlay className="overlay" onClick={handleClick}>
          <AddCircleOutlineIcon className="plus" color="disabled" />
        </Overlay>
      </Grid>
      <Grid size={2}>{duration_ms ? moment(duration_ms).format("mm:ss") : "Uknown"}</Grid>
      {/* 플레이리스트 */}
      {user && (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              'aria-labelledby': 'basic-button',
            },
          }}
        >
          {!playlist || playlist.pages.length === 0 || playlist.pages.every(page => !page.items || page.items.length === 0) ?
            ('')
            : (
              playlist.pages.map((page, pageIndex) => (
                Array.isArray(page.items) && page.items.map((playlistItem, itemIndex) => (
                  <MenuItem key={`${pageIndex}-${itemIndex}`}
                    onClick={() => handlePlaylistSelect(playlistItem.id, name, uri , playlistItem.name)}
                  >
                    {playlistItem.name}
                  </MenuItem>
                ))
              ))
            )}
          <div ref={ref}></div>
        </Menu>
      )}

    </CardContainer>

  )
}

export default TrackCard

