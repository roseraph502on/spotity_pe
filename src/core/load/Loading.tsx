import React from 'react'
import {LinearProgress, styled} from '@mui/material';
import { Box } from '@mui/material';


const Loading = () => {
  const LoadText = styled("h2")({
          flexGrow: 1, 
          display: "flex",
          justifyContent: "center", 
          alignItems: "center",
  })
  return (
    <Box sx={{ margin:"0 auto", width:"100%",height:"100vh", display:"flex", flexDirection: "column"}}>
      <LinearProgress color="success" sx={{  width:"100%" }}/>
      <LoadText>Loading . . .</LoadText>
    </Box>
  )
}

export default Loading

