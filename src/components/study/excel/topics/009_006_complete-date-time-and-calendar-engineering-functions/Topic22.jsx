"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic22_files/topic22_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic22() {
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

  const [inpCalDays, setInpCalDays] = useState(30);
  const [inpWkPattern, setInpWkPattern] = useState("11"); // 11 = Sunday only
  const [inpHolidayDeductions, setInpHolidayDeductions] = useState(1);
  const [inpDailyHours, setInpDailyHours] = useState(8);

  const capacityOutput = useMemo(() => {
    const totalDays = parseInt(inpCalDays, 10);
    const holCount = parseInt(inpHolidayDeductions, 10);
    const hrsPerDay = parseFloat(inpDailyHours);

    if (isNaN(totalDays) || isNaN(holCount) || isNaN(hrsPerDay)) {
      return { isError: true, error: "#VALUE! Enter valid numeric parameters" };
    }

    // Estimate weekends based on pattern
    let weekendDaysPerMonth = 4; // standard Sundays
    if (inpWkPattern === "1") weekendDaysPerMonth = 8; // Sat & Sun
    if (inpWkPattern === "0") weekendDaysPerMonth = 0; // 24/7 continuous

    const netWorkdays = Math.max(0, totalDays - weekendDaysPerMonth - holCount);
    const grossHours = netWorkdays * hrsPerDay;
    const capacity85 = grossHours * 0.85;

    return {
      isError: false,
      netWorkdays,
      grossHours,
      capacity85: capacity85.toFixed(1)
    };
  }, [inpCalDays, inpWkPattern, inpHolidayDeductions, inpDailyHours]);
    

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
              ⚡ Date & Calendar Engineering · Topic 22
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Industrial Engineering · Operations Modeling
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Synthesize & Model
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            Business Calendar Engineering — Production Capacity & Plant Operating Schedules
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>Real-world industrial production, financial clearing, and workforce scheduling do not operate on uninterrupted 365-day Gregorian timelines. Factories close for maintenance, banks close for statutory clearing holidays, and multi-shift operations run on non-standard weekly rosters.</p><p><strong>Business Calendar Engineering</strong> is the discipline of constructing robust, dynamic calendar models in Excel that compute available operational working hours, net productive days, and plant capacity. By combining <code className="text-indigo-300 font-mono">NETWORKDAYS.INTL()</code>, custom weekend bitmasks, dynamic holiday repositories, and shift capacity multipliers, engineers in manufacturing hubs like Barrackpore, Shyamnagar, and Titagarh calculate precise plant throughput and delivery commitments.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">Net Working Capacity = NETWORKDAYS.INTL(Start, End, Mask, Holidays) * DailyHours</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> Factory Production Planning, Plant Maintenance & Workforce Capacity</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> =NETWORKDAYS.INTL(A2, B2, 11, tblHolidays[Date]) * ShiftHoursPerDay</span>
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
              Operations Calendar Simulation Engine
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical Business Calendar Engineering Formula Signature</div>
            <div className="text-white font-bold text-base">
              Available_Capacity_Hours = NETWORKDAYS.INTL(PeriodStart, PeriodEnd, WeekendCode, HolidayList) * DailyOperatingHours * MachineEfficiency
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">Working Days Count:</strong> Net active business days evaluated using customizable weekend parameters and statutory closures.</div><div>• <strong className="text-sky-300">Shift Configuration:</strong> Hours per active shift (e.g., 8h single shift vs 16h double shift vs 24h continuous operation).</div><div>• <strong className="text-amber-300">Capacity Utilization Index:</strong> Efficiency derating factor (e.g., 85% OEE - Overall Equipment Effectiveness) applied to theoretical work hours.</div>
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
              <span className="text-emerald-400">📊</span> Industrial Work Schedule Capacity Comparison Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Observe monthly operational hours across different plant operational models for November 2026 (30 calendar days).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Operating Model</th>
                  <th className="py-3 px-4">Weekly Schedule</th>
                  <th className="py-3 px-4">Weekend Rule</th>
                  <th className="py-3 px-4">Net Working Days</th>
                  <th className="py-3 px-4">Available Monthly Hours (100% OEE)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">Standard Corporate IT</td>
        <td className="py-3.5 px-4 text-white">5 Days (Mon-Fri)</td>
        <td className="py-3.5 px-4 text-slate-300">Sat & Sun (Code 1)</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">21 Days</td>
        <td className="py-3.5 px-4 text-amber-300 font-mono">168 Hours (21 * 8h)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">Indian Manufacturing (6-Day)</td>
        <td className="py-3.5 px-4 text-white">6 Days (Mon-Sat)</td>
        <td className="py-3.5 px-4 text-slate-300">Sunday Only (Code 11)</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">25 Days</td>
        <td className="py-3.5 px-4 text-amber-300 font-mono">200 Hours (25 * 8h)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">2-Shift Plant Operations</td>
        <td className="py-3.5 px-4 text-white">6 Days (Mon-Sat)</td>
        <td className="py-3.5 px-4 text-slate-300">Sunday Only (Code 11)</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">25 Days</td>
        <td className="py-3.5 px-4 text-amber-300 font-mono">400 Hours (25 * 16h)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">Middle East Export Line</td>
        <td className="py-3.5 px-4 text-white">5 Days (Sun-Thu)</td>
        <td className="py-3.5 px-4 text-slate-300">Fri & Sat (Code 7)</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">21 Days</td>
        <td className="py-3.5 px-4 text-amber-300 font-mono">168 Hours (21 * 8h)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold">Continuous 24/7 Heavy Jute/Steel</td>
        <td className="py-3.5 px-4 text-white">7 Days Continuous</td>
        <td className="py-3.5 px-4 text-slate-300">No Weekend (Mask "0000000")</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">30 Days</td>
        <td className="py-3.5 px-4 text-amber-300 font-mono">720 Hours (30 * 24h)</td>
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
                Preventing Double-Counting When Holidays Fall on Weekends
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Why simple formula subtractions (=TotalDays - Weekends - Holidays) corrupt production models.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>A widespread error in operational capacity spreadsheets is writing manual deduction formulas such as <code className="text-rose-400 font-mono">=TotalDays - WeekendCount - HolidayCount</code>.</p><p>Consider a national holiday like Independence Day (August 15, 2026), which falls on a <strong>Saturday</strong>. If you independently count weekends (e.g. 8 weekend days in the month) and independently count official holidays (e.g. 3 holidays in the month), August 15 is deducted <strong>twice</strong>! This creates phantom production deficits and corrupts resource capacity planning.</p><p>The <code className="text-emerald-300 font-mono">NETWORKDAYS.INTL()</code> engine handles this intersection natively: if a holiday date coincides with an existing scheduled weekend day, the holiday is counted only once, guaranteeing 100% mathematically sound capacity tallies.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Naive Arithmetic Deductions
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"=(End - Start + 1) - WeekendDays - HolidayCount"}
                </div>
                <p className="text-xs text-slate-400">
                  Double-counts holidays falling on weekend days, resulting in under-reported plant operating hours.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Production NETWORKDAYS.INTL Architecture
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"=NETWORKDAYS.INTL(Start, End, WeekendCode, tblHolidays[Date]) * ShiftHours"}
                </div>
                <p className="text-xs text-slate-400">
                  Automatically handles overlapping holiday-weekend intersections with total mathematical precision.
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
            Operational Calendar Pipeline: Filtering calendar days through weekend masks and holiday schedules to calculate true factory capacity.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="50" width="160" height="90" rx="10" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
        <text x="110" y="80" textAnchor="middle" fill="#FFFFFF" className="text-xs font-bold">Total Month Days</text>
        <text x="110" y="105" textAnchor="middle" fill="#38BDF8" className="text-xl font-bold font-mono">30 Days</text>
        <text x="110" y="125" textAnchor="middle" fill="#94A3B8" className="text-[10px]">November 2026</text>

        <path d="M 195 95 L 225 95" stroke="#64748B" strokeWidth="2" />

        <rect x="230" y="50" width="160" height="90" rx="10" fill="#881337" stroke="#F43F5E" strokeWidth="2" />
        <text x="310" y="80" textAnchor="middle" fill="#FECDD3" className="text-xs font-bold">Sunday Rest Days</text>
        <text x="310" y="105" textAnchor="middle" fill="#F43F5E" className="text-xl font-bold font-mono">-5 Days</text>
        <text x="310" y="125" textAnchor="middle" fill="#FDA4AF" className="text-[10px]">Code 11 (Sun Only)</text>

        <path d="M 395 95 L 425 95" stroke="#64748B" strokeWidth="2" />

        <rect x="430" y="50" width="160" height="90" rx="10" fill="#78350F" stroke="#F59E0B" strokeWidth="2" />
        <text x="510" y="80" textAnchor="middle" fill="#FEF08A" className="text-xs font-bold">Statutory Holidays</text>
        <text x="510" y="105" textAnchor="middle" fill="#F59E0B" className="text-xl font-bold font-mono">-1 Day</text>
        <text x="510" y="125" textAnchor="middle" fill="#FDE68A" className="text-[10px]">Nov 18 Plant Holiday</text>

        <path d="M 595 95 L 625 95" stroke="#10B981" strokeWidth="2" />

        <rect x="630" y="45" width="180" height="100" rx="12" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
        <text x="720" y="75" textAnchor="middle" fill="#FFFFFF" className="text-xs font-bold">Net Active Workdays</text>
        <text x="720" y="105" textAnchor="middle" fill="#6EE7B7" className="text-2xl font-black font-mono">24 Days</text>
        <text x="720" y="128" textAnchor="middle" fill="#A7F3D0" className="text-[11px] font-bold">192 Plant Hours (8h/day)</text>
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
                Explore real Business Calendar Engineering formula calculations, live audits, and calculated outputs in the embedded worksheet.
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
            sheetName="Topic22"
            title="Topic 22: Business Calendar Engineering Master Practice Grid"
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
                  Scenario 1: Plant Capacity
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Titagarh Wagon Foundry</span>
              </div>
              <h3 className="text-base font-bold text-white">Monthly Factory Shift Capacity Planning (6-Day Operation)</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"A precision engineering plant in Titagarh operates on a 6-day workweek (Monday to Saturday, 8 hours per shift). Operations managers must calculate monthly production capacity for steel pipe fabrication."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Calculate monthly machine hours for 6-day workweek</div>
                <div className="text-emerald-300 font-bold">{"=NETWORKDAYS.INTL(DATE(2026,11,1), DATE(2026,11,30), 11, tblHolidays[Date]) * 8"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"24 Net Days * 8 Hours = 192 Available Machine Hours"}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: Shift Scaling
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Shyamnagar Textile Looms</span>
              </div>
              <h3 className="text-base font-bold text-white">Double-Shift Manufacturing Overtime Capacity Modeling</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"To meet export quotas, a textile loom in Shyamnagar runs two 8-hour shifts per day (16 total operating hours daily). The calendar model must project total loom hours available in Q4."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Scale net active workdays by 16 daily double-shift hours</div>
                <div className="text-emerald-300 font-bold">{"=NETWORKDAYS.INTL(DATE(2026,10,1), DATE(2026,12,31), 11, tblHolidays[Date]) * 16"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"73 Net Workdays * 16 Hours = 1,168 Operational Loom Hours"}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: Shutdown Model
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Barrackpore Thermal Power</span>
              </div>
              <h3 className="text-base font-bold text-white">Scheduled Maintenance Shutdown Calendar Modeling</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Barrackpore thermal power plant schedules boiler maintenance shutdowns on the 2nd and 4th Saturdays of every month. The capacity model must recognize these alternating non-working days."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Exclude custom corporate shutdown dates via dynamic table</div>
                <div className="text-emerald-300 font-bold">{"=NETWORKDAYS.INTL(Start, End, 11, tblHolidaysAndShutdowns[Date])"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Automatically omits 2nd and 4th Saturdays via holiday schedule table."}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: Run Rate Quota
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Naihati FMCG Bottling</span>
              </div>
              <h3 className="text-base font-bold text-white">Daily Production Target Allocation Formula</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"A FMCG bottling unit in Naihati must produce 500,000 cases of beverage in November 2026. The planning engineer must compute the required daily run rate based on active operational days."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Divide monthly production target by net active days</div>
                <div className="text-emerald-300 font-bold">{"=TotalTarget / NETWORKDAYS.INTL(DATE(2026,11,1), DATE(2026,11,30), 11, tblHolidays[Date])"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"500,000 / 24 Days = 20,833.33 Cases / Operating Day"}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: Org Alignment
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Ichapur Enterprise Operations</span>
              </div>
              <h3 className="text-base font-bold text-white">Cross-Department Capacity Balancing (Admin vs Plant)</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Ichapur enterprise ERP coordinates between head office administration (5-day week, Code 1) and assembly line factory floors (6-day week, Code 11)."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Measure operational day discrepancy between departments</div>
                <div className="text-emerald-300 font-bold">{"=NETWORKDAYS.INTL(Start, End, 11, tblHolidays[Date]) - NETWORKDAYS.INTL(Start, End, 1, tblHolidays[Date])"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Result: 4 Saturday Production Days (Plant is active while corporate HQ is closed)"}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: Logistics SLA
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata Port Logistics</span>
              </div>
              <h3 className="text-base font-bold text-white">SLA Penalties on Missed Dispatch Cutoffs</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Logistics carriers in Kolkata commit to dispatching freight within 48 business operating hours. The model computes whether dispatches satisfied contractual SLAs."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Evaluate elapsed operating hours against 48-hour SLA</div>
                <div className="text-emerald-300 font-bold">{"=IF(NetOperatingHours <= 48, \"SLA Satisfied\", \"Contractual Penalty Incurred\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"42.5 Net Business Hours → 'SLA Satisfied'"}
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
              <span className="text-indigo-400 font-bold">Step 1: Define Plant Operating Hours and Weekly Roster</span>
              <p>{"Document whether the facility runs 5, 6, or 7 days per week, and define the daily operational hours (8h, 16h, or 24h)."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Parameter: WeekendCode = 11 (Sun Only), ShiftHours = 8"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 2: Build Centralized Holiday & Maintenance Repository</span>
              <p>{"Create an official Excel Table named tblHolidays listing all gazetted state holidays and planned maintenance outages."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"tblHolidays[HolidayDate]"}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 3: Calculate Net Working Days with NETWORKDAYS.INTL</span>
              <p>{"Count productive business days for the target period, passing the custom weekend code and holiday table reference."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=NETWORKDAYS.INTL(A2, B2, 11, tblHolidays[HolidayDate])"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Step 4: Multiply by Shift Hours and Equipment Efficiency (OEE)</span>
              <p>{"Scale productive days into net operating hours, adjusting for equipment availability and downtime factors."}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=C2 * DailyHours * OEE_Factor"}</div>
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
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#NUM!"}</td>
                  <td className="py-3 px-4 font-sans">{"Excel's binary string mask requires exactly 7 characters, starting with Monday."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Passing an invalid weekend string mask like '000001' (only 6 characters)."}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Provide a valid 7-character binary mask like '0000001' or use standard numeric codes (1 to 17)."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Underestimated Capacity"}</td>
                  <td className="py-3 px-4 font-sans">{"WORKDAY assumes a 5-day week (Sat/Sun weekend), incorrectly stripping 4-5 productive working Saturdays every month."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Calculating capacity using WORKDAYS instead of WORKDAYS.INTL in a 6-day factory."}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Switch to NETWORKDAYS.INTL and specify code 11 (Sunday only weekend)."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Unplanned Overtime Deficit"}</td>
                  <td className="py-3 px-4 font-sans">{"Failing to pass a holiday range leaves workers scheduled on days the factory is legally required to close."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Ignoring company holidays in capacity projections."}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Bind the holiday parameter to an official corporate holiday table."}</td>
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
              <span className="text-indigo-400 font-bold">Named Ranges for Operational Parameters</span>
              <p className="text-slate-300">{"Store your operational parameters (Daily Shift Hours, Weekend Code, OEE Target) in dedicated named ranges (e.g. cfg_ShiftHours). This allows factory managers to simulate roster adjustments across thousands of formula rows instantly."}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">Continuous 24/7 Operations Mask</span>
              <p className="text-slate-300">{"When modeling continuous 24/7 manufacturing plants (chemical refineries, continuous glass or paper mills), pass '0000000' as the weekend string. This instructs Excel that every single calendar day is an active production day."}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">Half-Day Saturday Allocation</span>
              <p className="text-slate-300">{"For partial Saturday shifts (e.g. 4-hour half-day Saturdays), calculate Monday-Friday full days with code 1, and add Saturday counts multiplied by 0.5."}</p>
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
              • <strong>Function Selection:</strong> {"Why should manufacturing plants avoid using standard NETWORKDAYS() without the .INTL extension?"}
            </p>

            <p key="1">
              • <strong>Holiday Synchronization:</strong> {"How can an Excel model accommodate floating religious holidays that shift on lunar calendars?"}
            </p>

            <p key="2">
              • <strong>Rotational Shifts:</strong> {"How do you calculate net workdays when employees work alternating 4-day on / 4-day off rotational shift rosters?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 22: Business Calendar Engineering Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="Business Calendar Engineering Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"In factory engineering, capacity is revenue. If your calendar formulas miss a state holiday or miscalculate Saturday shifts, your supply chain models will over-promise and under-deliver. Always build your business calendars on robust NETWORKDAYS.INTL architecture."}
          />
        </div>
      </div>
    </div>
  );
}
