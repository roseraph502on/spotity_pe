import axios from "axios"
import { ClientCredentialTokenResponse } from "../models/auth"
import { clientId, clientSelect } from "../config/authConfig"

const encodedBase64=(data:string):string=>{
  if(typeof window !== "undefined"){
    return btoa(data); //브라우저 환경경
  } else{
    return Buffer.from(data).toString('base64') // node.js
  }
}

export const getClientCredentialToken = async():Promise<ClientCredentialTokenResponse>=>{
  try{
    const body = new URLSearchParams({
      grant_type:"client_credentials"
    })
    const response = await axios.post('https://accounts.spotify.com/api/token',body,
      {
        headers:{
          Authorization: `Basic ${encodedBase64(clientId + ':' + clientSelect)}`,
          "Content-Type":"application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  }catch (error){
    throw new Error("fail to fetch client credential token")
  }
}
