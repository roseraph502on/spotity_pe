import { useQuery } from "@tanstack/react-query"
import { getNewRelease } from "../apis/albumApi";

const useGetNewRelease = () =>{
  return useQuery({
    queryKey:["new-release"],
    queryFn:async ()=> {
      return getNewRelease();
    }
  })
}
