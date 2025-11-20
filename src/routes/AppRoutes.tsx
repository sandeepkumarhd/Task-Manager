import { LoginPage } from "@/pages/Login";
import { Routes, Route, Navigate } from "react-router";
import UserDashboard from "@/pages/UserDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import { ProtectedRoute } from "./ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initAuthFromStorage } from "@/features/auth/authSlice";
import Unauthorized from "@/pages/Unauthorized";

const AppRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAuthFromStorage()); // 🔥 Load user from localStorage
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
