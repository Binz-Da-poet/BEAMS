import { User, LoginCredentials } from './auth.types';
import { HttpClient } from '@/services/http';
import { ENV } from '@/config/env';

const httpClient = new HttpClient({ baseUrl: ENV.API_BASE_URL });

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user';

interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    username: string;
    email?: string;
    role: 'ADMIN' | 'STORE' | 'FACTORY_STAFF';
    storeId?: number;
    store?: {
      id: number;
      name: string;
      code?: string;
    };
  };
}

export class AuthService {
  /**
   * Login user with credentials
   * TODO: Update endpoint when backend auth is implemented
   */
  static async login(credentials: LoginCredentials): Promise<User> {
    try {
      // TODO: Replace with actual backend endpoint when auth is implemented
      // const response = await httpClient.post<LoginResponse>('/auth/login', {
      //   username: credentials.email, // or credentials.username
      //   password: credentials.password,
      // });

      // For now, use mock authentication
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock users for development (matching seed data from backend)
      const mockUsers: { [key: string]: User } = {
        'admin': {
          id: 1,
          name: 'Admin User',
          email: 'admin@beams.com',
          role: 'ADMIN',
        },
        'store001': {
          id: 2,
          name: 'Store Manager',
          email: 'store@beams.com',
          role: 'STORE',
          storeId: 1,
          storeName: 'FPT Store',
        },
        'factory001': {
          id: 3,
          name: 'Factory Staff',
          email: 'factory@beams.com',
          role: 'FACTORY_STAFF',
        },
      };

      const user = mockUsers[credentials.username];

      if (!user) {
        throw new Error('Invalid username or password');
      }

      // Simple password check (for demo - in production use bcrypt)
      const validPasswords: { [key: string]: string } = {
        'admin': 'ADMIN',
        'store001': '1111',
        'factory001': '1111',
      };

      if (validPasswords[credentials.username] !== credentials.password) {
        throw new Error('Invalid username or password');
      }

      // Store mock token and user
      localStorage.setItem(TOKEN_KEY, 'mock-token-' + Date.now());
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      return user;

      // When backend is ready, uncomment this:
      // const { access_token, user: userData } = response;
      //
      // // Transform backend user to frontend User type
      // const user: User = {
      //   id: userData.id,
      //   name: userData.username,
      //   email: userData.email,
      //   role: this.mapBackendRole(userData.role),
      //   storeId: userData.storeId,
      //   storeName: userData.store?.name,
      // };
      //
      // // Store token and user
      // localStorage.setItem(TOKEN_KEY, access_token);
      // localStorage.setItem(USER_KEY, JSON.stringify(user));
      //
      // return user;
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed. Please check your credentials.');
    }
  }

  /**
   * Logout current user
   */
  static async logout(): Promise<void> {
    try {
      // TODO: Call backend logout endpoint when implemented
      // await httpClient.post('/auth/logout');

      // Clear local storage
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error('Logout failed:', error);
      // Clear storage anyway
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }

  /**
   * Get current authenticated user
   */
  static getCurrentUser(): User | null {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = this.getCurrentUser();
    return !!token && !!user;
  }

  /**
   * Get authentication token
   */
  static getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Map backend role to frontend role
   * Backend: ADMIN, STORE, FACTORY_STAFF
   * Frontend: admin, 店舗, 店員, etc.
   */
  private static mapBackendRole(backendRole: 'ADMIN' | 'STORE' | 'FACTORY_STAFF'): string {
    const roleMap: Record<string, string> = {
      ADMIN: 'ADMIN',
      STORE: 'STORE',
      FACTORY_STAFF: 'FACTORY_STAFF',
    };
    return roleMap[backendRole] || backendRole;
  }

  /**
   * Refresh authentication token
   * TODO: Implement when backend supports token refresh
   */
  static async refreshToken(): Promise<string> {
    try {
      // const response = await httpClient.post<{ access_token: string }>('/auth/refresh');
      // const { access_token } = response;
      // localStorage.setItem(TOKEN_KEY, access_token);
      // return access_token;

      // Mock implementation
      const currentToken = this.getToken();
      if (!currentToken) {
        throw new Error('No token to refresh');
      }
      return currentToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  }
}
