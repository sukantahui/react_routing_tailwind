"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/002_006_introduction_to_pivot_tables_and_pivot_charts_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic1() {
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
    link.download = "pivot_tables_and_charts_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      <style>{`
        @keyframes fadeInSlide {
          from { transform: translateY(18px); }
          to { transform: translateY(0); }
        }
        .reveal-section {
          animation: fadeInSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="max-w-5xl mx-auto space-y-10">
        {/* =========================================================================
            SECTION 1: HERO HEADER & OVERVIEW
        ========================================================================= */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              {"📐 Flat Table Data Hygiene"} · Topic 1
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              {"Source Data Architecture"}
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              {"Intermediate · Bloom Level 3: Apply"}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            {"Preparing source data for Pivot Tables: Flat tables vs Matrix layouts"}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            {"Structuring and sanitizing source data into normalized flat tables (tabular format) versus unpivotable cross-tabulated 2D matrices"}. Master the complete architecture, field layouts, calculation settings, and interactive executive reporting standards.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Subject Code:</strong> EXCEL-PRO-901</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Module:</strong> Pivot Tables &amp; Pivot Charts</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Accreditation:</strong> Coder &amp; AccoTax Centre of Excellence</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: FORMULA & SYNTAX ANATOMY CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-300 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 text-base font-mono">⚡</span>
              Pivot Architecture &amp; Field Mechanics
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              Architecture Anatomy
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 font-mono text-sm sm:text-base text-sky-300 overflow-x-auto shadow-inner">
            {"Data Hygiene Standard: 1 Row = 1 Fact | 1 Col = 1 Attribute | No Blank Headers | No Merged Cells"}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Component / Quadrant</th>
                  <th className="py-3 px-4">Role / Type</th>
                  <th className="py-3 px-4">Requirement</th>
                  <th className="py-3 px-4">Operational Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Pivot Cache / Field List</td>
                  <td className="py-3 px-4 text-teal-400">In-Memory Engine</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Required</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Maintains compact snapshot of source table for sub-second cross-tabular aggregation.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Quadrants (Rows/Cols/Vals/Filters)</td>
                  <td className="py-3 px-4 text-teal-400">Layout Router</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Contextual</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Organizes dimensional grouping axes and numerical calculation measures dynamically.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Core Principle: </strong>
              PivotTables aggregate data from the In-Memory Pivot Cache at native C++ speed, enabling instant dynamic slicing without formula maintenance.
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL & THEORETICAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">🔬</span>
              Engine Architecture &amp; Execution Pipeline
            </h2>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Under-The-Hood Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div key="0" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">{"1. Normalized Flat Table Rules"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Every column must have a unique non-blank header; each row represents a single atomic transaction; no merged cells or summary total rows."}</p>
            </div>
            
            <div key="1" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">{"2. The 2D Matrix Anti-Pattern"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Spreading months across column headers (Jan, Feb, Mar) violates database normalization, forcing multiple value fields rather than clean dimensional slicing."}</p>
            </div>
            
            <div key="2" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">{"3. Excel Table Dynamic Source (Ctrl + T)"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Converting source ranges to official Excel Tables ensures new rows and columns automatically expand into the PivotTable source upon refresh."}</p>
            </div>
            
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 text-base font-mono">📐</span>
              Visual Dataflow: {"Data Normalization: 2D Matrix (Human Layout) vs Normalized Flat Table (Pivot Ready)"}
            </h2>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800">
              Pivot Architecture
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/80 flex flex-col items-center justify-center overflow-x-auto shadow-inner">
            <svg viewBox="0 0 820 220" className="w-full max-w-4xl h-auto text-slate-200 select-none font-sans">
              <defs>
                <linearGradient id="gradFlowMod6_1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.8" />
                </linearGradient>
                <marker id="arrowMod6_1" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8" />
                </marker>
              </defs>

              {/* Node 1: Source Flat Table */}
              <g transform="translate(30, 45)">
                <rect width="210" height="130" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                <rect x="12" y="12" width="186" height="26" rx="6" fill="#1e293b" />
                <text x="105" y="30" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Normalized Flat Source Table</text>
                <text x="105" y="75" textAnchor="middle" fill="#38bdf8" fontSize="14" fontFamily="monospace" fontWeight="bold">500,000 Rows</text>
                <text x="105" y="100" textAnchor="middle" fill="#64748b" fontSize="10">Clean Non-Blank Headers</text>
                <text x="105" y="118" textAnchor="middle" fill="#64748b" fontSize="10">Official Excel Table (Ctrl+T)</text>
              </g>

              <path d="M 245 110 L 305 110" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrowMod6_1)" fill="none" />

              {/* Node 2: Pivot Cache Engine */}
              <g transform="translate(315, 30)">
                <rect width="250" height="160" rx="14" fill="#0c4a6e" stroke="#0284c7" strokeWidth="2" />
                <rect x="14" y="14" width="222" height="28" rx="6" fill="#0369a1" />
                <text x="125" y="33" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">In-Memory Pivot Cache</text>
                <text x="125" y="75" textAnchor="middle" fill="#7dd3fc" fontSize="13" fontFamily="monospace" fontWeight="bold">{"Source Data Architecture"}</text>
                <text x="125" y="100" textAnchor="middle" fill="#bae6fd" fontSize="10">4-Quadrant Routing Engine</text>
                <text x="125" y="120" textAnchor="middle" fill="#bae6fd" fontSize="10">Sub-Second Cross-Tabulation</text>
                <text x="125" y="140" textAnchor="middle" fill="#38bdf8" fontSize="9" fontStyle="italic">Native OLAP Multidimensional</text>
              </g>

              <path d="M 570 110 L 630 110" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrowMod6_1)" fill="none" />

              {/* Node 3: Interactive Dashboard Matrix */}
              <g transform="translate(640, 45)">
                <rect width="150" height="130" rx="12" fill="#064e3b" stroke="#059669" strokeWidth="2" />
                <rect x="10" y="12" width="130" height="26" rx="6" fill="#047857" />
                <text x="75" y="30" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Executive Matrix</text>
                <text x="75" y="75" textAnchor="middle" fill="#6ee7b7" fontSize="14" fontFamily="monospace" fontWeight="bold">Slicer Connected</text>
                <text x="75" y="105" textAnchor="middle" fill="#a7f3d0" fontSize="10">Boardroom Ready</text>
              </g>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: INTERACTIVE SPREADSHEET & DIRECT DOWNLOAD PORTAL
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">📥</span>
                Interactive Spreadsheet &amp; Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the dataset below live in the browser or download the full module workbook to practice in Microsoft Excel.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              title="Download the full .xlsx practice workbook for this module"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="EX1102"
            title={"Preparing source data for Pivot Tables: Flat tables vs Matrix layouts - Interactive Practice Grid"}
            rowsPerPage={10}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 text-base font-mono">🏢</span>
              Real-World Corporate Implementation Scenarios
            </h2>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800">
              Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div key="0" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{"Case 1 · Chief Data Architect"}</span>
                <span className="text-xs font-mono text-slate-400">{"Barrackpore HQ"}</span>
              </div>
              <h3 className="font-bold text-white text-base">{"Swadeep Banerjee: Legacy Financial Matrix Unpivoting"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Transforms wide 12-month spreadsheet matrices into tall normalized 4-column tables (Date, Branch, Category, Revenue) for executive BI analysis."}</p>
            </div>
            
            <div key="1" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{"Case 2 · Statutory Auditor"}</span>
                <span className="text-xs font-mono text-slate-400">{"Shyamnagar Plant"}</span>
              </div>
              <h3 className="font-bold text-white text-base">{"Tuhina Mukherjee: Procurement Header Sanitization"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Eliminates merged cells and blank column headers across legacy vendor ledgers to enable pivot ingestion."}</p>
            </div>
            
            <div key="2" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{"Case 3 · Quality Control Lead"}</span>
                <span className="text-xs font-mono text-slate-400">{"Ichapur Works"}</span>
              </div>
              <h3 className="font-bold text-white text-base">{"Abhronila Das: Shift Machine Sensor Log Formatting"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Normalizes machine telemetry logs into flat tabular records to analyze failure frequencies."}</p>
            </div>
            
            <div key="3" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{"Case 4 · Logistics Analyst"}</span>
                <span className="text-xs font-mono text-slate-400">{"Naihati Logistics"}</span>
              </div>
              <h3 className="font-bold text-white text-base">{"Debangshu Roy: Waybill Manifest Range Conversion"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Converts static dispatch lists into dynamic Excel Tables (Ctrl + T) to automate weekly shipment reporting."}</p>
            </div>
            
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP PRACTICAL CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 text-base font-mono">🛠️</span>
              Step-by-Step Implementation &amp; Execution Guide
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              Execution Protocol
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-emerald-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 flex items-center justify-center text-xs">1</span>
                Step 1: Sanitize Source Data &amp; Convert to Table (Ctrl + T)
              </div>
              <p className="text-slate-300 leading-relaxed">
                Ensure every column has a unique non-blank header and no merged cells, then press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-xs text-sky-300">Ctrl + T</kbd> to create a dynamic Excel Table.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-sky-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-sky-950 border border-sky-700 text-sky-300 flex items-center justify-center text-xs">2</span>
                Step 2: Insert PivotTable &amp; Configure Quadrants
              </div>
              <p className="text-slate-300 leading-relaxed">
                Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-xs text-sky-300">Alt + N + V + T</kbd> to insert the PivotTable, then drag dimensions into Rows/Columns and numeric metrics into Values.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-teal-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-teal-950 border border-teal-700 text-teal-300 flex items-center justify-center text-xs">3</span>
                Step 3: Set Value Field Settings &amp; Number Formatting
              </div>
              <p className="text-slate-300 leading-relaxed">
                Right-click any value cell > Value Field Settings > Number Format, and apply standard currency/accounting masks.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-indigo-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 flex items-center justify-center text-xs">4</span>
                Step 4: Attach Slicers &amp; Lock Layout Options
              </div>
              <p className="text-slate-300 leading-relaxed">
                Insert visual Slicers, connect them via Report Connections, switch to Tabular Form, and uncheck 'Autofit column widths on update'.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: COMMON PITFALLS & TROUBLESHOOTING MATRIX
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 text-base font-mono">⚠️</span>
              Common Pitfalls &amp; Troubleshooting Matrix
            </h2>
            <span className="text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800">
              Diagnostic Fixes
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Problem / Error Signature</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Fix &amp; Prevention</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                
                <tr key="0" className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">{"Blank Header Field Error"}</td>
                  <td className="py-3 px-4">{"Creating a PivotTable on a range with an empty column header triggers the fatal 'The PivotTable field name is not valid' error."}</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">{"Ensure every single column in the source table has a clear, unique header name."}</td>
                </tr>
                
                <tr key="1" className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">{"Merged Cells Ingestion Failure"}</td>
                  <td className="py-3 px-4">{"Merged cells in source data corrupt row-by-row aggregation and cause fields to drop data."}</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">{"Unmerge all cells and fill down header/category labels."}</td>
                </tr>
                
                <tr key="2" className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">{"Including Total Rows in Source Range"}</td>
                  <td className="py-3 px-4">{"Selecting summary totals (e.g. Grand Total row) in the source range doubles all pivot aggregations."}</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">{"Exclude total and subtotal rows from the PivotTable source data range."}</td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: PRO TIPS & PRODUCTIVITY SHORTCUTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 text-base font-mono">💡</span>
              Pro Tips &amp; High-Speed Accelerators
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Productivity
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            
            <div key="0" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> {"Convert to Official Table"}
              </div>
              <p className="text-slate-300 leading-relaxed">{"Always convert source data to an official Excel Table before creating PivotTables."}</p>
              <kbd className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-cyan-300 mt-1">{"Ctrl + T"}</kbd>
            </div>
            
            <div key="1" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> {"Unmerge All Cells"}
              </div>
              <p className="text-slate-300 leading-relaxed">{"Strip all merged formatting from source tables before building pivot caches."}</p>
              <kbd className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-cyan-300 mt-1">{"Alt + H + M + C"}</kbd>
            </div>
            
            <div key="2" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> {"Fill Down Blanks"}
              </div>
              <p className="text-slate-300 leading-relaxed">{"Quickly populate repeated categorical labels down a column."}</p>
              <kbd className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-cyan-300 mt-1">{"F5 > Special > Blanks → =UpCell (Ctrl+Enter)"}</kbd>
            </div>
            
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC HINTS ("THINK ABOUT...")
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 text-base font-mono">🤔</span>
              Socratic Analytical Hints ("Think About...")
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Critical Thinking
            </span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-300">
            
            <div key="0" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 1: {"Why does having 'Jan, Feb, Mar' as column headers prevent deep PivotTable time intelligence?"}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Reflect on the multidimensional OLAP mechanics and dashboard interactivity principles.
              </p>
            </div>
            
            <div key="1" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 2: {"What causes the fatal error: 'The PivotTable field name is not valid'?"}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Reflect on the multidimensional OLAP mechanics and dashboard interactivity principles.
              </p>
            </div>
            
            <div key="2" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 3: {"Why is converting source data with Ctrl + T the #1 best practice for PivotTables?"}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Reflect on the multidimensional OLAP mechanics and dashboard interactivity principles.
              </p>
            </div>
            
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: FREQUENTLY ASKED QUESTIONS (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title={"Preparing source data for Pivot Tables: Flat tables vs Matrix layouts - Frequently Asked Questions"}
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={"Garbage in, garbage out! 90% of PivotTable errors are caused by poor source data structure. Always enforce normalized flat tables with zero blank headers and zero merged cells."}
          />
        </div>
      </div>
    </div>
  );
}
