# 🚀 WebRTC Meet Clone - Deployment Ready!

## 📦 What's Included

- ✅ WebRTC video calling
- ✅ Socket.IO real-time communication
- ✅ Camera "already in use" issue fixed
- ✅ Production-ready configuration

## 🏃 Quick Start (Local Development)

### 1. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Run the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm start
```

### 3. Open in Browser

- Frontend: http://localhost:3000
- Backend: http://localhost:8000

## 🌐 Deploy to Render

### Quick Deploy (Separate Services)

#### Backend Deployment

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `meet-clone-backend`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Click "Create Web Service"
6. **Copy your backend URL**: `https://meet-clone-backend.onrender.com`

#### Frontend Deployment

1. Create `.env` file in `client/` folder:
   ```
   REACT_APP_BACKEND_URL=https://meet-clone-backend.onrender.com
   ```

2. Go to Render Dashboard
3. Click "New +" → "Static Site"
4. Connect your GitHub repository
5. Configure:
   - **Name**: `meet-clone-frontend`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
6. Add Environment Variable:
   - Key: `REACT_APP_BACKEND_URL`
   - Value: `https://meet-clone-backend.onrender.com`
7. Click "Create Static Site"

### ✅ That's It!

Your app will be live at: `https://meet-clone-frontend.onrender.com`

## 🧪 Testing Your Deployment

1. Open your deployed site in **two different browsers**
2. Enter the same room ID in both
3. Click "Call" from one browser
4. Both cameras should connect! ✅

## ⚠️ Important Notes

### HTTPS Required
- Camera/microphone **only work on HTTPS** in production
- Render provides free HTTPS automatically ✅

### Free Tier Limitations
- Services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- Upgrade to paid tier for 24/7 uptime

### TURN Servers (Optional)
- Current setup uses STUN servers (works for 60-70% of users)
- Add TURN servers for better connectivity
- See `render_deployment_guide.md` for TURN server setup

## 📁 Project Structure

```
Starter Code/
├── client/                 # React frontend
│   ├── src/
│   │   ├── Context/       # Socket.IO context
│   │   ├── screens/       # Lobby & Room components
│   │   ├── service/       # WebRTC peer service
│   │   └── App.js
│   └── package.json
├── server/                # Node.js backend
│   ├── index.js          # Express + Socket.IO server
│   └── package.json
└── README.md
```

## 🔧 Configuration Files

### Backend (`server/package.json`)
```json
{
  "scripts": {
    "start": "node index.js",      // Production
    "dev": "nodemon index.js"      // Development
  }
}
```

### Frontend (`.env`)
```env
REACT_APP_BACKEND_URL=https://your-backend.onrender.com
```

## 🐛 Troubleshooting

### Camera Not Working
- ✅ Make sure you're using HTTPS (Render provides this)
- ✅ Check browser permissions
- ✅ Close other apps using camera

### Connection Issues
- ✅ Check backend URL in environment variables
- ✅ Verify CORS settings in server
- ✅ Check browser console for errors

### Video Not Connecting
- ✅ Try different browsers
- ✅ Check firewall settings
- ✅ Consider adding TURN servers

## 📚 Documentation

- [Deployment Guide](render_deployment_guide.md) - Complete deployment instructions
- [Camera Fix Summary](camera_fix_summary.md) - WebRTC camera issue resolution

## 🎉 Features

- ✅ Real-time video calling
- ✅ WebRTC peer-to-peer connection
- ✅ Socket.IO signaling
- ✅ Room-based sessions
- ✅ Camera/microphone access
- ✅ Production-ready deployment

## 🚀 Next Steps

1. **Deploy to Render** (see instructions above)
2. **Add TURN servers** for better connectivity
3. **Customize UI** to match your brand
4. **Add features**:
   - Screen sharing
   - Chat messages
   - Recording
   - Multiple participants

## 📝 License

MIT

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Built with ❤️ using React, Node.js, Socket.IO, and WebRTC**
