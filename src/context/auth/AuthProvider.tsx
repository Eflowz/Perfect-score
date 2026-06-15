import { useEffect, useState } from "react";

import { AuthContext } from "./AuthContext";

import { getUser, clearAuth, } from "../../utlis/storage";
import { loginUser, registerUser,} from "../../api/authApi";
import type { User } from "../../types/auth.types";

export const AuthProvider = ({
 children,
}: {
 children: React.ReactNode;
}) => {

 const [user, setUser] = useState<User | null>(null);

 const [loading, setLoading] = useState(true);


 useEffect(() => {

 const storedUser = getUser();

 if (storedUser) {
 setUser(storedUser);
 }

 setLoading(false);

 }, []);


 const login = async (
 email: string,
 password: string
 ) => {

 const data = await loginUser({
 email,
 password,
 });

 setUser(data.user);
 };


 const register = async (dataInput: {
 name: string;
 email: string;
 password: string;
 }) => {

 const data = await registerUser(dataInput);

 setUser(data.user);
 };


 const logout = () => {

 clearAuth();

 setUser(null);
 };


 return (
 <AuthContext.Provider
 value={{
 user,
 loading,
 isAuthenticated: !!user,
 login,
 register,
 logout,
 }}
 >
 {children}
 </AuthContext.Provider>
 );
};