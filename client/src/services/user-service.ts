import { useApiQuery, useApiMutation, useApiPut, useApiDelete } from '@/lib/api-service';
import { ApiError } from '@/lib/api-service';

// User types
export interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
}

// Query keys factory
export const userKeys = {
  all: ['users'] as const,
  detail: (id: string) => [...userKeys.all, id] as const,
  current: () => [...userKeys.all, 'current'] as const,
};

// Hooks for user operations

// Get current user
export function useCurrentUser() {
  return useApiQuery<User, ApiError>(
    userKeys.current(),
    '/api/users/me',
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
}

// Get user by ID
export function useUser(userId: string) {
  return useApiQuery<User, ApiError>(
    userKeys.detail(userId),
    `/api/users/${userId}`
  );
}

// Login mutation
export function useLogin() {
  return useApiMutation<User, LoginCredentials, ApiError>(
    '/api/users/login',
    {
      onSuccess: (data) => {
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(data));
      },
    }
  );
}

// Register mutation
export function useRegister() {
  return useApiMutation<User, RegisterData, ApiError>(
    '/api/users/register'
  );
}

// Logout mutation
export function useLogout() {
  return useApiMutation<void, void, ApiError>(
    '/api/users/logout',
    {
      onSuccess: () => {
        localStorage.removeItem('user');
      },
    }
  );
}

// Update user mutation
export function useUpdateUser(userId?: string) {
  return useApiPut<User, UpdateUserData, ApiError>(
    `/api/users/${userId || 'me'}`,
    {
      onSuccess: () => {
        // Invalidate current user query
        // This will be handled by the mutation hook
      },
    }
  );
}

// Delete user mutation
export function useDeleteUser() {
  return useApiDelete<ApiError>(
    '/api/users/me',
    {
      onSuccess: () => {
        localStorage.removeItem('user');
      },
    }
  );
}

