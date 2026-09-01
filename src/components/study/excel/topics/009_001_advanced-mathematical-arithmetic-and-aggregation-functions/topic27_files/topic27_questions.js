const questions = [
  {
    question: "What is the primary objective of Mathematical Formula Optimization in Excel?",
    options: [
      "Minimizing workbook calculation latency, reducing RAM memory consumption, and preventing volatile function recalculation bottlenecks",
      "Increasing formula length for complexity",
      "Disabling automatic save features",
      "Formatting numbers as roman numerals"
    ],
    correctAnswer: 0,
    explanation: "Formula optimization focuses on execution speed, memory footprint reduction, and volatile recalculation prevention."
  },
  {
    question: "Which of the following Excel functions is volatile and forces full workbook recalculation on every user edit?",
    options: [
      "INDIRECT",
      "INDEX",
      "SUMPRODUCT",
      "AGGREGATE"
    ],
    correctAnswer: 0,
    explanation: "INDIRECT, OFFSET, NOW, TODAY, RAND, and CELL are volatile functions that trigger recalculation on every edit."
  },
  {
    question: "Why should INDEX + MATCH be preferred over OFFSET for dynamic range references?",
    options: [
      "INDEX is non-volatile and calculates only when dependent cells change, whereas OFFSET is volatile and recalculates constantly",
      "OFFSET runs 100x faster",
      "INDEX requires VBA",
      "OFFSET works only on text"
    ],
    correctAnswer: 0,
    explanation: "INDEX is non-volatile, keeping calculation dependency chains fast and clean."
  },
  {
    question: "How does using LET function optimize complex mathematical formulas with repeated sub-expressions?",
    options: [
      "LET evaluates intermediate sub-expressions once and reuses the named variable, avoiding redundant re-calculations",
      "LET compresses cell font sizes",
      "LET deletes background gridlines",
      "LET disables formula viewing"
    ],
    correctAnswer: 0,
    explanation: "LET stores calculated values in named variables, eliminating duplicate work."
  },
  {
    question: "Why should whole-column references like A:A be avoided inside array formulas like SUMPRODUCT?",
    options: [
      "Whole-column references force Excel to process 1,048,576 rows across all array matrices, causing severe CPU lag",
      "Whole-column references return #VALUE!",
      "Whole columns are limited to 10 rows",
      "Whole-column references disable Excel"
    ],
    correctAnswer: 0,
    explanation: "Full-column references evaluate over 1 million rows per matrix multiplication, generating massive CPU overhead."
  },
  {
    question: "Which lookup method delivers instantaneous sub-millisecond lookups across 500,000 rows?",
    options: [
      "XLOOKUP or INDEX/MATCH with binary search (sorted data)",
      "INDIRECT + VLOOKUP",
      "OFFSET + MATCH",
      "Nested IF statements"
    ],
    correctAnswer: 0,
    explanation: "Binary search algorithms achieve O(log N) lookup speeds on sorted data."
  },
  {
    question: "What is the recommended calculation mode setting when developing massive 100MB+ financial modeling workbooks?",
    options: [
      "Manual Calculation Mode (with F9 manual recalculation)",
      "Automatic Calculation Mode",
      "Iterative Calculation Mode with 10,000 steps",
      "Disabled Calculation"
    ],
    correctAnswer: 0,
    explanation: "Manual calculation mode prevents spreadsheet lag while editing heavy models."
  },
  {
    question: "How can helper columns improve overall model calculation speed compared to mega-formulas?",
    options: [
      "Helper columns leverage Excel's multi-threaded calculation engine and allow intermediate caching of sub-results",
      "Helper columns make formulas secret",
      "Helper columns reduce file size",
      "Helper columns prevent printing"
    ],
    correctAnswer: 0,
    explanation: "Excel calculates separate helper columns in parallel across multiple CPU threads."
  },
  {
    question: "What key combination triggers a forced full recalculation of all formulas in all open workbooks in Excel?",
    options: [
      "CTRL + ALT + F9",
      "F9",
      "SHIFT + F9",
      "ALT + F4"
    ],
    correctAnswer: 0,
    explanation: "CTRL + ALT + F9 rebuilds the dependency tree and forces full recalculation."
  },
  {
    question: "What is the impact of excessive array formula calculations across 50,000 rows on multi-core CPUs?",
    options: [
      "Calculation time scales exponentially if non-optimized, pinning CPU cores at 100% usage",
      "It speeds up Windows",
      "It deletes formulas automatically",
      "It turns cells red"
    ],
    correctAnswer: 0,
    explanation: "Unoptimized array formulas across large datasets saturate CPU resources."
  },
  {
    question: "Which of the following functions is NON-volatile and safe for high-performance financial models?",
    options: [
      "INDEX",
      "OFFSET",
      "INDIRECT",
      "TODAY"
    ],
    correctAnswer: 0,
    explanation: "INDEX is non-volatile."
  },
  {
    question: "Which of the following functions IS volatile and should be minimized in large models?",
    options: [
      "OFFSET",
      "INDEX",
      "XLOOKUP",
      "SUMPRODUCT"
    ],
    correctAnswer: 0,
    explanation: "OFFSET is volatile."
  },
  {
    question: "How does boolean multiplication (Cond1 * Cond2) in SUMPRODUCT compare to double unary (--Cond1 * --Cond2)?",
    options: [
      "Boolean multiplication automatically coerces TRUE/FALSE to 1/0 during arithmetic, performing identically in performance",
      "Boolean multiplication causes #VALUE!",
      "Double unary is 100x slower",
      "They cannot be combined"
    ],
    correctAnswer: 0,
    explanation: "Arithmetic operations (+, *) automatically coerce boolean values to numbers."
  },
  {
    question: "In formula optimization, what is 'short-circuit evaluation' in logical functions like AND and OR?",
    options: [
      "Evaluating conditions sequentially and stopping as soon as the outcome is mathematically determined",
      "Shortening formula names",
      "Deleting false branches",
      "Converting text to numbers"
    ],
    correctAnswer: 0,
    explanation: "Short-circuiting stops evaluation early when conditions fail."
  },
  {
    question: "What tool in Excel allows profiling exact calculation times for specific worksheets or ranges?",
    options: [
      "VBA Timer / Performance Profiler macros",
      "Spell Check",
      "Format Painter",
      "Conditional Formatting Manager"
    ],
    correctAnswer: 0,
    explanation: "VBA timers (`Application.CalculationTimer`) profile exact worksheet calculation milliseconds."
  },
  {
    question: "What is the result of =LET(x, 10, y, 20, x * y)?",
    options: [
      "200",
      "30",
      "1020",
      "#VALUE!"
    ],
    correctAnswer: 0,
    explanation: "LET assigns x=10, y=20 and evaluates 10 * 20 = 200."
  },
  {
    question: "What is the result of =LET(val, SUM(A1:A5), val * val) if SUM(A1:A5) = 15?",
    options: [
      "225",
      "30",
      "15",
      "450"
    ],
    correctAnswer: 0,
    explanation: "SUM(A1:A5) is evaluated ONCE to 15, then squared: 15 * 15 = 225."
  },
  {
    question: "Why does evaluating SUM(A1:A5) once inside LET(val, SUM(A1:A5), val * val) optimize speed compared to SUM(A1:A5) * SUM(A1:A5)?",
    options: [
      "Because SUM(A1:A5) is calculated only 1 time instead of 2 times",
      "Because LET changes formula font",
      "Because SUM runs 10x faster in LET",
      "Because array formulas are disabled"
    ],
    correctAnswer: 0,
    explanation: "LET reuses cached variable values instead of re-evaluating range sums."
  },
  {
    question: "What is the effect of conditional formatting rules containing volatile formulas (e.g. =OFFSET(...)) on scrolling speed?",
    options: [
      "It causes severe screen stuttering and UI lag during scrolling because conditional rules recalculate on screen refresh",
      "It speeds up scrolling",
      "It locks screen focus",
      "It changes screen resolution"
    ],
    correctAnswer: 0,
    explanation: "Volatile conditional formatting triggers continuous recalculation on every screen repaint."
  },
  {
    question: "How can structured Excel Tables improve calculation efficiency?",
    options: [
      "By limiting formula ranges exactly to the populated data rows, eliminating empty cell evaluations",
      "By changing cell border styles",
      "By hiding gridlines",
      "By converting formulas to text"
    ],
    correctAnswer: 0,
    explanation: "Table structured references constrain calculation boundaries strictly to active rows."
  },
  {
    question: "What is the key shortcut to recalculate only the active worksheet in manual calculation mode?",
    options: [
      "SHIFT + F9",
      "F9",
      "CTRL + ALT + F9",
      "ALT + F11"
    ],
    correctAnswer: 0,
    explanation: "SHIFT + F9 recalculates only the current active worksheet."
  },
  {
    question: "What is the key shortcut to recalculate all open workbooks in manual calculation mode?",
    options: [
      "F9",
      "SHIFT + F9",
      "ALT + F9",
      "CTRL + F9"
    ],
    correctAnswer: 0,
    explanation: "F9 recalculates all open workbooks."
  },
  {
    question: "Why should array formulas inside SUMPRODUCT avoid nested IFERROR or IF text checks over millions of cells?",
    options: [
      "Because string comparisons and error trapping add significant CPU cycles compared to pure numeric arithmetic",
      "Because IFERROR returns #VALUE!",
      "Because text comparisons are prohibited",
      "Because SUMPRODUCT cannot handle text"
    ],
    correctAnswer: 0,
    explanation: "String parsing is CPU-intensive compared to vectorized numeric arithmetic."
  },
  {
    question: "What is the best alternative to using multiple SUMIFS formulas across 100 columns?",
    options: [
      "Using Pivot Tables or Data Model (Power Pivot / DAX) for multi-dimensional aggregation",
      "Writing 100 nested IF statements",
      "Using manual addition",
      "Converting numbers to text"
    ],
    correctAnswer: 0,
    explanation: "Pivot Tables and Power Pivot DAX engines compress data in memory for sub-second aggregations."
  },
  {
    question: "What happens to calculation speed when external workbook links (e.g. 'C:\[Model.xlsx]Sheet1'!A1) are used extensively inside volatile functions?",
    options: [
      "Excel experiences severe network and file I/O latency retrieving closed workbook data",
      "Speed improves 10x",
      "Workbook size shrinks",
      "External links are ignored"
    ],
    correctAnswer: 0,
    explanation: "External link resolution requires slow disk/network file read operations."
  },
  {
    question: "How does binary search lookup mode (match_type = 1 or TRUE) in XLOOKUP/VLOOKUP compare to exact match (0 or FALSE)?",
    options: [
      "Binary search completes in O(log N) time (nearly instantaneous), whereas exact match requires O(N) linear scanning",
      "Linear scan is faster",
      "Binary search works only on text",
      "Exact match requires no memory"
    ],
    correctAnswer: 0,
    explanation: "Binary search cuts search space in half repeatedly, achieving O(log N) performance on sorted data."
  },
  {
    question: "What is the result of =LET(a, 5, b, a * 2, c, b + 3, c)?",
    options: [
      "13",
      "10",
      "15",
      "8"
    ],
    correctAnswer: 0,
    explanation: "a=5, b=10, c=13. Output = 13."
  },
  {
    question: "What is the recommended design strategy for workbook formula optimization?",
    options: [
      "Eliminate volatile functions, use LET for repeated sub-expressions, constrain ranges to active data, and leverage structured tables",
      "Use whole-column references everywhere",
      "Add INDIRECT to every formula",
      "Disable multi-threading"
    ],
    correctAnswer: 0,
    explanation: "High-performance modeling combines non-volatile functions, LET variable caching, and bounded ranges."
  },
  {
    question: "What is the ultimate takeaway for Mathematical Formula Optimization in large-scale Excel modeling?",
    options: [
      "Optimized formulas minimize calculation bottlenecks, ensure sub-second recalculation speed, and scale smoothly across multi-core CPUs",
      "Use manual calculators",
      "Never use Excel for math",
      "Convert all formulas to hardcoded values"
    ],
    correctAnswer: 0,
    explanation: "Formula optimization turns slow laggy spreadsheets into lightning-fast enterprise models."
  },
  {
    question: "What does the LET function return?",
    options: [
      "The result of the final expression evaluated using the preceding assigned variables",
      "The list of variable names",
      "TRUE or FALSE",
      "The count of variables"
    ],
    correctAnswer: 0,
    explanation: "LET evaluates the final expression argument after assigning all named variables."
  }
];

export default questions;
