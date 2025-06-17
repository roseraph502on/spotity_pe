import { LastPage } from "@mui/icons-material"
import { partialMatchKey, useInfiniteQuery } from "@tanstack/react-query"
import { searchItemsByKeyword } from "../apis/searchApi"
import { SearchRequestParams } from "../models/serach"
import useClientCredentialToken from "./useClientCredentialToken"


const useSearchItemsByKeyword = (params:SearchRequestParams) => {
  const clientCredentialToken = useClientCredentialToken()

 return useInfiniteQuery({
    queryKey:['search',params.q,clientCredentialToken ],
    queryFn:async ({pageParam = 0,queryKey })=>{
          const [, , tokenFromQueryKey] = queryKey; 

      console.log("DEBUG(queryFn Scope): clientCredentialToken (훅 스코프) =", clientCredentialToken ? "정의됨 (앞 10글자): " + clientCredentialToken.substring(0,10) : "undefined/null");
      console.log("DEBUG(queryFn Scope): tokenFromQueryKey (queryKey에서 추출) =", tokenFromQueryKey ? "정의됨 (앞 10글자): " + tokenFromQueryKey.substring(0,10) : "undefined/null");
      
    if(!tokenFromQueryKey){
        console.error("queryFn: 클라이언트 토큰이 없습니다. API 호출이 불가능합니다.");
        throw new Error("no token available");
      }      return searchItemsByKeyword(tokenFromQueryKey,{
        ...params,
        offset: pageParam,
      })
    },
    initialPageParam:0,
    getNextPageParam:(lastPage)=>{
      const nextPageUrl = 
      lastPage.tracks?.next ||
      lastPage.artists?.next ||
      lastPage.albums?.next ||
      lastPage.playlist?.next ||
      lastPage.show?.next ||
      lastPage.episode?.next ||
      lastPage.audiobook?.next;
      if(nextPageUrl){
        const nextOffset = new URL(nextPageUrl).searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
    enabled: !!params.q
 })
}

export default useSearchItemsByKeyword

