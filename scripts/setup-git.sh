#!/bin/bash

# TradeSchool OS - Git Setup Script
echo "🚀 Setting up TradeSchool OS for GitHub and Vercel deployment..."

# Initialize Git repository if not already initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
fi

# Add all files to Git
echo "📝 Adding files to Git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: TradeSchool OS with Fiber & OTDR training module

- Complete fiber optic training curriculum
- Virtual fusion splicing lab
- Interactive OTDR testing
- Tool scanning system
- CDL training modules
- Road sign recognition
- Youth repair skills
- VR/AR training components
- Automatic deployment configuration
- GitHub Actions workflows"

# Set up branch structure
echo "🌿 Setting up branch structure..."
git branch -M main
git checkout -b develop

# Add remote origin (user needs to set this)
echo "🔗 Ready to add remote origin:"
echo "git remote add origin https://github.com/YOUR_USERNAME/tradeschool-os.git"
echo "git push -u origin main"
echo "git push -u origin develop"

echo "✅ Git setup complete!"
echo ""
echo "Next steps:"
echo "1. Create a new repository on GitHub"
echo "2. Add the remote origin URL"
echo "3. Push the code to GitHub"
echo "4. Configure Vercel deployment"
echo "5. Set up GitHub Secrets"
echo ""
echo "See DEPLOYMENT.md for detailed instructions."
