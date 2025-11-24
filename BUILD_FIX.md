# ⚠️ Build Failed - Quick Fix!

## The Problem

The build is running in the wrong directory. Render needs to know to run the build commands inside the `client` folder.

## The Solution

You need to update the **Root Directory** setting in Render.

### Fix Steps:

1. **Go to your Static Site** in Render Dashboard
   - Click on the service you just created (probably called "video-calling" or similar)

2. **Click "Settings"** tab (on the left sidebar)

3. **Scroll down to "Build & Deploy"** section

4. **Find "Root Directory"** field

5. **Change it to**: `client`
   - Make sure it's exactly: `client` (lowercase, no slashes)

6. **Click "Save Changes"** button

7. **Manual Deploy**:
   - Go back to the service page
   - Click **"Manual Deploy"** button
   - Select **"Clear build cache & deploy"**

### Expected Settings:

| Setting | Correct Value |
|---------|---------------|
| **Root Directory** | `client` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `build` |

---

## Alternative: Delete and Recreate

If the above doesn't work, you can delete the static site and recreate it:

1. **Delete the failed service**:
   - Settings → Scroll to bottom → "Delete Static Site"

2. **Create new Static Site**:
   - New + → Static Site
   - Connect repository: `silloin/video-calling`
   - **IMPORTANT**: Set Root Directory to `client` BEFORE creating

3. **Configure**:
   ```
   Name: video-calling-frontend
   Branch: main
   Root Directory: client          ← CRITICAL!
   Build Command: npm install && npm run build
   Publish Directory: build
   ```

4. **Add Environment Variable**:
   ```
   REACT_APP_BACKEND_URL=https://video-calling-jpz1.onrender.com
   ```

5. **Create Static Site**

---

## After Successful Build

You should see:
```
✅ Installing dependencies...
✅ Building React app...
✅ Build successful
✅ Deploy successful
```

Then continue with updating the backend CORS settings!

---

**Try the fix above and let me know if it works!** 🚀
