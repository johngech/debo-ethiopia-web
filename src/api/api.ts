import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { exceptionHandler } from "./ExceptionHandler";
import { requestManager } from "./RequestManager";
import { tokenManager } from "./TokenManager";

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const BASE_URL = "https://debo-ethiopia-api.onrender.com/api";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const baseApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Intercept the request(the ingoing gatekeeper)

api.interceptors.request.use(async (config) => {
  // Circuit breaker check
  if (!requestManager.canRequest()) {
    const errorMsg = "System is cooling down due to high traffic. Please wait.";
    exceptionHandler.emit({ message: errorMsg, type: "warning" });
    throw new axios.Cancel(errorMsg);
  }

  const token = tokenManager.getToken();
  if (token) config.headers.Authorization = `JWT ${token}`;

  return config;
});

// Intercept the response (the outgoing gatekeeper)
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    // Concurrent Token Refresh (Proxy Pattern)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Otherwise, refresh token safely
      try {
        const newToken = await requestManager.handleRefresh(async () => {
          const { data } = await baseApi.post(
            "/auth/jwt/refresh",
            {},
            { withCredentials: true },
          );
          tokenManager.setToken(data.access);
          return data.access;
        });

        originalRequest.headers.Authorization = `JWT ${newToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        await useAuthStore.getState().logout();
        exceptionHandler.emit({
          message: "Session expired. Please login again.",
          type: "error",
        });
        globalThis.location.href = "/auth"; // url must be refactored to /login or /auth/login
        throw refreshError;
      }
    }

    // Global Error Mapping (Global Exception Handler)
    const status = error.response?.status;

    if (status === 429) {
      requestManager.tripBreaker();
      exceptionHandler.emit({
        message: "Too many requests. Breaker tripped.",
        type: "warning",
        status,
      });
    } else if (status >= 500) {
      exceptionHandler.emit({
        message: "Server encountered an error. Retrying later.",
        type: "error",
        status,
      });
    } else if (status === 403) {
      exceptionHandler.emit({
        message: "Access Denied: You don't have permission.",
        type: "error",
        status,
      });
    } else if (error.code === "ECONNABORTED") {
      exceptionHandler.emit({ message: "Request timed out.", type: "warning" });
    }

    throw error;
  },
);

export default api;
