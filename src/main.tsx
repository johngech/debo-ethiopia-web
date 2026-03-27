import {
  QueryClient,
  QueryClientProvider as ReactQueryProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { AxiosError } from "axios";
import { router } from "./routes/router.tsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element. Check your index.html");
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: unknown) => {
        if (error instanceof AxiosError) {
          // never retry auth errors
          if (error.response?.status === 401) return false;

          //  optionally skip forbidden
          if (error.response?.status === 403) return false;
        }
        return failureCount < 3;
      },
    },
  },
});

createRoot(rootElement).render(
  <StrictMode>
    <ReactQueryProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryProvider>
  </StrictMode>,
);
