# ✅ Pre-Deployment Checklist

Use this checklist before deploying to Render.

## Code Preparation

- [x] ✅ Server CORS configured for environment variables
- [x] ✅ Environment files created (`.env.development`, `.env.production`)
- [x] ✅ `.gitignore` updated to protect sensitive files
- [x] ✅ Production build tested locally
- [ ] ⬜ Code committed to Git
- [ ] ⬜ Code pushed to GitHub (public repository)

## GitHub Setup

- [ ] ⬜ GitHub account created
- [ ] ⬜ New repository created on GitHub
- [ ] ⬜ Local code pushed to GitHub
- [ ] ⬜ Repository is public (required for Render free tier)

## Render Account

- [ ] ⬜ Render account created at https://dashboard.render.com/
- [ ] ⬜ GitHub account connected to Render

## Deployment Information

Fill this out as you deploy:

### Backend Service
- **Backend URL**: `https://__________________.onrender.com`
- **Service Name**: `webrtc-backend` (or your choice)

### Frontend Service  
- **Frontend URL**: `https://__________________.onrender.com`
- **Service Name**: `webrtc-frontend` (or your choice)

## Environment Variables to Set

### Backend (Render Dashboard)
- [ ] `NODE_ENV` = `production`
- [ ] `CLIENT_URL` = `https://your-frontend-url.onrender.com`

### Frontend (Render Dashboard)
- [ ] `REACT_APP_BACKEND_URL` = `https://your-backend-url.onrender.com`

## Post-Deployment Testing

- [ ] ⬜ Backend URL shows "Express server is running"
- [ ] ⬜ Frontend URL loads lobby page
- [ ] ⬜ No CORS errors in browser console
- [ ] ⬜ Socket.IO connects successfully
- [ ] ⬜ Camera/microphone permissions work
- [ ] ⬜ Video call connects between two browsers
- [ ] ⬜ HTTPS lock icon visible in browser

## Troubleshooting Resources

- 📖 Detailed Guide: `RENDER_DEPLOYMENT.md`
- 🚀 Quick Guide: `QUICK_DEPLOY.md`
- 📊 Render Logs: Check in Render Dashboard → Your Service → Logs tab

---

## Next Steps

1. Follow `QUICK_DEPLOY.md` for fastest deployment
2. Or follow `RENDER_DEPLOYMENT.md` for detailed step-by-step guide
3. Check off items as you complete them
4. Save your URLs in this checklist for reference

**Good luck! 🚀**
