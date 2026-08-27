"use client";

import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/what_if_analysis_and_scenario_planning_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

const practiceChallenges = [
  {
    title: "Loan Interest Rate Sensitivity Table",
    difficulty: "Beginner",
    category: "Column-Oriented Table",
    scenario: "Given a baseline loan model with Principal in B2, Interest Rate in B3, and Tenure in B4, construct a One-Variable Data Table testing interest rates from 7.0% to 11.0% in 0.5% steps to evaluate Monthly EMI in cell B6.",
    grid: "Inputs in D6:D14 | Output Formula in E5 (=B6) | Column Input Cell = $B$3",
    formula: "Range selected: D5:E14 > Data > What-If Analysis > Data Table > Column Input Cell: B3 > {=TABLE(, B3)}",
    explanation: "Because the scenario rates run down Column D, the table is column-oriented. The formula =B6 must sit in E5 (top row of output column). Column Input Cell is set to B3.",
    sheetRef: "Topic2_One_Variable_Data_"
  },
  {
    title: "Row-Oriented Product Price Sensitivity Table",
    difficulty: "Beginner",
    category: "Row-Oriented Table",
    scenario: "In a pricing model where Unit Price is stored in cell B2 and Net Profit is calculated in B8, create a row-oriented sensitivity table testing prices of ₹800, ₹1,000, ₹1,200, ₹1,400 across cells E4:H4.",
    grid: "Inputs in E4:H4 (horizontal) | Output Formula in D5 (=B8) | Row Input Cell = $B$2",
    formula: "Range selected: D4:H5 > Data > What-If Analysis > Data Table > Row Input Cell: B2 > {=TABLE(B2, )}",
    explanation: "Because input price steps run horizontally across Row 4, the table is row-oriented. The output formula =B8 must sit in D5 (leading column). Row Input Cell is set to B2.",
    sheetRef: "Topic2_One_Variable_Data_"
  },
  {
    title: "Multi-Output Sensitivity Evaluation (EMI, Total Outflow, Interest)",
    difficulty: "Intermediate",
    category: "Multi-Output Table",
    scenario: "Build a single One-Variable Data Table that simultaneously evaluates 3 outputs: Monthly EMI (=B6), Total Outflow (=B7), and Total Interest Paid (=B8) across 10 interest rate scenarios.",
    grid: "Inputs in D6:D15 | Header Formulas in E5 (=B6), F5 (=B7), G5 (=B8) | Column Input = B3",
    formula: "Select D5:G15 > Data > What-If Analysis > Data Table > Column Input Cell: B3 > {=TABLE(, B3)}",
    explanation: "One-Variable Data Tables support unlimited output columns! Simply place each desired formula in adjacent header cells (E5, F5, G5) in the top row.",
    sheetRef: "Topic2_One_Variable_Data_"
  },
  {
    title: "Custom Number Masking for Professional Headers",
    difficulty: "Intermediate",
    category: "Executive Formatting",
    scenario: "In cell E5, the formula =B6 displays the raw number ₹43,391.13 in the table header. Apply a custom format mask so the cell visually displays 'Monthly EMI' without breaking the formula link.",
    grid: "Cell E5 contains formula =B6 | Target Display: 'Monthly EMI'",
    formula: "Right-click E5 > Format Cells > Number > Custom > Type: ;;;'Monthly EMI'",
    explanation: "The three semicolons (;;;) suppress the display of positive, negative, and zero numbers, replacing them with the custom text string while keeping the active formula reference intact.",
    sheetRef: "Topic2_One_Variable_Data_"
  },
  {
    title: "Discount Rate (WACC) Sensitivity on Project NPV",
    difficulty: "Intermediate",
    category: "Capital Budgeting",
    scenario: "A capital expenditure model evaluates a ₹1 Crore factory investment yielding 5 years of cash flows. In cell B10, Project NPV is calculated using =NPV(B5, C7:G7) + C6. Construct a data table testing discount rates from 8% to 18% to find the zero-NPV hurdle rate.",
    grid: "Inputs in D6:D16 (8% to 18%) | Output Formula in E5 (=B10) | Column Input = $B$5",
    formula: "Select D5:E16 > Data > What-If Analysis > Data Table > Column Input: B5 > {=TABLE(, B5)}",
    explanation: "As discount rates rise, NPV declines. The table reveals the exact discount rate where NPV transitions from positive to negative (the internal rate of return).",
    sheetRef: "Topic2_One_Variable_Data_"
  },
  {
    title: "Break-Even Sales Volume Sensitivity on EBIT",
    difficulty: "Intermediate",
    category: "Cost Accounting",
    scenario: "Evaluate operating leverage by testing sales volume steps from 5,000 units to 25,000 units (in steps of 2,500) against Net EBIT in cell B9.",
    grid: "Inputs in D6:D14 (5,000 to 25,000) | Output in E5 (=B9) | Column Input = $B$2 (Units Sold)",
    formula: "Select D5:E14 > Data > What-If Analysis > Data Table > Column Input: B2 > {=TABLE(, B2)}",
    explanation: "Tests the impact of fixed overhead absorption across production volumes, clearly marking the zero-EBIT break-even production volume.",
    sheetRef: "Topic2_One_Variable_Data_"
  },
  {
    title: "Commercial Real Estate Occupancy Rate vs Net Rental Yield",
    difficulty: "Advanced",
    category: "Real Estate Financials",
    scenario: "A commercial business park generates revenue based on occupancy % in cell B4. Build a data table testing occupancy from 60% to 100% (in 5% increments) against Gross Rental Income (=B7) and Net Operating Income (=B10).",
    grid: "Inputs in D6:D14 | Formulas in E5 (=B7) and F5 (=B10) | Column Input = $B$4",
    formula: "Select D5:F14 > Data > What-If Analysis > Data Table > Column Input: B4 > {=TABLE(, B4)}",
    explanation: "Allows asset managers to assess debt service coverage ratio (DSCR) safety margins under economic downturn and vacancy stress scenarios.",
    sheetRef: "Topic2_One_Variable_Data_"
  },
  {
    title: "Forex Exchange Rate Sensitivity Matrix (USD/INR)",
    difficulty: "Advanced",
    category: "Treasury & Forex",
    scenario: "An export-import firm models net margin based on USD/INR exchange rate in cell B3. Construct a sensitivity table testing exchange rates from ₹80.00 to ₹90.00 in ₹1.00 increments against Net Margin in INR (=B12).",
    grid: "Inputs in D6:D16 (80 to 90) | Formula in E5 (=B12) | Column Input = $B$3",
    formula: "Select D5:E16 > Data > What-If Analysis > Data Table > Column Input: B3 > {=TABLE(, B3)}",
    explanation: "Identifies the foreign exchange risk threshold where rupee appreciation or depreciation flips export contracts into operating losses.",
    sheetRef: "Topic2_One_Variable_Data_"
  },
  {
    title: "Optimizing Performance: Automatic Except Data Tables",
    difficulty: "Advanced",
    category: "Performance Tuning",
    scenario: "A 50,000-row financial model experiences 3-second calculation freezes on every cell edit due to 4 large One-Variable Data Tables. Configure Excel's calculation engine to prevent background lag while maintaining on-demand table updates.",
    grid: "Excel Ribbon: Formulas > Calculation Options > Automatic Except for Data Tables",
    formula: "Formulas Tab > Calculation Options > Select 'Automatic Except for Data Tables' > Press F9 to refresh tables",
    explanation: "Stops Excel from recalculating heavy iterative Data Table matrix loops during routine data entry, running sensitivity passes only when F9 is manually pressed.",
    sheetRef: "Topic2_One_Variable_Data_"
  },
  {
    title: "Auditing & Deleting an Immutable Data Table Array",
    difficulty: "Advanced",
    category: "Array Troubleshooting",
    scenario: "You need to modify the layout of an existing One-Variable Data Table occupying D5:G16, but pressing Delete on cell E7 triggers 'Cannot change part of a data table'. Execute the correct procedure to clear the array.",
    grid: "Table bounds = D5:G16 | Result cells = E6:G16",
    formula: "Select the entire result block E6:G16 (or full table D5:G16) > Press Delete",
    explanation: "Because {=TABLE()} is an indivisible multi-cell array formula, individual cells cannot be edited or cleared in isolation. The entire result range must be selected simultaneously.",
    sheetRef: "Topic2_One_Variable_Data_"
  }
];

export default function Topic2() {
  const sectionsRef = useRef([]);
  const [openPracticeIdx, setOpenPracticeIdx] = useState(0);

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
    link.download = "what_if_analysis_and_scenario_planning_master.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      <style>{`
        @keyframes fadeInSlide {
          from { transform: translateY(18px); }
          to { transform: translateY(0); }
        }
        .reveal-section {
          animation: fadeInSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="w-full space-y-4">
        {/* =========================================================================
            SECTION 1: HERO HEADER & OVERVIEW (COMPACT)
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
            One-Variable Data Tables: Testing Single Parameter Sensitivities
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed max-w-5xl">
            Master the mechanics of <code className="text-sky-300 font-mono font-bold">One-Variable Data Tables</code> in Microsoft Excel. Evaluate multiple financial outputs simultaneously (EMI, Net Margin, Project NPV, Break-Even Volume) across varying input scenarios, format professional custom number masks, and optimize calculation speeds.
          </p>

          <div className="mt-3 pt-2.5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-sky-400 font-bold">✓</span>
              <span><strong>Code:</strong> EXCEL-PRO-901</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Module:</strong> What-If Analysis</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-indigo-400 font-bold">✓</span>
              <span><strong>Center:</strong> Coder &amp; AccoTax</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: DATA TABLE ARCHITECTURE CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-200 space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg text-sm bg-sky-500/20 text-sky-400 text-base font-mono">⚡</span>
              The One-Variable Data Table Architecture
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              Syntax Geometry
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Layout Option A</span>
                <span className="text-xs font-mono text-slate-400">Standard Production Format</span>
              </div>
              <h3 className="font-bold text-white text-base">Column-Oriented Data Table</h3>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-sky-300 border border-slate-800">
                {"{=TABLE(, ColumnInputCell)}"}
              </div>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 leading-relaxed">
                <li>• <strong>Scenario Values:</strong> Listed vertically down a single column (e.g. D6:D16).</li>
                <li>• <strong>Output Formulas:</strong> Placed in the top row (E5, F5, G5) to the right.</li>
                <li>• <strong>Dialog Setting:</strong> Leave Row Input Cell blank; set Column Input Cell.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Layout Option B</span>
                <span className="text-xs font-mono text-slate-400">Horizontal Timeline Format</span>
              </div>
              <h3 className="font-bold text-white text-base">Row-Oriented Data Table</h3>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-teal-300 border border-slate-800">
                {"{=TABLE(RowInputCell, )}"}
              </div>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 leading-relaxed">
                <li>• <strong>Scenario Values:</strong> Listed horizontally across a single row (e.g. E4:H4).</li>
                <li>• <strong>Output Formulas:</strong> Placed in the leading column (D5, D6, D7) below.</li>
                <li>• <strong>Dialog Setting:</strong> Set Row Input Cell; leave Column Input Cell blank.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: INTERACTIVE SVG DATAFLOW PIPELINE
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg text-sm bg-indigo-500/20 text-indigo-400 text-base font-mono">📐</span>
              Iterative Substitution &amp; Calculation Pipeline
            </h2>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800">
              Calculation Engine
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/80 flex flex-col items-center justify-center overflow-x-auto shadow-inner">
            <svg viewBox="0 0 840 230" className="w-full max-w-4xl h-auto text-slate-200 select-none font-sans">
              <defs>
                <marker id="arrowDataTbl" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8" />
                </marker>
              </defs>

              {/* Step 1: Scenario Input List */}
              <g transform="translate(20, 35)">
                <rect width="180" height="160" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                <rect x="12" y="12" width="156" height="26" rx="6" fill="#1e293b" />
                <text x="90" y="30" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">1. Scenario Inputs (Col D)</text>
                <text x="90" y="70" textAnchor="middle" fill="#38bdf8" fontSize="13" fontFamily="monospace">7.00%</text>
                <text x="90" y="95" textAnchor="middle" fill="#38bdf8" fontSize="13" fontFamily="monospace">8.50% (Base)</text>
                <text x="90" y="120" textAnchor="middle" fill="#38bdf8" fontSize="13" fontFamily="monospace">10.00%</text>
                <text x="90" y="145" textAnchor="middle" fill="#38bdf8" fontSize="13" fontFamily="monospace">11.50%</text>
              </g>

              {/* Injection Arrow */}
              <path d="M 205 115 L 285 115" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrowDataTbl)" fill="none" />
              <text x="245" y="100" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontFamily="monospace">Inject Input</text>

              {/* Step 2: Base Financial Model */}
              <g transform="translate(295, 25)">
                <rect width="250" height="180" rx="14" fill="#0c4a6e" stroke="#0284c7" strokeWidth="2" />
                <rect x="14" y="14" width="222" height="28" rx="6" fill="#0369a1" />
                <text x="125" y="33" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">2. Base Financial Model</text>
                <text x="125" y="75" textAnchor="middle" fill="#bae6fd" fontSize="11">Input Cell: $B$3 (Interest Rate)</text>
                <text x="125" y="105" textAnchor="middle" fill="#7dd3fc" fontSize="12" fontFamily="monospace" fontWeight="bold">=PMT(B3/12, B5, -B2)</text>
                <text x="125" y="135" textAnchor="middle" fill="#bae6fd" fontSize="10">Iterative Shadow Calculation</text>
                <text x="125" y="155" textAnchor="middle" fill="#38bdf8" fontSize="9" fontStyle="italic">Preserves original B3 value</text>
              </g>

              {/* Output Arrow */}
              <path d="M 550 115 L 620 115" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrowDataTbl)" fill="none" />
              <text x="585" y="100" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontFamily="monospace">Emit Output</text>

              {/* Step 3: Result Matrix */}
              <g transform="translate(630, 35)">
                <rect width="190" height="160" rx="12" fill="#064e3b" stroke="#059669" strokeWidth="2" />
                <rect x="10" y="12" width="170" height="26" rx="6" fill="#047857" />
                <text x="95" y="30" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">3. Data Table Output Grid</text>
                <text x="95" y="70" textAnchor="middle" fill="#6ee7b7" fontSize="13" fontFamily="monospace">₹38,764.91</text>
                <text x="95" y="95" textAnchor="middle" fill="#6ee7b7" fontSize="13" fontFamily="monospace">₹43,391.13</text>
                <text x="95" y="120" textAnchor="middle" fill="#6ee7b7" fontSize="13" fontFamily="monospace">₹48,251.05</text>
                <text x="95" y="145" textAnchor="middle" fill="#6ee7b7" fontSize="13" fontFamily="monospace">₹53,319.14</text>
              </g>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: 6 COMPREHENSIVE REAL-WORLD BUSINESS EXAMPLES
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg text-sm bg-emerald-500/20 text-emerald-400 text-base font-mono">📚</span>
              6 Real-World Business Applications &amp; Examples
            </h2>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Practical Masterclass
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Example 1 */}
            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Example 1</span>
                <span className="text-xs font-mono text-slate-400">Debt &amp; Banking</span>
              </div>
              <h3 className="font-bold text-white text-base">Commercial Loan Interest Rate Sensitivity</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Tests 10 interest rate increments (7.0% to 12.0%) on a ₹50 Lakh term loan to calculate Monthly EMI, Total Outflow, and Lifetime Interest.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-sky-300 border border-slate-800">
                {"{=TABLE(, B3)} // Column Input = Interest Rate"}
              </div>
              <p className="text-xs text-slate-400">Key Benefit: Instantly shows the budget impact of every 50 bps RBI repo rate hike.</p>
            </div>

            {/* Example 2 */}
            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Example 2</span>
                <span className="text-xs font-mono text-slate-400">Pricing Strategy</span>
              </div>
              <h3 className="font-bold text-white text-base">Product Unit Price vs Gross Profit Margin</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Evaluates selling price steps (₹900 to ₹1,500) to measure dynamic changes in Gross Revenue, Variable COGS, and Net Operating Margin.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-teal-300 border border-slate-800">
                {"{=TABLE(, B2)} // Column Input = Unit Selling Price"}
              </div>
              <p className="text-xs text-slate-400">Key Benefit: Pinpoints the optimal price elasticity threshold for maximum profit.</p>
            </div>

            {/* Example 3 */}
            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Example 3</span>
                <span className="text-xs font-mono text-slate-400">Cost Accounting</span>
              </div>
              <h3 className="font-bold text-white text-base">Production Volume Break-Even Sensitivity</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Tests manufacturing unit volume (5,000 to 25,000 units) to identify fixed overhead absorption and the zero-profit break-even point.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-indigo-300 border border-slate-800">
                {"{=TABLE(, B4)} // Column Input = Units Manufactured"}
              </div>
              <p className="text-xs text-slate-400">Key Benefit: Informs plant managers of minimum operating capacity requirements.</p>
            </div>

            {/* Example 4 */}
            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Example 4</span>
                <span className="text-xs font-mono text-slate-400">Corporate Finance</span>
              </div>
              <h3 className="font-bold text-white text-base">Cost of Capital (WACC) on Project NPV</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Evaluates a ₹1 Crore factory expansion across discount rates from 8% to 18% to determine project hurdle rate resilience.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-amber-300 border border-slate-800">
                {"{=TABLE(, B5)} // Column Input = Discount Rate WACC"}
              </div>
              <p className="text-xs text-slate-400">Key Benefit: Highlights the exact discount rate where project Net Present Value hits zero (IRR).</p>
            </div>

            {/* Example 5 */}
            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Example 5</span>
                <span className="text-xs font-mono text-slate-400">Real Estate Assets</span>
              </div>
              <h3 className="font-bold text-white text-base">Commercial Real Estate Occupancy Yield</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Assesses commercial building occupancy rates (60% to 100%) against Gross Rental Yield and Net Operating Income (NOI).
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-emerald-300 border border-slate-800">
                {"{=TABLE(, B4)} // Column Input = Occupancy %"}
              </div>
              <p className="text-xs text-slate-400">Key Benefit: Tests debt service coverage ratio (DSCR) safety buffers during market downturns.</p>
            </div>

            {/* Example 6 */}
            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Example 6</span>
                <span className="text-xs font-mono text-slate-400">Global Treasury</span>
              </div>
              <h3 className="font-bold text-white text-base">Multi-Output USD/INR Forex Sensitivity</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Varies exchange rates (₹80.00 to ₹90.00) driving 3 parallel outputs: Landed Material Cost, Export Realization, and Net Forex Gain/Loss.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-purple-300 border border-slate-800">
                {"{=TABLE(, B3)} // Single input driving 3 header output formulas"}
              </div>
              <p className="text-xs text-slate-400">Key Benefit: Establishes currency hedging triggers for foreign trade exposures.</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: STEP-BY-STEP SETUP PROTOCOL & CUSTOM NUMBER MASKS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg text-sm bg-sky-500/20 text-sky-400 text-base font-mono">🛠️</span>
              Step-by-Step Construction Protocol &amp; Header Formatting
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              Protocol
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-sky-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-sky-950 border border-sky-700 text-sky-300 flex items-center justify-center text-xs">1</span>
                Step 1: Set Up Base Model &amp; Table Grid
              </div>
              <p className="text-slate-300 leading-relaxed">
                List scenario inputs in a column (e.g. D6:D16). In the header row (E5, F5, G5), link directly to base model calculation cells (e.g. <code className="text-sky-300 font-mono">=B6</code>, <code className="text-sky-300 font-mono">=B7</code>).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-emerald-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 flex items-center justify-center text-xs">2</span>
                Step 2: Select Full Table &amp; Launch Dialog
              </div>
              <p className="text-slate-300 leading-relaxed">
                Select range <code className="text-emerald-300 font-mono">D5:G16</code>. Navigate to <strong>Data &gt; What-If Analysis &gt; Data Table</strong> (or press shortcut <kbd className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-cyan-300">Alt + A + W + T</kbd>).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-teal-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-teal-950 border border-teal-700 text-teal-300 flex items-center justify-center text-xs">3</span>
                Step 3: Assign Column Input Cell &amp; Run
              </div>
              <p className="text-slate-300 leading-relaxed">
                Leave Row Input Cell blank. In <strong>Column Input Cell</strong>, click baseline input cell <code className="text-teal-300 font-mono">$B$3</code>. Click OK. Excel applies <code className="text-teal-300 font-mono">{"{=TABLE(, B3)}"}</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-950 border border-purple-700 text-purple-300 flex items-center justify-center text-xs">4</span>
                Step 4: Hide Raw Formulas with Custom Format
              </div>
              <p className="text-slate-300 leading-relaxed">
                Right-click cell E5 &gt; Format Cells &gt; Custom &gt; Type: <code className="text-purple-300 font-mono">;;;&quot;Monthly EMI&quot;</code>. This masks the raw formula output with professional header text.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: INTERACTIVE PRACTICE WORKBOOK & DIRECT DOWNLOAD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg text-sm bg-emerald-500/20 text-emerald-400 text-base font-mono">📥</span>
                Interactive One-Variable Data Table Model
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the live sensitivity matrix model below, or download the full master workbook to practice in desktop Excel.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              title="Download the dedicated What-If Analysis master workbook (.xlsx)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Master Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="Topic2_One_Variable_Data_"
            title="One-Variable Data Table Loan Sensitivity Master"
            rowsPerPage={12}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 7: REAL-WORLD CORPORATE IMPLEMENTATION SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg text-sm bg-amber-500/20 text-amber-400 text-base font-mono">🏢</span>
                Real-World Corporate Implementation Scenarios
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                How enterprise financial modelers and operational heads deploy One-Variable Data Tables to drive strategic decisions.
              </p>
            </div>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800 shrink-0">
              Case Studies
            </span>
          </div>

          <div className="space-y-6">
            {/* Case 1: Swadeep Banerjee */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-700/60 text-amber-300 text-xs font-bold uppercase">
                    Case 1 · Commercial Strategy
                  </span>
                  <h3 className="font-bold text-white text-base sm:text-lg">
                    Swadeep Banerjee: Multi-Branch Expansion Loan Stress Testing
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                  Barrackpore HQ · Retail Expansion
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1">
                  <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">The Operational Challenge:</span>
                  <p className="text-slate-300 leading-relaxed">
                    Planning a ₹5 Crore debt-financed retail expansion. The board requires an interest rate sensitivity table evaluating EMI across 10 possible interest rate scenarios (7.5% to 12.0%) to ensure cash flow covers debt servicing at 1.5x DSCR.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">Exact Solution Architecture:</span>
                  <p className="text-slate-300 leading-relaxed font-mono">
                    • Column D: Rates 7.5% to 12.0% (0.5% steps)<br />
                    • Cell E5: =B6 (EMI) | Cell F5: =B8 (DSCR Ratio)<br />
                    • Table Config: Column Input Cell = $B$3<br />
                    • Output: {"{=TABLE(, B3)}"}
                  </p>
                </div>
              </div>
            </div>

            {/* Case 2: Tuhina Mukherjee */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-700/60 text-amber-300 text-xs font-bold uppercase">
                    Case 2 · Cost &amp; Management Accounting
                  </span>
                  <h3 className="font-bold text-white text-base sm:text-lg">
                    Tuhina Mukherjee: Raw Material Inflation Sensitivity on Batch Margins
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                  Shyamnagar Plant · Manufacturing Division
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1">
                  <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">The Operational Challenge:</span>
                  <p className="text-slate-300 leading-relaxed">
                    Alloy steel manufacturing margins are exposed to fluctuating nickel and chrome prices. Tuhina builds a One-Variable Data Table varying raw material cost per metric ton (₹1.2L to ₹2.0L) against Batch Contribution Margin and Net EBITDA.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">Exact Solution Architecture:</span>
                  <p className="text-slate-300 leading-relaxed font-mono">
                    • Column D: Material Cost per MT (Steps of ₹10,000)<br />
                    • Cell E5: =B10 (Batch Margin) | Cell F5: =B12 (EBITDA %)<br />
                    • Table Config: Column Input Cell = $B$4<br />
                    • Output: {"{=TABLE(, B4)}"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: 10 INTERACTIVE HANDS-ON PRACTICE CHALLENGES
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg text-sm bg-sky-500/20 text-sky-400 text-base font-mono">🎯</span>
                10 Practical Hands-On Exercises for 1-Variable Data Tables
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Test your modeling skills across these 10 exercises. Click to reveal the exact table ranges, input assignments, and formula syntax.
              </p>
            </div>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800 shrink-0">
              10 Practice Exercises
            </span>
          </div>

          <div className="space-y-4">
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
                    className="w-full p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 text-left hover:bg-slate-900/40 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold font-mono bg-sky-950 border border-sky-800/80 text-sky-300">
                          Exercise {idx + 1}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            item.difficulty === "Beginner"
                              ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800/60"
                              : item.difficulty === "Intermediate"
                              ? "bg-amber-950/80 text-amber-300 border border-amber-800/60"
                              : "bg-indigo-950/80 text-indigo-300 border border-indigo-800/60"
                          }`}
                        >
                          {item.difficulty}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-white text-sm sm:text-base">
                        {item.title}
                      </h3>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <span className="text-xs font-semibold text-sky-400 hidden sm:inline-block">
                        {isExpanded ? "Hide Solution" : "Reveal Solution"}
                      </span>
                      <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                        {isExpanded ? "▲" : "▼"}
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-4 sm:p-6 border-t border-slate-800/80 bg-slate-900/30 space-y-4 text-xs sm:text-sm">
                      <div className="space-y-1.5">
                        <strong className="text-amber-400 uppercase tracking-wider text-[11px] block">
                          Problem Scenario:
                        </strong>
                        <p className="text-slate-300 leading-relaxed">
                          {item.scenario}
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 font-mono text-xs text-slate-300">
                        <span className="text-slate-400">Grid Setup: </span>
                        {item.grid}
                      </div>

                      <div className="space-y-1.5">
                        <strong className="text-emerald-400 uppercase tracking-wider text-[11px] block">
                          Exact Execution Command &amp; Formula:
                        </strong>
                        <div className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs sm:text-sm text-emerald-300 border border-slate-800 overflow-x-auto shadow-inner">
                          {item.formula}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <strong className="text-sky-300 uppercase tracking-wider text-[11px] block">
                          Technical Walkthrough &amp; Explanation:
                        </strong>
                        <p className="text-slate-300 leading-relaxed">
                          {item.explanation}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-slate-400 text-xs font-mono">
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
            SECTION 9: COMMON PITFALLS & DIAGNOSTIC FIXES
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg text-sm bg-rose-500/20 text-rose-400 text-base font-mono">⚠️</span>
              Common Pitfalls &amp; Diagnostic Fixes
            </h2>
            <span className="text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800">
              Troubleshooting
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Error Signature / Symptom</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Fix &amp; Prevention</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">All results return identical values</td>
                  <td className="py-3 px-4">Row Input Cell and Column Input Cell were swapped in the dialog.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">For vertical value lists, leave Row Input blank and select Column Input.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">Cannot change part of a data table</td>
                  <td className="py-3 px-4">Attempted to edit or delete a single result cell in the array.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Select the entire data table range and press Delete to clear.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">Table results show 0 or blank</td>
                  <td className="py-3 px-4">Output formula was placed in a data row instead of the top header row.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Ensure output formulas sit in the top row (E5, F5) of output columns.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">Severe Excel Calculation Lag</td>
                  <td className="py-3 px-4">Multiple Data Tables recalculating on every background keystroke.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Set Calculation Mode to &quot;Automatic Except for Data Tables&quot; (F9 to refresh).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: PRO TIPS & ACCELERATORS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg text-sm bg-purple-500/20 text-purple-400 text-base font-mono">💡</span>
              Pro Tips &amp; High-Speed Accelerators
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Productivity
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> Keyboard Accelerator
              </div>
              <p className="text-slate-300 leading-relaxed">
                Open the Data Table configuration dialog instantly from anywhere on the sheet:
              </p>
              <kbd className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-cyan-300 mt-1">Alt + A + W + T</kbd>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> Custom Header Mask
              </div>
              <p className="text-slate-300 leading-relaxed">
                Mask raw output formula headers with professional executive text strings:
              </p>
              <kbd className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-cyan-300 mt-1">;;;&quot;Header Name&quot;</kbd>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> Manual Calculation
              </div>
              <p className="text-slate-300 leading-relaxed">
                Recalculate Data Tables on-demand under &quot;Automatic Except Data Tables&quot; mode:
              </p>
              <kbd className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-cyan-300 mt-1">F9 / Shift + F9</kbd>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: SOCRATIC ANALYTICAL HINTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[10] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg text-sm bg-teal-500/20 text-teal-400 text-base font-mono">🤔</span>
              Socratic Analytical Hints (&quot;Think About...&quot;)
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Critical Thinking
            </span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 1: How does Excel perform sensitivity calculations without overwriting the base model cell?
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Consider how the calculation engine runs shadow iterations in memory before depositing the output matrix.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 2: Why can a One-Variable Data Table support multiple outputs, while a Two-Variable Data Table only supports one?
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Reflect on geometric grid dimensions: 1D tables use the remaining dimension for extra output columns, whereas 2D tables consume both X and Y axes for inputs.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 12: FREQUENTLY ASKED QUESTIONS (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <FAQTemplate
            title="One-Variable Data Tables - Comprehensive Mastery Q&amp;A"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 13: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <Teacher
            note="One-Variable Data Tables are the secret weapon of corporate financial analysts! Always remember to use custom number formatting (;;;&quot;Label&quot;) to keep your headers looking executive and pristine, and switch to 'Automatic Except Data Tables' if your workbook begins to feel sluggish."
          />
        </div>
      </div>
    </div>
  );
}
