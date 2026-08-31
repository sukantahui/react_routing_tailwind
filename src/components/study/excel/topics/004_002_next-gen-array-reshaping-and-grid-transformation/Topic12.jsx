"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_002_next_gen_array_reshaping_and_grid_transformation_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic12_files/topic12_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic12() {
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
    link.download = "array_reshaping_master_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              🚀 Capstone Project · Topic 12
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-950/80 border border-purple-700/60 text-purple-300 text-xs font-semibold">
              Bloom's Level 6: Create & Integrate
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent leading-tight">
            Real-World Project: Converting Unformatted Bank Statements into Clean Tabular Data
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            In this capstone enterprise project, we construct an end-to-end automated ETL pipeline that ingests a raw, unformatted 
            20-line banking transaction stream, strips metadata banners, shapes repeating records into a 4-column relational table, 
            attaches dynamic 18% GST calculation columns, sorts transactions descending, and bundles master headers and summary totals into 
            a single self-contained reporting card in RAM—with <strong>zero VBA macros</strong> and <strong>zero Power Query refresh lag</strong>.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Full Array Stack:</strong> DROP + WRAPROWS + HSTACK + VSTACK</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Dynamic Tax Automation:</strong> GST @ 18% & Gross Calculation</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-cyan-400 text-base">✓</span>
              <span><strong>100% Zero VBA:</strong> Works across Excel Web, Mac & Windows</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: COMPLETE ARCHITECTURAL MASTER FORMULA
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6 hover:border-slate-700 transition-all duration-300"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-emerald-400">⚡</span> Master Pipeline Formula (All-in-One Cell)
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Return: 7-Row x 6-Col Complete Financial Card
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-emerald-300 leading-relaxed overflow-x-auto">
            <span className="text-slate-500">// Enter in cell C2 — Full End-to-End Dynamic Banking Ingestion Engine</span>
            <div className="mt-2 text-white font-bold whitespace-pre">
{`=LET(
  raw_stream, A2:A21,
  clean_stream, DROP(raw_stream, 2),
  body_4col, WRAPROWS(clean_stream, 4, "-"),
  sorted_body, SORT(body_4col, 4, -1),
  amounts, CHOOSECOLS(sorted_body, 4),
  gst_col, amounts * 0.18,
  gross_col, amounts * 1.18,
  full_body, HSTACK(sorted_body, gst_col, gross_col),
  headers, {"Txn_ID", "Date", "Customer_Name", "Net_Amount", "GST_18%", "Gross_Total"},
  footer, {"Grand Total", "", "", SUM(amounts), SUM(gst_col), SUM(gross_col)},
  VSTACK(headers, full_body, footer)
)`}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Pipeline Stage</th>
                  <th className="py-3 px-4">Function Used</th>
                  <th className="py-3 px-4">Action & Transformation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">1. Metadata Stripping</td>
                  <td className="py-3 px-4 text-emerald-400">DROP(raw, 2)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Discards the 2 introductory title banner lines from the top of the stream.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-cyan-300">2. Relational Wrapping</td>
                  <td className="py-3 px-4 text-emerald-400">WRAPROWS(clean, 4)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Shapes continuous 4-field records [ID, Date, Name, Amount] into a 4-column 2D table.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-blue-300">3. Transaction Ranking</td>
                  <td className="py-3 px-4 text-emerald-400">SORT(body, 4, -1)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Ranks transaction rows descending by Net Amount.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-fuchsia-300">4. Tax Vector Joining</td>
                  <td className="py-3 px-4 text-emerald-400">HSTACK(...)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Calculates and attaches 18% GST and Gross Invoiced vectors side-by-side.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-violet-300">5. Report Assembly</td>
                  <td className="py-3 px-4 text-emerald-400">VSTACK(...)</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Combines master title header, sanitized body, and grand total footer in 1 cell.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL & PIPELINE MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-emerald-400">🔬</span> Conceptual & Memory Execution Architecture
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Zero-VBA In-Memory ETL
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">1.</span> Why Modern Dynamic Arrays Beat VBA Macros
              </h3>
              <p className="leading-relaxed">
                Legacy VBA macros require COM automation, trigger security warnings on corporate networks, and fail completely in Excel for Web or Mobile. 
                Our formula pipeline runs in native C++ in the core calculation engine—providing instant recalculation when new transaction dumps are pasted.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                100% Macro-Free · Cross-Platform · Real-Time Dynamic Reactivity
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-cyan-400">2.</span> Preventing Stream Periodicity Phase Shifts
              </h3>
              <p className="leading-relaxed">
                If a bank transaction dump is missing a narration line for transaction #3, subsequent records shift into wrong column slots. 
                Using <code className="text-amber-300 font-mono">FILTER(RawStream, RawStream&lt;&gt;"")</code> strips blank delimiter lines in RAM before wrapping, guaranteeing exact 4-field token alignment.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-cyan-300">
                Sanitize with FILTER → Unroll with WRAPROWS
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Instant ERP & Tax Audit Compliance
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Because the resulting table spills as a dynamic range (<code className="text-emerald-300 font-mono">C2#</code>), 
              downstream VAT/GST reconciliation formulas, GSTR-1 export scripts, and Power BI dashboards can query <code className="text-emerald-300 font-mono">C2#</code> directly with zero schema drift.
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
              <span className="text-emerald-400">📐</span> Visual 5-Stage Banking Pipeline Architecture
            </h2>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Interactive 5-Stage ETL Pipeline
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Trace the 5-stage transformation from raw unformatted 20-line bank stream to a pristine 6-column financial report:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 350"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Glows */}
              <circle cx="140" cy="175" r="80" fill="#059669" fillOpacity="0.05" />
              <circle cx="430" cy="175" r="80" fill="#0284C7" fillOpacity="0.05" />
              <circle cx="710" cy="175" r="80" fill="#8B5CF6" fillOpacity="0.05" />

              {/* Stage 1: Raw Stream (Left) */}
              <rect x="20" y="30" width="210" height="290" rx="14" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="20" y="30" width="210" height="30" rx="14" fill="#B45309" fillOpacity="0.3" />
              <text x="125" y="50" fill="#FDE68A" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">RAW STREAM (20 LINES)</text>

              {/* Dropped 2 Lines */}
              <rect x="30" y="68" width="190" height="20" rx="3" fill="#450A0A" stroke="#DC2626" strokeDasharray="2 2" />
              <text x="125" y="82" fill="#F87171" fontSize="8" textAnchor="middle" fontFamily="monospace">[DROP] ** HDFC BANK STATEMENT **</text>

              <rect x="30" y="90" width="190" height="20" rx="3" fill="#450A0A" stroke="#DC2626" strokeDasharray="2 2" />
              <text x="125" y="104" fill="#F87171" fontSize="8" textAnchor="middle" fontFamily="monospace">[DROP] ** ACC: 50100492819 **</text>

              {/* Data Tokens */}
              <g transform="translate(30, 115)">
                <rect width="190" height="18" rx="3" fill="#064E3B" stroke="#10B981" />
                <text x="95" y="12" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="monospace">TXN-101 (Txn ID)</text>

                <rect y="20" width="190" height="18" rx="3" fill="#064E3B" stroke="#10B981" />
                <text x="95" y="32" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="monospace">2024-08-01 (Date)</text>

                <rect y="40" width="190" height="18" rx="3" fill="#064E3B" stroke="#10B981" />
                <text x="95" y="52" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="monospace">Swadeep Banerjee (Name)</text>

                <rect y="60" width="190" height="18" rx="3" fill="#064E3B" stroke="#10B981" />
                <text x="95" y="72" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="monospace">₹45,000 (Amount)</text>

                <rect y="80" width="190" height="18" rx="3" fill="#0F172A" stroke="#334155" />
                <text x="95" y="92" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="monospace">... + 3 more txns (12 lines) ...</text>
              </g>

              {/* Arrow */}
              <path d="M 240 175 L 305 175" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="310,175 300,170 300,180" fill="#10B981" />

              {/* Stage 2 & 3: Memory Processing Pipeline (Center) */}
              <rect x="315" y="40" width="230" height="270" rx="14" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="315" y="40" width="230" height="34" rx="14" fill="#065F46" fillOpacity="0.4" />
              <text x="430" y="62" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">IN-MEMORY ARRAY PIPELINE</text>

              <g transform="translate(325, 85)">
                <rect width="210" height="28" rx="5" fill="#164E63" stroke="#06B6D4" />
                <text x="105" y="18" fill="#CFFAFE" fontSize="9" textAnchor="middle" fontFamily="monospace">1. WRAPROWS(clean, 4, "-")</text>

                <rect y="34" width="210" height="28" rx="5" fill="#1E3A8A" stroke="#3B82F6" />
                <text x="105" y="52" fill="#DBEAFE" fontSize="9" textAnchor="middle" fontFamily="monospace">2. SORT(body, 4, -1)</text>

                <rect y="68" width="210" height="28" rx="5" fill="#3B0764" stroke="#A855F7" />
                <text x="105" y="86" fill="#F3E8FF" fontSize="9" textAnchor="middle" fontFamily="monospace">3. HSTACK(GST 18%, Gross)</text>

                <rect y="102" width="210" height="28" rx="5" fill="#064E3B" stroke="#10B981" />
                <text x="105" y="120" fill="#D1FAE5" fontSize="9" textAnchor="middle" fontFamily="monospace">4. VSTACK(Header, Body, Total)</text>
              </g>

              <text x="430" y="245" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Pipeline Highlights:</text>
              <text x="430" y="265" fill="#34D399" fontSize="9.5" textAnchor="middle" fontFamily="monospace">✓ Zero hardcoded helper cells</text>
              <text x="430" y="283" fill="#34D399" fontSize="9.5" textAnchor="middle" fontFamily="monospace">✓ Sub-millisecond C++ evaluation</text>

              {/* Arrow */}
              <path d="M 555 175 L 620 175" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="625,175 615,170 615,180" fill="#10B981" />

              {/* Stage 4: Spilled Clean Report (Right) */}
              <rect x="630" y="30" width="200" height="290" rx="14" fill="#0F172A" stroke="#10B981" strokeWidth="2" />
              <rect x="630" y="30" width="200" height="30" rx="14" fill="#065F46" fillOpacity="0.4" />
              <text x="730" y="50" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">FINAL REPORT (7 ROWS x 6 COLS)</text>

              <g transform="translate(638, 68)">
                {/* Header */}
                <rect width="184" height="20" rx="3" fill="#065F46" stroke="#10B981" />
                <text x="92" y="14" fill="#ECFDF5" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Txn | Date | Name | Net | GST | Gross</text>

                {/* 4 Data Rows */}
                <rect y="22" width="184" height="18" rx="3" fill="#064E3B" stroke="#10B981" />
                <text x="92" y="34" fill="#A7F3D0" fontSize="7.5" textAnchor="middle" fontFamily="monospace">TXN-104 · Susmita · 61k · 10.9k · 71.9k</text>

                <rect y="42" width="184" height="18" rx="3" fill="#0F172A" stroke="#1E293B" />
                <text x="92" y="54" fill="#F8FAFC" fontSize="7.5" textAnchor="middle" fontFamily="monospace">TXN-103 · Abhronila · 52k · 9.3k · 61.3k</text>

                <rect y="62" width="184" height="18" rx="3" fill="#0F172A" stroke="#1E293B" />
                <text x="92" y="74" fill="#F8FAFC" fontSize="7.5" textAnchor="middle" fontFamily="monospace">TXN-101 · Swadeep · 45k · 8.1k · 53.1k</text>

                <rect y="82" width="184" height="18" rx="3" fill="#0F172A" stroke="#1E293B" />
                <text x="92" y="94" fill="#F8FAFC" fontSize="7.5" textAnchor="middle" fontFamily="monospace">TXN-102 · Tuhina · 38k · 6.8k · 44.8k</text>

                {/* Footer Total */}
                <rect y="104" width="184" height="20" rx="3" fill="#451A03" stroke="#F59E0B" />
                <text x="92" y="118" fill="#FDE68A" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Grand Total: ₹196k | ₹35.2k | ₹231.2k</text>
              </g>

              <rect x="638" y="210" width="184" height="70" rx="6" fill="#10B981" fillOpacity="0.12" stroke="#10B981" strokeDasharray="3 3" />
              <text x="730" y="235" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Spill Anchor: C2#</text>
              <text x="730" y="255" fill="#A7F3D0" fontSize="9" textAnchor="middle" fontFamily="monospace">Pristine Accounting Card</text>
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
                Explore the raw 20-line banking stream below or download the master workbook to test the full ETL pipeline in Microsoft Excel.
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
            sheetName="EX1713"
            title="Raw Bank Transaction Feed (20-Line Unformatted Log Dump)"
            rowsPerPage={12}
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
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 1 · Banking Ingestion Automation</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore Finance</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Daily HDFC Webhook Log Ingestion
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Accountant <strong>Swadeep Banerjee</strong> receives daily raw bank log dumps (<code className="text-amber-300 font-mono">A2:A21</code>). 
                Entering our single master LET formula in cell <code className="text-emerald-300 font-mono">C2</code> produces a complete 6-column financial ledger with 18% GST and grand totals in under 2 milliseconds.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Formula: Master Pipeline → 7-Row x 6-Column Clean Financial Card
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Case 2 · GST Audit Reconciliation</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Tax Advisory</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Instant Input Tax Credit (ITC) Verification
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Tax Consultant <strong>Abhronila Sengupta</strong> audits vendor statements for GSTR-2B compliance. 
                Our pipeline attaches the exact 18% GST calculation vector automatically, ensuring zero discrepancy between bank debits and claimed tax credits.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300">
                Formula: Dynamic GST Vector (amounts * 0.18) → Zero Audit Errors
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · High-Value Transaction Flagging</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Industrial Facility</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Sorting Top Value Invoices for Executive Sign-off
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Susmita Roy</strong> relies on the pipeline's embedded <code className="text-amber-300 font-mono">SORT(body, 4, -1)</code> stage 
                to automatically rank multi-lakh vendor disbursements at the top of the report for executive approval.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Formula: =SORT(body, 4, -1) → Ranked by Net Invoiced
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 4 · Multi-Campus Bank Consolidation</span>
                <span className="text-xs font-mono text-slate-400">Naihati Software Lab</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Consolidating 3 Regional Bank Accounts
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                DevOps Lead <strong>Debangshu Ghosh</strong> feeds 3 separate bank accounts (Barrackpore, Shyamnagar, Naihati) through the pipeline 
                and stacks them using <code className="text-amber-300 font-mono">=VSTACK(BK_Pipeline#, SH_Pipeline#, NH_Pipeline#)</code>.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Formula: =VSTACK(Pipeline1#, Pipeline2#, Pipeline3#)
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
              <span className="text-emerald-400">🪜</span> Step-by-Step Practical Implementation Walkthrough
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Methodical Execution
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Inspect Raw Bank Stream</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Review raw log feed in <code className="text-amber-300 font-mono">A2:A21</code>. Lines 2 and 3 contain metadata banners. Lines 4 to 19 contain 4 complete transactions of 4 fields each.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Enter the Master LET Pipeline Formula</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">C2</code>, paste the master LET formula shown in Section 2. Press Enter.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Verify the Spilled 7x6 Financial Card</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  The formula spills across 7 rows x 6 columns (<code className="text-emerald-300 font-mono">C2:H8</code>). 
                  Row 2 has headers, Rows 3-6 have sorted transaction data with GST, and Row 8 has grand totals.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Format Currency Columns</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Select columns F, G, and H and apply Indian Rupee formatting (<code className="text-emerald-400 font-mono">₹#,##0.00</code>) for a presentation-ready corporate deliverable.
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Phase Shift / Field Misalignment</td>
                  <td className="py-3 px-4 text-slate-300">Missing field in one transaction shifts all subsequent rows.</td>
                  <td className="py-3 px-4 text-slate-400">Names appear in Amount column.</td>
                  <td className="py-3 px-4 text-emerald-400">Sanitize stream with <code className="text-emerald-400 font-mono">FILTER(raw, raw&lt;&gt;"")</code> before wrapping.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">#VALUE! in Tax Calculations</td>
                  <td className="py-3 px-4 text-slate-300">Amounts exported as text strings with non-breaking spaces or currency symbols.</td>
                  <td className="py-3 px-4 text-slate-400">SUM returns 0 or #VALUE!.</td>
                  <td className="py-3 px-4 text-emerald-400">Wrap amounts in <code className="text-emerald-400 font-mono">--SUBSTITUTE(amounts, "₹", "")</code> to coerce to numbers.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#SPILL!</td>
                  <td className="py-3 px-4 text-slate-300">Destination cells occupied by existing text or merged cells.</td>
                  <td className="py-3 px-4 text-slate-400">Click error float → 'Select Obstructing Cells'.</td>
                  <td className="py-3 px-4 text-emerald-400">Clear obstructing cells to allow unobstructed dynamic spill.</td>
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
              Pipeline Secrets
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">LAMBDA Conversion</span>
                <span>Reusable Custom Function</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Save the formula in Name Manager as <code className="text-amber-300 font-mono">=CLEAN_BANK_STATEMENT(stream)</code> for 1-click execution across the workbook.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-cyan-400 font-mono font-bold">Auto-Sizing Spilled Range</span>
                <span>Zero Hardcoded Limits</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pass a dynamic anchor like <code className="text-emerald-300 font-mono">A2#</code> to allow the pipeline to resize automatically as raw feeds grow.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Dynamic Tax Rates</span>
                <span>Configurable GST Parameters</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Link GST multiplier to a cell dropdown (e.g. 5%, 12%, 18%, 28%) for multi-slab tax handling.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-emerald-300 text-xs font-mono">F9</kbd>
                <span>Step-Through Debugging</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight individual LET variable names (e.g. <code className="text-amber-300 font-mono">full_body</code>) and press <strong>F9</strong> to inspect intermediate data stages.
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
                <strong>Reflect on auditability:</strong> Why is building a 100% formula-driven array pipeline vastly superior to legacy VBA macros from an IT governance and security perspective?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine memory efficiency:</strong> Why does using <code className="text-emerald-300 font-mono">LET</code> to store intermediate variables execute orders of magnitude faster than writing 5 separate helper formula columns on the worksheet?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider pipeline scaling:</strong> How can this exact formula architecture be scaled to process 5,000 banking transactions exported from SAP or Oracle with zero modification?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Real-World Banking ETL Project — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "This project embodies the pinnacle of modern Excel dynamic array architecture. By uniting DROP, WRAPROWS, CHOOSECOLS, HSTACK, VSTACK, and SORT inside LET, you have replaced hours of manual data cleaning and fragile VBA macros with a single, elegant, self-healing formula. Master this pattern—it will distinguish you as a top-tier financial engineer and data modeler in the corporate world!"
            }
          />
        </div>
      </div>
    </div>
  );
}
