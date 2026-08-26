// topic1_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 1
// Topic: Flattening 2D Tables into 1D Vertical Vectors with TOCOL (Ignoring Blanks and Errors)
// Module: 004_002_next-gen-array-reshaping-and-grid-transformation
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the exact syntax signature of the TOCOL function in Excel 365?",
    shortAnswer: "=TOCOL(array, [ignore], [scan_by_column])",
    explanation: "TOCOL takes three parameters: 'array' (the required 2D range or spilled matrix to transform), '[ignore]' (optional integer flag 0-3 dictating how empty cells and error values are handled), and '[scan_by_column]' (optional boolean 0/FALSE for row-major order or 1/TRUE for column-major order).",
    hint: "Three parameters: source array, ignore flag, and scan direction.",
    level: "basic",
    codeExample: "=TOCOL(B2:E20, 1, FALSE)"
  },
  {
    question: "What does the default value of 0 in TOCOL's [ignore] parameter signify?",
    shortAnswer: "It retains all cells in the input range, including blanks and errors.",
    explanation: "When [ignore] is omitted or set to 0, TOCOL faithfully transfers every single cell from the source matrix into the vertical spilled column, outputting 0 for blank cells and preserving error codes like #N/A or #VALUE! as they appear.",
    hint: "Flag 0 = keep everything without filtering.",
    level: "basic",
    codeExample: "=TOCOL(A2:D10, 0)"
  },
  {
    question: "Which [ignore] flag should be used to eliminate empty or blank cells while preserving calculated values and error codes?",
    shortAnswer: "1 (Ignore blanks).",
    explanation: "Setting [ignore] to 1 instructs TOCOL to skip any cell that contains no data or evaluates to blank, compressing the resulting vertical column so that only populated cells are returned.",
    hint: "Flag 1 removes blanks only.",
    level: "basic",
    codeExample: "=TOCOL(B2:F25, 1)"
  },
  {
    question: "What is the behavior of TOCOL when [ignore] is set to 2?",
    shortAnswer: "It filters out all cell error values while keeping blank and valid cells.",
    explanation: "Flag 2 ignores cells returning errors such as #DIV/0!, #N/A, #VALUE!, #NAME?, or #REF!, while allowing blank cells (represented as 0) and standard values to pass through into the spilled output.",
    hint: "Flag 2 targets errors only.",
    level: "moderate",
    codeExample: "=TOCOL(A2:E20, 2)"
  },
  {
    question: "Which [ignore] parameter value cleans both empty cells AND error codes simultaneously?",
    shortAnswer: "3 (Ignore both blanks and errors).",
    explanation: "Setting [ignore] to 3 performs total hygiene filtering: any cell that is blank or contains a worksheet error is discarded, returning a pure, clean vertical list of valid data values.",
    hint: "Think 1 (blanks) + 2 (errors) = 3 (both).",
    level: "moderate",
    codeExample: "=TOCOL(A2:D50, 3)"
  },
  {
    question: "How does the [scan_by_column] parameter change the ordering of the flattened output?",
    shortAnswer: "FALSE (or omitted) scans row-by-row (left to right); TRUE scans column-by-column (top to bottom).",
    explanation: "In default row-major order (FALSE), TOCOL reads cell A1, B1, C1, then A2, B2, C2. When scan_by_column is set to TRUE (or 1), it reads A1, A2, A3 down the first column before moving to B1, B2, B3.",
    hint: "Row-major vs column-major matrix traversal.",
    level: "moderate",
    codeExample: "=TOCOL(B2:E10, 1, TRUE)"
  },
  {
    question: "How did spreadsheet users unpivot a 2D cross-tab matrix into a 1D column before TOCOL was introduced?",
    shortAnswer: "Through complex combinations of INDEX, INT, MOD, ROW, and OFFSET, or by unpivoting via Power Query.",
    explanation: "Legacy formulas required mathematical coordinate mapping: =INDEX($A$2:$D$10, INT((ROW(A1)-1)/4)+1, MOD(ROW(A1)-1, 4)+1). This was fragile, computationally heavy, and difficult to maintain. TOCOL reduces this to a single readable native formula.",
    hint: "Think about modular arithmetic with ROW() and INDEX().",
    level: "advanced",
    codeExample: "=INDEX(Matrix, INT((ROW()-1)/Cols)+1, MOD(ROW()-1, Cols)+1)"
  },
  {
    question: "Why does TOCOL return 0 for blank cells when [ignore] is set to 0?",
    shortAnswer: "Excel coerces empty cell references in numeric arrays to 0 by default.",
    explanation: "When Excel reads an empty cell into an array formula without explicit blank-handling, the type coercion engine converts null/empty to a numeric zero. To keep true blanks from converting to 0, use [ignore]=1 or wrap in IF(Range=\"\", \"\", TOCOL(Range)).",
    hint: "Standard Excel coercion treats null cells as numeric zero.",
    level: "moderate",
    codeExample: "=TOCOL(A2:C5, 0)"
  },
  {
    question: "How can you produce a distinct, sorted list of unique store names from a multi-shift duty roster using TOCOL?",
    shortAnswer: "=SORT(UNIQUE(TOCOL(RosterRange, 1)))",
    explanation: "TOCOL(RosterRange, 1) flattens the multi-column shift matrix into a single column while skipping empty roster slots. UNIQUE removes duplicate staff names, and SORT arranges the roster alphabetically.",
    hint: "Combine TOCOL, UNIQUE, and SORT in a single chain.",
    level: "moderate",
    codeExample: "=SORT(UNIQUE(TOCOL(B2:H30, 1)))"
  },
  {
    question: "What happens if TOCOL is applied to a 1D column that is already vertical?",
    shortAnswer: "It returns the same column, filtering blanks or errors if specified in [ignore].",
    explanation: "TOCOL is idempotent on vertical vectors. If applied to a 1D column with [ignore]=1, it acts as a lightweight compaction filter, removing blank cells without changing orientation.",
    hint: "It acts as a clean compaction filter on single columns.",
    level: "basic",
    codeExample: "=TOCOL(A2:A100, 1)"
  },
  {
    question: "What happens if TOCOL is applied to a 1D horizontal row vector?",
    shortAnswer: "It transposes the horizontal row into a vertical column.",
    explanation: "Because TOCOL always guarantees a 1D vertical column output, passing a horizontal row vector (e.g., A1:Z1) rotates it 90 degrees into a vertical column spanning A1# downwards.",
    hint: "Converts horizontal orientation to vertical.",
    level: "basic",
    codeExample: "=TOCOL(A1:Z1)"
  },
  {
    question: "How does TOCOL behave when given a 3D reference like Sheet1:Sheet3!A1:D10?",
    shortAnswer: "It returns a #VALUE! error because 3D ranges are not supported as dynamic array arguments.",
    explanation: "Excel's dynamic array calculation engine does not support multi-worksheet 3D range syntax within reshaping functions. To flatten data across multiple sheets, combine them with VSTACK first: =TOCOL(VSTACK(Sheet1!A1:D10, Sheet2!A1:D10), 1).",
    hint: "Use VSTACK to bundle sheets before passing into TOCOL.",
    level: "advanced",
    codeExample: "=TOCOL(VSTACK(Sheet1!A1:D10, Sheet2!A1:D10), 1)"
  },
  {
    question: "What error occurs if an obstruction blocks the cells where TOCOL needs to spill?",
    shortAnswer: "#SPILL! error.",
    explanation: "If any cell in the target vertical column contains data, text, formulas, or merged formatting, Excel cannot allocate the contiguous destination vector and displays #SPILL!.",
    hint: "The classic destination collision error.",
    level: "basic",
    codeExample: "#SPILL!"
  },
  {
    question: "How can you count the total number of non-blank entries across a 2D matrix using TOCOL?",
    shortAnswer: "=ROWS(TOCOL(MatrixRange, 1)) or =COUNTA(TOCOL(MatrixRange, 1))",
    explanation: "TOCOL(MatrixRange, 1) returns a vertical array consisting solely of populated cells. Wrapping this in ROWS() returns the exact count of non-empty cells across all rows and columns.",
    hint: "Measure the vertical length of the filtered array with ROWS().",
    level: "moderate",
    codeExample: "=ROWS(TOCOL(B2:G20, 1))"
  },
  {
    question: "In financial modeling, how can TOCOL be used to consolidate multi-year quarterly budget schedules?",
    shortAnswer: "By flattening the Year x Quarter matrix into a continuous time-series column for subsequent trend analysis.",
    explanation: "When budget models structure quarters across columns (Q1-Q4) and departments down rows, time-series forecasting requires a continuous vertical stream. Using =TOCOL(BudgetMatrix, 1, TRUE) scans column-by-column to preserve chronological quarter sequences.",
    hint: "Set scan_by_column=TRUE to preserve chronological quarter flow.",
    level: "advanced",
    codeExample: "=TOCOL(C3:F12, 1, TRUE)"
  },
  {
    question: "How does TOCOL treat cells containing the empty text string \"\" returned by an IF formula?",
    shortAnswer: "Empty strings \"\" are treated as text and are NOT ignored by [ignore]=1.",
    explanation: "[ignore]=1 only skips genuinely blank (empty) cells. A cell containing the formula =IF(A1>0, A1, \"\") returns a zero-length string \"\", which is considered text by Excel. To remove both true blanks and \"\", combine TOCOL with FILTER.",
    hint: "Formula blanks (\"\") are text, not true empty cells.",
    level: "expert",
    codeExample: "=FILTER(TOCOL(A2:D20), TOCOL(A2:D20)<>\"\")"
  },
  {
    question: "Can you pass an array constant like {1,2;3,4;5,6} into TOCOL?",
    shortAnswer: "Yes, TOCOL accepts inline array constants and flattens them into {1;2;3;4;5;6}.",
    explanation: "Array constants in curly braces represent in-memory matrices (commas separate columns, semicolons separate rows). TOCOL processes them directly without requiring worksheet cell ranges.",
    hint: "Inline array constants work identically to cell ranges.",
    level: "basic",
    codeExample: "=TOCOL({1,2; 3,4; 5,6})"
  },
  {
    question: "How does TOCOL handle boolean values (TRUE/FALSE) during vector flattening?",
    shortAnswer: "Boolean values are preserved as logical TRUE/FALSE in the output vector.",
    explanation: "TOCOL does not alter data types during transformation. Boolean values, text strings, dates, and numbers remain in their native types in the flattened vertical array.",
    hint: "Logical types are preserved without coercion.",
    level: "basic",
    codeExample: "=TOCOL(A1:C3)"
  },
  {
    question: "How can you extract only numeric values from a mixed 2D table containing text, blanks, and errors using TOCOL?",
    shortAnswer: "=FILTER(TOCOL(Range, 3), ISNUMBER(TOCOL(Range, 3)))",
    explanation: "First, TOCOL(Range, 3) strips all blank cells and errors. Then FILTER evaluates the ISNUMBER predicate on the resulting column, discarding any remaining text strings.",
    hint: "Combine TOCOL flag 3 with FILTER and ISNUMBER.",
    level: "advanced",
    codeExample: "=LET(clean, TOCOL(A2:E20, 3), FILTER(clean, ISNUMBER(clean)))"
  },
  {
    question: "Why is using LET recommended when performing multi-stage operations on TOCOL output?",
    shortAnswer: "LET computes TOCOL once in memory, preventing redundant recalculations and speeding up complex formulas.",
    explanation: "If you write =FILTER(TOCOL(Range, 1), TOCOL(Range, 1)>1000), Excel calculates TOCOL(Range, 1) twice. With LET: =LET(vec, TOCOL(Range, 1), FILTER(vec, vec>1000)), the flattening executes exactly once in RAM.",
    hint: "Define a variable with LET to avoid evaluating TOCOL multiple times.",
    level: "advanced",
    codeExample: "=LET(vec, TOCOL(B2:F25, 1), FILTER(vec, vec>50000))"
  },
  {
    question: "What is the memory limit for the number of elements TOCOL can flatten into a single column?",
    shortAnswer: "1,048,576 rows (the maximum row height of an Excel worksheet).",
    explanation: "Because TOCOL outputs a single vertical column, the total number of flattened items cannot exceed Excel's worksheet row limit of 1,048,576. Attempting to flatten a range larger than this will result in a #CALC! or memory allocation error.",
    hint: "Max Excel worksheet row capacity is 1,048,576.",
    level: "expert",
    codeExample: "Limit: 1,048,576 elements"
  },
  {
    question: "How do you flatten multiple non-contiguous ranges (e.g., A2:C10 and F2:H10) into a single vertical column?",
    shortAnswer: "Combine them with VSTACK or HSTACK before applying TOCOL: =TOCOL(HSTACK(A2:C10, F2:H10), 1).",
    explanation: "TOCOL requires a single unified array as its first argument. Passing two comma-separated ranges directly is interpreted as the [ignore] argument. Wrapping the non-contiguous ranges in HSTACK or VSTACK creates a single array for TOCOL.",
    hint: "Use HSTACK/VSTACK inside TOCOL to merge separate ranges.",
    level: "advanced",
    codeExample: "=TOCOL(HSTACK(A2:C10, F2:H10), 1)"
  },
  {
    question: "How does TOCOL differ fundamentally from TOROW?",
    shortAnswer: "TOCOL outputs a vertical 1D column (N rows x 1 col); TOROW outputs a horizontal 1D row (1 row x N cols).",
    explanation: "Both functions share identical [ignore] and [scan_by_column] mechanics. The only difference is the orientation of the output vector: TOCOL extends vertically down rows, while TOROW extends horizontally across columns.",
    hint: "TOCOL is vertical; TOROW is horizontal.",
    level: "basic",
    codeExample: "=TOCOL(A1:D4) vs =TOROW(A1:D4)"
  },
  {
    question: "What happens if the source range passed to TOCOL contains formatted dates?",
    shortAnswer: "The serial date numbers are preserved, but destination cells may need explicit Date formatting.",
    explanation: "Excel stores dates internally as serial integers (e.g., 45500 for Aug 2024). TOCOL faithfully passes these serial numbers. If the destination cells are formatted as General, they will display as numbers until formatted as Short/Long Date.",
    hint: "Dates are passed as raw serial numbers.",
    level: "moderate",
    codeExample: "=TOCOL(DateMatrix, 1)"
  },
  {
    question: "How can TOCOL be used to quickly create dynamic data validation dropdown lists from a 2D matrix?",
    shortAnswer: "Place =SORT(UNIQUE(TOCOL(Matrix, 1))) in an anchor cell (e.g., K2), then set Data Validation source to =K2#.",
    explanation: "Data validation dropdowns require a 1D contiguous list. By flattening, deduplicating, and sorting a 2D schedule in cell K2, the dropdown list source can simply point to the spilled range reference =K2#, remaining 100% dynamic.",
    hint: "Point the dropdown source to the spilled anchor =K2#.",
    level: "advanced",
    codeExample: "Validation Source: =K2#"
  },
  {
    question: "If a 2D table has 5 rows and 4 columns, how many elements will TOCOL return if [ignore] is set to 0?",
    shortAnswer: "Exactly 20 elements (5 x 4 = 20).",
    explanation: "When [ignore]=0, no filtering occurs. The output vector height is the exact product of the source rows and columns (5 * 4 = 20 rows).",
    hint: "Total elements = Rows * Columns.",
    level: "basic",
    codeExample: "5 rows * 4 cols = 20 cells"
  },
  {
    question: "How can you reverse the order of a vertical column generated by TOCOL?",
    shortAnswer: "=CHOOSEROWS(TOCOL(Range, 1), SEQUENCE(ROWS(TOCOL(Range, 1)), , ROWS(TOCOL(Range, 1)), -1))",
    explanation: "By combining TOCOL with CHOOSEROWS and a descending SEQUENCE generated with step -1, you can invert the order of the flattened elements from bottom to top.",
    hint: "Use CHOOSEROWS with a reverse SEQUENCE index.",
    level: "expert",
    codeExample: "=LET(v, TOCOL(A2:D10, 1), CHOOSEROWS(v, SEQUENCE(ROWS(v), , ROWS(v), -1)))"
  },
  {
    question: "Why does TOCOL calculate significantly faster than legacy array unpivoting methods?",
    shortAnswer: "TOCOL is executed as a native compiled C++ SIMD vector operation without registering individual cell dependency listeners.",
    explanation: "In legacy formulas, each cell in an unpivoted grid maintains its own formula string, calculation tree node, and memory state. TOCOL allocates a single contiguous memory block and copies pointers in bulk, utilizing hardware vector acceleration.",
    hint: "Single calculation node vs hundreds of individual cell nodes.",
    level: "expert",
    codeExample: "High-speed SIMD vector execution"
  },
  {
    question: "Can TOCOL be used inside SUMPRODUCT or XLOOKUP lookup arrays directly without spilling?",
    shortAnswer: "Yes, TOCOL can operate as an intermediate in-memory vector inside any formula argument without requiring a worksheet spill.",
    explanation: "You can write =XLOOKUP(\"Swadeep\", TOCOL(AttendanceGrid, 1), TOCOL(ScoreGrid, 1)) to perform lookups across multidimensional tables entirely in memory.",
    hint: "TOCOL outputs standard arrays that feed directly into lookup functions.",
    level: "advanced",
    codeExample: "=XLOOKUP(\"Target\", TOCOL(LookupMatrix, 1), TOCOL(ReturnMatrix, 1))"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule when unpivoting financial matrices with TOCOL?",
    shortAnswer: "Always verify scan_by_column orientation: use FALSE for entity-wise records and TRUE for chronological time-series.",
    explanation: "If rows represent branch locations (Barrackpore, Shyamnagar) and columns represent quarters (Q1, Q2, Q3), row-major (FALSE) lists all quarters for Branch 1 before Branch 2. Column-major (TRUE) lists all branches for Q1 before Q2. Choosing the wrong scan order corrupts subsequent cumulative trend models.",
    hint: "Row-major = Entity by entity; Column-major = Period by period.",
    level: "expert",
    codeExample: "Entity Scan: =TOCOL(Data, 1, FALSE) | Chronological Scan: =TOCOL(Data, 1, TRUE)"
  }
];

export default questions;
