"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/006_004_modern_office_scripts_typescript_and_power_automate_master.xlsx?url";
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

  const handleDownload = () => {
    if (!sampleWorkbookUrl) return;
    const link = document.createElement("a");
    link.href = sampleWorkbookUrl;
    link.download = "office_scripts_power_automate_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      <style>{`
        @keyframes fadeInSlide {
          from { transform: translateY(18px); }
          to { transform: translateY(0); }
        }
        .reveal-section {
          animation: fadeInSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="max-w-5xl mx-auto space-y-10">
        {/* =========================================================================
            SECTION 1: HERO HEADER & OVERVIEW
        ========================================================================= */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              {"🛡️ Error Handling, Console Logging & Debugging"} · Topic 12
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              {"Cloud Debugging & Resilient Engineering"}
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              {"Advanced-Mastery · Bloom Level 5: Synthesize"}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            {"Error handling, logging with `console.log()`, and script debugging best practices"}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            {"Building resilient production-grade Office Scripts: try/catch error trapping, console.log telemetry, inspecting run history in Excel for Web, and graceful cloud failure recovery"}. Master modern cross-platform TypeScript automation, ExcelScript object models, Power Automate cloud orchestration, and serverless enterprise pipelines.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Subject Code:</strong> EXCEL-PRO-901</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Module:</strong> Office Scripts &amp; Power Automate</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Accreditation:</strong> Coder &amp; AccoTax Centre of Excellence</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: FORMULA & SYNTAX ANATOMY CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-300 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 text-base font-mono">⚡</span>
              Office Scripts TypeScript Syntax &amp; Signature Anatomy
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              TypeScript Architecture
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 font-mono text-sm sm:text-base text-sky-300 overflow-x-auto shadow-inner">
            {"Defensive Scripting: try { ... } catch (error) { console.log(`Error: ${error.message}`); return { success: false, error: error.message }; }"}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Component / Signature</th>
                  <th className="py-3 px-4">Role / Scope</th>
                  <th className="py-3 px-4">Requirement</th>
                  <th className="py-3 px-4">Operational Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">function main(workbook, ...)</td>
                  <td className="py-3 px-4 text-teal-400">Entry Point Function</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Required</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">The mandatory root entry point executed by Excel and Power Automate cloud engines.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">ExcelScript Object API</td>
                  <td className="py-3 px-4 text-teal-400">Cloud Object Model</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Contextual</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Synchronous TypeScript API manipulating worksheets, 2D ranges, tables, pivot tables, and styling.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Core Principle: </strong>
              Office Scripts empowers Excel to operate as a modern, serverless cloud computing engine executing automated pipelines 24/7 across the globe.
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL & THEORETICAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">🔬</span>
              Cloud Architecture &amp; TypeScript Engine Mechanics
            </h2>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Under-The-Hood Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div key="0" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">{"1. Structured `try...catch` Blocks"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Intercepts runtime errors (e.g. missing sheet, invalid table name, array index out of range) without crashing the entire cloud flow."}</p>
            </div>
            
            <div key="1" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">{"2. Console Telemetry (`console.log`)"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Logs execution milestones, variable snapshots, and row counts to the Monaco output console and Power Automate run history logs."}</p>
            </div>
            
            <div key="2" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">{"3. Graceful Cloud Status Handshake"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Returns `{ success: false, errorMessage: error.message }` allowing Power Automate to route errors to IT alerts rather than failing catastrophically."}</p>
            </div>
            
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 text-base font-mono">📐</span>
              Visual Dataflow: {"Office Scripts Cloud Error Handling & Telemetry Pipeline: Script Execution → Try/Catch Wrapper → Console Log Stream → Power Automate Status Handshake"}
            </h2>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800">
              Cloud Pipeline
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/80 flex flex-col items-center justify-center overflow-x-auto shadow-inner">
            <svg viewBox="0 0 820 220" className="w-full max-w-4xl h-auto text-slate-200 select-none font-sans">
              <defs>
                <linearGradient id="gradFlowMod18_12" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.8" />
                </linearGradient>
                <marker id="arrowMod18_12" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8" />
                </marker>
              </defs>

              {/* Node 1: Cloud Trigger / Event */}
              <g transform="translate(30, 45)">
                <rect width="210" height="130" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                <rect x="12" y="12" width="186" height="26" rx="6" fill="#1e293b" />
                <text x="105" y="30" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Cloud Trigger / Flow Event</text>
                <text x="105" y="75" textAnchor="middle" fill="#38bdf8" fontSize="14" fontFamily="monospace" fontWeight="bold">Power Automate</text>
                <text x="105" y="100" textAnchor="middle" fill="#64748b" fontSize="10">Forms / Email / Timer</text>
                <text x="105" y="118" textAnchor="middle" fill="#64748b" fontSize="10">24/7 Headless Signal</text>
              </g>

              <path d="M 245 110 L 305 110" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrowMod18_12)" fill="none" />

              {/* Node 2: Office Scripts TypeScript Engine */}
              <g transform="translate(315, 30)">
                <rect width="250" height="160" rx="14" fill="#0c4a6e" stroke="#0284c7" strokeWidth="2" />
                <rect x="14" y="14" width="222" height="28" rx="6" fill="#0369a1" />
                <text x="125" y="33" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Office Scripts TypeScript Engine</text>
                <text x="125" y="75" textAnchor="middle" fill="#7dd3fc" fontSize="13" fontFamily="monospace" fontWeight="bold">{"Cloud Debugging & Resilient Engineering"}</text>
                <text x="125" y="100" textAnchor="middle" fill="#bae6fd" fontSize="10">ExcelScript.Workbook Runtime</text>
                <text x="125" y="120" textAnchor="middle" fill="#bae6fd" fontSize="10">2D Array Ingestion &amp; Formatting</text>
                <text x="125" y="140" textAnchor="middle" fill="#38bdf8" fontSize="9" fontStyle="italic">Native V8 TypeScript Core</text>
              </g>

              <path d="M 570 110 L 630 110" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrowMod18_12)" fill="none" />

              {/* Node 3: Target Output Action */}
              <g transform="translate(640, 45)">
                <rect width="150" height="130" rx="12" fill="#064e3b" stroke="#059669" strokeWidth="2" />
                <rect x="10" y="12" width="130" height="26" rx="6" fill="#047857" />
                <text x="75" y="30" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Cloud Output</text>
                <text x="75" y="75" textAnchor="middle" fill="#6ee7b7" fontSize="14" fontFamily="monospace" fontWeight="bold">Teams / PDF</text>
                <text x="75" y="105" textAnchor="middle" fill="#a7f3d0" fontSize="10">100% Serverless</text>
              </g>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: INTERACTIVE SPREADSHEET & DIRECT DOWNLOAD PORTAL
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">📥</span>
                Interactive Spreadsheet &amp; Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the dataset below live in the browser or download the full module workbook to practice in Microsoft Excel.
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
              <span>Download Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="EX2713"
            title={"Error handling, logging with `console.log()`, and script debugging best practices - Interactive Practice Grid"}
            rowsPerPage={10}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 text-base font-mono">🏢</span>
              Real-World Corporate Implementation Scenarios
            </h2>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800">
              Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div key="0" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{"Case 1 · Chief Technology Architect"}</span>
                <span className="text-xs font-mono text-slate-400">{"Barrackpore HQ"}</span>
              </div>
              <h3 className="font-bold text-white text-base">{"Swadeep Banerjee: Enterprise Cloud Script Fault-Tolerance Suite"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Wraps 25 production financial Office Scripts in standard try/catch wrappers, logging telemetry and returning diagnostic payloads to Power Automate."}</p>
            </div>
            
            <div key="1" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{"Case 2 · Corporate Tax Auditor"}</span>
                <span className="text-xs font-mono text-slate-400">{"Shyamnagar Plant"}</span>
              </div>
              <h3 className="font-bold text-white text-base">{"Tuhina Mukherjee: Missing Column Guard Rails"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Catches missing column errors on uploaded vendor files and returns informative diagnostic messages."}</p>
            </div>
            
            <div key="2" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{"Case 3 · Plant Systems Architect"}</span>
                <span className="text-xs font-mono text-slate-400">{"Ichapur Works"}</span>
              </div>
              <h3 className="font-bold text-white text-base">{"Abhronila Das: Shopfloor Data Validation Trap"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Gracefully traps non-numeric sensor inputs, logging error details to console telemetry."}</p>
            </div>
            
            <div key="3" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{"Case 4 · Logistics Optimization Lead"}</span>
                <span className="text-xs font-mono text-slate-400">{"Naihati Logistics"}</span>
              </div>
              <h3 className="font-bold text-white text-base">{"Debangshu Roy: Cloud Flow Status Handshake"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Returns error codes enabling Power Automate to trigger automated retry policies."}</p>
            </div>
            
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP PRACTICAL CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 text-base font-mono">🛠️</span>
              Step-by-Step Implementation &amp; Execution Guide
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              Execution Protocol
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-emerald-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 flex items-center justify-center text-xs">1</span>
                Step 1: Open Monaco Editor in Excel for Web
              </div>
              <p className="text-slate-300 leading-relaxed">
                Open Excel in browser, click <strong>Automate > New Script</strong> to launch the Monaco Code Editor.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-sky-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-sky-950 border border-sky-700 text-sky-300 flex items-center justify-center text-xs">2</span>
                Step 2: Author TypeScript Logic with Parameters
              </div>
              <p className="text-slate-300 leading-relaxed">
                Write strongly-typed logic: <code className="text-cyan-300 font-mono font-bold">{"Defensive Scripting: try { ... } catch (error) { console.log(`Error: ${error.message}`); return { success: false, error: error.message }; }"}</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-teal-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-teal-950 border border-teal-700 text-teal-300 flex items-center justify-center text-xs">3</span>
                Step 3: Connect to Microsoft Power Automate Flow
              </div>
              <p className="text-slate-300 leading-relaxed">
                In Power Automate, add <strong>Excel Online (Business) > Run script</strong> and pass dynamic flow tokens.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-indigo-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 flex items-center justify-center text-xs">4</span>
                Step 4: Schedule Cloud Triggers &amp; Teams Broadcasts
              </div>
              <p className="text-slate-300 leading-relaxed">
                Set recurrence or email triggers, convert output to PDF, and post Teams alerts autonomously.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: COMMON PITFALLS & TROUBLESHOOTING MATRIX
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 text-base font-mono">⚠️</span>
              Common Pitfalls &amp; Troubleshooting Matrix
            </h2>
            <span className="text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800">
              Diagnostic Fixes
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Problem / Error Signature</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Fix &amp; Prevention</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                
                <tr key="0" className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">{"Silent Error Swallowing in Empty Catch Blocks"}</td>
                  <td className="py-3 px-4">{"Writing `catch (e) {}` with no logging leaves developers completely blind to silent data failures."}</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">{"Always log errors: `console.log(error);` and return a failure object."}</td>
                </tr>
                
                <tr key="1" className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">{"Failing to Check Object Existence Before Calling Methods"}</td>
                  <td className="py-3 px-4">{"Calling `ws.getRange(\"A1\")` when `ws` is `undefined` throws unhandled TypeError."}</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">{"Check existence: `if (!ws) throw new Error(\"Worksheet 'Data' not found\");`."}</td>
                </tr>
                
                <tr key="2" className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">{"Relying on UI Debuggers in Headless Cloud Runs"}</td>
                  <td className="py-3 px-4">{"Expecting visual breakpoints in Power Automate cloud executions."}</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">{"Rely on comprehensive `console.log()` statements for cloud run history analysis."}</td>
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
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 text-base font-mono">💡</span>
              Pro Tips &amp; High-Speed Accelerators
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Productivity
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            
            <div key="0" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> {"Standard Try/Catch Wrapper"}
              </div>
              <p className="text-slate-300 leading-relaxed">{"The bulletproof template for all production Office Scripts."}</p>
              <kbd className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-cyan-300 mt-1">{"try { ... } catch (e) { console.log(e); return { success: false, msg: e.message }; }"}</kbd>
            </div>
            
            <div key="1" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> {"View Run History"}
              </div>
              <p className="text-slate-300 leading-relaxed">{"Inspects previous execution durations and console logs."}</p>
              <kbd className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-cyan-300 mt-1">{"Automate > Script Details > Run History"}</kbd>
            </div>
            
            <div key="2" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> {"Throw Custom Errors"}
              </div>
              <p className="text-slate-300 leading-relaxed">{"Enforces business logic validation rules."}</p>
              <kbd className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-cyan-300 mt-1">{"throw new Error(\"Invalid total\");"}</kbd>
            </div>
            
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC HINTS ("THINK ABOUT...")
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 text-base font-mono">🤔</span>
              Socratic Analytical Hints ("Think About...")
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Critical Thinking
            </span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-300">
            
            <div key="0" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 1: {"Why is empty catch block `catch (e) {}` considered an anti-pattern in cloud spreadsheet automation?"}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Reflect on cloud automation architecture and TypeScript paradigms.
              </p>
            </div>
            
            <div key="1" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 2: {"How do `console.log()` messages help you debug scripts that ran unattended in Power Automate in the middle of the night?"}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Reflect on cloud automation architecture and TypeScript paradigms.
              </p>
            </div>
            
            <div key="2" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 3: {"Why should Office Scripts return `{ success: false, error: msg }` rather than letting unhandled exceptions crash the flow?"}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Reflect on cloud automation architecture and TypeScript paradigms.
              </p>
            </div>
            
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: FREQUENTLY ASKED QUESTIONS (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title={"Error handling, logging with `console.log()`, and script debugging best practices - Frequently Asked Questions"}
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={"Never write a script without `try...catch`! If something goes wrong, log it with `console.log()` and return `{ success: false, error: e.message }`. Power Automate will receive the error message and send you a notification so you can fix it immediately."}
          />
        </div>
      </div>
    </div>
  );
}
