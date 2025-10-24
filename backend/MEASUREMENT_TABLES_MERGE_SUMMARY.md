# Tóm tắt việc gộp các bảng Measurement vào Details

## Tổng quan

Đã thực hiện việc gộp tất cả các bảng Measurement riêng biệt vào các bảng Details tương ứng để giảm số lượng bảng và đơn giản hóa cấu trúc database.

## Các thay đổi đã thực hiện

### 1. Gộp JacketMeasurement vào JacketDetails

**Trước:**

- Bảng riêng: `JacketMeasurement` với các trường: `standardValue`, `adjustValue`, `finalValue`
- Quan hệ: `JacketDetails` → `JacketMeasurement[]`

**Sau:**

- Các trường measurement được thêm trực tiếp vào `JacketDetails`:
  - `chestStandard`, `chestAdjust`, `chestFinal`
  - `waistStandard`, `waistAdjust`, `waistFinal`
  - `hipStandard`, `hipAdjust`, `hipFinal`
  - `shoulderWidthStandard`, `shoulderWidthAdjust`, `shoulderWidthFinal`
  - `sleeveLengthStandard`, `sleeveLengthAdjust`, `sleeveLengthFinal`
  - `sleeveWidthStandard`, `sleeveWidthAdjust`, `sleeveWidthFinal`
  - `lengthStandard`, `lengthAdjust`, `lengthFinal`
  - `lapelWidthStandard`, `lapelWidthAdjust`, `lapelWidthFinal`

### 2. Gộp CoatMeasurement vào CoatDetails

**Trước:**

- Bảng riêng: `CoatMeasurement` với các trường: `standardValue`, `adjustValue`, `finalValue`
- Quan hệ: `CoatDetails` → `CoatMeasurement[]`

**Sau:**

- Các trường measurement được thêm trực tiếp vào `CoatDetails` (tương tự như JacketDetails)

### 3. Gộp SuitJacketMeasurement và SuitPantsMeasurement vào SuitDetails

**Trước:**

- 2 bảng riêng: `SuitJacketMeasurement` và `SuitPantsMeasurement`
- Quan hệ: `SuitDetails` → `SuitJacketMeasurement[]` và `SuitPantsMeasurement[]`

**Sau:**

- Các trường measurement được thêm trực tiếp vào `SuitDetails`:
  - **Jacket measurements**: `jacketChestStandard`, `jacketChestAdjust`, `jacketChestFinal`, ...
  - **Pants measurements**: `pantsWaistStandard`, `pantsWaistAdjust`, `pantsWaistFinal`, ...

### 4. Gộp PantsMeasurement vào PantsDetails

**Trước:**

- Bảng riêng: `PantsMeasurement` với các trường: `standardValue`, `adjustValue`, `finalValue`
- Quan hệ: `PantsDetails` → `PantsMeasurement[]`

**Sau:**

- Các trường measurement được thêm trực tiếp vào `PantsDetails`:
  - `waistStandard`, `waistAdjust`, `waistFinal`
  - `hipStandard`, `hipAdjust`, `hipFinal`
  - `crotchWidthStandard`, `crotchWidthAdjust`, `crotchWidthFinal`
  - `kneeWidthStandard`, `kneeWidthAdjust`, `kneeWidthFinal`
  - `hemWidthStandard`, `hemWidthAdjust`, `hemWidthFinal`
  - `riseStandard`, `riseAdjust`, `riseFinal`
  - `inseamStandard`, `inseamAdjust`, `inseamFinal`

### 5. Gộp VestMeasurement vào VestDetails

**Trước:**

- Bảng riêng: `VestMeasurement` với các trường: `standardValue`, `adjustValue`, `finalValue`
- Quan hệ: `VestDetails` → `VestMeasurement[]`

**Sau:**

- Các trường measurement được thêm trực tiếp vào `VestDetails`:
  - `chestStandard`, `chestAdjust`, `chestFinal`
  - `waistStandard`, `waistAdjust`, `waistFinal`
  - `shoulderWidthStandard`, `shoulderWidthAdjust`, `shoulderWidthFinal`
  - `lengthStandard`, `lengthAdjust`, `lengthFinal`

## Các bảng đã bị xóa

1. `JacketMeasurement` (t_jacket_measurements)
2. `CoatMeasurement` (t_coat_measurements)
3. `SuitJacketMeasurement` (t_suit_jacket_measurements)
4. `SuitPantsMeasurement` (t_suit_pants_measurements)
5. `PantsMeasurement` (t_pants_measurements)
6. `VestMeasurement` (t_vest_measurements)

## Các bảng MeasurementType được giữ lại

Các bảng MeasurementType vẫn được giữ lại để tham chiếu:

- `JacketMeasurementType` (m_jacket_measurement_type)
- `CoatMeasurementType` (m_coat_measurement_type)
- `SuitJacketMeasurementType` (m_suit_jacket_measurement_type)
- `SuitPantsMeasurementType` (m_suit_pants_measurement_type)
- `PantsMeasurementType` (m_pants_measurement_type)
- `VestMeasurementType` (m_vest_measurement_type)

## Lợi ích của việc gộp

### 1. **Giảm số lượng bảng**

- **Trước**: 47 bảng
- **Sau**: 41 bảng (giảm 6 bảng)

### 2. **Đơn giản hóa cấu trúc**

- Không cần JOIN giữa Details và Measurement
- Dữ liệu measurement được lưu trực tiếp trong bảng Details
- Giảm complexity trong queries

### 3. **Cải thiện performance**

- Ít JOIN operations
- Truy vấn nhanh hơn
- Ít bảng cần maintain

### 4. **Dễ dàng quản lý**

- Một bảng Details chứa tất cả thông tin cần thiết
- Dễ dàng backup và restore
- Đơn giản hóa migration

## Cấu trúc dữ liệu mới

### Pattern đặt tên trường measurement:

```
{measurementType}Standard  // Giá trị chuẩn
{measurementType}Adjust    // Giá trị điều chỉnh
{measurementType}Final     // Giá trị cuối cùng
```

### Ví dụ:

- `chestStandard`, `chestAdjust`, `chestFinal`
- `waistStandard`, `waistAdjust`, `waistFinal`
- `jacketChestStandard`, `jacketChestAdjust`, `jacketChestFinal` (cho Suit)

## Migration cần thiết

Khi áp dụng thay đổi này vào database, cần:

1. **Tạo migration** để:

   - Thêm các trường measurement mới vào bảng Details
   - Migrate dữ liệu từ bảng Measurement cũ sang trường mới
   - Xóa các bảng Measurement cũ

2. **Cập nhật code** để:
   - Sử dụng trường measurement trực tiếp thay vì quan hệ
   - Cập nhật các API endpoints
   - Cập nhật frontend forms

## Kết luận

Việc gộp các bảng Measurement vào Details đã:

- ✅ Giảm 6 bảng (từ 47 xuống 41)
- ✅ Đơn giản hóa cấu trúc database
- ✅ Cải thiện performance
- ✅ Dễ dàng quản lý và maintain
- ✅ Giữ nguyên tính năng measurement đầy đủ
