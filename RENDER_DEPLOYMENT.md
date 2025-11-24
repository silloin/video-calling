# 🚀 Deploy WebRTC Meet Clone to Render

Complete step-by-step guide to deploy your video calling application to Render with free HTTPS.

## 📋 Prerequisites

- [ ] GitHub account ([Sign up here](https://github.com/join))
- [ ] Render account ([Sign up here](https://dashboard.render.com/register))
- [ ] Git installed on your computer
- [ ] Code pushed to GitHub repository

---

## Part 1: Push Code to GitHub

### Step 1: Initialize Git Repository

```bash
# Navigate to your project root
cd "c:\Users\hp\Desktop\Starter Code"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - WebRTC video calling app"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the **"+"** icon → **"New repository"**
3. Name it: `webrtc-video-call` (or any name you prefer)
4. Keep it **Public** (required for Render free tier)
5. **Don't** initialize with README (you already have one)
6. Click **"Create repository"**

### Step 3: Push to GitHub

```bash
# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/webrtc-video-call.git

# Push code
git branch -M main
git push -u origin main
```

✅ **Checkpoint**: Your code should now be visible on GitHub!

---

## Part 2: Deploy Backend to Render

### Step 1: Create Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect account"** to link GitHub (if first time)
4. Find and select your `webrtc-video-call` repository

### Step 2: Configure Backend Service

Fill in the following settings:

| Setting | Value |
|---------|-------|
| **Name** | `webrtc-backend` (or your preferred name) |
| **Region** | Choose closest to you |
| **Root Directory** | `server` |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | `Free` |

### Step 3: Add Environment Variables

Scroll down to **"Environment Variables"** section and add:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `CLIENT_URL` | `https://webrtc-frontend.onrender.com` (we'll update this later) |

> [!NOTE]
> We'll update `CLIENT_URL` after deploying the frontend. For now, use a placeholder.

### Step 4: Deploy Backend

1. Click **"Create Web Service"**
2. Wait 2-5 minutes for deployment to complete
3. Look for **"Your service is live 🎉"** message
4. **Copy your backend URL**: `https://webrtc-backend.onrender.com`

✅ **Test Backend**: Visit your backend URL - you should see "Express server is running"

---

## Part 3: Deploy Frontend to Render

### Step 1: Update Production Environment File

Before deploying frontend, update the production environment file:

1. Open `client\.env.production`
2. Replace with your actual backend URL:
   ```env
   REACT_APP_BACKEND_URL=https://webrtc-backend.onrender.com
   ```
3. Save the file
4. Commit and push changes:
   ```bash
   git add client/.env.production
   git commit -m "Update production backend URL"
   git push
   ```

### Step 2: Create Static Site

1. Go back to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Static Site"**
3. Select your `webrtc-video-call` repository

### Step 3: Configure Frontend Service

| Setting | Value |
|---------|-------|
| **Name** | `webrtc-frontend` (or your preferred name) |
| **Region** | Same as backend |
| **Root Directory** | `client` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `build` |

### Step 4: Add Environment Variable

Add this environment variable:

| Key | Value |
|-----|-------|
| `REACT_APP_BACKEND_URL` | `https://webrtc-backend.onrender.com` |

Replace with your actual backend URL from Part 2.

### Step 5: Deploy Frontend

1. Click **"Create Static Site"**
2. Wait 3-5 minutes for build and deployment
3. **Copy your frontend URL**: `https://webrtc-frontend.onrender.com`

---

## Part 4: Update Backend CORS

Now that we have the frontend URL, update the backend:

### Step 1: Update Backend Environment Variable

1. Go to your backend service in Render Dashboard
2. Click **"Environment"** tab
3. Find `CLIENT_URL` variable
4. Update value to: `https://webrtc-frontend.onrender.com` (your actual frontend URL)
5. Click **"Save Changes"**

### Step 2: Trigger Redeploy

The backend will automatically redeploy with the new CORS settings.

---

## Part 5: Test Your Deployment 🎉

### Test 1: Check Both Services Are Running

- ✅ Backend: Visit `https://webrtc-backend.onrender.com` → Should show "Express server is running"
- ✅ Frontend: Visit `https://webrtc-frontend.onrender.com` → Should show lobby page

### Test 2: Test Video Calling

1. Open your frontend URL in **Chrome**: `https://webrtc-frontend.onrender.com`
2. Enter your email and room ID (e.g., "room123")
3. Click "Join"
4. Open the **same URL** in **Firefox** (or incognito Chrome)
5. Enter different email but **same room ID** ("room123")
6. Click "Join"
7. Click "Call" from one browser
8. Both cameras should connect! 🎥

### Test 3: Check Browser Console

Press `F12` to open developer tools:
- ✅ No CORS errors
- ✅ Socket.IO connected successfully
- ✅ WebRTC peer connection established

---

## 🎊 Success Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] CORS configured correctly (no errors in console)
- [ ] Socket.IO connection working
- [ ] Camera/microphone permissions granted
- [ ] Video call connects between two browsers
- [ ] HTTPS working (lock icon in browser)

---

## ⚠️ Important Notes

### Free Tier Limitations

> [!WARNING]
> **Services Sleep After 15 Minutes**
> 
> Render's free tier spins down services after 15 minutes of inactivity. The first request after sleeping takes 30-60 seconds to wake up.
> 
> **Solution**: Upgrade to paid tier ($7/month per service) for 24/7 uptime.

### HTTPS is Automatic

> [!NOTE]
> Render automatically provides free SSL certificates. Your app will work on HTTPS immediately, which is required for WebRTC camera/microphone access.

### Custom Domain (Optional)

You can add a custom domain:
1. Go to service settings
2. Click "Custom Domain"
3. Follow instructions to add your domain

---

## 🐛 Troubleshooting

### Issue: "Service Unavailable" or 503 Error

**Cause**: Service is waking up from sleep (free tier)

**Solution**: Wait 30-60 seconds and refresh

---

### Issue: CORS Error in Console

**Symptoms**: 
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solution**:
1. Check backend `CLIENT_URL` environment variable matches frontend URL exactly
2. Make sure both URLs use `https://` (not `http://`)
3. Redeploy backend after changing environment variables

---

### Issue: Camera Not Working

**Symptoms**: "Permission denied" or camera doesn't turn on

**Solutions**:
1. ✅ Make sure you're using HTTPS (check for lock icon)
2. ✅ Grant camera/microphone permissions in browser
3. ✅ Close other apps using camera (Zoom, Teams, etc.)
4. ✅ Try different browser (Chrome works best)

---

### Issue: Socket.IO Not Connecting

**Symptoms**: Console shows "WebSocket connection failed"

**Solutions**:
1. Check `REACT_APP_BACKEND_URL` in frontend environment variables
2. Make sure backend service is running (visit backend URL)
3. Check backend logs in Render dashboard for errors

---

### Issue: Video Doesn't Connect Between Users

**Symptoms**: Both users join room but video doesn't connect

**Solutions**:
1. Check both users are in the **same room ID**
2. Make sure one user clicks "Call" button
3. Check browser console for WebRTC errors
4. Try refreshing both browsers
5. Some corporate networks block WebRTC - try on mobile data

---

## 📊 Monitoring Your App

### View Logs

1. Go to Render Dashboard
2. Click on your service
3. Click "Logs" tab
4. See real-time logs of connections and errors

### Check Service Status

- **Green dot** = Service running
- **Yellow dot** = Service deploying
- **Red dot** = Service failed

---

## 🚀 Next Steps

### Improve Connectivity (Optional)

Add TURN servers for better connectivity through firewalls:

1. Sign up for free TURN server at [Metered.ca](https://www.metered.ca/tools/openrelay/)
2. Update `client/src/service/peer.js` with TURN credentials
3. Redeploy frontend

### Add Features

- Screen sharing
- Chat messages
- Recording
- Multiple participants
- Virtual backgrounds

### Upgrade to Paid Tier

For production use:
- Backend: $7/month (no sleep, better performance)
- Frontend: Free (static sites don't sleep)

---

## 📞 Support

If you encounter issues:

1. Check Render status: https://status.render.com/
2. Review Render docs: https://render.com/docs
3. Check browser console for errors
4. Review backend logs in Render dashboard

---

## 🎉 Congratulations!

Your WebRTC video calling app is now live on the internet with free HTTPS! 

**Share your app**: `https://webrtc-frontend.onrender.com`

---

**Built with ❤️ using React, Node.js, Socket.IO, and WebRTC**
