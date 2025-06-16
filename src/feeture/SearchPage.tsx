import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import CategoriesPage from './components/CategoriesPage';

const SearchPage = () => {
  return (
    <div>
       <TextField
              // value={keyword}
              // onChange={handleSearchKeyword}
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
            <CategoriesPage />
    </div>
  )
}

export default SearchPage

