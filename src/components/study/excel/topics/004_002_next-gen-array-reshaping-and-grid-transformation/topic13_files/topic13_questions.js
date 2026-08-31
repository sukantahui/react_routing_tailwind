// topic13_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 13
// Topic: Assessment: Advanced Grid Reshaping and Dimension Transformation Challenge
// Module: 004_002_next-gen-array-reshaping-and-grid-transformation
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary objective of this Capstone Module Assessment?",
    shortAnswer: "To test mastery and fluid synthesis across all 11 Excel 365 array reshaping functions under real-world enterprise constraints.",
    explanation: "This assessment evaluates conceptual mechanics, syntax proficiency, error handling, performance optimization, and architectural design patterns.",
    hint: "Comprehensive mastery evaluation across all 11 array functions.",
    level: "basic",
    codeExample: "Comprehensive Array Reshaping Competency Framework"
  },
  {
    question: "Which function converts a 2D matrix into a 1D column vector while ignoring blank cells?",
    shortAnswer: "=TOCOL(Matrix, 1)",
    explanation: "TOCOL with ignore=1 strips empty cells and returns a compact 1D column vector.",
    hint: "TOCOL with ignore flag = 1.",
    level: "basic",
    codeExample: "=TOCOL(A2:D10, 1)"
  },
  {
    question: "Which function unpivots a 2D matrix into a 1D horizontal row vector?",
    shortAnswer: "=TOROW(Matrix, [ignore], [scan_by_column])",
    explanation: "TOROW flattens the matrix into a single continuous horizontal row.",
    hint: "Flattens 2D matrices into 1D rows.",
    level: "basic",
    codeExample: "=TOROW(A2:D10, 1)"
  },
  {
    question: "How do you extract the very last row of a dynamic table using CHOOSEROWS?",
    shortAnswer: "=CHOOSEROWS(Table, -1)",
    explanation: "Negative indexing in CHOOSEROWS counts backwards from the bottom, where -1 is the final row.",
    hint: "Use -1 for the last row.",
    level: "basic",
    codeExample: "=CHOOSEROWS(A2:G50, -1)"
  },
  {
    question: "How do you reorder the columns of a table to [Dept, ID, Salary, Name] using CHOOSECOLS?",
    shortAnswer: "=CHOOSECOLS(Table, 3, 1, 4, 2)",
    explanation: "Passing the desired column indices in sequence reorganizes table fields in RAM.",
    hint: "Specify column sequence: 3, 1, 4, 2.",
    level: "basic",
    codeExample: "=CHOOSECOLS(A2:D50, 3, 1, 4, 2)"
  },
  {
    question: "Which function extracts the top 5 highest-ranking rows from a sorted table?",
    shortAnswer: "=TAKE(SortedTable, 5)",
    explanation: "TAKE with rows=5 extracts the first 5 rows from the top of the array.",
    hint: "TAKE with positive row count extracts from the top.",
    level: "basic",
    codeExample: "=TAKE(SORT(Data, 4, -1), 5)"
  },
  {
    question: "Which function strips the top 2 title lines and bottom 2 footer totals from a raw report?",
    shortAnswer: "=DROP(DROP(RawReport, 2), -2)",
    explanation: "The inner DROP removes the top 2 header lines, and the outer DROP removes the bottom 2 summary lines.",
    hint: "Nest DROP(2) and DROP(-2).",
    level: "moderate",
    codeExample: "=DROP(DROP(A1:F50, 2), -2)"
  },
  {
    question: "Which function pads a 6-row table to 12 rows with a custom fallback string?",
    shortAnswer: "=EXPAND(Table, 12, , \"-\")",
    explanation: "EXPAND enlarges row height to 12 and fills newly added cells with \"-\".",
    hint: "EXPAND pads arrays to target dimensions.",
    level: "moderate",
    codeExample: "=EXPAND(A2:D7, 12, 4, \"-\")"
  },
  {
    question: "Which function unrolls a continuous 1D stream into a 4-column relational table?",
    shortAnswer: "=WRAPROWS(Vector, 4, \"\")",
    explanation: "WRAPROWS wraps 1D vector elements horizontally into 4-column rows.",
    hint: "WRAPROWS wraps 1D vectors row-wise.",
    level: "basic",
    codeExample: "=WRAPROWS(A1:A40, 4, \"\")"
  },
  {
    question: "Which function wraps a 1D vector vertically into fixed-height columns of 10 rows each?",
    shortAnswer: "=WRAPCOLS(Vector, 10, \"-\")",
    explanation: "WRAPCOLS fills 10 items down each column before wrapping to the adjacent column.",
    hint: "WRAPCOLS wraps 1D vectors column-wise.",
    level: "basic",
    codeExample: "=WRAPCOLS(A1:A50, 10, \"-\")"
  },
  {
    question: "Which function consolidates multiple regional branch tables vertically in memory?",
    shortAnswer: "=VSTACK(Table1, DROP(Table2, 1), DROP(Table3, 1))",
    explanation: "VSTACK appends tables vertically, while DROP strips redundant secondary headers.",
    hint: "VSTACK appends rows vertically.",
    level: "moderate",
    codeExample: "=VSTACK(T1, DROP(T2, 1))"
  },
  {
    question: "Which function joins tables side-by-side or attaches calculated columns horizontally?",
    shortAnswer: "=HSTACK(MasterTable, CalculatedColumn)",
    explanation: "HSTACK concatenates arrays horizontally along Axis 1.",
    hint: "HSTACK joins columns horizontally.",
    level: "basic",
    codeExample: "=HSTACK(A2:D20, D2:D20*0.18)"
  },
  {
    question: "Which function rotates an (M x N) matrix into an (N x M) matrix by swapping row and column axes?",
    shortAnswer: "=TRANSPOSE(Matrix)",
    explanation: "TRANSPOSE swaps coordinate indices (i, j → j, i) dynamically in memory.",
    hint: "Swaps row and column axes.",
    level: "basic",
    codeExample: "=TRANSPOSE(A2:E6)"
  },
  {
    question: "What error occurs if you pass target dimensions smaller than source dimensions into EXPAND?",
    shortAnswer: "#VALUE! error.",
    explanation: "EXPAND can only enlarge arrays. To shrink dimensions, use TAKE or DROP.",
    hint: "EXPAND cannot shrink arrays; returns #VALUE!.",
    level: "basic",
    codeExample: "#VALUE!"
  },
  {
    question: "What error occurs if you pass a 2D matrix directly into WRAPROWS or WRAPCOLS?",
    shortAnswer: "#VALUE! error.",
    explanation: "WRAPROWS and WRAPCOLS strictly require a 1D vector. Flatten with TOCOL first.",
    hint: "Wrapping functions require 1D vector inputs.",
    level: "moderate",
    codeExample: "#VALUE!"
  },
  {
    question: "What error occurs if destination cells where an array needs to spill contain static text?",
    shortAnswer: "#SPILL! error.",
    explanation: "Any non-empty cell in the output footprint halts execution and triggers a #SPILL! error.",
    hint: "Destination collision error.",
    level: "basic",
    codeExample: "#SPILL!"
  },
  {
    question: "What error occurs if you drop more rows than exist in an array using DROP?",
    shortAnswer: "#CALC! error.",
    explanation: "Dropping all or more rows than available produces an empty array, which Excel flags with #CALC!.",
    hint: "Empty output array returns #CALC!.",
    level: "moderate",
    codeExample: "#CALC!"
  },
  {
    question: "Why does referencing whole columns like A:A in TRANSPOSE cause a worksheet crash?",
    shortAnswer: "Transposing 1,048,576 rows exceeds the maximum worksheet limit of 16,384 columns.",
    explanation: "Worksheets cannot accommodate more than 16,384 horizontal columns.",
    hint: "1M rows exceeds the 16,384 column limit.",
    level: "expert",
    codeExample: "Transposing A:A exceeds Column XFD"
  },
  {
    question: "How can you unpivot a 2D cross-tab matrix [Rows=Products, Cols=Quarters] into a 3-column table [Product, Quarter, Sales]?",
    shortAnswer: "=LET(p, ProdCol, q, QtrRow, v, ValMatrix, HSTACK(TOCOL(IF(v<>\"\", p)), TOCOL(IF(v<>\"\", q)), TOCOL(v)))",
    explanation: "This formula uses boolean masking with TOCOL to extract row headers, column headers, and cell values into aligned columns.",
    hint: "Mask with IF and flatten with TOCOL, then HSTACK.",
    level: "expert",
    codeExample: "=LET(p, A2:A6, q, B1:E1, v, B2:E6, HSTACK(TOCOL(IF(v<>\"\", p)), TOCOL(IF(v<>\"\", q)), TOCOL(v)))"
  },
  {
    question: "How does LET improve formula readability and execution speed in complex array pipelines?",
    shortAnswer: "LET computes intermediate calculation stages once in RAM, eliminating redundant calculations and improving clarity.",
    explanation: "LET binds intermediate results to named variables, optimizing CPU and memory usage.",
    hint: "Caches intermediate calculations in RAM.",
    level: "moderate",
    codeExample: "=LET(t, VSTACK(T1, T2), FILTER(t, CHOOSECOLS(t, 2)>50000))"
  },
  {
    question: "How can you deduplicate the output of VSTACK across multiple sheets?",
    shortAnswer: "=UNIQUE(VSTACK(Sheet1!A2:D20, Sheet2!A2:D20))",
    explanation: "Wrapping VSTACK inside UNIQUE removes identical duplicate rows across consolidated sheets.",
    hint: "Wrap VSTACK in UNIQUE.",
    level: "basic",
    codeExample: "=UNIQUE(VSTACK(Jan!A2:D20, Feb!A2:D20))"
  },
  {
    question: "How can you extract both the first row and the last row of a table simultaneously?",
    shortAnswer: "=CHOOSEROWS(Table, 1, -1)",
    explanation: "Passing 1 and -1 extracts the opening and closing rows in a single 2-row spilled array.",
    hint: "Pass 1 and -1 to CHOOSEROWS.",
    level: "basic",
    codeExample: "=CHOOSEROWS(A2:D50, 1, -1)"
  },
  {
    question: "How do you count the total number of data rows in a spilled array anchor A2#?",
    shortAnswer: "=ROWS(A2#)",
    explanation: "ROWS() evaluates the exact vertical height of any dynamic spilled array.",
    hint: "Use ROWS() on the spilled anchor.",
    level: "basic",
    codeExample: "=ROWS(A2#)"
  },
  {
    question: "How do you count the total number of columns in a dynamic spilled array anchor A2#?",
    shortAnswer: "=COLUMNS(A2#)",
    explanation: "COLUMNS() evaluates the exact horizontal width of any dynamic spilled array.",
    hint: "Use COLUMNS() on the spilled anchor.",
    level: "basic",
    codeExample: "=COLUMNS(A2#)"
  },
  {
    question: "How can you build a 7-day weekly calendar matrix from a SEQUENCE of 31 days using WRAPROWS?",
    shortAnswer: "=WRAPROWS(SEQUENCE(31), 7, \"\")",
    explanation: "SEQUENCE generates 1 to 31; WRAPROWS wraps them into 7-day rows, padding the 5th week with blanks.",
    hint: "Wrap 31 days into 7-day weekly rows.",
    level: "moderate",
    codeExample: "=WRAPROWS(SEQUENCE(31), 7, \"\")"
  },
  {
    question: "How does WRAPCOLS enable newspaper-style multi-column printing for a 100-student merit list?",
    shortAnswer: "By wrapping 100 names into 5 vertical columns of 20 names each: =WRAPCOLS(Students, 20, \"\").",
    explanation: "Formatting 100 rows into 5 columns of 20 rows fits the entire roster onto a single printed page.",
    hint: "Wrap into 20-row columns for 1-page printing.",
    level: "moderate",
    codeExample: "=WRAPCOLS(A2:A101, 20, \"\")"
  },
  {
    question: "How do you prevent #N/A errors when joining two tables of unequal row heights using HSTACK?",
    shortAnswer: "Wrap the shorter table inside EXPAND to match the row height of the taller table before joining.",
    explanation: "Using =HSTACK(Table1, EXPAND(Table2, ROWS(Table1), , \"\")) standardizes heights in memory.",
    hint: "Pad the shorter table with EXPAND before HSTACK.",
    level: "advanced",
    codeExample: "=HSTACK(T1, EXPAND(T2, ROWS(T1), , \"\"))"
  },
  {
    question: "Can array reshaping functions be nested inside mathematical aggregators like SUM, AVERAGE, and MMULT?",
    shortAnswer: "Yes, all 11 array reshaping functions return native dynamic arrays that pass seamlessly into mathematical functions.",
    explanation: "Excel treats returned dynamic arrays as first-class matrix arguments in all calculation engines.",
    hint: "Returned arrays are first-class mathematical arguments.",
    level: "basic",
    codeExample: "=SUM(TAKE(Data, 5))"
  },
  {
    question: "How can you convert any dynamic array pipeline into a custom reusable LAMBDA function?",
    shortAnswer: "Define the formula inside LAMBDA(param1, LET(...)) and save it under a custom name in Name Manager.",
    explanation: "LAMBDA encapsulates dynamic array logic into callable worksheet functions.",
    hint: "Encapsulate logic in LAMBDA and save in Name Manager.",
    level: "expert",
    codeExample: "=LAMBDA(range, LET(c, DROP(range, 1), TOCOL(c, 1)))"
  },
  {
    question: "What is Instructor Sukanta Hui's ultimate graduation criterion for array reshaping mastery?",
    shortAnswer: "The ability to architect complete, zero-VBA, in-memory financial models and ETL pipelines that dynamically sanitize, reshape, and consolidate multi-branch data with 100% mathematical accuracy and zero manual intervention.",
    explanation: "True Excel mastery is demonstrated when an analyst can eliminate fragile VBA macros, manual copy-pasting, and helper column clutter by composing elegant, vectorized dynamic array pipelines in memory!",
    hint: "Zero-VBA, automated, auditable in-memory dynamic array architecture.",
    level: "expert",
    codeExample: "Mastery: Architectural In-Memory Dynamic Array Modeling"
  }
];

export default questions;
