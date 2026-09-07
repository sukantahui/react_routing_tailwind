// ===============================================
// LocalSEO.jsx - Local SEO Banner with Service Areas & Subject Keywords
// Covers: Tally & GST, TDS, Income Tax, Accounting, Coding
// Areas: Barrackpore, Sodepore, Ichapore, Barasat, Sreerampore, 700122, 700121
// ===============================================

import React from "react";
import { motion } from "framer-motion";

const serviceAreas = [
  { name: "Barrackpore", pin: "700122" },
  { name: "Titagarh / Kolkata", pin: "700121" },
  { name: "Barrackpore Sadar", pin: "700120" },
  { name: "Titagarh Town", pin: "700119" },
  { name: "Sodepore", pin: "700110" },
  { name: "Barasat", pin: "700124" },
  { name: "Ichapore", pin: "743144" },
  { name: "Sreerampore", pin: "712203" },
  { name: "Shyamnagar", pin: "743127" },
  { name: "Naihati", pin: "743165" },
  { name: "Agarpara", pin: "700109" },
  { name: "Belgharia", pin: "700056" },
];

const subjectKeywords = [
  { label: "Tally & GST Course", icon: "bi-calculator-fill", color: "text-purple-400" },
  { label: "GST Return Filing", icon: "bi-receipt-cutoff", color: "text-emerald-400" },
  { label: "TDS Returns", icon: "bi-file-earmark-text", color: "text-sky-400" },
  { label: "Income Tax (ITR)", icon: "bi-bank", color: "text-amber-400" },
  { label: "Tally Prime ERP", icon: "bi-laptop", color: "text-fuchsia-400" },
  { label: "Corporate Accounting", icon: "bi-journal-bookmark", color: "text-pink-400" },
  { label: "Python & Java", icon: "bi-code-slash", color: "text-cyan-400" },
  { label: "Full Stack Web Dev", icon: "bi-globe", color: "text-indigo-400" },
  { label: "DSA & Coding", icon: "bi-braces", color: "text-rose-400" },
];

export default function LocalSEO() {
  return (
    <section
      id="local-area"
      className="relative py-20 bg-slate-950 text-slate-100 overflow-hidden border-t border-slate-800/60"
      aria-label="Tally and GST courses near Barrackpore, Titagarh, Sodepore, Barasat, 700121, 700122"
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
            <span>Serving Pin 700122, 700121 & Surrounding North 24 Parganas</span>
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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-emerald-400 to-sky-400">
            Tally &amp; GST Course
          </span>{" "}
          &amp;{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-amber-400 to-cyan-400">
            Coding Training
          </span>{" "}
          near You
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
            Searching for the <strong className="text-amber-400 font-semibold">best Tally and GST course near me</strong>? At{" "}
            <strong className="text-white">Coder &amp; AccoTax</strong>, we offer industry-standard, 100% practical hands-on training in{" "}
            <span className="text-purple-300 font-medium">TallyPrime ERP Bookkeeping</span>,{" "}
            <span className="text-emerald-300 font-medium">GST Return Filing (GSTR-1, GSTR-3B, E-Way Bill)</span>,{" "}
            <span className="text-sky-300 font-medium">TDS Deduction &amp; TDS Challan Filing</span>,{" "}
            <span className="text-amber-300 font-medium">Income Tax Return Preparation (ITR-1, ITR-4)</span>,{" "}
            <span className="text-pink-300 font-medium">Full Stack Web Development</span>, and{" "}
            <span className="text-cyan-300 font-medium">Python &amp; Java Programming</span>.
          </p>

          <p>
            Our campus at <strong className="text-white">Nonachandanpukur, Barrackpore (Pin 700122)</strong> conveniently serves students and working professionals located in{" "}
            <span className="font-medium text-sky-400">
              PIN 700121, PIN 700122, Titagarh, Sodepore, Ichapore, Barasat, Sreerampore, Naihati, Shyamnagar, Palta, Belgharia, and Agarpara
            </span>
            . Whether you want an in-depth <em>Tally and GST course near Sodepore or Barasat</em>, a <em>practical GST return filing course near Titagarh (700121/700119)</em>, or an <em>income tax class near Sreerampore</em> — we provide 1-on-1 expert mentorship with live real-world company ledgers.
          </p>

          <p className="text-xs text-slate-400 border-t border-slate-800/80 pt-3">
            🏅 ISO 9001:2015 Certified &nbsp;|&nbsp; 28+ Years Legacy &nbsp;|&nbsp;
            4.9 ★ Google Rating (170+ Reviews) &nbsp;|&nbsp; 📞{" "}
            <a href="tel:+919432456083" className="text-sky-400 hover:text-sky-300 transition font-medium">
              +91-9432456083
            </a>
            {" / "}
            <a href="tel:+917003756860" className="text-sky-400 hover:text-sky-300 transition font-medium">
              +91-7003756860
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
            Service Areas &amp; Pin Codes We Cover
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
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
            href="https://wa.me/919432456083?text=Hi%20Coder%20%26%20AccoTax!%20I%20want%20to%20know%20more%20about%20your%20Tally%20and%20GST%20courses."
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

