// topic8_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 8
// Topic: Reshaping 1D Data Streams into Structured 2D Tables with WRAPROWS
// Module: 004_002_next-gen-array-reshaping-and-grid-transformation
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function of WRAPROWS in Excel 365?",
    shortAnswer: "It transforms a 1D vector of continuous values into a 2D matrix by wrapping elements row-by-row up to a specified count.",
    explanation: "WRAPROWS converts a single flat column or horizontal row vector into a multi-column rectangular table by placing N items across each row before wrapping to the next line.",
    hint: "Wraps a 1D vector into 2D rows.",
    level: "basic",
    codeExample: "=WRAPROWS(A2:A21, 4, \"-\")"
  },
  {
    question: "What is the syntax signature of the WRAPROWS function?",
    shortAnswer: "=WRAPROWS(vector, wrap_count, [pad_with])",
    explanation: "WRAPROWS requires 'vector' (1D source vector) and 'wrap_count' (maximum items per row). '[pad_with]' is optional, defaulting to #N/A if the vector length is not an exact multiple of wrap_count.",
    hint: "Vector, items per row, optional pad value.",
    level: "basic",
    codeExample: "=WRAPROWS(StreamVector, 5, \"\")"
  },
  {
    question: "How does WRAPROWS reconstruct relational tables from raw unformatted transaction logs?",
    shortAnswer: "By wrapping repeating N-field log streams (e.g. ID, Date, Narration, Amount) into structured N-column rows.",
    explanation: "If an export outputs 4 lines per transaction, setting wrap_count=4 unrolls the 1D list into a clean 4-column relational table.",
    hint: "Set wrap_count equal to the number of fields per transaction.",
    level: "moderate",
    codeExample: "=WRAPROWS(RawBankLog, 4, \"NO_DATA\")"
  },
  {
    question: "What happens if the length of the 1D vector is not an exact multiple of wrap_count?",
    shortAnswer: "Excel fills the remaining empty cells in the final row with #N/A (or the specified [pad_with] value).",
    explanation: "If you wrap 14 elements into rows of 4, Excel produces 3 full rows (12 items) and a 4th row with 2 items and 2 padded values.",
    hint: "Pads the trailing row cells with pad_with or #N/A.",
    level: "basic",
    codeExample: "=WRAPROWS(A1:A14, 4, \"-\")"
  },
  {
    question: "What error occurs if wrap_count is set to 0 or a negative number in WRAPROWS?",
    shortAnswer: "#VALUE! error.",
    explanation: "The wrap_count parameter must be a positive integer &ge; 1. Values &le; 0 trigger a #VALUE! error.",
    hint: "wrap_count must be a positive integer &ge; 1.",
    level: "basic",
    codeExample: "#VALUE!"
  },
  {
    question: "How does WRAPROWS differ fundamentally from WRAPCOLS?",
    shortAnswer: "WRAPROWS fills horizontally row-by-row (left to right); WRAPCOLS fills vertically column-by-column (top to bottom).",
    explanation: "In WRAPROWS, elements 1 to N occupy Row 1. In WRAPCOLS, elements 1 to N occupy Column 1.",
    hint: "Row-wise wrapping vs column-wise wrapping.",
    level: "moderate",
    codeExample: "=WRAPROWS(V, 3) vs =WRAPCOLS(V, 3)"
  },
  {
    question: "Can WRAPROWS accept a 1D horizontal row vector as its input argument?",
    shortAnswer: "Yes, WRAPROWS accepts both 1D vertical columns and 1D horizontal rows.",
    explanation: "Regardless of whether the input vector spans down rows (A1:A20) or across columns (A1:T1), WRAPROWS wraps the sequence into a 2D matrix.",
    hint: "Accepts vertical or horizontal 1D inputs.",
    level: "basic",
    codeExample: "=WRAPROWS(A1:T1, 4)"
  },
  {
    question: "What error occurs if the input array passed to WRAPROWS is a 2D matrix (e.g. 5 rows x 3 cols)?",
    shortAnswer: "#VALUE! error.",
    explanation: "WRAPROWS strictly requires a 1D vector (either 1 row high or 1 column wide). Passing a 2D matrix triggers #VALUE!. To wrap a 2D matrix, flatten with TOCOL first: =WRAPROWS(TOCOL(Matrix, 1), 4).",
    hint: "Flatten with TOCOL before wrapping a 2D matrix.",
    level: "advanced",
    codeExample: "=WRAPROWS(TOCOL(A2:D10, 1), 4)"
  },
  {
    question: "How can you pad missing slots in the final row with an empty string \"\" using WRAPROWS?",
    shortAnswer: "=WRAPROWS(vector, wrap_count, \"\")",
    explanation: "Supplying \"\" as the third parameter replaces default #N/A values in the final incomplete row with clean blanks.",
    hint: "Pass \"\" as the pad_with parameter.",
    level: "basic",
    codeExample: "=WRAPROWS(A2:A25, 4, \"\")"
  },
  {
    question: "How does WRAPROWS interact with Excel's Spilled Range Operator (#)?",
    shortAnswer: "WRAPROWS can consume any dynamic spilled 1D vector directly by referencing its anchor cell (e.g. =WRAPROWS(G2#, 4)).",
    explanation: "If a prior formula (e.g. =TOCOL(Table, 1)) spills into G2, WRAPROWS reshapes the spilled stream dynamically.",
    hint: "Use G2# as the vector argument.",
    level: "basic",
    codeExample: "=WRAPROWS(G2#, 4)"
  },
  {
    question: "What is the total number of rows generated by =WRAPROWS(Vector, N)?",
    shortAnswer: "=ROUNDUP(ROWS(Vector) / N, 0)",
    explanation: "The output row height is the mathematical ceiling of total vector elements divided by wrap_count.",
    hint: "Ceiling division: ROUNDUP(Total / N, 0).",
    level: "moderate",
    codeExample: "=ROUNDUP(ROWS(A1:A25)/4, 0) &rarr; 7 Rows"
  },
  {
    question: "How can you combine WRAPROWS and TEXTSPLIT to parse a single delimited text cell into a 2D table?",
    shortAnswer: "=WRAPROWS(TEXTSPLIT(SingleCell, \",\"), 4, \"\")",
    explanation: "TEXTSPLIT splits the comma-separated text into a 1D vector, and WRAPROWS shapes that vector into a 4-column table.",
    hint: "Split text into 1D with TEXTSPLIT, then wrap with WRAPROWS.",
    level: "advanced",
    codeExample: "=WRAPROWS(TEXTSPLIT(A1, \",\"), 4, \"\")"
  },
  {
    question: "What error occurs if destination cells where WRAPROWS needs to spill are blocked?",
    shortAnswer: "#SPILL! error.",
    explanation: "Any non-empty cell in the output bounding box triggers a #SPILL! error.",
    hint: "Destination collision error.",
    level: "basic",
    codeExample: "#SPILL!"
  },
  {
    question: "In banking and fintech, how does WRAPROWS process continuous credit card transaction streams?",
    shortAnswer: "By wrapping 6-token card transaction packets [Card_No, Date, Merchant, Amount, Status, Auth_Code] into 6-column ledger tables.",
    explanation: "Continuous stream exports from payment processors are flattened. WRAPROWS reconstructs them into relational tables in memory.",
    hint: "Wrap 6 consecutive tokens into tabular records.",
    level: "advanced",
    codeExample: "=WRAPROWS(PaymentStream, 6, \"N/A\")"
  },
  {
    question: "How can DROP and WRAPROWS be combined to unroll a data stream while skipping initial header lines?",
    shortAnswer: "=WRAPROWS(DROP(RawLogStream, 3), 4, \"-\")",
    explanation: "DROP strips the first 3 metadata lines; WRAPROWS shapes the remaining stream into 4-column rows.",
    hint: "DROP header lines first, then WRAPROWS.",
    level: "moderate",
    codeExample: "=WRAPROWS(DROP(A1:A100, 3), 4, \"-\")"
  },
  {
    question: "How does WRAPROWS handle date and numeric formatting in the source vector?",
    shortAnswer: "It passes underlying serial numbers and data types faithfully to destination cells.",
    explanation: "WRAPROWS does not alter data types, text encodings, or precision.",
    hint: "Source data types and serial numbers are preserved.",
    level: "basic",
    codeExample: "=WRAPROWS(RawLogVector, 4)"
  },
  {
    question: "How can you dynamically link wrap_count to a cell dropdown (e.g. cell K1)?",
    shortAnswer: "=WRAPROWS(Vector, K1, \"\")",
    explanation: "Referencing cell K1 allows users to dynamically toggle the table width between 2, 3, 4, or 5 columns.",
    hint: "Reference the dropdown cell in the wrap_count argument.",
    level: "basic",
    codeExample: "=WRAPROWS(A2:A50, K1, \"\")"
  },
  {
    question: "Can WRAPROWS accept an inline array constant like {\"A\", \"B\", \"C\", \"D\", \"E\", \"F\"}?",
    shortAnswer: "Yes, WRAPROWS processes array constants directly in memory.",
    explanation: "Writing =WRAPROWS({\"A\",\"B\",\"C\",\"D\",\"E\",\"F\"}, 2) returns a 3-row x 2-column matrix.",
    hint: "Inline array constants work identically to cell ranges.",
    level: "basic",
    codeExample: "=WRAPROWS({\"A\",\"B\",\"C\",\"D\",\"E\",\"F\"}, 2)"
  },
  {
    question: "How does LET optimize formulas that use WRAPROWS alongside CHOOSECOLS and SORT?",
    shortAnswer: "LET creates the wrapped 2D table once in RAM, allowing subsequent column slicing and sorting without redundant wrapping.",
    explanation: "Writing =LET(t, WRAPROWS(Data, 4, \"\"), SORT(CHOOSECOLS(t, 1, 4), 2, -1)) executes the entire pipeline in memory.",
    hint: "Cache the wrapped table in a LET variable.",
    level: "advanced",
    codeExample: "=LET(t, WRAPROWS(A1:A100, 4, \"\"), SORT(t, 4, -1))"
  },
  {
    question: "Why should you avoid passing whole column references (e.g. A:A) to WRAPROWS?",
    shortAnswer: "A full column contains 1,048,576 rows, mostly blank, causing severe memory bloat and calculation freezing.",
    explanation: "Always use bounded ranges (e.g. A2:A500) or structured Table references.",
    hint: "Use bounded ranges to prevent processing 1M rows.",
    level: "expert",
    codeExample: "Use A2:A500 instead of A:A"
  },
  {
    question: "How can you unroll a single-column contact list [Name, Phone, Email, City] into a 4-column address directory using WRAPROWS?",
    shortAnswer: "=WRAPROWS(ContactColumn, 4, \"-\")",
    explanation: "Every 4 consecutive rows in the single column are mapped to [Name, Phone, Email, City] columns.",
    hint: "Set wrap_count=4 to unroll 4-field contact blocks.",
    level: "basic",
    codeExample: "=WRAPROWS(A2:A81, 4, \"-\")"
  },
  {
    question: "How can you count the total number of complete and partial rows generated by WRAPROWS?",
    shortAnswer: "=ROWS(WRAPROWS(Vector, N, \"\"))",
    explanation: "Wrapping the WRAPROWS expression in ROWS() returns the total vertical row height.",
    hint: "Use ROWS() on the WRAPROWS expression.",
    level: "basic",
    codeExample: "=ROWS(WRAPROWS(A1:A25, 4, \"\"))"
  },
  {
    question: "What happens if wrap_count is larger than the total number of elements in the vector?",
    shortAnswer: "Excel outputs a single row containing all elements followed by padding values up to wrap_count.",
    explanation: "If you wrap 5 items with wrap_count=10, Excel creates 1 row of 5 items and 5 padded cells.",
    hint: "Produces 1 row with trailing padding.",
    level: "moderate",
    codeExample: "=WRAPROWS(A1:A5, 10, \"-\")"
  },
  {
    question: "How can WRAPROWS and TOCOL be used together to re-shape a 2D matrix of shape 6x2 into a matrix of shape 3x4?",
    shortAnswer: "=WRAPROWS(TOCOL(Matrix, 1), 4)",
    explanation: "TOCOL flattens the 6x2 (12 items) matrix into a 1D column vector; WRAPROWS wraps the 12 items into 3 rows of 4 columns.",
    hint: "Flatten to 1D with TOCOL, then wrap to new width with WRAPROWS.",
    level: "advanced",
    codeExample: "=WRAPROWS(TOCOL(A2:B7, 1), 4)"
  },
  {
    question: "How does WRAPROWS handle boolean TRUE/FALSE values during wrapping?",
    shortAnswer: "Boolean values are preserved in their native logical format without coercion.",
    explanation: "WRAPROWS does not convert Booleans to 1 or 0.",
    hint: "Logical types remain unchanged.",
    level: "basic",
    codeExample: "=WRAPROWS(LogicVector, 3)"
  },
  {
    question: "How can you extract only the 3rd column of a table generated by WRAPROWS?",
    shortAnswer: "=CHOOSECOLS(WRAPROWS(Vector, 4, \"\"), 3)",
    explanation: "CHOOSECOLS extracts the 3rd column (e.g. Amount or Email) directly from the in-memory wrapped matrix.",
    hint: "Wrap with WRAPROWS, then slice with CHOOSECOLS.",
    level: "moderate",
    codeExample: "=CHOOSECOLS(WRAPROWS(A1:A100, 4, \"\"), 3)"
  },
  {
    question: "Why does WRAPROWS calculate significantly faster than legacy INDEX with modular arithmetic?",
    shortAnswer: "WRAPROWS allocates a single contiguous memory grid in C++ without evaluating individual INT/MOD cell formulas.",
    explanation: "Legacy formulas =INDEX($A$1:$A$100, (ROW()-1)*4 + COLUMN()) created individual cell dependency tree nodes. WRAPROWS computes the entire grid in 1 vectorized operation.",
    hint: "Single vectorized operation vs hundreds of INT/MOD formulas.",
    level: "expert",
    codeExample: "Vectorized C++ memory allocation"
  },
  {
    question: "How can you create a dynamic calendar grid from a SEQUENCE of 31 days using WRAPROWS?",
    shortAnswer: "=WRAPROWS(SEQUENCE(31), 7, \"\")",
    explanation: "SEQUENCE generates numbers 1 through 31; WRAPROWS wraps them into 7-day weekly rows, padding the 5th week with blanks.",
    hint: "Wrap 31 days into 7-day weekly rows.",
    level: "advanced",
    codeExample: "=WRAPROWS(SEQUENCE(31), 7, \"\")"
  },
  {
    question: "Can WRAPROWS pad missing cells with a formula result like TODAY() or 0?",
    shortAnswer: "Yes, any constant, number, or scalar formula result can be passed to [pad_with].",
    explanation: "Passing 0 or TODAY() fills the remaining cells in the final row with the evaluated value.",
    hint: "Dynamic scalar formula results can be passed as pad_with.",
    level: "moderate",
    codeExample: "=WRAPROWS(Data, 4, 0)"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for data stream unrolling with WRAPROWS?",
    shortAnswer: "Always inspect the repeating token periodicity (number of fields per record) before wrapping, and supply a clean pad_with fallback.",
    explanation: "In enterprise ETL pipelines, verifying that every record has exactly N lines (e.g. 4 lines per transaction) is essential. If an unparsed file has occasional missing lines, setting wrap_count will cause phase shifts. Always sanitize with FILTER or DROP before wrapping with WRAPROWS!",
    hint: "Verify token periodicity and sanitize raw streams before wrapping.",
    level: "expert",
    codeExample: "Clean Stream Pipeline: =WRAPROWS(FILTER(RawStream, RawStream<>\"\"), 4, \"N/A\")"
  }
];

export default questions;
