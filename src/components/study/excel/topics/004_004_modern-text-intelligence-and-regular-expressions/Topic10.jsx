"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/regex_master.xlsx?url";
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
              ⚡ Automated Data Sanitization · Topic 10
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 5: Synthesize & Sanitize
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Automated Data Sanitization: Stripping HTML Tags, Non-Alphanumeric Noise & Excess Whitespace
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Raw enterprise text ingested from web portals, CRM databases, mobile app forms, and legacy ERP dumps is 
            invariably polluted with messy HTML markup tags (<code className="text-rose-400 font-mono">&lt;p&gt;, &lt;div&gt;, &lt;b&gt;</code>), 
            illegal special symbols, invisible control characters, and erratic multi-space gaps. 
            By constructing a <strong>4-Phase Automated Sanitization Pipeline</strong> using 
            <code className="text-purple-300 font-mono font-bold">REGEXREPLACE</code>, <code className="text-sky-300 font-mono font-bold">TRIM</code>, and 
            <code className="text-emerald-300 font-mono font-bold">PROPER</code>, you can sanitize entire databases in pure RAM with zero VBA macros!
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Phase 1:</strong> Stripping HTML tags &lt;[^&gt;]+&gt;</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Phase 2:</strong> Removing symbol noise [^a-zA-Z0-9\s]</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Phase 3 & 4:</strong> Collapsing spaces \s+ & Proper Casing</span>
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
              <span className="text-purple-400">⚡</span> The 4-Phase Enterprise Sanitization Pipeline
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Complete Formula Engine
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-purple-300 space-y-2">
            <span className="text-slate-500">// Complete 4-Phase In-Memory Sanitization Pipeline</span>
            <div className="mt-1 text-white font-bold text-xs sm:text-sm">
              =<span className="text-yellow-300">PROPER</span>(<span className="text-sky-300">TRIM</span>(<span className="text-purple-300">REGEXREPLACE</span>(<span className="text-purple-300">REGEXREPLACE</span>(B5, "<span className="text-rose-300">&lt;[^&gt;]+&gt;</span>", ""), "<span className="text-amber-300">\s+</span>", " ")))
            </div>
            <div className="mt-2 text-slate-400 text-xs">
              <span className="text-rose-300">&lt;[^&gt;]+&gt;</span>: Deletes HTML Tags | <span className="text-amber-300">\s+</span>: Collapses Spaces | <span className="text-sky-300">TRIM</span>: Boundary Gaps | <span className="text-yellow-300">PROPER</span>: Capitalizes Words
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Pipeline Phase</th>
                  <th className="py-3 px-4">Target Noise Pattern</th>
                  <th className="py-3 px-4">Replacement Action</th>
                  <th className="py-3 px-4">Clean Output Transformation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-rose-400 font-sans">Phase 1: HTML Stripping</td>
                  <td className="py-3 px-4 text-rose-300">&lt;[^&gt;]+&gt;</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Delete Tag string (<code className="text-emerald-400 font-mono">""</code>)</td>
                  <td className="py-3 px-4 text-emerald-400">&lt;b&gt;Text&lt;/b&gt; &rarr; Text</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-400 font-sans">Phase 2: Symbol Cleansing</td>
                  <td className="py-3 px-4 text-amber-300">[^a-zA-Z0-9\s.,-]</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Delete Illegal Symbols (<code className="text-emerald-400 font-mono">""</code>)</td>
                  <td className="py-3 px-4 text-emerald-400">Paid #100%!! &rarr; Paid 100</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400 font-sans">Phase 3: Space Normalization</td>
                  <td className="py-3 px-4 text-sky-300">\s+</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Replace with single space (<code className="text-emerald-400 font-mono">" "</code>)</td>
                  <td className="py-3 px-4 text-emerald-400">A &nbsp; &nbsp; B &rarr; A B</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">Phase 4: Case Standardization</td>
                  <td className="py-3 px-4 text-emerald-300">PROPER() / UPPER()</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Uniform Title / Upper case</td>
                  <td className="py-3 px-4 text-emerald-400">swadeep banerjee &rarr; Swadeep Banerjee</td>
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
              <span className="text-emerald-400">🔬</span> Multi-Stage Chaining & Corporate LAMBDA Packaging
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Enterprise ETL Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Sequential Cleansing with REDUCE
              </h3>
              <p className="leading-relaxed">
                Instead of deeply nesting formulas, you can pass an array of regex sanitization rules to <code className="text-purple-300 font-mono">REDUCE</code>. 
                Text flows through HTML stripping, symbol removal, and space collapsing sequentially in pure formula RAM!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                =REDUCE(RawText, {"{\""}&lt;[^&gt;]+&gt;{"\", \"[^a-zA-Z0-9\\s]\"}"}, LAMBDA(a, p, REGEXREPLACE(a, p, "")))
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Corporate Named LAMBDA Deployment
              </h3>
              <p className="leading-relaxed">
                Package your sanitization logic into a company-wide named function <code className="text-emerald-300 font-mono">FX_SANITIZE_TEXT</code> in Name Manager. 
                Business analysts simply write <code className="text-sky-300 font-mono">=FX_SANITIZE_TEXT(A2)</code> to clean any messy record!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                FX_SANITIZE_TEXT = LAMBDA(s, PROPER(TRIM(REGEXREPLACE(REGEXREPLACE(s, "&lt;[^&gt;]+&gt;", ""), "\s+", " "))))
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Mass Column Sanitization with MAP
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Sanitize 10,000 rows of customer comments across an entire table in a single dynamic array formula:
              <br />
              <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm">
                =MAP(FeedbackRange, LAMBDA(c, PROPER(TRIM(REGEXREPLACE(REGEXREPLACE(c, "&lt;[^&gt;]+&gt;", ""), "\s+", " ")))))
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
              <span className="text-purple-400">📐</span> Visual 4-Phase Data Sanitization Machine
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Sanitization Machine Flow
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Trace how polluted web scraping text passes through the 4 sanitization stages to emerge as pristine plain text:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 330"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Raw Input (Left) */}
              <rect x="25" y="30" width="220" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="30" width="220" height="34" rx="12" fill="#7E22CE" fillOpacity="0.3" />
              <text x="135" y="52" fill="#F3E8FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">RAW POLLUTED TEXT</text>

              <g transform="translate(35, 75)">
                <rect width="200" height="42" rx="4" fill="#7F1D1D" stroke="#EF4444" />
                <text x="10" y="16" fill="#FECACA" fontSize="8" fontFamily="sans-serif">HTML & Noise:</text>
                <text x="10" y="32" fill="#FDE047" fontSize="8.5" fontFamily="monospace">"&lt;p&gt;swadeep &nbsp; banerjee&lt;/p&gt;"</text>

                <rect y="50" width="200" height="42" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="66" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">Symbol Clutter:</text>
                <text x="10" y="82" fill="#38BDF8" fontSize="8.5" fontFamily="monospace">"Audit #88421 -- Paid!!!"</text>

                <rect y="100" width="200" height="42" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="116" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">Irregular Case:</text>
                <text x="10" y="132" fill="#A7F3D0" fontSize="8.5" fontFamily="monospace">"tUhInA mUkHeRjEe"</text>
              </g>

              <rect x="35" y="240" width="200" height="45" rx="6" fill="#1E1B4B" stroke="#6366F1" />
              <text x="135" y="260" fill="#E0E7FF" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Web & CRM Scraping</text>
              <text x="135" y="275" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="sans-serif">High Noise Index</text>

              {/* Arrow */}
              <path d="M 260 165 L 315 165" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="320,165 310,160 310,170" fill="#A855F7" />

              {/* Sanitization Engine (Center) */}
              <rect x="325" y="30" width="250" height="270" rx="14" fill="#0F172A" stroke="#9333EA" strokeWidth="2" />
              <rect x="325" y="30" width="250" height="34" rx="14" fill="#6B21A8" fillOpacity="0.4" />
              <text x="450" y="52" fill="#FAF5FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">4-PHASE SANITIZATION ENGINE</text>

              <g transform="translate(340, 75)">
                <rect width="220" height="32" rx="4" fill="#3B0764" stroke="#A855F7" />
                <text x="10" y="20" fill="#F5D0FE" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">1. Strip HTML: &lt;[^&gt;]+&gt; &rarr; ""</text>

                <rect y="36" width="220" height="32" rx="4" fill="#0369A1" fillOpacity="0.3" stroke="#38BDF8" />
                <text x="10" y="56" fill="#BAE6FD" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">2. Strip Noise: [^\w\s] &rarr; ""</text>

                <rect y="72" width="220" height="32" rx="4" fill="#065F46" fillOpacity="0.3" stroke="#10B981" />
                <text x="10" y="92" fill="#A7F3D0" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">3. Normalize: \s+ &rarr; " "</text>

                <rect y="108" width="220" height="32" rx="4" fill="#854D0E" fillOpacity="0.3" stroke="#EAB308" />
                <text x="10" y="128" fill="#FEF08A" fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">4. Proper Case: PROPER()</text>
              </g>

              <text x="450" y="275" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Single-Pass SIMD Execution</text>

              {/* Arrow */}
              <path d="M 590 165 L 620 165" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="625,165 615,160 615,170" fill="#10B981" />

              {/* Clean Output (Right) */}
              <rect x="630" y="30" width="195" height="270" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="630" y="30" width="195" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="727" y="50" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">PRISTINE DATA</text>

              <g transform="translate(640, 75)">
                <rect width="175" height="42" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="16" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">Customer Name:</text>
                <text x="10" y="32" fill="#34D399" fontSize="9.5" fontWeight="bold" fontFamily="monospace">"Swadeep Banerjee"</text>

                <rect y="50" width="175" height="42" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="66" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">Clean Ledger Note:</text>
                <text x="10" y="82" fill="#FDE047" fontSize="9.5" fontWeight="bold" fontFamily="monospace">"Audit 88421 Paid"</text>

                <rect y="100" width="175" height="42" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="116" fill="#94A3B8" fontSize="8" fontFamily="sans-serif">Standard Name:</text>
                <text x="10" y="132" fill="#38BDF8" fontSize="9.5" fontWeight="bold" fontFamily="monospace">"Tuhina Mukherjee"</text>
              </g>

              <rect x="640" y="240" width="175" height="45" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" />
              <text x="727" y="260" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">100% Audit Ready</text>
              <text x="727" y="275" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Zero HTML / Whitespace Noise</text>
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
                Explore the automated text sanitization dataset below or download the practice workbook to test the 4-phase ETL pipeline in Microsoft Excel.
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
            sheetName="Topic10_Data_Sanitizing"
            title="Automated Data Sanitization Dataset (Record ID, Raw Polluted Text, Cleansed Output, Goal Description)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · Web Portal Comment ETL</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                HTML Tag Stripping & Whitespace Collapsing
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Systems Engineer <strong>Swadeep Banerjee</strong> sanitizes 20,000 scraped customer reviews: 
                <code className="text-emerald-300 font-mono">=PROPER(TRIM(REGEXREPLACE(REGEXREPLACE(B5, "&lt;[^&gt;]+&gt;", ""), "\s+", " ")))</code>. 
                Prepares clean plain text for AI sentiment score modeling in 1 step!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =PROPER(TRIM(REGEXREPLACE(REGEXREPLACE(..., "&lt;[^&gt;]+&gt;", ""), "\s+", " ")))
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Mainframe ERP Migration</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                ASCII Control Character Removal
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Database Lead <strong>Tuhina Mukherjee</strong> cleanses legacy mainframe export dumps: 
                <code className="text-amber-300 font-mono">=REGEXREPLACE(B5, "[\x00-\x1F]", "")</code>, 
                eliminating invisible ASCII 0-31 control characters that previously crashed SQL bulk copy jobs.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Strips: Hexadecimal ASCII 0-31 control codes in pure RAM
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · E-Commerce Product Catalog</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                SKU Punctuation & Symbol Standardization
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Catalog Specialist <strong>Abhronila Sengupta</strong> cleanses product codes: 
                <code className="text-indigo-300 font-mono">=UPPER(REGEXREPLACE(SKU, "[^a-zA-Z0-9]+", "-"))</code>, 
                converting messy spaces and slashes into clean, standardized kebab-case item codes.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Transforms: "elec / dell _ 88421" &rarr; "ELEC-DELL-88421"
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Social Media Sentiment Mining</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Emoji & Non-ASCII Character Stripping
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Marketing Analytics Lead <strong>Debangshu Ghosh</strong> cleans public feedback: 
                <code className="text-amber-300 font-mono">=REGEXREPLACE(Comment, "[^\x00-\x7F]", "")</code>, 
                stripping emojis and non-standard unicode characters for clean NLP text ingestion.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Strips exotic emojis and preserves pure ASCII 0-127 text
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
              <span className="text-purple-400">🪜</span> Step-by-Step Data Sanitization Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Identify Noise Profile</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Identify whether text has HTML markup (<code className="text-rose-400 font-mono">&lt;p&gt;</code>), illegal symbols, or multi-space gaps.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Apply Phase 1 HTML Tag Removal</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Pattern: <code className="text-emerald-400 font-mono">=REGEXREPLACE(B5, "&lt;[^&gt;]+&gt;", "")</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Apply Phase 2 & 3 Space Collapsing & Trimming</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Wrap in: <code className="text-purple-300 font-mono">TRIM(REGEXREPLACE(..., "\s+", " "))</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Wrap in PROPER() and Verify Clean Output</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press Enter. Text is 100% sanitized, free of HTML, properly spaced, and title-cased!
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Greedy Tag Over-Deletion</td>
                  <td className="py-3 px-4 text-slate-300">Wrote <code className="text-rose-300 font-mono">&lt;.*&gt;</code> which deleted all content between the first <code className="text-rose-300 font-mono">&lt;</code> and last <code className="text-rose-300 font-mono">&gt;</code>.</td>
                  <td className="py-3 px-4 text-slate-400">All valid text between tags disappears.</td>
                  <td className="py-3 px-4 text-emerald-400">Use <code className="text-emerald-400 font-mono">&lt;[^&gt;]+&gt;</code> or lazy quantifier <code className="text-emerald-400 font-mono">&lt;.*?&gt;</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Remaining HTML Entities</td>
                  <td className="py-3 px-4 text-slate-300">HTML entity codes like <code className="text-rose-300 font-mono">&amp;amp;</code> or <code className="text-rose-300 font-mono">&amp;nbsp;</code> not matched by tag pattern.</td>
                  <td className="py-3 px-4 text-slate-400">Text has "&amp;nbsp;" or "&amp;amp;".</td>
                  <td className="py-3 px-4 text-emerald-400">Add entity replacement rule: <code className="text-emerald-400 font-mono">REGEXREPLACE(..., "&amp;[a-zA-Z]+;", " ")</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE!</td>
                  <td className="py-3 px-4 text-slate-300">Malformed regex syntax (e.g. unclosed bracket in character class).</td>
                  <td className="py-3 px-4 text-slate-400">Check pattern string for syntax errors.</td>
                  <td className="py-3 px-4 text-emerald-400">Validate bracket enclosure in regex string.</td>
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
              Sanitization Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">FX_SANITIZE_TEXT</span>
                <span>Named Corporate LAMBDA</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Register in Name Manager: <code className="text-emerald-300 font-mono">=LAMBDA(s, PROPER(TRIM(...)))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">MAP Vectorization</span>
                <span>Entire Column Cleansing</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Clean 10,000 rows: <code className="text-sky-300 font-mono">=MAP(A5:A1000, LAMBDA(c, FX_SANITIZE_TEXT(c)))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-purple-400 font-mono font-bold">Control Character Fix</span>
                <span>Mainframe Dump Sanitizing</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Strip ASCII 0-31: <code className="text-purple-300 font-mono">=REGEXREPLACE(A2, "[\x00-\x1F]", "")</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">F9</kbd>
                <span>Pipeline RAM Inspection</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight sanitization formula and press <strong>F9</strong> to inspect cleansed text in RAM.
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
                <strong>Reflect on data pipeline hygiene:</strong> Why is automated text sanitization an essential prerequisite before performing database lookups, tax calculations, or machine learning sentiment modeling?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine character class negation:</strong> How does the negated class <code className="text-amber-300 font-mono">[^a-zA-Z0-9\s]</code> provide a universal shield against punctuation clutter, emojis, and illegal symbols?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider RAM execution speed:</strong> Why does executing multi-stage regex sanitization in Excel 365 formula RAM run 50x faster than legacy VBA macros while eliminating all macro security warnings?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Automated Data Sanitization — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Data sanitization is the foundation of high-performance spreadsheet intelligence. By building multi-phase in-memory pipelines using REGEXREPLACE, TRIM, and PROPER inside named LAMBDAs (FX_SANITIZE_TEXT), you can strip HTML tags, eliminate symbol noise, and collapse irregular whitespace across 50,000 corporate records in pure RAM with zero macros!"
            }
          />
        </div>
      </div>
    </div>
  );
}
