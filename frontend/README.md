# BEAMS Custom Tailor System

## 📋 **Tổng Quan**

Hệ thống BEAMS Custom Tailor là một ứng dụng đặt hàng may đo trực tuyến với luồng đặt hàng hoàn chỉnh từ chọn sản phẩm đến hoàn thành đơn hàng.

## 🚀 **Quick Start**

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build
```

## 📁 **Cấu Trúc Dự Án**

```
frontend/
├── src/
│   ├── app/                     # Application layer
│   │   ├── main.tsx            # Entry point
│   │   └── RootLayout.tsx      # Root layout
│   ├── features/               # Feature-based organization
│   │   ├── menu/               # Menu feature
│   │   ├── order/              # Order feature
│   │   ├── customer/           # Customer feature
│   │   └── shared/             # Shared utilities
│   ├── services/               # API services
│   └── styles.css              # Global styles
├── SYSTEM_FLOW_DIAGRAM.md      # System flow documentation
├── SCREEN_TRANSITION_DIAGRAM.md # Screen transition diagrams
└── README.md                   # This file
```

## 🎯 **Order Flow**

1. **MenuPage** → Chọn sản phẩm và gói dịch vụ
2. **OrderPage** → Nhập thông tin đơn hàng
3. **CustomerInfoPage** → Nhập thông tin khách hàng
4. **OrderConfirmationPage** → Xác nhận đơn hàng
5. **CustomerConfirmationPage** → Xác nhận thông tin khách hàng
6. **CompletePage** → Hoàn thành

## 📱 **Screens**

### **Menu Pages**

- `/` - MenuPage (Trang chủ)

### **Order Pages**

- `/jacket-order` - JacketOrderPage
- `/coat-order` - CoatOrderPage
- `/suit-order` - SuitOrderPage
- `/pants-order` - PantsOrderPage
- `/vest-order` - VestOrderPage

### **Confirmation Pages**

- `/jacket-order-confirmation` - JacketOrderConfirmationPage
- `/coat-order-confirmation` - CoatOrderConfirmationPage
- `/suit-order-confirmation` - SuitOrderConfirmationPage
- `/pants-order-confirmation` - PantsOrderConfirmationPage
- `/vest-order-confirmation` - VestOrderConfirmationPage

### **Customer Pages**

- `/customer` - CustomerInfoPage
- `/customer-info-confirmation` - CustomerConfirmationPage

### **Utility Pages**

- `/complete` - CompletePage
- `/drafts` - DraftsPage

## 🛠️ **Tech Stack**

- **Frontend**: React 18 + TypeScript
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: localStorage + React hooks

## 📊 **Features**

- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Form Validation**: Client-side validation
- ✅ **Draft Management**: Save/load drafts
- ✅ **Type Safety**: TypeScript throughout
- ✅ **Component Reusability**: Shared components
- ✅ **Feature-based Architecture**: Scalable structure

## 📖 **Documentation**

- [System Flow Diagram](./SYSTEM_FLOW_DIAGRAM.md) - Chi tiết luồng hệ thống
- [Screen Transition Diagram](./SCREEN_TRANSITION_DIAGRAM.md) - Sơ đồ chuyển màn hình

### Draft behavior

- Nút 下書き lưu nháp vào localStorage key `heavyOrder.drafts.v1`.
- Lưu toàn bộ nội dung đã nhập ở các trang (order + customer).
- 担当者 (staffName) là bắt buộc. Nếu chưa nhập sẽ hiển thị cảnh báo và không lưu.

## 🔧 **Development**

### **Folder Structure**

- **Feature-based**: Mỗi feature có folder riêng
- **Shared components**: Components dùng chung
- **Hooks**: Custom hooks cho logic
- **Types**: TypeScript type definitions
- **Utils**: Utility functions

### **Import Strategy**

- **Feature exports**: Sử dụng index.ts files
- **Relative imports**: Import paths rõ ràng
- **No circular dependencies**: Tránh dependency loops

## 🎨 **UI/UX**

### **Design System**

- **Colors**: Slate color palette
- **Typography**: System fonts
- **Spacing**: Consistent spacing scale
- **Components**: Reusable UI components

### **Navigation**

- **Breadcrumbs**: Hiển thị bước hiện tại
- **Back/Next buttons**: Navigation controls
- **Form persistence**: Lưu trữ dữ liệu form

## 🚀 **Deployment**

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 **License**

© 2025 BEAMS Development Team. All rights reserved.

---

**Version**: 1.0.0  
**Last Updated**: 2025-10-17
