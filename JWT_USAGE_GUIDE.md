# Hướng dẫn sử dụng JWT trong BEAMS

## 📋 Tổng quan

Hệ thống sử dụng **JWT (JSON Web Token)** với 2 loại token:
- **Access Token**: Token ngắn hạn (mặc định 15 phút) để truy cập API
- **Refresh Token**: Token dài hạn (mặc định 7 ngày) để làm mới access token

## 🔧 Cấu hình Backend

### 1. Tạo file `.env` trong thư mục `backend/`

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/beams_db"

# JWT Configuration
JWT_ACCESS_TOKEN_SECRET=your_super_secret_access_key_here_min_32_chars
JWT_REFRESH_TOKEN_SECRET=your_super_secret_refresh_key_here_min_32_chars
JWT_ACCESS_TOKEN_EXPIRATION=15m
JWT_REFRESH_TOKEN_EXPIRATION=7d
```

### 2. Giải thích các biến môi trường

- `JWT_ACCESS_TOKEN_SECRET`: Secret key để ký access token (nên dùng chuỗi ngẫu nhiên dài ít nhất 32 ký tự)
- `JWT_REFRESH_TOKEN_SECRET`: Secret key để ký refresh token (khác với access token secret)
- `JWT_ACCESS_TOKEN_EXPIRATION`: Thời gian hết hạn access token (ví dụ: `15m`, `1h`, `30m`)
- `JWT_REFRESH_TOKEN_EXPIRATION`: Thời gian hết hạn refresh token (ví dụ: `7d`, `30d`)

**Format thời gian:**
- `s` = giây (ví dụ: `30s`)
- `m` = phút (ví dụ: `15m`)
- `h` = giờ (ví dụ: `2h`)
- `d` = ngày (ví dụ: `7d`)

### 3. Tạo secret key an toàn

```bash
# Trên Linux/Mac
openssl rand -base64 32

# Hoặc sử dụng Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 🔐 Flow Authentication

### 1. Đăng nhập (Login)

**Frontend gửi request:**
```typescript
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "ADMIN"
}
```

**Backend trả về:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 900,
  "user": {
    "id": 1,
    "username": "admin",
    "role": "ADMIN",
    "storeId": null,
    "isActive": true
  }
}
```

**Frontend lưu tokens:**
- `access_token` → `localStorage.getItem('auth_token')`
- `refresh_token` → `localStorage.getItem('refresh_token')`
- `expires_in` → Tính toán thời gian hết hạn và lưu

### 2. Sử dụng Access Token

**Mọi request API cần gửi kèm token:**
```typescript
GET /api/stores
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Frontend tự động thêm header:**
```typescript
// Trong HttpClient, token được tự động thêm vào mọi request
const httpClient = new HttpClient({
  baseUrl: ENV.API_BASE_URL,
  getAccessToken: () => AuthService.getValidAccessToken(),
  onUnauthorized: () => AuthService.handleUnauthorized(),
});
```

### 3. Refresh Token (Tự động)

Khi access token hết hạn (hoặc sắp hết hạn trong 10 giây), frontend tự động refresh:

**Frontend gửi request:**
```typescript
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Backend trả về tokens mới:**
```json
{
  "access_token": "new_access_token...",
  "refresh_token": "new_refresh_token...",
  "expires_in": 900,
  "user": { ... }
}
```

### 4. Đăng xuất (Logout)

**Frontend xóa tokens:**
```typescript
await AuthService.logout();
// Xóa tất cả tokens và user info khỏi localStorage
```

## 💻 Sử dụng từ Frontend

### 1. Đăng nhập

```typescript
import { AuthService } from '@/features/auth/auth.service';

// Đăng nhập
try {
  const user = await AuthService.login({
    username: 'admin',
    password: 'ADMIN'
  });
  console.log('Đăng nhập thành công:', user);
} catch (error) {
  console.error('Lỗi đăng nhập:', error.message);
}
```

### 2. Kiểm tra trạng thái đăng nhập

```typescript
// Kiểm tra đồng bộ (nhanh)
const isAuthenticated = AuthService.isAuthenticated();

// Lấy user hiện tại
const currentUser = AuthService.getCurrentUser();

// Khôi phục session (async, tự động refresh nếu cần)
const user = await AuthService.restoreSession();
```

### 3. Sử dụng trong React Component

```typescript
import { useAuth } from '@/features/auth';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Vui lòng đăng nhập</div>;
  }

  return (
    <div>
      <p>Xin chào, {user?.name}</p>
      <button onClick={logout}>Đăng xuất</button>
    </div>
  );
}
```

### 4. Gọi API với authentication tự động

```typescript
import { ApiService } from '@/services/api';

// Token được tự động thêm vào header
const stores = await ApiService.getStores();
const staff = await ApiService.getStaff();
```

## 🛡️ Sử dụng từ Backend

### 1. Bảo vệ Route với AuthGuard

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';

@Controller('stores')
@UseGuards(AuthGuard) // Yêu cầu authentication
export class StoresController {
  @Get()
  findAll(@Request() req) {
    // req.user chứa thông tin user đã được xác thực
    console.log('User:', req.user);
    return this.storesService.findAll();
  }
}
```

### 2. Bảo vệ Route với Role-based Access

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('stores')
@UseGuards(AuthGuard, RolesGuard) // Yêu cầu authentication + role check
@Roles('ADMIN') // Chỉ ADMIN mới truy cập được
export class StoresController {
  @Get()
  findAll() {
    return this.storesService.findAll();
  }
}
```

### 3. Truy cập thông tin user trong Controller

```typescript
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  @Get()
  getProfile(@Request() req) {
    // req.user được set bởi AuthGuard
    const userId = req.user.id;
    const userRole = req.user.role;
    const storeId = req.user.storeId;
    
    return {
      id: req.user.id,
      username: req.user.username,
      role: req.user.role,
      store: req.user.store,
    };
  }
}
```

### 4. Validate Token thủ công

```typescript
import { Injectable } from '@nestjs/common';
import { AuthService } from '../resources/auth/auth.service';

@Injectable()
export class SomeService {
  constructor(private readonly authService: AuthService) {}

  async someMethod(token: string) {
    const user = await this.authService.validateToken(token);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    // Sử dụng user...
  }
}
```

## 📝 JWT Payload Structure

Access token và refresh token chứa payload:

```typescript
{
  sub: number,        // User ID
  role: string,        // User role (ADMIN, STORE, FACTORY_STAFF)
  storeId?: number,    // Store ID (nếu có)
  iat: number,        // Issued at (tự động thêm bởi JWT)
  exp: number          // Expiration time (tự động thêm bởi JWT)
}
```

## 🔄 Tự động Refresh Token

Frontend tự động refresh token khi:
1. Access token sắp hết hạn (trong vòng 10 giây)
2. Nhận được response 401 Unauthorized từ API

**Flow tự động:**
```
1. API request → 401 Unauthorized
2. HttpClient gọi onUnauthorized callback
3. AuthService.handleUnauthorized() được gọi
4. Refresh token được gửi đến /auth/refresh
5. Nhận tokens mới và lưu vào localStorage
6. Retry request ban đầu với token mới
```

## ⚠️ Lưu ý bảo mật

1. **Không commit `.env` file** vào Git
2. **Sử dụng secret keys mạnh** (ít nhất 32 ký tự, ngẫu nhiên)
3. **Access token ngắn hạn** (15 phút) để giảm thiểu rủi ro nếu bị lộ
4. **Refresh token dài hạn** (7 ngày) nhưng cần bảo vệ tốt
5. **HTTPS trong production** để bảo vệ tokens khi truyền qua mạng
6. **Xóa tokens khi logout** để tránh session hijacking

## 🧪 Testing

### Test đăng nhập

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"ADMIN"}'
```

### Test API với token

```bash
# Lấy token từ response login
TOKEN="your_access_token_here"

curl -X GET http://localhost:3000/api/stores \
  -H "Authorization: Bearer $TOKEN"
```

### Test refresh token

```bash
REFRESH_TOKEN="your_refresh_token_here"

curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d "{\"refreshToken\":\"$REFRESH_TOKEN\"}"
```

## 📚 Tài liệu tham khảo

- [NestJS JWT Module](https://docs.nestjs.com/security/authentication)
- [JWT.io](https://jwt.io/) - Decode và kiểm tra JWT tokens
- [RFC 7519 - JSON Web Token](https://tools.ietf.org/html/rfc7519)

