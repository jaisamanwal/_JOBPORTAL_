# Quick Start: GitHub Push & Render Deployment

## 🚀 Quick Commands for GitHub Push

Copy and paste these commands in PowerShell (update YOUR_USERNAME and YOUR_REPO_NAME):

```powershell
# Navigate to project directory
cd c:\Users\amanj\OneDrive\Desktop\jobportal-yt-main\jobportal-yt-main

# Initialize Git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Job Portal application"

# Add remote repository (REPLACE WITH YOUR GITHUB REPO URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 📋 Pre-Deployment Checklist

Before deploying to Render, make sure you have:

- [ ] Created a GitHub repository
- [ ] Pushed your code to GitHub
- [ ] MongoDB Atlas cluster created and configured
- [ ] MongoDB Atlas Network Access set to 0.0.0.0/0 (Allow from anywhere)
- [ ] Cloudinary account with credentials ready
- [ ] Generated a strong JWT secret key

## 🔑 Environment Variables for Render

When setting up on Render, add these environment variables:

```
MONGO_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/jobportal?retryWrites=true&w=majority
SECRET_KEY=your_generated_secret_key_here
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

## ⚙️ Render Configuration

| Setting | Value |
|---------|-------|
| Build Command | `npm run build` |
| Start Command | `npm start` |
| Environment | Node |
| Instance Type | Free (or paid) |

## 🔗 Important Links

- Create GitHub Repo: https://github.com/new
- Render Dashboard: https://dashboard.render.com/
- MongoDB Atlas: https://cloud.mongodb.com/
- Cloudinary: https://cloudinary.com/console

## 📚 Full Documentation

For detailed step-by-step instructions, see:
- [README.md](file:///c:/Users/amanj/OneDrive/Desktop/jobportal-yt-main/jobportal-yt-main/README.md) - Complete project documentation
- [Deployment Walkthrough](file:///C:/Users/amanj/.gemini/antigravity/brain/c04a5cdd-5ab5-48f3-b3c4-80dbb1a68885/walkthrough.md) - Detailed deployment guide

## ⚡ Next Steps

1. Create GitHub repository at https://github.com/new
2. Run the Git commands above (update with your repo URL)
3. Go to Render and create a new Web Service
4. Connect your GitHub repository
5. Add environment variables
6. Deploy!

Your application will be live at: `https://your-app-name.onrender.com`
