import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import {
  clearAuth,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  setUser,
} from "../utlis/storage";

const API_BASE_URL = "https://perfectb.onrender.com/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
  user?: unknown;
};

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  const response = await axios.post<RefreshResponse>(
    `${API_BASE_URL}/auth/refresh`,
    { refreshToken },
  );

  const { accessToken, refreshToken: nextRefreshToken, user } = response.data;

  setAccessToken(accessToken);
  if (nextRefreshToken) {
    setRefreshToken(nextRefreshToken);
  }

  if (user) {
    setUser(user);
  }

  return accessToken;
};

const clearExpiredSession = () => {
  clearAuth();
  window.dispatchEvent(new Event("auth:session-expired"));
};

api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const status = error.response?.status;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // If retried request still gets 401, session is dead. Clear it!
    if (status === 401 && originalRequest._retry) {
      clearExpiredSession();
      return Promise.reject(error);
    }

    // Only attempt refresh on 401 and if it hasn't been retried yet
    if (status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    const authPathsWithoutRetry = ["/auth/login", "/auth/register", "/auth/refresh"];
    const shouldSkipRefresh = authPathsWithoutRetry.some((path) =>
      originalRequest.url?.includes(path),
    );

    if (shouldSkipRefresh) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const nextAccessToken = await refreshAccessToken();
      
      originalRequest.headers.Authorization = `Bearer ${nextAccessToken}`;
      
      processQueue(null, nextAccessToken);
      isRefreshing = false;

      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      isRefreshing = false;
      clearExpiredSession();
      return Promise.reject(refreshError);
    }
  },
);

export default api;
