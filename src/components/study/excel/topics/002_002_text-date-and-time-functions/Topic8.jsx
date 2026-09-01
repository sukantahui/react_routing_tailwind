"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/002_002_text_date_and_time_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic8() {
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
              ⚡ Modern Text Extraction (Excel 365) · Topic 8
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Next-Gen Dynamic Array Text
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Advanced · Bloom Level 4: Analyze
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Modern text manipulation: TEXTBEFORE, TEXTAFTER, and TEXTSPLIT
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Next-gen text manipulation eliminating complex LEFT/MID/FIND formulas using modern dynamic array functions (TEXTBEFORE, TEXTAFTER, TEXTSPLIT). Master the complete syntax, formulas, operational mechanics, and enterprise data hygiene protocols.
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
            =TEXTBEFORE(text, delimiter, [instance_num]) | =TEXTAFTER(text, delimiter, [instance_num]) | =TEXTSPLIT(text, col_delimiter, [row_delimiter])
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Function</th>
                  <th className="py-3 px-4">Syntax</th>
                  <th className="py-3 px-4">Spill Capability</th>
                  <th className="py-3 px-4">Operational Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">TEXTBEFORE</td>
                  <td className="py-3 px-4 text-cyan-400">=TEXTBEFORE(text, delim, [inst])</td>
                  <td className="py-3 px-4 text-teal-400 font-sans">Single / Array</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Extracts substring occurring prior to specified delimiter (replaces LEFT + FIND).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">TEXTAFTER</td>
                  <td className="py-3 px-4 text-cyan-400">=TEXTAFTER(text, delim, [inst])</td>
                  <td className="py-3 px-4 text-teal-400 font-sans">Single / Array</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Extracts substring occurring after specified delimiter (replaces MID + FIND).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">TEXTSPLIT</td>
                  <td className="py-3 px-4 text-cyan-400">=TEXTSPLIT(text, col_delim, [row_delim])</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans">Dynamic Dynamic Spill</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Splits text into array across columns or rows using column/row delimiters (replaces Text-to-Columns).</td>
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
              Modern Extraction Matrix
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Review detailed, concrete input-to-output formula evaluations using modern Excel 365 text parsing functions.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Pattern / Goal</th>
                  <th className="py-3 px-4">Raw Input String (A2)</th>
                  <th className="py-3 px-4">Excel Formula</th>
                  <th className="py-3 px-4">Evaluated Output</th>
                  <th className="py-3 px-4">Operational Mechanics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Extract Username</td>
                  <td className="py-3 px-4 text-amber-300">"John.Doe@accotax.in"</td>
                  <td className="py-3 px-4 text-cyan-300">=TEXTBEFORE(A2, "@")</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">"John.Doe"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Extracts all text occurring before the `@` symbol.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Extract Domain</td>
                  <td className="py-3 px-4 text-amber-300">"John.Doe@accotax.in"</td>
                  <td className="py-3 px-4 text-cyan-300">=TEXTAFTER(A2, "@")</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">"accotax.in"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Extracts all text occurring after the `@` symbol.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">2nd Instance Match</td>
                  <td className="py-3 px-4 text-amber-300">"INV-2024-9842-FINAL"</td>
                  <td className="py-3 px-4 text-cyan-300">=TEXTBEFORE(A2, "-", 2)</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">"INV-2024"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Extracts substring prior to 2nd hyphen occurrence.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Reverse Last Match</td>
                  <td className="py-3 px-4 text-amber-300">"C:/Docs/Reports/Q4.pdf"</td>
                  <td className="py-3 px-4 text-cyan-300">=TEXTAFTER(A2, "/", -1)</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">"Q4.pdf"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Negative index -1 searches backwards to find last forward slash.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Split to Columns</td>
                  <td className="py-3 px-4 text-amber-300">"Red,Green,Blue"</td>
                  <td className="py-3 px-4 text-cyan-300">=TEXTSPLIT(A2, ",")</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">["Red", "Green", "Blue"]</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Splits comma-separated string horizontally into 3 adjacent column cells.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Split to Rows</td>
                  <td className="py-3 px-4 text-amber-300">"Red;Green;Blue"</td>
                  <td className="py-3 px-4 text-cyan-300">=TEXTSPLIT(A2, , ";")</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">["Red"; "Green"; "Blue"]</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Omits column delimiter and uses row delimiter to spill text vertically.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Multi-Delimiter Array</td>
                  <td className="py-3 px-4 text-amber-300">"Apple;Banana|Cherry"</td>
                  <td className="py-3 px-4 text-cyan-300">=TEXTSPLIT(A2, {";","|"})</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">["Apple", "Banana", "Cherry"]</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Passes array constant of delimiters to parse complex mixed-delimiter strings.</td>
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
            sheetName="Modern Text Manipulation"
            title="Modern text manipulation: TEXTBEFORE, TEXTAFTER, and TEXTSPLIT - Interactive Practice Grid"
            rowsPerPage={10}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 5: FREQUENTLY ASKED QUESTIONS
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[4] = el)} className="reveal-section">
          <FAQTemplate
            title="Modern text manipulation: TEXTBEFORE, TEXTAFTER, and TEXTSPLIT - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 6: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[5] = el)} className="reveal-section">
          <Teacher
            note="TEXTBEFORE, TEXTAFTER, and TEXTSPLIT completely eliminate complex nested LEFT/MID/FIND formulas in modern Excel 365. Use instance_num = -1 to extract file names from full URL paths instantly!"
          />
        </div>
      </div>
    </div>
  );
}
