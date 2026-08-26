"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/regex_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic4() {
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
              ⚡ Multi-Column Decomposition · Topic 4
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze & Deconstruct
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Global vs. First-Match Extractions & Capturing Groups in REGEXEXTRACT
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Extracting a single token is only the beginning of regular expression intelligence. 
            By leveraging the <code className="text-purple-300 font-mono font-bold">return_mode</code> parameter in 
            <code className="text-purple-300 font-mono font-bold">REGEXEXTRACT</code>, you can choose between extracting the 
            first match (<code className="text-amber-300 font-mono">mode 0</code>), global iteration of all occurrences 
            (<code className="text-sky-300 font-mono">mode 1</code>), or parenthetical <strong>Capturing Groups</strong> 
            (<code className="text-emerald-300 font-mono">mode 2</code>) to deconstruct complex composite strings 
            (like phone numbers, email components, and URL hierarchies) into multi-column relational grids in a single formula!
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Mode 1 (Global):</strong> Extracts all matches horizontally</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Mode 2 (Groups):</strong> Decomposes inner sub-units</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Non-Capturing (?:):</strong> Groups logic without extra columns</span>
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
              <span className="text-purple-400">⚡</span> The 3 Return Modes in REGEXEXTRACT
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Pattern: =REGEXEXTRACT(text, pattern, return_mode)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs sm:text-sm">
            {/* Mode 0 */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-xs">Mode 0 · First Match</span>
              <div className="text-white font-bold">
                =REGEXEXTRACT(A2, "\d+", <span className="text-amber-300 font-bold">0</span>)
              </div>
              <p className="font-sans text-xs text-slate-400">
                Returns only the first matching substring as a single scalar text cell.
              </p>
              <div className="p-2 bg-slate-900 rounded-lg text-amber-300 text-xs">
                "INV-101, INV-202" &rarr; "INV-101"
              </div>
            </div>

            {/* Mode 1 */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-xs">Mode 1 · Global Matches</span>
              <div className="text-white font-bold">
                =REGEXEXTRACT(A2, "\d+", <span className="text-sky-300 font-bold">1</span>)
              </div>
              <p className="font-sans text-xs text-slate-400">
                Extracts all occurrences across the string as a spilled horizontal vector.
              </p>
              <div className="p-2 bg-slate-900 rounded-lg text-sky-300 text-xs">
                "INV-101, INV-202" &rarr; 101 | 202
              </div>
            </div>

            {/* Mode 2 */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-xs">Mode 2 · Capturing Groups</span>
              <div className="text-white font-bold">
                =REGEXEXTRACT(A2, "(A)(B)", <span className="text-emerald-300 font-bold">2</span>)
              </div>
              <p className="font-sans text-xs text-slate-400">
                Spills each parenthetical capturing group <code className="text-emerald-300 font-mono">(...)</code> into adjacent columns.
              </p>
              <div className="p-2 bg-slate-900 rounded-lg text-emerald-300 text-xs">
                "swadeep@corp.in" &rarr; swadeep | corp.in
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Syntax Pattern</th>
                  <th className="py-3 px-4">Group Type</th>
                  <th className="py-3 px-4">Return Mode 2 Behavior</th>
                  <th className="py-3 px-4">Corporate Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400">(pattern)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Capturing Group</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Spills to Separate Column</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Isolating Area Code, Username, or Year.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-400">(?:pattern)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Non-Capturing Group</td>
                  <td className="py-3 px-4 text-slate-400">Ignored in Spilled Output</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Grouping http/https prefixes without creating extra columns.</td>
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
              <span className="text-emerald-400">🔬</span> Structural Decomposition & Vector Transformations
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Relational Text ETL
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Capturing Groups vs Multi-Column Slicing
              </h3>
              <p className="leading-relaxed">
                Traditional spreadsheet ETL required 4 separate formulas with <code className="text-rose-400 font-mono">MID/FIND</code> to split a phone string like <code className="text-amber-300 font-mono">+91-(033)-2592-1144 Ext: 204</code>. 
                With <code className="text-emerald-300 font-mono">return_mode = 2</code>, a single formula spills 
                <strong>Country Code, Area Code, Local Number, and Extension</strong> simultaneously into 4 adjacent columns!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                Single-Formula 4-Column Relational Decomposition
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Transposing Global Matches with TOCOL
              </h3>
              <p className="leading-relaxed">
                When extracting all keywords from a narrative using <code className="text-sky-300 font-mono">return_mode = 1</code>, 
                Excel spills horizontally. Wrapping in <code className="text-emerald-300 font-mono">TOCOL()</code> instantly transposes matches into a vertical column, ready for <code className="text-amber-300 font-mono">SORT(UNIQUE(...))</code> aggregation!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                =SORT(UNIQUE(TOCOL(REGEXEXTRACT(A2, "\bINV-\d+\b", 1))))
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Extracting Specific Groups with CHOOSECOLS
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              If you only want the Domain Name (Group 2) from an email string without spilling the Username:
              <br />
              <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm">
                =CHOOSECOLS(REGEXEXTRACT(A2, "^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{"{2,}"})$", 2), 2)
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
              <span className="text-purple-400">📐</span> Visual Capturing Groups Multi-Column Decomposition
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Capturing Groups Spilling Flow
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Trace how a contact string is decomposed into 3 distinct database columns using Capturing Groups (Mode 2):
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
                "+91-(033)-2592-1144 Ext: 204"
              </text>

              {/* Group Decomposition Engine */}
              {/* Group 1 */}
              <rect x="25" y="105" width="180" height="150" rx="10" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
              <rect x="25" y="105" width="180" height="30" rx="10" fill="#0284C7" fillOpacity="0.3" />
              <text x="115" y="125" fill="#BAE6FD" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">GROUP 1: COUNTRY</text>
              <text x="115" y="155" fill="#38BDF8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">^\+(\d{"{1,3}"})</text>

              <g transform="translate(35, 175)">
                <rect width="160" height="35" rx="6" fill="#064E3B" stroke="#10B981" />
                <text x="80" y="22" fill="#FDE047" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">"+91"</text>
              </g>
              <text x="115" y="235" fill="#A7F3D0" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Spilled Column 1</text>

              {/* Group 2 */}
              <rect x="225" y="105" width="180" height="150" rx="10" fill="#0F172A" stroke="#A855F7" strokeWidth="1.5" />
              <rect x="225" y="105" width="180" height="30" rx="10" fill="#7E22CE" fillOpacity="0.3" />
              <text x="315" y="125" fill="#F3E8FF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">GROUP 2: AREA</text>
              <text x="315" y="155" fill="#C084FC" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">\((\d{"{3}"})\)</text>

              <g transform="translate(235, 175)">
                <rect width="160" height="35" rx="6" fill="#064E3B" stroke="#10B981" />
                <text x="80" y="22" fill="#FDE047" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">"033"</text>
              </g>
              <text x="315" y="235" fill="#A7F3D0" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Spilled Column 2</text>

              {/* Group 3 */}
              <rect x="425" y="105" width="210" height="150" rx="10" fill="#0F172A" stroke="#10B981" strokeWidth="1.5" />
              <rect x="425" y="105" width="210" height="30" rx="10" fill="#059669" fillOpacity="0.3" />
              <text x="530" y="125" fill="#A7F3D0" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">GROUP 3: LOCAL NUMBER</text>
              <text x="530" y="155" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">(\d{"{4}"}-\d{"{4}"})</text>

              <g transform="translate(435, 175)">
                <rect width="190" height="35" rx="6" fill="#064E3B" stroke="#10B981" />
                <text x="95" y="22" fill="#FDE047" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">"2592-1144"</text>
              </g>
              <text x="530" y="235" fill="#A7F3D0" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Spilled Column 3</text>

              {/* Group 4 */}
              <rect x="655" y="105" width="170" height="150" rx="10" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.5" />
              <rect x="655" y="105" width="170" height="30" rx="10" fill="#B45309" fillOpacity="0.3" />
              <text x="740" y="125" fill="#FEF3C7" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">GROUP 4: EXT</text>
              <text x="740" y="155" fill="#FBBF24" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Ext:\s*(\d+)</text>

              <g transform="translate(665, 175)">
                <rect width="150" height="35" rx="6" fill="#064E3B" stroke="#10B981" />
                <text x="75" y="22" fill="#FDE047" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">"204"</text>
              </g>
              <text x="740" y="235" fill="#A7F3D0" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Spilled Column 4</text>

              {/* Bottom Result */}
              <rect x="25" y="275" width="800" height="40" rx="8" fill="#1E293B" stroke="#334155" />
              <text x="425" y="299" fill="#38BDF8" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                Formula: =REGEXEXTRACT(A2, pattern, 2) &rarr; Spills 4 Relational Columns Instantly
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
                Explore the contact record decomposition dataset below or download the practice workbook to test Capturing Groups (Mode 2) in Microsoft Excel.
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
            sheetName="Topic4_Groups_Global"
            title="Capturing Groups & Global Extraction Dataset (Record ID, Raw Contact String, Country, Area, Extension)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · Telecom Master Directory</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Single-Formula 4-Group Phone Decomposition
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Telecom Specialist <strong>Swadeep Banerjee</strong> writes: 
                <code className="text-emerald-300 font-mono">=REGEXEXTRACT(B5, "^\+(\d+)-\((\d+)\)-([\d-]+)\s*Ext:\s*(\d+)$", 2)</code>. 
                Deconstructs 15,000 corporate phone entries into Country, Area Code, Number, and Extension in 1 step!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Mode 2: Spills 4 columns simultaneously across all rows
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Global Email Analytics</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Username & Corporate Domain Isolation
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Data Architect <strong>Tuhina Mukherjee</strong> splits email addresses: 
                <code className="text-amber-300 font-mono">=REGEXEXTRACT(Email, "^([^@]+)@([^.]+)\.(.+)$", 2)</code>. 
                Spills Username, Company Domain, and Top-Level Domain into separate columns for domain reputation audits.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Extracts: "swadeep.b" | "corp" | "co.in"
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · ERP Audit Log Analysis</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Global Extraction with TOCOL & UNIQUE
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Security Auditor <strong>Abhronila Sengupta</strong> pulls all IP addresses from multi-line security logs: 
                <code className="text-indigo-300 font-mono">=UNIQUE(TOCOL(REGEXEXTRACT(LogBlock, "\b(?:\d{"{1,3}"}\.){"{3}"}\d{"{1,3}"}\b", 1)))</code>, 
                generating a clean unique list of client IPs.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Mode 1 + TOCOL + UNIQUE: Automated Security IP Inventory
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · HR Roster ETL Pipeline</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                First, Middle, and Last Name Splitting
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                HR Manager <strong>Debangshu Ghosh</strong> parses complex employee full names: 
                <code className="text-amber-300 font-mono">=REGEXEXTRACT(FullName, "^(\w+)\s+(?:(\w+)\s+)?(\w+)$", 2)</code>, 
                handling optional middle names gracefully with empty cell fallbacks.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Capturing Groups with Optional Middle Name Spilling
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
              <span className="text-purple-400">🪜</span> Step-by-Step Capturing Groups Implementation Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Identify Composite String</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Composite phone string in cell <code className="text-amber-300 font-mono">B5</code>: <code className="text-amber-300 font-mono">+91-(033)-2592-1144 Ext: 204</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Define Parentheses (...) Around Each Target Field</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Pattern: <code className="text-emerald-400 font-mono">"^\+(\d{"{1,3}"})-\((\d{"{3}"})\)-([\d-]+)\s*Ext:\s*(\d+)$"</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Set return_mode = 2</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">C5</code>, write: <code className="text-purple-300 font-mono">=REGEXEXTRACT(B5, pattern, 2)</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Press Enter & Verify 4-Column Spill</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press Enter. The 4 decomposed fields spill across <code className="text-emerald-300 font-mono">C5:F5</code> instantly!
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
                  <td className="py-3 px-4 text-slate-300">Adjacent horizontal destination cells contain existing data or merged cells.</td>
                  <td className="py-3 px-4 text-slate-400">Inspect the horizontal spill path to the right.</td>
                  <td className="py-3 px-4 text-emerald-400">Clear obstructing cells to permit automatic multi-column spill.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE! (Missing Groups)</td>
                  <td className="py-3 px-4 text-slate-300">Specified <code className="text-rose-300 font-mono">return_mode = 2</code> on a pattern with zero capturing groups <code className="text-rose-300 font-mono">(...)</code>.</td>
                  <td className="py-3 px-4 text-slate-400">Pattern lacks parenthetical groups.</td>
                  <td className="py-3 px-4 text-emerald-400">Enclose target tokens in parentheses <code className="text-emerald-400 font-mono">(...)</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#N/A</td>
                  <td className="py-3 px-4 text-slate-300">Overall pattern failed to match the target string.</td>
                  <td className="py-3 px-4 text-slate-400">Pattern mismatch against input string.</td>
                  <td className="py-3 px-4 text-emerald-400">Wrap formula in <code className="text-emerald-400 font-mono">IFNA(REGEXEXTRACT(...), "")</code>.</td>
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
              Capturing Groups Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">CHOOSECOLS</span>
                <span>Isolate Specific Group</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Extract only Group 2: <code className="text-emerald-300 font-mono">=CHOOSECOLS(REGEXEXTRACT(A2, pat, 2), 2)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Non-Capturing (?:)</span>
                <span>Clean Output</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Group without spilling extra columns: <code className="text-sky-300 font-mono">(?:https?:\/\/)?(\w+)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-purple-400 font-mono font-bold">TOCOL + UNIQUE</span>
                <span>Global Stacking</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Stack all matches vertically: <code className="text-purple-300 font-mono">=UNIQUE(TOCOL(REGEXEXTRACT(A2, pat, 1)))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">F9</kbd>
                <span>Group Vector Check</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight REGEXEXTRACT formula and press <strong>F9</strong> to inspect spilled group arrays in RAM.
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
                <strong>Reflect on return mode architecture:</strong> How does <code className="text-purple-300 font-mono">return_mode = 2</code> fundamentally transform <code className="text-purple-300 font-mono">REGEXEXTRACT</code> from a simple substring finder into a multi-column relational ETL parser?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine non-capturing groups:</strong> Why is using <code className="text-amber-300 font-mono">(?:https?:\/\/)</code> preferable to <code className="text-rose-400 font-mono">(https?:\/\/)</code> when you only want to extract the domain name into your worksheet?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider array composition:</strong> How does combining global extractions (<code className="text-sky-300 font-mono">mode 1</code>) with <code className="text-emerald-300 font-mono">TOCOL</code>, <code className="text-cyan-300 font-mono">UNIQUE</code>, and <code className="text-purple-300 font-mono">SORT</code> automate complex keyword log analytics in a single formula?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Capturing Groups & Global Extractions — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Capturing Groups in REGEXEXTRACT (return_mode = 2) represent the gold standard of spreadsheet data transformation. By decomposing composite strings (like phone numbers, email domains, and banking codes) into parenthetical sub-units, you can generate clean, multi-column relational database fields in a single formula with zero helper columns!"
            }
          />
        </div>
      </div>
    </div>
  );
}
