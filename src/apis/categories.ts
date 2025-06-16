import { GetCategoriesRequest, GetCategoriesResponse } from '../models/categories';
import api from '../utill/api';

export const getCategories = async (
    params?: GetCategoriesRequest 
): Promise<GetCategoriesResponse> => {
    try {
        const response = await api.get(`/browse/categories`, {
            params: params,
        });

        return response.data;
    } catch (error) {
        console.error("Spotify 카테고리 목록 가져오기 실패:", error);
        throw error;
    }
};
