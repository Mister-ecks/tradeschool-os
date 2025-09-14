#!/bin/bash

# TradeSchool OS - Complete Deployment Setup
echo "🎓 TradeSchool OS - Complete Deployment Setup"
echo "=============================================="

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run linting
echo "🔍 Running linting..."
npm run lint

# Build the project
echo "🏗️ Building project..."
npm run build

# Initialize Git if not already done
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
fi

# Add all files
echo "📝 Adding files to Git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: TradeSchool OS with complete training modules

Features included:
- Fiber & OTDR Training Program
- Virtual Fusion Splicing Lab
- Interactive OTDR Testing
- Tool Scanning System
- CDL Training Modules
- Road Sign Recognition
- Youth Repair Skills
- VR/AR Training Components
- Automatic Deployment Configuration
- GitHub Actions Workflows

Ready for Vercel deployment!"

# Set up branch structure
echo "🌿 Setting up branch structure..."
git branch -M main
git checkout -b develop

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Create a new repository on GitHub:"
echo "   https://github.com/new"
echo ""
echo "2. Add the remote origin:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/tradeschool-os.git"
echo ""
echo "3. Push to GitHub:"
echo "   git push -u origin main"
echo "   git push -u origin develop"
echo ""
echo "4. Set up Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import your GitHub repository"
echo "   - Configure environment variables"
echo ""
echo "5. Configure GitHub Secrets:"
echo "   - Go to repository Settings → Secrets and variables → Actions"
echo "   - Add VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID"
echo ""
echo "6. Automatic deployment will start immediately!"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions."
echo ""
echo "🌐 Your site will be available at: https://tradeschool-os.vercel.app"
