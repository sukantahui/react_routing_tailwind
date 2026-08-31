// topic9_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 9
// Topic: Generating dynamic procedural grids with MAKEARRAY
// Module: 004_003_custom-functions-with-lambda-and-helper-engines
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function of MAKEARRAY in modern Excel 365?",
    shortAnswer: "To generate a dynamic 2D procedural grid of calculated values based on specified row and column counts, evaluating a custom 2-parameter LAMBDA(r, c) for each coordinate.",
    explanation: "MAKEARRAY synthesizes an M x N matrix dynamically in memory without requiring source data ranges.",
    hint: "Procedural grid generation from row and column dimensions.",
    level: "basic",
    codeExample: "=MAKEARRAY(rows, cols, LAMBDA(r, c, calc))"
  },
  {
    question: "What is the syntax signature of the MAKEARRAY function?",
    shortAnswer: "=MAKEARRAY(rows, cols, lambda)",
    explanation: "MAKEARRAY accepts total rows, total columns, and terminates with a 2-parameter LAMBDA(r, c).",
    hint: "Rows, columns, and a 2-parameter LAMBDA.",
    level: "basic",
    codeExample: "=MAKEARRAY(5, 5, LAMBDA(r, c, r * c))"
  },
  {
    question: "How many parameters must the LAMBDA passed to MAKEARRAY declare?",
    shortAnswer: "Strictly 2 parameters: the first represents the current row index (1-based), and the second represents the current column index (1-based).",
    explanation: "Excel passes current row `r` and column `c` into the closure for each grid intersection.",
    hint: "Exactly 2 parameters: row index and column index.",
    level: "basic",
    codeExample: "LAMBDA(r, c, ...)"
  },
  {
    question: "Are the row and column indices (r, c) in MAKEARRAY 0-based or 1-based?",
    shortAnswer: "1-based (the top-left cell is evaluated with r = 1 and c = 1).",
    explanation: "The indices run from 1 to `rows` and 1 to `cols` inclusive.",
    hint: "1-based indexing (r=1..rows, c=1..cols).",
    level: "basic",
    codeExample: "r &in; [1, rows], c &in; [1, cols]"
  },
  {
    question: "How do you generate a 10x10 multiplication table using MAKEARRAY?",
    shortAnswer: "=MAKEARRAY(10, 10, LAMBDA(r, c, r * c))",
    explanation: "Multiplies row index by column index for each cell in the 10x10 grid.",
    hint: "LAMBDA(r, c, r * c) inside MAKEARRAY(10, 10, ...).",
    level: "basic",
    codeExample: "=MAKEARRAY(10, 10, LAMBDA(r, c, r * c))"
  },
  {
    question: "How do you generate an Identity Matrix of size N x N using MAKEARRAY?",
    shortAnswer: "=MAKEARRAY(N, N, LAMBDA(r, c, IF(r=c, 1, 0)))",
    explanation: "Returns 1 along the main diagonal where r = c, and 0 everywhere else.",
    hint: "IF(r=c, 1, 0) inside MAKEARRAY.",
    level: "moderate",
    codeExample: "=MAKEARRAY(5, 5, LAMBDA(r, c, IF(r=c, 1, 0)))"
  },
  {
    question: "What happens if either the rows or cols argument passed to MAKEARRAY is less than 1?",
    shortAnswer: "#CALC! error.",
    explanation: "MAKEARRAY requires positive integers for both row and column dimensions.",
    hint: "Dimensions < 1 trigger #CALC!.",
    level: "basic",
    codeExample: "#CALC!"
  },
  {
    question: "How do you generate an alternating checkerboard pattern (1s and 0s) of size 8x8 with MAKEARRAY?",
    shortAnswer: "=MAKEARRAY(8, 8, LAMBDA(r, c, MOD(r + c, 2)))",
    explanation: "MOD(r + c, 2) produces alternating 0s and 1s across adjacent rows and columns.",
    hint: "MOD(r + c, 2) inside MAKEARRAY.",
    level: "moderate",
    codeExample: "=MAKEARRAY(8, 8, LAMBDA(r, c, MOD(r+c, 2)))"
  },
  {
    question: "How can MAKEARRAY generate sequential cell coordinates like 'R1C1', 'R1C2' across a 5x4 grid?",
    shortAnswer: "=MAKEARRAY(5, 4, LAMBDA(r, c, \"R\" & r & \"C\" & c))",
    explanation: "Concatenates string prefixes with the numeric row and column indices.",
    hint: "\"R\" & r & \"C\" & c inside MAKEARRAY.",
    level: "basic",
    codeExample: "=MAKEARRAY(5, 4, LAMBDA(r, c, \"R\" & r & \"C\" & c))"
  },
  {
    question: "How do you generate an empty calendar month grid (e.g. 5 weeks x 7 days) starting on a specific day using MAKEARRAY?",
    shortAnswer: "=MAKEARRAY(5, 7, LAMBDA(r, c, LET(dayNum, (r-1)*7 + c - startOffset, IF(AND(dayNum>=1, dayNum<=maxDays), dayNum, \"\"))))",
    explanation: "Calculates the serial day number from row and column coordinates, blanking out invalid overflow days.",
    hint: "Linear coordinate transformation (r-1)*7 + c.",
    level: "advanced",
    codeExample: "=MAKEARRAY(5, 7, LAMBDA(r, c, LET(d, (r-1)*7+c, IF(d<=31, d, \"\"))))"
  },
  {
    question: "What error occurs if the LAMBDA inside MAKEARRAY returns an array instead of a single scalar value?",
    shortAnswer: "#CALC! error.",
    explanation: "MAKEARRAY expects each grid coordinate evaluation to resolve to a single scalar value.",
    hint: "Nested array returns trigger #CALC!.",
    level: "moderate",
    codeExample: "#CALC!"
  },
  {
    question: "How can MAKEARRAY generate a dynamic random integer matrix between 100 and 500 of size 6x4?",
    shortAnswer: "=MAKEARRAY(6, 4, LAMBDA(r, c, RANDBETWEEN(100, 500)))",
    explanation: "Generates a 6x4 matrix of randomized numbers dynamically without manual cell dragging.",
    hint: "RANDBETWEEN inside MAKEARRAY.",
    level: "basic",
    codeExample: "=MAKEARRAY(6, 4, LAMBDA(r, c, RANDBETWEEN(100, 500)))"
  },
  {
    question: "How does MAKEARRAY differ from SEQUENCE?",
    shortAnswer: "SEQUENCE generates simple linear progressive sequences; MAKEARRAY evaluates custom procedural 2D mathematical formulas based on (r, c) coordinates.",
    explanation: "MAKEARRAY offers infinite procedural flexibility via LAMBDA; SEQUENCE is restricted to step arithmetic.",
    hint: "MAKEARRAY provides full procedural LAMBDA logic per coordinate.",
    level: "moderate",
    codeExample: "SEQUENCE(Step Arithmetic) vs MAKEARRAY(Custom 2D Math)"
  },
  {
    question: "How do you generate an Upper Triangular Matrix (1s on and above diagonal, 0s below) using MAKEARRAY?",
    shortAnswer: "=MAKEARRAY(N, N, LAMBDA(r, c, IF(c>=r, 1, 0)))",
    explanation: "Evaluates whether column index `c` is greater than or equal to row index `r`.",
    hint: "IF(c>=r, 1, 0) inside MAKEARRAY.",
    level: "moderate",
    codeExample: "=MAKEARRAY(5, 5, LAMBDA(r, c, IF(c>=r, 1, 0)))"
  },
  {
    question: "Can an existing named LAMBDA in Name Manager be passed into MAKEARRAY as the third argument?",
    shortAnswer: "Yes, you can write =MAKEARRAY(5, 5, FX_GRID_CELL) if FX_GRID_CELL accepts 2 parameters.",
    explanation: "Named 2-parameter LAMBDAs act as first-class function pointers in MAKEARRAY.",
    hint: "Pass named 2-parameter LAMBDA identifier directly.",
    level: "advanced",
    codeExample: "=MAKEARRAY(10, 10, FX_TAX_SLAB_GRID)"
  },
  {
    question: "What happens if destination cells in the spill footprint of MAKEARRAY contain existing values?",
    shortAnswer: "#SPILL! error.",
    explanation: "Like all dynamic array functions, MAKEARRAY requires an unobstructed M x N spill area.",
    hint: "Blocked spill zone triggers #SPILL!.",
    level: "basic",
    codeExample: "#SPILL!"
  },
  {
    question: "How do you generate a 2D lookup grid that fetches data at coordinate (r, c) from a master table using INDEX and MAKEARRAY?",
    shortAnswer: "=MAKEARRAY(ROWS(Range), COLUMNS(Range), LAMBDA(r, c, INDEX(Range, r, c)))",
    explanation: "Reconstructs or transforms an entire source table by coordinate indexing.",
    hint: "INDEX(Range, r, c) inside MAKEARRAY.",
    level: "moderate",
    codeExample: "=MAKEARRAY(5, 4, LAMBDA(r, c, INDEX(DataMatrix, r, c)*1.10))"
  },
  {
    question: "How do you generate a procedural loan amortization balance matrix across 5 interest rates and 10 loan tenures using MAKEARRAY?",
    shortAnswer: "=MAKEARRAY(10, 5, LAMBDA(r, c, LET(rate, INDEX(Rates, c), tenure, INDEX(Tenures, r), PMT(rate/12, tenure*12, -Principal))))",
    explanation: "Indexes rate from column `c` and tenure from row `r`, calculating monthly EMI for each scenario intersection.",
    hint: "Index rates by col and tenures by row inside MAKEARRAY.",
    level: "expert",
    codeExample: "=MAKEARRAY(10, 5, LAMBDA(r, c, PMT(INDEX(Rates,c)/12, r*12, -500000)))"
  },
  {
    question: "Can LET be used inside MAKEARRAY for multi-stage coordinate mathematics?",
    shortAnswer: "Yes, nesting LET inside MAKEARRAY allows complex multi-variable procedural logic per cell.",
    explanation: "Enables intermediate coordinate transformation and formatting in local scope.",
    hint: "Nest LET inside MAKEARRAY's LAMBDA.",
    level: "advanced",
    codeExample: "=MAKEARRAY(5, 5, LAMBDA(r, c, LET(dist, SQRT(r^2 + c^2), ROUND(dist, 2))))"
  },
  {
    question: "How do you generate a procedural chessboard layout with piece codes at start positions using MAKEARRAY?",
    shortAnswer: "=MAKEARRAY(8, 8, LAMBDA(r, c, IF(r=2, \"Pawn\", IF(r=7, \"pawn\", IF(MOD(r+c,2)=0, \"■\", \"□\")))))",
    explanation: "Evaluates coordinate ranks and files to place pieces and square shading.",
    hint: "Check row rank inside MAKEARRAY.",
    level: "advanced",
    codeExample: "=MAKEARRAY(8, 8, LAMBDA(r, c, IF(r=2, \"Pawn\", \"\")))"
  },
  {
    question: "Why does MAKEARRAY calculate significantly faster than dragging formulas across a 1,000 x 100 cell range?",
    shortAnswer: "Because MAKEARRAY generates the entire 100,000-cell matrix in contiguous C++ RAM memory without individual cell formula overhead.",
    explanation: "Eliminates cell metadata and dependency graph overhead across 100k individual cells.",
    hint: "Contiguous RAM memory allocation in multi-threaded C++.",
    level: "expert",
    codeExample: "High-Speed Contiguous Memory Matrix Generation"
  },
  {
    question: "How do you generate a matrix of date values spanning 12 months (rows) and 31 days (cols) using MAKEARRAY?",
    shortAnswer: "=MAKEARRAY(12, 31, LAMBDA(r, c, IFERROR(DATE(2025, r, c), \"\")))",
    explanation: "DATE returns error for invalid days (like Feb 30), which IFERROR cleanses to empty strings.",
    hint: "IFERROR(DATE(year, r, c), \"\") inside MAKEARRAY.",
    level: "moderate",
    codeExample: "=MAKEARRAY(12, 31, LAMBDA(m, d, IFERROR(DATE(2025, m, d), \"\")))"
  },
  {
    question: "How do you test a MAKEARRAY formula in memory using the F9 key?",
    shortAnswer: "Highlight =MAKEARRAY(...) in the formula bar and press F9 to inspect the evaluated 2D array in RAM.",
    explanation: "F9 renders the procedural matrix in the formula bar for immediate verification.",
    hint: "Highlight and press F9 in formula bar.",
    level: "basic",
    codeExample: "F9 Array Evaluation"
  },
  {
    question: "Can MAKEARRAY accept dynamic row and column counts derived from other functions (e.g. ROWS(Data#), COLUMNS(Data#))?",
    shortAnswer: "Yes, passing dynamic count expressions allows MAKEARRAY to automatically adjust grid dimensions reactively.",
    explanation: "Full reactivity with upstream dynamic arrays.",
    hint: "Pass dynamic expressions like ROWS(Data#) for dimensions.",
    level: "basic",
    codeExample: "=MAKEARRAY(ROWS(Tbl#), COLUMNS(Tbl#), LAMBDA(r, c, ...))"
  },
  {
    question: "How do you generate a Lower Triangular Matrix (1s on and below diagonal, 0s above) using MAKEARRAY?",
    shortAnswer: "=MAKEARRAY(N, N, LAMBDA(r, c, IF(r>=c, 1, 0)))",
    explanation: "Evaluates whether row index `r` is greater than or equal to column index `c`.",
    hint: "IF(r>=c, 1, 0) inside MAKEARRAY.",
    level: "moderate",
    codeExample: "=MAKEARRAY(5, 5, LAMBDA(r, c, IF(r>=c, 1, 0)))"
  },
  {
    question: "How do you create a Distance Matrix from the origin (0,0) for a 5x5 grid using MAKEARRAY?",
    shortAnswer: "=MAKEARRAY(5, 5, LAMBDA(r, c, ROUND(SQRT(r^2 + c^2), 2)))",
    explanation: "Computes Euclidean distance &radic;(r&sup2; + c&sup2;) for every coordinate.",
    hint: "SQRT(r^2 + c^2) inside MAKEARRAY.",
    level: "moderate",
    codeExample: "=MAKEARRAY(5, 5, LAMBDA(r, c, ROUND(SQRT(r^2 + c^2), 2)))"
  },
  {
    question: "How can MAKEARRAY generate custom column headers and numbered row labels in 1 formula?",
    shortAnswer: "=MAKEARRAY(10, 5, LAMBDA(r, c, IF(r=1, \"Col-\" & c, IF(c=1, \"Row-\" & r, r*c))))",
    explanation: "Assigns headers when r=1, row labels when c=1, and calculations for interior cells.",
    hint: "Conditional header assignment based on r=1 or c=1.",
    level: "advanced",
    codeExample: "=MAKEARRAY(6, 6, LAMBDA(r, c, IF(r=1, \"H\"&c, IF(c=1, \"R\"&r, r*c))))"
  },
  {
    question: "What happens if the LAMBDA passed to MAKEARRAY declares only 1 parameter instead of 2?",
    shortAnswer: "#VALUE! error.",
    explanation: "MAKEARRAY strictly requires the LAMBDA to declare exactly 2 parameters (r, c).",
    hint: "Parameter mismatch triggers #VALUE!.",
    level: "basic",
    codeExample: "#VALUE!"
  },
  {
    question: "How do you generate a multiplication table with formatted string equations (e.g. '3 x 4 = 12') using MAKEARRAY?",
    shortAnswer: "=MAKEARRAY(10, 10, LAMBDA(r, c, r & \" x \" & c & \" = \" & (r * c)))",
    explanation: "Concatenates operands, operators, and the product into a formatted string.",
    hint: "r & \" x \" & c & \" = \" & (r*c) inside MAKEARRAY.",
    level: "basic",
    codeExample: "=MAKEARRAY(5, 5, LAMBDA(r, c, r & \"*\" & c & \"=\" & r*c))"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for the MAKEARRAY helper function?",
    shortAnswer: "Whenever you need to synthesize synthetic test datasets, sensitivity matrices, calendar layouts, or custom 2D simulation grids without referencing existing cell ranges, always deploy MAKEARRAY with pure (r, c) procedural math!",
    explanation: "MAKEARRAY is the procedural generative engine in Excel 365, turning mathematical formulas into complete 2D dynamic array grids in zero milliseconds!",
    hint: "Use MAKEARRAY for procedural 2D grid generation from coordinates.",
    level: "expert",
    codeExample: "Rule: Procedural 2D Grid Synthesis → Use MAKEARRAY(r, c, LAMBDA)!"
  }
];

export default questions;
