# Hệ thống đăng nhập BEAMS

## Tổng quan

Hệ thống đăng nhập được thiết kế với 3 role chính:

- **店舗 (Cửa hàng)**: Quản lý cửa hàng, xem báo cáo và quản lý đơn hàng
- **店員 (Nhân viên)**: Tạo đơn hàng, quản lý khách hàng và xử lý giao dịch
- **admin**: Quản lý toàn bộ hệ thống, cấu hình và báo cáo tổng quan

## Cấu trúc thư mục

```
frontend/src/features/auth/
├── auth.types.ts          # Định nghĩa types cho authentication
├── auth.service.ts        # Service xử lý đăng nhập/đăng xuất
├── auth.context.tsx       # React Context cho state management
├── components/
│   ├── LoginForm.tsx      # Form đăng nhập
│   ├── ProtectedRoute.tsx # Component bảo vệ route theo role
│   ├── AuthGuard.tsx      # Component kiểm tra authentication
│   └── UserMenu.tsx       # Menu user trong header
└── pages/
    └── LoginPage.tsx      # Trang đăng nhập
```

## Cách sử dụng

### 1. Thông tin đăng nhập mẫu

- **Admin**: admin@beams.com / (mật khẩu bất kỳ)
- **店舗**: store@beams.com / (mật khẩu bất kỳ)
- **店員**: staff@beams.com / (mật khẩu bất kỳ)

### 2. Luồng đăng nhập

1. Truy cập `/login` để đăng nhập
2. Chọn role từ dropdown
3. Nhập email và mật khẩu
4. Hệ thống sẽ redirect về dashboard sau khi đăng nhập thành công

### 3. Bảo vệ route

- Tất cả route chính được bảo vệ bởi `AuthGuard`
- Nếu chưa đăng nhập, sẽ redirect về `/login`
- Có thể sử dụng `ProtectedRoute` để bảo vệ route theo role cụ thể

### 4. Quản lý state

- Sử dụng `useAuth()` hook để truy cập thông tin user và các function đăng nhập/đăng xuất
- State được lưu trong localStorage để duy trì session

## Tính năng chính

### LoginForm

- Form đăng nhập với validation
- Dropdown chọn role
- Hiển thị thông tin đăng nhập mẫu
- Loading state và error handling

### UserMenu

- Hiển thị thông tin user trong header
- Dropdown menu với option đăng xuất
- Hiển thị role và tên cửa hàng (nếu có)

### AuthGuard

- Kiểm tra authentication trước khi render children
- Redirect đến `/login` nếu chưa đăng nhập
- Loading state trong quá trình kiểm tra

### ProtectedRoute

- Bảo vệ route theo role cụ thể
- Hiển thị thông báo lỗi nếu không có quyền truy cập

## Tích hợp với backend

Hiện tại hệ thống sử dụng mock data. Để tích hợp với backend thực tế:

1. Cập nhật `AuthService.login()` để gọi API thực tế
2. Thêm JWT token handling
3. Cập nhật error handling cho các trường hợp lỗi từ server
4. Thêm refresh token mechanism nếu cần

## Customization

### Thêm role mới

1. Cập nhật `UserRole` type trong `auth.types.ts`
2. Thêm role vào `roleOptions` trong `LoginForm.tsx`
3. Cập nhật `getRoleDisplayName()` trong các component cần thiết

### Thay đổi UI

- Các component sử dụng Tailwind CSS
- Có thể customize styling trong từng component
- Responsive design đã được implement

## Security Notes

- Hiện tại mật khẩu không được validate (chỉ để demo)
- Trong production cần implement proper password validation
- Cần thêm rate limiting cho login attempts
- Cần implement proper session management với JWT
