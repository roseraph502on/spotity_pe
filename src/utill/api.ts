import { SPOTIFY_BASE_URL } from "../config/commonConfig";
import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';


interface CustomAxiosInstance extends AxiosInstance {
  _retry?: boolean; // 요청 재시도 여부를 나타내는 플래그
}

const api = axios.create({
    baseURL: SPOTIFY_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization:`Bearer ${localStorage.getItem("access_token")}`
    },
});


// 요청 인터셉터: 모든 요청에 Access Token 추가
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: Access Token 만료 처리 및 갱신
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest: InternalAxiosRequestConfig & { _retry?: boolean } = error.config!;

    // Access Token 만료 (401 Unauthorized) 이고, 재시도 플래그가 없는 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 재시도 플래그 설정

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          // Refresh Token이 없으면 로그인 페이지로 리다이렉트 또는 로그아웃
          console.error('Refresh Token이 없습니다. 로그인 페이지로 이동합니다.');
          window.location.href = '/';
          return Promise.reject(error);
        }

        // Refresh Token으로 새로운 Access Token 요청
        const response = await axios.post('YOUR_API_BASE_URL/auth/refresh-token', { refreshToken });
        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken; // 서버에서 refresh token도 갱신하여 주는 경우

        // 새로운 토큰 저장
        localStorage.setItem('accessToken', newAccessToken);
        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken);
        }

        // 실패했던 원래 요청의 헤더에 새로운 Access Token 설정 후 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); // 재시도
      } catch (refreshError: any) {
        // Refresh Token 갱신 실패 (Refresh Token 자체 만료 또는 유효하지 않음)
        console.error('Refresh Token 갱신 실패:', refreshError);
        // 모든 토큰 삭제 후 로그인 페이지로 리다이렉트 또는 로그아웃
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
         window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


export default api;
