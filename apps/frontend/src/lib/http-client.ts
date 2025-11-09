import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import type { IApiError, IApiResponse } from '@agri-smart/types';
import { navigate } from '@/utils/navigation';
import { toast } from 'sonner';
import { ROUTES } from '@/constants';

// API Base URL - adjust based on your backend URL
// Backend runs on port 3000 with /api prefix
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

let isSessionHandling = false; // module-level flag to prevent multiple redirects

export const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to unwrap backend response and handle errors
apiClient.interceptors.response.use(
  (response: AxiosResponse<IApiResponse<any>>) => {
    // Backend wraps responses in { success, data, message }
    // Unwrap the data if it exists, otherwise return the response as-is
    if (
      response.data &&
      typeof response.data === 'object' &&
      'data' in response.data
    ) {
      return {
        ...response,
        data: response.data.data,
      };
    }
    return response;
  },
  (error: AxiosError<IApiError>) => {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'An error occurred';

    const status = error.response?.status;
    const url = error.config?.url || '';

    // Skip auto-logout for login endpoints and config endpoints
    const isLoginEndpoint =
      url.includes('/auth/login') || url.includes('/auth/shop/login');
    const isConfigEndpoint = url.includes('/config');

    // Skip auto-logout for 401/403 on login pages (let the login page handle it)
    const isOnLoginPage =
      window.location.pathname === ROUTES.AUTH.ADMIN_LOGIN ||
      window.location.pathname.match(/\/[^/]+\/login$/);

    // Handle authentication and authorization errors
    if (
      error.response &&
      [401, 403].includes(status!) &&
      !isLoginEndpoint &&
      !isConfigEndpoint &&
      !isOnLoginPage
    ) {
      if (!isSessionHandling) {
        isSessionHandling = true; // prevent multiple triggers

        // Clear tokens
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        localStorage.removeItem('user');

        // Determine redirect path based on current route
        const currentPath = window.location.pathname;
        if (currentPath.startsWith('/admin')) {
          navigate(ROUTES.AUTH.ADMIN_LOGIN, { replace: true });
        } else if (currentPath.match(/\/[^/]+\//)) {
          // Shop route - extract shopId and redirect to shop login
          const shopId = currentPath.split('/')[1];
          navigate(`/${shopId}/login`, { replace: true });
        } else {
          navigate(ROUTES.AUTH.ADMIN_LOGIN, { replace: true });
        }

        toast.error(errorMessage, { position: 'top-center', duration: 3000 });

        // Reset the flag after some time
        setTimeout(() => {
          isSessionHandling = false;
        }, 2000);
      }
    } else if (error.response) {
      // Handle other error status codes (but don't redirect)
      switch (status) {
        case 404:
          console.error('Resource not found:', errorMessage);
          break;
        case 500:
          console.error('Server error:', errorMessage);
          break;
        default:
          // For login errors, don't show toast here - let the component handle it
          if (!isLoginEndpoint && !isOnLoginPage) {
            console.error('API Error:', errorMessage);
          }
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Network error: No response from server');
      if (!isOnLoginPage) {
        toast.error('Network error: Please check your connection', {
          position: 'top-center',
          duration: 3000,
        });
      }
    } else {
      // Something else happened
      console.error('Error:', errorMessage);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
