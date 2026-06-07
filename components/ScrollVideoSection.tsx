'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollVideoSectionProps {
  src: string;
  height?: string;
  pinDuration?: number;
  overlayGradient?: string;
}

export function ScrollVideoSection({
  src,
  height = '100vh',
  pinDuration = 3000,
  overlayGradient = 'from-transparent via-transparent to-dark/40',
}: ScrollVideoSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const timelineRef = useRef<gsap.Timeline | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    // Set video properties early
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = 'anonymous';
    video.preload = 'metadata';

    let isInitialized = false;

    const initializeScrollTrigger = () => {
      if (isInitialized) return;
      isInitialized = true;

      const duration = video.duration;

      // Fallback if duration is not available
      if (!duration || !isFinite(duration)) {
        console.warn(`Video at ${src} has invalid duration`);
        return;
      }

      // Create a proxy object to smooth out seeking
      const proxy = { currentTime: 0 };

      // Create animation timeline
      const tl = gsap.timeline({
        onUpdate: () => {
          if (video && isFinite(proxy.currentTime)) {
            try {
              video.currentTime = proxy.currentTime;
            } catch (e) {
              console.warn('Error seeking video:', e);
            }
          }
        },
      });

      // Animate from 0 to video duration
      tl.to(proxy, {
        currentTime: duration,
        duration: duration,
        ease: 'none',
      });

      timelineRef.current = tl;

      // Kill existing trigger if present
      if (triggerRef.current) {
        triggerRef.current.kill();
      }

      // Create ScrollTrigger with proper configuration
      try {
        triggerRef.current = ScrollTrigger.create({
          trigger: container,
          start: 'top top',
          end: () => `+=${pinDuration}`,
          pin: container,
          scrub: 0.5, // Smooth scrubbing with slight delay
          fastScrollEnd: true,
          onUpdate: (self) => {
            if (tl && !isNaN(self.progress)) {
              tl.progress(self.progress);
            }
          },
          onEnter: () => setIsLoading(false),
        });
      } catch (error) {
        console.error('Error creating ScrollTrigger:', error);
      }
    };

    // Handle metadata loaded event
    const handleLoadedMetadata = () => {
      initializeScrollTrigger();
    };

    // Handle load event as fallback
    const handleLoad = () => {
      if (video.duration > 0) {
        initializeScrollTrigger();
      }
    };

    // Handle error
    const handleError = (e: Event) => {
      console.error('Video load error:', e);
      setIsLoading(false);
    };

    // Add event listeners
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleLoad);
    video.addEventListener('error', handleError);

    // Check if metadata is already loaded
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    // Cleanup function
    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleLoad);
      video.removeEventListener('error', handleError);

      // Kill timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }

      // Kill ScrollTrigger
      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }
    };
  }, [src, pinDuration]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ 
        height,
        willChange: 'transform',
      }}
    >
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 bg-dark-secondary/50 flex items-center justify-center z-10">
          <div className="w-12 h-12 border-2 border-gray-600 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Video element */}
      <video
        ref={videoRef}
        src={src}
        className="absolute top-0 left-0 w-full h-full object-cover"
        playsInline
        muted
        preload="metadata"
      />

      {/* Cinematic overlay gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b ${overlayGradient} pointer-events-none`}
        aria-hidden="true"
      />
    </div>
  );
}
