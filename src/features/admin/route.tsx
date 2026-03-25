import type { RouteObject } from "react-router-dom";
import { AdminDashboard, AdminSettings } from "./pages";

export const adminRoutes: RouteObject[] = [
  { index: true, element: <AdminDashboard /> },
  { path: "settings", element: <AdminSettings /> },
];
