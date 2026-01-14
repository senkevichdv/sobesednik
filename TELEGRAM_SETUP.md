# Telegram Mini App Setup Guide

## ✅ Completed Setup Steps

1. ✅ Installed Telegram Web App SDK (`@twa-dev/sdk`)
2. ✅ Added Telegram script to HTML head in `_document.tsx`
3. ✅ Removed edge runtime (incompatible with Telegram)
4. ✅ Initialized Telegram WebApp in `_app.tsx`
5. ✅ Added Telegram theme integration (auto-detects dark/light mode)
6. ✅ Integrated MainButton for message sending
7. ✅ Added haptic feedback for user interactions
8. ✅ Added mobile-optimized viewport settings

## 🚀 Next Steps: Deployment & BotFather Setup

### 1. Deploy Your App

Deploy to a public HTTPS URL. Options:
- **Vercel** (recommended): `vercel --prod`
- **Netlify**: Connect your git repo
- **Railway/Render**: Deploy from GitHub

Make sure to set environment variable:
```
OPENAI_API_KEY=your_openai_api_key
```

### 2. Configure Your Telegram Bot

Talk to [@BotFather](https://t.me/BotFather) in Telegram:

```
/newapp

# Follow prompts:
# - Select your bot
# - Enter short name (URL slug): sobesednik
# - Enter title: Sobesednik
# - Enter description: A minimalist AI companion for reflection
# - Upload icon (640x360 PNG)
# - Upload GIF/photo for demo (optional)
# - Enter Web App URL: https://your-deployed-url.vercel.app
```

### 3. Test Your Mini App

1. Open your bot in Telegram
2. Tap the menu button or use command
3. Select your Web App

### 4. Set Menu Button (Optional)

Make the app appear on the menu button:
```
/setmenubutton
# Select your bot
# Send Web App URL
# Send button text: "Open Sobesednik"
```

## 🔧 Local Development

To test locally with Telegram:
```bash
npm run dev
```

Then use a tunnel service:
```bash
# Using ngrok
ngrok http 3000

# Or cloudflared
cloudflared tunnel --url http://localhost:3000
```

Use the HTTPS URL from the tunnel in BotFather temporarily for testing.

## 📱 Features Enabled

- ✅ Full-screen expansion
- ✅ Theme adaptation (matches Telegram dark/light mode)
- ✅ MainButton integration for sending messages
- ✅ Haptic feedback on interactions
- ✅ Mobile-optimized viewport
- ✅ Closing confirmation
- ✅ User detection (logs Telegram user info)

## 🎨 Telegram Theme Variables

The app now automatically uses these Telegram theme colors:
- `--tg-theme-bg-color`: Background color
- `--tg-theme-text-color`: Text color
- `--tg-theme-hint-color`: Secondary text
- `--tg-theme-link-color`: Links
- `--tg-theme-button-color`: Button background
- `--tg-theme-button-text-color`: Button text

## 🐛 Debugging

Check browser console (in Telegram's debug mode):
- iOS: Settings → Advanced → Enable Debug Menu, then open mini app
- Android: Install Telegram Beta, open mini app with debug tools

Console logs will show:
- Telegram WebApp version and platform
- Color scheme (dark/light)
- User information (if available)
