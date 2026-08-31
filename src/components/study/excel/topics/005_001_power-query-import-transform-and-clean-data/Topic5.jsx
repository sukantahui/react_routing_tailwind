"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/005_001_power_query_import_transform_and_clean_data_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic5() {
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
              ⚡ Large-Scale Data Filtering · Topic 5
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Filter, Sort &amp; Deduplication
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 3: Apply &amp; Filter
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Filtering Rows, Sorting Columns &amp; Removing Duplicates at Scale
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            When processing millions of transaction records, performance depends entirely on how efficiently you filter 
            noise and deduplicate records. 
            Power Query's <strong>Filtering &amp; Deduplication Engine</strong> provides declarative operators—from 
            early <strong>Query-Folded Row Filtering</strong> (<code className="text-teal-300 font-mono">Table.SelectRows</code>) and 
            <strong>Multi-Column Sorting</strong> (<code className="text-sky-300 font-mono">Table.Sort</code>) to 
            <strong>Composite Key Deduplication</strong> and <strong>Table.Buffer Memory Locking</strong>—guaranteeing 
            razor-sharp, high-performance datasets!
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Early Row Filtering:</strong> Triggers server-side SQL WHERE Query Folding</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Composite Key Dedup:</strong> Preserves valid repeat customer purchases</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Table.Buffer Locking:</strong> Deterministically retains the latest record per key</span>
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
              <span className="text-teal-400">⚡</span> Power Query Filtering &amp; Deduplication M Syntax
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              M Data Slicing Functions
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-teal-300 space-y-2">
            <span className="text-slate-500">// 1. Row Filter with Logical AND</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'= Table.SelectRows(Source, each [Amount_INR] > 10000 and [Branch_City] = "Barrackpore")'}
            </div>
            <span className="text-slate-500">// 2. Multi-Column Hierarchical Sort</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'= Table.Sort(Source, {{"Invoice_Date", Order.Descending}, {"Amount_INR", Order.Descending}})'}
            </div>
            <span className="text-slate-500">// 3. Buffered Latest-Record Deduplication</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'= Table.Distinct(Table.Buffer(Table.Sort(Source, {{"Date", Order.Descending}})), {"Customer_ID"})'}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Operation</th>
                  <th className="py-3 px-4">Core M Function</th>
                  <th className="py-3 px-4">Key Arguments</th>
                  <th className="py-3 px-4">Enterprise Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-teal-400 font-sans">Filter Rows</td>
                  <td className="py-3 px-4 text-teal-300">Table.SelectRows</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">each [Col] > 10000</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Purges non-compliant rows in memory; folds to SQL WHERE.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400 font-sans">Sort Columns</td>
                  <td className="py-3 px-4 text-sky-300">Table.Sort</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Order.Ascending / Order.Descending</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Ranks records hierarchically across multiple columns.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">Remove Duplicates</td>
                  <td className="py-3 px-4 text-emerald-300">Table.Distinct</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">{`{"Customer_ID", "Invoice_No"}`}</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Purges duplicate composite submissions.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-indigo-400 font-sans">Table Buffer</td>
                  <td className="py-3 px-4 text-indigo-300">Table.Buffer</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Table Expression</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Locks sorted order into RAM before deduplication.</td>
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
              <span className="text-emerald-400">🔬</span> Query Folding Slicing &amp; Guaranteed Latest-Record Retention
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Slicing &amp; Dedup Mechanics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-teal-400">1.</span> Early Filter Step Query Folding
              </h3>
              <p className="leading-relaxed">
                When querying a SQL database, placing your <code className="text-teal-300 font-mono">Table.SelectRows</code> filter 
                as Step 2 (immediately after Source) translates directly into a server-side <code className="text-sky-300 font-mono">WHERE</code> clause. 
                The server filters 10 million rows down to 5,000 before sending a single byte across the network!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-teal-300">
                M Filter → Server SQL: WHERE [Date] >= '2026-01-01'
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Deterministic Latest-Record Deduplication
              </h3>
              <p className="leading-relaxed">
                Power Query's lazy evaluation engine may ignore a sort step during deduplication. 
                To guarantee you retain the LATEST transaction per customer, wrap the sorted table in <code className="text-amber-300 font-mono">Table.Buffer</code>:
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                {'Table.Distinct(Table.Buffer(Table.Sort(Source, {{"Date", Order.Descending}})), {"Customer_ID"})'}
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> 'Keep Duplicates' Financial Audit Triage
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              During statutory year-end audits, select the <code className="text-rose-400 font-mono">Invoice_Number</code> column 
              and click <strong>Home Tab → Keep Rows → Keep Duplicates</strong>. 
              This instantly surfaces all duplicate billing submissions, invoice number collisions, and fraudulent double-payments in seconds!
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
              <span className="text-teal-400">📐</span> Visual Filtering &amp; Buffered Deduplication Pipeline
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Data Slicing Flow
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Observe how raw transaction streams are filtered, hierarchically sorted, locked in memory via Buffer, and deduplicated:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Raw Ingestion Stream (Left) */}
              <rect x="25" y="25" width="220" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="25" width="220" height="34" rx="12" fill="#0F766E" fillOpacity="0.3" />
              <text x="135" y="47" fill="#CCFBF1" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1. RAW TRANSACTIONS</text>

              <g transform="translate(35, 75)" fontSize="8.5" fontFamily="monospace" fill="#CBD5E1">
                <rect width="200" height="28" fill="#1E293B" />
                <text x="8" y="18">TXN-101 | Swadeep | ₹45,000</text>

                <rect y="32" width="200" height="28" fill="#1E293B" />
                <text x="8" y="50">TXN-102 | Tuhina  | ₹12,500</text>

                <rect y="64" width="200" height="28" fill="#1E293B" />
                <text x="8" y="82" fill="#FCA5A5">TXN-101 | Swadeep | ₹45,000 (Dup)</text>

                <rect y="96" width="200" height="28" fill="#1E293B" />
                <text x="8" y="114" fill="#94A3B8">TXN-104 | Susmita | ₹4,500 (<10k)</text>
              </g>

              <rect x="35" y="225" width="200" height="55" rx="6" fill="#134E4A" stroke="#14B8A6" />
              <text x="135" y="245" fill="#5EEAD4" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Unfiltered Stream</text>
              <text x="135" y="262" fill="#99F6E4" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Contains Dups &amp; Small Txns</text>

              {/* Arrow */}
              <path d="M 260 160 L 315 160" stroke="#14B8A6" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="320,160 310,155 310,165" fill="#14B8A6" />

              {/* Slicing & Buffer Engine (Center) */}
              <rect x="325" y="25" width="250" height="270" rx="14" fill="#0F172A" stroke="#0D9488" strokeWidth="2" />
              <rect x="325" y="25" width="250" height="34" rx="14" fill="#115E59" fillOpacity="0.4" />
              <text x="450" y="47" fill="#F0FDFA" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2. SLICING &amp; BUFFER ENGINE</text>

              <g transform="translate(340, 70)" fontSize="8.5" fontFamily="sans-serif">
                <rect width="220" height="32" rx="4" fill="#134E4A" stroke="#14B8A6" />
                <text x="10" y="20" fill="#5EEAD4" fontWeight="bold">1. Table.SelectRows ([Amount] > 10000)</text>

                <rect y="38" width="220" height="32" rx="4" fill="#0369A1" fillOpacity="0.3" stroke="#38BDF8" />
                <text x="10" y="58" fill="#BAE6FD" fontWeight="bold">2. Table.Sort (Date Descending)</text>

                <rect y="76" width="220" height="32" rx="4" fill="#065F46" fillOpacity="0.3" stroke="#10B981" />
                <text x="10" y="96" fill="#A7F3D0" fontWeight="bold">3. Table.Buffer (Lock RAM Order)</text>

                <rect y="114" width="220" height="32" rx="4" fill="#854D0E" fillOpacity="0.3" stroke="#EAB308" />
                <text x="10" y="134" fill="#FEF08A" fontWeight="bold">4. Table.Distinct ({"Txn_ID"})</text>
              </g>

              <text x="450" y="270" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Query-Folded &amp; Deterministic</text>

              {/* Arrow */}
              <path d="M 590 160 L 620 160" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="625,160 615,155 615,165" fill="#10B981" />

              {/* Deduplicated Output (Right) */}
              <rect x="630" y="25" width="195" height="270" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="630" y="25" width="195" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="727" y="45" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3. PRISTINE UNIQUE LEDGER</text>

              <g transform="translate(640, 75)" fontSize="8.5" fontFamily="monospace" fill="#E2E8F0">
                <rect width="175" height="30" fill="#064E3B" stroke="#10B981" />
                <text x="8" y="19" fill="#34D399" fontWeight="bold">TXN-101 | ₹45,000</text>

                <rect y="36" width="175" height="30" fill="#1E293B" />
                <text x="8" y="55">TXN-102 | ₹12,500</text>
              </g>

              <rect x="640" y="225" width="175" height="55" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" />
              <text x="727" y="245" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">100% Unique &amp; Lean</text>
              <text x="727" y="262" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Zero Duplicate Inflation</text>
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
                Explore the filtering, sorting, and deduplication dataset below or download the practice workbook to test large-scale data slicing in Microsoft Excel.
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
            sheetName="EX2006"
            title="Filtering & Deduplication Pipeline (Txn ID, Customer Name, Branch City, Amount INR, Is Duplicate, Filter Status)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Case 1 · Statutory Duplicate Audit</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Duplicate Invoice Detection via 'Keep Duplicates'
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Auditor <strong>Swadeep Banerjee</strong> audits 50,000 vendor invoices. 
                Selecting the <code className="text-teal-300 font-mono">Invoice_No</code> column and applying <code className="text-teal-300 font-mono">Keep Duplicates</code>, 
                he catches 18 duplicate submissions worth ₹ 1,450,000 before payment disbursement!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                Keep Duplicates → Saved ₹ 1.45M in Double Payments
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · High-Performance SQL Folding</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Server-Side WHERE Clause Folding
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Tuhina Mukherjee</strong> places a date filter as Step 2 of an ERP SQL query: 
                <code className="text-amber-300 font-mono">Table.SelectRows(Source, each Date.IsInCurrentYear([Date]))</code>, 
                allowing the SQL server to stream only 12,000 rows across the network instead of 4 million!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Native SQL Query Folding → 99% Bandwidth Reduction
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Customer Master Deduplication</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Latest Address Retention via Table.Buffer
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                ERP Lead <strong>Abhronila Sengupta</strong> retains the latest customer GST address: 
                <code className="text-indigo-300 font-mono">{'Table.Distinct(Table.Buffer(Table.Sort(Source, {{"Date", Order.Descending}})), {"Cust_ID"})'}</code>, 
                building a 100% accurate CRM dimension table.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Table.Buffer → Locks Latest Record per Customer
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Composite Transaction Dedup</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Composite Key (Customer + Invoice + Date)
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Lead <strong>Debangshu Ghosh</strong> deduplicates POS sales on a composite key: 
                <code className="text-amber-300 font-mono">{'Table.Distinct(Source, {"Cust_ID", "Invoice_No", "Date"})'}</code>, 
                eliminating accidental retry duplicates without deleting genuine repeat customer purchases.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Composite Key Dedup → Preserves Valid Repeat Sales
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
              <span className="text-teal-400">🪜</span> Step-by-Step Data Slicing &amp; Dedup Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Apply Row Filter Early in Pipeline</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Filter out unneeded regions, canceled statuses, or dates before 2026 immediately after Source to trigger SQL Query Folding.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Hierarchically Sort Table by Key &amp; Date</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Sort your date column <strong>Descending</strong> so the latest transaction appears at the top of each key group.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Wrap Sort in Table.Buffer (Formula Bar)</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In the formula bar, wrap your sort step with <code className="text-teal-300 font-mono">Table.Buffer(...)</code> to lock sorted records into RAM.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Select Composite Key &amp; Remove Duplicates</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Hold Ctrl and select your composite key columns → Right-click → <strong>Remove Duplicates</strong>.
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
              Filter Error Protocol
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Single-Key Dedup on Transactions</td>
                  <td className="py-3 px-4 text-slate-300">Deduplicating sales ledgers on Customer ID alone, discarding legitimate repeat orders.</td>
                  <td className="py-3 px-4 text-slate-400">Total revenue drops drastically after deduplication step.</td>
                  <td className="py-3 px-4 text-emerald-400">Select composite keys: Customer ID + Invoice No + Date.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Unbuffered Sort Loss</td>
                  <td className="py-3 px-4 text-slate-300">Lazy evaluation optimizer bypassed the sort step before Table.Distinct.</td>
                  <td className="py-3 px-4 text-slate-400">An older record was retained instead of the latest one.</td>
                  <td className="py-3 px-4 text-emerald-400">Wrap the sort step in <code className="text-emerald-400 font-mono">Table.Buffer(...)</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Case-Sensitive Filter Mismatch</td>
                  <td className="py-3 px-4 text-slate-300">Text.Contains failed because 'kolkata' did not match 'Kolkata'.</td>
                  <td className="py-3 px-4 text-slate-400">Filtered table returns zero rows unexpectedly.</td>
                  <td className="py-3 px-4 text-emerald-400">Pass <code className="text-emerald-400 font-mono">Comparer.OrdinalIgnoreCase</code> into Text.Contains.</td>
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
              Filter Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">Keep Duplicates</span>
                <span>Audit Triage</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Surfaces double-billing and duplicate invoice submissions in seconds.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Table.Buffer</span>
                <span>RAM Order Locking</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Locks sorted record order into memory before applying Table.Distinct.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-teal-400 font-mono font-bold">Dynamic Dates</span>
                <span>Date.IsInCurrentYear</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use relative dynamic date filters so dashboards update automatically year-over-year.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-amber-400 font-mono font-bold">Composite Dedup</span>
                <span>Multi-Column Keys</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Select Customer ID, Invoice No, and Date simultaneously before clicking Remove Duplicates.
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
                <strong>Reflect on early query folding:</strong> Why does placing row filter predicates as Step 2 of an ERP SQL connection deliver 100x faster refresh speeds than filtering downstream after complex transformations?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine composite key deduplication:</strong> Why is deduplicating sales ledgers on a composite key (<code className="text-emerald-400 font-mono">Cust_ID + Invoice_No + Date</code>) vital to avoid deleting legitimate repeat customer transactions?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider memory buffer locking:</strong> Why does <code className="text-teal-300 font-mono">Table.Buffer</code> guarantee that the latest record per customer is preserved during deduplication despite lazy evaluation?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Filtering, Sorting & Deduplication — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Filter early and deduplicate with composite keys! Always place row filter predicates as early as possible in your query to trigger server-side SQL Query Folding. Never deduplicate on customer ID alone unless building dimension tables; use composite keys (Customer + Invoice + Date) for transactions, and buffer sorted tables before distinct operations to deterministically lock in the latest records!"
            }
          />
        </div>
      </div>
    </div>
  );
}
