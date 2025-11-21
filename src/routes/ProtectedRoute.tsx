import { useEffect } from "react";
import { useAppSelector } from "@/app/hooks";
import { type UserRole } from "@/features/auth/authSlice";
import { Outlet, useNavigate } from "react-router";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, isInitialized } = useAppSelector((s) => s.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isInitialized) return;
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      navigate("/unauthorized", { replace: true });
    }
  }, [user, allowedRoles, isInitialized, navigate]);
  if (!isInitialized) return <div>Loading...</div>;
  return <Outlet />;
};

export default ProtectedRoute;
