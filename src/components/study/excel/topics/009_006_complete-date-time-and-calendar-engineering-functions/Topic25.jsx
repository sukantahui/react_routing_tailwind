"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic25_files/topic25_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic25() {
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

  const [inpStartTs, setInpStartTs] = useState("2026-11-13 16:30"); // Friday 4:30 PM
  const [inpEndTs, setInpEndTs] = useState("2026-11-16 11:00"); // Monday 11:00 AM
  const [inpShiftStart, setInpShiftStart] = useState("09:00");
  const [inpShiftEnd, setInpShiftEnd] = useState("18:00");

  const slaResult = useMemo(() => {
    const s = new Date(inpStartTs.replace(" ", "T") + ":00Z");
    const e = new Date(inpEndTs.replace(" ", "T") + ":00Z");

    if (isNaN(s.getTime()) || isNaN(e.getTime()) || e < s) {
      return { isError: true, error: "#VALUE! Enter valid chronological timestamps" };
    }

    const rawDiffHours = (e.getTime() - s.getTime()) / (1000 * 3600);

    const parseHhMm = (str) => {
      const parts = str.split(":").map(Number);
      return parts[0] + parts[1] / 60;
    };

    const shiftOpen = parseHhMm(inpShiftStart);
    const shiftClose = parseHhMm(inpShiftEnd);
    const dailyShiftHours = Math.max(0, shiftClose - shiftOpen);

    // Business hours simulator
    let businessHours = 0;
    const cur = new Date(s);

    // Step minute-by-minute or discrete blocks for accuracy
    const curEnd = new Date(e);

    // For simulation, let's step hour by hour
    let stepMs = 60000; // 1 minute
    let totalBusinessMinutes = 0;

    let probe = new Date(s.getTime());
    while (probe < curEnd) {
      const dayOfWeek = probe.getUTCDay(); // 0=Sun, 6=Sat
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        const h = probe.getUTCHours() + probe.getUTCMinutes() / 60;
        if (h >= shiftOpen && h < shiftClose) {
          totalBusinessMinutes += 1;
        }
      }
      probe = new Date(probe.getTime() + stepMs);
    }

    const calculatedBizHours = totalBusinessMinutes / 60;

    return {
      isError: false,
      rawElapsedHours: rawDiffHours.toFixed(2),
      bizHours: calculatedBizHours.toFixed(2),
      dailyShift: dailyShiftHours.toFixed(1)
    };
  }, [inpStartTs, inpEndTs, inpShiftStart, inpShiftEnd]);
    

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
              ⚡ Date & Calendar Engineering · Topic 25
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Enterprise Service Operations · SLA Analytics
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Engineer & Optimize
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            SLA & Working-Hour Calculations — Shift-Adjusted Resolution & Multi-Day Business Hours
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>In modern enterprise IT operations, customer service helpdesks, and shared service centers (e.g. TCS, Wipro, Infosys), contractual Service Level Agreements (SLAs) are defined strictly in terms of <strong>Business Operational Hours</strong> (e.g. Monday to Friday, 09:00 AM to 06:00 PM), rather than raw wall-clock time.</p><p>If a P1 critical incident is logged on Friday at 5:30 PM and resolved on Monday at 10:00 AM, raw subtraction (<code className="text-rose-400 font-mono">=B2 - A2</code>) indicates <strong>64.5 total elapsed hours</strong> — an apparent massive SLA breach! However, measured strictly within contractual business hours (9:00 AM to 6:00 PM), the actual elapsed operational time is only <strong>1.5 business hours</strong> (30 minutes on Friday + 60 minutes on Monday). Engineering this calculation requires decomposing multi-day spans into full intermediate business days, boundary opening fractions, and closing fractions.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">{"Business Hours = (NETWORKDAYS.INTL(...) - 2) * ShiftHours + StartDayHours + EndDayHours"}</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> {"ITSM Incident Management, Tier-1 Helpdesks & Operational Quality Control"}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> {"=BusinessHoursBetween(LoggedTimestamp, ResolvedTimestamp, 9:00, 18:00, tblHolidays[Date])"}</span>
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
              Shift-Bounded Fractional Business Hour Engine
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical SLA and Working-Hour Calculations Formula Signature</div>
            <div className="text-white font-bold text-base">
              {"Business_Hours = IF(SameDay, (MIN(End, ShiftEnd) - MAX(Start, ShiftStart))*24, MultiDayFormula)"}
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">Shift Window Boundaries:</strong> Daily operational start time (e.g. 09:00 / 0.375) and closing time (e.g. 18:00 / 0.750).</div><div>• <strong className="text-sky-300">Full Intermediate Workdays:</strong> Whole business days between the start and end dates evaluated via NETWORKDAYS.INTL(Start+1, End-1).</div><div>• <strong className="text-amber-300">Boundary Clamping:</strong> Tickets logged before 09:00 AM are clamped to 09:00; tickets logged after 18:00 PM roll to the next morning's shift start.</div>
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
              <span className="text-emerald-400">📊</span> SLA Resolution Breakdown Matrix (09:00 to 18:00 Shift, Mon-Fri)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Observe the dramatic variance between raw wall-clock elapsed time and true contractual business SLA hours.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Incident #</th>
                  <th className="py-3 px-4">Logged Timestamp</th>
                  <th className="py-3 px-4">Resolved Timestamp</th>
                  <th className="py-3 px-4">Wall-Clock Elapsed</th>
                  <th className="py-3 px-4">Business SLA Hours</th>
                  <th className="py-3 px-4">Contractual SLA Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">INC-3001</td>
        <td className="py-3.5 px-4 text-white font-mono">12-Nov-2026 10:00</td>
        <td className="py-3.5 px-4 text-white font-mono">12-Nov-2026 14:30</td>
        <td className="py-3.5 px-4 text-slate-300">4.50 Hours</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold font-mono">4.50 Hours</td>
        <td className="py-3.5 px-4 text-emerald-400">Within 8h SLA</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">INC-3002</td>
        <td className="py-3.5 px-4 text-white font-mono">12-Nov-2026 16:30</td>
        <td className="py-3.5 px-4 text-white font-mono">13-Nov-2026 11:00</td>
        <td className="py-3.5 px-4 text-slate-300">18.50 Hours</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold font-mono">3.50 Hours</td>
        <td className="py-3.5 px-4 text-emerald-400">Within 4h SLA (1.5h Thu + 2h Fri)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">INC-3003</td>
        <td className="py-3.5 px-4 text-white font-mono">13-Nov-2026 17:30 (Fri)</td>
        <td className="py-3.5 px-4 text-white font-mono">16-Nov-2026 10:00 (Mon)</td>
        <td className="py-3.5 px-4 text-rose-400 font-bold">64.50 Hours</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold font-mono">1.50 Hours</td>
        <td className="py-3.5 px-4 text-emerald-400">Within 2h SLA (Skips Weekend)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">INC-3004</td>
        <td className="py-3.5 px-4 text-white font-mono">14-Nov-2026 14:00 (Sat)</td>
        <td className="py-3.5 px-4 text-white font-mono">16-Nov-2026 12:00 (Mon)</td>
        <td className="py-3.5 px-4 text-slate-300">46.00 Hours</td>
        <td className="py-3.5 px-4 text-emerald-300 font-bold font-mono">3.00 Hours</td>
        <td className="py-3.5 px-4 text-emerald-400">Clamped to Mon 09:00 Start</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">INC-3005</td>
        <td className="py-3.5 px-4 text-white font-mono">12-Nov-2026 09:30</td>
        <td className="py-3.5 px-4 text-white font-mono">17-Nov-2026 17:00</td>
        <td className="py-3.5 px-4 text-rose-400 font-bold">127.50 Hours</td>
        <td className="py-3.5 px-4 text-rose-300 font-bold font-mono">33.50 Hours</td>
        <td className="py-3.5 px-4 text-rose-400 font-bold">SLA BREACH (Exceeded 24h Cap)</td>
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
                The Canonical 3-Tier Multi-Day Business Hour Formula
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                How to engineer a robust formula that works across same-day, overnight, and multi-week spans.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>To calculate true business hours across multiple calendar days without VBA macros, senior financial engineers divide the timeline into three distinct mathematical tiers:</p>
    <ol className="list-decimal list-inside space-y-1.5 font-mono text-xs text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
      <li><strong>Tier 1 (Intermediate Full Days):</strong> <code className="text-emerald-300 font-bold">MAX(0, NETWORKDAYS.INTL(INT(Start)+1, INT(End)-1, 1, tblHolidays[Date])) * 9.0</code></li>
      <li><strong>Tier 2 (Logged Day Remaining Shift):</strong> <code className="text-sky-300 font-bold">IF(NETWORKDAYS.INTL(INT(Start), INT(Start), 1, tblHolidays[Date]), MAX(0, 18/24 - MAX(MOD(Start, 1), 9/24)) * 24, 0)</code></li>
      <li><strong>Tier 3 (Resolved Day Elapsed Shift):</strong> <code className="text-amber-300 font-bold">IF(NETWORKDAYS.INTL(INT(End), INT(End), 1, tblHolidays[Date]), MAX(0, MIN(MOD(End, 1), 18/24) - 9/24) * 24, 0)</code></li>
    </ol>
    <p>Summing these three tiers handles overnight tickets, weekend rollovers, and holiday closures with absolute precision. For same-day tickets, a simple outer <code className="text-emerald-300 font-mono">IF(INT(Start)=INT(End), ...)</code> evaluates the span directly.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Naive 24-Hour Continuous Subtraction
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"=(ResolvedTimestamp - LoggedTimestamp) * 24"}
                </div>
                <p className="text-xs text-slate-400">
                  {"Falsely charges 15 overnight non-working hours and 48 weekend hours against the service team's SLA budget."}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Shift-Adjusted Multi-Tier SLA Formula
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"=SameDayCheck + FullWorkdays*9 + Day1Hours + Day2Hours"}
                </div>
                <p className="text-xs text-slate-400">
                  {"Clamps to 09:00-18:00 operational window and excludes weekends and holidays natively."}
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
            SLA Calculation Anatomy: Slicing multi-day intervals into business day shifts while discarding nights and weekends.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="40" width="220" height="110" rx="10" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
        <text x="140" y="70" textAnchor="middle" fill="#38BDF8" className="text-xs font-bold font-mono">FRIDAY (Logged Day)</text>
        <text x="140" y="95" textAnchor="middle" fill="#FFFFFF" className="text-sm">Logged: 16:30 (4:30 PM)</text>
        <text x="140" y="125" textAnchor="middle" fill="#10B981" className="text-xs font-bold font-mono">+1.5 Business Hours</text>

        <rect x="270" y="40" width="260" height="110" rx="10" fill="#881337" stroke="#F43F5E" strokeWidth="2" />
        <text x="400" y="70" textAnchor="middle" fill="#FECDD3" className="text-xs font-bold font-mono">SATURDAY & SUNDAY</text>
        <text x="400" y="95" textAnchor="middle" fill="#F43F5E" className="text-base font-bold font-mono">NON-WORKING (DISCARDED)</text>
        <text x="400" y="125" textAnchor="middle" fill="#FDA4AF" className="text-xs font-mono">0.0 Business Hours Counted</text>

        <rect x="550" y="40" width="260" height="110" rx="10" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
        <text x="680" y="70" textAnchor="middle" fill="#38BDF8" className="text-xs font-bold font-mono">MONDAY (Resolved Day)</text>
        <text x="680" y="95" textAnchor="middle" fill="#FFFFFF" className="text-sm">Resolved: 11:00 AM</text>
        <text x="680" y="125" textAnchor="middle" fill="#10B981" className="text-xs font-bold font-mono">+2.0 Business Hours</text>
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
                Explore real SLA and Working-Hour Calculations formula calculations, live audits, and calculated outputs in the embedded worksheet.
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
            sheetName="Topic25"
            title="Topic 25: SLA and Working-Hour Calculations Master Practice Grid"
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
                  Scenario 1: ITSM Incident Management
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata Enterprise IT Desk</span>
              </div>
              <h3 className="text-base font-bold text-white">Tier-1 Helpdesk Weekend Rollover Resolution Audit</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"A severity-2 software ticket is logged on Friday at 17:00 (5:00 PM) and marked resolved on Monday at 10:30 AM. Helpdesk engineers must demonstrate they resolved it in under 2.5 business hours."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Decompose interval into Friday fraction and Monday fraction</div>
                <div className="text-emerald-300 font-bold">{"=((18/24 - 17/24) + (10.5/24 - 9/24)) * 24"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"1.0h (Friday) + 1.5h (Monday) = 2.5 Business Hours (Met 4h SLA Target)"}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: Out-of-Hours Logging
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Barrackpore Data Operations</span>
              </div>
              <h3 className="text-base font-bold text-white">Clamping Midnight Tickets to Next Morning Shift Start</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"A database alert fires at 02:30 AM on a Tuesday. The helpdesk shift starts at 09:00 AM. Contractual SLAs stipulate that out-of-hours alerts start counting at the opening bell."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Clamp logged time to 09:00 AM shift start</div>
                <div className="text-emerald-300 font-bold">{"=MAX(MOD(LoggedTimestamp, 1), 9/24)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Ticket at 02:30 AM is adjusted to 09:00 AM; zero penalty charged for overnight hours."}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: Priority Tier Escalation
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Shyamnagar Dispatch Desk</span>
              </div>
              <h3 className="text-base font-bold text-white">P1 Incident Breach Warning Based on Working Hours</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Priority 1 incidents must be resolved within 4 contractual business hours. A dashboard column alerts supervisors when business hours exceed the 4.0 threshold."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Flag breach if calculated business hours exceed threshold</div>
                <div className="text-emerald-300 font-bold">{"=IF(CalculatedBusinessHours > 4.0, \"BREACH ESCALATION\", \"COMPLIANT\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"3.75 Business Hours → 'COMPLIANT'"}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: Multi-Week Project Tasks
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Titagarh Wagon Division</span>
              </div>
              <h3 className="text-base font-bold text-white">Multi-Week Engineering Review Cycle Tracking</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"A structural design revision submitted on 02-Nov is approved on 16-Nov. Management measures exact working hours expended across the 10 business days."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Scale intermediate working days by 8h shift plus endpoints</div>
                <div className="text-emerald-300 font-bold">{"=(NETWORKDAYS.INTL(Start, End, 1, tblHolidays[Date]) - 1) * 8"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"80.0 Total Working Engineering Hours"}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: Half-Day Saturday Shift
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Naihati Assembly Plant</span>
              </div>
              <h3 className="text-base font-bold text-white">SLA Calculation with 4-Hour Saturday Half-Day Shifts</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"A factory operates Monday to Friday (8 hours) and Saturday (4 hours). Schedulers compute net SLA resolution time across partial shifts."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Combine Mon-Fri 8h days with Saturday 4h days</div>
                <div className="text-emerald-300 font-bold">{"=NETWORKDAYS.INTL(Start, End, \"0000011\") * 8 + NETWORKDAYS.INTL(Start, End, \"1111101\") * 4"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Calculates mixed shift capacity across full weekdays and half Saturdays."}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: Vendor Penalty Audit
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Ichapur Procurement Division</span>
              </div>
              <h3 className="text-base font-bold text-white">Auditing Cloud Vendor Uptime and SLA Credits</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Cloud infrastructure contract mandates 99.9% uptime during business hours (08:00 to 20:00). Analysts calculate downtime minutes falling strictly within the contractual window."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Filter cloud downtime intervals to business window</div>
                <div className="text-emerald-300 font-bold">{"=MAX(0, MIN(DownEnd, 20/24) - MAX(DownStart, 8/24)) * 1440"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Yields exact billable outage minutes for service credit clawbacks."}
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
              <span className="text-indigo-400 font-bold">Define Contractual Shift Boundaries</span>
              <p>{undefined}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"ShiftStart = 9/24, ShiftEnd = 18/24, ShiftHours = 9"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Check for Same-Day Incident Resolution</span>
              <p>{undefined}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=IF(INT(A2)=INT(B2), (MIN(MOD(B2,1),18/24) - MAX(MOD(A2,1),9/24))*24, ...)"}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Calculate Intermediate Full Workdays</span>
              <p>{undefined}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=MAX(0, NETWORKDAYS.INTL(INT(A2)+1, INT(B2)-1, 1, tblHolidays[Date])) * 9"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Add Opening and Closing Day Fractional Hours</span>
              <p>{undefined}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=FullDayHours + FirstDayHours + LastDayHours"}</div>
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
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Negative SLA Hours"}</td>
                  <td className="py-3 px-4 font-sans">{"Ticket logged after shift close (e.g. 19:30) causing ShiftEnd - LoggedTime to evaluate negative."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"MAX(0, 18/24 - MOD(A2,1)) without lower boundary clamping"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Wrap with MAX(0, ...): =MAX(0, 18/24 - MAX(MOD(A2, 1), 9/24))."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Weekend Double-Counting"}</td>
                  <td className="py-3 px-4 font-sans">{"Adding Friday closing hours when the ticket was actually logged on Saturday."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Ticket logged on weekend"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Wrap opening day calculation with IF(NETWORKDAYS.INTL(INT(Start), INT(Start)) > 0, ...)."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#VALUE! on Timestamp"}</td>
                  <td className="py-3 px-4 font-sans">{"Timestamp contains text characters or irregular 12-hour AM/PM formatting."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=A2 - B2 returns #VALUE!"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Sanitize timestamp string using DATEVALUE() and TIMEVALUE() or Text to Columns."}</td>
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
              <span className="text-indigo-400 font-bold">Modular Formula Structuring</span>
              <p className="text-slate-300">{"Rather than jamming an unreadable 400-character formula into a single cell, use Excel's LET() function: =LET(s, A2, e, B2, sameDay, INT(s)=INT(e), ...). This makes SLA auditing readable and maintainable."}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">Fractional Day Conversion Multiplier</span>
              <p className="text-slate-300">{"Always remember: 1 hour in Excel is 1/24. To convert an Excel serial difference into decimal hours, multiply by 24. To convert to minutes, multiply by 1440. To convert to seconds, multiply by 86400."}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">Automated SLA Conditional Formatting</span>
              <p className="text-slate-300">{"Highlight breached tickets in soft red by applying a conditional formatting rule: =CalculatedBizHours > VLOOKUP(Priority, tblSLAs, 2, FALSE)."}</p>
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
              • <strong>Contract Logic:</strong> {"Why do enterprise IT contracts universally base SLAs on business hours rather than raw calendar hours?"}
            </p>

            <p key="1">
              • <strong>Boundary Clamping:</strong> {"How does the formula handle tickets logged on a Sunday afternoon when the office is closed?"}
            </p>

            <p key="2">
              • <strong>Overnight Shifts:</strong> {"How would the mathematical model change if the operating shift spanned midnight (e.g. 10:00 PM to 06:00 AM graveyard shift)?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 25: SLA and Working-Hour Calculations Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="SLA and Working-Hour Calculations Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"In enterprise services, calculating elapsed time with simple subtraction =B2-A2 is the amateur's hallmark. Customers do not pay for weekend hours, and engineers do not work at 3:00 AM. Decompose your time intervals into shift windows, master boundary clamping with MIN and MAX, and you will build bulletproof SLA governance engines."}
          />
        </div>
      </div>
    </div>
  );
}
