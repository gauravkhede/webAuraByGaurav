# 🎨 Customization Guide

Complete guide to customizing the Cinematic Landing Page for your specific needs.

## Color Customization

### Update Dark Theme

Edit `tailwind.config.ts`:

```ts
theme: {
  extend: {
    colors: {
      // Primary colors
      dark: '#0a0a0a',
      'dark-secondary': '#1a1a1a',
      'dark-tertiary': '#2a2a2a',
      
      // Add custom colors
      'brand-primary': '#FF006E',
      'brand-secondary': '#8338EC',
      'brand-accent': '#FFBE0B',
    },
  },
},
```

### Update Component Colors

Hero component:

```tsx
// Change gradient colors
<span className="bg-gradient-to-r from-white via-gray-200 to-gray-400">
  Cinematic
</span>

// Update button colors
<button className="bg-white text-dark hover:bg-gray-100">
  Explore Now
</button>
```

## Typography Customization

### Add Custom Fonts

In `tailwind.config.ts`:

```ts
fontFamily: {
  sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
  serif: ['Playfair Display', 'serif'],
  mono: ['Roboto Mono', 'monospace'],
},
```

In `app/layout.tsx`:

```tsx
import { Playfair_Display, Roboto_Mono } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'] });
const robotoMono = Roboto_Mono({ subsets: ['latin'] });

// Apply font via CSS class
<body className={`${playfair.className} ...`}>
```

### Update Text Sizes

In `tailwind.config.ts`:

```ts
fontSize: {
  'xs': ['0.75rem', { lineHeight: '1rem' }],
  'sm': ['0.875rem', { lineHeight: '1.25rem' }],
  'base': ['1rem', { lineHeight: '1.5rem' }],
  'lg': ['1.125rem', { lineHeight: '1.75rem' }],
  'xl': ['1.25rem', { lineHeight: '1.75rem' }],
  '2xl': ['1.5rem', { lineHeight: '2rem' }],
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  '5xl': ['3rem', { lineHeight: '1.2' }],
  '6xl': ['3.75rem', { lineHeight: '1.2' }],
  '7xl': ['4.5rem', { lineHeight: '1.1' }],
  '8xl': ['6rem', { lineHeight: '1' }],
},
```

## Layout Modifications

### Change Section Heights

In `app/page.tsx`:

```tsx
// Standard height
<ScrollVideoSection height="100vh" />

// Tall section
<ScrollVideoSection height="150vh" />

// Full height with padding
<ScrollVideoSection height="calc(100vh + 2rem)" />
```

### Adjust Pin Duration

Longer = More scroll to complete video:

```tsx
{/* 3000px scroll - about 3-5 seconds */}
<ScrollVideoSection pinDuration={3000} />

{/* 5000px scroll - longer experience */}
<ScrollVideoSection pinDuration={5000} />

{/* 2000px scroll - quick scrub */}
<ScrollVideoSection pinDuration={2000} />
```

### Add Multiple Video Galleries

Create `components/VideoGallery.tsx`:

```tsx
interface VideoItem {
  src: string;
  title: string;
  description?: string;
}

export function VideoGallery({ videos }: { videos: VideoItem[] }) {
  return (
    <>
      {videos.map((video) => (
        <div key={video.src}>
          <h2 className="text-5xl font-bold mb-8">{video.title}</h2>
          {video.description && (
            <p className="text-gray-400 mb-12">{video.description}</p>
          )}
          <ScrollVideoSection src={video.src} />
        </div>
      ))}
    </>
  );
}
```

Use in page:

```tsx
<VideoGallery
  videos={[
    { src: '/video1.mp4', title: 'First Experience' },
    { src: '/video2.mp4', title: 'Second Experience' },
  ]}
/>
```

## Animation Customization

### Framer Motion Stagger Timing

In `components/Hero.tsx`:

```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,      // Delay between children
      delayChildren: 0.3,        // Initial delay
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,             // Animation duration
      ease: [0.43, 0.13, 0.23, 0.96], // Custom easing
    },
  },
};
```

### Lenis Scroll Speed

In `components/SmoothScrollProvider.tsx`:

```ts
const lenis = new Lenis({
  duration: 1.2,     // Increase for slower, smoother scroll
  easing: (t: number) => {
    // Custom easing function
    return Math.min(1, 1.001 - Math.pow(2, -10 * t));
  },
  direction: 'vertical' as const,
  smooth: true,
});
```

### GSAP Scrub Amount

In `components/ScrollVideoSection.tsx`:

```ts
ScrollTrigger.create({
  scrub: 0.5,  // 0 = instant, 1 = very smooth, 0.5 = balanced
});
```

## Content Updates

### Hero Section Text

In `components/Hero.tsx`:

```tsx
<h1 className="text-display mb-6">
  <span className="block">Your Title</span>
  <span className="block mt-2">Here</span>
</h1>

<p className="text-subtitle text-gray-400">
  Your subtitle or description
</p>

<button>Custom Button Text</button>
```

### Transition Sections

In `app/page.tsx`:

```tsx
<TransitionSection
  title="Your Title"
  subtitle="Your Subtitle"
  description="Your description text here"
  accentColor="from-green-400"  // Change accent color
/>
```

### Footer Content

In `app/page.tsx`:

```tsx
<footer>
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    {/* Update with your links */}
    <div>
      <h3>Product</h3>
      <ul>
        <li><a href="#">Your Link</a></li>
      </ul>
    </div>
  </div>
</footer>
```

## Advanced Customizations

### Add Parallax Effect

Create `components/ParallaxSection.tsx`:

```tsx
'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export function ParallaxSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {/* Content */}
    </motion.div>
  );
}
```

### Add Text Reveal Animation

Create `components/RevealText.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';

export function RevealText({ text }: { text: string }) {
  const words = text.split(' ');

  return (
    <div className="flex flex-wrap gap-2">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
```

### Add Number Counter

Create `components/NumberCounter.tsx`:

```tsx
'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

interface NumberCounterProps {
  from: number;
  to: number;
  duration?: number;
}

export function NumberCounter({
  from,
  to,
  duration = 2,
}: NumberCounterProps) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const controls = {
      animate: to,
    };

    const animation = motion.animate(controls, {
      transition: { duration },
    });

    return () => animation.stop();
  }, [to, duration]);

  return <motion.div>{rounded}</motion.div>;
}
```

## Adding Features

### Add Newsletter Signup

Create `components/NewsletterForm.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Send to your API
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full px-4 py-2 bg-dark-secondary rounded"
      />
      <button
        type="submit"
        className="w-full mt-4 px-4 py-2 bg-white text-dark rounded font-bold"
      >
        Subscribe
      </button>
      {submitted && <p>Thank you for subscribing!</p>}
    </form>
  );
}
```

Add to page:

```tsx
<CTASection />
<NewsletterForm />
```

### Add Image Gallery

Create `components/ImageGallery.tsx`:

```tsx
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface GalleryImage {
  src: string;
  alt: string;
}

export function ImageGallery({ images }: { images: GalleryImage[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={400}
            height={300}
            className="w-full h-auto rounded-lg"
          />
        </motion.div>
      ))}
    </div>
  );
}
```

## Removing Features

### Remove Framer Motion

1. Replace motion components with standard elements:

```tsx
// Before
<motion.h1 animate={{ opacity: 1 }}>

// After
<h1 className="animate-fade-in">
```

2. Update animations with Tailwind:

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-in-out;
}
```

### Remove Lenis (Use Native Scroll)

In `components/SmoothScrollProvider.tsx`:

```tsx
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
```

In `app/globals.css`:

```css
html {
  scroll-behavior: smooth;
}
```

### Remove Specific Sections

In `app/page.tsx`:

```tsx
// Comment out or remove
{/* <TransitionSection ... /> */}
{/* <CTASection /> */}
```

## Mobile-First Responsive Design

### Adjust Breakpoints

In `tailwind.config.ts`:

```ts
screens: {
  'xs': '320px',
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
},
```

### Mobile-Specific Styles

```tsx
{/* Hidden on mobile */}
<div className="hidden md:block">
  Desktop only
</div>

{/* Different sizes */}
<h1 className="text-3xl md:text-5xl lg:text-7xl">
  Responsive Title
</h1>

{/* Different layouts */}
<div className="flex flex-col md:flex-row md:gap-8">
  <div className="w-full md:w-1/2">Column 1</div>
  <div className="w-full md:w-1/2">Column 2</div>
</div>
```

## Performance Customization

### Adjust Animation Complexity

**Light (Fast):**
```tsx
// Less stagger, shorter durations
staggerChildren: 0.1,
duration: 0.4,
```

**Heavy (Cinematic):**
```tsx
// More stagger, longer durations
staggerChildren: 0.3,
duration: 1.2,
```

### Video Quality Settings

```tsx
// Fast connection
<ScrollVideoSection src="/video1-low.mp4" />

// Detect connection
const connection = navigator.connection?.effectiveType;
const videoSrc = connection === '4g' ? '/video1-high.mp4' : '/video1-low.mp4';
```

---

**Make it yours! 🎨**
