// topic0_questions.js - 30 Structured Questions for Topic 0: Overview of Excel 365 Array Manipulation and Reshaping Functions
// Module: 004_002_next-gen-array-reshaping-and-grid-transformation
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What primary architectural problem do Excel 365's array reshaping functions solve compared to legacy spreadsheet approaches?",
    shortAnswer: "They eliminate complex multi-cell INDEX/OFFSET formulas, volatile helper grids, and manual copy-paste unpivoting with native in-memory matrix transformations.",
    explanation: "Prior to Excel 365, reshaping a 2D matrix into a 1D column, extracting custom slices, or stacking multiple tables required convoluted combinations of INDEX, OFFSET, ROW, COLUMN, INDIRECT, or VBA macros. Excel 365's array manipulation functions (TOCOL, TOROW, CHOOSEROWS, CHOOSECOLS, TAKE, DROP, EXPAND, WRAPROWS, WRAPCOLS, VSTACK, HSTACK) process dynamic arrays entirely in RAM and spill the transformed results instantly without altering source data.",
    hint: "Think about how you used to unpivot cross-tab tables before TOCOL was introduced.",
    level: "moderate",
    codeExample: "=TOCOL(B2:F20, 1)"
  },
  {
    question: "Which function converts a 2D rectangular dataset into a single vertical column vector?",
    shortAnswer: "TOCOL (To Column).",
    explanation: "TOCOL takes a multi-row, multi-column array or range and flattens all constituent elements into a single vertical 1D spilled column. It accepts optional arguments to ignore empty cells or error values and to scan by column instead of row.",
    hint: "The name literally means 'To Column'.",
    level: "basic",
    codeExample: "=TOCOL(A2:D10)"
  },
  {
    question: "Which function converts a 2D rectangular dataset into a single horizontal row vector?",
    shortAnswer: "TOROW (To Row).",
    explanation: "TOROW is the horizontal counterpart to TOCOL. It takes a 2D range or spilled array and flattens it horizontally into a single 1D row vector spanning across columns.",
    hint: "The sister function to TOCOL.",
    level: "basic",
    codeExample: "=TOROW(A2:D10)"
  },
  {
    question: "What is the primary difference between CHOOSEROWS and CHOOSECOLS?",
    shortAnswer: "CHOOSEROWS extracts specific rows by vertical index; CHOOSECOLS extracts and reorders specific columns by horizontal index.",
    explanation: "CHOOSEROWS extracts horizontal slices across all columns based on provided numeric row indexes (e.g., rows 1, 3, 5). CHOOSECOLS extracts vertical column slices across all rows based on column numbers and allows instantaneous reordering (e.g., column 3, then 1, then 2).",
    hint: "One slices horizontally; the other slices vertically.",
    level: "basic",
    codeExample: "=CHOOSECOLS(A2:E50, 1, 3, 5)"
  },
  {
    question: "How does TAKE differ from DROP in array manipulation?",
    shortAnswer: "TAKE extracts a specified subset of rows/columns from array boundaries, while DROP removes/excludes a specified subset and returns the remainder.",
    explanation: "TAKE returns a sub-array containing the first or last N rows and columns. In contrast, DROP discards the specified number of rows/columns from the start or end and returns everything that is left over.",
    hint: "TAKE keeps what you ask for; DROP discards what you specify.",
    level: "moderate",
    codeExample: "=TAKE(A2:D50, 5) vs =DROP(A2:D50, 1)"
  },
  {
    question: "What happens when you pass a negative number to the rows argument of TAKE or DROP?",
    shortAnswer: "Negative numbers count backwards from the bottom/end of the array.",
    explanation: "In both TAKE and DROP, a positive row number operates from the top (beginning) downwards, whereas a negative row number operates from the bottom (end) upwards. For example, TAKE(A2:D50, -5) extracts the bottom 5 rows, while DROP(A2:D50, -1) removes the final summary row.",
    hint: "Negative indexing counts from the tail of the dataset.",
    level: "moderate",
    codeExample: "=TAKE(A2:D50, -5)"
  },
  {
    question: "What is the role of the EXPAND function in dynamic array workflows?",
    shortAnswer: "EXPAND enlarges an array to specified row and column dimensions, filling new cells with a default or custom padding value.",
    explanation: "When combining or aligning datasets of disparate shapes (for example, before using HSTACK or VSTACK), EXPAND allows you to standardize the matrix dimensions to an explicit height and width, replacing missing coordinate slots with a specified padding value such as \"\" or 0.",
    hint: "Used to pad arrays so their dimensional shapes match.",
    level: "advanced",
    codeExample: "=EXPAND(A2:C10, 15, 5, \"N/A\")"
  },
  {
    question: "How do WRAPROWS and WRAPCOLS transform continuous 1D data streams?",
    shortAnswer: "WRAPROWS wraps a 1D vector into a 2D table row-by-row; WRAPCOLS wraps it column-by-column up to a specified count.",
    explanation: "WRAPROWS takes a linear array of values and breaks it into rows containing N elements each, effectively reconstructing a table from a flat stream. WRAPCOLS fills each column vertically up to N elements before wrapping into the adjacent column.",
    hint: "Think about turning a raw sequence of 20 items into a 4x5 grid.",
    level: "moderate",
    codeExample: "=WRAPROWS(A2:A21, 3, \"\")"
  },
  {
    question: "What is the distinct capability of VSTACK?",
    shortAnswer: "VSTACK appends multiple ranges or arrays vertically on top of one another into a single continuous unified array.",
    explanation: "VSTACK (Vertical Stack) takes two or more arrays and stacks them sequentially from top to bottom. If the arrays have different column counts, shorter arrays are padded with #N/A unless normalized.",
    hint: "Like SQL UNION ALL or stacking cards vertically.",
    level: "basic",
    codeExample: "=VSTACK(BranchA_Table, BranchB_Table, BranchC_Table)"
  },
  {
    question: "What is the distinct capability of HSTACK?",
    shortAnswer: "HSTACK joins multiple ranges or arrays horizontally side-by-side into a single wide composite matrix.",
    explanation: "HSTACK (Horizontal Stack) places arrays adjacent to one another along the horizontal axis. It is commonly used to construct custom reports by joining unrelated calculation vectors (e.g., joining an Employee Name column with a calculated Bonus column).",
    hint: "Joins arrays side-by-side across columns.",
    level: "basic",
    codeExample: "=HSTACK(A2:A20, D2:D20*1.1)"
  },
  {
    question: "How do reshaping functions interact with Excel's Spilled Range Operator (#)?",
    shortAnswer: "Reshaping functions seamlessly consume spilled arrays using the origin cell reference followed by the hash symbol (#).",
    explanation: "Because all reshaping functions accept array inputs, they can dynamically reference previous spilled calculation outputs. For instance, if =SORT(FILTER(...)) spills into G2, you can immediately write =CHOOSEROWS(G2#, 1, 3, 5) to slice the dynamic result without re-evaluating the underlying formula.",
    hint: "Use G2# instead of fixed ranges like G2:G50.",
    level: "moderate",
    codeExample: "=CHOOSEROWS(A2#, 1, 2, 3)"
  },
  {
    question: "Can array reshaping functions be nested inside mathematical or lookup aggregations like SUM, AVERAGE, or XLOOKUP?",
    shortAnswer: "Yes, reshaping functions return standard in-memory arrays that can be passed directly as arguments to any aggregation or lookup function.",
    explanation: "Reshaped arrays do not require an intermediate worksheet spill to be used. You can directly write =SUM(TAKE(SORT(SalesTable, 2, -1), 5, -1)) to calculate the total sales of the top 5 transactions entirely in RAM.",
    hint: "Array functions compose naturally inside standard Excel formulas.",
    level: "advanced",
    codeExample: "=SUM(TAKE(SORT(B2:B100, 1, -1), 5))"
  },
  {
    question: "What is the performance benefit of combining reshaping functions in memory versus writing intermediate formula helper columns?",
    shortAnswer: "Memory-based reshaping executes in a single vectorized calculation cycle, drastically reducing workbook file size and recalculation latency.",
    explanation: "Legacy spreadsheets with hundreds of helper columns generate thousands of individual cell dependency nodes in Excel's calculation dependency tree. Nesting functions like VSTACK, FILTER, and CHOOSECOLS computes the entire pipeline in high-speed C++ memory buffers without registering individual cell listeners.",
    hint: "Fewer worksheet formulas mean a leaner calculation tree and faster updates.",
    level: "expert",
    codeExample: "=CHOOSECOLS(FILTER(VSTACK(T1, T2), Condition), 1, 4)"
  },
  {
    question: "What error occurs if an array reshaping function attempts to spill into non-empty worksheet cells?",
    shortAnswer: "#SPILL! error.",
    explanation: "If any cell within the required destination bounding box contains static values, formulas, text, merged cells, or borders with legacy constraints, Excel halts output and displays #SPILL!. Clearing the obstructing cells instantly resolves the error.",
    hint: "The classic ghost cell collision error.",
    level: "basic",
    codeExample: "#SPILL!"
  },
  {
    question: "How does TOCOL's second argument [ignore] handle blanks and error values?",
    shortAnswer: "0 = keep all (default), 1 = ignore blanks, 2 = ignore errors, 3 = ignore both blanks and errors.",
    explanation: "The [ignore] parameter gives granular control over data cleanliness during vector flattening: 0 keeps everything; 1 skips empty/blank cells; 2 filters out cell errors like #N/A, #VALUE!; 3 strips both blank cells and error cells simultaneously.",
    hint: "Flags: 0=All, 1=No Blanks, 2=No Errors, 3=No Blanks or Errors.",
    level: "moderate",
    codeExample: "=TOCOL(A2:D20, 3)"
  },
  {
    question: "How does the [scan_by_column] argument alter the evaluation order in TOCOL and TOROW?",
    shortAnswer: "FALSE/Omitted scans row-by-row (left to right); TRUE scans column-by-column (top to bottom).",
    explanation: "By default, TOCOL and TOROW read data horizontally across Row 1, then Row 2, and so on. Setting scan_by_column to TRUE (or 1) forces Excel to read vertically down Column 1, then Column 2, preserving chronological column sequences.",
    hint: "Default is row-major order; setting 1 switches to column-major order.",
    level: "moderate",
    codeExample: "=TOCOL(B2:E10, 1, TRUE)"
  },
  {
    question: "Can CHOOSEROWS accept duplicate row indexes, and what is the resulting behavior?",
    shortAnswer: "Yes, CHOOSEROWS repeats the specified rows in the output as many times as their index is listed.",
    explanation: "If you write =CHOOSEROWS(A2:D10, 1, 1, 2, 2, 3), the output will duplicate row 1 twice, row 2 twice, and row 3 once. This feature enables dynamic oversampling and matrix replication without loops.",
    hint: "Duplicate index numbers yield repeated output rows.",
    level: "advanced",
    codeExample: "=CHOOSEROWS(A2:D10, 1, 1, 2, 2)"
  },
  {
    question: "How can CHOOSECOLS be utilized to reorder database fields dynamically?",
    shortAnswer: "By specifying column indexes in the exact sequence desired in the output matrix.",
    explanation: "If a master table has columns [ID, Name, Dept, Salary, City] at indexes 1, 2, 3, 4, 5, passing =CHOOSECOLS(MasterTable, 1, 5, 2, 4) outputs a reorganized table formatted as [ID, City, Name, Salary].",
    hint: "Order of arguments dictates the left-to-right column order of the output.",
    level: "moderate",
    codeExample: "=CHOOSECOLS(A2:E100, 1, 5, 2, 4)"
  },
  {
    question: "How do you extract both Top 3 and Bottom 3 rows from a sorted dataset into a single report?",
    shortAnswer: "By nesting TAKE inside VSTACK with positive and negative row parameters: =VSTACK(TAKE(Data, 3), TAKE(Data, -3)).",
    explanation: "TAKE(Data, 3) extracts the top 3 records, while TAKE(Data, -3) extracts the bottom 3 records. Wrapping both calls inside VSTACK consolidates them into a single 6-row summary report.",
    hint: "Combine positive TAKE and negative TAKE with VSTACK.",
    level: "advanced",
    codeExample: "=VSTACK(TAKE(SortedData, 3), TAKE(SortedData, -3))"
  },
  {
    question: "What is the primary difference between DROP and FILTER when removing unwanted rows?",
    shortAnswer: "DROP excludes fixed positional boundaries (e.g., top 2 rows); FILTER excludes rows conditionally based on logical boolean criteria.",
    explanation: "DROP is purely index- and position-based. It strips the first N or last N rows regardless of content. FILTER inspects the actual data values within columns against a logical condition (e.g., Dept=\"Finance\") to include or exclude rows.",
    hint: "DROP is structural/positional; FILTER is condition-based.",
    level: "moderate",
    codeExample: "=DROP(A2:D50, 1) vs =FILTER(A2:D50, B2:B50>50000)"
  },
  {
    question: "What happens if WRAPROWS encounters a 1D vector whose length is not an exact multiple of the wrap count?",
    shortAnswer: "Excel pads the remaining empty cells in the final row with #N/A unless a custom [pad_with] argument is supplied.",
    explanation: "If you wrap 10 items into rows of 3, Excel builds 3 full rows (9 items) and a fourth row with 1 item and two #N/A values. Providing a third argument like =WRAPROWS(Data, 3, \"-\") replaces the #N/A errors with the custom dash placeholder.",
    hint: "Use the optional pad_with argument to prevent trailing #N/A errors.",
    level: "moderate",
    codeExample: "=WRAPROWS(A2:A11, 3, \"-\")"
  },
  {
    question: "How can VSTACK dynamically consolidate multiple branch tables with identical column headers while preserving only a single header row?",
    shortAnswer: "Use VSTACK on Table1, then use DROP(Table2, 1) and DROP(Table3, 1) on subsequent tables to discard their redundant header rows.",
    explanation: "If tables contain header rows, stacking them directly duplicates the header texts throughout the ledger. Writing =VSTACK(Branch1_All, DROP(Branch2_All, 1), DROP(Branch3_All, 1)) preserves the master header from Branch 1 while cleanly appending only data rows from the others.",
    hint: "DROP the first row of all tables except the first one before stacking.",
    level: "expert",
    codeExample: "=VSTACK(Table1, DROP(Table2, 1), DROP(Table3, 1))"
  },
  {
    question: "Can array reshaping functions handle 3D data across multiple worksheets directly?",
    shortAnswer: "No, reshaping functions cannot take 3D sheet ranges (e.g., Sheet1:Sheet4!A2:D10) directly, but each sheet range can be listed as a separate argument in VSTACK.",
    explanation: "Excel 365 dynamic array functions do not support traditional 3D colon range syntax. However, you can pass individual sheet ranges as distinct comma-separated arguments: =VSTACK(Sheet1!A2:D10, Sheet2!A2:D10, Sheet3!A2:D10).",
    hint: "Pass each worksheet range as a distinct parameter in VSTACK.",
    level: "advanced",
    codeExample: "=VSTACK(Jan!A2:D20, Feb!A2:D20, Mar!A2:D20)"
  },
  {
    question: "How does EXPAND behave if you specify row or column dimensions that are smaller than the source array?",
    shortAnswer: "EXPAND returns a #VALUE! error.",
    explanation: "EXPAND is strictly designed for enlargement and dimensional padding. If the requested rows or columns are smaller than the existing dimensions of the source array, Excel triggers a #VALUE! error. To shrink an array, use TAKE or DROP instead.",
    hint: "EXPAND cannot shrink an array; use TAKE or DROP for reduction.",
    level: "moderate",
    codeExample: "#VALUE!"
  },
  {
    question: "How do you extract only the last column of any dynamic matrix of unknown column count using CHOOSECOLS?",
    shortAnswer: "Pass -1 as the column index: =CHOOSECOLS(array, -1).",
    explanation: "Negative index arguments in CHOOSECOLS count from right to left. Passing -1 guarantees extraction of the far-right column, regardless of how many columns are added or removed dynamically.",
    hint: "Index -1 always refers to the last item.",
    level: "basic",
    codeExample: "=CHOOSECOLS(DynamicTable#, -1)"
  },
  {
    question: "What is the difference between TRANSPOSE and array reshaping functions like TOCOL or WRAPROWS?",
    shortAnswer: "TRANSPOSE swaps the X and Y axes of an entire 2D matrix (rows become columns), while TOCOL flattens dimensions and WRAPROWS rebuilds dimensions.",
    explanation: "TRANSPOSE maintains total cell coordinates and simply flips the orientation (N rows x M cols becomes M rows x N cols). TOCOL collapses an NxM matrix into a single (N*M)x1 vertical vector, and WRAPROWS reconstructs an unformatted 1D vector into an arbitrary PxQ grid.",
    hint: "TRANSPOSE flips dimensions; TOCOL and WRAPROWS change dimensional depth.",
    level: "moderate",
    codeExample: "=TRANSPOSE(A2:D10)"
  },
  {
    question: "How can you combine TOCOL and UNIQUE to generate a clean distinct list from a multi-column schedule of participant names?",
    shortAnswer: "=UNIQUE(TOCOL(ScheduleRange, 1))",
    explanation: "First, TOCOL(ScheduleRange, 1) flattens all rows and columns of the multi-slot schedule into a single 1D column while ignoring empty slots (flag 1). Then, UNIQUE deduplicates the resulting column to produce a clean list of individual participants.",
    hint: "Flatten first with TOCOL, then deduplicate with UNIQUE.",
    level: "advanced",
    codeExample: "=UNIQUE(TOCOL(B2:H30, 1))"
  },
  {
    question: "Why should you avoid referencing whole column ranges (e.g., A:D) inside array reshaping functions like VSTACK or TOCOL?",
    shortAnswer: "Whole column references force Excel to process all 1,048,576 rows, causing severe memory spikes, workbook freezing, and calculation lag.",
    explanation: "Dynamic array functions allocate internal memory buffers based on input dimensions. Referencing A:D attempts to reshape over 4 million cells in RAM, causing excessive memory consumption and stalling workbook execution. Always use structured Table references or bounded ranges.",
    hint: "Use Table1 or A2:D500 instead of entire column letters like A:D.",
    level: "expert",
    codeExample: "=TOCOL(Table1[Data], 1)"
  },
  {
    question: "In financial modeling, what is the best practice for auditing complex formulas that combine multiple array reshaping functions?",
    shortAnswer: "Use the F9 key in the formula bar to evaluate nested sub-arrays or step through calculations using the Evaluate Formula tool.",
    explanation: "When debugging nested formulas like =CHOOSECOLS(FILTER(VSTACK(T1, T2), ...), 1, 3), highlight any inner expression (e.g., VSTACK(T1, T2)) and press F9 to preview the intermediate in-memory matrix in curly braces {...}. Press Esc to avoid hardcoding the evaluated preview.",
    hint: "Highlight sub-expression + F9 to inspect in-memory arrays.",
    level: "advanced",
    codeExample: "Press F9 on VSTACK(T1, T2) → {\"BK-101\",\"Swadeep\";\"SH-201\",\"Tuhina\"}"
  },
  {
    question: "What is the recommended design pattern when building zero-VBA enterprise dashboards using Excel 365 reshaping functions?",
    shortAnswer: "Decouple raw data ingestion from presentation by building an intermediate memory-transformation layer using VSTACK, CHOOSECOLS, and SORT.",
    explanation: "In modern zero-VBA architecture, raw data tables reside in source sheets. A dedicated dynamic transformation layer uses VSTACK and FILTER to consolidate and clean records in memory. Finally, presentation dashboards feed directly from the spilled origin anchors (e.g., SummaryData#), guaranteeing real-time reactivity without macros.",
    hint: "Structure your model in 3 layers: Raw Data → Dynamic Transformation → Spilled Presentation.",
    level: "expert",
    codeExample: "=SORT(CHOOSECOLS(FILTER(VSTACK(Branch1, Branch2), FilterCriteria), 1, 3, 5), 3, -1)"
  }
];

export default questions;
