import { useAuth } from "../context/auth/useAuth";
type Props = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {
  const { loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};
