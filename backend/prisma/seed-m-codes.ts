import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedMCodes() {
  console.log('🌱 Seeding MCode data...');

  // 既存データをクリア
  await prisma.mCode.deleteMany();

  // MCodeデータを挿入
  const mCodes = [
    // アイテムタイプ
    { category: 'ITEM_TYPE', code: '1', name: 'ジャケット', description: 'ジャケット', sortOrder: 1 },
    { category: 'ITEM_TYPE', code: '2', name: 'ベスト', description: 'ベスト', sortOrder: 2 },
    { category: 'ITEM_TYPE', code: '3', name: 'コート', description: 'コート', sortOrder: 3 },
    { category: 'ITEM_TYPE', code: '4', name: 'パンツ', description: 'パンツ', sortOrder: 4 },
    { category: 'ITEM_TYPE', code: '5', name: 'スーツ', description: 'スーツ', sortOrder: 5 },

    // プラン
    { category: 'PLAN', code: '1', name: 'プラン1', description: 'プラン1', sortOrder: 1 },
    { category: 'PLAN', code: '2', name: 'プラン2', description: 'プラン2', sortOrder: 2 },
    { category: 'PLAN', code: '3', name: 'プラン3', description: 'プラン3', sortOrder: 3 },

    // 受取方法
    { category: 'PICKUP_METHOD', code: '1', name: '来店受取', description: '来店での受取', sortOrder: 1 },
    { category: 'PICKUP_METHOD', code: '2', name: '配送', description: '配送での配送', sortOrder: 2 },

    // 向きタイプ
    { category: 'ORIENTATION', code: '1', name: '通常', description: '通常の向き', sortOrder: 1 },
    { category: 'ORIENTATION', code: '2', name: '逆', description: '逆の向き', sortOrder: 2 },

    // シーズン
    { category: 'SEASON', code: '1', name: '春夏', description: '春夏シーズン', sortOrder: 1 },
    { category: 'SEASON', code: '2', name: '秋冬', description: '秋冬シーズン', sortOrder: 2 },

    // 注文優先度
    { category: 'ORDER_PRIORITY', code: 'LOW', name: '低', description: '低優先度', sortOrder: 1 },
    { category: 'ORDER_PRIORITY', code: 'NORMAL', name: '通常', description: '通常優先度', sortOrder: 2 },
    { category: 'ORDER_PRIORITY', code: 'HIGH', name: '高', description: '高優先度', sortOrder: 3 },
    { category: 'ORDER_PRIORITY', code: 'URGENT', name: '緊急', description: '緊急優先度', sortOrder: 4 },

    // ユーザーロール
    { category: 'USER_ROLE', code: 'ADMIN', name: '管理者', description: 'システム管理者', sortOrder: 1 },
    { category: 'USER_ROLE', code: 'STORE', name: '店舗', description: '店舗で受注対応を行うユーザー', sortOrder: 2 },
    { category: 'USER_ROLE', code: 'FACTORY_STAFF', name: '工場', description: '工場で受注処理を行うユーザー', sortOrder: 3 },

    // 通知タイプ
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
