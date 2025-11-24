# 🎉 Backend Deployed Successfully!

## ✅ Backend Status: LIVE

**Backend URL**: https://video-calling-jpz1.onrender.com

The backend is running and accepting connections!

---

## 📋 Next Step: Deploy Frontend

Now let's deploy the frontend static site.

### Step 1: Create Static Site on Render

1. Go back to your Render Dashboard: https://dashboard.render.com/
2. Click **"New +"** button (top right)
3. Select **"Static Site"**

### Step 2: Connect Repository

1. You should see your repository: **silloin/video-calling**
2. Click **"Connect"** next to it

### Step 3: Configure Frontend

Fill in these exact settings:

| Field | Value |
|-------|-------|
| **Name** | `video-calling-frontend` |
| **Branch** | `main` |
| **Root Directory** | `client` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `build` |

### Step 4: Add Environment Variable

Scroll down to **"Environment Variables"** section.

Click **"Add Environment Variable"**:

| Key | Value |
|-----|-------|
| `REACT_APP_BACKEND_URL` | `https://video-calling-jpz1.onrender.com` |

**Important**: Copy this URL exactly!

### Step 5: Create Static Site

1. Click **"Create Static Site"** button at the bottom
2. Wait 3-5 minutes for the build
3. Watch the build logs

You should see:
- ✅ "Resolving packages..."
- ✅ "Building..."
- ✅ "Build successful"
- ✅ "Deploy successful"

### Step 6: Get Your Frontend URL

Once deployed, you'll see your frontend URL at the top:
- It will look like: `https://video-calling-frontend.onrender.com`

**Copy this URL!** You'll need it for the next step.

---

## 📝 After Frontend Deploys

Once you have your frontend URL, we need to update the backend CORS settings.

### Update Backend Environment Variable

1. Go to your backend service in Render Dashboard
2. Click on **"video-calling-jpz1"** (your backend service)
3. Click **"Environment"** tab on the left
4. Click **"Add Environment Variable"** or edit `CLIENT_URL` if it exists
5. Add/Update:
   - Key: `CLIENT_URL`
   - Value: `https://your-frontend-url.onrender.com` (use your actual frontend URL)
6. Click **"Save Changes"**

The backend will automatically redeploy (takes 1-2 minutes).

---

## ✅ Testing Your App

Once both services are deployed:

### Test 1: Check Services

- ✅ Backend: Visit https://video-calling-jpz1.onrender.com
  - Should show: "Express server is running"
  
- ✅ Frontend: Visit your frontend URL
  - Should show: Lobby page with email and room inputs

### Test 2: Video Call

1. Open frontend URL in **Chrome**
2. Enter email: `user1@test.com`, room: `test123`
3. Click **"Join"**
4. Open same URL in **Firefox** (or Chrome Incognito)
5. Enter email: `user2@test.com`, room: `test123`
6. Click **"Join"**
7. Click **"Call"** from one browser
8. **Both cameras should connect!** 🎥

---

## 🎊 Summary

| Component | Status | URL |
|-----------|--------|-----|
| GitHub | ✅ | https://github.com/silloin/video-calling |
| Backend | ✅ LIVE | https://video-calling-jpz1.onrender.com |
| Frontend | ⏳ Deploy Now | Will be: `https://video-calling-frontend.onrender.com` |

---

**Continue with Step 1 above to deploy the frontend!** 🚀
