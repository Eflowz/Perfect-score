export interface User {
  id: string;
  email: string;
  name: string;
  role: "USER" | "SUPER_ADMIN";
  xp: number;
  level: number;
  streakDays: number;
  completedLessons?: number;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
