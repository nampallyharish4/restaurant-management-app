
const { DatabaseService } = require('../services/DatabaseService');

console.log('🗃️  Initializing database...');

try {
  DatabaseService.initialize();
  console.log('✅ Database initialized successfully!');
  console.log('📝 Menu items and categories have been seeded.');
  
  // Display some stats
  const menuItems = DatabaseService.getAllMenuItems();
  const categories = DatabaseService.getCategories();
  const orders = DatabaseService.getAllOrders();
  
  console.log(`📊 Database Stats:`);
  console.log(`   - Categories: ${categories.length}`);
  console.log(`   - Menu Items: ${menuItems.length}`);
  console.log(`   - Orders: ${orders.length}`);
  
  DatabaseService.close();
} catch (error) {
  console.error('❌ Failed to initialize database:', error);
  process.exit(1);
}
