"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/005_002_advanced_power_query_m_code_scripting_and_custom_functions_master.xlsx?url";
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
    link.download = "m_code_master_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-rose-500/30 selection:text-rose-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-rose-950/80 border border-rose-700/60 text-rose-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ Defensive ETL · Topic 8
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300 text-xs font-semibold">
              try...otherwise &amp; Validation
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 5: Evaluate &amp; Guard
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-rose-400 via-amber-300 to-teal-300 bg-clip-text text-transparent leading-tight">
            Error Handling in M: try...otherwise Constructs &amp; Step-Level Validation
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            In enterprise data pipelines, unhandled cell errors or schema disruptions halt mission-critical automated refreshes. 
            By mastering <strong>try...otherwise</strong> fallbacks, structured <strong>try</strong> record inspection 
            (<code className="text-rose-300 font-mono">[HasError]</code>, <code className="text-rose-300 font-mono">[Error][Message]</code>), 
            and dual-stream <strong>quarantine routing</strong> with <code className="text-teal-300 font-mono">Table.SelectRowsWithErrors</code>, 
            you engineer resilient, fault-tolerant ETL pipelines that guarantee data integrity and auditability!
          </p>

          <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-rose-400 text-base">✓</span>
              <span><strong>try...otherwise:</strong> Non-breaking scalar fallback replacement</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-amber-400 text-base">✓</span>
              <span><strong>try Record Triage:</strong> Extracts granular Reason, Message &amp; Detail metadata</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Quarantine Pipeline:</strong> Isolates corrupt rows for auditing without stopping production ETL</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: FORMULA & SYNTAX ANATOMY CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-rose-400">⚡</span> Formula Anatomy: try Syntax &amp; Error Record Structure
            </h2>
            <span className="text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800">
              Exception Shield Primitives
            </span>
          </div>

          {/* Code Syntax Box */}
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 font-mono text-xs sm:text-sm text-rose-300 overflow-x-auto shadow-inner leading-relaxed space-y-2">
            <div>
              <span className="text-slate-500">// Pattern 1: Compact Fallback Evaluation</span>
              <br />
              <span className="text-purple-400">try</span> &lt;guarded_expression&gt; <span className="text-purple-400">otherwise</span> &lt;default_fallback_value&gt;
            </div>
            <div className="pt-2 border-t border-slate-800/60">
              <span className="text-slate-500">// Pattern 2: Deep Diagnostic Inspection Record</span>
              <br />
              <span className="text-purple-400">try</span> &lt;guarded_expression&gt; →&nbsp;
              <span className="text-amber-300">[ HasError = true/false, Value = any, Error = [ Reason="...", Message="...", Detail="..." ] ]</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Error Component</th>
                  <th className="py-3 px-4">Data Type</th>
                  <th className="py-3 px-4">Availability</th>
                  <th className="py-3 px-4">Description &amp; Diagnostic Utility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">[HasError]</td>
                  <td className="py-3 px-4 font-mono text-purple-300">logical</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Always</td>
                  <td className="py-3 px-4">Indicates whether the guarded expression threw an unhandled exception (<code className="text-amber-300">true</code>) or succeeded (<code className="text-emerald-300">false</code>).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-emerald-300">[Value]</td>
                  <td className="py-3 px-4 font-mono text-purple-300">any</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">When HasError = false</td>
                  <td className="py-3 px-4">The evaluated calculation result when no exception is encountered; holds <code className="text-slate-400">null</code> on failure.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">[Error][Reason]</td>
                  <td className="py-3 px-4 font-mono text-purple-300">text</td>
                  <td className="py-3 px-4 text-rose-400 font-semibold">When HasError = true</td>
                  <td className="py-3 px-4">Standardized classification tag (e.g. <code className="text-rose-300 font-mono">DataFormat.Error</code>, <code className="text-rose-300 font-mono">Expression.Error</code>).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-300">[Error][Message]</td>
                  <td className="py-3 px-4 font-mono text-purple-300">text</td>
                  <td className="py-3 px-4 text-rose-400 font-semibold">When HasError = true</td>
                  <td className="py-3 px-4">Human-readable description explaining why the computation failed (e.g. "We couldn't convert to Number").</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL & THEORETICAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-emerald-400">🔬</span> Conceptual &amp; Calculation Mechanics
            </h2>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Defensive Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-rose-300 text-base flex items-center gap-2">
                <span>1.</span> Errors as First-Class Values in M
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                In M, an error is not an immediate application crash; it is a specialized value attached to a cell or step. 
                Because M uses <strong>lazy evaluation</strong>, an error residing in an unreferenced column will never fail the query. 
                However, as soon as an aggregation (<code className="text-rose-300 font-mono">List.Sum</code>) or merge operation touches an error cell, 
                the entire query execution halts instantly.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-amber-300 text-base flex items-center gap-2">
                <span>2.</span> The Peril of Silent Error Suppression
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Writing <code className="text-amber-300 font-mono">try [Amount] otherwise 0</code> across all queries creates a dangerous blind spot. 
                If an upstream database changes its column name from <code className="text-slate-300">Amount</code> to <code className="text-slate-300">Net_Amount</code>, 
                the <code className="text-amber-300 font-mono">otherwise 0</code> silently converts all millions in corporate revenue into zero without triggering an alert.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-teal-300 text-base flex items-center gap-2">
                <span>3.</span> Dual-Stream Quarantine Architecture
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Enterprise data governance requires bifurcating the raw data stream: 
                <strong>Query 1 (Production Fact)</strong> uses <code className="text-teal-300 font-mono">Table.RemoveRowsWithErrors</code> to load 100% verified clean records into Power Pivot. 
                <strong>Query 2 (Quarantine Audit)</strong> uses <code className="text-teal-300 font-mono">Table.SelectRowsWithErrors</code> to send anomalous records to an audit log for remediation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-sky-300 text-base flex items-center gap-2">
                <span>4.</span> Step-Level Assertion Gates
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Before applying expensive transformations, enforce contract validation at the step level. 
                Check for schema drift using <code className="text-sky-300 font-mono">List.Difference(RequiredCols, Table.ColumnNames(Source))</code>. 
                If missing columns are detected, raise an explicit custom error using <code className="text-rose-300 font-mono">error Error.Record(...)</code> to fail fast before corrupting models.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-indigo-400">📐</span> Visual Calculation Flow: Dual-Stream Quarantine ETL Pipeline
            </h2>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800">
              Quarantine Architecture
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 flex flex-col items-center justify-center overflow-x-auto shadow-inner">
            <svg
              viewBox="0 0 880 320"
              className="w-full max-w-4xl h-auto text-slate-200 select-none font-sans"
            >
              <defs>
                <linearGradient id="gradRaw" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>
                <linearGradient id="gradClean" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <linearGradient id="gradError" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e11d48" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
                <marker
                  id="arrow-green"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="4"
                  orient="auto"
                >
                  <path d="M 0 0 L 8 4 L 0 8 z" fill="#10b981" />
                </marker>
                <marker
                  id="arrow-rose"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="4"
                  orient="auto"
                >
                  <path d="M 0 0 L 8 4 L 0 8 z" fill="#f43f5e" />
                </marker>
              </defs>

              {/* Raw Ingestion Box */}
              <g transform="translate(30, 95)">
                <rect width="210" height="120" rx="14" fill="url(#gradRaw)" stroke="#64748b" strokeWidth="1.5" />
                <text x="105" y="32" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">
                  1. Raw Enterprise Data
                </text>
                <text x="105" y="55" textAnchor="middle" fill="#cbd5e1" fontSize="11">
                  10,000 Branch Records
                </text>
                <text x="105" y="75" textAnchor="middle" fill="#94a3b8" fontSize="10">
                  (Contains corrupt dates &amp; nulls)
                </text>
                <rect x="25" y="88" width="160" height="20" rx="6" fill="#0f172a" opacity="0.6" />
                <text x="105" y="102" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">
                  try Type.Transform(...)
                </text>
              </g>

              {/* Fork Branch Arrows */}
              <path
                d="M 240 135 C 310 135, 310 65, 380 65"
                stroke="#10b981"
                strokeWidth="3"
                markerEnd="url(#arrow-green)"
                fill="none"
              />
              <path
                d="M 240 175 C 310 175, 310 245, 380 245"
                stroke="#f43f5e"
                strokeWidth="3"
                markerEnd="url(#arrow-rose)"
                fill="none"
              />

              {/* Top Stream: Clean Fact Table */}
              <g transform="translate(390, 20)">
                <rect width="450" height="95" rx="14" fill="url(#gradClean)" opacity="0.9" />
                <text x="225" y="28" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">
                  Stream A: Production Fact Table (Table.RemoveRowsWithErrors)
                </text>
                <text x="225" y="50" textAnchor="middle" fill="#d1fae5" fontSize="12">
                  9,940 Clean Verified Transactions → Loaded to Power Pivot Model
                </text>
                <rect x="30" y="62" width="390" height="22" rx="6" fill="#064e3b" opacity="0.6" />
                <text x="225" y="77" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">
                  Status: 100% Reliable Corporate Financial KPIs
                </text>
              </g>

              {/* Bottom Stream: Quarantine Audit Table */}
              <g transform="translate(390, 195)">
                <rect width="450" height="95" rx="14" fill="url(#gradError)" opacity="0.9" />
                <text x="225" y="28" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">
                  Stream B: Quarantine Audit Log (Table.SelectRowsWithErrors)
                </text>
                <text x="225" y="50" textAnchor="middle" fill="#ffe4e6" fontSize="12">
                  60 Corrupt Records Isolated → Logged with Error[Message] &amp; [Reason]
                </text>
                <rect x="30" y="62" width="390" height="22" rx="6" fill="#881337" opacity="0.6" />
                <text x="225" y="77" textAnchor="middle" fill="#fecdd3" fontSize="11" fontWeight="bold">
                  Status: Automated Email Alert Dispatched to Branch Admin
                </text>
              </g>
            </svg>
          </div>
          <p className="text-xs text-slate-400 text-center italic">
            Figure 8.1: Dual-Stream ETL pattern bifurcating clean data for executive reporting and defect rows for automated quarantine auditing.
          </p>
        </section>

        {/* =========================================================================
            SECTION 5: INTERACTIVE SPREADSHEET & DIRECT DOWNLOAD PORTAL
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
                Inspect error handling audit logs live in the grid below or download the full module workbook to practice in Microsoft Excel.
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
            sheetName="EX2109"
            title="ETL Error Handling &amp; Sanitization Matrix (Transaction ID, Customer Name, Raw Amount, Validation Rule, Try-Otherwise Result, Audit Flag)"
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
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-rose-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Case 1 · Corrupt Legacy Invoices</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Numeric Sanitization with try...otherwise
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Auditor <strong>Swadeep Banerjee</strong> processes 40,000 historical sales rows containing text entries like <code className="text-slate-300">"N/A"</code> and <code className="text-slate-300">"PENDING"</code> in the currency column. 
                Using <code className="text-rose-300 font-mono">try Number.FromText([Amount]) otherwise 0.00</code>, he eliminates all <code className="text-rose-300 font-mono">DataFormat.Error</code> exceptions without manual cell editing.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-rose-300">
                try Number.FromText([Amt]) otherwise 0.00 → Zero Pipeline Halts
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Case 2 · Automated GSTIN Quarantine</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Tax Compliance Diagnostic Logging
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Tax Consultant <strong>Tuhina Mukherjee</strong> implements a validation rule asserting that GST numbers must match 15 alphanumeric characters. 
                Invalid rows are caught via structured <code className="text-amber-300 font-mono">try</code> records, generating a daily exception list for the billing desk.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-amber-300">
                try fxValidateGST([GSTIN]) → Expand [Error][Message]
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Case 3 · Schema Drift Defense</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Step-Level Missing Column Assertion
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                ERP Architect <strong>Abhronila Das</strong> guards the manufacturing ETL pipeline against missing columns in vendor CSV dumps. 
                She compares table headers against a master list using <code className="text-teal-300 font-mono">List.Difference</code>, throwing an immediate custom exception if mandatory fields are missing.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                List.Difference → error Error.Record("Schema.MissingCol")
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 4 · Zero-Division Freight Calculator</span>
                <span className="text-xs font-mono text-slate-400">Naihati Logistics</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Safe Arithmetic Cost Per Ton-Km
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Logistics Analyst <strong>Debangshu Roy</strong> computes cost per ton-kilometer. 
                Whenever distance or weight is zero or null, standard division throws <code className="text-rose-300 font-mono">#DIV/0!</code>. 
                He replaces the calculation with safe conditional logic, protecting executive KPI dashboards from computation crashes.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                if [Km]=0 or [Km]=null then 0 else [Cost]/[Km] → Safe KPI
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP PRACTICAL CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-sky-400">🛠️</span> Step-by-Step Practical Error Triage Pipeline
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              M Code Scripting Walkthrough
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-rose-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-rose-950 border border-rose-700 text-rose-300 flex items-center justify-center text-xs">1</span>
                Step 1: Non-Destructive Parsing with try
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Add a custom column that wraps type conversion in a <code className="text-rose-300 font-mono">try</code> block, preserving the full error payload:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-rose-300 overflow-x-auto">
                {`#"Added TryParse" = Table.AddColumn(Source, "ParseResult", each try Number.FromText([RawAmount]))`}
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-amber-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-950 border border-amber-700 text-amber-300 flex items-center justify-center text-xs">2</span>
                Step 2: Expand Diagnostic Audit Fields
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Extract the boolean status and error message to build an auditing breakdown:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto">
                {`#"Extracted Status" = Table.AddColumn(#"Added TryParse", "IsError", each [ParseResult][HasError]),
#"Extracted CleanVal" = Table.AddColumn(#"Extracted Status", "CleanAmount", each if [IsError] then 0.00 else [ParseResult][Value]),
#"Extracted ErrorMsg" = Table.AddColumn(#"Extracted CleanVal", "ErrorDetails", each if [IsError] then [ParseResult][Error][Message] else null)`}
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-teal-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-950 border border-teal-700 text-teal-300 flex items-center justify-center text-xs">3</span>
                Step 3: Build Isolated Quarantine Query
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Reference the main query in a secondary query to capture only defective records for management review:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300 overflow-x-auto">
                {`let
    Source = RawSalesQuery,
    QuarantineOnly = Table.SelectRows(Source, each [IsError] = true),
    SelectedAuditCols = Table.SelectColumns(QuarantineOnly, {"InvoiceID", "Customer", "RawAmount", "ErrorDetails"})
in
    SelectedAuditCols`}
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
              <span className="text-rose-400">⚠️</span> Common Errors &amp; Troubleshooting Matrix
            </h2>
            <span className="text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800">
              Error Diagnosis
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Error Type</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Impact</th>
                  <th className="py-3 px-4">Fix &amp; Prevention</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">DataFormat.Error</td>
                  <td className="py-3 px-4">Text string containing currency symbols ($ / ₹) or commas passed to <code className="text-rose-300">Number.FromText</code> without culture specifier.</td>
                  <td className="py-3 px-4">Single cell error stops entire table aggregation.</td>
                  <td className="py-3 px-4 font-mono text-teal-300">Use <code className="text-teal-300 font-mono">Number.FromText(Text.Select([Col], &#123;"0".."9", "."&#125;))</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">Expression.Error: The column wasn't found</td>
                  <td className="py-3 px-4">Renamed or deleted column in raw CSV file breaks hardcoded step reference.</td>
                  <td className="py-3 px-4">Query halts on first load step.</td>
                  <td className="py-3 px-4 font-mono text-teal-300">Use <code className="text-teal-300 font-mono">MissingField.UseNull</code> or validate schema with <code className="text-teal-300 font-mono">List.Difference</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-300">Silent 0 Distortion</td>
                  <td className="py-3 px-4">Overuse of <code className="text-purple-300">try ... otherwise 0</code> converts legitimate missing data into zeroes.</td>
                  <td className="py-3 px-4">Distorts arithmetic averages and masks defective ERP feeds.</td>
                  <td className="py-3 px-4 font-mono text-teal-300">Use <code className="text-teal-300 font-mono">otherwise null</code> or add an explicit <code className="text-teal-300 font-mono">IsAuditFlag</code> column.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-300">Table.Group Error Crash</td>
                  <td className="py-3 px-4">Aggregation performed on a column containing a single hidden error cell.</td>
                  <td className="py-3 px-4">Entire grouped summary returns error.</td>
                  <td className="py-3 px-4 font-mono text-teal-300">Apply <code className="text-teal-300 font-mono">Table.ReplaceErrorValues</code> prior to grouping.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: PRO TIPS & HIGH-SPEED SHORTCUTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">💡</span> Pro Tips &amp; High-Speed Shortcuts
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Industrial Best Practices
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-rose-300 flex items-center gap-2">
                <span>⚡</span> Tip 1: Multi-Column Bulk Error Replacement
              </div>
              <p className="text-slate-300 leading-relaxed">
                Use <code className="text-rose-300 font-mono">Table.ReplaceErrorValues(Source, {`{{"Amount", 0}, {"Tax", 0.0}}`} )</code> to sanitize multiple columns in a single, high-performance step.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-300 flex items-center gap-2">
                <span>⚡</span> Tip 2: Leverage the Null-Coalescing Operator (??)
              </div>
              <p className="text-slate-300 leading-relaxed">
                In modern M syntax, use <code className="text-amber-300 font-mono">[Discount] ?? 0.00</code> as a cleaner, faster alternative to verbose <code className="text-amber-300 font-mono">if [Discount] = null then 0.00</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-teal-300 flex items-center gap-2">
                <span>⚡</span> Tip 3: Assert Non-Empty Raw Files
              </div>
              <p className="text-slate-300 leading-relaxed">
                Always insert an assertion gate: <code className="text-teal-300 font-mono">if Table.IsEmpty(Source) then error "Empty File Received" else Source</code> to prevent downstream joins from executing on zero rows.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-indigo-300 flex items-center gap-2">
                <span>⚡</span> Tip 4: MissingField.UseNull for Dynamic Headers
              </div>
              <p className="text-slate-300 leading-relaxed">
                When selecting columns, pass <code className="text-indigo-300 font-mono">MissingField.UseNull</code> as the 3rd argument to <code className="text-indigo-300 font-mono">Table.SelectColumns</code> so missing fields populate as null instead of crashing.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC ANALYTICAL HINTS ("THINK ABOUT...")
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-teal-400">🤔</span> Socratic Analytical Hints ("Think About...")
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Critical Engineering Questions
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-rose-400">💭</span> Question 1: What is the fundamental difference between an Error and a Null in M?
              </h3>
              <p className="leading-relaxed">
                A <code className="text-slate-300 font-mono">null</code> is a valid scalar value representing the absence of data, while an <code className="text-rose-300 font-mono">error</code> is an exception event that halts execution on strict operations. Why does confusing the two cause flawed business calculations?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">💭</span> Question 2: Why do client-side try...otherwise blocks disable SQL Query Folding?
              </h3>
              <p className="leading-relaxed">
                When querying Microsoft SQL Server or Oracle, M functions that have no equivalent T-SQL translation cannot be pushed down to the server. Why should database-level validation occur in SQL views whenever possible?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 3: How does the Dual-Stream Quarantine pattern satisfy statutory audit standards?
              </h3>
              <p className="leading-relaxed">
                If bad data is simply deleted or replaced with zeroes, tax auditors cannot verify unrecorded revenue or missing invoices. How does preserving defective records in a dedicated quarantine query protect the organization?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: FREQUENTLY ASKED QUESTIONS (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 8: Error Handling in M & Validation FAQ"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "A beginner developer builds an ETL pipeline that works only when the source data is clean. A professional Enterprise Data Architect designs a pipeline that anticipates dirty, malformed, and missing data at every step. Never blindly suppress errors with 'otherwise null'. Always bifurcate your pipeline into a production fact model and a transparent quarantine audit log."
            }
          />
        </div>
      </div>
    </div>
  );
}
