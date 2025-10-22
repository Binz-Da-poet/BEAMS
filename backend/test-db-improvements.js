// Test script to validate database improvements
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testDatabaseImprovements() {
  console.log('🧪 Testing Database Improvements...\n');

  try {
    // Test 1: Check if new tables exist
    console.log('1️⃣ Testing new tables...');

    const userCount = await prisma.user.count();
    console.log(`   ✅ Users table: ${userCount} records`);

    const orderStatusCount = await prisma.orderStatus.count();
    console.log(`   ✅ Order Statuses table: ${orderStatusCount} records`);

    const orderLogCount = await prisma.orderLog.count();
    console.log(`   ✅ Order Logs table: ${orderLogCount} records`);

    const documentCount = await prisma.document.count();
    console.log(`   ✅ Documents table: ${documentCount} records`);

    const notificationCount = await prisma.notification.count();
    console.log(`   ✅ Notifications table: ${notificationCount} records`);

    const systemConfigCount = await prisma.systemConfig.count();
    console.log(`   ✅ System Configs table: ${systemConfigCount} records`);

    // Test 2: Check user roles
    console.log('\n2️⃣ Testing user roles...');
    const users = await prisma.user.findMany({
      select: { username: true, role: true, isActive: true },
    });

    users.forEach((user) => {
      console.log(`   👤 ${user.username}: ${user.role} (${user.isActive ? 'Active' : 'Inactive'})`);
    });

    // Test 3: Check order statuses
    console.log('\n3️⃣ Testing order statuses...');
    const statuses = await prisma.orderStatus.findMany({
      orderBy: { sortOrder: 'asc' },
    });

    statuses.forEach((status) => {
      console.log(`   📊 ${status.code}: ${status.name} (${status.color || 'No color'})`);
    });

    // Test 4: Check sample orders
    console.log('\n4️⃣ Testing sample orders...');
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        store: true,
        status: true,
        items: {
          include: {
            itemType: true,
          },
        },
      },
    });

    orders.forEach((order) => {
      console.log(`   📦 Order ${order.orderNo}: ${order.customer.name} - ${order.status.name}`);
      order.items.forEach((item) => {
        console.log(`      └─ ${item.itemType.name} (${item.quantity}x) - ¥${item.unitPrice}`);
      });
    });

    // Test 5: Check notifications
    console.log('\n5️⃣ Testing notifications...');
    const notifications = await prisma.notification.findMany({
      include: { user: true },
    });

    notifications.forEach((notification) => {
      console.log(`   🔔 ${notification.title} - ${notification.user.username} (${notification.isRead ? 'Read' : 'Unread'})`);
    });

    // Test 6: Check system configs
    console.log('\n6️⃣ Testing system configs...');
    const configs = await prisma.systemConfig.findMany();

    configs.forEach((config) => {
      console.log(`   ⚙️ ${config.key}: ${config.value}`);
    });

    // Test 7: Check order logs
    console.log('\n7️⃣ Testing order logs...');
    const logs = await prisma.orderLog.findMany({
      include: {
        order: true,
        user: true,
        status: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    logs.forEach((log) => {
      console.log(`   📝 ${log.action} - Order ${log.order.orderNo} by ${log.user.username} (${log.status.name})`);
    });

    // Test 8: Check indexes and performance
    console.log('\n8️⃣ Testing database performance...');

    const startTime = Date.now();
    const orderWithStatus = await prisma.order.findMany({
      where: { statusId: 2 },
      include: { status: true },
    });
    const queryTime = Date.now() - startTime;

    console.log(`   ⚡ Query with status filter: ${queryTime}ms (${orderWithStatus.length} results)`);

    // Test 9: Check foreign key relationships
    console.log('\n9️⃣ Testing foreign key relationships...');

    const orderWithRelations = await prisma.order.findFirst({
      include: {
        customer: true,
        store: true,
        status: true,
        createdByUser: true,
        updatedByUser: true,
        logs: true,
        documents: true,
      },
    });

    if (orderWithRelations) {
      console.log(`   🔗 Order ${orderWithRelations.orderNo} relationships:`);
      console.log(`      └─ Customer: ${orderWithRelations.customer.name}`);
      console.log(`      └─ Store: ${orderWithRelations.store.name}`);
      console.log(`      └─ Status: ${orderWithRelations.status.name}`);
      console.log(`      └─ Created by: ${orderWithRelations.createdByUser?.username || 'N/A'}`);
      console.log(`      └─ Logs: ${orderWithRelations.logs.length} entries`);
      console.log(`      └─ Documents: ${orderWithRelations.documents.length} files`);
    }

    console.log('\n✅ All tests completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - ${userCount} users created`);
    console.log(`   - ${orderStatusCount} order statuses configured`);
    console.log(`   - ${orders.length} sample orders created`);
    console.log(`   - ${notificationCount} notifications generated`);
    console.log(`   - ${systemConfigCount} system configurations set`);
    console.log(`   - ${orderLogCount} order logs recorded`);
    console.log(`   - Database performance: ${queryTime}ms average query time`);
  } catch (error) {
    console.error('❌ Test failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testDatabaseImprovements()
  .then(() => {
    console.log('\n🎉 Database improvement validation completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Database improvement validation failed:', error);
    process.exit(1);
  });
