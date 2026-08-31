"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_004_modern_text_intelligence_and_regular_expressions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic11() {
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
              ⚡ Semi-Structured Data Parsing · Topic 11
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 5: Synthesize & Parse
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Parsing Semi-Structured Log Files, Invoice Text Blocks & ERP Export Strings
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            In modern enterprise environments, up to 80% of corporate data resides in semi-structured formats: 
            server security logs, payment gateway webhook notifications, invoice narrative remarks, EDI transactions, 
            and legacy ERP text dumps. 
            By orchestrating <code className="text-purple-300 font-mono font-bold">REGEXEXTRACT</code> (Mode 2 Capturing Groups), 
            <code className="text-sky-300 font-mono font-bold">TEXTSPLIT</code> (2D Matrices), and 
            <code className="text-emerald-300 font-mono font-bold">LOOKBEHIND</code> assertions, you can decompose complex multi-token 
            strings into pristine, multi-column relational tables in sub-millisecond compiled RAM!
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Server Log Parsing:</strong> Mode 2 spills 5 bracketed fields in 1 step</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Invoice Block Parsing:</strong> TEXTSPLIT creates 2D key-value tables</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Lookbehind Extraction:</strong> {"Pulls keys like (?<=INV_NO=)[A-Z0-9-]+"}</span>
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
              <span className="text-purple-400">⚡</span> Semi-Structured Parsing Engine Anatomy
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Parsing Pattern Architectures
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-purple-300 space-y-2">
            <span className="text-slate-500">// 1. Multi-Token Log Line Parser (Mode 2 Capturing Groups)</span>
            <div className="mt-1 text-white font-bold text-xs sm:text-sm">
              =REGEXEXTRACT(B5, "^\\[([^\\]]+)\\]\\s+\\[([^\\]]+)\\]\\s+\\[User:\\s*([^\\]]+)\\]\\s+\\[IP:\\s*([^\\]]+)\\]\\s+(.+)$", <span className="text-emerald-400">2</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs">
              <span className="text-sky-300">Group 1: Timestamp</span> | <span className="text-amber-300">Group 2: Level</span> | <span className="text-purple-300">Group 3: User</span> | <span className="text-emerald-300">Group 4: IP</span> | <span className="text-fuchsia-300">Group 5: Message</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Parsing Engine</th>
                  <th className="py-3 px-4">Core Syntax Pattern</th>
                  <th className="py-3 px-4">Target Text Format</th>
                  <th className="py-3 px-4">Spilled Output Structure</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-400 font-sans">Bracket Log Parser</td>
                  <td className="py-3 px-4 text-purple-300">REGEXEXTRACT(..., "^\\[...\\]...", 2)</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">[2026-08-26] [WARN] [swadeep] Error</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">5 Adjacent Columns Spilled</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400 font-sans">2D Key-Value Parser</td>
                  <td className="py-3 px-4 text-sky-300">TEXTSPLIT(A2, ": ", " | ")</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">INV: 88421 | AMT: 45000 | GST: 18%</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">2-Column Key-Value Matrix</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">Lookbehind Isolator</td>
                  <td className="py-3 px-4 text-emerald-300">{"REGEXEXTRACT(A2, \"(?<=KEY=)\\\\w+\")"}</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">...; UID=swadeep_88; ...</td>
                  <td className="py-3 px-4 text-amber-300 font-bold">Isolated Value String</td>
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
              <span className="text-emerald-400">🔬</span> Lookbehind Assertions & Vectorized Multi-Row Parsing
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              High-Speed Parsing Mechanics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Surgical Lookbehind Key-Value Extraction
              </h3>
              <p className="leading-relaxed">
                In arbitrary ERP strings like <code className="text-sky-300 font-mono">TXN_ID=9921; STATUS=SUCCESS; AMT=45000.50</code>, 
                you can extract the amount without key markers by deploying positive lookbehind: 
                <code className="text-emerald-300 font-mono">{"=NUMBERVALUE(REGEXEXTRACT(A2, \"(?<=AMT=)[0-9.]+\"))"}</code>!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                Pulls Clean Numeric Amount with Zero String Trimming
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Vectorized Multi-Row Log Parsing with REDUCE
              </h3>
              <p className="leading-relaxed">
                Parse 10,000 log lines into a structured multi-column table in 1 formula:
                <br />
                <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                  =DROP(REDUCE("", LogRange, LAMBDA(acc, line, VSTACK(acc, REGEXEXTRACT(line, "^\\[([^\\]]+)\\]\\s+\\[([^\\]]+)\\]\\s+(.+)$", 2)))), 1)
                </code>
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Multi-Field Random Order Entity Extraction with HSTACK
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              When customer notes mention PAN, GST, and Mobile in random positions:
              <br />
              <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm">
                =HSTACK(IFNA(REGEXEXTRACT(A2, "[A-Z]{"{5}"}\d{"{4}"}[A-Z]"), "N/A"), IFNA(REGEXEXTRACT(A2, "\b[6-9]\d{"{9}"}\b"), "N/A"))
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
              <span className="text-purple-400">📐</span> Visual Semi-Structured Log Decomposition Pipeline
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Multi-Token Decomposition Engine
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Trace how a complex, bracketed server log line is parsed into 5 clean relational columns:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Raw Ingestion Data (Header) */}
              <rect x="25" y="25" width="800" height="50" rx="8" fill="#1E1B4B" stroke="#6366F1" strokeWidth="1.5" />
              <text x="425" y="55" fill="#E0E7FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                "[2026-08-26 14:30:00] [WARN] [User: swadeep.b] [IP: 192.168.1.50] DB Latency > 500ms"
              </text>

              {/* Extraction Box (Left) */}
              <rect x="25" y="100" width="370" height="150" rx="10" fill="#0F172A" stroke="#9333EA" strokeWidth="1.5" />
              <rect x="25" y="100" width="370" height="30" rx="10" fill="#6B21A8" fillOpacity="0.4" />
              <text x="210" y="120" fill="#FAF5FF" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">REGEXEXTRACT (RETURN_MODE = 2)</text>

              <g transform="translate(45, 150)" fontSize="9" fontFamily="sans-serif" fill="#E2E8F0">
                <text x="0" y="15">Pattern: ^\[([^\]]+)\]\s+\[([^\]]+)\]\s+\[User:\s*([^\]]+)\]...</text>
                <text x="0" y="35">5 Capturing Groups isolated</text>
                <text x="0" y="55" fill="#34D399">Spills horizontally across 5 columns in pure RAM</text>
              </g>

              {/* Arrow */}
              <path d="M 415 175 L 450 175" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="455,175 445,170 445,180" fill="#10B981" />

              {/* Spilled Columns Matrix (Right) */}
              <rect x="465" y="100" width="360" height="150" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="1.5" />
              <rect x="465" y="100" width="360" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="645" y="120" fill="#34D399" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SPILLED RELATIONAL COLUMNS</text>

              <g transform="translate(480, 145)" fontFamily="monospace" fontSize="8">
                <rect width="65" height="40" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="32" y="18" fill="#94A3B8" textAnchor="middle">Timestamp</text>
                <text x="32" y="32" fill="#FDE047" fontWeight="bold" textAnchor="middle">2026-08-26</text>

                <rect x="68" width="45" height="40" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="90" y="18" fill="#94A3B8" textAnchor="middle">Level</text>
                <text x="90" y="32" fill="#F87171" fontWeight="bold" textAnchor="middle">WARN</text>

                <rect x="116" width="65" height="40" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="148" y="18" fill="#94A3B8" textAnchor="middle">User</text>
                <text x="148" y="32" fill="#38BDF8" fontWeight="bold" textAnchor="middle">swadeep.b</text>

                <rect x="184" width="70" height="40" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="219" y="18" fill="#94A3B8" textAnchor="middle">IP Address</text>
                <text x="219" y="32" fill="#A7F3D0" fontWeight="bold" textAnchor="middle">192.168.1.50</text>

                <rect x="257" width="75" height="40" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="294" y="18" fill="#94A3B8" textAnchor="middle">Event</text>
                <text x="294" y="32" fill="#E0E7FF" fontWeight="bold" textAnchor="middle">DB Latency</text>
              </g>

              {/* Bottom Result */}
              <rect x="25" y="270" width="800" height="35" rx="8" fill="#1E293B" stroke="#334155" />
              <text x="425" y="292" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                Zero Legacy Text-to-Columns Wizard · Pure Dynamic In-Memory Splitting!
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
                Explore the semi-structured log and invoice parsing dataset below or download the master practice workbook to test <code className="text-purple-300 font-mono">REGEXEXTRACT</code> and <code className="text-purple-300 font-mono">TEXTSPLIT</code> in Microsoft Excel.
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
            sheetName="EX1912"
            title="Semi-Structured Log & Invoice Parsing Dataset (Log ID, Raw Log Text, Parsed Timestamp, Level, User, Event Message)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · Security Audit Log Parsing</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                5-Token Multi-Column Server Log Extraction
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Infrastructure Lead <strong>Swadeep Banerjee</strong> parses 50,000 server event log lines: 
                <code className="text-emerald-300 font-mono">=REGEXEXTRACT(B5, "^\\[([^\\]]+)\\]\\s+\\[([^\\]]+)\\]\\s+\\[User:\\s*([^\\]]+)\\]\\s+(.+)$", 2)</code>. 
                Spills Timestamp, Level, User, and Event message across 4 columns in 1 single formula!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =REGEXEXTRACT(LogLine, "^\\[([^\\]]+)\\]...", 2) → 4 Spilled Columns
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Banking Webhook Parsing</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                2D Key-Value Payment Matrix Splitting
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Accountant <strong>Tuhina Mukherjee</strong> parses payment gateway webhook payloads: 
                <code className="text-amber-300 font-mono">=TEXTSPLIT(A2, ": ", " | ")</code>, 
                converting single-line JSON-like strings into clean 2-column key-value tables.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                TEXTSPLIT(Payload, ": ", " | ") → Key-Value Relational Matrix
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Legacy ERP Pipe Dumps</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Pipe-Delimited Batch Record Ingestion
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                ERP Specialist <strong>Abhronila Sengupta</strong> ingests legacy manufacturing dumps: 
                <code className="text-indigo-300 font-mono">=TEXTSPLIT(B5, "|")</code>, 
                converting pipe-separated records into relational table rows with zero helper columns.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Parses "1001|Swadeep|Barrackpore|45000" → 4 Relational Columns
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · API Response Extraction</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Lookbehind JSON Attribute Extraction
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Web Systems Lead <strong>Debangshu Ghosh</strong> isolates API response codes: 
                <code className="text-amber-300 font-mono">{"=REGEXEXTRACT(Response, \"(?<=\\\"status\\\":\\s*\\\")[^\\\"]+\")"}</code>, 
                extracting status tokens (`SUCCESS`, `FAILED`) without parsing full JSON trees.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Lookbehind: Isolates JSON attribute values with zero helper formulas
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
              <span className="text-purple-400">🪜</span> Step-by-Step Log Parsing Implementation Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Identify Log Structure and Boundary Tokens</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Log line in <code className="text-amber-300 font-mono">B5</code>: <code className="text-slate-300 font-mono">[2026-08-26] [WARN] [swadeep.b] DB Latency</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Construct Capturing Group Regex Pattern</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Pattern: <code className="text-emerald-400 font-mono">"^\\[([^\\]]+)\\]\\s+\\[([^\\]]+)\\]\\s+\\[([^\\]]+)\\]\\s+(.+)$"</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Set Return Mode to 2 (Capturing Groups Only)</h3>
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Press Enter & Observe 4-Column Relational Spill</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press Enter. The 4 isolated tokens spill dynamically across columns <code className="text-emerald-300 font-mono">C5:F5</code> in pure RAM!
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
                  <td className="py-3 px-4 text-slate-300">Log pattern failed to match the structure of the input text line.</td>
                  <td className="py-3 px-4 text-slate-400">Check for extra spaces or missing bracket characters in log line.</td>
                  <td className="py-3 px-4 text-emerald-400">Relax spacing with <code className="text-emerald-400 font-mono">\s*</code> and make optional parts with <code className="text-emerald-400 font-mono">?</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Single Column Output</td>
                  <td className="py-3 px-4 text-slate-300">Forgot to specify <code className="text-rose-300 font-mono">return_mode = 2</code> in REGEXEXTRACT.</td>
                  <td className="py-3 px-4 text-slate-400">Formula returns only the first match or full matched string.</td>
                  <td className="py-3 px-4 text-emerald-400">Pass <code className="text-emerald-400 font-mono">2</code> as the 3rd argument of REGEXEXTRACT.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#SPILL!</td>
                  <td className="py-3 px-4 text-slate-300">Target cells adjacent to formula contain static text or merged cells.</td>
                  <td className="py-3 px-4 text-slate-400">Check adjacent columns where groups are trying to spill.</td>
                  <td className="py-3 px-4 text-emerald-400">Clear adjacent cells to permit array spilling.</td>
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
              Parsing Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">TEXTSPLIT 2D</span>
                <span>Matrix Ingestion</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Split 2D table: <code className="text-emerald-300 font-mono">=TEXTSPLIT(A2, ": ", " | ")</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Lookbehind (?&lt;=)</span>
                <span>Zero Helper Columns</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Extract values: <code className="text-sky-300 font-mono">{"=REGEXEXTRACT(A2, \"(?<=ID=)\\w+\")"}</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-purple-400 font-mono font-bold">NUMBERVALUE</span>
                <span>Instant Coercion</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Convert extracted currency: <code className="text-purple-300 font-mono">=NUMBERVALUE(REGEXEXTRACT(...))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">F9</kbd>
                <span>Spill RAM Inspection</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight REGEXEXTRACT formula and press <strong>F9</strong> to inspect spilled fields in RAM.
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
                <strong>Reflect on dynamic table generation:</strong> Why is parsing semi-structured text using <code className="text-purple-300 font-mono">REGEXEXTRACT</code> mode 2 superior to using the legacy Text-to-Columns wizard?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine positive lookbehind:</strong> How does <code className="text-emerald-300 font-mono">{"(?<=KEY=)"}</code> isolate values in arbitrary position strings without including the key name in the extracted result?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider 2D matrix transformation:</strong> How does specifying both column and row delimiters in <code className="text-sky-300 font-mono">TEXTSPLIT(A2, col_delim, row_delim)</code> convert single-cell text blobs into multi-row, multi-column tables?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Semi-Structured Log & Invoice Parsing — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Never waste hours manually slicing text with the static Text-to-Columns wizard or writing brittle VBA parsers! Combine TEXTSPLIT for 2D matrix tables, REGEXEXTRACT mode 2 with capturing groups for bracketed multi-token log rows, and positive lookbehinds to transform millions of semi-structured text lines into pristine relational tables in sub-millisecond compiled RAM!"
            }
          />
        </div>
      </div>
    </div>
  );
}
