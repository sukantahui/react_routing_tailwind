// topic8_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 8
// Topic: Column-by-column matrix processing with BYCOL
// Module: 004_003_custom-functions-with-lambda-and-helper-engines
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function of BYCOL in Excel 365's Helper Engine?",
    shortAnswer: "To apply a custom LAMBDA function to each individual column of an array or matrix, returning a 1D horizontal row vector of column-level aggregated results.",
    explanation: "BYCOL slices a 2D matrix column-by-column, passing each complete vertical column vector into the LAMBDA function.",
    hint: "Column-by-column matrix aggregation.",
    level: "basic",
    codeExample: "=BYCOL(Matrix, LAMBDA(c, AVERAGE(c)))"
  },
  {
    question: "What is the syntax signature of the BYCOL function?",
    shortAnswer: "=BYCOL(array, lambda)",
    explanation: "BYCOL accepts a 2D matrix and terminates with a LAMBDA declaring exactly 1 parameter representing the column vector.",
    hint: "Array followed by a 1-parameter LAMBDA.",
    level: "basic",
    codeExample: "=BYCOL(C5:F8, LAMBDA(col, SUM(col)))"
  },
  {
    question: "What are the output dimensions of a formula using BYCOL on an (M x N) matrix?",
    shortAnswer: "A (1 x N) horizontal row vector containing N scalar values (1 result per column).",
    explanation: "BYCOL reduces an N-column matrix into N aggregated scalar values across a single horizontal row.",
    hint: "Returns a 1 x N horizontal row vector.",
    level: "basic",
    codeExample: "(M x N) Matrix → (1 x N) Row Vector"
  },
  {
    question: "How do you calculate monthly sales averages across 4 branch locations using BYCOL?",
    shortAnswer: "=BYCOL(SalesMatrix, LAMBDA(col, AVERAGE(col)))",
    explanation: "Passes each monthly sales column vector into AVERAGE, returning a 4-value horizontal summary row.",
    hint: "AVERAGE(col) inside BYCOL.",
    level: "basic",
    codeExample: "=BYCOL(C5:F8, LAMBDA(c, AVERAGE(c)))"
  },
  {
    question: "How does BYCOL differ from BYROW?",
    shortAnswer: "BYCOL slices vertically (down columns) returning a horizontal row vector; BYROW slices horizontally (across rows) returning a vertical column vector.",
    explanation: "BYCOL aggregates down Axis 0; BYROW aggregates across Axis 1.",
    hint: "BYCOL aggregates columns; BYROW aggregates rows.",
    level: "basic",
    codeExample: "BYCOL (Horizontal Row Result) vs BYROW (Vertical Column Result)"
  },
  {
    question: "How do you attach a BYCOL summary row directly to the bottom of a data table using VSTACK?",
    shortAnswer: "=VSTACK(MasterTable, BYCOL(MasterTable, LAMBDA(c, SUM(c))))",
    explanation: "VSTACK appends the 1D horizontal row vector of column sums to the bottom of the data grid in memory.",
    hint: "VSTACK(Table, BYCOL(Table, ...)).",
    level: "advanced",
    codeExample: "=VSTACK(C5:F8, BYCOL(C5:F8, LAMBDA(c, SUM(c))))"
  },
  {
    question: "What error occurs if the LAMBDA inside BYCOL returns an array instead of a single scalar value?",
    shortAnswer: "#CALC! error.",
    explanation: "BYCOL requires each column evaluation to produce a single scalar result.",
    hint: "Nested array returns trigger #CALC!.",
    level: "moderate",
    codeExample: "#CALC!"
  },
  {
    question: "How do you find the highest monthly revenue recorded in each department column using BYCOL?",
    shortAnswer: "=BYCOL(RevenueMatrix, LAMBDA(c, MAX(c)))",
    explanation: "Passes each department column vector into MAX, returning a horizontal row of column maximums.",
    hint: "MAX(c) inside BYCOL.",
    level: "basic",
    codeExample: "=BYCOL(C5:F8, LAMBDA(col, MAX(col)))"
  },
  {
    question: "Can BYCOL evaluate whether every cell in a column is greater than zero using AND?",
    shortAnswer: "=BYCOL(Matrix, LAMBDA(c, AND(c>0)))",
    explanation: "Returns TRUE for columns that contain 100% positive values; FALSE if any cell is zero or negative.",
    hint: "AND(c>0) inside BYCOL.",
    level: "moderate",
    codeExample: "=BYCOL(C5:F8, LAMBDA(c, AND(c>0)))"
  },
  {
    question: "How do you calculate the standard deviation of each quarterly performance column using BYCOL?",
    shortAnswer: "=BYCOL(QuarterlyMatrix, LAMBDA(c, STDEV.S(c)))",
    explanation: "Evaluates sample standard deviation across each column vector.",
    hint: "STDEV.S(c) inside BYCOL.",
    level: "moderate",
    codeExample: "=BYCOL(C5:F8, LAMBDA(c, STDEV.S(c)))"
  },
  {
    question: "What happens if destination cells where BYCOL needs to spill horizontally contain existing data?",
    shortAnswer: "#SPILL! error.",
    explanation: "Like all dynamic array functions, BYCOL requires an unobstructed horizontal spill footprint.",
    hint: "Blocked horizontal spill zone triggers #SPILL!.",
    level: "basic",
    codeExample: "#SPILL!"
  },
  {
    question: "How can you count the number of non-blank transactions in each column using BYCOL?",
    shortAnswer: "=BYCOL(DataMatrix, LAMBDA(c, COUNTA(c)))",
    explanation: "Passes each column to COUNTA, returning a horizontal row of transaction counts.",
    hint: "COUNTA(c) inside BYCOL.",
    level: "basic",
    codeExample: "=BYCOL(A2:D50, LAMBDA(c, COUNTA(c)))"
  },
  {
    question: "How do you calculate the interquartile range (IQR = Q3 - Q1) for each column using BYCOL and PERCENTILE?",
    shortAnswer: "=BYCOL(Matrix, LAMBDA(c, PERCENTILE.INC(c, 0.75) - PERCENTILE.INC(c, 0.25)))",
    explanation: "Computes the statistical spread (Q3 minus Q1) for each column vector in RAM.",
    hint: "PERCENTILE(c, 0.75) - PERCENTILE(c, 0.25) inside BYCOL.",
    level: "advanced",
    codeExample: "=BYCOL(Data, LAMBDA(c, QUARTILE(c, 3) - QUARTILE(c, 1)))"
  },
  {
    question: "Can an existing named LAMBDA in Name Manager be passed into BYCOL directly?",
    shortAnswer: "Yes, you can write =BYCOL(Matrix, FX_COL_SUMMARY) without re-declaring the LAMBDA.",
    explanation: "Named LAMBDAs act as first-class function pointers in higher-order helper engines.",
    hint: "Pass named LAMBDA identifier directly into BYCOL.",
    level: "advanced",
    codeExample: "=BYCOL(A2:E20, FX_COL_MEAN)"
  },
  {
    question: "How do you calculate the median value of each column across 10 branch locations using BYCOL?",
    shortAnswer: "=BYCOL(BranchMatrix, LAMBDA(c, MEDIAN(c)))",
    explanation: "Passes each column vector into MEDIAN, returning a horizontal row of column medians.",
    hint: "MEDIAN(c) inside BYCOL.",
    level: "basic",
    codeExample: "=BYCOL(B2:K50, LAMBDA(c, MEDIAN(c)))"
  },
  {
    question: "What happens if you pass a 1D horizontal row vector into BYCOL instead of a 2D matrix?",
    shortAnswer: "BYCOL evaluates each 1-element column and returns an identical 1D horizontal row vector.",
    explanation: "A horizontal vector is treated as a (1 x N) matrix, passing a 1-element column into the LAMBDA per column.",
    hint: "Treated as a 1 x N matrix.",
    level: "moderate",
    codeExample: "=BYCOL(A1:E1, LAMBDA(c, c*2))"
  },
  {
    question: "How do you test a BYCOL formula in memory using the F9 key?",
    shortAnswer: "Highlight =BYCOL(...) in the formula bar and press F9 to inspect the resulting horizontal row array in RAM.",
    explanation: "F9 renders the evaluated horizontal array in the formula bar for instant verification.",
    hint: "Highlight and press F9 in formula bar.",
    level: "basic",
    codeExample: "F9 Memory Array Evaluation"
  },
  {
    question: "How can you check if at least one cell in each column contains a negative number using BYCOL and OR?",
    shortAnswer: "=BYCOL(Matrix, LAMBDA(c, OR(c<0)))",
    explanation: "Returns TRUE for columns that contain any negative values; FALSE for completely non-negative columns.",
    hint: "OR(c<0) inside BYCOL.",
    level: "moderate",
    codeExample: "=BYCOL(C5:F8, LAMBDA(c, OR(c<0)))"
  },
  {
    question: "Can LET be nested inside the LAMBDA of a BYCOL function?",
    shortAnswer: "Yes, nesting LET inside BYCOL allows multi-step mathematical transformations on each individual column vector.",
    explanation: "Allows calculating column metrics, applying weighting, and formatting inside a local scope.",
    hint: "Nest LET inside BYCOL for complex column calculations.",
    level: "advanced",
    codeExample: "=BYCOL(Matrix, LAMBDA(c, LET(m, AVERAGE(c), ROUND(m, 2))))"
  },
  {
    question: "How do you calculate the percentage of column sales exceeding ₹100,000 using BYCOL?",
    shortAnswer: "=BYCOL(SalesMatrix, LAMBDA(c, COUNTIF(c, \">100000\") / ROWS(c)))",
    explanation: "Divides the number of high-value cells in each column by the total row count of the column.",
    hint: "COUNTIF(c, \">100k\") / ROWS(c) inside BYCOL.",
    level: "advanced",
    codeExample: "=BYCOL(C5:F8, LAMBDA(c, SUM(--(c>100000)) / ROWS(c)))"
  },
  {
    question: "Why does BYCOL compute significantly faster than manual column SUM formulas across 50 columns?",
    shortAnswer: "Because BYCOL allocates a single horizontal output vector in compiled multi-threaded C++ RAM without cell parsing overhead.",
    explanation: "Single-pass execution eliminates the overhead of managing 50 separate column formulas.",
    hint: "Single-pass multi-threaded execution in C++ memory.",
    level: "expert",
    codeExample: "Vectorized Column Aggregation"
  },
  {
    question: "How do you concatenate all unique values in each column with a comma separator using BYCOL, UNIQUE, and TEXTJOIN?",
    shortAnswer: "=BYCOL(CategoryMatrix, LAMBDA(c, TEXTJOIN(\", \", TRUE, UNIQUE(c))))",
    explanation: "Extracts unique categories in each column and joins them into a single summary string per column.",
    hint: "TEXTJOIN(\", \", TRUE, UNIQUE(c)) inside BYCOL.",
    level: "expert",
    codeExample: "=BYCOL(A2:D50, LAMBDA(c, TEXTJOIN(\", \", TRUE, UNIQUE(c))))"
  },
  {
    question: "Can BYCOL accept dynamic spilled range anchors (e.g. FilteredGrid#) as its array argument?",
    shortAnswer: "Yes, passing FilteredGrid# allows BYCOL to automatically adjust its output width as columns are dynamically added or removed.",
    explanation: "Full reactivity with upstream dynamic array matrices.",
    hint: "Pass spilled anchor FilteredGrid#.",
    level: "basic",
    codeExample: "=BYCOL(FilteredGrid#, LAMBDA(c, SUM(c)))"
  },
  {
    question: "How do you calculate the range (Max minus Min) for each column using BYCOL?",
    shortAnswer: "=BYCOL(DataMatrix, LAMBDA(c, MAX(c) - MIN(c)))",
    explanation: "Calculates the statistical spread across each individual column vector.",
    hint: "MAX(c) - MIN(c) inside BYCOL.",
    level: "basic",
    codeExample: "=BYCOL(C5:F8, LAMBDA(c, MAX(c) - MIN(c)))"
  },
  {
    question: "How can you determine if a column is completely empty using BYCOL?",
    shortAnswer: "=BYCOL(Matrix, LAMBDA(c, COUNTA(c)=0))",
    explanation: "Returns TRUE for columns that contain zero non-blank cells.",
    hint: "COUNTA(c)=0 inside BYCOL.",
    level: "moderate",
    codeExample: "=BYCOL(A2:Z50, LAMBDA(c, COUNTA(c)=0))"
  },
  {
    question: "How do you construct a complete financial table with Column Headers, Data Grid, and BYCOL Total Row in 1 formula?",
    shortAnswer: "=LET(headers, {\"Jan\", \"Feb\", \"Mar\", \"Apr\"}, data, C5:F8, totals, BYCOL(data, LAMBDA(c, SUM(c))), VSTACK(headers, data, totals))",
    explanation: "Composes the entire multi-section report in memory using LET, BYCOL, and VSTACK.",
    hint: "VSTACK(headers, data, totals) inside LET.",
    level: "expert",
    codeExample: "=LET(d, C5:F8, VSTACK(d, BYCOL(d, LAMBDA(c, SUM(c)))))"
  },
  {
    question: "What happens if an array passed to BYCOL contains error values in one column?",
    shortAnswer: "The error appears only in that specific column's summary result cell, while other columns evaluate normally.",
    explanation: "Column-level error isolation prevents whole-formula calculation crashes.",
    hint: "Error is isolated to the affected column.",
    level: "moderate",
    codeExample: "Column-level error isolation"
  },
  {
    question: "How do you calculate the geometric mean of each column using BYCOL?",
    shortAnswer: "=BYCOL(GrowthMatrix, LAMBDA(c, GEOMEAN(c)))",
    explanation: "Passes each vertical growth column vector into GEOMEAN.",
    hint: "GEOMEAN(c) inside BYCOL.",
    level: "moderate",
    codeExample: "=BYCOL(C5:F8, LAMBDA(c, GEOMEAN(c)))"
  },
  {
    question: "How do you calculate the percentage contribution of each column to the grand total using BYCOL?",
    shortAnswer: "=LET(grand_tot, SUM(Matrix), BYCOL(Matrix, LAMBDA(c, SUM(c) / grand_tot)))",
    explanation: "Caches the grand total in LET and divides each column sum by the grand total, returning a horizontal percentage row.",
    hint: "LET caches grand total; BYCOL computes column % share.",
    level: "advanced",
    codeExample: "=LET(tot, SUM(C5:F8), BYCOL(C5:F8, LAMBDA(c, SUM(c)/tot)))"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for the BYCOL helper function?",
    shortAnswer: "Whenever you need to calculate vertical column totals, monthly averages, column maximums, or summary rows across a multi-column matrix in a single spilled formula, always deploy BYCOL and bundle it with VSTACK for an end-to-end automated reporting pipeline!",
    explanation: "BYCOL completes the dual-axis matrix aggregation toolkit alongside BYROW, allowing analysts to build complete financial reporting grids in pure memory with zero formula dragging!",
    hint: "Use BYCOL for vertical column summaries and attach with VSTACK.",
    level: "expert",
    codeExample: "Rule: Matrix Column Summaries → Use BYCOL + VSTACK!"
  }
];

export default questions;
