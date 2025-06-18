import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useGetCategories from '../../hooks/useGetCategories';
import Loading from '../../core/inform/Loading';
import Error from '../../core/inform/Error';
import styled from 'styled-components';
const predefinedColors: string[] = [
  '#1ED790',
  '#1E62D7',
  '#D71E87',
];
const RecordPlayerArm = styled('img')({
  position: 'absolute',
  top:0,
  right:0,
  zIndex: 1,
  width:"40%",

})
const ImgIcon = styled('img')({
  width: "80%",
  borderRadius: "300px",
  border:"3.7vw solid #111",
  boxShadow:"2px 2px 2px rgba(0, 0, 0, 0.39)",
  backgroundSize: "cover",
  backgroundPosition: "no-repeat",
  '@media (max-width: 900px)': {
      border:"5vw solid #111",
  },
})
const StyledBox = styled(Grid)(({ theme }) => ({
  width: "100%",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2px",
  color: "white",
  aspectRatio: '1 / 0.6',
  fontSize: "16px",
  position: 'relative',
}));
const CategoriesPage = () => {
  //랜덤 컬러
  const [startIndex, setStartIndex] = useState<number | null>(null); 
  useEffect(() => {
    const randomInitialIndex = Math.floor(Math.random() * predefinedColors.length);
    setStartIndex(randomInitialIndex);
  }, []);
  //카테고리 api
  const { data, isLoading, isError, error }
    = useGetCategories({ limit: 50, country: 'KR', locale: 'ko_KR' });

  if (startIndex === null || isLoading) return <Loading />
  if (isError) return <Error errorMessage={error.message} />
  const categories = data?.categories?.items;
  // console.log("useGetCategories", data)
  return (
    <Grid container spacing={2} padding={"1%"}>

      {categories?.map((category, index) => {
          const colorIndex = (startIndex + index) % predefinedColors.length;
          const backgroundColor = predefinedColors[colorIndex];
        return (
          <Grid size={{ xs: 6, md: 4 }} key={category.id} >
            <StyledBox container sx={{ backgroundColor: backgroundColor }}>
              <RecordPlayerArm src="https://static.thenounproject.com/png/1584695-200.png" alt="" />
              <Grid size={8} sx={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                {category.icons && category.icons.length > 0 && (
                  <ImgIcon src={category.icons[0].url} alt={category.name} />
                )}
              </Grid>
              <Grid size={4} sx={{ paddingBottom: "5%", alignSelf: 'flex-end'}}>
                <Typography 
                fontSize={{ xs:"9px", sm:"12px",md:"14px",lg:"17px"}}
                sx={{width:"100%",fontWeight:"700",textShadow:"2px 2px 2px rgba(0, 0, 0, 0.39)"}} 
                 >
                  
                  {category.name}
                </Typography>

              </Grid>
            </StyledBox>

          </Grid>
        );
      })}
    </Grid>
  )
}

export default CategoriesPage

