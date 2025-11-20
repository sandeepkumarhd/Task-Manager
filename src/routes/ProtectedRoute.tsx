import { useAppSelector } from "@/app/hooks";
import { initAuthFromStorage, type UserRole } from "@/features/auth/authSlice";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, isInitialized } = useAppSelector((s) => s.auth);
  console.log(user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (!isInitialized) {
    return <div>Loading...</div>; // Prevents flicker
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
