'use client';

import { motion } from 'framer-motion';

interface TransitionSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  accentColor?: string;
}

export function TransitionSection({
  title,
  subtitle,
  description,
  accentColor = 'from-white',
}: TransitionSectionProps) {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-bl from-slate-800/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-tr from-slate-900/10 via-transparent to-transparent blur-3xl" />
      </div>

      <motion.div
        className="max-w-4xl mx-auto z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        {/* Accent line */}
        <motion.div
          className="w-16 h-1 bg-gradient-to-r from-white to-transparent mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ originX: 0 }}
        />

        {/* Title */}
        <motion.h2
          className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r ${accentColor} via-gray-100 to-gray-500 bg-clip-text text-transparent`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {title}
        </motion.h2>

        {/* Subtitle */}
        {subtitle && (
          <motion.h3
            className="text-2xl md:text-3xl text-gray-400 mb-6 font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {subtitle}
          </motion.h3>
        )}

        {/* Description */}
        {description && (
          <motion.p
            className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
