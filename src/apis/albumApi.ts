import axios from "axios"
import { SPOTIFY_BASE_URL } from "../config/commonConfig"
import { GetNewReleaseResponse } from "../models/album";

export const getNewRelease = async(clientCredentialToken:string):Promise<GetNewReleaseResponse>=>{
  try{
    const response =await axios.get(`${SPOTIFY_BASE_URL}/browse/new-releases?limit=6`,{
      headers:{
        Authorization:`Bearer ${clientCredentialToken}`
      },
    })
    return response.data;
  }catch(error){
    throw new Error("fail to fetch new releases");
  }
}
