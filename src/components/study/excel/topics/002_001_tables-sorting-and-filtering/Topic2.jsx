"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/tables_sorting_filtering.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic2() {
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
    link.download = "tables_sorting_filtering_practice.xlsx";
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
              📑 Structured Tables · Topic 2
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Intermediate
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 2 & 3: Understand & Apply
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Sorting Data: Single-Column, Multi-Level Hierarchy and Custom List Sorting
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Master data sorting in Excel: Single-column A-Z / Z-A sorting, Multi-Level sorting hierarchies (Sort by Region, then Department, then Salary Descending), Custom List sorting (e.g. High, Medium, Low / Jan to Dec), Case-Sensitive sorting, and Left-to-Right column sorting.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Structured Syntax:</strong> [@Column] Relational Math</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Filter Subtotals:</strong> SUBTOTAL(109) Recalculation</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Interactive Slicers:</strong> 1-Click Dashboard UI</span>
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
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 text-base font-mono">⚡</span>
            Structured Referencing & Table Syntax
          </h2>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 font-mono text-sm sm:text-base text-sky-300 overflow-x-auto shadow-inner">
            =SORT(tblEmployees, {3, 4, 5}, {1, 1, -1})
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Component</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Requirement</th>
                  <th className="py-3 px-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 font-mono">
                
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Level 1 (Primary Key)</td>
                  <td className="py-3 px-4 text-teal-400">Top Hierarchy</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Mandatory</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">First sort rule (e.g. Region: Barrackpore, Kolkata, Shyamnagar).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Level 2 (Secondary Key)</td>
                  <td className="py-3 px-4 text-teal-400">Sub-Hierarchy</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Optional</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Breaks ties within Level 1 (e.g. Department: Accounts, IT, Sales).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Level 3 (Tertiary Key)</td>
                  <td className="py-3 px-4 text-teal-400">Value Rank</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Optional</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Orders records within Level 2 (e.g. Monthly Salary: Largest to Smallest).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Structured Output: </strong>
              Evaluates to a <span className="text-sky-300 font-semibold">Ordered Multi-Key Array / In-Place Sorted Table</span> that expands dynamically with data volume.
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
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">🔬</span>
            Relational Data Architecture & Query Mechanics
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>Multi-level sorting applies a lexicographical sorting algorithm: records are first sorted by Rule 1; any ties are resolved by Rule 2, and subsequent ties by Rule 3.</p>
            <p>Custom List sorting allows non-alphabetical ordering (e.g. 'Founder, Director, Manager, Senior Analyst, Intern' or 'High, Medium, Low').</p>
            <p>Sorting must always be performed on contiguous tabular blocks with headers; sorting a single highlighted column without expanding selection destroys data integrity by scrambling rows.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">Dynamic Boundary Self-Healing</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Excel Tables automatically expand their coordinate boundaries upon row entry, extending formulas and formats without manual drag.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-sky-300 uppercase tracking-wider">Filter-Aware Subtotals</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Total Rows leverage =SUBTOTAL(109) to ignore hidden filtered rows, guaranteeing that visible summaries match screen views.
              </p>
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
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 text-base font-mono">📐</span>
            Visual Architecture: Multi-Level Hierarchical Sorting Algorithm (Primary -&gt; Secondary -&gt; Tertiary)
          </h2>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-x-auto">
            <svg viewBox="0 0 800 260" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="m5_table" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="m5_query" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="m5_slicer" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              <rect x="30" y="50" width="200" height="150" rx="12" fill="url(#m5_table)" stroke="#38bdf8" strokeWidth="2" />
              <text x="130" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">1. Excel Table (Ctrl+T)</text>
              <text x="130" y="115" textAnchor="middle" fill="#e0f2fe" fontSize="11">Headers: tblStudents</text>
              <text x="130" y="135" textAnchor="middle" fill="#e0f2fe" fontSize="11">Syntax: [@Course_Fee]</text>
              <text x="130" y="165" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">Auto-Expanding Grid</text>

              <path d="M 235 125 L 295 125" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="295,120 305,125 295,130" fill="#38bdf8" />

              <rect x="310" y="50" width="200" height="150" rx="12" fill="url(#m5_query)" stroke="#34d399" strokeWidth="2" />
              <text x="410" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">2. Filter & Sort Engine</text>
              <text x="410" y="115" textAnchor="middle" fill="#d1fae5" fontSize="11">Multi-Level Sorting</text>
              <text x="410" y="135" textAnchor="middle" fill="#d1fae5" fontSize="11">Advanced Boolean Logic</text>
              <text x="410" y="165" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">SUBTOTAL(109)</text>

              <path d="M 515 125 L 575 125" stroke="#34d399" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="575,120 585,125 575,130" fill="#34d399" />

              <rect x="590" y="50" width="180" height="150" rx="12" fill="url(#m5_slicer)" stroke="#a78bfa" strokeWidth="2" />
              <text x="680" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">3. Interactive UI</text>
              <text x="680" y="115" textAnchor="middle" fill="#ede9fe" fontSize="11">1-Click Slicer Buttons</text>
              <text x="680" y="135" textAnchor="middle" fill="#ede9fe" fontSize="11">Multi-Select Filtering</text>
              <text x="680" y="165" textAnchor="middle" fill="#ddd6fe" fontSize="11" fontWeight="bold">No-Code Dashboard</text>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: LIVE EXCEL PRACTICE GRID & DOWNLOAD PORTAL
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">📥</span>
                Interactive Spreadsheet & Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Interact with the dataset live below or download the master chapter workbook to practice locally in desktop Excel.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              title="Download full .xlsx master workbook for Module 2.1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Practice Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="Topic2_Multi_Sort"
            title="Module 2.1 - Sorting Data: Single-Column, Multi-Level Hierarchy and Custom List Sorting"
            rowsPerPage={25}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS (4+ CASES)
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 text-base font-mono">🏢</span>
            Real-World Business Scenarios (Bengal & Corporate Applications)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">01</span>
                <h3 className="text-base font-bold text-white">Kolkata Corporate Multi-Tier Compensation Sort</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Sorting 500 corporate employees: 1. Branch A-Z, 2. Department A-Z, 3. Salary Descending.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Sort_Level</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Column_Target</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Sort_Order</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Resulting_Hierarchy</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Level 1</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Branch</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">A to Z</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Barrackpore grouped first, then Kolkata, then Shyamnagar</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Level 2</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Department</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">A to Z</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Within Barrackpore: Accounts first, then IT, then Sales</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Level 3</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Monthly_Salary</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Largest to Smallest</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Highest paid executive in IT appears top of IT group</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Data -&gt; Sort (Alt + D + S) Multi-Level Dialog</div>
                <div className="text-emerald-400 font-semibold">Result: Clean 3-tier organized compensation audit register.</div>
                <div className="text-slate-400 text-[11px]">Multi-level sorting groups categories while ranking numerical values within groups.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">02</span>
                <h3 className="text-base font-bold text-white">Barrackpore Priority Incident Ticket Custom List Sorting</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Sorting customer support tickets by priority: 'Critical' -&gt; 'High' -&gt; 'Medium' -&gt; 'Low' (non-alphabetical).</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Priority_Level</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Alphabetical_Order (Wrong)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Custom_List_Order (Correct)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Critical</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Critical (#1)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Critical (#1)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">High</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">High (#2)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">High (#2)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Low</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Low (#3 - Misordered before Medium)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Medium (#3)</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Medium</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Medium (#4)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Low (#4)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Sort -&gt; Order -&gt; Custom List -&gt; {Critical, High, Medium, Low}</div>
                <div className="text-emerald-400 font-semibold">Result: Tickets sorted by true operational urgency.</div>
                <div className="text-slate-400 text-[11px]">Custom lists enforce business logic over raw alphabetical sorting.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">03</span>
                <h3 className="text-base font-bold text-white">Shyamnagar Regional Retail Shift Schedule Left-to-Right Sort</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Sorting a horizontal 12-month budget table chronologically from April to March (Indian Financial Year).</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Sort_Orientation</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Sort_Options</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Outcome</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Sort Left to Right</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Options -&gt; Sort Left to Right -&gt; Row 2 (Month)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Columns arranged Apr, May, Jun ... Mar</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Sort Left to Right (Horizontal Sort)</div>
                <div className="text-emerald-400 font-semibold">Result: Horizontal columns sorted chronologically across worksheet.</div>
                <div className="text-slate-400 text-[11px]">Excel allows sorting columns horizontally as well as rows vertically.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">04</span>
                <h3 className="text-base font-bold text-white">Ichapur Plant Machine Maintenance Case-Sensitive Tag Sort</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Separating uppercase production codes (MCH-A) from lowercase test codes (mch-a).</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Tag_Input</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Case_Sensitive_Sort</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Grouping</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">MCH-A, mch-a, MCH-B</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Options -&gt; Case Sensitive checked</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">All uppercase capital machines grouped first</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Case-Sensitive Sorting</div>
                <div className="text-emerald-400 font-semibold">Result: Strict differentiation of production vs experimental equipment.</div>
                <div className="text-slate-400 text-[11px]">Case-sensitive sorting distinguishes distinct ASCII/Unicode cases.</div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 text-base font-mono">🪜</span>
            Step-by-Step Practical Implementation Guide
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-300 text-xs font-bold flex items-center justify-center shrink-0">1</span>
              <div>
                <h3 className="text-sm font-bold text-white">Convert Range to Structured Table</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Click inside dataset. Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Ctrl + T</kbd> &rarr; Check 'My table has headers' &rarr; Click OK. Rename table in Table Design tab.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <h3 className="text-sm font-bold text-white">Input Structured Formula & Enable Total Row</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Type <code className="text-amber-300 font-mono">=[@Fee] * 0.18</code> in calculated column. Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Ctrl + Shift + T</kbd> to activate Total Row.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <div>
                <h3 className="text-sm font-bold text-white">Configure Multi-Level Sort Hierarchy</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Alt + D + S</kbd> to open Sort dialog. Add Level 1 (Branch), Level 2 (Department), and Level 3 (Total Marks Descending).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0">4</span>
              <div>
                <h3 className="text-sm font-bold text-white">Insert & Format Interactive Slicers</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Go to Table Design &rarr; <strong>Insert Slicer</strong> &rarr; Select Branch and Department. Set Slicer Columns to 4 and align horizontally.
                </p>
              </div>
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
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 text-base font-mono">⚠️</span>
            Common Pitfalls & Diagnostic Troubleshooting
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Error / Symptom</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Check</th>
                  <th className="py-3 px-4">Foolproof Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Scrambled Data from Single-Column Selection Sort</td>
                  <td className="py-3 px-4 text-slate-300">Selecting Column C alone and clicking Sort without expanding selection.</td>
                  <td className="py-3 px-4 text-amber-300">Column C is sorted while Names and IDs in Columns A and B remain in place, corrupting records.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Always choose 'Expand the Selection' when prompted, or convert data to an Excel Table (Ctrl+T).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Blank Rows Breaking Sort Range</td>
                  <td className="py-3 px-4 text-slate-300">An empty blank row in row 25 causes Excel to sort only rows 1 to 24.</td>
                  <td className="py-3 px-4 text-amber-300">Bottom half of dataset remains unsorted.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Ensure table is contiguous without blank divider rows.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Text Numbers Sorting Alphabetically (1, 10, 2, 20)</td>
                  <td className="py-3 px-4 text-slate-300">Numbers stored as text sort lexicographically (1, 10, 100, 2, 20).</td>
                  <td className="py-3 px-4 text-amber-300">Number 2 appears after 100.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Convert text numbers to real numeric values.</td>
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
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 text-base font-mono">💡</span>
            Classroom Pro Tips & High-Speed Shortcuts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + D + S
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Open Multi-Level Sort dialog box.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + A + S + A
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Quick Sort Ascending (A to Z / Smallest to Largest).</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + A + S + D
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Quick Sort Descending (Z to A / Largest to Smallest).</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + Shift + L
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Toggle AutoFilter arrows with built-in 1-click sort menus.</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC ANALYTICAL HINTS ("THINK ABOUT...")
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 text-base font-mono">🤔</span>
            Socratic Analytical Hints ("Think About...")
          </h2>

          <div className="space-y-3">
            
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why does sorting numbers stored as text result in the sequence 1, 10, 100, 2, 20?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does creating a Custom List allow you to sort company job designations in organizational hierarchy order?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why is converting data to an Excel Table (Ctrl+T) the most effective defense against accidental single-column scramble bugs?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Sorting Data: Single-Column, Multi-Level Hierarchy and Custom List Sorting - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="Never highlight a single column to sort! If you ignore Excel's warning to expand selection, your customer names will attach to the wrong bank balances, corrupting your entire database! Always click ONE single cell inside the column and press Alt+A+S+A, or use an Excel Table!"
          />
        </div>
      </div>
    </div>
  );
}
