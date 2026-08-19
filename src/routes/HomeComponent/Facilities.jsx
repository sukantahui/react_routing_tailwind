// ===============================================
// Facilities.jsx - Modern Dark Glassmorphism IT Lab
// -----------------------------------------------
// Purpose:
//   Highlight modern lab facilities with rich glassmorphism,
//   glowing icon pods, and feature highlights.
// ===============================================

import React from "react";
import { motion } from "framer-motion";

const facilities = [
  {
    icon: "bi-laptop",
    emoji: "💻",
    title: "High-Performance Workstations",
    desc: "Equipped with multi-core processors, SSD storage, and high-RAM configurations tailored for smooth compilation, full-stack development, and data analysis.",
    tag: "Hardware Ready",
    color: "from-sky-500 to-blue-600",
    borderGlow: "group-hover:border-sky-500/50 group-hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]",
  },
  {
    icon: "bi-wifi",
    emoji: "🌐",
    title: "High-Speed Optical Fiber",
    desc: "Uninterrupted gigabit connectivity for instant cloud deployments, live package management, online repositories, and real-time remote collaboration.",
    tag: "Gigabit Network",
    color: "from-emerald-500 to-teal-600",
    borderGlow: "group-hover:border-emerald-500/50 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
  },
  {
    icon: "bi-code-square",
    emoji: "🛠️",
    title: "Hands-on Project Lab",
    desc: "A dedicated incubation setup designed for live coding, full-stack app building, database optimization, and real-world client simulation.",
    tag: "Practical Learning",
    color: "from-purple-500 to-indigo-600",
    borderGlow: "group-hover:border-purple-500/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
  },
  {
    icon: "bi-shield-check",
    emoji: "🔒",
    title: "Ergonomic & Calm Environment",
    desc: "Fully air-conditioned, distraction-free environment with ergonomic seating and dedicated individual lab slots for focused concentration.",
    tag: "AC & Quiet Zone",
    color: "from-amber-500 to-orange-600",
    borderGlow: "group-hover:border-amber-500/50 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
  },
  {
    icon: "bi-folder2-open",
    emoji: "📚",
    title: "Complete Software & IDE Suite",
    desc: "Pre-configured licensed accounting tools (Tally Prime, Excel Advanced), modern IDEs (VS Code, IntelliJ, PyCharm), and SQL server databases.",
    tag: "All-in-One Tools",
    color: "from-rose-500 to-pink-600",
    borderGlow: "group-hover:border-rose-500/50 group-hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]",
  },
];

const Facilities = () => {
  return (
    <section className="relative py-24 bg-slate-950 text-slate-100 overflow-hidden border-t border-slate-800/60">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-sky-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <i className="bi bi-display"></i>
            <span>Infrastructure & Facilities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            State-of-the-Art{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400">
              IT & Accounting Lab
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-slate-400 text-base sm:text-lg"
          >
            Experience a professional coding and analytical atmosphere engineered for deep learning, practical execution, and zero hardware friction.
          </motion.p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.slice(0, 3).map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className={`group relative bg-slate-900/60 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-7 transition-all duration-300 ${item.borderGlow} flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl shadow-lg shadow-black/40 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span>{item.emoji}</span>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-sky-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Second Row (2 wide cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {facilities.slice(3, 5).map((item, idx) => (
            <motion.div
              key={idx + 3}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              whileHover={{ y: -5 }}
              className={`group relative bg-slate-900/60 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-7 transition-all duration-300 ${item.borderGlow} flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl shadow-lg shadow-black/40 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span>{item.emoji}</span>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-sky-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
