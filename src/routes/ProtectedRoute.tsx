import { Navigate, Outlet } from "react-router-dom";
import { tokenManager } from "@/api/TokenManager";
import { FullScreenLoader } from "@/components/ui";
import { useMe } from "@/hooks";

const ProtectedRoute = ({ adminOnly = false }) => {
  const token = tokenManager.getToken();
  const { data: user, isLoading, isError } = useMe();

  // No token at all → redirect immediately
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  // ⏳ Wait for user fetch
  if (isLoading) {
    return <FullScreenLoader message="Authenticating your account..." />;
  }

  // Invalid token / fetch failed
  if (isError || !user) {
    return <Navigate to="/auth" replace />;
  }

  // Admin check
  if (adminOnly && user.role !== "SUPER_ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
