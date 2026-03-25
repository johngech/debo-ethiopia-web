import { createBrowserRouter } from "react-router-dom";

import { AdminLayout, adminRoutes } from "@/features/admin";
import { AuthLayout, authRoutes } from "@/features/auth";
import { ClientLayout, clientRoutes } from "@/features/client";

export const router = createBrowserRouter([
  // Client/Public Routes
  { path: "/", element: <ClientLayout />, children: clientRoutes },
  // Admin/Private Routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: adminRoutes,
  },
  // This can be part of the client route
  {
    path: "/auth",
    element: <AuthLayout />,
    children: authRoutes,
  },
]);
