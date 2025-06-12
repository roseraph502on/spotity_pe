import axios from "axios"
import { SPOTIFY_BASE_URL } from "../config/commonConfig"

// const searchItemsByKeyword = asysc(token,params) => {
//   try{
//     const response = await axios.get(`${SPOTIFY_BASE_URL}/search?${}`,{
//       headers:{
//         Authorization:`Bearer ${token}`,
//         "Content-Type": "application/json",
//       } 
//     })
//     return response.data
//   }catch(error){
//     throw error
//   }
// };
