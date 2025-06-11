import { InfiniteData, useInfiniteQuery, UseInfiniteQueryResult, useQuery } from "@tanstack/react-query";
import { getCurrentUserPlaylists } from "../apis/playList";
import { GetCurrentUserPlaylistRequest, GetCurrentUserPlaylistsResponse } from "../models/playlist";

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
        initialPageParam: 10, 
        getNextPageParam:(lastPage) =>{
            if(lastPage.next){
                const url = new URL(lastPage.next);
                const nextOffset = url.searchParams.get("offset");
                return nextOffset ? parseInt(nextOffset, 10) : undefined;
            } return undefined;
        },
        enabled: enabled
    });
};

export default useGetCurrentUserPlaylists;
