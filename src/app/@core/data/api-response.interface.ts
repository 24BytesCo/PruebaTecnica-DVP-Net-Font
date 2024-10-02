export interface ApiResponse<T> {
    isSuccessful: boolean;
    isError: boolean;
    message: string;
    totalCount?: number;
    data?: T | null; // 'data' será de tipo T en respuestas positivas y podría ser null o undefined en negativas
  }
  