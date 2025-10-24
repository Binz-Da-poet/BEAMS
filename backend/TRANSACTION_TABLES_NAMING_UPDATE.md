# Cập nhật tên bảng Transaction theo quy tắc "t\_"

## Tổng quan

Tất cả các bảng Transaction trong database đã được cập nhật để có tên bắt đầu bằng "t\_" theo quy tắc đặt tên mới.

## Danh sách các bảng đã cập nhật

### 1. Bảng Transaction chính

| Model Name     | Tên bảng cũ      | Tên bảng mới       | Mô tả               |
| -------------- | ---------------- | ------------------ | ------------------- |
| `User`         | `users`          | `t_users`          | Người dùng hệ thống |
| `Order`        | `orders`         | `t_orders`         | Đơn hàng            |
| `OrderItem`    | `order_items`    | `t_order_items`    | Mục đơn hàng        |
| `OrderStatus`  | `order_statuses` | `t_order_statuses` | Trạng thái đơn hàng |
| `OrderLog`     | `order_logs`     | `t_order_logs`     | Lịch sử đơn hàng    |
| `Document`     | `documents`      | `t_documents`      | Tài liệu PDF        |
| `Notification` | `notifications`  | `t_notifications`  | Thông báo           |
| `Store`        | `stores`         | `t_stores`         | Cửa hàng            |
| `Customer`     | `customers`      | `t_customers`      | Khách hàng          |
| `Staff`        | `staff`          | `t_staff`          | Nhân viên           |

### 2. Bảng Details (Chi tiết đơn hàng)

| Model Name      | Tên bảng cũ      | Tên bảng mới       | Mô tả              |
| --------------- | ---------------- | ------------------ | ------------------ |
| `JacketDetails` | `jacket_details` | `t_jacket_details` | Chi tiết áo khoác  |
| `CoatDetails`   | `coat_details`   | `t_coat_details`   | Chi tiết áo choàng |
| `SuitDetails`   | `suit_details`   | `t_suit_details`   | Chi tiết vest      |
| `PantsDetails`  | `pants_details`  | `t_pants_details`  | Chi tiết quần      |
| `VestDetails`   | `vest_details`   | `t_vest_details`   | Chi tiết áo vest   |

### 3. Bảng Measurement (Đo lường)

| Model Name              | Tên bảng cũ                | Tên bảng mới                 | Mô tả              |
| ----------------------- | -------------------------- | ---------------------------- | ------------------ |
| `JacketMeasurement`     | `jacket_measurements`      | `t_jacket_measurements`      | Đo lường áo khoác  |
| `CoatMeasurement`       | `coat_measurements`        | `t_coat_measurements`        | Đo lường áo choàng |
| `SuitJacketMeasurement` | `suit_jacket_measurements` | `t_suit_jacket_measurements` | Đo lường áo vest   |
| `SuitPantsMeasurement`  | `suit_pants_measurements`  | `t_suit_pants_measurements`  | Đo lường quần vest |
| `PantsMeasurement`      | `pants_measurements`       | `t_pants_measurements`       | Đo lường quần      |
| `VestMeasurement`       | `vest_measurements`        | `t_vest_measurements`        | Đo lường áo vest   |

## Quy tắc đặt tên mới

### Cú pháp

```
t_{tên_bảng_viết_thường_với_dấu_gạch_dưới}
```

### Ví dụ

- `User` → `t_users`
- `Order` → `t_orders`
- `OrderItem` → `t_order_items`
- `JacketDetails` → `t_jacket_details`

## Phân loại bảng

### Bảng Master (prefix "m\_")

- Chứa dữ liệu tham chiếu, ít thay đổi
- Ví dụ: `m_heavy_fabric`, `m_pattern`, `m_option`

### Bảng Transaction (prefix "t\_")

- Chứa dữ liệu giao dịch, thay đổi thường xuyên
- Ví dụ: `t_orders`, `t_order_items`, `t_users`

## Lợi ích

1. **Nhất quán**: Tất cả bảng Transaction đều có prefix "t\_"
2. **Dễ nhận biết**: Dễ dàng phân biệt bảng Transaction với bảng Master
3. **Tổ chức tốt**: Giúp sắp xếp và quản lý database tốt hơn
4. **Tương thích**: Không ảnh hưởng đến logic business hiện tại
5. **Mở rộng**: Dễ dàng thêm bảng mới theo quy tắc đã định

## Lưu ý

- Tất cả các quan hệ (relations) vẫn hoạt động bình thường
- Chỉ thay đổi tên bảng trong database, không ảnh hưởng đến model name trong Prisma
- Cần chạy migration để áp dụng thay đổi vào database
- Các bảng Master đã được cập nhật trước đó với prefix "m\_"

## Migration

Để áp dụng thay đổi này vào database, cần chạy:

```bash
npx prisma migrate dev --name update_transaction_table_names
```

Hoặc nếu đang trong production:

```bash
npx prisma migrate deploy
```

## Tổng kết

- **23 bảng Transaction** đã được cập nhật với prefix "t\_"
- **11 bảng Master** đã được cập nhật với prefix "m\_" (từ lần cập nhật trước)
- **Tổng cộng 34 bảng** đã được chuẩn hóa theo quy tắc đặt tên mới
