# 🎬 Cinematic Landing Page

A premium, cinematic landing page built with Next.js 15, TypeScript, TailwindCSS, GSAP, Framer Motion, and Lenis smooth scrolling. Features perfectly synchronized scroll-driven video playback.

## ✨ Features

- **Smooth Scrolling**: Lenis integration for buttery-smooth scrolling experience
- **Scroll-Synced Video**: GSAP ScrollTrigger for pixel-perfect video scrubbing
- **60fps Performance**: Optimized animations and smooth playback
- **Dark Premium Aesthetic**: Modern luxury UI with premium typography
- **Framer Motion Animations**: Subtle, sophisticated UI transitions
- **Fully Responsive**: Desktop-first with mobile optimization
- **TypeScript**: Fully typed codebase
- **Production Ready**: Clean, maintainable component architecture

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: 
  - GSAP (ScrollTrigger, Timeline)
  - Framer Motion
- **Smooth Scrolling**: Lenis (@studio-freight/lenis)
- **Performance**: React hooks optimization, useRef for DOM access

## 📋 Requirements

- Node.js 18+ 
- npm or yarn

## 🚀 Quick Start

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Copy Videos

The project expects videos at:
- \`public/video1.mp4\`
- \`public/video2.mp4\`

Copy your video files:
```bash
cp /path/to/video1.mp4 public/video1.mp4
cp /path/to/video2.mp4 public/video2.mp4
```

### 3. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
d:\webAura/
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Main landing page
│   └── globals.css          # Global styles
├── components/
│   ├── SmoothScrollProvider.tsx    # Lenis + GSAP setup
│   ├── ScrollVideoSection.tsx      # Scroll-synced video
│   ├── Hero.tsx             # Hero section with animations
│   ├── TransitionSection.tsx       # Content sections
│   └── CTASection.tsx       # Call-to-action section
├── public/
│   ├── video1.mp4           # First video
│   └── video2.mp4           # Second video
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🎨 Page Sections

1. **Hero Section**: Animated entrance with Framer Motion
2. **Video 1**: Scroll-synced video playback (3000px scroll distance)
3. **Transition**: Typography-focused section
4. **Video 2**: Second scroll-synced video
5. **Transition**: Final content section
6. **CTA**: Call-to-action buttons
7. **Footer**: Site navigation and info

## 🔧 Key Components

### SmoothScrollProvider

Wraps the entire app with Lenis smooth scrolling and GSAP integration.

```tsx
<SmoothScrollProvider>
  {children}
</SmoothScrollProvider>
```

**Features:**
- Lenis smooth scrolling with easing
- GSAP ticker integration for continuous updates
- ScrollTrigger synchronization
- Automatic refresh on window resize

### ScrollVideoSection

Scroll-synced video component with GSAP ScrollTrigger.

```tsx
<ScrollVideoSection
  src="/video1.mp4"
  height="100vh"
  pinDuration={3000}
/>
```

**Props:**
- `src` (string): Video file path
- `height` (string, default: "100vh"): Container height
- `pinDuration` (number, default: 3000): Scroll distance for pinning

**How it works:**
1. Waits for video metadata to load
2. Creates a GSAP animation timeline
3. Uses a proxy object to avoid jitter
4. Maps scroll progress to video currentTime
5. ScrollTrigger pins the section during playback

### Hero Component

Animated hero section with typed content.

```tsx
<Hero />
```

Uses Framer Motion for:
- Staggered child animations
- Scroll indicator bounce
- Button hover/tap interactions

### TransitionSection

Reusable section for content between videos.

```tsx
<TransitionSection
  title="Your Title"
  subtitle="Optional subtitle"
  description="Optional description"
  accentColor="from-blue-400"
/>
```

### CTASection

Call-to-action section with animated buttons.

```tsx
<CTASection />
```

## ⚙️ Configuration

### GSAP Settings

In `SmoothScrollProvider.tsx`:
- `gsap.ticker.lagSmoothing(0)`: Disables lag smoothing for better performance
- `scrub: 0.5`: Smoothing factor (adjust 0.3-1 for different feels)

### Lenis Settings

In `SmoothScrollProvider.tsx`:
```ts
const lenis = new Lenis({
  duration: 1.2,              // Scroll duration
  easing: (t) => ...,         // Easing function
  direction: 'vertical',
  smooth: true,
  touchMultiplier: 2,         // Mobile scroll sensitivity
});
```

### Video Pin Duration

Adjust scroll distance for video scrubbing:
```tsx
<ScrollVideoSection pinDuration={3000} />  // 3000px scroll
<ScrollVideoSection pinDuration={5000} />  // 5000px scroll
```

## 📱 Responsive Design

- **Desktop**: Full animations and smooth scrolling
- **Tablet**: Optimized spacing and text sizes
- **Mobile**: Touch-friendly interactions, simplified animations

Breakpoints:
- `md`: 768px
- `lg`: 1024px

## 🚀 Performance Optimization

1. **useRef Heavy**: No unnecessary re-renders
2. **ScrollTrigger Cleanup**: Proper cleanup on unmount
3. **State Avoidance**: Minimal state updates during scroll
4. **GSAP Ticker**: Single animation loop for all updates
5. **CSS GPU Acceleration**: Transform/opacity animations
6. **Video Optimization**: 
   - Muted + playsInline attributes
   - crossOrigin for CDN compatibility
   - Hardware-accelerated playback

## 🎯 Best Practices

### Adding New Sections

1. Create component in `components/`
2. Use Framer Motion for animations
3. Use TailwindCSS for styling
4. Add to main page in `app/page.tsx`

### Video Optimization Tips

- Use H.264 codec for best compatibility
- Optimize bitrate (2-5Mbps for web)
- Keep videos under 50MB if possible
- Provide WebM fallback for Firefox optimization

### GSAP Best Practices

```ts
// ✅ DO: Create animations in useEffect
useEffect(() => {
  const trigger = ScrollTrigger.create({...})
  return () => trigger.kill()
}, [])

// ❌ DON'T: Create animations in render
const trigger = ScrollTrigger.create({...})
```

## 🐛 Troubleshooting

### Video Not Scrubbing

1. Check video is muted and playsInline
2. Verify metadata loads: check browser console
3. Increase `pinDuration` for more scroll distance
4. Check GSAP registration: `gsap.registerPlugin(ScrollTrigger)`

### Jumpy Scrolling

1. Verify Lenis initialization in SmoothScrollProvider
2. Check GSAP ticker integration
3. Disable browser extensions that modify scrolling
4. Clear browser cache

### Performance Issues

1. Reduce Lenis duration (0.8-1.0)
2. Reduce Framer Motion animation count
3. Optimize video bitrate
4. Use Chrome DevTools Performance tab

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [GSAP Docs](https://gsap.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion)
- [Lenis Docs](https://github.com/studio-freight/lenis)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

## 📝 Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🎬 Example: Custom Video Section

Create a reusable video gallery:

```tsx
interface VideoProps {
  videos: { src: string; title: string }[]
}

export function VideoGallery({ videos }: VideoProps) {
  return (
    <>
      {videos.map((video) => (
        <div key={video.src}>
          <h2>{video.title}</h2>
          <ScrollVideoSection src={video.src} />
        </div>
      ))}
    </>
  );
}
```

## 📄 License

MIT - Feel free to use this project as a template for your own work.

## 🙌 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

---

**Built with ❤️ for premium web experiences**
