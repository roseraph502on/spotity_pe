import { Grid, InputAdornment, TextField } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import useSearchItemsByKeyword from '../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../models/serach';
import { useParams } from 'react-router';
import { Track } from '../models/Track';
import SearchPageResult from './components/SearchPageResult';
import { SimpleifiedAlbumObject } from '../models/album';
import { ArtistObjectSimplified } from '../models/artist';
import Loading from '../core/inform/Loading';
import Error from '../core/inform/Error';
import useClientCredentialToken from '../hooks/useClientCredentialToken';

const SearchWithkeyPage = () => {
  const { keyword: encodedKeyword } = useParams<{ keyword: string }>();
  const searchKeyword = encodedKeyword ? decodeURIComponent(encodedKeyword) : '';
  const [inputValue, setInputValue] = useState(searchKeyword);
  const clientCredentialToken = useClientCredentialToken()

  useEffect(() => {
    setInputValue(searchKeyword);
  }, [searchKeyword, clientCredentialToken]);

  const navigate = useNavigate();

  //search api
  const { data, error, isLoading, }
    = useSearchItemsByKeyword({
      q: searchKeyword,
      type: [SEARCH_TYPE.Track, SEARCH_TYPE.Album, SEARCH_TYPE.Artist],
      limit: 6
    });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // ✨ inputValue 상태만 업데이트
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newSearchKeyword = inputValue.trim();

      if (newSearchKeyword) {
        navigate(`/search/${encodeURIComponent(newSearchKeyword)}`);
      } else {
        navigate('/search');
      }
    }
  };

  const tracks = data?.pages?.flatMap((page) => page.tracks?.items).filter((item)
    : item is Track => item !== undefined) ?? [];
  const albums = data?.pages?.flatMap((page) => page.albums?.items).filter((item)
    : item is SimpleifiedAlbumObject => item !== undefined) ?? [];
  const artists = data?.pages?.flatMap((page) => page.artists?.items).filter((item)
    : item is ArtistObjectSimplified => item !== undefined) ?? []; const hasResults = tracks.length > 0;

  // console.log("search",data);
  // console.log("searchKeyword",searchKeyword);
  // console.log("inputValue",inputValue);
  if (isLoading) return <Loading />;
  if (error) return <Error errorMessage={error.message} />;
  return (
    <div>
      <TextField
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search song"
        variant="outlined"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "white" }} />
              </InputAdornment>
            ),
            onKeyPress: handleKeyPress,
          },
        }}
        sx={{
          width: "100%", marginTop: "10px",
          bgcolor: 'rgba(169, 169, 169, 0.23)',
          borderRadius: '24px',
          border:'none',
          '&> div': { borderRadius: '24px', border:'none'}
        }}
      />
      {data?.pages ? (
        <SearchPageResult
          tracks={tracks}
          albums={albums}
          artists={artists} />
      ) : (
        <h2>Search results not found</h2>
      )}
    </div>
  )
}

export default SearchWithkeyPage

