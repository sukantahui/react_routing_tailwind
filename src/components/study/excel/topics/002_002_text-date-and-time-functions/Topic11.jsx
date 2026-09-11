"use client";

import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/002_002_text_date_and_time_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";
import practicalQuestions from "./topic11_files/topic11_practical_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic11() {
  const sectionsRef = useRef([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedIds, setExpandedIds] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [copiedId, setCopiedId] = useState(null);

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
    link.download = "text_date_and_time_functions_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyFormula = (id, formulaText) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(formulaText);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2200);
    }
  };

  const toggleQuestion = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setExpandedIds(practicalQuestions.map((q) => q.id));
  };

  const collapseAll = () => {
    setExpandedIds([]);
  };

  const categories = [
    "All",
    "Name Standardization",
    "Address Parsing",
    "Phone Standardization",
    "Timestamp ETL",
    "Email Parsing",
    "Dynamic Array ETL",
    "Pipeline Synthesis"
  ];

  const filteredQuestions =
    activeCategory === "All"
      ? practicalQuestions
      : practicalQuestions.filter((q) => q.category === activeCategory);

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
              🏭 Real-World ETL Case Study · Topic 11
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Industrial ETL Case Study
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Advanced · Bloom Level 5: Synthesize
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Real-world case study: Parsing messy customer names, addresses, and timestamps
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Comprehensive end-to-end data cleaning case study: parsing messy customer records, addresses, phone numbers, and corrupted timestamps. Master the complete syntax, formulas, operational mechanics, and enterprise data hygiene protocols.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Subject Code:</strong> EXCEL-PRO-901</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Module:</strong> Text, Date &amp; Time Functions</span>
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
              Multi-Step Pipeline Architecture
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              ETL Architecture
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 font-mono text-sm sm:text-base text-sky-300 overflow-x-auto shadow-inner">
            =TRIM(CLEAN(PROPER(SUBSTITUTE(A2, CHAR(160), " ")))) | =TEXTBEFORE(TEXTAFTER(A2, "("), ")")
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Pipeline Phase</th>
                  <th className="py-3 px-4">Formula Stack</th>
                  <th className="py-3 px-4">Target Defect</th>
                  <th className="py-3 px-4">Operational Transformation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Phase 1: Ingestion &amp; Sanitization</td>
                  <td className="py-3 px-4 text-cyan-400">CLEAN + SUBSTITUTE</td>
                  <td className="py-3 px-4 text-rose-400 font-sans">Control Chars &amp; Web Spaces</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Strips non-printable ASCII 0-31 characters and converts ASCII 160 web non-breaking spaces.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Phase 2: Whitespace &amp; Case</td>
                  <td className="py-3 px-4 text-cyan-400">TRIM + PROPER / UPPER</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Irregular Spacing &amp; Mixed Case</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Condenses inner multi-space gaps and standardizes title case or uppercase tax IDs.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Phase 3: Token Parsing</td>
                  <td className="py-3 px-4 text-cyan-400">TEXTBEFORE / TEXTAFTER</td>
                  <td className="py-3 px-4 text-teal-400 font-sans">Embedded Metadata Tokens</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Extracts phone numbers, PIN codes, or country codes enclosed inside brackets or delimiters.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: PRACTICAL FORMULA EXAMPLES MATRIX
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 text-base font-mono">📊</span>
              Practical Formula Showcase &amp; Real-World Examples
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Case Study Matrix
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Review detailed, concrete input-to-output formula evaluations across real corporate ETL data parsing scenarios.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">ETL Scenario</th>
                  <th className="py-3 px-4">Raw Input String (A2)</th>
                  <th className="py-3 px-4">Excel Formula</th>
                  <th className="py-3 px-4">Evaluated Output</th>
                  <th className="py-3 px-4">Operational Mechanics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Name Sanitization</td>
                  <td className="py-3 px-4 text-amber-300">"  swadeep BANERJEE " &amp; CHAR(13)</td>
                  <td className="py-3 px-4 text-cyan-300">=TRIM(CLEAN(PROPER(A2)))</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">"Swadeep Banerjee"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Full triad cleaning non-printable control chars, excess spaces &amp; title capitalization.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Parenthetical Phone Extract</td>
                  <td className="py-3 px-4 text-amber-300">"Swadeep (+91 9830012345)"</td>
                  <td className="py-3 px-4 text-cyan-300">=TEXTBEFORE(TEXTAFTER(A2, "("), ")")</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">"+91 9830012345"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Extracts country code &amp; phone number enclosed inside parentheses.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Reconstruct Dot Date</td>
                  <td className="py-3 px-4 text-amber-300">"15.05.2024"</td>
                  <td className="py-3 px-4 text-cyan-300">=DATEVALUE(SUBSTITUTE(A2, ".", "-"))</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">45427 (15/05/2024)</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Replaces dot delimiters with hyphens and coerces string to serial date number.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Standardize Tax Code</td>
                  <td className="py-3 px-4 text-amber-300">" gstin19abcde "</td>
                  <td className="py-3 px-4 text-cyan-300">=UPPER(TRIM(A2))</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">"GSTIN19ABCDE"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Strips spaces and capitalizes tax registration code for exact database lookup joins.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Hybrid Date Parser</td>
                  <td className="py-3 px-4 text-amber-300">"2024-05-15"</td>
                  <td className="py-3 px-4 text-cyan-300">=IF(ISNUMBER(A2), A2, DATEVALUE(A2))</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">45427</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Universal hybrid date parser handling cells whether already numeric serials or text strings.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SPREADSHEET & DIRECT DOWNLOAD PORTAL
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
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
            sheetName="T11 - Industrial ETL Pipeline"
            title="Real-world case study: Parsing messy customer names, addresses, and timestamps - Interactive Practice Grid"
            rowsPerPage={10}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 5: 10 STRICTLY PRACTICAL ENTERPRISE QUESTIONS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Interactive Lab
                </span>
                <span className="text-xs text-slate-400 font-mono">10 Enterprise Scenarios</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1.5 flex items-center gap-2">
                <span>⚡</span> Real-World ETL Case Study Practical Questions
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Real-world enterprise problems solved with industrial data sanitization, parsing, address extraction, and timestamp normalization.
              </p>
            </div>

            {/* Expand / Collapse & Download Controls */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-950/40 transition-all duration-150 active:scale-95 cursor-pointer"
                title="Download complete 120-question practice workbook in Microsoft Excel format"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Workbook (.xlsx)</span>
              </button>
              <button
                onClick={expandAll}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              >
                Collapse All
              </button>
              <button
                onClick={revealAllSolutions}
                className="px-3.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>👁️</span> Reveal All Solutions
              </button>
              <button
                onClick={hideAllSolutions}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>🔒</span> Hide All Solutions
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-medium transition-all duration-150",
                  activeCategory === cat
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                    : "bg-slate-800/60 text-slate-400 border border-slate-700/50 hover:bg-slate-800 hover:text-slate-200"
                )}
              >
                {cat}
                {cat === "All" && ` (${practicalQuestions.length})`}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="space-y-4 pt-2">
            {filteredQuestions.map((q) => {
              const isExpanded = expandedIds.includes(q.id);
              const isRevealed = revealedSolutions.includes(q.id);
              const isCopied = copiedId === q.id;

              return (
                <div
                  key={q.id}
                  className="rounded-xl border border-slate-800/80 bg-slate-950/40 overflow-hidden transition-all duration-200 hover:border-slate-700"
                >
                  {/* Accordion Header */}
                  <div
                    onClick={() => toggleQuestion(q.id)}
                    className="flex items-start sm:items-center justify-between gap-3 p-4 cursor-pointer select-none hover:bg-slate-800/30 transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs font-bold shrink-0 mt-0.5 sm:mt-0">
                        Q{q.id}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm sm:text-base font-semibold text-white">
                            {q.title}
                          </h3>
                          <span
                            className={clsx(
                              "px-2 py-0.5 rounded text-[10px] font-semibold border",
                              q.difficulty === "Basic"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                : q.difficulty === "Intermediate"
                                ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                            )}
                          >
                            {q.difficulty}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">
                          Function: <span className="text-emerald-400 font-semibold">{q.functionUsed}</span>
                        </p>
                      </div>
                    </div>

                    <span className="text-slate-400 text-lg shrink-0 mt-0.5 sm:mt-0 font-mono">
                      {isExpanded ? "−" : "+"}
                    </span>
                  </div>

                  {/* Accordion Content */}
                  {isExpanded && (
                    <div className="p-4 pt-1 border-t border-slate-800/60 bg-slate-900/30 space-y-4">
                      {/* Scenario Description */}
                      <div className="rounded-lg bg-slate-900/80 p-3.5 border border-slate-800">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                          Business Scenario
                        </p>
                        <p className="text-sm text-slate-200 leading-relaxed">
                          {q.scenario}
                        </p>
                      </div>

                      {/* Source Input Data Reference */}
                      <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                            Input Cell Reference
                          </p>
                          <p className="text-[11px] text-slate-400 font-normal">
                            Target Formula Cell: <span className="font-mono text-cyan-300 font-bold">{q.targetCell}</span>
                          </p>
                        </div>
                        <code className="text-xs font-mono text-amber-300 block bg-slate-900 px-2.5 py-1.5 rounded border border-slate-800 overflow-x-auto">
                          {q.inputCell}
                        </code>
                      </div>

                      {/* Solution Area: On-Demand Reveal or Full Solution */}
                      {!isRevealed ? (
                        <div className="p-4 rounded-xl bg-slate-900/80 border border-dashed border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-inner">
                          <div className="space-y-0.5">
                            <div className="text-xs font-bold text-amber-400 flex items-center justify-center sm:justify-start gap-1.5">
                              <span>🎯</span> Solution Hidden for Self-Practice
                            </div>
                            <p className="text-xs text-slate-300">
                              Try formulating your solution in cell <span className="font-mono text-cyan-300 font-semibold">{q.targetCell}</span> first. Click reveal when ready to verify.
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleRevealSolution(q.id);
                            }}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md hover:shadow-amber-500/20 transition-all cursor-pointer shrink-0"
                          >
                            <span>👁️</span> Show Solution &amp; Formula
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4 pt-1">
                          {/* Solution Revealed Top Bar */}
                          <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-800/40 px-3.5 py-2 rounded-xl">
                            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                              <span>✓</span> Solution &amp; Verified Mechanics
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleRevealSolution(q.id);
                              }}
                              className="text-[11px] font-semibold text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <span>🔒</span> Hide Solution
                            </button>
                          </div>

                          {/* Formula Box */}
                          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                Production Formula for <span className="text-cyan-300 font-mono font-bold">{q.targetCell}</span>
                              </p>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopyFormula(q.id, q.formula);
                                }}
                                className="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                {isCopied ? "✓ Copied!" : "📋 Copy Formula"}
                              </button>
                            </div>
                            <code className="text-xs font-mono text-cyan-300 block bg-slate-900 px-2.5 py-1.5 rounded border border-slate-800 overflow-x-auto">
                              {q.formula}
                            </code>
                          </div>

                          {/* Evaluated Output */}
                          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                Evaluated Result ({q.outputType})
                              </p>
                              <p className="text-sm font-mono font-bold text-sky-300 mt-0.5">
                                {q.evaluatedOutput}
                              </p>
                            </div>
                            {q.alternativeFormula && (
                              <div className="text-left sm:text-right">
                                <p className="text-[10px] uppercase font-semibold text-slate-500">
                                  Alternative Approach
                                </p>
                                <code className="text-xs font-mono text-slate-300">
                                  {q.alternativeFormula}
                                </code>
                              </div>
                            )}
                          </div>

                          {/* Step-by-Step Logic */}
                          <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                              Calculation Logic &amp; Mechanics
                            </p>
                            <ol className="list-decimal list-inside space-y-1 text-xs text-slate-300 pl-1">
                              {q.stepByStepLogic.map((step, idx) => (
                                <li key={idx} className="leading-relaxed">
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>

                          {/* Pro Tip */}
                          {q.proTip && (
                            <div className="rounded-lg bg-slate-900/60 p-3 border border-slate-800 text-xs text-slate-300">
                              <span className="text-amber-400 font-semibold mr-1">💡 Pro-Tip:</span>
                              {q.proTip}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: FREQUENTLY ASKED QUESTIONS
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[5] = el)} className="reveal-section">
          <FAQTemplate
            title="Real-world case study: Parsing messy customer names, addresses, and timestamps - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 7: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[6] = el)} className="reveal-section">
          <Teacher
            note="Data cleaning isn't a single formula—it's a systematic assembly line. Build modular formulas step by step across temporary columns before consolidating them into production models!"
          />
        </div>
      </div>
    </div>
  );
}
