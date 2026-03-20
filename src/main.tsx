import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.tsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element. Check your index.html");
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
