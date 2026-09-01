// ============================================================================
// Header.jsx - Ultra-Clean, Professional Minimalist Hero Section
// ============================================================================

import React from "react";
import { HashLink } from "react-router-hash-link";
import { motion } from "framer-motion";
import background from "../../assets/background2.jpg";

const Header = () => {
  return (
    <header
      id="top"
      className="relative text-white w-full flex items-center justify-center overflow-hidden border-b border-slate-800/80 bg-[#030712] select-none"
      style={{
        minHeight: "calc(100vh - 56px)",
        height: "calc(100vh - 56px)",
      }}
    >
      {/* Background Image Layer with High Clarity */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-85 transform scale-100"
        style={{ backgroundImage: `url(${background})` }}
      />

      {/* Balanced Cinematic Dark Vignette for Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/65 via-[#030712]/40 to-[#030712]/85 pointer-events-none" />

      {/* Invisible SEO Primary H1 */}
      <h1 className="sr-only">
        Coder & AccoTax - Best Coding & Accounting Training Institute in Barrackpore
      </h1>

      {/* Hero Center Content */}
      <div className="relative z-10 px-6 max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Minimal Accreditation Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 shadow-md backdrop-blur-md mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-xs font-medium text-slate-400 tracking-wide">
            ISO 9001:2015 Certified Institute
          </span>
        </motion.div>

        {/* Translucent Title */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white/50 drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
        >
          Coder & AccoTax
        </motion.h2>

        {/* Translucent Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16, ease: "easeOut" }}
          className="text-lg sm:text-2xl md:text-3xl font-medium text-white/40 mt-4 mb-8 tracking-tight"
        >
          Shaping Futures with <span className="text-white/65 font-semibold">Code</span> & <span className="text-white/65 font-semibold">Compliance</span>.
        </motion.p>

        {/* Clean, Translucent Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24, ease: "easeOut" }}
          className="flex items-center justify-center gap-3.5"
        >
          <HashLink
            smooth
            to="/#courses"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm sm:text-base text-white/90 hover:text-white bg-white/15 hover:bg-white/25 border border-white/25 hover:border-white/40 shadow-xl shadow-black/40 backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <span>Explore Courses</span>
            <i className="bi bi-arrow-right text-xs"></i>
          </HashLink>

          <HashLink
            smooth
            to="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm sm:text-base text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 shadow-md backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <span>Contact Us</span>
          </HashLink>
        </motion.div>

      </div>
    </header>
  );
};

export default Header;
