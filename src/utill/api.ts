import { SPOTIFY_BASE_URL } from "../config/commonConfig";
import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getSpotifyAuthUrl } from "./auth";


const api = axios.create({
    baseURL: SPOTIFY_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization:`Bearer ${localStorage.getItem("access_token")}`
    },
});


api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      if (config.headers) {
        delete config.headers.Authorization;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


let isUnauthorizedHandled = false;

// 응답 인터셉터: Access Token 만료 처리 및 갱신
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    
    // Access Token 만료 (401 Unauthorized) 이고, 재시도 플래그가 없는 경우
    if (error.response?.status === 401 && !isUnauthorizedHandled) {
      isUnauthorizedHandled = true; // 재시도 플래그 설정

      console.error("401 Unauthorized: 유효하지 않은 토큰입니다.");

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      getSpotifyAuthUrl()
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);


export default api;
