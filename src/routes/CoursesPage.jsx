// ============================================================================
// CoursesPage.jsx - Dedicated Public Course Catalog Page
// ============================================================================

import React from "react";
import { NavLink } from "react-router-dom";
import { ArrowLeft, BookOpen, Sparkles, ShieldCheck, HelpCircle } from "lucide-react";
import Courses from "./HomeComponent/Courses";

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100">
      {/* Top Banner / Hero for dedicated Courses page */}
      <div className="relative py-8 sm:py-12 px-4 sm:px-6 bg-gradient-to-b from-slate-950 via-slate-900/60 to-transparent border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center justify-between">
            <NavLink
              to="/"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition cursor-pointer text-xs font-semibold"
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </NavLink>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Coder &amp; AccoTax</span>
              <span>/</span>
              <span className="text-sky-400 font-semibold">Course Catalog (Database)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  All Training Programs &amp; Diplomas
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  cnat_api Verified
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
                Explore comprehensive certifications, curricula, class hours, and syllabus fetched directly from our academic database.
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-shrink-0">
              <NavLink
                to="/student-course-qr"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 hover:text-sky-200 border border-sky-500/40 text-xs font-bold transition"
              >
                <Sparkles size={14} />
                <span>Student QR Studio</span>
              </NavLink>

              <a
                href="https://wa.me/919432456083?text=Hi%20Coder%20%26%20AccoTax%2C%20I%20am%20interested%20in%20course%20admissions."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition"
              >
                <ShieldCheck size={14} />
                <span>WhatsApp Admission</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dynamic Courses Component */}
      <Courses />
    </div>
  );
}
