"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_004_modern_text_intelligence_and_regular_expressions_master.xlsx?url";
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
              ⚡ Capstone Project · Topic 12
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Real-World Enterprise Pipeline
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 6: Design & Govern
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Real-World Project: Building an Automated Enterprise Customer Master Data Validator & Parser
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            In this capstone enterprise project, we synthesize every concept mastered across this module to build an 
            <strong>Institutional-Grade Master Customer Data Governance Pipeline</strong> in Microsoft Excel 365. 
            The system ingests raw customer rosters polluted with HTML noise, formats phones, verifies PAN and GSTIN tax IDs, 
            validates emails, computes live 0-100% compliance scores, generates detailed defect remarks, and dynamically 
            segregates records into <strong>Approved Master</strong> and <strong>Flagged Remediation</strong> views in pure RAM!
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>End-to-End Governance:</strong> Ingest → Clean → Validate → Segregate</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Multi-Field Tax Validation:</strong> Anchored PAN, GSTIN & Email regex</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Dynamic RAM Segregation:</strong> FILTER approved vs flagged tables</span>
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
              <span className="text-purple-400">⚡</span> Master Customer Data Governance Architecture
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Pipeline Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs sm:text-sm">
            {/* 1. Sanitization & Scoring */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-purple-400 font-bold uppercase tracking-wider text-xs">1. Ingestion & Quality Scoring</span>
              <div className="text-white font-bold text-xs">
                =(--REGEXTEST(PAN, "^[A-Z]{"{5}"}\d{"{4}"}[A-Z]$") + --REGEXTEST(GST, "^\d{"{2}"}[A-Z]{"{5}"}\d{"{4}"}[A-Z][1-9A-Z]Z[0-9A-Z]$") + --REGEXTEST(Email, "^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{"{2,}"}$")) / 3
              </div>
              <p className="font-sans text-xs text-slate-400">
                Computes a precise 0.00 to 1.00 data hygiene score for every row.
              </p>
            </div>

            {/* 2. Exception Generation */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-sky-400 font-bold uppercase tracking-wider text-xs">2. Dynamic Exception Remarks</span>
              <div className="text-white font-bold text-xs">
                =TEXTJOIN("; ", TRUE, IF(NOT(ValidPAN), "PAN Invalid", ""), IF(NOT(ValidEmail), "Email Invalid", ""))
              </div>
              <p className="font-sans text-xs text-slate-400">
                Assembles specific defect descriptions dynamically without empty separators.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Governance Layer</th>
                  <th className="py-3 px-4">Formula Engine Used</th>
                  <th className="py-3 px-4">Validation Pattern / Logic</th>
                  <th className="py-3 px-4">Clean Output Output</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-purple-400 font-sans">1. Name Sanitization</td>
                  <td className="py-3 px-4 text-purple-300">PROPER(TRIM(REGEXREPLACE(...)))</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Strip <tags> &amp; collapse spaces</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Standard Proper Case Name</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400 font-sans">2. Tax ID Validation</td>
                  <td className="py-3 px-4 text-sky-300">REGEXTEST(PAN) &amp; REGEXTEST(GST)</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Anchored statutory regex rules</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">TRUE / FALSE Compliance</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">3. Master RAM View</td>
                  <td className="py-3 px-4 text-emerald-300">FILTER(Table, ValidPAN * ValidGST)</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Boolean vector multiplication</td>
                  <td className="py-3 px-4 text-amber-300 font-bold">100% Compliant Master View</td>
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
              <span className="text-emerald-400">🔬</span> Non-Destructive ETL Architecture & Automated KPIs
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Enterprise Governance Mechanics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Non-Destructive ETL Layering
              </h3>
              <p className="leading-relaxed">
                Raw customer submissions in Table 1 are never overwritten. 
                Instead, our transformation layer cleanses, validates, and evaluates records in pure formula memory, 
                preserving an immutable raw audit trail for forensic compliance!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                Raw Ingestion Layer → Cleaned Transformation Layer → Spilled Master Views
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Live Executive Compliance Dashboard in LET
              </h3>
              <p className="leading-relaxed">
                Compute total records, compliant records, defect counts, and enterprise data quality % in a single LET formula:
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                =LET(tot, ROWS(Table), valid, SUM(--(Score=1)), HSTACK(tot, valid, valid/tot))
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> PAN-to-GSTIN Cross-Entity Verification
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Verify whether the customer's standalone PAN matches the entity PAN embedded inside their GSTIN:
              <br />
              <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm">
                =EXACT(PAN_Cell, REGEXEXTRACT(GSTIN_Cell, "[A-Z]{"{5}"}\d{"{4}"}[A-Z]")) → Returns TRUE / FALSE
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
              <span className="text-purple-400">📐</span> Visual Enterprise Master Governance Pipeline
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              End-to-End Governance Flow
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Observe how the automated master data validator transforms messy customer records into an audit-ready master view:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 330"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Raw Ingestion Data (Left) */}
              <rect x="25" y="30" width="220" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="30" width="220" height="34" rx="12" fill="#7E22CE" fillOpacity="0.3" />
              <text x="135" y="52" fill="#F3E8FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1. RAW CUSTOMER INGESTION</text>

              <g transform="translate(35, 75)" fontSize="8.5" fontFamily="monospace">
                <rect width="200" height="32" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="8" y="20" fill="#E2E8F0"><b>swadeep</b> | ABCDE1234F</text>

                <rect y="38" width="200" height="32" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="8" y="58" fill="#E2E8F0">tuhina.m | 19BCDEF5678G1Z2</text>

                <rect y="76" width="200" height="32" rx="4" fill="#7F1D1D" stroke="#EF4444" />
                <text x="8" y="96" fill="#FECACA">corrupt | BAD_PAN | bad@</text>

                <rect y="114" width="200" height="32" rx="4" fill="#1E293B" stroke="#334155" />
                <text x="8" y="134" fill="#E2E8F0">susmita_d | CDEFG9012H</text>
              </g>

              <rect x="35" y="240" width="200" height="45" rx="6" fill="#1E1B4B" stroke="#6366F1" />
              <text x="135" y="260" fill="#E0E7FF" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Unstructured Intake</text>
              <text x="135" y="275" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Barrackpore Hub Ingestion</text>

              {/* Arrow */}
              <path d="M 260 165 L 315 165" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="320,165 310,160 310,170" fill="#A855F7" />

              {/* Automated Validation Machine (Center) */}
              <rect x="325" y="30" width="250" height="270" rx="14" fill="#0F172A" stroke="#9333EA" strokeWidth="2" />
              <rect x="325" y="30" width="250" height="34" rx="14" fill="#6B21A8" fillOpacity="0.4" />
              <text x="450" y="52" fill="#FAF5FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2. AUTOMATED REGEX GOVERNANCE</text>

              <g transform="translate(340, 75)" fontSize="8.5" fontFamily="sans-serif">
                <rect width="220" height="28" rx="4" fill="#3B0764" stroke="#A855F7" />
                <text x="10" y="18" fill="#F5D0FE" fontWeight="bold">PROPER(TRIM(Name)) → Clean</text>

                <rect y="32" width="220" height="28" rx="4" fill="#0369A1" fillOpacity="0.3" stroke="#38BDF8" />
                <text x="10" y="50" fill="#BAE6FD" fontWeight="bold">REGEXTEST(PAN) → ^[A-Z]{"{5}"}\d{"{4}"}[A-Z]$</text>

                <rect y="64" width="220" height="28" rx="4" fill="#065F46" fillOpacity="0.3" stroke="#10B981" />
                <text x="10" y="82" fill="#A7F3D0" fontWeight="bold">REGEXTEST(GST) → State &amp; Entity Valid</text>

                <rect y="96" width="220" height="28" rx="4" fill="#854D0E" fillOpacity="0.3" stroke="#EAB308" />
                <text x="10" y="114" fill="#FEF08A" fontWeight="bold">Score: (PAN + GST + Email) / 3</text>

                <rect y="128" width="220" height="28" rx="4" fill="#7F1D1D" fillOpacity="0.3" stroke="#EF4444" />
                <text x="10" y="146" fill="#FECACA" fontWeight="bold">TEXTJOIN Exception Remarks</text>
              </g>

              <text x="450" y="275" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ 100% In-Memory Determinism</text>

              {/* Arrow */}
              <path d="M 590 165 L 620 165" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="625,165 615,160 615,170" fill="#10B981" />

              {/* Dynamic Spilled Views (Right) */}
              <rect x="630" y="30" width="195" height="270" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="630" y="30" width="195" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="727" y="50" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3. RAM SEPARATION</text>

              <g transform="translate(640, 75)">
                <rect width="175" height="42" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="16" fill="#34D399" fontSize="9" fontWeight="bold" fontFamily="sans-serif">APPROVED MASTER VIEW</text>
                <text x="10" y="32" fill="#A7F3D0" fontSize="8" fontFamily="monospace">Swadeep, Tuhina (100%)</text>

                <rect y="50" width="175" height="42" rx="4" fill="#7F1D1D" stroke="#EF4444" />
                <text x="10" y="66" fill="#F87171" fontSize="9" fontWeight="bold" fontFamily="sans-serif">EXCEPTIONS AUDIT VIEW</text>
                <text x="10" y="82" fill="#FECACA" fontSize="8" fontFamily="monospace">Row 3: PAN &amp; Email Fail</text>
              </g>

              <rect x="640" y="240" width="175" height="45" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" />
              <text x="727" y="260" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">96.8% Master Hygiene</text>
              <text x="727" y="275" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Zero Audit Exceptions</text>
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
                Explore the complete enterprise customer master dataset below or download the practice workbook to test the governance pipeline in Microsoft Excel.
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
            sheetName="EX1913"
            title="Enterprise Customer Master Governance Dataset (Customer ID, Name, PAN, GSTIN, Email, Phone, Quality Score, Status)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · Customer Master Onboarding</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Automated 5-Point Validation Pipeline
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Chief Tax Officer <strong>Swadeep Banerjee</strong> deploys the governance pipeline across 25,000 corporate clients, 
                instantly scoring each profile and automating GSTIN-to-PAN cross-checks with zero manual review!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                Score Formula: =(ValidPAN + ValidGST + ValidEmail + ValidPhone + ValidPIN) / 5
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Remediation Operations</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Dynamic Defect Remarks Generation
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Manager <strong>Tuhina Mukherjee</strong> routes flagged records to field teams: 
                <code className="text-amber-300 font-mono">=TEXTJOIN("; ", TRUE, IF(NOT(ValidPAN), "PAN Invalid", ""), ...)</code>, 
                giving remediation agents exact defect instructions.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Generates: "PAN Invalid; Missing Corporate Email" dynamically
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · ERP Master Clean Views</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                SIMD Dynamic Array Master Segregation
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                ERP Lead <strong>Abhronila Sengupta</strong> feeds billing software: 
                <code className="text-indigo-300 font-mono">=FILTER(CustomerTable, Score=1)</code>, 
                ensuring only 100% compliant accounts enter the automated billing engine.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                FILTER(Table, Score=1) → Zero Risk of Invoicing Errors
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Executive Governance Reporting</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Single-Formula Health KPI Dashboard
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Compliance Officer <strong>Debangshu Ghosh</strong> builds the board report: 
                <code className="text-amber-300 font-mono">=LET(t, ROWS(Master), HSTACK(t, SUM(--(Score=1)), SUM(--(Score=1))/t))</code>, 
                displaying real-time enterprise data hygiene percentage KPIs.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Live Data Hygiene: 96.8% Institutional Governance Index
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
              <span className="text-purple-400">🪜</span> Step-by-Step Customer Master Project Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Ingest Raw Customer Table</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Establish raw input columns: Customer Name, Standalone PAN, GSTIN, Email, and Phone.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Construct Transformation & Sanitization Layer</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Apply <code className="text-emerald-300 font-mono">PROPER(TRIM(REGEXREPLACE(Name, "<[^>]+>", "")))</code> and phone digit sanitization.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Calculate Quality Scores & Dynamic Flags</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Sum boolean <code className="text-purple-300 font-mono">REGEXTEST</code> results, divide by total checks, and generate defect strings with <code className="text-amber-300 font-mono">TEXTJOIN</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Spill Approved Master View via FILTER</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In the master tab, write: <code className="text-purple-300 font-mono">=FILTER(TransformedTable, QualityScore=1)</code>. The clean master spills in pure RAM!
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Unanchored Regex Pass</td>
                  <td className="py-3 px-4 text-slate-300">Wrote <code className="text-rose-300 font-mono">[A-Z]{"{5}"}\d{"{4}"}[A-Z]</code> without <code className="text-rose-300 font-mono">^</code> and <code className="text-rose-300 font-mono">$</code>.</td>
                  <td className="py-3 px-4 text-slate-400">Invalid 12-character strings accidentally pass validation.</td>
                  <td className="py-3 px-4 text-emerald-400">Always anchor regex with <code className="text-emerald-400 font-mono">^...$</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">#SPILL! Error</td>
                  <td className="py-3 px-4 text-slate-300">Master filtered view blocked by existing text or merged cells below.</td>
                  <td className="py-3 px-4 text-slate-400">Check target range for obstructing data.</td>
                  <td className="py-3 px-4 text-emerald-400">Clear cells in the spill footprint.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Score Coercion #VALUE!</td>
                  <td className="py-3 px-4 text-slate-300">Attempted direct addition without unary operators or boolean coercion.</td>
                  <td className="py-3 px-4 text-slate-400">Adding booleans directly in certain nested functions.</td>
                  <td className="py-3 px-4 text-emerald-400">Use double unary: <code className="text-emerald-400 font-mono">--REGEXTEST(...)</code>.</td>
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
              Governance Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">Double Unary --</span>
                <span>Instant Boolean Numeric</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Coerce boolean to 1/0: <code className="text-emerald-300 font-mono">--REGEXTEST(...)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">TEXTJOIN("; ", TRUE)</span>
                <span>Dynamic Defect Concatenator</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ignores empty strings automatically to create clean defect remark summaries.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-purple-400 font-mono font-bold">SORTBY(..., Score, 1)</span>
                <span>Exception Prioritization</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Places low-score flagged records at the top for immediate remediation.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">F9</kbd>
                <span>Pipeline RAM Inspection</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight validation formulas and press <strong>F9</strong> to inspect the spilled table in RAM.
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
                <strong>Reflect on master data governance:</strong> Why is building an automated, formulaic validation pipeline in pure RAM superior to relying on manual data entry audits or static VBA macros?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine cross-field entity coherence:</strong> How does extracting the PAN from the GSTIN using <code className="text-emerald-300 font-mono">EXACT(PAN, REGEXEXTRACT(GSTIN, ...))</code> prevent identity mismatch fraud?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider live executive KPIs:</strong> How does wrapping our quality checks in a single <code className="text-purple-300 font-mono">LET</code> formula provide instant board-level governance dashboards without pivot table refresh delays?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Enterprise Customer Master Project — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Master customer data governance is the hallmark of an ultra-expert spreadsheet architect. By combining PROPER/TRIM sanitization, anchored statutory regex validation (PAN, GSTIN, Email), dynamic exception concatenations (TEXTJOIN), and SIMD dynamic array filtering (FILTER, SORTBY), you transform Microsoft Excel into an institutional data engineering platform running in pure RAM with zero macros!"
            }
          />
        </div>
      </div>
    </div>
  );
}
