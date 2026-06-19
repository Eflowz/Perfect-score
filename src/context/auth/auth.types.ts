import type { User } from "../../types/auth.types";
export type AuthContextType = {
  user: User | null;

  loading: boolean;

  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<User>;

  register: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;

  logout: () => void;
};
