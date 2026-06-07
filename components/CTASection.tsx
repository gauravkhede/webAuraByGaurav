'use client';

import { motion } from 'framer-motion';

export function CTASection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Premium background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-gradient-to-b from-slate-700/20 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent blur-3xl" />
      </div>

      <motion.div
        className="max-w-4xl mx-auto text-center z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: '-100px' }}
      >
        {/* Badge */}
        <motion.div
          className="inline-block mb-8"
          variants={itemVariants}
        >
          <div className="px-6 py-2 border border-gray-500/30 rounded-full text-gray-400 text-sm font-medium hover:border-gray-400/60 transition-colors">
            ✨ Premium Experience
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h2
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          variants={itemVariants}
        >
          <span className="block">Ready to</span>
          <span className="block bg-gradient-to-r from-white via-gray-300 to-gray-600 bg-clip-text text-transparent">
            Get Started?
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-gray-400 mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Experience the future of web experiences with perfectly synchronized scroll-driven video playback and cinematic storytelling.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
          variants={itemVariants}
        >
          <motion.button
            className="w-full sm:w-auto px-10 py-4 bg-white text-dark font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Project
          </motion.button>
          <motion.button
            className="w-full sm:w-auto px-10 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all duration-300 text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Documentation
          </motion.button>
        </motion.div>

        {/* Footer text */}
        <motion.p
          className="text-gray-500 text-sm md:text-base mt-12"
          variants={itemVariants}
        >
          Built with Next.js 15, GSAP, Framer Motion, and Lenis
        </motion.p>
      </motion.div>
    </section>
  );
}
