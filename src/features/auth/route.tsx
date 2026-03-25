import type { RouteObject } from "react-router-dom";
import { LoginPage } from "./pages";

export const authRoutes: RouteObject[] = [
  { index: true, element: <LoginPage /> },
  // add error page
];
