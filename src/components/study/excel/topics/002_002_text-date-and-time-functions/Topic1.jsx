"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/002_002_text_date_and_time_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic1() {
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
    link.download = "text_date_and_time_functions_practice.xlsx";
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
              ✂️ Substring Extraction · Topic 1
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Substring Extraction &amp; Search
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Intermediate · Bloom Level 3: Apply
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Substring extraction: LEFT, RIGHT, MID, LEN, and FIND vs SEARCH
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Parsing structured codes and extracting tokens with positional functions (LEFT, RIGHT, MID, LEN) and delimiter locators (FIND vs SEARCH). Master the complete syntax, formulas, operational mechanics, and enterprise data hygiene protocols.
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
            =LEFT(text, [num_chars]) | =RIGHT(text, [num_chars]) | =MID(text, start_num, num_chars) | =LEN(text) | =FIND(find_text, within_text) | =SEARCH(find_text, within_text)
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Function</th>
                  <th className="py-3 px-4">Syntax</th>
                  <th className="py-3 px-4">Key Characteristic</th>
                  <th className="py-3 px-4">Operational Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">LEFT</td>
                  <td className="py-3 px-4 text-cyan-400">=LEFT(text, [num_chars])</td>
                  <td className="py-3 px-4 text-teal-400">Prefix Slicing</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Extracts N characters starting from the far left of the text string.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">RIGHT</td>
                  <td className="py-3 px-4 text-cyan-400">=RIGHT(text, [num_chars])</td>
                  <td className="py-3 px-4 text-teal-400">Suffix Slicing</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Extracts N characters starting from the far right of the text string.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">MID</td>
                  <td className="py-3 px-4 text-cyan-400">=MID(text, start, len)</td>
                  <td className="py-3 px-4 text-teal-400">Middle Extraction</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Extracts length count characters beginning at specific 1-based start index.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">LEN</td>
                  <td className="py-3 px-4 text-cyan-400">=LEN(text)</td>
                  <td className="py-3 px-4 text-teal-400">String Counter</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Returns total integer character count of text including spaces and symbols.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">FIND vs SEARCH</td>
                  <td className="py-3 px-4 text-cyan-400">=FIND() / =SEARCH()</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Case Sensitivity</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">FIND is case-sensitive (no wildcards); SEARCH is case-insensitive (supports wildcards * and ?).</td>
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
              Extraction Matrix
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Master positional and dynamic substring extraction with exact formula evaluations and real corporate code samples.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Extraction Pattern</th>
                  <th className="py-3 px-4">Input Data (A2)</th>
                  <th className="py-3 px-4">Excel Formula</th>
                  <th className="py-3 px-4">Evaluated Output</th>
                  <th className="py-3 px-4">Operational Mechanics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Prefix Code Slicing</td>
                  <td className="py-3 px-4 text-amber-300">"EMP-2024-9842"</td>
                  <td className="py-3 px-4 text-cyan-300">=LEFT(A2, 3)</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">"EMP"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Extracts first 3 characters representing department code.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Suffix ID Extraction</td>
                  <td className="py-3 px-4 text-amber-300">"EMP-2024-9842"</td>
                  <td className="py-3 px-4 text-cyan-300">=RIGHT(A2, 4)</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">"9842"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Extracts 4 trailing numeric serial digits from right end.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Middle Token Extraction</td>
                  <td className="py-3 px-4 text-amber-300">"EMP-2024-9842"</td>
                  <td className="py-3 px-4 text-cyan-300">=MID(A2, 5, 4)</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">"2024"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Starts at position 5 and extracts 4 characters (joining year).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Character Length Audit</td>
                  <td className="py-3 px-4 text-amber-300">"Barrackpore"</td>
                  <td className="py-3 px-4 text-cyan-300">=LEN(A2)</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">11</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Returns total character count used for dynamic length parsing.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Case-Sensitive Locator</td>
                  <td className="py-3 px-4 text-amber-300">"ACCOTAX Services"</td>
                  <td className="py-3 px-4 text-cyan-300">=FIND("TAX", A2)</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">5</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">FIND is case-sensitive: finds exact uppercase 'TAX' starting at position 5.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Case-Insensitive Search</td>
                  <td className="py-3 px-4 text-amber-300">"ACCOTAX Services"</td>
                  <td className="py-3 px-4 text-cyan-300">=SEARCH("tax", A2)</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">5</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">SEARCH ignores case matching "tax" to "TAX" successfully.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Dynamic First Name</td>
                  <td className="py-3 px-4 text-amber-300">"Swadeep Banerjee"</td>
                  <td className="py-3 px-4 text-cyan-300">=LEFT(A2, FIND(" ", A2) - 1)</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">"Swadeep"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Locates space position (8) and extracts 7 characters before space.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Dynamic Email Domain</td>
                  <td className="py-3 px-4 text-amber-300">"tuhina.das@accotax.in"</td>
                  <td className="py-3 px-4 text-cyan-300">=MID(A2, FIND("@", A2) + 1, LEN(A2))</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">"accotax.in"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Finds '@' location (11) and extracts all subsequent domain characters.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: DEEP CONCEPTUAL & THEORETICAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">🔬</span>
              Engine Mechanics &amp; Evaluation Pipeline
            </h2>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Under-The-Hood Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div key="0" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">1. Positional Index Mechanics</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Excel string indexing is 1-based. MID(text, start_num, num_chars) evaluates character offsets starting at 1.</p>
            </div>
            <div key="1" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">2. Delimiter Position Resolution</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">FIND and SEARCH return integer character offsets of target delimiters. Subtracting 1 yields preceding substring length.</p>
            </div>
            <div key="2" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">3. Case Sensitivity &amp; Wildcards</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">FIND requires exact case matches without wildcards; SEARCH ignores case and allows wildcard operators (? for single char, * for multi-char).</p>
            </div>
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
            sheetName="Substring Extraction"
            title="Substring extraction: LEFT, RIGHT, MID, LEN, and FIND vs SEARCH - Interactive Practice Grid"
            rowsPerPage={10}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: FREQUENTLY ASKED QUESTIONS
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[5] = el)} className="reveal-section">
          <FAQTemplate
            title="Substring extraction: LEFT, RIGHT, MID, LEN, and FIND vs SEARCH - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 7: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[6] = el)} className="reveal-section">
          <Teacher
            note="Dynamic string slicing with LEFT + FIND or MID + SEARCH is the foundational pillar of data cleaning. Master delimiter offsets to extract structured tokens effortlessly!"
          />
        </div>
      </div>
    </div>
  );
}
