export interface IApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

export interface IApiError {
  message: string;
  statusCode: number;
  error?: string;
}

export interface IPaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

