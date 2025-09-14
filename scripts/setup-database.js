// Database setup script for TradeSchool OS
// Run this to set up your Supabase database with initial data

const fs = require('fs');
const path = require('path');

console.log('🎓 TradeSchool OS Database Setup');
console.log('================================');

console.log('\n📋 To set up your database:');
console.log('\n1. Create a Supabase project at https://supabase.com');
console.log('2. Copy your project URL and anon key');
console.log('3. Create .env.local file with your credentials:');

const envTemplate = `
# Copy this to .env.local and fill in your values

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.your-project.supabase.co:5432/postgres

# Development settings
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
`;

console.log(envTemplate);

console.log('\n4. Run the SQL commands from database/schema.sql in your Supabase SQL editor');
console.log('5. Restart your development server');

console.log('\n📚 Your HVAC course structure includes:');
console.log('   • 8 comprehensive modules');
console.log('   • 32 video lessons');
console.log('   • 9 quizzes (8 module + 1 final exam)');
console.log('   • Real video spaces for content');
console.log('   • Complete learning progression');

console.log('\n🚀 Once set up, you\'ll have:');
console.log('   • User authentication and profiles');
console.log('   • Progress tracking');
console.log('   • Quiz results storage');
console.log('   • Real-time leaderboards');
console.log('   • Course completion certificates');

console.log('\n💡 Need help? Check the README.md for detailed setup instructions.');
