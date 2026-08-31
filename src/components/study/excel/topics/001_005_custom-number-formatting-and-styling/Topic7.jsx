"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/001_005_custom_number_formatting_and_styling_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic7() {
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

  const realWorldExamples = [
    {
      id: "1",
      code: "DATE-101",
      category: "Boardroom Meeting Invite",
      raw: "46261",
      mask: "dddd, mmmm dd, yyyy",
      formatted: "Thursday, August 27, 2026",
      formulaBar: "27-08-2026",
      logic: "Full day and month names render elegant corporate calendar dates while keeping underlying date integer intact."
    },
    {
      id: "2",
      code: "DATE-102",
      category: "Audit Compliant Date",
      raw: "46261",
      mask: "dd-mmm-yyyy",
      formatted: "27-Aug-2026",
      formulaBar: "27-08-2026",
      logic: "Gold standard for international audit reports; eliminates confusion between US (MM/DD) and UK/Indian (DD/MM) dates."
    },
    {
      id: "3",
      code: "DATE-103",
      category: "Compact Manifest Stamp",
      raw: "46261",
      mask: "dd-mm-yy",
      formatted: "27-08-26",
      formulaBar: "27-08-2026",
      logic: "Saves grid width on warehouse packing slips while preserving true serial date math."
    },
    {
      id: "4",
      code: "DATE-104",
      category: "ISO 8601 Database Timestamp",
      raw: "46261.604167",
      mask: "yyyy-mm-dd hh:mm:ss",
      formatted: "2026-08-27 14:30:00",
      formulaBar: "27-08-2026 14:30:00",
      logic: "Universal database ingestion format; text sorts chronologically across modern SQL ETL pipelines."
    },
    {
      id: "5",
      code: "DATE-105",
      category: "Executive Shift Schedule",
      raw: "46261.604167",
      mask: "ddd, dd-mmm hh:mm AM/PM",
      formatted: "Thu, 27-Aug 02:30 PM",
      formulaBar: "27-08-2026 14:30:00",
      logic: "Displays day abbreviation and 12-hour clock with AM/PM for plant shift rosters."
    },
    {
      id: "6",
      code: "DATE-106",
      category: "Sparkline Column Header",
      raw: "46261",
      mask: "mmmmm",
      formatted: "A",
      formulaBar: "27-08-2026",
      logic: "Renders single-letter month abbreviation ('A' for August) for ultra-compact monthly KPI trend charts."
    },
    {
      id: "7",
      code: "DATE-107",
      category: "High-Precision Sensor Log",
      raw: "46261.604345",
      mask: "hh:mm:ss.000",
      formatted: "14:30:15.408",
      formulaBar: "27-08-2026 14:30:15",
      logic: "Appends decimal fractions to seconds to track millisecond industrial sensor readings."
    },
    {
      id: "8",
      code: "DATE-108",
      category: "Fiscal Quarter Period",
      raw: "46261",
      mask: '"Q3-"yyyy',
      formatted: "Q3-2026",
      formulaBar: "27-08-2026",
      logic: "Embeds literal text prefix 'Q3-' with 4-digit year for quarterly financial balance sheets."
    },
    {
      id: "9",
      code: "DATE-109",
      category: "Localized US Date",
      raw: "46261",
      mask: "[$-409]mmmm dd, yyyy",
      formatted: "August 27, 2026",
      formulaBar: "27-08-2026",
      logic: "Forces US English language rendering for month names regardless of local Windows OS regional settings."
    },
    {
      id: "10",
      code: "DATE-110",
      category: "Localized French Date",
      raw: "46261",
      mask: "[$-40C]dddd dd mmmm yyyy",
      formatted: "jeudi 27 août 2026",
      formulaBar: "27-08-2026",
      logic: "Renders weekday and month in French for European export invoice documentation."
    },
    {
      id: "11",
      code: "DATE-111",
      category: "12-Hour Operational Clock",
      raw: "0.375",
      mask: "hh:mm AM/PM",
      formatted: "09:00 AM",
      formulaBar: "09:00:00 AM",
      logic: "Converts decimal fraction 0.375 into standard morning office hours."
    },
    {
      id: "12",
      code: "DATE-112",
      category: "24-Hour Military Time",
      raw: "0.854167",
      mask: "hh:mm:ss",
      formatted: "20:30:00",
      formulaBar: "08:30:00 PM",
      logic: "Renders 24-hour military clock without AM/PM for flight dispatch logs."
    },
    {
      id: "13",
      code: "DATE-113",
      category: "Monthly Summary Header",
      raw: "46261",
      mask: "mmmm yyyy",
      formatted: "August 2026",
      formulaBar: "27-08-2026",
      logic: "Formats daily transactions into clean monthly reporting headers."
    },
    {
      id: "14",
      code: "DATE-114",
      category: "Short Day & Full Month",
      raw: "46261",
      mask: "ddd, dd mmmm yyyy",
      formatted: "Thu, 27 August 2026",
      formulaBar: "27-08-2026",
      logic: "Combines 3-letter weekday with full month for corporate calendar entries."
    },
    {
      id: "15",
      code: "DATE-115",
      category: "Fiscal Year Stamp",
      raw: "46261",
      mask: '"FY"yy" - "mmm',
      formatted: "FY26 - Aug",
      formulaBar: "27-08-2026",
      logic: "Embeds fiscal year indicator with short month name for tax accounting statements."
    },
    {
      id: "16",
      code: "DATE-116",
      category: "Single-Digit Day & Month",
      raw: "46026",
      mask: "d/m/yyyy",
      formatted: "5/1/2026",
      formulaBar: "05-01-2026",
      logic: "Suppresses leading zeros for compact informal date logging."
    },
    {
      id: "17",
      code: "DATE-117",
      category: "Zero-Padded Day & Month",
      raw: "46026",
      mask: "dd/mm/yyyy",
      formatted: "05/01/2026",
      formulaBar: "05-01-2026",
      logic: "Enforces 2-digit padding across all rows to maintain uniform column character alignment."
    },
    {
      id: "18",
      code: "DATE-118",
      category: "Custom Time Suffix",
      raw: "0.583333",
      mask: 'hh:mm" hrs"',
      formatted: "14:00 hrs",
      formulaBar: "02:00:00 PM",
      logic: "Appends literal text ' hrs' to 24-hour time without turning the number into text."
    },
    {
      id: "19",
      code: "DATE-119",
      category: "Weekly Shift Stamp",
      raw: "46261",
      mask: 'dddd" Shift A"',
      formatted: "Thursday Shift A",
      formulaBar: "27-08-2026",
      logic: "Combines dynamic day of week with fixed work shift literal text."
    },
    {
      id: "20",
      code: "DATE-120",
      category: "Epoch Origin Boundary",
      raw: "1",
      mask: "dd-mmm-yyyy hh:mm",
      formatted: "01-Jan-1900 00:00",
      formulaBar: "01-01-1900",
      logic: "Displays day 1 of the Excel 1900 date system origin point."
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
              🎨 Date &amp; Time · Topic 7
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-[10px] font-semibold">
              Format Engineering
            </span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-[10px] font-semibold">
              Intermediate · Bloom Level 3: Apply
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-snug">
            Date &amp; Time Custom Formatting: Dates, Times, Quarters, Weekdays, and Dynamic Period Labels
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed max-w-5xl">
            Master date serial numbers, day/month/year tokens (<code className="text-cyan-300">dddd</code>, <code className="text-cyan-300">mmmm</code>, <code className="text-cyan-300">yyyy</code>), time clocks (<code className="text-cyan-300">hh:mm:ss AM/PM</code>), localized date tags (<code className="text-cyan-300">[$-409]</code>), and quarterly reporting masks. Prevent international date ambiguity and build publication-grade spreadsheets.
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
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 text-sm font-mono font-bold">📅</span>
                Interactive Master Workbook Practice &amp; Grid Inspection
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Inspect raw date serial numbers and formatted displays in the embedded interactive workbook viewer.
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
            sheetName="Topic7"
          />
        </section>

        {/* =========================================================================
            SECTION 3: 20 COMPREHENSIVE REAL-WORLD EXAMPLES TABLE
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 text-sm font-mono font-bold">📊</span>
                20 Real-World Date &amp; Time Formatting Scenarios
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Comparing raw stored float values, applied format masks, formatted visual cell displays, formula bar reality, and business rationale.
              </p>
            </div>
            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800 shrink-0 font-bold">
              20 Scenarios
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/70">
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Code &amp; Category</th>
                  <th className="py-2.5 px-3">Raw Stored Value</th>
                  <th className="py-2.5 px-3">Applied Format Mask</th>
                  <th className="py-2.5 px-3">Visual Formatted Cell</th>
                  <th className="py-2.5 px-3">Formula Bar Reality</th>
                  <th className="py-2.5 px-3 min-w-[280px]">Business Logic &amp; Why It Matters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {realWorldExamples.map((ex) => (
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
            SECTION 4: DEEP DIVE TECHNICAL MECHANICS & TOKEN ARCHITECTURE
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 text-sm font-mono font-bold">⚙️</span>
              Technical Architecture: Date Serials &amp; Format Tokens
            </h2>
            <span className="text-[11px] font-mono text-indigo-300 bg-indigo-950/60 px-2.5 py-0.5 rounded-lg border border-indigo-800">
              Core Engine
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
              <h3 className="font-bold text-sky-300 text-sm flex items-center gap-2">
                <span>🗓️</span> Date Integer Serial Engine
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Excel stores all dates as continuous integers counting days elapsed since <strong className="text-white">January 1, 1900</strong> (Serial 1). For example, August 27, 2026 is stored internally as integer <code className="text-amber-300">46261</code>.
              </p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-[11px] text-cyan-300 border border-slate-800">
                1 → 01-Jan-1900 | 46261 → 27-Aug-2026
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
              <h3 className="font-bold text-emerald-300 text-sm flex items-center gap-2">
                <span>⏰</span> Time Fractional Decimal Engine
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Time is stored as decimal fractions of a 24-hour day. <code className="text-amber-300">0.5</code> represents 12:00 PM (noon), <code className="text-amber-300">0.25</code> represents 6:00 AM, and <code className="text-amber-300">0.75</code> represents 6:00 PM.
              </p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-[11px] text-emerald-300 border border-slate-800">
                46261.604167 → 27-Aug-2026 14:30:00 (02:30 PM)
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
              Common Date Formatting Pitfalls &amp; Diagnostic Fixes
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
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-300">Month token displays as minutes</td>
                  <td className="py-2.5 px-3">Token 'm' follows hour token 'h' or 'hh' in format mask, causing Excel to interpret 'm' as minutes.</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">Separate date and time tokens cleanly: dd-mmm-yyyy hh:mm.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-300">US vs UK Date Ambiguity</td>
                  <td className="py-2.5 px-3">Using numeric 05/06/2026 causes confusion whether date is May 6 or June 5.</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">Use 3-letter month tokens: dd-mmm-yyyy (e.g. 05-Jun-2026).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-300">PivotTable date grouping fails</td>
                  <td className="py-2.5 px-3">User entered date as text string ('27th Aug 2026') instead of true numeric serial.</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">Enter raw date serial and apply custom format mask.</td>
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
            title="Date &amp; Time Custom Formatting - Mastery Q&amp;A"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 7: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[6] = el)} className="reveal-section">
          <Teacher
            note="Never allow ambiguous numeric dates on corporate financial reports! Always format dates with 3-letter month abbreviations (dd-mmm-yyyy) to prevent audit discrepancies between US and UK/Indian date standards."
          />
        </div>
      </div>
    </div>
  );
}
