// ===============================================
// LocalSEO.jsx - Modern Glassmorphism Local SEO Banner
// ===============================================

import React from "react";
import { motion } from "framer-motion";

export default function LocalSEO() {
  return (
    <section className="relative py-20 bg-slate-950 text-slate-100 overflow-hidden border-t border-slate-800/60">
      {/* Soft ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6">
        {/* Sub-badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4"
        >
          <i className="bi bi-geo-alt-fill text-rose-400"></i>
          <span>Barrackpore & Greater Kolkata</span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
        >
          Premier Coding &{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-300 to-pink-400">
            Financial Training
          </span>{" "}
          in Barrackpore
        </motion.h2>

        {/* Description Glass Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 bg-slate-900/60 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-xl text-slate-300 text-base sm:text-lg leading-relaxed space-y-4"
        >
          <p>
            At <strong className="text-amber-400 font-semibold">Coder & AccoTax</strong>, we offer structured,
            project-first hands-on training in <span className="text-sky-300 font-medium">Full Stack Web Development</span>,{" "}
            <span className="text-purple-300 font-medium">Python & AI</span>,{" "}
            <span className="text-pink-300 font-medium">Core & Advanced Java</span>,{" "}
            <span className="text-emerald-300 font-medium">Tally Prime & GST</span>, and{" "}
            <span className="text-cyan-300 font-medium">Data Analytics</span>.
          </p>

          <p className="text-sm text-slate-400">
            Students and working professionals from{" "}
            <span className="font-medium text-sky-400">Barrackpore, Titagarh, Shyamnagar, Palta, Naihati, Ichapore, and Agarpara</span>{" "}
            trust us for dedicated individual attention, updated curriculum, and friendly mentor support.
          </p>

          {/* CTA */}
          <div className="pt-4">
            <a
              href="#courses"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-sm font-semibold shadow-lg shadow-sky-500/25 transition-all duration-300"
            >
              <span>Explore All Courses</span>
              <i className="bi bi-arrow-right"></i>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
