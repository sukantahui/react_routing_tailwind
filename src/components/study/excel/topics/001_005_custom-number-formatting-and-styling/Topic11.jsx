"use client";

import React, { useState, useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/001_005_custom_number_formatting_and_styling_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic11() {
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
    link.download = "custom_number_formatting_and_styling_master.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stealthExamples = [
    {
      id: "1",
      code: "CLK-101",
      category: "Confidential Payroll Assumption",
      raw: "1850000",
      mask: ";;;",
      formatted: " ",
      formulaBar: "1850000",
      logic: "Cloaks executive salary parameter on shared forecast sheet; downstream payroll model still calculates total budget without visual exposure."
    },
    {
      id: "2",
      code: "CLK-102",
      category: "Interactive Toggle Parameter",
      raw: "1",
      mask: ";;;",
      formatted: " ",
      formulaBar: "1",
      logic: "Conceals underlying scenario switch integer (1=Base, 2=Bull, 3=Bear) while radio button form controls read cell value directly."
    },
    {
      id: "3",
      code: "CLK-103",
      category: "Stealth Query Column Header",
      raw: "Internal_SQL_ID",
      mask: ";;;",
      formatted: " ",
      formulaBar: '"Internal_SQL_ID"',
      logic: "Cloaks database query header from client view while Power Query and VLOOKUP range references stay 100% functional."
    },
    {
      id: "4",
      code: "CLK-104",
      category: "Confidential Margin Floor",
      raw: "0.225",
      mask: ";;;",
      formatted: " ",
      formulaBar: "0.225",
      logic: "Conceals minimum acceptable gross margin rate (22.5%) during live pricing presentations with external customers."
    },
    {
      id: "5",
      code: "CLK-105",
      category: "Redacted Customer Tax ID",
      raw: "ABCDE1234F",
      mask: ';;;"[REDACTED]"',
      formatted: "[REDACTED]",
      formulaBar: '"ABCDE1234F"',
      logic: "Replaces confidential PAN/GSTIN text payload with '[REDACTED]' visual security stamp for public audit export sheets."
    },
    {
      id: "6",
      code: "CLK-106",
      category: "Stealth Zero Variance Suppressor",
      raw: "0",
      mask: '₹ #,##0.00;[Red](₹ #,##0.00);;@',
      formatted: " ",
      formulaBar: "0",
      logic: "Leaving third format section empty suppresses zero values entirely, eliminating grid noise on monthly budget variance reports."
    },
    {
      id: "7",
      code: "CLK-107",
      category: "Security Bullet Password Mask",
      raw: "Pass_77192A",
      mask: ';;;"••••••••"',
      formatted: "••••••••",
      formulaBar: '"Pass_77192A"',
      logic: "Replaces raw authentication string with bullet security characters on user management worksheets."
    },
    {
      id: "8",
      code: "CLK-108",
      category: "Dashboard KPI Helper Cell",
      raw: "46261.604",
      mask: ";;;",
      formatted: " ",
      formulaBar: "46261.604",
      logic: "Hides intermediate timestamp calculation cell placed directly beneath a dynamic chart card."
    },
    {
      id: "9",
      code: "CLK-109",
      category: "Confidential M&A Valuation Multiple",
      raw: "12.8",
      mask: ";;;",
      formatted: " ",
      formulaBar: "12.8",
      logic: "Cloaks target EV/EBITDA valuation multiple on live deal evaluation models."
    },
    {
      id: "10",
      code: "CLK-110",
      category: "Stealth Chart Benchmark Series",
      raw: "95.4",
      mask: ";;;",
      formatted: " ",
      formulaBar: "95.4",
      logic: "Hides numeric benchmark target in table cells while Excel line chart continues plotting the target benchmark line."
    },
    {
      id: "11",
      code: "CLK-111",
      category: "Stealth Corporate Tax Rate",
      raw: "0.25",
      mask: ";;;",
      formatted: " ",
      formulaBar: "0.25",
      logic: "Hides effective tax rate (25%) from client view while Tax Expense formula =EBIT*A1 functions cleanly."
    },
    {
      id: "12",
      code: "CLK-112",
      category: "Hidden Solver Cap Constraint",
      raw: "50000",
      mask: ";;;",
      formatted: " ",
      formulaBar: "50000",
      logic: "Conceals maximum production unit cap constraint evaluated by Excel Solver engine."
    },
    {
      id: "13",
      code: "CLK-113",
      category: "Restricted Performance Rating",
      raw: "Rating 5",
      mask: ';;;"[RESTRICTED]"',
      formatted: "[RESTRICTED]",
      formulaBar: '"Rating 5"',
      logic: "Suppresses performance score text on peer review worksheets, displaying '[RESTRICTED]'."
    },
    {
      id: "14",
      code: "CLK-114",
      category: "Stealth Audit Verification Token",
      raw: "Audit_Pass_009",
      mask: ";;;",
      formatted: " ",
      formulaBar: '"Audit_Pass_009"',
      logic: "Stores hidden validation token in grid without disturbing executive print layout."
    },
    {
      id: "15",
      code: "CLK-115",
      category: "Confidential WACC Discount Rate",
      raw: "0.085",
      mask: ";;;",
      formatted: " ",
      formulaBar: "0.085",
      logic: "Conceals WACC discount rate (8.5%) in DCF valuation model."
    },
    {
      id: "16",
      code: "CLK-116",
      category: "Selective Deficit Cloak",
      raw: "-4200",
      mask: '₹ #,##0.00;;₹ 0.00;@',
      formatted: " ",
      formulaBar: "-4200",
      logic: "Second format section left empty cloaks negative budget deficits on executive summary views."
    },
    {
      id: "17",
      code: "CLK-117",
      category: "Confidential Unit Cost Price",
      raw: "420.50",
      mask: ";;;",
      formatted: " ",
      formulaBar: "420.50",
      logic: "Cloaks unit cost price from sales rep order entry screen while calculating margin = Price - Cost."
    },
    {
      id: "18",
      code: "CLK-118",
      category: "Macro Checkbox State Integer",
      raw: "0",
      mask: ";;;",
      formatted: " ",
      formulaBar: "0",
      logic: "Hides toggle state integer (0/1) assigned to form control checkbox."
    },
    {
      id: "19",
      code: "CLK-119",
      category: "Masked Bank Account Payload",
      raw: "30948571029",
      mask: ';;;"XXXX-XXXX-1029"',
      formatted: "XXXX-XXXX-1029",
      formulaBar: '"30948571029"',
      logic: "Obfuscates bank account number for print reports while preserving complete string for electronic payouts."
    },
    {
      id: "20",
      code: "CLK-120",
      category: "Stealth Total Row Sentinel",
      raw: "999999",
      mask: ";;;",
      formatted: " ",
      formulaBar: "999999",
      logic: "Holds grid structure sentinel value without displaying distracting dummy numbers."
    }
  ];

  return (
    <div className="dark text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      <style>{`
        @keyframes fadeInSlide {
          from { transform: translateY(14px); }
          to { transform: translateY(0); }
        }
        .reveal-section {
          animation: fadeInSlide 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="w-full space-y-4 sm:space-y-5">
        {/* =========================================================================
            SECTION 1: HERO HEADER & OVERVIEW
        ========================================================================= */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 shadow-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

          <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
            <span className="px-2 py-0.5 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-[10px] font-bold uppercase tracking-wider">
              🎨 Stealth Cloaking · Topic 11
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-[10px] font-semibold">
              Format Engineering
            </span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-[10px] font-semibold">
              Advanced · Bloom Level 4: Analyze
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-snug">
            The Stealth Cloaking Operator (;;;) for Hiding Cell Contents and Dashboard Security
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed max-w-5xl">
            Invisibly cloaking sensitive assumptions, data table headers, and calculation toggles without hiding rows or columns. Master the 3-semicolon syntax (<code className="text-cyan-300">;;;</code>), suppress zero noise, implement text redactions (<code className="text-cyan-300">;;;"[REDACTED]"</code>), and build secure executive dashboards.
          </p>

          <div className="mt-3 pt-2.5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-sky-400 font-bold">✓</span>
              <span><strong>Code:</strong> EXCEL-PRO-901</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Module:</strong> Custom Formatting &amp; Presentation</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-indigo-400 font-bold">✓</span>
              <span><strong>Center:</strong> Coder &amp; AccoTax</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: INTERACTIVE EXCEL FILE VIEWER & PRACTICE WORKBOOK
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 text-sm font-mono font-bold">🔒</span>
                Interactive Master Workbook Stealth Cloaking Practice
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Inspect raw cell memory vs cloaked visual representations on worksheet tab Topic11.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-md transition-all shrink-0 self-start sm:self-auto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download .XLSX Master Workbook
            </button>
          </div>

          <ExcelFileLoader
            fileUrl={sampleWorkbookUrl}
            sheetName="Topic11"
          />
        </section>

        {/* =========================================================================
            SECTION 3: 20 COMPREHENSIVE REAL-WORLD STEALTH CLOAKING EXAMPLES
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 text-sm font-mono font-bold">📊</span>
                20 Real-World Stealth Cloaking (;;;) Scenarios
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Comparing raw stored cell payloads, applied 3-semicolon cloaking masks, rendered cell display, formula bar reality, and business rationale.
              </p>
            </div>
            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800 shrink-0 font-bold">
              20 Stealth Scenarios
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/70">
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Code &amp; Category</th>
                  <th className="py-2.5 px-3">Raw Stored Payload</th>
                  <th className="py-2.5 px-3">Applied Format Mask</th>
                  <th className="py-2.5 px-3">Visual Formatted Cell</th>
                  <th className="py-2.5 px-3">Formula Bar Reality</th>
                  <th className="py-2.5 px-3 min-w-[280px]">Business Logic &amp; Why It Matters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {stealthExamples.map((ex) => (
                  <tr key={ex.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono text-slate-500">{ex.id}</td>
                    <td className="py-2.5 px-3 font-semibold text-sky-300">
                      <div className="font-mono text-[11px] text-slate-400">{ex.code}</div>
                      <div>{ex.category}</div>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-amber-300">{ex.raw}</td>
                    <td className="py-2.5 px-3 font-mono text-cyan-300 font-bold bg-slate-950/40 rounded px-2">{ex.mask}</td>
                    <td className="py-2.5 px-3 font-mono text-emerald-400 font-extrabold bg-emerald-950/30 rounded px-2">{ex.formatted}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">{ex.formulaBar}</td>
                    <td className="py-2.5 px-3 text-slate-300 leading-relaxed text-[11px]">{ex.logic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: TECHNICAL ARCHITECTURE & THE 3-SEMICOLON ENGINE
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 text-sm font-mono font-bold">⚙️</span>
              Technical Architecture: The 3-Semicolon (;;;) Cloaking Engine
            </h2>
            <span className="text-[11px] font-mono text-indigo-300 bg-indigo-950/60 px-2.5 py-0.5 rounded-lg border border-indigo-800">
              Format Mechanics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
              <h3 className="font-bold text-sky-300 text-sm flex items-center gap-2">
                <span>1️⃣</span> Positive Section Suppressed
              </h3>
              <p className="text-slate-300 leading-relaxed">
                The 1st section before the first semicolon governs positive numbers. Leaving it empty (<code className="text-amber-300">;</code>) suppresses all positive values from visual display.
              </p>
              <div className="p-2 rounded bg-slate-900 font-mono text-[11px] text-cyan-300 border border-slate-800">
                1850000 → [Blank Display]
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
              <h3 className="font-bold text-emerald-300 text-sm flex items-center gap-2">
                <span>2️⃣</span> Negative &amp; Zero Suppressed
              </h3>
              <p className="text-slate-300 leading-relaxed">
                The 2nd section (negatives) and 3rd section (zeros) left empty (<code className="text-amber-300">;;</code>) suppress negative deficits and zero values completely.
              </p>
              <div className="p-2 rounded bg-slate-900 font-mono text-[11px] text-emerald-300 border border-slate-800">
                -4200 / 0 → [Blank Display]
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
              <h3 className="font-bold text-purple-300 text-sm flex items-center gap-2">
                <span>3️⃣</span> Text Section / Redaction
              </h3>
              <p className="text-slate-300 leading-relaxed">
                The 4th section governs text strings. Using <code className="text-amber-300">;;;</code> cloaks text completely, while <code className="text-amber-300">;;;"[REDACTED]"</code> replaces text with security stamps.
              </p>
              <div className="p-2 rounded bg-slate-900 font-mono text-[11px] text-purple-300 border border-slate-800">
                "PAN123" → "[REDACTED]"
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: COMMON MISTAKES & DIAGNOSTIC MATRIX
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 text-sm font-mono">⚠️</span>
              Common Cloaking Pitfalls &amp; Diagnostic Fixes
            </h2>
            <span className="text-[11px] font-mono text-rose-300 bg-rose-950/60 px-2.5 py-0.5 rounded-lg border border-rose-800">
              Troubleshooting
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-2.5 px-3">Symptom / Error Encountered</th>
                  <th className="py-2.5 px-3">Root Cause</th>
                  <th className="py-2.5 px-3">The Exact 5-Second Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-300">Formula bar reveals cloaked cell value</td>
                  <td className="py-2.5 px-3">Selecting a cell formatted with ;;; reveals the raw value in the formula bar above the grid.</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">Check 'Hidden' property in Format Cells → Protection, then Protect Sheet.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-300">Cloaked text string remains visible</td>
                  <td className="py-2.5 px-3">User applied only two semicolons (;;), which cloaks numbers but displays text.</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">Use three full semicolons: ;;; (or ;;;@ to control text section).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-300">SUM() includes cloaked blank cells</td>
                  <td className="py-2.5 px-3">Users assume cloaked blank cells are empty; SUM() still adds their underlying numbers.</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">This is intended behavior! Underlying numeric values remain 100% active in memory.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: FREQUENTLY ASKED QUESTIONS (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[5] = el)} className="reveal-section">
          <FAQTemplate
            title="The Stealth Cloaking Operator (;;;) - Mastery Q&amp;A"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 7: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[6] = el)} className="reveal-section">
          <Teacher
            note="Use the stealth cloaking operator (;;;) to hide helper calculation cells, macro toggles, and sensitive parameters without breaking formula chains or hiding entire rows/columns!"
          />
        </div>
      </div>
    </div>
  );
}
