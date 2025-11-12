import { User, LoginCredentials, UserRole } from './auth.types';
import { HttpClient } from '@/services/http';
import { ENV } from '@/config/env';

const httpClient = new HttpClient({ baseUrl: ENV.API_BASE_URL });

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const TOKEN_EXPIRES_AT_KEY = 'auth_token_expires_at';
const USER_KEY = 'user';
const EXPIRY_BUFFER_MS = 10_000; // refresh 10 seconds before expiry

type BackendRole = 'ADMIN' | 'STORE' | 'FACTORY_STAFF';

interface BackendUser {
  id: number;
  username: string;
  email?: string | null;
  role: BackendRole;
  storeId?: number | null;
  store?: {
    id: number;
    name: string;
    code?: string | null;
  } | null;
}

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: BackendUser;
}

export class AuthService {
  private static refreshPromise: Promise<string> | null = null;

  /**
   * Login user with credentials
   * Validates against backend t_users table
   */
  static async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await httpClient.post<AuthResponse>('/auth/login', {
        username: credentials.username,
        password: credentials.password,
      });

      const user = this.transformUser(response.user);
      this.persistSession(response, user);

      return user;
    } catch (error: any) {
      console.error('Login failed:', error);

      if (error.status === 401) {
        throw new Error('ユーザー名またはパスワードが正しくありません');
      }
      if (error.status === 404) {
        throw new Error('該当するユーザーが見つかりません');
      }
      if (error.status === 423) {
        throw new Error('アカウントがロックされています。管理者にお問い合わせください。');
      }
      throw new Error('ログインに失敗しました。時間をおいて再度お試しください。');
    }
  }

  /**
   * Logout current user
   */
  static async logout(): Promise<void> {
    try {
      // TODO: Call backend logout endpoint when implemented
      // await httpClient.post('/auth/logout');
    } finally {
      this.refreshPromise = null;
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(TOKEN_EXPIRES_AT_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }

  /**
   * Attempt to restore session (refresh token if needed)
   */
  static async restoreSession(): Promise<User | null> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return null;
    }

    const token = await this.getValidAccessToken();
    if (!token) {
      await this.logout();
      return null;
    }

    return this.getCurrentUser();
  }

  /**
   * Refresh authentication token using stored refresh token
   */
  static async refreshToken(): Promise<string> {
    if (!this.refreshPromise) {
      this.refreshPromise = (async () => {
        try {
          return await this.requestRefresh();
        } finally {
          this.refreshPromise = null;
        }
      })();
    }
    return this.refreshPromise;
  }

  private static async requestRefresh(): Promise<string> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await httpClient.post<AuthResponse>('/auth/refresh', {
      refreshToken,
    });

    const user = this.transformUser(response.user);
    this.persistSession(response, user);
    return response.access_token;
  }

  /**
   * Get a valid access token (refresh if necessary)
   */
  static async getValidAccessToken(): Promise<string | null> {
    const token = this.getAccessToken();
    if (!token) return null;

    const expiresAt = this.getAccessTokenExpiresAt();
    if (!expiresAt) return token;

    const now = Date.now();
    if (now < expiresAt - EXPIRY_BUFFER_MS) {
      return token;
    }

    try {
      return await this.refreshToken();
    } catch (error) {
      console.error('Failed to refresh access token:', error);
      await this.logout();
      return null;
    }
  }

  /**
   * Get current authenticated user
   */
  static getCurrentUser(): User | null {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  }

  /**
   * Check if user is authenticated synchronously (based on stored tokens)
   */
  static isAuthenticated(): boolean {
    const token = this.getAccessToken();
    const user = this.getCurrentUser();
    if (!token || !user) return false;

    const expiresAt = this.getAccessTokenExpiresAt();
    if (!expiresAt) return true;

    return Date.now() < expiresAt;
  }

  /**
   * Get raw access token without refresh logic
   */
  static getAccessToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Get stored refresh token
   */
  static getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  static async handleUnauthorized(): Promise<boolean> {
    try {
      const token = await this.refreshToken();
      return !!token;
    } catch (error) {
      console.error('Unable to refresh session after unauthorized response:', error);
      await this.logout();
      return false;
    }
  }

  private static transformUser(user: BackendUser): User {
    return {
      id: user.id,
      name: user.username,
      email: user.email ?? undefined,
      role: this.mapBackendRole(user.role),
      storeId: user.storeId ?? undefined,
      storeName: user.store?.name ?? undefined,
    };
  }

  private static persistSession(payload: AuthResponse, user: User) {
    localStorage.setItem(TOKEN_KEY, payload.access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, payload.refresh_token);
    localStorage.setItem(TOKEN_EXPIRES_AT_KEY, this.computeExpiryTimestamp(payload.expires_in).toString());
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private static computeExpiryTimestamp(expiresInSeconds: number): number {
    if (!Number.isFinite(expiresInSeconds)) {
      return Date.now() + 15 * 60 * 1000;
    }
    return Date.now() + expiresInSeconds * 1000;
  }

  private static getAccessTokenExpiresAt(): number | null {
    const value = localStorage.getItem(TOKEN_EXPIRES_AT_KEY);
    if (!value) return null;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  }

  private static mapBackendRole(backendRole: BackendRole): UserRole {
    const roleMap: Record<BackendRole, UserRole> = {
      ADMIN: 'ADMIN',
      STORE: 'STORE',
      FACTORY_STAFF: 'FACTORY_STAFF',
    };
    return roleMap[backendRole] ?? backendRole;
  }
}
