"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/array_reshaping_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic3() {
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

  // Direct workbook download handler
  const handleDownload = () => {
    if (!sampleWorkbookUrl) return;
    const link = document.createElement("a");
    link.href = sampleWorkbookUrl;
    link.download = "array_reshaping_master_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-purple-500/30 selection:text-purple-200">
      {/* Scoped CSS Keyframes for Smooth Reveal Animation */}
      <style>{`
        @keyframes fadeInSlide {
          from {
            transform: translateY(18px);
          }
          to {
            transform: translateY(0);
          }
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
          className="reveal-section rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-700/60 text-purple-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ✂️ Row Slicing Engine · Topic 3
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze & Slice
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-indigo-300 to-sky-300 bg-clip-text text-transparent leading-tight">
            Extracting Specific Rows from Complex Arrays with CHOOSEROWS
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Extracting arbitrary, non-contiguous rows or dynamically sampling records from large database tables 
            previously required complex <code className="text-rose-300 font-mono">INDEX(Range, N({"{"}1;3;5{"}"}), ...)</code> array hacks. 
            The <code className="text-purple-300 font-mono font-bold">CHOOSEROWS</code> function enables high-performance row slicing, 
            empowering analysts to extract any combination of rows using both forward positive indexing (<code className="text-emerald-300 font-mono">1, 2...</code>) 
            and backwards negative indexing (<code className="text-amber-300 font-mono">-1, -2...</code>) with zero helper columns.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Arbitrary Row Extraction:</strong> Slices any rows by index</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Negative Indexing:</strong> <code className="text-amber-300 font-mono">-1</code> targets the final record dynamically</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Oversampling & Duplication:</strong> Repeat rows by repeating indices</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: FORMULA & SYNTAX ANATOMY CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6 hover:border-slate-700 transition-all duration-300"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">⚡</span> Formula Anatomy: =CHOOSEROWS()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Return: Subset 2D Matrix / Sliced Array
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-purple-300">
            <span className="text-slate-500">// Standard Syntax Prototype</span>
            <div className="mt-1 text-white font-bold">
              =CHOOSEROWS(<span className="text-amber-300">array</span>, <span className="text-emerald-300">row_num1</span>, <span className="text-slate-400">[row_num2]</span>, <span className="text-slate-400">...</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Example Usage (Extract 1st, 3rd, 5th, and Last row):</span>{" "}
              <span className="text-emerald-400 font-bold">=CHOOSEROWS(A2:G100, 1, 3, 5, -1)</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Behavior & Rules</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">array</td>
                  <td className="py-3 px-4 text-slate-300">Range / Matrix</td>
                  <td className="py-3 px-4 text-emerald-400">Required</td>
                  <td className="py-3 px-4 font-sans text-slate-300">The 2D table, range, or in-memory dynamic array from which rows are extracted.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-300">row_num1</td>
                  <td className="py-3 px-4 text-slate-300">Integer / Vector</td>
                  <td className="py-3 px-4 text-emerald-400">Required</td>
                  <td className="py-3 px-4 font-sans text-slate-300">
                    The 1-based index of the first row to return (positive for top-down, negative for bottom-up).
                  </td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-300">[row_num2]...</td>
                  <td className="py-3 px-4 text-slate-300">Integer / Vector</td>
                  <td className="py-3 px-4 text-slate-400">Optional</td>
                  <td className="py-3 px-4 font-sans text-slate-300">
                    Additional row indices to extract. Can be passed as separate arguments or as a single vector (e.g. <code className="text-amber-300 font-mono">{`{1, 3, 5}`}</code>).
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL & CALCULATION MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-emerald-400">🔬</span> Indexing Mechanics & Memory Optimization
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Bulk C++ Row Pointers
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Negative Indexing Resolution
              </h3>
              <p className="leading-relaxed">
                When you pass a negative integer like <code className="text-amber-300 font-mono">-1</code>, Excel evaluates the effective 1-based index internally as:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-amber-300">
                Effective_Index = Total_Rows + Negative_Index + 1
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                For a 35-row table: <code className="text-sky-300 font-mono">-1 &rarr; 35 + (-1) + 1 = Row 35</code> (the last row). This dynamic offset calculation runs in C++ without triggering extra worksheet recalculations.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Vector Argument Ingestion
              </h3>
              <p className="leading-relaxed">
                CHOOSEROWS accepts dynamic sequence vectors. By combining <code className="text-indigo-300 font-mono">CHOOSEROWS</code> with <code className="text-emerald-300 font-mono">SEQUENCE</code>, 
                you can generate mathematical sampling patterns (every Nth row, even rows, odd rows, or complete vertical matrix inversions).
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                =CHOOSEROWS(Table, SEQUENCE(5, 1, 1, 2)) &rarr; Slices Rows 1, 3, 5, 7, 9
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-indigo-400">⚡</span> Relational Slicing via XMATCH Integration
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              In relational database workflows, you frequently need to extract entire multi-column records for a specific list of Employee IDs. 
              Instead of dragging 10 <code className="text-slate-400 font-mono">VLOOKUP</code> formulas, combine CHOOSEROWS with <code className="text-sky-300 font-mono">XMATCH</code>:
              <br />
              <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                =CHOOSEROWS(MasterEmployeeTable, XMATCH({`{"EMP-101", "EMP-105", "EMP-110"}`}, MasterEmployeeTable[Emp_ID]))
              </code>
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">📐</span> Visual Row Indexing & Slicing Architecture
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Interactive Coordinate Map
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Understand how positive indices slice from the top and negative indices count from the bottom:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 340"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Glows */}
              <circle cx="150" cy="170" r="80" fill="#7C3AED" fillOpacity="0.05" />
              <circle cx="430" cy="170" r="80" fill="#6366F1" fillOpacity="0.05" />
              <circle cx="710" cy="170" r="80" fill="#10B981" fillOpacity="0.05" />

              {/* Master Table (Left) */}
              <rect x="30" y="30" width="240" height="280" rx="14" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="30" y="30" width="240" height="34" rx="14" fill="#7C3AED" fillOpacity="0.3" />
              <text x="150" y="52" fill="#C4B5FD" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">MASTER EMPLOYEE LEDGER (5 ROWS)</text>

              {/* Row 1 */}
              <rect x="45" y="74" width="210" height="32" rx="6" fill="#1E1B4B" stroke="#7C3AED" />
              <text x="55" y="94" fill="#38BDF8" fontSize="10" fontWeight="bold" fontFamily="monospace">+1</text>
              <text x="145" y="94" fill="#F8FAFC" fontSize="10" textAnchor="middle" fontFamily="monospace">EMP-101 · Swadeep · ₹85,000</text>

              {/* Row 2 */}
              <rect x="45" y="112" width="210" height="32" rx="6" fill="#0F172A" stroke="#334155" />
              <text x="55" y="132" fill="#94A3B8" fontSize="10" fontFamily="monospace">+2</text>
              <text x="145" y="132" fill="#64748B" fontSize="10" textAnchor="middle" fontFamily="monospace">EMP-102 · Tuhina · ₹78,000</text>

              {/* Row 3 */}
              <rect x="45" y="150" width="210" height="32" rx="6" fill="#1E1B4B" stroke="#7C3AED" />
              <text x="55" y="170" fill="#38BDF8" fontSize="10" fontWeight="bold" fontFamily="monospace">+3</text>
              <text x="145" y="170" fill="#F8FAFC" fontSize="10" textAnchor="middle" fontFamily="monospace">EMP-103 · Abhronila · ₹92,000</text>

              {/* Row 4 */}
              <rect x="45" y="188" width="210" height="32" rx="6" fill="#0F172A" stroke="#334155" />
              <text x="55" y="208" fill="#94A3B8" fontSize="10" fontFamily="monospace">+4</text>
              <text x="145" y="208" fill="#64748B" fontSize="10" textAnchor="middle" fontFamily="monospace">EMP-104 · Susmita · ₹98,000</text>

              {/* Row 5 */}
              <rect x="45" y="226" width="210" height="32" rx="6" fill="#1E1B4B" stroke="#F59E0B" />
              <text x="55" y="246" fill="#FBBF24" fontSize="10" fontWeight="bold" fontFamily="monospace">-1</text>
              <text x="145" y="246" fill="#F8FAFC" fontSize="10" textAnchor="middle" fontFamily="monospace">EMP-105 · Debangshu · ₹115k</text>

              <rect x="45" y="268" width="210" height="32" rx="6" fill="#7C3AED" fillOpacity="0.12" stroke="#7C3AED" strokeDasharray="3 3" />
              <text x="150" y="288" fill="#C4B5FD" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Negative Index -1 = Row 5 (Last)</text>

              {/* Arrow */}
              <path d="M 280 170 L 350 170" stroke="#A78BFA" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="355,170 345,165 345,175" fill="#A78BFA" />

              {/* Center Engine */}
              <rect x="360" y="60" width="210" height="220" rx="14" fill="#0F172A" stroke="#6366F1" strokeWidth="2" />
              <rect x="360" y="60" width="210" height="34" rx="14" fill="#4338CA" fillOpacity="0.4" />
              <text x="465" y="82" fill="#C7D2FE" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CHOOSEROWS ENGINE</text>

              <g transform="translate(370, 105)">
                <rect width="190" height="36" rx="6" fill="#1E1B4B" stroke="#6366F1" />
                <text x="95" y="22" fill="#E0E7FF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">=CHOOSEROWS(Data, 1, 3, -1)</text>
              </g>

              <text x="465" y="165" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Requested Rows:</text>
              <text x="465" y="185" fill="#A7F3D0" fontSize="10" textAnchor="middle" fontFamily="monospace">✓ Row 1: Swadeep (Top)</text>
              <text x="465" y="203" fill="#A7F3D0" fontSize="10" textAnchor="middle" fontFamily="monospace">✓ Row 3: Abhronila</text>
              <text x="465" y="221" fill="#FDE68A" fontSize="10" textAnchor="middle" fontFamily="monospace">✓ Row -1: Debangshu (Tail)</text>
              <text x="465" y="250" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Zero intermediate helper cells</text>

              {/* Arrow */}
              <path d="M 580 170 L 640 170" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="645,170 635,165 635,175" fill="#10B981" />

              {/* Output Spilled Subset (Right) */}
              <rect x="650" y="40" width="180" height="260" rx="14" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="650" y="40" width="180" height="34" rx="14" fill="#065F46" fillOpacity="0.4" />
              <text x="740" y="62" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SPILLED SUBSET (3 ROWS)</text>

              <rect x="660" y="86" width="160" height="30" rx="4" fill="#064E3B" stroke="#10B981" />
              <text x="740" y="105" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">EMP-101 · Swadeep</text>

              <rect x="660" y="124" width="160" height="30" rx="4" fill="#0F172A" stroke="#1E293B" />
              <text x="740" y="143" fill="#F8FAFC" fontSize="9" textAnchor="middle" fontFamily="monospace">EMP-103 · Abhronila</text>

              <rect x="660" y="162" width="160" height="30" rx="4" fill="#0F172A" stroke="#1E293B" />
              <text x="740" y="181" fill="#F8FAFC" fontSize="9" textAnchor="middle" fontFamily="monospace">EMP-105 · Debangshu</text>

              <rect x="660" y="210" width="160" height="70" rx="6" fill="#10B981" fillOpacity="0.12" stroke="#10B981" strokeDasharray="3 3" />
              <text x="740" y="235" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Spill Anchor: H2#</text>
              <text x="740" y="255" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">3 Rows x All Cols</text>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: LIVE EXCEL FILE LOADER & DIRECT DOWNLOAD BAR
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet & Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the employee master dataset below or download the master workbook to practice <code className="text-purple-300 font-mono">CHOOSEROWS</code> in Microsoft Excel.
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
              <span>Download Practice Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="Topic3_CHOOSEROWS"
            title="Employee Master Register (Barrackpore & Kolkata Campuses)"
            rowsPerPage={15}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-amber-400">🏢</span> Real-World Corporate Business Scenarios
            </h2>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800">
              Corporate Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Case 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · HR Audit Sampling</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Extracting Baseline & Latest Joined Staff
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Talent Lead <strong>Priya Chakraborty</strong> conducts compliance checks on staff onboarding. 
                Using <code className="text-amber-300 font-mono">=CHOOSEROWS(EmployeeTable, 1, -1)</code>, 
                she extracts the earliest employee (<code className="text-sky-300 font-mono">Row 1</code>: Swadeep) and newest recruit (<code className="text-amber-300 font-mono">Row -1</code>: Subham) in a 2-row executive summary table.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =CHOOSEROWS(A2:G16, 1, -1) &rarr; Instant Baseline & Latest Record
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Relational Multi-Key Profile Extraction</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar & Ichapur</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Instant Multi-Employee Relational Slicing
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Tax Consultant <strong>Abhronila Sengupta</strong> requires full records for staff IDs <code className="text-emerald-300 font-mono">{`{"EMP-101", "EMP-103", "EMP-105"}`}</code>. 
                Combining CHOOSEROWS with XMATCH: <code className="text-amber-300 font-mono">=CHOOSEROWS(EmpMaster, XMATCH(TargetIDs, EmpMaster[Emp_ID]))</code> pulls all columns without helper formulas.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Formula: =CHOOSEROWS(Data, XMATCH(IDs, ID_Col)) &rarr; Multi-Record Spill
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Systematic Audit Sampling</span>
                <span className="text-xs font-mono text-slate-400">Naihati Campus</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Extracting Every 3rd Employee for Quality Audit
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Internal Auditor <strong>Susmita Roy</strong> performs statutory quality checks on every 3rd employee record. 
                Using <code className="text-amber-300 font-mono">=CHOOSEROWS(EmpData, SEQUENCE(INT(ROWS(EmpData)/3), 1, 3, 3))</code>, 
                she dynamically samples rows 3, 6, 9, 12, and 15 without manual row picking.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Formula: =CHOOSEROWS(Data, SEQUENCE(5, 1, 3, 3)) &rarr; Step-3 Sample
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Case 4 · Top & Bottom Performance Pairing</span>
                <span className="text-xs font-mono text-slate-400">Titagarh Centre</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Extracting Highest & Lowest Salaried Engineers
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                DevOps Lead <strong>Debangshu Ghosh</strong> sorts the engineering ledger by salary. 
                He writes <code className="text-amber-300 font-mono">=CHOOSEROWS(SORT(DevTeam, 7, -1), 1, 2, -2, -1)</code> 
                to pull the top 2 highest earners alongside the 2 lowest earners into a single variance comparison card.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-sky-300">
                Formula: =CHOOSEROWS(SortedData, 1, 2, -2, -1) &rarr; Boundary Comparison
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">🪜</span> Step-by-Step Practical Calculation Walkthrough
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Systematic Slicing Workflow
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Inspect Table Structure & Total Row Count</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Identify your source range (e.g. <code className="text-amber-300 font-mono">A2:G16</code>). Determine which specific row numbers you need (e.g. Row 1, Row 3, and the final Row).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Construct the CHOOSEROWS Formula</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">I2</code>, enter: <code className="text-amber-300 font-mono">=CHOOSEROWS(A2:G16, 1, 3, 5, -1)</code>. 
                  Notice that <code className="text-amber-300 font-mono">-1</code> guarantees extraction of the last record regardless of table expansion.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Analyze the Multi-Column Spilled Subset</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press Enter. The formula returns a 4-row x 7-column table in cell <code className="text-emerald-300 font-mono">I2#</code>. 
                  All original columns (Emp_ID, Name, Dept, Salary, etc.) are preserved in their exact order.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-sky-950 border border-sky-700 text-sky-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Combine with Secondary Operations</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  To reorder columns of the sliced rows, wrap with CHOOSECOLS: <code className="text-emerald-300 font-mono">=CHOOSECOLS(I2#, 1, 2, 7)</code>.
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
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-rose-400">⚠️</span> Common Errors & Troubleshooting Matrix
            </h2>
            <span className="text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800">
              Error Diagnostic Protocol
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Error Code</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Verification</th>
                  <th className="py-3 px-4">Guaranteed Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE! (Zero Index)</td>
                  <td className="py-3 px-4 text-slate-300">Passing row index 0 to CHOOSEROWS.</td>
                  <td className="py-3 px-4 text-slate-400">Excel row indices start at 1 or -1; 0 is invalid.</td>
                  <td className="py-3 px-4 text-emerald-400">Change index 0 to 1 (top row) or -1 (bottom row).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE! (Out of Bounds)</td>
                  <td className="py-3 px-4 text-slate-300">Requested row index (e.g. 50) exceeds total rows (15).</td>
                  <td className="py-3 px-4 text-slate-400">Check index against <code className="text-amber-300 font-mono">ROWS(array)</code>.</td>
                  <td className="py-3 px-4 text-emerald-400">Use <code className="text-sky-300 font-mono">MIN(ROWS(Data), Index)</code> to clamp coordinates.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#SPILL!</td>
                  <td className="py-3 px-4 text-slate-300">Destination cells occupied by existing values or merged formatting.</td>
                  <td className="py-3 px-4 text-slate-400">Click error float tag &rarr; 'Select Obstructing Cells'.</td>
                  <td className="py-3 px-4 text-emerald-400">Clear obstructing cells to allow unobstructed multi-column spill.</td>
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
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">💡</span> High-Speed Keyboard Shortcuts & Pro Tips
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Expert Modeler Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-purple-400 font-mono font-bold">-1, -2</span>
                <span>Tail Audit Sampling</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always use negative indexing to target the most recently appended records: <code className="text-amber-300 font-mono">=CHOOSEROWS(Ledger, -1)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">SEQUENCE()</span>
                <span>Invert Entire Matrix</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Flip any table vertically from bottom to top: <code className="text-emerald-300 font-mono">=LET(d, Data, CHOOSEROWS(d, SEQUENCE(ROWS(d), 1, ROWS(d), -1)))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">XMATCH()</span>
                <span>Relational Multi-Row Lookups</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Replace 10 separate VLOOKUPs: <code className="text-amber-300 font-mono">=CHOOSEROWS(Table, XMATCH(TargetKeys, Table[ID]))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">F9</kbd>
                <span>Inspect Sliced Sub-Array</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight the CHOOSEROWS formula and press <strong>F9</strong> to preview the sliced matrix in RAM before committing.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC ANALYTICAL HINTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-teal-400">🤔</span> Socratic Analytical Reflection
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Analytical Inquiries
            </span>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Contrast positional vs conditional extraction:</strong> When would you choose <code className="text-purple-300 font-mono">CHOOSEROWS</code> over <code className="text-emerald-300 font-mono">FILTER</code>? In what scenario is positional indexing far more reliable than content matching?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine matrix oversampling:</strong> What happens when you write <code className="text-amber-300 font-mono">=CHOOSEROWS(Table, 1, 1, 2, 2, 3, 3)</code>? How can this behavior be utilized to duplicate template rows for multi-period budgeting?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Think about out-of-bounds safety:</strong> If you pass <code className="text-amber-300 font-mono">row_num = 100</code> on a 50-row table, Excel returns <code className="text-rose-400 font-mono">#VALUE!</code>. How can you wrap the row index with <code className="text-sky-300 font-mono">MIN()</code> to prevent formula breakdown?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Extracting Rows with CHOOSEROWS — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "CHOOSEROWS is an indispensable utility for enterprise financial audits and multi-scenario modeling. By mastering negative indexing (index -1), you can build indestructible audit cards that automatically capture the latest posted transaction without needing dynamic row counters. Pair CHOOSEROWS with XMATCH to build blazing-fast multi-key relational queries without writing dozens of repetitive VLOOKUPs!"
            }
          />
        </div>
      </div>
    </div>
  );
}
