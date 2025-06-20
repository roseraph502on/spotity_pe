import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from 'react'
import useSearchItemsByKeyword from '../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../models/serach';
import SearchResultList from './SearchResultList';
import LoadingSpinner from '../../core/inform/LoadingSpinner';
import { Track } from '../../models/Track';
import Loading from '../../core/inform/Loading';

const EmptyPlaylistWSearch = () => {
  const [keyword, setKeyword] = useState<string>("");
  const { data, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage }
    = useSearchItemsByKeyword({
      q: keyword,
      type: [SEARCH_TYPE.Track],
    })
  // console.log("keyword search",data)
  const tracks = data?.pages.flatMap((page) => page.tracks?.items).filter((item): item is Track => item !== undefined) ?? [];
  const hasResults = tracks.length > 0;
  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  }
  return (
    <Box sx={{ padding: "20px" }}>
      <h2>
        Let's find something for your playlist!
      </h2>
      <TextField
        value={keyword}
        onChange={handleSearchKeyword}
        placeholder="Search and find your favorite song"
        variant="outlined"
        // color="success"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "white" }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          width: "100%",
          bgcolor: 'rgba(169, 169, 169, 0.23)',
          borderRadius: '24px',
          border: 'none',
          '&> div': { borderRadius: '24px', border: 'none' }
        }}
      />
      {isLoading ? (
        <Loading />
      ) : hasResults ? (
        <SearchResultList
          list={tracks}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      ) : keyword === "" ? (
        <></> // 검색어가 없을 때는 아무것도 표시하지 않음
      ) : (
        <div>{`No Result for "${keyword}"`}</div> // 검색 결과가 없을 때만 표시
      )}
    </Box>
  )
}

export default EmptyPlaylistWSearch

