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

export default api;
