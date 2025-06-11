import { SimpleifiedAlbumObject } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { ExternalUrls, Owner, Image, Followers, ExternalIds } from "./commonType";
import { Episode, Track } from "./Track";

export interface GetCurrentUserPlaylistRequest {
    limit?: number;
    offset?: number;
}

export interface GetPlaylistRequest{
    playlist_id:string;
    market?:string;
    fields?: string;
    additional_types?:string;
}

export type GetCurrentUserPlaylistsResponse = ApiResponse<SimplifiedPlaylist>;

export interface BasePlaylist{
    description?: string | null;
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    images?: Image[];
    name?: string;
    owner?: Owner;
    public?: boolean | null;
    snapshot_id: string;
    type?: "playlist";
    uri: string;
    primary_color: string | null;
}

export type GetPlaylistItemResponse = ApiResponse<PlaylistTrack>

export interface PlaylistTrack{
    added_at?: string|null;
    added_by?: {
        external_url?: ExternalUrls;
        Followers?: Followers;
        href?: string;
        id?: string;
        type?: string;
        uri?: string;
    } | null
    is_local?: boolean;
    track?:Track | Episode;
}

export interface GetPlaylistRequest {
    playlist_id:string;
    market?:string;
    field?:string;
    additional_types?:string;
}


export interface SimplifiedPlaylist extends BasePlaylist{
    tracks?: {
        href?: string;
        total?: number;
    };
}
export interface Playlist extends BasePlaylist {
    tracks?: {
        href?: string;
        total?: number;
    };
    followers: Followers
}

export interface GetPlaylistItemsRequest extends GetPlaylistRequest{
    offset?:number,
    limit?:number
}
