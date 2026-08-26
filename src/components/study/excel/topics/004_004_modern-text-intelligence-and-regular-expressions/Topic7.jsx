"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/regex_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic7() {
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
              ⚡ Prefix & Leading Text Engine · Topic 7
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 3: Apply & Extract
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Extracting Prefixes and Leading Data with TEXTBEFORE
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Legacy spreadsheet formulas required error-prone index calculations like 
            <code className="text-rose-400 font-mono">LEFT(A1, FIND("@", A1)-1)</code> to extract leading text before a delimiter. 
            The modern <code className="text-purple-300 font-mono font-bold">TEXTBEFORE</code> function replaces all legacy prefix 
            manipulation with an intuitive, dynamic array engine supporting <strong>negative instance slicing</strong> 
            (<code className="text-emerald-300 font-mono">-1</code> for text before the last delimiter), array constants of delimiters, 
            and built-in fallback error protection.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Surgical Prefix Extraction:</strong> Pulls leading text before delimiters</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Negative Instance (-1):</strong> Extracts directory paths before last slash</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>match_end = 1:</strong> Automatic fallback for single-word entries</span>
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
              <span className="text-purple-400">⚡</span> Formula Anatomy: =TEXTBEFORE()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Pattern: =TEXTBEFORE(text, delimiter, [instance_num], [match_mode], [match_end], [if_not_found])
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-purple-300 space-y-2">
            <span className="text-slate-500">// Complete Parameter Structure</span>
            <div className="mt-1 text-white font-bold">
              =TEXTBEFORE(<span className="text-sky-300">text</span>, <span className="text-amber-300">delimiter</span>, <span className="text-yellow-300">[instance_num]</span>, <span className="text-purple-300">[match_mode]</span>, <span className="text-emerald-300">[match_end]</span>, <span className="text-slate-400">[if_not_found]</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Example: Extract Username from Corporate Email</span> <br />
              <span className="text-emerald-400 font-bold">
                =TEXTBEFORE(B5, "@")
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
                  <th className="py-3 px-4">Execution Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-300">text</td>
                  <td className="py-3 px-4 text-slate-300">Source String</td>
                  <td className="py-3 px-4 text-emerald-400">Cell / Range</td>
                  <td className="py-3 px-4 font-sans text-slate-300">The string from which leading text is extracted.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">delimiter</td>
                  <td className="py-3 px-4 text-slate-300">Split Boundary</td>
                  <td className="py-3 px-4 text-emerald-400">Text / Array {`{...}`}</td>
                  <td className="py-3 px-4 font-sans text-slate-300">The delimiter character or substring marking the extraction boundary.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-yellow-300">[instance_num]</td>
                  <td className="py-3 px-4 text-slate-300">Occurrence Index</td>
                  <td className="py-3 px-4 text-slate-400">1 (Default) / -1</td>
                  <td className="py-3 px-4 font-sans text-slate-300"><code className="text-emerald-400 font-mono">1</code> = 1st instance from left; <code className="text-sky-300 font-mono">-1</code> = last instance from right.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-300">[match_end]</td>
                  <td className="py-3 px-4 text-slate-300">End-of-String Mode</td>
                  <td className="py-3 px-4 text-slate-400">0 (Default) / 1</td>
                  <td className="py-3 px-4 font-sans text-slate-300"><code className="text-emerald-400 font-mono">1</code> treats end of text as delimiter, returning full string if delimiter absent.</td>
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
              <span className="text-emerald-400">🔬</span> Negative Instance Slicing & Built-in Defensive Fallbacks
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Leading Text Engine Mechanics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Negative Instance Right-to-Left Slicing (-1)
              </h3>
              <p className="leading-relaxed">
                When parsing file paths like <code className="text-sky-300 font-mono">C:\Users\Admin\Reports\Audit.xlsx</code>, 
                you want to isolate the parent folder path. Passing <code className="text-emerald-300 font-mono">instance_num = -1</code> 
                extracts everything before the <strong>last backslash</strong>: <code className="text-emerald-300 font-mono">C:\Users\Admin\Reports</code> in 1 formula!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                =TEXTBEFORE(FilePath, "\", -1) &rarr; Extracts Parent Directory
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> match_end = 1 Defensive Protection
              </h3>
              <p className="leading-relaxed">
                When extracting first names with <code className="text-amber-300 font-mono">=TEXTBEFORE(A2, " ")</code>, 
                a single-word name like <code className="text-rose-400 font-mono">"Madonna"</code> triggers #N/A. 
                Setting <code className="text-emerald-300 font-mono">match_end = 1</code> returns <code className="text-emerald-300 font-mono">"Madonna"</code> automatically!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                =TEXTBEFORE(Name, " ", , , 1) &rarr; Zero #N/A Errors on Single Words
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Multi-Delimiter Prefix Matching with Array Constants
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Extract everything before the first occurrence of either a hyphen, slash, or colon:
              <br />
              <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm">
                =TEXTBEFORE(SKU_Code, {`{"-", "/", ":"}`})
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
              <span className="text-purple-400">📐</span> Visual Negative Instance Path Slicing Architecture
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Negative Instance -1 Flow
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Observe how TEXTBEFORE with instance -1 extracts parent folder paths from full file paths:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Full File Path Header */}
              <rect x="25" y="25" width="800" height="50" rx="8" fill="#1E1B4B" stroke="#6366F1" strokeWidth="1.5" />
              <text x="425" y="55" fill="#E0E7FF" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                "C:\Reports\2026\Corporate_Audit_Master.xlsx"
              </text>

              {/* Extraction Execution Box */}
              <rect x="25" y="100" width="370" height="150" rx="10" fill="#0F172A" stroke="#9333EA" strokeWidth="1.5" />
              <rect x="25" y="100" width="370" height="30" rx="10" fill="#6B21A8" fillOpacity="0.4" />
              <text x="210" y="120" fill="#FAF5FF" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">TEXTBEFORE WITH INSTANCE -1</text>
              <text x="210" y="150" fill="#F5D0FE" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">=TEXTBEFORE(A2, "\", -1)</text>

              <g transform="translate(45, 170)" fontSize="9" fontFamily="sans-serif" fill="#E2E8F0">
                <text x="0" y="15">Delimiter = "\" (Backslash)</text>
                <text x="0" y="35">instance_num = -1 &rarr; Searches from right to left</text>
                <text x="0" y="55" fill="#34D399">Stops at the last "\" before filename</text>
              </g>

              {/* Arrow */}
              <path d="M 415 175 L 460 175" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="465,175 455,170 455,180" fill="#10B981" />

              {/* Result Box (Right) */}
              <rect x="475" y="100" width="350" height="150" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="1.5" />
              <rect x="475" y="100" width="350" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="650" y="120" fill="#34D399" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">EXTRACTED PARENT FOLDER PATH</text>

              <g transform="translate(495, 150)">
                <rect width="310" height="40" rx="6" fill="#064E3B" stroke="#10B981" />
                <text x="155" y="25" fill="#FDE047" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">"C:\Reports\2026"</text>
              </g>
              <text x="650" y="225" fill="#A7F3D0" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">
                Filename Stripped · Parent Directory Isolated in 1 Step
              </text>

              {/* Bottom Result */}
              <rect x="25" y="270" width="800" height="35" rx="8" fill="#1E293B" stroke="#334155" />
              <text x="425" y="292" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                Zero Complex MID/FIND/LEN Formulas Required!
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
                Explore the prefix extraction dataset below or download the master practice workbook to test <code className="text-purple-300 font-mono">TEXTBEFORE</code> in Microsoft Excel.
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
            sheetName="Topic7_TEXTBEFORE"
            title="Prefix & Leading Text Extraction Dataset (Record ID, Raw Text, Delimiter, Instance, Extracted Prefix)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · System File Management</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Parent Directory Path Extraction
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Infrastructure Lead <strong>Swadeep Banerjee</strong> isolates folder paths from 10,000 server file paths: 
                <code className="text-emerald-300 font-mono">=TEXTBEFORE(B5, "\", -1)</code>. 
                Instantly strips the file name and returns clean directory paths.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =TEXTBEFORE(FilePath, "\", -1) &rarr; "C:\Reports\2026"
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · CRM User Ingestion</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Single-Step Email Username Extraction
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                CRM Analyst <strong>Tuhina Mukherjee</strong> extracts usernames for Active Directory onboarding: 
                <code className="text-amber-300 font-mono">=TEXTBEFORE(B5, "@")</code>, 
                eliminating legacy LEFT/FIND formulas across 5,000 corporate staff records.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Extracts: "swadeep.b" from "swadeep.b@corp.in"
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Inventory Warehouse Management</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Multi-Delimiter SKU Prefix Parsing
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Warehouse Manager <strong>Abhronila Sengupta</strong> extracts category prefixes: 
                <code className="text-indigo-300 font-mono">=TEXTBEFORE(SKU, {`{"-", "/", ":"}`})</code>, 
                grouping items by category regardless of legacy delimiter format variations.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Parses "ELEC-88421" and "ELEC/9921" &rarr; "ELEC"
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Web Data Analytics</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                URL Protocol & Domain Isolation
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                SEO Lead <strong>Debangshu Ghosh</strong> extracts clean URLs before tracking query strings: 
                <code className="text-amber-300 font-mono">=TEXTBEFORE(URL, "?", , , 1)</code>, 
                stripping UTM campaign query tags while gracefully preserving URLs without queries.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                match_end = 1: Safely strips ?utm_source while preserving clean URLs
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
              <span className="text-purple-400">🪜</span> Step-by-Step TEXTBEFORE Implementation Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Identify String & Target Delimiter Boundary</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Target string in cell <code className="text-amber-300 font-mono">B5</code>: <code className="text-amber-300 font-mono">swadeep.b@corp.in</code>. Delimiter: <code className="text-emerald-400 font-mono">"@"</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Determine Instance Number</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Use <code className="text-amber-300 font-mono">1</code> for first occurrence or <code className="text-amber-300 font-mono">-1</code> for last occurrence.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Add match_end or Fallback Protection</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Set <code className="text-emerald-300 font-mono">match_end = 1</code> if delimiter might be absent.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Press Enter & Verify Extracted Prefix</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">C5</code>, write: <code className="text-purple-300 font-mono">=TEXTBEFORE(B5, "@")</code>. Evaluates to <code className="text-emerald-300 font-mono font-bold">swadeep.b</code>!
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#N/A</td>
                  <td className="py-3 px-4 text-slate-300">Delimiter was not found anywhere in the target string.</td>
                  <td className="py-3 px-4 text-slate-400">Target cell lacks the expected delimiter character.</td>
                  <td className="py-3 px-4 text-emerald-400">Supply fallback in <code className="text-emerald-400 font-mono">if_not_found</code> or set <code className="text-emerald-400 font-mono">match_end = 1</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Instance Overflow #VALUE!</td>
                  <td className="py-3 px-4 text-slate-300">Requested instance number (e.g. 5) exceeds total occurrences of the delimiter.</td>
                  <td className="py-3 px-4 text-slate-400">String contains only 2 commas, but formula asked for 5.</td>
                  <td className="py-3 px-4 text-emerald-400">Adjust instance_num to match data bounds or use -1.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Case Sensitivity Miss</td>
                  <td className="py-3 px-4 text-slate-300">Delimiter case mismatch (e.g. searching for "INV-" when string has "inv-").</td>
                  <td className="py-3 px-4 text-slate-400">Check case of delimiter string.</td>
                  <td className="py-3 px-4 text-emerald-400">Pass <code className="text-emerald-400 font-mono">1</code> as the 4th argument (<code className="text-emerald-400 font-mono">match_mode = 1</code>).</td>
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
              Prefix Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">instance = -1</span>
                <span>Parent Folder Path</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Extract directory: <code className="text-emerald-300 font-mono">=TEXTBEFORE(A2, "\", -1)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">match_end = 1</span>
                <span>Single-Word Safety</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Prevent #N/A errors on names: <code className="text-sky-300 font-mono">=TEXTBEFORE(A2, " ", , , 1)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-purple-400 font-mono font-bold">Array Delimiters</span>
                <span>Multi-Separator Match</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Match hyphen or slash: <code className="text-purple-300 font-mono">=TEXTBEFORE(A2, {`{"-", "/"}`})</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">F9</kbd>
                <span>Preview Leading Text</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight TEXTBEFORE formula and press <strong>F9</strong> to inspect extracted prefix in RAM.
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
                <strong>Reflect on formula simplicity:</strong> Why is writing <code className="text-emerald-300 font-mono">=TEXTBEFORE(A2, "@")</code> 100% cleaner and less error-prone than legacy <code className="text-rose-400 font-mono">=LEFT(A2, FIND("@", A2)-1)</code>?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine negative instances:</strong> How does passing <code className="text-purple-300 font-mono">instance_num = -1</code> allow you to strip the filename and extract the parent directory path in 1 step?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider defensive programming:</strong> Why is setting <code className="text-emerald-300 font-mono">match_end = 1</code> essential when parsing full name lists that may contain single-word names without spaces?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Prefix & Leading Text Extraction with TEXTBEFORE — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "TEXTBEFORE makes legacy LEFT/FIND formulas completely obsolete. Master negative instance numbers (-1) to extract parent directory paths before the last slash, leverage match_end = 1 to handle missing delimiters gracefully, and pass array constants ({...}) for robust multi-delimiter prefix extraction across enterprise financial models!"
            }
          />
        </div>
      </div>
    </div>
  );
}
