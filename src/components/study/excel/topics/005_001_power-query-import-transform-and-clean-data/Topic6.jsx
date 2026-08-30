"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/005_001_power_query_import_transform_and_clean_data_master.xlsx?url";
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
    link.download = "power_query_master_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-teal-500/30 selection:text-teal-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-teal-950/80 border border-teal-700/60 text-teal-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ Text Transformation Engine · Topic 6
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Split, Extract &amp; Harmonize
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 3: Apply &amp; Reshape
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Text Transformations: Splitting Columns, Trimming, Case &amp; Delimiter Slicing
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Unstructured and concatenated text strings are pervasive in corporate databases: composite invoice codes, 
            messy email addresses, camelCase identifiers, and un-normalized comma-separated lists. 
            Power Query's <strong>Text Transformation Engine</strong> provides surgical string manipulation—from 
            <strong>Delimiter Splitting into Columns or Rows</strong> and <strong>Character Transition Slicing</strong> to 
            <strong>0-indexed Delimiter Extraction</strong> (<code className="text-teal-300 font-mono">Text.BeforeDelimiter / Text.AfterDelimiter</code>) and 
            <strong>Text.Select / Text.Remove</strong> filtering!
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Split to Rows:</strong> Unnests multi-value lists into 1NF tabular rows</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Delimiter Slicing:</strong> Isolate prefixes and extensions with Text.AfterDelimiter</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Surgical Selection:</strong> Text.Select and Text.Remove for instant digit extraction</span>
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
              <span className="text-teal-400">⚡</span> Power Query M Text Transformation Anatomy
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              M String Functions
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-teal-300 space-y-2">
            <span className="text-slate-500">// 1. Split Column by Delimiter</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'= Table.SplitColumn(Source, "Code", Splitter.SplitTextByDelimiter("-", QuoteStyle.Csv), {"Prefix", "ID"})'}
            </div>
            <span className="text-slate-500">// 2. Delimiter Slicing (Reverse Extension Lookup)</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'= Table.AddColumn(Source, "Ext", each Text.AfterDelimiter([File_Path], ".", {0, RelativePosition.FromEnd}))'}
            </div>
            <span className="text-slate-500">// 3. Surgical Digit Extraction</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'= Table.AddColumn(Source, "DigitsOnly", each Text.Select([Phone], {"0".."9"}))'}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Operation</th>
                  <th className="py-3 px-4">Core M Expression</th>
                  <th className="py-3 px-4">Parameters / Options</th>
                  <th className="py-3 px-4">Enterprise Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-teal-400 font-sans">Split Column</td>
                  <td className="py-3 px-4 text-teal-300">Table.SplitColumn</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Splitter.SplitTextByDelimiter</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Divides composite IDs into atomic fields.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400 font-sans">Before Delimiter</td>
                  <td className="py-3 px-4 text-sky-300">Text.BeforeDelimiter</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Delimiter string (e.g. "@")</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Extracts usernames from corporate email strings.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">After Delimiter</td>
                  <td className="py-3 px-4 text-emerald-300">Text.AfterDelimiter</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">{'{0, RelativePosition.FromEnd}'}</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Isolates trailing file extensions and root domains.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-indigo-400 font-sans">Surgical Select</td>
                  <td className="py-3 px-4 text-indigo-300">Text.Select</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">{`{"0".."9"}`}</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Strips all formatting to retain 10-digit phone numbers.</td>
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
              <span className="text-emerald-400">🔬</span> 1NF Normalization (Split into Rows) &amp; 0-Indexed Slicing
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Text Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-teal-400">1.</span> Relational 1NF: Split into Rows
              </h3>
              <p className="leading-relaxed">
                When a spreadsheet cell contains multiple items (e.g. <code className="text-teal-300 font-mono">"ItemA, ItemB, ItemC"</code>), 
                splitting into columns creates wide un-pivotable matrices. 
                Using <strong>Split Column &rarr; Advanced Options &rarr; Split into Rows</strong> unrolls list values 
                into individual normalized records automatically!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-teal-300">
                1 Cell with 3 Items &rarr; 3 Normalized Rows
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> 0-Indexed String Slicing Mechanics
              </h3>
              <p className="leading-relaxed">
                Unlike Excel worksheet formulas where <code className="text-rose-400 font-mono">MID(text, 1, 5)</code> starts at character 1, 
                Power Query's M engine is strictly <strong>0-indexed</strong>: 
                <code className="text-emerald-300 font-mono">Text.Middle(text, 0, 5)</code> starts at character 1!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                M: Text.Middle(text, 0, 5) &equiv; Excel: MID(text, 1, 5)
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Character Transition Splitting (Non-Digit to Digit)
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              When raw alphanumeric codes like <code className="text-teal-300 font-mono">"INV1042"</code> or <code className="text-teal-300 font-mono">"EMP88421"</code> lack delimiters, 
              apply <strong>Split Column &rarr; By Non-Digit to Digit</strong> to automatically separate letters from numbers without writing complex regex formulas!
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
              <span className="text-teal-400">📐</span> Visual Text Engineering &amp; Delimiter Slicing
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Text Transformation Flow
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Trace how dirty concatenated string tokens pass through the Power Query text transformation engine:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Raw Concatenated String (Left) */}
              <rect x="25" y="25" width="220" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="25" width="220" height="34" rx="12" fill="#0F766E" fillOpacity="0.3" />
              <text x="135" y="47" fill="#CCFBF1" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1. CONCATENATED INPUT</text>

              <g transform="translate(35, 75)" fontSize="8.5" fontFamily="monospace" fill="#CBD5E1">
                <rect width="200" height="28" fill="#1E293B" />
                <text x="8" y="18">EMP-BKP-88421</text>

                <rect y="32" width="200" height="28" fill="#1E293B" />
                <text x="8" y="50">swadeep.b@corp.in</text>

                <rect y="64" width="200" height="28" fill="#1E293B" />
                <text x="8" y="82">  Kolkata HQ  </text>

                <rect y="96" width="200" height="28" fill="#1E293B" />
                <text x="8" y="114">INV/2026/0992</text>
              </g>

              <rect x="35" y="225" width="200" height="55" rx="6" fill="#134E4A" stroke="#14B8A6" />
              <text x="135" y="245" fill="#5EEAD4" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Compound Text Blobs</text>
              <text x="135" y="262" fill="#99F6E4" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Multiple Embedded Tokens</text>

              {/* Arrow */}
              <path d="M 260 160 L 315 160" stroke="#14B8A6" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="320,160 310,155 310,165" fill="#14B8A6" />

              {/* Text Transformation Suite (Center) */}
              <rect x="325" y="25" width="250" height="270" rx="14" fill="#0F172A" stroke="#0D9488" strokeWidth="2" />
              <rect x="325" y="25" width="250" height="34" rx="14" fill="#115E59" fillOpacity="0.4" />
              <text x="450" y="47" fill="#F0FDFA" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2. M TEXT ENGINE</text>

              <g transform="translate(340, 70)" fontSize="8.5" fontFamily="sans-serif">
                <rect width="220" height="32" rx="4" fill="#134E4A" stroke="#14B8A6" />
                <text x="10" y="20" fill="#5EEAD4" fontWeight="bold">1. Split Delimiter ("-", "/")</text>

                <rect y="38" width="220" height="32" rx="4" fill="#0369A1" fillOpacity="0.3" stroke="#38BDF8" />
                <text x="10" y="58" fill="#BAE6FD" fontWeight="bold">2. Text.Before / Text.After</text>

                <rect y="76" width="220" height="32" rx="4" fill="#065F46" fillOpacity="0.3" stroke="#10B981" />
                <text x="10" y="96" fill="#A7F3D0" fontWeight="bold">3. Text.Trim + Text.Clean</text>

                <rect y="114" width="220" height="32" rx="4" fill="#854D0E" fillOpacity="0.3" stroke="#EAB308" />
                <text x="10" y="134" fill="#FEF08A" fontWeight="bold">4. Text.Proper (Title Case)</text>
              </g>

              <text x="450" y="270" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ 0-Indexed Slicing</text>

              {/* Arrow */}
              <path d="M 590 160 L 620 160" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="625,160 615,155 615,165" fill="#10B981" />

              {/* Clean Atomic Columns (Right) */}
              <rect x="630" y="25" width="195" height="270" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="630" y="25" width="195" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="727" y="45" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3. ATOMIC FIELDS</text>

              <g transform="translate(640, 75)" fontSize="8.5" fontFamily="monospace" fill="#E2E8F0">
                <rect width="175" height="30" fill="#064E3B" stroke="#10B981" />
                <text x="8" y="19" fill="#34D399" fontWeight="bold">Prefix: EMP | ID: 88421</text>

                <rect y="36" width="175" height="30" fill="#1E293B" />
                <text x="8" y="55">User: swadeep.b</text>
              </g>

              <rect x="640" y="225" width="175" height="55" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" />
              <text x="727" y="245" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">100% Normalized</text>
              <text x="727" y="262" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Atomic Relational Schema</text>
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
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet &amp; Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the text transformations dataset below or download the practice workbook to test splitting, trimming, and extraction in Microsoft Excel.
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
            sheetName="Topic6_Text_Transforms"
            title="Text Transformations Pipeline (Raw Input String, Delimiter Used, Extracted Prefix, Extracted Suffix, Title Case, Trimmed Output)"
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
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Case 1 · Employee ID Slicing</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Composite Code Delimiter Splitting
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Swadeep Banerjee</strong> splits ERP employee codes (<code className="text-teal-300 font-mono">"EMP-BKP-88421"</code>) 
                into Department, Branch, and ID using <code className="text-teal-300 font-mono">Table.SplitColumn</code> with hyphen delimiters in 1 click.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                Split by '-' &rarr; [Dept, Branch, EmpID]
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Email Domain Isolation</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Text.BeforeDelimiter &amp; Text.AfterDelimiter
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Accountant <strong>Tuhina Mukherjee</strong> parses 25,000 corporate vendor emails: 
                isolating usernames via <code className="text-amber-300 font-mono">Text.BeforeDelimiter([Email], "@")</code> and domains via <code className="text-emerald-300 font-mono">Text.AfterDelimiter</code>.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Text.BeforeDelimiter("@") &amp; Text.AfterDelimiter("@")
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · 1NF Relational Normalization</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Multi-Item Invoice Unnesting into Rows
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                ERP Lead <strong>Abhronila Sengupta</strong> unrolls comma-separated part numbers (<code className="text-indigo-300 font-mono">"PART-1, PART-2, PART-3"</code>) 
                into individual normalized rows using <strong>Split into Rows</strong>, creating a pure 1NF relational schema!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Split Column &rarr; Advanced Options &rarr; Split into Rows
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Surgical Phone Sanitization</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Text.Select Digit Filtering
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Lead <strong>Debangshu Ghosh</strong> strips hyphens, brackets, and spaces from vendor contact numbers: 
                <code className="text-amber-300 font-mono">{'Table.AddColumn(Source, "Phone", each Text.Select([RawPhone], {"0".."9"}))'}</code>.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Text.Select &rarr; Retains Only Digits 0-9
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
              <span className="text-teal-400">🪜</span> Step-by-Step Text Transformation Protocol
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Methodical Execution
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-teal-950 border border-teal-700 text-teal-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Clean &amp; Trim Text Fields</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Right-click column header &rarr; <strong>Transform</strong> &rarr; <strong>Clean</strong>, then <strong>Transform</strong> &rarr; <strong>Trim</strong>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Split by Delimiter or Transition</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Select <strong>Split Column</strong> &rarr; By Delimiter (or By Non-Digit to Digit). Set QuoteStyle to CSV if quoted commas exist.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Extract Substrings via Delimiter Functions</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Use <strong>Add Column &rarr; Extract &rarr; Text Before/After Delimiter</strong> to isolate tokens without modifying raw source columns.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Harmonize Casing with Capitalize Each Word</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Apply <strong>Transform &rarr; Format &rarr; Capitalize Each Word</strong> (<code className="text-emerald-400 font-mono">Text.Proper</code>) for standardized customer names.
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
              Text Error Protocol
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Error / Pitfall</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Verification</th>
                  <th className="py-3 px-4">Guaranteed Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">1-Index Off-By-One Error</td>
                  <td className="py-3 px-4 text-slate-300">Passing index 1 to <code className="text-rose-300 font-mono">Text.Middle</code> expecting the first character.</td>
                  <td className="py-3 px-4 text-slate-400">The first letter of every extracted code is missing.</td>
                  <td className="py-3 px-4 text-emerald-400">Remember M is 0-indexed: pass <code className="text-emerald-400 font-mono">0</code> as start index!</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Comma Inside Quotes Split Break</td>
                  <td className="py-3 px-4 text-slate-300">Splitting by comma on addresses like <code className="text-amber-300 font-mono">"Kolkata, WB"</code> without quote style.</td>
                  <td className="py-3 px-4 text-slate-400">Creates unwanted extra columns shifting table alignment.</td>
                  <td className="py-3 px-4 text-emerald-400">Set <code className="text-emerald-400 font-mono">QuoteStyle.Csv</code> in Splitter.SplitTextByDelimiter.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Dot-In-Filename Extension Loss</td>
                  <td className="py-3 px-4 text-slate-300">Splitting file path by dot from the left on files named <code className="text-rose-300 font-mono">sales.v2.xlsx</code>.</td>
                  <td className="py-3 px-4 text-slate-400">Extracts 'v2.xlsx' instead of '.xlsx'.</td>
                  <td className="py-3 px-4 text-emerald-400">Use Text.AfterDelimiter with <code className="text-emerald-400 font-mono">{`{0, RelativePosition.FromEnd}`}</code>.</td>
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
              <span className="text-teal-400">💡</span> High-Speed Keyboard Shortcuts & Pro Tips
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Text Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">Split into Rows</span>
                <span>1NF Normalization</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Unrolls comma-separated multi-value lists into individual tabular records.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Text.PadStart</span>
                <span>Fixed-Width Padding</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Format standardized employee IDs with leading zeros: <code className="text-teal-300 font-mono">Text.PadStart(id, 6, "0")</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-teal-400 font-mono font-bold">Non-Digit to Digit</span>
                <span>Delimiterless Split</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Splits codes like <code className="text-teal-300 font-mono">INV1042</code> into <code className="text-teal-300 font-mono">INV | 1042</code> with 1 click.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-amber-400 font-mono font-bold">Text.Select</span>
                <span>Surgical Character Keep</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Extract digits 0-9 instantly from dirty formatted contact phone numbers.
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
                <strong>Reflect on 1NF normalization:</strong> Why is unnesting comma-separated lists into rows via <code className="text-teal-300 font-mono">Split into Rows</code> essential for building relational star schema models?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine reverse delimiter indexing:</strong> How does passing <code className="text-emerald-300 font-mono">{`{0, RelativePosition.FromEnd}`}</code> to <code className="text-teal-300 font-mono">Text.AfterDelimiter</code> guarantee accurate file extension extraction on complex filenames?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider surgical character selection:</strong> Why is using <code className="text-amber-300 font-mono">{'Text.Select([Str], {"0".."9"})'}</code> vastly cleaner and faster than nesting 5 separate <code className="text-rose-400 font-mono">Text.Replace</code> calls for phone sanitization?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Text Transformations & Delimiter Slicing — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Harness the power of declarative text engineering! Combine Text.Clean and Text.Trim before splitting, use 'Split into Rows' to normalize comma-separated lists into relational tabular data, leverage Text.BeforeDelimiter and Text.AfterDelimiter with reverse indexing for file paths, and remember that M is 0-indexed when working with Text.Middle!"
            }
          />
        </div>
      </div>
    </div>
  );
}
