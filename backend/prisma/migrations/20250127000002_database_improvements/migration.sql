-- Database Improvements Migration
-- This migration addresses critical database issues identified in the review

-- 1. Add foreign key constraints for Order table
ALTER TABLE "orders" ADD CONSTRAINT "orders_created_by_fkey" 
FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "orders" ADD CONSTRAINT "orders_updated_by_fkey" 
FOREIGN KEY ("updatedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- 2. Add check constraints for data validation
ALTER TABLE "orders" ADD CONSTRAINT "chk_orders_sales_price" 
CHECK ("salesPrice" IS NULL OR "salesPrice" >= 0);

ALTER TABLE "order_items" ADD CONSTRAINT "chk_order_items_quantity" 
CHECK ("quantity" > 0);

ALTER TABLE "order_items" ADD CONSTRAINT "chk_order_items_unit_price" 
CHECK ("unitPrice" IS NULL OR "unitPrice" >= 0);

-- 3. Create unified PatternMaster table
CREATE TABLE "pattern_masters" (
    "id" SERIAL NOT NULL,
    "item_type_id" INTEGER NOT NULL,
    "pattern_no" TEXT NOT NULL,
    "size" TEXT,
    "length" DECIMAL(10,2),
    "shoulder_width" DECIMAL(10,2),
    "bust" DECIMAL(10,2),
    "waist" DECIMAL(10,2),
    "hip" DECIMAL(10,2),
    "sleeve_length" DECIMAL(10,2),
    "sleeve_width" DECIMAL(10,2),
    "lapel_width" DECIMAL(10,2),
    "crotch_width" DECIMAL(10,2),
    "knee_width" DECIMAL(10,2),
    "hem_width" DECIMAL(10,2),
    "rise" DECIMAL(10,2),
    "inseam" DECIMAL(10,2),
    "stitch_spec" TEXT,
    "lining_spec" TEXT,
    "default_button_count" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pattern_masters_pkey" PRIMARY KEY ("id")
);

-- 4. Create unified MeasurementType table
CREATE TABLE "measurement_types" (
    "id" SERIAL NOT NULL,
    "item_type_id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measurement_types_pkey" PRIMARY KEY ("id")
);

-- 5. Add foreign key constraints for new tables
ALTER TABLE "pattern_masters" ADD CONSTRAINT "pattern_masters_item_type_id_fkey" 
FOREIGN KEY ("item_type_id") REFERENCES "item_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "measurement_types" ADD CONSTRAINT "measurement_types_item_type_id_fkey" 
FOREIGN KEY ("item_type_id") REFERENCES "item_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- 6. Add audit fields to HeavyFabricMaster
ALTER TABLE "heavy_fabric_masters" ADD COLUMN "created_by" INTEGER;
ALTER TABLE "heavy_fabric_masters" ADD COLUMN "updated_by" INTEGER;
ALTER TABLE "heavy_fabric_masters" ADD COLUMN "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "heavy_fabric_masters" ADD COLUMN "updated_at" TIMESTAMP(3) NOT NULL;

-- 7. Add indexes for performance
CREATE INDEX "idx_orders_store_status_created" ON "orders"("storeId", "statusId", "createdAt");
CREATE INDEX "idx_orders_created_by_created" ON "orders"("createdBy", "createdAt");
CREATE INDEX "idx_orders_priority_created" ON "orders"("priority", "createdAt");
CREATE INDEX "idx_pattern_masters_item_type" ON "pattern_masters"("item_type_id");
CREATE INDEX "idx_pattern_masters_pattern_no" ON "pattern_masters"("pattern_no");
CREATE INDEX "idx_measurement_types_item_type" ON "measurement_types"("item_type_id");
CREATE INDEX "idx_measurement_types_code" ON "measurement_types"("code");
CREATE INDEX "idx_heavy_fabric_masters_fabric_no" ON "heavy_fabric_masters"("fabricNo");
CREATE INDEX "idx_heavy_fabric_masters_supplier" ON "heavy_fabric_masters"("supplierId");
CREATE INDEX "idx_heavy_fabric_masters_created" ON "heavy_fabric_masters"("created_at");

-- 8. Add unique constraints
CREATE UNIQUE INDEX "pattern_masters_pattern_no_key" ON "pattern_masters"("pattern_no");
CREATE UNIQUE INDEX "measurement_types_code_key" ON "measurement_types"("code");

-- 9. Add comments for documentation
COMMENT ON COLUMN "users"."password" IS 'Should be hashed before storage';
COMMENT ON COLUMN "orders"."salesPrice" IS 'Must be >= 0';
COMMENT ON COLUMN "order_items"."quantity" IS 'Must be > 0';
COMMENT ON COLUMN "order_items"."unitPrice" IS 'Must be >= 0';
COMMENT ON COLUMN "order_logs"."oldValues" IS 'Store previous values (max 1MB)';
COMMENT ON COLUMN "order_logs"."newValues" IS 'Store new values (max 1MB)';

-- 10. Insert initial data for new tables
INSERT INTO "measurement_types" ("item_type_id", "code", "name", "unit", "sort_order") VALUES
-- Jacket measurements
(1, 'shoulder_width', '肩幅', 'cm', 1),
(1, 'bust', 'バスト', 'cm', 2),
(1, 'waist', 'ウエスト', 'cm', 3),
(1, 'hip', 'ヒップ', 'cm', 4),
(1, 'body_length', '着丈', 'cm', 5),
(1, 'sleeve_length', '袖丈', 'cm', 6),
(1, 'cuff_width', '袖口幅', 'cm', 7),
(1, 'lapel_width', 'ラペル幅', 'cm', 8),

-- Pants measurements
(4, 'waist', 'ウエスト', 'cm', 1),
(4, 'hip', 'ヒップ', 'cm', 2),
(4, 'thigh_width', '太もも幅', 'cm', 3),
(4, 'knee_width', '膝幅', 'cm', 4),
(4, 'hem_width', '裾幅', 'cm', 5),
(4, 'rise', '股上', 'cm', 6),
(4, 'inseam', '股下', 'cm', 7),

-- Vest measurements
(2, 'shoulder_width', '肩幅', 'cm', 1),
(2, 'bust', 'バスト', 'cm', 2),
(2, 'waist', 'ウエスト', 'cm', 3),
(2, 'body_length', '着丈', 'cm', 4),

-- Coat measurements
(3, 'shoulder_width', '肩幅', 'cm', 1),
(3, 'bust', 'バスト', 'cm', 2),
(3, 'waist', 'ウエスト', 'cm', 3),
(3, 'hip', 'ヒップ', 'cm', 4),
(3, 'body_length', '着丈', 'cm', 5),
(3, 'sleeve_length', '袖丈', 'cm', 6),
(3, 'cuff_width', '袖口幅', 'cm', 7),
(3, 'lapel_width', 'ラペル幅', 'cm', 8),

-- Suit measurements (jacket + pants)
(5, 'shoulder_width', '肩幅', 'cm', 1),
(5, 'bust', 'バスト', 'cm', 2),
(5, 'waist', 'ウエスト', 'cm', 3),
(5, 'hip', 'ヒップ', 'cm', 4),
(5, 'body_length', '着丈', 'cm', 5),
(5, 'sleeve_length', '袖丈', 'cm', 6),
(5, 'cuff_width', '袖口幅', 'cm', 7),
(5, 'lapel_width', 'ラペル幅', 'cm', 8),
(5, 'pants_waist', 'パンツウエスト', 'cm', 9),
(5, 'pants_hip', 'パンツヒップ', 'cm', 10),
(5, 'pants_thigh_width', 'パンツ太もも幅', 'cm', 11),
(5, 'pants_knee_width', 'パンツ膝幅', 'cm', 12),
(5, 'pants_hem_width', 'パンツ裾幅', 'cm', 13),
(5, 'pants_rise', 'パンツ股上', 'cm', 14),
(5, 'pants_inseam', 'パンツ股下', 'cm', 15);
