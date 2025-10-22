-- Migration: Improve Database Structure for BEAMS System
-- Date: 2025-01-27
-- Description: Add user management, order status tracking, and workflow features

-- ===== CREATE NEW TABLES =====

-- 1. Create users table
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) UNIQUE,
    "phone" VARCHAR(50),
    "isActive" BOOLEAN DEFAULT true,
    "lastLoginAt" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    "storeId" INTEGER REFERENCES "Store"("id"),
    "role" VARCHAR(50) DEFAULT 'STAFF'
);

-- 2. Create order_statuses table
CREATE TABLE "order_statuses" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) UNIQUE NOT NULL,
    "code" VARCHAR(50) UNIQUE NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "sortOrder" INTEGER DEFAULT 0,
    "color" VARCHAR(20)
);

-- 3. Create order_logs table
CREATE TABLE "order_logs" (
    "id" SERIAL PRIMARY KEY,
    "orderId" INTEGER NOT NULL REFERENCES "Order"("id"),
    "userId" INTEGER NOT NULL REFERENCES "users"("id"),
    "statusId" INTEGER NOT NULL REFERENCES "order_statuses"("id"),
    "action" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "oldValues" JSONB,
    "newValues" JSONB,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

-- 4. Create documents table
CREATE TABLE "documents" (
    "id" SERIAL PRIMARY KEY,
    "orderId" INTEGER NOT NULL REFERENCES "Order"("id"),
    "type" VARCHAR(50) NOT NULL,
    "fileName" VARCHAR(255) NOT NULL,
    "filePath" VARCHAR(500) NOT NULL,
    "fileSize" INTEGER,
    "generatedAt" TIMESTAMP DEFAULT NOW(),
    "generatedBy" INTEGER NOT NULL
);

-- 5. Create notifications table
CREATE TABLE "notifications" (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES "users"("id"),
    "title" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "isRead" BOOLEAN DEFAULT false,
    "data" JSONB,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "readAt" TIMESTAMP
);

-- 6. Create system_configs table
CREATE TABLE "system_configs" (
    "id" SERIAL PRIMARY KEY,
    "key" VARCHAR(255) UNIQUE NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- ===== ADD NEW COLUMNS TO EXISTING TABLES =====

-- 7. Add new columns to Store table
ALTER TABLE "Store" ADD COLUMN "isActive" BOOLEAN DEFAULT true;
ALTER TABLE "Store" ADD COLUMN "region" VARCHAR(100);
ALTER TABLE "Store" ADD COLUMN "managerName" VARCHAR(255);
ALTER TABLE "Store" ADD COLUMN "createdAt" TIMESTAMP DEFAULT NOW();
ALTER TABLE "Store" ADD COLUMN "updatedAt" TIMESTAMP DEFAULT NOW();

-- 8. Add new columns to Customer table
ALTER TABLE "Customer" ADD COLUMN "customerCode" VARCHAR(50) UNIQUE;
ALTER TABLE "Customer" ADD COLUMN "birthDate" TIMESTAMP;
ALTER TABLE "Customer" ADD COLUMN "address" TEXT;
ALTER TABLE "Customer" ADD COLUMN "isActive" BOOLEAN DEFAULT true;
ALTER TABLE "Customer" ADD COLUMN "createdAt" TIMESTAMP DEFAULT NOW();
ALTER TABLE "Customer" ADD COLUMN "updatedAt" TIMESTAMP DEFAULT NOW();

-- 9. Add new columns to Order table
ALTER TABLE "Order" ADD COLUMN "statusId" INTEGER DEFAULT 1;
ALTER TABLE "Order" ADD COLUMN "priority" VARCHAR(20) DEFAULT 'NORMAL';
ALTER TABLE "Order" ADD COLUMN "estimatedCompletionDate" TIMESTAMP;
ALTER TABLE "Order" ADD COLUMN "actualCompletionDate" TIMESTAMP;
ALTER TABLE "Order" ADD COLUMN "isUrgent" BOOLEAN DEFAULT false;
ALTER TABLE "Order" ADD COLUMN "internalNotes" TEXT;
ALTER TABLE "Order" ADD COLUMN "createdBy" INTEGER;
ALTER TABLE "Order" ADD COLUMN "updatedBy" INTEGER;

-- ===== CREATE INDEXES FOR PERFORMANCE =====

-- 10. Create indexes for users table
CREATE INDEX "idx_users_username" ON "users"("username");
CREATE INDEX "idx_users_email" ON "users"("email");
CREATE INDEX "idx_users_storeId" ON "users"("storeId");
CREATE INDEX "idx_users_role" ON "users"("role");

-- 11. Create indexes for order_logs table
CREATE INDEX "idx_order_logs_orderId_createdAt" ON "order_logs"("orderId", "createdAt");
CREATE INDEX "idx_order_logs_userId_createdAt" ON "order_logs"("userId", "createdAt");
CREATE INDEX "idx_order_logs_statusId_createdAt" ON "order_logs"("statusId", "createdAt");

-- 12. Create indexes for documents table
CREATE INDEX "idx_documents_orderId" ON "documents"("orderId");
CREATE INDEX "idx_documents_type" ON "documents"("type");
CREATE INDEX "idx_documents_generatedAt" ON "documents"("generatedAt");

-- 13. Create indexes for notifications table
CREATE INDEX "idx_notifications_userId_isRead" ON "notifications"("userId", "isRead");
CREATE INDEX "idx_notifications_createdAt" ON "notifications"("createdAt");

-- 14. Create indexes for Order table
CREATE INDEX "idx_orders_statusId" ON "Order"("statusId");
CREATE INDEX "idx_orders_storeId" ON "Order"("storeId");
CREATE INDEX "idx_orders_createdAt" ON "Order"("createdAt");
CREATE INDEX "idx_orders_orderNo" ON "Order"("orderNo");
CREATE INDEX "idx_orders_statusId_createdAt" ON "Order"("statusId", "createdAt");
CREATE INDEX "idx_orders_storeId_statusId" ON "Order"("storeId", "statusId");
CREATE INDEX "idx_orders_customerId_createdAt" ON "Order"("customerId", "createdAt");

-- 15. Create indexes for OrderItem table
CREATE INDEX "idx_orderitems_orderId" ON "OrderItem"("orderId");
CREATE INDEX "idx_orderitems_itemTypeId" ON "OrderItem"("itemTypeId");
CREATE INDEX "idx_orderitems_staffId" ON "OrderItem"("staffId");

-- ===== INSERT DEFAULT DATA =====

-- 16. Insert default order statuses
INSERT INTO "order_statuses" ("code", "name", "sortOrder", "color") VALUES
('DRAFT', '下書き', 1, '#6B7280'),
('PENDING', '受付済み', 2, '#3B82F6'),
('CONFIRMED', '確認済み', 3, '#10B981'),
('FABRIC_ORDERED', '生地発注済み', 4, '#F59E0B'),
('FACTORY_ORDERED', '工場発注済み', 5, '#8B5CF6'),
('IN_PRODUCTION', '製作中', 6, '#EF4444'),
('READY_FOR_FITTING', '仮縫い準備完了', 7, '#06B6D4'),
('FITTING_COMPLETED', '仮縫い完了', 8, '#84CC16'),
('FINAL_PRODUCTION', '本縫い中', 9, '#F97316'),
('COMPLETED', '完成', 10, '#22C55E'),
('DELIVERED', '納品済み', 11, '#6366F1'),
('CANCELLED', 'キャンセル', 12, '#EF4444');

-- 17. Insert default system configs
INSERT INTO "system_configs" ("key", "value", "description") VALUES
('SYSTEM_NAME', 'BEAMS Custom Tailor System', 'Tên hệ thống'),
('VERSION', '2.0.0', 'Phiên bản hệ thống'),
('MAINTENANCE_MODE', 'false', 'Chế độ bảo trì'),
('MAX_FILE_SIZE', '10485760', 'Kích thước file tối đa (bytes)'),
('ORDER_AUTO_NUMBER', 'true', 'Tự động tạo số đơn hàng'),
('NOTIFICATION_ENABLED', 'true', 'Bật thông báo'),
('PDF_GENERATION_ENABLED', 'true', 'Bật tạo PDF');

-- ===== ADD FOREIGN KEY CONSTRAINTS =====

-- 18. Add foreign key constraints for Order table
ALTER TABLE "Order" ADD CONSTRAINT "fk_order_status" FOREIGN KEY ("statusId") REFERENCES "order_statuses"("id");
ALTER TABLE "Order" ADD CONSTRAINT "fk_order_createdBy" FOREIGN KEY ("createdBy") REFERENCES "users"("id");
ALTER TABLE "Order" ADD CONSTRAINT "fk_order_updatedBy" FOREIGN KEY ("updatedBy") REFERENCES "users"("id");

-- ===== CREATE TRIGGERS FOR AUDIT =====

-- 19. Create trigger function for updatedAt
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 20. Create triggers for updatedAt
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON "users" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_stores_updated_at BEFORE UPDATE ON "Store" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON "Customer" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON "Order" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_configs_updated_at BEFORE UPDATE ON "system_configs" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
