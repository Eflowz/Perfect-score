import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";

type Props = {
  children: React.ReactNode;
  adminOnly?: boolean;
};

export const ProtectedRoute = ({ children, adminOnly = false }: Props) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== "SUPER_ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
