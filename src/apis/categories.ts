import axios from 'axios';
import { GetCategoriesRequest, GetCategoriesResponse } from '../models/categories';
import api from '../utill/api';
import { SPOTIFY_BASE_URL } from '../config/commonConfig';

export const getCategories = async (token: string,
    params?: GetCategoriesRequest 
): Promise<GetCategoriesResponse> => {
    try {
        const response = await  axios.get(`${SPOTIFY_BASE_URL}/browse/categories`, {
            params: params,
            headers:{
            Authorization:`Bearer ${token}`
            },
        });

        return response.data;
    } catch (error) {
        console.error("Spotify 카테고리 목록 가져오기 실패:", error);
        throw error;
    }
};
