# 🚀 Quick Start - Deploy to Render in 10 Minutes

## Step 1: Push to GitHub (2 minutes)

```bash
cd "c:\Users\hp\Desktop\Starter Code"
git init
git add .
git commit -m "Ready for deployment"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/webrtc-video-call.git
git push -u origin main
```

## Step 2: Deploy Backend (3 minutes)

1. Go to https://dashboard.render.com/
2. Click **New +** → **Web Service**
3. Connect GitHub and select your repo
4. Settings:
   - Name: `webrtc-backend`
   - Root Directory: `server`
   - Build: `npm install`
   - Start: `npm start`
   - Add env var: `NODE_ENV` = `production`
5. Click **Create**
6. **Copy backend URL**: `https://webrtc-backend.onrender.com`

## Step 3: Update Frontend Config (1 minute)

Edit `client\.env.production`:
```env
REACT_APP_BACKEND_URL=https://webrtc-backend.onrender.com
```

Commit and push:
```bash
git add client/.env.production
git commit -m "Update backend URL"
git push
```

## Step 4: Deploy Frontend (3 minutes)

1. Render Dashboard → **New +** → **Static Site**
2. Select your repo
3. Settings:
   - Name: `webrtc-frontend`
   - Root Directory: `client`
   - Build: `npm install && npm run build`
   - Publish: `build`
   - Add env var: `REACT_APP_BACKEND_URL` = `https://webrtc-backend.onrender.com`
4. Click **Create**
5. **Copy frontend URL**: `https://webrtc-frontend.onrender.com`

## Step 5: Update Backend CORS (1 minute)

1. Go to backend service → **Environment** tab
2. Add env var: `CLIENT_URL` = `https://webrtc-frontend.onrender.com`
3. Save (auto-redeploys)

## ✅ Test It!

1. Open frontend URL in 2 browsers
2. Join same room ID
3. Click "Call"
4. Video should connect! 🎉

---

**Need help?** See [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) for detailed guide.
