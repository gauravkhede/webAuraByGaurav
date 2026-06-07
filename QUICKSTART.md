# 🚀 QUICKSTART GUIDE

Get the Cinematic Landing Page up and running in 5 minutes.

## 1. Install Dependencies (2 min)

```bash
cd d:\webAura
npm install
```

## 2. Copy Videos (1 min)

**PowerShell:**
```powershell
Copy-Item "D:\webAura\video1.mp4" "d:\webAura\public\video1.mp4"
Copy-Item "D:\webAura\video2.mp4" "d:\webAura\public\video2.mp4"
```

**Command Prompt:**
```cmd
copy D:\webAura\video1.mp4 d:\webAura\public\video1.mp4
copy D:\webAura\video2.mp4 d:\webAura\public\video2.mp4
```

## 3. Start Development Server (1 min)

```bash
npm run dev
```

## 4. Open Browser (1 min)

Navigate to: **http://localhost:3000**

---

## 🎯 Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Main landing page with all sections |
| `components/ScrollVideoSection.tsx` | Scroll-synced video component |
| `components/SmoothScrollProvider.tsx` | Lenis + GSAP setup |
| `components/Hero.tsx` | Hero section with animations |
| `tailwind.config.ts` | Dark theme configuration |

---

## 📝 Quick Customizations

### Change Text

In `app/page.tsx`:
```tsx
<Hero />  // Edit components/Hero.tsx
```

### Adjust Video Scroll Duration

```tsx
<ScrollVideoSection 
  src="/video1.mp4"
  pinDuration={5000}  // Increase for longer scroll
/>
```

### Change Colors

In `tailwind.config.ts`:
```ts
colors: {
  dark: '#000000',  // Change background
  brand: '#FF006E', // Add brand color
}
```

### Modify Scroll Speed

In `components/SmoothScrollProvider.tsx`:
```ts
duration: 0.8  // Lower = faster, Higher = slower
```

---

## 🔧 Build for Production

```bash
# Build
npm run build

# Test production locally
npm start

# Deploy to Vercel
npm install -g vercel
vercel
```

---

## 📚 Full Documentation

- **[README.md](README.md)** - Project overview
- **[SETUP.md](SETUP.md)** - Detailed setup & troubleshooting
- **[CUSTOMIZATION.md](CUSTOMIZATION.md)** - Customize everything
- **[PERFORMANCE.md](PERFORMANCE.md)** - Optimization guide
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical deep dive
- **[DEVELOPER_TIPS.md](DEVELOPER_TIPS.md)** - Pro tips & debugging

---

## ✅ Checklist

After starting the server:

- [ ] Page loads without errors
- [ ] Hero section animates smoothly
- [ ] Videos are visible
- [ ] Scroll down triggers video scrubbing
- [ ] Scroll syncing feels smooth (60fps)
- [ ] No console errors

---

## 🆘 Quick Troubleshooting

**Videos black/not loading:**
```bash
# Verify files copied
dir d:\webAura\public\
```

**Scroll not working:**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Check console for errors

**Server won't start:**
```bash
# Kill existing process
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Try different port
npm run dev -- -p 3001
```

---

## 📖 Next Steps

1. **Customize**: Edit components and styling
2. **Add Content**: Update sections in `app/page.tsx`
3. **Deploy**: Push to Vercel or your hosting
4. **Monitor**: Check performance with Lighthouse

---

## 💬 Support

See full documentation in:
- [SETUP.md](SETUP.md) - Installation & configuration
- [PERFORMANCE.md](PERFORMANCE.md) - Speed optimization
- [ARCHITECTURE.md](ARCHITECTURE.md) - How it works  
- [DEVELOPER_TIPS.md](DEVELOPER_TIPS.md) - Debugging

---

**Your cinematic experience is ready! 🎬**

Start coding:
```bash
npm run dev
```

Enjoy! 🚀
