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

  // suppliers
  await prisma.supplier.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      code: 'SUP001',
      name: 'サンプル仕入先1',
      contactEmail: 'supplier1@example.com',
      contactPhone: '03-1234-5678',
    },
  });

  // heavy fabric masters
  await prisma.heavyFabricMaster.upsert({
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
  });

  await prisma.heavyFabricMaster.upsert({
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
  });

  // Pattern Masters
  // Jacket Pattern
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

  // Suit Pattern
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

  // Vest Pattern
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

  // Coat Pattern
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

  // Pants Pattern
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

  // Body Lining Masters
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

  await prisma.bodyLiningMaster.upsert({
    where: { productNo: 'BL002' },
    update: {},
    create: {
      productNo: 'BL002',
      colorNo: 'C002',
      orientation: '逆',
      stockFlag: true,
    },
  });

  await prisma.bodyLiningMaster.upsert({
    where: { productNo: 'BL003' },
    update: {},
    create: {
      productNo: 'BL003',
      colorNo: 'C003',
      orientation: '正',
      stockFlag: false,
    },
  });

  // Sleeve Lining Masters
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

  await prisma.sleeveLiningMaster.upsert({
    where: { productNo: 'SL002' },
    update: {},
    create: {
      productNo: 'SL002',
      colorNo: 'C002',
      orientation: '逆',
      stockFlag: true,
    },
  });

  await prisma.sleeveLiningMaster.upsert({
    where: { productNo: 'SL003' },
    update: {},
    create: {
      productNo: 'SL003',
      colorNo: 'C003',
      orientation: '正',
      stockFlag: false,
    },
  });

  // Heavy Fabric Button Masters
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

  await prisma.heavyFabricButtonMaster.upsert({
    where: { id: 2 },
    update: {},
    create: {
      productNo: 'HORN',
      colorNo: 'LB',
      pantsProductNo: 'HORN',
      pantsColorNo: 'LB',
      cost1: 4020,
      cost2: 4910,
      cost3: 3020,
      cost4: 3900,
      cost5: null,
      cost6: null,
      cost7: 1010,
      cost8: 1460,
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

  await prisma.heavyFabricButtonMaster.upsert({
    where: { id: 3 },
    update: {},
    create: {
      productNo: 'CORO SHELL',
      colorNo: 'タカセ',
      pantsProductNo: 'CORO SHELL',
      pantsColorNo: 'タカセ',
      cost1: 700,
      cost2: 900,
      cost3: 600,
      cost4: 700,
      cost5: null,
      cost6: null,
      cost7: 200,
      cost8: 200,
      retailPrice1: 3000,
      retailPrice2: 3000,
      retailPrice3: 2000,
      retailPrice4: 3000,
      retailPrice5: null,
      retailPrice6: null,
      retailPrice7: 1000,
      retailPrice8: 1000,
    },
  });

  // Option Masters
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

  await prisma.optionMaster.upsert({
    where: { id: 2 },
    update: {},
    create: {
      optionName: '特別仕様',
      cost: 3000,
      retailPrice: 6000,
      textContent: '特別な仕様やデザインの追加',
    },
  });

  await prisma.optionMaster.upsert({
    where: { id: 3 },
    update: {},
    create: {
      optionName: '急ぎ仕上げ',
      cost: 2000,
      retailPrice: 4000,
      textContent: '通常より早い仕上げサービス',
    },
  });

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
