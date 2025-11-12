import type { PrismaUserRole } from '@/types/prisma-types';

export type UserRole = PrismaUserRole;

export interface User {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  role: UserRole | string;
  storeId?: number;
  storeName?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
