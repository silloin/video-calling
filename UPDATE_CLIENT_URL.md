# ⚠️ CORS Error Still Present

## Test Results

I just tested your app and the CORS error is still there. This means the backend `CLIENT_URL` environment variable hasn't been updated yet.

**Current Error**:
```
Access-Control-Allow-Origin header has a value 'http://localhost:3000' 
that is not equal to the supplied origin.
```

---

## 🔧 How to Fix (Step-by-Step with Screenshots)

### Step 1: Open Backend Service

1. Go to: https://dashboard.render.com/
2. Find and click on **video-calling-jpz1** (your backend service)

### Step 2: Go to Environment Tab

1. On the left sidebar, click **"Environment"**
2. You'll see a list of environment variables

### Step 3: Add CLIENT_URL Variable

**Option A: If CLIENT_URL doesn't exist**
1. Click **"Add Environment Variable"** button
2. In the **Key** field, type: `CLIENT_URL`
3. In the **Value** field, paste: `https://video-calling-frontend-cky8.onrender.com`
4. Click **"Save Changes"**

**Option B: If CLIENT_URL already exists**
1. Find the `CLIENT_URL` variable in the list
2. Click the **Edit** icon (pencil) next to it
3. Change the value to: `https://video-calling-frontend-cky8.onrender.com`
4. Click **"Save Changes"**

### Step 4: Wait for Redeploy

- Render will automatically redeploy your backend (1-2 minutes)
- You'll see a "Deploying..." message
- Wait for "Deploy successful 🎉"

### Step 5: Test Again

1. Open: https://video-calling-frontend-cky8.onrender.com/
2. Press F12 to open console
3. Refresh the page
4. Check console - CORS errors should be gone!
5. You should see: "Socket.IO connected" ✅

---

## Quick Reference

**What to add/update**:
```
Key: CLIENT_URL
Value: https://video-calling-frontend-cky8.onrender.com
```

**Where**: Render Dashboard → video-calling-jpz1 → Environment tab

---

## After Fix is Applied

Once the backend redeploys with the correct `CLIENT_URL`:

✅ CORS errors will disappear  
✅ Socket.IO will connect  
✅ You can join rooms  
✅ Video calls will work!

---

**Update the CLIENT_URL environment variable in Render now!** 🚀
