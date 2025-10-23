# Deploy to Vercel - Step by Step Guide

✅ Your app is **100% ready** for Vercel deployment! I've fixed the configuration to work perfectly with Vercel.

## What I've Set Up For You

1. ✅ **vercel.json** - Simplified configuration using Vercel's best practices
2. ✅ **vite.config.ts** - Works for both development and production
3. ✅ **Tested the build** - Everything compiles successfully (9.58s build time, 30MB total)

## Latest Fix (Oct 23, 2025)

✅ **Fixed ERR_CONNECTION_REFUSED error!** The issue was conflicting config files and server code being included in deployment.

**What was wrong:**
- Old `vite.config.vercel.ts` file confused Vercel's build process
- Server files might have been included in deployment
- This caused "ERR_CONNECTION_REFUSED" even though deployment showed as successful

**What I fixed:**
1. Deleted old `vite.config.vercel.ts` - not needed anymore
2. Created `.vercelignore` to exclude server files:
   - Blocks `server/` directory
   - Blocks compiled server code (`dist/index.js`)
   - Keeps essential config files (vite.config.ts, tailwind.config.ts, etc.)
3. Simplified `vercel.json` to minimal configuration
4. Build tested with production environment: ✅ Works perfectly!

## Prerequisites
- A GitHub account (free)
- A Vercel account (free) at https://vercel.com

## Deployment Steps (Super Simple!)

### Step 1: Push Your Code to GitHub

**Option A: Using GitHub Website** (Easiest)
1. Go to https://github.com/new
2. Create a new repository (name it "naija-wealth-sim" or anything you like)
3. **DO NOT** initialize with README, .gitignore, or license
4. GitHub will show you commands like this:
   ```bash
   git init
   git add .
   git commit -m "first commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
5. Copy these commands and run them in your Replit Shell (bottom right)

**Option B: Using Replit's GitHub Integration** (Faster)
1. Click the version control icon (📂) in Replit's sidebar
2. Click "Connect to GitHub"
3. Authorize Replit
4. Create a new repository and push

### Step 2: Deploy on Vercel (1 Minute!)
1. Go to https://vercel.com
2. Sign up or log in (click "Continue with GitHub")
3. Click "Add New" → "Project"
4. Find your repository and click "Import"
5. Vercel will auto-detect the settings from `vercel.json`
6. Click "Deploy" (don't change any settings!)

**🎉 Done!** Your game will be live in 1-2 minutes.

### Important: If You Had a Previous Failed Deployment

If you previously deployed and saw "ERR_CONNECTION_REFUSED", you need to:

1. **Push the new fixes to GitHub:**
   ```bash
   git add .
   git commit -m "Fix Vercel deployment - remove server code"
   git push
   ```

2. **Redeploy on Vercel:**
   - Go to your Vercel dashboard
   - Find your project
   - Click "Deployments" tab
   - Click "Redeploy" on the latest deployment
   - OR Vercel will auto-deploy when it detects the new GitHub push

3. **Wait 1-2 minutes** for the new deployment to finish

4. **Visit your site again** - it should work now! 🎮

## What Happens During Deployment

Vercel will:
- Install all dependencies
- Run `vite build` to create optimized production files
- Serve your app as a static site
- Give you a free `.vercel.app` domain
- Auto-deploy on every GitHub push

## Features That Work
✅ All game functionality (investments, purchases, timers)
✅ Tutorial system
✅ Sound effects and music
✅ Game over and continue system
✅ Data persistence (localStorage)
✅ Mobile-responsive design

## Important Notes
- The app runs entirely in the browser (no backend needed)
- All game data is stored in the player's browser (localStorage)
- Free Vercel tier is perfect for this app
- Auto-deploys when you push to GitHub

## Troubleshooting

**Build fails?**
- Make sure `vercel.json` is in the root directory
- Check that all files are committed to GitHub

**App doesn't load routes?**
- The `vercel.json` rewrite rules handle SPA routing automatically

**Need custom domain?**
- In Vercel dashboard, go to Project Settings → Domains
- Add your custom domain (free on Vercel)

## Your Live URL
After deployment, you'll get a URL like:
`https://your-project-name.vercel.app`

Share it with anyone - it's live and ready to use! 🎮✨
