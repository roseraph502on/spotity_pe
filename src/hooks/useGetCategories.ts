import { useQuery } from '@tanstack/react-query'; 
import { getCategories } from '../apis/categories';
import { GetCategoriesRequest, GetCategoriesResponse } from '../models/categories';

const useGetCategories = (
    params?: GetCategoriesRequest
) => {
    return useQuery<
        GetCategoriesResponse,
        Error
    >({
        queryKey: ['spotify-categories', params], 
        queryFn: () => getCategories(params),
    });
};

export default useGetCategories;

