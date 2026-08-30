"use client";

import React, { useState, useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/003_003_what_if_analysis_and_scenario_planning_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

const practiceChallenges = [
  {
    title: "Commercial Loan Interest Rate Sensitivity Table",
    difficulty: "Beginner",
    category: "Column-Oriented Table",
    scenario: "Given a baseline loan model with Principal in B5 (₹50L), Interest Rate in B6 (8.5%), and Tenure in B7 (20 Yrs), construct a One-Variable Data Table testing interest rates from 7.0% to 12.0% in 0.5% steps to evaluate Monthly EMI in cell B9.",
    grid: "Inputs in E6:E16 | Output Formula in F5 (=B9) | Column Input Cell = $B$6",
    formula: "Range selected: E5:F16 > Data > What-If Analysis > Data Table > Column Input Cell: B6 > {=TABLE(, B6)}",
    explanation: "Because the scenario rates run down Column E, the table is column-oriented. The formula =B9 must sit in F5 (top row of output column). Column Input Cell is set to B6.",
    sheetRef: "Ex1_Loan_Interest_EMI"
  },
  {
    title: "Row-Oriented Product Price Sensitivity Table",
    difficulty: "Beginner",
    category: "Row-Oriented Table",
    scenario: "In a pricing model where Unit Price is stored in cell B5 and Net Profit is calculated in B12, create a row-oriented sensitivity table testing prices of ₹800, ₹1,000, ₹1,200, ₹1,400, ₹1,600 across cells E4:I4.",
    grid: "Inputs in E4:I4 (horizontal) | Output Formula in D5 (=B12) | Row Input Cell = $B$5",
    formula: "Range selected: D4:I5 > Data > What-If Analysis > Data Table > Row Input Cell: B5 > {=TABLE(B5, )}",
    explanation: "Because input price steps run horizontally across Row 4, the table is row-oriented. The output formula =B12 must sit in D5 (leading column). Row Input Cell is set to B5.",
    sheetRef: "Ex7_Row_Oriented_Table"
  },
  {
    title: "Multi-Output Sensitivity Evaluation (EMI, Total Outflow, Interest)",
    difficulty: "Intermediate",
    category: "Multi-Output Table",
    scenario: "Build a single One-Variable Data Table that simultaneously evaluates 3 outputs: Monthly EMI (=B9), Total Outflow (=B10), and Total Interest Paid (=B11) across 10 interest rate scenarios.",
    grid: "Inputs in E6:E16 | Header Formulas in F5 (=B9), G5 (=B10), H5 (=B11) | Column Input = B6",
    formula: "Select E5:H16 > Data > What-If Analysis > Data Table > Column Input Cell: B6 > {=TABLE(, B6)}",
    explanation: "One-Variable Data Tables support unlimited output columns! Simply place each desired formula in adjacent header cells (F5, G5, H5) in the top row.",
    sheetRef: "Ex1_Loan_Interest_EMI"
  },
  {
    title: "Custom Number Masking for Professional Headers",
    difficulty: "Intermediate",
    category: "Executive Formatting",
    scenario: "In cell F5, the formula =B9 displays the raw number ₹43,391.13 in the table header. Apply a custom format mask so the cell visually displays 'Monthly EMI' without breaking the formula link.",
    grid: "Cell F5 contains formula =B9 | Target Display: 'Monthly EMI'",
    formula: "Right-click F5 > Format Cells > Number > Custom > Type: ;;;'Monthly EMI'",
    explanation: "The three semicolons (;;;) suppress the display of positive, negative, and zero numbers, replacing them with the custom text string while keeping the active formula reference intact.",
    sheetRef: "Ex1_Loan_Interest_EMI"
  },
  {
    title: "Discount Rate (WACC) Sensitivity on Project NPV",
    difficulty: "Intermediate",
    category: "Capital Budgeting",
    scenario: "A capital expenditure model evaluates a ₹1 Crore factory investment yielding 5 years of cash flows. In cell B13, Project NPV is calculated using =NPV(B12, B6:B10) + B5. Construct a data table testing discount rates from 8% to 22% to find the zero-NPV hurdle rate (IRR = 21.4%).",
    grid: "Inputs in E6:E14 (8% to 22%) | Output Formula in F5 (=B13) | Column Input = $B$12",
    formula: "Select E5:F14 > Data > What-If Analysis > Data Table > Column Input: B12 > {=TABLE(, B12)}",
    explanation: "As discount rates rise, NPV declines. The table reveals the exact discount rate (21.4%) where NPV transitions to zero (the internal rate of return).",
    sheetRef: "Ex4_Capex_WACC_NPV"
  },
  {
    title: "Break-Even Sales Volume Sensitivity on EBIT",
    difficulty: "Intermediate",
    category: "Cost Accounting",
    scenario: "Evaluate operating leverage by testing manufacturing volume steps from 5,000 units to 25,000 units against Net Operating EBIT in cell B11.",
    grid: "Inputs in E6:E14 (5,000 to 25,000) | Output in F5 (=B11) | Column Input = $B$8 (Units Produced)",
    formula: "Select E5:F14 > Data > What-If Analysis > Data Table > Column Input: B8 > {=TABLE(, B8)}",
    explanation: "Tests the impact of fixed overhead absorption across production volumes, clearly identifying the 15,000 unit zero-EBIT break-even milestone.",
    sheetRef: "Ex3_BreakEven_Production"
  },
  {
    title: "Commercial Real Estate Occupancy Rate vs Net Rental Yield",
    difficulty: "Advanced",
    category: "Real Estate Financials",
    scenario: "A commercial business park generates revenue based on occupancy % in cell B7. Build a data table testing occupancy from 60% to 100% against Gross Rental Income (=B9), Net Operating Income (=B11), and DSCR Ratio (=B13).",
    grid: "Inputs in E6:E14 | Formulas in F5 (=B9), G5 (=B11), H5 (=B13) | Column Input = $B$7",
    formula: "Select E5:H14 > Data > What-If Analysis > Data Table > Column Input: B7 > {=TABLE(, B7)}",
    explanation: "Allows asset managers to assess debt service coverage ratio (DSCR) safety buffers under economic downturn and tenant vacancy stress scenarios.",
    sheetRef: "Ex5_RealEstate_Occupancy"
  },
  {
    title: "Forex Exchange Rate Sensitivity Matrix (USD/INR)",
    difficulty: "Advanced",
    category: "Treasury & Forex",
    scenario: "An export-import firm models net margin based on USD/INR exchange rate in cell B8. Construct a sensitivity table testing exchange rates from ₹80.00 to ₹90.00 in ₹1.00 increments driving Landed Cost (=B9), Export Revenue (=B10), and Net Forex Margin (=B11).",
    grid: "Inputs in E6:E15 (80 to 90) | Formulas in F5 (=B9), G5 (=B10), H5 (=B11) | Column Input = $B$8",
    formula: "Select E5:H15 > Data > What-If Analysis > Data Table > Column Input: B8 > {=TABLE(, B8)}",
    explanation: "Identifies the foreign exchange risk threshold where rupee appreciation or depreciation flips export contracts into operating losses.",
    sheetRef: "Ex6_Multi_Output_FX"
  },
  {
    title: "Optimizing Performance: Automatic Except Data Tables",
    difficulty: "Advanced",
    category: "Performance Tuning",
    scenario: "A 50,000-row financial model experiences 3-second calculation freezes on every cell edit due to 4 large One-Variable Data Tables. Configure Excel's calculation engine to prevent background lag while maintaining on-demand table updates.",
    grid: "Excel Ribbon: Formulas > Calculation Options > Automatic Except for Data Tables",
    formula: "Formulas Tab > Calculation Options > Select 'Automatic Except for Data Tables' > Press F9 to refresh tables",
    explanation: "Stops Excel from recalculating heavy iterative Data Table matrix loops during routine data entry, running sensitivity passes only when F9 is manually pressed.",
    sheetRef: "Ex8_Performance_Tuning"
  },
  {
    title: "Auditing & Deleting an Immutable Data Table Array",
    difficulty: "Advanced",
    category: "Array Troubleshooting",
    scenario: "You need to modify the layout of an existing One-Variable Data Table occupying E5:H16, but pressing Delete on cell F7 triggers 'Cannot change part of a data table'. Execute the correct procedure to clear the array.",
    grid: "Table bounds = E5:H16 | Result cells = F6:H16",
    formula: "Select the entire result block F6:H16 (or full table E5:H16) > Press Delete",
    explanation: "Because {=TABLE()} is an indivisible multi-cell array formula, individual cells cannot be edited or cleared in isolation. The entire result range must be selected simultaneously.",
    sheetRef: "Ex1_Loan_Interest_EMI"
  }
];

// Interactive Sandbox Calculator Helper
function calcEmi(principal, annualRate, years) {
  const r = annualRate / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  const pvif = Math.pow(1 + r, n);
  return (r * principal * pvif) / (pvif - 1);
}

export default function Topic2() {
  const sectionsRef = useRef([]);
  const [openPracticeIdx, setOpenPracticeIdx] = useState(0);

  // Live Interactive Simulator State
  const [simPrincipal, setSimPrincipal] = useState(5000000);
  const [simTenureYears, setSimTenureYears] = useState(20);
  const [simActiveRate, setSimActiveRate] = useState(0.085);

  const scenarioRates = [0.070, 0.075, 0.080, 0.085, 0.090, 0.095, 0.100, 0.105, 0.110, 0.115, 0.120];

  const currentEmi = calcEmi(simPrincipal, simActiveRate, simTenureYears);
  const currentTotalPayment = currentEmi * simTenureYears * 12;
  const currentTotalInterest = currentTotalPayment - simPrincipal;

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
    link.download = "data_table_one_variable_master.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
              📊 1-Variable Data Tables · Topic 2
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-[10px] font-semibold">
              What-If Sensitivity Modeling
            </span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-[10px] font-semibold">
              Advanced · Bloom Level 4: Analyze
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-snug">
            Single Dimension (One-Variable) Data Tables: Step-by-Step Project Masterclass
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed max-w-5xl">
            Never struggle with Single Dimension Data Tables again. This masterclass breaks down the exact mechanics of <code className="text-sky-300 font-mono font-bold">One-Variable Data Tables</code> in Microsoft Excel through a real-world enterprise project, complete visual geometry rules, interactive browser simulators, and downloadable corporate workbooks.
          </p>

          <div className="mt-3 pt-2.5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-sky-400 font-bold">✓</span>
              <span><strong>Code:</strong> EXCEL-PRO-901</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Module:</strong> What-If Analysis &amp; Optimization</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-indigo-400 font-bold">✓</span>
              <span><strong>Center:</strong> Coder &amp; AccoTax</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: WHY STUDENTS GET CONFUSED & THE "SHADOW SANDBOX" CONCEPT
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-200 space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 text-sm font-mono">🧠</span>
                How a Single Dimension Data Table Actually Works (Plain English)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                The intuitive "Shadow Sandbox" concept that makes the Excel Data Table engine crystal clear.
              </p>
            </div>
            <span className="text-[11px] font-mono text-sky-300 bg-sky-950/60 px-2.5 py-0.5 rounded-lg border border-sky-800 shrink-0">
              Core Mental Model
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2 text-rose-400 font-bold">
                <span>❌</span> Why Traditional Methods Fail in Excel Projects:
              </div>
              <p className="text-slate-300 leading-relaxed text-xs">
                When a manager asks: <em>"What will our loan EMI and total interest be if the bank rate changes to 7%, 8%, 9%, 10%, or 11%?"</em>, novice students either:
              </p>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
                <li>Manually retype each rate into cell B6, write down the answer on paper, and repeat 10 times.</li>
                <li>Copy-paste the entire calculation model 10 times into 10 duplicate columns or worksheets, creating model bloat and broken formula links.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span>✅</span> The "Shadow Sandbox" Engine:
              </div>
              <p className="text-slate-300 leading-relaxed text-xs">
                A <strong>Single Dimension Data Table</strong> is an automated loop engine. You give Excel:
              </p>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                <li><strong>1 Target Input Cell:</strong> (e.g. Cell <code className="text-sky-300 font-mono font-bold">$B$6</code>: Interest Rate).</li>
                <li><strong>1 List of Scenario Values:</strong> (e.g. 7.0%, 7.5%, 8.0%, 8.5%...).</li>
                <li><strong>1 or More Output Formulas:</strong> (e.g. EMI in <code className="text-emerald-300 font-mono font-bold">=B9</code>).</li>
              </ul>
              <p className="text-[11px] text-sky-300 bg-sky-950/40 p-2 rounded border border-sky-900/60 leading-relaxed">
                Excel takes each rate from your list, temporarily injects it into cell $B$6 in shadow memory, recalculates the formula, writes the result in your table, and leaves your base cell $B$6 completely untouched!
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: THE 4 GOLDEN RULES OF DATA TABLE GEOMETRY
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-200 space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 text-sm font-mono">📐</span>
                The 4 Golden Rules of Single Dimension Table Geometry
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Follow these 4 spatial rules every time. Violating any rule causes 100% of student mistakes.
              </p>
            </div>
            <span className="text-[11px] font-mono text-amber-300 bg-amber-950/60 px-2.5 py-0.5 rounded-lg border border-amber-800 shrink-0">
              Anatomy Rules
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-sky-300 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-sky-950 border border-sky-700 text-sky-300 flex items-center justify-center text-[10px]">1</span>
                Rule 1: List Inputs in 1 Column
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Place your scenario numbers (e.g. 7.0%, 7.5%, 8.0%) vertically down a single column (e.g. <code>E6:E16</code>). Leave the top-left cell <code>E5</code> empty or as a text label.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 flex items-center justify-center text-[10px]">2</span>
                Rule 2: Link Formulas in Top Row
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                In the row directly above the first result cell (Row 5), write formula links: <code>F5: =B9</code> (Monthly EMI), <code>G5: =B10</code> (Total Outflow). <strong>Never type static numbers here!</strong>
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-teal-300 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-teal-950 border border-teal-700 text-teal-300 flex items-center justify-center text-[10px]">3</span>
                Rule 3: Select Full Rectangle
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Highlight the entire rectangular block from the top header row down to the last scenario row (e.g. <code>E5:G16</code>). Both inputs and formulas must be in the selection.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-purple-300 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-purple-950 border border-purple-700 text-purple-300 flex items-center justify-center text-[10px]">4</span>
                Rule 4: Dialog Assignment
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                For a vertical list of inputs: Leave <strong>Row input cell BLANK</strong>. In <strong>Column input cell</strong>, select the original variable cell (<code>$B$6</code>).
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE LIVE SINGLE DIMENSION DATA TABLE SIMULATOR
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 border border-slate-800 space-y-4 shadow-lg"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 text-sm font-mono">⚡</span>
                Interactive Sandbox: Live Single Dimension Sensitivity Simulator
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Adjust the base loan parameters below to watch the entire sensitivity matrix recalculate live in real time!
              </p>
            </div>
            <span className="text-[11px] font-mono text-indigo-300 bg-indigo-950/80 px-2.5 py-0.5 rounded-lg border border-indigo-700 shrink-0">
              Live Engine
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs">
            {/* Base Model Controller (4 Cols) */}
            <div className="lg:col-span-4 p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3.5">
              <div className="font-bold text-sky-300 text-xs uppercase tracking-wider border-b border-slate-800 pb-1.5 flex items-center justify-between">
                <span>Base Model Parameters</span>
                <span className="text-[10px] text-slate-500 font-mono">Inputs (Col B)</span>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 text-[11px] font-medium flex justify-between">
                  <span>Loan Principal (₹):</span>
                  <span className="font-mono text-sky-400 font-bold">₹{simPrincipal.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min={1000000}
                  max={20000000}
                  step={500000}
                  value={simPrincipal}
                  onChange={(e) => setSimPrincipal(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 text-[11px] font-medium flex justify-between">
                  <span>Base Interest Rate (%):</span>
                  <span className="font-mono text-emerald-400 font-bold">{(simActiveRate * 100).toFixed(2)}%</span>
                </label>
                <input
                  type="range"
                  min={0.06}
                  max={0.15}
                  step={0.0025}
                  value={simActiveRate}
                  onChange={(e) => setSimActiveRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 text-[11px] font-medium flex justify-between">
                  <span>Loan Tenure (Years):</span>
                  <span className="font-mono text-indigo-400 font-bold">{simTenureYears} Years ({simTenureYears * 12} Mths)</span>
                </label>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={simTenureYears}
                  onChange={(e) => setSimTenureYears(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                />
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 space-y-1.5 text-[11px]">
                <div className="text-slate-400 font-bold uppercase text-[10px]">Base Output Metrics:</div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Monthly EMI (B9):</span>
                  <span className="font-mono text-sky-300 font-bold">₹{Math.round(currentEmi).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Total Outflow (B10):</span>
                  <span className="font-mono text-emerald-300 font-bold">₹{Math.round(currentTotalPayment).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Total Interest (B11):</span>
                  <span className="font-mono text-amber-300 font-bold">₹{Math.round(currentTotalInterest).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Generated Data Table Grid (8 Cols) */}
            <div className="lg:col-span-8 p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <div className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                  <span>Generated Data Table Array:</span>
                  <code className="text-teal-300 font-mono text-[11px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {"{=TABLE(, B6)}"}
                  </code>
                </div>
                <span className="text-[10px] text-slate-400">11 Iterative Scenario Passes</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse font-mono">
                  <thead>
                    <tr className="bg-slate-900/90 text-slate-300 border-b border-slate-800">
                      <th className="py-2 px-3 text-slate-400">Rate Scenario (Col E)</th>
                      <th className="py-2 px-3 text-sky-400">
                        =B9 <span className="text-[10px] text-slate-500 block font-sans">Monthly EMI</span>
                      </th>
                      <th className="py-2 px-3 text-emerald-400">
                        =B10 <span className="text-[10px] text-slate-500 block font-sans">Total Payment</span>
                      </th>
                      <th className="py-2 px-3 text-amber-400">
                        =B11 <span className="text-[10px] text-slate-500 block font-sans">Lifetime Interest</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {scenarioRates.map((r, i) => {
                      const eVal = calcEmi(simPrincipal, r, simTenureYears);
                      const totVal = eVal * simTenureYears * 12;
                      const intVal = totVal - simPrincipal;
                      const isBase = Math.abs(r - simActiveRate) < 0.002;

                      return (
                        <tr
                          key={i}
                          className={`transition-colors ${
                            isBase
                              ? "bg-sky-950/60 font-bold text-white border-l-2 border-sky-400"
                              : "hover:bg-slate-900/50 text-slate-300"
                          }`}
                        >
                          <td className="py-1.5 px-3">
                            {(r * 100).toFixed(2)}% {isBase && <span className="text-[10px] text-sky-400 font-sans ml-1">(Active Base)</span>}
                          </td>
                          <td className="py-1.5 px-3 text-sky-300">₹{Math.round(eVal).toLocaleString()}</td>
                          <td className="py-1.5 px-3 text-emerald-300">₹{Math.round(totVal).toLocaleString()}</td>
                          <td className="py-1.5 px-3 text-amber-300">₹{Math.round(intVal).toLocaleString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: COMPLETE END-TO-END PROJECT WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm font-mono">💼</span>
                End-to-End Project Walkthrough: Commercial EV Fleet Debt Model
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Follow this exact step-by-step corporate workflow to construct your Single Dimension Data Table from scratch.
              </p>
            </div>
            <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/60 px-2.5 py-0.5 rounded-lg border border-emerald-800 shrink-0">
              Project Workflow
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sky-300 flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 rounded-full bg-sky-950 border border-sky-600 text-sky-300 flex items-center justify-center text-xs">1</span>
                  Step 1: Lay Out the Base Model in Cells A4:C11
                </span>
                <span className="text-[11px] font-mono text-slate-400">Base Model Setup</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-xs">
                In Excel, set up your base financial variables in Column B and calculations using live formulas:
              </p>
              <div className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
                <div>• Cell <strong>B5</strong>: <code className="text-sky-300 font-bold">5000000</code> (Loan Principal)</div>
                <div>• Cell <strong>B6</strong>: <code className="text-sky-300 font-bold">8.50%</code> (Annual Interest Rate - <em>THIS IS YOUR SCENARIO TARGET CELL</em>)</div>
                <div>• Cell <strong>B7</strong>: <code className="text-sky-300 font-bold">20</code> (Loan Tenure in Years)</div>
                <div>• Cell <strong>B8</strong>: <code className="text-emerald-300 font-bold">=B7*12</code> (Tenure in Months = 240)</div>
                <div>• Cell <strong>B9</strong>: <code className="text-emerald-300 font-bold">=PMT(B6/12, B8, -B5)</code> (Monthly EMI = ₹43,391.13)</div>
                <div>• Cell <strong>B10</strong>: <code className="text-emerald-300 font-bold">=B9*B8</code> (Total Outflow = ₹1,04,13,871.20)</div>
                <div>• Cell <strong>B11</strong>: <code className="text-emerald-300 font-bold">=B10-B5</code> (Total Interest Paid = ₹54,13,871.20)</div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-300 flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-600 text-emerald-300 flex items-center justify-center text-xs">2</span>
                  Step 2: Build the Sensitivity Table Shell in Columns E:H
                </span>
                <span className="text-[11px] font-mono text-slate-400">Grid Shell Setup</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-xs">
                In Column E, list your test rates down rows 6 through 16: <code className="text-sky-300">7.0%, 7.5%, 8.0%, 8.5%, 9.0%, 9.5%, 10.0%, 10.5%, 11.0%, 11.5%, 12.0%</code>.
              </p>
              <p className="text-slate-300 leading-relaxed text-xs">
                In the top header row (Row 5), write the formula links:
              </p>
              <div className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
                <div>• Cell <strong>F5</strong>: <code className="text-emerald-300 font-bold">=B9</code> (Links to Monthly EMI)</div>
                <div>• Cell <strong>G5</strong>: <code className="text-emerald-300 font-bold">=B10</code> (Links to Total Outflow)</div>
                <div>• Cell <strong>H5</strong>: <code className="text-emerald-300 font-bold">=B11</code> (Links to Total Interest)</div>
              </div>
            </div>

            {/* Step 3 & 4 */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300 flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 rounded-full bg-amber-950 border border-amber-600 text-amber-300 flex items-center justify-center text-xs">3</span>
                  Step 3 &amp; 4: Select Range &amp; Launch Data Table Dialog
                </span>
                <span className="text-[11px] font-mono text-slate-400">Execution</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-xs">
                1. Select the entire rectangular block: <code className="text-amber-300 font-mono font-bold">E5:H16</code>.
              </p>
              <p className="text-slate-300 leading-relaxed text-xs">
                2. On the Ribbon, click <strong>Data Tab &gt; Forecast Group &gt; What-If Analysis &gt; Data Table...</strong> (or press shortcut <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-cyan-300 font-mono text-[10px]">Alt + A + W + T</kbd>).
              </p>
              <p className="text-slate-300 leading-relaxed text-xs">
                3. In the popup dialog:
              </p>
              <div className="p-3 rounded-lg bg-slate-900 font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
                <div>• <strong>Row input cell:</strong> <span className="text-rose-400 font-bold">(LEAVE COMPLETELY BLANK!)</span></div>
                <div>• <strong>Column input cell:</strong> Click on cell <code className="text-cyan-300 font-bold">$B$6</code> (the baseline Annual Interest Rate)</div>
                <div>• Click <strong>OK</strong>.</div>
              </div>
              <p className="text-xs text-emerald-300">
                ✨ Excel instantly fills cells F6:H16 with dynamic calculation array <code className="font-mono">{"{=TABLE(, B6)}"}</code>!
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-300 flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 rounded-full bg-purple-950 border border-purple-600 text-purple-300 flex items-center justify-center text-xs">5</span>
                  Step 5: Apply Executive Custom Format Masking
                </span>
                <span className="text-[11px] font-mono text-slate-400">Formatting Polish</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-xs">
                Currently, cell F5 shows the number ₹43,391.13 in your header. To make your table look clean and executive without breaking the formula:
              </p>
              <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                <li>Select cell <strong>F5</strong> &gt; Press <kbd className="px-1 py-0.5 bg-slate-800 rounded text-cyan-300 font-mono text-[10px]">Ctrl + 1</kbd> &gt; Click <strong>Custom</strong>.</li>
                <li>In the <strong>Type</strong> box, enter: <code className="text-purple-300 font-mono font-bold">;;;&quot;Monthly EMI&quot;</code>.</li>
                <li>Format cell <strong>G5</strong> as: <code className="text-purple-300 font-mono font-bold">;;;&quot;Total Outflow&quot;</code>.</li>
                <li>Format cell <strong>H5</strong> as: <code className="text-purple-300 font-mono font-bold">;;;&quot;Lifetime Interest&quot;</code>.</li>
              </ul>
              <p className="text-[11px] text-slate-400">
                💡 The three semicolons (<code>;;;</code>) hide positive, negative, and zero values, displaying only your custom text while keeping the formula connection 100% active!
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: DEDICATED DEMONSTRATION WORKBOOK & DIRECT DOWNLOAD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm font-mono">📥</span>
                Dedicated One-Variable Data Table Practice Workbook
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Explore all 7 interactive sheets below or download the dedicated <code className="text-emerald-300 font-mono">data_table_one_variable_master.xlsx</code> file to practice in desktop Excel.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all duration-200 shadow-md shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              title="Download the dedicated 10-sheet Data Table practice workbook (.xlsx)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download 7-Sheet Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="Ex1_Loan_Interest_EMI"
            title="1-Variable Data Table Demonstration Master"
            rowsPerPage={14}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 7: 10 INTERACTIVE HANDS-ON PRACTICE CHALLENGES
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 text-sm font-mono">🎯</span>
                10 Practical Hands-On Exercises for 1-Variable Data Tables
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Test your modeling skills across these 10 exercises. Click to reveal exact table ranges, input assignments, and formula syntax.
              </p>
            </div>
            <span className="text-[11px] font-mono text-sky-300 bg-sky-950/60 px-2.5 py-0.5 rounded-lg border border-sky-800 shrink-0">
              10 Practice Exercises
            </span>
          </div>

          <div className="space-y-3">
            {practiceChallenges.map((item, idx) => {
              const isExpanded = openPracticeIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all duration-200 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenPracticeIdx(isExpanded ? null : idx)}
                    className="w-full p-3.5 sm:p-4 flex items-start sm:items-center justify-between gap-3 text-left hover:bg-slate-900/40 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold font-mono bg-sky-950 border border-sky-800/80 text-sky-300">
                          Exercise {idx + 1}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                            item.difficulty === "Beginner"
                              ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800/60"
                              : item.difficulty === "Intermediate"
                              ? "bg-amber-950/80 text-amber-300 border border-amber-800/60"
                              : "bg-indigo-950/80 text-indigo-300 border border-indigo-800/60"
                          }`}
                        >
                          {item.difficulty}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-white text-xs sm:text-sm">
                        {item.title}
                      </h3>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-sky-400 hidden sm:inline-block">
                        {isExpanded ? "Hide Solution" : "Reveal Solution"}
                      </span>
                      <div className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 text-xs">
                        {isExpanded ? "▲" : "▼"}
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-3.5 sm:p-5 border-t border-slate-800/80 bg-slate-900/30 space-y-3 text-xs">
                      <div className="space-y-1">
                        <strong className="text-amber-400 uppercase tracking-wider text-[10px] block">
                          Problem Scenario:
                        </strong>
                        <p className="text-slate-300 leading-relaxed">
                          {item.scenario}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 font-mono text-[11px] text-slate-300">
                        <span className="text-slate-400">Grid Setup: </span>
                        {item.grid}
                      </div>

                      <div className="space-y-1">
                        <strong className="text-emerald-400 uppercase tracking-wider text-[10px] block">
                          Exact Execution Command &amp; Formula:
                        </strong>
                        <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-emerald-300 border border-slate-800 overflow-x-auto shadow-inner">
                          {item.formula}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <strong className="text-sky-300 uppercase tracking-wider text-[10px] block">
                          Technical Walkthrough &amp; Explanation:
                        </strong>
                        <p className="text-slate-300 leading-relaxed">
                          {item.explanation}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-slate-400 text-[11px] font-mono">
                        <span>Workbook Reference Sheet:</span>
                        <span className="text-cyan-300 font-bold">{item.sheetRef}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: COMMON MISTAKES & STUDENT DIAGNOSTIC MATRIX
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 text-sm font-mono">⚠️</span>
              Why Single Dimension Data Tables Fail: Student Diagnostic Matrix
            </h2>
            <span className="text-[11px] font-mono text-rose-300 bg-rose-950/60 px-2.5 py-0.5 rounded-lg border border-rose-800">
              Diagnostic Guide
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-2.5 px-3">Symptom / Error Encountered</th>
                  <th className="py-2.5 px-3">What the Student Did Wrong</th>
                  <th className="py-2.5 px-3">The Exact 5-Second Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-300">All rows show identical numbers</td>
                  <td className="py-2.5 px-3">Placed the cell reference into 'Row input cell' instead of 'Column input cell'.</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">Leave Row Input BLANK; select Column Input ($B$6).</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-300">"Cannot change part of a data table"</td>
                  <td className="py-2.5 px-3">Tried to edit, delete, or re-type a single cell inside the table array.</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">Select the entire result block (F6:H16) and press Delete.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-300">Results show 0 or blank</td>
                  <td className="py-2.5 px-3">Put formula =B9 inside cell F6 instead of top header cell F5.</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">Move formula link to Row 5 directly above the result list.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-300">Top header shows ugly number</td>
                  <td className="py-2.5 px-3">Left raw formula output visible without custom format masking.</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">Format cell as Custom: ;;;"Monthly EMI".</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: FREQUENTLY ASKED QUESTIONS (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[8] = el)} className="reveal-section">
          <FAQTemplate
            title="Single Dimension Data Tables - Comprehensive Mastery Q&amp;A"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 10: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[9] = el)} className="reveal-section">
          <Teacher
            note="Single Dimension Data Tables are the cornerstone of executive sensitivity modeling! Remember the Golden Rule: If your scenario inputs run vertically down a column, leave Row Input Cell BLANK, point Column Input Cell to your original model variable ($B$6), and mask your header formulas with ;;;'Header Name' for a clean, executive presentation."
          />
        </div>
      </div>
    </div>
  );
}
