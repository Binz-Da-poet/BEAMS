import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedMCodes() {
  console.log('🌱 Seeding MCode data...');

  // Clear existing data
  await prisma.mCode.deleteMany();

  // Insert MCode data
  const mCodes = [
    // Item Types
    { category: 'ITEM_TYPE', code: '1', name: 'ジャケット', description: 'ジャケット', sortOrder: 1 },
    { category: 'ITEM_TYPE', code: '2', name: 'ベスト', description: 'ベスト', sortOrder: 2 },
    { category: 'ITEM_TYPE', code: '3', name: 'コート', description: 'コート', sortOrder: 3 },
    { category: 'ITEM_TYPE', code: '4', name: 'パンツ', description: 'パンツ', sortOrder: 4 },
    { category: 'ITEM_TYPE', code: '5', name: 'スーツ', description: 'スーツ', sortOrder: 5 },

    // Plans
    { category: 'PLAN', code: '1', name: 'プラン1', description: 'プラン1', sortOrder: 1 },
    { category: 'PLAN', code: '2', name: 'プラン2', description: 'プラン2', sortOrder: 2 },
    { category: 'PLAN', code: '3', name: 'プラン3', description: 'プラン3', sortOrder: 3 },

    // Pickup Methods
    { category: 'PICKUP_METHOD', code: '1', name: '店舗受取', description: '店舗での受取', sortOrder: 1 },
    { category: 'PICKUP_METHOD', code: '2', name: '宅配便', description: '宅配便での配送', sortOrder: 2 },
    { category: 'PICKUP_METHOD', code: '3', name: '直接配送', description: '直接配送', sortOrder: 3 },

    // Orientation Types
    { category: 'ORIENTATION', code: '1', name: '通常', description: '通常の向き', sortOrder: 1 },
    { category: 'ORIENTATION', code: '2', name: '逆', description: '逆の向き', sortOrder: 2 },

    // Seasons
    { category: 'SEASON', code: '1', name: '春夏', description: '春夏シーズン', sortOrder: 1 },
    { category: 'SEASON', code: '2', name: '秋冬', description: '秋冬シーズン', sortOrder: 2 },

    // Order Priorities
    { category: 'ORDER_PRIORITY', code: 'LOW', name: '低', description: '低優先度', sortOrder: 1 },
    { category: 'ORDER_PRIORITY', code: 'NORMAL', name: '通常', description: '通常優先度', sortOrder: 2 },
    { category: 'ORDER_PRIORITY', code: 'HIGH', name: '高', description: '高優先度', sortOrder: 3 },
    { category: 'ORDER_PRIORITY', code: 'URGENT', name: '緊急', description: '緊急優先度', sortOrder: 4 },

    // User Roles
    { category: 'USER_ROLE', code: 'ADMIN', name: '管理者', description: 'システム管理者', sortOrder: 1 },
    { category: 'USER_ROLE', code: 'STORE_MANAGER', name: '店長', description: '店舗管理者', sortOrder: 2 },
    { category: 'USER_ROLE', code: 'STORE_STAFF', name: '店員', description: '店舗スタッフ', sortOrder: 3 },
    { category: 'USER_ROLE', code: 'FACTORY_MANAGER', name: '工場長', description: '工場管理者', sortOrder: 4 },
    { category: 'USER_ROLE', code: 'FACTORY_STAFF', name: '工場員', description: '工場スタッフ', sortOrder: 5 },

    // Document Types
    { category: 'DOCUMENT_TYPE', code: 'FABRIC_ORDER_SHEET', name: '生地発注書', description: '生地発注書', sortOrder: 1 },
    { category: 'DOCUMENT_TYPE', code: 'FACTORY_ORDER_SHEET', name: '工場発注書', description: '工場発注書', sortOrder: 2 },
    { category: 'DOCUMENT_TYPE', code: 'CUSTOMER_ORDER_SHEET', name: 'お客様注文書', description: 'お客様注文書', sortOrder: 3 },
    { category: 'DOCUMENT_TYPE', code: 'MEASUREMENT_SHEET', name: '採寸表', description: '採寸表', sortOrder: 4 },

    // Notification Types
    { category: 'NOTIFICATION_TYPE', code: 'ORDER_CREATED', name: '注文作成', description: '注文が作成されました', sortOrder: 1 },
    { category: 'NOTIFICATION_TYPE', code: 'ORDER_UPDATED', name: '注文更新', description: '注文が更新されました', sortOrder: 2 },
    { category: 'NOTIFICATION_TYPE', code: 'ORDER_STATUS_CHANGED', name: 'ステータス変更', description: '注文ステータスが変更されました', sortOrder: 3 },
    { category: 'NOTIFICATION_TYPE', code: 'PDF_GENERATED', name: 'PDF生成', description: 'PDFが生成されました', sortOrder: 4 },
    { category: 'NOTIFICATION_TYPE', code: 'SYSTEM_ALERT', name: 'システムアラート', description: 'システムアラート', sortOrder: 5 },
  ];

  for (const mCode of mCodes) {
    await prisma.mCode.create({
      data: mCode,
    });
  }

  console.log('✅ MCode data seeded successfully!');
}

async function main() {
  try {
    await seedMCodes();
  } catch (error) {
    console.error('❌ Error seeding MCode data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  main();
}

export { seedMCodes };
