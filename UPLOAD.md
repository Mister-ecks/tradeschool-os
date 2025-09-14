# 🚀 Quick GitHub Upload

## Simple 3-Step Process

### Step 1: Create GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click "+" → "New repository"
3. Name: `tradeschool-os`
4. Description: `TradeSchool OS - HVAC-first learning platform with CDL training`
5. Make it Public or Private
6. **Don't** initialize with README, .gitignore, or license
7. Click "Create repository"

### Step 2: Run Upload Script
```bash
./upload-to-github.sh
```

### Step 3: Done! 🎉
Your repository will be live at: `https://github.com/YOUR_USERNAME/tradeschool-os`

---

## Manual Upload (Alternative)
If you prefer manual steps:

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/tradeschool-os.git
git branch -M main
git push -u origin main
```

That's it! Your TradeSchool OS platform is now on GitHub. 🚀
