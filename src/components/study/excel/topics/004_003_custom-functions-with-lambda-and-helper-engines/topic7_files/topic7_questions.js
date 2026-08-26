// topic7_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 7
// Topic: Row-by-row matrix processing with BYROW (e.g., calculating weighted averages per row)
// Module: 004_003_custom-functions-with-lambda-and-helper-engines
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function of BYROW in modern Excel 365?",
    shortAnswer: "To apply a custom LAMBDA function to each individual row of an array or matrix, returning a 1D column vector of row-level aggregated results.",
    explanation: "BYROW slices a 2D matrix row-by-row, passing each complete row vector into the LAMBDA function.",
    hint: "Row-by-row matrix aggregation.",
    level: "basic",
    codeExample: "=BYROW(Matrix, LAMBDA(r, SUM(r)))"
  },
  {
    question: "What is the syntax signature of the BYROW function?",
    shortAnswer: "=BYROW(array, lambda)",
    explanation: "BYROW accepts a 2D array or range and terminates with a LAMBDA that defines what aggregation is performed on each row vector.",
    hint: "Array followed by a 1-parameter LAMBDA.",
    level: "basic",
    codeExample: "=BYROW(C5:F9, LAMBDA(row, AVERAGE(row)))"
  },
  {
    question: "How many parameters must the LAMBDA passed to BYROW declare?",
    shortAnswer: "Exactly 1 parameter (representing the 1D horizontal row vector for each iteration).",
    explanation: "BYROW passes each row as a single 1D vector into the declared parameter.",
    hint: "Exactly 1 parameter representing the row vector.",
    level: "basic",
    codeExample: "LAMBDA(row, ...)"
  },
  {
    question: "What are the output dimensions of a formula using BYROW on an (M x N) matrix?",
    shortAnswer: "An (M x 1) vertical column vector containing M scalar values (1 result per row).",
    explanation: "BYROW reduces an M-row matrix into M aggregated scalar values.",
    hint: "Returns an M x 1 vertical column vector.",
    level: "basic",
    codeExample: "(M x N) Matrix &rarr; (M x 1) Vector"
  },
  {
    question: "How do you calculate the weighted average of each student across 4 subjects using BYROW and SUMPRODUCT?",
    shortAnswer: "=BYROW(ScoresMatrix, LAMBDA(r, SUMPRODUCT(r, {0.2, 0.3, 0.25, 0.25})))",
    explanation: "BYROW passes each student's 4-score row vector 'r' to SUMPRODUCT, multiplying by the 4 subject weights and summing the result.",
    hint: "Pass row vector 'r' into SUMPRODUCT with weights array constant.",
    level: "moderate",
    codeExample: "=BYROW(C5:F9, LAMBDA(r, SUMPRODUCT(r, {0.2, 0.3, 0.25, 0.25})))"
  },
  {
    question: "How does BYROW differ from MAP when applied to a 2D matrix?",
    shortAnswer: "MAP processes every individual cell scalar-by-scalar (output is 2D); BYROW processes entire row vectors at once (output is 1D).",
    explanation: "MAP maintains 2D grid shape; BYROW aggregates rows into a single vertical column vector.",
    hint: "MAP evaluates cell-by-cell; BYROW aggregates row-by-row.",
    level: "moderate",
    codeExample: "MAP (2D Output) vs BYROW (1D Column Output)"
  },
  {
    question: "Can BYROW calculate the maximum score in each row across multiple columns?",
    shortAnswer: "=BYROW(ScoresRange, LAMBDA(r, MAX(r)))",
    explanation: "Passes each row vector 'r' into MAX, returning a spilled column of row maximums.",
    hint: "MAX(r) inside BYROW.",
    level: "basic",
    codeExample: "=BYROW(B2:E10, LAMBDA(r, MAX(r)))"
  },
  {
    question: "What error occurs if the LAMBDA inside BYROW returns an array rather than a single scalar value?",
    shortAnswer: "#CALC! error.",
    explanation: "BYROW requires each row evaluation to produce a single scalar result. Nested array outputs are not permitted.",
    hint: "Nested array returns trigger #CALC!.",
    level: "moderate",
    codeExample: "#CALC!"
  },
  {
    question: "How do you count how many subjects each student passed (score &ge; 40) using BYROW?",
    shortAnswer: "=BYROW(ScoresMatrix, LAMBDA(r, COUNTIF(r, \">=40\")))",
    explanation: "COUNTIF evaluates how many scores in that specific row vector meet the passing threshold.",
    hint: "COUNTIF(r, \">=40\") or SUM(--(r>=40)) inside BYROW.",
    level: "moderate",
    codeExample: "=BYROW(C5:F9, LAMBDA(r, SUM(--(r>=40))))"
  },
  {
    question: "How does BYROW eliminate formula dragging across dynamic spilled tables?",
    shortAnswer: "A single formula in the top cell calculates row totals for the entire table and automatically spills down all rows.",
    explanation: "Dynamic array spilling eliminates manual fill handles and formula drag inconsistencies.",
    hint: "Single formula spills all row totals dynamically.",
    level: "basic",
    codeExample: "Dynamic Array Spilling"
  },
  {
    question: "Can you pass an existing named LAMBDA into BYROW as the second argument?",
    shortAnswer: "Yes, you can write =BYROW(Matrix, FX_ROW_SUMMARY) without re-writing the LAMBDA declaration.",
    explanation: "Named LAMBDAs in Name Manager act as first-class function pointers in higher-order helper functions.",
    hint: "Pass named LAMBDA identifier directly into BYROW.",
    level: "advanced",
    codeExample: "=BYROW(A2:D20, FX_WEIGHTED_SCORE)"
  },
  {
    question: "How do you attach a BYROW calculated total column directly to a master table using HSTACK?",
    shortAnswer: "=HSTACK(MasterTable, BYROW(MasterTable, LAMBDA(r, SUM(r))))",
    explanation: "HSTACK joins the master data grid horizontally with the 1D column vector of row sums produced by BYROW.",
    hint: "HSTACK(Table, BYROW(Table, ...)).",
    level: "advanced",
    codeExample: "=HSTACK(C5:F9, BYROW(C5:F9, LAMBDA(r, SUM(r))))"
  },
  {
    question: "What happens if destination cells in the spill path of BYROW contain existing values?",
    shortAnswer: "#SPILL! error.",
    explanation: "Any obstruction in the output column halts calculation with a #SPILL! error.",
    hint: "Obstructed spill zone triggers #SPILL!.",
    level: "basic",
    codeExample: "#SPILL!"
  },
  {
    question: "How does BYROW calculate the standard deviation of scores per student row?",
    shortAnswer: "=BYROW(ScoresMatrix, LAMBDA(r, STDEV.S(r)))",
    explanation: "Passes each student's score row to the sample standard deviation function.",
    hint: "STDEV.S(r) inside BYROW.",
    level: "basic",
    codeExample: "=BYROW(C5:F9, LAMBDA(r, STDEV.S(r)))"
  },
  {
    question: "Can LET be used inside the LAMBDA of a BYROW function?",
    shortAnswer: "Yes, nesting LET inside BYROW allows multi-step mathematical transformations on each individual row vector.",
    explanation: "For example, you can calculate the row sum, apply a penalty, and round the final row value inside LET.",
    hint: "Nest LET inside BYROW for complex row calculations.",
    level: "advanced",
    codeExample: "=BYROW(Matrix, LAMBDA(r, LET(tot, SUM(r), IF(tot>300, tot*1.05, tot))))"
  },
  {
    question: "How do you calculate the median value of each row across 12 monthly revenue columns using BYROW?",
    shortAnswer: "=BYROW(Revenue12Months, LAMBDA(r, MEDIAN(r)))",
    explanation: "Evaluates the median revenue figure for each product or department row.",
    hint: "MEDIAN(r) inside BYROW.",
    level: "basic",
    codeExample: "=BYROW(B2:M50, LAMBDA(r, MEDIAN(r)))"
  },
  {
    question: "What happens if you pass a 1D column vector into BYROW instead of a 2D matrix?",
    shortAnswer: "BYROW evaluates each 1-element row and returns an identical 1D column vector.",
    explanation: "A column vector is treated as an (M x 1) matrix, passing a 1-element vector into the LAMBDA per row.",
    hint: "Treated as an M x 1 matrix, passing 1 element per row.",
    level: "moderate",
    codeExample: "=BYROW(A2:A10, LAMBDA(r, r*2))"
  },
  {
    question: "How do you test a BYROW formula in memory using the F9 key?",
    shortAnswer: "Highlight =BYROW(...) in the formula bar and press F9 to inspect the resulting vertical array in RAM.",
    explanation: "F9 renders the evaluated 1D column array in the formula bar for instant verification.",
    hint: "Highlight and press F9 in formula bar.",
    level: "basic",
    codeExample: "F9 Memory Array Evaluation"
  },
  {
    question: "How can you check if all values in each row are greater than 50 using BYROW and AND?",
    shortAnswer: "=BYROW(Matrix, LAMBDA(r, AND(r>50)))",
    explanation: "Evaluates whether every element in that specific row vector exceeds 50, returning TRUE or FALSE per row.",
    hint: "AND(r>50) inside BYROW.",
    level: "moderate",
    codeExample: "=BYROW(C5:F9, LAMBDA(r, AND(r>=50)))"
  },
  {
    question: "How can you check if at least one value in each row is negative using BYROW and OR?",
    shortAnswer: "=BYROW(Matrix, LAMBDA(r, OR(r<0)))",
    explanation: "Returns TRUE if any cell in that specific row is less than zero.",
    hint: "OR(r<0) inside BYROW.",
    level: "moderate",
    codeExample: "=BYROW(B2:E20, LAMBDA(r, OR(r<0)))"
  },
  {
    question: "Why does BYROW outperform cell-by-cell row formulas in multi-thousand row datasets?",
    shortAnswer: "Because BYROW executes inside Excel's vectorized multi-threaded C++ calculation engine with single-pass memory allocation.",
    explanation: "Eliminates cell formula parsing overhead across thousands of individual rows.",
    hint: "Single-pass multi-threaded C++ vectorization.",
    level: "expert",
    codeExample: "High-Performance Vectorized Aggregation"
  },
  {
    question: "How do you concatenate all text strings in each row with a comma separator using BYROW and TEXTJOIN?",
    shortAnswer: "=BYROW(AddressPartsMatrix, LAMBDA(r, TEXTJOIN(\", \", TRUE, r)))",
    explanation: "Passes each address row vector to TEXTJOIN, returning a single full address string per row.",
    hint: "TEXTJOIN(\", \", TRUE, r) inside BYROW.",
    level: "moderate",
    codeExample: "=BYROW(A2:D50, LAMBDA(r, TEXTJOIN(\", \", TRUE, r)))"
  },
  {
    question: "Can BYROW accept dynamic spilled range anchors (e.g. FilteredData#) as its array argument?",
    shortAnswer: "Yes, passing FilteredData# allows BYROW to automatically resize its output as the source table grows or shrinks.",
    explanation: "Full reactivity with upstream dynamic arrays.",
    hint: "Pass spilled anchor FilteredData#.",
    level: "basic",
    codeExample: "=BYROW(FilteredData#, LAMBDA(r, AVERAGE(r)))"
  },
  {
    question: "How do you calculate the geometric mean of each row across 5 asset returns using BYROW?",
    shortAnswer: "=BYROW(AssetReturns, LAMBDA(r, GEOMEAN(r)))",
    explanation: "Passes the 5-column asset return row vector into GEOMEAN.",
    hint: "GEOMEAN(r) inside BYROW.",
    level: "moderate",
    codeExample: "=BYROW(B2:F50, LAMBDA(r, GEOMEAN(r)))"
  },
  {
    question: "What is the difference between BYROW and BYCOL?",
    shortAnswer: "BYROW processes horizontally (row-by-row) returning a column vector; BYCOL processes vertically (column-by-column) returning a row vector.",
    explanation: "BYROW aggregates across Axis 1 (horizontal); BYCOL aggregates down Axis 0 (vertical).",
    hint: "BYROW aggregates rows (Axis 1); BYCOL aggregates columns (Axis 0).",
    level: "basic",
    codeExample: "BYROW (Horizontal Slices) vs BYCOL (Vertical Slices)"
  },
  {
    question: "How do you compute the range (Max minus Min) for each row using BYROW?",
    shortAnswer: "=BYROW(DataMatrix, LAMBDA(r, MAX(r) - MIN(r)))",
    explanation: "Calculates the statistical spread for each individual row vector.",
    hint: "MAX(r) - MIN(r) inside BYROW.",
    level: "basic",
    codeExample: "=BYROW(C5:F9, LAMBDA(r, MAX(r) - MIN(r)))"
  },
  {
    question: "How can you determine if a row is completely empty using BYROW?",
    shortAnswer: "=BYROW(Matrix, LAMBDA(r, COUNTA(r)=0))",
    explanation: "Returns TRUE if no non-blank values exist anywhere in that row vector.",
    hint: "COUNTA(r)=0 inside BYROW.",
    level: "moderate",
    codeExample: "=BYROW(A2:D50, LAMBDA(r, COUNTA(r)=0))"
  },
  {
    question: "How do you calculate the percentage of total sales contributed by each row using BYROW and SUM?",
    shortAnswer: "=LET(total, SUM(Matrix), BYROW(Matrix, LAMBDA(r, SUM(r) / total)))",
    explanation: "Caches total sales in LET and divides each row sum by the global total.",
    hint: "LET caches global total; BYROW divides row sum by total.",
    level: "advanced",
    codeExample: "=LET(tot, SUM(C5:F9), BYROW(C5:F9, LAMBDA(r, SUM(r)/tot)))"
  },
  {
    question: "What happens if an array passed to BYROW contains #N/A or #VALUE! errors in some cells?",
    shortAnswer: "The error propagates through the LAMBDA aggregation and appears in that specific row's result cell.",
    explanation: "Errors are isolated to the affected rows without breaking unaffected rows.",
    hint: "Error propagates only to the affected row.",
    level: "moderate",
    codeExample: "Row-level error isolation"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for the BYROW helper function?",
    shortAnswer: "Whenever you need to calculate weighted averages, row sums, cross-subject stats, or logical row compliance across a matrix in a single spilled formula without dragging, always deploy BYROW with SUMPRODUCT or native aggregators!",
    explanation: "BYROW is the quintessential row-wise aggregation engine in modern spreadsheet architecture, turning entire gradebooks, financial schedules, and appraisal matrices into dynamic, self-calculating reports!",
    hint: "Use BYROW for all single-formula row-wise aggregations.",
    level: "expert",
    codeExample: "Rule: Matrix Row Aggregations &rarr; Use BYROW!"
  }
];

export default questions;
