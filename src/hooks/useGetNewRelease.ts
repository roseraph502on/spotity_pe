import { useQuery } from "@tanstack/react-query"
import { getNewRelease } from "../apis/albumApi";
import useClientCredentialToken from "./useClientCredentialToken";
import { error } from "console";

const useGetNewRelease = () =>{
  const clientCredentialToken = useClientCredentialToken()
  return useQuery({
    queryKey:["new-release"],
    queryFn:async ()=> {
      if(!clientCredentialToken){
        throw new Error("no token available");
      }
      return getNewRelease(clientCredentialToken);
    }
  })
}
export default useGetNewRelease
