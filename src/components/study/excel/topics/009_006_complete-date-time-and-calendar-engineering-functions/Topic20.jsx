"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic20_files/topic20_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic20() {
  const sectionsRef = useRef([]);

  // Intersection Observer for fluid section reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    sectionsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Download Master Workbook
  const handleDownload = () => {
    if (!sampleWorkbookUrl) return;
    const link = document.createElement("a");
    link.href = sampleWorkbookUrl;
    link.download = "complete_date_time_calendar_engineering_master.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ---------------------------------------------------------------------------
  // INTERACTIVE BENCHMARK & SIMULATOR STATE
  // ---------------------------------------------------------------------------

  const [inpRawSerial, setInpRawSerial] = useState("46338.604167");

  const serialAudit = useMemo(() => {
    const num = parseFloat(inpRawSerial);
    if (isNaN(num) || num < 0) {
      return { isError: true, error: "#VALUE! Enter a valid positive serial number" };
    }

    const intPart = Math.floor(num);
    const fracPart = num - intPart;

    // Excel base date: 1899-12-30 (due to 1900 leap bug)
    const baseMs = Date.UTC(1899, 11, 30);
    const dateMs = baseMs + intPart * 86400000;
    const d = new Date(dateMs);

    const yr = d.getUTCFullYear();
    const mo = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');

    const totalSeconds = Math.round(fracPart * 86400);
    const hh = Math.floor(totalSeconds / 3600);
    const mm = Math.floor((totalSeconds % 3600) / 60);
    const ss = totalSeconds % 60;

    const timeStr = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
    const unixEpoch = Math.round((num - 25569) * 86400);

    return {
      isError: false,
      serial: num.toFixed(6),
      intDate: `${yr}-${mo}-${day}`,
      fracTime: timeStr,
      intVal: intPart,
      fracVal: fracPart.toFixed(6),
      unixEpoch
    };
  }, [inpRawSerial]);
    

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <style>{`
        @keyframes fadeInSlide {
          from { transform: translateY(18px); opacity: 0.9; }
          to { transform: translateY(0); opacity: 1; }
        }
        .reveal-section {
          animation: fadeInSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="max-w-5xl mx-auto space-y-10">
        {/* =========================================================================
            SECTION 1: HERO HEADER & EXECUTIVE OVERVIEW
        ========================================================================= */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-indigo-950/70 via-slate-900/80 to-slate-950 border border-indigo-900/50 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-indigo-950/90 border border-indigo-600/60 text-indigo-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ Date & Calendar Engineering · Topic 20
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Core Architecture · IEEE 754 Floating Point
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Analyze & Architect
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            Serial Date Architecture — 64-bit Floating-Point Mechanics & Time Fraction Math
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>In Microsoft Excel, dates and times are not stored as human strings like <code className="text-white font-mono">"12-Nov-2026"</code>. Underneath every formatted date cell lies a <strong>64-bit IEEE 754 double-precision floating-point number</strong>, commonly called the <em>Serial Date Number</em>.</p><p>The integer portion of the serial represents the number of elapsed days since January 1, 1900 (or December 30, 1899 due to the Lotus 1-2-3 compatibility bug). The fractional decimal portion represents time as a fraction of a 24-hour day (e.g. <code className="text-emerald-300 font-mono">0.5 = 12:00 PM</code>, <code className="text-emerald-300 font-mono">0.25 = 06:00 AM</code>, and <code className="text-emerald-300 font-mono">1/86400 = 1 second</code>). Understanding this numeric foundation demystifies date arithmetic, Unix Epoch bridging (<code className="text-indigo-300 font-mono">=(UnixSeconds/86400)+25569</code>), and floating-point rounding anomalies.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">=INT(serial) [Date Component] | =MOD(serial, 1) [Time Component]</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> Data Architecture, System Integration & High-Precision Chronometry</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> =INT(A2) (Extract Date) | =MOD(A2,1) (Extract Time) | =(Unix/86400)+25569 (Unix Epoch)</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: INTERACTIVE LIVE BENCHMARK & SIMULATOR WORKBENCH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/80 border border-slate-800 shadow-xl space-y-6"
        >
          undefined
        </section>

        {/* =========================================================================
            SECTION 3: FORMULA ANATOMY & SIGNATURE CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6 hover:border-slate-700 transition"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-indigo-400">⚡</span> Formula Anatomy & Parameter Specifications
            </h2>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-950/80 px-3 py-1 rounded-lg border border-indigo-800">
              Underlying Serial Number Storage Engine
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical Serial Date Architecture Formula Signature</div>
            <div className="text-white font-bold text-base">
              Serial Number = Integer_Days + (Hours/24 + Minutes/1440 + Seconds/86400)
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">Integer Portion:</strong> Whole days elapsed since day 1 (where 1 = 1-Jan-1900, 46338 = 12-Nov-2026).</div><div>• <strong className="text-sky-300">Decimal Fraction:</strong> Time of day expressed as elapsed seconds divided by 86,400 (e.g., 0.75 = 18:00:00 / 6:00 PM).</div><div>• <strong className="text-amber-300">Cell Formatting:</strong> Pure presentation layer. Formatting changes what you see on the screen without modifying the underlying double-precision float.</div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: IN-DEPTH SYNTAX MATRIX & SPECIFICATION TABLE
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-emerald-400">📊</span> Serial Number Deconstruction Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Examine how integer days and fractional hours combine into unified timestamps.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Human Timestamp</th>
                  <th className="py-3 px-4">Serial Number</th>
                  <th className="py-3 px-4">Integer Component (=INT)</th>
                  <th className="py-3 px-4">Fractional Component (=MOD)</th>
                  <th className="py-3 px-4">Time Equivalent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">12-Nov-2026 00:00:00</td>
        <td className="py-3.5 px-4 text-white font-mono">46338.000000</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">46338 (12-Nov-2026)</td>
        <td className="py-3.5 px-4 text-amber-300 font-mono">0.000000</td>
        <td className="py-3.5 px-4 text-slate-300">Midnight (00:00)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">12-Nov-2026 06:00:00</td>
        <td className="py-3.5 px-4 text-white font-mono">46338.250000</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">46338 (12-Nov-2026)</td>
        <td className="py-3.5 px-4 text-amber-300 font-mono">0.250000</td>
        <td className="py-3.5 px-4 text-slate-300">Morning Shift (06:00 AM)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">12-Nov-2026 12:00:00</td>
        <td className="py-3.5 px-4 text-white font-mono">46338.500000</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">46338 (12-Nov-2026)</td>
        <td className="py-3.5 px-4 text-amber-300 font-mono">0.500000</td>
        <td className="py-3.5 px-4 text-slate-300">Solar Noon (12:00 PM)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">12-Nov-2026 18:30:00</td>
        <td className="py-3.5 px-4 text-white font-mono">46338.770833</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">46338 (12-Nov-2026)</td>
        <td className="py-3.5 px-4 text-amber-300 font-mono">0.770833</td>
        <td className="py-3.5 px-4 text-slate-300">Evening Shift End (6:30 PM)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">12-Nov-2026 23:59:59</td>
        <td className="py-3.5 px-4 text-white font-mono">46338.999988</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">46338 (12-Nov-2026)</td>
        <td className="py-3.5 px-4 text-amber-300 font-mono">0.999988</td>
        <td className="py-3.5 px-4 text-slate-300">Fiscal Day Boundary (EOD)</td>
      </tr>
    
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: ARCHITECTURAL DEEP DIVE & MATHEMATICAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 flex items-center justify-center text-xl shrink-0">
              ⚙️
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                The Floating-Point Rounding Hazard in Timestamp Matching
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Why exact equality checks (=A2=B2) on timestamps fail due to binary IEEE 754 representation limits.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>A pervasive bug in financial reconciliation and telemetry logs occurs when analysts write exact equality formulas like <code className="text-rose-400 font-mono">=A2=B2</code> on timestamps.</p><p>Because 1 hour is <code className="text-white font-mono">1/24 = 0.0416666666666667...</code> (an infinite recurring fraction in base-10 and base-2), adding hours or seconds introduces microscopic floating-point rounding errors at the 15th significant digit! For example, <code className="text-rose-400 font-mono">TIME(10,0,0)</code> calculated by sequential addition might evaluate to <code className="text-white font-mono">0.4166666666666670</code> while a hardcoded entry evaluates to <code className="text-white font-mono">0.4166666666666666</code>, causing <code className="text-rose-400 font-mono">A2=B2</code> to evaluate to <strong className="text-rose-400">FALSE</strong>!</p><p>In enterprise engineering, always compare timestamps using a tolerance threshold or round them to the nearest second before matching: <code className="text-emerald-300 font-mono">=ROUND(A2*86400, 0) = ROUND(B2*86400, 0)</code>.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Direct Equality Check on Composite Timestamps
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"=IF(A2=B2, \"Matched Event\", \"Drift Detected\")"}
                </div>
                <p className="text-xs text-slate-400">
                  Fails silently due to IEEE 754 precision noise at the 15th decimal place.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Tolerance or Second-Bounded Rounding Match
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"=IF(ROUND(A2*86400, 0)=ROUND(B2*86400, 0), \"Matched\", \"Drift\")"}
                </div>
                <p className="text-xs text-slate-400">
                  Converts both serial numbers to discrete integer seconds, eliminating microscopic IEEE 754 float drift.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: VISUAL CONCEPTUAL ARCHITECTURE (SVG PIPELINE)
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-sky-400">📐</span> Visual Semantic Architecture & Flow Diagram
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Architecture of an Excel Serial Number: Integer Days on the left, Fractional Time on the right.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="40" width="370" height="110" rx="12" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
        <text x="215" y="70" textAnchor="middle" fill="#38BDF8" className="text-xs font-bold font-mono uppercase tracking-wider">INTEGER COMPONENT (Days)</text>
        <text x="215" y="105" textAnchor="middle" fill="#FFFFFF" className="text-2xl font-black font-mono">46338</text>
        <text x="215" y="130" textAnchor="middle" fill="#94A3B8" className="text-[11px]">=INT(A2) → 12-Nov-2026</text>

        <circle cx="420" cy="95" r="8" fill="#F59E0B" />

        <rect x="440" y="40" width="370" height="110" rx="12" fill="#0F172A" stroke="#10B981" strokeWidth="2" />
        <text x="625" y="70" textAnchor="middle" fill="#10B981" className="text-xs font-bold font-mono uppercase tracking-wider">FRACTIONAL COMPONENT (Time)</text>
        <text x="625" y="105" textAnchor="middle" fill="#FFFFFF" className="text-2xl font-black font-mono">.60416667</text>
        <text x="625" y="130" textAnchor="middle" fill="#94A3B8" className="text-[11px]">=MOD(A2,1) → 14:30:00 (2:30 PM)</text>
      </svg>
    
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: INTERACTIVE MASTER SPREADSHEET (EMBEDDED PRACTICE WORKBOOK)
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="text-emerald-400">📥</span> Interactive Master Spreadsheet Practice
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore real Serial Date Architecture formula calculations, live audits, and calculated outputs in the embedded worksheet.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer"
              title="Download Master Practice Workbook (.xlsx)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="Topic20"
            title="Topic 20: Serial Date Architecture Master Practice Grid"
            rowsPerPage={12}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 8: REAL-WORLD ENTERPRISE BUSINESS SCENARIOS (6 DETAILED CASE STUDIES)
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-6"
        >
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-amber-400">🏢</span> Real-World Enterprise Business Scenarios
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Industrial grade case studies from West Bengal IT hubs, banking institutes, and multinational supply chains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div key="0" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 1: Data Separation
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Shyamnagar Logistics Center</span>
              </div>
              <h3 className="text-base font-bold text-white">Splitting Date and Time from a Combined Timestamp Cell</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"At the Shyamnagar distribution hub, GPS delivery logs import as '12-Nov-2026 14:35:10'. Analysts must group volumes by calendar date alone and analyze peak delivery hours separately."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Isolate integer date and fractional time components</div>
                <div className="text-emerald-300 font-bold">{"=INT(A2) [For Date] and =MOD(A2, 1) [For Time]"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Date: 46338 (12-Nov-2026); Time: 0.60775 (14:35:10)"}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: Unix Conversion
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Barrackpore Fintech Platform</span>
              </div>
              <h3 className="text-base font-bold text-white">Converting Unix Epoch Timestamps to Human Excel Dates</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"A Barrackpore fintech server exports transaction audit trails with 10-digit Unix epoch timestamps (seconds elapsed since 01-Jan-1970 00:00:00 UTC). Excel must convert them to local IST calendar timestamps."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Bridge 1970 Unix epoch to 1900 Excel serial with IST offset</div>
                <div className="text-emerald-300 font-bold">{"=(A2 / 86400) + 25569 + (5.5 / 24)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Input: 1794503710 → Evaluates to: 12-Nov-2026 14:30:00 IST"}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: High-Frequency Log
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata Data Center</span>
              </div>
              <h3 className="text-base font-bold text-white">Converting Millisecond Telemetry Timestamps (13-Digit)</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"High-frequency trade order books from the Kolkata data center log order executions in 13-digit Unix millisecond timestamps. Risk analysts need down-to-the-millisecond Excel chronological sorting."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Scale 13-digit milliseconds into Excel floating days</div>
                <div className="text-emerald-300 font-bold">{"=(A2 / 86400000) + 25569 + (5.5 / 24)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Input: 1794503710500 → Evaluates to: 12-Nov-2026 14:30:00.500"}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: Fast Arithmetic
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Naihati Rail Yard</span>
              </div>
              <h3 className="text-base font-bold text-white">Adding Pure Hours and Minutes via Numeric Arithmetic</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Naihati Rail Yard controllers calculate anticipated train dispatch times by adding 4 hours and 45 minutes of scheduled maintenance directly to train arrival timestamps without using TIME()."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Direct fractional addition bypassing function overhead</div>
                <div className="text-emerald-300 font-bold">{"=A2 + (4.75 / 24)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Arrival: 12-Nov 08:30 → Dispatch: 12-Nov 13:15"}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: Lookup Sanitization
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Titagarh Manufacturing Plant</span>
              </div>
              <h3 className="text-base font-bold text-white">Stripping Time to Prevent VLOOKUP / XLOOKUP Date Matching Failures</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"A Titagarh manufacturing plant performs daily ledger audits. Invoices recorded as '12-Nov-2026 17:45:00' fail to match bank statement dates entered as '12-Nov-2026 00:00:00' during XLOOKUP reconciliation."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Normalize timestamp to integer serial for exact equality</div>
                <div className="text-emerald-300 font-bold">{"=XLOOKUP(INT(A2), INT(tblBank[Date]), tblBank[Amount])"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Exact match found! Disregards 17:45:00 time stamp and matches pure calendar date."}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: Latency SLA
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Ichapur IT Operations</span>
              </div>
              <h3 className="text-base font-bold text-white">Precision Elapsed Seconds Calculation Between High-Speed Sockets</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Ichapur IT infrastructure audits API gateway response latency across distributed microservices. Analysts measure microsecond execution times between request received and response delivered."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Convert elapsed fractional days to seconds</div>
                <div className="text-emerald-300 font-bold">{"=(B2 - A2) * 86400"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Request: 14:00:00.100, Response: 14:00:00.350 → Result: 0.250 seconds (250 ms)"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: STEP-BY-STEP CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-sky-400">📝</span> Step-by-Step Execution Walkthrough
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            
            <div key="0" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 1: Inspect Underlying Cell Number Format</span>
              <p>{"Switch any date cell's format from 'Date' to 'General' (Ctrl+Shift+~). Notice how 12-Nov-2026 transforms into the raw integer 46338. This confirms that dates are pure numbers."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=A2 (Formatted as General)"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 2: Extract Date Component Using INT</span>
              <p>{"Use INT(cell) to strip off the time of day, truncating the floating-point decimal to zero."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=INT(A2)"}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Isolate Time Fraction Using MOD</span>
              <p>{"Use MOD(cell, 1) to retrieve the decimal fraction representing the exact elapsed time."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=MOD(A2, 1)"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 4: Scale to Business Units (Hours / Minutes / Seconds)</span>
              <p>{"Multiply fractional days by 24 for decimal hours, 1440 for minutes, or 86400 for seconds."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=MOD(A2, 1) * 24"}</div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: ERROR & TROUBLESHOOTING MATRIX
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-rose-400">⚠️</span> Error & Troubleshooting Matrix
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Error Code / Bug</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Demonstration Trigger</th>
                  <th className="py-3 px-4">Professional Remedy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
                <tr key="0" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#VALUE!"}</td>
                  <td className="py-3 px-4 font-sans">{"Excel cannot apply integer math to non-numeric strings."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=INT(A2) when A2 contains an unparsed text string '2026.11.12'"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Convert the string to a true serial number first using DATEVALUE() or DATE(LEFT(A2,4), MID(A2,6,2), RIGHT(A2,2))."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Lookup Fails (N/A)"}</td>
                  <td className="py-3 px-4 font-sans">{"One cell contains a hidden fractional timestamp (e.g. 46338.45) while the target lookup table contains midnight (46338.00)."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=XLOOKUP(A2, B:B, C:C) fails even though both appear as '12-Nov-2026'"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Wrap both terms in INT(): =XLOOKUP(INT(A2), INT(B:B), C:C) or cleanse source data at entry."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Negative Time Display (#####)"}</td>
                  <td className="py-3 px-4 font-sans">{"Excel's 1900 date system cannot display negative date or time serial numbers, rendering an endless string of hash marks (#####)."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Subtracting a later timestamp from an earlier timestamp: =08:00 - 17:00"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Wrap with ABS() or handle overnight wraps with =MOD(End - Start, 1)."}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: PRO TIPS & ARCHITECTURAL INSIGHTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[10] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-purple-400">💡</span> Pro Tips & Secret Heritage Insights
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            
            <div key="0" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-indigo-400 font-bold">Never Store Dates as Strings</span>
              <p className="text-slate-300">{"Never store dates as formatted strings if you plan to query or sort them in pivot tables or Power Query. Retain the native serial double-precision float and apply format masks strictly at the UI display layer."}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">The Magic Numbers 25569 & 86400</span>
              <p className="text-slate-300">{"The Unix Epoch bridge constant 25569 represents the number of days between 01-Jan-1900 and 01-Jan-1970. Memorize 25569 and 86400 (seconds in a day); they are essential for server log integration."}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">Keyboard Shortcuts for Quick Audit</span>
              <p className="text-slate-300">{"To quickly format a serial number as a standard date, use the universal Excel keyboard shortcut Ctrl+Shift+# (Ctrl+Shift+3). To revert to raw numeric view, press Ctrl+Shift+~."}</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 12: SOCRATIC ANALYTICAL QUESTIONS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[11] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-teal-400">🤔</span> Socratic Analytical Questions
          </h2>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs sm:text-sm text-slate-300">
            
            <p key="0">
              • <strong>Serial Origin:</strong> {"Why does the serial number 1.0 correspond to 01-Jan-1900, but serial 0.5 corresponds to 00-Jan-1900 12:00 PM?"}
            </p>

            <p key="1">
              • <strong>Historical Heritage:</strong> {"Why does Excel believe that 1900 was a leap year when standard Gregorian astronomy says it was not?"}
            </p>

            <p key="2">
              • <strong>Precision Limits:</strong> {"How does IEEE 754 floating-point storage limit the maximum future date Excel can store?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 20: Serial Date Architecture Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="Serial Date Architecture Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"Always remember: in Excel, dates are not text; they are integers representing days. Times are not text; they are decimals representing parts of a day. Once you master this dual-nature architecture, timestamp math, time-zone offsets, and cross-platform log parsing become second nature."}
          />
        </div>
      </div>
    </div>
  );
}
