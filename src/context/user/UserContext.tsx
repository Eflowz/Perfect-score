import { createContext } from "react";

import type { UserProfile } from "../../types/user.types";

type UserContextType = {
 user: UserProfile | null;
 setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
};

export const UserContext = createContext<UserContextType | null>(null);