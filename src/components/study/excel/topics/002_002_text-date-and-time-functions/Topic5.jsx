"use client";

import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/002_002_text_date_and_time_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import practicalQuestions from "./topic5_files/topic5_practical_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic5() {
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
    "Date Construction",
    "Component Extraction",
    "Text to Date Parsing",
    "Temporal Arithmetic"
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
              🏢 Business Working Days · Topic 5
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Working Day &amp; Business Calendar Math
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Advanced · Bloom Level 4: Analyze
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Working day calculations: WORKDAY, WORKDAY.INTL, NETWORKDAYS, and NETWORKDAYS.INTL
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Calculating commercial project milestones and net working days excluding weekends and statutory holiday schedules. Master the complete syntax, formulas, operational mechanics, and enterprise data hygiene protocols.
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
              Formula Syntax &amp; Argument Breakdown
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              Function Anatomy
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 font-mono text-sm sm:text-base text-sky-300 overflow-x-auto shadow-inner">
            =WORKDAY(start_date, days, [holidays]) | =WORKDAY.INTL(start_date, days, [weekend], [holidays]) | =NETWORKDAYS(start_date, end_date, [holidays])
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Function</th>
                  <th className="py-3 px-4">Syntax</th>
                  <th className="py-3 px-4">Weekend Default</th>
                  <th className="py-3 px-4">Operational Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">WORKDAY</td>
                  <td className="py-3 px-4 text-cyan-400">=WORKDAY(start, days, [hols])</td>
                  <td className="py-3 px-4 text-teal-400 font-sans">Sat &amp; Sun</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Returns target date N working days before or after start_date.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">WORKDAY.INTL</td>
                  <td className="py-3 px-4 text-cyan-400">=WORKDAY.INTL(start, days, [wknd], [hols])</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Custom Code / Mask</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Calculates target work day with custom weekend codes (e.g., 7 for Fri/Sat, or "0000001" for Sun only).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">NETWORKDAYS</td>
                  <td className="py-3 px-4 text-cyan-400">=NETWORKDAYS(start, end, [hols])</td>
                  <td className="py-3 px-4 text-teal-400 font-sans">Sat &amp; Sun</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Returns integer total of net business days between start_date and end_date.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">NETWORKDAYS.INTL</td>
                  <td className="py-3 px-4 text-cyan-400">=NETWORKDAYS.INTL(start, end, [wknd], [hols])</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Custom Code / Mask</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Returns net business days with customizable weekend definitions and holiday ranges.</td>
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
              Workday Matrix
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Review detailed, concrete input-to-output formula evaluations across corporate project milestone calculations.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Calculation Pattern</th>
                  <th className="py-3 px-4">Input Parameters</th>
                  <th className="py-3 px-4">Excel Formula</th>
                  <th className="py-3 px-4">Evaluated Result</th>
                  <th className="py-3 px-4">Operational Mechanics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Standard WORKDAY</td>
                  <td className="py-3 px-4 text-amber-300">Start=01/05/2024, Days=10</td>
                  <td className="py-3 px-4 text-cyan-300">=WORKDAY(DATE(2024,5,1), 10)</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">15-May-2024</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Adds 10 business days skipping Saturdays &amp; Sundays (May 4, 5, 11, 12).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">WORKDAY with Holidays</td>
                  <td className="py-3 px-4 text-amber-300">Start=01/05/2024, Days=10, H1:H2</td>
                  <td className="py-3 px-4 text-cyan-300">=WORKDAY(DATE(2024,5,1), 10, H1:H2)</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">17-May-2024</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Skips Sat/Sun plus 2 statutory holiday dates listed in range H1:H2.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">WORKDAY.INTL (Fri/Sat Off)</td>
                  <td className="py-3 px-4 text-amber-300">Start=01/05/2024, Days=10, Wknd=7</td>
                  <td className="py-3 px-4 text-cyan-300">=WORKDAY.INTL(DATE(2024,5,1), 10, 7)</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">14-May-2024</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Uses weekend code 7 (Friday &amp; Saturday off) for Middle East project schedules.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">WORKDAY.INTL (Sunday Only)</td>
                  <td className="py-3 px-4 text-amber-300">Start=01/05/2024, Days=10, "0000001"</td>
                  <td className="py-3 px-4 text-cyan-300">=WORKDAY.INTL(DATE(2024,5,1), 10, "0000001")</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">12-May-2024</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Binary string "0000001" sets 6-day work weeks (only Sunday is non-working).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Standard NETWORKDAYS</td>
                  <td className="py-3 px-4 text-amber-300">Start=01/05/2024, End=31/05/2024</td>
                  <td className="py-3 px-4 text-cyan-300">=NETWORKDAYS(DATE(2024,5,1), DATE(2024,5,31))</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">23</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Counts 23 net working days in May 2024 excluding 8 weekend days.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">NETWORKDAYS.INTL</td>
                  <td className="py-3 px-4 text-amber-300">Start=01/05/2024, End=31/05/2024, Hols</td>
                  <td className="py-3 px-4 text-cyan-300">=NETWORKDAYS.INTL(DATE(2024,5,1), DATE(2024,5,31), 1, H1:H2)</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">21</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Counts net working days excluding Sat/Sun and 2 statutory holidays.</td>
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
            sheetName="T05 - Core Date Operations"
            title="Date serial numbering in Excel: DATE, DAY, MONTH, YEAR, and TODAY - Interactive Practice Grid"
            rowsPerPage={10}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 5: 10 DEDICATED PRACTICAL QUESTIONS (STRICTLY PRACTICAL LAB)
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 shadow-2xl space-y-8"
        >
          {/* Header & Badges */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-inner">
                  🎯 Hands-On Practical Lab
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-sky-950/60 border border-sky-800 text-sky-300 text-xs font-mono">
                  10 Real-World Tasks
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 text-lg font-mono">🧪</span>
                10 Practical Questions: Core Date Construction &amp; Component Extraction Lab
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
                Strictly practical enterprise problems testing canonical DATE generation, leap day overflows, YEAR/MONTH/DAY component isolation, DATEVALUE parsing, and fiscal year logic.
              </p>
            </div>

            {/* Quick Action Controls */}
            <div className="flex flex-wrap items-center gap-2 shrink-0 self-start md:self-center">
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
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
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

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-xl font-bold text-amber-400 font-mono">10</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Practical Questions</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-xl font-bold text-sky-400 font-mono">5</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Functions Tested</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-xl font-bold text-emerald-400 font-mono">100%</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Formula Verified</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-xl font-bold text-purple-400 font-mono">3 Tiers</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">Basic → Advanced</div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1">Filter by Skill:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer",
                  activeCategory === cat
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20 scale-[1.02]"
                    : "bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700"
                )}
              >
                {cat}
                {cat === "All" ? ` (${practicalQuestions.length})` : ` (${practicalQuestions.filter((q) => q.category === cat).length})`}
              </button>
            ))}
          </div>

          {/* Practical Questions Accordion List */}
          <div className="space-y-4">
            {filteredQuestions.map((q) => {
              const isExpanded = expandedIds.includes(q.id);
              const isRevealed = revealedSolutions.includes(q.id);
              const isCopied = copiedId === q.id;

              const badgeColors = {
                emerald: "bg-emerald-950/80 border-emerald-700/60 text-emerald-300",
                sky: "bg-sky-950/80 border-sky-700/60 text-sky-300",
                amber: "bg-amber-950/80 border-amber-700/60 text-amber-300",
                rose: "bg-rose-950/80 border-rose-700/60 text-rose-300"
              };

              return (
                <div
                  key={q.id}
                  className="rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-slate-700 transition-all duration-200 overflow-hidden shadow-lg"
                >
                  {/* Card Header Bar */}
                  <div
                    onClick={() => toggleQuestion(q.id)}
                    className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-900/60 transition-colors select-none"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-900 border border-slate-700/80 text-amber-400 font-mono text-xs font-bold shrink-0">
                        #{q.id < 10 ? `0${q.id}` : q.id}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span
                            className={clsx(
                              "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border",
                              badgeColors[q.difficultyColor] || badgeColors.sky
                            )}
                          >
                            {q.difficulty}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700/70 text-cyan-300 font-mono text-[11px] font-semibold">
                            {q.functionUsed}
                          </span>
                          <span className="text-[11px] text-slate-400 hidden md:inline">
                            · {q.category}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                          {q.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-slate-400 hidden sm:inline">
                        {isExpanded ? "Collapse" : "View Question"}
                      </span>
                      <div
                        className={clsx(
                          "w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 text-xs transition-transform duration-200",
                          isExpanded && "rotate-180 text-amber-400"
                        )}
                      >
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* Card Expanded Content */}
                  {isExpanded && (
                    <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-slate-800/80 space-y-5 bg-slate-900/30">
                      {/* Scenario Narrative */}
                      <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/90 space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                          <span>🏢</span> Business Practical Scenario
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          {q.scenario}
                        </p>
                      </div>

                      {/* Source Input Data Reference */}
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                          <span>Source Input Data</span>
                          <span className="text-[11px] text-slate-400 font-normal">
                            Target Formula Cell: <span className="font-mono text-cyan-300 font-bold">{q.targetCell}</span>
                          </span>
                        </div>
                        <div className="font-mono text-xs sm:text-sm text-amber-300 bg-slate-900/90 px-3 py-2 rounded-lg border border-slate-800/80 break-all">
                          {q.inputCell}
                        </div>
                      </div>

                      {/* Solution Area: On-Demand Reveal or Full Solution */}
                      {!isRevealed ? (
                        <div className="p-4 rounded-xl bg-slate-900/80 border border-dashed border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-inner">
                          <div className="space-y-0.5">
                            <div className="text-xs font-bold text-amber-400 flex items-center justify-center sm:justify-start gap-1.5">
                              <span>🎯</span> Solution Hidden for Self-Practice
                            </div>
                            <p className="text-xs text-slate-300">
                              Try writing your formula in <span className="font-mono text-cyan-300 font-semibold">{q.targetCell}</span> first. Click reveal when ready to check your output and mechanics.
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
                        <div className="space-y-5 pt-1">
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

                          {/* Evaluated Output */}
                          <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-950/60 space-y-1">
                            <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center justify-between">
                              <span>Evaluated Output</span>
                              <span className="text-[10px] font-normal text-emerald-400/80">({q.outputType})</span>
                            </div>
                            <div className="font-mono text-xs sm:text-sm text-emerald-300 font-bold bg-slate-900/90 px-3 py-2 rounded-lg border border-emerald-800/40 break-all whitespace-pre-line">
                              {q.evaluatedOutput}
                            </div>
                            <div className="text-[10px] text-slate-400 mt-1">Ground Truth Value Verified ✓</div>
                          </div>

                          {/* Formula Block with Copy Action */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                              <span className="flex items-center gap-1.5 text-cyan-300">
                                <span>💻</span> Production Excel Formula
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopyFormula(q.id, q.formula);
                                }}
                                className={clsx(
                                  "inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-200 cursor-pointer",
                                  isCopied
                                    ? "bg-emerald-600 text-white font-bold shadow-md"
                                    : "bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700"
                                )}
                              >
                                {isCopied ? "✓ Copied!" : "📋 Copy Formula"}
                              </button>
                            </div>

                            <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-950/60 font-mono text-xs sm:text-sm text-cyan-300 shadow-inner overflow-x-auto">
                              {q.formula}
                            </div>

                            {q.alternativeFormula && (
                              <div className="text-xs text-slate-400 font-mono pt-1">
                                <span className="text-slate-400">Alternative Syntax: </span>
                                <code className="text-teal-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                                  {q.alternativeFormula}
                                </code>
                              </div>
                            )}
                          </div>

                          {/* Step-by-Step Logic Breakdown */}
                          <div className="space-y-2">
                            <div className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                              <span>📐</span> Step-by-Step Practical Mechanics
                            </div>
                            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                              {q.stepByStepLogic.map((step, idx) => (
                                <li key={idx} className="flex items-start gap-2.5">
                                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-teal-950 border border-teal-700 text-teal-300 text-[11px] font-bold shrink-0 mt-0.5">
                                    {idx + 1}
                                  </span>
                                  <span className="leading-relaxed">{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Pro-Tip & Corporate Guardrail */}
                          <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-900/50 flex items-start gap-3">
                            <span className="text-purple-400 text-base shrink-0">💡</span>
                            <div className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
                              <strong className="text-purple-300 font-semibold">Enterprise Guardrail: </strong>
                              {q.proTip}
                            </div>
                          </div>
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
            title="Core date construction & extraction: DATE, YEAR, MONTH, DAY, and DATEVALUE - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 7: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[6] = el)} className="reveal-section">
          <Teacher
            note="Never hardcode dates as text strings like '12/05/2024' inside formulas. Always use DATE(2024, 5, 12) to ensure system portability across US/UK regional settings!"
          />
        </div>
      </div>
    </div>
  );
}
