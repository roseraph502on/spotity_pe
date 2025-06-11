import axios from "axios";
import { SPOTIFY_BASE_URL } from "../config/commonConfig";
import { request } from "http";

const api = axios.create({
    baseURL: SPOTIFY_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
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
});
//api 호출전에 세팅해서 Bearer 업데이트
api.interceptors.request.use((request)=>{
    request.headers.Authorization = `Bearer ${localStorage.getItem(
        "access_token"
    )}`;
    return request;
})

export default api;
