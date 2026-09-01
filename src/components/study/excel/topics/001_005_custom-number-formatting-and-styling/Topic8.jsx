"use client";

import React, { useState, useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/001_005_custom_number_formatting_and_styling_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic8() {
  const sectionsRef = useRef([]);

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

  const handleDownload = () => {
    if (!sampleWorkbookUrl) return;
    const link = document.createElement("a");
    link.href = sampleWorkbookUrl;
    link.download = "custom_number_formatting_and_styling_master.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const durationExamples = [
    {
      id: "1",
      code: "DUR-101",
      category: "Plant Shift Overtime Tracking",
      raw: "1.541667",
      mask: "[h]:mm:ss",
      formatted: "37:00:00",
      formulaBar: "37:00:00",
      logic: "Bracketed [h] prevents 24-hour clock rollover (which would display 13:00); tracks cumulative 37 overtime hours across multi-day shifts."
    },
    {
      id: "2",
      code: "DUR-102",
      category: "Weekly Timesheet Cumulative Sum",
      raw: "2.083333",
      mask: "[h]:mm",
      formatted: "50:00",
      formulaBar: "50:00:00",
      logic: "Displays total cumulative weekly billable hours (50 hours) without resetting modulo 24."
    },
    {
      id: "3",
      code: "DUR-103",
      category: "Machine Maintenance Downtime",
      raw: "0.041667",
      mask: "[m]:ss",
      formatted: "60:00",
      formulaBar: "01:00:00",
      logic: "Bracketed minute token [m] converts 1 hour fraction into 60 cumulative downtime minutes for factory SLA monitoring."
    },
    {
      id: "4",
      code: "DUR-104",
      category: "Server Uptime Elapsed Seconds",
      raw: "0.001157",
      mask: '[s]" sec"',
      formatted: "100 sec",
      formulaBar: "00:01:40",
      logic: "Bracketed second token [s] displays cumulative elapsed response time in seconds."
    },
    {
      id: "5",
      code: "DUR-105",
      category: "Monthly Overtime Hours Ledger",
      raw: "4.625",
      mask: '[h]" hrs "mm" mins"',
      formatted: "111 hrs 00 mins",
      formulaBar: "111:00:00",
      logic: "Renders 111 cumulative monthly overtime hours with explicit literal text labels for payroll audit."
    },
    {
      id: "6",
      code: "DUR-106",
      category: "Call Center Queue Duration",
      raw: "0.003472",
      mask: "[m]:ss",
      formatted: "05:00",
      formulaBar: "00:05:00",
      logic: "Displays customer wait time in cumulative minutes and seconds."
    },
    {
      id: "7",
      code: "DUR-107",
      category: "Data Center Outage Recovery Window",
      raw: "1.25",
      mask: "[h]:mm",
      formatted: "30:00",
      formulaBar: "30:00:00",
      logic: "Tracks 30 hours elapsed outage recovery without clock resetting to 06:00."
    },
    {
      id: "8",
      code: "DUR-108",
      category: "Freight Truck In-Transit Duration",
      raw: "3.125",
      mask: "[h]:mm:ss",
      formatted: "75:00:00",
      formulaBar: "75:00:00",
      logic: "Tracks 75 hours long-haul transit time across multi-state shipping corridors."
    },
    {
      id: "9",
      code: "DUR-109",
      category: "Industrial Furnace Run Time",
      raw: "7.5",
      mask: '[h]" Hours"',
      formatted: "180 Hours",
      formulaBar: "180:00:00",
      logic: "Tracks 180 continuous operating furnace hours for maintenance scheduling."
    },
    {
      id: "10",
      code: "DUR-110",
      category: "Sprint Task Hours Allocation",
      raw: "0.708333",
      mask: "[h]:mm",
      formatted: "17:00",
      formulaBar: "17:00:00",
      logic: "Renders 17 total estimated task hours for software engineering sprint planning."
    },
    {
      id: "11",
      code: "DUR-111",
      category: "Flight Crew Duty Hours Log",
      raw: "0.583333",
      mask: "[h]:mm",
      formatted: "14:00",
      formulaBar: "14:00:00",
      logic: "Enforces aviation regulatory duty hour limits (14 hours) on pilot flight logs."
    },
    {
      id: "12",
      code: "DUR-112",
      category: "Power Plant Turbine Operation",
      raw: "30.0",
      mask: "[h]:mm",
      formatted: "720:00",
      formulaBar: "720:00:00",
      logic: "Displays 720 continuous operating hours (30 full days) for turbine performance logs."
    },
    {
      id: "13",
      code: "DUR-113",
      category: "Video Editing Timeline Duration",
      raw: "0.09375",
      mask: "[h]:mm:ss.00",
      formatted: "02:15:00.00",
      formulaBar: "02:15:00",
      logic: "Formats 2 hours 15 minutes broadcast video timeline with sub-second accuracy."
    },
    {
      id: "14",
      code: "DUR-114",
      category: "Employee Monthly Attendance Sum",
      raw: "7.0",
      mask: "[h]:mm",
      formatted: "168:00",
      formulaBar: "168:00:00",
      logic: "Accumulates 168 standard working hours per month for HR payroll calculation."
    },
    {
      id: "15",
      code: "DUR-115",
      category: "Cold Storage Failure SLA",
      raw: "0.1875",
      mask: '[h]:mm" hrs SLA"',
      formatted: "04:30 hrs SLA",
      formulaBar: "04:30:00",
      logic: "Tracks 4 hours 30 minutes emergency cold storage temperature resolution window."
    },
    {
      id: "16",
      code: "DUR-116",
      category: "Heavy Equipment Engine Hours",
      raw: "12.5",
      mask: "[h]:mm",
      formatted: "300:00",
      formulaBar: "300:00:00",
      logic: "Tracks 300 excavator engine hours for oil change service alerts."
    },
    {
      id: "17",
      code: "DUR-117",
      category: "ICU Oxygen Deployment Run",
      raw: "2.25",
      mask: "[h]:mm:ss",
      formatted: "54:00:00",
      formulaBar: "54:00:00",
      logic: "Monitors 54 continuous hours of ICU oxygen cylinder deployment."
    },
    {
      id: "18",
      code: "DUR-118",
      category: "ISP Network Circuit Downtime",
      raw: "0.020833",
      mask: '[m]" Minutes"',
      formatted: "30 Minutes",
      formulaBar: "00:30:00",
      logic: "Displays 30 cumulative outage minutes for ISP credit refund calculation."
    },
    {
      id: "19",
      code: "DUR-119",
      category: "Cargo Vessel Port Docking Time",
      raw: "3.5",
      mask: "[h]:mm",
      formatted: "84:00",
      formulaBar: "84:00:00",
      logic: "Tracks 84 hours cargo vessel port berthing time for port fee billing."
    },
    {
      id: "20",
      code: "DUR-120",
      category: "UPS Battery Endurance Test",
      raw: "0.875",
      mask: "[h]:mm:ss",
      formatted: "21:00:00",
      formulaBar: "21:00:00",
      logic: "Tracks 21 hours continuous UPS battery discharge under load test."
    }
  ];

  return (
    <div className="dark text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      <style>{`
        @keyframes fadeInSlide {
          from { transform: translateY(14px); }
          to { transform: translateY(0); }
        }
        .reveal-section {
          animation: fadeInSlide 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="w-full space-y-4 sm:space-y-5">
        {/* =========================================================================
            SECTION 1: HERO HEADER & OVERVIEW
        ========================================================================= */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 shadow-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

          <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
            <span className="px-2 py-0.5 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-[10px] font-bold uppercase tracking-wider">
              🎨 Elapsed Time · Topic 8
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-[10px] font-semibold">
              Format Engineering
            </span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-[10px] font-semibold">
              Intermediate · Bloom Level 3: Apply
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-snug">
            Elapsed Duration Tracking Exceeding 24 Hours with [h]:mm:ss for Timesheets
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed max-w-5xl">
            Preventing 24-hour clock rollover in industrial machine run-times, SLA timers, and payroll shift calculations using bracketed hour tokens (<code className="text-cyan-300">[h]</code>), minute tokens (<code className="text-cyan-300">[m]</code>), and second tokens (<code className="text-cyan-300">[s]</code>). Master cumulative time formatting and build executive-ready spreadsheets.
          </p>

          <div className="mt-3 pt-2.5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-sky-400 font-bold">✓</span>
              <span><strong>Code:</strong> EXCEL-PRO-901</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Module:</strong> Custom Formatting &amp; Presentation</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-indigo-400 font-bold">✓</span>
              <span><strong>Center:</strong> Coder &amp; AccoTax</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: INTERACTIVE EXCEL FILE VIEWER & PRACTICE WORKBOOK
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 text-sm font-mono font-bold">⏱️</span>
                Interactive Master Workbook Practice &amp; Grid Inspection
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Inspect cumulative elapsed time serial numbers vs formatted displays on worksheet tab Topic8.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-md transition-all shrink-0 self-start sm:self-auto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download .XLSX Master Workbook
            </button>
          </div>

          <ExcelFileLoader
            fileUrl={sampleWorkbookUrl}
            sheetName="Topic8"
          />
        </section>

        {/* =========================================================================
            SECTION 3: 20 COMPREHENSIVE REAL-WORLD ELAPSED TIME EXAMPLES
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 text-sm font-mono font-bold">📊</span>
                20 Real-World Cumulative Duration ([h]:mm:ss) Scenarios
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Comparing raw stored day fractions, applied bracketed format masks, formatted visual cell displays, formula bar reality, and business rationale.
              </p>
            </div>
            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800 shrink-0 font-bold">
              20 Duration Scenarios
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/70">
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Code &amp; Category</th>
                  <th className="py-2.5 px-3">Raw Stored Day Fraction</th>
                  <th className="py-2.5 px-3">Applied Format Mask</th>
                  <th className="py-2.5 px-3">Visual Formatted Cell</th>
                  <th className="py-2.5 px-3">Formula Bar Reality</th>
                  <th className="py-2.5 px-3 min-w-[280px]">Business Logic &amp; Why It Matters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {durationExamples.map((ex) => (
                  <tr key={ex.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono text-slate-500">{ex.id}</td>
                    <td className="py-2.5 px-3 font-semibold text-sky-300">
                      <div className="font-mono text-[11px] text-slate-400">{ex.code}</div>
                      <div>{ex.category}</div>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-amber-300">{ex.raw}</td>
                    <td className="py-2.5 px-3 font-mono text-cyan-300 font-bold bg-slate-950/40 rounded px-2">{ex.mask}</td>
                    <td className="py-2.5 px-3 font-mono text-emerald-400 font-extrabold bg-emerald-950/30 rounded px-2">{ex.formatted}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">{ex.formulaBar}</td>
                    <td className="py-2.5 px-3 text-slate-300 leading-relaxed text-[11px]">{ex.logic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: TECHNICAL ARCHITECTURE & BRACKETED HOUR ENGINE
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 text-sm font-mono font-bold">⚙️</span>
              Technical Architecture: The Square Bracket [h] Duration Engine
            </h2>
            <span className="text-[11px] font-mono text-indigo-300 bg-indigo-950/60 px-2.5 py-0.5 rounded-lg border border-indigo-800">
              Format Mechanics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
              <h3 className="font-bold text-sky-300 text-sm flex items-center gap-2">
                <span>🔄</span> Regular Time: Modulo 24 Rollover (hh:mm)
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Standard <code className="text-amber-300">hh:mm</code> loops modulo 24. A timesheet total of 25 hours (raw fraction 1.041667) displays as <strong className="text-white">01:00</strong> because 25 hours mod 24 = 1 hour.
              </p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-[11px] text-rose-300 border border-slate-800">
                1.041667 + hh:mm → "01:00" (WRONG Payroll Total!)
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
              <h3 className="font-bold text-emerald-300 text-sm flex items-center gap-2">
                <span>✅</span> Bracketed Time: Cumulative Total ([h]:mm)
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Enclosing hour tokens in square brackets <code className="text-amber-300">[h]:mm</code> disables 24-hour rollover. Raw fraction 1.041667 correctly displays cumulative <strong className="text-white">25:00</strong> hours.
              </p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-[11px] text-emerald-300 border border-slate-800">
                1.041667 + [h]:mm → "25:00" (CORRECT Payroll Total!)
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: COMMON MISTAKES & DIAGNOSTIC MATRIX
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 text-sm font-mono">⚠️</span>
              Common Elapsed Duration Pitfalls &amp; Diagnostic Fixes
            </h2>
            <span className="text-[11px] font-mono text-rose-300 bg-rose-950/60 px-2.5 py-0.5 rounded-lg border border-rose-800">
              Troubleshooting
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-2.5 px-3">Symptom / Error Encountered</th>
                  <th className="py-2.5 px-3">Root Cause</th>
                  <th className="py-2.5 px-3">The Exact 5-Second Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-300">Overtime hours reset to 1 hour</td>
                  <td className="py-2.5 px-3">Using regular hh:mm format causes 25 hours to display as 01:00 due to modulo 24 rollover.</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">Enclose hour token in square brackets: [h]:mm.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-300">SUM() returns 0 for time column</td>
                  <td className="py-2.5 px-3">User entered time as text string ("25:30") instead of true fractional day serial number.</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">Enter time as fraction (25.5/24) and format as [h]:mm.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-300">##### Error display in cell</td>
                  <td className="py-2.5 px-3">Negative time serial number resulting from subtracting later time from earlier time in 1900 system.</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">Use IF(End&gt;Start, End-Start, End+1-Start) for cross-midnight shifts.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: FREQUENTLY ASKED QUESTIONS (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[5] = el)} className="reveal-section">
          <FAQTemplate
            title="Elapsed Duration Tracking ([h]:mm:ss) - Mastery Q&amp;A"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 7: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[6] = el)} className="reveal-section">
          <Teacher
            note="The [h]:mm format is essential for timesheets, payroll, and industrial SLA tracking. If your shift overtime total looks suspiciously small, check if square brackets are missing from your hour token!"
          />
        </div>
      </div>
    </div>
  );
}
