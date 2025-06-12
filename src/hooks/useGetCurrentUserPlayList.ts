import { InfiniteData, useInfiniteQuery, UseInfiniteQueryResult, useQuery } from "@tanstack/react-query";
import { getCurrentUserPlaylists } from "../apis/playList";
import { GetCurrentUserPlaylistRequest, GetCurrentUserPlaylistsResponse } from "../models/playlist";
import axios from "axios";

const useGetCurrentUserPlaylists = (
    {limit, offset}: GetCurrentUserPlaylistRequest)
    :UseInfiniteQueryResult<InfiniteData<GetCurrentUserPlaylistsResponse, Error>> => {
    const accessToken = localStorage.getItem("access_token")

    const enabled = !!accessToken; 


    return useInfiniteQuery({
        queryKey: [ "current-user-playlists" ],
        queryFn: async ({ pageParam = 0 }) => {
            return getCurrentUserPlaylists( {limit, offset: pageParam} ); 
        },
        initialPageParam: 0, 
        getNextPageParam:(lastPage) =>{
            if(lastPage.next){
                const url = new URL(lastPage.next);
                const nextOffset = url.searchParams.get("offset");
                return nextOffset ? parseInt(nextOffset, 10) : undefined;
            } return undefined;
            
        },
        enabled: enabled,
        retry: (failureCount, error) => {
      // error가 AxiosError 타입이고 상태 코드가 401이면 재시도하지 않음
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
    });
};

export default useGetCurrentUserPlaylists;
