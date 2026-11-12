"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic23_files/topic23_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic23() {
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

  const [inpMaskStr, setInpMaskStr] = useState("0000110"); // Default: Fri/Sat weekend
  const [inpTestDate, setInpTestDate] = useState("2026-11-13"); // A Friday

  const maskAudit = useMemo(() => {
    if (!inpMaskStr || inpMaskStr.length !== 7 || !/^[01]{7}$/.test(inpMaskStr)) {
      return { isError: true, error: "#VALUE! Mask must be exactly 7 characters of 0s and 1s" };
    }

    if (inpMaskStr === "1111111") {
      return { isError: true, error: "#VALUE! Mask cannot contain all 1s (all rest days)" };
    }

    const d = new Date(inpTestDate);
    if (isNaN(d.getTime())) {
      return { isError: true, error: "#VALUE! Invalid test date" };
    }

    // JS day: 0=Sun, 1=Mon, ..., 6=Sat
    const jsDay = d.getUTCDay();
    // Map to mask index: Mon=0, Tue=1, ..., Sun=6
    const maskIdx = jsDay === 0 ? 6 : jsDay - 1;
    const isRest = inpMaskStr[maskIdx] === "1";

    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const activeRestDays = dayNames.filter((_, i) => inpMaskStr[i] === "1");

    return {
      isError: false,
      testedDay: dayNames[maskIdx],
      isRest,
      activeRestDays: activeRestDays.join(", ") || "None (Continuous 7-Day)"
    };
  }, [inpMaskStr, inpTestDate]);
    

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
              ⚡ Date & Calendar Engineering · Topic 23
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Global Operations · Calendar Standardization
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Configure & Standardize
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            International Weekend Definitions — Global Binary Masks & Multi-Territory Rosters
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>In modern multinational corporations, business schedules rarely follow a universal Monday-to-Friday schedule. In the Middle East (e.g. UAE, Saudi Arabia, Egypt), weekends have historically been Friday and Saturday; in Israel, Sunday is a regular workday with the weekend on Friday and Saturday; in Indian manufacturing and retail banking, only Sunday is observed as a rest day.</p><p>To support global trade, Excel provides two mechanisms in <code className="text-indigo-300 font-mono">WORKDAY.INTL</code> and <code className="text-indigo-300 font-mono">NETWORKDAYS.INTL</code>: <strong>predefined numeric codes (1 through 17)</strong> and <strong>7-character binary string masks</strong> (e.g. <code className="text-emerald-300 font-mono">"0000011"</code>). Understanding how to construct and deploy custom 7-character bitmasks gives enterprise engineers total freedom to model any workweek structure on Earth.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">Numeric Codes: 1 (Sat/Sun), 7 (Fri/Sat), 11 (Sun Only) | Binary Mask: '0000011'</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> Global Supply Chain, Offshore Delivery Hubs & International Trade</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> =NETWORKDAYS.INTL(Start, End, "0000001") (Sunday Only) | =WORKDAY.INTL(Start, Days, "0000110") (Fri/Sat)</span>
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
              Global Weekend Mask Parser
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical International Weekend Definitions Formula Signature</div>
            <div className="text-white font-bold text-base">
              [weekend] parameter = Integer_Code (1-17) OR "MTWTFSS" (7-character binary mask: 1=Rest, 0=Work)
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">Numeric Codes 1-7:</strong> Standard 2-day weekends (1: Sat/Sun, 2: Sun/Mon, 3: Mon/Tue, 4: Tue/Wed, 5: Wed/Thu, 6: Thu/Fri, 7: Fri/Sat).</div><div>• <strong className="text-sky-300">Numeric Codes 11-17:</strong> Single-day weekends (11: Sunday only, 12: Monday only, 13: Tue only, 14: Wed only, 15: Thu only, 16: Fri only, 17: Sat only).</div><div>• <strong className="text-amber-300">7-Character Binary Mask:</strong> A string where each character represents a day from Monday to Sunday. '1' represents a non-working weekend day, '0' represents a working day.</div>
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
              <span className="text-emerald-400">📊</span> Global Weekend Configuration Reference Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Master the mapping between countries, operational rosters, numeric codes, and binary bitmasks.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Territory / Sector</th>
                  <th className="py-3 px-4">Working Days</th>
                  <th className="py-3 px-4">Weekend Days</th>
                  <th className="py-3 px-4">Numeric Code</th>
                  <th className="py-3 px-4">7-Character String Mask</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">US, UK, Europe, Corporate India</td>
        <td className="py-3.5 px-4 text-white">Mon – Fri</td>
        <td className="py-3.5 px-4 text-slate-300">Saturday & Sunday</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono font-bold">1</td>
        <td className="py-3.5 px-4 text-amber-300 font-mono">"0000011"</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">Middle East (UAE, Egypt, Saudi)</td>
        <td className="py-3.5 px-4 text-white">Sun – Thu</td>
        <td className="py-3.5 px-4 text-slate-300">Friday & Saturday</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono font-bold">7</td>
        <td className="py-3.5 px-4 text-amber-300 font-mono">"0000110"</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">Israel Financial Markets</td>
        <td className="py-3.5 px-4 text-white">Sun – Thu</td>
        <td className="py-3.5 px-4 text-slate-300">Friday & Saturday</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono font-bold">7</td>
        <td className="py-3.5 px-4 text-amber-300 font-mono">"0000110"</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">Indian Manufacturing & Retail</td>
        <td className="py-3.5 px-4 text-white">Mon – Sat</td>
        <td className="py-3.5 px-4 text-slate-300">Sunday Only</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono font-bold">11</td>
        <td className="py-3.5 px-4 text-amber-300 font-mono">"0000001"</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">Bangladesh Banking Roster</td>
        <td className="py-3.5 px-4 text-white">Sat – Thu</td>
        <td className="py-3.5 px-4 text-slate-300">Friday Only</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono font-bold">16</td>
        <td className="py-3.5 px-4 text-amber-300 font-mono">"0000100"</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">European 4-Day Workweek Trial</td>
        <td className="py-3.5 px-4 text-white">Mon – Thu</td>
        <td className="py-3.5 px-4 text-slate-300">Fri, Sat & Sun</td>
        <td className="py-3.5 px-4 text-rose-400 font-mono">N/A (Mask Only)</td>
        <td className="py-3.5 px-4 text-amber-300 font-mono">"0000111"</td>
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
                The Anatomy of the 7-Character Binary String Mask
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Why the binary mask starts on Monday and why '1' means non-working.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>The most flexible feature of Excel's international date functions is the 7-character string mask. The string strictly maps positions 1 through 7 to the days of the week starting with <strong>Monday</strong>:</p><p className="font-mono text-xs bg-slate-900 p-2 rounded text-emerald-300">Pos 1: Mon | Pos 2: Tue | Pos 3: Wed | Pos 4: Thu | Pos 5: Fri | Pos 6: Sat | Pos 7: Sun</p><p>Each character must be either <code className="text-white font-mono">'0'</code> (Working Day) or <code className="text-white font-mono">'1'</code> (Non-Working Day). This is often counter-intuitive to novice analysts who assume '1' means 'working'. Remember: <strong>1 means REST (Weekend), 0 means WORK</strong>.<br/>A mask containing all zeros (<code className="text-white font-mono">"0000000"</code>) represents a 7-day workweek, while a mask with all ones (<code className="text-rose-400 font-mono">"1111111"</code>) is invalid and returns a <code className="text-rose-400 font-mono">#VALUE!</code> error.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Hardcoding Country Assumptions in Formulas
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"=NETWORKDAYS(A2, B2)"}
                </div>
                <p className="text-xs text-slate-400">
                  Hardcodes Saturday/Sunday weekends; completely invalid for Middle East, Israel, or 6-day Indian factory operations.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Dynamic Country Roster Table Lookup
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"=NETWORKDAYS.INTL(A2, B2, XLOOKUP(Country, tblRegions[Country], tblRegions[Mask]))"}
                </div>
                <p className="text-xs text-slate-400">
                  Dynamically retrieves the accurate binary mask or numeric code based on the operational territory.
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
            Binary Mask Anatomy: Pos 1 (Mon) to Pos 7 (Sun), where 1 marks non-working weekend rest days.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 180" className="w-full max-w-4xl h-auto font-sans">
        <g transform="translate(30, 30)">
          <rect x="0" y="0" width="100" height="90" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
          <text x="50" y="35" textAnchor="middle" fill="#94A3B8" className="text-xs font-mono">Mon (Pos 1)</text>
          <text x="50" y="70" textAnchor="middle" fill="#10B981" className="text-2xl font-bold font-mono">0</text>
        </g>
        <g transform="translate(140, 30)">
          <rect x="0" y="0" width="100" height="90" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
          <text x="50" y="35" textAnchor="middle" fill="#94A3B8" className="text-xs font-mono">Tue (Pos 2)</text>
          <text x="50" y="70" textAnchor="middle" fill="#10B981" className="text-2xl font-bold font-mono">0</text>
        </g>
        <g transform="translate(250, 30)">
          <rect x="0" y="0" width="100" height="90" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
          <text x="50" y="35" textAnchor="middle" fill="#94A3B8" className="text-xs font-mono">Wed (Pos 3)</text>
          <text x="50" y="70" textAnchor="middle" fill="#10B981" className="text-2xl font-bold font-mono">0</text>
        </g>
        <g transform="translate(360, 30)">
          <rect x="0" y="0" width="100" height="90" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
          <text x="50" y="35" textAnchor="middle" fill="#94A3B8" className="text-xs font-mono">Thu (Pos 4)</text>
          <text x="50" y="70" textAnchor="middle" fill="#10B981" className="text-2xl font-bold font-mono">0</text>
        </g>
        <g transform="translate(470, 30)">
          <rect x="0" y="0" width="100" height="90" rx="8" fill="#881337" stroke="#F43F5E" strokeWidth="2" />
          <text x="50" y="35" textAnchor="middle" fill="#FECDD3" className="text-xs font-mono">Fri (Pos 5)</text>
          <text x="50" y="70" textAnchor="middle" fill="#F43F5E" className="text-2xl font-bold font-mono">1</text>
        </g>
        <g transform="translate(580, 30)">
          <rect x="0" y="0" width="100" height="90" rx="8" fill="#881337" stroke="#F43F5E" strokeWidth="2" />
          <text x="50" y="35" textAnchor="middle" fill="#FECDD3" className="text-xs font-mono">Sat (Pos 6)</text>
          <text x="50" y="70" textAnchor="middle" fill="#F43F5E" className="text-2xl font-bold font-mono">1</text>
        </g>
        <g transform="translate(690, 30)">
          <rect x="0" y="0" width="100" height="90" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
          <text x="50" y="35" textAnchor="middle" fill="#94A3B8" className="text-xs font-mono">Sun (Pos 7)</text>
          <text x="50" y="70" textAnchor="middle" fill="#10B981" className="text-2xl font-bold font-mono">0</text>
        </g>
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
                Explore real International Weekend Definitions formula calculations, live audits, and calculated outputs in the embedded worksheet.
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
            sheetName="Topic23"
            title="Topic 23: International Weekend Definitions Master Practice Grid"
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
                  Scenario 1: Middle East SLA
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata Offshore Banking Hub</span>
              </div>
              <h3 className="text-base font-bold text-white">Offshore IT Helpdesk SLA for Dubai Banking Clients</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"A Kolkata TCS development centre supports a major Dubai retail bank. The Dubai bank operates Sunday through Thursday; Friday and Saturday are client weekends."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Calculate milestone skipping Friday and Saturday</div>
                <div className="text-emerald-300 font-bold">{"=WORKDAY.INTL(TicketLoggedDate, 2, 7, tblDubaiHolidays[Date])"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Ticket Logged Thursday 12-Nov → Next Business Day Milestone: Sunday 15-Nov"}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: 4-Day Roster
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Barrackpore Software Lab</span>
              </div>
              <h3 className="text-base font-bold text-white">Modeling a 4-Day Workweek Agile Sprint Schedule</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"A tech startup in Barrackpore institutes a 4-day workweek where employees work Monday through Thursday; Friday, Saturday, and Sunday are non-working days."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Sprint engine with 3-day weekend mask '0000111'</div>
                <div className="text-emerald-300 font-bold">{"=WORKDAY.INTL(SprintStart, 8, \"0000111\", tblHolidays[Date])"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Sprint Start: Mon 02-Nov → 8 Business Days → Sprint Review: Thu 12-Nov"}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: Multi-Country ERP
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Titagarh Global Supply Chain</span>
              </div>
              <h3 className="text-base font-bold text-white">Dynamic Multi-Country Supply Chain Transit Calculator</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"An export manager in Titagarh ships components from India (Sunday weekend) to Egypt (Friday/Saturday weekend). The transit time formula must respect origin vs destination working days."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Retrieve destination country weekend mask dynamically</div>
                <div className="text-emerald-300 font-bold">{"=NETWORKDAYS.INTL(ShipDate, DeliveryDate, XLOOKUP(Country, tblRosters[Territory], tblRosters[Mask]))"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Calculates transit business days dynamically based on the receiving country's weekend mask."}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: Friday Rest
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Dhaka & Kolkata Banking Corridor</span>
              </div>
              <h3 className="text-base font-bold text-white">Retail Banking Cash Replenishment in Bangladesh</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"ATM cash logistics in Dhaka operate on a Saturday through Thursday schedule, where Friday is the statutory sole weekly banking holiday."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Numeric code 16 isolates Friday as sole weekly rest day</div>
                <div className="text-emerald-300 font-bold">{"=WORKDAY.INTL(CashOrderDate, 1, 16, tblDhakaHolidays[Date])"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Order Placed: Thursday → Cash Replenishment Milestone: Saturday morning (Skips Friday)"}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: Treasury Swap
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata Institutional Treasury</span>
              </div>
              <h3 className="text-base font-bold text-white">Auditing Cross-Border Financial Swap Accruals</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Treasury analysts in Kolkata audit interest rate swap payments between Indian institutions (Sunday-only holiday) and London counterparties (Sat/Sun weekend)."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Compare workdays under UK vs India weekend masks</div>
                <div className="text-emerald-300 font-bold">{"=NETWORKDAYS.INTL(A2, B2, \"0000011\") & \" UK Days vs \" & NETWORKDAYS.INTL(A2, B2, \"0000001\") & \" IN Days\""}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Result: '21 UK Days vs 25 IN Days'"}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: Shift Roster
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Naihati Telecom Operations</span>
              </div>
              <h3 className="text-base font-bold text-white">Nightshift Rotating Half-Weekend Workstation Tracking</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Naihati telecom network operations center assigns specialized rosters where technicians take Tuesdays and Wednesdays off."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Mask '0110000' flags Tuesday and Wednesday as rest days</div>
                <div className="text-emerald-300 font-bold">{"=NETWORKDAYS.INTL(StartDate, EndDate, \"0110000\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Computes active shifts for teams taking Tuesday and Wednesday rest breaks."}
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
              <span className="text-indigo-400 font-bold">Step 1: Identify Target Country Operational Schedule</span>
              <p>{"Consult the corporate HR or supply chain roster to determine which days of the week are designated as rest days."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Example: Egypt = Friday & Saturday rest days"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 2: Choose Numeric Code or Construct 7-Character Mask</span>
              <p>{"If the pattern matches a standard numeric code (e.g. 7 for Fri/Sat), use the integer. For non-standard schedules (e.g. 4-day workweek), construct the 7-character bitmask."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Numeric: 7 | Mask: \"0000110\""}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Verify Mask Positions (Monday through Sunday)</span>
              <p>{"Ensure that '1' represents non-working rest days and '0' represents working business days. Confirm the string is enclosed in double quotes."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"\"0000110\" (Mon-Thu: 0, Fri-Sat: 1, Sun: 0)"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 4: Integrate with WORKDAY.INTL or NETWORKDAYS.INTL</span>
              <p>{"Pass the mask or code as the 3rd argument in your project milestone or capacity formula."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=WORKDAY.INTL(A2, 5, \"0000110\", tblHolidays[Date])"}</div>
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
                  <td className="py-3 px-4 font-sans">{"Excel expects strictly seven characters consisting exclusively of '0' and '1'."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Passing a mask string with lowercase letters or spaces: \"0000 11\""}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Remove all whitespace and ensure exactly 7 binary digits: '0000011'."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#NUM!"}</td>
                  <td className="py-3 px-4 font-sans">{"Codes 8, 9, and 10 are undefined in Excel's internal lookup table."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Passing a numeric code outside the valid range 1-7 or 11-17 (e.g. passing code 8, 9, or 10)."}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Use only 1-7 (2-day weekends) or 11-17 (1-day weekends), or switch to the 7-character string mask."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"All Workdays Disappear (Result = 0)"}</td>
                  <td className="py-3 px-4 font-sans">{"Marking all 7 days as non-working leaves 0 operational days in the calendar."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Passing a mask of all ones: \"1111111\""}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Ensure at least one day in the 7-day week is marked as '0' (active working day)."}</td>
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
              <span className="text-indigo-400 font-bold">Always Quote String Masks</span>
              <p className="text-slate-300">{"Always wrap string masks in quotes inside the formula (=\"0000011\"). If you omit quotes (=0000011), Excel parses it as a numeric literal (11), which changes the behavior to code 11 (Sunday-only weekend)!"}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">Prefix with Apostrophe in Cells</span>
              <p className="text-slate-300">{"Store the 7-character mask as text in your regional lookup tables. Prefix the cell with an apostrophe ('0000110) in Excel so Excel does not strip the leading zeros."}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">Uniform Syntax Across Functions</span>
              <p className="text-slate-300">{"The 7-character mask works identically in WORKDAY.INTL and NETWORKDAYS.INTL. Master the mask once, and you can solve both milestone projections and duration calculations for any global territory."}</p>
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
              • <strong>Code Gap:</strong> {"Why do numeric codes jump from 7 directly to 11, skipping 8, 9, and 10?"}
            </p>

            <p key="1">
              • <strong>ISO Standard:</strong> {"Why does the binary string mask begin on Monday instead of Sunday?"}
            </p>

            <p key="2">
              • <strong>Compound Exclusions:</strong> {"Can you pass an array constant of holidays together with a binary weekend mask in WORKDAY.INTL?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 23: International Weekend Definitions Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="International Weekend Definitions Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"In global commerce, assuming that everyone rests on Saturday and Sunday is an expensive mistake. When you build models for multinational firms in Kolkata, London, and Dubai, your mastery of 7-character binary masks will establish you as an elite spreadsheet architect."}
          />
        </div>
      </div>
    </div>
  );
}
