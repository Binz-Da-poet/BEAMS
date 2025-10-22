import { User, LoginCredentials } from './auth.types';

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@beams.com',
    role: 'admin',
  },
  {
    id: 2,
    name: 'Store Manager',
    email: 'store@beams.com',
    role: '店舗',
    storeId: 1,
    storeName: 'FPT Store',
  },
  {
    id: 3,
    name: 'Staff Member',
    email: 'staff@beams.com',
    role: '店員',
    storeId: 1,
    storeName: 'FPT Store',
  },
];

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<User> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes, accept any password
    const user = mockUsers.find((u) => u.email === credentials.email && u.role === credentials.role);

    if (!user) {
      throw new Error('Invalid credentials or role');
    }

    // Store user in localStorage
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');

    return user;
  }

  static async logout(): Promise<void> {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  }

  static getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  static isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
}
