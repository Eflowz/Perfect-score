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

let refreshPromise: Promise<string> | null = null;

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
  setRefreshToken(nextRefreshToken);

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

    if (!originalRequest || status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    const authPathsWithoutRetry = ["/auth/login", "/auth/register", "/auth/refresh"];
    const shouldSkipRefresh = authPathsWithoutRetry.some((path) =>
      originalRequest.url?.includes(path),
    );

    if (shouldSkipRefresh) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      refreshPromise = refreshPromise ?? refreshAccessToken();
      const nextAccessToken = await refreshPromise;

      originalRequest.headers.Authorization = `Bearer ${nextAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      clearExpiredSession();

      return Promise.reject(refreshError);
    } finally {
      refreshPromise = null;
    }
  },
);

export default api;
