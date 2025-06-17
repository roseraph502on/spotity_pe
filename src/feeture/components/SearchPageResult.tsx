import { Grid } from '@mui/material'
import React from 'react'
import { Track } from '../../models/Track';
import { ArtistObjectSimplified } from '../../models/artist';
import Card from '../../core/components/MusicCard';
import { SimpleifiedAlbumObject } from '../../models/album';
import ArtistsCard from '../../core/components/ArtistCard';
import TrackCard from '../../core/components/TrackCard';
interface SearchPageResultProps {
  tracks: Track[];
  albums: SimpleifiedAlbumObject[];
  artists: ArtistObjectSimplified[];

}

const SearchPageResult = ({ tracks, albums, artists }: SearchPageResultProps) => {

  return (
    <Grid container >
      <Grid size={{ xs: 12, md: 6 }} container>
        <h2>Top result</h2>
        <Grid size={12}>
          <Card
            key={tracks[0].id}
            image={tracks[0].album?.images && tracks[0].album.images.length > 0 ? tracks[0].album.images[0].url : ''}
            name={tracks[0].name || 'Unknown Album'}
            artistName={tracks[0].artists && tracks[0].artists.length > 0 ? tracks[0].artists[0].name : "Unknown Artist"}
          />
        </Grid>

      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <h2>Songs</h2>
        <Grid container>
          {
            tracks.slice(0, 4).map((track) => (
              <TrackCard
                key={track.id}
                image={track.album?.images && track.album.images.length > 0 ? track.album.images[0].url : ''}
                name={track.name || 'Unknown Album'}
                artistName={track.artists && track.artists.length > 0 ? track.artists[0].name : "Unknown Artist"}
                duration_ms={track.duration_ms}
              />
            ))
          }
        </Grid>
      </Grid>
      <Grid size={12}>
        <h2>artists</h2>
        <Grid container>
          {
            artists.map((artist) => (
              <Grid size={2}>
                <ArtistsCard
                  key={artist.id}
                  image={artist.images.length > 0 ? artist.images[0].url : ''}
                  name={artist.name || 'Unknown Album'}
                  type={artist.type || "Unknown type"}
                />
              </Grid>
            ))
          }
        </Grid>
      </Grid>
      <Grid size={12} >
        <h2>Albums</h2>
        <Grid container>
          {
            albums.map((album) => (
              <Grid size={{ xs: 3, md: 2 }}>
                <Card
                  key={album.id}
                  image={album.images && album.images.length > 0 ? album.images[0].url : ''}
                  name={album.name || 'Unknown Album'}
                  artistName={album.artists && album.artists.length > 0 ? album.artists[0].name : "Unknown Artist"}
                />
              </Grid>
            ))
          }
        </Grid>

      </Grid>
    </Grid>
  )
}

export default SearchPageResult

