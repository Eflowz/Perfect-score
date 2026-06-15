import api from "./axios";
import {
 setAccessToken,
 setRefreshToken,
 setUser,
} from "../utlis/storage";


import type { LoginRequest,RegisterRequest,
 AuthResponse } from "../types/auth.types";

export const registerUser = async (
 data: RegisterRequest
): Promise<AuthResponse> => {
 const res = await api.post<AuthResponse>("/auth/register", data);

 const response = res.data;

 setUser(response.user);
 setAccessToken(response.accessToken);
 setRefreshToken(response.refreshToken);

 return response;
};

/**
 * LOGIN
 */
export const loginUser = async (
 data: LoginRequest
): Promise<AuthResponse> => {
 const res = await api.post<AuthResponse>("/auth/login", data);

 const response = res.data;

 setUser(response.user);
 setAccessToken(response.accessToken);
 setRefreshToken(response.refreshToken);

 return response;
};