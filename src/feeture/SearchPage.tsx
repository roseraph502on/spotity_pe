import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import CategoriesPage from './components/CategoriesPage';
import SearchWithkeyPage from './SearchWithkeyPage';
import { useState } from 'react';
import useSearchItemsByKeyword from '../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../models/serach';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';

const SearchPage = () => {
  const navigate = useNavigate();
  const [keyword,setKeyword] = useState<string>("");
  
  const handleSearchKeyword = (event:React.ChangeEvent<HTMLInputElement>)=>{
    setKeyword(event.target.value)
    navigate(`/search/${encodeURIComponent(keyword)}`)
  }
  return (
    <div>
       <TextField
              value={keyword}
              onChange={handleSearchKeyword}
              placeholder="Search song"
              variant="outlined"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon style={{ color: "white" }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{width:"100%",marginTop:"10px"}}
            />
              <CategoriesPage />            
    </div>
  )
}

export default SearchPage

