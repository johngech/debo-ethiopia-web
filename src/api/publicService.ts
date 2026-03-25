import { baseApi } from "./api";
import { exceptionHandler } from "./ExceptionHandler";

// This call will NOT have a JWT header and won't trigger the 401 refresh logic

export const publicService = {
  getData: async <T>(endpoint: string, params?: object) => {
    try {
      const { data } = await baseApi.get<T>(endpoint, { params: params });
      return data;
    } catch (error: any) {
      exceptionHandler.emit({
        message: error?.message,
        type: "error",
      });
    }
  },

  postData: async <TResponse, TInput = any>(
    endpoint: string,
    payload: TInput,
  ): Promise<TResponse> => {
    try {
      const response = await baseApi.post<TResponse>(endpoint, payload);
      return response.data;
    } catch (error: any) {
      exceptionHandler.emit({
        message: error.message,
        type: "error",
      });
      throw error;
    }
  },
};
