export type UserRole = '店舗' | '店員' | 'admin';

export interface User {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  storeId?: number;
  storeName?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
