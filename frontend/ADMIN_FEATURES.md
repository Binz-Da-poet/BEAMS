# Admin Features - BEAMS System

## Tổng quan

Hệ thống quản trị dành cho ADMIN với các chức năng quản lý staff, store và database.

## Các tính năng

### 1. Admin Dashboard (`/admin`)

Dashboard tổng quan với:
- Thống kê: Total Staff, Total Stores, Master Records
- Quick access menu đến các chức năng quản lý
- Recent Activity log
- Visual cards với icons

**Features:**
- 📊 Stats overview
- 🎯 Quick navigation
- 📱 Responsive design
- 🔄 Real-time activity feed

### 2. Staff Management (`/admin/staff`)

Quản lý nhân viên:
- ✅ Danh sách tất cả staff
- ✅ Tìm kiếm staff theo tên, email
- ✅ Thêm staff mới
- ✅ Chỉnh sửa thông tin staff
- ✅ Xóa staff
- ✅ Hiển thị store của staff
- ✅ Phân quyền role

**Thông tin quản lý:**
- Name *
- Email
- Phone
- Role
- Store assignment

### 3. Store Management (`/admin/stores`)

Quản lý cửa hàng:
- ✅ Danh sách tất cả stores
- ✅ Tìm kiếm store theo tên, code
- ✅ Thêm store mới
- ✅ Chỉnh sửa thông tin store
- ✅ Xóa store
- ✅ Active/Inactive status
- ✅ Stats: Total, Active, Inactive stores

**Thông tin quản lý:**
- Store Name *
- Store Code
- Address
- Phone
- Email
- Region
- Manager Name
- Active status

### 4. Database Management (`/admin/database`)

Quản lý các master data tables:

**Master Tables:**
- 🧵 **Heavy Fabric Master** - Quản lý thông tin vải
- 📐 **Pattern Master** - Quản lý mẫu thiết kế
- 🎨 **Body Lining Master** - Quản lý lớp lót thân áo
- 👕 **Sleeve Lining Master** - Quản lý lớp lót tay áo
- ⚫ **Button Master** - Quản lý nút áo
- ⚙️ **Option Master** - Quản lý các tùy chọn
- 🏭 **Supplier Master** - Quản lý nhà cung cấp
- 🔤 **MCode Master** - Quản lý master codes

**Quick Actions:**
- Export All Data (CSV)
- Import Data (CSV)
- Backup Database

**Statistics:**
- Total Records count
- Active tables
- Recent changes log

## Routes

```typescript
// Admin Routes
/admin                      → Admin Dashboard
/admin/staff               → Staff Management
/admin/stores              → Store Management  
/admin/database            → Database Overview
/admin/database/fabrics    → Heavy Fabric Management (TODO)
/admin/database/patterns   → Pattern Management (TODO)
/admin/database/linings    → Lining Management (TODO)
// ... other database tables
```

## Access Control

- **Role Required:** ADMIN
- Các route admin được protect bởi `AuthGuard`
- Chỉ user với role `ADMIN` mới có quyền truy cập

## UI Components

### Layout Components
- Page headers với breadcrumb navigation
- Stats cards
- Action toolbars (search + create button)
- Data tables với sort/filter

### Form Components
- Modal forms cho Create/Edit
- Form validation
- Cancel/Save actions

### Table Features
- Responsive design
- Search functionality
- Action buttons (Edit/Delete)
- Status badges
- Hover effects

## Styling

Sử dụng Tailwind CSS:
- **Colors:** Blue (primary), Green (success), Red (danger)
- **Shadows:** Subtle shadows cho depth
- **Transitions:** Smooth hover effects
- **Typography:** Clear hierarchy

## API Integration

### Current Status
- ✅ Store Management: Tích hợp với `ApiService.getStores()`
- ⚠️ Staff Management: Sử dụng mock data (TODO: integrate API)
- ⚠️ Database tables: Placeholder counts (TODO: integrate APIs)

### TODO
```typescript
// Staff API (cần implement trong backend)
ApiService.getStaff()
ApiService.createStaff(data)
ApiService.updateStaff(id, data)
ApiService.deleteStaff(id)

// Database Management APIs
ApiService.getHeavyFabrics() // ✅ Already available
ApiService.getPatterns() // ✅ Already available
ApiService.getBodyLinings() // ✅ Already available
ApiService.getSleeveLinings() // ✅ Already available
ApiService.getButtons() // ✅ Already available
ApiService.getOptions() // ✅ Already available
```

## Usage Examples

### 1. Accessing Admin Dashboard

```typescript
import { Link } from 'react-router-dom';

// In UserMenu or Navigation
{user?.role === 'ADMIN' && (
  <Link to="/admin">
    Admin Dashboard
  </Link>
)}
```

### 2. Staff Management

```typescript
// List Staff
const StaffList = () => {
  const [staff, setStaff] = useState([]);
  
  useEffect(() => {
    // TODO: Replace with API call
    // const data = await ApiService.getStaff();
    // setStaff(data);
  }, []);
};

// Create Staff
const handleCreate = async (data) => {
  // TODO: Implement API call
  // await ApiService.createStaff(data);
};
```

### 3. Store Management

```typescript
import { ApiService } from '@/services/api';

const StoreList = () => {
  const [stores, setStores] = useState([]);
  
  useEffect(() => {
    const loadStores = async () => {
      const data = await ApiService.getStores();
      setStores(data);
    };
    loadStores();
  }, []);
};
```

## Development Roadmap

### Phase 1 ✅ (Completed)
- [x] Admin Dashboard layout
- [x] Staff Management UI
- [x] Store Management UI  
- [x] Database Management overview
- [x] Basic CRUD operations (UI)
- [x] Routing setup

### Phase 2 (In Progress)
- [ ] Integrate Staff API with backend
- [ ] Add individual database table management pages
- [ ] Implement Export/Import functionality
- [ ] Add role-based access control
- [ ] Add data validation

### Phase 3 (Future)
- [ ] Advanced search/filter
- [ ] Bulk operations
- [ ] Audit logs
- [ ] Data analytics
- [ ] Backup/Restore functionality

## Testing

Để test admin features:

1. Login với ADMIN role:
```typescript
// In login form
email: 'admin@beams.com'
role: 'ADMIN'
```

2. Navigate to admin dashboard:
```
http://localhost:5173/admin
```

3. Test các chức năng:
- Create/Edit/Delete staff
- Create/Edit/Delete stores
- Browse database tables
- Check responsive design

## Notes

- UI đã sẵn sàng, cần tích hợp API backend
- Mock data được sử dụng cho development
- Protected routes đảm bảo chỉ ADMIN có quyền truy cập
- Responsive design cho mobile/tablet/desktop

## Version

- Version: 1.0.0
- Last Updated: 2025-11-10
- Status: In Development

