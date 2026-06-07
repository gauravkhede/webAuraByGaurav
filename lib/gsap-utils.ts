import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Configure GSAP for optimal performance
 * Call this once during app initialization
 */
export function initializeGSAP() {
  // Disable lag smoothing for better real-time responsiveness
  gsap.ticker.lagSmoothing(0);

  // Set global defaults
  gsap.defaults({
    overwrite: 'auto',
    ease: 'power3.inOut',
  });

  // Throttle ticker updates during inactive periods
  gsap.ticker.add(() => {
    if (ScrollTrigger.isInViewport('.scroll-video-section')) {
      ScrollTrigger.update();
    }
  });
}

/**
 * Create a smooth scrubbing animation for video playback
 */
export function createVideoScrubTimeline(
  video: HTMLVideoElement,
  duration: number
) {
  const proxy = { currentTime: 0 };

  const timeline = gsap.timeline({
    onUpdate: () => {
      if (video && isFinite(proxy.currentTime)) {
        video.currentTime = proxy.currentTime;
      }
    },
  });

  timeline.to(proxy, {
    currentTime: duration,
    duration: duration,
    ease: 'none',
  });

  return { timeline, proxy };
}

/**
 * Create a ScrollTrigger for video scrubbing
 */
export function createVideoScrollTrigger(
  element: HTMLElement,
  timeline: gsap.Timeline,
  options: {
    pinDuration?: number;
    scrubAmount?: number;
  } = {}
) {
  const { pinDuration = 3000, scrubAmount = 0.5 } = options;

  const trigger = ScrollTrigger.create({
    trigger: element,
    start: 'top top',
    end: `+=${pinDuration}`,
    pin: element,
    scrub: scrubAmount,
    fastScrollEnd: true,
    onUpdate: (self) => {
      if (timeline && !isNaN(self.progress)) {
        timeline.progress(self.progress);
      }
    },
  });

  return trigger;
}

/**
 * Refresh all ScrollTriggers (useful on layout changes)
 */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}

/**
 * Kill all ScrollTriggers (useful for cleanup)
 */
export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
