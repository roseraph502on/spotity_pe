import { AsyncLocalStorage } from "async_hooks";
import { AddPlaylistRequest, AddPlaylistResponse, CreatePlaylistRequest, GetCurrentUserPlaylistRequest, GetCurrentUserPlaylistsResponse, GetPlaylistItemResponse, GetPlaylistItemsRequest, GetPlaylistRequest, Playlist } from "../models/playlist";
import api from "../utill/api";

export const getCurrentUserPlaylists = async ({ limit, offset }
  : GetCurrentUserPlaylistRequest): Promise<GetCurrentUserPlaylistsResponse> => {
    try {
        const response = await api.get(`/me/playlists`, {
            params: { limit, offset }
        });
        return response.data;
    }
    catch (error) {
        throw new Error("fail to fetch current user playlists")
    }
};
export const getPlaylist = async(params: GetPlaylistRequest):Promise<Playlist> => {
    try{
        const response = await api.get(`/playlists/${params.playlist_id}`,{
            params,
        });
        return response.data;
    }catch(error){
        throw new Error("fail to fetch Playlist detail")
    }
}
export const getPlaylistItems =
 async(params:GetPlaylistItemsRequest)
 :Promise<GetPlaylistItemResponse>=>{
    try{
        const response = await api.get(`/playlists/${params.playlist_id}/tracks`,{params});
        return response.data;
    }catch(error){
        throw error;
    }
}
export const CreatePlaylist = 
async(user_id:string, params: CreatePlaylistRequest)
: Promise<Playlist> => {
 try{
    const {name, playlistPublic ,collaborative, description} = params
        const response = await api.post(`/users/${user_id}/playlists`,{
            name,
            public:playlistPublic,
            collaborative,
            description,
        });
        return response.data;
    }catch(error){
        throw error;
    }
}
export const AddPlaylist = 
async( playlist_id: string, items: AddPlaylistRequest)
: Promise<AddPlaylistResponse> => {
try {
        const response = await api.post(`/playlists/${playlist_id}/tracks`, items);
        return response.data;

    }catch (error) {
        console.error(`플레이리스트 ${playlist_id}에 항목 추가 실패:`, error);
        throw error;
    }
}
