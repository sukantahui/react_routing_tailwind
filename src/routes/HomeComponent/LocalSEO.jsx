// ===============================================
// LocalSEO.jsx - Local SEO Banner with Service Areas & Subject Keywords
// Covers: GST, TDS, Income Tax, Tally, Accounting, Coding
// Areas: Barrackpore, Sodepore, Ichapore, Barasat, Sreerampore, 700122
// ===============================================

import React from "react";
import { motion } from "framer-motion";

const serviceAreas = [
  { name: "Barrackpore", pin: "700120" },
  { name: "Sodepore", pin: "700110" },
  { name: "Ichapore", pin: "743144" },
  { name: "Barasat", pin: "700124" },
  { name: "Sreerampore", pin: "712203" },
  { name: "Nonachandanpukur", pin: "700122" },
  { name: "Titagarh", pin: "700119" },
  { name: "Naihati", pin: "743165" },
  { name: "Shyamnagar", pin: "743127" },
  { name: "Agarpara", pin: "700109" },
];

const subjectKeywords = [
  { label: "GST Filing", icon: "bi-receipt-cutoff", color: "text-emerald-400" },
  { label: "TDS Returns", icon: "bi-file-earmark-text", color: "text-sky-400" },
  { label: "Income Tax", icon: "bi-bank", color: "text-amber-400" },
  { label: "Tally Prime", icon: "bi-calculator", color: "text-purple-400" },
  { label: "Accounting", icon: "bi-journal-bookmark", color: "text-pink-400" },
  { label: "Python & Java", icon: "bi-code-slash", color: "text-cyan-400" },
  { label: "Web Development", icon: "bi-laptop", color: "text-indigo-400" },
  { label: "DSA & Coding", icon: "bi-braces", color: "text-rose-400" },
];

export default function LocalSEO() {
  return (
    <section
      id="local-area"
      className="relative py-20 bg-slate-950 text-slate-100 overflow-hidden border-t border-slate-800/60"
      aria-label="Service areas and courses near Barrackpore, Sodepore, Ichapore, Barasat, Sreerampore"
    >
      {/* Soft ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-500/8 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">

        {/* Sub-badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-sky-400 text-xs font-semibold uppercase tracking-wider">
            <i className="bi bi-geo-alt-fill text-rose-400"></i>
            <span>Serving Barrackpore & Surrounding Areas</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-center"
        >
          Premier{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-400 to-purple-400">
            GST · TDS · Accounting
          </span>{" "}
          &{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-amber-400 to-cyan-400">
            Coding Training
          </span>{" "}
          near Barrackpore
        </motion.h2>

        {/* Subject Keywords Pill Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2.5 mt-6"
        >
          {subjectKeywords.map((kw, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs font-semibold text-slate-200 hover:border-slate-600 transition-colors"
            >
              <i className={`bi ${kw.icon} ${kw.color} text-sm`}></i>
              {kw.label}
            </span>
          ))}
        </motion.div>

        {/* Main Description Glass Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 bg-slate-900/60 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-xl text-slate-300 text-sm sm:text-base leading-relaxed space-y-4"
        >
          <p>
            At <strong className="text-amber-400 font-semibold">Coder & AccoTax</strong>, we offer
            structured, project-first hands-on training in{" "}
            <span className="text-emerald-300 font-medium">GST Return Filing (GSTR-1, GSTR-3B)</span>,{" "}
            <span className="text-sky-300 font-medium">TDS Deduction & TDS Challan Filing</span>,{" "}
            <span className="text-amber-300 font-medium">Income Tax Return (ITR-1, ITR-4)</span>,{" "}
            <span className="text-purple-300 font-medium">TallyPrime & Practical Accounting</span>,{" "}
            <span className="text-pink-300 font-medium">Full Stack Web Development</span>,{" "}
            <span className="text-cyan-300 font-medium">Python & Java Programming</span>, and{" "}
            <span className="text-indigo-300 font-medium">Data Structures & Algorithms</span>.
          </p>

          <p>
            Our institute at <strong className="text-white">Nonachandanpukur, Barrackpore (Pin 700122)</strong> is
            easily accessible to students and working professionals from{" "}
            <span className="font-medium text-sky-400">
              Sodepore, Ichapore, Barasat, Sreerampore, Titagarh, Naihati, Shyamnagar, Palta, and Agarpara
            </span>
            . Whether you are searching for a <em>GST course near Sodepore</em>, a{" "}
            <em>TDS training institute near Barasat</em>, an{" "}
            <em>Income Tax class near Sreerampore</em>, or a{" "}
            <em>coding institute near Ichapore</em> — we are your nearest trusted destination.
          </p>

          <p className="text-xs text-slate-400 border-t border-slate-800/80 pt-3">
            🏅 ISO 9001:2015 Certified &nbsp;|&nbsp; 28+ Years Legacy &nbsp;|&nbsp;
            4.9 ★ Google Rating (170+ Reviews) &nbsp;|&nbsp; 📞{" "}
            <a href="tel:+919432456083" className="text-sky-400 hover:text-sky-300 transition font-medium">
              +91-9432456083
            </a>
          </p>
        </motion.div>

        {/* Service Areas Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8"
        >
          <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
            Areas We Serve
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {serviceAreas.map((area, i) => (
              <div
                key={i}
                className="bg-slate-900/50 border border-slate-800/80 rounded-xl px-3 py-2.5 text-center hover:border-sky-500/30 hover:bg-slate-900/80 transition-all duration-200 group"
              >
                <div className="text-xs font-semibold text-slate-200 group-hover:text-sky-300 transition-colors">
                  {area.name}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 font-mono">{area.pin}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8"
        >
          <a
            href="#courses"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-sm font-semibold shadow-lg shadow-sky-500/25 transition-all duration-300 hover:scale-105"
          >
            <span>Explore All Courses</span>
            <i className="bi bi-arrow-right"></i>
          </a>
          <a
            href="https://wa.me/919432456083?text=Hi%20Coder%20%26%20AccoTax!%20I%20want%20to%20know%20more%20about%20your%20GST%20%2F%20TDS%20%2F%20Tally%20%2F%20Coding%20courses."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-lg shadow-emerald-600/25 transition-all duration-300 hover:scale-105"
          >
            <i className="bi bi-whatsapp"></i>
            <span>Enquire on WhatsApp</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
