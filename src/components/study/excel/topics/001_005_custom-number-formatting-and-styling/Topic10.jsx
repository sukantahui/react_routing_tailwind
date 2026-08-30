"use client";

import React, { useState, useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/001_005_custom_number_formatting_and_styling_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic10_files/topic10_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic10() {
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

  const unitExamples = [
    {
      id: "1",
      code: "UNT-101",
      category: "Warehouse Steel Scrap Tonnage",
      raw: "8450.625",
      mask: '#,##0.00" KG"',
      formatted: "8,450.63 KG",
      formulaBar: "8450.625",
      logic: "Attaches engineering unit label without converting cell to text, allowing =SUM() to calculate total tonnage."
    },
    {
      id: "2",
      code: "UNT-102",
      category: "Software Subscriptions Quantity",
      raw: "450",
      mask: '#,##0" Licenses"',
      formatted: "450 Licenses",
      formulaBar: "450",
      logic: "Appends literal string ' Licenses' while maintaining numeric payload for pricing multiplication =B2*Price."
    },
    {
      id: "3",
      code: "UNT-103",
      category: "Corporate Department Prefix",
      raw: "Finance",
      mask: '"Dept: "@',
      formatted: "Dept: Finance",
      formulaBar: '"Finance"',
      logic: "Uses text placeholder token @ to prepend 'Dept: ' to text strings entered by users."
    },
    {
      id: "4",
      code: "UNT-104",
      category: "Shift Worked Hours Unit",
      raw: "48.5",
      mask: '0.0" Worked Hrs"',
      formatted: "48.5 Worked Hrs",
      formulaBar: "48.5",
      logic: "Appends unit label ' Worked Hrs' while allowing payroll multiplication =Hours*HourlyRate."
    },
    {
      id: "5",
      code: "UNT-105",
      category: "Liquid Chemical Storage Volume",
      raw: "1250.75",
      mask: '#,##0.0" Litres"',
      formatted: "1,250.8 Litres",
      formulaBar: "1250.75",
      logic: "Formats liquid chemical volume for factory tank level monitoring."
    },
    {
      id: "6",
      code: "UNT-106",
      category: "Retail Product Box Quantity",
      raw: "1200",
      mask: '#,##0" Cartons"',
      formatted: "1,200 Cartons",
      formulaBar: "1200",
      logic: "Appends ' Cartons' suffix while keeping raw integer for logistics pallet shipping calculations."
    },
    {
      id: "7",
      code: "UNT-107",
      category: "Data Center Bandwidth Speed",
      raw: "1000",
      mask: '#,##0" Mbps"',
      formatted: "1,000 Mbps",
      formulaBar: "1000",
      logic: "Displays network speed unit without converting number to string."
    },
    {
      id: "8",
      code: "UNT-108",
      category: "Power Generation Output",
      raw: "450.8",
      mask: '0.0" MW"',
      formatted: "450.8 MW",
      formulaBar: "450.8",
      logic: "Displays MegaWatts power unit for electricity grid monitoring."
    },
    {
      id: "9",
      code: "UNT-109",
      category: "Employee Surname Honorific Prefix",
      raw: "Banerjee",
      mask: '"Mr. "@',
      formatted: "Mr. Banerjee",
      formulaBar: '"Banerjee"',
      logic: "Uses text token @ to prepend formal honorific 'Mr. ' to surname payload."
    },
    {
      id: "10",
      code: "UNT-110",
      category: "Solar Array Surface Area",
      raw: "850",
      mask: '#,##0" Sq. Meters"',
      formatted: "850 Sq. Meters",
      formulaBar: "850",
      logic: "Appends area metric for real estate facilities management."
    },
    {
      id: "11",
      code: "UNT-111",
      category: "Corporate Client Code Suffix",
      raw: "Kolkata Corp",
      mask: '@" (Client)"',
      formatted: "Kolkata Corp (Client)",
      formulaBar: '"Kolkata Corp"',
      logic: "Uses text token @ to append trailing designation tag."
    },
    {
      id: "12",
      code: "UNT-112",
      category: "Construction Cement Bag Count",
      raw: "5000",
      mask: '#,##0" Bags"',
      formatted: "5,000 Bags",
      formulaBar: "5000",
      logic: "Formats raw inventory count with ' Bags' unit."
    },
    {
      id: "13",
      code: "UNT-113",
      category: "Server Storage Capacity",
      raw: "64",
      mask: '0" TB"',
      formatted: "64 TB",
      formulaBar: "64",
      logic: "Appends TerraByte storage unit for IT infrastructure provisioning."
    },
    {
      id: "14",
      code: "UNT-114",
      category: "Employee Leave Balance Suffix",
      raw: "14",
      mask: '0" Days"',
      formatted: "14 Days",
      formulaBar: "14",
      logic: "Appends ' Days' suffix on HR leave balance ledger."
    },
    {
      id: "15",
      code: "UNT-115",
      category: "Quality Control Defect Audit",
      raw: "0.0125",
      mask: '0.00%" (PPM Defect)"',
      formatted: "1.25% (PPM Defect)",
      formulaBar: "0.0125",
      logic: "Appends Quality Control audit suffix to percentage figure."
    },
    {
      id: "16",
      code: "UNT-116",
      category: "Hotel Occupancy Room Count",
      raw: "250",
      mask: '0" Rooms"',
      formatted: "250 Rooms",
      formulaBar: "250",
      logic: "Formats hotel occupancy unit for front-desk reservation management."
    },
    {
      id: "17",
      code: "UNT-117",
      category: "Pipeline Pressure Metric",
      raw: "140.5",
      mask: '0.0" PSI"',
      formatted: "140.5 PSI",
      formulaBar: "140.5",
      logic: "Displays pressure unit for gas utility pipeline monitoring."
    },
    {
      id: "18",
      code: "UNT-118",
      category: "Vehicle Fleet Fuel Efficiency",
      raw: "18.5",
      mask: '0.0" KM/L"',
      formatted: "18.5 KM/L",
      formulaBar: "18.5",
      logic: "Formats fuel efficiency metric for logistics fleet management."
    },
    {
      id: "19",
      code: "UNT-119",
      category: "Project Ticket Sequence ID",
      raw: "4092",
      mask: '"TICKET-#"00000',
      formatted: "TICKET-#04092",
      formulaBar: "4092",
      logic: "Appends literal string 'TICKET-#' to zero-padded ticket sequence number."
    },
    {
      id: "20",
      code: "UNT-120",
      category: "Campus Distance Transit Metric",
      raw: "15.2",
      mask: '0.0" KM"',
      formatted: "15.2 KM",
      formulaBar: "15.2",
      logic: "Appends ' KM' distance unit for transit calculation."
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
              🎨 Text &amp; Unit Tokens · Topic 10
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-[10px] font-semibold">
              Format Engineering
            </span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-[10px] font-semibold">
              Intermediate · Bloom Level 3: Apply
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-snug">
            Text Placeholder Tokens (@), Literals, and Unit Suffixes (KG, Units, Hrs) Without Breaking Math
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed max-w-5xl">
            Appending physical unit labels (<code className="text-cyan-300">0.00" KG"</code>, <code className="text-cyan-300">#,##0" Units"</code>), text tokens (<code className="text-cyan-300">"Dept: "@</code>), and literal prefixes without converting numeric cells to text strings. Preserve underlying cell math and build publication-grade spreadsheets.
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
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 text-sm font-mono font-bold">🏷️</span>
                Interactive Master Workbook Practice &amp; Grid Inspection
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Inspect raw numeric payloads vs unit-suffixed visual displays on worksheet tab Topic10.
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
            defaultSheetName="Topic10"
          />
        </section>

        {/* =========================================================================
            SECTION 3: 20 REAL-WORLD UNIT & TEXT TOKEN EXAMPLES
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 text-sm font-mono font-bold">📊</span>
                20 Real-World Unit Suffix &amp; Text Token (@) Scenarios
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Comparing raw stored cell payloads, applied unit masks, formatted visual cell displays, formula bar reality, and business rationale.
              </p>
            </div>
            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800 shrink-0 font-bold">
              20 Unit Scenarios
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/70">
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Code &amp; Category</th>
                  <th className="py-2.5 px-3">Raw Stored Payload</th>
                  <th className="py-2.5 px-3">Applied Format Mask</th>
                  <th className="py-2.5 px-3">Visual Formatted Cell</th>
                  <th className="py-2.5 px-3">Formula Bar Reality</th>
                  <th className="py-2.5 px-3 min-w-[280px]">Business Logic &amp; Why It Matters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {unitExamples.map((ex) => (
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
            SECTION 4: TECHNICAL ARCHITECTURE & TEXT TOKEN ENGINE
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 text-sm font-mono font-bold">⚙️</span>
              Technical Architecture: The Text Token (@) &amp; Quoted Suffix Engine
            </h2>
            <span className="text-[11px] font-mono text-indigo-300 bg-indigo-950/60 px-2.5 py-0.5 rounded-lg border border-indigo-800">
              Format Mechanics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
              <h3 className="font-bold text-sky-300 text-sm flex items-center gap-2">
                <span>🏷️</span> Quoted Suffixes on Numbers
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Enclosing text labels in double quotes (e.g. <code className="text-amber-300">#,##0.00" KG"</code>) instructs Excel's format engine to display unit labels visually while keeping the underlying cell value as a pure IEEE 754 float number.
              </p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-[11px] text-cyan-300 border border-slate-800">
                8450.625 + #,##0.00" KG" -&gt; "8,450.63 KG" (=SUM() Works!)
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
              <h3 className="font-bold text-emerald-300 text-sm flex items-center gap-2">
                <span>🔤</span> The Text Placeholder Token (@)
              </h3>
              <p className="text-slate-300 leading-relaxed">
                The <code className="text-amber-300">@</code> symbol in the 4th section of format syntax represents text strings entered into the cell. Using <code className="text-amber-300">"Dept: "@</code> automatically prepends 'Dept: ' to any text payload.
              </p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-[11px] text-emerald-300 border border-slate-800">
                "Finance" + "Dept: "@ -&gt; "Dept: Finance"
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
              Common Unit Suffix Pitfalls &amp; Diagnostic Fixes
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
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-300">#VALUE! error when summing unit column</td>
                  <td className="py-2.5 px-3">User typed text units directly into the cell ("50 KG") instead of using custom format masks.</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">Enter raw number 50 and apply format mask #,##0" KG".</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-300">Invalid Number Format error popup</td>
                  <td className="py-2.5 px-3">Unquoted literal text characters inside custom format string (e.g. #,##0 KG without quotes).</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">Enclose literal text words in double quotes: #,##0" KG".</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-300">Text token @ displays literally</td>
                  <td className="py-2.5 px-3">Enclosing @ inside quotes ("@") turns it into a literal @ symbol instead of a text placeholder.</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">Leave @ unquoted: "Dept: "@.</td>
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
            title="Text Tokens (@) &amp; Unit Suffixes - Mastery Q&amp;A"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 7: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[6] = el)} className="reveal-section">
          <Teacher
            note="Never type text units (like '50 KG') directly into cells! Use custom format masks like 0.00' KG' so your spreadsheets look professional while maintaining 100% mathematical integrity for SUM and AVERAGE formulas!"
          />
        </div>
      </div>
    </div>
  );
}
