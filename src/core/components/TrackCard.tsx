import { styled, Grid, Typography, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import moment from 'moment';
import React from 'react'
const CardContainer = styled(Grid)(({ theme }) => ({
  width: "100%",
  height: "100%",
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
  height: "auto",
  borderRadius: "8px",
  marginBottom: "8px",
});
const EllipsisTypography = styled(Typography)({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
const Overlay = styled('div')({
  position: "absolute",
  opacity: 0,
  transform: "translate3d(0px, 0px, 0px)",
  transition: "opacity 0.3s ease-in-out",
  top: 0,
  right: '10px',
});
interface CardProps {
  name: string | undefined;
  artistName?: string | undefined;
  image: string | undefined;
  duration_ms?: number | undefined;
}
const TrackCard = ({ name, artistName, image, duration_ms }: CardProps) => {
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
        <Overlay className="overlay">
          <AddCircleOutlineIcon />
        </Overlay>
      </Grid>
      <Grid size={2}>{duration_ms ? moment(duration_ms).format("mm:ss") : "Uknown"}</Grid>
    </CardContainer>
  )
}

export default TrackCard

