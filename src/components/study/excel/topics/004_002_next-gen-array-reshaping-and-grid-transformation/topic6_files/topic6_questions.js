// topic6_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 6
// Topic: Excluding Headers, Totals, or Metadata Rows/Columns with DROP
// Module: 004_002_next-gen-array-reshaping-and-grid-transformation
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function of DROP in Excel 365?",
    shortAnswer: "It excludes/removes a specified count of contiguous rows and/or columns from the perimeter of an array and returns the remainder.",
    explanation: "DROP strips metadata headers, title banners, subtotal footers, or margin columns from the edges of a 2D array without altering the original dataset.",
    hint: "Excludes rows and columns from array boundaries.",
    level: "basic",
    codeExample: "=DROP(A1:G50, 1)"
  },
  {
    question: "What is the syntax signature of the DROP function?",
    shortAnswer: "=DROP(array, rows, [columns])",
    explanation: "DROP takes 'array' (required source range), 'rows' (count of rows to drop from top if positive, from bottom if negative), and optional '[columns]' (count of columns to drop from left if positive, from right if negative).",
    hint: "Array, rows to exclude, optional columns to exclude.",
    level: "basic",
    codeExample: "=DROP(Table1, 2, 1)"
  },
  {
    question: "How does passing a positive integer to the rows argument of DROP behave?",
    shortAnswer: "It drops/removes N rows from the top (start) of the array.",
    explanation: "For example, =DROP(TableWithHeaders, 1) discards the first row (header) and returns only the data rows.",
    hint: "Positive drops from the top.",
    level: "basic",
    codeExample: "=DROP(A1:E100, 1)"
  },
  {
    question: "How does passing a negative integer to the rows argument of DROP behave?",
    shortAnswer: "It drops/removes N rows from the bottom (end) of the array.",
    explanation: "For example, =DROP(ReportWithTotals, -1) removes the final summary/total row from the bottom of the table.",
    hint: "Negative drops from the bottom.",
    level: "basic",
    codeExample: "=DROP(A1:E100, -1)"
  },
  {
    question: "How can you strip both the top 2 title rows AND the bottom summary total row in a single formula using DROP?",
    shortAnswer: "=DROP(DROP(RawReport, 2), -1)",
    explanation: "The inner DROP(RawReport, 2) removes the top 2 title banner rows, and the outer DROP(..., -1) strips the trailing summary row from the bottom.",
    hint: "Nest DROP calls for dual-ended row stripping.",
    level: "moderate",
    codeExample: "=DROP(DROP(A1:F50, 2), -1)"
  },
  {
    question: "How does passing a positive number to the [columns] argument of DROP behave?",
    shortAnswer: "It drops/removes N columns from the left (start) of the array.",
    explanation: "For example, =DROP(Data, , 1) leaves all rows intact while stripping the leftmost column (e.g. Row Index or Serial Number).",
    hint: "Positive column count drops from the left.",
    level: "basic",
    codeExample: "=DROP(A1:G50, , 1)"
  },
  {
    question: "How does passing a negative number to the [columns] argument of DROP behave?",
    shortAnswer: "It drops/removes N columns from the right (end) of the array.",
    explanation: "For example, =DROP(Data, , -1) removes the far-right column (e.g. trailing notes or timestamp column).",
    hint: "Negative column count drops from the right.",
    level: "basic",
    codeExample: "=DROP(A1:G50, , -1)"
  },
  {
    question: "Why is DROP essential when consolidating multiple tables using VSTACK?",
    shortAnswer: "It strips redundant header rows from the 2nd, 3rd, and subsequent tables to prevent repeated header text throughout the stacked ledger.",
    explanation: "Writing =VSTACK(Table1, DROP(Table2, 1), DROP(Table3, 1)) preserves the master header from Table 1 while appending only pure data rows from subsequent tables.",
    hint: "DROP removes redundant headers before vertical stacking.",
    level: "advanced",
    codeExample: "=VSTACK(Table1, DROP(Table2, 1), DROP(Table3, 1))"
  },
  {
    question: "What happens if you attempt to drop more rows than exist in the array?",
    shortAnswer: "#CALC! error.",
    explanation: "If a table contains 10 rows and you write =DROP(Data, 10) or =DROP(Data, 15), the resulting array is empty, which Excel flags with a #CALC! error.",
    hint: "Dropping all or more rows than available returns #CALC!.",
    level: "moderate",
    codeExample: "#CALC!"
  },
  {
    question: "What happens if rows is set to 0 in DROP?",
    shortAnswer: "No rows are dropped; all rows are retained.",
    explanation: "Passing 0 for the rows argument leaves all rows in place, allowing you to drop only columns (e.g. =DROP(Data, 0, 1)).",
    hint: "0 means drop zero rows.",
    level: "basic",
    codeExample: "=DROP(A1:E20, 0, 1)"
  },
  {
    question: "How does DROP differ from FILTER when removing unwanted rows?",
    shortAnswer: "DROP is purely positional (removes top/bottom N rows); FILTER is conditional (evaluates cell criteria).",
    explanation: "DROP strips boundary rows regardless of content. FILTER inspects column data against logical predicates.",
    hint: "Positional boundary trimming vs logical criteria matching.",
    level: "moderate",
    codeExample: "=DROP(A1:D50, 1) vs =FILTER(A1:D50, B1:B50<>\"Total\")"
  },
  {
    question: "How does DROP differ from TAKE?",
    shortAnswer: "DROP removes the specified elements and keeps the rest; TAKE keeps the specified elements and discards the rest.",
    explanation: "DROP(Data, 1) keeps all rows except the first. TAKE(Data, 1) keeps only the first row.",
    hint: "DROP discards; TAKE keeps.",
    level: "basic",
    codeExample: "=DROP(Data, 1) vs =TAKE(Data, 1)"
  },
  {
    question: "How can DROP be used to strip the first column and the last column of a wide matrix simultaneously?",
    shortAnswer: "=DROP(DROP(Data, , 1), , -1)",
    explanation: "The inner DROP removes column 1 from the left, and the outer DROP removes the last column from the right.",
    hint: "Nest DROP on columns: drop 1, then drop -1.",
    level: "moderate",
    codeExample: "=DROP(DROP(A1:H50, , 1), , -1)"
  },
  {
    question: "What error occurs if destination cells where DROP needs to spill are blocked?",
    shortAnswer: "#SPILL! error.",
    explanation: "Any non-empty cell in the output footprint halts execution and triggers #SPILL!.",
    hint: "Destination collision error.",
    level: "basic",
    codeExample: "#SPILL!"
  },
  {
    question: "How can you compute the grand total of a data column while dynamically excluding the top header and bottom total rows in memory?",
    shortAnswer: "=SUM(DROP(DROP(SalaryColumn, 1), -1))",
    explanation: "DROP strips the text header from the top and summary total from the bottom, allowing SUM to compute the true subtotal without double-counting.",
    hint: "Strip header with 1 and total with -1 before summing.",
    level: "moderate",
    codeExample: "=SUM(DROP(DROP(D1:D50, 1), -1))"
  },
  {
    question: "Can DROP accept dynamic spilled array references like A1#?",
    shortAnswer: "Yes, DROP accepts any spilled array anchor as its input array.",
    explanation: "If a prior formula in A1 returns a table with headers, =DROP(A1#, 1) strips the header dynamically.",
    hint: "Use A1# as the input argument.",
    level: "basic",
    codeExample: "=DROP(A1#, 1)"
  },
  {
    question: "How does DROP handle data types during boundary exclusion?",
    shortAnswer: "All retained data types (dates, text, numbers, booleans) are passed with full fidelity to destination cells.",
    explanation: "DROP only modifies array dimensions; it does not coerce or alter underlying cell values.",
    hint: "Data types and serial numbers are preserved.",
    level: "basic",
    codeExample: "=DROP(ReportData, 2)"
  },
  {
    question: "How can DROP remove metadata banner rows from raw ERP exports automatically?",
    shortAnswer: "By passing the count of banner rows (e.g. 3) to DROP: =DROP(RawERPExport, 3).",
    explanation: "Many ERP exports include 3-4 header lines (Report Title, Generated Date, User ID). DROP(Export, 3) cleanly strips this metadata in 1 formula.",
    hint: "Pass 3 to remove 3 metadata banner lines.",
    level: "basic",
    codeExample: "=DROP(A1:F100, 3)"
  },
  {
    question: "Why does combining DROP with VSTACK eliminate the need for Power Query in simple multi-sheet workbook consolidation?",
    shortAnswer: "It allows all sheets to be appended in a single formula while discarding repeated headers on the fly in memory.",
    explanation: "Instead of configuring Power Query connections, a formula like =VSTACK(Jan!A1:D20, DROP(Feb!A1:D20, 1), DROP(Mar!A1:D20, 1)) builds a consolidated live ledger.",
    hint: "Real-time live multi-sheet consolidation without ETL refresh.",
    level: "advanced",
    codeExample: "=VSTACK(Jan!A1:D20, DROP(Feb!A1:D20, 1), DROP(Mar!A1:D20, 1))"
  },
  {
    question: "What happens if you omit the rows argument in DROP and specify only columns (e.g. =DROP(Data, , 2))?",
    shortAnswer: "All rows are kept, and the first 2 columns from the left are dropped.",
    explanation: "Leaving the rows parameter empty (using an extra comma) is equivalent to passing rows=0.",
    hint: "Empty rows parameter preserves all rows.",
    level: "basic",
    codeExample: "=DROP(A1:G50, , 2)"
  },
  {
    question: "How can DROP be nested inside SORT and CHOOSECOLS in dynamic reporting pipelines?",
    shortAnswer: "=SORT(CHOOSECOLS(DROP(RawReport, 2), 1, 3, 5), 3, -1)",
    explanation: "DROP strips the 2 title rows, CHOOSECOLS projects columns 1, 3, 5, and SORT orders the resulting report descending.",
    hint: "Drop headers first, project columns, then sort.",
    level: "advanced",
    codeExample: "=SORT(CHOOSECOLS(DROP(RawData, 2), 1, 3, 5), 3, -1)"
  },
  {
    question: "How does LET optimize formulas that use DROP multiple times?",
    shortAnswer: "LET computes the cleaned array once in RAM, allowing subsequent operations to reuse the variable without recalculating DROP.",
    explanation: "Writing =LET(clean, DROP(RawData, 2), HSTACK(clean, CHOOSECOLS(clean, 4)*0.18)) evaluates the cleaned dataset once.",
    hint: "Cache the stripped data in a LET variable.",
    level: "advanced",
    codeExample: "=LET(clean, DROP(A1:F50, 2), HSTACK(clean, CHOOSECOLS(clean, 4)*0.18))"
  },
  {
    question: "Why should you avoid using whole column letters (e.g. A:F) inside DROP?",
    shortAnswer: "Referencing A:F forces Excel to process all 1,048,576 rows, causing extreme calculation lag.",
    explanation: "Always use bounded ranges or structured Tables.",
    hint: "Use bounded ranges to prevent memory bloat.",
    level: "expert",
    codeExample: "Use Table1 instead of A:F"
  },
  {
    question: "How can you extract ONLY the body data rows between header and summary footer using DROP and TAKE?",
    shortAnswer: "=TAKE(DROP(TableWithHeadersAndTotals, 1), -1) or =DROP(DROP(Table, 1), -1)",
    explanation: "DROP(Table, 1) removes the top header, and DROP(..., -1) removes the bottom footer, leaving only body data rows.",
    hint: "Use DROP(1) and DROP(-1) to isolate table body data.",
    level: "moderate",
    codeExample: "=DROP(DROP(A1:E30, 1), -1)"
  },
  {
    question: "What is the difference between DROP(Data, -1) and TAKE(Data, ROWS(Data)-1)?",
    shortAnswer: "Both return identical results, but DROP(Data, -1) is cleaner, more concise, and does not require evaluating ROWS().",
    explanation: "DROP(Data, -1) directly tells Excel to exclude the final row in C++ without having to calculate total row height first.",
    hint: "DROP(-1) is more expressive and concise than TAKE(ROWS-1).",
    level: "moderate",
    codeExample: "=DROP(Data, -1)"
  },
  {
    question: "Can DROP be used on 1D horizontal vectors to strip leading and trailing spacer cells?",
    shortAnswer: "Yes, DROP(HorizontalVector, , 1) strips the first column cell, and DROP(..., , -1) strips the last.",
    explanation: "DROP operates on 1D row vectors by passing arguments to the columns parameter.",
    hint: "Pass column counts to strip horizontal vector ends.",
    level: "basic",
    codeExample: "=DROP(A1:Z1, , 1)"
  },
  {
    question: "How can DROP and WRAPROWS be combined to unroll a data stream while skipping introductory metadata text?",
    shortAnswer: "=WRAPROWS(DROP(RawLogVector, 5), 4)",
    explanation: "DROP(RawLogVector, 5) discards the first 5 log header lines; WRAPROWS then reconstructs the remaining stream into 4-column tabular rows.",
    hint: "Drop header lines first, then wrap into a 2D table.",
    level: "advanced",
    codeExample: "=WRAPROWS(DROP(A1:A500, 5), 4)"
  },
  {
    question: "What happens if you specify both positive rows and positive columns in DROP (e.g. =DROP(Data, 2, 3))?",
    shortAnswer: "It removes the top 2 rows AND the 3 leftmost columns simultaneously.",
    explanation: "Excel trims both the top and left boundaries in a single step.",
    hint: "Trims top and left edges simultaneously.",
    level: "basic",
    codeExample: "=DROP(A1:J50, 2, 3)"
  },
  {
    question: "How do you calculate the exact number of data rows remaining after applying DROP?",
    shortAnswer: "=ROWS(DROP(Data, 2, 1))",
    explanation: "Wrapping the DROP expression in ROWS() returns the exact count of active data rows.",
    hint: "Use ROWS() on the DROP expression.",
    level: "basic",
    codeExample: "=ROWS(DROP(A1:E50, 2))"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for data hygiene pipelines using DROP?",
    shortAnswer: "Never manually delete header lines or totals rows in raw data files—always sanitize dynamically in memory using DROP.",
    explanation: "Manually deleting rows in raw ERP exports breaks audit trails and causes errors when files are re-imported. Using =DROP(RawExport, 2, -1) maintains raw data integrity while ensuring downstream financial models receive pure sanitized data.",
    hint: "Maintain raw data integrity; sanitize dynamically with DROP.",
    level: "expert",
    codeExample: "Sanitized Pipeline: =DROP(DROP(RawImportTable, 2), -1)"
  }
];

export default questions;
