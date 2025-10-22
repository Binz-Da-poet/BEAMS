import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting improved seed...');

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
  const users = await Promise.all([
    // Admin user
    prisma.user.upsert({
      where: { username: 'admin' },
      update: {},
      create: {
        username: 'admin',
        password: '$2b$10$rQZ8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q', // hashed password
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
        password: '$2b$10$rQZ8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q',
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
        password: '$2b$10$rQZ8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q',
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
        password: '$2b$10$rQZ8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q',
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
        password: '$2b$10$rQZ8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q8kF5Q',
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

  // ===== CREATE SAMPLE ORDERS =====
  console.log('📦 Creating sample orders...');
  const orders = await Promise.all([
    prisma.order.create({
      data: {
        storeId: stores[0].id,
        customerId: customers[0].id,
        planId: plans[0].id,
        statusId: 2, // PENDING
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
              staffId: 1, // Assuming staff ID 1 exists
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
        statusId: 3, // CONFIRMED
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
              staffId: 2, // Assuming staff ID 2 exists
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
        statusId: 1, // DRAFT
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
        statusId: 2, // PENDING
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

  console.log('✅ Improved seed completed successfully!');
  console.log(`📊 Created:`);
  console.log(`   - ${stores.length} stores`);
  console.log(`   - ${users.length} users`);
  console.log(`   - ${customers.length} customers`);
  console.log(`   - ${plans.length} plans`);
  console.log(`   - ${itemTypes.length} item types`);
  console.log(`   - ${pickupMethods.length} pickup methods`);
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
