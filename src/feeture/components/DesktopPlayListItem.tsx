import React from 'react'
import { PlaylistTrack } from '../../models/playlist';
import { styled, TableCell, TableRow } from '@mui/material';
import { Episode, Track } from '../../models/Track';
import moment from 'moment';

//style
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
}));

//type
interface DesktopPlayListItemProps{
  index: number;
  item: PlaylistTrack;
}
const DesktopPlayListItem = ({item, index}:DesktopPlayListItemProps) => {
  const isEpisode = (track:Track | Episode | undefined): track is Episode => {
  return track !== undefined && "description" in track;
  }
    return (
           <StyledTableRow>
            <TableCell >{index}</TableCell>
            <TableCell >{item.track?.name || 'no name'}</TableCell>
            <TableCell >{isEpisode(item.track) ? "N/A" : item.track?.album?.name }</TableCell>
            <TableCell >{item.added_at ? moment(item.added_at).format("YYYY-MM-DD") : "Uknown"}</TableCell>
            <TableCell >{item.track?.duration_ms ? moment(item.track.duration_ms).format("mm:ss") : "Uknown"}</TableCell>
          </StyledTableRow>
  )
}

export default DesktopPlayListItem
