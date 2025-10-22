# BEAMS Database Improvement Guide

## 📋 **Tổng Quan**

Tài liệu này mô tả các cải tiến database cho hệ thống BEAMS Custom Tailor, bao gồm:

- Hệ thống quản lý người dùng với phân quyền
- Theo dõi trạng thái đơn hàng
- Hệ thống audit trail
- Quản lý tài liệu PDF
- Hệ thống thông báo

## 🚀 **Cài Đặt và Chạy**

### **1. Chuẩn Bị**

```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt dependencies
npm install

# Tạo file .env từ ENV.example
cp ENV.example .env
# Chỉnh sửa .env với thông tin database của bạn
```

### **2. Chạy Migration và Seed**

#### **Windows (PowerShell):**

```powershell
.\scripts\migrate-and-seed.ps1
```

#### **Linux/Mac (Bash):**

```bash
chmod +x scripts/migrate-and-seed.sh
./scripts/migrate-and-seed.sh
```

#### **Manual:**

```bash
# Generate Prisma client
npx prisma generate

# Run migration
npx prisma migrate deploy

# Run seed
npx ts-node prisma/seed_improved.ts
```

## 📊 **Các Cải Tiến Chính**

### **1. User Management System**

#### **Bảng mới: `users`**

- Quản lý người dùng với authentication
- Phân quyền theo role (Admin, Store Manager, Store Staff, Factory Manager, Factory Staff)
- Liên kết với store
- Tracking login activity

#### **Roles:**

- `ADMIN`: Quản lý toàn bộ hệ thống
- `STORE_MANAGER`: Quản lý cửa hàng
- `STORE_STAFF`: Nhân viên cửa hàng
- `FACTORY_MANAGER`: Quản lý nhà máy
- `FACTORY_STAFF`: Nhân viên nhà máy

### **2. Order Status Tracking**

#### **Bảng mới: `order_statuses`**

- 12 trạng thái đơn hàng từ draft đến delivered
- Màu sắc cho UI
- Thứ tự sắp xếp

#### **Trạng thái đơn hàng:**

1. `DRAFT` - 下書き
2. `PENDING` - 受付済み
3. `CONFIRMED` - 確認済み
4. `FABRIC_ORDERED` - 生地発注済み
5. `FACTORY_ORDERED` - 工場発注済み
6. `IN_PRODUCTION` - 製作中
7. `READY_FOR_FITTING` - 仮縫い準備完了
8. `FITTING_COMPLETED` - 仮縫い完了
9. `FINAL_PRODUCTION` - 本縫い中
10. `COMPLETED` - 完成
11. `DELIVERED` - 納品済み
12. `CANCELLED` - キャンセル

### **3. Audit Trail System**

#### **Bảng mới: `order_logs`**

- Ghi lại mọi thay đổi đơn hàng
- Lưu trữ giá trị cũ và mới
- Tracking user và thời gian
- Hỗ trợ JSON data

### **4. Document Management**

#### **Bảng mới: `documents`**

- Quản lý tài liệu PDF
- 4 loại tài liệu:
  - `FABRIC_ORDER_SHEET` - 生地発注書
  - `FACTORY_ORDER_SHEET` - 工場発注書
  - `CUSTOMER_ORDER_SHEET` - お客様注文書
  - `MEASUREMENT_SHEET` - 採寸表

### **5. Notification System**

#### **Bảng mới: `notifications`**

- Thông báo real-time
- 5 loại thông báo:
  - `ORDER_CREATED`
  - `ORDER_UPDATED`
  - `ORDER_STATUS_CHANGED`
  - `PDF_GENERATED`
  - `SYSTEM_ALERT`

### **6. System Configuration**

#### **Bảng mới: `system_configs`**

- Cấu hình hệ thống
- Key-value storage
- Hỗ trợ JSON data

## 🔧 **Cải Tiến Các Bảng Hiện Có**

### **1. Store Table**

- Thêm `isActive`, `region`, `managerName`
- Thêm `createdAt`, `updatedAt`
- Audit timestamps

### **2. Customer Table**

- Thêm `customerCode`, `birthDate`, `address`
- Thêm `isActive`, `createdAt`, `updatedAt`
- Unique customer code

### **3. Order Table**

- Thêm `statusId`, `priority`, `isUrgent`
- Thêm `estimatedCompletionDate`, `actualCompletionDate`
- Thêm `internalNotes`, `createdBy`, `updatedBy`
- Performance indexes

## 📈 **Performance Improvements**

### **Indexes được thêm:**

- `idx_orders_statusId_createdAt`
- `idx_orders_storeId_statusId`
- `idx_orders_customerId_createdAt`
- `idx_order_logs_orderId_createdAt`
- `idx_notifications_userId_isRead`
- `idx_documents_orderId`

### **Triggers:**

- Auto-update `updatedAt` timestamps
- Audit trail automation

## 🎯 **Workflow Mới**

### **1. Store Side (店舗)**

```
Login → Dashboard → Create Order → Customer Info → Order Confirmation → Complete
```

### **2. Factory Side (工場)**

```
Login → Order List → View Details → Edit Order → Generate PDF → Update Status
```

### **3. Order Status Flow**

```
DRAFT → PENDING → CONFIRMED → FABRIC_ORDERED → FACTORY_ORDERED →
IN_PRODUCTION → READY_FOR_FITTING → FITTING_COMPLETED →
FINAL_PRODUCTION → COMPLETED → DELIVERED
```

## 🔑 **Default Credentials**

| Role            | Username          | Password | Description              |
| --------------- | ----------------- | -------- | ------------------------ |
| Admin           | admin             | (any)    | System administrator     |
| Store Manager   | store_manager_001 | (any)    | Store manager for 新宿店 |
| Store Staff     | store_staff_001   | (any)    | Store staff for 新宿店   |
| Factory Manager | factory_manager   | (any)    | Factory manager          |
| Factory Staff   | factory_staff_001 | (any)    | Factory staff            |

## 📝 **Sample Data**

Hệ thống sẽ tạo:

- 3 stores (新宿店, 渋谷店, 大阪店)
- 5 users với các role khác nhau
- 3 customers với thông tin đầy đủ
- 3 plans (Basic, Custom, Full)
- 5 item types (Jacket, Coat, Suit, Pants, Vest)
- 2 pickup methods
- 2 sample orders với chi tiết
- 2 notifications
- 2 order logs

## 🚨 **Lưu Ý Quan Trọng**

### **1. Backup Database**

Trước khi chạy migration, hãy backup database hiện tại:

```bash
pg_dump your_database > backup_before_migration.sql
```

### **2. Environment Variables**

Đảm bảo file `.env` có đầy đủ thông tin:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/beams_db"
```

### **3. Prisma Client**

Sau khi migration, cần generate lại Prisma client:

```bash
npx prisma generate
```

## 🔄 **Rollback (Nếu Cần)**

Nếu cần rollback migration:

```bash
# Xem lịch sử migration
npx prisma migrate status

# Rollback về migration trước
npx prisma migrate resolve --rolled-back 20250127000000_improve_database_structure
```

## 📞 **Hỗ Trợ**

Nếu gặp vấn đề:

1. Kiểm tra logs trong console
2. Kiểm tra file `.env`
3. Kiểm tra kết nối database
4. Kiểm tra quyền truy cập database

## 🎉 **Kết Luận**

Database đã được cải tiến với:

- ✅ Hệ thống quản lý người dùng hoàn chỉnh
- ✅ Workflow tracking chi tiết
- ✅ Audit trail đầy đủ
- ✅ Performance optimization
- ✅ Scalable architecture
- ✅ Sample data để testing

Hệ thống giờ đây sẵn sàng cho việc phát triển các tính năng workflow mới và cải thiện trải nghiệm người dùng.
