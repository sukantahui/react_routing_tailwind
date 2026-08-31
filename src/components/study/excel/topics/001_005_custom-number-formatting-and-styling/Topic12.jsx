"use client";

import React, { useState, useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/001_005_custom_number_formatting_and_styling_master.xlsx?url";
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
    link.download = "custom_number_formatting_and_styling_master.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const incomeStatementExamples = [
    {
      id: "1",
      code: "INC-101",
      category: "Gross Operating Revenue",
      raw: "145800000",
      mask: '_($* #,##0.0,," M"_);[Red]_($* (#,##0.0,," M");_($* "-"??_);_(@_)',
      formatted: "$     145.8 M ",
      formulaBar: "145800000",
      logic: "Scales raw $145.8M revenue with Wall Street currency alignment and trailing comma million scaling."
    },
    {
      id: "2",
      code: "INC-102",
      category: "Cost of Goods Sold (COGS)",
      raw: "-84200000",
      mask: '_($* #,##0.0,," M"_);[Red]_($* (#,##0.0,," M");_($* "-"??_);_(@_)',
      formatted: "($      84.2 M)",
      formulaBar: "-84200000",
      logic: "Formats negative COGS expense in red with parentheses according to institutional accounting standards."
    },
    {
      id: "3",
      code: "INC-103",
      category: "Gross Profit Margin",
      raw: "61600000",
      mask: '_($* #,##0.0,," M"_);[Red]_($* (#,##0.0,," M");_($* "-"??_);_(@_)',
      formatted: "$      61.6 M ",
      formulaBar: "61600000",
      logic: "Computed as Revenue + COGS; custom mask formats net gross margin figure in scaled millions."
    },
    {
      id: "4",
      code: "INC-104",
      category: "Gross Profit Margin %",
      raw: "0.422496",
      mask: "0.0%",
      formatted: "42.2%",
      formulaBar: "0.422496",
      logic: "Displays gross margin percentage ratio for executive KPI scorecard."
    },
    {
      id: "5",
      code: "INC-105",
      category: "Research & Development (R&D)",
      raw: "-12400000",
      mask: '_($* #,##0.0,," M"_);[Red]_($* (#,##0.0,," M");_($* "-"??_);_(@_)',
      formatted: "($      12.4 M)",
      formulaBar: "-12400000",
      logic: "Formats operating R&D expense item with red accounting parentheses."
    },
    {
      id: "6",
      code: "INC-106",
      category: "Sales & Marketing (SG&A)",
      raw: "-18900000",
      mask: '_($* #,##0.0,," M"_);[Red]_($* (#,##0.0,," M");_($* "-"??_);_(@_)',
      formatted: "($      18.9 M)",
      formulaBar: "-18900000",
      logic: "Formats commercial sales and overhead expenses in scaled millions."
    },
    {
      id: "7",
      code: "INC-107",
      category: "Operating Income (EBIT)",
      raw: "30300000",
      mask: '[Green][&gt;25000000]_($* #,##0.0,," M"_);[Red]_($* (#,##0.0,," M");_($* "-"??_);_(@_)',
      formatted: "$      30.3 M ",
      formulaBar: "30300000",
      logic: "Embeds green color threshold alert for EBIT exceeding $25M target floor."
    },
    {
      id: "8",
      code: "INC-108",
      category: "Operating Income Margin %",
      raw: "0.207818",
      mask: "0.0%",
      formatted: "20.8%",
      formulaBar: "0.207818",
      logic: "Displays operating margin efficiency percentage."
    },
    {
      id: "9",
      code: "INC-109",
      category: "Interest Expense",
      raw: "-2100000",
      mask: '_($* #,##0.0,," M"_);[Red]_($* (#,##0.0,," M");_($* "-"??_);_(@_)',
      formatted: "($       2.1 M)",
      formulaBar: "-2100000",
      logic: "Formats debt service interest expense in financial statement layout."
    },
    {
      id: "10",
      code: "INC-110",
      category: "Earnings Before Taxes (EBT)",
      raw: "28200000",
      mask: '_($* #,##0.0,," M"_);[Red]_($* (#,##0.0,," M");_($* "-"??_);_(@_)',
      formatted: "$      28.2 M ",
      formulaBar: "28200000",
      logic: "Computed pre-tax earnings level for fiscal compliance."
    },
    {
      id: "11",
      code: "INC-111",
      category: "Income Tax Provision",
      raw: "-7050000",
      mask: '_($* #,##0.0,," M"_);[Red]_($* (#,##0.0,," M");_($* "-"??_);_(@_)',
      formatted: "($       7.1 M)",
      formulaBar: "-7050000",
      logic: "Formats 25% effective income tax provision in red parentheses."
    },
    {
      id: "12",
      code: "INC-112",
      category: "Net Income After Taxes",
      raw: "21150000",
      mask: '[Green][&gt;20000000]_($* #,##0.0,," M"_);[Red]_($* (#,##0.0,," M");_($* "-"??_);_(@_)',
      formatted: "$      21.2 M ",
      formulaBar: "21150000",
      logic: "Net bottom-line earnings highlighted in green when exceeding $20M target."
    },
    {
      id: "13",
      code: "INC-113",
      category: "Net Profit Margin %",
      raw: "0.145061",
      mask: "0.0%",
      formatted: "14.5%",
      formulaBar: "0.145061",
      logic: "Net profit margin ratio for C-suite investor presentations."
    },
    {
      id: "14",
      code: "INC-114",
      category: "Diluted Earnings Per Share (EPS)",
      raw: "4.23",
      mask: '$#,##0.00" / Share"',
      formatted: "$4.23 / Share",
      formulaBar: "4.23",
      logic: "Attaches share unit suffix without breaking per-share dividend calculations."
    },
    {
      id: "15",
      code: "INC-115",
      category: "Weighted Average Shares",
      raw: "5000000",
      mask: '#,##0.0,," M Shares"',
      formatted: "5.0 M Shares",
      formulaBar: "5000000",
      logic: "Scales share count into millions for SEC 10-K filing tables."
    },
    {
      id: "16",
      code: "INC-116",
      category: "EBITDA Metrics",
      raw: "36500000",
      mask: '_($* #,##0.0,," M"_);[Red]_($* (#,##0.0,," M");_($* "-"??_);_(@_)',
      formatted: "$      36.5 M ",
      formulaBar: "36500000",
      logic: "Adds Depreciation/Amortization back to EBIT for debt covenant auditing."
    },
    {
      id: "17",
      code: "INC-117",
      category: "Zero Restructuring Charge",
      raw: "0",
      mask: '_($* #,##0.0,," M"_);[Red]_($* (#,##0.0,," M");_($* "-"??_);_(@_)',
      formatted: "$         -   ",
      formulaBar: "0",
      logic: "Formats zero restructuring charges with clean Wall Street dash - alignment."
    },
    {
      id: "18",
      code: "INC-118",
      category: "YoY Revenue Growth %",
      raw: "0.184",
      mask: '[Green][&gt;0.15]+0.0%;[Red][&lt;0]-0.0%;0.0%',
      formatted: "+18.4%",
      formulaBar: "0.184",
      logic: "Dynamic color alert highlighting YoY growth exceeding 15% threshold in green."
    },
    {
      id: "19",
      code: "INC-119",
      category: "Free Cash Flow (FCF)",
      raw: "19800000",
      mask: '_($* #,##0.0,," M"_);[Red]_($* (#,##0.0,," M");_($* "-"??_);_(@_)',
      formatted: "$      19.8 M ",
      formulaBar: "19800000",
      logic: "Formats free cash flow generation for corporate treasury reporting."
    },
    {
      id: "20",
      code: "INC-120",
      category: "Retained Earnings Contribution",
      raw: "15862500",
      mask: '_($* #,##0.0,," M"_);[Red]_($* (#,##0.0,," M");_($* "-"??_);_(@_)',
      formatted: "$      15.9 M ",
      formulaBar: "15862500",
      logic: "Calculates net earnings retained after 25% dividend payout."
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
              🎨 Income Statement Project · Topic 12
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-[10px] font-semibold">
              Format Engineering
            </span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-[10px] font-semibold">
              Advanced · Bloom Level 4: Analyze
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-snug">
            Real-World Project: Building an Executive Financial Income Statement with Dynamic Scaling and Color Alerts
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed max-w-5xl">
            Integrating metric scaling into millions (<code className="text-cyan-300">$#,##0.0,," M"</code>), Wall Street accounting alignment (<code className="text-cyan-300">_($* ...</code>), embedded conditional color alerts (<code className="text-cyan-300">[Green][&gt;20M]</code>), and zero dashes into a publication-grade C-suite financial income statement.
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
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 text-sm font-mono font-bold">📈</span>
                Interactive Master Workbook Practice &amp; Income Statement Inspection
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Inspect raw financial statement numbers vs scaled corporate displays on worksheet tab Topic12.
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
            sheetName="Topic12"
          />
        </section>

        {/* =========================================================================
            SECTION 3: 20 REAL-WORLD INCOME STATEMENT PROJECT EXAMPLES
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 text-sm font-mono font-bold">📊</span>
                20 Real-World Executive Income Statement Scenarios
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Comparing raw financial statement payloads, applied multi-section format masks, formatted visual cell displays, formula bar reality, and accounting rationale.
              </p>
            </div>
            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800 shrink-0 font-bold">
              20 Income Statement Scenarios
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
                {incomeStatementExamples.map((ex) => (
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
            SECTION 4: TECHNICAL ARCHITECTURE & INCOME STATEMENT MASK ENGINE
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 text-sm font-mono font-bold">⚙️</span>
              Technical Architecture: The Master Financial Format Mask
            </h2>
            <span className="text-[11px] font-mono text-indigo-300 bg-indigo-950/60 px-2.5 py-0.5 rounded-lg border border-indigo-800">
              Wall Street Standard
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
              <h3 className="font-bold text-sky-300 text-sm flex items-center gap-2">
                <span>💰</span> Accounting Asterisk (*) Alignment
              </h3>
              <p className="text-slate-300 leading-relaxed">
                The asterisk <code className="text-amber-300 font-bold">*</code> repeats the subsequent space character to push the currency symbol <code className="text-amber-300">$</code> flush to the left boundary of the cell, while numeric digits remain flush-right.
              </p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-[11px] text-cyan-300 border border-slate-800">
                _($* #,##0.0,," M"_) → "$      145.8 M "
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
              <h3 className="font-bold text-emerald-300 text-sm flex items-center gap-2">
                <span>🔴</span> Parentheses &amp; Dash Zero Alignment
              </h3>
              <p className="text-slate-300 leading-relaxed">
                The underscore space token <code className="text-amber-300">_)</code> reserves an invisible padding space on positive numbers matching the right parenthesis of negative numbers, guaranteeing decimal alignment across all financial rows.
              </p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-[11px] text-emerald-300 border border-slate-800">
                Positive: $ 145.8 M _ | Negative: ($ 84.2 M)
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
              Common Income Statement Pitfalls &amp; Diagnostic Fixes
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
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-300">Positive and negative decimals do not align</td>
                  <td className="py-2.5 px-3">Missing underscore space padding token _) at the end of the positive number section.</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">Append _) to positive section and _( to negative section.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-300">COGS subtracted twice in formula</td>
                  <td className="py-2.5 px-3">User entered COGS as negative (-84M) and wrote formula =Revenue - COGS instead of =Revenue + COGS.</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">Use addition =Revenue + COGS when COGS is stored as negative number.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-300">Currency symbol touches digits</td>
                  <td className="py-2.5 px-3">Omitted asterisk space token (* ) from the format string.</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">Use _($* #,##0.0,," M"_) for Wall Street flush-left alignment.</td>
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
            title="Executive Financial Income Statement - Mastery Q&amp;A"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 7: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[6] = el)} className="reveal-section">
          <Teacher
            note="When building C-suite income statements, combine trailing comma scaling ($#,##0.0,,' M') with Wall Street asterisk alignment (_($* ...) so your financial models are boardroom-ready, clean, and 100% mathematically pure!"
          />
        </div>
      </div>
    </div>
  );
}
