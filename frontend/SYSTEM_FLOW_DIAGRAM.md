# BEAMS Custom Tailor System - Flow Diagram & Screen Transition

## 📋 **Tổng Quan Hệ Thống**

Hệ thống BEAMS Custom Tailor là một ứng dụng đặt hàng may đo trực tuyến với luồng đặt hàng hoàn chỉnh từ chọn sản phẩm đến hoàn thành đơn hàng.

## 🎯 **Order Flow (Luồng Đặt Hàng)**

### **1. MenuPage (/) - Trang Chủ**

- **Chức năng**: Chọn loại sản phẩm và gói dịch vụ
- **Sản phẩm**: Jacket, Coat, Suit, Pants, Vest
- **Gói dịch vụ**: Basic Order, Custom Order, Full Order
- **Action**: Click "決定" → Chuyển đến OrderPage tương ứng

### **2. OrderPage (/item-order) - Nhập Thông Tin Đơn Hàng**

- **Chức năng**: Nhập chi tiết đơn hàng theo từng loại sản phẩm
- **Các trang**:
  - `/jacket-order` - JacketOrderPage
  - `/coat-order` - CoatOrderPage
  - `/suit-order` - SuitOrderPage
  - `/pants-order` - PantsOrderPage
  - `/vest-order` - VestOrderPage
- **Action**: Click "次へ" → Chuyển đến CustomerInfoPage Click "ホームに戻る" → Về MenuPage Click "下書き" → 　 lưu bản nháp vào localStorage và Chuyển đến DraftsPage

### **3. CustomerInfoPage (/customer) - Nhập Thông Tin Khách Hàng**

- **Chức năng**: Nhập thông tin cá nhân của khách hàng
- **Thông tin**: Họ tên, Furigana, Số điện thoại, ID hội viên
- **Action**: Click "次へ" → Chuyển đến OrderConfirmationPage Click "下書き" → 　 lưu bản nháp vào localStorage và Chuyển đến DraftsPage Click "戻る" → Về OrderPage

### **4. OrderConfirmationPage (/item-order-confirmation) - Xác Nhận Đơn Hàng**

- **Chức năng**: Xem lại và xác nhận thông tin đơn hàng
- **Các trang**:
  - `/jacket-order-confirmation` - JacketOrderConfirmationPage
  - `/coat-order-confirmation` - CoatOrderConfirmationPage
  - `/suit-order-confirmation` - SuitOrderConfirmationPage
  - `/pants-order-confirmation` - PantsOrderConfirmationPage
  - `/vest-order-confirmation` - VestOrderConfirmationPage
- **Action**: Click "次へ" → Chuyển đến CustomerConfirmationPage (/customer-info-confirmation) Click "下書き" → 　 lưu bản nháp vào localStorage và Chuyển đến DraftsPage Click "戻る" → Về CustomerInfoPage (/customer)

### **5. CustomerConfirmationPage (/customer-info-confirmation) - Xác Nhận Thông Tin Khách Hàng**

- **Chức năng**: Xem lại và xác nhận thông tin khách hàng
- **Action**: Click "次へ" → Chuyển đến CompletePage Click "下書き" → 　 lưu bản nháp vào localStorage và Chuyển đến DraftsPage Click "戻る" → Về OrderConfirmationPage (/item-order-confirmation)

### **6. CompletePage (/complete) - Hoàn Thành**

- **Chức năng**: Thông báo hoàn thành đơn hàng
- **Action**: Click "ホームに戻る" → Về MenuPage
- **Action**: Click "下書き一覧" → Chuyển đến DraftsPage

### **7. DraftsPage (/drafts) - Quản Lý Bản Nháp**

- **Chức năng**: Xem và quản lý các bản nháp đã lưu
- **Action**: Có thể tiếp tục chỉnh sửa hoặc xóa bản nháp


