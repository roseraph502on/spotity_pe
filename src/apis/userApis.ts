import axios from "axios";
import { SPOTIFY_BASE_URL } from "../config/commonConfig"
import { User } from "../models/user";

export const getCrruentUserProfile = async():Promise<User>=>{
  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}/me`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  }catch (error){
    throw new Error("fail to fetch user profile");
  }
}
