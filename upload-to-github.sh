#!/bin/bash

echo "🚀 TradeSchool OS - GitHub Upload Script"
echo "========================================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please run 'git init' first."
    exit 1
fi

# Get GitHub username
echo "Enter your GitHub username:"
read github_username

if [ -z "$github_username" ]; then
    echo "❌ GitHub username is required."
    exit 1
fi

echo ""
echo "📋 Repository Details:"
echo "Name: tradeschool-os"
echo "Description: TradeSchool OS - HVAC-first learning platform with CDL training"
echo "URL: https://github.com/$github_username/tradeschool-os"
echo ""

# Confirm with user
echo "Do you want to proceed? (y/n):"
read confirm

if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
    echo "❌ Upload cancelled."
    exit 0
fi

echo ""
echo "🔄 Setting up GitHub repository..."

# Add remote origin
echo "Adding remote origin..."
git remote add origin https://github.com/$github_username/tradeschool-os.git

# Set main branch
echo "Setting main branch..."
git branch -M main

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Upload complete!"
echo ""
echo "🌐 Your repository is now live at:"
echo "https://github.com/$github_username/tradeschool-os"
echo ""
echo "📝 Next steps:"
echo "1. Visit your repository on GitHub"
echo "2. Add a description and topics"
echo "3. Set up GitHub Pages for live demo (optional)"
echo "4. Share with others!"
echo ""
