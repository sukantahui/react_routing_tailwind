"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/002_001_tables_sorting_and_filtering_master.xlsx?url";
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
    link.download = "002_001_tables_sorting_and_filtering_master.xlsx";
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
        {/* SECTION 1: HERO HEADER & OVERVIEW */}
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
              Bloom's Level 2 &amp; 3: Understand &amp; Apply
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Sorting Data: Single-Column, Multi-Level Hierarchy & Custom List Sorting
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Master multi-tier data sorting in Excel. Explore single-column sort, multi-level hierarchy sorting, custom list ordering (e.g. Critical, High, Medium, Low), and case-sensitive sort options.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Multi-Level Sort:</strong> Alt + A + S + S Sort Dialog</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Custom Lists:</strong> Priority & Month Hierarchy Order</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Data Integrity:</strong> Contiguous Selection Guarantee</span>
            </div>
          </div>
        </header>

        {/* SECTION 2: FORMULA & SYNTAX ANATOMY CARD */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-300 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 text-base font-mono">⚡</span>
            Structured Referencing &amp; Table Syntax
          </h2>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 font-mono text-sm sm:text-base text-sky-300 overflow-x-auto shadow-inner">
            Excel Sort Shortcut: Alt + A + S + S  |  Dynamic Array: =SORTBY(tblData, tblData[Region], 1, tblData[Sales], -1)
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
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Sort By (Level 1)</td>
                  <td className="py-3 px-4 text-teal-400">Primary Criteria</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Mandatory</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">First column hierarchy rule (e.g. Region A to Z).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Then By (Level 2)</td>
                  <td className="py-3 px-4 text-teal-400">Secondary Criteria</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Optional</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Sub-sort rule applied when primary values are identical.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Custom List Order</td>
                  <td className="py-3 px-4 text-teal-400">Sort Rule</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Custom Order</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Enforces business priority lists (e.g. Critical → High → Medium → Low).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Structured Output: </strong>
              Multi-level sorting organizes complex datasets hierarchically without altering original raw cell data.
            </div>
          </div>
        </section>

        {/* SECTION 3: DEEP CONCEPTUAL & THEORETICAL MECHANICS */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">🔬</span>
            Multi-Tier Hierarchy Sorting & Custom List Mechanics
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>Sorting rearranges worksheet rows based on the contents of one or more columns.</p>
            <p>Multi-level sorting establishes a strict hierarchy: Excel sorts by Level 1 first, then breaks ties using Level 2, Level 3, etc.</p>
            <p>Custom List sorting overrides standard alphabetical order, allowing logical ordering like 'High', 'Medium', 'Low' or 'Jan', 'Feb', 'Mar'.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">Hierarchical Tie-Breaking</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Secondary and tertiary sort levels order matching items deterministically within primary categories.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-sky-300 uppercase tracking-wider">Custom Priority Ordering</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Custom lists enforce domain-specific business logic over raw alphabetical ASCII sorting.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 text-base font-mono">📐</span>
            Visual Architecture: Multi-Level Hierarchy & Custom List Sort Engine
          </h2>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-x-auto">
            <svg viewBox="0 0 800 260" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="m5_table_2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="m5_query_2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="m5_slicer_2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              <rect x="30" y="50" width="200" height="150" rx="12" fill="url(#m5_table_2)" stroke="#38bdf8" strokeWidth="2" />
              <text x="130" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">1. Unsorted Dataset</text>
              <text x="130" y="115" textAnchor="middle" fill="#e0f2fe" fontSize="11">Random Row Order</text>
              <text x="130" y="135" textAnchor="middle" fill="#e0f2fe" fontSize="11">Mixed Priorities</text>
              <text x="130" y="165" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">Raw Data</text>

              <path d="M 235 125 L 295 125" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="295,120 305,125 295,130" fill="#38bdf8" />

              <rect x="310" y="50" width="200" height="150" rx="12" fill="url(#m5_query_2)" stroke="#34d399" strokeWidth="2" />
              <text x="410" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">2. Sort Dialog Hierarchy</text>
              <text x="410" y="115" textAnchor="middle" fill="#d1fae5" fontSize="11">Level 1: Region (A-Z)</text>
              <text x="410" y="135" textAnchor="middle" fill="#d1fae5" fontSize="11">Level 2: Priority (Custom)</text>
              <text x="410" y="165" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">Multi-Level Sort</text>

              <path d="M 515 125 L 575 125" stroke="#34d399" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="575,120 585,125 575,130" fill="#34d399" />

              <rect x="590" y="50" width="180" height="150" rx="12" fill="url(#m5_slicer_2)" stroke="#a78bfa" strokeWidth="2" />
              <text x="680" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">3. Sorted Output</text>
              <text x="680" y="115" textAnchor="middle" fill="#ede9fe" fontSize="11">Categorized Hierarchy</text>
              <text x="680" y="135" textAnchor="middle" fill="#ede9fe" fontSize="11">Tie-Broken Records</text>
              <text x="680" y="165" textAnchor="middle" fill="#ddd6fe" fontSize="11" fontWeight="bold">Organized Grid</text>
            </svg>
          </div>
        </section>

        {/* SECTION 5: LIVE EXCEL PRACTICE GRID & DOWNLOAD PORTAL */}
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
            sheetName="EX103"
            title="Module 2.1 - Sorting Data: Single-Column, Multi-Level Hierarchy & Custom List Sorting"
            rowsPerPage={25}
            showSheetSelector={true}
          />
        </section>

        {/* SECTION 6: REAL-WORLD BUSINESS SCENARIOS (4+ CASES) */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 text-base font-mono">🏢</span>
            Real-World Business Scenarios (Bengal &amp; Corporate Applications)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">01</span>
                <h3 className="text-base font-bold text-white">Kolkata Customer Order Escalation Sorting</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Sorting support tickets by Region (A-Z), then Priority (Custom: Critical, High, Medium, Low), then Date.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Customer_ID</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Applied_Sort</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Sorted_Position</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">CUST-104</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Region → Priority → Date</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Row 4 (Critical Ticket)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Sort Dialog → Add Level → Custom List</div>
                <div className="text-emerald-400 font-semibold">Result: Urgent tickets listed at top.</div>
                <div className="text-slate-400 text-[11px]">Custom lists enforce operational urgency over alphabetical sort.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">02</span>
                <h3 className="text-base font-bold text-white">Barrackpore Academic Merit List Sorting</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Sorting student records by Stream (A-Z), then Total Marks (Descending).</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Student</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Sort_Levels</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Rank</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Tuhina Das</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Stream A-Z → Marks Desc</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Rank 1 (Science)</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Multi-Level Sort</div>
                <div className="text-emerald-400 font-semibold">Result: Merit order generated by stream.</div>
                <div className="text-slate-400 text-[11px]">Descending sort places top scores at top of list.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">03</span>
                <h3 className="text-base font-bold text-white">Shyamnagar Inventory SKU Priority Audit</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Sorting warehouse stock by Category, then Stock Level (Ascending).</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">SKU_Code</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Sort_Rule</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Audit_Alert</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">SKU-902</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Cat A-Z → Qty Asc</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Re-order Required</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Level 1 Category → Level 2 Stock Qty</div>
                <div className="text-emerald-400 font-semibold">Result: Depleted inventory items listed first.</div>
                <div className="text-slate-400 text-[11px]">Ascending sort highlights low stock items.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">04</span>
                <h3 className="text-base font-bold text-white">Ichapur Plant Quality Inspection Log</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Sorting machine calibration logs by Inspection Date (Newest to Oldest).</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Machine_ID</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Sort_Order</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Outcome</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">MCH-50</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Date Newest to Oldest</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Latest Audit First</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Date Sort (Descending)</div>
                <div className="text-emerald-400 font-semibold">Result: Recent audit logs displayed top.</div>
                <div className="text-slate-400 text-[11px]">Date sorting parses date serial integers accurately.</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: STEP-BY-STEP CALCULATION WALKTHROUGH */}
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
                <h3 className="text-sm font-bold text-white">Click Inside Target Table</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Select any cell inside the dataset range.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <h3 className="text-sm font-bold text-white">Open Sort Dialog (Alt + A + S + S)</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Press Alt + A + S + S or click Sort button in Data tab.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <div>
                <h3 className="text-sm font-bold text-white">Configure Level 1 & Level 2 Criteria</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Select Column, Sort On (Cell Values), and Order (A to Z or Descending).
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0">4</span>
              <div>
                <h3 className="text-sm font-bold text-white">Apply Custom List Ordering</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Choose Order → Custom List → Type 'Critical, High, Medium, Low' → Click OK.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: COMMON PITFALLS & TROUBLESHOOTING MATRIX */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 text-base font-mono">⚠️</span>
            Common Pitfalls &amp; Diagnostic Troubleshooting
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
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Sorting Distorts Data (Unsorted Columns Misaligned)</td>
                  <td className="py-3 px-4 text-slate-300">Partial selection sorted without expanding selection.</td>
                  <td className="py-3 px-4 text-amber-300">Verify if full dataset was selected.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Always select single cell inside contiguous range or use Excel Table.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Numbers Sort as Text (1, 10, 2, 20)</td>
                  <td className="py-3 px-4 text-slate-300">Numeric values stored as text strings.</td>
                  <td className="py-3 px-4 text-amber-300">Check for green error triangles on cells.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Convert text numbers to real numbers using Value option or *1.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Header Row Gets Sorted into Data Body</td>
                  <td className="py-3 px-4 text-slate-300">'My data has headers' checkbox was unchecked.</td>
                  <td className="py-3 px-4 text-amber-300">Inspect top row after sorting.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Ensure 'My data has headers' is checked in Sort dialog.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 9: PRO TIPS & PRODUCTIVITY SHORTCUTS */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 text-base font-mono">💡</span>
            Classroom Pro Tips &amp; High-Speed Shortcuts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + A + S + S
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Open Multi-Level Sort Dialog instantly.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + H + S + S
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Quick Sort Ascending (A to Z / Smallest to Largest).</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + H + S + O
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Quick Sort Descending (Z to A / Largest to Smallest).</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + A + C
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Clear active sort and filter rules.</p>
            </div>
          </div>
        </section>

        {/* SECTION 10: SOCRATIC ANALYTICAL HINTS ("THINK ABOUT...") */}
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
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why is converting data into an Excel Table the best defense against partial column sorting errors?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does a custom list override standard alphabetical sorting for priority levels?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">What happens when you apply dynamic =SORTBY() array formulas vs static desktop Excel sorting?</p>
            </div>
          </div>
        </section>

        {/* SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS) */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Sorting Data: Single-Column, Multi-Level Hierarchy & Custom List Sorting - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* SECTION 12: TEACHER'S NOTE & EXAM WISDOM */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            topicName="Sorting Data: Single-Column, Multi-Level Hierarchy & Custom List Sorting"
            noteTitle="Sukanta Hui's Master Mentor Guide"
            mentorAdvice="Always convert static data to an Excel Table before sorting! Tables guarantee that all columns stay synchronized, preventing disastrous data corruption caused by partial range selection!"
            note="Master multi-level hierarchy sorting! Use custom list ordering for business priorities like High, Medium, Low to build executive-ready reports!"
          />
        </div>
      </div>
    </div>
  );
}
