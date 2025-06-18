import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AddPlaylist } from "../apis/playListApi";
import { AddPlaylistRequest, AddPlaylistResponse } from "../models/playlist";

interface AddPlaylistVariables {
    playlist_id: string; 
    uris: string[]; 
    position?: number; // 삽입 위치 (선택 사항)
    // 알림창에 표시할 트랙 정보
    trackName?: string;
    albumName?: string;
}

const useAddPlaylist = () => {
    const queryClient = useQueryClient();
  return useMutation<AddPlaylistResponse, Error, AddPlaylistVariables >({
    mutationFn : ({playlist_id,uris,position}) =>{
      if(playlist_id){
      return AddPlaylist(playlist_id,{uris,position});
    }
    return Promise.reject(new Error("user is not defined"));
    },
     onSuccess: (data, variables) => {
            console.log(`플레이리스트 ${variables.playlist_id}에 항목 추가 성공!`, data);
     queryClient.invalidateQueries({
                queryKey: ['playlist-items', { playlist_id: variables.playlist_id }],
            });
    queryClient.invalidateQueries({
                 queryKey: ['playlist', { playlist_id: variables.playlist_id }],
             });

            if (variables.trackName && variables.albumName) {
                 alert(`'${variables.trackName}'을(를) ${variables.albumName}에 추가하셨습니다.`);
            }
            else if(variables.trackName) {
                 alert(`'${variables.trackName}'을(를) 플레이리스트에 추가하셨습니다.`);
            } else { alert(`항목을 플레이리스트에 추가하셨습니다.`); }
              window.location.reload();

        },
         onError: (error, variables) => {
            console.error(`플레이리스트 ${variables.playlist_id}에 항목 추가 실패:`, error);
             },
  });
}

export default useAddPlaylist
