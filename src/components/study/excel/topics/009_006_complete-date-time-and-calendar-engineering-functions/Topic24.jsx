"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/complete_date_time_calendar_engineering_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic24_files/topic24_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic24() {
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

  const [inpYear, setInpYear] = useState(2026);
  const [inpMonth, setInpMonth] = useState(11); // November
  const [inpNth, setInpNth] = useState(4); // 4th
  const [inpTargetWeekday, setInpTargetWeekday] = useState(4); // Thursday (US Thanksgiving rule)

  const floatingDateResult = useMemo(() => {
    const yr = parseInt(inpYear, 10);
    const mo = parseInt(inpMonth, 10) - 1; // 0-based month
    const n = parseInt(inpNth, 10);
    const targetWkday = parseInt(inpTargetWeekday, 10); // 0=Sun, 1=Mon, ..., 4=Thu

    if (isNaN(yr) || isNaN(mo) || isNaN(n) || isNaN(targetWkday)) {
      return { isError: true, error: "#VALUE! Enter valid parameters" };
    }

    // Formula: First of month
    const firstDay = new Date(Date.UTC(yr, mo, 1));
    const firstWkday = firstDay.getUTCDay();

    // Offset to first occurrence
    let offset = (targetWkday - firstWkday + 7) % 7;
    // Add (n-1)*7 days
    const targetDayOfMonth = 1 + offset + (n - 1) * 7;

    const targetDate = new Date(Date.UTC(yr, mo, targetDayOfMonth));
    if (targetDate.getUTCMonth() !== mo) {
      return { isError: true, error: "#NUM! Nth occurrence exceeds days in month" };
    }

    const yrStr = targetDate.getUTCFullYear();
    const moStr = String(targetDate.getUTCMonth() + 1).padStart(2, '0');
    const dayStr = String(targetDate.getUTCDate()).padStart(2, '0');

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return {
      isError: false,
      calculatedDate: `${yrStr}-${moStr}-${dayStr}`,
      dayName: dayNames[targetWkday],
      dayOfMonth: targetDayOfMonth
    };
  }, [inpYear, inpMonth, inpNth, inpTargetWeekday]);
    

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
              ⚡ Date & Calendar Engineering · Topic 24
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Enterprise Infrastructure · Holiday Repositories
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
              Bloom's Taxonomy: Design & Standardize
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-sky-200 to-emerald-300 bg-clip-text text-transparent leading-snug">
            Holiday Calendar Architecture — Dynamic Repositories & Floating Observances
          </h1>

          <div className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl space-y-3">
            <p>In modern corporate ERP and payroll engines, statutory holidays cannot be treated as static afterthought lists. Real-world business calendars contend with two distinct types of closures: <strong>Fixed National Holidays</strong> (e.g. Republic Day on 26-Jan, Independence Day on 15-Aug, Gandhi Jayanti on 02-Oct) and <strong>Floating / Astronomical Observances</strong> (e.g. Durga Puja, Diwali, Eid-ul-Fitr, Holi, Good Friday, US Thanksgiving).</p><p><strong>Holiday Calendar Architecture</strong> is the practice of designing structured, self-expanding holiday tables (<code className="text-emerald-300 font-mono">tblHolidays</code>) and algorithmic date formulas to generate floating observances dynamically. Feeding these master repositories into <code className="text-indigo-300 font-mono">WORKDAY.INTL</code> and <code className="text-indigo-300 font-mono">NETWORKDAYS.INTL</code> ensures project milestones, supply chain lead times, and statutory tax filing schedules remain 100% compliant year after year without manual formula rewrites.</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base font-bold">✓</span>
              <span><strong>Syntax:</strong> <code className="font-mono text-indigo-300">{"tblHolidays[Date] | Floating Nth Weekday: =DATE(Yr, Mo, 1) + MOD(Day - WEEKDAY(...), 7) + (N-1)*7"}</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base font-bold">✓</span>
              <span><strong>Domain:</strong> {"Corporate Governance, Statutory Compliance & Human Capital Management"}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base font-bold">✓</span>
              <span><strong>Production Pattern:</strong> {"=WORKDAY.INTL(Start, Days, Mask, tblHolidays[Date]) | =ISNUMBER(MATCH(Date, tblHolidays[Date], 0))"}</span>
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
              Dynamic Holiday Repository Engine
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-indigo-300 space-y-3">
            <div className="text-slate-500">// Canonical Holiday Calendar Architecture Formula Signature</div>
            <div className="text-white font-bold text-base">
              {"Dynamic_Holiday_Range = tblHolidays[OfficialDate] (Excel Table Structured Column)"}
            </div>
            <div className="text-slate-400 text-xs font-sans space-y-2 pt-2 border-t border-slate-900">
              <div>• <strong className="text-teal-300">Fixed Calendar Holidays:</strong> Exact calendar dates that occur on the same day every year (e.g., DATE(Year, 1, 26) for Republic Day).</div><div>• <strong className="text-sky-300">Floating Algorithmic Holidays:</strong> Dates governed by rules (e.g., 4th Thursday of November for US Thanksgiving, or lunar calendars for Diwali and Eid).</div><div>• <strong className="text-amber-300">Observance Shift Rules:</strong> When a statutory holiday falls on a weekend, corporate policies often observe the closure on the preceding Friday or succeeding Monday.</div>
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
              <span className="text-emerald-400">📊</span> Enterprise Gazetted Holiday Master Schedule Matrix (West Bengal / India 2026)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Examine fixed vs astronomical holiday classifications and their calendar stepping behaviors.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/60">
                  <th className="py-3 px-4">Holiday Code</th>
                  <th className="py-3 px-4">Gazetted Holiday Name</th>
                  <th className="py-3 px-4">Official Date</th>
                  <th className="py-3 px-4">Day of Week</th>
                  <th className="py-3 px-4">Classification Type</th>
                  <th className="py-3 px-4">Observance Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">HOL-01</td>
        <td className="py-3.5 px-4 text-white">Republic Day</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">2026-01-26</td>
        <td className="py-3.5 px-4 text-slate-300">Monday</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold">National Fixed</td>
        <td className="py-3.5 px-4 text-slate-400">Exact Date Observed</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">HOL-02</td>
        <td className="py-3.5 px-4 text-white">Holi (Doljatra)</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">2026-03-04</td>
        <td className="py-3.5 px-4 text-slate-300">Wednesday</td>
        <td className="py-3.5 px-4 text-amber-300 font-bold">Astronomical Floating</td>
        <td className="py-3.5 px-4 text-slate-400">Lunar Phalguna Purnima</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">HOL-03</td>
        <td className="py-3.5 px-4 text-white">Good Friday</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">2026-04-03</td>
        <td className="py-3.5 px-4 text-slate-300">Friday</td>
        <td className="py-3.5 px-4 text-amber-300 font-bold">Religious Floating</td>
        <td className="py-3.5 px-4 text-slate-400">Friday before Easter Sunday</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">HOL-04</td>
        <td className="py-3.5 px-4 text-white">Independence Day</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">2026-08-15</td>
        <td className="py-3.5 px-4 text-slate-300">Saturday</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold">National Fixed</td>
        <td className="py-3.5 px-4 text-rose-400">Falls on Weekend (Zero Drift)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">HOL-05</td>
        <td className="py-3.5 px-4 text-white">Mahatma Gandhi Jayanti</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">2026-10-02</td>
        <td className="py-3.5 px-4 text-slate-300">Friday</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold">National Fixed</td>
        <td className="py-3.5 px-4 text-slate-400">Exact Date Observed</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">HOL-06</td>
        <td className="py-3.5 px-4 text-white">Durga Puja (Vijaya Dashami)</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">2026-10-20</td>
        <td className="py-3.5 px-4 text-slate-300">Tuesday</td>
        <td className="py-3.5 px-4 text-amber-300 font-bold">Regional Statutory</td>
        <td className="py-3.5 px-4 text-slate-400">West Bengal State Gazette</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">HOL-07</td>
        <td className="py-3.5 px-4 text-white">Diwali (Deepavali)</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">2026-11-08</td>
        <td className="py-3.5 px-4 text-slate-300">Sunday</td>
        <td className="py-3.5 px-4 text-amber-300 font-bold">Astronomical Floating</td>
        <td className="py-3.5 px-4 text-rose-400">Falls on Weekend (Zero Drift)</td>
      </tr>
      <tr className="hover:bg-slate-900/40">
        <td className="py-3.5 px-4 text-indigo-400 font-bold font-mono">HOL-08</td>
        <td className="py-3.5 px-4 text-white">Christmas Day</td>
        <td className="py-3.5 px-4 text-emerald-300 font-mono">2026-12-25</td>
        <td className="py-3.5 px-4 text-slate-300">Friday</td>
        <td className="py-3.5 px-4 text-sky-300 font-bold">National Fixed</td>
        <td className="py-3.5 px-4 text-slate-400">Exact Date Observed</td>
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
                The Structured Table Architecture vs Hardcoded Cell References
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Why enterprise models must never reference holiday ranges like $Z$2:$Z$15.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <p>A widespread vulnerability in financial models is referencing holiday ranges using brittle coordinate ranges like <code className="text-rose-400 font-mono">=WORKDAY.INTL(A2, 10, 1, Sheet2!$A$2:$A$10)</code>.</p><p>When the West Bengal Government declares an unscheduled public holiday or when the company announces a plant shutdown, someone appends the date into row 11. Because the formula was hardcoded to row 10, the new date is <strong>completely ignored</strong>! Project deadlines fail to advance, generating false breach alerts and contractual penalties.</p><p>By converting your holiday repository into a formal Excel Table (Insert &gt; Table) named <code className="text-emerald-300 font-mono">tblHolidays</code>, you can reference the column cleanly as <code className="text-emerald-300 font-mono">=WORKDAY.INTL(A2, 10, 1, tblHolidays[Date])</code>. When new rows are added to the table, Excel's structured reference engine instantly re-indexes all formulas across the entire enterprise workbook automatically!</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-rose-900/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Brittle Coordinate Range
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-rose-300 text-xs">
                  {"=NETWORKDAYS.INTL(A2, B2, 1, Config!$K$2:$K$9)"}
                </div>
                <p className="text-xs text-slate-400">
                  {"Silent failure: Newly added holidays outside row 9 are ignored by the formula engine."}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-900/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  Dynamic Structured Excel Table Column
                </span>
                <div className="p-3 rounded-xl bg-slate-900 font-mono text-emerald-300 text-xs">
                  {"=NETWORKDAYS.INTL(A2, B2, 1, tblHolidays[OfficialDate])"}
                </div>
                <p className="text-xs text-slate-400">
                  {"Dynamically expands and includes every newly inserted statutory holiday automatically."}
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
            Master Holiday Table Architecture: Feeding unified, validated dates into the project calendar engine.
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 flex justify-center overflow-x-auto">
            
      <svg viewBox="0 0 840 200" className="w-full max-w-4xl h-auto font-sans">
        <rect x="30" y="30" width="340" height="135" rx="12" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
        <text x="200" y="60" textAnchor="middle" fill="#38BDF8" className="text-xs font-bold font-mono">EXCEL TABLE: tblHolidays[Date]</text>
        <rect x="50" y="75" width="300" height="24" rx="4" fill="#1E293B" />
        <text x="60" y="91" fill="#FFFFFF" className="text-xs font-mono">2026-01-26 (Republic Day)</text>
        <rect x="50" y="105" width="300" height="24" rx="4" fill="#1E293B" />
        <text x="60" y="121" fill="#FFFFFF" className="text-xs font-mono">2026-03-04 (Holi / Doljatra)</text>
        <rect x="50" y="135" width="300" height="24" rx="4" fill="#1E293B" />
        <text x="60" y="151" fill="#FFFFFF" className="text-xs font-mono">2026-10-20 (Durga Puja)</text>

        <path d="M 390 95 L 430 95" stroke="#10B981" strokeWidth="3" markerEnd="url(#arrow)" />
        <text x="410" y="80" textAnchor="middle" fill="#10B981" className="text-[10px] font-bold">FEEDS</text>

        <rect x="440" y="30" width="370" height="135" rx="12" fill="#0F172A" stroke="#10B981" strokeWidth="2" />
        <text x="625" y="60" textAnchor="middle" fill="#10B981" className="text-xs font-bold font-mono">WORKDAY.INTL / NETWORKDAYS.INTL</text>
        <text x="625" y="90" textAnchor="middle" fill="#94A3B8" className="text-xs font-mono">=WORKDAY.INTL(Start, 10, 1, tblHolidays[Date])</text>
        <rect x="470" y="110" width="310" height="36" rx="8" fill="#064E3B" stroke="#10B981" strokeWidth="1" />
        <text x="625" y="133" textAnchor="middle" fill="#6EE7B7" className="text-xs font-bold font-mono">GUARANTEED ZERO DEADLINE DRIFT</text>
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
                Explore real Holiday Calendar Architecture formula calculations, live audits, and calculated outputs in the embedded worksheet.
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
            sheetName="Topic24"
            title="Topic 24: Holiday Calendar Architecture Master Practice Grid"
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
                  Scenario 1: Statutory Compliance
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Kolkata Corporate HQ</span>
              </div>
              <h3 className="text-base font-bold text-white">Dynamic West Bengal Statutory Holiday Exclusion</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Kolkata head office prepares payroll schedules for 2026. The payroll processing engine must exclude all official West Bengal state holidays stored in the master corporate table."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Feed official table column into business day stepping engine</div>
                <div className="text-emerald-300 font-bold">{"=WORKDAY.INTL(SalaryCutoffDate, 3, 1, tblHolidays[OfficialDate])"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Cutoff: 21-Oct-2026 → Payroll Disbursed: 26-Oct-2026 (Skips Puja Holidays & Weekend)"}
                </div>
              </div>
            </div>

            <div key="1" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 2: Floating Holiday Math
                </span>
                <span className="text-[10px] text-slate-400 font-mono">US Client Operations Desk</span>
              </div>
              <h3 className="text-base font-bold text-white">Algorithmic Calculation of US Thanksgiving Holiday</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"An offshore team in Barrackpore supports US mortgage underwriting. The system must automatically determine the exact date of US Thanksgiving (4th Thursday of November) for any year."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Calculate 4th Thursday of November algorithmically</div>
                <div className="text-emerald-300 font-bold">{"=DATE(Year, 11, 1) + MOD(5 - WEEKDAY(DATE(Year, 11, 1)), 7) + 21"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"For Year 2026: Evaluates cleanly to 2026-11-26 (4th Thursday)"}
                </div>
              </div>
            </div>

            <div key="2" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 3: Weekend Collision Shift
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Titagarh Rail Systems</span>
              </div>
              <h3 className="text-base font-bold text-white">Corporate Holiday Weekend Observance Roll-Forward</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"When a statutory holiday falls on a Sunday (e.g. Diwali on 08-Nov-2026), Titagarh corporate policy grants employees a compensatory day off on the following Monday."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Roll Sunday holiday forward to Monday</div>
                <div className="text-emerald-300 font-bold">{"=IF(WEEKDAY(HolidayDate, 2)=7, HolidayDate + 1, HolidayDate)"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Input: 2026-11-08 (Sun) → Observed Holiday: 2026-11-09 (Mon)"}
                </div>
              </div>
            </div>

            <div key="3" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 4: Holiday Validation
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Shyamnagar Dispatch Center</span>
              </div>
              <h3 className="text-base font-bold text-white">Validating Delivery Dates Against Closed Plant Holidays</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Dispatch schedulers in Shyamnagar must prevent assigning freight pickup appointments on plant holidays."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Check if target date exists in holiday repository</div>
                <div className="text-emerald-300 font-bold">{"=IF(ISNUMBER(XMATCH(PickupDate, tblHolidays[OfficialDate])), \"PLANT CLOSED - HOLIDAY\", \"VALID DISPATCH DATE\")"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Date: 2026-10-20 → 'PLANT CLOSED - HOLIDAY'"}
                </div>
              </div>
            </div>

            <div key="4" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 5: Fiscal Year Repository
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Naihati Municipal Accounts</span>
              </div>
              <h3 className="text-base font-bold text-white">Multi-Year Holiday Repository Filtering by Fiscal Year</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Auditors at Naihati review project expenditures across Indian Fiscal Year 2026-27 (01-Apr-2026 to 31-Mar-2027) using a filtered subset of a 5-year holiday table."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Dynamically filter holiday table for specific fiscal year</div>
                <div className="text-emerald-300 font-bold">{"=FILTER(tblHolidays[OfficialDate], (tblHolidays[OfficialDate]>=DATE(2026,4,1))*(tblHolidays[OfficialDate]<=DATE(2027,3,31)))"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Returns dynamic spill array of exactly 16 FY 2026-27 statutory holidays."}
                </div>
              </div>
            </div>

            <div key="5" className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 text-xs font-bold">
                  Scenario 6: Cross-Border Calendar
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Ichapur Defense Logistics</span>
              </div>
              <h3 className="text-base font-bold text-white">Combined Multi-Territory Holiday Merge Engine</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {"Ichapur logistics coordinates defense shipments between India and Germany. Shipments cannot occur if either territory observes a national holiday."}
              </p>
              <div className="p-3.5 rounded-xl bg-slate-900/90 font-mono text-xs text-indigo-300 space-y-1.5 border border-slate-800">
                <div className="text-slate-500 text-[11px]">// Combine both national holiday tables using VSTACK</div>
                <div className="text-emerald-300 font-bold">{"=WORKDAY.INTL(ShipDate, 10, 1, VSTACK(tblIndiaHolidays[Date], tblGermanyHolidays[Date]))"}</div>
                <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800/60">
                  <span className="text-amber-300 font-semibold">Yields:</span> {"Calculates milestone stepping over both Indian and German statutory holidays."}
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
              <span className="text-indigo-400 font-bold">Create the Master Holiday Data Table</span>
              <p>{undefined}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"Range A1:E20 > Press Ctrl+T > Name: tblHolidays"}</div>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Format the Date Column as Real Serial Numbers</span>
              <p>{undefined}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=ISNUMBER(tblHolidays[@OfficialDate]) -> Must return TRUE"}</div>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Apply Algorithmic Formulas for Floating Holidays</span>
              <p>{undefined}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=DATE(Yr, 11, 1) + MOD(5 - WEEKDAY(DATE(Yr, 11, 1)), 7) + 21"}</div>
            </div>

            <div key="3" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold">Pass the Structured Reference to Project Engines</span>
              <p>{undefined}</p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-xs text-indigo-300 whitespace-pre-line">{"=WORKDAY.INTL(A2, 10, 1, tblHolidays[OfficialDate])"}</div>
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
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Holiday Ignored by Formula"}</td>
                  <td className="py-3 px-4 font-sans">{"Holiday date entered as text (e.g. '26-Jan-2026') or preceded by an apostrophe."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Formula does not skip holiday date"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Convert to real date serial: select column > Data > Text to Columns > Date: YMD."}</td>
                </tr>

                <tr key="1" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"#SPILL! Error in Combined Holidays"}</td>
                  <td className="py-3 px-4 font-sans">{"Using dynamic array VSTACK(tblA[Date], tblB[Date]) inside an old legacy non-365 Excel workbook."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"Workbook opened in Excel 2016 or 2019"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Combine both tables into a single consolidated master Excel Table."}</td>
                </tr>

                <tr key="2" className="hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-rose-400 font-bold">{"Double Deduction Error"}</td>
                  <td className="py-3 px-4 font-sans">{"Manual subtraction: TotalDays - Weekends - Holidays when holidays fall on a weekend."}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{"=Days - 8 - 2"}</td>
                  <td className="py-3 px-4 font-sans text-emerald-300">{"Always use NETWORKDAYS.INTL; it natively handles weekend-holiday overlap without double-counting."}</td>
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
              <span className="text-indigo-400 font-bold">Excel Table Auto-Expansion</span>
              <p className="text-slate-300">{"Always store corporate holidays in an Excel Table (Ctrl+T). When HR inserts a new row next year, the structured reference tblHolidays[Date] automatically expands without modifying a single formula in your workbook!"}</p>
            </div>

            <div key="1" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold">The Universal Nth Weekday Formula</span>
              <p className="text-slate-300">{"To find the Nth weekday of any month: =DATE(Yr, Mo, 1) + MOD(TargetWeekday - WEEKDAY(DATE(Yr, Mo, 1)), 7) + (N - 1) * 7. This single formula solves 95% of international floating observances."}</p>
            </div>

            <div key="2" className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-sky-400 font-bold">Observance Rule Normalization</span>
              <p className="text-slate-300">{"If your company gives Friday off when a holiday falls on Saturday: =IF(WEEKDAY(Date,2)=6, Date-1, IF(WEEKDAY(Date,2)=7, Date+1, Date))."}</p>
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
              • <strong>Table Mechanics:</strong> {"Why does an Excel Table reference tblHolidays[Date] safeguard formulas against row insertion errors better than $Z$2:$Z$20?"}
            </p>

            <p key="1">
              • <strong>Algorithmic Design:</strong> {"How does the mathematical modulo operation MOD(target - firstDay, 7) identify the first occurrence of a specific weekday in a month?"}
            </p>

            <p key="2">
              • <strong>Multi-Jurisdiction Scope:</strong> {"In global supply chain models, should you maintain separate holiday tables for each operating territory or a single unified table with country tags?"}
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 13: COMPREHENSIVE FAQ SECTION
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 24: Holiday Calendar Architecture Function — Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER SUKANTA HUI'S MASTER MENTOR ADVICE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[13] = el)} className="reveal-section">
          <Teacher
            topicName="Holiday Calendar Architecture Function & Date Engineering"
            noteTitle="Sukanta Hui's Master Mentor Advice"
            mentorAdvice={"A master financial modeler never hardcodes a holiday range like $A$1:$A$10. Business calendars evolve, governments proclaim emergency holidays, and lunar dates shift. Put your holidays in an official Excel Table, master the Nth weekday formula, and your corporate calendar models will run smoothly for decades."}
          />
        </div>
      </div>
    </div>
  );
}
