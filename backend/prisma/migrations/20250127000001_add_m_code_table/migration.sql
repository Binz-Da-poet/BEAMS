-- CreateTable
CREATE TABLE "m_codes" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "m_codes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "m_codes_category_code_key" ON "m_codes"("category", "code");

-- CreateIndex
CREATE INDEX "m_codes_category_idx" ON "m_codes"("category");

-- CreateIndex
CREATE INDEX "m_codes_is_active_idx" ON "m_codes"("is_active");

-- Add foreign key columns to existing tables
ALTER TABLE "plans" ADD COLUMN "m_code_id" INTEGER;
ALTER TABLE "item_types" ADD COLUMN "m_code_id" INTEGER;
ALTER TABLE "pickup_methods" ADD COLUMN "m_code_id" INTEGER;
ALTER TABLE "orientation_types" ADD COLUMN "m_code_id" INTEGER;
ALTER TABLE "seasons" ADD COLUMN "m_code_id" INTEGER;
ALTER TABLE "suppliers" ADD COLUMN "m_code_id" INTEGER;

-- Add foreign key constraints
ALTER TABLE "plans" ADD CONSTRAINT "plans_m_code_id_fkey" FOREIGN KEY ("m_code_id") REFERENCES "m_codes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "item_types" ADD CONSTRAINT "item_types_m_code_id_fkey" FOREIGN KEY ("m_code_id") REFERENCES "m_codes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "pickup_methods" ADD CONSTRAINT "pickup_methods_m_code_id_fkey" FOREIGN KEY ("m_code_id") REFERENCES "m_codes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "orientation_types" ADD CONSTRAINT "orientation_types_m_code_id_fkey" FOREIGN KEY ("m_code_id") REFERENCES "m_codes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_m_code_id_fkey" FOREIGN KEY ("m_code_id") REFERENCES "m_codes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "suppliers" ADD CONSTRAINT "suppliers_m_code_id_fkey" FOREIGN KEY ("m_code_id") REFERENCES "m_codes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Insert initial data for MCode table
INSERT INTO "m_codes" ("category", "code", "name", "description", "sort_order", "is_active") VALUES
-- Item Types
('ITEM_TYPE', '1', 'ジャケット', 'ジャケット', 1, true),
('ITEM_TYPE', '2', 'ベスト', 'ベスト', 2, true),
('ITEM_TYPE', '3', 'コート', 'コート', 3, true),
('ITEM_TYPE', '4', 'パンツ', 'パンツ', 4, true),
('ITEM_TYPE', '5', 'スーツ', 'スーツ', 5, true),

-- Plans
('PLAN', '1', 'プラン1', 'プラン1', 1, true),
('PLAN', '2', 'プラン2', 'プラン2', 2, true),
('PLAN', '3', 'プラン3', 'プラン3', 3, true),

-- Pickup Methods
('PICKUP_METHOD', '1', '店舗受取', '店舗での受取', 1, true),
('PICKUP_METHOD', '2', '宅配便', '宅配便での配送', 2, true),
('PICKUP_METHOD', '3', '直接配送', '直接配送', 3, true),

-- Orientation Types
('ORIENTATION', '1', '通常', '通常の向き', 1, true),
('ORIENTATION', '2', '逆', '逆の向き', 2, true),

-- Seasons
('SEASON', '1', '春夏', '春夏シーズン', 1, true),
('SEASON', '2', '秋冬', '秋冬シーズン', 2, true),

-- Order Priorities
('ORDER_PRIORITY', 'LOW', '低', '低優先度', 1, true),
('ORDER_PRIORITY', 'NORMAL', '通常', '通常優先度', 2, true),
('ORDER_PRIORITY', 'HIGH', '高', '高優先度', 3, true),
('ORDER_PRIORITY', 'URGENT', '緊急', '緊急優先度', 4, true),

-- User Roles
('USER_ROLE', 'ADMIN', '管理者', 'システム管理者', 1, true),
('USER_ROLE', 'STORE_MANAGER', '店長', '店舗管理者', 2, true),
('USER_ROLE', 'STORE_STAFF', '店員', '店舗スタッフ', 3, true),
('USER_ROLE', 'FACTORY_MANAGER', '工場長', '工場管理者', 4, true),
('USER_ROLE', 'FACTORY_STAFF', '工場員', '工場スタッフ', 5, true),

-- Document Types
('DOCUMENT_TYPE', 'FABRIC_ORDER_SHEET', '生地発注書', '生地発注書', 1, true),
('DOCUMENT_TYPE', 'FACTORY_ORDER_SHEET', '工場発注書', '工場発注書', 2, true),
('DOCUMENT_TYPE', 'CUSTOMER_ORDER_SHEET', 'お客様注文書', 'お客様注文書', 3, true),
('DOCUMENT_TYPE', 'MEASUREMENT_SHEET', '採寸表', '採寸表', 4, true),

-- Notification Types
('NOTIFICATION_TYPE', 'ORDER_CREATED', '注文作成', '注文が作成されました', 1, true),
('NOTIFICATION_TYPE', 'ORDER_UPDATED', '注文更新', '注文が更新されました', 2, true),
('NOTIFICATION_TYPE', 'ORDER_STATUS_CHANGED', 'ステータス変更', '注文ステータスが変更されました', 3, true),
('NOTIFICATION_TYPE', 'PDF_GENERATED', 'PDF生成', 'PDFが生成されました', 4, true),
('NOTIFICATION_TYPE', 'SYSTEM_ALERT', 'システムアラート', 'システムアラート', 5, true);
