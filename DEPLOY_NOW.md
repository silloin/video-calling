# 🎯 Render Deployment - Step by Step Instructions

Your code is now on GitHub! Follow these steps in your Render dashboard.

---

## ✅ Step 1: Deploy Backend Service

### 1.1 Create Web Service

In your Render dashboard (https://dashboard.render.com/):

1. Click the **"New +"** button (top right)
2. Select **"Web Service"**

### 1.2 Connect Repository

1. If prompted, click **"Connect account"** to link GitHub
2. You should see your repository: **silloin/video-calling**
3. Click **"Connect"** next to it

### 1.3 Configure Backend

Fill in these settings:

| Field | Value |
|-------|-------|
| **Name** | `video-calling-backend` |
| **Region** | Choose closest to you (e.g., Singapore, Oregon) |
| **Branch** | `main` |
| **Root Directory** | `server` |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### 1.4 Add Environment Variables

Scroll down to **"Environment Variables"** section.

Click **"Add Environment Variable"** and add:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `CLIENT_URL` | `http://localhost:3000` |

> **Note**: We'll update `CLIENT_URL` after deploying the frontend.

### 1.5 Deploy Backend

1. Click **"Create Web Service"** button at the bottom
2. Wait 2-5 minutes for deployment
3. Watch the logs - you should see "Build successful" then "Deploy successful"
4. **IMPORTANT**: Copy your backend URL from the top of the page
   - It will look like: `https://video-calling-backend.onrender.com`
   - **Write it down here**: ___________________________________

### 1.6 Test Backend

1. Click on the URL or visit it in a new tab
2. You should see: **"Express server is running"**
3. ✅ If you see this, backend is working!

---

## ✅ Step 2: Update Frontend Configuration

Before deploying the frontend, we need to update the production environment file.

### 2.1 Update .env.production

Open the file: `c:\Users\hp\Desktop\Starter Code\client\.env.production`

Replace the content with your actual backend URL:

```env
REACT_APP_BACKEND_URL=https://video-calling-backend.onrender.com
```

**Replace** `video-calling-backend.onrender.com` with your actual backend URL from Step 1.5!

### 2.2 Commit and Push Changes

Run these commands:

```bash
cd "c:\Users\hp\Desktop\Starter Code"
git add client/.env.production
git commit -m "Update production backend URL"
git push
```

---

## ✅ Step 3: Deploy Frontend Service

### 3.1 Create Static Site

Back in Render dashboard:

1. Click **"New +"** button
2. Select **"Static Site"**

### 3.2 Connect Repository

1. Select your repository: **silloin/video-calling**
2. Click **"Connect"**

### 3.3 Configure Frontend

Fill in these settings:

| Field | Value |
|-------|-------|
| **Name** | `video-calling-frontend` |
| **Region** | Same as backend |
| **Branch** | `main` |
| **Root Directory** | `client` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `build` |

### 3.4 Add Environment Variable

Scroll to **"Environment Variables"**.

Click **"Add Environment Variable"**:

| Key | Value |
|-----|-------|
| `REACT_APP_BACKEND_URL` | `https://video-calling-backend.onrender.com` |

**Use your actual backend URL from Step 1.5!**

### 3.5 Deploy Frontend

1. Click **"Create Static Site"**
2. Wait 3-5 minutes for build and deployment
3. Watch the logs for "Build successful" and "Deploy successful"
4. **IMPORTANT**: Copy your frontend URL
   - It will look like: `https://video-calling-frontend.onrender.com`
   - **Write it down here**: ___________________________________

### 3.6 Test Frontend

1. Visit your frontend URL
2. You should see the lobby page with email and room inputs
3. ✅ If you see the lobby, frontend is working!

---

## ✅ Step 4: Update Backend CORS

Now we need to tell the backend to accept connections from the frontend.

### 4.1 Update Backend Environment Variable

1. Go back to Render dashboard
2. Click on your **backend service** (video-calling-backend)
3. Click **"Environment"** tab on the left
4. Find the `CLIENT_URL` variable
5. Click **"Edit"** (pencil icon)
6. Change value to your frontend URL: `https://video-calling-frontend.onrender.com`
7. Click **"Save Changes"**

### 4.2 Wait for Redeploy

The backend will automatically redeploy (takes 1-2 minutes).

Watch for "Deploy successful" message.

---

## ✅ Step 5: Test Your Video Calling App! 🎉

### 5.1 Open in Two Browsers

1. **Browser 1** (Chrome): Open your frontend URL
2. **Browser 2** (Firefox or Chrome Incognito): Open the same frontend URL

### 5.2 Join Same Room

**Browser 1:**
- Email: `user1@test.com`
- Room: `test123`
- Click **"Join"**

**Browser 2:**
- Email: `user2@test.com`
- Room: `test123`
- Click **"Join"**

### 5.3 Start Call

1. In **Browser 1**, click the **"Call"** button
2. Both browsers should show video feeds
3. ✅ **Success!** Your video calling app is live!

---

## 🎊 Deployment Complete!

Your app is now live on the internet with HTTPS!

**Your URLs:**
- Frontend: `https://video-calling-frontend.onrender.com`
- Backend: `https://video-calling-backend.onrender.com`

---

## 🐛 Troubleshooting

### Issue: CORS Error

**Check:**
1. Backend `CLIENT_URL` matches frontend URL exactly
2. Both URLs use `https://` (not `http://`)
3. Backend has redeployed after changing `CLIENT_URL`

### Issue: Video Not Connecting

**Try:**
1. Refresh both browsers
2. Check browser console (F12) for errors
3. Make sure both users are in the same room ID
4. Grant camera/microphone permissions

### Issue: Service Unavailable

**Reason:** Free tier services sleep after 15 minutes.

**Solution:** Wait 30-60 seconds for service to wake up.

---

## 📊 Your Deployment Summary

| Component | Status | URL |
|-----------|--------|-----|
| GitHub Repo | ✅ Pushed | https://github.com/silloin/video-calling |
| Backend | ⏳ Deploy | `https://video-calling-backend.onrender.com` |
| Frontend | ⏳ Deploy | `https://video-calling-frontend.onrender.com` |

---

**Need help?** Check the detailed guide: `RENDER_DEPLOYMENT.md`

**Good luck! 🚀**
