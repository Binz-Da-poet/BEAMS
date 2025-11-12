# Role-Based Authentication & Routing

## 📋 Tổng quan

Hệ thống đã được cập nhật với role-based authentication và routing tự động dựa trên vai trò người dùng.

## 🔐 Flow đăng nhập

### 1. Login Process
```
User nhập username/password
    ↓
Frontend gọi POST /api/auth/login
    ↓
Backend validate với bảng t_users (bcrypt)
    ↓
Trả về: { access_token, user: { id, username, role, storeId, store } }
    ↓
Frontend lưu token + user vào localStorage
    ↓
Auto redirect dựa theo role
```

### 2. Auto Redirect Rules
| Role | Redirect To | Access |
|------|-------------|--------|
| **ADMIN** | `/admin` | Full access to admin dashboard + all features |
| **STORE** | `/menu` | Store operations only |
| **FACTORY_STAFF** | `/menu` | Factory operations only |

## 🚪 Protected Routes

### Public Routes
- `/login` - Login page

### Protected Routes (Requires authentication)
- `/menu` - Main menu (all authenticated users)
- `/order/*` - Order pages (all authenticated users)
- `/customer/*` - Customer pages (all authenticated users)
- `/drafts` - Drafts page (all authenticated users)
- `/dashboard` - Dashboard (all authenticated users)

### Admin-Only Routes (Requires ADMIN role)
- `/admin` - Admin dashboard
- `/admin/staff` - Staff management
- `/admin/stores` - Store management
- `/admin/database` - Database management

## 🛡️ Security Features

### 1. ProtectedRoute Component
```tsx
<ProtectedRoute allowedRoles={['ADMIN']}>
  <AdminPage />
</ProtectedRoute>
```

**Features:**
- Kiểm tra authentication status
- Validate role-based access
- Auto redirect nếu không có quyền:
  - ADMIN → `/admin`
  - STORE/FACTORY_STAFF → `/menu`
  - Unauthenticated → `/login`

### 2. Auth Context
**Provides:**
- `user` - Current user info
- `isAuthenticated` - Boolean status
- `isLoading` - Loading state
- `error` - Error messages
- `login(credentials)` - Login function
- `logout()` - Logout function

**Usage:**
```tsx
import { useAuth } from '@/features/auth';

const MyComponent = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (user?.role === 'ADMIN') {
    // Show admin features
  }
};
```

## 👥 User Accounts (Seed Data)

| Username | Password | Role | Store |
|----------|----------|------|-------|
| `admin` | `ADMIN` | ADMIN | - |
| `store001` | `1111` | STORE | FPT Store |
| `factory001` | `1111` | FACTORY_STAFF | - |

## 🎨 UI Components

### UserMenu Component
Located in header, provides:
- User avatar with initial
- User name and role display
- Store info (for STORE users)
- Quick navigation links
- Logout button

**Shows based on role:**
- ADMIN: Link to Admin Dashboard
- All users: Menu, Drafts, Logout

### RootLayout
- Dynamic header navigation (shows Admin link only for ADMIN)
- Store info display (only for STORE users)
- UserMenu dropdown
- Protected content area

## 🔄 Logout Flow

```
User clicks Logout
    ↓
AuthService.logout()
    ↓
Clear localStorage (token + user)
    ↓
Clear auth context state
    ↓
Navigate to /login
```

## 📝 Backend Auth API

### POST `/api/auth/login`
**Request:**
```json
{
  "username": "admin",
  "password": "ADMIN"
}
```

**Response (Success 200):**
```json
{
  "access_token": "token_1_1731313200000",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "ADMIN",
    "isActive": true,
    "storeId": null,
    "store": null,
    "createdAt": "2025-11-11T00:00:00.000Z",
    "updatedAt": "2025-11-11T00:00:00.000Z",
    "lastLoginAt": "2025-11-11T08:00:00.000Z"
  }
}
```

**Response (Error 401):**
```json
{
  "statusCode": 401,
  "message": "Invalid username or password"
}
```

**Response (Error 404):**
```json
{
  "statusCode": 404,
  "message": "User not found"
}
```

## 🗂️ File Structure

```
frontend/src/features/auth/
├── auth.context.tsx           # Auth state management
├── auth.service.ts            # API calls & localStorage
├── auth.types.ts              # TypeScript types
├── components/
│   ├── LoginForm.tsx          # Login form with auto-redirect
│   ├── ProtectedRoute.tsx     # Route protection HOC
│   └── UserMenu.tsx           # User dropdown menu
├── pages/
│   └── LoginPage.tsx          # Login page wrapper
└── index.ts                   # Exports

backend/src/resources/auth/
├── auth.controller.ts         # Login endpoint
├── auth.service.ts            # Auth logic (bcrypt validation)
├── auth.module.ts             # NestJS module
└── index.ts                   # Exports
```

## 🚀 Testing

### Test ADMIN Role
1. Navigate to http://localhost:5173/login
2. Login with: `admin` / `ADMIN`
3. Should redirect to `/admin` (Admin Dashboard)
4. Header shows "Admin" link
5. UserMenu shows "Admin Dashboard" option

### Test STORE Role
1. Navigate to http://localhost:5173/login
2. Login with: `store001` / `1111`
3. Should redirect to `/menu`
4. Header shows store info (店番: 1, 店略: FPT Store)
5. No "Admin" link in header
6. Cannot access `/admin/*` routes (will redirect to `/menu`)

### Test FACTORY_STAFF Role
1. Navigate to http://localhost:5173/login
2. Login with: `factory001` / `1111`
3. Should redirect to `/menu`
4. No store info displayed
5. Cannot access `/admin/*` routes

### Test Protected Routes
1. Without login, try to access `/menu` or `/admin`
2. Should redirect to `/login`
3. After login, can access allowed routes

## 🔧 Configuration

### Environment Variables
```env
# Backend (.env)
DATABASE_URL="postgresql://..."
PORT=3000

# Frontend (vite)
VITE_API_BASE_URL=http://localhost:3000/api
```

### Token Storage
- **Key:** `auth_token`
- **Value:** Simple token format: `token_{userId}_{timestamp}`
- **Note:** Production should use JWT with expiration

### User Storage
- **Key:** `user`
- **Value:** JSON stringified user object
- **Note:** Synced with backend user data

## ⚠️ Important Notes

1. **Token Security:** Current implementation uses simple tokens. Production should use JWT with expiration and refresh tokens.

2. **Password Hashing:** Backend uses bcryptjs (10 rounds) for password hashing.

3. **CORS:** Ensure backend CORS is configured to allow frontend origin.

4. **Session Persistence:** User session persists across page reloads via localStorage.

5. **Role Changes:** If user role changes in database, user must logout and login again to see new permissions.

## 📦 Dependencies

### Backend
- `bcryptjs` - Password hashing
- `@types/bcryptjs` - TypeScript types
- `@nestjs/common`, `@nestjs/core` - NestJS framework
- `@prisma/client` - Database ORM

### Frontend
- `react-router-dom` - Routing
- `react` - UI framework
- No additional auth libraries needed

## 🎯 Next Steps (Optional)

1. **JWT Implementation:** Replace simple tokens with JWT
2. **Refresh Tokens:** Add token refresh mechanism
3. **Session Timeout:** Auto logout after inactivity
4. **Permission System:** Fine-grained permissions beyond roles
5. **Multi-factor Auth:** Add 2FA for admin users
6. **Audit Logging:** Track login/logout events
7. **Password Reset:** Add forgot password flow
8. **Rate Limiting:** Prevent brute force attacks

