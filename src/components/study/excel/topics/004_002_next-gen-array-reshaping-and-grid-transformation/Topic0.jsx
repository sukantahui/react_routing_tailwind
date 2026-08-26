"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/array_reshaping_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic0() {
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
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-sky-500/30 selection:text-sky-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              📐 Array Reshaping & Grid Transformation · Topic 0
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze & Reshape
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Overview of Excel 365 Array Manipulation & Reshaping Functions
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Historically, transforming spreadsheet dimensions required convoluted <code className="text-rose-300 font-mono">INDEX/OFFSET/ROW</code> formulas, 
            volatile helper grids, or custom VBA loops. Excel 365 introduces a revolutionary suite of 
            <strong className="text-sky-300"> 11 native array reshaping functions</strong> that manipulate matrices entirely in RAM, 
            empowering financial modelers and data engineers to flatten, slice, stack, unpivot, and reshape grids dynamically without altering raw underlying tables.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Zero Helper Grids:</strong> Pure in-memory vectorization</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Non-Volatile Speed:</strong> Lightning-fast C++ calculation</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Universal Stacking:</strong> Seamless vertical & horizontal unions</span>
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
              <span className="text-sky-400">⚡</span> The 11 Core Array Reshaping Functions
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Engine Spec: Dynamic Matrix Vectorization
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            The array reshaping functions can be systematically categorized into 5 distinct architectural families based on their dimensional transformation mechanics:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Function</th>
                  <th className="py-3 px-4">Family / Category</th>
                  <th className="py-3 px-4">Standard Syntax</th>
                  <th className="py-3 px-4">Input &rarr; Output Shape</th>
                  <th className="py-3 px-4">Primary Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-300">TOCOL</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Vector Flattening</td>
                  <td className="py-3 px-4 text-amber-300">=TOCOL(array, [ignore], [scan])</td>
                  <td className="py-3 px-4 font-sans text-emerald-400">2D Matrix &rarr; 1D Column</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Flattens cross-tab schedules into a single vertical list.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-teal-300">TOROW</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Vector Flattening</td>
                  <td className="py-3 px-4 text-amber-300">=TOROW(array, [ignore], [scan])</td>
                  <td className="py-3 px-4 font-sans text-emerald-400">2D Matrix &rarr; 1D Row</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Unpivots multi-column tables into a horizontal banner stream.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-indigo-300">CHOOSEROWS</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Slicing & Subsetting</td>
                  <td className="py-3 px-4 text-amber-300">=CHOOSEROWS(array, r1, [r2]...)</td>
                  <td className="py-3 px-4 font-sans text-indigo-400">2D Matrix &rarr; Subset Rows</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Extracts custom row slices via positive or negative indexes.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-300">CHOOSECOLS</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Slicing & Subsetting</td>
                  <td className="py-3 px-4 text-amber-300">=CHOOSECOLS(array, c1, [c2]...)</td>
                  <td className="py-3 px-4 font-sans text-indigo-400">2D Matrix &rarr; Reordered Cols</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Extracts and reorders database columns dynamically.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-300">TAKE</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Boundary Slicing</td>
                  <td className="py-3 px-4 text-amber-300">=TAKE(array, rows, [cols])</td>
                  <td className="py-3 px-4 font-sans text-emerald-400">2D Matrix &rarr; Boundary Block</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Extracts Top N or Bottom N records from tables.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">DROP</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Boundary Exclusion</td>
                  <td className="py-3 px-4 text-amber-300">=DROP(array, rows, [cols])</td>
                  <td className="py-3 px-4 font-sans text-amber-400">2D Matrix &rarr; Trimmed Body</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Strips metadata banners, headers, or totals rows.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-orange-300">EXPAND</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Matrix Resizing</td>
                  <td className="py-3 px-4 text-amber-300">=EXPAND(array, rows, [cols], [pad])</td>
                  <td className="py-3 px-4 font-sans text-orange-400">Small Matrix &rarr; Padded Grid</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Pads disparate branch tables to identical dimensions.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-cyan-300">WRAPROWS</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Stream Shaping</td>
                  <td className="py-3 px-4 text-amber-300">=WRAPROWS(vector, count, [pad])</td>
                  <td className="py-3 px-4 font-sans text-cyan-400">1D Vector &rarr; 2D Matrix (Row-wise)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Wraps continuous text feeds into multi-column tabular rows.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-blue-300">WRAPCOLS</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Stream Shaping</td>
                  <td className="py-3 px-4 text-amber-300">=WRAPCOLS(vector, count, [pad])</td>
                  <td className="py-3 px-4 font-sans text-blue-400">1D Vector &rarr; 2D Matrix (Col-wise)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Wraps continuous data streams into fixed-height column blocks.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-violet-300">VSTACK</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Array Stacking</td>
                  <td className="py-3 px-4 text-amber-300">=VSTACK(array1, [array2]...)</td>
                  <td className="py-3 px-4 font-sans text-violet-400">Multiple Tables &rarr; Consolidated Ledger</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Appends multiple branch tables vertically into one matrix.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-fuchsia-300">HSTACK</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Array Stacking</td>
                  <td className="py-3 px-4 text-amber-300">=HSTACK(array1, [array2]...)</td>
                  <td className="py-3 px-4 font-sans text-fuchsia-400">Multiple Columns &rarr; Wide Table</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Combines separate calculation vectors side-by-side.</td>
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
              <span className="text-emerald-400">🔬</span> Conceptual & Computational Mechanics
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Zero-Copy Memory Transformation
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-sky-400">1.</span> In-Memory Vectorization
              </h3>
              <p className="leading-relaxed">
                When you pass a range like <code className="text-amber-300 font-mono">B2:F20</code> into <code className="text-sky-300 font-mono">TOCOL</code> or <code className="text-indigo-300 font-mono">CHOOSEROWS</code>, 
                Excel creates an ephemeral 2D contiguous memory buffer in RAM. Rather than calculating cell-by-cell formulas across 100 cells, 
                Excel's multi-threaded calculation engine processes pointers directly to the source coordinates.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800">
                <strong>Memory Architecture:</strong> Source Range &rarr; C++ Memory Buffer &rarr; Matrix Transformation Algorithm &rarr; Dynamic Spilled Range.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Seamless Composability
              </h3>
              <p className="leading-relaxed">
                Because reshaping functions return pure in-memory arrays (rather than range objects), they can be chained indefinitely. 
                You can consolidate three regional branches with <code className="text-violet-300 font-mono">VSTACK</code>, 
                filter out inactive rows with <code className="text-emerald-300 font-mono">FILTER</code>, 
                reorder the presentation columns with <code className="text-purple-300 font-mono">CHOOSECOLS</code>, 
                and sort by revenue with <code className="text-sky-300 font-mono">SORT</code>—all in a single formula cell.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                =SORT(CHOOSECOLS(FILTER(VSTACK(T1, T2, T3), Criteria), 1, 3, 5), 3, -1)
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
            <h3 className="font-bold text-white text-base mb-3 flex items-center gap-2">
              <span className="text-amber-400">⚙️</span> Negative Indexing Mechanics: Why It Matters
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Functions like <code className="text-indigo-300 font-mono">CHOOSEROWS</code>, <code className="text-purple-300 font-mono">CHOOSECOLS</code>, <code className="text-emerald-300 font-mono">TAKE</code>, and <code className="text-amber-300 font-mono">DROP</code> 
              support <strong>negative integer indexing</strong>. While positive indices count from the beginning (index 1 = first item), negative indices count from the terminus (index -1 = last item, -2 = second last). 
              This provides bulletproof dynamic resilience: even as new rows are logged or columns are added, <code className="text-amber-300 font-mono">CHOOSEROWS(Table, -1)</code> always returns the most recent entry without recalculating total row counts.
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
              <span className="text-indigo-400">📐</span> Visual Architecture: 2D Grid Transformation Pipeline
            </h2>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800">
              Interactive Architectural Map
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Examine how raw multidimensional data undergoes structural transformation through vectorization, slicing, stream wrapping, and consolidation:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 360"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background Glows */}
              <circle cx="150" cy="180" r="100" fill="#0284C7" fillOpacity="0.05" />
              <circle cx="450" cy="180" r="100" fill="#6366F1" fillOpacity="0.05" />
              <circle cx="720" cy="180" r="100" fill="#10B981" fillOpacity="0.05" />

              {/* Block 1: Raw 2D Cross-Tab Matrix */}
              <rect x="30" y="50" width="200" height="260" rx="14" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="30" y="50" width="200" height="38" rx="14" fill="#0369A1" fillOpacity="0.3" />
              <text x="130" y="74" fill="#38BDF8" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">RAW 2D DATA MATRIX</text>

              {/* Mini Table Grid */}
              <rect x="45" y="100" width="80" height="24" rx="4" fill="#1E293B" stroke="#334155" />
              <text x="85" y="116" fill="#94A3B8" fontSize="10" textAnchor="middle" fontFamily="monospace">Q1_Sales</text>
              <rect x="135" y="100" width="80" height="24" rx="4" fill="#1E293B" stroke="#334155" />
              <text x="175" y="116" fill="#94A3B8" fontSize="10" textAnchor="middle" fontFamily="monospace">Q2_Sales</text>

              <rect x="45" y="132" width="80" height="24" rx="4" fill="#0F172A" stroke="#334155" />
              <text x="85" y="148" fill="#F8FAFC" fontSize="11" textAnchor="middle" fontFamily="monospace">145,000</text>
              <rect x="135" y="132" width="80" height="24" rx="4" fill="#0F172A" stroke="#334155" />
              <text x="175" y="148" fill="#F8FAFC" fontSize="11" textAnchor="middle" fontFamily="monospace">168,000</text>

              <rect x="45" y="164" width="80" height="24" rx="4" fill="#0F172A" stroke="#334155" />
              <text x="85" y="180" fill="#F8FAFC" fontSize="11" textAnchor="middle" fontFamily="monospace">98,000</text>
              <rect x="135" y="164" width="80" height="24" rx="4" fill="#0F172A" stroke="#334155" />
              <text x="175" y="180" fill="#EF4444" fontSize="10" textAnchor="middle" fontFamily="monospace">BLANK / ERR</text>

              <rect x="45" y="196" width="80" height="24" rx="4" fill="#0F172A" stroke="#334155" />
              <text x="85" y="212" fill="#F8FAFC" fontSize="11" textAnchor="middle" fontFamily="monospace">178,000</text>
              <rect x="135" y="196" width="80" height="24" rx="4" fill="#0F172A" stroke="#334155" />
              <text x="175" y="212" fill="#F8FAFC" fontSize="11" textAnchor="middle" fontFamily="monospace">195,000</text>

              <rect x="45" y="235" width="170" height="55" rx="8" fill="#0284C7" fillOpacity="0.15" stroke="#0284C7" strokeDasharray="3 3" />
              <text x="130" y="256" fill="#38BDF8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Input Coordinates</text>
              <text x="130" y="274" fill="#94A3B8" fontSize="10" textAnchor="middle" fontFamily="monospace">B2:F25 (Barrackpore/Naihati)</text>

              {/* Transformation Engine (Center) */}
              <path d="M 235 180 L 330 180" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="335,180 325,175 325,185" fill="#38BDF8" />

              {/* Center Hub: Reshaping Operations */}
              <rect x="340" y="30" width="220" height="300" rx="16" fill="#0F172A" stroke="#4F46E5" strokeWidth="2" />
              <rect x="340" y="30" width="220" height="38" rx="16" fill="#4338CA" fillOpacity="0.4" />
              <text x="450" y="54" fill="#A5B4FC" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">TRANSFORMATION ENGINE</text>

              {/* Badges for functions */}
              <g transform="translate(355, 80)">
                <rect width="190" height="32" rx="6" fill="#1E1B4B" stroke="#6366F1" />
                <text x="95" y="20" fill="#C7D2FE" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">=TOCOL(Array, 1, 0)</text>
              </g>
              <g transform="translate(355, 120)">
                <rect width="190" height="32" rx="6" fill="#1E1B4B" stroke="#6366F1" />
                <text x="95" y="20" fill="#C7D2FE" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">=VSTACK(BK, SH, NH)</text>
              </g>
              <g transform="translate(355, 160)">
                <rect width="190" height="32" rx="6" fill="#1E1B4B" stroke="#6366F1" />
                <text x="95" y="20" fill="#C7D2FE" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">=CHOOSEROWS(Data, 1, -1)</text>
              </g>
              <g transform="translate(355, 200)">
                <rect width="190" height="32" rx="6" fill="#1E1B4B" stroke="#6366F1" />
                <text x="95" y="20" fill="#C7D2FE" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">=WRAPROWS(Stream, 5, "")</text>
              </g>
              <g transform="translate(355, 240)">
                <rect width="190" height="32" rx="6" fill="#1E1B4B" stroke="#6366F1" />
                <text x="95" y="20" fill="#C7D2FE" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">=TAKE(SORT(Data, 2), 5)</text>
              </g>
              <text x="450" y="305" fill="#64748B" fontSize="10" textAnchor="middle" fontFamily="sans-serif">Zero-Copy RAM Vectorization</text>

              {/* Arrow to Spilled Result */}
              <path d="M 565 180 L 650 180" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="655,180 645,175 645,185" fill="#10B981" />

              {/* Block 3: Dynamic Spilled Output */}
              <rect x="660" y="50" width="160" height="260" rx="14" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="660" y="50" width="160" height="38" rx="14" fill="#065F46" fillOpacity="0.4" />
              <text x="740" y="74" fill="#34D399" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">DYNAMIC SPILLED GRID</text>

              <rect x="675" y="100" width="130" height="22" rx="4" fill="#064E3B" stroke="#10B981" />
              <text x="740" y="115" fill="#A7F3D0" fontSize="11" textAnchor="middle" fontFamily="monospace">145,000 (BK Q1)</text>

              <rect x="675" y="126" width="130" height="22" rx="4" fill="#0F172A" stroke="#1E293B" />
              <text x="740" y="141" fill="#F8FAFC" fontSize="11" textAnchor="middle" fontFamily="monospace">168,000 (BK Q2)</text>

              <rect x="675" y="152" width="130" height="22" rx="4" fill="#0F172A" stroke="#1E293B" />
              <text x="740" y="167" fill="#F8FAFC" fontSize="11" textAnchor="middle" fontFamily="monospace">98,000 (SH Q1)</text>

              <rect x="675" y="178" width="130" height="22" rx="4" fill="#0F172A" stroke="#1E293B" />
              <text x="740" y="193" fill="#F8FAFC" fontSize="11" textAnchor="middle" fontFamily="monospace">178,000 (NH Q1)</text>

              <rect x="675" y="204" width="130" height="22" rx="4" fill="#0F172A" stroke="#1E293B" />
              <text x="740" y="219" fill="#F8FAFC" fontSize="11" textAnchor="middle" fontFamily="monospace">195,000 (NH Q2)</text>

              <rect x="675" y="240" width="130" height="50" rx="8" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeDasharray="3 3" />
              <text x="740" y="260" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Spill Anchor: H2#</text>
              <text x="740" y="278" fill="#6EE7B7" fontSize="10" textAnchor="middle" fontFamily="monospace">Blanks/Errors Skipped</text>
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
                Explore the dataset live in your browser below or download the master module workbook to practice in desktop Microsoft Excel.
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
            sheetName="Topic0_Overview"
            title="Interactive Function Classification Matrix"
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
              Enterprise Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Case 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Case Study 1 · Barrackpore Sales Hub</span>
                <span className="text-xs font-mono text-slate-400">TOCOL Deduplication</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Unpivoting Multi-Quarter Store Performance
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Analyst <strong>Swadeep Banerjee</strong> manages 25 retail branches across Barrackpore and Shyamnagar. 
                Sales data arrives as a 4-quarter matrix (<code className="text-sky-300 font-mono">B2:E26</code>). 
                To feed power BI models, Swadeep uses <code className="text-amber-300 font-mono">=TOCOL(B2:E26, 1)</code> to instantly flatten all 100 values into a single vertical column while automatically stripping empty non-trading quarters.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-sky-300">
                =UNIQUE(TOCOL(B2:E26, 1)) &rarr; 94 Clean Validated Sales Figures
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case Study 2 · Corporate Payroll Audit</span>
                <span className="text-xs font-mono text-slate-400">CHOOSECOLS Slicing</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Dynamic Executive Compensation Masking
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Tax Consultant <strong>Abhronila Sengupta</strong> at Ichapur receives a 10-column payroll master ledger containing sensitive basic pay, allowances, and net salaries. 
                For audit presentations, she requires only [Emp_ID, Full_Name, Net_Payable]. 
                She applies <code className="text-amber-300 font-mono">=CHOOSECOLS(MasterPayroll, 1, 2, 10)</code>, producing an instant masked audit table that self-updates whenever new staff join.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                =CHOOSECOLS(A2:J100, 1, 2, 10) &rarr; Zero Exposure of Internal Allowances
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case Study 3 · Multi-Branch Consolidation</span>
                <span className="text-xs font-mono text-slate-400">VSTACK & DROP</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Zero-VBA Multi-Campus Transaction Ledger
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Controller <strong>Susmita Roy</strong> consolidates billing records from three independent training centres at Barrackpore, Shyamnagar, and Naihati. 
                Instead of manually copy-pasting tables, she writes <code className="text-amber-300 font-mono">=VSTACK(BarrackporeTable, DROP(ShyamnagarTable, 1), DROP(NaihatiTable, 1))</code>, 
                retaining the master header while stacking hundreds of rows seamlessly.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                =VSTACK(BK_Data, DROP(SH_Data, 1), DROP(NH_Data, 1)) &rarr; 100% Automated Consolidation
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case Study 4 · Bank Statement ETL</span>
                <span className="text-xs font-mono text-slate-400">WRAPROWS Transformation</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Rebuilding Tabular Data from Raw Bank Logs
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                DevOps Engineer <strong>Debangshu Ghosh</strong> ingests continuous text log streams from a banking gateway where each transaction outputs 5 consecutive lines: 
                [Txn_ID, Date, Narration, Type, Amount]. By applying <code className="text-amber-300 font-mono">=WRAPROWS(A2:A500, 5)</code>, 
                Debangshu converts a flat 500-item text column into a clean 100-row x 5-column relational transaction table in under 1 millisecond.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                =WRAPROWS(RawLogVector, 5, "NO_DATA") &rarr; Clean Structured Ledger
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
              <span className="text-sky-400">🪜</span> Step-by-Step Practical Implementation Walkthrough
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              4-Phase Implementation Pipeline
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-sky-950 border border-sky-700 text-sky-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Data Preparation & Dimension Verification</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Verify the shape of your source tables. Confirm whether headers are included in the range and ensure no merged cells exist in the source or destination zones. 
                  Identify target dimensions before deciding between <code className="text-sky-300 font-mono">TOCOL</code>, <code className="text-indigo-300 font-mono">VSTACK</code>, or <code className="text-cyan-300 font-mono">WRAPROWS</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Enter the In-Memory Transformation Formula</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Select a single anchor cell (e.g., <code className="text-amber-300 font-mono">H2</code>) in an empty section of your sheet. Type the formula without selecting destination ranges or pressing CSE.
                  For example: <code className="text-amber-300 font-mono">=CHOOSECOLS(FILTER(A2:F50, F2:F50="Active"), 1, 2, 5)</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Analyze Spilled Grid Bounding Box</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press Enter. Notice the thin cyan bounding box surrounding the spilled cells. 
                  Inspect ghost cells to confirm that only the top-left anchor cell contains the formula, while all downstream cells display dynamic ghost values.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Downstream Referencing with the Hash (#) Operator</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  To consume the transformed array in subsequent formulas, simply reference the anchor cell followed by the spill operator: <code className="text-emerald-400 font-mono">=SUM(INDEX(H2#, , 3))</code> or <code className="text-emerald-400 font-mono">=SORT(H2#, 2, 1)</code>.
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
                  <th className="py-3 px-4">Guaranteed Remediation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#SPILL!</td>
                  <td className="py-3 px-4 text-slate-300">Spill range obstructed by non-empty cells, merged cells, or table boundaries.</td>
                  <td className="py-3 px-4 text-slate-400">Click error float tag &rarr; 'Select Obstructing Cells'.</td>
                  <td className="py-3 px-4 text-emerald-400">Delete blocking content or unmerge destination cells.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE!</td>
                  <td className="py-3 px-4 text-slate-300">Target dimensions in EXPAND are smaller than source matrix dimensions.</td>
                  <td className="py-3 px-4 text-slate-400">Check rows/cols parameters against ROWS(source) and COLUMNS(source).</td>
                  <td className="py-3 px-4 text-emerald-400">Use TAKE or DROP to shrink arrays; EXPAND is strictly for enlarging.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#N/A</td>
                  <td className="py-3 px-4 text-slate-300">Mismatched column counts in VSTACK/HSTACK or unpadded WRAPROWS tail.</td>
                  <td className="py-3 px-4 text-slate-400">Inspect padded tail elements in the final matrix row.</td>
                  <td className="py-3 px-4 text-emerald-400">Supply optional [pad_with] argument (e.g. "" or 0) to replace #N/A.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Lag / Freezing</td>
                  <td className="py-3 px-4 text-slate-300">Referencing entire columns (e.g., A:D) in TOCOL or VSTACK.</td>
                  <td className="py-3 px-4 text-slate-400">Formula references full 1,048,576 row vectors.</td>
                  <td className="py-3 px-4 text-emerald-400">Convert data to structured Excel Tables or use bounded ranges (A2:D500).</td>
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
              Classroom Speed Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-sky-300 text-xs font-mono">F9</kbd>
                <span>Instant In-Memory Array Evaluation</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight any nested function in the formula bar (e.g. <code className="text-amber-300 font-mono">VSTACK(T1, T2)</code>) and press <strong>F9</strong> to preview the evaluated array in curly braces. Press <strong>Esc</strong> to exit without overwriting.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-emerald-300 text-xs font-mono">Ctrl + Shift + L</kbd>
                <span>Instant AutoFilter Toggle</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Instantly toggle Excel filters across table headers to inspect underlying raw data before applying dynamic reshaping formulas.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-indigo-400 font-mono font-bold">-1</span>
                <span>The Dynamic Last-Element Secret</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pass <code className="text-amber-300 font-mono">-1</code> into <code className="text-indigo-300 font-mono">CHOOSEROWS</code> or <code className="text-purple-300 font-mono">CHOOSECOLS</code> to dynamically target the final row or column without needing <code className="text-slate-400 font-mono">COUNTA()</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-amber-400 font-mono font-bold">#</span>
                <span>Universal Spill Range Operator</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always reference dynamic outputs by their origin cell followed by <code className="text-sky-300 font-mono">#</code> (e.g., <code className="text-emerald-300 font-mono">H2#</code>) so downstream formulas adapt automatically when records expand.
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
              Critical Thinking Prompts
            </span>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Observe carefully:</strong> What happens when you combine <code className="text-sky-300 font-mono">TOCOL(Range, 1)</code> with <code className="text-emerald-300 font-mono">UNIQUE()</code> on a 5-day class schedule with empty slots? Why is this combination superior to legacy array formulas?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Think about table unions:</strong> If you stack three branch tables with <code className="text-violet-300 font-mono">VSTACK</code>, why must you wrap tables 2 and 3 inside <code className="text-amber-300 font-mono">DROP(Table, 1)</code>? What unintended bug occurs if you omit DROP?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider performance:</strong> Why does referencing <code className="text-rose-400 font-mono">A:A</code> inside <code className="text-sky-300 font-mono">TOCOL</code> cause instant workbook stutter, whereas referencing <code className="text-emerald-400 font-mono">Table1[Sales]</code> calculates in under 2 milliseconds?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Overview of Array Manipulation & Reshaping Functions — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Mastering Excel 365's array reshaping functions marks the true transition from an amateur spreadsheet user to a senior corporate financial modeler. Never rely on manual copy-pasting or fragile VBA unpivoting scripts when native in-memory functions like TOCOL, WRAPROWS, and VSTACK can reshape millions of data points dynamically in microseconds. Remember: always protect your source data integrity and build clean, decoupled transformation layers!"
            }
          />
        </div>
      </div>
    </div>
  );
}
