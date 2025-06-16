import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import useGetCategories from '../../hooks/useGetCategories';
import Loading from '../../core/inform/Loading';
import Error from '../../core/inform/Error';
import styled from 'styled-components';
const predefinedColors: string[] = [
  '#1ED760', '#D7A31E', '#D7431E',
  '#1E6ED7', '#D71E68', '#991ED7',
  '#2DD71E', '#C8D71E', '#1E40D7',
];
const ImgIcon = styled('img')({
  width: "90%",
  borderRadius: "5px",
})
const StyledBox = styled(Grid)(({ theme }) => ({
  width: "100%",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2px",
  color: "white",
  aspectRatio: '1 / 0.6',
  fontSize: "16px",
}));
const CategoriesPage = () => {

  const { data, isLoading, isError, error }
    = useGetCategories({ limit: 50, country: 'KR', locale: 'ko_KR' });

  if (isLoading) return <Loading />
  if (isError) return <Error errorMessage={error.message} />
  const categories = data?.categories?.items;
  console.log("useGetCategories", data)
  return (
    <Grid container spacing={2} padding={"1%"}>

      {categories?.map((category, index) => {
        const backgroundColor = predefinedColors[index % predefinedColors.length];

        return (
          <Grid size={{ xs: 6, md: 4 }} key={category.id} >
            <StyledBox container sx={{ backgroundColor: backgroundColor }}>
              <Grid size={7} sx={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                {category.icons && category.icons.length > 0 && (
                  <ImgIcon src={category.icons[0].url} alt={category.name} />
                )}
              </Grid>
              <Grid size={5} sx={{ paddingBottom: "5%", alignSelf: 'flex-end'}}>
                <Typography fontWeight={"700"}  fontSize={"16px"}>{category.name}</Typography>

              </Grid>
            </StyledBox>

          </Grid>
        );
      })}
    </Grid>
  )
}

export default CategoriesPage

