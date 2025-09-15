#!/bin/bash

# TradeSchool-OS Deployment Setup Script
# This script sets up the project for deployment to Vercel

echo "🚀 TradeSchool-OS Deployment Setup"
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Run tests
echo "🧪 Running tests..."
npm test -- --passWithNoTests

if [ $? -ne 0 ]; then
    echo "⚠️  Some tests failed, but continuing with deployment setup"
fi

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI is ready"

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
EOF
    echo "✅ .env.local created"
else
    echo "✅ .env.local already exists"
fi

# Create .gitignore if it doesn't exist
if [ ! -f .gitignore ]; then
    echo "📝 Creating .gitignore file..."
    cat > .gitignore << EOF
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Next.js
.next/
out/

# Production
build/
dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# Coverage
coverage/
.nyc_output/

# Testing
.jest/
EOF
    echo "✅ .gitignore created"
else
    echo "✅ .gitignore already exists"
fi

# Initialize Git repository if not already initialized
if [ ! -d .git ]; then
    echo "📝 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit – TradeSchool-OS full platform"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

echo ""
echo "🎉 Deployment Setup Complete!"
echo "============================="
echo ""
echo "Next steps:"
echo "1. Create a GitHub repository:"
echo "   - Go to https://github.com/new"
echo "   - Create a new repository named 'tradeschool-os'"
echo "   - Don't initialize with README (we already have one)"
echo ""
echo "2. Push to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/tradeschool-os.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Deploy to Vercel:"
echo "   vercel login"
echo "   vercel --prod"
echo ""
echo "4. Update environment variables in Vercel dashboard:"
echo "   - NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app"
echo ""
echo "🚀 Your TradeSchool-OS platform will be live!"
echo ""
echo "For more information, see README.md"