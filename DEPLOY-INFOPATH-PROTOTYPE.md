# Deploy INFOPATH UI Prototype - Step by Step Guide

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like: `infopath-ui-prototype`
3. Make it **Public** (required for GitHub Pages)
4. Don't initialize with README

## Step 2: Initialize Git and Push the Prototype

Open your terminal and run these commands:

```bash
# Navigate to the INFOPATH1 folder
cd c:/Users/walte/OneDrive/Desktop/INFOPATH1

# Initialize git if not already done
git init

# Add the HTML file (rename it to index.html for GitHub Pages)
cp ui-prototype.html index.html

# Add all files
git add index.html

# Create first commit
git commit -m "Add INFOPATH UI Prototype"

# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/infopath-ui-prototype.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under "Source", select **main** branch
5. Click **Save**
6. Wait 1-2 minutes and your site will be live at:
   `https://YOUR_USERNAME.github.io/infopath-ui-prototype/`

## Step 4: Take a Screenshot

1. Open your deployed site: `https://YOUR_USERNAME.github.io/infopath-ui-prototype/`
2. Take a screenshot of the UI (use Windows Snipping Tool: Win + Shift + S)
3. Save it as `infopath-prototype-screenshot.png`

## Step 5: Upload Screenshot to Supabase

1. Go to your Supabase Dashboard
2. Navigate to **Storage** in the left sidebar
3. Select the **portfolio-images** bucket
4. Click **Upload file**
5. Upload `infopath-prototype-screenshot.png`
6. After upload, click on the file and copy the **Public URL**
   - It will look like: `https://your-project.supabase.co/storage/v1/object/public/portfolio-images/infopath-prototype-screenshot.png`

## Step 6: Update the SQL Script

The SQL script will be updated with:
- **live_url**: Your GitHub Pages URL
- **image_url**: Your Supabase Storage URL

## Step 7: Run the SQL Script

1. Open Supabase Dashboard
2. Go to **SQL Editor**
3. Run the updated SQL script

---

## Quick Alternative: Deploy to Netlify Drop

If you prefer a faster deployment without Git:

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag and drop the `ui-prototype.html` file (rename to `index.html` first)
3. Get instant deployment URL
4. Use that URL in your SQL script

---

**Next Step**: Let's create the repository and deploy!
