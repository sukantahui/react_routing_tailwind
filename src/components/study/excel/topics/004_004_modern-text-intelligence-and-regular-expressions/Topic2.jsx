"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/regex_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic2() {
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
              ⚡ Pattern Matching & Validation · Topic 2
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Excel 365 / 2024 Native
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 4: Analyze & Validate
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Pattern Matching & Data Validation with REGEXTEST
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Entering unvalidated customer master data—such as corrupt PAN tax IDs, malformed GSTIN registrations, 
            invalid corporate email addresses, or truncated 10-digit mobile numbers—leads to severe compliance penalties 
            and downstream ERP system failures. The <code className="text-purple-300 font-mono font-bold">REGEXTEST</code> function 
            provides a sub-millisecond, boolean pattern-checking engine that validates text at the point of entry, 
            empowers live <strong>Conditional Formatting alerts</strong>, and isolates clean records via 
            <code className="text-emerald-300 font-mono font-bold">FILTER</code> pipelines.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Boolean Validation:</strong> Returns pure TRUE/FALSE</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Statutory Compliance:</strong> Validates PAN, GSTIN & Emails</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Conditional Formatting:</strong> Live red/green data entry auditing</span>
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
              <span className="text-purple-400">⚡</span> Formula Anatomy: =REGEXTEST()
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Pattern: =REGEXTEST(text, pattern, [case_sensitivity])
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-purple-300 space-y-2">
            <span className="text-slate-500">// Boolean Validation Formula Structure</span>
            <div className="mt-1 text-white font-bold">
              =REGEXTEST(<span className="text-sky-300">text</span>, <span className="text-amber-300">pattern</span>, <span className="text-slate-400">[case_sensitivity]</span>)
            </div>
            <div className="mt-2 text-slate-400 text-xs sm:text-sm">
              <span className="text-slate-500">// Example: Validate Indian PAN Tax Code</span> <br />
              <span className="text-emerald-400 font-bold">
                =REGEXTEST(C5, "^[A-Z]{"{5}"}[0-9]{"{4}"}[A-Z]$")
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4">Syntax Role</th>
                  <th className="py-3 px-4">Requirement</th>
                  <th className="py-3 px-4">Execution Behavior</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-300">text</td>
                  <td className="py-3 px-4 text-slate-300">Target Input</td>
                  <td className="py-3 px-4 text-emerald-400">Mandatory</td>
                  <td className="py-3 px-4 font-sans text-slate-300">The cell, text literal, or range to validate. Non-text values are coerced to string.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-300">pattern</td>
                  <td className="py-3 px-4 text-slate-300">Regex Expression</td>
                  <td className="py-3 px-4 text-emerald-400">Mandatory</td>
                  <td className="py-3 px-4 font-sans text-slate-300">The PCRE regular expression string defining the required syntax rule.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-400">[case_sensitivity]</td>
                  <td className="py-3 px-4 text-slate-300">Match Mode</td>
                  <td className="py-3 px-4 text-slate-400">Optional</td>
                  <td className="py-3 px-4 font-sans text-slate-300"><code className="text-emerald-400 font-mono">0</code> = Case-Sensitive (Default), <code className="text-sky-300 font-mono">1</code> = Case-Insensitive.</td>
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
              <span className="text-emerald-400">🔬</span> Enterprise Validation Patterns & Conditional Formatting
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Audit & Governance Engine
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-purple-400">1.</span> Statutory Indian Business Identifiers
              </h3>
              <p className="leading-relaxed">
                Corporate compliance requires strict format adherence:
                <br />
                • <strong>PAN:</strong> <code className="text-emerald-300 font-mono">^[A-Z]{"{5}"}\d{"{4}"}[A-Z]$</code>
                <br />
                • <strong>GSTIN:</strong> <code className="text-emerald-300 font-mono">^\d{"{2}"}[A-Z]{"{5}"}\d{"{4}"}[A-Z]{"{1}"}[1-9A-Z]{"{1}"}Z[0-9A-Z]{"{1}"}$</code>
                <br />
                • <strong>Mobile:</strong> <code className="text-emerald-300 font-mono">^(\+91[\s-]?)?[6-9]\d{"{9}"}$</code>
                <br />
                • <strong>PIN:</strong> <code className="text-emerald-300 font-mono">^[1-9][0-9]{"{5}"}$</code>
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-purple-300">
                100% Compliance with Ministry of Corporate Affairs Standards
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> Live Conditional Formatting Red Alerts
              </h3>
              <p className="leading-relaxed">
                Highlighting corrupt inputs in red as users type prevents bad data from ever entering your database:
                <br />
                Select column <code className="text-sky-300 font-mono">D5:D500</code> &rarr; Conditional Formatting &rarr; New Rule &rarr; Use Formula:
                <br />
                <code className="text-rose-400 font-mono block mt-1">=NOT(REGEXTEST(D5, "^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{"{2,}"}$"))</code>
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Instant Visual Auditing at the Point of Data Entry
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Dynamic Array Record Separation with FILTER
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Instantly split a customer dataset into clean vs corrupted records:
              <br />
              <code className="text-emerald-300 font-mono block mt-2 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm">
                =FILTER(CustomerRoster, REGEXTEST(CHOOSECOLS(CustomerRoster, 3), "^[A-Z]{"{5}"}\d{"{4}"}[A-Z]$"))
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
              <span className="text-purple-400">📐</span> Visual REGEXTEST Validation Pipeline & Decision Tree
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Validation Decision Gate
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Trace how candidate vendor customer records pass or fail the REGEXTEST validation gate:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 330"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Vendor Records (Left) */}
              <rect x="25" y="30" width="220" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="30" width="220" height="34" rx="12" fill="#7E22CE" fillOpacity="0.3" />
              <text x="135" y="52" fill="#F3E8FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CUSTOMER PAN RECORDS</text>

              <g transform="translate(35, 75)">
                <rect width="200" height="32" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="20" fill="#A7F3D0" fontSize="9.5" fontFamily="monospace">1. Swadeep: ABCDE1234F</text>

                <rect y="40" width="200" height="32" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="60" fill="#A7F3D0" fontSize="9.5" fontFamily="monospace">2. Tuhina:  BCDEF5678G</text>

                <rect y="80" width="200" height="32" rx="4" fill="#7F1D1D" stroke="#EF4444" />
                <text x="10" y="100" fill="#FECACA" fontSize="9.5" fontFamily="monospace">3. Corrupt: INVALID_PAN</text>

                <rect y="120" width="200" height="32" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="140" fill="#A7F3D0" fontSize="9.5" fontFamily="monospace">4. Susmita: CDEFG9012H</text>
              </g>

              <rect x="35" y="240" width="200" height="45" rx="6" fill="#1E1B4B" stroke="#6366F1" />
              <text x="135" y="260" fill="#E0E7FF" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Raw Ingestion Stream</text>
              <text x="135" y="275" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Barrackpore Advisory Records</text>

              {/* Arrow */}
              <path d="M 260 165 L 315 165" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="320,165 310,160 310,170" fill="#A855F7" />

              {/* Validation Gate (Center) */}
              <rect x="325" y="30" width="250" height="270" rx="14" fill="#0F172A" stroke="#9333EA" strokeWidth="2" />
              <rect x="325" y="30" width="250" height="34" rx="14" fill="#6B21A8" fillOpacity="0.4" />
              <text x="450" y="52" fill="#FAF5FF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">REGEXTEST VALIDATION GATE</text>

              <g transform="translate(340, 75)">
                <rect width="220" height="48" rx="6" fill="#3B0764" stroke="#A855F7" />
                <text x="110" y="20" fill="#F5D0FE" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">=REGEXTEST(PAN,</text>
                <text x="110" y="36" fill="#A7F3D0" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">"^[A-Z]{"{5}"}\d{"{4}"}[A-Z]$")</text>
              </g>

              <g transform="translate(340, 135)" fontFamily="monospace" fontSize="8.5" fill="#E2E8F0">
                <text x="0" y="15">Row 1: "ABCDE1234F" &rarr; TRUE</text>
                <text x="0" y="35">Row 2: "BCDEF5678G" &rarr; TRUE</text>
                <text x="0" y="55" fill="#F87171">Row 3: "INVALID"    &rarr; FALSE</text>
                <text x="0" y="75">Row 4: "CDEFG9012H" &rarr; TRUE</text>
              </g>

              <text x="450" y="275" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Sub-Millisecond SIMD Evaluation</text>

              {/* Arrow */}
              <path d="M 590 165 L 620 165" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="625,165 615,160 615,170" fill="#10B981" />

              {/* Output Actions (Right) */}
              <rect x="630" y="30" width="195" height="270" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="630" y="30" width="195" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="727" y="50" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">AUDIT ACTION</text>

              <g transform="translate(640, 75)">
                <rect width="175" height="40" rx="4" fill="#064E3B" stroke="#10B981" />
                <text x="10" y="18" fill="#34D399" fontSize="9" fontWeight="bold" fontFamily="sans-serif">TRUE &rarr; PASSED</text>
                <text x="10" y="32" fill="#A7F3D0" fontSize="8" fontFamily="sans-serif">Approved for Tax Filing</text>

                <rect y="48" width="175" height="40" rx="4" fill="#7F1D1D" stroke="#EF4444" />
                <text x="10" y="66" fill="#F87171" fontSize="9" fontWeight="bold" fontFamily="sans-serif">FALSE &rarr; RED ALERT</text>
                <text x="10" y="80" fill="#FECACA" fontSize="8" fontFamily="sans-serif">Highlighted in Red live</text>
              </g>

              <rect x="640" y="235" width="175" height="50" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" />
              <text x="727" y="255" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">100% Pure Data</text>
              <text x="727" y="271" fill="#A7F3D0" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Zero Corrupt Records</text>
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
                Explore the customer master dataset below or download the practice workbook to test <code className="text-purple-300 font-mono">REGEXTEST</code> validation in Microsoft Excel.
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
            sheetName="Topic2_REGEXTEST"
            title="Customer Master Data Validation Roster (Customer ID, Name, PAN, Email, Phone, PIN Code)"
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
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 1 · Tax Audit & Compliance</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Single-Formula Vendor PAN Audit
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Tax Consultant <strong>Swadeep Banerjee</strong> audits 10,000 vendor files with: 
                <code className="text-emerald-300 font-mono">=FILTER(A5:F20, REGEXTEST(C5:C20, "^[A-Z]{"{5}"}\d{"{4}"}[A-Z]$"))</code>. 
                Instantly isolates compliant vendors for statutory TDS deduction.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                FILTER + REGEXTEST: Separates 10,000 records in 12 milliseconds
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · CRM Email Campaign Delivery</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Zero-Bounce Marketing Email Validation
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Marketing Operations Lead <strong>Tuhina Mukherjee</strong> flags malformed email addresses: 
                <code className="text-amber-300 font-mono">=NOT(REGEXTEST(EmailCol, "^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{"{2,}"}$"))</code>, 
                eliminating mail bounce penalties before sending quarterly newsletters.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Pre-Campaign Email Validation: 0% Server Bounce Rate
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · E-Commerce Logistics</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Depot</span>
              </div>
              <h3 className="font-bold text-white text-base">
                PIN Code & Mobile Pre-Dispatch Gate
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Logistics Controller <strong>Abhronila Sengupta</strong> checks shipping waybills: 
                <code className="text-indigo-300 font-mono">=IF(AND(REGEXTEST(PIN, "^[1-9]\d{"{5}"}$"), REGEXTEST(Phone, "^(\+91\s?)?[6-9]\d{"{9}"}$")), "Dispatch", "Hold")</code>, 
                preventing delivery failures.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Dual Condition Pre-Dispatch Gate: Valid PIN + Mobile
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · Statutory GST Invoicing</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                15-Character GSTIN Number Integrity
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Finance Director <strong>Debangshu Ghosh</strong> validates B2B customer GSTINs: 
                <code className="text-amber-300 font-mono">=REGEXTEST(GST, "^\d{"{2}"}[A-Z]{"{5}"}\d{"{4}"}[A-Z]{"{1}"}[1-9A-Z]{"{1}"}Z[0-9A-Z]{"{1}"}$")</code>, 
                guaranteeing 100% ITC tax credit pass-through.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Automated 15-Digit GSTIN Verification in Pure RAM
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
              <span className="text-purple-400">🪜</span> Step-by-Step REGEXTEST Implementation Protocol
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
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Identify Input Column and Validation Target</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Target field: PAN code in cell <code className="text-amber-300 font-mono">C5</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Construct Anchored Pattern</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Pattern: <code className="text-emerald-400 font-mono">"^[A-Z]{"{5}"}[0-9]{"{4}"}[A-Z]$"</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Write Formula in Audit Column</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In cell <code className="text-amber-300 font-mono">G5</code>, write: <code className="text-purple-300 font-mono">=REGEXTEST(C5, "^[A-Z]{"{5}"}[0-9]{"{4}"}[A-Z]$")</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Press Enter & Verify Boolean Evaluation</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Press Enter. Evaluates to <code className="text-emerald-400 font-mono font-bold">TRUE</code> for valid PANs and <code className="text-rose-400 font-mono font-bold">FALSE</code> for corrupted entries!
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
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">False Positive Match</td>
                  <td className="py-3 px-4 text-slate-300">Omitted start/end anchors (<code className="text-amber-300 font-mono">^ $</code>), allowing substring matches to return TRUE.</td>
                  <td className="py-3 px-4 text-slate-400">"XYZABCDE1234F999" incorrectly evaluates to TRUE.</td>
                  <td className="py-3 px-4 text-emerald-400">Enclose pattern in <code className="text-emerald-400 font-mono">^...$</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">#VALUE!</td>
                  <td className="py-3 px-4 text-slate-300">Malformed regex syntax (e.g. unclosed bracket <code className="text-rose-300 font-mono">[A-Z</code>).</td>
                  <td className="py-3 px-4 text-slate-400">Check pattern string for syntax errors.</td>
                  <td className="py-3 px-4 text-emerald-400">Close all brackets, parentheses, and escape metacharacters.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">Case Sensitivity Miss</td>
                  <td className="py-3 px-4 text-slate-300">Input has lowercase characters but pattern used uppercase <code className="text-rose-300 font-mono">[A-Z]</code> without case_sensitivity = 1.</td>
                  <td className="py-3 px-4 text-slate-400">"abcde1234f" returns FALSE.</td>
                  <td className="py-3 px-4 text-emerald-400">Pass <code className="text-emerald-400 font-mono">1</code> as the 3rd argument for case-insensitivity.</td>
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
              Validation Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">SUM(--REGEXTEST)</span>
                <span>Count Valid Records</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Count compliant records: <code className="text-emerald-300 font-mono">=SUM(--REGEXTEST(Range, pattern))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Named LAMBDA Guard</span>
                <span>Corporate Reusability</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Register in Name Manager: <code className="text-sky-300 font-mono">FX_IS_PAN = LAMBDA(p, REGEXTEST(p, "^[A-Z]{"{5}"}\d{"{4}"}[A-Z]$"))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-purple-400 font-mono font-bold">FILTER Integration</span>
                <span>Clean Datasets</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Extract valid rows: <code className="text-purple-300 font-mono">=FILTER(Table, REGEXTEST(Col, pattern))</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-300 text-xs font-mono">F9</kbd>
                <span>Boolean Vector Check</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Highlight =REGEXTEST(Range, pattern) and press <strong>F9</strong> to inspect the spilled boolean array in RAM.
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
                <strong>Reflect on data quality at the door:</strong> Why is implementing live <code className="text-purple-300 font-mono">REGEXTEST</code> validation inside Conditional Formatting rules vastly superior to cleaning data retrospectively after entry?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine statutory risk:</strong> What happens if an organization files GST returns with corrupt 14-character GSTINs, and how does <code className="text-purple-300 font-mono">REGEXTEST</code> prevent this compliance hazard?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider array vectorization:</strong> How does combining <code className="text-purple-300 font-mono">REGEXTEST</code> with <code className="text-emerald-300 font-mono">FILTER</code> allow corporate auditors to partition 50,000 records into clean vs flagged tables in 10 milliseconds?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Pattern Matching & Validation with REGEXTEST — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Never permit unvalidated master data into your enterprise models! Deploy REGEXTEST with strict anchors (^ and $) directly inside data entry templates and Conditional Formatting rules to catch malformed PANs, GSTINs, emails, and phone numbers at the point of entry, protecting your organization from compliance penalties and calculation failures!"
            }
          />
        </div>
      </div>
    </div>
  );
}
