export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  meta: PaginationMeta;
  data: T[];
}

export interface PaginatedApiResponse<T> {
  success: boolean;
  message: string;
  data: {
    meta: PaginationMeta;
    data: T[];
  };
}
