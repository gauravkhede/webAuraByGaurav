# 🏗️ Architecture Overview

Deep dive into the technical architecture and design decisions of the Cinematic Landing Page.

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                       Application Layer                   │
│  ┌─────────────┬──────────────┬──────────────────────┐  │
│  │    Hero     │  Transition  │  ScrollVideo Section │  │
│  │  Component  │   Component  │      Component       │  │
│  └─────────────┴──────────────┴──────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                     Component Layer                       │
│  ┌─────────────────────────────────────────────────┐    │
│  │          SmoothScrollProvider                    │    │
│  │  (Lenis + GSAP Ticker Integration)             │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                   Animation Engine Layer                  │
│  ┌──────────────────────────────────────────────────┐   │
│  │  GSAP                   │  Framer Motion         │   │
│  │  - ScrollTrigger        │  - Motion Components   │   │
│  │  - Timeline             │  - Transitions         │   │
│  │  - Proxy Objects        │  - Gestures           │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                   Scroll Layer (Lenis)                    │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Smooth Damping  │  Easing  │  Sync to RAF      │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    Browser APIs                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │  requestAnimationFrame  │  HTML5 Video API      │   │
│  │  Wheel/Touch Events     │  Scroll Events        │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Data Flow

### Scroll to Video Playback Flow

```
User Scroll Event
       ↓
Native Browser Event
       ↓
Lenis Processes (Smooth Damping)
       ↓
GSAP Ticker (RAF Sync)
       ↓
ScrollTrigger Updates
       ↓
Timeline Progress Calculation
       ↓
Proxy Object Animation
       ↓
Video.currentTime Update
       ↓
Browser Renders Frame
```

## Component Architecture

### Hierarchical Structure

```
RootLayout
├── SmoothScrollProvider (Context-like)
│   └── Main Page Content
│       ├── Hero
│       │   ├── Motion Container
│       │   ├── Motion Items (h1, p, buttons)
│       │   └── ScrollIndicator
│       │
│       ├── ScrollVideoSection (Video 1)
│       │   ├── Video Element
│       │   ├── Gradient Overlay
│       │   └── ScrollTrigger
│       │
│       ├── TransitionSection
│       │   ├── Motion Title
│       │   └── Motion Description
│       │
│       ├── ScrollVideoSection (Video 2)
│       │   └── (Same as Video 1)
│       │
│       ├── TransitionSection (Final)
│       │
│       └── CTASection
│           ├── Motion Container
│           └── Motion Elements
```

## Key Design Patterns

### 1. Proxy Object Pattern (GSAP)

```ts
// Problem: Direct video.currentTime updates cause jitter
// Solution: Animate a proxy object instead

const proxy = { currentTime: 0 };

tl.to(proxy, {
  currentTime: duration,
  onUpdate: () => {
    video.currentTime = proxy.currentTime;  // Smooth interpolation
  },
});
```

**Benefits:**
- Eliminates jitter from direct seeking
- Smooth interpolation between frames
- Better browser optimization

### 2. Cleanup Pattern (React)

```ts
// Problem: Memory leaks from unmounted components
// Solution: Return cleanup functions

useEffect(() => {
  const trigger = ScrollTrigger.create({...});
  
  return () => {
    trigger.kill();  // Clean up on unmount
  };
}, []);
```

**Benefits:**
- Prevents memory leaks
- Avoids duplicate listeners
- Proper resource management

### 3. Metadata Loading Pattern

```ts
// Problem: ScrollTrigger setup before video metadata loads
// Solution: Wait for loadedmetadata event

const onLoadedMetadata = () => {
  ScrollTrigger.create({...});
};

video.addEventListener('loadedmetadata', onLoadedMetadata);
```

**Benefits:**
- Access to video.duration
- Reliable initialization
- Error prevention

### 4. RAF Synchronization Pattern

```ts
// Problem: Multiple animation loops competing
// Solution: Sync all to single GSAP ticker

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
  ScrollTrigger.update();
});
```

**Benefits:**
- Single animation loop
- Better performance
- Synchronized animations

## State Management

### Minimal State Approach

```tsx
// ✓ Correct: Only UI state
const [isLoading, setIsLoading] = useState(true);

// ❌ Avoid: Scroll-derived state
const [scrollY, setScrollY] = useState(0);  // Updates too frequently
```

**Why minimal state:**
- Fewer re-renders
- Better performance
- Easier debugging
- Simpler component logic

## Performance Optimizations

### 1. useRef for DOM Access

```tsx
// Direct DOM access without triggers re-renders
const videoRef = useRef<HTMLVideoElement>(null);
const containerRef = useRef<HTMLDivElement>(null);
```

### 2. CSS GPU Acceleration

```css
/* 3D transforms force GPU acceleration */
will-change: transform;
transform: translateZ(0);
```

### 3. Event Listener Management

```ts
// Single listener per element, not per frame
window.addEventListener('resize', handleResize);

// Proper cleanup
return () => window.removeEventListener('resize', handleResize);
```

## Error Handling Strategy

```tsx
// 1. Video Load Failures
const handleError = () => {
  console.warn('Video failed to load');
  setIsLoading(false);
};

// 2. Invalid Metadata
if (!duration || !isFinite(duration)) {
  console.warn('Invalid video duration');
  return;
}

// 3. Seeking Errors
try {
  video.currentTime = proxy.currentTime;
} catch (e) {
  console.warn('Error seeking video:', e);
}
```

## Browser Compatibility

### Supported Browsers

| Browser | Version | Support |
|---------|---------|---------|
| Chrome  | 90+     | ✅ Full |
| Firefox | 88+     | ✅ Full |
| Safari  | 14+     | ✅ Full |
| Edge    | 90+     | ✅ Full |

### Polyfills

```ts
// No polyfills needed for modern targets
// All APIs are native to modern browsers
```

## Build Pipeline

```
Source Code
   ↓
  ESLint (Linting)
   ↓
TypeScript (Type Checking)
   ↓
   Next.js Build
   └─ SWC Compilation
   └─ Code Splitting
   └─ Tree Shaking
   ↓
Tailwind CSS Processing
   ↓
Output
   ├─ .next/static/ (bundles)
   ├─ public/      (assets)
   └─ .next/server/ (server code)
```

## File Organization Rationale

```
app/
├── page.tsx          # Main page, minimal logic
├── layout.tsx        # Meta, providers
└── globals.css       # Global styles

components/
├── SmoothScrollProvider.tsx  # Setup logic
├── ScrollVideoSection.tsx    # Reusable video
├── Hero.tsx                  # Homepage hero
├── TransitionSection.tsx     # Content sections
├── CTASection.tsx            # Call-to-action
└── index.ts                  # Export barrel

lib/
└── gsap-utils.ts    # Utility functions

public/
├── video1.mp4
└── video2.mp4
```

**Why this structure:**
- Clear separation of concerns
- Easy to locate files
- Scalable for growth
- Component reusability

## Dependency Graph

```
Next.js 15
├── React 19
├── React DOM 19
├── TypeScript 5
├── TailwindCSS 3
├── PostCSS
└── Autoprefixer

GSAP 3
├── gsap/ScrollTrigger
└── gsap/Ticker

Framer Motion 11
└── (Animation library)

Lenis 1
└── @studio-freight

(Dev Dependencies)
├── ESLint
└── Prettier
```

## Performance Considerations

### 1. Video Codec Impact

| Codec  | Browser Support | File Size | CPU Usage |
|--------|-----------------|-----------|-----------|
| H.264  | 95%            | Medium    | Low       |
| VP9    | 60%            | Small     | High      |
| AV1    | 40%            | Smallest  | Very High |

**Recommendation:** H.264 (best balance)

### 2. Animation Complexity

**Tier 1 (Cheap):**
- Transform/Opacity
- CSS transitions
- No JavaScript

**Tier 2 (Medium):**
- GSAP basic animations
- Framer Motion simple
- Few ScrollTriggers

**Tier 3 (Expensive):**
- Many simultaneous animations
- Complex calculations
- Heavy state updates

## Scaling Considerations

### Adding More Videos

```tsx
// Current: 2 videos
<ScrollVideoSection src="/video1.mp4" />
<ScrollVideoSection src="/video2.mp4" />

// Scalable: Many videos
const videos = ['video1.mp4', 'video2.mp4', 'video3.mp4'];
{videos.map(src => (
  <ScrollVideoSection key={src} src={src} />
))}
```

### Adding Features

**Without breaking existing:**
1. Create new components
2. Add to page
3. Test independently
4. Integrate carefully

### Performance at Scale

**Bottleneck:** ScrollTrigger count
- Limit: ~20-30 active triggers
- Solution: Batch updates, use namespaces

## Testing Strategy

### Unit Testing

```ts
// Test GSAP utilities
import { createVideoScrubTimeline } from '@/lib/gsap-utils';

test('creates timeline with correct duration', () => {
  const video = document.createElement('video');
  video.duration = 10;
  
  const { timeline } = createVideoScrubTimeline(video, 10);
  expect(timeline.duration()).toBe(10);
});
```

### Integration Testing

```ts
// Test component initialization
test('initializes ScrollTrigger on metadata load', () => {
  // Render component
  // Wait for video metadata
  // Check trigger exists
});
```

### E2E Testing

```ts
// Test full user flow
test('video scrubs smoothly when scrolling', () => {
  // Navigate to page
  // Scroll down
  // Verify video progresses
});
```

## Maintenance Plan

### Regular Updates

| Frequency | Task |
|-----------|------|
| Monthly   | Update dependencies |
| Quarterly | Performance audit |
| Annual    | Major version upgrades |

### Monitoring

```ts
// Track performance
const reportWebVitals = (metric) => {
  console.log(metric);
  // Send to analytics service
};
```

---

**Well-architected for maintainability and performance! 🏛️**
