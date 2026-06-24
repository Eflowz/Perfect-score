import axios from "axios";
import { getAccessToken } from "../utlis/storage";
const API_BASE_URL = "https://perfectb.onrender.com/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
//  INTERCEPTOR
api.interceptors.request.use((config) => {
 const token = getAccessToken();

 if (token) {
 config.headers.Authorization = `Bearer ${token}`;
 }

 return config;
});
export default api;
