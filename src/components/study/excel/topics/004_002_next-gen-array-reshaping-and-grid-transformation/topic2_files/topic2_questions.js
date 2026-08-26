// topic2_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 2
// Topic: Flattening 2D Tables into 1D Horizontal Vectors with TOROW
// Module: 004_002_next-gen-array-reshaping-and-grid-transformation
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function of TOROW in Excel 365?",
    shortAnswer: "It transforms a 2D matrix or vertical column into a single horizontal 1D row vector.",
    explanation: "TOROW flattens multi-row, multi-column rectangular arrays or vertical columns into a continuous horizontal row spanning across worksheet columns, with optional arguments to filter blank cells and worksheet errors.",
    hint: "The horizontal counterpart of TOCOL.",
    level: "basic",
    codeExample: "=TOROW(A2:D10)"
  },
  {
    question: "What is the syntax signature of the TOROW function?",
    shortAnswer: "=TOROW(array, [ignore], [scan_by_column])",
    explanation: "TOROW accepts three arguments: 'array' (required input range or matrix), '[ignore]' (optional integer 0-3 controlling blank and error handling), and '[scan_by_column]' (optional boolean controlling traversal order).",
    hint: "Identical syntax structure to TOCOL.",
    level: "basic",
    codeExample: "=TOROW(B2:F10, 1, FALSE)"
  },
  {
    question: "How does TOROW differ from TRANSPOSE when applied to a 2D matrix of shape 4 rows by 3 columns?",
    shortAnswer: "TRANSPOSE produces a 3-row by 4-column 2D matrix; TOROW produces a 1-row by 12-column 1D vector.",
    explanation: "TRANSPOSE flips the orientation of axes while preserving 2D dimensionality (swapping rows for columns). TOROW collapses all 2D dimensions into a single flat horizontal sequence of 12 elements.",
    hint: "TRANSPOSE maintains 2D dimensions; TOROW flattens into 1D.",
    level: "moderate",
    codeExample: "=TOROW(A1:C4) vs =TRANSPOSE(A1:C4)"
  },
  {
    question: "What does setting [ignore] to 1 accomplish in TOROW?",
    shortAnswer: "It skips all blank/empty cells in the input matrix, compressing the horizontal output row.",
    explanation: "Empty cells are skipped, preventing zeroes from filling the horizontal output vector and returning only populated data values.",
    hint: "Flag 1 removes blanks only.",
    level: "basic",
    codeExample: "=TOROW(B2:G10, 1)"
  },
  {
    question: "What does setting [ignore] to 2 accomplish in TOROW?",
    shortAnswer: "It skips all formula and cell error values (#N/A, #VALUE!, #DIV/0!, etc.) while preserving blanks and valid data.",
    explanation: "Error cells are filtered out during horizontal flattening, preventing broken calculations from contaminating downstream summaries.",
    hint: "Flag 2 targets worksheet errors.",
    level: "moderate",
    codeExample: "=TOROW(A2:E10, 2)"
  },
  {
    question: "What does setting [ignore] to 3 accomplish in TOROW?",
    shortAnswer: "It ignores both empty cells AND cell errors simultaneously.",
    explanation: "Flag 3 provides comprehensive data cleaning, returning only valid, non-blank, non-error values in a continuous horizontal row.",
    hint: "1 (blanks) + 2 (errors) = 3 (both).",
    level: "moderate",
    codeExample: "=TOROW(A2:E20, 3)"
  },
  {
    question: "How does the [scan_by_column] parameter affect TOROW's horizontal output order?",
    shortAnswer: "FALSE reads row-by-row (left-to-right, then top-to-bottom); TRUE reads column-by-column (top-to-bottom, then left-to-right).",
    explanation: "In row-major order (FALSE/0), all items in Row 1 are placed first, followed by Row 2. In column-major order (TRUE/1), items from Column 1 are placed first, followed by Column 2.",
    hint: "Row-major vs column-major matrix traversal.",
    level: "moderate",
    codeExample: "=TOROW(B2:E10, 1, TRUE)"
  },
  {
    question: "How can TOROW be used to create a dynamic horizontal KPI summary banner from a multi-row expense ledger?",
    shortAnswer: "By wrapping TOROW with TEXTJOIN or using TOROW directly to spill category totals across a dashboard top header.",
    explanation: "Passing a calculated vertical column of department totals into =TOROW(DeptTotals, 1) spills the KPI metrics horizontally across banner columns H1:M1 for executive dashboards.",
    hint: "Spills vertical metrics horizontally into a top header banner.",
    level: "moderate",
    codeExample: "=TOROW(DeptTotalsVector, 1)"
  },
  {
    question: "What happens if TOROW is applied to a 1D vertical column vector (e.g., A1:A10)?",
    shortAnswer: "It rotates the vertical column into a horizontal row vector (1 row x 10 cols).",
    explanation: "TOROW effortlessly transposes single vertical columns into single horizontal rows, serving as a simpler, more concise alternative to TRANSPOSE with built-in blank filtering.",
    hint: "Converts vertical orientation to horizontal.",
    level: "basic",
    codeExample: "=TOROW(A1:A10, 1)"
  },
  {
    question: "What happens if TOROW is applied to a 1D horizontal row that is already horizontal?",
    shortAnswer: "It returns the same horizontal row, applying any specified blank or error filtering.",
    explanation: "TOROW is idempotent on horizontal vectors. When [ignore]=1 is set, it compacts the row by squeezing out intermediate blank cells.",
    hint: "Acts as a horizontal compaction filter.",
    level: "basic",
    codeExample: "=TOROW(A1:Z1, 1)"
  },
  {
    question: "How does TOROW behave if an obstruction blocks the horizontal cells where it needs to spill?",
    shortAnswer: "It returns a #SPILL! error.",
    explanation: "If any cell in the required horizontal destination row contains text, values, formulas, or merged formatting, Excel triggers #SPILL! until the obstruction is cleared.",
    hint: "Destination collision error across horizontal columns.",
    level: "basic",
    codeExample: "#SPILL!"
  },
  {
    question: "How can you produce a distinct, alphabetically sorted horizontal list of customer cities using TOROW?",
    shortAnswer: "=TOROW(SORT(UNIQUE(TOCOL(CityMatrix, 1))))",
    explanation: "First, TOCOL flattens the multi-branch customer matrix into a single vertical column. UNIQUE removes duplicate cities, SORT alphabetizes them, and TOROW rotates the clean list into a horizontal banner.",
    hint: "Combine TOCOL, UNIQUE, SORT, and TOROW.",
    level: "advanced",
    codeExample: "=TOROW(SORT(UNIQUE(TOCOL(CityMatrix, 1))))"
  },
  {
    question: "What is the maximum number of columns TOROW can spill horizontally on a single worksheet?",
    shortAnswer: "16,384 columns (Excel worksheet maximum column limit from A to XFD).",
    explanation: "Because an Excel sheet contains exactly 16,384 columns, TOROW cannot spill more elements horizontally than the remaining columns between the formula cell and column XFD. Exceeding this boundary triggers a #CALC! or #SPILL! error.",
    hint: "Max Excel column count is 16,384 (XFD).",
    level: "expert",
    codeExample: "Limit: 16,384 columns (XFD)"
  },
  {
    question: "In financial modeling, when is TOROW preferred over TOCOL?",
    shortAnswer: "When constructing horizontal financial timeline schedules, multi-year projection headers, or sensitivity tables across columns.",
    explanation: "Financial projection models (3-statement models, DCF schedules) are traditionally organized with time periods spanning horizontally across columns. TOROW allows modelers to unroll 2D cost breakdowns into continuous timeline rows.",
    hint: "Time-series projection models expand horizontally.",
    level: "advanced",
    codeExample: "=TOROW(QuarterlySpendMatrix, 1, TRUE)"
  },
  {
    question: "How does TOROW treat empty strings (\"\") returned by logical IF formulas?",
    shortAnswer: "Empty strings are treated as text and are NOT skipped by [ignore]=1.",
    explanation: "[ignore]=1 only skips natively blank cells. A formula evaluating to \"\" returns a text string of length 0. To skip both native blanks and empty strings, combine with FILTER.",
    hint: "Formula blanks (\"\") are considered text values.",
    level: "expert",
    codeExample: "=TOROW(FILTER(TOCOL(Matrix), TOCOL(Matrix)<>\"\"))"
  },
  {
    question: "Can TOROW accept inline array constants such as {10,20; 30,40; 50,60}?",
    shortAnswer: "Yes, TOROW processes array constants directly in memory and outputs {10, 20, 30, 40, 50, 60}.",
    explanation: "Array constants in curly braces are valid in-memory matrices. TOROW flattens the 3x2 matrix into a single 1x6 horizontal row array.",
    hint: "Inline array constants work identically to cell ranges.",
    level: "basic",
    codeExample: "=TOROW({10,20; 30,40; 50,60})"
  },
  {
    question: "How can you count the total number of non-error entries across a 2D matrix using TOROW?",
    shortAnswer: "=COLUMNS(TOROW(MatrixRange, 2))",
    explanation: "TOROW(MatrixRange, 2) returns a horizontal array excluding all errors. Wrapping this inside COLUMNS() returns the exact count of valid elements.",
    hint: "Measure horizontal length with COLUMNS().",
    level: "moderate",
    codeExample: "=COLUMNS(TOROW(A2:E20, 2))"
  },
  {
    question: "How does TOROW interact with Excel's Spilled Range Operator (#)?",
    shortAnswer: "TOROW accepts any spilled anchor reference (e.g., A2#) and flattens the dynamic matrix horizontally.",
    explanation: "If a prior dynamic formula (e.g. =FILTER(Table, Criteria)) spills into cell A2, writing =TOROW(A2#, 1) dynamically reads the entire variable-sized matrix and converts it into a horizontal row vector.",
    hint: "Reference the top-left anchor cell with #.",
    level: "moderate",
    codeExample: "=TOROW(A2#, 1)"
  },
  {
    question: "How do you combine TOROW and TEXTJOIN to generate a comma-separated single-cell summary of unique values?",
    shortAnswer: "=TEXTJOIN(\", \", TRUE, TOROW(UNIQUE(TOCOL(Range, 1))))",
    explanation: "TOCOL flattens the matrix, UNIQUE removes duplicates, and TEXTJOIN concatenates the items into a single cell separated by commas, skipping empty items.",
    hint: "TEXTJOIN can consume the array directly.",
    level: "moderate",
    codeExample: "=TEXTJOIN(\", \", TRUE, UNIQUE(TOCOL(A2:D20, 1)))"
  },
  {
    question: "What happens if TOROW is given a range containing dates formatted as YYYY-MM-DD?",
    shortAnswer: "The serial numbers are preserved, but the destination cells may require explicit Date formatting.",
    explanation: "TOROW preserves underlying serial date values (e.g., 45500). Destination cells formatted as General will display integers until formatted as Short/Long Date.",
    hint: "Dates are passed as raw underlying serial numbers.",
    level: "moderate",
    codeExample: "=TOROW(DateGrid, 1)"
  },
  {
    question: "How can you reverse the order of a horizontal row vector generated by TOROW?",
    shortAnswer: "=CHOOSECOLS(TOROW(Range, 1), SEQUENCE(1, COLUMNS(TOROW(Range, 1)), COLUMNS(TOROW(Range, 1)), -1))",
    explanation: "Using CHOOSECOLS with a descending horizontal SEQUENCE generated with step -1 flips the horizontal vector from right to left.",
    hint: "Use CHOOSECOLS with a descending SEQUENCE vector.",
    level: "expert",
    codeExample: "=LET(r, TOROW(A1:D4, 1), CHOOSECOLS(r, SEQUENCE(1, COLUMNS(r), COLUMNS(r), -1)))"
  },
  {
    question: "How does TOROW handle Boolean TRUE/FALSE values during horizontal unpivoting?",
    shortAnswer: "Boolean values are retained in their native logical format without conversion to 1 or 0.",
    explanation: "TOROW preserves data types intact: logical Booleans, text strings, numbers, and dates are transferred without coercion.",
    hint: "Logical types remain unchanged.",
    level: "basic",
    codeExample: "=TOROW(LogicMatrix)"
  },
  {
    question: "How can TOROW unroll a multi-channel marketing budget matrix into a continuous horizontal campaign timeline?",
    shortAnswer: "By using =TOROW(MarketingSpendMatrix, 1, TRUE) with column-major scanning to keep monthly channels in sequence.",
    explanation: "Setting scan_by_column=TRUE processes Month 1 across all channels before moving to Month 2, creating an organized horizontal timeline for financial forecasting.",
    hint: "Set scan_by_column=TRUE for sequential monthly channels.",
    level: "advanced",
    codeExample: "=TOROW(C3:G12, 1, TRUE)"
  },
  {
    question: "Why does combining TOROW with LET improve formula calculation performance?",
    shortAnswer: "LET assigns the flattened row to a variable, preventing repetitive recalculation in complex formulas.",
    explanation: "If you write =HSTACK(TOROW(Range, 1), SUM(TOROW(Range, 1))), Excel evaluates TOROW twice. With LET: =LET(r, TOROW(Range, 1), HSTACK(r, SUM(r))), evaluation occurs once in RAM.",
    hint: "LET caches the intermediate in-memory vector.",
    level: "advanced",
    codeExample: "=LET(r, TOROW(B2:F10, 1), HSTACK(r, SUM(r)))"
  },
  {
    question: "What is the key difference between TOROW and HSTACK?",
    shortAnswer: "TOROW flattens an existing 2D matrix into a 1D row vector; HSTACK joins separate arrays or ranges horizontally side-by-side.",
    explanation: "TOROW takes a single multi-row matrix and collapses its vertical height to 1 row. HSTACK takes multiple distinct matrices and attaches them horizontally without altering their internal row structures.",
    hint: "TOROW reshapes 1 matrix; HSTACK combines multiple matrices.",
    level: "moderate",
    codeExample: "=TOROW(Matrix) vs =HSTACK(Array1, Array2)"
  },
  {
    question: "Can TOROW be used inside dynamic lookup functions like HLOOKUP or XLOOKUP?",
    shortAnswer: "Yes, TOROW can serve as the lookup array or return array in horizontal XLOOKUP formulas in memory.",
    explanation: "You can write =XLOOKUP(\"Q4\", TOROW(HeaderMatrix, 1), TOROW(ValueMatrix, 1)) to perform dynamic horizontal lookups across multidimensional blocks without spilling.",
    hint: "Feeds directly into horizontal lookup parameters in RAM.",
    level: "advanced",
    codeExample: "=XLOOKUP(\"Target\", TOROW(LookupGrid, 1), TOROW(ReturnGrid, 1))"
  },
  {
    question: "What error occurs if the input to TOROW is a 3D sheet reference like Sheet1:Sheet4!A1:D10?",
    shortAnswer: "#VALUE! error.",
    explanation: "Excel dynamic array functions do not accept multi-sheet 3D ranges. Combine the sheet ranges using VSTACK or HSTACK before applying TOROW.",
    hint: "3D sheet ranges are not supported; use VSTACK first.",
    level: "advanced",
    codeExample: "=TOROW(VSTACK(S1!A1:D10, S2!A1:D10), 1)"
  },
  {
    question: "How can TOROW extract only the top 5 largest values from a 2D matrix?",
    shortAnswer: "=TOROW(TAKE(SORT(TOCOL(Matrix, 1), 1, -1), 5))",
    explanation: "TOCOL flattens the matrix, SORT arranges values in descending order, TAKE extracts the top 5, and TOROW presents them horizontally as a top-5 KPI banner.",
    hint: "Flatten with TOCOL, sort descending, TAKE 5, rotate with TOROW.",
    level: "advanced",
    codeExample: "=TOROW(TAKE(SORT(TOCOL(A2:D20, 1), 1, -1), 5))"
  },
  {
    question: "Why should you avoid using unbounded rows or columns (e.g., 2:5) inside TOROW?",
    shortAnswer: "Unbounded row references force Excel to process all 16,384 columns, causing significant memory overhead and calculation delays.",
    explanation: "Referencing full rows like 2:5 forces TOROW to process over 65,000 cells in memory, most of which are blank. Always use bounded ranges (e.g., B2:G5) or structured table references.",
    hint: "Use bounded ranges to prevent scanning thousands of empty columns.",
    level: "expert",
    codeExample: "Use B2:G5 instead of 2:5"
  },
  {
    question: "What is Instructor Sukanta Hui's core pedagogical tip for using TOROW in corporate dashboards?",
    shortAnswer: "Use TOROW to construct responsive horizontal KPI ribbons above detailed ledger tables without modifying source data schemas.",
    explanation: "In modern corporate reporting, executives prefer high-level horizontal KPI ribbons across the top of the screen. TOROW unpivots and projects summarized departmental metrics across top rows dynamically, ensuring that any new department added in source sheets reflects immediately in the top banner.",
    hint: "Build dynamic executive KPI summary ribbons above ledger tables.",
    level: "expert",
    codeExample: "Top Banner: =TOROW(CHOOSECOLS(SummaryTable, 2), 1)"
  }
];

export default questions;
