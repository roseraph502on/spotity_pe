import { SimpleifiedAlbumObject } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist, ArtistObjectSimplified } from "./artist";
import { SimplifiedPlaylist } from "./playlist";
import { EpisodeShow, SimplifiedAudioBook, SimplifiedEpisode, Track } from "./Track";

export const enum SEARCH_TYPE {
  Track = "track",
  Album = "album" ,
  Playlist = "playlist",
  Show = "show",
  Episode = "episode",
  AudioBook = "audiobook",
  Artist = "artist",
}
export interface SearchRequestParams {
  q:string;
  type:SEARCH_TYPE[];
  market?:string;
  limit?:number;
  offset?:number;
  include_external?:string;
}
export interface SearchResponse{
  artists?:ApiResponse<ArtistObjectSimplified>;
  albums?:ApiResponse<SimpleifiedAlbumObject>;
  tracks?:ApiResponse<Track>;
  playlist?: ApiResponse<SimplifiedPlaylist>;
  show?:ApiResponse<EpisodeShow>;
  episode?:ApiResponse<SimplifiedEpisode>;
  audiobook?:ApiResponse<SimplifiedAudioBook>;
}
