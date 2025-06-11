import axios from "axios";
import { SPOTIFY_BASE_URL } from "../config/commonConfig";
import { request } from "http";

let isRefreshing = false;
let failedQueue: { resolve: (value?: unknown) => void; reject: (reason?: any) => void; config: any }[] = [];

const api = axios.create({
    baseURL: SPOTIFY_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization:`Bearer ${localStorage.getItem("access_token")}`
    },
});

api.interceptors.request.use((request) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        request.headers = request.headers ?? {};
        request.headers.Authorization = `Bearer ${token}`;
    } else {
        if (request.headers) {
            delete request.headers.Authorization;
        }
    }
    return request;
});

const refreshToken = async (): Promise<string | null> => {
  console.log("유효하지 않은 토큰 발견. 토큰 삭제 시도...");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  console.log("토큰 삭제 완료. 재인증 필요.");
  return null;
};


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
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

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshToken();

      failedQueue.forEach(promise => promise.reject(new Error("토큰 삭제됨. 재인증 필요.")));
      failedQueue = [];

      return Promise.reject(error);
    }

    if (status === 401 && isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject, config: originalRequest });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
