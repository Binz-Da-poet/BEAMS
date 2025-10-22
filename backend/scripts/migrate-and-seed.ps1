# BEAMS Database Migration and Seed Script
# This script will migrate the database and seed it with improved data

Write-Host "🚀 Starting BEAMS Database Migration and Seed Process..." -ForegroundColor Green

# Check if we're in the correct directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Please run this script from the backend directory" -ForegroundColor Red
    exit 1
}

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "❌ Error: .env file not found. Please create one based on ENV.example" -ForegroundColor Red
    exit 1
}

# Install dependencies if node_modules doesn't exist
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Generate Prisma client
Write-Host "🔧 Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate

# Run database migration
Write-Host "🗄️ Running database migration..." -ForegroundColor Yellow
npx prisma migrate deploy

# Run improved seed
Write-Host "🌱 Running improved seed..." -ForegroundColor Yellow
npx ts-node prisma/seed_improved.ts

Write-Host "✅ Database migration and seed completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 What was created:" -ForegroundColor Cyan
Write-Host "   - User management system with roles (Admin, Store Manager, Store Staff, Factory Manager, Factory Staff)" -ForegroundColor White
Write-Host "   - Order status tracking with 12 different statuses" -ForegroundColor White
Write-Host "   - Order logging system for audit trail" -ForegroundColor White
Write-Host "   - Document management for PDF generation" -ForegroundColor White
Write-Host "   - Notification system" -ForegroundColor White
Write-Host "   - System configuration" -ForegroundColor White
Write-Host "   - Sample data for testing" -ForegroundColor White
Write-Host ""
Write-Host "🔑 Default login credentials:" -ForegroundColor Cyan
Write-Host "   - Admin: admin / (any password)" -ForegroundColor White
Write-Host "   - Store Manager: store_manager_001 / (any password)" -ForegroundColor White
Write-Host "   - Store Staff: store_staff_001 / (any password)" -ForegroundColor White
Write-Host "   - Factory Manager: factory_manager / (any password)" -ForegroundColor White
Write-Host "   - Factory Staff: factory_staff_001 / (any password)" -ForegroundColor White
Write-Host ""
Write-Host "🎯 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Update your application to use the new schema" -ForegroundColor White
Write-Host "   2. Implement the new workflow features" -ForegroundColor White
Write-Host "   3. Test the system with the sample data" -ForegroundColor White
Write-Host "   4. Configure your application settings" -ForegroundColor White
