import React, { useState, useMemo, useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/004_001_modern_lookup_and_dynamic_array_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic15_files/topic15_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

const MATRIX_PIPELINE_FUNCTIONS = [
  {
    name: "LET",
    syntax: "=LET(name1, value1, [name2, value2, ...], calculation)",
    category: "Core Pipeline",
    categoryColor: "sky",
    purpose: "Assigns names to intermediate calculation results and filtered arrays, storing them in local memory to prevent redundant re-evaluations and drastically improve performance.",
    parameters: [
      { name: "name1", desc: "Identifier name for the variable (e.g., 'srcData', 'filtered', 'sorted')." },
      { name: "value1", desc: "The array, formula, or scalar calculation assigned to name1." },
      { name: "calculation", desc: "The final formula expression that computes and returns the output using defined variables." }
    ],
    recipe: "=LET(src, tblSales, f, FILTER(src, src[Amount]>50000), u, UNIQUE(CHOOSECOLS(f, 2, 4)), SORT(u, 2, -1))",
    recipeDesc: "Filters sales above $50K, extracts columns 2 & 4, deduplicates with UNIQUE, and sorts by column 2 descending in one single memory-efficient pass.",
    returnType: "Custom Spilled 2D Matrix / Vector / Scalar",
    excelVer: "Excel 365 / 2021+"
  },
  {
    name: "FILTER",
    syntax: "=FILTER(array, include, [if_empty])",
    category: "Core Pipeline",
    categoryColor: "sky",
    purpose: "Dynamically extracts rows or columns from a dataset matching one or more boolean criteria without altering the underlying source table.",
    parameters: [
      { name: "array", desc: "The source range or structured table to be filtered." },
      { name: "include", desc: "A boolean array condition; combine multiple conditions with * (AND) or + (OR)." },
      { name: "if_empty", desc: "Optional fallback value (e.g. \"No Records\") returned when zero rows meet criteria." }
    ],
    recipe: "=FILTER(tblOrders, (tblOrders[Status]=\"Dispatched\") * (tblOrders[Region]=\"East\"), \"No Orders\")",
    recipeDesc: "Dual-criteria filter extracting only dispatched orders in the East region.",
    returnType: "Spilled 2D Dynamic Array (Filtered Rows × All Columns)",
    excelVer: "Excel 365 / 2021+"
  },
  {
    name: "UNIQUE",
    syntax: "=UNIQUE(array, [by_col], [exactly_once])",
    category: "Core Pipeline",
    categoryColor: "sky",
    purpose: "Deduplicates a 1D column vector or multi-column matrix, returning distinct values or items that occur strictly once.",
    parameters: [
      { name: "array", desc: "The range or spilled array from which to isolate distinct elements." },
      { name: "by_col", desc: "FALSE/omitted to compare rows (standard); TRUE to compare distinct columns." },
      { name: "exactly_once", desc: "FALSE/omitted for distinct values; TRUE for unique items appearing exactly 1 time." }
    ],
    recipe: "=UNIQUE(CHOOSECOLS(FILTER(tblStaff, tblStaff[Active]=TRUE), 2, 3))",
    recipeDesc: "Isolates distinct Department-Role pairs for active employees.",
    returnType: "Spilled 1D Distinct Vector or 2D Matrix",
    excelVer: "Excel 365 / 2021+"
  },
  {
    name: "SORT",
    syntax: "=SORT(array, [sort_index], [sort_order], [by_col])",
    category: "Sorting & Ranking",
    categoryColor: "emerald",
    purpose: "Dynamically sorts an array or spilled matrix by one or multiple column indices in ascending (1) or descending (-1) order.",
    parameters: [
      { name: "array", desc: "The array or spilled range to be sorted." },
      { name: "sort_index", desc: "1-based column number within the array on which to sort (default: 1)." },
      { name: "sort_order", desc: "1 for Ascending (default), -1 for Descending." },
      { name: "by_col", desc: "FALSE to sort rows (default); TRUE to sort columns horizontally." }
    ],
    recipe: "=SORT(FILTER(tblProducts, tblProducts[Stock]>0), 3, -1)",
    recipeDesc: "Filters in-stock products and sorts them by the 3rd column (e.g., Revenue) in descending order.",
    returnType: "Spilled 2D Matrix (Identical Dimensions, Re-Ordered)",
    excelVer: "Excel 365 / 2021+"
  },
  {
    name: "SORTBY",
    syntax: "=SORTBY(array, by_array1, [order1], [by_array2, order2], ...)",
    category: "Sorting & Ranking",
    categoryColor: "emerald",
    purpose: "Sorts an array based on the values in one or more corresponding companion vectors without requiring the sorting columns to appear in the output matrix.",
    parameters: [
      { name: "array", desc: "The range or spilled array you want to return." },
      { name: "by_array1", desc: "The companion column/array by which to sort (must have matching row length)." },
      { name: "order1", desc: "1 for Ascending, -1 for Descending." }
    ],
    recipe: "=SORTBY(tblStaff[Name], tblStaff[TenureMonths], -1, tblStaff[Salary], 1)",
    recipeDesc: "Returns employee names sorted first by longest tenure, then by lowest salary.",
    returnType: "Spilled 1D Vector or 2D Matrix Sorted by External Vectors",
    excelVer: "Excel 365 / 2021+"
  },
  {
    name: "CHOOSECOLS",
    syntax: "=CHOOSECOLS(array, col_num1, [col_num2], ...)",
    category: "Reshaping & Slicing",
    categoryColor: "indigo",
    purpose: "Extracts and re-orders specific columns from an array or structured table. Supports negative indices to count from right to left (e.g., -1 for the last column).",
    parameters: [
      { name: "array", desc: "The 2D array or structured table source." },
      { name: "col_num1, ...", desc: "Positive integer from left (1=first col), or negative from right (-1=last col)." }
    ],
    recipe: "=CHOOSECOLS(FILTER(tblCustomers, tblCustomers[Spend]>10000), 1, 4, -1)",
    recipeDesc: "Selects Customer ID (col 1), City (col 4), and Total Lifetime Value (last col) from filtered high-value clients.",
    returnType: "Spilled 2D Matrix with Projected Column Subset",
    excelVer: "Excel 365 / 2024+"
  },
  {
    name: "CHOOSEROWS",
    syntax: "=CHOOSEROWS(array, row_num1, [row_num2], ...)",
    category: "Reshaping & Slicing",
    categoryColor: "indigo",
    purpose: "Extracts and rearranges specific rows from a 2D matrix by index. Negative numbers index from the bottom (e.g., -1 returns the bottom-most row).",
    parameters: [
      { name: "array", desc: "The source 2D grid or dynamic array." },
      { name: "row_num1, ...", desc: "Positive integer from top (1=first row), or negative from bottom (-1=last row)." }
    ],
    recipe: "=CHOOSEROWS(SORT(tblScores, 2, -1), 1, 2, 3)",
    recipeDesc: "Pulls the top 3 gold, silver, and bronze leaderboard records after dynamic sorting.",
    returnType: "Spilled 2D Matrix with Selected Row Subsets",
    excelVer: "Excel 365 / 2024+"
  },
  {
    name: "VSTACK",
    syntax: "=VSTACK(array1, [array2], ...)",
    category: "Stacking & Consolidation",
    categoryColor: "amber",
    purpose: "Vertically appends multiple tables, ranges, or arrays into a single continuous unified dataset. Automatically aligns column widths and pads mismatches with #N/A.",
    parameters: [
      { name: "array1, array2, ...", desc: "Two or more arrays/ranges to stack vertically top-to-bottom." }
    ],
    recipe: "=VSTACK({\"Region\",\"Rep\",\"Revenue\"}, FILTER(tblQ1, tblQ1[Rev]>0), FILTER(tblQ2, tblQ2[Rev]>0))",
    recipeDesc: "Injects static header labels and stacks Q1 and Q2 sales reports into one master spilled feed.",
    returnType: "Spilled 2D Consolidated Matrix (Total Rows = Sum of Rows)",
    excelVer: "Excel 365 / 2024+"
  },
  {
    name: "HSTACK",
    syntax: "=HSTACK(array1, [array2], ...)",
    category: "Stacking & Consolidation",
    categoryColor: "amber",
    purpose: "Horizontally joins multiple arrays, individual columns, or calculated vectors side-by-side into a single cohesive matrix.",
    parameters: [
      { name: "array1, array2, ...", desc: "Two or more arrays/vectors to place side-by-side left-to-right." }
    ],
    recipe: "=LET(uReps, UNIQUE(tblSales[Rep]), HSTACK(uReps, COUNTIFS(tblSales[Rep], uReps), SUMIFS(tblSales[Amount], tblSales[Rep], uReps)))",
    recipeDesc: "Constructs a 3-column summary matrix: Rep Name, Total Deal Count, and Total Sum in a single formula.",
    returnType: "Spilled 2D Consolidated Matrix (Total Cols = Sum of Cols)",
    excelVer: "Excel 365 / 2024+"
  },
  {
    name: "TAKE",
    syntax: "=TAKE(array, rows, [columns])",
    category: "Subsets & Slicing",
    categoryColor: "teal",
    purpose: "Returns a contiguous slice of rows or columns from the start or end of an array. Positive numbers take from the beginning; negative numbers take from the end.",
    parameters: [
      { name: "array", desc: "The source array to slice." },
      { name: "rows", desc: "+N for top N rows; -N for bottom N rows; omitted for all rows." },
      { name: "columns", desc: "+M for leftmost M cols; -M for rightmost M cols; omitted for all cols." }
    ],
    recipe: "=TAKE(SORT(tblProducts, 4, -1), 5, 3)",
    recipeDesc: "Extracts the Top 5 products by revenue and restricts output to the first 3 columns.",
    returnType: "Spilled 2D Sub-matrix (Slice Dimensions)",
    excelVer: "Excel 365 / 2024+"
  },
  {
    name: "DROP",
    syntax: "=DROP(array, rows, [columns])",
    category: "Subsets & Slicing",
    categoryColor: "teal",
    purpose: "Excludes a specified number of rows or columns from the edges of an array. Commonly used to strip raw headers or remove tail totals before matrix processing.",
    parameters: [
      { name: "array", desc: "The source array from which to remove elements." },
      { name: "rows", desc: "+N to drop first N rows; -N to drop last N rows." },
      { name: "columns", desc: "+M to drop first M columns; -M to drop last M columns." }
    ],
    recipe: "=DROP(tblImportedLog, 1, 2)",
    recipeDesc: "Strips the top header row and drops the first 2 metadata timestamp columns from an imported log array.",
    returnType: "Spilled 2D Sub-matrix (Filtered Boundary)",
    excelVer: "Excel 365 / 2024+"
  },
  {
    name: "TOCOL",
    syntax: "=TOCOL(array, [ignore], [scan_by_column])",
    category: "Flattening & Vectorization",
    categoryColor: "purple",
    purpose: "Transforms any 2D matrix or multi-column grid into a single vertical 1D column vector. Allows selective ignoring of blanks and errors.",
    parameters: [
      { name: "array", desc: "The 2D matrix, range, or multi-column array to flatten." },
      { name: "ignore", desc: "0: Keep all (default); 1: Ignore blanks; 2: Ignore errors; 3: Ignore blanks and errors." },
      { name: "scan_by_column", desc: "FALSE: Read row-by-row (default); TRUE: Read column-by-column." }
    ],
    recipe: "=UNIQUE(TOCOL(B2:M50, 1))",
    recipeDesc: "Unrolls an entire 12-month cross-tab matrix into a clean, single-column deduplicated list with blank cells omitted.",
    returnType: "Spilled 1D Vertical Column Vector",
    excelVer: "Excel 365 / 2024+"
  },
  {
    name: "TOROW",
    syntax: "=TOROW(array, [ignore], [scan_by_column])",
    category: "Flattening & Vectorization",
    categoryColor: "purple",
    purpose: "Flattens any 2D matrix or multi-row grid into a single horizontal 1D row vector.",
    parameters: [
      { name: "array", desc: "The 2D matrix or range to transform horizontally." },
      { name: "ignore", desc: "0: Keep all; 1: Ignore blanks; 2: Ignore errors; 3: Ignore blanks & errors." },
      { name: "scan_by_column", desc: "FALSE: Scan row-by-row; TRUE: Scan column-by-column." }
    ],
    recipe: "=TOROW(UNIQUE(FILTER(tblKPI[MetricName], tblKPI[Active]=TRUE)))",
    recipeDesc: "Generates dynamic horizontal column header ribbons across a dashboard from active KPI names.",
    returnType: "Spilled 1D Horizontal Row Vector",
    excelVer: "Excel 365 / 2024+"
  },
  {
    name: "WRAPROWS",
    syntax: "=WRAPROWS(vector, wrap_count, [pad_with])",
    category: "Grid Formatting & Wrapping",
    categoryColor: "rose",
    purpose: "Reshapes a 1D vector into a 2D grid by wrapping values into consecutive new rows after reaching `wrap_count` columns per row.",
    parameters: [
      { name: "vector", desc: "The 1D input array or vector of values." },
      { name: "wrap_count", desc: "Maximum number of values/columns in each row." },
      { name: "pad_with", desc: "Fallback value (e.g. \"\", \"-\", 0) used to fill remaining empty cells in the final row." }
    ],
    recipe: "=WRAPROWS(SORT(UNIQUE(tblCatalog[SKU])), 4, \"-\")",
    recipeDesc: "Arranges a flat SKU list into a clean 4-column product catalog grid with '-' padding empty slots.",
    returnType: "Spilled 2D Matrix (Wrap Dimension: N Rows × wrap_count Columns)",
    excelVer: "Excel 365 / 2024+"
  },
  {
    name: "WRAPCOLS",
    syntax: "=WRAPCOLS(vector, wrap_count, [pad_with])",
    category: "Grid Formatting & Wrapping",
    categoryColor: "rose",
    purpose: "Reshapes a 1D vector into a 2D grid by wrapping values vertically into consecutive new columns after reaching `wrap_count` rows per column.",
    parameters: [
      { name: "vector", desc: "The 1D input array or vector." },
      { name: "wrap_count", desc: "Maximum number of values/rows in each column." },
      { name: "pad_with", desc: "Fallback value for unused matrix cells in the final column." }
    ],
    recipe: "=WRAPCOLS(tblShiftCalendar[EmployeeNames], 7, \"OFF\")",
    recipeDesc: "Builds a 7-day weekly rotation roster grid, filling off-days with 'OFF'.",
    returnType: "Spilled 2D Matrix (Wrap Dimension: wrap_count Rows × M Columns)",
    excelVer: "Excel 365 / 2024+"
  },
  {
    name: "EXPAND",
    syntax: "=EXPAND(array, rows, [columns], [pad_with])",
    category: "Grid Formatting & Wrapping",
    categoryColor: "rose",
    purpose: "Expands or pads an array to target dimensions, filling newly generated cells with a custom default value.",
    parameters: [
      { name: "array", desc: "The initial array to expand." },
      { name: "rows", desc: "Target total row count." },
      { name: "columns", desc: "Target total column count (optional)." },
      { name: "pad_with", desc: "Custom filler value (default: #N/A)." }
    ],
    recipe: "=EXPAND(tblQuarterSummary, 12, 4, 0)",
    recipeDesc: "Forces a 4-quarter summary table into a 12-month standard matrix padded with zeroes for missing months.",
    returnType: "Spilled 2D Padded Matrix (Target Rows × Target Cols)",
    excelVer: "Excel 365 / 2024+"
  },
  {
    name: "XLOOKUP",
    syntax: "=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])",
    category: "Vectorized Lookups",
    categoryColor: "cyan",
    purpose: "Performs exact, wildcard, or approximate lookups in any direction, and natively returns entire spilled multi-column arrays or dynamic matrices.",
    parameters: [
      { name: "lookup_value", desc: "Value or spilled vector (e.g., A2#) to search for." },
      { name: "lookup_array", desc: "1D vector or range to search within." },
      { name: "return_array", desc: "Range, multi-column table, or matrix to retrieve." },
      { name: "if_not_found", desc: "Custom error handler string if match is absent." }
    ],
    recipe: "=XLOOKUP(A2#, tblMaster[EmpID], tblMaster[[Name]:[Department]], \"Unknown Employee\")",
    recipeDesc: "Broadcasts over an entire spilled employee ID vector (A2#) returning multi-column names and departments in real-time.",
    returnType: "Spilled 1D/2D Array Matching Lookup Vector & Return Dimensions",
    excelVer: "Excel 365 / 2021+"
  },
  {
    name: "# (Spill Operator)",
    syntax: "OriginCell# (e.g., A2#)",
    category: "Spill Reference",
    categoryColor: "amber",
    purpose: "Directly references the entire footprint of any spilled dynamic array from its top-left origin cell. Automatically expands and contracts as underlying data changes.",
    parameters: [
      { name: "OriginCell", desc: "The top-left cell coordinate where the dynamic array formula was entered." }
    ],
    recipe: "=SUM(FILTER(B2#, C2#=\"High\"))",
    recipeDesc: "Aggregates only high-priority values from dynamic arrays B2# and C2# without hardcoding fixed row ranges like B2:B500.",
    returnType: "Dynamic Range Pointer / Memory Reference",
    excelVer: "Excel 365 / 2021+"
  }
];

export default function Topic15() {
  const sectionsRef = useRef([]);
  const [funcSearch, setFuncSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [copiedRecipeIndex, setCopiedRecipeIndex] = useState(null);

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
    link.download = "004_001_modern-lookup-and-dynamic-array-functions_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyFormulaRecipe = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedRecipeIndex(idx);
    setTimeout(() => setCopiedRecipeIndex(null), 2000);
  };

  const categories = useMemo(() => {
    const set = new Set(MATRIX_PIPELINE_FUNCTIONS.map(f => f.category));
    return ["ALL", ...Array.from(set)];
  }, []);

  const filteredFunctions = useMemo(() => {
    return MATRIX_PIPELINE_FUNCTIONS.filter((fn) => {
      const matchCat = selectedCategory === "ALL" || fn.category === selectedCategory;
      if (!matchCat) return false;
      if (!funcSearch.trim()) return true;
      const q = funcSearch.toLowerCase().trim();
      return (
        fn.name.toLowerCase().includes(q) ||
        fn.syntax.toLowerCase().includes(q) ||
        fn.purpose.toLowerCase().includes(q) ||
        fn.category.toLowerCase().includes(q) ||
        fn.recipe.toLowerCase().includes(q) ||
        fn.returnType.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, funcSearch]);

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
              {"⚡ Advanced #Spill Matrix Transformations (LET + UNIQUE + FILTER)"} · Topic 15
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              {"Advanced #Spill Matrix Pipelines"}
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              {"Ultra-Expert · Bloom Level 6: Evaluate"}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            {"Advanced #Spill Matrix Transformations: Combining LET, UNIQUE, FILTER, and Dynamic Range Reshaping"}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            {"Constructing multi-stage dynamic array pipelines: orchestrating LET, UNIQUE, FILTER, SORT, and dynamic grid reshaping functions into single, high-performance vectorized calculation pipelines"}. Master syntax architecture, mathematical order of operations, dynamic spilling, and error-free execution.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Subject Code:</strong> EXCEL-PRO-901</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Module:</strong> {"004_001_modern-lookup-and-dynamic-array-functions"}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Accreditation:</strong> Coder &amp; AccoTax Centre of Excellence</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: MASTER FUNCTIONS REFERENCE TABLE FOR THIS TOPIC
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/80 border border-slate-800 shadow-2xl space-y-6 hover:border-slate-700 transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 text-base font-mono">📊</span>
                Modern Matrix &amp; Array Transformation Functions Reference Table
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Comprehensive directory of all 18 functions used to construct, slice, reshape, stack, and evaluate dynamic #spill array pipelines.
              </p>
            </div>
            <span className="self-start md:self-auto text-xs font-mono text-sky-300 bg-sky-950/80 px-3.5 py-1.5 rounded-xl border border-sky-800 shadow-inner">
              {filteredFunctions.length} of {MATRIX_PIPELINE_FUNCTIONS.length} Functions Showing
            </span>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={funcSearch}
                onChange={(e) => setFuncSearch(e.target.value)}
                placeholder="Filter by function name, syntax, category (e.g. LET, WRAPROWS, VSTACK)..."
                className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/30 transition-all"
              />
              {funcSearch && (
                <button
                  onClick={() => setFuncSearch("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200",
                    selectedCategory === cat
                      ? "bg-sky-500 text-white shadow-lg shadow-sky-950"
                      : "bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700"
                  )}
                >
                  {cat === "ALL" ? "All Functions" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Functions Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800/90 bg-slate-950/90 shadow-inner">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 w-44">Function &amp; Category</th>
                  <th className="py-3.5 px-4 w-60">Syntax &amp; Parameters</th>
                  <th className="py-3.5 px-4">Core Pipeline Role &amp; Mechanics</th>
                  <th className="py-3.5 px-4 w-72">Live Transformation Recipe</th>
                  <th className="py-3.5 px-4 w-44">Return Matrix Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredFunctions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500 text-sm">
                      No matching Excel matrix functions found for "{funcSearch}". Try searching "LET", "FILTER", or "UNIQUE".
                    </td>
                  </tr>
                ) : (
                  filteredFunctions.map((fn, idx) => (
                    <tr
                      key={fn.name}
                      className="hover:bg-slate-900/50 transition-colors group"
                    >
                      {/* Function Name & Category */}
                      <td className="py-4 px-4 align-top">
                        <div className="font-mono font-bold text-base text-white flex items-center gap-1.5">
                          <span className="text-sky-400">=</span>{fn.name}
                        </div>
                        <div className="mt-1.5">
                          <span
                            className={clsx(
                              "inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase",
                              fn.categoryColor === "sky" && "bg-sky-950 text-sky-300 border border-sky-800",
                              fn.categoryColor === "emerald" && "bg-emerald-950 text-emerald-300 border border-emerald-800",
                              fn.categoryColor === "indigo" && "bg-indigo-950 text-indigo-300 border border-indigo-800",
                              fn.categoryColor === "amber" && "bg-amber-950 text-amber-300 border border-amber-800",
                              fn.categoryColor === "teal" && "bg-teal-950 text-teal-300 border border-teal-800",
                              fn.categoryColor === "purple" && "bg-purple-950 text-purple-300 border border-purple-800",
                              fn.categoryColor === "rose" && "bg-rose-950 text-rose-300 border border-rose-800",
                              fn.categoryColor === "cyan" && "bg-cyan-950 text-cyan-300 border border-cyan-800"
                            )}
                          >
                            {fn.category}
                          </span>
                        </div>
                        <div className="mt-1 text-[10px] text-slate-500 font-mono">
                          {fn.excelVer}
                        </div>
                      </td>

                      {/* Syntax & Parameters */}
                      <td className="py-4 px-4 align-top space-y-2">
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] sm:text-xs text-sky-300 break-all">
                          {fn.syntax}
                        </div>
                        <div className="space-y-1 text-[11px] text-slate-400">
                          {fn.parameters.map((p) => (
                            <div key={p.name} className="leading-snug">
                              <code className="text-teal-300 font-mono font-semibold">{p.name}</code>: {p.desc}
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Purpose */}
                      <td className="py-4 px-4 align-top">
                        <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                          {fn.purpose}
                        </p>
                      </td>

                      {/* Live Recipe */}
                      <td className="py-4 px-4 align-top space-y-1.5">
                        <div className="relative group/copy p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 font-mono text-[11px] text-emerald-300 break-all">
                          {fn.recipe}
                          <button
                            onClick={() => copyFormulaRecipe(fn.recipe, idx)}
                            className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-mono transition-colors shadow"
                            title="Copy formula recipe to clipboard"
                          >
                            {copiedRecipeIndex === idx ? "✓ Copied" : "Copy"}
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-400 italic leading-snug">
                          {fn.recipeDesc}
                        </p>
                      </td>

                      {/* Return Matrix Type */}
                      <td className="py-4 px-4 align-top">
                        <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-indigo-300 leading-snug">
                          {fn.returnType}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Pipeline Synthesis Principle: </strong>
              The true power of modern Excel stems from nesting these functions inside <code className="text-cyan-300 font-mono font-bold">=LET(...)</code>. By defining variables for intermediate filtered and shaped arrays, Excel stores calculation graphs in RAM and executes instant, single-formula dashboards without helper columns or volatile macros.
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL & THEORETICAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">🔬</span>
              Calculation Engine &amp; Under-The-Hood Mechanics
            </h2>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              Engine Mechanics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div key="0" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">{"1. Vectorized Multi-Stage Array Composition"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Chaining modern array functions into unified pipelines: `=LET(f, FILTER(...), u, UNIQUE(f), s, SORT(u, ...), s)`."}</p>
            </div>
            
            <div key="1" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">{"2. Memory Optimization with LET"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Evaluating computationally heavy filter conditions once in memory, assigning to a local variable, and reusing multiple times with zero performance penalty."}</p>
            </div>
            
            <div key="2" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">{"3. Self-Healing Dynamic Dashboard Feeds"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Spills complete boardroom-ready analytical scorecards that automatically resize to data volume changes."}</p>
            </div>
            
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 text-base font-mono">📐</span>
              Visual Dataflow: {"Advanced #Spill Matrix Pipeline Architecture: Source → LET Scoping → Filter/Unique Deduplication → Spilled Grid Output"}
            </h2>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800">
              Pipeline Architecture
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/80 flex flex-col items-center justify-center overflow-x-auto shadow-inner">
            <svg viewBox="0 0 820 220" className="w-full max-w-4xl h-auto text-slate-200 select-none font-sans">
              <defs>
                <linearGradient id="gradFlowNew_004_001_modern-lookup-and-dynamic-array-functions_15" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.8" />
                </linearGradient>
                <marker id="arrowNew_004_001_modern-lookup-and-dynamic-array-functions_15" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8" />
                </marker>
              </defs>

              {/* Node 1: Input Anchor */}
              <g transform="translate(30, 45)">
                <rect width="210" height="130" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                <rect x="12" y="12" width="186" height="26" rx="6" fill="#1e293b" />
                <text x="105" y="30" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Input Anchor / Vector</text>
                <text x="105" y="75" textAnchor="middle" fill="#38bdf8" fontSize="14" fontFamily="monospace" fontWeight="bold">Source Data</text>
                <text x="105" y="100" textAnchor="middle" fill="#64748b" fontSize="10">Anchor Coordinates</text>
                <text x="105" y="118" textAnchor="middle" fill="#64748b" fontSize="10">Structured Table Field</text>
              </g>

              <path d="M 245 110 L 305 110" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrowNew_004_001_modern-lookup-and-dynamic-array-functions_15)" fill="none" />

              {/* Node 2: Evaluation / Offset Engine */}
              <g transform="translate(315, 30)">
                <rect width="250" height="160" rx="14" fill="#0c4a6e" stroke="#0284c7" strokeWidth="2" />
                <rect x="14" y="14" width="222" height="28" rx="6" fill="#0369a1" />
                <text x="125" y="33" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Formula Evaluation Engine</text>
                <text x="125" y="75" textAnchor="middle" fill="#7dd3fc" fontSize="13" fontFamily="monospace" fontWeight="bold">{"Advanced #Spill Matrix Pipelines"}</text>
                <text x="125" y="100" textAnchor="middle" fill="#bae6fd" fontSize="10">Coordinate Shifting &amp; Slicing</text>
                <text x="125" y="120" textAnchor="middle" fill="#bae6fd" fontSize="10">Spill Vector Array Allocation</text>
                <text x="125" y="140" textAnchor="middle" fill="#38bdf8" fontSize="9" fontStyle="italic">Deterministic In-Memory Grid</text>
              </g>

              <path d="M 570 110 L 630 110" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrowNew_004_001_modern-lookup-and-dynamic-array-functions_15)" fill="none" />

              {/* Node 3: Evaluated Output Deliverable */}
              <g transform="translate(640, 45)">
                <rect width="150" height="130" rx="12" fill="#064e3b" stroke="#059669" strokeWidth="2" />
                <rect x="10" y="12" width="130" height="26" rx="6" fill="#047857" />
                <text x="75" y="30" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Dynamic Result</text>
                <text x="75" y="75" textAnchor="middle" fill="#6ee7b7" fontSize="14" fontFamily="monospace" fontWeight="bold">Spilled Range</text>
                <text x="75" y="105" textAnchor="middle" fill="#a7f3d0" fontSize="10">Instant Auto-Update</text>
              </g>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: INTERACTIVE SPREADSHEET & DIRECT DOWNLOAD PORTAL
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/80 border border-slate-800 shadow-2xl space-y-8 hover:border-slate-700 transition-all duration-300"
        >
          {/* Header & Download Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">📥</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Interactive Practice Workbook &amp; Step-by-Step Lab Guide
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-400">
                Download the master practice workbook, open worksheet tab <code className="text-sky-300 font-mono font-bold bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">EX1616</code>, and complete the 4 hands-on matrix transformation exercises below.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
              <div className="text-right hidden sm:block">
                <span className="text-[11px] font-mono text-emerald-400 block font-bold">Target Sheet: EX1616</span>
                <span className="text-[10px] text-slate-500 block">30-Row Enterprise Dataset</span>
              </div>
              <button
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98]"
                title="Download the full .xlsx practice workbook for this module"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Workbook (.xlsx)</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              EXPLICIT HANDS-ON WORKBOOK PRACTICE INSTRUCTIONS
          ========================================================================= */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">🎯</span> Hands-On Lab Practice Instructions (Worksheet: <code className="text-sky-300 font-mono">EX1616</code>)
              </h3>
              <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                4 Required Lab Tasks
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Task 1 Card */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-800 text-xs font-bold uppercase tracking-wider">
                    Lab Task 1 · Core Pipeline
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">Target Cell: M7</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    Build Vectorized Top-Performer Pipeline (LET + UNIQUE + FILTER + SORT)
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Filter transactions in <code className="text-slate-200 font-mono">A7:I36</code> where <code className="text-slate-200 font-mono">Region = "East"</code> and <code className="text-slate-200 font-mono">Net Revenue &gt; ₹50,000</code>. Extract Rep Name, Department, Product Category, and Revenue, deduplicate, and sort descending.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/90 font-mono text-xs text-sky-300 break-all select-all">
                  {"=LET(src, A7:I36, f, FILTER(src, (INDEX(src,,4)=\"East\")*(INDEX(src,,9)>50000)), u, UNIQUE(CHOOSECOLS(f, 2, 3, 5, 9)), SORT(u, 4, -1))"}
                </div>
                <div className="text-[11px] text-slate-400 flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">✓ Verification:</span>
                  <span>Confirm that a 4-column ranked leaderboard auto-spills starting in cell <code>M7</code> with zero formula dragging.</span>
                </div>
              </div>

              {/* Task 2 Card */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold uppercase tracking-wider">
                    Lab Task 2 · Slicing &amp; Subsets
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">Target Cell: M18</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    Extract Top-5 Enterprise Deals (TAKE + SORT + CHOOSECOLS)
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Isolate the top 5 highest-revenue transactions across all regions and project only columns 1 (Transaction ID), 2 (Rep), 4 (Region), and 9 (Net Revenue).
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/90 font-mono text-xs text-emerald-300 break-all select-all">
                  {"=TAKE(SORT(CHOOSECOLS(A7:I36, 1, 2, 4, 9), 4, -1), 5)"}
                </div>
                <div className="text-[11px] text-slate-400 flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">✓ Verification:</span>
                  <span>Confirm the output displays exactly 5 rows representing the top commercial transactions.</span>
                </div>
              </div>

              {/* Task 3 Card */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs font-bold uppercase tracking-wider">
                    Lab Task 3 · Grid Reshaping
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">Target Cell: M26</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    Reshape Distinct Departments into 4-Column Ribbon (WRAPROWS + UNIQUE)
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Extract distinct company departments from column C (<code className="text-slate-200 font-mono">C7:C36</code>) and wrap them into a 4-column wide executive dashboard ribbon.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/90 font-mono text-xs text-indigo-300 break-all select-all">
                  {"=WRAPROWS(SORT(UNIQUE(C7:C36)), 4, \"N/A\")"}
                </div>
                <div className="text-[11px] text-slate-400 flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">✓ Verification:</span>
                  <span>Confirm that 8 unique departments wrap neatly across 2 rows × 4 columns with zero blanks.</span>
                </div>
              </div>

              {/* Task 4 Card */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-xs font-bold uppercase tracking-wider">
                    Lab Task 4 · Dynamic Spill Pointer
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">Target Cell: M31</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">
                    Aggregate Spilled Array Footprint with Spill Operator (#)
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Calculate the dynamic sum of the filtered revenue column from Task 1 without hardcoding static row bounds like <code className="text-slate-200 font-mono">P7:P20</code>.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/90 font-mono text-xs text-amber-300 break-all select-all">
                  {"=SUM(INDEX(M7#, , 4))"}
                </div>
                <div className="text-[11px] text-slate-400 flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">✓ Verification:</span>
                  <span>Edit a source row in <code>A7:I36</code> to qualify for the filter criteria, and verify that the sum automatically updates with zero formula edits.</span>
                </div>
              </div>
            </div>

            {/* Quick Practice Best-Practice Checkpoints */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/90 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="flex items-start gap-2 text-slate-300">
                <span className="text-emerald-400 text-sm">✓</span>
                <span><strong>No Helper Columns:</strong> Complete all calculations within single, self-contained LET pipelines.</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <span className="text-sky-400 text-sm">✓</span>
                <span><strong>Spill Perimeter Check:</strong> Ensure cells below and to the right are empty to avoid <code className="text-rose-300">#SPILL!</code> collisions.</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <span className="text-amber-400 text-sm">✓</span>
                <span><strong>Audit Verification:</strong> Compare your formulas with the live interactive spreadsheet grid below.</span>
              </div>
            </div>
          </div>

          {/* Interactive Live Spreadsheet Viewer */}
          <div className="pt-2 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Live Spreadsheet Viewer (Sheet: EX1616)
              </span>
              <span className="text-[11px] text-slate-500">
                Preview dataset and formulas live below before downloading
              </span>
            </div>
            <ExcelFileLoader
              fileModule={sampleWorkbookUrl}
              sheetName="EX1616"
              title={"Advanced #Spill Matrix Transformations: Combining LET, UNIQUE, FILTER, and Dynamic Range Reshaping - Interactive Practice Grid"}
              rowsPerPage={10}
              showSheetSelector={true}
            />
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 text-base font-mono">🏢</span>
              Real-World Corporate Implementation Scenarios
            </h2>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800">
              Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div key="0" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{"Case 1 · Chief Commercial Officer"}</span>
                <span className="text-xs font-mono text-slate-400">{"Barrackpore HQ"}</span>
              </div>
              <h3 className="font-bold text-white text-base">{"Swadeep Banerjee: Enterprise Top-Performer Leaderboard Engine"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Builds a single-formula LET/UNIQUE/FILTER pipeline generating a ranked executive leaderboard with zero helper columns."}</p>
            </div>
            
            <div key="1" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{"Case 2 · Corporate Tax Auditor"}</span>
                <span className="text-xs font-mono text-slate-400">{"Shyamnagar Plant"}</span>
              </div>
              <h3 className="font-bold text-white text-base">{"Tuhina Mukherjee: Automated Non-Compliant Vendor Isolation Pipeline"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Extracts, deduplicates, and sorts high-risk tax discrepancy records in 1 spilled formula."}</p>
            </div>
            
            <div key="2" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{"Case 3 · Plant Systems Architect"}</span>
                <span className="text-xs font-mono text-slate-400">{"Ichapur Works"}</span>
              </div>
              <h3 className="font-bold text-white text-base">{"Abhronila Das: Telemetry Anomaly Extraction Matrix"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Filters industrial PLC logs for critical alerts and formats output into clean multi-column tables."}</p>
            </div>
            
            <div key="3" className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{"Case 4 · Logistics Optimization Lead"}</span>
                <span className="text-xs font-mono text-slate-400">{"Naihati Logistics"}</span>
              </div>
              <h3 className="font-bold text-white text-base">{"Debangshu Roy: Multi-Zone Shipping Bottleneck Pipeline"}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{"Constructs live dispatch exception reports using dynamic spilled matrix pipelines."}</p>
            </div>
            
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP PRACTICAL CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 text-base font-mono">🛠️</span>
              Step-by-Step Implementation &amp; Execution Guide
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              Execution Guide
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-emerald-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 flex items-center justify-center text-xs">1</span>
                Step 1: Identify Reference Anchor &amp; Coordinates
              </div>
              <p className="text-slate-300 leading-relaxed">
                Determine the starting cell coordinates or structured table source vector: <code className="text-cyan-300 font-mono font-bold">{"Vectorized Spilling Matrix: =LET(data, FILTER(tblSales, tblSales[Sales]>100000), u, UNIQUE(CHOOSECOLS(data, 2, 3)), SORT(u, 2, -1))"}</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-sky-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-sky-950 border border-sky-700 text-sky-300 flex items-center justify-center text-xs">2</span>
                Step 2: Construct the Formula with Dimensional Bounds
              </div>
              <p className="text-slate-300 leading-relaxed">
                Supply rows, columns, and height/width parameters with proper cell locking ($).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-teal-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-teal-950 border border-teal-700 text-teal-300 flex items-center justify-center text-xs">3</span>
                Step 3: Test Dynamic Boundary Changes &amp; Spilling
              </div>
              <p className="text-slate-300 leading-relaxed">
                Add test rows to confirm the formula dynamically shifts or auto-spills without manual editing.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-indigo-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 flex items-center justify-center text-xs">4</span>
                Step 4: Verify Performance &amp; Volatility
              </div>
              <p className="text-slate-300 leading-relaxed">
                Audit formula calculation speeds and substitute non-volatile INDEX ranges when scaling to large enterprise workbooks.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: COMMON PITFALLS & TROUBLESHOOTING MATRIX
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 text-base font-mono">⚠️</span>
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
                
                <tr key="0" className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">{"Spill Range Reference Syntax Errors"}</td>
                  <td className="py-3 px-4">{"Writing `=SUM(A2)` instead of `=SUM(A2#)` to aggregate spilled arrays."}</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">{"Always append `#` to reference full spilled ranges: `=SUM(A2#)`."}</td>
                </tr>
                
                <tr key="1" className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">{"Unbounded Matrix Spilling Crashing Memory"}</td>
                  <td className="py-3 px-4">{"Filtering 1 million rows without criteria into an unconstrained array."}</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">{"Apply specific filter predicates in LET blocks."}</td>
                </tr>
                
                <tr key="2" className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">{"Circular Calculation in Self-Referencing Dynamic Names"}</td>
                  <td className="py-3 px-4">{"Referencing target spill cell inside formula definition."}</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">{"Maintain strict unidirectional reference flow."}</td>
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
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 text-base font-mono">💡</span>
              Pro Tips &amp; High-Speed Accelerators
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Productivity
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            
            <div key="0" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> {"The Spill Operator (#)"}
              </div>
              <p className="text-slate-300 leading-relaxed">{"References entire spilled array dynamically."}</p>
              <kbd className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-cyan-300 mt-1">{"A2#"}</kbd>
            </div>
            
            <div key="1" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> {"LET Variable Scoping"}
              </div>
              <p className="text-slate-300 leading-relaxed">{"Creates clean, self-documenting high-speed formulas."}</p>
              <kbd className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-cyan-300 mt-1">{"=LET(var1, expr1, var2, expr2, result)"}</kbd>
            </div>
            
            <div key="2" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> {"Clean Empty Array Guard"}
              </div>
              <p className="text-slate-300 leading-relaxed">{"Guarantees clean display when no rows match filter criteria."}</p>
              <kbd className="inline-block px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs text-cyan-300 mt-1">{"IFERROR(FILTER(...), \"No Matches\")"}</kbd>
            </div>
            
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC HINTS ("THINK ABOUT...")
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 text-base font-mono">🤔</span>
              Socratic Analytical Hints ("Think About...")
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Critical Thinking
            </span>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-300">
            
            <div key="0" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 1: {"How does the `LET()` function prevent Excel from calculating the same heavy `FILTER()` or `UNIQUE()` operation multiple times?"}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Reflect on formula evaluation sequence, dynamic memory bounds, and computational efficiency.
              </p>
            </div>
            
            <div key="1" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 2: {"Why is referencing a spilled array with `A2#` vastly superior to hardcoding cell ranges like `A2:A500`?"}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Reflect on formula evaluation sequence, dynamic memory bounds, and computational efficiency.
              </p>
            </div>
            
            <div key="2" className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 3: {"How do modern dynamic array formulas eliminate 90% of legacy VBA automation macros?"}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Reflect on formula evaluation sequence, dynamic memory bounds, and computational efficiency.
              </p>
            </div>
            
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: FREQUENTLY ASKED QUESTIONS (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title={"Advanced #Spill Matrix Transformations: Combining LET, UNIQUE, FILTER, and Dynamic Range Reshaping - Frequently Asked Questions"}
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={"Congratulations on mastering the entire modern #Spill formula ecosystem! By combining LET, UNIQUE, FILTER, SORT, and GROUPBY, you can build executive dashboards that used to require 500 lines of VBA code in just ONE single formula."}
          />
        </div>
      </div>
    </div>
  );
}
