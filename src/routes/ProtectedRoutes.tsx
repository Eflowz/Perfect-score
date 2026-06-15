import { Navigate } from "react-router-dom";

import { useAuth } from "../context/useAuth";
type Props = {
 children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {

 const { user, loading } = useAuth();

 if (loading) {
 return <p>Loading...</p>;
 }

 if (!user) {
 return <Navigate to="/login" replace />;
 }

 return <>{children}</>;
};