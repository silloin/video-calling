# 🔧 Frontend Deployment - Correct Configuration

## The Issue
The build is still failing because the **Root Directory** is not set to `client`.

## ✅ Solution: Delete and Recreate with Correct Settings

Follow these exact steps:

---

### Step 1: Delete the Failed Service

1. In Render Dashboard, click on your failed static site
2. Click **"Settings"** (left sidebar)
3. Scroll all the way to the bottom
4. Click **"Delete Static Site"**
5. Type the service name to confirm
6. Click **"Delete"**

---

### Step 2: Create New Static Site (With Correct Settings!)

1. Click **"New +"** button (top right)
2. Select **"Static Site"**
3. Connect to repository: **silloin/video-calling**
4. Click **"Connect"**

---

### Step 3: Configure (COPY THESE EXACT VALUES)

**CRITICAL**: Fill in these settings EXACTLY as shown:

```
Name: video-calling-frontend

Branch: main

Root Directory: client
👆 THIS IS THE MOST IMPORTANT FIELD!

Build Command: npm install && npm run build

Publish Directory: build
```

---

### Step 4: Add Environment Variable

Scroll down to **"Environment Variables"**

Click **"Add Environment Variable"**:

```
Key: REACT_APP_BACKEND_URL
Value: https://video-calling-jpz1.onrender.com
```

---

### Step 5: Create Static Site

1. Double-check **Root Directory** says `client`
2. Click **"Create Static Site"** button
3. Wait for build to complete (3-5 minutes)

---

### ✅ Expected Build Output

You should see:

```
==> Cloning from https://github.com/silloin/video-calling
==> Checking out commit...
==> Running build command 'npm install && npm run build'...
==> Using Node.js version 22.16.0

added 1500+ packages...  ✅ (more packages = correct!)

> client@0.1.0 build
> react-scripts build

Creating an optimized production build...
Compiled successfully.

File sizes after gzip:

  XX.XX kB  build/static/js/main.xxxxx.js
  XX.XX kB  build/static/css/main.xxxxx.css

The build folder is ready to be deployed.

==> Build successful 🎉
==> Deploying...
==> Your service is live 🎉
```

**Key difference**: You should see **1500+ packages** being installed (not just 56), and the build script should run successfully.

---

## 🎯 Quick Checklist

Before clicking "Create Static Site", verify:

- [ ] Root Directory = `client` (lowercase, no slashes)
- [ ] Build Command = `npm install && npm run build`
- [ ] Publish Directory = `build`
- [ ] Environment Variable added: `REACT_APP_BACKEND_URL`

---

## After Successful Deployment

Once you see "Your service is live 🎉":

1. **Copy your frontend URL** (e.g., `https://video-calling-frontend.onrender.com`)

2. **Update Backend CORS**:
   - Go to backend service: `video-calling-jpz1`
   - Click "Environment" tab
   - Add/Update: `CLIENT_URL` = your frontend URL
   - Save changes

3. **Test your app!** 🎉

---

**Delete the failed service and recreate it with Root Directory = `client`** 🚀
