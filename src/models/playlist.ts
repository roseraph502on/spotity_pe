import { ApiResponse } from "./apiResponse";
import { ExternalUrls, Owner, Image } from "./commonType";

export interface GetCurrentUserPlaylistRequest {
    limit?: number;
    offset?: number;
}

export type GetCurrentUserPlaylistsResponse = ApiResponse<SimplifiedPlaylist>;

export interface SimplifiedPlaylist {
    collaborative?: boolean;
    description?: string | null;
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    images?: Image[];
    name?: string;
    owner?: Owner;
    public?: boolean | null;
    snapshot_id: string;
    tracks?: {
        href?: string;
        total?: number;
    };
    type?: string;
    uri: string;
    primary_color: string | null;
}
