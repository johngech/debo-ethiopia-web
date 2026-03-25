import type { RouteObject } from "react-router-dom";
import { HomePage } from "./pages";

export const clientRoutes: RouteObject[] = [
  { index: true, element: <HomePage /> },
];
