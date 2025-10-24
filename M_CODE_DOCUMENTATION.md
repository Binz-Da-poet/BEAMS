# M_CODE Table Documentation

## Overview

The `m_code` table is a centralized master data table that manages all code values used throughout the system. This approach provides better maintainability, consistency, and flexibility compared to using separate enum types.

## Table Structure

```sql
CREATE TABLE m_codes (
    id          SERIAL PRIMARY KEY,
    category    TEXT NOT NULL,           -- Code category (e.g., 'ITEM_TYPE', 'PLAN')
    code        TEXT NOT NULL,           -- Unique code within category
    name        TEXT NOT NULL,           -- Display name
    description TEXT,                    -- Optional description
    sort_order  INTEGER DEFAULT 0,       -- For ordering in UI
    is_active   BOOLEAN DEFAULT true,    -- Enable/disable codes
    metadata    JSONB,                   -- Additional data
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at  TIMESTAMP DEFAULT NOW(),

    UNIQUE(category, code)
);
```

## Categories

### 1. ITEM_TYPE

- **Purpose**: Defines different types of clothing items
- **Codes**: 1=ジャケット, 2=ベスト, 3=コート, 4=パンツ, 5=スーツ

### 2. PLAN

- **Purpose**: Different service plans
- **Codes**: 1=プラン 1, 2=プラン 2, 3=プラン 3

### 3. PICKUP_METHOD

- **Purpose**: Order pickup/delivery methods
- **Codes**: 1=店舗受取, 2=宅配便, 3=直接配送

### 4. ORIENTATION

- **Purpose**: Fabric orientation types
- **Codes**: 1=通常, 2=逆

### 5. SEASON

- **Purpose**: Seasonal categories
- **Codes**: 1=春夏, 2=秋冬

### 6. ORDER_PRIORITY

- **Purpose**: Order priority levels
- **Codes**: LOW, NORMAL, HIGH, URGENT

### 7. USER_ROLE

- **Purpose**: User role types
- **Codes**: ADMIN, STORE_MANAGER, STORE_STAFF, FACTORY_MANAGER, FACTORY_STAFF

### 8. DOCUMENT_TYPE

- **Purpose**: Document types
- **Codes**: FABRIC_ORDER_SHEET, FACTORY_ORDER_SHEET, CUSTOMER_ORDER_SHEET, MEASUREMENT_SHEET

### 9. NOTIFICATION_TYPE

- **Purpose**: Notification types
- **Codes**: ORDER_CREATED, ORDER_UPDATED, ORDER_STATUS_CHANGED, PDF_GENERATED, SYSTEM_ALERT

## Usage Examples

### Query all active item types

```sql
SELECT * FROM m_codes
WHERE category = 'ITEM_TYPE'
AND is_active = true
ORDER BY sort_order;
```

### Get specific code by category and code

```sql
SELECT * FROM m_codes
WHERE category = 'PLAN'
AND code = '1';
```

### Get all codes for a category with metadata

```sql
SELECT code, name, description, metadata
FROM m_codes
WHERE category = 'ORDER_PRIORITY'
AND is_active = true;
```

## Integration with Existing Models

The `m_code` table is integrated with existing models through foreign key relationships:

- `plans.m_code_id` → `m_codes.id`
- `item_types.m_code_id` → `m_codes.id`
- `pickup_methods.m_code_id` → `m_codes.id`
- `orientation_types.m_code_id` → `m_codes.id`
- `seasons.m_code_id` → `m_codes.id`
- `suppliers.m_code_id` → `m_codes.id`

## Benefits

1. **Centralized Management**: All codes in one place
2. **Flexibility**: Easy to add new codes without schema changes
3. **Internationalization**: Support for multiple languages via metadata
4. **Audit Trail**: Track changes to codes over time
5. **Soft Delete**: Use `is_active` instead of hard deletes
6. **Sorting**: Built-in ordering support
7. **Extensibility**: JSON metadata for additional properties

## Migration Strategy

1. **Phase 1**: Create `m_code` table and seed initial data
2. **Phase 2**: Add foreign key columns to existing tables
3. **Phase 3**: Migrate existing enum data to `m_code` table
4. **Phase 4**: Update application code to use `m_code` table
5. **Phase 5**: Remove old enum types (optional)

## API Usage

### Get codes by category

```typescript
const itemTypes = await prisma.mCode.findMany({
  where: {
    category: 'ITEM_TYPE',
    isActive: true,
  },
  orderBy: { sortOrder: 'asc' },
});
```

### Create new code

```typescript
const newCode = await prisma.mCode.create({
  data: {
    category: 'ITEM_TYPE',
    code: '6',
    name: 'シャツ',
    description: 'シャツ',
    sortOrder: 6,
  },
});
```

### Update code

```typescript
const updatedCode = await prisma.mCode.update({
  where: { id: codeId },
  data: {
    name: 'Updated Name',
    description: 'Updated Description',
  },
});
```

### Soft delete code

```typescript
const deletedCode = await prisma.mCode.update({
  where: { id: codeId },
  data: { isActive: false },
});
```

## Best Practices

1. **Always use `is_active` filter** when querying for display purposes
2. **Use `sort_order`** for consistent UI ordering
3. **Validate category and code uniqueness** before inserting
4. **Use metadata field** for additional properties instead of adding columns
5. **Consider caching** frequently accessed codes
6. **Implement soft delete** instead of hard delete
7. **Use transactions** when updating related data

## Future Enhancements

1. **Multi-language support** via metadata
2. **Code versioning** for historical tracking
3. **Hierarchical codes** for complex relationships
4. **Code validation rules** via metadata
5. **Bulk import/export** functionality
6. **Code usage analytics** and reporting
