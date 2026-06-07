'use client';

import { motion } from 'framer-motion';

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-slate-800/20 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-slate-900/20 via-transparent to-transparent blur-3xl" />
      </div>

      <motion.div
        className="max-w-5xl mx-auto text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main heading */}
        <motion.h1
          className="text-display mb-6 md:mb-8"
          variants={itemVariants}
        >
          <span className="block bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Cinematic
          </span>
          <span className="block mt-2 md:mt-4">Experience</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-subtitle text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Scroll through perfectly synchronized video experiences
        </motion.p>

        {/* CTA */}
        <motion.div
          className="flex items-center justify-center gap-4 md:gap-6"
          variants={itemVariants}
        >
          <motion.button
            className="px-8 md:px-10 py-3 md:py-4 bg-white text-dark font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Now
          </motion.button>
          <motion.button
            className="px-8 md:px-10 py-3 md:py-4 border border-gray-400 text-white font-semibold rounded-lg hover:border-white hover:bg-white/5 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-gray-400 rounded-full"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
