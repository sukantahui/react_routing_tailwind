"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_004_modern_text_intelligence_and_regular_expressions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic6() {
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
    link.download = "regex_master_practice.xlsx";
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
              ⚡ Multi-Delimiter Text Splitting · Topic 6
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze & Partition
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Splitting Complex Strings by Multiple Delimiters with TEXTSPLIT
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            For years, splitting text strings required destructive manual wizards ("Text to Columns") or cumbersome, 
            brittle legacy string formulas. The <code className="text-purple-300 font-mono font-bold">TEXTSPLIT</code> function 
            revolutionizes spreadsheet data wrangling by splitting text into dynamic spilled arrays across 
            <strong>columns, rows, or full 2D relational matrices</strong> using array constants of multiple delimiters 
            (<code className="text-amber-300 font-mono">{`{",", ";", "|", "/"}`}</code>) in a single, live formula!
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Multi-Delimiter:</strong> Splitting on {`{",", ";", "|"}`} simultaneously</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>2D Matrix Engine:</strong> Parses key-value pairs into tables</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>ignore_empty = TRUE:</strong> Collapses messy consecutive spaces/commas</span>
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
              <span className="text-purple-400">⚡</span> Formula Anatomy: =TEXTSPLIT()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Pattern: =TEXTSPLIT(text, col_del, [row_del], [ignore_empty], [match_mode], [pad_with])
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-purple-300 space-y-2">
            <span className="text-slate-500">// Complete TEXTSPLIT Parameter Architecture</span>
            <div className="mt-1 text-white font-bold">
              =TEXTSPLIT(<span className="text-sky-300">text</span>, <span className="text-amber-300">col_delimiter</span>, <span className="text-emerald-300">[row_delimiter]</span>, <span className="text-yellow-300">[ignore_empty]</span>, <span className="text-purple-300">[match_mode]</span>, <span className="text-slate-400">[pad_with]</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Example: 2D Key-Value Matrix Splitting</span> <br />
              <span className="text-emerald-400 font-bold">
                =TEXTSPLIT(B5, "=", ";", TRUE)
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4">Syntax Role</th>
                  <th className="py-3 px-4">Options / Defaults</th>
                  <th className="py-3 px-4">Splitting Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-300">text</td>
                  <td className="py-3 px-4 text-slate-300">Source String</td>
                  <td className="py-3 px-4 text-emerald-400">Cell / String</td>
                  <td className="py-3 px-4 font-sans text-slate-300">The composite text string to partition.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">col_delimiter</td>
                  <td className="py-3 px-4 text-slate-300">Column Split Point</td>
                  <td className="py-3 px-4 text-emerald-400">Text / Array {`{...}`}</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Splits text horizontally across adjacent columns.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-300">[row_delimiter]</td>
                  <td className="py-3 px-4 text-slate-300">Row Split Point</td>
                  <td className="py-3 px-4 text-slate-400">Optional</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Splits text vertically down rows, creating 2D matrices.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-yellow-300">[ignore_empty]</td>
                  <td className="py-3 px-4 text-slate-300">Consecutive Delimiters</td>
                  <td className="py-3 px-4 text-slate-400">FALSE (Default) / TRUE</td>
                  <td className="py-3 px-4 font-sans text-slate-300"><code className="text-emerald-400 font-mono">TRUE</code> ignores consecutive delimiters to prevent blank cells.</td>
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
              <span className="text-emerald-400">🔬</span> 2D Matrix Splitting & Multi-Delimiter Array Constants
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Dynamic Array Matrix Engine
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> 2D Relational Matrix Parsing
              </h3>
              <p className="leading-relaxed">
                When you supply both <code className="text-amber-300 font-mono">col_delimiter</code> and <code className="text-emerald-300 font-mono">row_delimiter</code>, 
                TEXTSPLIT generates a 2D matrix in a single formula! For example, <code className="text-sky-300 font-mono">"Item=Laptop;Qty=5;Price=65000"</code> 
                split with <code className="text-emerald-300 font-mono">=TEXTSPLIT(A2, "=", ";")</code> produces a 2-column by 3-row structured table instantly.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                Single-Formula 2D Key-Value Relational Table
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Multi-Delimiter Array Constants
              </h3>
              <p className="leading-relaxed">
                Real-world address and product strings use mixed separators like commas, hyphens, and slashes. 
                Passing <code className="text-amber-300 font-mono">{`{",", "-", "/", ";"}`}</code> allows TEXTSPLIT to partition on any separator seamlessly in one evaluation!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                =TEXTSPLIT(A2, {`{",", "-", "/"}`}, , TRUE)
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Dynamic Aggregation with TEXTJOIN, UNIQUE & SORT
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Clean, deduplicate, and sort a comma-separated tag list in a single formula:
              <br />
              <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm">
                =TEXTJOIN(", ", TRUE, SORT(UNIQUE(TOCOL(TEXTSPLIT(A2, ",", , TRUE)))))
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
              <span className="text-purple-400">📐</span> Visual 2D Matrix Splitting Architecture
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              2D Spilling Flow
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Observe how TEXTSPLIT parses a composite key-value string into a 2D relational table:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 330"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Input String (Top) */}
              <rect x="25" y="25" width="800" height="50" rx="8" fill="#1E1B4B" stroke="#6366F1" strokeWidth="1.5" />
              <text x="425" y="55" fill="#E0E7FF" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                "Item=Laptop;Qty=5;Price=65000;Branch=Barrackpore"
              </text>

              {/* Engine Block */}
              <rect x="25" y="100" width="360" height="155" rx="10" fill="#0F172A" stroke="#9333EA" strokeWidth="1.5" />
              <rect x="25" y="100" width="360" height="30" rx="10" fill="#6B21A8" fillOpacity="0.4" />
              <text x="205" y="120" fill="#FAF5FF" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">TEXTSPLIT 2D PARSER</text>
              <text x="205" y="150" fill="#F5D0FE" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">=TEXTSPLIT(A2, "=", ";")</text>

              <g transform="translate(45, 170)" fontSize="9" fontFamily="sans-serif" fill="#E2E8F0">
                <text x="0" y="15">col_delimiter = "=" &rarr; Splits Key & Value</text>
                <text x="0" y="35">row_delimiter = ";" &rarr; Splits Records by Row</text>
                <text x="0" y="55" fill="#34D399">ignore_empty = TRUE &rarr; Clean array bounds</text>
              </g>

              {/* Arrow */}
              <path d="M 405 175 L 450 175" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="455,175 445,170 445,180" fill="#10B981" />

              {/* Result 2D Grid (Right) */}
              <rect x="465" y="100" width="360" height="155" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="1.5" />
              <rect x="465" y="100" width="360" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="645" y="120" fill="#34D399" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2D RELATIONAL MATRIX (4 ROWS x 2 COLS)</text>

              <g transform="translate(480, 140)">
                <rect width="160" height="24" rx="3" fill="#1E293B" />
                <text x="10" y="16" fill="#38BDF8" fontSize="9" fontWeight="bold" fontFamily="monospace">Item</text>
                <rect x="170" width="160" height="24" rx="3" fill="#1E293B" />
                <text x="180" y="16" fill="#FDE047" fontSize="9" fontWeight="bold" fontFamily="monospace">"Laptop"</text>

                <rect y="28" width="160" height="24" rx="3" fill="#1E293B" />
                <text x="10" y="44" fill="#38BDF8" fontSize="9" fontWeight="bold" fontFamily="monospace">Qty</text>
                <rect x="170" y="28" width="160" height="24" rx="3" fill="#1E293B" />
                <text x="180" y="44" fill="#FDE047" fontSize="9" fontWeight="bold" fontFamily="monospace">"5"</text>

                <rect y="56" width="160" height="24" rx="3" fill="#1E293B" />
                <text x="10" y="72" fill="#38BDF8" fontSize="9" fontWeight="bold" fontFamily="monospace">Price</text>
                <rect x="170" y="56" width="160" height="24" rx="3" fill="#1E293B" />
                <text x="180" y="72" fill="#FDE047" fontSize="9" fontWeight="bold" fontFamily="monospace">"65000"</text>

                <rect y="84" width="160" height="24" rx="3" fill="#1E293B" />
                <text x="10" y="100" fill="#38BDF8" fontSize="9" fontWeight="bold" fontFamily="monospace">Branch</text>
                <rect x="170" y="84" width="160" height="24" rx="3" fill="#1E293B" />
                <text x="180" y="100" fill="#FDE047" fontSize="9" fontWeight="bold" fontFamily="monospace">"Barrackpore"</text>
              </g>

              {/* Bottom Result */}
              <rect x="25" y="275" width="800" height="40" rx="8" fill="#1E293B" stroke="#334155" />
              <text x="425" y="299" fill="#38BDF8" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                Result: Structured 2D Table Generated Instantly in Pure RAM
              </text>
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
                Explore the multi-delimiter splitting dataset below or download the practice workbook to test <code className="text-purple-300 font-mono">TEXTSPLIT</code> in Microsoft Excel.
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
            sheetName="Topic6_TEXTSPLIT"
            title="Multi-Delimiter & 2D Matrix Splitting Dataset (Record ID, Raw Composite String, Split Goal, Col 1, Col 2, Col 3)"
            rowsPerPage={10}
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
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · Logistics Address Parsing</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Multi-Delimiter Address Splitting
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Logistics Controller <strong>Swadeep Banerjee</strong> splits shipping addresses with mixed delimiters: 
                <code className="text-emerald-300 font-mono">=TEXTSPLIT(B5, {`{",", "-", "/"}`}, , TRUE)</code>. 
                Partitions house numbers, street names, and postal regions into clean columns in 1 formula!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =TEXTSPLIT(Address, {`{",", "-", "/"}`}, , TRUE)
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · ERP Migration & API Dumps</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Single-Formula 2D Key-Value Parsing
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Systems Architect <strong>Tuhina Mukherjee</strong> parses API configuration dumps: 
                <code className="text-amber-300 font-mono">=TEXTSPLIT(B5, "=", ";")</code>. 
                Generates a 2-column by 4-row key-value table directly in worksheet formula memory!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Parses: "Item=Laptop;Qty=5;Price=65000" into a 2D Table
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Tag & Skill Inventory</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Vertical Tag Deduplication Pipeline
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                HR Analyst <strong>Abhronila Sengupta</strong> cleans employee skill tags: 
                <code className="text-indigo-300 font-mono">=SORT(UNIQUE(TOCOL(TEXTSPLIT(Tags, {`{",", ";"}`}, , TRUE))))</code>, 
                extracting a clean, sorted unique list of corporate competencies.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                TEXTSPLIT + TOCOL + UNIQUE + SORT: Complete Tag Aggregator
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Multi-Line Note Decomposition</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Vertical Splitting by Alt+Enter Line Break
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Manager <strong>Debangshu Ghosh</strong> converts multi-line cell notes: 
                <code className="text-amber-300 font-mono">=TEXTSPLIT(MultiLineCell, , CHAR(10))</code>, 
                spilling individual action items vertically into separate rows for project tracking.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Splits on CHAR(10) &rarr; Spills Vertically Down Rows
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
              <span className="text-purple-400">🪜</span> Step-by-Step TEXTSPLIT Implementation Protocol
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Methodical Execution
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Identify Delimiters & Target Dimensions</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Determine if you need horizontal column splitting (<code className="text-amber-300 font-mono">col_delimiter</code>) or 2D matrix splitting (<code className="text-emerald-300 font-mono">col + row delimiters</code>).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Define Array Constant for Multiple Separators</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Pass <code className="text-emerald-400 font-mono">{`{",", ";", "|"}`}</code> for multi-delimiter coverage.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Enable ignore_empty = TRUE</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Pass <code className="text-purple-300 font-mono">TRUE</code> in the 4th argument to collapse consecutive commas or spaces.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Press Enter & Verify Spilled Output</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press Enter. The text partitions dynamically into adjacent cells without manual 'Text to Columns' steps!
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#SPILL!</td>
                  <td className="py-3 px-4 text-slate-300">Destination cells along the spill path contain data, formulas, or merged cells.</td>
                  <td className="py-3 px-4 text-slate-400">Inspect the adjacent cells to the right or below.</td>
                  <td className="py-3 px-4 text-emerald-400">Clear obstructing cells to permit automatic array spill.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Empty String Cells</td>
                  <td className="py-3 px-4 text-slate-300">Input has multiple consecutive delimiters (e.g. <code className="text-rose-300 font-mono">,,</code>) and <code className="text-rose-300 font-mono">ignore_empty</code> is FALSE.</td>
                  <td className="py-3 px-4 text-slate-400">Blank cells appear inside the spilled array.</td>
                  <td className="py-3 px-4 text-emerald-400">Set <code className="text-emerald-400 font-mono">ignore_empty = TRUE</code> (1).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#N/A in 2D Matrix</td>
                  <td className="py-3 px-4 text-slate-300">Ragged matrix where some rows have fewer columns than others.</td>
                  <td className="py-3 px-4 text-slate-400">Trailing cells display #N/A.</td>
                  <td className="py-3 px-4 text-emerald-400">Supply a default filler string in <code className="text-emerald-400 font-mono">pad_with</code> (e.g. <code className="text-emerald-400 font-mono">""</code> or <code className="text-emerald-400 font-mono">"N/A"</code>).</td>
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
              Splitting Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">INDEX(..., N)</span>
                <span>Extract Nth Item</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pull 2nd item: <code className="text-emerald-300 font-mono">=INDEX(TEXTSPLIT(A2, ","), 2)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">TAKE(..., -1)</span>
                <span>Extract Last Item</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pull final token: <code className="text-sky-300 font-mono">=TAKE(TOCOL(TEXTSPLIT(A2, ",")), -1)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-purple-400 font-mono font-bold">CHAR(10)</span>
                <span>Split on Line Break</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Split multiline text: <code className="text-purple-300 font-mono">=TEXTSPLIT(A2, , CHAR(10))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">F9</kbd>
                <span>Spill Preview</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight TEXTSPLIT formula and press <strong>F9</strong> to inspect the spilled 1D or 2D array in RAM.
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
                <strong>Reflect on dynamic vs static operations:</strong> Why is using <code className="text-purple-300 font-mono">TEXTSPLIT</code> vastly superior to Excel's legacy 'Text to Columns' wizard when source data is updated frequently?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine 2D matrix power:</strong> How does providing both <code className="text-amber-300 font-mono">col_delimiter</code> and <code className="text-emerald-300 font-mono">row_delimiter</code> allow you to turn semi-structured key-value strings into relational database tables in 1 step?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider array composition:</strong> How does combining <code className="text-purple-300 font-mono">TEXTSPLIT</code> with <code className="text-sky-300 font-mono">TOCOL</code>, <code className="text-cyan-300 font-mono">UNIQUE</code>, and <code className="text-emerald-300 font-mono">SORT</code> automate tag deduplication in a single live formula?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Multi-Delimiter Splitting with TEXTSPLIT — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "TEXTSPLIT is a modern spreadsheet superpower that completely replaces destructive 'Text to Columns' wizards. Master multi-delimiter array constants ({...}), leverage row_delimiter to construct instant 2D key-value tables, and always enable ignore_empty = TRUE to ensure your corporate data models remain clean, fast, and completely automated!"
            }
          />
        </div>
      </div>
    </div>
  );
}
