import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // plans
  await prisma.plan.upsert({ where: { id: 1 }, update: {}, create: { id: 1, code: 'basic', name: 'ベーシックオーダー' } });
  await prisma.plan.upsert({ where: { id: 2 }, update: {}, create: { id: 2, code: 'custom', name: 'カスタムオーダー' } });
  await prisma.plan.upsert({ where: { id: 3 }, update: {}, create: { id: 3, code: 'full', name: 'フルオーダー' } });

  // item types
  await prisma.itemType.upsert({ where: { id: 1 }, update: {}, create: { id: 1, code: 'jacket', name: 'ジャケット' } });
  await prisma.itemType.upsert({ where: { id: 2 }, update: {}, create: { id: 2, code: 'suit', name: 'スーツ' } });
  await prisma.itemType.upsert({ where: { id: 3 }, update: {}, create: { id: 3, code: 'pants', name: 'パンツ' } });
  await prisma.itemType.upsert({ where: { id: 4 }, update: {}, create: { id: 4, code: 'vest', name: 'ベスト' } });
  await prisma.itemType.upsert({ where: { id: 5 }, update: {}, create: { id: 5, code: 'coat', name: 'コート' } });

  // pickup methods
  await prisma.pickupMethod.upsert({ where: { id: 1 }, update: {}, create: { id: 1, code: 'in_store', name: '店頭受取' } });
  await prisma.pickupMethod.upsert({ where: { id: 2 }, update: {}, create: { id: 2, code: 'delivery', name: '配送' } });
  await prisma.pickupMethod.upsert({ where: { id: 3 }, update: {}, create: { id: 3, code: 'other', name: 'その他' } });

  // orientation
  await prisma.orientationType.upsert({ where: { id: 1 }, update: {}, create: { id: 1, code: 'normal', name: '正' } });
  await prisma.orientationType.upsert({ where: { id: 2 }, update: {}, create: { id: 2, code: 'reverse', name: '逆' } });

  // measurement types can be added similarly later
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
