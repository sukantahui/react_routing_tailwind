"use client";

import React, { useState, useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/002_005_lookup_functions_vlookup_hlookup_index_match_and_xlookup_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic25_files/topic25_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

const practiceChallenges = [
  {
    "title": "Dynamic Single-Cell Coordinate Pointer",
    "difficulty": "Beginner",
    "category": "Cell Displacement",
    "scenario": "Given an anchor cell at A1, write an OFFSET formula to retrieve the unit price of Product C in Month 4, which is located 4 rows down and 3 columns to the right.",
    "grid": "Anchor = A1 | Target Cell = D5 (Row 5, Col D)",
    "formula": "=OFFSET(A1, 4, 3)",
    "explanation": "Starting from A1 (0,0), passing row offset = 4 jumps down to Row 5, and col offset = 3 jumps right to Column D. Omitting height and width returns the 1x1 target cell D5.",
    "sheetRef": "Ex1_Basic_Cell_Displacement"
  },
  {
    "title": "Dynamic 1D Vertical Column Sum of Variable Length",
    "difficulty": "Beginner",
    "category": "1D Range Sizing",
    "scenario": "In a turnover report starting at cell B2, sum the first 6 months of sales by dynamically setting the height parameter without hardcoding B2:B7.",
    "grid": "Anchor = B2 | Months = 6 rows | Column = B",
    "formula": "=SUM(OFFSET(B2, 0, 0, 6, 1))",
    "explanation": "Anchor B2 stays at row offset 0 and col offset 0. Setting height = 6 returns a vertical slice spanning B2:B7, which SUM calculates dynamically.",
    "sheetRef": "Ex2_Dynamic_1D_Range"
  },
  {
    "title": "Trailing 3-Day Moving Average with Negative Height",
    "difficulty": "Intermediate",
    "category": "Sliding Windows",
    "scenario": "At day 15 (daily sales stored in cell C15), calculate the trailing 3-day moving average (spanning days 13, 14, and 15) using a negative height parameter.",
    "grid": "Active Cell = C15 | Trailing Window = 3 days (C13:C15)",
    "formula": "=AVERAGE(OFFSET(C15, 0, 0, -3, 1))",
    "explanation": "Anchor C15 with height = -3 instructs Excel to span 3 rows upward in history (from C15 up to C13), allowing AVERAGE to smooth trailing sales velocity.",
    "sheetRef": "Ex4_Rolling_Moving_Average"
  },
  {
    "title": "Self-Expanding Range for Auto-Updating SUM",
    "difficulty": "Intermediate",
    "category": "Dynamic Sizing",
    "scenario": "Build a summary formula in cell E2 that automatically sums all numbers in Column B (starting at B2) and auto-expands downward as new transaction rows are added.",
    "grid": "Column B data starts at B2 | Header in B1",
    "formula": "=SUM(OFFSET($B$2, 0, 0, COUNTA($B:$B)-1, 1))",
    "explanation": "COUNTA($B:$B)-1 dynamically measures the number of filled rows (subtracting the header). OFFSET uses this count as height, auto-expanding the SUM range.",
    "sheetRef": "Ex5_Self_Expanding_COUNTA"
  },
  {
    "title": "2D Regional Sub-Matrix Extraction",
    "difficulty": "Intermediate",
    "category": "2D Slicing",
    "scenario": "In a master table anchored at A1, extract and sum the sales of the top 3 regions across the first 2 quarters (occupying cells B2:C4).",
    "grid": "Anchor = A1 | Regions = Rows 2-4 | Quarters = Cols B-C",
    "formula": "=SUM(OFFSET(A1, 1, 1, 3, 2))",
    "explanation": "Row offset 1 and col offset 1 jump to B2. Setting height = 3 and width = 2 captures the entire 3x2 rectangular sub-matrix B2:C4 for summation.",
    "sheetRef": "Ex3_Dynamic_2D_Matrix"
  },
  {
    "title": "Dynamic Retrieval of the Most Recent Entry in a Column",
    "difficulty": "Intermediate",
    "category": "Last Value Fetching",
    "scenario": "In a daily closing stock price log in Column C starting at C2, write a formula to dynamically fetch the very latest closing price at the bottom of the list.",
    "grid": "Anchor = C1 | Continuous prices in C2:CN",
    "formula": "=OFFSET(C1, COUNTA(C:C)-1, 0)",
    "explanation": "COUNTA(C:C)-1 calculates the exact zero-based numerical offset needed to jump from header C1 directly to the lowest filled cell in Column C.",
    "sheetRef": "Ex6_Last_Value_Retrieval"
  },
  {
    "title": "Two-Way Dynamic Matrix Lookup with OFFSET + MATCH + MATCH",
    "difficulty": "Advanced",
    "category": "Matrix Lookups",
    "scenario": "Given a freight rate matrix anchored at A4 with categories in A5:A20 and shipping modes in B4:G4, retrieve the tariff for category in I2 and mode in I3.",
    "grid": "Anchor = $A$4 | Row Criteria = I2 | Col Criteria = I3",
    "formula": "=OFFSET($A$4, MATCH(I2, $A$5:$A$20, 0), MATCH(I3, $B$4:$G$4, 0))",
    "explanation": "The first MATCH computes the vertical row displacement, while the second MATCH computes the horizontal column displacement, landing directly on the rate intersection.",
    "sheetRef": "Ex8_Two_Way_MATCH_Offset"
  },
  {
    "title": "Reverse Direction Offsetting from Bottom-Right Anchor",
    "difficulty": "Advanced",
    "category": "Reverse Offsets",
    "scenario": "Anchored at the bottom-right summary cell E12, retrieve the shift supervisor's name located 3 rows up and 2 columns to the left.",
    "grid": "Anchor = E12 | Target = C9 (3 rows up, 2 cols left)",
    "formula": "=OFFSET(E12, -3, -2)",
    "explanation": "Negative row offset (-3) moves 3 rows upward to row 9; negative col offset (-2) moves 2 columns leftward to Column C, returning cell C9.",
    "sheetRef": "Ex9_Negative_Offsets"
  },
  {
    "title": "Dynamic Sliding Quarter GST Reconciliation Block",
    "difficulty": "Advanced",
    "category": "Multi-Period Slicing",
    "scenario": "Given 12 monthly tax rows in B4:D15 (CGST, SGST, IGST), write a formula in H2 that sums the 3-month tax block for a selected quarter number (1-4) in cell G1.",
    "grid": "Anchor = $B$4 | Quarter Dropdown = G1 (1-4) | 3 Tax Columns",
    "formula": "=SUM(OFFSET($B$4, (G1-1)*3, 0, 3, 3))",
    "explanation": "(G1-1)*3 shifts the starting row by 0 for Q1, 3 for Q2, 6 for Q3, and 9 for Q4. Height = 3 captures 3 months; width = 3 captures all 3 tax columns.",
    "sheetRef": "Ex10_Non_Volatile_INDEX"
  },
  {
    "title": "Refactoring Volatile OFFSET to High-Speed Non-Volatile INDEX:INDEX",
    "difficulty": "Advanced",
    "category": "Performance Architecture",
    "scenario": "Refactor the volatile dynamic range formula =SUM(OFFSET(B2, 0, 0, COUNTA(B:B)-1, 1)) into a 100% non-volatile formula to eliminate calculation lag in a 100,000-row model.",
    "grid": "Column B data starts at B2 | Header in B1",
    "formula": "=SUM(INDEX(B:B, 2):INDEX(B:B, COUNTA(B:B)))",
    "explanation": "INDEX returns a cell reference when paired with the range colon (:). INDEX(B:B, 2) creates B2, and INDEX(B:B, COUNTA(B:B)) creates the bottom cell, calculating with zero volatility lag.",
    "sheetRef": "Ex10_Non_Volatile_INDEX"
  }
];

export default function Topic25() {
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
    link.download = "offset_dynamic_ranges_master.xlsx";
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

      <div className="w-full space-y-6 sm:space-y-8">
        {/* =========================================================================
            SECTION 1: HERO HEADER & OVERVIEW
        ========================================================================= */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section rounded-2xl p-5 sm:p-8 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              📐 Dynamic Range Architecture · Topic 25
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Reference &amp; Coordinate Geometry
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Advanced · Bloom Level 4: Analyze
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Dynamic Range Construction with OFFSET &amp; Coordinate Geometry
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Master the complete mechanics of the <code className="text-sky-300 font-mono font-bold">=OFFSET()</code> function in Microsoft Excel. Explore 10 foundational to advanced variations: 2D coordinate shifting, 1D and 2D dynamic range sizing, sliding window moving averages, self-expanding ranges with <code className="text-emerald-300 font-mono font-bold">COUNTA()</code>, dynamic chart feeds, 2-way <code className="text-teal-300 font-mono font-bold">MATCH</code> lookups, and non-volatile <code className="text-indigo-300 font-mono font-bold">INDEX:INDEX</code> high-speed alternatives.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Subject Code:</strong> EXCEL-PRO-901</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Module:</strong> Lookup Functions &amp; Dynamic Ranges</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Accreditation:</strong> Coder &amp; AccoTax Centre of Excellence</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: COMPLETE 5-PARAMETER OFFSET SYNTAX & ANATOMY
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-200 space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg text-sm bg-sky-500/20 text-sky-400 text-base font-mono">⚡</span>
              The 5-Parameter OFFSET Anatomy Card
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              Syntax Geometry
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 font-mono text-sm sm:text-base text-sky-300 overflow-x-auto shadow-inner">
            =OFFSET(reference, rows, cols, [height], [width])
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Requirement</th>
                  <th className="py-3 px-4">Direction / Behavior</th>
                  <th className="py-3 px-4">Default Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 font-mono">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">1. reference</td>
                  <td className="py-3 px-4 text-teal-400">Cell / Range</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Required</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Starting anchor cell from which displacement begins.</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">None</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">2. rows</td>
                  <td className="py-3 px-4 text-teal-400">Integer</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Required</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Positive = Down; Negative = Up; 0 = Same row.</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">None</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">3. cols</td>
                  <td className="py-3 px-4 text-teal-400">Integer</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Required</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Positive = Right; Negative = Left; 0 = Same column.</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">None</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">4. [height]</td>
                  <td className="py-3 px-4 text-teal-400">Integer</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">Optional</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Number of rows high the returned range should span.</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans">Height of reference</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">5. [width]</td>
                  <td className="py-3 px-4 text-teal-400">Integer</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">Optional</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Number of columns wide the returned range should span.</td>
                  <td className="py-3 px-4 text-emerald-400 font-sans">Width of reference</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: 10 COMPREHENSIVE IN-DEPTH EXAMPLES & VARIATIONS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg text-sm bg-emerald-500/20 text-emerald-400 text-base font-mono">📚</span>
              10 In-Depth Examples &amp; Architectural Variations
            </h2>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Master Variations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Variation 1 */}
            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Variation 1</span>
                <span className="text-xs font-mono text-slate-400">Basic 2D Cell Shifting</span>
              </div>
              <h3 className="font-bold text-white text-base">Point-to-Point Cell Displacement</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Navigates 3 rows down and 2 columns right from anchor <code className="text-cyan-300 font-mono">A1</code>:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-sky-300 border border-slate-800">
                =OFFSET(A1, 3, 2)
              </div>
              <p className="text-xs text-slate-400">Result: Points directly to cell <strong>C4</strong>.</p>
            </div>

            {/* Variation 2 */}
            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Variation 2</span>
                <span className="text-xs font-mono text-slate-400">1D Column Range Sizing</span>
              </div>
              <h3 className="font-bold text-white text-base">Dynamic 1D Vertical Range</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Uses the <code className="text-cyan-300 font-mono">height</code> parameter to aggregate a 5-row vertical slice:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-teal-300 border border-slate-800">
                =SUM(OFFSET(B2, 0, 0, 5, 1))
              </div>
              <p className="text-xs text-slate-400">Result: Sums cells <strong>B2:B6</strong> dynamically.</p>
            </div>

            {/* Variation 3 */}
            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Variation 3</span>
                <span className="text-xs font-mono text-slate-400">2D Sub-Matrix Sizing</span>
              </div>
              <h3 className="font-bold text-white text-base">Rectangular Sub-Matrix Slicing</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Extracts a 4-row by 3-column sub-matrix starting 1 row down and 1 column right:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-indigo-300 border border-slate-800">
                =SUM(OFFSET(A1, 1, 1, 4, 3))
              </div>
              <p className="text-xs text-slate-400">Result: Aggregates rectangular block <strong>B2:D5</strong>.</p>
            </div>

            {/* Variation 4 */}
            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Variation 4</span>
                <span className="text-xs font-mono text-slate-400">Sliding Window Moving Average</span>
              </div>
              <h3 className="font-bold text-white text-base">Trailing 3-Day &amp; 7-Day Velocity</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Uses negative height (<code className="text-amber-300 font-mono">-3</code>) to average the 3 prior chronological rows:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-amber-300 border border-slate-800">
                =AVERAGE(OFFSET(D5, 0, 0, -3, 1))
              </div>
              <p className="text-xs text-slate-400">Result: Computes trailing 3-day mean <strong>D3:D5</strong>.</p>
            </div>

            {/* Variation 5 */}
            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Variation 5</span>
                <span className="text-xs font-mono text-slate-400">Self-Expanding Range</span>
              </div>
              <h3 className="font-bold text-white text-base">Dynamic Growth with COUNTA</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Automatically sizes range height as new entries are added to the column:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-emerald-300 border border-slate-800">
                =OFFSET($A$2, 0, 0, COUNTA($A:$A)-1, 1)
              </div>
              <p className="text-xs text-slate-400">Result: Auto-grows from row 2 to last filled row.</p>
            </div>

            {/* Variation 6 */}
            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Variation 6</span>
                <span className="text-xs font-mono text-slate-400">Last Value Retrieval</span>
              </div>
              <h3 className="font-bold text-white text-base">Fetching Most Recent Entry</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Retrieves the latest closing stock price or ledger balance at the bottom of a list:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-rose-300 border border-slate-800">
                =OFFSET(B1, COUNTA(B:B)-1, 0)
              </div>
              <p className="text-xs text-slate-400">Result: Jumps directly to bottom-most filled cell.</p>
            </div>

            {/* Variation 7 */}
            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Variation 7</span>
                <span className="text-xs font-mono text-slate-400">Dynamic Chart Feeds</span>
              </div>
              <h3 className="font-bold text-white text-base">Auto-Plotting Chart Series</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Defined in Excel Name Manager so charts automatically plot new monthly data:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-purple-300 border border-slate-800">
                ChartDates = =OFFSET(Data!$A$2, 0, 0, COUNTA(Data!$A:$A)-1, 1)
              </div>
              <p className="text-xs text-slate-400">Result: Zero manual chart range adjustments required.</p>
            </div>

            {/* Variation 8 */}
            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Variation 8</span>
                <span className="text-xs font-mono text-slate-400">2-Way MATCH Matrix</span>
              </div>
              <h3 className="font-bold text-white text-base">Dynamic 2-Way Intersection</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Uses MATCH for vertical and horizontal offsets without fixed column indices:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-cyan-300 border border-slate-800">
                =OFFSET($A$1, MATCH(RowVal, $A$2:$A$10, 0), MATCH(ColVal, $B$1:$F$1, 0))
              </div>
              <p className="text-xs text-slate-400">Result: Retrieves exact rate card intersection value.</p>
            </div>

            {/* Variation 9 */}
            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Variation 9</span>
                <span className="text-xs font-mono text-slate-400">Negative Coordinates</span>
              </div>
              <h3 className="font-bold text-white text-base">Reverse Upward &amp; Leftward Navigation</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Anchors at the bottom-right summary cell and navigates backward:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-amber-300 border border-slate-800">
                =OFFSET(E10, -3, -2)
              </div>
              <p className="text-xs text-slate-400">Result: Shifts upward 3 rows and left 2 columns to <strong>C7</strong>.</p>
            </div>

            {/* Variation 10 */}
            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Variation 10</span>
                <span className="text-xs font-mono text-slate-400">Non-Volatile INDEX:INDEX</span>
              </div>
              <h3 className="font-bold text-white text-base">High-Performance Dynamic Range</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Non-volatile alternative eliminating calculation lag in 100,000-row models:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-emerald-300 border border-slate-800">
                =SUM(INDEX(C:C, 2):INDEX(C:C, COUNTA(C:C)))
              </div>
              <p className="text-xs text-slate-400">Result: 100% non-volatile dynamic range construction.</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: UNDER-THE-HOOD ENGINE MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg text-sm bg-indigo-500/20 text-indigo-400 text-base font-mono">🔬</span>
              Engine Mechanics: Volatility &amp; Memory Geometry
            </h2>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800">
              Calculation Tree
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-sky-300 uppercase tracking-wider">1. The Volatile Dirty Flag</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Excel marks all OFFSET cells as dirty on every keystroke, forcing recalculation regardless of whether precedent cells changed.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-teal-300 uppercase tracking-wider">2. Coordinate Translation</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Excel translates row and column offsets into absolute grid pointers in memory before resolving the height and width slice.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">3. Non-Volatile Range Colon</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The range operator (<code className="text-indigo-300 font-mono">:</code>) connects two INDEX pointers, maintaining smart dependency tracking.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: INTERACTIVE SEMANTIC SVG PIPELINE
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg text-sm bg-sky-500/20 text-sky-400 text-base font-mono">📐</span>
              OFFSET Coordinate Geometry &amp; Slicing Diagram
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              Geometry Pipeline
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/80 flex flex-col items-center justify-center overflow-x-auto shadow-inner">
            <svg viewBox="0 0 820 240" className="w-full max-w-4xl h-auto text-slate-200 select-none font-sans">
              <defs>
                <marker id="arrowOffset" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8" />
                </marker>
              </defs>

              {/* Anchor Node */}
              <g transform="translate(30, 45)">
                <rect width="180" height="150" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                <rect x="12" y="12" width="156" height="26" rx="6" fill="#1e293b" />
                <text x="90" y="30" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Anchor Cell (0,0)</text>
                <text x="90" y="75" textAnchor="middle" fill="#38bdf8" fontSize="15" fontFamily="monospace" fontWeight="bold">Reference A1</text>
                <text x="90" y="105" textAnchor="middle" fill="#64748b" fontSize="10">Base Coordinates</text>
                <text x="90" y="125" textAnchor="middle" fill="#64748b" fontSize="10">Fixed Origin</text>
              </g>

              {/* Shift Arrow */}
              <path d="M 215 120 L 295 120" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrowOffset)" fill="none" />
              <text x="255" y="105" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontFamily="monospace">Rows &amp; Cols</text>

              {/* Shifting Engine */}
              <g transform="translate(305, 30)">
                <rect width="250" height="180" rx="14" fill="#0c4a6e" stroke="#0284c7" strokeWidth="2" />
                <rect x="14" y="14" width="222" height="28" rx="6" fill="#0369a1" />
                <text x="125" y="33" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">OFFSET Displacement Engine</text>
                <text x="125" y="75" textAnchor="middle" fill="#7dd3fc" fontSize="13" fontFamily="monospace" fontWeight="bold">Shift: +Rows, +Cols</text>
                <text x="125" y="105" textAnchor="middle" fill="#bae6fd" fontSize="11">Dimension: Height × Width</text>
                <text x="125" y="130" textAnchor="middle" fill="#bae6fd" fontSize="10">Dynamic Window Expansion</text>
                <text x="125" y="155" textAnchor="middle" fill="#38bdf8" fontSize="9" fontStyle="italic">Volatile Recalculation Chain</text>
              </g>

              {/* Range Output Arrow */}
              <path d="M 560 120 L 630 120" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrowOffset)" fill="none" />
              <text x="595" y="105" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontFamily="monospace">Range</text>

              {/* Sliced Output */}
              <g transform="translate(640, 45)">
                <rect width="150" height="150" rx="12" fill="#064e3b" stroke="#059669" strokeWidth="2" />
                <rect x="10" y="12" width="130" height="26" rx="6" fill="#047857" />
                <text x="75" y="30" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Target Output</text>
                <text x="75" y="75" textAnchor="middle" fill="#6ee7b7" fontSize="15" fontFamily="monospace" fontWeight="bold">Sliced Range</text>
                <text x="75" y="105" textAnchor="middle" fill="#a7f3d0" fontSize="10">SUM / AVERAGE</text>
                <text x="75" y="125" textAnchor="middle" fill="#a7f3d0" fontSize="10">Dynamic Spilling</text>
              </g>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: INTERACTIVE SPREADSHEET & DIRECT WORKBOOK DOWNLOAD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg text-sm bg-emerald-500/20 text-emerald-400 text-base font-mono">📥</span>
                Dedicated OFFSET Practice Workbook (11 Master Sheets)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore all 10 practical variations live in the interactive grid below, or download the dedicated <code className="text-sky-300 font-mono">offset_dynamic_ranges_master.xlsx</code> workbook.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              title="Download the dedicated OFFSET master workbook (.xlsx)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download OFFSET Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="EX1026"
            title="Dedicated OFFSET Dynamic Ranges Master Workbook"
            rowsPerPage={10}
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
                Detailed enterprise case studies demonstrating how senior leaders and analysts solve complex operational challenges with OFFSET.
              </p>
            </div>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800 shrink-0">
              Deep-Dive Case Studies
            </span>
          </div>

          <div className="space-y-6">
            {/* ==========================================
                CASE STUDY 1: SWADEEP BANERJEE
            ========================================== */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-700/60 text-amber-300 text-xs font-bold uppercase">
                    Case 1 · Commercial Strategy
                  </span>
                  <h3 className="font-bold text-white text-base sm:text-lg">
                    Swadeep Banerjee: Trailing 30-Day Sales Velocity &amp; Moving Average Smoothing
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                  Barrackpore HQ · Retail Operations
                </span>
              </div>

              {/* Problem & Context */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/60">
                  <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">The Operational Challenge:</span>
                  <p className="text-slate-300 leading-relaxed">
                    Daily sales across 4 regional commercial hubs fluctuate wildly between weekends (₹4.5L/day) and weekdays (₹1.2L/day). Standard monthly totals fail to reveal mid-month momentum changes. The C-suite requires a dynamic 30-day trailing moving average that updates automatically each day without manual formula adjustments.
                  </p>
                </div>

                <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/60">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">Dataset Coordinates &amp; Schema:</span>
                  <p className="text-slate-300 leading-relaxed font-mono">
                    • Column A: Transaction_Date (01-Jan-2026 onwards)<br />
                    • Column B: Store_Branch (Barrackpore, Shyamnagar, etc.)<br />
                    • Column C: Daily_Revenue_INR (Numeric sales)<br />
                    • Column D: Dynamic_30Day_Avg (Target calculated output)
                  </p>
                </div>
              </div>

              {/* Exact Formula & Mechanics */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-sky-300 uppercase tracking-wider">Production Formula &amp; Parameter Breakdown:</span>
                <div className="p-3.5 rounded-xl bg-slate-900 font-mono text-xs sm:text-sm text-sky-300 border border-slate-800 overflow-x-auto shadow-inner">
                  =IF(ROW()-ROW($C$2) < 29, "Building Baseline...", AVERAGE(OFFSET(C32, 0, 0, -30, 1)))
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1 text-xs">
                  <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800">
                    <strong className="text-white block font-mono">reference: C32</strong>
                    <span className="text-slate-400">Current day's sales cell anchor.</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800">
                    <strong className="text-white block font-mono">rows / cols: 0, 0</strong>
                    <span className="text-slate-400">Stay locked in current row and Column C.</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800">
                    <strong className="text-white block font-mono">height: -30</strong>
                    <span className="text-slate-400">Spans 30 rows upward in chronological history.</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800">
                    <strong className="text-white block font-mono">width: 1</strong>
                    <span className="text-slate-400">Single column vertical vector.</span>
                  </div>
                </div>
              </div>

              {/* Business Outcome */}
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <span className="text-emerald-400 text-base">✓</span>
                <div>
                  <strong className="text-emerald-300">Measurable Business Outcome: </strong>
                  Eliminated 45 minutes of daily manual formula dragging across 12 branch managers, smoothed revenue curves for C-Suite inventory replenishment, and eliminated human cell-offset errors.
                </div>
              </div>
            </div>

            {/* ==========================================
                CASE STUDY 2: TUHINA MUKHERJEE
            ========================================== */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-700/60 text-amber-300 text-xs font-bold uppercase">
                    Case 2 · Corporate Tax &amp; Audit
                  </span>
                  <h3 className="font-bold text-white text-base sm:text-lg">
                    Tuhina Mukherjee: Dynamic Sliding Quarter GST Slicing &amp; Statutory Reconciliation
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                  Shyamnagar Plant · Financial Controllership
                </span>
              </div>

              {/* Problem & Context */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/60">
                  <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">The Operational Challenge:</span>
                  <p className="text-slate-300 leading-relaxed">
                    Statutory tax audits require verifying monthly input tax credits (ITC) against quarterly GST returns (GSTR-3B). Instead of creating 4 separate hardcoded summation formulas, the finance controller needs a single summary cell that dynamically selects and sums the exact 3-month block matching a user-selected quarter dropdown (Q1, Q2, Q3, or Q4).
                  </p>
                </div>

                <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/60">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">Dataset Coordinates &amp; Schema:</span>
                  <p className="text-slate-300 leading-relaxed font-mono">
                    • Cell G1: Selected_Quarter (Dropdown 1, 2, 3, or 4)<br />
                    • Column A: Month_Name (Apr-2026 to Mar-2027, Rows 4 to 15)<br />
                    • Column B: CGST_Paid | Column C: SGST_Paid<br />
                    • Column D: IGST_Paid (Row 4 is Month 1, Row 15 is Month 12)
                  </p>
                </div>
              </div>

              {/* Exact Formula & Mechanics */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-sky-300 uppercase tracking-wider">Production Formula &amp; Parameter Breakdown:</span>
                <div className="p-3.5 rounded-xl bg-slate-900 font-mono text-xs sm:text-sm text-sky-300 border border-slate-800 overflow-x-auto shadow-inner">
                  =SUM(OFFSET($B$4, ($G$1 - 1) * 3, 0, 3, 3))
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1 text-xs">
                  <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800">
                    <strong className="text-white block font-mono">reference: $B$4</strong>
                    <span className="text-slate-400">Anchor at Month 1 (April), Column B.</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800">
                    <strong className="text-white block font-mono">rows: (G1-1)*3</strong>
                    <span className="text-slate-400">Q1=0, Q2=3, Q3=6, Q4=9 rows downward shift.</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800">
                    <strong className="text-white block font-mono">height: 3</strong>
                    <span className="text-slate-400">Captures exactly 3 monthly rows per quarter.</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800">
                    <strong className="text-white block font-mono">width: 3</strong>
                    <span className="text-slate-400">Spans across 3 tax columns (CGST, SGST, IGST).</span>
                  </div>
                </div>
              </div>

              {/* Business Outcome */}
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <span className="text-emerald-400 text-base">✓</span>
                <div>
                  <strong className="text-emerald-300">Measurable Business Outcome: </strong>
                  Streamlined quarterly statutory tax filings across ₹18 Crore in annual GST liabilities, guaranteeing 100% mathematical audit defense with zero hardcoded formula overwriting.
                </div>
              </div>
            </div>

            {/* ==========================================
                CASE STUDY 3: ABHRONILA DAS
            ========================================== */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-700/60 text-amber-300 text-xs font-bold uppercase">
                    Case 3 · Plant Operations &amp; Quality
                  </span>
                  <h3 className="font-bold text-white text-base sm:text-lg">
                    Abhronila Das: Industrial Furnace Rolling Window &amp; Micro-Spike Thermal Anomaly Detection
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                  Ichapur Works · Metallurgy &amp; Forging
                </span>
              </div>

              {/* Problem & Context */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/60">
                  <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">The Operational Challenge:</span>
                  <p className="text-slate-300 leading-relaxed">
                    Alloy steel hardening requires holding furnace temperature at 1,050°C ±15°C. Sudden thermal spikes lasting more than 3 consecutive readings cause crystalline embrittlement, ruining entire ₹12L steel batches. The plant engineer needs an automated Statistical Process Control (SPC) alert calculating rolling 5-sample moving averages and dynamic standard deviation bands.
                  </p>
                </div>

                <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/60">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">Dataset Coordinates &amp; Schema:</span>
                  <p className="text-slate-300 leading-relaxed font-mono">
                    • Column A: Timestamp (Every 10 minutes)<br />
                    • Column B: Thermocouple_Temp_C (Sensor feed)<br />
                    • Column C: Rolling_5Pt_Mean (=AVERAGE(OFFSET(...)))<br />
                    • Column D: Upper_Control_Limit (=Mean + 2*STDEV(OFFSET(...)))
                  </p>
                </div>
              </div>

              {/* Exact Formula & Mechanics */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-sky-300 uppercase tracking-wider">Production Formula &amp; Parameter Breakdown:</span>
                <div className="p-3.5 rounded-xl bg-slate-900 font-mono text-xs sm:text-sm text-sky-300 border border-slate-800 overflow-x-auto shadow-inner">
                  =IF(B50 > (AVERAGE(OFFSET(B50, 0, 0, -5, 1)) + 2 * STDEV.S(OFFSET(B50, 0, 0, -5, 1))), "⚠️ THERMAL ANOMALY", "NORMAL")
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1 text-xs">
                  <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800">
                    <strong className="text-white block font-mono">reference: B50</strong>
                    <span className="text-slate-400">Current sensor reading in active shift row.</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800">
                    <strong className="text-white block font-mono">height: -5</strong>
                    <span className="text-slate-400">Extracts the 5 most recent temperature readings.</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800">
                    <strong className="text-white block font-mono">STDEV.S(...)</strong>
                    <span className="text-slate-400">Calculates local sample standard deviation.</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800">
                    <strong className="text-white block font-mono">+ 2 * Sigma</strong>
                    <span className="text-slate-400">Calculates dynamic 95.4% statistical threshold.</span>
                  </div>
                </div>
              </div>

              {/* Business Outcome */}
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <span className="text-emerald-400 text-base">✓</span>
                <div>
                  <strong className="text-emerald-300">Measurable Business Outcome: </strong>
                  Reduced factory scrap rates by 14.8%, preventing 3 major furnace overheating incidents per quarter and saving ₹36 Lakhs annually in re-smelting energy costs.
                </div>
              </div>
            </div>

            {/* ==========================================
                CASE STUDY 4: DEBANGSHU ROY
            ========================================== */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-700/60 text-amber-300 text-xs font-bold uppercase">
                    Case 4 · Logistics &amp; Freight Optimization
                  </span>
                  <h3 className="font-bold text-white text-base sm:text-lg">
                    Debangshu Roy: Two-Way Dynamic Freight Rate Card Lookup with OFFSET + MATCH + MATCH
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                  Naihati Logistics Hub · Supply Chain Distribution
                </span>
              </div>

              {/* Problem & Context */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/60">
                  <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">The Operational Challenge:</span>
                  <p className="text-slate-300 leading-relaxed">
                    A freight logistics hub manages 200+ transport carriers operating across 15 destination zones and 8 service tiers (Surface, Air Cargo, Cold Chain, Express). Traditional VLOOKUP with hardcoded column numbers (e.g. 5) breaks whenever new destination zones are added to the rate sheet. The dispatcher needs a dynamic 2-way matrix intersection lookup that never breaks.
                  </p>
                </div>

                <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/60">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">Dataset Coordinates &amp; Schema:</span>
                  <p className="text-slate-300 leading-relaxed font-mono">
                    • Matrix Anchor $A$4: Top-left header ("Product_Category")<br />
                    • Column Headers $B$4:$G$4: Shipping Modes (Standard, Air, Cold Chain)<br />
                    • Row Headers $A$5:$A$20: Freight Categories (Alloys, Castings)<br />
                    • Order Inputs: Cell I2 = Target Category, Cell I3 = Target Mode
                  </p>
                </div>
              </div>

              {/* Exact Formula & Mechanics */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-sky-300 uppercase tracking-wider">Production Formula &amp; Parameter Breakdown:</span>
                <div className="p-3.5 rounded-xl bg-slate-900 font-mono text-xs sm:text-sm text-sky-300 border border-slate-800 overflow-x-auto shadow-inner">
                  =OFFSET($A$4, MATCH(I2, $A$5:$A$20, 0), MATCH(I3, $B$4:$G$4, 0))
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1 text-xs">
                  <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800">
                    <strong className="text-white block font-mono">reference: $A$4</strong>
                    <span className="text-slate-400">Fixed top-left origin anchor of the rate matrix.</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800">
                    <strong className="text-white block font-mono">MATCH(I2, A5:A20, 0)</strong>
                    <span className="text-slate-400">Finds exact vertical row displacement offset.</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800">
                    <strong className="text-white block font-mono">MATCH(I3, B4:G4, 0)</strong>
                    <span className="text-slate-400">Finds exact horizontal column displacement offset.</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/40 border border-slate-800">
                    <strong className="text-white block font-mono">Return Value</strong>
                    <span className="text-slate-400">Retrieves exact ₹ tariff at intersection cell.</span>
                  </div>
                </div>
              </div>

              {/* Business Outcome */}
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <span className="text-emerald-400 text-base">✓</span>
                <div>
                  <strong className="text-emerald-300">Measurable Business Outcome: </strong>
                  Processed 15,000 monthly carrier waybill billing calculations with zero formula breakage, enabling instant tariff lookups and eliminating overbilling audit disputes by 100%.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: STEP-BY-STEP IMPLEMENTATION GUIDE
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg text-sm bg-sky-500/20 text-sky-400 text-base font-mono">🛠️</span>
              Step-by-Step Implementation Guide
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              Protocol
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-emerald-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 flex items-center justify-center text-xs">1</span>
                Step 1: Set Reference Anchor Coordinates
              </div>
              <p className="text-slate-300 leading-relaxed">
                Choose an absolute anchor cell: <code className="text-cyan-300 font-mono font-bold">$A$1</code> or <code className="text-cyan-300 font-mono font-bold">$B$2</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-sky-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-sky-950 border border-sky-700 text-sky-300 flex items-center justify-center text-xs">2</span>
                Step 2: Specify Row and Column Offsets
              </div>
              <p className="text-slate-300 leading-relaxed">
                Pass integer coordinates or dynamic expressions like <code className="text-cyan-300 font-mono font-bold">MATCH()</code> to navigate to the target start cell.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-teal-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-teal-950 border border-teal-700 text-teal-300 flex items-center justify-center text-xs">3</span>
                Step 3: Define Height and Width Sizing
              </div>
              <p className="text-slate-300 leading-relaxed">
                Supply height and width parameters (e.g. <code className="text-cyan-300 font-mono font-bold">COUNTA($A:$A)-1</code>) to size the output range.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-indigo-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 flex items-center justify-center text-xs">4</span>
                Step 4: Audit Volatility &amp; Performance
              </div>
              <p className="text-slate-300 leading-relaxed">
                For massive models with >50,000 rows, consider switching to non-volatile <code className="text-cyan-300 font-mono font-bold">INDEX:INDEX</code> syntax.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: COMMON PITFALLS & TROUBLESHOOTING MATRIX
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
              Diagnostic Fixes
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Problem / Error Signature</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Fix &amp; Prevention</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">#REF! Error</td>
                  <td className="py-3 px-4">Offset navigates above row 1 or left of column A.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Ensure row and col displacements remain inside worksheet boundaries.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">#VALUE! Error</td>
                  <td className="py-3 px-4">Height or width parameter passed as zero (0) or non-numeric text.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Ensure height >= 1 (or <= -1) and width >= 1.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">Severe Workbook Lag</td>
                  <td className="py-3 px-4">Excessive volatile OFFSET formulas recalculating across 50,000 rows.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Use non-volatile INDEX:INDEX range construction syntax.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">Underestimated Height</td>
                  <td className="py-3 px-4">Blank cells in column causing COUNTA to return smaller row counts.</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">Ensure continuous dataset or use structured table references.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: PRO TIPS & SHORTCUTS
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
                <span>⚡</span> Dynamic Chart Series
              </div>
              <p className="text-slate-300 leading-relaxed">
                Define dynamic named ranges in Name Manager so charts automatically plot new monthly entries.
              </p>
              <kbd className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-cyan-300 mt-1">Ctrl + F3 (Name Manager)</kbd>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> Trailing Moving Average
              </div>
              <p className="text-slate-300 leading-relaxed">
                Use negative height (<code className="text-purple-300 font-mono">-3</code>) to average the 3 prior chronological rows instantly.
              </p>
              <kbd className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-cyan-300 mt-1">=AVERAGE(OFFSET(D5,0,0,-3,1))</kbd>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> Non-Volatile INDEX:INDEX
              </div>
              <p className="text-slate-300 leading-relaxed">
                Replaces volatile OFFSET with zero-lag non-volatile INDEX range syntax for massive datasets.
              </p>
              <kbd className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-cyan-300 mt-1">INDEX(C:C, 2):INDEX(C:C, N)</kbd>
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
              Socratic Analytical Hints ("Think About...")
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Critical Thinking
            </span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-300">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 1: What makes OFFSET volatile, and when does volatility become an issue?
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Reflect on Excel's calculation engine and why volatile functions recalculate on every worksheet change.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 2: How do negative height and width values alter range orientation?
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Analyze how negative height spans upward into prior rows for trailing moving averages.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 3: How does the range colon (:) turn two INDEX functions into a non-volatile range?
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Consider how INDEX returns cell references that can be connected by the range operator.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 12: 10 PRACTICAL HANDS-ON CHALLENGE QUESTIONS FOR OFFSET
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[11] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg text-sm bg-sky-500/20 text-sky-400 text-base font-mono">🎯</span>
                10 Practical Hands-On Exercises to Master OFFSET
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Test your mastery with these 10 real-world corporate challenges. Try solving each scenario in your practice workbook, then click to reveal the exact formula architecture.
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
                      {/* Scenario */}
                      <div className="space-y-1.5">
                        <strong className="text-amber-400 uppercase tracking-wider text-[11px] block">
                          Problem Scenario:
                        </strong>
                        <p className="text-slate-300 leading-relaxed">
                          {item.scenario}
                        </p>
                      </div>

                      {/* Given Schema */}
                      <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 font-mono text-xs text-slate-300">
                        <span className="text-slate-400">Grid Coordinates: </span>
                        {item.grid}
                      </div>

                      {/* Solution Formula Card */}
                      <div className="space-y-1.5">
                        <strong className="text-emerald-400 uppercase tracking-wider text-[11px] block">
                          Exact Production Formula:
                        </strong>
                        <div className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs sm:text-sm text-emerald-300 border border-slate-800 overflow-x-auto shadow-inner">
                          {item.formula}
                        </div>
                      </div>

                      {/* Parameter Walkthrough */}
                      <div className="space-y-1.5">
                        <strong className="text-sky-300 uppercase tracking-wider text-[11px] block">
                          Parameter Walkthrough &amp; Explanation:
                        </strong>
                        <p className="text-slate-300 leading-relaxed">
                          {item.explanation}
                        </p>
                      </div>

                      {/* Sheet Reference */}
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
            SECTION 13: FREQUENTLY ASKED QUESTIONS (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <FAQTemplate
            title="Dynamic Range Construction with OFFSET - Comprehensive Mastery Q&amp;A"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 14: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[12] = el)} className="reveal-section">
          <Teacher
            note="OFFSET is like a precision remote control for cell ranges! Use it for dynamic chart ranges, sliding moving averages, and 2-way matrix lookups. If you build huge models with 100,000 rows, switch to INDEX:INDEX syntax to make your model fly at lightning speed!"
          />
        </div>
      </div>
    </div>
  );
}
