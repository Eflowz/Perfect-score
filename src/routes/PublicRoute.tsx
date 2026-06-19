import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";
type Props = {
  children: React.ReactNode;
};

export const PublicRoute = ({ children }: Props) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
