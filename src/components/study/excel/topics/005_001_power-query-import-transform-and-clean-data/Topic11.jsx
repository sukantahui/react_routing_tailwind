"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/005_001_power_query_import_transform_and_clean_data_master.xlsx?url";
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
              ⚡ Relational Joins · Topic 11
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              The 6 Relational Join Kinds
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze &amp; Relate
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Merging Queries: Relational Joins &amp; Exception Hunting at Scale
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            VLOOKUP and XLOOKUP formulas crumble when joining million-row datasets across disparate corporate databases. 
            Power Query's <strong>Relational Join Engine</strong> (<code className="text-teal-300 font-mono">Table.NestedJoin</code>) 
            delivers complete relational algebra capabilities—from high-speed <strong>Left Outer VLOOKUP replacements</strong> and 
            <strong>Inner Joins</strong> to statutory <strong>Left Anti Exception Detection</strong> and 
            <strong>Table.Buffer Memory Acceleration</strong>!
          </p>

          <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>The 6 Join Kinds:</strong> Left Outer, Right Outer, Full Outer, Inner, Left Anti, Right Anti</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Left Anti Exception Finder:</strong> Instantly catches unapproved vendors &amp; orphan records</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Prevent Row Explosion:</strong> Deduplicate lookup tables to eliminate revenue duplication</span>
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
              <span className="text-teal-400">⚡</span> Power Query Join M Syntax Anatomy
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              M Table.NestedJoin Functions
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-teal-300 space-y-2">
            <span className="text-slate-500">// 1. Left Outer Join (VLOOKUP Replacement)</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'= Table.NestedJoin(Fact_Sales, {"Customer_ID"}, Dim_Customers, {"Customer_ID"}, "CustInfo", JoinKind.LeftOuter)'}
            </div>
            <span className="text-slate-500">// 2. Left Anti Join (Statutory Audit Exception Finder)</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'= Table.NestedJoin(Fact_Sales, {"Customer_ID"}, Dim_Customers, {"Customer_ID"}, "Unmatched", JoinKind.LeftAnti)'}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Join Kind</th>
                  <th className="py-3 px-4">M Parameter Value</th>
                  <th className="py-3 px-4">Relational Behavior</th>
                  <th className="py-3 px-4">Corporate Business Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-teal-400 font-sans">Left Outer</td>
                  <td className="py-3 px-4 text-teal-300">JoinKind.LeftOuter</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">All from Left + Matching from Right</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Enriching sales orders with customer and product details.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-rose-400 font-sans">Left Anti</td>
                  <td className="py-3 px-4 text-rose-300">JoinKind.LeftAnti</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Rows ONLY in Left with NO match in Right</td>
                  <td className="py-3 px-4 font-sans text-rose-400">Finding unapproved vendors and orphan transactions.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-400 font-sans">Right Anti</td>
                  <td className="py-3 px-4 text-amber-300">JoinKind.RightAnti</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Rows ONLY in Right with NO match in Left</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Finding inactive customers or dead inventory catalog items.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">Inner Join</td>
                  <td className="py-3 px-4 text-emerald-300">JoinKind.Inner</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Strict intersection of both tables</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Matching verified bank reconciliation statements.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400 font-sans">Full Outer</td>
                  <td className="py-3 px-4 text-sky-300">JoinKind.FullOuter</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Complete union with aligned keys</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Comprehensive variance comparison across fiscal years.</td>
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
              <span className="text-emerald-400">🔬</span> 1-to-Many Row Explosion &amp; Table.Buffer Memory Acceleration
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Join Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-teal-400">1.</span> Preventing 1-to-Many Row Explosion
              </h3>
              <p className="leading-relaxed">
                If your lookup table contains <strong>duplicate keys</strong> (e.g. two rows for Customer ID 101), 
                expanding the merged column will duplicate the transaction row in your fact table, 
                <strong>artificially multiplying your company's revenue</strong>! 
                Always apply <code className="text-teal-300 font-mono">Table.Distinct</code> on the lookup dimension key before merging!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-teal-300">
                Rule: Lookup Tables Must Have Unique Primary Keys
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Table.Buffer for 10x Local Join Speed
              </h3>
              <p className="leading-relaxed">
                When merging large Excel/CSV flat files, Power Query repeatedly reads the disk lookup file for every single fact row. 
                Wrapping the lookup table in <code className="text-emerald-300 font-mono">Table.Buffer(Dim_Table)</code> locks it into RAM, 
                boosting merge speeds by up to 50x!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Table.NestedJoin(Fact, {"ID"}, Table.Buffer(Dim), {"ID"}, "Data")
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Exact Key Data Type Matching
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Power Query requires strict type equality on join keys. 
              If the fact table has <code className="text-rose-400 font-mono">Cust_ID</code> as <strong>Text</strong> and the dimension table has it as <strong>Whole Number</strong>, 
              the merge will return <strong>0 matched rows</strong>! Always synchronize data types prior to joining.
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
              <span className="text-teal-400">📐</span> Visual Relational Join Architecture
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Join Pipeline Flow
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Observe how Fact and Dimension tables enter the relational join engine to produce enriched schemas or audit exception reports:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Dual Input Tables (Left) */}
              <rect x="25" y="25" width="220" height="130" rx="10" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <text x="135" y="47" fill="#CCFBF1" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">FACT SALES (Left Table)</text>
              <g transform="translate(35, 60)" fontSize="8" fontFamily="monospace" fill="#CBD5E1">
                <text x="6" y="15">TXN-1 | CUST-101 | ₹45,000</text>
                <text x="6" y="32">TXN-2 | CUST-102 | ₹12,500</text>
                <text x="6" y="49" fill="#FCA5A5">TXN-3 | CUST-999 | ₹8,000 (Orphan)</text>
              </g>

              <rect x="25" y="165" width="220" height="130" rx="10" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <text x="135" y="187" fill="#BAE6FD" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">DIM CUSTOMERS (Right Table)</text>
              <g transform="translate(35, 200)" fontSize="8" fontFamily="monospace" fill="#CBD5E1">
                <text x="6" y="15">CUST-101 | Swadeep | Barrackpore</text>
                <text x="6" y="32">CUST-102 | Tuhina  | Shyamnagar</text>
                <text x="6" y="49" fill="#FEF08A">CUST-103 | Susmita | Ichapur (No Txn)</text>
              </g>

              {/* Arrow */}
              <path d="M 260 160 L 315 160" stroke="#14B8A6" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="320,160 310,155 310,165" fill="#14B8A6" />

              {/* Join Engine (Center) */}
              <rect x="325" y="25" width="250" height="270" rx="14" fill="#0F172A" stroke="#0D9488" strokeWidth="2" />
              <rect x="325" y="25" width="250" height="34" rx="14" fill="#115E59" fillOpacity="0.4" />
              <text x="450" y="47" fill="#F0FDFA" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2. M RELATIONAL JOIN ENGINE</text>

              <g transform="translate(340, 70)" fontSize="8.5" fontFamily="sans-serif">
                <rect width="220" height="32" rx="4" fill="#134E4A" stroke="#14B8A6" />
                <text x="10" y="20" fill="#5EEAD4" fontWeight="bold">1. JoinKind.LeftOuter (VLOOKUP)</text>

                <rect y="38" width="220" height="32" rx="4" fill="#881337" fillOpacity="0.4" stroke="#F43F5E" />
                <text x="10" y="58" fill="#FDA4AF" fontWeight="bold">2. JoinKind.LeftAnti (Exceptions)</text>

                <rect y="76" width="220" height="32" rx="4" fill="#065F46" fillOpacity="0.3" stroke="#10B981" />
                <text x="10" y="96" fill="#A7F3D0" fontWeight="bold">3. Table.Buffer (Memory Lock)</text>

                <rect y="114" width="220" height="32" rx="4" fill="#854D0E" fillOpacity="0.3" stroke="#EAB308" />
                <text x="10" y="134" fill="#FEF08A" fontWeight="bold">4. Expand or Aggregate Sub-Table</text>
              </g>

              <text x="450" y="270" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Sub-Second Relational Hash Match</text>

              {/* Arrow */}
              <path d="M 590 160 L 620 160" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="625,160 615,155 615,165" fill="#10B981" />

              {/* Output Result (Right) */}
              <rect x="630" y="25" width="195" height="270" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="630" y="25" width="195" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="727" y="45" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3. ENRICHED STAR SCHEMA</text>

              <g transform="translate(640, 75)" fontSize="8" fontFamily="monospace" fill="#E2E8F0">
                <rect width="175" height="22" fill="#064E3B" stroke="#10B981" />
                <text x="6" y="15" fill="#34D399" fontWeight="bold">TXN | Name | City | Amount</text>

                <rect y="25" width="175" height="20" fill="#1E293B" />
                <text x="6" y="39">T1 | Swadeep | BKP | ₹45k</text>

                <rect y="48" width="175" height="20" fill="#1E293B" />
                <text x="6" y="62">T2 | Tuhina  | SHY | ₹12.5k</text>

                <rect y="71" width="175" height="20" fill="#1E293B" />
                <text x="6" y="85" fill="#FCA5A5">T3 | null    | null| ₹8k</text>
              </g>

              <rect x="640" y="225" width="175" height="55" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" />
              <text x="727" y="245" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Enriched Fact Feed</text>
              <text x="727" y="262" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Ready for Power Pivot DAX</text>
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
                Explore the merging queries dataset below or download the practice workbook to test Left Outer and Left Anti joins in Microsoft Excel.
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
            sheetName="EX2012"
            title="Relational Join Master Dataset (Transaction ID, Customer ID, Enriched Customer Name, Branch City, Amount INR, Join Status)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Case 1 · VLOOKUP Replacement</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Left Outer Master Dimension Enrichment
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Swadeep Banerjee</strong> enriches 100,000 POS sales rows with Customer Name and GSTIN using <code className="text-teal-300 font-mono">JoinKind.LeftOuter</code> in 1.8 seconds, replacing 200,000 fragile VLOOKUP formulas.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                Left Outer Join → Replaces 200k Fragile Worksheet Formulas
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-rose-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Case 2 · Unapproved Vendor Triage</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Left Anti Audit Exception Finder
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Auditor <strong>Tuhina Mukherjee</strong> merges ERP expense disbursements against the Approved Vendor Master with <code className="text-rose-400 font-mono">JoinKind.LeftAnti</code>, instantly isolating 14 unapproved vendor payments worth ₹ 820,000!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-rose-300">
                Left Anti Join → Surfaced ₹ 820k in Unapproved Disbursements
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Row Explosion Prevention</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Table.Distinct Deduplication on Lookups
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                ERP Lead <strong>Abhronila Sengupta</strong> deduplicates the Product Dimension key before merging, preventing a ₹ 62M revenue duplication bug caused by multiple vendor records sharing the same SKU.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Table.Distinct(Dim_Products) → Zero Row Explosion
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Table.Buffer RAM Acceleration</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                50x Local Merge Speedup via Memory Buffering
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Lead <strong>Debangshu Ghosh</strong> wraps a 50,000-row Item Master in <code className="text-amber-300 font-mono">Table.Buffer</code>, cutting local merge refresh duration from 3 minutes down to 4.2 seconds!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Table.Buffer(Item_Master) → 4.2s Refresh vs 3 Minutes
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
              <span className="text-teal-400">🪜</span> Step-by-Step Merging Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Deduplicate Lookup Key &amp; Match Data Types</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Verify the lookup dimension has unique keys (<code className="text-teal-300 font-mono">Table.Distinct</code>) and identical data types (<code className="text-teal-300 font-mono">type text</code> or <code className="text-teal-300 font-mono">Int64.Type</code>).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Select Tables &amp; Matching Key Columns</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Go to <strong>Home Tab → Merge Queries</strong> → Select primary table and lookup table → Click matching key columns in both tables.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Choose Join Kind &amp; Verify Green Match Check</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Select <strong>Left Outer</strong> (or <strong>Left Anti</strong> for exception audit). Confirm high match percentage at the bottom of the dialog.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Expand or Aggregate Merged Columns</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Click the Expand icon → Uncheck 'Use original column name as prefix' → Select desired dimension attributes!
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
              Join Error Protocol
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">1-to-Many Row Explosion</td>
                  <td className="py-3 px-4 text-slate-300">Lookup table contains duplicate keys for a single entity.</td>
                  <td className="py-3 px-4 text-slate-400">Total fact row count increases after expanding merged column.</td>
                  <td className="py-3 px-4 text-emerald-400">Apply <code className="text-emerald-400 font-mono">Table.Distinct</code> on lookup key before merging.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Zero Matches on Valid Keys</td>
                  <td className="py-3 px-4 text-slate-300">Data type mismatch (e.g. Text key vs Number key).</td>
                  <td className="py-3 px-4 text-slate-400">Merge preview dialog shows 0 matching rows.</td>
                  <td className="py-3 px-4 text-emerald-400">Coerce both key columns to identical data types.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Formula.Firewall Privacy Error</td>
                  <td className="py-3 px-4 text-slate-300">Merging across disparate data security privacy partitions.</td>
                  <td className="py-3 px-4 text-slate-400">Formula.Firewall error message blocks evaluation.</td>
                  <td className="py-3 px-4 text-emerald-400">Set Data Source Privacy to 'Organizational' on all sources.</td>
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
              Join Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">Left Anti Join</span>
                <span>Audit Exception Hunter</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Isolate unapproved vendors and orphan transactions in seconds.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Table.Buffer</span>
                <span>50x Local RAM Boost</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Buffer lookup tables in memory to eliminate repeated disk reads.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-teal-400 font-mono font-bold">Composite Keys</span>
                <span>Multi-Column Matching</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hold Ctrl and click Branch ID + Dept ID in identical order across both tables.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-amber-400 font-mono font-bold">Direct Aggregation</span>
                <span>Zero Row Multiplication</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use Table.AggregateTableColumn to roll up metric sums without expanding rows.
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
                <strong>Reflect on Left Anti joins:</strong> Why is <code className="text-rose-400 font-mono">JoinKind.LeftAnti</code> vastly more effective for statutory financial auditing than writing complex conditional lookup formulas?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine 1-to-many row duplication:</strong> How does failing to deduplicate a product lookup dimension result in catastrophic revenue inflation when expanding a merged fact table?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider memory buffer locking:</strong> Why does wrapping the lookup dimension in <code className="text-emerald-300 font-mono">Table.Buffer</code> reduce merge execution time from minutes to seconds?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Merging Queries & Relational Joins — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Deduplicate lookup keys and verify data types before joining! Always check the green match percentage preview at the bottom of the Merge dialog to spot join anomalies early. Use 'Left Anti' joins to catch audit reconciliation breaks and unapproved vendors, wrap lookup tables in Table.Buffer for 10x local file performance, and ALWAYS ensure lookup tables have unique primary keys to prevent catastrophic 1-to-many row explosion and revenue inflation!"
            }
          />
        </div>
      </div>
    </div>
  );
}
