import { LoginPage } from "@/pages/Login";
import { Routes, Route, Navigate } from "react-router";
import UserDashboard from "@/pages/UserDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import AppLayout from "@/components/layout/AppLayout";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initAuthFromStorage } from "@/features/auth/authSlice";
import Unauthorized from "@/pages/Unauthorized";
import ProtectedRoute from "./ProtectedRoute";
import { type AppDispatch } from "@/app/stote";
import TaskDetails from "@/pages/TaskDetails";

const AppRoutes = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initAuthFromStorage());
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppLayout />}>
        <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/dashboard/task/:taskId" element={<TaskDetails />} />
        </Route>
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
