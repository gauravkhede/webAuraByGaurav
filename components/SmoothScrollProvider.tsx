'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      // Disable smoothing so scroll position maps immediately to scroll events
      duration: 0.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      syncTouch: false,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Disable lagSmoothing for better performance
    gsap.ticker.lagSmoothing(0);

    // Connect Lenis scroll event to GSAP ticker
    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis with GSAP ticker for continuous updates
    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000); // Convert to milliseconds
    });

    // Refresh ScrollTriggers when Lenis updates
    gsap.ticker.add(() => {
      ScrollTrigger.update();
    });

    // Handle window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      lenis.destroy();
      gsap.ticker.remove(() => {
        lenis.raf(0);
      });
    };
  }, []);

  return <>{children}</>;
}
