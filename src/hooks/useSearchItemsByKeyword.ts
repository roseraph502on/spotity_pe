import { LastPage } from "@mui/icons-material"
import { partialMatchKey, useInfiniteQuery } from "@tanstack/react-query"
import { searchItemsByKeyword } from "../apis/searchApi"
import { SearchRequestParams } from "../models/serach"
import useClientCredentialToken from "./useClientCredentialToken"

const useSearchItemsByKeyword = (params:SearchRequestParams) => {
  const clientCredentialToken = useClientCredentialToken()
 return useInfiniteQuery({
    queryKey:['search',params],
    queryFn:({pageParam = 0})=>{
    if(!clientCredentialToken){
        throw new Error("no token available");
      }      return searchItemsByKeyword(clientCredentialToken,{
        ...params,
        offset: pageParam,
      })
    },
    initialPageParam:0,
    getNextPageParam:(lastPage)=>{
      const nextPageUrl = 
      lastPage.tracks?.next ||
      lastPage.artist?.next ||
      lastPage.album?.next ||
      lastPage.playlist?.next ||
      lastPage.show?.next ||
      lastPage.episode?.next ||
      lastPage.audiobook?.next;
      if(nextPageUrl){
        const nextOffset = new URL(nextPageUrl).searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    }
 })
}

export default useSearchItemsByKeyword

