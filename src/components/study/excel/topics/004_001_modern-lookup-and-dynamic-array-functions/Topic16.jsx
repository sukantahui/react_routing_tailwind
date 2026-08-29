"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/modern_lookup_and_dynamic_array_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic16_files/topic16_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic16() {
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
    link.download = "modern_lookup_and_dynamic_array_functions_master.xlsx";
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
        {/* 1. Header */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/80 border border-sky-800 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>📊</span> Excel Masterclass · Topic 16
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent tracking-tight">
            Modern Formula-Driven Pivot Reports with GROUPBY & PIVOTBY
          </h1>
          <p className="text-slate-300 mt-4 text-base sm:text-lg leading-relaxed max-w-4xl">
            Building multi-level formulaic Pivot Tables using GROUPBY, PIVOTBY, and PERCENTOF
          </p>
        </header>

        {/* 2. Formula Syntax & Anatomy Card */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-300 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="p-2 rounded-xl bg-sky-950 border border-sky-800 text-sky-400">⚡</span>
            Formula Anatomy & Core Syntax
          </h2>
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <code className="text-sm sm:text-base font-mono text-emerald-300 block bg-slate-900 p-3 rounded-xl border border-slate-800 overflow-x-auto">
              =GROUPBY(row_fields, values, function, [field_headers], [total_depth], [sort_order], [filter_array])
            </code>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Generates dynamic array pivot aggregations in a single formula that update instantly when source data changes without manual Pivot Table refreshes.
            </p>
          </div>
        </section>

        {/* 3. Deep Theoretical Mechanics */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="p-2 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400">🔬</span>
            Computational Mechanics & Industry Evaluation Flow
          </h2>
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>
              In corporate data systems and financial workflows, precision and execution efficiency are paramount. Excel evaluates this calculation engine under the hood via vectorized memory blocks and dynamic dependency graphs:
            </p>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-sky-200 overflow-x-auto space-y-1">
              <div className="text-slate-400 font-sans font-semibold mb-2">Step-by-Step Evaluation Lifecycle:</div>
              <div>1. [Input Ingestion] &rarr; Sanitizes range bounds and validates data types</div>
              <div>2. [Matrix Evaluation] &rarr; Performs algorithmic transformation in memory</div>
              <div>3. [Spill Allocation] &rarr; Allocates dynamic spilled grid dimensions automatically</div>
              <div>4. [Audit Verification] &rarr; Computes integrity bounds and returns calibrated result</div>
            </div>
          </div>
        </section>

        {/* 4. Visual Diagram */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="p-2 rounded-xl bg-indigo-950 border border-indigo-800 text-indigo-400">📐</span>
            Calculation Flow Architecture
          </h2>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-center">
            <svg className="w-full max-w-2xl h-auto" viewBox="0 0 700 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="30" y="40" width="180" height="90" rx="12" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
              <text x="120" y="80" fill="#38BDF8" fontSize="13" fontWeight="bold" textAnchor="middle">1. Source Matrix</text>
              <text x="120" y="105" fill="#94A3B8" fontSize="11" textAnchor="middle">Data Ingestion</text>

              <path d="M220 85 H 280" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 4" />

              <rect x="290" y="40" width="180" height="90" rx="12" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <text x="380" y="80" fill="#34D399" fontSize="13" fontWeight="bold" textAnchor="middle">2. Engine Transform</text>
              <text x="380" y="105" fill="#94A3B8" fontSize="11" textAnchor="middle">Vectorized Logic</text>

              <path d="M480 85 H 540" stroke="#059669" strokeWidth="2" strokeDasharray="4 4" />

              <rect x="550" y="40" width="120" height="90" rx="12" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
              <text x="610" y="80" fill="#FBBF24" fontSize="13" fontWeight="bold" textAnchor="middle">3. Output</text>
              <text x="610" y="105" fill="#94A3B8" fontSize="11" textAnchor="middle">Spilled Result</text>
            </svg>
          </div>
        </section>

        {/* 5. Live Excel Practice Grid & Download */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="p-2 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400">📥</span>
                Interactive Spreadsheet & Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the dataset below live in the browser or download the full chapter workbook to practice in Microsoft Excel.
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
            sheetName="Topic16_Groupby_Pivotby"
            title="Interactive Practice Grid"
            rowsPerPage={25}
            showSheetSelector={true}
          />
        </section>

        {/* 6. Real-World Business Scenarios */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-950 border border-amber-800 text-amber-400">🏢</span>
            Real-World Business Scenarios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-amber-300">Case 1: Barrackpore Corporate Modeling</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Swadeep structures enterprise datasets using modern spreadsheet calculations to automate reporting and executive dashboards.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-amber-300">Case 2: Shyamnagar Financial Audit</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tuhina implements zero-error formulas to cross-verify account reconciliations and scenario forecasts.
              </p>
            </div>
          </div>
        </section>

        {/* 7. Common Pitfalls */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="p-2 rounded-xl bg-rose-950 border border-rose-800 text-rose-400">⚠️</span>
            Common Pitfalls & Troubleshooting Matrix
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300 border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-900 text-slate-200 uppercase font-semibold">
                <tr>
                  <th className="p-3 border-b border-slate-800">Error</th>
                  <th className="p-3 border-b border-slate-800">Root Cause</th>
                  <th className="p-3 border-b border-slate-800">Solution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr className="bg-slate-950/40">
                  <td className="p-3 font-mono text-rose-400">#CALC! / #VALUE!</td>
                  <td className="p-3">Invalid parameter dimensions or incompatible vector sizes.</td>
                  <td className="p-3">Verify matrix dimensions and argument boundaries.</td>
                </tr>
                <tr className="bg-slate-950/80">
                  <td className="p-3 font-mono text-rose-400">#SPILL!</td>
                  <td className="p-3">Adjacent cells blocking dynamic array expansion.</td>
                  <td className="p-3">Clear the spill range to allow formula output.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 8. FAQ Accordion */}
        <div ref={(el) => (sectionsRef.current[7] = el)} className="reveal-section">
          <FAQTemplate
            title="Modern Formula-Driven Pivot Reports with GROUPBY & PIVOTBY Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* 9. Teacher's Note */}
        <div ref={(el) => (sectionsRef.current[8] = el)} className="reveal-section">
          <Teacher
            topicName="Modern Formula-Driven Pivot Reports with GROUPBY & PIVOTBY"
            noteTitle="Sukanta Hui's Mentor Guide"
            mentorAdvice={"In professional spreadsheet architecture, precision and edge-case validation precede speed. Always test with zero values, negative numbers, and empty cells to verify formula robustness."}
          />
        </div>
      </div>
    </div>
  );
}
