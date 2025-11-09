import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedMCodes() {
  console.log('🌱 Seeding MCode data...');

  // 既存データをクリア
  await prisma.mCode.deleteMany();

  // MCodeデータを挿入
  const mCodes = [
    // アイテムタイプ
    { category: 'ITEM_TYPE', code: 'JACKET', name: 'ジャケット', description: 'ジャケット', sortOrder: 1 },
    { category: 'ITEM_TYPE', code: 'VEST', name: 'ベスト', description: 'ベスト', sortOrder: 2 },
    { category: 'ITEM_TYPE', code: 'COAT', name: 'コート', description: 'コート', sortOrder: 3 },
    { category: 'ITEM_TYPE', code: 'PANTS', name: 'パンツ', description: 'パンツ', sortOrder: 4 },
    { category: 'ITEM_TYPE', code: 'SUIT', name: 'スーツ', description: 'スーツ', sortOrder: 5 },

    // プラン
    { category: 'PLAN', code: '01', name: 'パターンオーダー 基本', description: 'パターンオーダー 基本', sortOrder: 1 },
    { category: 'PLAN', code: '02', name: 'フルオーダー', description: 'フルオーダー', sortOrder: 2 },
    { category: 'PLAN', code: '03', name: 'ベーシックオーダー', description: 'ベーシックオーダープラン', sortOrder: 3 },
    { category: 'PLAN', code: '04', name: 'カスタムオーダー', description: 'カスタムオーダープラン', sortOrder: 4 },
    { category: 'PLAN', code: '05', name: 'フルオーダー', description: 'フルオーダー', sortOrder: 5 },

    // 受取方法
    { category: 'PICKUP_METHOD', code: 'STORE', name: 'ご来店', description: '来店での受取', sortOrder: 1 },
    { category: 'PICKUP_METHOD', code: 'DELIVERY', name: '配送', description: '配送での受取', sortOrder: 2 },

    // シーズン
    { category: 'SEASON', code: '1', name: 'SS重衣料', description: 'SS重衣料', sortOrder: 1 },
    { category: 'SEASON', code: '3', name: 'AW重衣料', description: 'AW重衣料', sortOrder: 2 },
    { category: 'SEASON', code: '5', name: 'SSシャツ', description: 'SSシャツ', sortOrder: 3 },
    { category: 'SEASON', code: '7', name: 'AWシャツ', description: 'AWシャツ', sortOrder: 4 },

    // 向きタイプ
    { category: 'ORIENTATION', code: 'NORMAL', name: '正', description: '正方向', sortOrder: 1 },
    { category: 'ORIENTATION', code: 'REVERSE', name: '逆', description: '逆方向', sortOrder: 2 },

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
