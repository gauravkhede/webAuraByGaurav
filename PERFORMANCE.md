# 🎯 Performance Optimization Guide

Advanced performance tips and optimizations for the Cinematic Landing Page.

## Performance Targets

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Scroll FPS**: Constant 60 FPS
- **Time to Interactive (TTI)**: < 3.5s

## GSAP Optimization

### 1. Ticker Configuration

```ts
// In SmoothScrollProvider.tsx
gsap.ticker.lagSmoothing(0);  // Disable lag smoothing for responsiveness
gsap.ticker.useRAF(true);     // Use requestAnimationFrame
```

### 2. ScrollTrigger Caching

```ts
// Cache ScrollTrigger instances to avoid recreation
const triggerRef = useRef<ScrollTrigger | null>(null);

useEffect(() => {
  if (triggerRef.current) triggerRef.current.kill();
  triggerRef.current = ScrollTrigger.create({...});
  return () => triggerRef.current?.kill();
}, []);
```

### 3. Timeline Performance

```ts
// Use proxy object for smooth scrubbing
const proxy = { currentTime: 0 };
const tl = gsap.timeline({
  onUpdate: () => {
    video.currentTime = proxy.currentTime;  // Single reassignment per frame
  },
});
```

### 4. Disable Unnecessary Markers

```ts
ScrollTrigger.create({
  markers: false,  // ✓ Always false in production
});
```

## Lenis Optimization

### 1. Adjust Duration Based on Content

```ts
// Light: Quick animations
duration: 0.8

// Medium: Standard
duration: 1.2

// Heavy: Luxury feel
duration: 1.6
```

### 2. Touch Sensitivity

```ts
const lenis = new Lenis({
  touchMultiplier: 2,  // Higher = more sensitive to touch
});
```

### 3. Easing Function Performance

```ts
// Fast (cheap)
easing: (t) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t

// Medium (standard)
easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

// Custom (optimized)
easing: (t: number) => {
  // Precompute expensive calculations
  const lookupTable = new Array(100);
  return lookupTable[Math.round(t * 99)] || t;
}
```

## Video Optimization

### 1. Format Selection

**Best: MP4 (H.264)**
- Wide browser support
- Good compression
- Hardware acceleration

```html
<video>
  <source src="video.mp4" type="video/mp4" />
  <source src="video.webm" type="video/webm" />
</video>
```

### 2. Bitrate Reduction

**File Size Impact:**
```
8 Mbps: ~60 MB (1 min)  ❌ Too large
5 Mbps: ~37.5 MB        ⚠️  Acceptable
3 Mbps: ~22.5 MB        ✓  Good
2 Mbps: ~15 MB          ✓✓ Best
```

### 3. Video Preloading Strategy

```tsx
<video
  preload="metadata"      // ✓ Only load metadata (30KB)
  muted                   // ✓ Browsers optimize muted videos
  playsInline             // ✓ Play in viewport
  crossOrigin="anonymous" // ✓ CDN compatibility
/>
```

### 4. Video Dimensions

```bash
# Optimize for common resolutions
1920x1080  # Standard
1440x810   # Smaller file
1280x720   # Mobile-friendly
```

### 5. Frame Rate Selection

```
60 fps: Smooth but larger file
30 fps: Good compromise
24 fps: Cinematic feel
```

## React Optimization

### 1. useRef for DOM Access

```tsx
// ✓ Correct: No re-renders
const videoRef = useRef<HTMLVideoElement>(null);

// ❌ Wrong: Causes re-renders
const [video, setVideo] = useState<HTMLVideoElement>();
```

### 2. Minimal State

```tsx
// ✓ Correct: Only essential state
const [isLoading, setIsLoading] = useState(true);

// ❌ Wrong: Unnecessary state
const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);
const [isPlaying, setIsPlaying] = useState(false);
```

### 3. Event Handler Cleanup

```tsx
useEffect(() => {
  const handleScroll = () => { /* ... */ };
  
  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
```

## Next.js Optimization

### 1. Image Optimization

```tsx
import Image from 'next/image';

// ✓ Optimized
<Image
  src="/poster.jpg"
  width={1920}
  height={1080}
  priority
/>

// ❌ Not optimized
<img src="/poster.jpg" />
```

### 2. Font Optimization

```tsx
// In layout.tsx - use system fonts
const systemFont = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;

// or import optimized Google Font
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
```

### 3. Code Splitting

```tsx
// ✓ Dynamic imports
const ScrollVideoSection = dynamic(
  () => import('@/components/ScrollVideoSection'),
  { ssr: false }
);

// ✓ Lazy load components
const CTASection = dynamic(() => import('@/components/CTASection'));
```

### 4. Build Optimization

```bash
# Analyze bundle
npm install -D @next/bundle-analyzer

# Check for large dependencies
npm ls [package-name]

# Remove unused code
npm prune --production
```

## CSS Optimization

### 1. Critical CSS

```css
/* Inline critical styles in layout.tsx */
@layer base {
  body {
    @apply bg-dark text-white;
  }
}
```

### 2. GPU Acceleration

```css
/* Use GPU for animations */
.video-section {
  will-change: transform;
  transform: translateZ(0);
}

video {
  will-change: auto;  /* Reset for inactive elements */
}
```

### 3. TailwindCSS Optimization

```ts
// tailwind.config.ts
purge: [
  './app/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
],
```

## Browser Performance

### 1. Chrome DevTools Profiling

```
1. Open DevTools (F12)
2. Go to Performance tab
3. Click Record (Ctrl+Shift+E)
4. Scroll through page
5. Click Stop
6. Analyze flame chart
```

**Target metrics:**
- Main thread idle time: > 50%
- Frame rate: 60 fps
- Long tasks: None > 50ms

### 2. Lighthouse Audit

```
1. DevTools → Lighthouse
2. Click "Analyze page load"
3. Review metrics
4. Check recommendations
```

**Targets:**
- Performance: > 90
- FCP: < 1.5s
- LCP: < 2.5s

### 3. Network Optimization

```
DevTools → Network
- Monitor video file sizes
- Check for unnecessary requests
- Verify caching headers
```

## Production Checklist

### Build Quality

```bash
# Check for TypeScript errors
npx tsc --noEmit

# Run ESLint
npm run lint

# Test build
npm run build
npm start
```

### Performance Testing

- [ ] Lighthouse score > 90
- [ ] Core Web Vitals green
- [ ] No console errors
- [ ] Scroll FPS constant 60
- [ ] Videos load and scrub smoothly

### Deployment Optimization

```js
// next.config.js
compression: true,
poweredByHeader: false,
reactStrictMode: true,
```

## Advanced Techniques

### 1. Web Worker for Video Processing

```ts
// Not needed for basic scrubbing, but for advanced cases:
const worker = new Worker('/video-worker.js');
worker.postMessage({ frame: 0, duration: 10 });
```

### 2. RequestAnimationFrame Timing

```ts
// Sync all animations to single RAF
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
  ScrollTrigger.update();
});
```

### 3. Debounce Resize Events

```ts
let timeoutId: NodeJS.Timeout;
window.addEventListener('resize', () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});
```

## Monitoring in Production

### 1. Core Web Vitals

```tsx
// Use web-vitals library
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### 2. Analytics Integration

```tsx
// Google Analytics
gtag('event', 'page_view', {
  page_path: '/',
  page_title: 'Home',
});
```

## Common Performance Issues

### Issue: Video Choppiness

**Cause**: Video codec incompatibility
**Solution**: Use H.264 MP4

**Cause**: High bitrate
**Solution**: Reduce to 2-3 Mbps

**Cause**: Browser tab not focused
**Solution**: Videos pause in background by default

### Issue: Scroll Lag

**Cause**: Too many ScrollTriggers
**Solution**: Consolidate triggers, throttle updates

**Cause**: Heavy animations
**Solution**: Use CSS transforms/opacity only

**Cause**: Lenis duration too high
**Solution**: Reduce to 0.8-1.0

### Issue: Large Bundle Size

**Cause**: Unused dependencies
**Solution**: Tree-shake unnecessary code

**Cause**: Large videos
**Solution**: Reference from CDN, not bundle

## Performance Budget

### Recommended Limits

| Metric | Mobile | Desktop |
|--------|--------|---------|
| JS Bundle | < 200KB | < 300KB |
| Fonts | < 150KB | < 200KB |
| Videos | Referenced externally |
| Images | < 500KB total | < 1MB total |
| TTI | < 3.5s | < 3s |
| LCP | < 2.5s | < 2s |

---

**Keep your landing page fast and smooth! 🚀**
