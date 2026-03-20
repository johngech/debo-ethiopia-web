import { createBrowserRouter } from "react-router-dom";
import { AdminLayout, ClientLayout } from "../components/layout";

export const router = createBrowserRouter([
  // Client/Public Routes
  { path: "/", element: <ClientLayout />, children: [{}] },
  // Admin/Private Routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [{ index: true, element: <h1>Dashboard</h1> }],
  },
]);
