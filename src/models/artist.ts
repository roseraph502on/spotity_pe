import { ExternalUrls, Image } from "./commonType";

export interface Artist{
  external_urls?: ExternalUrls;
  href?:string;
  id?:string;
  name?:string;
  type?:string;
  uri?:string;
}
export interface ArtistObjectSimplified {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: Image[];
    name: string;
    type: "artist";
    uri: string;
}
