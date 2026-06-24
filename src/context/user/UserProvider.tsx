import { useState } from "react";
import { UserContext } from "./UserContext";
import type { UserProfile } from "../../types/user.types";


type Props = {
 children: React.ReactNode;
};


export const UserProvider = ({children}: Props) => {

 const [user, setUser] = useState<UserProfile | null>(null);


 return (
 <UserContext.Provider value={{user, setUser}}>
 {children}
 </UserContext.Provider>
 );
};

