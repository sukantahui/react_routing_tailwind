// topic11_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 11
// Topic: Matrix Transposition and Multi-Block Dataset Alignment Using Array Functions
// Module: 004_002_next-gen-array-reshaping-and-grid-transformation
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function of TRANSPOSE in dynamic array Excel?",
    shortAnswer: "It swaps the vertical and horizontal orientation of an array, converting rows into columns and columns into rows in memory.",
    explanation: "TRANSPOSE transforms an (M x N) matrix into an (N x M) matrix dynamically, spilling the transposed matrix automatically without requiring Ctrl+Shift+Enter.",
    hint: "Swaps rows and columns.",
    level: "basic",
    codeExample: "=TRANSPOSE(A2:E6)"
  },
  {
    question: "How does TRANSPOSE enable multi-block dataset alignment when comparing regional P&L schedules?",
    shortAnswer: "By flipping horizontally structured quarterly statements into standardized vertical columns so they can be stacked or joined with other business units.",
    explanation: "If Branch A exports quarters across columns (Q1, Q2, Q3, Q4) and Branch B exports quarters down rows, applying TRANSPOSE to Branch A standardizes both into identical schemas.",
    hint: "Harmonizes mismatched row/column orientations across entities.",
    level: "moderate",
    codeExample: "=TRANSPOSE(HorizontalBranchReport)"
  },
  {
    question: "How can you unpivot a 2D cross-tab matrix (e.g. Products x Months) into a 3-column normalized tabular database [Product, Month, Sales]?",
    shortAnswer: "By combining TOCOL, WRAPROWS, and dynamic array indexing in a single LET formula.",
    explanation: "Using =LET(p, ProductCol, m, MonthRow, data, Matrix, HSTACK(TOCOL(IF(data<>\"\", p)), TOCOL(IF(data<>\"\", m)), TOCOL(data))) unpivots any 2D cross-tab into a clean 3-column flat table.",
    hint: "Unpivot cross-tab matrix into flat normalized records using TOCOL and IF.",
    level: "expert",
    codeExample: "=LET(p, A2:A6, m, B1:E1, v, B2:E6, HSTACK(TOCOL(IF(v<>\"\", p)), TOCOL(IF(v<>\"\", m)), TOCOL(v)))"
  },
  {
    question: "What is the difference between legacy TRANSPOSE and dynamic array TRANSPOSE in Excel 365?",
    shortAnswer: "Dynamic array TRANSPOSE requires entering into only 1 cell and auto-spills; legacy TRANSPOSE required pre-selecting the exact target range and pressing CSE.",
    explanation: "In modern Excel 365, writing =TRANSPOSE(A1:D5) in 1 cell automatically sizes and spills the resulting 5x4 matrix into RAM.",
    hint: "Single-cell dynamic spill vs pre-selected CSE array formula.",
    level: "basic",
    codeExample: "=TRANSPOSE(A1:D5)"
  },
  {
    question: "What error occurs if the spilled output range of TRANSPOSE collides with existing data?",
    shortAnswer: "#SPILL! error.",
    explanation: "Any non-empty cell in the transposed bounding box blocks execution and triggers #SPILL!.",
    hint: "Destination collision error.",
    level: "basic",
    codeExample: "#SPILL!"
  },
  {
    question: "How can TRANSPOSE and CHOOSEROWS be combined to create a dynamic vertical KPI scorecard from a horizontal financial model?",
    shortAnswer: "=TRANSPOSE(CHOOSEROWS(HorizontalModel, 1, 5, 12, 18))",
    explanation: "CHOOSEROWS extracts key horizontal metric rows [Revenue, EBITDA, Net Profit, Free Cash Flow], and TRANSPOSE flips them into clean vertical scorecard columns.",
    hint: "Extract key rows, then transpose into vertical KPI columns.",
    level: "advanced",
    codeExample: "=TRANSPOSE(CHOOSEROWS(A1:Z50, 1, 5, 12, 18))"
  },
  {
    question: "How does TRANSPOSE handle data types, formulas, and date serial numbers?",
    shortAnswer: "All underlying data types and serial values are transferred faithfully to their new transposed coordinate slots.",
    explanation: "TRANSPOSE changes only coordinate indices (i, j &rarr; j, i) without altering data values or precision.",
    hint: "Underlying data types and values are preserved.",
    level: "basic",
    codeExample: "=TRANSPOSE(FinancialGrid)"
  },
  {
    question: "Can TRANSPOSE accept dynamic spilled array references like G2#?",
    shortAnswer: "Yes, TRANSPOSE accepts any dynamic spilled array anchor and flips its dimensions.",
    explanation: "Writing =TRANSPOSE(FILTER(A2:D20, A2:A20=\"Q1\")) filters rows and flips the result into columns.",
    hint: "Use G2# as the input argument.",
    level: "basic",
    codeExample: "=TRANSPOSE(G2#)"
  },
  {
    question: "How can TRANSPOSE be paired with MMULT to perform linear algebraic matrix dot products in financial portfolio optimization?",
    shortAnswer: "=MMULT(TRANSPOSE(WeightVector), MMULT(CovarianceMatrix, WeightVector))",
    explanation: "In modern portfolio theory, calculating portfolio variance requires multiplying the transposed asset weight vector by the covariance matrix and the weight vector.",
    hint: "Transposes weight vector for matrix multiplication.",
    level: "expert",
    codeExample: "=MMULT(TRANSPOSE(Weights), MMULT(CovMatrix, Weights))"
  },
  {
    question: "How does TRANSPOSE interact with HSTACK and VSTACK when constructing dual-axis corporate reports?",
    shortAnswer: "TRANSPOSE can flip vertical calculation columns into horizontal summary headers before applying VSTACK.",
    explanation: "Writing =VSTACK(TRANSPOSE(MetricLabels), ConsolidatedData) builds complete multi-column tables dynamically.",
    hint: "Flip vertical labels into horizontal header rows.",
    level: "moderate",
    codeExample: "=VSTACK(TRANSPOSE(A2:A6), DataRows)"
  },
  {
    question: "What is the output shape of =TRANSPOSE(Array) if Array has dimensions 12 rows by 4 columns?",
    shortAnswer: "4 rows by 12 columns.",
    explanation: "TRANSPOSE swaps row height and column width: (12 x 4) &rarr; (4 x 12).",
    hint: "Swaps dimensions: (R x C) &rarr; (C x R).",
    level: "basic",
    codeExample: "(12 x 4) &rarr; (4 x 12)"
  },
  {
    question: "How can you align two datasets where one has fields arranged vertically and the other horizontally?",
    shortAnswer: "Transpose one dataset so both share the same orientation, then merge with VSTACK or HSTACK.",
    explanation: "Standardizing orientation via TRANSPOSE allows disparate multi-block tables to be unified cleanly.",
    hint: "Transpose one entity to align orientations before union.",
    level: "moderate",
    codeExample: "=VSTACK(Table1, TRANSPOSE(Table2_Horizontal))"
  },
  {
    question: "Why does nesting TRANSPOSE twice (=TRANSPOSE(TRANSPOSE(Data))) return the original array?",
    shortAnswer: "Because transposing an already-transposed matrix restores original row and column coordinates: ((M x N)^T)^T = M x N.",
    explanation: "Two successive matrix transpositions cancel each other out in linear algebra.",
    hint: "Double transposition returns the original matrix.",
    level: "basic",
    codeExample: "=TRANSPOSE(TRANSPOSE(A1:D5))"
  },
  {
    question: "How can TRANSPOSE and TEXTSPLIT be combined to unroll a comma-delimited list into a clean vertical column?",
    shortAnswer: "=TRANSPOSE(TEXTSPLIT(A1, \",\"))",
    explanation: "TEXTSPLIT splits text across horizontal columns by default; wrapping in TRANSPOSE spills the tokens vertically down rows.",
    hint: "Transpose horizontal TEXTSPLIT tokens into a vertical column.",
    level: "moderate",
    codeExample: "=TRANSPOSE(TEXTSPLIT(A1, \",\"))"
  },
  {
    question: "How does LET optimize multi-block matrix alignment formulas?",
    shortAnswer: "LET computes the transposed or aligned matrix once in RAM, allowing multiple downstream column filters without redundant calculations.",
    explanation: "Writing =LET(t, TRANSPOSE(RawMatrix), HSTACK(t, CHOOSECOLS(t, 2)*1.1)) resizes and aligns once in memory.",
    hint: "Cache the aligned matrix in a LET variable.",
    level: "advanced",
    codeExample: "=LET(t, TRANSPOSE(A2:F10), HSTACK(t, CHOOSECOLS(t, 2)*1.1))"
  },
  {
    question: "Can TRANSPOSE handle 1D vertical vectors (e.g. A1:A10)?",
    shortAnswer: "Yes, TRANSPOSE transforms a (10 x 1) vertical column into a (1 x 10) horizontal row vector.",
    explanation: "TRANSPOSE works seamlessly on 1D vectors in either direction.",
    hint: "Flips 1D vertical vectors into horizontal rows.",
    level: "basic",
    codeExample: "=TRANSPOSE(A1:A10)"
  },
  {
    question: "How can TRANSPOSE be paired with SORT to sort a horizontal dataset across columns?",
    shortAnswer: "=TRANSPOSE(SORT(TRANSPOSE(HorizontalData), 1, 1))",
    explanation: "Since SORT operates row-wise by default, transposing to vertical, sorting, and transposing back sorts horizontal columns effectively.",
    hint: "Transpose, sort vertically, and transpose back.",
    level: "advanced",
    codeExample: "=TRANSPOSE(SORT(TRANSPOSE(A1:Z2), 1, 1))"
  },
  {
    question: "Why should you avoid using TRANSPOSE on whole column ranges like A:A?",
    shortAnswer: "Transposing 1,048,576 rows across columns crashes because Excel only supports 16,384 columns per worksheet.",
    explanation: "An Excel worksheet has a hard limit of 16,384 columns (Column XFD). Attempting to transpose 1,048,576 rows into columns causes a fatal #NUM! or #REF! crash.",
    hint: "1M rows cannot fit into 16,384 available columns.",
    level: "expert",
    codeExample: "Transposing A:A exceeds 16,384 column limit"
  },
  {
    question: "How can EXPAND and TRANSPOSE be combined to pad and rotate a quarterly budget matrix?",
    shortAnswer: "=TRANSPOSE(EXPAND(QuarterlyGrid, 6, 8, 0))",
    explanation: "EXPAND standardizes the 2D grid dimensions with zero padding, and TRANSPOSE rotates the normalized budget matrix 90 degrees.",
    hint: "Pad with EXPAND, then rotate with TRANSPOSE.",
    level: "advanced",
    codeExample: "=TRANSPOSE(EXPAND(A2:D5, 6, 8, 0))"
  },
  {
    question: "How does TRANSPOSE differ from TOROW when applied to a 2D matrix?",
    shortAnswer: "TRANSPOSE maintains a 2D matrix (swapping axes); TOROW flattens the entire 2D matrix into a single 1D row vector.",
    explanation: "TRANSPOSE(3x4) yields a 4x3 matrix. TOROW(3x4) unrolls all 12 items into a 1x12 row vector.",
    hint: "Matrix axis swapping vs complete 1D vector flattening.",
    level: "moderate",
    codeExample: "=TRANSPOSE(3x4) &rarr; 4x3 vs =TOROW(3x4) &rarr; 1x12"
  },
  {
    question: "How can you rotate a table 90 degrees clockwise using TRANSPOSE and CHOOSEROWS?",
    shortAnswer: "=TRANSPOSE(CHOOSEROWS(Matrix, SEQUENCE(ROWS(Matrix), , ROWS(Matrix), -1)))",
    explanation: "Reversing the rows with CHOOSEROWS and then applying TRANSPOSE rotates the matrix 90 degrees clockwise.",
    hint: "Reverse rows with CHOOSEROWS, then transpose.",
    level: "expert",
    codeExample: "=TRANSPOSE(CHOOSEROWS(A1:D4, SEQUENCE(4, , 4, -1)))"
  },
  {
    question: "Can TRANSPOSE accept an inline array constant like {1, 2, 3; 4, 5, 6}?",
    shortAnswer: "Yes, TRANSPOSE converts a 2-row x 3-column array constant into a 3-row x 2-column array in memory.",
    explanation: "Writing =TRANSPOSE({1,2,3;4,5,6}) returns {1,4; 2,5; 3,6}.",
    hint: "Inline array constants transpose seamlessly.",
    level: "basic",
    codeExample: "=TRANSPOSE({1,2,3;4,5,6})"
  },
  {
    question: "How can you dynamically transpose only the top N rows of a dataset?",
    shortAnswer: "=TRANSPOSE(TAKE(Data, N))",
    explanation: "TAKE slices the top N rows, and TRANSPOSE flips them into N columns.",
    hint: "Slice top N rows with TAKE, then transpose.",
    level: "moderate",
    codeExample: "=TRANSPOSE(TAKE(A1:F50, 5))"
  },
  {
    question: "How does TRANSPOSE handle blank/empty cells in the source array?",
    shortAnswer: "Empty cells are converted to numeric 0 unless handled with IF or custom text formatting.",
    explanation: "Excel treats blank dynamic array elements as zeroes by default. Use =IF(A1:D5=\"\", \"\", TRANSPOSE(A1:D5)) to retain true blanks.",
    hint: "Empty cells become 0 unless masked with IF.",
    level: "moderate",
    codeExample: "=IF(TRANSPOSE(A1:D5)=\"\", \"\", TRANSPOSE(A1:D5))"
  },
  {
    question: "Why is TRANSPOSE essential when building financial sensitivity tables with data tables?",
    shortAnswer: "It allows analysts to re-orient horizontal scenario variables to match the vertical input requirement of multi-variable sensitivity models.",
    explanation: "Sensitivity models require specific axis orientations. TRANSPOSE ensures variables align perfectly with calculation engines.",
    hint: "Aligns scenario variables for sensitivity analysis.",
    level: "advanced",
    codeExample: "=TRANSPOSE(ScenarioRates)"
  },
  {
    question: "How can you extract the column headers of a table as a vertical list?",
    shortAnswer: "=TRANSPOSE(TAKE(Table1[#Headers], 1))",
    explanation: "TAKE extracts the horizontal header row, and TRANSPOSE spills the column names vertically down rows.",
    hint: "Extract header row and transpose vertically.",
    level: "basic",
    codeExample: "=TRANSPOSE(A1:G1)"
  },
  {
    question: "How does TRANSPOSE interact with conditional formatting in spilled destination ranges?",
    shortAnswer: "Conditional formatting rules applied to destination cells evaluate the transposed values dynamically.",
    explanation: "Formatting rules apply seamlessly across the dynamic spilled footprint.",
    hint: "Dynamic formatting applies across transposed cells.",
    level: "basic",
    codeExample: "Format rule: Cell Value > 10000"
  },
  {
    question: "Why does TRANSPOSE calculate significantly faster than legacy copy-paste transpose?",
    shortAnswer: "TRANSPOSE is a live, vectorized in-memory pointer swap compiled in C++ that updates instantly when source values change.",
    explanation: "Copy-paste transpose is static and breaks when source numbers change. TRANSPOSE is dynamic and recalculates in sub-milliseconds.",
    hint: "Dynamic live memory calculation vs static manual paste.",
    level: "expert",
    codeExample: "Dynamic C++ pointer matrix transposition"
  },
  {
    question: "How can you align 3 branch budgets where Branch 1 is 4 quarters x 5 items, Branch 2 is 5 items x 4 quarters, and Branch 3 is 4 quarters x 5 items?",
    shortAnswer: "=VSTACK(Branch1, TRANSPOSE(Branch2), Branch3)",
    explanation: "Transposing Branch 2 aligns its orientation with Branch 1 and Branch 3, allowing all 3 to be stacked cleanly with VSTACK.",
    hint: "Transpose Branch 2 to match Branch 1 and 3 before stacking.",
    level: "advanced",
    codeExample: "=VSTACK(Branch1, TRANSPOSE(Branch2), Branch3)"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for multi-block dataset alignment using TRANSPOSE?",
    shortAnswer: "Never accept mismatched matrix orientations across multi-branch reports—always use TRANSPOSE to establish a uniform schema before consolidating.",
    explanation: "In enterprise financial reporting, different branch managers inevitably format budgets in different directions (some horizontal, some vertical). Using =TRANSPOSE() to standardize all matrices to a single consistent orientation guarantees that downstream VSTACK, HSTACK, and financial dashboards calculate with 100% mathematical accuracy!",
    hint: "Harmonize orientations with TRANSPOSE before consolidating.",
    level: "expert",
    codeExample: "Multi-Block Alignment: =VSTACK(BK_Standard, DROP(TRANSPOSE(SH_Horizontal), 1))"
  }
];

export default questions;
