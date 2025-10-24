# Tóm tắt việc gộp các bảng MeasurementType

## Tổng quan

Đã thực hiện việc gộp tất cả các bảng MeasurementType riêng biệt vào bảng `MeasurementType` unified để loại bỏ sự trùng lặp và tối ưu hóa cấu trúc database.

## Vấn đề trước khi fix

### **Cấu trúc cũ (có vấn đề):**

```
MeasurementType (unified) ← Có sẵn nhưng không được sử dụng
├── itemTypeId: 1 (JACKET)
├── itemTypeId: 2 (COAT)
└── itemTypeId: 3 (SUIT)

JacketMeasurementType ← Trùng lặp!
CoatMeasurementType ← Trùng lặp!
SuitJacketMeasurementType ← Trùng lặp!
SuitPantsMeasurementType ← Trùng lặp!
PantsMeasurementType ← Trùng lặp!
VestMeasurementType ← Trùng lặp!
```

### **Vấn đề:**

- ❌ **Trùng lặp**: Có 7 bảng MeasurementType khác nhau
- ❌ **Phức tạp**: Khó quản lý và maintain
- ❌ **Không nhất quán**: Cùng một mục đích nhưng có nhiều bảng
- ❌ **Performance kém**: Nhiều bảng cần JOIN

## Giải pháp đã thực hiện

### **1. Xóa các bảng MeasurementType riêng biệt:**

- ❌ `JacketMeasurementType` (m_jacket_measurement_type)
- ❌ `CoatMeasurementType` (m_coat_measurement_type)
- ❌ `SuitJacketMeasurementType` (m_suit_jacket_measurement_type)
- ❌ `SuitPantsMeasurementType` (m_suit_pants_measurement_type)
- ❌ `PantsMeasurementType` (m_pants_measurement_type)
- ❌ `VestMeasurementType` (m_vest_measurement_type)

### **2. Sử dụng bảng MeasurementType unified:**

```prisma
model MeasurementType {
  id           Int                 @id @default(autoincrement())
  itemTypeId   Int                 // Phân loại theo loại sản phẩm
  code         String              @unique
  name         String
  unit         String?
  isActive     Boolean             @default(true)
  sortOrder    Int                 @default(0)
  createdAt    DateTime            @default(now())
  updatedAt    DateTime            @updatedAt

  // Relations
  itemType     ItemType            @relation(fields: [itemTypeId], references: [id])

  @@index([itemTypeId])
  @@index([code])
  @@map("m_measurement_type")
}
```

### **3. Cấu trúc mới (đã fix):**

```
MeasurementType (unified) ← Sử dụng duy nhất
├── itemTypeId: 1, code: "CHEST", name: "Ngực"
├── itemTypeId: 1, code: "WAIST", name: "Eo"
├── itemTypeId: 2, code: "CHEST", name: "Ngực"
├── itemTypeId: 3, code: "JACKET_CHEST", name: "Ngực áo vest"
├── itemTypeId: 4, code: "PANTS_WAIST", name: "Eo quần"
└── itemTypeId: 5, code: "VEST_CHEST", name: "Ngực áo vest"
```

## Lợi ích đạt được

### **1. Giảm số lượng bảng**

- **Trước**: 41 bảng (7 bảng MeasurementType riêng biệt)
- **Sau**: 35 bảng (1 bảng MeasurementType unified)
- **Giảm**: 6 bảng (14.6%)

### **2. Thống nhất quản lý**

- ✅ Tất cả loại đo lường ở một chỗ
- ✅ Dễ dàng thêm/sửa/xóa measurement types
- ✅ Không trùng lặp code và logic

### **3. Linh hoạt hơn**

- ✅ Có thể thêm loại đo lường mới cho bất kỳ item type nào
- ✅ Dễ dàng copy measurement types giữa các item type
- ✅ Quản lý tập trung và nhất quán

### **4. Performance tốt hơn**

- ✅ Ít bảng cần JOIN
- ✅ Index hiệu quả hơn với itemTypeId
- ✅ Queries đơn giản và nhanh hơn

### **5. Maintainability**

- ✅ Code rõ ràng và dễ hiểu
- ✅ Dễ debug và troubleshoot
- ✅ Tuân thủ DRY principle

## Cách sử dụng mới

### **Query measurement types theo item type:**

```typescript
// Lấy tất cả measurement types cho áo khoác
const jacketTypes = await prisma.measurementType.findMany({
  where: {
    itemTypeId: JACKET_ITEM_TYPE_ID,
    isActive: true,
  },
  orderBy: { sortOrder: 'asc' },
});

// Lấy measurement types cho vest
const vestTypes = await prisma.measurementType.findMany({
  where: {
    itemTypeId: VEST_ITEM_TYPE_ID,
    isActive: true,
  },
});
```

### **Thêm measurement type mới:**

```typescript
// Thêm loại đo lường mới cho áo khoác
await prisma.measurementType.create({
  data: {
    itemTypeId: JACKET_ITEM_TYPE_ID,
    code: 'SLEEVE_WIDTH',
    name: 'Rộng tay áo',
    unit: 'cm',
    sortOrder: 10,
  },
});
```

## Dữ liệu mẫu

### **MeasurementType records:**

```
id | itemTypeId | code           | name              | unit | sortOrder
1  | 1          | CHEST          | Ngực              | cm   | 1
2  | 1          | WAIST          | Eo                | cm   | 2
3  | 1          | SLEEVE_LENGTH  | Dài tay           | cm   | 3
4  | 2          | CHEST          | Ngực              | cm   | 1
5  | 2          | WAIST          | Eo                | cm   | 2
6  | 3          | JACKET_CHEST   | Ngực áo vest      | cm   | 1
7  | 3          | JACKET_WAIST   | Eo áo vest        | cm   | 2
8  | 4          | PANTS_WAIST    | Eo quần           | cm   | 1
9  | 4          | CROTCH_WIDTH   | Rộng đũng         | cm   | 2
10 | 5          | VEST_CHEST     | Ngực áo vest      | cm   | 1
```

## Migration cần thiết

Khi áp dụng thay đổi này vào database:

1. **Tạo migration** để:

   - Xóa các bảng MeasurementType cũ
   - Migrate dữ liệu từ các bảng cũ sang MeasurementType unified
   - Cập nhật các foreign key references

2. **Cập nhật code** để:
   - Sử dụng MeasurementType unified thay vì các bảng riêng biệt
   - Cập nhật queries và business logic
   - Cập nhật frontend forms

## Kết luận

Việc gộp các bảng MeasurementType đã:

- ✅ **Loại bỏ trùng lặp** và redundancy
- ✅ **Giảm 6 bảng** (từ 41 xuống 35)
- ✅ **Tối ưu performance** và maintainability
- ✅ **Thống nhất quản lý** master data
- ✅ **Tuân thủ best practices** trong database design

Cấu trúc database bây giờ đã được tối ưu hóa và nhất quán hơn!
