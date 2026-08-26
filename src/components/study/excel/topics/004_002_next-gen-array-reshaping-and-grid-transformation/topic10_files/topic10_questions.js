// topic10_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 10
// Topic: Combining VSTACK and HSTACK to Append and Merge Disparate Datasets in Memory
// Module: 004_002_next-gen-array-reshaping-and-grid-transformation
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary difference between VSTACK and HSTACK in Excel 365?",
    shortAnswer: "VSTACK appends arrays vertically (top to bottom); HSTACK joins arrays horizontally (side by side).",
    explanation: "VSTACK increases the row count by stacking arrays on top of each other. HSTACK increases the column width by placing arrays adjacent to each other.",
    hint: "Vertical stacking vs horizontal joining.",
    level: "basic",
    codeExample: "=VSTACK(Table1, Table2) vs =HSTACK(Table1, Table2)"
  },
  {
    question: "What is the syntax signature of VSTACK?",
    shortAnswer: "=VSTACK(array1, [array2], ...)",
    explanation: "VSTACK accepts two or more array or range arguments and stacks them sequentially into a single unified vertical matrix.",
    hint: "Accepts multiple arrays to stack vertically.",
    level: "basic",
    codeExample: "=VSTACK(A2:D10, F2:I10)"
  },
  {
    question: "What is the syntax signature of HSTACK?",
    shortAnswer: "=HSTACK(array1, [array2], ...)",
    explanation: "HSTACK accepts two or more array or range arguments and joins them side-by-side into a single wide composite matrix.",
    hint: "Accepts multiple arrays to join horizontally.",
    level: "basic",
    codeExample: "=HSTACK(A2:B20, D2:E20)"
  },
  {
    question: "How can VSTACK consolidate multiple branch tables while retaining only a single master header row?",
    shortAnswer: "By stacking Table1 with headers, and wrapping Table2 and Table3 in DROP(..., 1) to discard their redundant headers.",
    explanation: "Writing =VSTACK(Table1, DROP(Table2, 1), DROP(Table3, 1)) preserves the master header from Table 1 while cleanly appending pure data rows from other tables.",
    hint: "Use DROP(1) on secondary tables before vertical stacking.",
    level: "moderate",
    codeExample: "=VSTACK(Table1, DROP(Table2, 1), DROP(Table3, 1))"
  },
  {
    question: "What happens if arrays passed to VSTACK have different numbers of columns?",
    shortAnswer: "Excel pads the shorter arrays with #N/A errors in the missing column positions.",
    explanation: "VSTACK aligns arrays by column index starting from Column 1. If Table 1 has 5 columns and Table 2 has 3 columns, Table 2 will have #N/A in columns 4 and 5.",
    hint: "Missing columns in narrower arrays are padded with #N/A.",
    level: "moderate",
    codeExample: "=VSTACK(5_Col_Table, 3_Col_Table)"
  },
  {
    question: "What happens if arrays passed to HSTACK have different row heights?",
    shortAnswer: "Excel pads the shorter arrays with #N/A errors in the missing row positions.",
    explanation: "If Table 1 has 10 rows and Table 2 has 6 rows, HSTACK places Table 2 alongside Table 1 and fills rows 7 through 10 of Table 2 with #N/A.",
    hint: "Missing rows in shorter arrays are padded with #N/A.",
    level: "moderate",
    codeExample: "=HSTACK(10_Row_Table, 6_Row_Table)"
  },
  {
    question: "How can EXPAND prevent #N/A errors when joining unequal-height tables with HSTACK?",
    shortAnswer: "By standardizing the shorter table to the height of the taller table before passing it into HSTACK.",
    explanation: "Using =HSTACK(Table1, EXPAND(Table2, ROWS(Table1), , \"\")) replaces the default #N/A with clean blank text.",
    hint: "Wrap shorter tables in EXPAND with a custom pad value.",
    level: "advanced",
    codeExample: "=HSTACK(Table1, EXPAND(Table2, ROWS(Table1), , \"\"))"
  },
  {
    question: "How can HSTACK be used to attach a newly calculated GST-inclusive price column to an existing master table?",
    shortAnswer: "=HSTACK(ProductTable, CHOOSECOLS(ProductTable, 3)*1.18)",
    explanation: "HSTACK joins the original columns of ProductTable alongside a new calculated column equal to 118% of Price (Column 3).",
    hint: "Attach dynamic calculation vectors to tables using HSTACK.",
    level: "moderate",
    codeExample: "=HSTACK(A2:D20, D2:D20*1.18)"
  },
  {
    question: "Can VSTACK and HSTACK be combined in a single nested formula to build complete custom reporting dashboards?",
    shortAnswer: "Yes, you can construct custom multi-section reports by stacking header ribbons (HSTACK) above consolidated data bodies (VSTACK).",
    explanation: "You can write =VSTACK(HSTACK(\"ID\", \"Name\", \"Revenue\"), SORT(VSTACK(BK_Data, SH_Data), 3, -1)) to build an entire end-to-end report.",
    hint: "Nest HSTACK headers above VSTACK data bodies.",
    level: "advanced",
    codeExample: "=VSTACK(HSTACK(\"ID\", \"Name\", \"Net\"), VSTACK(T1, T2))"
  },
  {
    question: "How does VSTACK handle data across different worksheets (e.g. Jan, Feb, Mar)?",
    shortAnswer: "Pass each worksheet range as a distinct argument: =VSTACK(Jan!A2:D20, Feb!A2:D20, Mar!A2:D20).",
    explanation: "VSTACK allows seamless multi-sheet consolidation without 3D colon ranges or complex VBA macros.",
    hint: "List each worksheet range separated by commas in VSTACK.",
    level: "basic",
    codeExample: "=VSTACK(Jan!A2:D20, Feb!A2:D20, Mar!A2:D20)"
  },
  {
    question: "What error occurs if the cells where VSTACK or HSTACK need to spill are blocked by static data?",
    shortAnswer: "#SPILL! error.",
    explanation: "Any non-empty cell in the output bounding box triggers #SPILL!.",
    hint: "Destination collision error.",
    level: "basic",
    codeExample: "#SPILL!"
  },
  {
    question: "How can you add a static 'Branch' identifier column to data before stacking multiple branch tables?",
    shortAnswer: "=HSTACK(EXPAND(\"Barrackpore\", ROWS(BK_Data), , \"Barrackpore\"), BK_Data)",
    explanation: "EXPAND generates a column of \"Barrackpore\" matching the row height of BK_Data, which HSTACK attaches as the leading column.",
    hint: "Use EXPAND to generate repeated branch tags, then HSTACK.",
    level: "advanced",
    codeExample: "=HSTACK(EXPAND(\"BK\", ROWS(BK_Data), , \"BK\"), BK_Data)"
  },
  {
    question: "How does VSTACK differ from the traditional SQL UNION ALL operator?",
    shortAnswer: "Both append rows sequentially without deduplication, but VSTACK runs natively in-memory in Excel with instant dynamic reactivity.",
    explanation: "VSTACK preserves all duplicate rows just like UNION ALL, recalculating immediately whenever underlying sheet cells update.",
    hint: "VSTACK is the native Excel equivalent of SQL UNION ALL.",
    level: "moderate",
    codeExample: "VSTACK = SQL UNION ALL"
  },
  {
    question: "How can you deduplicate the output of VSTACK to simulate a SQL UNION (distinct)?",
    shortAnswer: "=UNIQUE(VSTACK(Table1, Table2))",
    explanation: "Wrapping VSTACK inside UNIQUE strips duplicate identical rows across the stacked tables.",
    hint: "Wrap VSTACK in UNIQUE.",
    level: "basic",
    codeExample: "=UNIQUE(VSTACK(A2:D20, F2:I20))"
  },
  {
    question: "In financial modeling, how can HSTACK and VSTACK construct a dynamic financial summary card with headers and totals?",
    shortAnswer: "=VSTACK(HSTACK(\"Department\", \"Q1\", \"Q2\", \"Total\"), DataRows, HSTACK(\"Grand Total\", SUM(Q1), SUM(Q2), SUM(Total)))",
    explanation: "VSTACK stacks the top header row, the dynamic data rows, and the bottom summary footer row into a single composite card.",
    hint: "Stack Header, Data, and Total rows using VSTACK and HSTACK.",
    level: "expert",
    codeExample: "=VSTACK(HeaderRow, DataRows, TotalRow)"
  },
  {
    question: "Can VSTACK and HSTACK accept inline array constants (e.g. {\"A\", \"B\"; \"C\", \"D\"})?",
    shortAnswer: "Yes, both functions accept array constants directly in memory.",
    explanation: "Writing =VSTACK({\"H1\", \"H2\"}, {\"Data1\", \"Data2\"}) produces a 2-row x 2-column matrix.",
    hint: "Inline array constants work seamlessly with stacking functions.",
    level: "basic",
    codeExample: "=VSTACK({\"H1\", \"H2\"}, {\"D1\", \"D2\"})"
  },
  {
    question: "How does LET optimize formulas that combine VSTACK, FILTER, and HSTACK?",
    shortAnswer: "LET assigns the stacked ledger to a named variable, allowing multiple filtering and column selections without redundant stacking.",
    explanation: "Writing =LET(all, VSTACK(T1, T2, T3), FILTER(all, CHOOSECOLS(all, 3)>50000)) stacks the tables once in RAM.",
    hint: "Stack once and store in a LET variable.",
    level: "advanced",
    codeExample: "=LET(all, VSTACK(T1, T2), FILTER(all, CHOOSECOLS(all, 2)=\"Active\"))"
  },
  {
    question: "Why should you avoid referencing whole column ranges (e.g. A:D) inside VSTACK?",
    shortAnswer: "Stacking two 1,048,576-row ranges attempts to create over 2 million rows, crashing Excel's worksheet limit.",
    explanation: "Because an Excel sheet only supports 1,048,576 rows, stacking whole columns triggers immediate calculation overflow errors.",
    hint: "Stacking full columns exceeds worksheet row limits.",
    level: "expert",
    codeExample: "Use Table1 instead of A:D"
  },
  {
    question: "How do you stack tables from 12 monthly sheets (Jan through Dec) in a single formula?",
    shortAnswer: "=VSTACK(Jan!A2:E50, Feb!A2:E50, Mar!A2:E50, Apr!A2:E50, May!A2:E50, Jun!A2:E50, Jul!A2:E50, Aug!A2:E50, Sep!A2:E50, Oct!A2:E50, Nov!A2:E50, Dec!A2:E50)",
    explanation: "Listing all 12 sheet ranges in VSTACK creates a consolidated annual ledger without opening Power Query.",
    hint: "List all 12 monthly ranges separated by commas in VSTACK.",
    level: "moderate",
    codeExample: "=VSTACK(Jan!A2:E50, Feb!A2:E50, ... Dec!A2:E50)"
  },
  {
    question: "How does VSTACK handle date and currency formatting across disparate source sheets?",
    shortAnswer: "Underlying serial values and numbers are preserved faithfully in destination spilled cells.",
    explanation: "VSTACK transfers underlying values without data type distortion.",
    hint: "Data types and serial numbers are preserved.",
    level: "basic",
    codeExample: "=VSTACK(Branch1_Ledger, Branch2_Ledger)"
  },
  {
    question: "How can HSTACK join an Employee ID column with their calculated tenure in years?",
    shortAnswer: "=HSTACK(Emp_IDs, DATEDIF(Join_Dates, TODAY(), \"Y\"))",
    explanation: "HSTACK joins the ID vector alongside the dynamically calculated tenure vector.",
    hint: "Attach calculated tenure vector using HSTACK.",
    level: "moderate",
    codeExample: "=HSTACK(A2:A50, DATEDIF(B2:B50, TODAY(), \"Y\"))"
  },
  {
    question: "How can you reverse the order of two tables stacked by VSTACK?",
    shortAnswer: "Swap the argument order: =VSTACK(Table2, Table1).",
    explanation: "The order of arguments passed to VSTACK determines the top-to-bottom sequence of the output matrix.",
    hint: "Order of arguments controls stacking sequence.",
    level: "basic",
    codeExample: "=VSTACK(Table2, Table1)"
  },
  {
    question: "Can VSTACK stack dynamic spilled array anchors (e.g. G2# and M2#)?",
    shortAnswer: "Yes, VSTACK accepts dynamic spilled arrays and stacks their variable-length results in memory.",
    explanation: "Writing =VSTACK(G2#, M2#) merges two dynamically sized calculation outputs automatically.",
    hint: "Pass spilled anchors like G2# and M2# to VSTACK.",
    level: "basic",
    codeExample: "=VSTACK(G2#, M2#)"
  },
  {
    question: "Why does VSTACK execute faster than legacy VBA consolidation macros?",
    shortAnswer: "VSTACK is compiled in native C++ and executes as a single vectorized memory copy without COM automation overhead.",
    explanation: "VBA loops copy row-by-row through the slow Excel Object Model. VSTACK operates directly on internal memory pointers.",
    hint: "Native C++ memory execution vs slow VBA COM automation.",
    level: "expert",
    codeExample: "C++ vectorized memory consolidation"
  },
  {
    question: "How can you create a 2-column key-value lookup table dynamically using HSTACK?",
    shortAnswer: "=HSTACK(UNIQUE(CategoryColumn), SUMIF(CategoryColumn, UNIQUE(CategoryColumn), AmountColumn))",
    explanation: "HSTACK joins the unique category list alongside their dynamic SUMIF totals in a single formula cell.",
    hint: "Join unique keys with aggregate values using HSTACK.",
    level: "advanced",
    codeExample: "=LET(u, UNIQUE(A2:A50), HSTACK(u, SUMIF(A2:A50, u, B2:B50)))"
  },
  {
    question: "What happens if an empty range (e.g. an empty row) is passed to VSTACK?",
    shortAnswer: "VSTACK returns a row of zeroes for the empty cells.",
    explanation: "Excel coerces empty cell coordinates to zeroes unless wrapped in FILTER or TOCOL with ignore flags.",
    hint: "Empty cells are coerced to 0.",
    level: "moderate",
    codeExample: "=VSTACK(Table1, EmptyRow)"
  },
  {
    question: "How can you combine VSTACK, CHOOSECOLS, and SORT to create an executive regional summary?",
    shortAnswer: "=SORT(CHOOSECOLS(VSTACK(BK_Data, DROP(SH_Data, 1)), 1, 2, 5), 3, -1)",
    explanation: "VSTACK consolidates branches, DROP strips secondary headers, CHOOSECOLS projects fields [ID, Name, Net], and SORT orders by Net descending.",
    hint: "Consolidate, project columns, and sort in 1 formula.",
    level: "advanced",
    codeExample: "=SORT(CHOOSECOLS(VSTACK(T1, DROP(T2, 1)), 1, 2, 5), 3, -1)"
  },
  {
    question: "How does HSTACK handle text columns alongside numeric calculation columns?",
    shortAnswer: "Data types are preserved independently in each column of the composite table.",
    explanation: "HSTACK creates a heterogeneous 2D matrix where text and numbers maintain their native types.",
    hint: "Columns retain their independent data types.",
    level: "basic",
    codeExample: "=HSTACK(TextCol, NumberCol)"
  },
  {
    question: "What is the maximum number of arrays you can pass to VSTACK or HSTACK in Excel 365?",
    shortAnswer: "Up to 255 array arguments in a single formula call.",
    explanation: "Excel formulas support up to 255 arguments, allowing extensive multi-table consolidation.",
    hint: "Excel formula parameter limit is 255 arguments.",
    level: "expert",
    codeExample: "Limit: 255 array arguments"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for enterprise data consolidation using VSTACK and HSTACK?",
    shortAnswer: "Always standardize schemas with CHOOSECOLS or EXPAND before stacking, and always DROP secondary table headers.",
    explanation: "In real-world enterprise databases, different branches or departments often structure columns in different orders. Using CHOOSECOLS on each branch table to align columns before passing into VSTACK ensures that data never ends up in the wrong column!",
    hint: "Align column schemas with CHOOSECOLS before stacking with VSTACK.",
    level: "expert",
    codeExample: "Standardized Union: =VSTACK(CHOOSECOLS(BK_Table, 1, 2, 5), DROP(CHOOSECOLS(SH_Table, 3, 1, 6), 1))"
  }
];

export default questions;
