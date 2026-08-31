"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_004_modern_text_intelligence_and_regular_expressions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic1() {
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
              ⚡ Regex Grammar & Tokens · Topic 1
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 3: Apply & Build Patterns
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Regex Pattern Fundamentals: Metacharacters, Classes, Quantifiers & Anchors
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            A regular expression is an algorithmic pattern describing a set of strings. 
            To harness the full power of native Excel 365 Regex, data modelers must master the 
            <strong>4 foundational building blocks</strong>: 
            shorthand <strong>Metacharacters</strong> (<code className="text-purple-300 font-mono">\d, \w, \s</code>), 
            <strong>Character Classes</strong> (<code className="text-sky-300 font-mono">[A-Z], [^0-9]</code>), 
            <strong>Quantifiers</strong> (<code className="text-emerald-300 font-mono">+, *, ?, {"{n,m}"}</code>), and 
            zero-width <strong>Anchors</strong> (<code className="text-amber-300 font-mono">^, $, \b</code>).
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Metacharacters:</strong> Compact shorthand tokens</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Quantifiers:</strong> Exact repetition boundaries</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Anchors (^ $):</strong> 100% full-string validation</span>
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
              <span className="text-purple-400">⚡</span> The 4 Pillars of Regex Pattern Grammar
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Grammar Taxonomy
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-purple-300 space-y-2">
            <span className="text-slate-500">// Complete Pattern Anatomy: Indian PAN Tax Code</span>
            <div className="mt-1 text-white font-bold text-xs sm:text-sm">
              =<span className="text-purple-300">REGEXTEST</span>(A2, "<span className="text-amber-300">^</span><span className="text-sky-300">[A-Z]</span><span className="text-emerald-300">{"{5}"}</span><span className="text-purple-300">\d</span><span className="text-emerald-300">{"{4}"}</span><span className="text-sky-300">[A-Z]</span><span className="text-amber-300">$</span>")
            </div>
            <div className="mt-2 text-slate-400 text-xs">
              <span className="text-amber-300">^</span>: Start Anchor | <span className="text-sky-300">[A-Z]</span>: 5 Uppercase Letters | <span className="text-purple-300">\d{"{4}"}</span>: 4 Digits | <span className="text-sky-300">[A-Z]</span>: 1 Letter | <span className="text-amber-300">$</span>: End Anchor
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Pillar</th>
                  <th className="py-3 px-4">Core Syntax Tokens</th>
                  <th className="py-3 px-4">Pattern Meaning</th>
                  <th className="py-3 px-4">Example Target</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-400 font-sans">1. Metacharacters</td>
                  <td className="py-3 px-4 text-purple-300">\d, \w, \s, .</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Shorthand tokens for digits, word characters, whitespace, and wildcards.</td>
                  <td className="py-3 px-4 text-emerald-400">\d+ → 88421</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400 font-sans">2. Character Classes</td>
                  <td className="py-3 px-4 text-sky-300">[A-Z], [0-9], [^0-9]</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Explicit sets or ranges of allowable characters enclosed in brackets.</td>
                  <td className="py-3 px-4 text-emerald-400">[A-Z]{"{5}"} → ABCDE</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">3. Quantifiers</td>
                  <td className="py-3 px-4 text-emerald-300">+, *, ?, {"{n}"}, {"{n,m}"}</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Defines how many consecutive times the preceding token must occur.</td>
                  <td className="py-3 px-4 text-emerald-400">\d{"{6}"} → 700120</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-400 font-sans">4. Anchors</td>
                  <td className="py-3 px-4 text-amber-300">^, $, \b</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Zero-width assertions locking matching to string edges or word boundaries.</td>
                  <td className="py-3 px-4 text-emerald-400">^\d+$ → Pure Number</td>
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
              <span className="text-emerald-400">🔬</span> Greedy vs. Lazy Quantifiers & Escaping Metacharacters
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Parser Engine Mechanics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Greedy vs. Lazy Quantifiers
              </h3>
              <p className="leading-relaxed">
                By default, quantifiers (<code className="text-amber-300 font-mono">+</code>, <code className="text-amber-300 font-mono">*</code>) are <strong>greedy</strong>: 
                given <code className="text-rose-300 font-mono"><b>Text</b></code>, the pattern <code className="text-rose-300 font-mono"><.*></code> matches from the first <code className="text-rose-300 font-mono"><</code> to the final <code className="text-rose-300 font-mono">></code>! 
                Appending <code className="text-emerald-300 font-mono">?</code> makes it <strong>lazy</strong>: <code className="text-emerald-300 font-mono"><.*?></code> stops at each tag individually.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                <.*?> (Lazy) vs <.*> (Greedy)
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Escaping Special Metacharacters
              </h3>
              <p className="leading-relaxed">
                Characters like <code className="text-sky-300 font-mono">. \ + * ? [ ] ( ) {"{ }"} ^ $ |</code> carry special meaning in regex. 
                To search for a literal dot in a domain (e.g. <code className="text-emerald-300 font-mono">codernaccotax.co.in</code>), 
                you must escape it with a backslash: <code className="text-emerald-300 font-mono">\.</code>.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Literal Dot: \. | Literal Plus: \+ | Literal Slash: \\
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Why Anchors (^ and $) Are Non-Negotiable
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Without anchors, <code className="text-purple-300 font-mono">=REGEXTEST("123ABCDE1234F999", "[A-Z]{"{5}"}\d{"{4}"}[A-Z]")</code> returns <strong>TRUE</strong> because the pattern exists as a substring. 
              Adding <code className="text-emerald-300 font-mono">^[A-Z]{"{5}"}\d{"{4}"}[A-Z]$</code> forces strict end-to-end field validation, returning <strong>FALSE</strong>!
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
              <span className="text-purple-400">📐</span> Visual Pattern Token Decomposition & Matching Engine
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Token Decomposition
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Deconstruct how the regex pattern validates an Indian PAN Tax Code:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Pattern Header */}
              <rect x="25" y="25" width="800" height="45" rx="8" fill="#1E1B4B" stroke="#6366F1" strokeWidth="1.5" />
              <text x="425" y="52" fill="#F3E8FF" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                ^[A-Z]{"{5}"}\d{"{4}"}[A-Z]$
              </text>

              {/* 5 Token Blocks */}
              {/* 1. ^ */}
              <rect x="25" y="90" width="130" height="130" rx="10" fill="#0F172A" stroke="#EAB308" strokeWidth="1.5" />
              <rect x="25" y="90" width="130" height="28" rx="10" fill="#854D0E" fillOpacity="0.4" />
              <text x="90" y="109" fill="#FEF08A" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">START ANCHOR</text>
              <text x="90" y="145" fill="#FDE047" fontSize="20" fontWeight="bold" textAnchor="middle" fontFamily="monospace">^</text>
              <text x="90" y="180" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Start of string</text>
              <text x="90" y="195" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Zero-width assertion</text>

              {/* 2. [A-Z]{5} */}
              <rect x="175" y="90" width="160" height="130" rx="10" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
              <rect x="175" y="90" width="160" height="28" rx="10" fill="#0284C7" fillOpacity="0.4" />
              <text x="255" y="109" fill="#BAE6FD" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">LETTERS (5x)</text>
              <text x="255" y="145" fill="#38BDF8" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">[A-Z]{"{5}"}</text>
              <text x="255" y="180" fill="#A7F3D0" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">"ABCDE"</text>
              <text x="255" y="195" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="sans-serif">5 Uppercase chars</text>

              {/* 3. \d{4} */}
              <rect x="355" y="90" width="160" height="130" rx="10" fill="#0F172A" stroke="#A855F7" strokeWidth="1.5" />
              <rect x="355" y="90" width="160" height="28" rx="10" fill="#7E22CE" fillOpacity="0.4" />
              <text x="435" y="109" fill="#F3E8FF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">DIGITS (4x)</text>
              <text x="435" y="145" fill="#C084FC" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">\d{"{4}"}</text>
              <text x="435" y="180" fill="#A7F3D0" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">"1234"</text>
              <text x="435" y="195" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="sans-serif">4 Consecutive digits</text>

              {/* 4. [A-Z] */}
              <rect x="535" y="90" width="140" height="130" rx="10" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
              <rect x="535" y="90" width="140" height="28" rx="10" fill="#0284C7" fillOpacity="0.4" />
              <text x="605" y="109" fill="#BAE6FD" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CHECK LETTER</text>
              <text x="605" y="145" fill="#38BDF8" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">[A-Z]</text>
              <text x="605" y="180" fill="#A7F3D0" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">"F"</text>
              <text x="605" y="195" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="sans-serif">1 Trailing letter</text>

              {/* 5. $ */}
              <rect x="695" y="90" width="130" height="130" rx="10" fill="#0F172A" stroke="#EAB308" strokeWidth="1.5" />
              <rect x="695" y="90" width="130" height="28" rx="10" fill="#854D0E" fillOpacity="0.4" />
              <text x="760" y="109" fill="#FEF08A" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">END ANCHOR</text>
              <text x="760" y="145" fill="#FDE047" fontSize="20" fontWeight="bold" textAnchor="middle" fontFamily="monospace">$</text>
              <text x="760" y="180" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="sans-serif">End of string</text>
              <text x="760" y="195" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Zero-width assertion</text>

              {/* Match Result Banner */}
              <rect x="25" y="240" width="800" height="55" rx="10" fill="#064E3B" stroke="#10B981" strokeWidth="1.5" />
              <text x="425" y="263" fill="#A7F3D0" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                MATCH TARGET: "ABCDE1234F" → REGEXTEST Returns TRUE
              </text>
              <text x="425" y="282" fill="#E2E8F0" fontSize="9.5" textAnchor="middle" fontFamily="sans-serif">
                Exact 10-Character Field Conformity Verified with Zero False Positives
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
                Explore the regex token reference dataset below or download the practice workbook to test pattern building in Microsoft Excel.
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
            sheetName="EX1902"
            title="Regex Tokens & Fundamentals (Token, Description, Pattern, Sample Target, Expected Result)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · Logistics Postal Routing</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Indian Postal PIN Code Validation
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Dispatch Lead <strong>Swadeep Banerjee</strong> verifies delivery waybills: 
                <code className="text-emerald-300 font-mono">=REGEXTEST(D5, "^[1-9][0-9]{"{5}"}$")</code>. 
                Ensures PIN codes start with a non-zero digit and contain exactly 6 numbers.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =REGEXTEST(PIN, "^[1-9][0-9]{5}$") → TRUE
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Telecom & CRM Auditing</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                10-Digit Mobile Number Validation
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Customer Care Lead <strong>Tuhina Mukherjee</strong> checks client databases: 
                <code className="text-amber-300 font-mono">=REGEXTEST(C5, "^[6-9]\d{"{9}"}$")</code>, 
                flagging invalid telephone numbers that fail Indian TRAI mobile standards.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Pattern: ^[6-9]\d{9}$ → Validates 9830111223
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Financial Audit Compliance</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Decimal Currency String Verification
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Audit Specialist <strong>Abhronila Sengupta</strong> checks vouchers: 
                <code className="text-indigo-300 font-mono">=REGEXTEST(AmountStr, "^\d+(\.\d{"{2}"})?$")</code>, 
                guaranteeing that input currency fields have at most 2 decimal places.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Pattern: ^\d+(\.\d{2})?$ → Validates 45000 and 45000.50
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · ERP System Migration</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Standard SKU Part Number Validation
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Inventory Lead <strong>Debangshu Ghosh</strong> verifies SKU formats: 
                <code className="text-amber-300 font-mono">=REGEXTEST(SKU, "^[A-Z]{"{3}"}-\d{"{4,6}"}$")</code>, 
                ensuring all 20,000 legacy warehouse items conform to new ERP conventions.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Pattern: ^[A-Z]{3}-\d{4,6}$ → Validates "BKP-88421"
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
              <span className="text-purple-400">🪜</span> Step-by-Step Regex Pattern Assembly Protocol
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Pattern Construction
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Set Anchors (^ and $)</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Start with <code className="text-amber-300 font-mono">^</code> and terminate with <code className="text-amber-300 font-mono">$</code> to ensure full-string validation.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Choose Exact Character Classes</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Use <code className="text-sky-300 font-mono">[A-Z]</code> for uppercase letters, <code className="text-purple-300 font-mono">\d</code> for digits, and <code className="text-emerald-300 font-mono">[1-9]</code> for non-zero digits.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Attach Specific Quantifiers</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Attach exact counts like <code className="text-emerald-300 font-mono">{"{5}"}</code> or ranges like <code className="text-emerald-300 font-mono">{"{2,4}"}</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Test in Formula Bar with F9</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Test with <code className="text-purple-300 font-mono">=REGEXTEST("ABCDE1234F", "^[A-Z]{"{5}"}\d{"{4}"}[A-Z]$")</code>. Evaluates to <strong>TRUE</strong>!
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
                  <th className="py-3 px-4">Error Pattern</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Verification</th>
                  <th className="py-3 px-4">Guaranteed Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Unescaped Literal Dot</td>
                  <td className="py-3 px-4 text-slate-300">Wrote <code className="text-rose-300 font-mono">com.in</code> instead of <code className="text-emerald-300 font-mono">com\.in</code>, allowing any character to match the dot.</td>
                  <td className="py-3 px-4 text-slate-400">"comXin" accidentally matches.</td>
                  <td className="py-3 px-4 text-emerald-400">Escape literal dots: <code className="text-emerald-400 font-mono">\.</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Missing Anchors</td>
                  <td className="py-3 px-4 text-slate-300">Omitted <code className="text-amber-300 font-mono">^</code> and <code className="text-amber-300 font-mono">$</code>, permitting invalid extra characters around valid tokens.</td>
                  <td className="py-3 px-4 text-slate-400">"INVALID_ABCDE1234F_XYZ" matches.</td>
                  <td className="py-3 px-4 text-emerald-400">Enclose pattern with <code className="text-emerald-400 font-mono">^...$</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Greedy Wildcard Runaway</td>
                  <td className="py-3 px-4 text-slate-300">Used <code className="text-rose-300 font-mono">.*</code> which consumed the entire remaining text string across multiple tags.</td>
                  <td className="py-3 px-4 text-slate-400">Extracts from first tag to last tag.</td>
                  <td className="py-3 px-4 text-emerald-400">Use lazy quantifier <code className="text-emerald-400 font-mono">.*?</code> or specific classes <code className="text-emerald-400 font-mono">[^>]+</code>.</td>
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
              Grammar Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">\b Word Boundary</span>
                <span>Exact Words</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Match standalone words without catching substrings: <code className="text-emerald-300 font-mono">\bINV-\d+\b</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Negated Class</span>
                <span>Fast Cleansing</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Strip special characters effortlessly: <code className="text-sky-300 font-mono">[^a-zA-Z0-9\s]</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-purple-400 font-mono font-bold">Optional Flag (?)</span>
                <span>Flexible Prefixes</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Handle optional country codes: <code className="text-purple-300 font-mono">(\+91\s?)?[6-9]\d{"{9}"}</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">F9</kbd>
                <span>Token Testing</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight individual pattern expressions in the formula bar and press <strong>F9</strong> to verify matches.
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
                <strong>Reflect on character class precision:</strong> Why is writing <code className="text-emerald-300 font-mono">[A-Z]{"{5}"}</code> far safer for Indian PAN codes than writing <code className="text-rose-400 font-mono">\w{"{5}"}</code> (which allows digits and underscores)?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine quantifier greediness:</strong> What happens when you use <code className="text-rose-400 font-mono"><.*></code> to extract text from <code className="text-sky-300 font-mono"><b>Hello</b> <i>World</i></code>, and why does <code className="text-emerald-300 font-mono"><.*?></code> fix it?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider boundary assertions:</strong> How does the word boundary anchor <code className="text-purple-300 font-mono">\b</code> allow Excel to extract <code className="text-emerald-300 font-mono">INV-88421</code> from a sentence without picking up adjacent punctuation?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Regex Fundamentals, Tokens & Grammar — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Mastering the four pillars of Regex—Metacharacters, Character Classes, Quantifiers, and Anchors—is the secret to writing flawless text intelligence formulas. Always prefer exact classes over loose wildcards, use exact quantifiers ({n}), and never forget to bookend your validation formulas with start (^) and end ($) anchors!"
            }
          />
        </div>
      </div>
    </div>
  );
}
