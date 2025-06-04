import axios from "axios"
import { ClientCredentialTokenResponse } from "../models/auth"
import { clientId, clientSelect } from "../config/authConfig"

const encodedBase64=(data:string):string=>{
  return Buffer.from(data).toString('base64')
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
          "Content-Type":"application/x-www-form-urlencoded.",
        },
      }
    );
    return response.data;
  }catch (error){
    throw new Error("fail to fetch client credential token")
  }
}
