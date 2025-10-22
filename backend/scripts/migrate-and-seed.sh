#!/bin/bash

# BEAMS Database Migration and Seed Script
# This script will migrate the database and seed it with improved data

echo "🚀 Starting BEAMS Database Migration and Seed Process..."

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the backend directory"
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found. Please create one based on ENV.example"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run database migration
echo "🗄️ Running database migration..."
npx prisma migrate deploy

# Run improved seed
echo "🌱 Running improved seed..."
npx ts-node prisma/seed_improved.ts

echo "✅ Database migration and seed completed successfully!"
echo ""
echo "📊 What was created:"
echo "   - User management system with roles (Admin, Store Manager, Store Staff, Factory Manager, Factory Staff)"
echo "   - Order status tracking with 12 different statuses"
echo "   - Order logging system for audit trail"
echo "   - Document management for PDF generation"
echo "   - Notification system"
echo "   - System configuration"
echo "   - Sample data for testing"
echo ""
echo "🔑 Default login credentials:"
echo "   - Admin: admin / (any password)"
echo "   - Store Manager: store_manager_001 / (any password)"
echo "   - Store Staff: store_staff_001 / (any password)"
echo "   - Factory Manager: factory_manager / (any password)"
echo "   - Factory Staff: factory_staff_001 / (any password)"
echo ""
echo "🎯 Next steps:"
echo "   1. Update your application to use the new schema"
echo "   2. Implement the new workflow features"
echo "   3. Test the system with the sample data"
echo "   4. Configure your application settings"
