import { Hero } from '@/components/Hero';
import { ScrollVideoSection } from '@/components/ScrollVideoSection';
import { TransitionSection } from '@/components/TransitionSection';
import { CTASection } from '@/components/CTASection';

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-dark">
      {/* Hero Section */}
      <Hero />

      {/* First Video Section - Scroll Synced */}
      <ScrollVideoSection
        src="/video1.mp4"
        height="100vh"
        pinDuration={3000}
      />

      {/* Transition Section */}
      <TransitionSection
        title="Scroll-Driven Innovation"
        subtitle="Video playback synced perfectly with your scroll"
        description="Watch as every frame is precisely controlled by your scroll position. No autoplay, no lag, just pure cinematic control."
        accentColor="from-blue-400"
      />

      {/* Second Video Section - Scroll Synced */}
      <ScrollVideoSection
        src="/video2.mp4"
        height="100vh"
        pinDuration={3000}
      />

      {/* Final Transition */}
      <TransitionSection
        title="Premium Experience"
        subtitle="Crafted for the modern web"
        description="Every interaction polished. Every animation refined. Every pixel perfect. This is how premium experiences feel."
        accentColor="from-purple-400"
      />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <footer className="relative w-full bg-dark-secondary py-12 md:py-16 px-4 md:px-8 lg:px-16 border-t border-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4">Cinematic</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Premium landing page experiences built with modern web technologies.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom footer */}
          <div className="pt-8 border-t border-gray-800/30 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
            <p>&copy; 2026 Cinematic. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-400 transition-colors">Twitter</a>
              <a href="#" className="hover:text-gray-400 transition-colors">GitHub</a>
              <a href="#" className="hover:text-gray-400 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
