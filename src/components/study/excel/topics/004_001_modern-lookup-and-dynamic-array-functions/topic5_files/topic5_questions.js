// topic5_questions.js
// 30 Structured Questions covering the SORTBY Function in Microsoft Excel 365

const questions = [
  {
    question: "What is the primary difference between the SORT function and the SORTBY function in Excel?",
    shortAnswer: "SORT sorts by a single column index inside the array; SORTBY sorts by multiple columns and supports external auxiliary arrays.",
    explanation: "While `SORT` takes a numeric column index within the source range, `SORTBY` allows multi-tier sorting (primary, secondary, tertiary) and can sort data based on columns or calculated expressions that are not included in the returned output array.",
    hint: "Think multi-level sorting and external sorting columns.",
    level: "basic",
    codeExample: "=SORTBY(A2:D20, B2:B20, 1, D2:D20, -1)"
  },
  {
    question: "What is the complete syntax of the SORTBY function?",
    shortAnswer: "=SORTBY(array, by_array1, [sort_order1], [by_array2], [sort_order2], ...)",
    explanation: "`array` is the data matrix to return; `by_array1` is the primary sorting column; `[sort_order1]` is 1 (Ascending) or -1 (Descending); followed by optional secondary pairs of `by_array` and `sort_order`.",
    hint: "Array followed by pairs of (by_array, order).",
    level: "basic",
    codeExample: "=SORTBY(EmpTable, DeptCol, 1, SalaryCol, -1)"
  },
  {
    question: "Can SORTBY sort an array by a column that is NOT included in the returned output range?",
    shortAnswer: "Yes, this is one of SORTBY's greatest advantages over SORT.",
    explanation: "For example, `=SORTBY(A2:B20, D2:D20, -1)` returns only columns A and B, but sorts them in descending order based on the values in column D.",
    hint: "The sorting column can reside completely outside the returned array.",
    level: "moderate",
    codeExample: "=SORTBY(Names_Only, Secret_Scores, -1)"
  },
  {
    question: "How do you perform a multi-level sort (e.g. Department A to Z, then Salary Highest to Lowest) using SORTBY?",
    shortAnswer: "Supply two pairs of criteria: =SORTBY(A2:G20, C2:C20, 1, F2:F20, -1).",
    explanation: "Excel sorts primary records by `C2:C20` ascending (Department A-Z). Within each identical department, ties are broken by sorting `F2:F20` descending (Salary High-to-Low).",
    hint: "Use (DeptRange, 1, SalaryRange, -1).",
    level: "moderate",
    codeExample: "=SORTBY(A2:G20, C2:C20, 1, F2:F20, -1)"
  },
  {
    question: "What error occurs if the row count of `by_array1` does not match the row count of `array`?",
    shortAnswer: "Excel returns a #VALUE! error due to mismatched array dimensions.",
    explanation: "Every sorting array passed to `SORTBY` must have the exact same number of rows (or columns) as the primary data array. If `array` is 20 rows and `by_array` is 25 rows, `#VALUE!` is raised.",
    hint: "All by_arrays must match the row height of the source array.",
    level: "basic",
    codeExample: "// A2:C20 (19 rows) vs D2:D25 (24 rows) → #VALUE!"
  },
  {
    question: "How do you sort data based on a custom non-alphabetical list order (e.g. High, Medium, Low) using SORTBY?",
    shortAnswer: "Combine SORTBY with MATCH against a custom priority array: =SORTBY(A2:D20, MATCH(B2:B20, {\"High\",\"Medium\",\"Low\"}, 0), 1).",
    explanation: "`MATCH(B2:B20, {\"High\",\"Medium\",\"Low\"}, 0)` converts each text priority into its numeric rank (1, 2, or 3). `SORTBY` then sorts the table in ascending order of those ranks.",
    hint: "Use MATCH against a constant array {\"High\",\"Medium\",\"Low\"}.",
    level: "advanced",
    codeExample: "=SORTBY(A2:D20, MATCH(C2:C20, {\"CEO\",\"Director\",\"Manager\",\"Associate\"}, 0), 1)"
  },
  {
    question: "How do you sort a list of client names in random shuffle order using SORTBY and RANDARRAY?",
    shortAnswer: "Use =SORTBY(A2:A20, RANDARRAY(ROWS(A2:A20))).",
    explanation: "`RANDARRAY(ROWS(A2:A20))` generates a column of random decimal numbers with the same height as the names list. `SORTBY` sorts the names by these random numbers, creating a true random shuffle.",
    hint: "Use RANDARRAY(ROWS(Range)) as the by_array.",
    level: "advanced",
    codeExample: "=SORTBY(StudentNames, RANDARRAY(ROWS(StudentNames)))"
  },
  {
    question: "How do you sort items based on frequency of occurrence (most popular first) using SORTBY?",
    shortAnswer: "Use COUNTIF as the by_array in descending order: =SORTBY(D2#, COUNTIF(RawCol, D2#), -1).",
    explanation: "`COUNTIF` calculates the frequency count for each distinct item in `D2#`. `SORTBY` orders the distinct items by their frequency counts descending.",
    hint: "Pass COUNTIF(RawData, UniqueList#) as the by_array in descending order (-1).",
    level: "advanced",
    codeExample: "=SORTBY(UniqueProducts#, COUNTIF(SalesLog, UniqueProducts#), -1)"
  },
  {
    question: "How many sorting levels (pairs of by_array and sort_order) does SORTBY support?",
    shortAnswer: "Up to 127 pairs of criteria.",
    explanation: "Excel 365 supports up to 127 sorting levels in a single `SORTBY` formula, far exceeding any practical corporate reporting requirement.",
    hint: "Supports up to 127 sorting pairs.",
    level: "moderate",
    codeExample: "=SORTBY(Data, Col1, 1, Col2, -1, Col3, 1, Col4, -1)"
  },
  {
    question: "How do you sort text entries by string length (shortest to longest) using SORTBY?",
    shortAnswer: "Use LEN as the by_array: =SORTBY(A2:A20, LEN(A2:A20), 1).",
    explanation: "`LEN(A2:A20)` computes the character count for each string. `SORTBY` sorts the names based on these character lengths ascending.",
    hint: "Use LEN(Range) in the by_array argument.",
    level: "moderate",
    codeExample: "=SORTBY(CityNames, LEN(CityNames), 1)"
  },
  {
    question: "Can you sort horizontally across columns using SORTBY?",
    shortAnswer: "Yes, when `array` and all `by_array` arguments are horizontal row vectors spanning across columns.",
    explanation: "If you pass 1-row ranges (e.g. `B1:M1` for data and `B2:M2` for sort keys), `SORTBY` automatically detects horizontal orientation and sorts columns left-to-right.",
    hint: "Horizontal ranges trigger horizontal column sorting automatically.",
    level: "advanced",
    codeExample: "=SORTBY(B1:M3, B4:M4, 1)"
  },
  {
    question: "How do you combine FILTER and SORTBY in a single formula?",
    shortAnswer: "Apply FILTER first, assign with LET or pass matching criteria ranges: =LET(d, FILTER(A2:G20, C2:C20=\"Barrackpore\"), SORTBY(d, CHOOSECOLS(d, 3), 1, CHOOSECOLS(d, 6), -1)).",
    explanation: "Using `LET` ensures that the filtered table `d` is evaluated once in memory, and `SORTBY` sorts its internal columns using `CHOOSECOLS`.",
    hint: "Use LET to store the filtered matrix before calling SORTBY.",
    level: "expert",
    codeExample: "=LET(f, FILTER(A2:G20, C2:C20=\"Barrackpore\"), SORTBY(f, CHOOSECOLS(f, 6), -1))"
  },
  {
    question: "What happens if a SORTBY formula encounters blank cells in the `by_array`?",
    shortAnswer: "Excel treats blank cells as 0 in numeric comparisons and places them at the end when sorting ascending.",
    explanation: "Blank values are evaluated with the lowest numeric weight, grouping empty records consistently.",
    hint: "Blanks evaluate as zero in sorting passes.",
    level: "moderate",
    codeExample: "// Blank values sort to the bottom in descending sorts"
  },
  {
    question: "How do you sort employees by Appraisal Grade where 'A+' > 'A' > 'B+' > 'B'?",
    shortAnswer: "Use MATCH with a defined grade hierarchy: =SORTBY(A2:G20, MATCH(G2:G20, {\"A+\",\"A\",\"B+\",\"B\"}, 0), 1).",
    explanation: "By mapping each letter grade to its sequential rank (1 to 4), `SORTBY` orders employees according to the custom corporate appraisal scale.",
    hint: "Use MATCH against {\"A+\",\"A\",\"B+\",\"B\"}.",
    level: "advanced",
    codeExample: "=SORTBY(A2:G20, MATCH(G2:G20, {\"A+\",\"A\",\"B+\",\"B\"}, 0), 1)"
  },
  {
    question: "How do you reference a multi-level sorted spilled array downstream using the '#' operator?",
    shortAnswer: "Append '#' to the top-left origin cell of the SORTBY formula (e.g., K2#).",
    explanation: "Downstream formulas like `=COUNTA(K2#)` or `=INDEX(K2#, 1, 2)` automatically track the entire sorted table.",
    hint: "Use OriginCell#.",
    level: "basic",
    codeExample: "=INDEX(K2#, 1, 2) // Extracts top performer name after multi-level sort"
  },
  {
    question: "What is the advantage of using structured table columns inside SORTBY (e.g. =SORTBY(Staff[#Data], Staff[Dept], 1, Staff[Salary], -1))?",
    shortAnswer: "When new staff rows are added to the table, the formula automatically captures the new rows without range adjustments.",
    explanation: "Structured references expand automatically, ensuring `SORTBY` remains fully self-updating.",
    hint: "Structured table references provide automatic expansion.",
    level: "moderate",
    codeExample: "=SORTBY(StaffTable[#Data], StaffTable[Department], 1, StaffTable[Salary], -1)"
  },
  {
    question: "Can you sort by month names chronologically (Jan, Feb, Mar...) rather than alphabetically (Apr, Aug, Dec...) using SORTBY?",
    shortAnswer: "Yes, by passing MONTH(DateRange) or MATCH(MonthNames, MonthList, 0) as the by_array.",
    explanation: "Mapping month names to their chronological integer (1 to 12) allows `SORTBY` to sort in true calendar sequence.",
    hint: "Use MATCH against {\"Jan\",\"Feb\",\"Mar\"...} or MONTH(Dates).",
    level: "advanced",
    codeExample: "=SORTBY(A2:D20, MONTH(B2:B20), 1)"
  },
  {
    question: "What happens if a cell in the destination range is occupied when SORTBY attempts to spill?",
    shortAnswer: "Excel outputs a #SPILL! error at the origin cell.",
    explanation: "Clearing the occupied cell resolves the obstruction and allows the sorted array to spill.",
    hint: "Clear any obstructing data in the spill perimeter.",
    level: "basic",
    codeExample: "// Delete values in the projected spill path to resolve #SPILL!"
  },
  {
    question: "How do you sort a table by the absolute value of variance / error using SORTBY?",
    shortAnswer: "Use ABS(VarianceCol) as the by_array: =SORTBY(A2:D20, ABS(D2:D20), -1).",
    explanation: "`ABS()` removes negative signs, allowing `SORTBY` to highlight the largest budget variances (both positive and negative) at the top.",
    hint: "Use ABS(Range) in the by_array parameter.",
    level: "advanced",
    codeExample: "=SORTBY(BudgetTable, ABS(VarianceColumn), -1)"
  },
  {
    question: "Can you extract only the top 5 records from a multi-level SORTBY output?",
    shortAnswer: "Yes, wrap the SORTBY expression in TAKE: =TAKE(SORTBY(A2:G20, C2:C20, 1, F2:F20, -1), 5).",
    explanation: "`TAKE(..., 5)` trims the multi-tier sorted result to strictly the first 5 records in memory.",
    hint: "Wrap SORTBY in TAKE(..., 5).",
    level: "moderate",
    codeExample: "=TAKE(SORTBY(A2:G20, C2:C20, 1, F2:F20, -1), 5)"
  },
  {
    question: "How do you sort by a boolean condition (e.g. Active employees first, Inactive second)?",
    shortAnswer: "Use the boolean column with sort_order = -1 (TRUE/1 first, FALSE/0 second).",
    explanation: "Because `TRUE = 1` and `FALSE = 0`, sorting descending (`-1`) brings all active TRUE records to the top.",
    hint: "Sort boolean column with -1 to put TRUE records at the top.",
    level: "moderate",
    codeExample: "=SORTBY(A2:E20, E2:E20=\"Active\", -1, B2:B20, 1)"
  },
  {
    question: "How do you sort an array by multiple external rating columns hosted on a different worksheet?",
    shortAnswer: "Reference the external worksheet ranges in by_array arguments: =SORTBY(A2:D20, Ratings!B2:B20, -1, Ratings!C2:C20, -1).",
    explanation: "As long as the external ranges share matching row counts, `SORTBY` evaluates cross-sheet auxiliary columns seamlessly.",
    hint: "Use SheetName!Range in by_array arguments.",
    level: "advanced",
    codeExample: "=SORTBY(SummarySheet!A2:D20, AuditSheet!G2:G20, -1)"
  },
  {
    question: "What is the computational complexity of multi-level SORTBY in Excel?",
    shortAnswer: "O(K * N log N), where N is row count and K is the number of sort tiers.",
    explanation: "Excel uses multi-pass stable quicksort in compiled C++, completing 3-tier sorts on 50,000 rows in less than 25 milliseconds.",
    hint: "Runs in fast O(K * N log N) time in native C++.",
    level: "expert",
    codeExample: "// 50,000 rows sorted on 3 levels in < 25ms"
  },
  {
    question: "How do you sort customers by Last Name when names are stored as 'First Last' in a single cell?",
    shortAnswer: "Use TEXTAFTER inside SORTBY: =SORTBY(A2:A20, TEXTAFTER(A2:A20, \" \"), 1).",
    explanation: "`TEXTAFTER(A2:A20, \" \")` extracts the last name in memory, allowing `SORTBY` to sort by surname alphabetically without altering source text.",
    hint: "Use TEXTAFTER(Range, \" \") as the by_array.",
    level: "expert",
    codeExample: "=SORTBY(CustomerNames, TEXTAFTER(CustomerNames, \" \"), 1)"
  },
  {
    question: "How do you sort a matrix by row sum totals descending without creating a total column on the sheet?",
    shortAnswer: "Use BYROW with SUM as the by_array: =SORTBY(A2:E20, BYROW(B2:E20, LAMBDA(r, SUM(r))), -1).",
    explanation: "`BYROW` calculates the row total dynamically in memory, and `SORTBY` ranks the table by those live sums.",
    hint: "Use BYROW(Matrix, LAMBDA(r, SUM(r))) as the by_array.",
    level: "expert",
    codeExample: "=SORTBY(A2:E20, BYROW(B2:E20, LAMBDA(row, SUM(row))), -1)"
  },
  {
    question: "What happens if a source row contains identical values across all specified by_array tiers?",
    shortAnswer: "Excel preserves the original relative arrival order of the tied records (stable sort).",
    explanation: "Ties that persist through all sorting tiers retain their chronological order from the raw dataset.",
    hint: "Tied records preserve their original entry order.",
    level: "moderate",
    codeExample: "// Tied records remain in original relative order"
  },
  {
    question: "Can SORTBY be nested inside DROP or EXPAND functions for advanced matrix reshaping?",
    shortAnswer: "Yes, dynamic array functions compose seamlessly without limitation.",
    explanation: "You can sort a dataset with `SORTBY`, drop top header outliers with `DROP`, and expand dimensions with `EXPAND`.",
    hint: "Dynamic array functions nest cleanly into single-cell pipelines.",
    level: "expert",
    codeExample: "=DROP(SORTBY(A2:D20, D2:D20, -1), 1) // Drops highest outlier"
  },
  {
    question: "How do you sort dates by Day of Week (Monday to Sunday) regardless of calendar year?",
    shortAnswer: "Use WEEKDAY with return type 2: =SORTBY(A2:D20, WEEKDAY(B2:B20, 2), 1).",
    explanation: "`WEEKDAY(Dates, 2)` maps Mondays to 1 and Sundays to 7, sorting records by day-of-week sequence.",
    hint: "Use WEEKDAY(DateRange, 2) in by_array.",
    level: "advanced",
    codeExample: "=SORTBY(VoucherLog, WEEKDAY(VoucherDates, 2), 1)"
  },
  {
    question: "How do you sort products by profit margin percentage without adding a margin column to raw data?",
    shortAnswer: "Supply the margin equation directly as the by_array: =SORTBY(A2:D20, (D2:D20 - C2:C20) / D2:D20, -1).",
    explanation: "`SORTBY` computes `(Revenue - Cost) / Revenue` in memory and ranks products from highest margin percentage to lowest.",
    hint: "Supply arithmetic expressions directly in the by_array parameter.",
    level: "advanced",
    codeExample: "=SORTBY(ProductTable, (PriceCol - CostCol) / PriceCol, -1)"
  },
  {
    question: "Why is SORTBY the preferred tool for enterprise HR and Payroll hierarchy modeling?",
    shortAnswer: "It allows multi-tiered grouping by Division, Department, Seniority Grade, and Compensation in a single live equation.",
    explanation: "In complex corporate HR systems across Barrackpore, Shyamnagar, and Kolkata, `SORTBY` organizes entire payroll rosters into structured management hierarchies with 100% calculation reliability.",
    hint: "SORTBY enables multi-tiered enterprise hierarchy structuring with zero VBA.",
    level: "expert",
    codeExample: "// Hierarchy: Division (Asc) → Grade (Custom Match) → CTC (Desc)"
  }
];

export default questions;
