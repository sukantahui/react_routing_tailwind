"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/m_code_master.xlsx?url";
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
    link.download = "m_code_master_practice.xlsx";
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
              🚀 Enterprise Capstone Project · Topic 12
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 text-xs font-semibold">
              Automated Multi-Branch Sales Pipeline
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-950/80 border border-purple-700/60 text-purple-300 text-xs font-semibold">
              Bloom's Level 6: Design &amp; Deploy
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent leading-tight">
            Real-World Capstone: Automated Multi-Branch Daily Sales Consolidation Pipeline
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Synthesizing all advanced M scripting skills, this flagship capstone project engineers a resilient, enterprise-grade ETL pipeline 
            that automatically ingests daily sales workbooks from multiple regional branches 
            (<strong>Barrackpore HQ</strong>, <strong>Shyamnagar</strong>, <strong>Ichapur</strong>, <strong>Naihati</strong>, <strong>Titagarh</strong>), 
            extracts filename metadata, handles schema drift with <code className="text-emerald-300 font-mono">MissingField.UseNull</code>, 
            isolates bad records into a <strong>Dual-Stream Quarantine Log</strong>, and produces an audit-ready consolidated revenue model in seconds!
          </p>

          <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Parameterized Ingestion:</strong> Ingests 50k+ daily rows from folder drop zones seamlessly</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Dual-Stream Quarantine:</strong> 100% clean Fact model + transparent Audit error log</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-cyan-400 text-base">✓</span>
              <span><strong>Automated Reconciliation:</strong> Self-verifying totals against source file batch hashes</span>
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
              <span className="text-emerald-400">⚡</span> Master Pipeline Ingestion Function &amp; Architecture
            </h2>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              fxIngestBranchSheet Architecture
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto shadow-inner leading-relaxed space-y-2">
            <div>
              <span className="text-slate-500">// Reusable Multi-Branch Ingestion Function with Schema Protection</span>
              <br />
              <span className="text-purple-400">let</span>
              <br />
              &nbsp;&nbsp;<span className="text-sky-300">fxIngestBranchSheet</span> = (
              <span className="text-amber-300">fileBinary</span> <span className="text-purple-400">as</span> binary, 
              <span className="text-amber-300">fileName</span> <span className="text-purple-400">as</span> text
              ) <span className="text-purple-400">as</span> table =&gt;
              <br />
              &nbsp;&nbsp;<span className="text-purple-400">let</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400">Buffered</span> = <span className="text-purple-400">Binary.Buffer</span>(fileBinary),
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400">Workbook</span> = <span className="text-purple-400">Excel.Workbook</span>(Buffered, <span className="text-emerald-300">true</span>),
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400">SheetData</span> = Workbook&#123;[Item=<span className="text-emerald-200">"SalesData"</span>, Kind=<span className="text-emerald-200">"Sheet"</span>]&#125;[Data],
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400">Standardized</span> = <span className="text-purple-400">Table.SelectColumns</span>(
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SheetData, 
              &#123;<span className="text-emerald-200">"InvoiceNo"</span>, <span className="text-emerald-200">"CustomerCode"</span>, <span className="text-emerald-200">"ItemSKU"</span>, <span className="text-emerald-200">"Quantity"</span>, <span className="text-emerald-200">"UnitPrice"</span>, <span className="text-emerald-200">"GrossTotal"</span>&#125;, 
              <span className="text-purple-400">MissingField.UseNull</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;),
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400">Branch</span> = <span className="text-purple-400">Text.BetweenDelimiters</span>(fileName, <span className="text-emerald-200">"Sales_"</span>, <span className="text-emerald-200">"_"</span>),
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400">WithMeta</span> = <span className="text-purple-400">Table.AddColumn</span>(Standardized, <span className="text-emerald-200">"BranchCode"</span>, <span className="text-purple-400">each</span> Branch, <span className="text-purple-400">type text</span>)
              <br />
              &nbsp;&nbsp;<span className="text-purple-400">in</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;WithMeta
              <br />
              <span className="text-purple-400">in</span>
              <br />
              &nbsp;&nbsp;fxIngestBranchSheet
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Pipeline Layer</th>
                  <th className="py-3 px-4">Query Name</th>
                  <th className="py-3 px-4">Primary Transformation</th>
                  <th className="py-3 px-4">Operational SLA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-300">01_Parameters</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">pSalesDropPath</td>
                  <td className="py-3 px-4">Points to network / SharePoint drop directory</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Instant Config</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-indigo-300">02_Functions</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">fxIngestBranchSheet</td>
                  <td className="py-3 px-4">Opens workbook, standardizes schema with <code className="text-indigo-300">MissingField.UseNull</code></td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">&lt; 150ms per file</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">03_Staging</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">stg_Consolidated_Raw</td>
                  <td className="py-3 px-4">Appends all branch files via <code className="text-amber-300">Table.Combine</code> (No Load)</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Zero Model Bloat</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-emerald-300">05_Facts</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Fact_ConsolidatedSales</td>
                  <td className="py-3 px-4">100% clean, validated transactions loaded into VertiPaq</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Sub-3-sec Refresh</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">06_Audits</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Audit_QuarantineLog</td>
                  <td className="py-3 px-4">Captures malformed rows, missing GSTINs, and duplicates</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">100% Audit Trail</td>
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
              <span className="text-cyan-400">🔬</span> Conceptual &amp; Governance Mechanics
            </h2>
            <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-lg border border-cyan-800">
              Enterprise Resilience Pillars
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-emerald-300 text-base flex items-center gap-2">
                <span>1.</span> Filename Metadata Extraction (Lineage Injection)
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Regional branch accountants often submit spreadsheets lacking internal branch labels or date headers. 
                Our pipeline dynamically derives <code className="text-emerald-300 font-mono">BranchCode</code> and <code className="text-emerald-300 font-mono">TransactionDate</code> directly from the standardized file naming format (<code className="text-slate-400 font-mono">Sales_Barrackpore_2026-08-25.xlsx</code>), injecting lineage into every record.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-teal-300 text-base flex items-center gap-2">
                <span>2.</span> Schema Drift Resilience (MissingField.UseNull)
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                When one branch upgrades its POS terminal and omits an optional column like <code className="text-slate-400 font-mono">PaymentMode</code>, traditional ETL pipelines fail instantly. 
                Using <code className="text-teal-300 font-mono">Table.SelectColumns(..., MissingField.UseNull)</code> injects null values for missing fields gracefully without breaking the consolidation run.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-purple-300 text-base flex items-center gap-2">
                <span>3.</span> Dual-Stream Quarantine Architecture
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Instead of blindly deleting defective rows or replacing errors with zeroes, the pipeline splits at the staging tier. 
                Clean, validated records flow into <code className="text-emerald-300 font-mono">Fact_ConsolidatedSales</code>, while defective records (negative amounts, invalid GSTINs, duplicates) are routed to <code className="text-rose-300 font-mono">Audit_QuarantineLog</code> for operational review.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-sky-300 text-base flex items-center gap-2">
                <span>4.</span> Automated Reconciliation &amp; Missing Branch Alerts
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                An automated anti-join query compares the master branch directory with the ingested files. 
                If a branch (e.g. Shyamnagar) fails to upload its daily closing file, an alert record is immediately generated, notifying management before executive reporting starts.
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
              <span className="text-emerald-400">📐</span> Visual ETL Lineage: Multi-Branch Pipeline &amp; Dual-Stream Quarantine
            </h2>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              End-to-End Topology
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 flex flex-col items-center justify-center overflow-x-auto shadow-inner">
            <svg
              viewBox="0 0 880 340"
              className="w-full max-w-4xl h-auto text-slate-200 select-none font-sans"
            >
              <defs>
                <linearGradient id="gradDrop" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>
                <linearGradient id="gradClean" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#065f46" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="gradQuarantine" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#991b1b" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
                <marker
                  id="arrow-em"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="4"
                  orient="auto"
                >
                  <path d="M 0 0 L 8 4 L 0 8 z" fill="#34d399" />
                </marker>
                <marker
                  id="arrow-ro"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="4"
                  orient="auto"
                >
                  <path d="M 0 0 L 8 4 L 0 8 z" fill="#f87171" />
                </marker>
              </defs>

              {/* Step 1: Regional Branch Drop Files */}
              <g transform="translate(20, 40)">
                <rect width="200" height="250" rx="14" fill="url(#gradDrop)" stroke="#64748b" strokeWidth="1.5" />
                <text x="100" y="28" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
                  Regional Drop Zone
                </text>
                <text x="100" y="44" textAnchor="middle" fill="#94a3b8" fontSize="9">
                  Daily Branch Excel Files
                </text>

                <rect x="15" y="55" width="170" height="32" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
                <text x="25" y="75" fill="#7dd3fc" fontSize="10" fontFamily="monospace">Sales_Barrackpore.xlsx</text>

                <rect x="15" y="95" width="170" height="32" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
                <text x="25" y="115" fill="#7dd3fc" fontSize="10" fontFamily="monospace">Sales_Shyamnagar.xlsx</text>

                <rect x="15" y="135" width="170" height="32" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
                <text x="25" y="155" fill="#7dd3fc" fontSize="10" fontFamily="monospace">Sales_Ichapur.xlsx</text>

                <rect x="15" y="175" width="170" height="32" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
                <text x="25" y="195" fill="#7dd3fc" fontSize="10" fontFamily="monospace">Sales_Naihati.xlsx</text>

                <rect x="15" y="215" width="170" height="22" rx="4" fill="#1e293b" />
                <text x="100" y="230" textAnchor="middle" fill="#94a3b8" fontSize="9">
                  + Titagarh &amp; Kolkata Hubs
                </text>
              </g>

              {/* Arrow 1 */}
              <path d="M 225 165 L 285 165" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-em)" fill="none" />
              <text x="255" y="155" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">
                Ingest
              </text>

              {/* Step 2: Custom Function & Ingestion Engine */}
              <g transform="translate(295, 40)">
                <rect width="250" height="250" rx="14" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <rect x="15" y="15" width="220" height="26" rx="6" fill="#065f46" />
                <text x="125" y="32" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">
                  fxIngestBranchSheet Engine
                </text>

                <rect x="15" y="55" width="220" height="42" rx="8" fill="#134e4a" opacity="0.6" stroke="#2dd4bf" strokeWidth="1" />
                <text x="25" y="73" fill="#5eead4" fontSize="10" fontFamily="monospace">1. Binary.Buffer([Content])</text>
                <text x="25" y="87" fill="#99f6e4" fontSize="9">Prevents repeated network disk I/O</text>

                <rect x="15" y="105" width="220" height="42" rx="8" fill="#134e4a" opacity="0.6" stroke="#2dd4bf" strokeWidth="1" />
                <text x="25" y="123" fill="#5eead4" fontSize="10" fontFamily="monospace">2. MissingField.UseNull</text>
                <text x="25" y="137" fill="#99f6e4" fontSize="9">Absorbs POS schema deviations</text>

                <rect x="15" y="155" width="220" height="42" rx="8" fill="#134e4a" opacity="0.6" stroke="#2dd4bf" strokeWidth="1" />
                <text x="25" y="173" fill="#5eead4" fontSize="10" fontFamily="monospace">3. Filename Lineage Extraction</text>
                <text x="25" y="187" fill="#99f6e4" fontSize="9">Injects BranchCode &amp; InvoiceDate</text>

                <rect x="15" y="205" width="220" height="35" rx="8" fill="#1e293b" />
                <text x="125" y="226" textAnchor="middle" fill="#facc15" fontSize="10" fontWeight="bold">
                  Validation &amp; Error Check
                </text>
              </g>

              {/* Splitting Arrows */}
              <path d="M 550 120 L 615 95" stroke="#34d399" strokeWidth="3" markerEnd="url(#arrow-em)" fill="none" />
              <text x="580" y="100" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">
                Clean (99.2%)
              </text>

              <path d="M 550 200 L 615 225" stroke="#f87171" strokeWidth="3" markerEnd="url(#arrow-ro)" fill="none" />
              <text x="580" y="220" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">
                Errors (0.8%)
              </text>

              {/* Step 3: Clean Fact Model */}
              <g transform="translate(625, 40)">
                <rect width="230" height="115" rx="12" fill="url(#gradClean)" stroke="#34d399" strokeWidth="1.5" />
                <text x="115" y="25" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
                  Fact_ConsolidatedSales
                </text>
                <text x="115" y="42" textAnchor="middle" fill="#d1fae5" fontSize="9">
                  [Enable Load = TRUE &rarr; VertiPaq]
                </text>
                
                <rect x="12" y="52" width="206" height="52" rx="6" fill="#064e3b" opacity="0.8" />
                <text x="20" y="70" fill="#a7f3d0" fontSize="10" fontFamily="monospace">✓ 52,410 Validated Rows</text>
                <text x="20" y="85" fill="#a7f3d0" fontSize="10" fontFamily="monospace">✓ Standardized CGST/SGST</text>
                <text x="20" y="98" fill="#a7f3d0" fontSize="10" fontFamily="monospace">✓ Executive Sales Dashboard</text>
              </g>

              {/* Step 3: Quarantine Audit Model */}
              <g transform="translate(625, 175)">
                <rect width="230" height="115" rx="12" fill="url(#gradQuarantine)" stroke="#f87171" strokeWidth="1.5" />
                <text x="115" y="25" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
                  Audit_QuarantineLog
                </text>
                <text x="115" y="42" textAnchor="middle" fill="#fee2e2" fontSize="9">
                  [Exception Tracking &amp; Governance]
                </text>
                
                <rect x="12" y="52" width="206" height="52" rx="6" fill="#7f1d1d" opacity="0.8" />
                <text x="20" y="70" fill="#fecdd3" fontSize="10" fontFamily="monospace">⚠️ 34 Defective Records</text>
                <text x="20" y="85" fill="#fecdd3" fontSize="10" fontFamily="monospace">⚠️ Malformed GSTINs Logged</text>
                <text x="20" y="98" fill="#fecdd3" fontSize="10" fontFamily="monospace">⚠️ Operational Remediation</text>
              </g>
            </svg>
          </div>
          <p className="text-xs text-slate-400 text-center italic">
            Figure 12.1: Multi-Branch Daily Sales Consolidation Pipeline architecture. Daily branch files are ingested via <code className="text-emerald-300">fxIngestBranchSheet</code>, verified against schema rules, and routed cleanly between the production Fact table and the Quarantine Audit log.
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
                Explore the live multi-branch consolidated sales dataset in the grid below or download the full module workbook to practice in Microsoft Excel.
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
            sheetName="Topic12_Sales_Pipeline"
            title="Consolidated Multi-Branch Sales Dataset (GlobalTxID, BranchCode, InvoiceDate, ItemSKU, Qty, GrossINR, TaxableValue, CGST, SGST, IngestionStatus)"
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
              Capstone Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Case 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 1 · Zero-Touch Daily Automation</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Eliminating 3 Hours of Manual Copy-Paste
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Project Lead <strong>Swadeep Banerjee</strong> replaces a manual morning copy-paste routine across 5 branch email attachments with this automated Power Query folder pipeline, reducing daily consolidation time from 3 hours to 4.2 seconds!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Zero-Touch Automation &rarr; 100% On-Time 09:00 AM Executive Briefing
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Case 2 · Quarantine Exception Remediation</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Isolating 34 Malformed Invoices
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Manager <strong>Tuhina Mukherjee</strong> inspects the <code className="text-teal-300 font-mono">Audit_QuarantineLog</code> and identifies 34 transactions with missing customer GSTINs. 
                Her team contacts the billing desk immediately, correcting the invoices before filing monthly GSTR-1 returns.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                Audit_QuarantineLog &rarr; Zero Statutory GST Filing Penalties
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Schema Shift Resilience</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                MissingField.UseNull Protects Refresh
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Data Architect <strong>Abhronila Das</strong> handles an emergency where the Ichapur branch updated their billing software, renaming a discount column. 
                Because <code className="text-indigo-300 font-mono">MissingField.UseNull</code> was active, the pipeline refreshed flawlessly, filling missing values with null.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                MissingField.UseNull &rarr; Uninterrupted Enterprise Reporting
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 4 · Missing Submission Alert</span>
                <span className="text-xs font-mono text-slate-400">Naihati Logistics</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Automated Anti-Join Branch Monitor
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Compliance Officer <strong>Debangshu Roy</strong> checks the <code className="text-purple-300 font-mono">Audit_MissingBranchAlert</code> query at 08:30 AM, which immediately highlights that Titagarh has not submitted their closing file, triggering an automated reminder.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Anti-Join Monitor &rarr; 100% Branch Submission Enforcement
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
              <span className="text-sky-400">🛠️</span> Step-by-Step Capstone Implementation Guide
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              End-to-End Build Protocol
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-emerald-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 flex items-center justify-center text-xs">1</span>
                Step 1: Configure Parameterized Folder Drop Zone
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Define the parameter and filter active Excel workbooks while excluding temporary lock files:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                {`Source = Folder.Files(pSalesDropPath),
#"Filtered Valid Excel" = Table.SelectRows(Source, each [Extension] = ".xlsx" and not Text.StartsWith([Name], "~$"))`}
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-teal-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-950 border border-teal-700 text-teal-300 flex items-center justify-center text-xs">2</span>
                Step 2: Invoke Custom Ingestion Function &amp; Combine
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Invoke <code className="text-teal-300 font-mono">fxIngestBranchSheet</code> row-by-row and combine all tables into a unified staging stream:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300 overflow-x-auto">
                {`#"Invoked Custom Ingestion" = Table.AddColumn(#"Filtered Valid Excel", "ParsedData", each fxIngestBranchSheet([Content], [Name])),
#"Removed Binary Cols" = Table.SelectColumns(#"Invoked Custom Ingestion", {"ParsedData"}),
#"Consolidated Staging" = Table.Combine(#"Removed Binary Cols"[ParsedData])`}
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-indigo-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 flex items-center justify-center text-xs">3</span>
                Step 3: Bifurcate into Fact and Quarantine Streams
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Reference the staging query to produce the production fact model and the quarantine log:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto">
                {`// Fact_ConsolidatedSales
Clean_Fact = Table.SelectRows(#"Consolidated Staging", each [GrossTotal] > 0 and [Quantity] > 0 and [GSTIN] <> null)

// Audit_QuarantineLog
Quarantine_Log = Table.SelectRows(#"Consolidated Staging", each [GrossTotal] <= 0 or [Quantity] <= 0 or [GSTIN] = null)`}
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
              Pipeline Diagnostics
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Pipeline Exception</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">System Impact</th>
                  <th className="py-3 px-4">Architectural Resolution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">Excel Lock File Crash</td>
                  <td className="py-3 px-4">A branch user left their file open in Excel, creating a hidden <code className="text-rose-300 font-mono">~$Sales.xlsx</code> lock file.</td>
                  <td className="py-3 px-4">Pipeline crashes with "File is in use by another process".</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Filter out files with <code className="text-cyan-300 font-mono">Text.StartsWith([Name], "~$")</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">Corrupted Workbook File</td>
                  <td className="py-3 px-4">A branch uploaded a half-downloaded or corrupted .xlsx workbook.</td>
                  <td className="py-3 px-4">Halts the entire consolidation run for all other branches.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Wrap workbook parsing in a <code className="text-cyan-300 font-mono">try...otherwise</code> block to isolate bad files.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-300">Formula.Firewall Crash</td>
                  <td className="py-3 px-4">Cross-referencing network folder files with organizational database queries.</td>
                  <td className="py-3 px-4">Fails with privacy level partition boundary error.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Set Privacy Levels to 'Organizational' across all sources in Data Source Settings.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-300">Duplicate Invoices</td>
                  <td className="py-3 px-4">A branch accountant uploaded the same sales batch twice.</td>
                  <td className="py-3 px-4">Distorts corporate revenue totals by doubling sales.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Add an <code className="text-cyan-300 font-mono">Audit_DuplicateCheck</code> query to route duplicate keys to quarantine.</td>
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
              Enterprise Best Practices
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-emerald-300 flex items-center gap-2">
                <span>⚡</span> Tip 1: Clean Numeric Strings with Text.Select
              </div>
              <p className="text-slate-300 leading-relaxed">
                When branches use inconsistent currency symbols (e.g. "Rs. 5,000" vs "$120"), sanitize with <code className="text-emerald-300 font-mono">Number.FromText(Text.Select([Raw], {`{"0".."9", ".", "-"}`}))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-teal-300 flex items-center gap-2">
                <span>⚡</span> Tip 2: Stamp Records with DateTime.LocalNow()
              </div>
              <p className="text-slate-300 leading-relaxed">
                Add an <code className="text-teal-300 font-mono">IngestedAt</code> column to track the exact execution timestamp for every transaction during tax audits.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-indigo-300 flex items-center gap-2">
                <span>⚡</span> Tip 3: Package as Power BI Template (.pbit)
              </div>
              <p className="text-slate-300 leading-relaxed">
                Export the completed pipeline as a <code className="text-indigo-300 font-mono">.pbit</code> file to allow rapid deployment for any new client or retail division.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> Tip 4: Schedule Cloud Refresh at 04:00 AM IST
              </div>
              <p className="text-slate-300 leading-relaxed">
                Configure automated scheduled refresh via On-Premises Data Gateway after all regional branches finish their end-of-day file uploads.
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
              Architectural Analysis
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">💭</span> Question 1: Why does Dual-Stream Quarantine protect both reporting and statutory compliance?
              </h3>
              <p className="leading-relaxed">
                If bad data is deleted, revenue charts look clean, but tax auditors cannot verify missing invoices. How does maintaining a dedicated quarantine table satisfy both management and auditors?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 2: How does extracting metadata from filenames prevent human input error?
              </h3>
              <p className="leading-relaxed">
                Branch staff often mistype dates or branch names inside worksheets. Why is deriving metadata directly from standardized file system names far more reliable?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-indigo-400">💭</span> Question 3: What happens if a branch uploads two separate files on the same day?
              </h3>
              <p className="leading-relaxed">
                How does the pipeline distinguish between a legitimate split batch versus an accidental duplicate submission? How should duplicate key detection be configured?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: FREQUENTLY ASKED QUESTIONS (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 12: Real-World Sales Pipeline Capstone FAQ"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Congratulations on building this real-world consolidation pipeline. You are no longer just an Excel user who sorts columns; you are now an Enterprise Data Architect capable of building automated, fault-tolerant, and audit-compliant data pipelines. Take this blueprint into your corporate career: parameterize everything, buffer wisely, quarantine errors gracefully, and let your automated pipelines do the heavy lifting while you focus on high-level business strategy."
            }
          />
        </div>
      </div>
    </div>
  );
}
