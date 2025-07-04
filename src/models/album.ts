import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { ExternalUrls, Image } from "./commonType";

export interface GetNewReleaseResponse {
  albums:ApiResponse<SimpleifiedAlbumObject>
}
export interface SimpleifiedAlbumObject{
      album_type:string;
      total_tracks:string;
      available_markets:string[];
      external_urls:ExternalUrls;
      href:string;
      id:string;
      images:Image[];
      name:string;
      release_date:string;
      release_date_percision:string;
      restrictions?:{
        reason:string;
      };
      type:string;
      uri:string;
      artists:Artist[];
      
}
