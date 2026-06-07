# 💡 Developer Tips & Tricks

Essential tips and tricks for developing with this Next.js 15 cinematic landing page.

## GSAP Tips

### 1. Debug ScrollTrigger

```ts
// Show ScrollTrigger markers in development
ScrollTrigger.create({
  trigger: element,
  markers: process.env.NODE_ENV === 'development',
});
```

### 2. Monitor Performance

```ts
// Check how many ScrollTriggers exist
console.log(ScrollTrigger.getAll().length);

// List all triggers
ScrollTrigger.getAll().forEach(trigger => {
  console.log(trigger.vars);
});
```

### 3. Clear All GSAP Animations

```ts
// Emergency: Kill all animations
gsap.killTweensOf('*');
ScrollTrigger.getAll().forEach(t => t.kill());
```

### 4. Test Without GSAP

```ts
// Temporarily disable GSAP to isolate issues
if (process.env.NEXT_PUBLIC_DISABLE_GSAP) {
  // Skip ScrollTrigger setup
  return;
}
```

## Video Debugging

### 1. Check Video Status

```ts
const video = videoRef.current;
console.log({
  duration: video?.duration,
  currentTime: video?.currentTime,
  readyState: video?.readyState, // 0=not started, 4=fully loaded
  networkState: video?.networkState,
  error: video?.error?.message,
});
```

### 2. Network Monitoring

```
Chrome DevTools > Network > Media
- Check video file size
- Monitor loading time
- Verify cache headers
```

### 3. Test Video Playback

```tsx
// Temporary debugging component
export function VideoDebugger({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div>
      <video ref={videoRef} src={src} controls />
      <button onClick={() => videoRef.current?.play()}>
        Play
      </button>
      <button onClick={() => videoRef.current?.pause()}>
        Pause
      </button>
      <p>Time: {videoRef.current?.currentTime.toFixed(2)}</p>
      <p>Duration: {videoRef.current?.duration.toFixed(2)}</p>
    </div>
  );
}
```

## Lenis Debugging

### 1. Monitor Scroll Info

```ts
// In SmoothScrollProvider
lenis.on('scroll', (e: any) => {
  console.log({
    scroll: e.scroll,
    velocity: e.velocity,
    direction: e.direction,
    progress: e.progress,
  });
});
```

### 2. Test Scroll Events

```ts
// Programmatic scroll
lenis.scrollTo(element, {
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
```

### 3. Disable Smooth Scroll Temporarily

```tsx
// In SmoothScrollProvider
const lenis = new Lenis({
  smooth: process.env.NEXT_PUBLIC_DISABLE_LENIS !== 'true',
});
```

## React/Next.js Tips

### 1. Hot Reload Testing

```tsx
// Add key to force re-render of component
<ScrollVideoSection key={videoSrc} src={videoSrc} />
```

### 2. Memory Leak Detection

```tsx
// Use cleanup function properly
useEffect(() => {
  const listener = () => { /* ... */ };
  window.addEventListener('scroll', listener);
  
  return () => {
    window.removeEventListener('scroll', listener);
  };
}, []); // Empty dependency array
```

### 3. Debug Component Renders

```tsx
import { useEffect } from 'react';

export function useRenderCount(componentName: string) {
  const countRef = useRef(0);

  useEffect(() => {
    countRef.current++;
    console.log(`${componentName} rendered ${countRef.current} times`);
  });

  return countRef.current;
}

// Usage in component
const renderCount = useRenderCount('Hero');
```

## Performance Profiling

### 1. Chrome DevTools Performance Tab

```
1. Open DevTools (F12)
2. Go to Performance tab
3. Press Ctrl+Shift+E to record
4. Interact with page (scroll, click)
5. Stop recording (Ctrl+Shift+E)
6. Analyze flame chart
```

**Look for:**
- Long tasks (> 50ms)
- Janky frames (drops below 60fps)
- Main thread blocking

### 2. Profiler Component

```tsx
import { Profiler, ProfilerOnRenderCallback } from 'react';

const onRender: ProfilerOnRenderCallback = (
  id, phase, actualDuration, baseDuration
) => {
  console.log(`${id} (${phase}) took ${actualDuration}ms`);
};

export function ProfiledComponent() {
  return (
    <Profiler id="my-component" onRender={onRender}>
      <Hero />
    </Profiler>
  );
}
```

## Testing Tips

### 1. E2E Testing with Playwright

```bash
npm install -D @playwright/test

# Create test file: e2e/scroll-video.spec.ts
```

```ts
import { test, expect } from '@playwright/test';

test('video scrubs with scroll', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Check video loaded
  const video = page.locator('video');
  await expect(video).toBeVisible();
  
  // Scroll and check
  await page.evaluate(() => window.scrollBy(0, 1000));
  
  // Verify video time progressed
  const currentTime = await video.evaluate((el: any) => el.currentTime);
  expect(currentTime).toBeGreaterThan(0);
});
```

### 2. Visual Regression Testing

```bash
npm install -D @percy/cli

# Take screenshots
percy snapshot http://localhost:3000
```

## Deployment Debugging

### 1. Environment Variables

```env
# .env.local (development)
NEXT_PUBLIC_DEBUG=true
NEXT_PUBLIC_DISABLE_LENIS=false

# .env.production (production)
NEXT_PUBLIC_DEBUG=false
```

### 2. Build Analysis

```bash
# Analyze bundle size
npm install -D @next/bundle-analyzer

# In next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);

# Run
ANALYZE=true npm run build
```

### 3. Production Stack Traces

```tsx
// Add error boundary
'use client';

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export class ErrorBoundary extends React.Component<Props> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: any) {
    console.error('Error caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong</div>;
    }
    return this.props.children;
  }
}
```

## Browser DevTools Shortcuts

| Action | Shortcut |
|--------|----------|
| Open DevTools | F12 |
| DevTools Menu | Ctrl+Shift+J (console) |
| Performance | Ctrl+Shift+E |
| Network | Ctrl+Shift+E |
| Elements | Ctrl+Shift+C |
| Console | Ctrl+Shift+K |
| Search CSS | Ctrl+F |
| Format Code | Ctrl+Shift+F |

## VS Code Extensions for Development

### Recommended

1. **ES7+ React/Redux/React-Native snippets**
   - Quick React component snippets

2. **Tailwind CSS IntelliSense**
   - Autocomplete for Tailwind classes

3. **Thunder Client** or **REST Client**
   - Test API calls

4. **GitLens**
   - Git history in editor

5. **Error Lens**
   - Inline error messages

### Installation

```bash
# Install extensions via terminal
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension bradlc.vscode-tailwindcss
code --install-extension rangav.vscode-thunder-client
code --install-extension eamodio.gitlens
code --install-extension usernamehw.errorlens
```

## Quick Commands

```bash
# Format code
npx prettier --write .

# Fix linting
npm run lint -- --fix

# Check types
npx tsc --noEmit

# Clean build
rm -rf .next && npm run build

# Test build locally
npm run build && npm start

# Analyze bundle
ANALYZE=true npm run build
```

## Common Issues & Solutions

### Issue: Video Not Seeking Smoothly

```ts
// Add interpolation
const proxy = { currentTime: 0 };
gsap.to(proxy, {
  currentTime: duration,
  duration: duration,
  ease: 'linear',  // Try different ease
  onUpdate: () => {
    video.currentTime = proxy.currentTime;
  },
});
```

### Issue: Scroll Events Not Firing

```ts
// Check if ScrollTrigger is refreshed
ScrollTrigger.refresh();

// Force update
window.dispatchEvent(new Event('resize'));
```

### Issue: GSAP Conflicts

```ts
// Use different gsap instances if needed
import { gsap as gsapInstance1 } from 'gsap';
import { gsap as gsapInstance2 } from 'gsap';

// Avoid global state conflicts
```

### Issue: Memory Leaks

```tsx
// Always cleanup
useEffect(() => {
  const trigger = ScrollTrigger.create({...});
  
  // Verify cleanup happens
  console.log('Creating trigger');
  
  return () => {
    console.log('Cleaning up trigger');
    trigger.kill();
  };
}, []);
```

## Useful Snippets

### Video Auto-Pause on Tab Change

```ts
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    videoRef.current?.pause();
  }
});
```

### Detect Mobile Device

```ts
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Use in component
if (isMobile) {
  // Reduce complexity
}
```

### Get Scroll Position

```ts
// Get exact scroll position in Lenis
let currentScroll = 0;
lenis.on('scroll', (e: any) => {
  currentScroll = e.scroll;
});
```

### Force Repaint

```ts
// Sometimes needed for smooth animations
element.style.transform = 'translateZ(0)';
```

## Final Tips

1. **Always clean up timelines and triggers in useEffect**
2. **Test on actual devices, not just desktop**
3. **Monitor Core Web Vitals regularly**
4. **Keep dependency arrays accurate**
5. **Use useRef for frequent DOM access**
6. **Profile before optimizing**
7. **Document custom configurations**
8. **Backup working versions before major changes**

---

**Happy coding! 🚀**
