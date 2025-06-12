import { useMutation, useQueryClient } from "@tanstack/react-query";
import useGetCrruentUserProfile from "./useGetCurrentUserProfile"
import { CreatePlaylistRequest } from "../models/playlist";
import { CreatePlaylist } from "../apis/playList";

const useCreatePlaylist = () => {
  const queruClient = useQueryClient() 
  const {data: user} = useGetCrruentUserProfile();
  return useMutation({
    mutationFn : (params: CreatePlaylistRequest) =>{
      if(user){
      return CreatePlaylist(user.id,params);
    }
    return Promise.reject(new Error("user is not defined"));
    },
    onSuccess:()=>{
      queruClient.invalidateQueries({queryKey:["current-user-playlists"]})
      console.log("플리 추가 성공");
    },
  });
};

export default useCreatePlaylist

