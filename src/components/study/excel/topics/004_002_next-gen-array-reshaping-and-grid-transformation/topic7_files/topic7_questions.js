// topic7_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 7
// Topic: Resizing and Padding Arrays to Fixed Dimensions with EXPAND
// Module: 004_002_next-gen-array-reshaping-and-grid-transformation
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary purpose of the EXPAND function in Excel 365?",
    shortAnswer: "It expands/enlarges an array to specified row and column dimensions, filling new coordinate cells with a specified padding value.",
    explanation: "EXPAND standardizes array dimensions to fixed target heights and widths, preventing dimension-mismatch errors when combining disparate datasets side-by-side or vertically.",
    hint: "Pads arrays to fixed target dimensions.",
    level: "basic",
    codeExample: "=EXPAND(A2:C6, 10, 5, \"-\")"
  },
  {
    question: "What is the syntax signature of the EXPAND function?",
    shortAnswer: "=EXPAND(array, rows, [columns], [pad_with])",
    explanation: "EXPAND requires 'array' and target 'rows'. '[columns]' defaults to source column width if omitted. '[pad_with]' defaults to #N/A if omitted.",
    hint: "Array, target rows, optional target cols, optional pad value.",
    level: "basic",
    codeExample: "=EXPAND(Table1, 15, 6, 0)"
  },
  {
    question: "What value does EXPAND use to fill new padding cells if the [pad_with] argument is omitted?",
    shortAnswer: "#N/A error.",
    explanation: "By default, Excel fills all newly expanded coordinate slots with the standard #N/A value unless an explicit padding constant (e.g. \"\", 0, or \"N/A\") is provided.",
    hint: "Default padding is #N/A.",
    level: "basic",
    codeExample: "=EXPAND(A2:B5, 10, 2)"
  },
  {
    question: "How can you pad missing cells with an empty string \"\" instead of #N/A using EXPAND?",
    shortAnswer: "=EXPAND(array, rows, columns, \"\")",
    explanation: "Passing \"\" as the fourth argument replaces all unfilled expansion cells with clean blank text.",
    hint: "Pass \"\" as the pad_with parameter.",
    level: "basic",
    codeExample: "=EXPAND(A2:C10, 15, 5, \"\")"
  },
  {
    question: "What error occurs if the specified target rows or columns in EXPAND are smaller than the source array dimensions?",
    shortAnswer: "#VALUE! error.",
    explanation: "EXPAND is strictly designed for enlargement. If you specify dimensions smaller than the source matrix, Excel returns #VALUE!. To shrink an array, use TAKE or DROP instead.",
    hint: "EXPAND cannot shrink arrays; it returns #VALUE!.",
    level: "moderate",
    codeExample: "#VALUE!"
  },
  {
    question: "How does EXPAND enable seamless horizontal stacking (HSTACK) of tables with unequal row counts?",
    shortAnswer: "By padding shorter tables to match the row height of the tallest table before applying HSTACK.",
    explanation: "If Table 1 has 10 rows and Table 2 has 6 rows, passing Table 2 through EXPAND(Table2, 10, , \"\") standardizes both to 10 rows, preventing trailing #N/A errors when joined side-by-side.",
    hint: "Equalizes row heights before horizontal stacking.",
    level: "advanced",
    codeExample: "=HSTACK(Table1, EXPAND(Table2, ROWS(Table1), , \"\"))"
  },
  {
    question: "Can EXPAND pad numeric tables with zero (0) for financial aggregation?",
    shortAnswer: "Yes, passing 0 as [pad_with] fills missing cells with numeric 0, allowing functions like SUM or AVERAGE to compute safely.",
    explanation: "In financial modeling, padding sparse matrices with 0 ensures mathematical calculations do not fail on text or error values.",
    hint: "Pass 0 as the pad_with value.",
    level: "basic",
    codeExample: "=EXPAND(A2:C5, 10, 3, 0)"
  },
  {
    question: "What happens if you omit the [columns] argument in EXPAND?",
    shortAnswer: "The column width of the output array remains identical to the source array's column width.",
    explanation: "When [columns] is omitted, EXPAND only expands the row height vertically, maintaining the existing column width.",
    hint: "Omitted columns argument preserves original width.",
    level: "basic",
    codeExample: "=EXPAND(A2:D5, 12, , \"-\")"
  },
  {
    question: "What happens if you set rows to the source row count and expand only the columns?",
    shortAnswer: "EXPAND expands horizontally, adding new padded columns to the right while keeping row height unchanged.",
    explanation: "For example, =EXPAND(A2:B10, ROWS(A2:B10), 5, \"Pending\") expands a 2-column table to 5 columns.",
    hint: "Expands width by adding new columns on the right.",
    level: "moderate",
    codeExample: "=EXPAND(A2:B10, ROWS(A2:B10), 5, \"Pending\")"
  },
  {
    question: "How can EXPAND create a standardized 15-day attendance template for branch staff rosters?",
    shortAnswer: "By expanding sparse attendance records to 15 rows with \"Absent\" as the padding value.",
    explanation: "Using =EXPAND(PresentStaffList, 15, 3, \"Absent\") fills any unlogged days with \"Absent\" automatically.",
    hint: "Use custom text like \"Absent\" in pad_with.",
    level: "moderate",
    codeExample: "=EXPAND(A2:C8, 15, 3, \"Absent\")"
  },
  {
    question: "What error occurs if the cells where EXPAND needs to spill are blocked?",
    shortAnswer: "#SPILL! error.",
    explanation: "If destination cells contain existing data, formulas, or merged formatting, Excel triggers #SPILL!.",
    hint: "Destination collision error.",
    level: "basic",
    codeExample: "#SPILL!"
  },
  {
    question: "Can EXPAND accept dynamic spilled array references like A2#?",
    shortAnswer: "Yes, EXPAND accepts dynamic spilled arrays and expands them to target dimensions.",
    explanation: "You can write =EXPAND(FILTER(Data, Dept=\"Dev\"), 20, 5, \"-\") to standardize filtered dynamic outputs.",
    hint: "Use A2# as the input array.",
    level: "basic",
    codeExample: "=EXPAND(A2#, 20, 5, \"N/A\")"
  },
  {
    question: "How does EXPAND handle date and currency formatting in source arrays?",
    shortAnswer: "Original cell data types and serial numbers are preserved in their respective coordinate slots.",
    explanation: "EXPAND preserves source data types while filling newly added slots with the specified pad_with constant.",
    hint: "Source data types are preserved.",
    level: "basic",
    codeExample: "=EXPAND(SalesGrid, 12, 4, 0)"
  },
  {
    question: "How can you dynamically pad an array to match the row height of another dynamic array (e.g. TargetArray#)?",
    shortAnswer: "=EXPAND(SourceArray, ROWS(TargetArray#), , \"\")",
    explanation: "Using ROWS(TargetArray#) in EXPAND's rows parameter dynamically adjusts the height to match the target array.",
    hint: "Use ROWS(Target#) to dynamically synchronize dimensions.",
    level: "advanced",
    codeExample: "=EXPAND(A2:C5, ROWS(G2#), , \"\")"
  },
  {
    question: "In financial modeling, how can EXPAND be used to build multi-year fixed-width projection templates?",
    shortAnswer: "By standardizing 3-year historical figures into a 10-year projection matrix padded with \"TBD\" or zero.",
    explanation: "EXPAND ensures historical schedules match the standard 10-column horizon required for DCF and LBO modeling.",
    hint: "Expand historical horizon to match 10-year projection templates.",
    level: "advanced",
    codeExample: "=EXPAND(Historical3Yr, 8, 10, 0)"
  },
  {
    question: "What happens if [pad_with] is passed as a cell reference containing a text string (e.g. K1)?",
    shortAnswer: "EXPAND uses the value in cell K1 to fill all padding cells.",
    explanation: "Cell references in pad_with dynamically supply the placeholder value (e.g. \"Pending Approval\").",
    hint: "Cell references dynamically supply the pad_with value.",
    level: "moderate",
    codeExample: "=EXPAND(A2:D6, 12, 4, K1)"
  },
  {
    question: "Can EXPAND be combined with VSTACK to normalize column counts before vertical stacking?",
    shortAnswer: "Yes, EXPAND standardizes narrower tables to match the widest table width before applying VSTACK.",
    explanation: "If Table 1 has 6 columns and Table 2 has 4 columns, writing =VSTACK(Table1, EXPAND(Table2, ROWS(Table2), 6, \"-\")) ensures clean stacking without column alignment errors.",
    hint: "Equalizes column widths before vertical stacking.",
    level: "advanced",
    codeExample: "=VSTACK(Table1, EXPAND(Table2, ROWS(Table2), 6, \"\"))"
  },
  {
    question: "What is the maximum dimensions EXPAND can resize an array to on a single worksheet?",
    shortAnswer: "1,048,576 rows by 16,384 columns (maximum worksheet boundaries).",
    explanation: "Target dimensions cannot exceed Excel's worksheet grid limits.",
    hint: "Constrained by worksheet boundaries: 1M rows by 16K columns.",
    level: "expert",
    codeExample: "Max: 1,048,576 rows x 16,384 columns"
  },
  {
    question: "How does LET optimize complex formulas that use EXPAND multiple times?",
    shortAnswer: "LET assigns the expanded matrix to a variable, preventing repetitive array resizing in memory.",
    explanation: "Writing =LET(p, EXPAND(Data, 20, 5, 0), HSTACK(p, CHOOSECOLS(p, 5)*1.1)) resizes the matrix once in RAM.",
    hint: "Cache the expanded matrix in a LET variable.",
    level: "advanced",
    codeExample: "=LET(p, EXPAND(A2:D8, 15, 5, 0), HSTACK(p, CHOOSECOLS(p, 5)*1.1))"
  },
  {
    question: "Why does EXPAND execute faster than legacy formulas using IF and ROW/COLUMN coordinates?",
    shortAnswer: "EXPAND allocates a contiguous memory buffer in C++ and copies source pointers in bulk with SIMD acceleration.",
    explanation: "Legacy approaches required complex cell-by-cell formulas like =IF(ROW()>10, \"-\", INDEX(...)). EXPAND runs in high-speed compiled C++.",
    hint: "Native C++ memory allocation vs individual cell IF statements.",
    level: "expert",
    codeExample: "C++ bulk memory padding"
  },
  {
    question: "How can EXPAND create a 10x10 matrix initialized completely with zeroes from a single 1x1 zero cell?",
    shortAnswer: "=EXPAND(0, 10, 10, 0)",
    explanation: "Passing a single cell containing 0 and expanding to 10 rows and 10 columns with pad_with=0 produces a 10x10 zero matrix.",
    hint: "Expand a single 0 value to 10x10.",
    level: "basic",
    codeExample: "=EXPAND(0, 10, 10, 0)"
  },
  {
    question: "How do you calculate the total number of padded cells added by EXPAND?",
    shortAnswer: "=(Target_Rows * Target_Cols) - (ROWS(Source) * COLUMNS(Source))",
    explanation: "Subtracting the original cell count from the expanded area gives the exact count of padded cells created.",
    hint: "Expanded area minus source area.",
    level: "moderate",
    codeExample: "Padded Cells = (R_new * C_new) - (R_old * C_old)"
  },
  {
    question: "Can EXPAND accept boolean TRUE/FALSE as the pad_with argument?",
    shortAnswer: "Yes, passing TRUE or FALSE fills new cells with the native boolean value.",
    explanation: "EXPAND supports all Excel data types in pad_with: text, numbers, booleans, and error constants.",
    hint: "Boolean values are supported as padding constants.",
    level: "basic",
    codeExample: "=EXPAND(A2:C5, 10, 3, FALSE)"
  },
  {
    question: "How can EXPAND be used to equalize tabular blocks before feeding into Python in Excel or Power BI?",
    shortAnswer: "By standardizing heterogeneous branch extracts to uniform matrix dimensions before data frame ingestion.",
    explanation: "Data science algorithms require uniform matrix dimensions. EXPAND guarantees uniform dimensional tensors.",
    hint: "Standardize heterogeneous dimensions for tensor ingestion.",
    level: "expert",
    codeExample: "=EXPAND(BranchMatrix, 50, 10, 0)"
  },
  {
    question: "What happens if the source array is already larger than the requested target rows?",
    shortAnswer: "Excel returns a #VALUE! error.",
    explanation: "EXPAND cannot reduce array size. To shrink, use TAKE or DROP.",
    hint: "Returns #VALUE! if target is smaller than source.",
    level: "basic",
    codeExample: "#VALUE!"
  },
  {
    question: "How can EXPAND pad an array with a formula like TODAY()?",
    shortAnswer: "=EXPAND(Data, 10, 4, TODAY())",
    explanation: "Passing TODAY() fills all new cells with today's serial date number.",
    hint: "Dynamic date functions can be passed as pad_with.",
    level: "moderate",
    codeExample: "=EXPAND(A2:C5, 10, 4, TODAY())"
  },
  {
    question: "How does EXPAND interact with conditional formatting in spilled destination ranges?",
    shortAnswer: "Conditional formatting rules applied to destination cells evaluate both original and padded values dynamically.",
    explanation: "For example, highlighting cells containing \"-\" or 0 visually identifies padded slots across the expanded grid.",
    hint: "Conditional formatting highlights padded values seamlessly.",
    level: "moderate",
    codeExample: "Format rule: Cell Value = \"-\""
  },
  {
    question: "Why should you avoid referencing unbounded columns (e.g. A:C) inside EXPAND?",
    shortAnswer: "Referencing A:C sets source rows to 1,048,576, meaning expanding to any smaller number will crash with #VALUE!.",
    explanation: "Because A:C has 1,048,576 rows, EXPAND(A:C, 100, 3) fails because 100 < 1,048,576.",
    hint: "A:C has 1M rows, so expanding to 100 causes #VALUE!.",
    level: "expert",
    codeExample: "Unbounded A:C causes #VALUE! in EXPAND"
  },
  {
    question: "How do you expand a 1D column vector to a 2D matrix using EXPAND?",
    shortAnswer: "=EXPAND(ColumnVector, ROWS(ColumnVector), TargetCols, PadValue)",
    explanation: "Setting target columns wider than 1 adds new padded columns to the right of the vertical column vector.",
    hint: "Specify columns > 1 on a vertical vector.",
    level: "moderate",
    codeExample: "=EXPAND(A2:A10, 10, 4, \"-\")"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for matrix standardization using EXPAND?",
    shortAnswer: "Always standardize heterogeneous matrices with EXPAND before applying HSTACK or feeding automated ETL pipelines.",
    explanation: "In enterprise financial modeling, disparate regional branch tables inevitably have unequal row and column dimensions. Standardizing them to uniform matrix dimensions with EXPAND ensures subsequent multi-table unions and mathematical matrix multiplications never break with #N/A errors.",
    hint: "Standardize matrix dimensions with EXPAND before horizontal stacking.",
    level: "expert",
    codeExample: "Matrix Normalization: =HSTACK(T1, EXPAND(T2, ROWS(T1), COLUMNS(T1), 0))"
  }
];

export default questions;
