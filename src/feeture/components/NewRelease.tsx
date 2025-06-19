import React from 'react'
import useGetNewRelease from '../../hooks/useGetNewRelease'
import Loading from '../../core/inform/Loading'
import Error from '../../core/inform/Error'
import { Grid } from '@mui/material'
import Card from '../../core/components/MusicCard'

const NewRelease = () => {
  const { data, error, isLoading } = useGetNewRelease()
  if (isLoading) { return <Loading /> }
  if (error) { return <Error errorMessage={error.message} /> }
  return (
    <div>
      <h2>New Released Albums</h2>
      <div>
        {data && data.albums.items.length > 0 ? (
          <Grid container spacing={2}>{data.albums.items.map((album) => (
            <Grid size={{ xs: 6 ,sm:4, lg: 2 }} key={album.id}>
              <Card image={album.images[0].url} name={album.name} artistName={album.artists[0].name} />
            </Grid>
          ))}</Grid>
        ) : (<h3>No data</h3>)}
      </div>
    </div>
  )
}

export default NewRelease

