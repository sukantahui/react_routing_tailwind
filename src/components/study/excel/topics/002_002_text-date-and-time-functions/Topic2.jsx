"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/002_002_text_date_and_time_functions_master.xlsx?url";
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
              🔗 TEXTJOIN &amp; Concatenation · Topic 2
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Concatenation &amp; Delimited Joining
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Intermediate · Bloom Level 3: Apply
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Concatenation strategies: CONCAT, TEXTJOIN with custom delimiters, and the &amp; operator
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Assembling composite strings, multi-line addresses, and delimited list aggregation with TEXTJOIN, CONCAT, and the &amp; operator. Master the complete syntax, formulas, operational mechanics, and enterprise data hygiene protocols.
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
            =TEXTJOIN(delimiter, ignore_empty, text1, [text2], ...) | =CONCAT(text1, [text2], ...) | =text1 &amp; text2
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Method / Function</th>
                  <th className="py-3 px-4">Syntax</th>
                  <th className="py-3 px-4">Ignore Blanks</th>
                  <th className="py-3 px-4">Operational Capability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Ampersand (&amp;)</td>
                  <td className="py-3 px-4 text-cyan-400">=A2 &amp; " " &amp; B2</td>
                  <td className="py-3 px-4 text-rose-400 font-sans">No</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Direct string operator joining individual cells or string literals.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">CONCAT</td>
                  <td className="py-3 px-4 text-cyan-400">=CONCAT(A2:C2)</td>
                  <td className="py-3 px-4 text-rose-400 font-sans">No</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Modern replacement for CONCATENATE; accepts cell ranges without custom delimiters.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">TEXTJOIN</td>
                  <td className="py-3 px-4 text-cyan-400">=TEXTJOIN(",", TRUE, A2:E2)</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans">Yes (Optional)</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Joins ranges using a custom delimiter and automatically skips empty cells when ignore_empty = TRUE.</td>
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
              Joining Matrix
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Review detailed, concrete input-to-output formula evaluations across real corporate string joining scenarios.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Pattern / Method</th>
                  <th className="py-3 px-4">Raw Input Cells</th>
                  <th className="py-3 px-4">Excel Formula</th>
                  <th className="py-3 px-4">Evaluated Output</th>
                  <th className="py-3 px-4">Operational Mechanics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Ampersand Join</td>
                  <td className="py-3 px-4 text-amber-300">A2="Swadeep", B2="Banerjee"</td>
                  <td className="py-3 px-4 text-cyan-300">=A2 &amp; " " &amp; B2</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">"Swadeep Banerjee"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Joins first and last names with a literal space character.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Range CONCAT</td>
                  <td className="py-3 px-4 text-amber-300">A2="INV", B2=2024, C2=101</td>
                  <td className="py-3 px-4 text-cyan-300">=CONCAT(A2, "-", B2, "-", C2)</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">"INV-2024-101"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Concatenates text and numeric cells into structured invoice key.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Delimited TEXTJOIN</td>
                  <td className="py-3 px-4 text-amber-300">A2="Kolkata", B2="", C2="700120"</td>
                  <td className="py-3 px-4 text-cyan-300">=TEXTJOIN(", ", TRUE, A2:C2)</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">"Kolkata, 700120"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Joins values with comma space, automatically ignoring empty cell B2.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Multi-Line Block</td>
                  <td className="py-3 px-4 text-amber-300">A2="Block A", B2="Barrackpore"</td>
                  <td className="py-3 px-4 text-cyan-300">=TEXTJOIN(CHAR(10), TRUE, A2, B2)</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">"Block A\nBarrackpore"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Uses CHAR(10) line break delimiter to create multi-line address cells.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Global SUBSTITUTE</td>
                  <td className="py-3 px-4 text-amber-300">A2="123-456-7890"</td>
                  <td className="py-3 px-4 text-cyan-300">=SUBSTITUTE(A2, "-", "")</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">"1234567890"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Strips all hyphens from telephone number string.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Instance SUBSTITUTE</td>
                  <td className="py-3 px-4 text-amber-300">A2="cat in the hat"</td>
                  <td className="py-3 px-4 text-cyan-300">=SUBSTITUTE(A2, "at", "ar", 2)</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">"cat in the har"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Replaces only the 2nd instance of target substring "at" with "ar".</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-emerald-400 font-sans font-semibold">Positional REPLACE</td>
                  <td className="py-3 px-4 text-amber-300">A2="CARD-9999-8888"</td>
                  <td className="py-3 px-4 text-cyan-300">=REPLACE(A2, 6, 4, "XXXX")</td>
                  <td className="py-3 px-4 text-sky-300 font-bold">"CARD-XXXX-8888"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Replaces 4 digits starting at index 6 with "XXXX" for privacy masking.</td>
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
            sheetName="EX703"
            title="Concatenation strategies: CONCAT, TEXTJOIN with custom delimiters, and the &amp; operator - Interactive Practice Grid"
            rowsPerPage={10}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 5: FREQUENTLY ASKED QUESTIONS
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[4] = el)} className="reveal-section">
          <FAQTemplate
            title="Concatenation strategies: CONCAT, TEXTJOIN with custom delimiters, and the &amp; operator - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 6: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[5] = el)} className="reveal-section">
          <Teacher
            note="TEXTJOIN is a game-changer for enterprise reporting. Always set ignore_empty to TRUE to avoid double delimiters when combining sparse database records!"
          />
        </div>
      </div>
    </div>
  );
}
