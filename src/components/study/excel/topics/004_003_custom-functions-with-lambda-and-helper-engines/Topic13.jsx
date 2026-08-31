"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_003_custom_functions_with_lambda_and_helper_engines_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic13_files/topic13_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic13() {
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
    link.download = "lambda_master_practice.xlsx";
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
              ⚡ Enterprise Library Governance · Topic 13
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 5: Organize & Govern
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Building a Centralized Corporate LAMBDA Function Library
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            In modern financial engineering, allowing individual analysts to write ad-hoc, unverified formulas 
            leads to mathematical inconsistencies, compliance vulnerabilities, and audit failures. 
            A centralized <strong>Corporate LAMBDA Function Library</strong> establishes a unified, version-controlled 
            suite of audited business logic (e.g. <code className="text-amber-300 font-mono">FX_FIN_LOAN_EMI</code>, <code className="text-amber-300 font-mono">FX_TAX_GST_CALC</code>, <code className="text-amber-300 font-mono">FX_HR_BONUS_TIER</code>) 
            shared seamlessly across all enterprise workbooks via Microsoft Garage's <strong>Advanced Formula Environment (AFE)</strong>.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Domain Prefixes:</strong> Standardized naming hierarchy</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>AFE & Git Versioning:</strong> Plain-text declarative modules</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Zero Formula Drift:</strong> Single audited source of truth</span>
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
              <span className="text-purple-400">⚡</span> Corporate Library Naming Architecture
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Pattern: FX_[DOMAIN]_[ACTION]_[ENTITY]
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-purple-300 space-y-2">
            <span className="text-slate-500">// Standardized Corporate Function Declaration</span>
            <div className="mt-1 text-white font-bold">
              <span className="text-amber-300">FX_FIN_LOAN_EMI</span> = <span className="text-purple-300">LAMBDA</span>(<span className="text-sky-300">p</span>, <span className="text-yellow-300">r</span>, <span className="text-cyan-300">n</span>, <span className="text-emerald-300">LET(rate, r/12, p * rate * (1+rate)^n / ((1+rate)^n - 1))</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// IntelliSense Parameter Comment:</span> <br />
              <span className="text-emerald-400 font-bold">
                "Calculates monthly EMI for corporate loans. Params: principal (₹), annual_rate (decimal e.g. 0.085), tenure_months (e.g. 36)"
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Domain Prefix</th>
                  <th className="py-3 px-4">Functional Area</th>
                  <th className="py-3 px-4">Example Functions</th>
                  <th className="py-3 px-4">Governance Objective</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">FX_FIN_</td>
                  <td className="py-3 px-4 text-slate-300">Financial Math & Banking</td>
                  <td className="py-3 px-4 text-purple-300">FX_FIN_LOAN_EMI, FX_FIN_CAGR</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Standardizes loan amortization, yield, and discounted cash flow math.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-300">FX_TAX_</td>
                  <td className="py-3 px-4 text-slate-300">Statutory Tax & Compliance</td>
                  <td className="py-3 px-4 text-purple-300">FX_TAX_GST_CALC, FX_TAX_TDS</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Enforces statutory tax rates and prevents billing non-compliance.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-300">FX_HR_</td>
                  <td className="py-3 px-4 text-slate-300">Payroll & HR Analytics</td>
                  <td className="py-3 px-4 text-purple-300">FX_HR_BONUS_TIER, FX_HR_GRATUITY</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Automates employee appraisal tiering and compensation rules.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-pink-300">FX_STR_</td>
                  <td className="py-3 px-4 text-slate-300">Data Cleansing & ETL</td>
                  <td className="py-3 px-4 text-purple-300">FX_STR_CLEAN_PHONE, FX_STR_TITLE</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Sanitizes CRM records, phone formats, and address strings.</td>
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
              <span className="text-emerald-400">🔬</span> Advanced Formula Environment (AFE) & Git DevOps
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              DevOps for Spreadsheets
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Advanced Formula Environment (AFE)
              </h3>
              <p className="leading-relaxed">
                The official <strong>Advanced Formula Environment</strong> add-in from Microsoft Garage allows engineers to write LAMBDAs in a full-featured code editor with syntax highlighting, inline comments, multi-function authoring, and one-click synchronization to Name Manager.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                Code Editor Interface inside Microsoft Excel
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Git Version Control & Plain-Text Modules
              </h3>
              <p className="leading-relaxed">
                Corporate libraries are saved as plain-text <code className="text-sky-300 font-mono">.txt</code> code modules in Git. 
                Whenever statutory tax rules change, changes are audited via Pull Requests, version-tagged (e.g. <code className="text-amber-300 font-mono">v2.4.0</code>), 
                and synced to company workbooks!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Git Pull Requests & Semantic Versioning for Excel
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> The Pure Function Principle
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every corporate LAMBDA must strictly be a <strong>pure function</strong>: it must never reference hard-coded cell addresses (like <code className="text-rose-400 font-mono">A1</code> or <code className="text-rose-400 font-mono">Sheet1!B5</code>). 
              Operating strictly on passed input parameters guarantees that functions work seamlessly across any worksheet in the enterprise!
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
              <span className="text-purple-400">📐</span> Visual Corporate LAMBDA Library Pipeline Architecture
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Enterprise Ecosystem Architecture
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Examine how centralized corporate function modules flow from Git repositories into Microsoft Excel workbooks:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 330"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Git Repository (Left) */}
              <rect x="25" y="30" width="220" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="30" width="220" height="34" rx="12" fill="#7E22CE" fillOpacity="0.3" />
              <text x="135" y="52" fill="#F3E8FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">GIT CODE REPOSITORY</text>

              <g transform="translate(35, 75)">
                <rect width="200" height="32" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="20" fill="#FDE047" fontSize="9" fontFamily="monospace">📄 Finance.txt (v2.4)</text>

                <rect y="40" width="200" height="32" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="60" fill="#38BDF8" fontSize="9" fontFamily="monospace">📄 Taxation.txt (v3.1)</text>

                <rect y="80" width="200" height="32" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="100" fill="#A7F3D0" fontSize="9" fontFamily="monospace">📄 HR_Payroll.txt (v1.8)</text>

                <rect y="120" width="200" height="32" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="10" y="140" fill="#F472B6" fontSize="9" fontFamily="monospace">📄 StringUtils.txt (v1.2)</text>
              </g>

              <rect x="35" y="245" width="200" height="40" rx="6" fill="#065F46" fillOpacity="0.2" stroke="#10B981" />
              <text x="135" y="268" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Audited & Versioned in Git</text>

              {/* Arrow */}
              <path d="M 260 165 L 315 165" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="320,165 310,160 310,170" fill="#A855F7" />

              {/* AFE Add-in (Center) */}
              <rect x="325" y="30" width="240" height="270" rx="14" fill="#0F172A" stroke="#9333EA" strokeWidth="2" />
              <rect x="325" y="30" width="240" height="34" rx="14" fill="#6B21A8" fillOpacity="0.4" />
              <text x="445" y="52" fill="#FAF5FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ADVANCED FORMULA ENV (AFE)</text>

              <g transform="translate(340, 80)">
                <rect width="210" height="70" rx="6" fill="#3B0764" stroke="#A855F7" />
                <text x="105" y="20" fill="#F5D0FE" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">Sync to Name Manager</text>
                <text x="105" y="38" fill="#A7F3D0" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Auto-registers defined names</text>
                <text x="105" y="54" fill="#FDE047" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Embeds IntelliSense tooltips</text>
              </g>

              <text x="445" y="180" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Name Manager Binding:</text>
              <text x="445" y="200" fill="#F5D0FE" fontSize="9" textAnchor="middle" fontFamily="monospace">FX_FIN_LOAN_EMI</text>
              <text x="445" y="218" fill="#F5D0FE" fontSize="9" textAnchor="middle" fontFamily="monospace">FX_TAX_GST_CALC</text>
              <text x="445" y="236" fill="#F5D0FE" fontSize="9" textAnchor="middle" fontFamily="monospace">FX_HR_BONUS_TIER</text>
              <text x="445" y="265" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Single Audited Truth</text>

              {/* Arrow */}
              <path d="M 580 165 L 610 165" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="615,165 605,160 605,170" fill="#10B981" />

              {/* Enterprise Workbooks (Right) */}
              <rect x="620" y="30" width="205" height="270" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="620" y="30" width="205" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="722" y="50" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ENTERPRISE WORKBOOKS</text>

              <g transform="translate(635, 75)">
                <rect width="175" height="40" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="87" y="18" fill="#A7F3D0" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Corporate Banking Model</text>
                <text x="87" y="32" fill="#FDE047" fontSize="8" textAnchor="middle" fontFamily="monospace">=FX_FIN_LOAN_EMI(...)</text>

                <rect y="48" width="175" height="40" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="87" y="66" fill="#A7F3D0" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Statutory GST Filing Sheet</text>
                <text x="87" y="80" fill="#FDE047" fontSize="8" textAnchor="middle" fontFamily="monospace">=FX_TAX_GST_CALC(...)</text>

                <rect y="96" width="175" height="40" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="87" y="114" fill="#A7F3D0" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Annual HR Appraisal Roster</text>
                <text x="87" y="128" fill="#FDE047" fontSize="8" textAnchor="middle" fontFamily="monospace">=FX_HR_BONUS_TIER(...)</text>
              </g>

              <rect x="635" y="235" width="175" height="50" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" />
              <text x="722" y="255" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">100% Consistent Results</text>
              <text x="722" y="271" fill="#A7F3D0" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Zero Formula Drift</text>
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
                Explore the corporate library function catalog below or download the master workbook to test registered functions in Microsoft Excel.
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
            sheetName="EX1814"
            title="Corporate Function Library Catalog (Function Identifier, Domain, Signature, Description)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · Commercial Banking Group</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Standardizing Loan Amortization Functions
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Chief Risk Officer <strong>Swadeep Banerjee</strong> establishes <code className="text-emerald-300 font-mono">FX_FIN_LOAN_EMI</code> across 12 branch workbooks. 
                Eliminates formula drift, ensuring that all 50 loan officers calculate identical customer repayments.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Standard Function: FX_FIN_LOAN_EMI(p, r, n) deployed across 12 branches
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Statutory GST Billing Engine</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Centralized Statutory Tax Library
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Tax Controller <strong>Tuhina Mukherjee</strong> maintains <code className="text-amber-300 font-mono">FX_TAX_GST_CALC</code> in a Git module. 
                When GST council rates update, modifying the library updates all invoices without editing individual cells!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Single Point of Tax Maintenance: Zero Manual Sheet Re-Work
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Corporate HR Appraisal Suite</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Audited Performance & Bonus Evaluation
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                HR Lead <strong>Abhronila Sengupta</strong> deploys <code className="text-indigo-300 font-mono">FX_HR_BONUS_TIER</code> company-wide, 
                guaranteeing that 2,000 factory employees are appraised under identical, legally audited policy rules.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Audited HR Logic: FX_HR_BONUS_TIER(days, score)
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Master Data Management (MDM)</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Standardized CRM Data Cleansing Pipeline
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Data Architect <strong>Debangshu Ghosh</strong> deploys <code className="text-amber-300 font-mono">FX_STR_CLEAN_PHONE</code> and <code className="text-amber-300 font-mono">FX_STR_PROPER_ADDR</code>, 
                ensuring all marketing sheets format customer records consistently.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Company-Wide Data Uniformity: Clean Phone & Address Strings
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
              <span className="text-purple-400">🪜</span> Step-by-Step Corporate Library Deployment Protocol
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Governance Protocol
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-purple-950 border border-purple-700 text-purple-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Define Domain Prefix & Signature</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Select a standardized prefix: <code className="text-amber-300 font-mono">FX_FIN_LOAN_EMI</code> with parameters <code className="text-sky-300 font-mono">(p, r, n)</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Author Pure Function in AFE or Name Manager</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Write the pure formula without hard-coded cells: <code className="text-emerald-400 font-mono">=LAMBDA(p, r, n, LET(rate, r/12, p * rate * (1+rate)^n / ((1+rate)^n - 1)))</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Embed IntelliSense Parameter Comments</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In Name Manager comments, add parameter descriptions so tooltips assist users during typing.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Distribute via Master Template (.xltx)</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Save as a corporate template. Any new workbook created inherits all registered library functions automatically!
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#NAME?</td>
                  <td className="py-3 px-4 text-slate-300">Custom LAMBDA is missing in target workbook or registered with Worksheet Scope instead of Workbook Scope.</td>
                  <td className="py-3 px-4 text-slate-400">Open Name Manager and verify name exists with Workbook scope.</td>
                  <td className="py-3 px-4 text-emerald-400">Ensure all library names are registered with Scope = Workbook.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Name Collision Error</td>
                  <td className="py-3 px-4 text-slate-300">Attempted to register a name matching a built-in function or cell address (e.g. SUM or C2).</td>
                  <td className="py-3 px-4 text-slate-400">Excel highlights invalid name during registration.</td>
                  <td className="py-3 px-4 text-emerald-400">Enforce domain prefixes like <code className="text-emerald-400 font-mono">FX_FIN_...</code> to avoid reserved names.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">#VALUE! (Type Error)</td>
                  <td className="py-3 px-4 text-slate-300">Analyst passed text into numeric parameters without defensive validation.</td>
                  <td className="py-3 px-4 text-slate-400">Check argument types passed into the formula.</td>
                  <td className="py-3 px-4 text-emerald-400">Embed defensive <code className="text-emerald-400 font-mono">ISNUMBER</code> checks inside library functions.</td>
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
              Governance Best Practices
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">Semantic Versioning</span>
                <span>Compatibility</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tag releases: MAJOR for breaking changes, MINOR for new functions, PATCH for bug fixes.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Graceful Deprecation</span>
                <span>Smooth Upgrades</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Add [DEPRECATED] in comments and wrap new function logic without breaking legacy sheets.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-purple-400 font-mono font-bold">Pure Functions</span>
                <span>Zero Hard-Coded Cells</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ensure library functions depend strictly on passed input variables, never hard-coded cell addresses.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">Ctrl + F3</kbd>
                <span>Global Audit</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Press <strong>Ctrl + F3</strong> to inspect all active defined names and comments across the workbook.
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
                <strong>Reflect on formula drift:</strong> When 50 different analysts write custom tax or loan calculations independently, why does formula drift occur, and how does a centralized corporate library eliminate it?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine namespace hygiene:</strong> Why is adopting strict domain prefixes like <code className="text-purple-300 font-mono">FX_FIN_</code>, <code className="text-sky-300 font-mono">FX_TAX_</code>, and <code className="text-emerald-300 font-mono">FX_HR_</code> essential for long-term workbook maintenance?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider software engineering rigor:</strong> How does maintaining LAMBDA function modules in Git plain-text files bring modern DevOps and code review standards to enterprise spreadsheet modeling?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Corporate LAMBDA Function Library — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Treat your corporate LAMBDAs with the exact same discipline as professional software code! By enforcing standardized prefixes (FX_FIN_, FX_TAX_, FX_HR_), ensuring pure function inputs, writing thorough IntelliSense parameter comments, and maintaining versioned plain-text modules in Git, you protect your enterprise from formula drift and guarantee 100% mathematical integrity across all financial models!"
            }
          />
        </div>
      </div>
    </div>
  );
}
