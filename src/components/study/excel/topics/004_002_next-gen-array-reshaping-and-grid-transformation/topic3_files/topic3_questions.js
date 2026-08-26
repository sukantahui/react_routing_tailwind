// topic3_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 3
// Topic: Extracting Specific Rows from Complex Arrays with CHOOSEROWS (Positive and Negative Indexing)
// Module: 004_002_next-gen-array-reshaping-and-grid-transformation
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function of CHOOSEROWS in Excel 365?",
    shortAnswer: "It extracts specific rows from an array or range based on provided numeric row indexes.",
    explanation: "CHOOSEROWS allows modelers to extract any combination of horizontal row slices across all columns from a 2D matrix using positive or negative index positions.",
    hint: "Extracts rows by index numbers.",
    level: "basic",
    codeExample: "=CHOOSEROWS(A2:G50, 1, 3, 5)"
  },
  {
    question: "What is the syntax signature of the CHOOSEROWS function?",
    shortAnswer: "=CHOOSEROWS(array, row_num1, [row_num2], ...)",
    explanation: "The first argument 'array' is the source matrix. Subsequent arguments 'row_num1', 'row_num2', etc., are integers specifying the exact row positions to extract.",
    hint: "Array followed by one or more row numbers.",
    level: "basic",
    codeExample: "=CHOOSEROWS(Table1, 1, 4, 7)"
  },
  {
    question: "How does negative indexing work in CHOOSEROWS?",
    shortAnswer: "Negative numbers count backwards from the bottom of the array (-1 is the last row, -2 is the second last).",
    explanation: "Using negative row indices enables dynamic referencing from the end of the array without calculating total rows with ROWS() or COUNTA(). For instance, CHOOSEROWS(Table, -1) always returns the final record.",
    hint: "Index -1 always refers to the very last row.",
    level: "basic",
    codeExample: "=CHOOSEROWS(A2:E50, -1)"
  },
  {
    question: "How can you extract both the first row and the last row of a dynamic array in a single formula using CHOOSEROWS?",
    shortAnswer: "=CHOOSEROWS(array, 1, -1)",
    explanation: "Passing 1 extracts the top row (first record), and passing -1 extracts the bottom row (last record), producing a clean 2-row summary table.",
    hint: "Pass 1 and -1 together as index arguments.",
    level: "basic",
    codeExample: "=CHOOSEROWS(EmployeeMaster, 1, -1)"
  },
  {
    question: "Can CHOOSEROWS duplicate rows by listing the same row index multiple times?",
    shortAnswer: "Yes, CHOOSEROWS repeats rows in the output matrix as many times as their index is specified.",
    explanation: "If you specify =CHOOSEROWS(A2:D10, 1, 1, 2, 2, 3), the output will contain row 1 twice, row 2 twice, and row 3 once. This is useful for data oversampling and matrix expansion.",
    hint: "Repeated index numbers yield repeated output rows.",
    level: "moderate",
    codeExample: "=CHOOSEROWS(A2:D10, 1, 1, 2, 2)"
  },
  {
    question: "Can CHOOSEROWS accept an array of row numbers as a single argument (e.g. {1, 3, 5} or a SEQUENCE)?",
    shortAnswer: "Yes, CHOOSEROWS accepts array constants or dynamic vectors for the row_num argument.",
    explanation: "Instead of listing individual comma-separated arguments, you can pass an array vector such as {1, 3, 5} or =CHOOSEROWS(Data, SEQUENCE(5, 1, 1, 2)) to extract all odd-numbered rows.",
    hint: "You can pass an array constant or a SEQUENCE formula.",
    level: "moderate",
    codeExample: "=CHOOSEROWS(A2:D50, {1, 3, 5, 7})"
  },
  {
    question: "How can you extract all even-numbered rows from a dataset using CHOOSEROWS and SEQUENCE?",
    shortAnswer: "=CHOOSEROWS(Data, SEQUENCE(INT(ROWS(Data)/2), 1, 2, 2))",
    explanation: "SEQUENCE generates an arithmetic progression starting at 2 with step 2 (2, 4, 6, 8...). CHOOSEROWS consumes this vector and returns all even rows.",
    hint: "Generate even indices with SEQUENCE(count, 1, 2, 2).",
    level: "advanced",
    codeExample: "=CHOOSEROWS(A2:F50, SEQUENCE(INT(ROWS(A2:F50)/2), 1, 2, 2))"
  },
  {
    question: "What error occurs if you provide a row index that exceeds the total number of rows in the source array?",
    shortAnswer: "#VALUE! error.",
    explanation: "If a source matrix contains 10 rows and you request row 15 (or row -15), Excel returns a #VALUE! error because the requested index coordinate is out of bounds.",
    hint: "Out-of-bounds row coordinates return #VALUE!.",
    level: "basic",
    codeExample: "#VALUE!"
  },
  {
    question: "How does CHOOSEROWS differ from FILTER?",
    shortAnswer: "CHOOSEROWS extracts rows based purely on positional integer indexes; FILTER extracts rows conditionally based on boolean logical criteria.",
    explanation: "CHOOSEROWS is positional (e.g. rows 1, 5, 10), whereas FILTER is content-driven (e.g. Department=\"Software Dev\").",
    hint: "Positional indexing vs logical boolean evaluation.",
    level: "moderate",
    codeExample: "=CHOOSEROWS(A2:D50, 1, 2) vs =FILTER(A2:D50, B2:B50>50000)"
  },
  {
    question: "How does CHOOSEROWS differ from TAKE?",
    shortAnswer: "TAKE extracts a contiguous block of N consecutive rows from array boundaries; CHOOSEROWS can extract non-contiguous, arbitrary, or duplicated rows.",
    explanation: "TAKE(Data, 3) only extracts the first 3 consecutive rows (1, 2, 3). CHOOSEROWS(Data, 1, 5, 9) extracts non-adjacent rows across any part of the matrix.",
    hint: "TAKE is contiguous; CHOOSEROWS allows non-contiguous selection.",
    level: "moderate",
    codeExample: "=TAKE(Data, 3) vs =CHOOSEROWS(Data, 1, 5, 9)"
  },
  {
    question: "How can you reverse the entire row order of a 2D table using CHOOSEROWS?",
    shortAnswer: "=CHOOSEROWS(Data, SEQUENCE(ROWS(Data), 1, ROWS(Data), -1))",
    explanation: "SEQUENCE(ROWS(Data), 1, ROWS(Data), -1) generates a countdown vector from N down to 1. Passing this into CHOOSEROWS flips the entire table vertically.",
    hint: "Pass a countdown sequence into CHOOSEROWS.",
    level: "advanced",
    codeExample: "=LET(d, A2:E30, CHOOSEROWS(d, SEQUENCE(ROWS(d), 1, ROWS(d), -1)))"
  },
  {
    question: "Can CHOOSEROWS extract rows from a spilled array reference (e.g. G2#)?",
    shortAnswer: "Yes, CHOOSEROWS natively accepts dynamic spilled array anchors as its input.",
    explanation: "If an upstream formula in cell G2 returns a dynamic spilled table, you can slice specific rows using =CHOOSEROWS(G2#, 1, 3, -1) without re-evaluating the parent calculation.",
    hint: "Use G2# as the array argument.",
    level: "basic",
    codeExample: "=CHOOSEROWS(G2#, 1, 3, -1)"
  },
  {
    question: "How do you extract the top 3 and bottom 3 rows simultaneously using CHOOSEROWS?",
    shortAnswer: "=CHOOSEROWS(Data, 1, 2, 3, -3, -2, -1)",
    explanation: "By combining positive indices (1, 2, 3) for the top 3 rows and negative indices (-3, -2, -1) for the bottom 3 rows, CHOOSEROWS outputs a unified 6-row summary.",
    hint: "Pass 1, 2, 3, -3, -2, -1 in a single call.",
    level: "moderate",
    codeExample: "=CHOOSEROWS(EmployeeTable, 1, 2, 3, -3, -2, -1)"
  },
  {
    question: "What happens if a zero (0) is passed as a row index to CHOOSEROWS?",
    shortAnswer: "#VALUE! error.",
    explanation: "Excel row indexing is 1-based (positive) and -1-based (negative). A row index of 0 does not exist and triggers a #VALUE! error.",
    hint: "Row indexes start at 1 or -1; 0 is invalid.",
    level: "basic",
    codeExample: "#VALUE!"
  },
  {
    question: "How can you extract the median row from a sorted 2D dataset using CHOOSEROWS?",
    shortAnswer: "=CHOOSEROWS(SortedData, ROUNDUP(ROWS(SortedData)/2, 0))",
    explanation: "ROWS(SortedData) calculates total height, and ROUNDUP(height/2, 0) identifies the exact midpoint row index for CHOOSEROWS to extract.",
    hint: "Calculate midpoint index using ROUNDUP(ROWS/2, 0).",
    level: "advanced",
    codeExample: "=CHOOSEROWS(SortedData, ROUNDUP(ROWS(SortedData)/2, 0))"
  },
  {
    question: "How can CHOOSEROWS and CHOOSECOLS be combined in a single formula to extract a specific sub-matrix?",
    shortAnswer: "=CHOOSECOLS(CHOOSEROWS(Data, 1, 3, 5), 1, 2, 4)",
    explanation: "CHOOSEROWS extracts horizontal rows 1, 3, and 5; CHOOSECOLS then extracts vertical columns 1, 2, and 4 from that subset, yielding an exact custom sub-grid.",
    hint: "Nest CHOOSEROWS inside CHOOSECOLS or vice versa.",
    level: "advanced",
    codeExample: "=CHOOSECOLS(CHOOSEROWS(MasterData, 1, 3, 5), 1, 2, 4)"
  },
  {
    question: "What error occurs if the cells where CHOOSEROWS needs to spill are blocked by static data?",
    shortAnswer: "#SPILL! error.",
    explanation: "As with all dynamic array functions, if any cell in the output bounding box is occupied, Excel halts and returns #SPILL!.",
    hint: "Destination cell collision error.",
    level: "basic",
    codeExample: "#SPILL!"
  },
  {
    question: "Can CHOOSEROWS be nested inside aggregation functions like SUM or AVERAGE?",
    shortAnswer: "Yes, CHOOSEROWS operates in memory, allowing its output to be aggregated directly without a worksheet spill.",
    explanation: "You can write =SUM(CHOOSEROWS(SalaryColumn, 1, 3, 5)) to sum specific selected rows directly in RAM.",
    hint: "Aggregates directly in memory.",
    level: "basic",
    codeExample: "=SUM(CHOOSEROWS(RevenueTable, 1, 5, 10))"
  },
  {
    question: "How can you shuffle or randomize the row order of a 2D table using CHOOSEROWS and SORTBY?",
    shortAnswer: "=CHOOSEROWS(Data, SORTBY(SEQUENCE(ROWS(Data)), RANDARRAY(ROWS(Data))))",
    explanation: "RANDARRAY generates random numbers, SORTBY permutes the SEQUENCE index vector randomly, and CHOOSEROWS reorders the dataset according to that shuffled index.",
    hint: "Permute row indices using SORTBY and RANDARRAY.",
    level: "expert",
    codeExample: "=LET(n, ROWS(Data), CHOOSEROWS(Data, SORTBY(SEQUENCE(n), RANDARRAY(n))))"
  },
  {
    question: "Why does CHOOSEROWS execute significantly faster than traditional INDEX with array parameters?",
    shortAnswer: "CHOOSEROWS is optimized in C++ to copy entire memory row spans in bulk without evaluating cell-by-cell row/col coordinate intersections.",
    explanation: "Legacy =INDEX(Range, {1;3;5}, 0) evaluates an intersection calculation for every column in each row. CHOOSEROWS performs direct contiguous memory block slices.",
    hint: "Bulk memory block copying vs cell coordinate intersections.",
    level: "expert",
    codeExample: "C++ bulk row-slice optimization"
  },
  {
    question: "In financial modeling, how can CHOOSEROWS be used to extract the Base Case, Best Case, and Worst Case scenarios from a multi-scenario financial model?",
    shortAnswer: "By passing the scenario row index numbers (e.g. rows 2, 5, 8) into =CHOOSEROWS(ScenarioModel, 2, 5, 8).",
    explanation: "When financial models structure 10+ simulation cases in a master table, CHOOSEROWS extracts the exact executive scenario rows for presentation side-by-side.",
    hint: "Extract specific scenario index rows for executive reporting.",
    level: "moderate",
    codeExample: "=CHOOSEROWS(ScenarioLedger, 2, 5, 8)"
  },
  {
    question: "What happens if you pass text strings like \"1\" or \"first\" into CHOOSEROWS's row_num argument?",
    shortAnswer: "Numeric text strings like \"1\" are coerced to integer 1; non-numeric text like \"first\" returns a #VALUE! error.",
    explanation: "Excel coerces numeric text strings automatically, but invalid non-numeric strings cause immediate #VALUE! errors.",
    hint: "Non-numeric strings return #VALUE!.",
    level: "moderate",
    codeExample: "#VALUE!"
  },
  {
    question: "How can you extract the top 5 highest salaried employees using CHOOSEROWS after sorting?",
    shortAnswer: "=CHOOSEROWS(SORT(EmployeeTable, 7, -1), 1, 2, 3, 4, 5)",
    explanation: "SORT orders the table by column 7 (salary) descending. CHOOSEROWS extracts rows 1 through 5 from the sorted result (equivalent to TAKE(..., 5)).",
    hint: "Combine SORT with row indices 1, 2, 3, 4, 5.",
    level: "moderate",
    codeExample: "=CHOOSEROWS(SORT(EmployeeTable, 7, -1), SEQUENCE(5))"
  },
  {
    question: "How does CHOOSEROWS handle date and currency columns in the source array?",
    shortAnswer: "It passes the exact underlying serial values and formats faithfully to the destination cells.",
    explanation: "CHOOSEROWS preserves numeric precision, date serials, text encoding, and boolean flags without altering data types.",
    hint: "Underlying data types and serials are preserved.",
    level: "basic",
    codeExample: "=CHOOSEROWS(PayrollRegister, 1, -1)"
  },
  {
    question: "How do you extract every 3rd row from a dataset using CHOOSEROWS?",
    shortAnswer: "=CHOOSEROWS(Data, SEQUENCE(INT(ROWS(Data)/3), 1, 3, 3))",
    explanation: "SEQUENCE generates step-3 indices (3, 6, 9, 12...). CHOOSEROWS extracts those exact rows across the entire dataset.",
    hint: "Generate a step-3 sequence with SEQUENCE(INT(ROWS/3), 1, 3, 3).",
    level: "advanced",
    codeExample: "=CHOOSEROWS(Data, SEQUENCE(INT(ROWS(Data)/3), 1, 3, 3))"
  },
  {
    question: "Can CHOOSEROWS be combined with MATCH to extract rows matching specific employee IDs?",
    shortAnswer: "=CHOOSEROWS(EmployeeTable, XMATCH(TargetIDs, EmployeeTable[Emp_ID]))",
    explanation: "XMATCH returns the relative row positions of target IDs within the key column. CHOOSEROWS takes those indices and returns the full multi-column records in one step.",
    hint: "Use XMATCH to convert lookup keys into row indices for CHOOSEROWS.",
    level: "expert",
    codeExample: "=CHOOSEROWS(MasterTable, XMATCH({\"EMP-101\",\"EMP-105\"}, Table1[Emp_ID]))"
  },
  {
    question: "Why should you avoid wrapping entire columns (e.g. A:G) inside CHOOSEROWS?",
    shortAnswer: "Passing whole column ranges forces Excel to track 1,048,576 rows, causing unnecessary calculation overhead.",
    explanation: "Always constrain ranges to active data boundaries (e.g. A2:G500) or use structured Tables so Excel only allocates necessary memory.",
    hint: "Use bounded ranges or structured tables.",
    level: "expert",
    codeExample: "Use Table1 instead of A:G"
  },
  {
    question: "How do you extract the 2nd, 4th, and last row of an employee ledger using CHOOSEROWS?",
    shortAnswer: "=CHOOSEROWS(EmployeeTable, 2, 4, -1)",
    explanation: "Positive numbers 2 and 4 extract rows 2 and 4 from the top; negative number -1 extracts the final row from the bottom.",
    hint: "Combine positive and negative indices: 2, 4, -1.",
    level: "basic",
    codeExample: "=CHOOSEROWS(A2:G100, 2, 4, -1)"
  },
  {
    question: "What is the advantage of using CHOOSEROWS over multiple individual VLOOKUP formulas when extracting multi-row profiles?",
    shortAnswer: "A single CHOOSEROWS formula extracts all fields across all selected rows simultaneously without repetitive formula dragging.",
    explanation: "Traditional VLOOKUP requires writing separate formulas for every cell and column in the destination grid. CHOOSEROWS spills the entire multi-column subset in one calculation.",
    hint: "Single formula spills all rows and columns dynamically.",
    level: "moderate",
    codeExample: "=CHOOSEROWS(MasterData, 1, 5, 10)"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for dynamic row sampling with CHOOSEROWS?",
    shortAnswer: "Leverage negative indexing (-1, -2) for tail audits and combine with XMATCH for ultra-fast multi-key relational joins.",
    explanation: "In corporate audit pipelines, the first record (baseline) and last record (latest transaction) are the most critical audit anchors. Writing =CHOOSEROWS(Ledger, 1, -1) creates an indestructible audit summary that never breaks when new transaction rows are appended.",
    hint: "Use 1 and -1 for indestructible header-and-footer audit summaries.",
    level: "expert",
    codeExample: "Audit Summary: =CHOOSEROWS(AuditLedger, 1, -1)"
  }
];

export default questions;
