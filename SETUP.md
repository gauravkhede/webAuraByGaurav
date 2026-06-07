# 🚀 Setup Guide

Complete step-by-step setup instructions for the Cinematic Landing Page.

## Prerequisites

- Node.js 18 or higher
- npm, yarn, or pnpm
- A modern browser (Chrome, Firefox, Safari, Edge)
- 2 MP4 video files for the landing page

## Installation Steps

### 1. Navigate to Project Directory

```bash
cd d:\webAura
```

### 2. Install All Dependencies

```bash
npm install
```

This will install:
- **next** - Framework
- **react** - UI library
- **typescript** - Type safety
- **tailwindcss** - Styling
- **gsap** - Animations and ScrollTrigger
- **framer-motion** - UI animations
- **@studio-freight/lenis** - Smooth scrolling

Expected installation time: 2-3 minutes

### 3. Add Your Videos

Copy your MP4 videos to the public folder:

**Windows (PowerShell):**
```powershell
Copy-Item "D:\webAura\video1.mp4" "d:\webAura\public\video1.mp4"
Copy-Item "D:\webAura\video2.mp4" "d:\webAura\public\video2.mp4"
```

**Windows (Command Prompt):**
```cmd
copy D:\webAura\video1.mp4 d:\webAura\public\video1.mp4
copy D:\webAura\video2.mp4 d:\webAura\public\video2.mp4
```

**Linux/Mac:**
```bash
cp ~/webAura/video1.mp4 ./public/video1.mp4
cp ~/webAura/video2.mp4 ./public/video2.mp4
```

### 4. Verify File Structure

```
d:\webAura/
├── app/
├── components/
├── lib/
├── public/
│   ├── video1.mp4  ✓
│   └── video2.mp4  ✓
├── node_modules/
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

### 5. Start Development Server

```bash
npm run dev
```

Output:
```
  ▲ Next.js 15.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.1s
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Environment Variables

Create `.env.local` (copy from `.env.example`):

```bash
# Site Configuration
NEXT_PUBLIC_SITE_NAME=Cinematic
NEXT_PUBLIC_SITE_DESCRIPTION=Premium landing page with scroll-synced video playback
```

### Video Configuration

Edit `app/page.tsx` to adjust video properties:

```tsx
// Increase scroll distance for longer scrubbing
<ScrollVideoSection
  src="/video1.mp4"
  pinDuration={5000}  // 5000px = longer scrubbing
/>

// Adjust container height
<ScrollVideoSection
  src="/video2.mp4"
  height="120vh"
/>

// Custom overlay gradient
<ScrollVideoSection
  src="/video1.mp4"
  overlayGradient="from-transparent via-dark/20 to-dark"
/>
```

### Lenis Configuration

Edit `components/SmoothScrollProvider.tsx`:

```ts
const lenis = new Lenis({
  duration: 1.2,        // Higher = slower scroll animation
  easing: (t) => ...,   // Custom easing function
  smooth: true,
  touchMultiplier: 2,   // Mobile touch sensitivity
});
```

### GSAP Scrubbing

Edit `components/ScrollVideoSection.tsx`:

```ts
ScrollTrigger.create({
  scrub: 0.5,  // 0.3 = snappy, 1.0 = smooth
  fastScrollEnd: true,
});
```

### TailwindCSS Colors

Edit `tailwind.config.ts` to customize dark theme:

```ts
colors: {
  dark: '#0a0a0a',           // Main background
  'dark-secondary': '#1a1a1a', // Cards/sections
  'dark-tertiary': '#2a2a2a',  // Interactive elements
}
```

## Verification Checklist

- [ ] Node modules installed
- [ ] Videos copied to `public/`
- [ ] Development server running
- [ ] Page loads at http://localhost:3000
- [ ] Hero section animates smoothly
- [ ] Videos scrub with scroll
- [ ] No console errors
- [ ] Smooth scrolling works

## Building for Production

### Build

```bash
npm run build
```

Output:
```
  ▲ Next.js 15.0.0
  Route (app)                              Size     First Load JS
  ┌ ○ /                                    138 B       127 kB
  └─ ○ Static pages/prerender (0)

Build complete in 5.2s
```

### Start Production Server

```bash
npm start
```

### Create Deployment

Deploy to Vercel (recommended for Next.js):

```bash
npm install -g vercel
vercel
```

Follow the prompts to deploy.

## Video Optimization

For best performance, optimize your videos:

### Using FFmpeg

**Convert to H.264:**
```bash
ffmpeg -i input.mov -c:v libx264 -crf 23 -c:a aac output.mp4
```

**Reduce bitrate:**
```bash
ffmpeg -i input.mp4 -b:v 3M -maxrate 5M output.mp4
```

**Reduce dimensions:**
```bash
ffmpeg -i input.mp4 -vf "scale=1920:1080" output.mp4
```

**All at once:**
```bash
ffmpeg -i input.mov \
  -c:v libx264 \
  -crf 23 \
  -vf "scale=1920:1080" \
  -b:v 3M \
  -c:a aac \
  -b:a 128k \
  output.mp4
```

### Video Requirements

- **Format**: MP4 (H.264 codec)
- **Bitrate**: 2-5 Mbps
- **Resolution**: 1920x1080 or higher
- **Frame rate**: 24/30/60 fps
- **File size**: Target under 50MB

## Troubleshooting

### Videos Not Loading

**Issue**: Black screen, no video
**Solution**:
1. Check file path in `app/page.tsx`
2. Verify video file exists in `public/`
3. Clear browser cache (Ctrl+Shift+Delete)
4. Check browser console for errors

### Video Not Scrubbing

**Issue**: Video doesn't respond to scroll
**Solution**:
1. Wait for video to load (check network tab)
2. Verify GSAP and ScrollTrigger are registered
3. Check video duration is detected: `console.log(video.duration)`
4. Ensure scroll works on other elements first

### Slow Scrolling

**Issue**: Jerky or stuttering scroll
**Solution**:
1. Reduce Lenis duration: `duration: 0.8`
2. Reduce animation complexity
3. Close heavy browser extensions
4. Use Chrome instead of other browsers
5. Check for expensive re-renders (DevTools Profiler)

### Build Errors

**Issue**: `npm run build` fails
**Solution**:
1. Clear cache: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check TypeScript: `npx tsc --noEmit`
4. Review error message carefully

### Port Already in Use

**Issue**: "Port 3000 already in use"
**Solution**:
```bash
# Use different port
npm run dev -- -p 3001

# Or kill existing process (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## Performance Tuning

### Chrome DevTools Analysis

1. **Open DevTools**: F12
2. **Go to Performance tab**
3. **Record scroll interaction**
4. **Analyze FPS and frame times**

Target: 60 FPS (16.67ms per frame)

### Optimization Checklist

- [ ] Frame rate at 60 fps
- [ ] No jank during video scrubbing
- [ ] Smooth Lenis scrolling between sections
- [ ] No layout shifts (CLS < 0.1)
- [ ] Images optimized
- [ ] Videos optimized

### Advanced Tuning

**Reduce GSAP precision:**
```ts
gsap.ticker.lagSmoothing(0.5); // Default is 1
```

**Disable animations on low-end devices:**
```ts
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!prefersReducedMotion) {
  // Enable animations
}
```

## Next Steps

1. **Customize**: Modify colors, fonts, text in components
2. **Add Content**: Update sections with your own content
3. **Deploy**: Push to Vercel or your hosting platform
4. **Monitor**: Use Vercel Analytics to track performance
5. **Optimize**: Continue refining videos and animations

## Support Resources

- [Next.js Docs](https://nextjs.org/docs)
- [GSAP ScrollTrigger Guide](https://gsap.com/docs/v3/Plugins/ScrollTrigger)
- [Framer Motion Guide](https://www.framer.com/motion)
- [Lenis GitHub](https://github.com/studio-freight/lenis)

---

**Setup complete! Start developing 🎬**
