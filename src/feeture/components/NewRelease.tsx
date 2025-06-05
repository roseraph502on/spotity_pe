import React from 'react'
import useGetNewRelease from '../../hooks/useGetNewRelease'
import Loading from '../../core/inform/Loading'
import Error from '../../core/inform/Error'
import { Grid } from '@mui/material'
import Card from '../../core/components/card'

const NewRelease = () => {
  const { data, error, isLoading } = useGetNewRelease()
  console.log("data", data)
  if (isLoading) { return <Loading /> }
  if (error) { return <Error errorMessage={error.message}/> }
  return (
    <div>
      <h1>New Released Albums</h1>
      <div>
      {data && data.albums.items.length>0?(
        <Grid container spacing={2}>{data.albums.items.map((album)=>(
          <Grid size={{xs:6,sm:5,md:2}} key={album.id}>
           <Card image={album.images[0].url} name={album.name} artistName={album.artists[0].name}/>
          </Grid>
        ))}</Grid>
      ) : (<h3>No data</h3>)}
      </div>
    </div>
  )
}

export default NewRelease

