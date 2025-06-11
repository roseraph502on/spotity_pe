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
  try {
    console.log("토큰 갱신 시도...");
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newAccessToken = "새로_발급받은_access_token_" + Date.now();
    localStorage.setItem("access_token", newAccessToken);
    console.log("토큰 갱신 완료:", newAccessToken);
    return newAccessToken;

  } catch (error) {
    console.error("토큰 갱신 실패:", error);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return null;
  }
};
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry && !isRefreshing) {
      isRefreshing = true;
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();

        if (newAccessToken) {
          api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          failedQueue.forEach(promise => promise.resolve(api(promise.config)));
          failedQueue = [];

          return api(originalRequest);
        } else {
          failedQueue.forEach(promise => promise.reject(new Error("토큰 갱신 실패")));
          failedQueue = [];
          return Promise.reject(error);
        }
      } catch (refreshError) {
        failedQueue.forEach(promise => promise.reject(refreshError));
        failedQueue = [];
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
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
