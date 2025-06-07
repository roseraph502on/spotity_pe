import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { getCrruentUserProfile } from "../apis/userApis"
import { User } from "../models/user";

const useGetCrruentUserProfile = (): UseQueryResult<User, Error> =>{
  const accessToken = localStorage.getItem("access_token"); // access_token 가져오기기
  return useQuery({
    queryKey:['current-user-profie'],
    queryFn: getCrruentUserProfile,
    enabled: !!accessToken // accessToken이 있을때만 가져오기
  });
}
export default useGetCrruentUserProfile
