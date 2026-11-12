"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic21_files/topic21_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic21() {
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

  const [inpSerialAudit, setInpSerialAudit] = useState("46338");

  const systemComparison = useMemo(() => {
    const s = parseFloat(inpSerialAudit);
    if (isNaN(s)) {
      return { isError: true, error: "#VALUE! Enter a valid serial number" };
    }

    // 1900 system base: 1899-12-30
    const d1900Ms = Date.UTC(1899, 11, 30) + s * 86400000;
    const d1900 = new Date(d1900Ms);

    // 1904 system base: 1904-01-01
    const d1904Ms = Date.UTC(1904, 0, 1) + s * 86400000;
    const d1904 = new Date(d1904Ms);

    const fmtDate = (d) => {
      const yr = d.getUTCFullYear();
      const mo = String(d.getUTCMonth() + 1).padStart(2, '0');
      const day = String(d.getUTCDate()).padStart(2, '0');
      return `${yr}-${mo}-${day}`;
    };

    return {
      isError: false,
      serial: s,
      date1900: fmtDate(d1900),
      date1904: fmtDate(d1904),
      driftDays: 1462
    };
  }, [inpSerialAudit]);
    

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
              ⚡ Date & Calendar Engineering · Topic 21
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Enterprise Architecture · Cross-Platform Systems
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Evaluate & Reconcile
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            1900 vs 1904 Date Systems — Cross-Platform Drift Audit & Compatibility Engineering
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>Excel supports two completely different calendar calculation architectures: the <strong>1900 Date System</strong> (the default on Microsoft Windows) and the <strong>1904 Date System</strong> (originally standard on Apple Macintosh systems).</p><p>In the 1900 system, serial day 1 corresponds to January 1, 1900. In the 1904 system, serial day 0 corresponds to January 1, 1904, and serial day 1 corresponds to January 2, 1904. This architectural divergence creates an exact <strong>1,462-day variance</strong> (4 years and 1 day). When data is copied between workbooks utilizing different date systems, dates will silently shift by 4 years and 1 day without throwing any formula error! Auditing and reconciling this drift is a critical skill for cross-platform enterprise financial modeling.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">Drift Variance = 1,462 Days | =A2 + 1462 (1900 to 1904) | =A2 - 1462 (1904 to 1900)</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> Financial Modeling, M&A Data Integration & Multi-OS Auditing</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> =A2 + 1462 (Reconcile Mac 1904 into Windows 1900) | File > Options > Advanced > Use 1904</span>
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
              Base Epoch Calculation Engine
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical 1900 vs 1904 Date Systems Formula Signature</div>
            <div className="text-white font-bold text-base">
              Date_1900 = Date_1904 + 1462 | Date_1904 = Date_1900 - 1462
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">1900 System (Default):</strong> Windows standard. Day 1 = Jan 1, 1900. Includes the Lotus 1-2-3 Feb 29 1900 compatibility bug.</div><div>• <strong className="text-sky-300">1904 System:</strong> Mac legacy standard. Day 0 = Jan 1, 1904. Eliminates the 1900 leap bug and supports negative time calculations.</div><div>• <strong className="text-amber-300">1,462-Day Drift:</strong> The exact mathematical difference between the two base epochs (4 non-leap years of 365 days + 2 leap days).</div>
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
              <span className="text-emerald-400">📊</span> 1900 vs 1904 Serial Interpretation Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Observe the 1,462-day shift when the exact same raw serial number is read under both systems.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Raw Serial Number</th>
                  <th className="py-3 px-4">1900 Date System</th>
                  <th className="py-3 px-4">1904 Date System</th>
                  <th className="py-3 px-4">Discrepancy</th>
                  <th className="py-3 px-4">System Offset</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">1</td>
        <td className="py-3.5 px-4 text-white font-mono">01-Jan-1900</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">02-Jan-1904</td>
        <td className="py-3.5 px-4 text-amber-300">4 Years, 1 Day</td>
        <td className="py-3.5 px-4 text-slate-300 font-mono">+1,462 Days</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">1462</td>
        <td className="py-3.5 px-4 text-white font-mono">31-Dec-1903</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">01-Jan-1908</td>
        <td className="py-3.5 px-4 text-amber-300">4 Years, 1 Day</td>
        <td className="py-3.5 px-4 text-slate-300 font-mono">+1,462 Days</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">40000</td>
        <td className="py-3.5 px-4 text-white font-mono">06-Jul-2009</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">07-Jul-2013</td>
        <td className="py-3.5 px-4 text-amber-300">4 Years, 1 Day</td>
        <td className="py-3.5 px-4 text-slate-300 font-mono">+1,462 Days</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">46338</td>
        <td className="py-3.5 px-4 text-white font-mono">12-Nov-2026</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">13-Nov-2030</td>
        <td className="py-3.5 px-4 text-amber-300">4 Years, 1 Day</td>
        <td className="py-3.5 px-4 text-slate-300 font-mono">+1,462 Days</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">50000</td>
        <td className="py-3.5 px-4 text-white font-mono">23-Nov-2036</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">24-Nov-2040</td>
        <td className="py-3.5 px-4 text-amber-300">4 Years, 1 Day</td>
        <td className="py-3.5 px-4 text-slate-300 font-mono">+1,462 Days</td>
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
                The Lotus 1-2-3 Compatibility Origin & Macintosh History
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Why Macintosh chose 1904 while Windows remained chained to the 1900 system.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>In 1984, Apple designed the original Macintosh operating system. Early Mac engineers recognized that 1900 was not a leap year and opted to anchor their time system to <strong>January 1, 1904</strong> (the first valid leap year of the 20th century). This prevented early Macintosh software from suffering from the 1900 leap year bug.</p><p>However, when Microsoft released Excel for Windows in 1987, Lotus 1-2-3 dominated 90% of the PC spreadsheet market. Lotus had erroneously treated 1900 as a leap year. If Excel had corrected this bug on Windows, Lotus users would have found their dates off by 1 day when migrating! Microsoft deliberately preserved the bug for Windows, creating the dual-system legacy that persists in modern Microsoft 365 today.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Blind Copy-Pasting Between Workbooks
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"[Workbook_Mac]Sheet1!A2 -> [Workbook_Win]Sheet1!A2"}
                </div>
                <p className="text-xs text-slate-400">
                  Transfers raw serial numbers without converting the epoch, instantly corrupting all dates by 4 years and 1 day.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Audit Formula with Explicit System Normalization
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"=IF(IS_1904_WORKBOOK, A2 + 1462, A2)"}
                </div>
                <p className="text-xs text-slate-400">
                  Applies the mathematical 1,462-day correction factor during data ingestion pipelines.
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
            The 1,462-Day Epoch Shift between 1900 Windows and 1904 Macintosh systems.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="40" y="40" width="340" height="110" rx="12" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
        <text x="210" y="70" textAnchor="middle" fill="#38BDF8" className="text-xs font-bold font-mono">WINDOWS 1900 SYSTEM</text>
        <text x="210" y="105" textAnchor="middle" fill="#FFFFFF" className="text-xl font-bold font-mono">Serial: 46338 = 12-Nov-2026</text>
        <text x="210" y="130" textAnchor="middle" fill="#94A3B8" className="text-xs">Base Epoch: 01-Jan-1900</text>

        <path d="M 390 95 L 430 95" stroke="#F59E0B" strokeWidth="3" markerEnd="url(#arrow)" />
        <text x="410" y="80" textAnchor="middle" fill="#F59E0B" className="text-[10px] font-bold">+1,462 DAYS</text>

        <rect x="440" y="40" width="360" height="110" rx="12" fill="#0F172A" stroke="#10B981" strokeWidth="2" />
        <text x="620" y="70" textAnchor="middle" fill="#10B981" className="text-xs font-bold font-mono">MACINTOSH 1904 SYSTEM</text>
        <text x="620" y="105" textAnchor="middle" fill="#FFFFFF" className="text-xl font-bold font-mono">Serial: 46338 = 13-Nov-2030</text>
        <text x="620" y="130" textAnchor="middle" fill="#94A3B8" className="text-xs">Base Epoch: 01-Jan-1904</text>
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
                Explore real 1900 vs 1904 Date Systems formula calculations, live audits, and calculated outputs in the embedded worksheet.
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
            sheetName="Topic21"
            title="Topic 21: 1900 vs 1904 Date Systems Master Practice Grid"
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
                  Scenario 1: M&A Audit
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata & Barrackpore Merger Office</span>
              </div>
              <h3 className="text-base font-bold text-white">Reconciling Cross-Platform M&A Financial Model Consolidation</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"During a corporate merger between a Kolkata consulting firm (Mac users) and a Barrackpore conglomerate (Windows users), asset depreciation schedules showed a bizarre 4-year variance."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Normalize Mac serial numbers into Windows 1900 epoch</div>
                <div className="text-emerald-300 font-bold">{"=IF(CellIn1904Workbook, A2 + 1462, A2)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Mac Serial 44876 converts to true Windows serial 46338 (12-Nov-2026)."}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: Negative Time
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Titagarh Payroll Division</span>
              </div>
              <h3 className="text-base font-bold text-white">Enabling Negative Time Calculations via 1904 Date System</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"A payroll officer in Titagarh needs to track overtime variances. When actual hours are less than scheduled hours (e.g. 7.5 hours worked vs 8.0 scheduled), Windows Excel displays '#####'."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Calculate variance in 1904 system to support negative time</div>
                <div className="text-emerald-300 font-bold">{"=ActualHours - ScheduledHours"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Cell evaluates cleanly to: -00:30 (negative 30 minutes)"}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: ETL Validation
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Ichapur Data Engineering</span>
              </div>
              <h3 className="text-base font-bold text-white">Automated VBA / Power Query Ingestion Epoch Check</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"An enterprise ETL pipeline imports customer birthdates from third-party vendor CSVs generated by mixed Mac and Windows Excel exports. The pipeline must programmatically verify the date system."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Test base date alignment to detect system drift</div>
                <div className="text-emerald-300 font-bold">{"=IF(DATE(2026,1,1)-DATEVALUE(\"2026-01-01\")=0, \"1900 Standard\", \"1904 Drift Alert\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Flags 1904 files before inserting corrupted dates into SQL database."}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: Safe Linking
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Shyamnagar Financial Planning</span>
              </div>
              <h3 className="text-base font-bold text-white">Safe Cross-Workbook Linking via ISO Text Serialization</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Shyamnagar financial analysts need to link dynamic summary cells from Mac workbooks into Windows master reports without corrupting dates."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Pass ISO formatted text string to bridge date systems</div>
                <div className="text-emerald-300 font-bold">{"=DATEVALUE(TEXT([MacModel.xlsx]Sheet1!$B$5, \"yyyy-mm-dd\"))"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Evaluates cleanly as 12-Nov-2026 in host Windows workbook."}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: Forensic Audit
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Naihati Enterprise Accounting</span>
              </div>
              <h3 className="text-base font-bold text-white">Diagnosing Mystery 'Future Date' Audit Anomalies</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"An internal auditor at Naihati notices that employee hire dates for recent graduates are showing up in the year 2030 instead of 2026 in the corporate master dashboard."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Detect signature ~4-year jump caused by 1904 copy-paste</div>
                <div className="text-emerald-300 font-bold">{"=IF(A2 > TODAY() + 1000, A2 - 1462, A2)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Detects 1904 drift and subtracts 1,462 days to restore 2026 hire date."}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: Governance
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata Corporate IT</span>
              </div>
              <h3 className="text-base font-bold text-white">Standardizing Corporate Excel Templates via Group Policy</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"IT Governance across Kolkata and Naihati offices must ensure all newly created enterprise workbooks strictly adhere to the 1900 date system."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Audit workbook-level 1904 property</div>
                <div className="text-emerald-300 font-bold">{"=IF(ActiveWorkbook.Date1904, \"VIOLATION: 1904 System Active\", \"COMPLIANT: 1900 System\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Automated scan confirms zero rogue 1904 workbooks."}
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
              <span className="text-indigo-400 font-bold">Step 1: Locate Date System Setting in Excel Options</span>
              <p>{"Navigate to File > Options > Advanced. Scroll down to the section titled 'When calculating this workbook'. Check if 'Use 1904 date system' is enabled."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Excel Options > Advanced > When calculating this workbook"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 2: Verify the 1,462-Day Mathematical Difference</span>
              <p>{"In an empty cell, type =DATE(1904,1,1) - DATE(1900,1,1). Notice the result is 1,461 days + 1 extra day for the 1900 leap year bug = 1,462 days."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=DATE(1904,1,1) - DATE(1900,1,1) + 1"}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Identify Imported Date Columns with 4-Year Jump</span>
              <p>{"Scan incoming data tables for dates that are roughly 4 years and 1 day ahead of expected historical ranges."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=IF(A2 - ExpectedDate = 1462, '1904 Drift', 'Valid')"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 4: Apply Ingestion Normalization Formula</span>
              <p>{"Normalize imported serial values by adding or subtracting 1462 to align with the host workbook architecture."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=A2 - 1462"}</div>
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
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Silent 4-Year Jump (No Error Code)"}</td>
                  <td className="py-3 px-4 font-sans">{"Excel pastes raw serial numbers. The host workbook evaluates those numbers against its own base epoch."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Pasting data copied from a Mac workbook into a Windows workbook."}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Paste Values and multiply/subtract 1462 using Paste Special > Operation > Subtract, or link via TEXT(cell, 'yyyy-mm-dd')."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"All Existing Workbook Dates Shift Overnight"}</td>
                  <td className="py-3 px-4 font-sans">{"Enabling the 1904 option retroactively reinterprets every serial number in the current workbook, shifting every date forward by 4 years and 1 day!"}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"A user checks the 'Use 1904 date system' checkbox in an existing 1900 workbook."}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Immediately uncheck 'Use 1904 date system' in File > Options > Advanced. Never toggle this setting on a live workbook with existing dates."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Negative Time Hash Display (#####)"}</td>
                  <td className="py-3 px-4 font-sans">{"Windows 1900 date system cannot render negative time values."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Trying to display -02:30 in Windows 1900 date system."}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Enable 1904 date system (if entire model is designed for it) or display as text: =IF(Diff<0, '-' & TEXT(ABS(Diff), 'hh:mm'), TEXT(Diff, 'hh:mm'))."}</td>
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
              <span className="text-indigo-400 font-bold">Never Toggle Live 1904 Option</span>
              <p className="text-slate-300">{"Never toggle the 'Use 1904 date system' checkbox on an existing workbook. Doing so does not convert existing dates; it instantly reinterprets them, shifting every existing date in your model by 1,462 days!"}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">Modern Mac Parity</span>
              <p className="text-slate-300">{"Modern Excel for Mac now defaults to the 1900 date system to ensure parity with Windows. However, legacy Mac workbooks created before 2011 or templates originating from Mac software still frequently carry the 1904 system flag."}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">Export Clean ISO Strings for CSVs</span>
              <p className="text-slate-300">{"When building automated CSV import pipelines, always export dates in ISO 8601 text format ('YYYY-MM-DD'). CSV text strings are immune to binary serial epoch drift."}</p>
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
              • <strong>Leap Bug Offset:</strong> {"Why is the drift between the 1900 and 1904 systems exactly 1,462 days instead of 1,461 days?"}
            </p>

            <p key="1">
              • <strong>Workbook Scope:</strong> {"Does toggling the 1904 date system in Excel Options affect all workbooks or just the active workbook?"}
            </p>

            <p key="2">
              • <strong>Power Query Engine:</strong> {"What happens when you use Power Query to merge tables from a 1900 workbook and a 1904 workbook?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 21: 1900 vs 1904 Date Systems Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="1900 vs 1904 Date Systems Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"The 1900 vs 1904 conflict is one of Excel's oldest quirks. If a client ever tells you their financial model suddenly shows contract renewals in 2030 instead of 2026, do not panic: remember the magic number 1,462. It is the signature mark of a cross-platform epoch collision."}
          />
        </div>
      </div>
    </div>
  );
}
