import axios from "axios";
import { SPOTIFY_BASE_URL } from "../config/commonConfig"
import { User } from "../models/user";
import api from "../utill/api";

export const getCrruentUserProfile = async():Promise<User>=>{
  try {
    const response = await api.get(`/me`);
    return response.data;
  }catch (error){
    throw new Error("fail to fetch user profile");
  }
}
