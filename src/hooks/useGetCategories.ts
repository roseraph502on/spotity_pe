import { useQuery } from '@tanstack/react-query'; 
import { getCategories } from '../apis/categories';
import { GetCategoriesRequest, GetCategoriesResponse } from '../models/categories';
import useClientCredentialToken from './useClientCredentialToken';

const useGetCategories = (
    params?: GetCategoriesRequest
) => {
      const clientCredentialToken = useClientCredentialToken()
    return useQuery<
        GetCategoriesResponse,
        Error
    >({
        queryKey: ['spotify-categories', params], 
        queryFn: () =>{
            if(!clientCredentialToken){
                throw new Error("no token available");
            }return getCategories(clientCredentialToken,params);
        } 
    });
};

export default useGetCategories;

