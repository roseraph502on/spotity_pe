import React, { useEffect } from 'react'
import { Track } from '../../models/Track'
import {
  Box,
  Button,
  styled,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useInView } from 'react-intersection-observer';
import LoadingSpinner from '../../core/inform/LoadingSpinner';
import useAddPlaylist from '../../hooks/useAddPlaylist';
import { useParams } from 'react-router';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  width: "100%",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
}));
const AlbumImage = styled("img")({
  borderRadius: "4px",
  marginRight: "12px",
});

interface SearchResultListProps{
  list:Track[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

// // // // // // // // // 
const SearchResultList = 
({list, hasNextPage, isFetchingNextPage, fetchNextPage,}
: SearchResultListProps ) => {
  //플리 음악악 추가 
  const { id } = useParams<{ id: string }>();
  const { mutate:addList,isPending,isSuccess} = useAddPlaylist()
  // 무한스크롤
  const [ref, inView] = useInView();  
   useEffect(() => { 
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  const AddPlayListClk = (track: Track)=>{
    if (!id || !track?.uri) {
       console.error("플레이리스트 ID 또는 트랙 URI가 없습니다.");
       return;
    }  
        addList({ playlist_id: id, uris: [track.uri]
          ,trackName:track.name})

  }
  return (
    <TableBody>
       {list.map((track) => (
        <StyledTableRow key={track.id}>
          <TableCell>
            <Box display="flex" alignItems="center">
              <Box>
                <AlbumImage src={track.album?.images[0].url} width="40px" />
              </Box>
              <Box>
                <Typography fontWeight={700}>{track.name}</Typography>
                <Typography color="text.secondary">
                  {track.artists ? track.artists[0].name : "Unknown Artist"}
                </Typography>
              </Box>
            </Box>
          </TableCell>
          <TableCell>{track.album?.name}</TableCell>
          <TableCell>
            <Button onClick={() =>AddPlayListClk(track)} disabled={isPending}>
               {isPending ? <LoadingSpinner/> : 'Add'}
            </Button>
          </TableCell>
        </StyledTableRow>
      ))}
       <div ref={ref} style={{ height: 1 }}> 
          {isFetchingNextPage && <LoadingSpinner />}
        </div>
    </TableBody>

  )
}

export default SearchResultList
