import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from 'react'
import useSearchItemsByKeyword from '../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../models/serach';
import SearchResultList from './SearchResultList';

const EmptyPlaylistWSearch = () => {
  const [keyword,setKeyword] = useState<string>("");
  const {data, error, isLoading  } = useSearchItemsByKeyword({
    q:keyword,
    type:[SEARCH_TYPE.Track],
  })
  console.log("keyword search",data)
  const handleSearchKeyword = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setKeyword(event.target.value);
  }
  return (
    <Box sx={{padding:"20px"}}>
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
      sx={{width:"100%"}}
      />
      {data?.pages.map((item)=>{
        if(!item.tracks) return false;
        return <SearchResultList list={item.tracks?.items}/>
      })
     }
    </Box>
  )
}

export default EmptyPlaylistWSearch

