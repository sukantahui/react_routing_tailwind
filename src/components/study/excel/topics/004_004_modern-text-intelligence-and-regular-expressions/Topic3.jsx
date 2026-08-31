"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_004_modern_text_intelligence_and_regular_expressions_master.xlsx?url";
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
              ⚡ Substring Extraction Engine · Topic 3
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze & Extract
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Extracting Substrings Matching Regex Patterns with REGEXEXTRACT
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Unstructured banking narrations, ERP export descriptions, web-scraped comments, and invoice logs 
            often contain critical transaction codes, dates, and amounts buried inside chaotic text. 
            The <code className="text-purple-300 font-mono font-bold">REGEXEXTRACT</code> function parses these complex 
            strings with surgical accuracy, extracting isolated token substrings or dynamic spilled arrays in a 
            single formula without fragile character-offset math or macros.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Token Extraction:</strong> Pulls invoice IDs, dates & amounts</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>3 Return Modes:</strong> First match, all matches, or groups</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Lookaround Assertions:</strong> Clean value extraction without prefix noise</span>
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
              <span className="text-purple-400">⚡</span> Formula Anatomy: =REGEXEXTRACT()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Pattern: =REGEXEXTRACT(text, pattern, [return_mode], [case_sens])
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-purple-300 space-y-2">
            <span className="text-slate-500">// Token Extraction Formula Structure</span>
            <div className="mt-1 text-white font-bold">
              =REGEXEXTRACT(<span className="text-sky-300">text</span>, <span className="text-amber-300">pattern</span>, <span className="text-yellow-300">[return_mode]</span>, <span className="text-slate-400">[case_sensitivity]</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Example: Extract Invoice ID from Banking Narration</span> <br />
              <span className="text-emerald-400 font-bold">
                =REGEXEXTRACT(B5, "INV-\d{"{4,6}"}")
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4">Syntax Role</th>
                  <th className="py-3 px-4">Options</th>
                  <th className="py-3 px-4">Extraction Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-300">text</td>
                  <td className="py-3 px-4 text-slate-300">Target String</td>
                  <td className="py-3 px-4 text-emerald-400">Cell / Range</td>
                  <td className="py-3 px-4 font-sans text-slate-300">The string or column range from which tokens are extracted.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">pattern</td>
                  <td className="py-3 px-4 text-slate-300">Regex Rule</td>
                  <td className="py-3 px-4 text-emerald-400">PCRE String</td>
                  <td className="py-3 px-4 font-sans text-slate-300">The pattern describing the target token (e.g. <code className="text-emerald-400 font-mono">\bINV-\d+\b</code>).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-yellow-300">[return_mode]</td>
                  <td className="py-3 px-4 text-slate-300">Spill Behavior</td>
                  <td className="py-3 px-4 text-slate-400">0, 1, or 2</td>
                  <td className="py-3 px-4 font-sans text-slate-300"><code className="text-emerald-400 font-mono">0</code> = First Match (Default), <code className="text-sky-300 font-mono">1</code> = All Matches (Array), <code className="text-purple-300 font-mono">2</code> = Capturing Groups.</td>
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
              <span className="text-emerald-400">🔬</span> Lookaround Assertions & Dynamic Extraction Pipelines
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Surgical Token Extraction
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Lookbehind Value Extraction
              </h3>
              <p className="leading-relaxed">
                When you want only the numeric price without the currency prefix <code className="text-amber-300 font-mono">"INR "</code>, 
                use a <strong>positive lookbehind</strong>: <code className="text-emerald-300 font-mono">{"(?<=INR\\s)\\d+(\\.\\d{2})?"}</code>. 
                Matches only the digits while discarding the <code className="text-amber-300 font-mono">"INR "</code> prefix!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                {"(?<=INR\\s)\\d+ → Extracts Clean Numeric Value"}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Handling #N/A & Numeric Coercion
              </h3>
              <p className="leading-relaxed">
                If a narration lacks an invoice code, REGEXEXTRACT returns <code className="text-rose-400 font-mono">#N/A</code>. 
                Wrap in <code className="text-emerald-300 font-mono">IFNA(REGEXEXTRACT(...), "")</code> for clean reporting. 
                For numeric calculations, wrap in <code className="text-sky-300 font-mono">NUMBERVALUE()</code> or apply double unary <code className="text-sky-300 font-mono">--</code>.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                =NUMBERVALUE(IFNA(REGEXEXTRACT(...), 0))
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Multi-Field Extraction Pipeline with HSTACK
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Extract Invoice ID, Transaction Date, and Net Amount in a single horizontal row:
              <br />
              <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm">
                {"=HSTACK(REGEXEXTRACT(B5, \"INV-\\d{5}\"), REGEXEXTRACT(B5, \"\\b\\d{2}-\\d{2}-\\d{4}\\b\"), NUMBERVALUE(REGEXEXTRACT(B5, \"(?<=INR\\s)\\d+(\\.\\d{2})?\")))"}
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
              <span className="text-purple-400">📐</span> Visual Unstructured Narration Parsing Pipeline
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Surgical Token Extraction
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Observe how REGEXEXTRACT parses a complex banking narration into structured fields:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 330"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Raw Narration (Top) */}
              <rect x="25" y="25" width="800" height="50" rx="8" fill="#1E1B4B" stroke="#6366F1" strokeWidth="1.5" />
              <text x="425" y="55" fill="#E0E7FF" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                "NEFT/INV-88421/12-04-2026/To Barrackpore Traders/INR 45000.00"
              </text>

              {/* Extraction Engines */}
              {/* 1. Invoice ID */}
              <rect x="25" y="105" width="250" height="150" rx="10" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
              <rect x="25" y="105" width="250" height="30" rx="10" fill="#0284C7" fillOpacity="0.3" />
              <text x="150" y="125" fill="#BAE6FD" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1. INVOICE ID ENGINE</text>
              <text x="150" y="155" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Pattern: "INV-\d{"{5}"}"</text>

              <g transform="translate(35, 175)">
                <rect width="230" height="35" rx="6" fill="#064E3B" stroke="#10B981" />
                <text x="115" y="22" fill="#FDE047" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">"INV-88421"</text>
              </g>
              <text x="150" y="235" fill="#A7F3D0" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Extracted Token</text>

              {/* 2. Date */}
              <rect x="300" y="105" width="250" height="150" rx="10" fill="#0F172A" stroke="#A855F7" strokeWidth="1.5" />
              <rect x="300" y="105" width="250" height="30" rx="10" fill="#7E22CE" fillOpacity="0.3" />
              <text x="425" y="125" fill="#F3E8FF" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2. DATE ENGINE</text>
              <text x="425" y="155" fill="#C084FC" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Pattern: "\b\d{"{2}"}-\d{"{2}"}-\d{"{4}"}\b"</text>

              <g transform="translate(310, 175)">
                <rect width="230" height="35" rx="6" fill="#064E3B" stroke="#10B981" />
                <text x="115" y="22" fill="#FDE047" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">"12-04-2026"</text>
              </g>
              <text x="425" y="235" fill="#A7F3D0" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Extracted Date String</text>

              {/* 3. Amount */}
              <rect x="575" y="105" width="250" height="150" rx="10" fill="#0F172A" stroke="#10B981" strokeWidth="1.5" />
              <rect x="575" y="105" width="250" height="30" rx="10" fill="#059669" fillOpacity="0.3" />
              <text x="700" y="125" fill="#A7F3D0" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3. AMOUNT ENGINE</text>
              <text x="700" y="155" fill="#34D399" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{'Pattern: "(?<=INR\\s)\\d+(\\.\\d{2})?"'}</text>

              <g transform="translate(585, 175)">
                <rect width="230" height="35" rx="6" fill="#064E3B" stroke="#10B981" />
                <text x="115" y="22" fill="#FDE047" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">₹45,000.00</text>
              </g>
              <text x="700" y="235" fill="#A7F3D0" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Converted via NUMBERVALUE()</text>

              {/* Bottom Result */}
              <rect x="25" y="275" width="800" height="40" rx="8" fill="#1E293B" stroke="#334155" />
              <text x="425" y="299" fill="#38BDF8" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                Pipeline Result: 3 Clean Database Columns Generated from Unstructured Narration
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
                Explore the banking log narration dataset below or download the master practice workbook to test <code className="text-purple-300 font-mono">REGEXEXTRACT</code> in Microsoft Excel.
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
            sheetName="EX1904"
            title="Banking Narration String Extraction Dataset (Log ID, Narration Text, Extracted Txn ID, Date, Amount ₹)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · Bank Statement Parsing</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore Advisory</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Single-Step Invoice ID & Date Extraction
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Accountant <strong>Swadeep Banerjee</strong> extracts invoice numbers from 20,000 messy bank statements: 
                <code className="text-emerald-300 font-mono">=REGEXEXTRACT(B5, "INV-\d{"{5}"}")</code>, 
                eliminating 5 nested MID/FIND formulas and cutting reconciliation time by 90%.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =REGEXEXTRACT(Narration, "INV-\d{5}") → "INV-88421"
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Accounts Payable Automation</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Lookbehind Clean Currency Extraction
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Treasury Manager <strong>Tuhina Mukherjee</strong> extracts net invoice totals from vendor descriptions: 
                <code className="text-amber-300 font-mono">{"=NUMBERVALUE(REGEXEXTRACT(B5, \"(?<=INR\\s)\\d+(\\.\\d{2})?\"))"}</code>, 
                automatically converting raw text amounts into computable Excel numbers.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Extracts "INR 45000.00" → Number 45000.00
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · ERP Migration & Audit</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Transaction Date Standardization
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Systems Auditor <strong>Abhronila Sengupta</strong> parses dates from legacy narrative logs: 
                <code className="text-indigo-300 font-mono">=REGEXEXTRACT(B5, "\b\d{"{2}"}[/-]\d{"{2}"}[/-]\d{"{4}"}\b")</code>, 
                standardizing varying `/` and `-` date formats into structured date columns.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Extracts: "12-04-2026" from free-form legacy narrative
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Multi-Field Horizontal Spill</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Simultaneous 3-Field Extraction with HSTACK
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Data Architect <strong>Debangshu Ghosh</strong> deploys an end-to-end extraction pipeline: 
                <code className="text-amber-300 font-mono">{"=HSTACK(REGEXEXTRACT(B5, \"INV-\\d{5}\"), REGEXEXTRACT(B5, \"\\d{2}-\\d{2}-\\d{4}\"), NUMBERVALUE(REGEXEXTRACT(B5, \"(?<=INR\\s)\\d+\")))"}</code>, 
                spilling complete database records in 1 formula!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                HSTACK + REGEXEXTRACT: Spills 3 Database Fields in 1 Formula
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
              <span className="text-purple-400">🪜</span> Step-by-Step REGEXEXTRACT Implementation Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Identify Target Substring in Free-Form Text</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Target: Invoice ID like <code className="text-amber-300 font-mono">INV-88421</code> inside banking narration cell <code className="text-amber-300 font-mono">B5</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Construct Token Regex Pattern</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Pattern: <code className="text-emerald-400 font-mono">"INV-\d{"{5}"}"</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Insert IFNA Defensive Wrapper</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">C5</code>, write: <code className="text-purple-300 font-mono">=IFNA(REGEXEXTRACT(B5, "INV-\d{"{5}"}"), "")</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Press Enter & Verify Extracted Token</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press Enter. <code className="text-emerald-300 font-mono font-bold">INV-88421</code> is extracted directly into cell C5!
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
                  <td className="py-3 px-4 text-slate-300">REGEXEXTRACT found zero matches matching the pattern in the target string.</td>
                  <td className="py-3 px-4 text-slate-400">Target text lacks the expected token.</td>
                  <td className="py-3 px-4 text-emerald-400">Wrap in <code className="text-emerald-400 font-mono">IFNA(REGEXEXTRACT(...), "")</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Text vs Number Type</td>
                  <td className="py-3 px-4 text-slate-300">REGEXEXTRACT returns a text string; attempting to SUM or average fails.</td>
                  <td className="py-3 px-4 text-slate-400">Extracted numbers align to the left as text.</td>
                  <td className="py-3 px-4 text-emerald-400">Wrap in <code className="text-emerald-400 font-mono">NUMBERVALUE(REGEXEXTRACT(...))</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE!</td>
                  <td className="py-3 px-4 text-slate-300">Invalid regex syntax (e.g. invalid lookahead/lookbehind syntax).</td>
                  <td className="py-3 px-4 text-slate-400">Check pattern syntax for typos.</td>
                  <td className="py-3 px-4 text-emerald-400">Correct the PCRE lookaround syntax.</td>
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
              Extraction Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">return_mode = 1</span>
                <span>Extract All Matches</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Extract every number or token across text: <code className="text-emerald-300 font-mono">=REGEXEXTRACT(A2, "\d+", 1)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Lookbehind (?&lt;=...)</span>
                <span>Clean Numbers</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Extract value without prefix: <code className="text-sky-300 font-mono">{"(?<=INR\\s)\\d+(\\.\\d{2})?"}</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-purple-400 font-mono font-bold">HSTACK Assembly</span>
                <span>Multi-Column Spilling</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Combine 3 extractions horizontally: <code className="text-purple-300 font-mono">=HSTACK(Ext1, Ext2, Ext3)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">F9</kbd>
                <span>RAM Token Check</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight REGEXEXTRACT formula and press <strong>F9</strong> to inspect extracted substrings in RAM.
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
                <strong>Reflect on pattern extraction vs index offsets:</strong> Why do legacy formulas like <code className="text-rose-400 font-mono">MID(A1, FIND("INV-", A1), 9)</code> break when invoice IDs have varying lengths, and how does <code className="text-purple-300 font-mono">REGEXEXTRACT</code> eliminate this fragility?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine lookaround assertions:</strong> How does the positive lookbehind <code className="text-emerald-300 font-mono">{"(?<=INR\\s)"}</code> allow you to extract clean numeric currency values without capturing the <code className="text-amber-300 font-mono">"INR "</code> text label?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider return mode flexibility:</strong> When should you use <code className="text-emerald-300 font-mono">return_mode = 0</code> (single first token) vs <code className="text-sky-300 font-mono">return_mode = 1</code> (spilled horizontal array of all matched items)?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Substring Extraction with REGEXEXTRACT — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "REGEXEXTRACT is the ultimate text parsing tool in modern Microsoft Excel. Never rely on fragile character-index arithmetic with MID and FIND! Master word boundaries (\\b), lookaround assertions, and return modes to transform messy banking narrations, ERP dumps, and server logs into pristine, structured database columns in pure formula RAM!"
            }
          />
        </div>
      </div>
    </div>
  );
}
