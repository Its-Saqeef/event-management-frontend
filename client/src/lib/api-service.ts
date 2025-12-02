import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import apiClient from './api-client';
import { AxiosError, AxiosResponse } from 'axios';

// Generic API response type
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Generic error response type
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// Helper function to extract error message
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const apiError = error.response?.data as ApiError;
    return apiError?.message || error.message || 'An error occurred';
  }
  return 'An error occurred';
};

// Custom hook for GET requests
export function useApiQuery<TData = unknown, TError = ApiError>(
  queryKey: readonly unknown[],
  url: string,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TData, TError>({
    queryKey,
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<TData>>(url);
      return response.data.data;
    },
    ...options,
  });
}

// Custom hook for POST requests
export function useApiMutation<TData = unknown, TVariables = unknown, TError = ApiError>(
  url: string,
  options?: UseMutationOptions<TData, TError, TVariables>
) {
  const queryClient = useQueryClient();

  return useMutation<TData, TError, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const response = await apiClient.post<ApiResponse<TData>>(url, variables);
      return response.data.data;
    },
    ...options,
    onSuccess: (data, variables, context) => {
      // Invalidate relevant queries after successful mutation
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
}

// Custom hook for PUT requests
export function useApiPut<TData = unknown, TVariables = unknown, TError = ApiError>(
  url: string,
  options?: UseMutationOptions<TData, TError, TVariables>
) {
  const queryClient = useQueryClient();

  return useMutation<TData, TError, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const response = await apiClient.put<ApiResponse<TData>>(url, variables);
      return response.data.data;
    },
    ...options,
    onSuccess: (data, variables, context) => {
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
}

// Custom hook for PATCH requests
export function useApiPatch<TData = unknown, TVariables = unknown, TError = ApiError>(
  url: string,
  options?: UseMutationOptions<TData, TError, TVariables>
) {
  return useMutation<TData, TError, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const response = await apiClient.patch<ApiResponse<TData>>(url, variables);
      return response.data.data;
    },
    ...options,
  });
}

// Custom hook for DELETE requests
export function useApiDelete<TError = ApiError>(
  url: string,
  options?: UseMutationOptions<void, TError, void>
) {
  return useMutation<void, TError, void>({
    mutationFn: async () => {
      await apiClient.delete(url);
    },
    ...options,
  });
}

// Helper to invalidate queries
export function useInvalidateQueries() {
  const queryClient = useQueryClient();

  return {
    invalidate: (queryKey: readonly unknown[]) => {
      queryClient.invalidateQueries({ queryKey });
    },
    invalidateAll: () => {
      queryClient.invalidateQueries();
    },
  };
}

