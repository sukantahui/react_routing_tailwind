"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/007_002_using_ai_with_excel_for_productivity_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic6() {
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
    link.download = "using_ai_with_excel_practice.xlsx";
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
              {"🧹 AI-Assisted Data Cleaning & Entity Extraction"} · Topic 6
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              {"AI Data Cleaning & Transformation"}
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              {"Advanced-Mastery · Bloom Level 4: Analyze"}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            {"AI-assisted data cleaning: Extracting entities, standardizing messy text, and pattern recognition"}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            {"Automating spreadsheet data cleansing with AI: extracting entities (PIN codes, Phone numbers, PAN/GST numbers), standardizing inconsistent text formats, pattern recognition, and deduplication"}. Master Microsoft Copilot, prompt engineering frameworks, advanced formula generation, LLM REST API connectors, custom AI UDFs, and ethical governance.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Subject Code:</strong> EXCEL-PRO-901</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Module:</strong> Using AI with Excel for Productivity</span>
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
              AI Prompt Standard &amp; Operation Anatomy
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              AI Architecture
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 font-mono text-sm sm:text-base text-sky-300 overflow-x-auto shadow-inner">
            {"Data Cleaning Prompts: 'Extract the 6-digit PIN code from column Address' | 'Standardize customer names to Proper Case and remove extra spaces' | 'Split column Full_Name into First and Last'"}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Component / Prompt Element</th>
                  <th className="py-3 px-4">Role / Scope</th>
                  <th className="py-3 px-4">Requirement</th>
                  <th className="py-3 px-4">Operational Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Cognitive Intent / Prompt</td>
                  <td className="py-3 px-4 text-teal-400">Natural Language Request</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Required</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Precise natural language instruction declaring role, schema anchors, mathematical goal, and constraints.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Synthesized Excel Output</td>
                  <td className="py-3 px-4 text-teal-400">Execution Layer</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Contextual</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Generated LET formula, dynamic array, pivot table, REST API call, or sentiment classification column.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Core Principle: </strong>
              AI does not replace human domain expertise—it amplifies spreadsheet problem solvers, turning multi-hour manual data tasks into 5-second conversational prompts.
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
              Cognitive Reasoning &amp; AI Spreadsheet Engine Mechanics
            </h2>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Under-The-Hood Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div key="0" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">{"1. Cognitive Entity Extraction"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Extracts addresses, dates, tracking numbers, and invoice IDs from messy, unstructured freehand text strings."}</p>
            </div>
            
            <div key="1" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">{"2. Text Standardization & Normalization"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Converts messy text ('pvt ltd', 'PVT. LTD.', 'Private Limited') into standardized corporate naming conventions."}</p>
            </div>
            
            <div key="2" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">{"3. Pattern Learning & Flash Fill Acceleration"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Learns data transformation intent from 1 or 2 examples, writing clean formulas or Flash Fill columns across 50,000 rows."}</p>
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
              Visual Dataflow: {"AI Data Cleansing Pipeline: Messy Text String → AI Pattern Recognizer → Clean Structured Columns (Flash Fill / AI Formulas)"}
            </h2>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800">
              AI Pipeline
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/80 flex flex-col items-center justify-center overflow-x-auto shadow-inner">
            <svg viewBox="0 0 820 220" className="w-full max-w-4xl h-auto text-slate-200 select-none font-sans">
              <defs>
                <linearGradient id="gradFlowMod20_6" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.8" />
                </linearGradient>
                <marker id="arrowMod20_6" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8" />
                </marker>
              </defs>

              {/* Node 1: User Natural Language Prompt */}
              <g transform="translate(30, 45)">
                <rect width="210" height="130" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                <rect x="12" y="12" width="186" height="26" rx="6" fill="#1e293b" />
                <text x="105" y="30" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Natural Language Prompt</text>
                <text x="105" y="75" textAnchor="middle" fill="#38bdf8" fontSize="14" fontFamily="monospace" fontWeight="bold">Copilot / AI Prompt</text>
                <text x="105" y="100" textAnchor="middle" fill="#64748b" fontSize="10">Schema Anchored Context</text>
                <text x="105" y="118" textAnchor="middle" fill="#64748b" fontSize="10">Business Intent Description</text>
              </g>

              <path d="M 245 110 L 305 110" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrowMod20_6)" fill="none" />

              {/* Node 2: Copilot / LLM Reasoning Engine */}
              <g transform="translate(315, 30)">
                <rect width="250" height="160" rx="14" fill="#0c4a6e" stroke="#0284c7" strokeWidth="2" />
                <rect x="14" y="14" width="222" height="28" rx="6" fill="#0369a1" />
                <text x="125" y="33" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Copilot / LLM Cognitive Engine</text>
                <text x="125" y="75" textAnchor="middle" fill="#7dd3fc" fontSize="13" fontFamily="monospace" fontWeight="bold">{"AI Data Cleaning & Transformation"}</text>
                <text x="125" y="100" textAnchor="middle" fill="#bae6fd" fontSize="10">Microsoft Graph &amp; Schema Grounding</text>
                <text x="125" y="120" textAnchor="middle" fill="#bae6fd" fontSize="10">Zero Data Retention Security</text>
                <text x="125" y="140" textAnchor="middle" fill="#38bdf8" fontSize="9" fontStyle="italic">GPT-4 / Claude / Copilot Core</text>
              </g>

              <path d="M 570 110 L 630 110" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrowMod20_6)" fill="none" />

              {/* Node 3: Synthesized Excel Output */}
              <g transform="translate(640, 45)">
                <rect width="150" height="130" rx="12" fill="#064e3b" stroke="#059669" strokeWidth="2" />
                <rect x="10" y="12" width="130" height="26" rx="6" fill="#047857" />
                <text x="75" y="30" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Excel Output</text>
                <text x="75" y="75" textAnchor="middle" fill="#6ee7b7" fontSize="14" fontFamily="monospace" fontWeight="bold">Formula / Chart</text>
                <text x="75" y="105" textAnchor="middle" fill="#a7f3d0" fontSize="10">Audit &amp; Verify</text>
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
            sheetName="EX2907"
            title={"AI-assisted data cleaning: Extracting entities, standardizing messy text, and pattern recognition - Interactive Practice Grid"}
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
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{"Case 1 · VP Commercial Operations"}</span>
                <span className="text-xs font-mono text-slate-400">{"Barrackpore HQ"}</span>
              </div>
              <h3 className="font-bold text-white text-base">{"Swadeep Banerjee: Standardizing 20,000 Customer Account Names"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Uses AI prompts to clean 20,000 messy client strings, removing legal suffixes and standardizing corporate capitalization."}</p>
            </div>
            
            <div key="1" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{"Case 2 · Corporate Tax Auditor"}</span>
                <span className="text-xs font-mono text-slate-400">{"Shyamnagar Plant"}</span>
              </div>
              <h3 className="font-bold text-white text-base">{"Tuhina Mukherjee: Extracting GSTINs and Invoice Dates from Voucher Narratives"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Extracts 15-character GST numbers and invoice dates from messy bank narrative text strings."}</p>
            </div>
            
            <div key="2" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{"Case 3 · Plant Systems Architect"}</span>
                <span className="text-xs font-mono text-slate-400">{"Ichapur Works"}</span>
              </div>
              <h3 className="font-bold text-white text-base">{"Abhronila Das: Shopfloor Machine Error Code Extraction"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Extracts standard ISO error codes from operator maintenance freehand text logs."}</p>
            </div>
            
            <div key="3" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{"Case 4 · Logistics Optimization Lead"}</span>
                <span className="text-xs font-mono text-slate-400">{"Naihati Logistics"}</span>
              </div>
              <h3 className="font-bold text-white text-base">{"Debangshu Roy: Address Parsing & Postal Code Extraction"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Splits unformatted shipping addresses into City, State, and 6-digit PIN code columns."}</p>
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
                Step 1: Format Dataset as Structured Table (Ctrl + T)
              </div>
              <p className="text-slate-300 leading-relaxed">
                Highlight dataset and press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-xs text-sky-300">Ctrl + T</kbd> to enable AI schema grounding.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-sky-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-sky-950 border border-sky-700 text-sky-300 flex items-center justify-center text-xs">2</span>
                Step 2: Construct Structured Natural Language Prompt
              </div>
              <p className="text-slate-300 leading-relaxed">
                Formulate prompt with bracketed columns: <code className="text-cyan-300 font-mono font-bold">{"Data Cleaning Prompts: 'Extract the 6-digit PIN code from column Address' | 'Standardize customer names to Proper Case and remove extra spaces' | 'Split column Full_Name into First and Last'"}</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-teal-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-teal-950 border border-teal-700 text-teal-300 flex items-center justify-center text-xs">3</span>
                Step 3: Preview Ghost Column / Chart Output
              </div>
              <p className="text-slate-300 leading-relaxed">
                Inspect AI generated preview card before clicking <strong>Insert Column</strong> or <strong>Add to Grid</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-indigo-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 flex items-center justify-center text-xs">4</span>
                Step 4: Audit &amp; Verify Calculation Logic (Alt + M + V)
              </div>
              <p className="text-slate-300 leading-relaxed">
                Step through generated formulas with <kbd className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-xs text-sky-300">Alt + M + V</kbd> to verify mathematical accuracy.
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
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">{"Edge-Case Pattern Inconsistencies (Missing PIN Codes)"}</td>
                  <td className="py-3 px-4">{"AI entity extraction failing on rows where addresses lack PIN codes."}</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">{"Include prompt condition: 'If PIN code is missing, return blank; wrap in IFERROR'."}</td>
                </tr>
                
                <tr key="1" className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">{"Over-Aggressive Text Replacement"}</td>
                  <td className="py-3 px-4">{"Standardizing 'St.' to 'Street' accidentally converting 'St. Xavier's' to 'Street Xavier's'."}</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">{"Inspect cleaned results across positive and negative sample cases."}</td>
                </tr>
                
                <tr key="2" className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">{"Slow Execution When Calling Cloud AI on 1 Million Rows"}</td>
                  <td className="py-3 px-4">{"Calling cloud LLMs row-by-row on massive datasets."}</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">{"Have AI generate a single vectorized Excel formula (`REGEXEXTRACT` / `TEXTSPLIT`) that runs instantly on client."}</td>
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
                <span>⚡</span> {"Extract Formula Standard"}
              </div>
              <p className="text-slate-300 leading-relaxed">{"Generates reusable formulas that run instantly."}</p>
              <kbd className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-cyan-300 mt-1">{"Prompt: 'Write an Excel formula to extract...'"}</kbd>
            </div>
            
            <div key="1" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> {"Pattern Examples"}
              </div>
              <p className="text-slate-300 leading-relaxed">{"Dramatically improves extraction accuracy."}</p>
              <kbd className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-cyan-300 mt-1">{"Provide 2 before/after examples in prompt"}</kbd>
            </div>
            
            <div key="2" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> {"Proper Case Standard"}
              </div>
              <p className="text-slate-300 leading-relaxed">{"Instantly cleans messy human data entry."}</p>
              <kbd className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-cyan-300 mt-1">{"Prompt: 'Format as Proper Case with single spaces'"}</kbd>
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
                <span className="text-teal-400">💭</span> Question 1: {"Why is asking AI to generate a formula (like `TEXTAFTER` or `REGEXEXTRACT`) superior to manual copy-pasting for data cleaning?"}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Reflect on generative AI mechanics, prompt engineering structure, and auditing standards.
              </p>
            </div>
            
            <div key="1" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 2: {"How do before/after examples in your prompt help AI understand complex entity extraction rules?"}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Reflect on generative AI mechanics, prompt engineering structure, and auditing standards.
              </p>
            </div>
            
            <div key="2" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 3: {"How can AI standardize inconsistent corporate vendor names across thousands of transaction records?"}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Reflect on generative AI mechanics, prompt engineering structure, and auditing standards.
              </p>
            </div>
            
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: FREQUENTLY ASKED QUESTIONS (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title={"AI-assisted data cleaning: Extracting entities, standardizing messy text, and pattern recognition - Frequently Asked Questions"}
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={"Cleaning dirty data is 80% of spreadsheet work. Don't clean it by hand! Tell Copilot: 'Extract the 6-digit PIN code from the address column into a new column'. It will write the formula and clean 10,000 rows in 2 seconds."}
          />
        </div>
      </div>
    </div>
  );
}
