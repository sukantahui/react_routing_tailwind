"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/power_query_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic7() {
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

  // Direct workbook download handler
  const handleDownload = () => {
    if (!sampleWorkbookUrl) return;
    const link = document.createElement("a");
    link.href = sampleWorkbookUrl;
    link.download = "power_query_master_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-teal-500/30 selection:text-teal-200">
      {/* Scoped CSS Keyframes for Smooth Reveal Animation */}
      <style>{`
        @keyframes fadeInSlide {
          from {
            transform: translateY(18px);
          }
          to {
            transform: translateY(0);
          }
        }
        .reveal-section {
          animation: fadeInSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="max-w-5xl mx-auto space-y-10">
        {/* =========================================================================
            SECTION 1: HERO HEADER & EXECUTIVE OVERVIEW
        ========================================================================= */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-teal-950/80 border border-teal-700/60 text-teal-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ Number &amp; Temporal Engine · Topic 7
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Age, Date Boundaries &amp; Rounding
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 3: Apply &amp; Compute
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Number &amp; Date Transformations: Age Calculation, Month Boundaries, Rounding &amp; Parity
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Financial analytics and human capital reporting require rigorous mathematical and calendar precision. 
            Power Query's <strong>Numeric &amp; Temporal Engine</strong> delivers declarative transformations—from 
            dynamic <strong>Age Calculations</strong> (<code className="text-teal-300 font-mono">Duration.Days / 365.25</code>) and 
            <strong>Calendar Period Boundaries</strong> (<code className="text-sky-300 font-mono">Date.StartOfMonth / Date.EndOfMonth</code>) to 
            <strong>Banker's vs Arithmetic Rounding</strong> (<code className="text-emerald-300 font-mono">RoundingMode.AwayFromZero</code>) and 
            <strong>Indian/UK Fiscal Year Calendars</strong>!
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Age &amp; Duration:</strong> Dynamic elapsed duration math</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Period Boundaries:</strong> Start and End of Month/Year in 1 formula</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Mathematical Control:</strong> Banker's rounding, modulo, parity &amp; logarithms</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: FORMULA & SYNTAX ANATOMY CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6 hover:border-slate-700 transition-all duration-300"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-teal-400">⚡</span> Power Query Number &amp; Date M Syntax Anatomy
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              M Math &amp; Temporal Functions
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-teal-300 space-y-2">
            <span className="text-slate-500">// 1. Dynamic Age in Completed Years</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'= Table.AddColumn(Source, "Age", each Number.RoundDown(Duration.Days(DateTime.Date(DateTime.LocalNow()) - [Birth_Date]) / 365.25))'}
            </div>
            <span className="text-slate-500">// 2. Start and End of Month Boundaries</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'= Table.AddColumn(Source, "Month_Start", each Date.StartOfMonth([Hire_Date]))'}
            </div>
            <span className="text-slate-500">// 3. Arithmetic Rounding (Half Up)</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'= Table.AddColumn(Source, "RoundedBonus", each Number.Round([Bonus], 0, RoundingMode.AwayFromZero))'}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Operation</th>
                  <th className="py-3 px-4">Core M Expression</th>
                  <th className="py-3 px-4">Arguments / Return Type</th>
                  <th className="py-3 px-4">Enterprise Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-teal-400 font-sans">Start of Month</td>
                  <td className="py-3 px-4 text-teal-300">Date.StartOfMonth</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Date &rarr; type date</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Normalizes daily transactions into monthly cohort dates.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400 font-sans">End of Month</td>
                  <td className="py-3 px-4 text-sky-300">Date.EndOfMonth</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Date &rarr; type date</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Calculates statutory tax and interest accrual deadlines.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">Round (AwayFromZero)</td>
                  <td className="py-3 px-4 text-emerald-300">Number.Round</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">digits, RoundingMode.AwayFromZero</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Standard commercial invoice tax and bonus rounding.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-indigo-400 font-sans">Duration Days</td>
                  <td className="py-3 px-4 text-indigo-300">Duration.Days</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Duration &rarr; type number</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Computes employee tenure and customer ticket resolution times.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL & CALCULATION MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-emerald-400">🔬</span> Banker's Rounding vs RoundingMode.AwayFromZero &amp; Durations
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Mathematical Mechanics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-teal-400">1.</span> Banker's Rounding (Round to Even)
              </h3>
              <p className="leading-relaxed">
                By default, Power Query's <code className="text-teal-300 font-mono">Number.Round</code> uses IEEE 754 Banker's Rounding: 
                <code className="text-amber-300 font-mono">2.5</code> rounds to <code className="text-amber-300 font-mono">2</code>, and <code className="text-amber-300 font-mono">3.5</code> rounds to <code className="text-amber-300 font-mono">4</code>. 
                To enforce standard arithmetic rounding (half rounds up to 3), pass <code className="text-emerald-300 font-mono">RoundingMode.AwayFromZero</code>!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-teal-300">
                Number.Round(2.5, 0, RoundingMode.AwayFromZero) = 3
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> The Duration Data Type
              </h3>
              <p className="leading-relaxed">
                Subtracting two DateTime values yields an explicit <code className="text-sky-300 font-mono">#duration(d, h, m, s)</code> object. 
                Use <code className="text-emerald-300 font-mono">Duration.Days</code> for integer days, or <code className="text-emerald-300 font-mono">Duration.TotalHours</code> for 
                fractional elapsed hours.
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Duration.Days([End] - [Start]) &rarr; Integer Days
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Indian &amp; UK Fiscal Year (April–March) M Alignment
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Incorporate Indian and UK fiscal calendars dynamically with M conditional date logic:
              <br />
              <code className="text-teal-300 font-mono">{'each if Date.Month([Date]) >= 4 then "FY" & Text.End(Text.From(Date.Year([Date])+1), 2) else "FY" & Text.End(Text.From(Date.Year([Date])), 2)'}</code>.
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-teal-400">📐</span> Visual Number &amp; Temporal Computation Engine
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Math &amp; Date Pipeline Flow
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Observe how raw temporal dates and numbers pass through the M transformation engine into structured KPI fields:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Raw Input (Left) */}
              <rect x="25" y="25" width="220" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="25" width="220" height="34" rx="12" fill="#0F766E" fillOpacity="0.3" />
              <text x="135" y="47" fill="#CCFBF1" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1. RAW DATES &amp; NUMBERS</text>

              <g transform="translate(35, 75)" fontSize="8.5" fontFamily="monospace" fill="#CBD5E1">
                <rect width="200" height="28" fill="#1E293B" />
                <text x="8" y="18">EMP-01 | 1992-05-14 (DOB)</text>

                <rect y="32" width="200" height="28" fill="#1E293B" />
                <text x="8" y="50">Hire: 2020-03-15</text>

                <rect y="64" width="200" height="28" fill="#1E293B" />
                <text x="8" y="82">Bonus: ₹ 14,999.50</text>

                <rect y="96" width="200" height="28" fill="#1E293B" />
                <text x="8" y="114">Qty: 25 | Parity: Odd</text>
              </g>

              <rect x="35" y="225" width="200" height="55" rx="6" fill="#134E4A" stroke="#14B8A6" />
              <text x="135" y="245" fill="#5EEAD4" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Raw Date &amp; Number Grid</text>
              <text x="135" y="262" fill="#99F6E4" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Ready for M Math Engine</text>

              {/* Arrow */}
              <path d="M 260 160 L 315 160" stroke="#14B8A6" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="320,160 310,155 310,165" fill="#14B8A6" />

              {/* M Math Engine (Center) */}
              <rect x="325" y="25" width="250" height="270" rx="14" fill="#0F172A" stroke="#0D9488" strokeWidth="2" />
              <rect x="325" y="25" width="250" height="34" rx="14" fill="#115E59" fillOpacity="0.4" />
              <text x="450" y="47" fill="#F0FDFA" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2. M TEMPORAL &amp; MATH</text>

              <g transform="translate(340, 70)" fontSize="8.5" fontFamily="sans-serif">
                <rect width="220" height="32" rx="4" fill="#134E4A" stroke="#14B8A6" />
                <text x="10" y="20" fill="#5EEAD4" fontWeight="bold">1. Duration.Days / 365.25 (Age)</text>

                <rect y="38" width="220" height="32" rx="4" fill="#0369A1" fillOpacity="0.3" stroke="#38BDF8" />
                <text x="10" y="58" fill="#BAE6FD" fontWeight="bold">2. Date.StartOfMonth / EndOfMonth</text>

                <rect y="76" width="220" height="32" rx="4" fill="#065F46" fillOpacity="0.3" stroke="#10B981" />
                <text x="10" y="96" fill="#A7F3D0" fontWeight="bold">3. Number.Round (AwayFromZero)</text>

                <rect y="114" width="220" height="32" rx="4" fill="#854D0E" fillOpacity="0.3" stroke="#EAB308" />
                <text x="10" y="134" fill="#FEF08A" fontWeight="bold">4. Number.IsEven / Number.Mod</text>
              </g>

              <text x="450" y="270" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Sub-Second RAM Evaluation</text>

              {/* Arrow */}
              <path d="M 590 160 L 620 160" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="625,160 615,155 615,165" fill="#10B981" />

              {/* Computed KPIs (Right) */}
              <rect x="630" y="25" width="195" height="270" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="630" y="25" width="195" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="727" y="45" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3. COMPUTED KPIS</text>

              <g transform="translate(640, 75)" fontSize="8.5" fontFamily="monospace" fill="#E2E8F0">
                <rect width="175" height="30" fill="#064E3B" stroke="#10B981" />
                <text x="8" y="19" fill="#34D399" fontWeight="bold">Age: 34 Yrs | Bonus: 15,000</text>

                <rect y="36" width="175" height="30" fill="#1E293B" />
                <text x="8" y="55">Period: 2020-03-01 to 31</text>
              </g>

              <rect x="640" y="225" width="175" height="55" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" />
              <text x="727" y="245" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">100% Mathematically Exact</text>
              <text x="727" y="262" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Ready for Executive Report</text>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: LIVE EXCEL FILE LOADER & DIRECT DOWNLOAD BAR
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet &amp; Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the number and date transformations dataset below or download the practice workbook to test age calculation and month boundaries in Microsoft Excel.
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
              <span>Download Practice Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="Topic7_Num_Date_Transforms"
            title="Number & Date Transformation Pipeline (Employee ID, Birth Date, Calculated Age, Hire Date, Month Start, Month End, Rounded Bonus)"
            rowsPerPage={10}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-amber-400">🏢</span> Real-World Corporate Business Scenarios
            </h2>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800">
              Corporate Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Case 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Case 1 · HR Age Demographics</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Dynamic Age &amp; Gratuity Qualification
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Swadeep Banerjee</strong> computes employee age and 5-year gratuity eligibility: 
                <code className="text-teal-300 font-mono">Number.RoundDown(Duration.Days(DateTime.Date(DateTime.LocalNow()) - [DOB]) / 365.25)</code>, 
                updating statutory compliance automatically on every refresh!
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                Duration.Days / 365.25 &rarr; Exact Age in Completed Years
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Monthly Sales Consolidation</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Date.StartOfMonth Normalization
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Accountant <strong>Tuhina Mukherjee</strong> normalizes daily ERP transactions into monthly cohort buckets: 
                <code className="text-amber-300 font-mono">Date.StartOfMonth([InvoiceDate])</code>, 
                enabling clean joins with the corporate budget allocation model.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                Date.StartOfMonth &rarr; Standardized 1st of Month Cohort
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Statutory GST Rounding</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                RoundingMode.AwayFromZero Tax Invoicing
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                ERP Lead <strong>Abhronila Sengupta</strong> rounds invoice GST amounts: 
                <code className="text-indigo-300 font-mono">Number.Round([Tax], 2, RoundingMode.AwayFromZero)</code>, 
                satisfying strict Indian statutory rounding mandates without Banker's Rounding discrepancies.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                RoundingMode.AwayFromZero &rarr; Compliant Tax Invoicing
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · SLA Ticket Resolution</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Duration.TotalHours Incident SLA Audit
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Lead <strong>Debangshu Ghosh</strong> calculates vendor resolution times: 
                <code className="text-amber-300 font-mono">Duration.TotalHours([ResolvedTime] - [LoggedTime])</code>, 
                auditing SLA penalty clauses across 10,000 corporate tickets in 2 seconds.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                Duration.TotalHours &rarr; Instant SLA Penalty Calculation
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-teal-400">🪜</span> Step-by-Step Number &amp; Date Calculation Protocol
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Methodical Execution
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-teal-950 border border-teal-700 text-teal-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Compute Dynamic Age via Duration</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Subtract <code className="text-teal-300 font-mono">[BirthDate]</code> from <code className="text-teal-300 font-mono">DateTime.Date(DateTime.LocalNow())</code>, divide by 365.25, and apply <code className="text-emerald-400 font-mono">Number.RoundDown</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Generate Month Boundaries</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Select date column &rarr; <strong>Add Column</strong> &rarr; <strong>Date</strong> &rarr; <strong>Month</strong> &rarr; <strong>Start of Month</strong> (<code className="text-teal-300 font-mono">Date.StartOfMonth</code>).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Apply Arithmetic Rounding</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Use <code className="text-amber-300 font-mono">Number.Round([Amount], 2, RoundingMode.AwayFromZero)</code> to enforce statutory commercial invoice rounding.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Explicitly Coerce Output Types</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Assign <code className="text-emerald-400 font-mono">type date</code> to boundaries and <code className="text-emerald-400 font-mono">Int64.Type</code> to age to prepare pristine columns for Power Pivot!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: COMMON PITFALLS & TROUBLESHOOTING MATRIX
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-rose-400">⚠️</span> Common Errors & Troubleshooting Matrix
            </h2>
            <span className="text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800">
              Math Error Protocol
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Error / Pitfall</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Verification</th>
                  <th className="py-3 px-4">Guaranteed Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Banker's Rounding Discrepancy</td>
                  <td className="py-3 px-4 text-slate-300">Using default <code className="text-rose-300 font-mono">Number.Round(2.5, 0)</code> returns 2 instead of 3.</td>
                  <td className="py-3 px-4 text-slate-400">Financial invoices off by ₹1 on .50 amounts.</td>
                  <td className="py-3 px-4 text-emerald-400">Pass <code className="text-emerald-400 font-mono">RoundingMode.AwayFromZero</code> as the 3rd argument.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">DateTime Join Failure</td>
                  <td className="py-3 px-4 text-slate-300">Joining a Fact DateTime (`2026-08-27 14:30:00`) with a Calendar Date (`2026-08-27`).</td>
                  <td className="py-3 px-4 text-slate-400">Merge returns 0 matched rows because timestamps differ.</td>
                  <td className="py-3 px-4 text-emerald-400">Apply <code className="text-emerald-400 font-mono">DateTime.Date</code> to strip time before joining.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Static Hardcoded Age</td>
                  <td className="py-3 px-4 text-slate-300">Hardcoding static reference year instead of <code className="text-rose-300 font-mono">DateTime.LocalNow()</code>.</td>
                  <td className="py-3 px-4 text-slate-400">Ages remain static next year.</td>
                  <td className="py-3 px-4 text-emerald-400">Use <code className="text-emerald-400 font-mono">DateTime.LocalNow()</code> to compute dynamic real-time age.</td>
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
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-teal-400">💡</span> High-Speed Keyboard Shortcuts &amp; Pro Tips
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Math Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">Start of Month</span>
                <span>Cohort Normalization</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Normalize daily transactions into 1st-of-month dates for clean budget joining.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Duration.TotalHours</span>
                <span>SLA Calculation</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Compute fractional ticket resolution hours: <code className="text-teal-300 font-mono">Duration.TotalHours([End] - [Start])</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-teal-400 font-mono font-bold">Number.IsEven</span>
                <span>Batch Row Partitioning</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Check parity instantly to split large datasets into alternating processing batches.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-amber-400 font-mono font-bold">Fiscal Calendar</span>
                <span>April-March Alignment</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Generate dynamic FY labels using M conditional logic: <code className="text-teal-300 font-mono">if Month &gt;= 4 then ...</code>.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC ANALYTICAL HINTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-teal-400">🤔</span> Socratic Analytical Reflection
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Critical Thinking Prompts
            </span>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Reflect on Banker's Rounding:</strong> Why does Power Query default to Round to Even (Banker's Rounding), and why is passing <code className="text-emerald-400 font-mono">RoundingMode.AwayFromZero</code> essential when matching commercial invoices?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine temporal boundaries:</strong> How does normalizing transaction dates to <code className="text-teal-300 font-mono">Date.StartOfMonth</code> streamline relational star schemas and time-intelligence DAX measures?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider duration arithmetic:</strong> Why is computing employee age and SLA hours in formula memory using <code className="text-amber-300 font-mono">Duration.Days / 365.25</code> vastly more resilient than static worksheet formulas?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Number &amp; Date Transformations — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Master temporal and mathematical precision in Power Query! Always use Date.StartOfMonth and Date.EndOfMonth for period aggregations, calculate Age by converting elapsed duration into fractional years with Duration.Days / 365.25, remember that Power Query defaults to Banker's Rounding (pass RoundingMode.AwayFromZero for standard commercial math), and build dynamic Fiscal Calendars with M conditional date logic!"
            }
          />
        </div>
      </div>
    </div>
  );
}
