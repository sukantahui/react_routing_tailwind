// topic1_questions.js
// 30 Structured Questions covering the Spill Operator (#) and Dynamic Array Referencing

const questions = [
  {
    question: "What is the primary function of the '#' (Spilled Range Operator) in Microsoft Excel?",
    shortAnswer: "It dynamically references the entire active perimeter of a spilled array formula using its origin cell address.",
    explanation: "When you append the `#` symbol immediately after the coordinate of an origin cell (e.g., `A2#`), Excel automatically binds the reference to the entire rectangular range of cells populated by that dynamic array formula at runtime, expanding and contracting dynamically as source data changes.",
    hint: "Think of '#' as an elastic rubber band wrapped around the full array output.",
    level: "basic",
    codeExample: "=SUM(A2#)"
  },
  {
    question: "Where must the '#' operator be placed when referencing a spilled array?",
    shortAnswer: "Immediately after the cell coordinate of the top-left origin cell (e.g., D2#).",
    explanation: "The `#` operator must follow the origin cell address directly. If the formula is located in cell `D2`, the spilled reference is `D2#`. Appending `#` to a ghost cell (such as `D4#`) or a non-spilled cell results in a `#REF!` error.",
    hint: "Only attach '#' to the cell where you typed the original master formula.",
    level: "basic",
    codeExample: "=AVERAGE(D2#)"
  },
  {
    question: "What error occurs if you append the '#' operator to a cell that contains a standard static value or non-spilled formula?",
    shortAnswer: "Excel returns a #REF! error because the referenced cell does not possess an active spilled range.",
    explanation: "The `#` operator specifically instructs Excel's calculation engine to inspect the spill table in memory for that cell coordinate. If cell `B5` contains a static number like `500` or a scalar formula like `=SUM(A1:A10)`, no spill range exists, triggering `#REF!`.",
    hint: "Only cells that actively spill multiple values can be referenced with '#'.",
    level: "basic",
    codeExample: "// Cell B5 = 500 -> =B5# returns #REF!"
  },
  {
    question: "How do you reference a spilled array located on a different worksheet?",
    shortAnswer: "Append the '#' symbol to the cell coordinate after the sheet name and exclamation mark (e.g., Sheet1!A2#).",
    explanation: "Cross-sheet references follow standard Excel syntax with the `#` placed immediately after the cell reference: `=SUM(SalesData!B2#)`. Placing the `#` on the sheet name (such as `SalesData#!B2`) causes a syntax parsing error.",
    hint: "Format: SheetName!CellAddress#",
    level: "moderate",
    codeExample: "=COUNTA(Transactions!C2#)"
  },
  {
    question: "How does vector broadcasting work when multiplying a spilled array reference by a scalar number?",
    shortAnswer: "The scalar value is multiplied across every individual element in the spilled array simultaneously, producing a matching spilled output.",
    explanation: "In modern Excel, arithmetic operations on array references automatically vectorize. Entering `=D2# * 0.18` (where `D2#` contains 20 rows of revenue amounts) generates a new 20-row spilled column of 18% GST values without dragging formulas down.",
    hint: "One formula in one cell calculates the whole column.",
    level: "moderate",
    codeExample: "=G2# * 0.18 // Vectorized 18% GST calculation across all rows"
  },
  {
    question: "What happens if you perform arithmetic between two separate spilled arrays of identical dimensions (e.g., A2# + E2#)?",
    shortAnswer: "Excel executes element-wise addition, adding row 1 of A to row 1 of E, row 2 to row 2, and so forth.",
    explanation: "When two spilled arrays share matching dimensions (e.g. both are 15 rows × 1 column), binary operators (`+`, `-`, `*`, `/`) execute pairwise element-by-element arithmetic, producing a new spilled array of the same dimensions.",
    hint: "Element-wise matrix math matches row for row.",
    level: "moderate",
    codeExample: "=PriceArray# * QtyArray#"
  },
  {
    question: "What happens if you attempt element-wise arithmetic between two spilled arrays with mismatched row counts?",
    shortAnswer: "Excel returns #N/A errors for all positions where corresponding elements do not exist in the shorter array.",
    explanation: "If `ArrayA#` has 10 rows and `ArrayB#` has 5 rows, evaluating `=ArrayA# + ArrayB#` computes valid sums for rows 1 to 5, but outputs `#N/A` for rows 6 through 10 because `ArrayB#` lacks matching indices.",
    hint: "Array dimensions must be compatible for element-wise broadcasting.",
    level: "advanced",
    codeExample: "// 10-row array + 5-row array -> rows 6:10 output #N/A"
  },
  {
    question: "How can the '#' operator be used inside the TEXTJOIN function?",
    shortAnswer: "Pass the spilled array reference as the text argument (e.g., =TEXTJOIN(\", \", TRUE, A2#)) to concatenate all spilled elements into a single delimited string.",
    explanation: "`TEXTJOIN` natively consumes array references. Passing `A2#` joins all dynamic array rows into a comma-separated text string in a single cell, dynamically adjusting if new items are added to `A2#`.",
    hint: "Pass A2# directly into the 3rd parameter of TEXTJOIN.",
    level: "moderate",
    codeExample: "=TEXTJOIN(\", \", TRUE, BranchList#)"
  },
  {
    question: "How do you create a dynamic Data Validation dropdown list using the '#' operator?",
    shortAnswer: "In the Data Validation dialog, set Allow to 'List' and Source to '=A2#' (where A2 is the origin cell).",
    explanation: "By setting the validation source to `=A2#`, Excel binds the dropdown menu directly to the live memory range of the spilled array. When the source dataset expands, the dropdown list updates automatically without editing validation rules.",
    hint: "Point Data Validation Source to the top-left cell followed by '#'.",
    level: "moderate",
    codeExample: "Data Validation > Source: =UniqueBranches#"
  },
  {
    question: "Can the '#' operator be used inside standard aggregate functions like SUM, AVERAGE, MIN, and MAX?",
    shortAnswer: "Yes, standard aggregation functions accept spilled range references and calculate over the entire dynamic range.",
    explanation: "Functions like `=SUM(D2#)` or `=AVERAGE(D2#)` treat `D2#` as a continuous rectangular block of values, computing the aggregate metric across all spilled rows and columns in memory.",
    hint: "Use =SUM(OriginCell#) instead of dragging a fixed range.",
    level: "basic",
    codeExample: "=MAX(GrossRevenue#)"
  },
  {
    question: "How do you count the total number of items currently returned by a spilled array?",
    shortAnswer: "Use =COUNTA(A2#) or =ROWS(A2#).",
    explanation: "`=ROWS(A2#)` returns the vertical row count of the spilled rectangle, while `=COUNTA(A2#)` counts non-empty cells. `=ROWS(A2#)` is preferred for matrix dimensions because it evaluates structural bounds.",
    hint: "Use ROWS(A2#) for row dimensions and COLUMNS(A2#) for column dimensions.",
    level: "moderate",
    codeExample: "=ROWS(FilteredResults#)"
  },
  {
    question: "How does the spilled range operator '#' behave when referencing a 2-dimensional (multi-column) spilled table?",
    shortAnswer: "It references the entire 2D bounding matrix spanning all rows and columns produced by the origin formula.",
    explanation: "If `B2` holds `=FILTER(A2:D100, E2:E100=\"Confirmed\")` which produces 15 rows across 4 columns, `B2#` references the entire 15×4 rectangular grid (`B2:E16`).",
    hint: "The '#' operator captures both horizontal and vertical spill spans.",
    level: "moderate",
    codeExample: "=COLUMNS(B2#) // Returns 4"
  },
  {
    question: "How do you extract a specific single column from a multi-column spilled array (e.g. column 3 of B2#)?",
    shortAnswer: "Use the CHOOSECOLS or INDEX function (e.g., =CHOOSECOLS(B2#, 3) or =INDEX(B2#, 0, 3)).",
    explanation: "To isolate one column from a 2D spilled array `B2#`, pass `B2#` into `=CHOOSECOLS(B2#, 3)` or `=INDEX(B2#, 0, 3)`. Setting the row argument of `INDEX` to `0` returns the entire 3rd column as a spilled vector.",
    hint: "INDEX(A2#, 0, ColumnNum) extracts a full column vector from a 2D spill.",
    level: "advanced",
    codeExample: "=CHOOSECOLS(MasterFilter#, 3)"
  },
  {
    question: "How do you extract a specific single row from a multi-row spilled array?",
    shortAnswer: "Use CHOOSEROWS or INDEX (e.g., =CHOOSEROWS(B2#, 1) or =INDEX(B2#, 1, 0)).",
    explanation: "`=CHOOSEROWS(B2#, 1)` or `=INDEX(B2#, 1, 0)` returns the first row of the spilled matrix across all its columns as a horizontal spill.",
    hint: "INDEX(A2#, RowNum, 0) extracts a full horizontal row from a 2D spill.",
    level: "advanced",
    codeExample: "=CHOOSEROWS(TopPerformers#, 1)"
  },
  {
    question: "What is the difference between referencing `A2` and referencing `A2#` in a downstream formula?",
    shortAnswer: "`A2` references only the single scalar value in cell A2; `A2#` references the entire multi-cell spilled array.",
    explanation: "`A2` treats the cell as an individual coordinate. In contrast, `A2#` resolves to the full multi-cell rectangular range allocated to the dynamic array formula anchored at `A2`.",
    hint: "Without '#', you get only one single cell. With '#', you get the whole array.",
    level: "basic",
    codeExample: "=ISREF(A2#) // TRUE"
  },
  {
    question: "Can you assign a Name Manager alias to a spilled array reference (e.g. SalesArray = Sheet1!$D$2#)?",
    shortAnswer: "Yes, Defined Names in Excel fully support the '#' operator for building dynamic named ranges.",
    explanation: "Creating a Named Range like `MasterBranches = Data!$C$2#` in Name Manager allows you to reference `=MasterBranches` in formulas, chart series, and data validation rules with full dynamic auto-expansion.",
    hint: "Define names with '#' to create clean dynamic range variables.",
    level: "advanced",
    codeExample: "Name Manager: ValidBranches = Dashboard!$B$2#"
  },
  {
    question: "How do you apply string concatenation across all items in a spilled array using the '&' operator?",
    shortAnswer: "Write `=A2# & \" - Suffix\"` or `=\"Prefix - \" & A2#`.",
    explanation: "Excel automatically vectorizes string concatenation across the array. If `A2#` contains branch names, `=\"Branch: \" & A2#` outputs a new spilled array where every branch name is prefixed with 'Branch: '.",
    hint: "Use '&' with A2# just like you would with a single cell.",
    level: "moderate",
    codeExample: "=\"Zone: \" & BranchList#"
  },
  {
    question: "Can you pass a spilled array reference `A2#` into XLOOKUP's lookup_value argument?",
    shortAnswer: "Yes, passing `A2#` as the lookup_value causes XLOOKUP to vectorize and perform multiple simultaneous lookups, spilling all results.",
    explanation: "If `A2#` contains a dynamic list of 10 Employee IDs, `=XLOOKUP(A2#, MasterEmpIDs, MasterSalaries)` performs 10 lookups concurrently and spills the 10 matching salary values in one formula.",
    hint: "Passing an array into lookup_value causes XLOOKUP to spill its results.",
    level: "advanced",
    codeExample: "=XLOOKUP(ID_List#, Master_IDs, Master_Departments)"
  },
  {
    question: "What happens if a downstream formula referencing `A2#` causes a secondary #SPILL! error?",
    shortAnswer: "The secondary formula will display #SPILL! independently if its own output path is obstructed, without affecting the primary array at A2.",
    explanation: "Each dynamic array evaluates its own required output footprint. If `A2#` spills successfully, but `=A2# * 1.18` at `F2` is blocked by a value in `F5`, `F2` displays `#SPILL!` while `A2#` continues to display correctly.",
    hint: "Each formula checks its own destination clearance independently.",
    level: "moderate",
    codeExample: "// F2 = A2# * 1.18 -> #SPILL! if cell F6 contains text"
  },
  {
    question: "How do you find the last value in a single-column spilled array using the '#' operator?",
    shortAnswer: "Use =INDEX(A2#, ROWS(A2#)).",
    explanation: "`ROWS(A2#)` returns the total count of rows in the spilled array. Passing that integer into `INDEX(A2#, ROWS(A2#))` extracts the item in the final row of the dynamic range.",
    hint: "Combine INDEX and ROWS on the spilled reference.",
    level: "advanced",
    codeExample: "=INDEX(RecentTx#, ROWS(RecentTx#))"
  },
  {
    question: "Can you use conditional formatting rules on a spilled array range using the '#' syntax?",
    shortAnswer: "In the 'Applies to' box of Conditional Formatting, you can enter =$A$2# to format the dynamic area automatically.",
    explanation: "Excel 365 supports `$A$2#` in the Conditional Formatting 'Applies To' field. When the spilled array grows or shrinks, the conditional formatting boundaries expand and contract dynamically without manual rule adjustment.",
    hint: "Set Conditional Formatting Applies To: =$A$2#",
    level: "expert",
    codeExample: "Applies to: =$D$2#"
  },
  {
    question: "What happens when you delete the contents of the origin cell `A2` that is referenced by downstream formulas like `=SUM(A2#)`?",
    shortAnswer: "Deleting A2 deletes the dynamic array, causing downstream formulas referencing A2# to return #REF!.",
    explanation: "Because `A2` is the master anchor of the spill, clearing `A2` removes the entire array from memory. Any downstream formula pointing to `A2#` loses its target spill range and resolves to `#REF!`.",
    hint: "Deleting the origin cell destroys the array and breaks '#' pointers.",
    level: "basic",
    codeExample: "// Clear A2 -> =SUM(A2#) becomes #REF!"
  },
  {
    question: "Why does `=SUM(A2:A100)` perform slower than `=SUM(A2#)` on dynamically filtered data?",
    shortAnswer: "`A2:A100` processes 99 fixed cells including blank padding, whereas `A2#` processes only the exact populated array elements in memory.",
    explanation: "Fixed range references force Excel to traverse empty padding cells and check them for potential values. The `#` operator restricts calculation strictly to the active memory boundary of the spilled array, maximizing execution speed.",
    hint: "A2# calculates only active elements without redundant blank scans.",
    level: "advanced",
    codeExample: "=SUM(FilteredSales#) // Computes only active matching rows"
  },
  {
    question: "How does the LET function interact with the '#' operator?",
    shortAnswer: "LET can assign a spilled array to a local variable name and reuse it multiple times without recalculating or creating helper cells.",
    explanation: "`=LET(spill, UNIQUE(A2:A100), SORT(spill))` stores the distinct array in the local variable `spill` and sorts it in memory, bypassing the need to output an intermediate helper column on the worksheet.",
    hint: "Use LET to perform multi-step dynamic operations in memory.",
    level: "expert",
    codeExample: "=LET(data, FILTER(A2:E50, C2:C50=\"Barrackpore\"), SORT(data, 5, -1))"
  },
  {
    question: "Can you apply Excel's native Transpose function on a spilled reference (e.g. =TRANSPOSE(A2#))?",
    shortAnswer: "Yes, TRANSPOSE flips the vertical spilled array into a horizontal spilled row across columns.",
    explanation: "Passing a 10×1 vertical array `A2#` into `=TRANSPOSE(A2#)` outputs a 1×10 horizontal array spanning columns A through J on the target row.",
    hint: "Use TRANSPOSE(A2#) to switch orientation dynamically.",
    level: "moderate",
    codeExample: "=TRANSPOSE(UniqueBranches#)"
  },
  {
    question: "How do you calculate a running cumulative sum of a single-column spilled array `A2#`?",
    shortAnswer: "Use SCAN or subtotal indexing (e.g., =SCAN(0, A2#, LAMBDA(acc, val, acc + val))).",
    explanation: "In modern Excel, helper LAMBDA functions like `SCAN` iterate through `A2#` row by row, accumulating running totals in memory and spilling the cumulative sum column alongside the source array.",
    hint: "Use SCAN with LAMBDA for live cumulative calculations.",
    level: "expert",
    codeExample: "=SCAN(0, RevenueArray#, LAMBDA(acc, v, acc + v))"
  },
  {
    question: "What is the result of applying the logical NOT function on a boolean spilled array `=NOT(B2#)`?",
    shortAnswer: "It inverts every TRUE to FALSE and every FALSE to TRUE across the entire spilled array.",
    explanation: "Logical functions vectorize across dynamic array references. If `B2#` contains a boolean filter array `[TRUE; FALSE; TRUE]`, `=NOT(B2#)` spills `[FALSE; TRUE; FALSE]`.",
    hint: "NOT() inverts each element in the spilled vector.",
    level: "moderate",
    codeExample: "=NOT(IsConfirmed#)"
  },
  {
    question: "Can you use the '#' operator with external workbook links (e.g., ='[Budget2026.xlsx]Q1'!A2#)?",
    shortAnswer: "Yes, but both workbooks must be open in the same Excel session for dynamic array spilling to calculate live.",
    explanation: "Dynamic array engine calculations require live in-memory access to the external workbook's spill graph. If the source workbook is closed, Excel retains the cached snapshot but cannot expand the spill range dynamically until reopened.",
    hint: "External dynamic array links compute live when both workbooks are open.",
    level: "expert",
    codeExample: "='[Enrollments_2026.xlsx]Barrackpore'!B2#"
  },
  {
    question: "How do you check programmatically with a formula whether a specific cell coordinate is part of a spilled range?",
    shortAnswer: "Compare the cell address against the spilled bounding box using ISREF and coordinate tests.",
    explanation: "While there is no single `=ISSPILL()` function, checking if `=CELL(\"address\", A2#)` contains multiple addresses or testing `#` evaluation in an error wrapper validates if a range is actively spilling.",
    hint: "Use CELL and coordinate bounds checks.",
    level: "expert",
    codeExample: "=ROWS(A2#) > 1"
  },
  {
    question: "What is the ultimate architectural benefit of designing Excel financial and operational models using the '#' operator?",
    shortAnswer: "Models become fully elastic, non-volatile, self-healing, and maintenance-free as data volume scales.",
    explanation: "Models built with `#` operator bindings automatically adjust to fluctuating data volumes without formula dragging, broken cell ranges, or brittle macros. When new invoices or students are added, every downstream total, chart, and validation list updates instantaneously with zero maintenance.",
    hint: "The '#' operator enables zero-maintenance elastic financial engineering.",
    level: "expert",
    codeExample: "// Elastic Model: Master Log -> Filtered Spill# -> Summary KPIs# -> Executive Dashboard"
  }
];

export default questions;
