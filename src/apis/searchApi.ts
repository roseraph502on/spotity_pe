import axios from "axios"
import { SPOTIFY_BASE_URL } from "../config/commonConfig"
import { SearchRequestParams, SearchResponse } from "../models/serach"

export const searchItemsByKeyword = 
async(token:string,params: SearchRequestParams): Promise<SearchResponse> => {
  try{
    const serachParams = new URLSearchParams();
    serachParams.append("q",params.q);
    serachParams.append("type",params.type.join(","));

    if(params.market) serachParams.append("market",params.market);
    if(params.limit) serachParams.append("limit",params.limit.toString());
    if(params.offset) serachParams.append("offset",params.offset.toString());
    if(params.include_external) serachParams.append("include_external",params.include_external);
    const response = await axios.get(`${SPOTIFY_BASE_URL}/search?${serachParams.toString()}`,{
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type": "application/json",
      } 
    })
    return response.data
  }catch(error){
    throw error
  }
};

