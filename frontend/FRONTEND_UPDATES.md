# Frontend Updates - BEAMS System Integration

## Tổng quan

Đã cập nhật frontend để tích hợp với backend NestJS + Prisma.

## Các thay đổi chính

### 1. Environment Configuration

- Tạo `src/config/env.ts` để quản lý environment variables
- Sử dụng `VITE_API_BASE_URL` từ `.env` file
- Mặc định: `http://localhost:3000/api`

### 2. API Service Updates

File: `src/services/api.ts`

**Đã cập nhật:**
- ✅ Tích hợp với `HttpClient` từ `http.ts`
- ✅ Thêm types match với Prisma schema backend
- ✅ Cập nhật `HeavyFabricMaster` với các field mới (snake_case → camelCase)
  - `fabricNo`, `fabricManufacturer`, `fabricPattern`, `fabricProperties`
  - `fairFabricPrice`, `fairFabricRank`, `regularFabricPrice`, `regularFabricRank`
  - `fabricDataUpdate`, `large`, `fabricSheer`, `stockFlag`

**Các API endpoints mới:**
- MCode APIs: `getMCodes()`, `getPlans()`, `getItemTypes()`
- Heavy Fabric APIs: `getHeavyFabrics()`, `searchHeavyFabrics()`
- Pattern Master APIs: `getPatterns()`, `getPatternById()`
- Lining APIs: `getBodyLinings()`, `getSleeveLinings()`
- Button APIs: `getHeavyFabricButtons()`
- Option APIs: `getOptions()`
- Customer APIs: `getCustomers()`, `createCustomer()`, `updateCustomer()`
- Store APIs: `getStores()`
- Supplier APIs: `getSuppliers()`

### 3. TypeScript Interfaces

**Các interface mới:**
- `MCode` - Master code base interface
- `Plan` - Extends MCode với category 'PLAN'
- `ItemType` - Extends MCode với category 'ITEM_TYPE'
- `HeavyFabricMaster` - Heavy fabric với fields cập nhật
- `Supplier` - Supplier information
- `PatternMaster` - Pattern master data
- `BodyLiningMaster` - Body lining master
- `SleeveLiningMaster` - Sleeve lining master
- `HeavyFabricButtonMaster` - Button master
- `OptionMaster` - Option master
- `Customer` - Customer information
- `Store` - Store information

### 4. Các TODO còn lại

Cần tiếp tục thực hiện:

#### Authentication (TODO #3)
- [ ] Cập nhật `auth.service.ts` để tích hợp với backend auth
- [ ] Cập nhật `auth.context.tsx` để lưu token và user info
- [ ] Kiểm tra và cập nhật `ProtectedRoute` component

#### Order Forms (TODO #4)
- [ ] Cập nhật các order pages để sử dụng MCode từ backend
- [ ] Thay thế hardcoded values bằng API calls
- [ ] Cập nhật form validation với data thực từ backend
- [ ] Tích hợp dropdown/select components với master data

**Files cần cập nhật:**
```
src/features/order/pages/
├── JacketOrderPage.tsx
├── CoatOrderPage.tsx
├── SuitOrderPage.tsx
├── PantsOrderPage.tsx
├── VestOrderPage.tsx
└── HeavyOrderPage.tsx
```

## Cách sử dụng API Service

### Ví dụ 1: Load Plans

```typescript
import { ApiService } from '@/services/api';

// Component
const MyComponent = () => {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const data = await ApiService.getPlans();
        setPlans(data);
      } catch (error) {
        console.error('Failed to load plans:', error);
      }
    };
    loadPlans();
  }, []);

  return (
    <select>
      {plans.map(plan => (
        <option key={plan.id} value={plan.code}>
          {plan.name}
        </option>
      ))}
    </select>
  );
};
```

### Ví dụ 2: Search Heavy Fabrics

```typescript
import { ApiService } from '@/services/api';

const FabricSearch = () => {
  const [fabrics, setFabrics] = useState<HeavyFabricMaster[]>([]);

  const handleSearch = async (query: string) => {
    try {
      const results = await ApiService.searchHeavyFabrics(query);
      setFabrics(results);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <>
      <input 
        type="text" 
        onChange={(e) => handleSearch(e.target.value)} 
        placeholder="Search fabrics..."
      />
      <ul>
        {fabrics.map(fabric => (
          <li key={fabric.id}>
            {fabric.fabricNo} - {fabric.color} - {fabric.fabricPattern}
          </li>
        ))}
      </ul>
    </>
  );
};
```

### Ví dụ 3: Create Customer

```typescript
import { ApiService, Customer } from '@/services/api';

const handleSubmit = async (formData: Partial<Customer>) => {
  try {
    const newCustomer = await ApiService.createCustomer(formData);
    console.log('Customer created:', newCustomer);
  } catch (error) {
    console.error('Failed to create customer:', error);
  }
};
```

## Chạy Frontend

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Backend Integration

Đảm bảo backend đang chạy tại `http://localhost:3000`:

```bash
cd backend
npm run start:dev
```

API endpoints sẽ có sẵn tại:
- Swagger docs: `http://localhost:3000/docs`
- API base: `http://localhost:3000/api`

## Notes

- Tất cả API calls sử dụng `HttpClient` với error handling
- Types được generate tương thích với Prisma schema
- Field names: Backend sử dụng snake_case, Prisma Client tự động convert sang camelCase
- Frontend sử dụng camelCase để match với Prisma Client types

## Version

- Frontend: 1.0.0
- Last Updated: 2025-11-10

