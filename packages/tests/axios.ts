import axios, { AxiosError, AxiosResponse } from "axios";

interface ErrorResponse {
  success: false;
  statusCode?: number;
  data?: unknown;
  message: string;
}

interface SuccessResponse<T> {
  success: true;
  statusCode?: number;
  data: T;
  message?: string;
}

type Response<T> = SuccessResponse<T> | ErrorResponse;

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

async function handleRequest<TResponse>(
  request: Promise<AxiosResponse<TResponse>>,
): Promise<Response<TResponse>> {
  try {
    const response = await request;
    const message = (response.data as { message?: string })?.message;
    return {
      success: true,
      statusCode: response.status,
      data: response.data,
      message,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        statusCode: error.response?.status,
        data: error.response?.data,
        message: error.response?.data?.message || "An error occurred",
      };
    }
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}

export const ErrorHandler = {
  async post<TRequest, TResponse>(
    url: string,
    data: TRequest,
  ): Promise<Response<TResponse>> {
    return handleRequest(axiosInstance.post<TResponse>(url, data));
  },
  async get<TResponse>(url: string): Promise<Response<TResponse>> {
    return handleRequest(axiosInstance.get<TResponse>(url));
  },
  async put<TRequest, TResponse>(
    url: string,
    data: TRequest,
  ): Promise<Response<TResponse>> {
    return handleRequest(axiosInstance.put<TResponse>(url, data));
  },
  async delete<TResponse>(url: string): Promise<Response<TResponse>> {
    return handleRequest(axiosInstance.delete<TResponse>(url));
  },
};
