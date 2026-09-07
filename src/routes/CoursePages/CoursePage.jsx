// ============================================================================
// CoursePage.jsx - Shared layout for all dedicated course landing pages
// Used by: GST Filing, TDS/Income Tax, Tally Accounting, Python, Web Dev pages
// ============================================================================

import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Footer from "../HomeComponent/Footer";
import NavBar from "../NavBar";

const WHATSAPP = "919432456083";

export default function CoursePage({
  // SEO
  title,
  metaDescription,
  metaKeywords,
  canonical,
  ogImage = "https://codernaccotax.co.in/og-home.png",
  schema,

  // Hero
  heroIcon,       // emoji or icon classname
  heroBadge,      // e.g. "Accounting & Tax"
  heroTitle,      // main h1 title JSX or string
  heroSubtitle,
  heroColor = "from-emerald-500 to-sky-500",

  // Highlights strip
  highlights = [], // [{ icon, label, value }]

  // Who is this for
  audience = [],   // ["Commerce graduates", "Working professionals", ...]

  // Syllabus modules
  modules = [],    // [{ title, topics: ["topic1","topic2",...] }]

  // FAQ
  faqs = [],       // [{ q, a }]

  // WhatsApp message
  whatsappMessage,
}) {
  const encodedMsg = encodeURIComponent(
    whatsappMessage || `Hi Coder & AccoTax! I am interested in the "${title}" course. Please share the syllabus, batch timings, and fees.`
  );

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="author" content="Coder & AccoTax" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="geo.region" content="IN-WB" />
        <meta name="geo.placename" content="Barrackpore, West Bengal" />
        {schema && (
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        )}
      </Helmet>

      <div className="min-h-screen bg-[#030712] text-slate-100">

        {/* ── Hero ── */}
        <section className="relative pt-28 pb-20 overflow-hidden border-b border-slate-800/60">
          {/* Glow */}
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-r ${heroColor} opacity-10 blur-[100px] rounded-full pointer-events-none`} />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
            {/* Breadcrumb */}
            <nav className="flex justify-center items-center gap-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
              <NavLink to="/" className="hover:text-sky-400 transition">Home</NavLink>
              <span>/</span>
              <span className="text-slate-300">Courses</span>
              <span>/</span>
              <span className="text-sky-400">{heroBadge}</span>
            </nav>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-bold uppercase tracking-wider text-sky-400 mb-5"
            >
              <span>{heroIcon}</span>
              <span>{heroBadge}</span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight"
            >
              {heroTitle}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-4 text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed"
            >
              {heroSubtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="flex flex-wrap justify-center gap-3 mt-8"
            >
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodedMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
              >
                <i className="bi bi-whatsapp"></i>
                Enroll via WhatsApp
              </a>
              <HashLink
                smooth
                to="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 hover:border-slate-600 transition-all hover:scale-105"
              >
                <i className="bi bi-geo-alt"></i>
                Visit Campus
              </HashLink>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mt-8 text-xs text-slate-500"
            >
              {["ISO 9001:2015 Certified", "28+ Years Legacy", "4.9 ★ Google Rating", "Barrackpore · 700122"].map((t, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 inline-block"></span>
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Highlights Strip ── */}
        {highlights.length > 0 && (
          <section className="bg-slate-900/60 border-b border-slate-800/60 py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                  className="text-center p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition"
                >
                  <div className="text-2xl mb-1">{h.icon}</div>
                  <div className="text-lg font-black text-white">{h.value}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{h.label}</div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ── Who is this for ── */}
        {audience.length > 0 && (
          <section className="py-14 border-b border-slate-800/60">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-6 text-center">
                Who Is This Course For?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {audience.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3"
                  >
                    <i className="bi bi-check-circle-fill text-emerald-400 flex-shrink-0"></i>
                    <span className="text-sm text-slate-200">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Syllabus Modules ── */}
        {modules.length > 0 && (
          <section className="py-14 bg-slate-950 border-b border-slate-800/60">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2 text-center">
                Course Syllabus
              </h2>
              <p className="text-slate-400 text-sm text-center mb-8">
                Practical, project-driven curriculum updated for current industry standards
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {modules.map((mod, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition"
                  >
                    <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-sky-500/20 border border-sky-500/30 text-sky-400 text-xs flex items-center justify-center font-black">
                        {i + 1}
                      </span>
                      {mod.title}
                    </h3>
                    <ul className="space-y-1.5">
                      {mod.topics.map((topic, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-slate-300">
                          <i className="bi bi-dot text-sky-400 text-base leading-none mt-0.5 flex-shrink-0"></i>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ── */}
        {faqs.length > 0 && (
          <section className="py-14 border-b border-slate-800/60">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <motion.details
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="group bg-slate-900/70 border border-slate-800 rounded-2xl px-5 py-4 hover:border-slate-700 transition cursor-pointer"
                  >
                    <summary className="font-semibold text-sm text-white list-none flex items-center justify-between gap-3">
                      <span>{faq.q}</span>
                      <i className="bi bi-chevron-down text-slate-400 group-open:rotate-180 transition-transform duration-300 flex-shrink-0"></i>
                    </summary>
                    <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800 pt-3">
                      {faq.a}
                    </p>
                  </motion.details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Final CTA ── */}
        <section className="py-16 bg-slate-950">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Ready to Get Started?
            </h2>
            <p className="text-slate-400 text-sm mb-7">
              Join hundreds of successful students from Barrackpore, Sodepore, Ichapore, Barasat &amp; Sreerampore.
              Limited seats — enroll today.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodedMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
              >
                <i className="bi bi-whatsapp"></i>
                WhatsApp Inquiry
              </a>
              <a
                href="tel:+919432456083"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all hover:scale-105"
              >
                <i className="bi bi-telephone"></i>
                +91 94324 56083
              </a>
            </div>
            <p className="mt-5 text-xs text-slate-600">
              📍 25(10/A) Shibtala Road, Nona Chandan Pukur, Barrackpore — Pin 700122
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
