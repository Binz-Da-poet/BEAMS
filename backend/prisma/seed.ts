import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting unified seed...');

  // ===== CREATE ORDER STATUSES =====
  console.log('📊 Creating order statuses...');
  const orderStatuses = await Promise.all([
    prisma.orderStatus.upsert({
      where: { code: 'DRAFT' },
      update: {},
      create: {
        name: '下書き',
        code: 'DRAFT',
        description: '下書き状態',
        sortOrder: 1,
        color: '#6B7280',
        isActive: true,
      },
    }),
    prisma.orderStatus.upsert({
      where: { code: 'PENDING' },
      update: {},
      create: {
        name: '受付済み',
        code: 'PENDING',
        description: '受付完了、確認待ち',
        sortOrder: 2,
        color: '#F59E0B',
        isActive: true,
      },
    }),
    prisma.orderStatus.upsert({
      where: { code: 'CONFIRMED' },
      update: {},
      create: {
        name: '確認済み',
        code: 'CONFIRMED',
        description: '工場確認完了',
        sortOrder: 3,
        color: '#3B82F6',
        isActive: true,
      },
    }),
    prisma.orderStatus.upsert({
      where: { code: 'IN_PROGRESS' },
      update: {},
      create: {
        name: '製作中',
        code: 'IN_PROGRESS',
        description: '製作進行中',
        sortOrder: 4,
        color: '#8B5CF6',
        isActive: true,
      },
    }),
    prisma.orderStatus.upsert({
      where: { code: 'COMPLETED' },
      update: {},
      create: {
        name: '完成',
        code: 'COMPLETED',
        description: '製作完了',
        sortOrder: 5,
        color: '#10B981',
        isActive: true,
      },
    }),
    prisma.orderStatus.upsert({
      where: { code: 'DELIVERED' },
      update: {},
      create: {
        name: '配送済み',
        code: 'DELIVERED',
        description: 'お客様にお届け完了',
        sortOrder: 6,
        color: '#059669',
        isActive: true,
      },
    }),
  ]);

  // ===== CREATE STORES =====
  console.log('📦 Creating stores...');
  const stores = await Promise.all([
    prisma.store.upsert({
      where: { code: 'ST001' },
      update: {},
      create: {
        name: 'BEAMS 新宿店',
        code: 'ST001',
        address: '東京都新宿区新宿3-26-13',
        phone: '03-3354-1234',
        email: 'shinjuku@beams.co.jp',
        region: '関東',
        managerName: '田中太郎',
        isActive: true,
      },
    }),
    prisma.store.upsert({
      where: { code: 'ST002' },
      update: {},
      create: {
        name: 'BEAMS 渋谷店',
        code: 'ST002',
        address: '東京都渋谷区道玄坂2-29-19',
        phone: '03-3461-5678',
        email: 'shibuya@beams.co.jp',
        region: '関東',
        managerName: '佐藤花子',
        isActive: true,
      },
    }),
    prisma.store.upsert({
      where: { code: 'ST003' },
      update: {},
      create: {
        name: 'BEAMS 大阪店',
        code: 'ST003',
        address: '大阪府大阪市北区梅田1-1-1',
        phone: '06-1234-5678',
        email: 'osaka@beams.co.jp',
        region: '関西',
        managerName: '山田次郎',
        isActive: true,
      },
    }),
  ]);

  // ===== CREATE USERS =====
  console.log('👥 Creating users...');
  const hashedPassword = await bcrypt.hash('password123', 10);

  const users = await Promise.all([
    // Admin user
    prisma.user.upsert({
      where: { username: 'admin' },
      update: {},
      create: {
        username: 'admin',
        password: hashedPassword,
        email: 'admin@beams.co.jp',
        phone: '03-1234-5678',
        role: 'ADMIN',
        isActive: true,
      },
    }),
    // Store managers
    prisma.user.upsert({
      where: { username: 'store_manager_001' },
      update: {},
      create: {
        username: 'store_manager_001',
        password: hashedPassword,
        email: 'manager.shinjuku@beams.co.jp',
        phone: '03-3354-1234',
        role: 'STORE_MANAGER',
        storeId: stores[0].id,
        isActive: true,
      },
    }),
    prisma.user.upsert({
      where: { username: 'store_staff_001' },
      update: {},
      create: {
        username: 'store_staff_001',
        password: hashedPassword,
        email: 'staff.shinjuku@beams.co.jp',
        phone: '03-3354-1235',
        role: 'STORE_STAFF',
        storeId: stores[0].id,
        isActive: true,
      },
    }),
    // Factory users
    prisma.user.upsert({
      where: { username: 'factory_manager' },
      update: {},
      create: {
        username: 'factory_manager',
        password: hashedPassword,
        email: 'factory.manager@beams.co.jp',
        phone: '03-9876-5432',
        role: 'FACTORY_MANAGER',
        isActive: true,
      },
    }),
    prisma.user.upsert({
      where: { username: 'factory_staff_001' },
      update: {},
      create: {
        username: 'factory_staff_001',
        password: hashedPassword,
        email: 'factory.staff@beams.co.jp',
        phone: '03-9876-5433',
        role: 'FACTORY_STAFF',
        isActive: true,
      },
    }),
  ]);

  // ===== CREATE CUSTOMERS =====
  console.log('👤 Creating customers...');
  const customers = await Promise.all([
    prisma.customer.upsert({
      where: { customerCode: 'CUST001' },
      update: {},
      create: {
        name: '山田太郎',
        kana: 'ヤマダタロウ',
        phone: '090-1234-5678',
        email: 'yamada@example.com',
        customerCode: 'CUST001',
        address: '東京都渋谷区恵比寿1-1-1',
        birthDate: new Date('1985-05-15'),
        isActive: true,
      },
    }),
    prisma.customer.upsert({
      where: { customerCode: 'CUST002' },
      update: {},
      create: {
        name: '佐藤花子',
        kana: 'サトウハナコ',
        phone: '090-2345-6789',
        email: 'sato@example.com',
        customerCode: 'CUST002',
        address: '東京都新宿区西新宿2-2-2',
        birthDate: new Date('1990-08-20'),
        isActive: true,
      },
    }),
    prisma.customer.upsert({
      where: { customerCode: 'CUST003' },
      update: {},
      create: {
        name: '田中次郎',
        kana: 'タナカジロウ',
        phone: '090-3456-7890',
        email: 'tanaka@example.com',
        customerCode: 'CUST003',
        address: '大阪府大阪市北区梅田3-3-3',
        birthDate: new Date('1988-12-10'),
        isActive: true,
      },
    }),
  ]);

  // ===== CREATE PLANS =====
  console.log('📋 Creating plans...');
  const plans = await Promise.all([
    prisma.plan.upsert({
      where: { code: 'BASIC' },
      update: {},
      create: {
        id: 1,
        code: 'BASIC',
        name: 'ベーシックオーダー',
      },
    }),
    prisma.plan.upsert({
      where: { code: 'CUSTOM' },
      update: {},
      create: {
        id: 2,
        code: 'CUSTOM',
        name: 'カスタムオーダー',
      },
    }),
    prisma.plan.upsert({
      where: { code: 'FULL' },
      update: {},
      create: {
        id: 3,
        code: 'FULL',
        name: 'フルオーダー',
      },
    }),
  ]);

  // ===== CREATE ITEM TYPES =====
  console.log('👔 Creating item types...');
  const itemTypes = await Promise.all([
    prisma.itemType.upsert({
      where: { code: 'JACKET' },
      update: {},
      create: {
        id: 1,
        code: 'JACKET',
        name: 'ジャケット',
      },
    }),
    prisma.itemType.upsert({
      where: { code: 'COAT' },
      update: {},
      create: {
        id: 2,
        code: 'COAT',
        name: 'コート',
      },
    }),
    prisma.itemType.upsert({
      where: { code: 'SUIT' },
      update: {},
      create: {
        id: 3,
        code: 'SUIT',
        name: 'スーツ',
      },
    }),
    prisma.itemType.upsert({
      where: { code: 'PANTS' },
      update: {},
      create: {
        id: 4,
        code: 'PANTS',
        name: 'パンツ',
      },
    }),
    prisma.itemType.upsert({
      where: { code: 'VEST' },
      update: {},
      create: {
        id: 5,
        code: 'VEST',
        name: 'ベスト',
      },
    }),
  ]);

  // ===== CREATE PICKUP METHODS =====
  console.log('🚚 Creating pickup methods...');
  const pickupMethods = await Promise.all([
    prisma.pickupMethod.upsert({
      where: { code: 'STORE' },
      update: {},
      create: {
        id: 1,
        code: 'STORE',
        name: '店舗受取',
      },
    }),
    prisma.pickupMethod.upsert({
      where: { code: 'DELIVERY' },
      update: {},
      create: {
        id: 2,
        code: 'DELIVERY',
        name: '配送',
      },
    }),
  ]);

  // ===== CREATE ORIENTATION TYPES =====
  console.log('🧭 Creating orientation types...');
  const orientationTypes = await Promise.all([
    prisma.orientationType.upsert({
      where: { code: 'NORMAL' },
      update: {},
      create: {
        id: 1,
        code: 'NORMAL',
        name: '正',
      },
    }),
    prisma.orientationType.upsert({
      where: { code: 'REVERSE' },
      update: {},
      create: {
        id: 2,
        code: 'REVERSE',
        name: '逆',
      },
    }),
  ]);

  // ===== CREATE SUPPLIERS =====
  console.log('🏭 Creating suppliers...');
  const suppliers = await Promise.all([
    prisma.supplier.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        code: 'SUP001',
        name: 'サンプル仕入先1',
        contactEmail: 'supplier1@example.com',
        contactPhone: '03-1234-5678',
        note: '高品質な生地を提供',
      },
    }),
    prisma.supplier.upsert({
      where: { id: 2 },
      update: {},
      create: {
        id: 2,
        code: 'SUP002',
        name: 'サンプル仕入先2',
        contactEmail: 'supplier2@example.com',
        contactPhone: '03-2345-6789',
        note: 'カスタム仕様対応可能',
      },
    }),
  ]);

  // ===== CREATE HEAVY FABRIC MASTERS =====
  console.log('🧵 Creating heavy fabric masters...');
  const fabrics = await Promise.all([
    prisma.heavyFabricMaster.upsert({
      where: { fabricNo: 'FAB001' },
      update: {},
      create: {
        fabricNo: 'FAB001',
        supplierNo: 'SUP001',
        fabricMaker: 'サンプルメーカー1',
        color: 'ネイビー',
        pattern: '無地',
        composition: 'ウール100%',
        characteristics: '高級感のある質感',
        fairFabricUnitPrice: 15000,
        fairFabricRank: 'A',
        regularFabricUnitPrice: 12000,
        regularFabricRank: 'B',
        dataUpdated: new Date(),
        largePattern: false,
        transparent: false,
        stockFlag: true,
        supplierId: 1,
      },
    }),
    prisma.heavyFabricMaster.upsert({
      where: { fabricNo: 'FAB002' },
      update: {},
      create: {
        fabricNo: 'FAB002',
        supplierNo: 'SUP001',
        fabricMaker: 'サンプルメーカー1',
        color: 'グレー',
        pattern: 'ストライプ',
        composition: 'ウール80% ポリエステル20%',
        characteristics: 'しわになりにくい',
        fairFabricUnitPrice: 12000,
        fairFabricRank: 'B',
        regularFabricUnitPrice: 10000,
        regularFabricRank: 'C',
        dataUpdated: new Date(),
        largePattern: false,
        transparent: false,
        stockFlag: true,
        supplierId: 1,
      },
    }),
  ]);

  // ===== CREATE PATTERN MASTERS =====
  console.log('📐 Creating pattern masters...');

  // Jacket Patterns
  await prisma.jacketPatternMaster.upsert({
    where: { patternNo: 'JKT001' },
    update: {},
    create: {
      patternNo: 'JKT001',
      size: 'M',
      length: 70.0,
      shoulderWidth: 45.0,
      bust: 100.0,
      waist: 90.0,
      hip: 105.0,
      sleeveLength: 60.0,
      sleeveWidth: 15.0,
      lapelWidth: 8.0,
      stitchSpec: 'ステッチ仕様1',
      liningSpec: '裏仕様1',
      defaultButtonCount: 3,
    },
  });

  // Suit Patterns
  await prisma.suitPatternMaster.upsert({
    where: { patternNo: 'SUIT001' },
    update: {},
    create: {
      patternNo: 'SUIT001',
      size: 'M',
      length: 70.0,
      shoulderWidth: 45.0,
      bust: 100.0,
      waist: 90.0,
      hip: 105.0,
      sleeveLength: 60.0,
      sleeveWidth: 15.0,
      lapelWidth: 8.0,
      stitchSpec: 'ステッチ仕様1',
      defaultButtonCount: 3,
    },
  });

  // Vest Patterns
  await prisma.vestPatternMaster.upsert({
    where: { patternNo: 'VEST001' },
    update: {},
    create: {
      patternNo: 'VEST001',
      size: 'M',
      length: 65.0,
      shoulderWidth: 45.0,
      bust: 100.0,
      waist: 90.0,
      stitchSpec: 'ステッチ仕様1',
      defaultButtonCount: 5,
    },
  });

  // Coat Patterns
  await prisma.coatPatternMaster.upsert({
    where: { patternNo: 'COAT001' },
    update: {},
    create: {
      patternNo: 'COAT001',
      size: 'M',
      length: 110.0,
      shoulderWidth: 50.0,
      bust: 110.0,
      waist: 100.0,
      hip: 115.0,
      sleeveLength: 65.0,
      sleeveWidth: 18.0,
      lapelWidth: 10.0,
      stitchSpec: 'ステッチ仕様1',
    },
  });

  // Pants Patterns
  await prisma.pantsPatternMaster.upsert({
    where: { patternNo: 'PANTS001' },
    update: {},
    create: {
      patternNo: 'PANTS001',
      size: 'M',
      waist: 85.0,
      hip: 100.0,
      crotchWidth: 30.0,
      kneeWidth: 22.0,
      hemWidth: 20.0,
      rise: 28.0,
      inseam: 80.0,
      stitchSpec: 'ステッチ仕様1',
    },
  });

  // ===== CREATE LINING MASTERS =====
  console.log('🧵 Creating lining masters...');

  // Body Lining
  await prisma.bodyLiningMaster.upsert({
    where: { productNo: 'BL001' },
    update: {},
    create: {
      productNo: 'BL001',
      colorNo: 'C001',
      orientation: '正',
      stockFlag: true,
    },
  });

  // Sleeve Lining
  await prisma.sleeveLiningMaster.upsert({
    where: { productNo: 'SL001' },
    update: {},
    create: {
      productNo: 'SL001',
      colorNo: 'C001',
      orientation: '正',
      stockFlag: true,
    },
  });

  // ===== CREATE BUTTON MASTERS =====
  console.log('🔘 Creating button masters...');
  await prisma.heavyFabricButtonMaster.upsert({
    where: { id: 1 },
    update: {},
    create: {
      productNo: 'BF-31',
      colorNo: '4',
      pantsProductNo: 'BF-2',
      pantsColorNo: '4',
      cost1: 0,
      cost2: 0,
      cost3: 0,
      cost4: 0,
      cost5: null,
      cost6: null,
      cost7: 0,
      cost8: 0,
      retailPrice1: 0,
      retailPrice2: 0,
      retailPrice3: 0,
      retailPrice4: 0,
      retailPrice5: null,
      retailPrice6: null,
      retailPrice7: 0,
      retailPrice8: 0,
    },
  });

  // ===== CREATE OPTION MASTERS =====
  console.log('⚙️ Creating option masters...');
  await prisma.optionMaster.upsert({
    where: { id: 1 },
    update: {},
    create: {
      optionName: 'カスタムフィッティング',
      cost: 5000,
      retailPrice: 10000,
      textContent: 'お客様の体型に合わせたカスタムフィッティングサービス',
    },
  });

  // ===== CREATE SAMPLE ORDERS =====
  console.log('📦 Creating sample orders...');
  const orders = await Promise.all([
    prisma.order.create({
      data: {
        storeId: stores[0].id,
        customerId: customers[0].id,
        planId: plans[0].id,
        statusId: orderStatuses[1].id, // PENDING
        receptionDate: new Date(),
        expectedStoreArrivalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        pickupMethodId: pickupMethods[0].id,
        salesPrice: 150000,
        orderNo: 'ORD-2025-001',
        notes: '初回オーダー',
        priority: 'NORMAL',
        isUrgent: false,
        createdBy: users[1].id, // Store manager
        items: {
          create: [
            {
              itemTypeId: itemTypes[0].id, // Jacket
              quantity: 1,
              unitPrice: 150000,
              jacketDetails: {
                create: {
                  fabricNo: 'FAB-001',
                  patternNo: 'PAT-001',
                  sizeLabel: 'M',
                  bastedFitting: true,
                  remarks: '標準仕様',
                },
              },
            },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        storeId: stores[1].id,
        customerId: customers[1].id,
        planId: plans[1].id,
        statusId: orderStatuses[2].id, // CONFIRMED
        receptionDate: new Date(),
        expectedStoreArrivalDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
        pickupMethodId: pickupMethods[1].id,
        salesPrice: 200000,
        orderNo: 'ORD-2025-002',
        notes: 'カスタムオーダー',
        priority: 'HIGH',
        isUrgent: false,
        createdBy: users[2].id, // Store staff
        items: {
          create: [
            {
              itemTypeId: itemTypes[2].id, // Suit
              quantity: 1,
              unitPrice: 200000,
              suitDetails: {
                create: {
                  fabricNo: 'FAB-002',
                  jacketPatternNo: 'PAT-002',
                  pantsPatternNo: 'PAT-003',
                  jacketSizeLabel: 'L',
                  pantsSizeLabel: 'L',
                  bastedFitting: true,
                  remarks: 'カスタム仕様',
                },
              },
            },
          ],
        },
      },
    }),
  ]);

  // ===== CREATE SAMPLE NOTIFICATIONS =====
  console.log('🔔 Creating sample notifications...');
  await Promise.all([
    prisma.notification.create({
      data: {
        userId: users[1].id,
        title: '新しいオーダーが作成されました',
        message: `オーダー ${orders[0].orderNo} が作成されました`,
        type: 'ORDER_CREATED',
        data: {
          orderId: orders[0].id,
          orderNo: orders[0].orderNo,
        },
      },
    }),
    prisma.notification.create({
      data: {
        userId: users[3].id, // Factory manager
        title: 'オーダー確認待ち',
        message: `オーダー ${orders[1].orderNo} の確認をお願いします`,
        type: 'ORDER_UPDATED',
        data: {
          orderId: orders[1].id,
          orderNo: orders[1].orderNo,
        },
      },
    }),
  ]);

  // ===== CREATE SAMPLE ORDER LOGS =====
  console.log('📝 Creating sample order logs...');
  await Promise.all([
    prisma.orderLog.create({
      data: {
        orderId: orders[0].id,
        userId: users[1].id,
        statusId: orderStatuses[0].id, // DRAFT
        action: 'CREATED',
        description: 'オーダーが作成されました',
        newValues: {
          orderNo: orders[0].orderNo,
          status: 'DRAFT',
        },
      },
    }),
    prisma.orderLog.create({
      data: {
        orderId: orders[0].id,
        userId: users[1].id,
        statusId: orderStatuses[1].id, // PENDING
        action: 'STATUS_CHANGED',
        description: 'ステータスが受付済みに変更されました',
        oldValues: {
          status: 'DRAFT',
        },
        newValues: {
          status: 'PENDING',
        },
      },
    }),
  ]);

  console.log('✅ Unified seed completed successfully!');
  console.log(`📊 Created:`);
  console.log(`   - ${orderStatuses.length} order statuses`);
  console.log(`   - ${stores.length} stores`);
  console.log(`   - ${users.length} users`);
  console.log(`   - ${customers.length} customers`);
  console.log(`   - ${plans.length} plans`);
  console.log(`   - ${itemTypes.length} item types`);
  console.log(`   - ${pickupMethods.length} pickup methods`);
  console.log(`   - ${orientationTypes.length} orientation types`);
  console.log(`   - ${suppliers.length} suppliers`);
  console.log(`   - ${fabrics.length} fabric masters`);
  console.log(`   - 5 pattern masters`);
  console.log(`   - 2 lining masters`);
  console.log(`   - 1 button master`);
  console.log(`   - 1 option master`);
  console.log(`   - ${orders.length} orders`);
  console.log(`   - 2 notifications`);
  console.log(`   - 2 order logs`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
