"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/005_002_advanced_power_query_m_code_scripting_and_custom_functions_master.xlsx?url";
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
    link.download = "m_code_master_practice.xlsx";
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
              ⚡ Enterprise Architecture · Topic 11
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Query Groups &amp; Documentation Standards
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 text-xs font-semibold">
              Bloom's Level 5: Organize &amp; Govern
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent leading-tight">
            Documenting &amp; Organizing Complex Enterprise ETL Query Groups
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            In enterprise production environments, an unorganized Power Query workspace with 50+ flat queries named "Table1" or "Query2" is a catastrophic liability. 
            Professional data engineering demands structured <strong>Query Grouping</strong> (<code className="text-purple-300 font-mono">01_Parameters</code> &rarr; <code className="text-purple-300 font-mono">05_Facts</code>), 
            decoupling intermediate staging queries (<code className="text-purple-300 font-mono">Enable Load = FALSE</code>), 
            and injecting native <strong>UI Metadata Documentation</strong> (<code className="text-cyan-300 font-mono">Value.ReplaceType</code>) 
            to create audit-ready, maintainable enterprise pipelines!
          </p>

          <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Numbered Folder Taxonomy:</strong> Standardized two-digit group structure (01_Parameters to 06_Audits)</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>UI Function Documentation:</strong> Native tooltips and parameter dialogs via <code className="text-indigo-300">Value.ReplaceType</code></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-cyan-400 text-base">✓</span>
              <span><strong>Decoupled Staging:</strong> Reference branching without inflating VertiPaq data model storage</span>
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
              <span className="text-purple-400">⚡</span> Enterprise Metadata Decoration &amp; Folder Taxonomy
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Value.ReplaceType Pattern
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto shadow-inner leading-relaxed space-y-2">
            <div>
              <span className="text-slate-500">// Attaching Rich UI Documentation Metadata to Custom M Functions</span>
              <br />
              <span className="text-purple-400">Value.ReplaceType</span>(
              <br />
              &nbsp;&nbsp;<span className="text-sky-300">(amt as number, taxRate as number) =&gt; amt * (1 + taxRate)</span>,
              <br />
              &nbsp;&nbsp;<span className="text-purple-400">type function</span> (
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-amber-300">amt</span> <span className="text-purple-400">as</span> (<span className="text-purple-400">type number meta</span> [
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-300">Documentation.FieldCaption</span> = <span className="text-emerald-200">"Taxable Base Amount (INR)"</span>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-300">Documentation.SampleValues</span> = &#123;50000&#125;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;]),
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-amber-300">taxRate</span> <span className="text-purple-400">as</span> (<span className="text-purple-400">type number meta</span> [
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-300">Documentation.FieldCaption</span> = <span className="text-emerald-200">"Statutory GST Rate (e.g. 0.18)"</span>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-300">Documentation.SampleValues</span> = &#123;0.18&#125;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;])
              <br />
              &nbsp;&nbsp;) <span className="text-purple-400">as number meta</span> [
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-300">Documentation.Name</span> = <span className="text-emerald-200">"fxCalculateGrossWithGST"</span>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-300">Documentation.Description</span> = <span className="text-emerald-200">"Computes final gross invoice value including Indian GST."</span>,
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-300">Documentation.Author</span> = <span className="text-emerald-200">"Sukanta Hui | Coder &amp; AccoTax"</span>
              <br />
              &nbsp;&nbsp;]
              <br />
              )
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Standard Query Group</th>
                  <th className="py-3 px-4">Prefix Convention</th>
                  <th className="py-3 px-4">Enable Load State</th>
                  <th className="py-3 px-4">Architectural Role &amp; Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-300">01_Parameters</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">p_ (e.g. pServerName)</td>
                  <td className="py-3 px-4 text-slate-400">Disabled (FALSE)</td>
                  <td className="py-3 px-4">Centralizes environment variables, API endpoints, and date partition boundaries.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-indigo-300">02_Custom_Functions</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">fx_ (e.g. fxCleanGSTIN)</td>
                  <td className="py-3 px-4 text-slate-400">Disabled (FALSE)</td>
                  <td className="py-3 px-4">Stores modular, typed, and self-documenting transformation lambdas.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">03_Staging_Queries</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">stg_ (e.g. stg_ERP_Sales)</td>
                  <td className="py-3 px-4 text-slate-400">Disabled (FALSE)</td>
                  <td className="py-3 px-4">Performs heavy ingestion, column pruning, and data cleansing without cluttering the report canvas.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-emerald-300">04_Dimension_Tables</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Dim_ (e.g. Dim_Customer)</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Enabled (TRUE)</td>
                  <td className="py-3 px-4">Loads deduplicated master dimensional lookup tables directly into the data model.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-teal-300">05_Fact_Tables</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Fact_ (e.g. Fact_Sales)</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Enabled (TRUE)</td>
                  <td className="py-3 px-4">Loads curated, high-volume transactional fact marts for visual DAX analytics.</td>
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
              DAG Lineage &amp; Memory Decoupling
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-purple-300 text-base flex items-center gap-2">
                <span>1.</span> Decoupled Staging Architecture
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                In a professional Kimball dimensional model, raw data from ERP, CRM, and files must be cleaned and shaped before splitting into Fact and Dimension tables. 
                By placing ingestion logic in <code className="text-purple-300 font-mono">stg_</code> queries and unchecking <strong>Enable Load</strong>, 
                Power Query executes transformations in memory without storing duplicate copies of the raw data in the final VertiPaq data model.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-indigo-300 text-base flex items-center gap-2">
                <span>2.</span> The "Reference" vs "Duplicate" Principle
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                When branching logic from a staging query, always choose <strong>Reference</strong> instead of <strong>Duplicate</strong>. 
                Reference creates a lightweight child node pointing to the parent query output, guaranteeing a single source of truth. 
                Duplicating clones the full M script into a separate pipeline, multiplying maintenance costs whenever source logic changes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-cyan-300 text-base flex items-center gap-2">
                <span>3.</span> Visual Directed Acyclic Graph (DAG) Inspection
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Power Query provides a built-in topological dependency map via <strong>View &rarr; Query Dependencies</strong>. 
                Architects use this DAG diagram to spot redundant data source connections, identify circular reference bottlenecks, and verify that privacy firewall boundaries are properly aligned.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-emerald-300 text-base flex items-center gap-2">
                <span>4.</span> Step-Level Applied Steps Documentation
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                M scripts can contain complex regular expressions or domain-specific accounting filters. 
                By right-clicking any step and adding a <strong>Step Description</strong>, Power Query embeds an inline info tooltip icon in the Applied Steps list, allowing junior analysts to understand the rationale behind every transformation instantly.
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
              <span className="text-indigo-400">📐</span> Visual ETL Lineage: Enterprise Query Group &amp; Staging Architecture
            </h2>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800">
              DAG Flow Architecture
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 flex flex-col items-center justify-center overflow-x-auto shadow-inner">
            <svg
              viewBox="0 0 880 340"
              className="w-full max-w-4xl h-auto text-slate-200 select-none font-sans"
            >
              <defs>
                <linearGradient id="gradGroup1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6b21a8" />
                  <stop offset="100%" stopColor="#9333ea" />
                </linearGradient>
                <linearGradient id="gradGroup2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0f766e" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
                <linearGradient id="gradModel" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0369a1" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
                <marker
                  id="arrow-purple"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="4"
                  orient="auto"
                >
                  <path d="M 0 0 L 8 4 L 0 8 z" fill="#c084fc" />
                </marker>
                <marker
                  id="arrow-teal"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="4"
                  orient="auto"
                >
                  <path d="M 0 0 L 8 4 L 0 8 z" fill="#2dd4bf" />
                </marker>
              </defs>

              {/* Column 1: 01_Parameters & 02_Functions */}
              <g transform="translate(20, 30)">
                <rect width="180" height="130" rx="12" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
                <rect x="10" y="10" width="160" height="24" rx="6" fill="url(#gradGroup1)" />
                <text x="90" y="26" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">
                  01_Parameters (No Load)
                </text>
                <text x="20" y="58" fill="#e9d5ff" fontSize="10" fontFamily="monospace">pServerName = "SRV-HQ"</text>
                <text x="20" y="80" fill="#e9d5ff" fontSize="10" fontFamily="monospace">pTaxYear = 2026</text>
                <text x="20" y="102" fill="#e9d5ff" fontSize="10" fontFamily="monospace">pBranchCode = "BKP"</text>

                <rect y="150" width="180" height="130" rx="12" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
                <rect x="10" y="160" width="160" height="24" rx="6" fill="url(#gradGroup1)" />
                <text x="90" y="176" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">
                  02_Functions (No Load)
                </text>
                <text x="20" y="208" fill="#e9d5ff" fontSize="10" fontFamily="monospace">fx_CleanGSTIN</text>
                <text x="20" y="230" fill="#e9d5ff" fontSize="10" fontFamily="monospace">fx_FiscalQuarter</text>
                <text x="20" y="252" fill="#e9d5ff" fontSize="10" fontFamily="monospace">fx_ComputeTDS</text>
              </g>

              {/* Arrow Column 1 to Column 2 */}
              <path d="M 205 95 L 265 140" stroke="#c084fc" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#arrow-purple)" fill="none" />
              <path d="M 205 215 L 265 170" stroke="#c084fc" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#arrow-purple)" fill="none" />

              {/* Column 2: 03_Staging Queries */}
              <g transform="translate(275, 45)">
                <rect width="240" height="220" rx="14" fill="#0f172a" stroke="#14b8a6" strokeWidth="2" />
                <rect x="15" y="15" width="210" height="26" rx="6" fill="url(#gradGroup2)" />
                <text x="120" y="32" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
                  03_Staging_Queries (No Load)
                </text>

                <rect x="15" y="55" width="210" height="40" rx="8" fill="#134e4a" opacity="0.6" stroke="#2dd4bf" strokeWidth="1" />
                <text x="25" y="75" fill="#5eead4" fontSize="11" fontFamily="monospace" fontStyle="italic">* stg_ERP_Transactions</text>
                <text x="25" y="88" fill="#99f6e4" fontSize="9">Source &rarr; Filter &rarr; Typecast</text>

                <rect x="15" y="105" width="210" height="40" rx="8" fill="#134e4a" opacity="0.6" stroke="#2dd4bf" strokeWidth="1" />
                <text x="25" y="125" fill="#5eead4" fontSize="11" fontFamily="monospace" fontStyle="italic">* stg_Master_Customers</text>
                <text x="25" y="138" fill="#99f6e4" fontSize="9">Deduplicate &rarr; fx_CleanGSTIN</text>

                <rect x="15" y="155" width="210" height="40" rx="8" fill="#134e4a" opacity="0.6" stroke="#2dd4bf" strokeWidth="1" />
                <text x="25" y="175" fill="#5eead4" fontSize="11" fontFamily="monospace" fontStyle="italic">* stg_Branch_Locations</text>
                <text x="25" y="188" fill="#99f6e4" fontSize="9">Standardize Address Lines</text>
              </g>

              {/* Arrows from Staging to Curated Model */}
              <path d="M 520 75 L 590 75" stroke="#2dd4bf" strokeWidth="3" markerEnd="url(#arrow-teal)" fill="none" />
              <path d="M 520 125 L 590 160" stroke="#2dd4bf" strokeWidth="3" markerEnd="url(#arrow-teal)" fill="none" />
              <path d="M 520 175 L 590 230" stroke="#2dd4bf" strokeWidth="3" markerEnd="url(#arrow-teal)" fill="none" />

              {/* Column 3: 04_Dimensions & 05_Facts (Loaded into Data Model) */}
              <g transform="translate(600, 30)">
                <rect width="250" height="260" rx="14" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
                <rect x="15" y="15" width="220" height="26" rx="6" fill="url(#gradModel)" />
                <text x="125" y="32" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
                  04_Dimensions &amp; 05_Facts
                </text>
                <text x="125" y="48" textAnchor="middle" fill="#bae6fd" fontSize="9">
                  [Enable Load = TRUE &rarr; VertiPaq Model]
                </text>

                {/* Fact Model */}
                <rect x="15" y="60" width="220" height="50" rx="8" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1" />
                <text x="25" y="80" fill="#7dd3fc" fontSize="11" fontFamily="monospace" fontWeight="bold">Fact_SalesTransactions</text>
                <text x="25" y="96" fill="#bae6fd" fontSize="9">Reference: stg_ERP_Transactions</text>

                {/* Dim 1 */}
                <rect x="15" y="120" width="220" height="50" rx="8" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1" />
                <text x="25" y="140" fill="#7dd3fc" fontSize="11" fontFamily="monospace" fontWeight="bold">Dim_CustomerMaster</text>
                <text x="25" y="156" fill="#bae6fd" fontSize="9">Reference: stg_Master_Customers</text>

                {/* Dim 2 */}
                <rect x="15" y="180" width="220" height="50" rx="8" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1" />
                <text x="25" y="200" fill="#7dd3fc" fontSize="11" fontFamily="monospace" fontWeight="bold">Dim_BranchDirectory</text>
                <text x="25" y="216" fill="#bae6fd" fontSize="9">Reference: stg_Branch_Locations</text>
              </g>
            </svg>
          </div>
          <p className="text-xs text-slate-400 text-center italic">
            Figure 11.1: Enterprise query hierarchy DAG. Parameters and custom functions feed into staging queries (italicized, Enable Load = FALSE), which are then referenced by final Fact and Dimension entities loaded into VertiPaq.
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
                Explore the enterprise query organization taxonomy dataset live in the grid below or download the full module workbook to practice in Microsoft Excel.
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
            sheetName="Topic11_Query_Organize_Docs"
            title="Enterprise Query Grouping &amp; Governance Matrix (Query Name, Folder Group, Type, Enable Load, Step Count, Primary Responsibility)"
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
              Enterprise Governance Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Case 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · 65-Query Refactoring Audit</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Standardizing 2-Digit Numbered Groups
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Chief BI Architect <strong>Swadeep Banerjee</strong> prepares the corporate reporting model for an ISO data audit. 
                He restructures 65 ungrouped legacy queries into standard groups: <code className="text-purple-300 font-mono">01_Parameters</code>, <code className="text-purple-300 font-mono">02_Functions</code>, <code className="text-purple-300 font-mono">03_Staging</code>, and <code className="text-purple-300 font-mono">04_DataModel</code>, 
                eliminating 12 redundant duplicate queries.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Numbered Groups &rarr; 100% Audit Compliance &amp; Zero Orphan Queries
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 2 · Parameterized Dev/Prod Migration</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Centralized Server Environment Parameters
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Analyst <strong>Tuhina Mukherjee</strong> centralizes database connection strings via <code className="text-indigo-300 font-mono">pServerName</code> and <code className="text-indigo-300 font-mono">pDatabaseName</code>. 
                Switching the entire 40-table dataset between Development and Production servers now takes a single click in Manage Parameters without touching M code!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                pServerName Switcher &rarr; 1-Click Multi-Environment Deployment
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Case 3 · TDS Custom Function Metadata</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Value.ReplaceType for Tax Calculations
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Tax Specialist <strong>Abhronila Das</strong> authors <code className="text-cyan-300 font-mono">fx_CalculateTDS_194C</code>. 
                Using <code className="text-cyan-300 font-mono">Value.ReplaceType</code>, she equips the function with interactive parameter captions, default 1% and 2% contractor rates, and statutory documentation visible directly in the Power Query UI invoke dialog.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300">
                UI Metadata Dialog &rarr; Zero User Input Errors on TDS Deductions
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 4 · Multi-Branch Staging Decoupling</span>
                <span className="text-xs font-mono text-slate-400">Naihati Logistics</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Reference Branching &amp; Disabled Load
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Data Engineer <strong>Debangshu Roy</strong> builds a pipeline combining branch files from Barrackpore, Naihati, and Titagarh. 
                He creates individual staging queries in <code className="text-emerald-300 font-mono">03_Staging</code> with <code className="text-emerald-300 font-mono">Enable Load = FALSE</code> and references them into a single consolidated <code className="text-emerald-300 font-mono">Fact_ConsolidatedLogistics</code> table.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Enable Load: False &rarr; 60% VertiPaq Model Memory Reduction
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
              <span className="text-sky-400">🛠️</span> Step-by-Step Enterprise Organization Protocol
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              Workflow Guide
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-purple-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-950 border border-purple-700 text-purple-300 flex items-center justify-center text-xs">1</span>
                Step 1: Construct Standard Numbered Query Groups
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Right-click the Queries pane and build the standard 5-folder architecture:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300 overflow-x-auto">
                {`01_Parameters        (Environment connection strings & cutoff dates)
02_Custom_Functions  (Shared typed lambda business calculations)
03_Staging_Queries   (Raw ETL pipelines, Enable Load = FALSE)
04_Dimension_Tables  (Cleaned entity tables, Enable Load = TRUE)
05_Fact_Tables       (Transactional analytic marts, Enable Load = TRUE)`}
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-indigo-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 flex items-center justify-center text-xs">2</span>
                Step 2: Add Applied Step Descriptions &amp; In-Code Banners
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Add descriptive step properties and section banners inside the Advanced Editor:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto">
                {`/* ===================================================
 * Query: Fact_ConsolidatedRevenue
 * Author: Sukanta Hui | Coder & AccoTax
 * Business Owner: Corporate Finance Dept
 * =================================================== */
let
    // --- 1. EXTRACTION & PRUNING ---
    Source = Sql.Database(pServerName, pDatabaseName),
    Fact_Raw = Source{[Schema="dbo", Item="FactSales"]}[Data],
    #"Pruned Columns" = Table.SelectColumns(Fact_Raw, {"InvoiceID", "CustomerID", "Amount"})
    // Description: Prunes 45 unneeded audit columns to optimize RAM
in
    #"Pruned Columns"`}
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-cyan-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 flex items-center justify-center text-xs">3</span>
                Step 3: Verify Lineage in Query Dependencies View
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Navigate to <strong>View &rarr; Query Dependencies</strong>. Confirm that all data sources branch through intermediate staging nodes and terminate cleanly at the final Fact and Dimension entities.
              </p>
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
              Governance Pitfalls
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Governance Anti-Pattern</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Impact on Data Model</th>
                  <th className="py-3 px-4">Remediation Protocol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">Accidental Staging Load</td>
                  <td className="py-3 px-4">Leaving 'Enable Load' checked on intermediate staging queries.</td>
                  <td className="py-3 px-4">Inflates data model size with redundant tables and confuses end users in visual field lists.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Right-click staging query &rarr; Uncheck 'Enable Load'. Name becomes italicized.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">Duplicate Query Proliferation</td>
                  <td className="py-3 px-4">Using 'Duplicate' instead of 'Reference' when branching transformation pipelines.</td>
                  <td className="py-3 px-4">Creates disconnected duplicate pipelines that must be manually updated when logic changes.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Always use 'Reference' to inherit changes dynamically from upstream staging.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-300">Hardcoded Secrets in M</td>
                  <td className="py-3 px-4">Pasting API keys or SQL passwords into M comments or text strings.</td>
                  <td className="py-3 px-4">Severe security vulnerability; .pbix/.xlsx files are unencrypted zip archives.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Use Data Source Settings credentials store or Azure Key Vault secrets.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-300">Circular Dependency Deadlock</td>
                  <td className="py-3 px-4">Query A references Query B while Query B references Query A.</td>
                  <td className="py-3 px-4">Refresh crashes immediately with a circular dependency error.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Inspect <strong>View &rarr; Query Dependencies</strong> and isolate shared base steps into a staging query.</td>
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
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> Tip 1: Two-Digit Folder Numbering
              </div>
              <p className="text-slate-300 leading-relaxed">
                Always prefix groups with <code className="text-purple-300 font-mono">01_</code>, <code className="text-purple-300 font-mono">02_</code>, <code className="text-purple-300 font-mono">03_</code>. This preserves a deterministic, logical processing sequence regardless of alphabetical query names.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-indigo-300 flex items-center gap-2">
                <span>⚡</span> Tip 2: Decorate Custom Functions with Value.ReplaceType
              </div>
              <p className="text-slate-300 leading-relaxed">
                Attaching UI metadata makes your custom functions look and feel like native Microsoft Excel functions, complete with parameter captions and sample values.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-cyan-300 flex items-center gap-2">
                <span>⚡</span> Tip 3: Archive Deprecated Queries in 99_Archive
              </div>
              <p className="text-slate-300 leading-relaxed">
                Never delete a query until production validation is complete. Move old versions into a <code className="text-cyan-300 font-mono">99_Deprecated_Archive</code> group and uncheck 'Enable Load'.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-emerald-300 flex items-center gap-2">
                <span>⚡</span> Tip 4: Document Step Properties for Complex RegEx
              </div>
              <p className="text-slate-300 leading-relaxed">
                Right-click any complex step and enter a description. A tooltip icon will appear beside the step name, serving as live documentation for teammates.
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
                <span className="text-purple-400">💭</span> Question 1: How does unchecking 'Enable Load' protect VertiPaq memory?
              </h3>
              <p className="leading-relaxed">
                When a query has 'Enable Load' enabled, Power BI compresses the entire result set into VertiPaq column stores. Why is storing intermediate staging tables a complete waste of memory?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-indigo-400">💭</span> Question 2: Why does Reference branching enforce the DRY principle?
              </h3>
              <p className="leading-relaxed">
                If 5 downstream queries reference a single staging query, what happens when the upstream ERP schema changes? How does referencing prevent updating 5 separate queries?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400">💭</span> Question 3: What security hazard exists in unencrypted M scripts?
              </h3>
              <p className="leading-relaxed">
                Because Excel .xlsx and Power BI .pbix files can be unzipped by anyone with file access, why must database credentials and API bearer tokens never be hardcoded into M query text?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: FREQUENTLY ASKED QUESTIONS (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 11: Enterprise Query Grouping &amp; Documentation FAQ"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Code that only the author can understand is technical debt in an enterprise. In 27 years of data engineering, I have seen multi-million-dollar BI projects fail simply because queries were unorganized, un-commented, and unmaintainable. Structure your query groups with numeric prefixes, disable load on staging tables, and document every custom function with UI metadata. Write code that your future team members will thank you for."
            }
          />
        </div>
      </div>
    </div>
  );
}
