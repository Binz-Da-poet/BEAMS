-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "kana" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "note" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "role" TEXT,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemType" (
    "id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ItemType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PickupMethod" (
    "id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PickupMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrientationType" (
    "id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "OrientationType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "planId" INTEGER NOT NULL,
    "receptionDate" TIMESTAMP(3) NOT NULL,
    "expectedStoreArrivalDate" TIMESTAMP(3),
    "pickupMethodId" INTEGER,
    "salesPrice" DECIMAL(65,30),
    "orderNo" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "itemTypeId" INTEGER NOT NULL,
    "staffId" INTEGER,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unitPrice" DECIMAL(65,30),
    "orderPeriodStart" TIMESTAMP(3),
    "orderPeriodEnd" TIMESTAMP(3),

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JacketDetails" (
    "orderItemId" INTEGER NOT NULL,
    "fabricId" INTEGER,
    "fabricNo" TEXT,
    "patternId" INTEGER,
    "patternNo" TEXT,
    "bodyLiningId" INTEGER,
    "bodyLiningNo" TEXT,
    "bodyLiningColorNo" TEXT,
    "bodyLiningOrientationId" INTEGER,
    "sleeveLiningId" INTEGER,
    "sleeveLiningNo" TEXT,
    "sleeveLiningColorNo" TEXT,
    "sleeveLiningOrientationId" INTEGER,
    "liningSpec" TEXT,
    "buttonId" INTEGER,
    "buttonNo" TEXT,
    "buttonColorNo" TEXT,
    "optionsId" INTEGER,
    "optionsText" TEXT,
    "cuffSpec" TEXT,
    "cuffButtonCount" INTEGER,
    "cuffButtonStartPos" DECIMAL(65,30),
    "sizeLabel" TEXT,
    "bastedFitting" BOOLEAN,
    "remarks" TEXT,

    CONSTRAINT "JacketDetails_pkey" PRIMARY KEY ("orderItemId")
);

-- CreateTable
CREATE TABLE "JacketMeasurementType" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT,

    CONSTRAINT "JacketMeasurementType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JacketMeasurement" (
    "id" SERIAL NOT NULL,
    "orderItemId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "standardValue" DECIMAL(65,30),
    "adjustValue" DECIMAL(65,30),
    "finalValue" DECIMAL(65,30),

    CONSTRAINT "JacketMeasurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoatDetails" (
    "orderItemId" INTEGER NOT NULL,
    "seasonId" INTEGER,
    "supplierId" INTEGER,
    "fabricId" INTEGER,
    "fabricNo" TEXT,
    "patternId" INTEGER,
    "patternNo" TEXT,
    "bodyLiningId" INTEGER,
    "bodyLiningNo" TEXT,
    "bodyLiningColorNo" TEXT,
    "bodyLiningOrientationId" INTEGER,
    "sleeveLiningId" INTEGER,
    "sleeveLiningNo" TEXT,
    "sleeveLiningColorNo" TEXT,
    "sleeveLiningOrientationId" INTEGER,
    "liningSpec" TEXT,
    "buttonId" INTEGER,
    "buttonNo" TEXT,
    "buttonColorNo" TEXT,
    "optionsId" INTEGER,
    "optionsText" TEXT,
    "cuffSpec" TEXT,
    "cuffButtonCount" INTEGER,
    "cuffButtonStartPos" DECIMAL(65,30),
    "sizeLabel" TEXT,
    "bastedFitting" BOOLEAN,
    "remarks" TEXT,

    CONSTRAINT "CoatDetails_pkey" PRIMARY KEY ("orderItemId")
);

-- CreateTable
CREATE TABLE "Season" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" SERIAL NOT NULL,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "note" TEXT,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeavyFabricMaster" (
    "id" SERIAL NOT NULL,
    "supplierNo" TEXT,
    "fabricMaker" TEXT,
    "fabricNo" TEXT NOT NULL,
    "color" TEXT,
    "pattern" TEXT,
    "composition" TEXT,
    "characteristics" TEXT,
    "fairFabricUnitPrice" DECIMAL(65,30),
    "fairFabricRank" TEXT,
    "regularFabricUnitPrice" DECIMAL(65,30),
    "regularFabricRank" TEXT,
    "dataUpdated" TIMESTAMP(3),
    "largePattern" BOOLEAN,
    "transparent" BOOLEAN,
    "stockFlag" BOOLEAN,
    "supplierId" INTEGER,

    CONSTRAINT "HeavyFabricMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JacketPatternMaster" (
    "id" SERIAL NOT NULL,
    "patternNo" TEXT NOT NULL,
    "size" TEXT,
    "length" DECIMAL(65,30),
    "shoulderWidth" DECIMAL(65,30),
    "bust" DECIMAL(65,30),
    "waist" DECIMAL(65,30),
    "hip" DECIMAL(65,30),
    "sleeveLength" DECIMAL(65,30),
    "sleeveWidth" DECIMAL(65,30),
    "lapelWidth" DECIMAL(65,30),
    "stitchSpec" TEXT,
    "liningSpec" TEXT,
    "defaultButtonCount" INTEGER,

    CONSTRAINT "JacketPatternMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuitPatternMaster" (
    "id" SERIAL NOT NULL,
    "patternNo" TEXT NOT NULL,
    "size" TEXT,
    "length" DECIMAL(65,30),
    "shoulderWidth" DECIMAL(65,30),
    "bust" DECIMAL(65,30),
    "waist" DECIMAL(65,30),
    "hip" DECIMAL(65,30),
    "sleeveLength" DECIMAL(65,30),
    "sleeveWidth" DECIMAL(65,30),
    "lapelWidth" DECIMAL(65,30),
    "stitchSpec" TEXT,
    "defaultButtonCount" INTEGER,

    CONSTRAINT "SuitPatternMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VestPatternMaster" (
    "id" SERIAL NOT NULL,
    "patternNo" TEXT NOT NULL,
    "size" TEXT,
    "length" DECIMAL(65,30),
    "shoulderWidth" DECIMAL(65,30),
    "bust" DECIMAL(65,30),
    "waist" DECIMAL(65,30),
    "stitchSpec" TEXT,
    "defaultButtonCount" INTEGER,

    CONSTRAINT "VestPatternMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoatPatternMaster" (
    "id" SERIAL NOT NULL,
    "patternNo" TEXT NOT NULL,
    "size" TEXT,
    "length" DECIMAL(65,30),
    "shoulderWidth" DECIMAL(65,30),
    "bust" DECIMAL(65,30),
    "waist" DECIMAL(65,30),
    "hip" DECIMAL(65,30),
    "sleeveLength" DECIMAL(65,30),
    "sleeveWidth" DECIMAL(65,30),
    "lapelWidth" DECIMAL(65,30),
    "stitchSpec" TEXT,

    CONSTRAINT "CoatPatternMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PantsPatternMaster" (
    "id" SERIAL NOT NULL,
    "patternNo" TEXT NOT NULL,
    "size" TEXT,
    "waist" DECIMAL(65,30),
    "hip" DECIMAL(65,30),
    "crotchWidth" DECIMAL(65,30),
    "kneeWidth" DECIMAL(65,30),
    "hemWidth" DECIMAL(65,30),
    "rise" DECIMAL(65,30),
    "inseam" DECIMAL(65,30),
    "stitchSpec" TEXT,

    CONSTRAINT "PantsPatternMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BodyLiningMaster" (
    "id" SERIAL NOT NULL,
    "productNo" TEXT NOT NULL,
    "colorNo" TEXT,
    "orientation" TEXT,
    "stockFlag" BOOLEAN,

    CONSTRAINT "BodyLiningMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SleeveLiningMaster" (
    "id" SERIAL NOT NULL,
    "productNo" TEXT NOT NULL,
    "colorNo" TEXT,
    "orientation" TEXT,
    "stockFlag" BOOLEAN,

    CONSTRAINT "SleeveLiningMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeavyFabricButtonMaster" (
    "id" SERIAL NOT NULL,
    "productNo" TEXT NOT NULL,
    "colorNo" TEXT,
    "pantsProductNo" TEXT,
    "pantsColorNo" TEXT,
    "cost1" DECIMAL(65,30),
    "cost2" DECIMAL(65,30),
    "cost3" DECIMAL(65,30),
    "cost4" DECIMAL(65,30),
    "cost5" DECIMAL(65,30),
    "cost6" DECIMAL(65,30),
    "cost7" DECIMAL(65,30),
    "cost8" DECIMAL(65,30),
    "retailPrice1" DECIMAL(65,30),
    "retailPrice2" DECIMAL(65,30),
    "retailPrice3" DECIMAL(65,30),
    "retailPrice4" DECIMAL(65,30),
    "retailPrice5" DECIMAL(65,30),
    "retailPrice6" DECIMAL(65,30),
    "retailPrice7" DECIMAL(65,30),
    "retailPrice8" DECIMAL(65,30),

    CONSTRAINT "HeavyFabricButtonMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OptionMaster" (
    "id" SERIAL NOT NULL,
    "optionName" TEXT NOT NULL,
    "cost" DECIMAL(65,30),
    "retailPrice" DECIMAL(65,30),
    "textContent" TEXT,

    CONSTRAINT "OptionMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoatMeasurementType" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT,

    CONSTRAINT "CoatMeasurementType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoatMeasurement" (
    "id" SERIAL NOT NULL,
    "orderItemId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "standardValue" DECIMAL(65,30),
    "adjustValue" DECIMAL(65,30),
    "finalValue" DECIMAL(65,30),

    CONSTRAINT "CoatMeasurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuitDetails" (
    "orderItemId" INTEGER NOT NULL,
    "seasonId" INTEGER,
    "supplierId" INTEGER,
    "fabricId" INTEGER,
    "fabricNo" TEXT,
    "jacketPatternId" INTEGER,
    "jacketPatternNo" TEXT,
    "pantsPatternId" INTEGER,
    "pantsPatternNo" TEXT,
    "bodyLiningId" INTEGER,
    "bodyLiningNo" TEXT,
    "bodyLiningColorNo" TEXT,
    "bodyLiningOrientationId" INTEGER,
    "sleeveLiningId" INTEGER,
    "sleeveLiningNo" TEXT,
    "sleeveLiningColorNo" TEXT,
    "sleeveLiningOrientationId" INTEGER,
    "liningSpec" TEXT,
    "jacketButtonId" INTEGER,
    "jacketButtonNo" TEXT,
    "jacketButtonColorNo" TEXT,
    "pantsButtonId" INTEGER,
    "pantsButtonNo" TEXT,
    "pantsButtonColorNo" TEXT,
    "optionsId" INTEGER,
    "cuffSpec" TEXT,
    "cuffButtonCount" INTEGER,
    "cuffButtonStartPos" DECIMAL(65,30),
    "jacketSizeLabel" TEXT,
    "pantsSizeLabel" TEXT,
    "pantsHemSpec" TEXT,
    "pantsDoubleWidth" DECIMAL(65,30),
    "bastedFitting" BOOLEAN,
    "remarks" TEXT,

    CONSTRAINT "SuitDetails_pkey" PRIMARY KEY ("orderItemId")
);

-- CreateTable
CREATE TABLE "SuitJacketMeasurementType" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT,

    CONSTRAINT "SuitJacketMeasurementType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuitJacketMeasurement" (
    "id" SERIAL NOT NULL,
    "orderItemId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "standardValue" DECIMAL(65,30),
    "adjustValue" DECIMAL(65,30),
    "finalValue" DECIMAL(65,30),

    CONSTRAINT "SuitJacketMeasurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuitPantsMeasurementType" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT,

    CONSTRAINT "SuitPantsMeasurementType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuitPantsMeasurement" (
    "id" SERIAL NOT NULL,
    "orderItemId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "standardValue" DECIMAL(65,30),
    "adjustValue" DECIMAL(65,30),
    "finalValue" DECIMAL(65,30),

    CONSTRAINT "SuitPantsMeasurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PantsDetails" (
    "orderItemId" INTEGER NOT NULL,
    "seasonId" INTEGER,
    "supplierId" INTEGER,
    "fabricId" INTEGER,
    "fabricNo" TEXT,
    "patternId" INTEGER,
    "pantsPatternNo" TEXT,
    "liningSpec" TEXT,
    "buttonId" INTEGER,
    "pantsButtonNo" TEXT,
    "pantsButtonColorNo" TEXT,
    "optionsId" INTEGER,
    "pantsSizeLabel" TEXT,
    "pantsHemSpec" TEXT,
    "pantsDoubleWidth" DECIMAL(65,30),
    "bastedFitting" BOOLEAN,
    "remarks" TEXT,

    CONSTRAINT "PantsDetails_pkey" PRIMARY KEY ("orderItemId")
);

-- CreateTable
CREATE TABLE "PantsMeasurementType" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT,

    CONSTRAINT "PantsMeasurementType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PantsMeasurement" (
    "id" SERIAL NOT NULL,
    "orderItemId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "standardValue" DECIMAL(65,30),
    "adjustValue" DECIMAL(65,30),
    "finalValue" DECIMAL(65,30),

    CONSTRAINT "PantsMeasurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VestDetails" (
    "orderItemId" INTEGER NOT NULL,
    "seasonId" INTEGER,
    "supplierId" INTEGER,
    "fabricId" INTEGER,
    "fabricNo" TEXT,
    "patternId" INTEGER,
    "patternNo" TEXT,
    "bodyLiningId" INTEGER,
    "bodyLiningNo" TEXT,
    "bodyLiningColorNo" TEXT,
    "bodyLiningOrientationId" INTEGER,
    "liningSpec" TEXT,
    "buttonId" INTEGER,
    "buttonNo" TEXT,
    "buttonColorNo" TEXT,
    "optionsId" INTEGER,
    "sizeLabel" TEXT,
    "bastedFitting" BOOLEAN,
    "remarks" TEXT,

    CONSTRAINT "VestDetails_pkey" PRIMARY KEY ("orderItemId")
);

-- CreateTable
CREATE TABLE "VestMeasurementType" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT,

    CONSTRAINT "VestMeasurementType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VestMeasurement" (
    "id" SERIAL NOT NULL,
    "orderItemId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "standardValue" DECIMAL(65,30),
    "adjustValue" DECIMAL(65,30),
    "finalValue" DECIMAL(65,30),

    CONSTRAINT "VestMeasurement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_code_key" ON "Store"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_code_key" ON "Plan"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ItemType_code_key" ON "ItemType"("code");

-- CreateIndex
CREATE UNIQUE INDEX "PickupMethod_code_key" ON "PickupMethod"("code");

-- CreateIndex
CREATE UNIQUE INDEX "OrientationType_code_key" ON "OrientationType"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderNo_key" ON "Order"("orderNo");

-- CreateIndex
CREATE UNIQUE INDEX "JacketMeasurementType_code_key" ON "JacketMeasurementType"("code");

-- CreateIndex
CREATE UNIQUE INDEX "JacketMeasurement_orderItemId_typeId_key" ON "JacketMeasurement"("orderItemId", "typeId");

-- CreateIndex
CREATE UNIQUE INDEX "Season_code_key" ON "Season"("code");

-- CreateIndex
CREATE UNIQUE INDEX "HeavyFabricMaster_fabricNo_key" ON "HeavyFabricMaster"("fabricNo");

-- CreateIndex
CREATE UNIQUE INDEX "JacketPatternMaster_patternNo_key" ON "JacketPatternMaster"("patternNo");

-- CreateIndex
CREATE UNIQUE INDEX "SuitPatternMaster_patternNo_key" ON "SuitPatternMaster"("patternNo");

-- CreateIndex
CREATE UNIQUE INDEX "VestPatternMaster_patternNo_key" ON "VestPatternMaster"("patternNo");

-- CreateIndex
CREATE UNIQUE INDEX "CoatPatternMaster_patternNo_key" ON "CoatPatternMaster"("patternNo");

-- CreateIndex
CREATE UNIQUE INDEX "PantsPatternMaster_patternNo_key" ON "PantsPatternMaster"("patternNo");

-- CreateIndex
CREATE UNIQUE INDEX "BodyLiningMaster_productNo_key" ON "BodyLiningMaster"("productNo");

-- CreateIndex
CREATE UNIQUE INDEX "SleeveLiningMaster_productNo_key" ON "SleeveLiningMaster"("productNo");

-- CreateIndex
CREATE UNIQUE INDEX "CoatMeasurementType_code_key" ON "CoatMeasurementType"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CoatMeasurement_orderItemId_typeId_key" ON "CoatMeasurement"("orderItemId", "typeId");

-- CreateIndex
CREATE UNIQUE INDEX "SuitJacketMeasurementType_code_key" ON "SuitJacketMeasurementType"("code");

-- CreateIndex
CREATE UNIQUE INDEX "SuitJacketMeasurement_orderItemId_typeId_key" ON "SuitJacketMeasurement"("orderItemId", "typeId");

-- CreateIndex
CREATE UNIQUE INDEX "SuitPantsMeasurementType_code_key" ON "SuitPantsMeasurementType"("code");

-- CreateIndex
CREATE UNIQUE INDEX "SuitPantsMeasurement_orderItemId_typeId_key" ON "SuitPantsMeasurement"("orderItemId", "typeId");

-- CreateIndex
CREATE UNIQUE INDEX "PantsMeasurementType_code_key" ON "PantsMeasurementType"("code");

-- CreateIndex
CREATE UNIQUE INDEX "PantsMeasurement_orderItemId_typeId_key" ON "PantsMeasurement"("orderItemId", "typeId");

-- CreateIndex
CREATE UNIQUE INDEX "VestMeasurementType_code_key" ON "VestMeasurementType"("code");

-- CreateIndex
CREATE UNIQUE INDEX "VestMeasurement_orderItemId_typeId_key" ON "VestMeasurement"("orderItemId", "typeId");

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_pickupMethodId_fkey" FOREIGN KEY ("pickupMethodId") REFERENCES "PickupMethod"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_itemTypeId_fkey" FOREIGN KEY ("itemTypeId") REFERENCES "ItemType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JacketDetails" ADD CONSTRAINT "JacketDetails_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JacketDetails" ADD CONSTRAINT "JacketDetails_fabricId_fkey" FOREIGN KEY ("fabricId") REFERENCES "HeavyFabricMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JacketDetails" ADD CONSTRAINT "JacketDetails_patternId_fkey" FOREIGN KEY ("patternId") REFERENCES "JacketPatternMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JacketDetails" ADD CONSTRAINT "JacketDetails_bodyLiningId_fkey" FOREIGN KEY ("bodyLiningId") REFERENCES "BodyLiningMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JacketDetails" ADD CONSTRAINT "JacketDetails_bodyLiningOrientationId_fkey" FOREIGN KEY ("bodyLiningOrientationId") REFERENCES "OrientationType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JacketDetails" ADD CONSTRAINT "JacketDetails_sleeveLiningId_fkey" FOREIGN KEY ("sleeveLiningId") REFERENCES "SleeveLiningMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JacketDetails" ADD CONSTRAINT "JacketDetails_sleeveLiningOrientationId_fkey" FOREIGN KEY ("sleeveLiningOrientationId") REFERENCES "OrientationType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JacketDetails" ADD CONSTRAINT "JacketDetails_buttonId_fkey" FOREIGN KEY ("buttonId") REFERENCES "HeavyFabricButtonMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JacketDetails" ADD CONSTRAINT "JacketDetails_optionsId_fkey" FOREIGN KEY ("optionsId") REFERENCES "OptionMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JacketMeasurement" ADD CONSTRAINT "JacketMeasurement_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "JacketDetails"("orderItemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JacketMeasurement" ADD CONSTRAINT "JacketMeasurement_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "JacketMeasurementType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoatDetails" ADD CONSTRAINT "CoatDetails_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoatDetails" ADD CONSTRAINT "CoatDetails_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoatDetails" ADD CONSTRAINT "CoatDetails_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoatDetails" ADD CONSTRAINT "CoatDetails_fabricId_fkey" FOREIGN KEY ("fabricId") REFERENCES "HeavyFabricMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoatDetails" ADD CONSTRAINT "CoatDetails_patternId_fkey" FOREIGN KEY ("patternId") REFERENCES "CoatPatternMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoatDetails" ADD CONSTRAINT "CoatDetails_bodyLiningId_fkey" FOREIGN KEY ("bodyLiningId") REFERENCES "BodyLiningMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoatDetails" ADD CONSTRAINT "CoatDetails_bodyLiningOrientationId_fkey" FOREIGN KEY ("bodyLiningOrientationId") REFERENCES "OrientationType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoatDetails" ADD CONSTRAINT "CoatDetails_sleeveLiningId_fkey" FOREIGN KEY ("sleeveLiningId") REFERENCES "SleeveLiningMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoatDetails" ADD CONSTRAINT "CoatDetails_sleeveLiningOrientationId_fkey" FOREIGN KEY ("sleeveLiningOrientationId") REFERENCES "OrientationType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoatDetails" ADD CONSTRAINT "CoatDetails_buttonId_fkey" FOREIGN KEY ("buttonId") REFERENCES "HeavyFabricButtonMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoatDetails" ADD CONSTRAINT "CoatDetails_optionsId_fkey" FOREIGN KEY ("optionsId") REFERENCES "OptionMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeavyFabricMaster" ADD CONSTRAINT "HeavyFabricMaster_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoatMeasurement" ADD CONSTRAINT "CoatMeasurement_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "CoatDetails"("orderItemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoatMeasurement" ADD CONSTRAINT "CoatMeasurement_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "CoatMeasurementType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuitDetails" ADD CONSTRAINT "SuitDetails_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuitDetails" ADD CONSTRAINT "SuitDetails_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuitDetails" ADD CONSTRAINT "SuitDetails_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuitDetails" ADD CONSTRAINT "SuitDetails_fabricId_fkey" FOREIGN KEY ("fabricId") REFERENCES "HeavyFabricMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuitDetails" ADD CONSTRAINT "SuitDetails_jacketPatternId_fkey" FOREIGN KEY ("jacketPatternId") REFERENCES "SuitPatternMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuitDetails" ADD CONSTRAINT "SuitDetails_pantsPatternId_fkey" FOREIGN KEY ("pantsPatternId") REFERENCES "PantsPatternMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuitDetails" ADD CONSTRAINT "SuitDetails_bodyLiningId_fkey" FOREIGN KEY ("bodyLiningId") REFERENCES "BodyLiningMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuitDetails" ADD CONSTRAINT "SuitDetails_bodyLiningOrientationId_fkey" FOREIGN KEY ("bodyLiningOrientationId") REFERENCES "OrientationType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuitDetails" ADD CONSTRAINT "SuitDetails_sleeveLiningId_fkey" FOREIGN KEY ("sleeveLiningId") REFERENCES "SleeveLiningMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuitDetails" ADD CONSTRAINT "SuitDetails_sleeveLiningOrientationId_fkey" FOREIGN KEY ("sleeveLiningOrientationId") REFERENCES "OrientationType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuitDetails" ADD CONSTRAINT "SuitDetails_jacketButtonId_fkey" FOREIGN KEY ("jacketButtonId") REFERENCES "HeavyFabricButtonMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuitDetails" ADD CONSTRAINT "SuitDetails_pantsButtonId_fkey" FOREIGN KEY ("pantsButtonId") REFERENCES "HeavyFabricButtonMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuitDetails" ADD CONSTRAINT "SuitDetails_optionsId_fkey" FOREIGN KEY ("optionsId") REFERENCES "OptionMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuitJacketMeasurement" ADD CONSTRAINT "SuitJacketMeasurement_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "SuitDetails"("orderItemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuitJacketMeasurement" ADD CONSTRAINT "SuitJacketMeasurement_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "SuitJacketMeasurementType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuitPantsMeasurement" ADD CONSTRAINT "SuitPantsMeasurement_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "SuitDetails"("orderItemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuitPantsMeasurement" ADD CONSTRAINT "SuitPantsMeasurement_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "SuitPantsMeasurementType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PantsDetails" ADD CONSTRAINT "PantsDetails_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PantsDetails" ADD CONSTRAINT "PantsDetails_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PantsDetails" ADD CONSTRAINT "PantsDetails_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PantsDetails" ADD CONSTRAINT "PantsDetails_fabricId_fkey" FOREIGN KEY ("fabricId") REFERENCES "HeavyFabricMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PantsDetails" ADD CONSTRAINT "PantsDetails_patternId_fkey" FOREIGN KEY ("patternId") REFERENCES "PantsPatternMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PantsDetails" ADD CONSTRAINT "PantsDetails_buttonId_fkey" FOREIGN KEY ("buttonId") REFERENCES "HeavyFabricButtonMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PantsDetails" ADD CONSTRAINT "PantsDetails_optionsId_fkey" FOREIGN KEY ("optionsId") REFERENCES "OptionMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PantsMeasurement" ADD CONSTRAINT "PantsMeasurement_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "PantsDetails"("orderItemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PantsMeasurement" ADD CONSTRAINT "PantsMeasurement_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "PantsMeasurementType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VestDetails" ADD CONSTRAINT "VestDetails_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VestDetails" ADD CONSTRAINT "VestDetails_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VestDetails" ADD CONSTRAINT "VestDetails_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VestDetails" ADD CONSTRAINT "VestDetails_fabricId_fkey" FOREIGN KEY ("fabricId") REFERENCES "HeavyFabricMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VestDetails" ADD CONSTRAINT "VestDetails_patternId_fkey" FOREIGN KEY ("patternId") REFERENCES "VestPatternMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VestDetails" ADD CONSTRAINT "VestDetails_bodyLiningId_fkey" FOREIGN KEY ("bodyLiningId") REFERENCES "BodyLiningMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VestDetails" ADD CONSTRAINT "VestDetails_bodyLiningOrientationId_fkey" FOREIGN KEY ("bodyLiningOrientationId") REFERENCES "OrientationType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VestDetails" ADD CONSTRAINT "VestDetails_buttonId_fkey" FOREIGN KEY ("buttonId") REFERENCES "HeavyFabricButtonMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VestDetails" ADD CONSTRAINT "VestDetails_optionsId_fkey" FOREIGN KEY ("optionsId") REFERENCES "OptionMaster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VestMeasurement" ADD CONSTRAINT "VestMeasurement_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "VestDetails"("orderItemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VestMeasurement" ADD CONSTRAINT "VestMeasurement_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "VestMeasurementType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
