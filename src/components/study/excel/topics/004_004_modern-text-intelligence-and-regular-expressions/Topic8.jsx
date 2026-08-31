"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_004_modern_text_intelligence_and_regular_expressions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic8() {
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
              ⚡ Suffix & Trailing Data Engine · Topic 8
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 3: Apply & Extract
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Extracting Suffixes and Trailing Data with TEXTAFTER
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Legacy spreadsheet formulas required fragile length arithmetic like 
            <code className="text-rose-400 font-mono">MID(A1, FIND("@", A1)+1, 999)</code> to extract trailing text after a delimiter. 
            The modern <code className="text-purple-300 font-mono font-bold">TEXTAFTER</code> function provides a native, 
            high-speed dynamic array engine that extracts suffixes, domain names, file extensions, and last names with 
            <strong>negative instance slicing</strong> (<code className="text-emerald-300 font-mono">-1</code> for text after the last delimiter), 
            and seamlessly pairs with <code className="text-sky-300 font-mono font-bold">TEXTBEFORE</code> to extract tokens inside brackets or quotes!
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Trailing Data Extraction:</strong> Extracts domains, extensions & suffixes</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Negative Instance (-1):</strong> Isolates file extensions after final dot</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Composite Middle Extraction:</strong> TEXTBEFORE(TEXTAFTER(...))</span>
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
              <span className="text-purple-400">⚡</span> Formula Anatomy: =TEXTAFTER()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Pattern: =TEXTAFTER(text, delimiter, [instance_num], [match_mode], [match_end], [if_not_found])
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-purple-300 space-y-2">
            <span className="text-slate-500">// Complete Parameter Structure</span>
            <div className="mt-1 text-white font-bold">
              =TEXTAFTER(<span className="text-sky-300">text</span>, <span className="text-amber-300">delimiter</span>, <span className="text-yellow-300">[instance_num]</span>, <span className="text-purple-300">[match_mode]</span>, <span className="text-emerald-300">[match_end]</span>, <span className="text-slate-400">[if_not_found]</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Example: Extract File Extension After Last Dot</span> <br />
              <span className="text-emerald-400 font-bold">
                =TEXTAFTER(B5, ".", -1)
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
                  <td className="py-3 px-4 font-sans text-slate-300">The string from which trailing text is extracted.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">delimiter</td>
                  <td className="py-3 px-4 text-slate-300">Split Boundary</td>
                  <td className="py-3 px-4 text-emerald-400">Text / Array {`{...}`}</td>
                  <td className="py-3 px-4 font-sans text-slate-300">The delimiter substring after which trailing characters are extracted.</td>
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
                  <td className="py-3 px-4 font-sans text-slate-300"><code className="text-emerald-400 font-mono">1</code> treats end of text as delimiter, returning empty string if delimiter absent.</td>
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
              <span className="text-emerald-400">🔬</span> Negative Instance File Slicing & Composite Token Extraction
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Trailing Text Engine Mechanics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Negative Instance File Extension Extraction (-1)
              </h3>
              <p className="leading-relaxed">
                A file name like <code className="text-sky-300 font-mono">Corporate.Audit.Report.2026.xlsx</code> contains multiple dots. 
                Using <code className="text-emerald-300 font-mono">=TEXTAFTER(A2, ".", -1)</code> searches backwards from the right, 
                returning the true file extension <code className="text-emerald-300 font-mono">"xlsx"</code> without being confused by preceding dots!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                =TEXTAFTER("Audit.final.xlsx", ".", -1) → "xlsx"
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Composite Middle Token Extraction
              </h3>
              <p className="leading-relaxed">
                To extract text enclosed between delimiters (such as brackets <code className="text-amber-300 font-mono">[INFO]</code> or quotes <code className="text-amber-300 font-mono">"Barrackpore"</code>), 
                combine TEXTAFTER and TEXTBEFORE: 
                <code className="text-emerald-300 font-mono">=TEXTBEFORE(TEXTAFTER(A2, "["), "]")</code> in 1 clean step!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                =TEXTBEFORE(TEXTAFTER("[INFO] Server Up", "["), "]") → "INFO"
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Extracting Domain & Path from URL
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Extract everything following the protocol <code className="text-purple-300 font-mono">"://"</code>:
              <br />
              <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm">
                =TEXTAFTER("https://codernaccotax.co.in/tax/gst", "://") → "codernaccotax.co.in/tax/gst"
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
              <span className="text-purple-400">📐</span> Visual Negative Instance Trailing Slicing Pipeline
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Negative Instance -1 Flow
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Observe how TEXTAFTER with instance -1 isolates the file name and extension:
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
                "C:\Reports\2026\Corporate_Audit_Master.final.xlsx"
              </text>

              {/* Extraction Execution Box 1: File Name */}
              <rect x="25" y="100" width="370" height="150" rx="10" fill="#0F172A" stroke="#9333EA" strokeWidth="1.5" />
              <rect x="25" y="100" width="370" height="30" rx="10" fill="#6B21A8" fillOpacity="0.4" />
              <text x="210" y="120" fill="#FAF5FF" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1. FILE NAME (AFTER LAST \)</text>
              <text x="210" y="150" fill="#F5D0FE" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">=TEXTAFTER(A2, "\", -1)</text>

              <g transform="translate(45, 170)">
                <rect width="330" height="35" rx="6" fill="#064E3B" stroke="#10B981" />
                <text x="165" y="22" fill="#FDE047" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">"Corporate_Audit_Master.final.xlsx"</text>
              </g>
              <text x="210" y="235" fill="#A7F3D0" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Isolates File Name from Path</text>

              {/* Extraction Execution Box 2: Extension */}
              <rect x="445" y="100" width="380" height="150" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="1.5" />
              <rect x="445" y="100" width="380" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="635" y="120" fill="#34D399" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2. EXTENSION (AFTER LAST .)</text>
              <text x="635" y="150" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">=TEXTAFTER(A2, ".", -1)</text>

              <g transform="translate(465, 170)">
                <rect width="340" height="35" rx="6" fill="#064E3B" stroke="#10B981" />
                <text x="170" y="22" fill="#FDE047" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">"xlsx"</text>
              </g>
              <text x="635" y="235" fill="#A7F3D0" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Extracts True File Extension</text>

              {/* Bottom Result */}
              <rect x="25" y="270" width="800" height="35" rx="8" fill="#1E293B" stroke="#334155" />
              <text x="425" y="292" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                Zero Fragile Character Arithmetic or Len/Find Combinations!
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
                Explore the suffix extraction dataset below or download the master practice workbook to test <code className="text-purple-300 font-mono">TEXTAFTER</code> in Microsoft Excel.
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
            sheetName="EX1909"
            title="Suffix & Trailing Text Extraction Dataset (Record ID, Raw Text, Delimiter, Instance, Extracted Suffix)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · Email Domain Analytics</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Single-Formula Email Domain Isolation
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Marketing Operations Lead <strong>Swadeep Banerjee</strong> extracts company domains from 15,000 corporate leads: 
                <code className="text-emerald-300 font-mono">=TEXTAFTER(B5, "@")</code>. 
                Enables instant clustering of corporate accounts versus generic public webmail providers.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =TEXTAFTER(Email, "@") → "corp.in"
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · System Document Inventory</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                File Extension Extraction (-1 Instance)
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Document Archivist <strong>Tuhina Mukherjee</strong> catalogues server files: 
                <code className="text-amber-300 font-mono">=TEXTAFTER(FileName, ".", -1)</code>, 
                accurately isolating extensions (`pdf`, `xlsx`, `docx`) even when filenames contain multiple periods.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Extracts: "xlsx" from "Audit_Report.final.2026.xlsx"
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · ERP Audit Log Parsing</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Bracket Enclosed Token Extraction
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Security Auditor <strong>Abhronila Sengupta</strong> parses system events: 
                <code className="text-indigo-300 font-mono">=TEXTBEFORE(TEXTAFTER(LogLine, "["), "]")</code>, 
                extracting log severity tags (`INFO`, `WARN`, `ERROR`) in 1 formula without regex overhead.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Extracts: "WARN" from "[2026-08-26] [WARN] Memory Alert"
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · HR Roster Last Name Splitting</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Robust Last Name Extraction
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                HR Manager <strong>Debangshu Ghosh</strong> extracts employee surnames: 
                <code className="text-amber-300 font-mono">=TEXTAFTER(FullName, " ", -1)</code>, 
                handling multi-part names like <code className="text-slate-300 font-mono">Debangshu Kumar Ghosh</code> → <code className="text-emerald-300 font-mono">Ghosh</code> perfectly!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Negative instance -1 handles middle names effortlessly
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
              <span className="text-purple-400">🪜</span> Step-by-Step TEXTAFTER Implementation Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Identify Target Delimiter Boundary</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Target string: <code className="text-amber-300 font-mono">swadeep.b@corp.in</code>. Delimiter: <code className="text-emerald-400 font-mono">"@"</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Select Instance Direction</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Use <code className="text-amber-300 font-mono">1</code> for left-to-right (after 1st delimiter) or <code className="text-amber-300 font-mono">-1</code> for right-to-left (after last delimiter).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Add Fallback or End Matching</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Specify <code className="text-emerald-300 font-mono">if_not_found</code> parameter to catch missing delimiters gracefully.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Press Enter & Verify Extracted Suffix</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">C5</code>, write: <code className="text-purple-300 font-mono">=TEXTAFTER(B5, "@")</code>. Evaluates to <code className="text-emerald-300 font-mono font-bold">corp.in</code>!
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
                  <td className="py-3 px-4 text-slate-300">Delimiter was not found in the input string.</td>
                  <td className="py-3 px-4 text-slate-400">Target cell lacks the expected delimiter.</td>
                  <td className="py-3 px-4 text-emerald-400">Supply a default fallback in <code className="text-emerald-400 font-mono">if_not_found</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Wrong Extension Extracted</td>
                  <td className="py-3 px-4 text-slate-300">Used <code className="text-rose-300 font-mono">instance_num = 1</code> on a filename with multiple dots like <code className="text-rose-300 font-mono">Report.final.xlsx</code>.</td>
                  <td className="py-3 px-4 text-slate-400">Returns "final.xlsx" instead of "xlsx".</td>
                  <td className="py-3 px-4 text-emerald-400">Use negative instance <code className="text-emerald-400 font-mono">instance_num = -1</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Case Sensitivity Miss</td>
                  <td className="py-3 px-4 text-slate-300">Searching for uppercase "REF:" when text contains "ref:".</td>
                  <td className="py-3 px-4 text-slate-400">Delimiter case mismatch.</td>
                  <td className="py-3 px-4 text-emerald-400">Pass <code className="text-emerald-400 font-mono">1</code> for <code className="text-emerald-400 font-mono">match_mode</code>.</td>
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
              Suffix Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">instance = -1</span>
                <span>File Extension</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Extract true extension: <code className="text-emerald-300 font-mono">=TEXTAFTER(A2, ".", -1)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Composite Extraction</span>
                <span>Inside Brackets</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Extract text inside brackets: <code className="text-sky-300 font-mono">=TEXTBEFORE(TEXTAFTER(A2, "["), "]")</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-purple-400 font-mono font-bold">Last Name Extraction</span>
                <span>After Last Space</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Extract surname: <code className="text-purple-300 font-mono">=TEXTAFTER(A2, " ", -1)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">F9</kbd>
                <span>Preview Trailing Text</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight TEXTAFTER formula and press <strong>F9</strong> to inspect the extracted suffix in RAM.
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
                <strong>Reflect on formula architecture:</strong> Why is writing <code className="text-emerald-300 font-mono">=TEXTAFTER(A2, "@")</code> 100% cleaner and less brittle than legacy <code className="text-rose-400 font-mono">=MID(A2, FIND("@", A2)+1, 999)</code>?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine negative instances:</strong> How does <code className="text-purple-300 font-mono">instance_num = -1</code> allow you to accurately extract true file extensions even when filenames contain multiple internal dots?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider composite nesting:</strong> How does chaining <code className="text-emerald-300 font-mono">TEXTBEFORE(TEXTAFTER(A2, "["), "]")</code> isolate enclosed values without needing complex regex syntax?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Suffix & Trailing Data Extraction with TEXTAFTER — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "TEXTAFTER makes legacy MID/FIND length formulas completely obsolete. Master negative instance numbers (-1) to extract true file extensions and file names, and nest TEXTAFTER inside TEXTBEFORE to extract tokens enclosed between brackets, quotes, or tags in 1 clean, high-speed formula!"
            }
          />
        </div>
      </div>
    </div>
  );
}
