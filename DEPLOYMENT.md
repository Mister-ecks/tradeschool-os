# 🚀 TradeSchool OS - Deployment Guide

## Automatic Deployment Setup

This project is configured for automatic deployment to Vercel with GitHub Actions.

### Prerequisites

1. **GitHub Repository** - Push your code to GitHub
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
3. **Required Secrets** - Configure the following in GitHub repository settings

### GitHub Secrets Configuration

Go to your GitHub repository → Settings → Secrets and variables → Actions, and add:

```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

### Getting Vercel Credentials

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Link your project**:
   ```bash
   vercel link
   ```

4. **Get your credentials**:
   ```bash
   vercel env pull .env.local
   ```

### Automatic Deployment Features

#### 🔄 **Automatic Commits**
- **Schedule**: Daily at 2 AM UTC
- **Manual Trigger**: Available in GitHub Actions
- **Purpose**: Keeps repository updated with latest changes

#### 🚀 **CI/CD Pipeline**
- **Trigger**: Push to `main` or `develop` branches
- **Process**: 
  1. Run tests and linting
  2. Build application
  3. Deploy to Vercel
- **Environments**:
  - **Preview**: Pull requests → Preview deployment
  - **Production**: Main branch → Production deployment

#### 📊 **Deployment Status**
- **Success**: Automatic notification
- **Failure**: Error logs in GitHub Actions
- **Monitoring**: Vercel dashboard for performance

### Manual Deployment

#### Deploy to Production:
```bash
npm run deploy
```

#### Deploy Preview:
```bash
npm run deploy:preview
```

### Environment Variables

#### Production Environment:
```env
NODE_ENV=production
SITE_URL=https://tradeschool-os.vercel.app
```

#### Development Environment:
```env
NODE_ENV=development
SITE_URL=http://localhost:3000
```

### Vercel Configuration

The project includes `vercel.json` with:
- **Build settings** for Next.js
- **Security headers** for production
- **Redirect rules** for SEO
- **Function configuration** for API routes

### Monitoring and Analytics

#### Vercel Dashboard:
- **Performance metrics**
- **Deployment history**
- **Error tracking**
- **Analytics data**

#### GitHub Actions:
- **Build logs**
- **Test results**
- **Deployment status**
- **Performance reports**

### Troubleshooting

#### Common Issues:

1. **Build Failures**:
   - Check Node.js version (18.x required)
   - Verify all dependencies are installed
   - Review build logs in GitHub Actions

2. **Deployment Issues**:
   - Verify Vercel credentials
   - Check environment variables
   - Review Vercel deployment logs

3. **Environment Variables**:
   - Ensure all required secrets are set
   - Check variable names match exactly
   - Verify values are correct

### Support

For deployment issues:
1. Check GitHub Actions logs
2. Review Vercel dashboard
3. Check this documentation
4. Contact development team

---

## 🎯 Quick Start

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Configure Secrets** (see above)

3. **Automatic Deployment** will start immediately!

4. **Access Your Site**:
   - Production: `https://tradeschool-os.vercel.app`
   - Preview: Check Vercel dashboard for preview URLs

---

**✅ Your TradeSchool OS is now ready for automatic deployment!**
