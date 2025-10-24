# Cập nhật tên bảng Master theo quy tắc "m\_"

## Tổng quan

Tất cả các bảng Master trong database đã được cập nhật để có tên bắt đầu bằng "m\_" theo quy tắc đặt tên mới.

## Danh sách các bảng đã cập nhật

### 1. Bảng Master chính

| Model Name                | Tên bảng cũ                   | Tên bảng mới            | Mô tả                     |
| ------------------------- | ----------------------------- | ----------------------- | ------------------------- |
| `HeavyFabricMaster`       | `heavy_fabric_masters`        | `m_heavy_fabric`        | Master vải nặng           |
| `PatternMaster`           | `pattern_masters`             | `m_pattern`             | Master pattern thống nhất |
| `BodyLiningMaster`        | `body_lining_masters`         | `m_body_lining`         | Master lót thân           |
| `SleeveLiningMaster`      | `sleeve_lining_masters`       | `m_sleeve_lining`       | Master lót tay áo         |
| `HeavyFabricButtonMaster` | `heavy_fabric_button_masters` | `m_heavy_fabric_button` | Master nút vải nặng       |
| `OptionMaster`            | `option_masters`              | `m_option`              | Master tùy chọn           |

### 2. Bảng Pattern Master (Legacy)

| Model Name            | Tên bảng cũ              | Tên bảng mới       | Mô tả                    |
| --------------------- | ------------------------ | ------------------ | ------------------------ |
| `JacketPatternMaster` | `jacket_pattern_masters` | `m_jacket_pattern` | Master pattern áo khoác  |
| `SuitPatternMaster`   | `suit_pattern_masters`   | `m_suit_pattern`   | Master pattern vest      |
| `VestPatternMaster`   | `vest_pattern_masters`   | `m_vest_pattern`   | Master pattern áo vest   |
| `CoatPatternMaster`   | `coat_pattern_masters`   | `m_coat_pattern`   | Master pattern áo choàng |
| `PantsPatternMaster`  | `pants_pattern_masters`  | `m_pants_pattern`  | Master pattern quần      |

### 3. Bảng Measurement Type

| Model Name                  | Tên bảng cũ                     | Tên bảng mới                     | Mô tả                           |
| --------------------------- | ------------------------------- | -------------------------------- | ------------------------------- |
| `MeasurementType`           | `measurement_types`             | `m_measurement_type`             | Master loại đo lường thống nhất |
| `JacketMeasurementType`     | `jacket_measurement_types`      | `m_jacket_measurement_type`      | Master loại đo áo khoác         |
| `CoatMeasurementType`       | `coat_measurement_types`        | `m_coat_measurement_type`        | Master loại đo áo choàng        |
| `SuitJacketMeasurementType` | `suit_jacket_measurement_types` | `m_suit_jacket_measurement_type` | Master loại đo áo vest          |
| `SuitPantsMeasurementType`  | `suit_pants_measurement_types`  | `m_suit_pants_measurement_type`  | Master loại đo quần vest        |
| `PantsMeasurementType`      | `pants_measurement_types`       | `m_pants_measurement_type`       | Master loại đo quần             |
| `VestMeasurementType`       | `vest_measurement_types`        | `m_vest_measurement_type`        | Master loại đo áo vest          |

## Quy tắc đặt tên mới

### Cú pháp

```
m_{tên_bảng_viết_thường_với_dấu_gạch_dưới}
```

### Ví dụ

- `HeavyFabricMaster` → `m_heavy_fabric`
- `PatternMaster` → `m_pattern`
- `BodyLiningMaster` → `m_body_lining`

## Lợi ích

1. **Nhất quán**: Tất cả bảng Master đều có prefix "m\_"
2. **Dễ nhận biết**: Dễ dàng phân biệt bảng Master với bảng transaction
3. **Tổ chức tốt**: Giúp sắp xếp và quản lý database tốt hơn
4. **Tương thích**: Không ảnh hưởng đến logic business hiện tại

## Lưu ý

- Tất cả các quan hệ (relations) vẫn hoạt động bình thường
- Chỉ thay đổi tên bảng trong database, không ảnh hưởng đến model name trong Prisma
- Cần chạy migration để áp dụng thay đổi vào database
- Các bảng Legacy vẫn được giữ lại để tương thích ngược

## Migration

Để áp dụng thay đổi này vào database, cần chạy:

```bash
npx prisma migrate dev --name update_master_table_names
```

Hoặc nếu đang trong production:

```bash
npx prisma migrate deploy
```
