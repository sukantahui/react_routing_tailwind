// topic3_questions.js
// 30 Structured Questions covering the FILTER Function & Multi-Condition Array Logic

const questions = [
  {
    question: "What is the primary function of the FILTER function in Microsoft Excel 365?",
    shortAnswer: "To dynamically extract and spill rows or columns from a dataset that satisfy one or more specified boolean criteria.",
    explanation: "The `FILTER` function accepts a source array, evaluates a boolean condition array for each row/column, and automatically returns all matching records into a new spilled matrix without altering or hiding raw data rows.",
    hint: "Think of an automated, formula-driven replacement for AutoFilter and Advanced Filter.",
    level: "basic",
    codeExample: "=FILTER(A2:G20, C2:C20=\"Barrackpore\")"
  },
  {
    question: "What is the complete syntax of the FILTER function?",
    shortAnswer: "=FILTER(array, include, [if_empty])",
    explanation: "`array` is the data block to filter; `include` is a boolean array of TRUE/FALSE values matching the height/width of `array`; `[if_empty]` is an optional fallback value returned if no rows satisfy the criteria.",
    hint: "Array to filter, Boolean criteria array, and optional fallback value.",
    level: "basic",
    codeExample: "=FILTER(A2:D20, D2:D20>50000, \"No Sales Above 50K\")"
  },
  {
    question: "Why can't you use standard AND() or OR() functions inside the `include` argument of FILTER?",
    shortAnswer: "AND() and OR() aggregate multiple values into a single scalar TRUE/FALSE, preventing row-by-row array evaluation.",
    explanation: "In Excel, `AND(range1=\"A\", range2=\"B\")` returns a single TRUE or FALSE for the entire table rather than an array of boolean flags per row. In dynamic arrays, you must use boolean arithmetic (* for AND, + for OR) to generate an array of boolean values.",
    hint: "AND/OR collapse arrays into a single value instead of evaluating row by row.",
    level: "moderate",
    codeExample: "// Incorrect: =FILTER(A2:D20, AND(B2:B20=\"X\", C2:C20>10))\n// Correct: =FILTER(A2:D20, (B2:B20=\"X\") * (C2:C20>10))"
  },
  {
    question: "How do you enforce 'AND' logic (all conditions must be met) across multiple criteria in FILTER?",
    shortAnswer: "Multiply each condition array enclosed in parentheses using the multiplication (*) operator.",
    explanation: "When boolean expressions are multiplied: `(Condition1) * (Condition2)`, Excel converts TRUE to 1 and FALSE to 0. A row returns 1 (TRUE) only if both conditions are TRUE (1 * 1 = 1). If either condition is FALSE (1 * 0 = 0), the row is excluded.",
    hint: "Multiply boolean conditions: (A) * (B).",
    level: "moderate",
    codeExample: "=FILTER(A2:H20, (C2:C20=\"Barrackpore\") * (G2:G20>=75000))"
  },
  {
    question: "How do you enforce 'OR' logic (any condition can be met) in the FILTER function?",
    shortAnswer: "Add each condition array enclosed in parentheses using the addition (+) operator.",
    explanation: "When boolean expressions are added: `(Condition1) + (Condition2)`, if either condition is TRUE, the sum is >= 1, which the `include` argument evaluates as TRUE (matching). Only if both are FALSE (0 + 0 = 0) is the row excluded.",
    hint: "Add boolean conditions: (A) + (B).",
    level: "moderate",
    codeExample: "=FILTER(A2:H20, (C2:C20=\"Barrackpore\") + (C2:C20=\"Shyamnagar\"))"
  },
  {
    question: "What error occurs if no records meet the FILTER criteria and the `[if_empty]` argument is omitted?",
    shortAnswer: "Excel returns a #CALC! (Calculation Error: Empty Array) error.",
    explanation: "When zero rows evaluate to TRUE, the calculation engine has no elements to construct an output array. Omitting the 3rd argument causes Excel to raise `#CALC!`. Supplying `\"No Records Found\"` avoids the error.",
    hint: "Always supply the 3rd argument to handle zero-match results gracefully.",
    level: "basic",
    codeExample: "=FILTER(A2:D20, B2:B20=\"NonExistent\", \"No Matching Records\")"
  },
  {
    question: "How do you combine both AND and OR logic in a single compound FILTER formula?",
    shortAnswer: "Use parentheses to group OR additions inside AND multiplications.",
    explanation: "To filter for records in Barrackpore OR Shyamnagar that ALSO have revenue > ₹50,000: `=FILTER(A2:H20, ((C2:C20=\"Barrackpore\") + (C2:C20=\"Shyamnagar\")) * (G2:G20>50000), \"No Matches\")`.",
    hint: "Group OR conditions in parentheses: ((A) + (B)) * (C).",
    level: "advanced",
    codeExample: "=FILTER(A2:G20, ((C2:C20=\"Barrackpore\") + (C2:C20=\"Ichapur\")) * (H2:H20=\"Delivered\"))"
  },
  {
    question: "How do you filter data based on partial text matching or contains search (e.g. course title contains 'Python')?",
    shortAnswer: "Combine ISNUMBER and SEARCH in the include argument: ISNUMBER(SEARCH(\"Python\", D2:D20)).",
    explanation: "`SEARCH(\"Python\", D2:D20)` returns the starting character number if found, or `#VALUE!` if not found. `ISNUMBER()` converts valid positions to TRUE and errors to FALSE, creating a boolean array for FILTER.",
    hint: "Use ISNUMBER(SEARCH(\"text\", Range)).",
    level: "advanced",
    codeExample: "=FILTER(A2:H20, ISNUMBER(SEARCH(\"Python\", D2:D20)), \"No Python Courses\")"
  },
  {
    question: "How do you filter for records within a dynamic date range (e.g. between Start_Date and End_Date)?",
    shortAnswer: "Multiply date comparisons: (DateCol >= StartDate) * (DateCol <= EndDate).",
    explanation: "Excel evaluates serial date numbers row-by-row. Multiplying `(A2:A100 >= Date1) * (A2:A100 <= Date2)` isolates records falling strictly inside the date window.",
    hint: "Use (Date >= Start) * (Date <= End).",
    level: "moderate",
    codeExample: "=FILTER(A2:H20, (B2:B20>=DATE(2026,1,1)) * (B2:B20<=DATE(2026,3,31)))"
  },
  {
    question: "How do you sort the results returned by a FILTER formula in descending order?",
    shortAnswer: "Wrap the FILTER formula inside the SORT function: =SORT(FILTER(...), SortIndex, -1).",
    explanation: "`FILTER` produces the matching rows in memory, and `SORT` orders the resulting spilled matrix by the specified column index (e.g., column 7 descending `-1`).",
    hint: "Wrap FILTER inside SORT(..., col_index, -1).",
    level: "moderate",
    codeExample: "=SORT(FILTER(A2:H20, C2:C20=\"Barrackpore\"), 7, -1)"
  },
  {
    question: "How do you return only specific columns (e.g. columns 1, 2, and 7) from a wide table using FILTER?",
    shortAnswer: "Combine FILTER with CHOOSECOLS: =CHOOSECOLS(FILTER(A2:H20, Criteria), 1, 2, 7).",
    explanation: "Instead of outputting all 8 columns, `CHOOSECOLS` extracts only the specified column positions from the filtered spilled matrix.",
    hint: "Use CHOOSECOLS(FILTER(...), col1, col2, col3).",
    level: "advanced",
    codeExample: "=CHOOSECOLS(FILTER(A2:H20, C2:C20=\"Barrackpore\"), 1, 2, 7)"
  },
  {
    question: "Can you filter horizontally across columns instead of down rows?",
    shortAnswer: "Yes, by passing a horizontal array to `array` and a 1-row boolean array to `include`.",
    explanation: "If data is structured in columns across `B1:Z10`, supplying an `include` condition across row 1 `(B1:Z1=\"Q1\")` filters out unwanted columns and spills matching columns horizontally.",
    hint: "Pass horizontal ranges for both array and include.",
    level: "advanced",
    codeExample: "=FILTER(B1:M10, B1:M1=\"2026\")"
  },
  {
    question: "What happens if the `include` argument has a different row count than the `array` argument?",
    shortAnswer: "Excel returns a #VALUE! error because array dimensions do not match.",
    explanation: "The `include` boolean criteria array must have the identical number of rows (or columns) as the source `array`. If `array` is `A2:D20` (19 rows) and `include` is `E2:E25` (24 rows), `#VALUE!` is returned.",
    hint: "Source range and criteria range must have the exact same row count.",
    level: "basic",
    codeExample: "// A2:D20 (19 rows) vs E2:E25 (24 rows) -> #VALUE!"
  },
  {
    question: "How do you filter for records that are NOT equal to a certain value (e.g. excluding 'Cancelled')?",
    shortAnswer: "Use the not-equal operator (<>): =FILTER(A2:H20, H2:H20<>\"Cancelled\").",
    explanation: "The `<>` operator evaluates to TRUE for all rows whose status is anything other than 'Cancelled', filtering out the unwanted category.",
    hint: "Use <> to exclude specific text.",
    level: "basic",
    codeExample: "=FILTER(A2:H20, I2:I20<>\"Cancelled\")"
  },
  {
    question: "How do you filter for non-blank / non-empty rows in a dataset?",
    shortAnswer: "Use `<>\"\"`: =FILTER(A2:H20, A2:A20<>\"\").",
    explanation: "This condition evaluates to TRUE for every cell that contains data, stripping out empty padding rows from dynamic ranges.",
    hint: "Use Range<>\"\" to eliminate blank rows.",
    level: "basic",
    codeExample: "=FILTER(A2:G100, A2:A100<>\"\")"
  },
  {
    question: "How do you count the total number of records that match a FILTER condition?",
    shortAnswer: "Use =ROWS(FILTER(A2:D20, Criteria)) or =COUNTA(CHOOSECOLS(FILTER(...), 1)).",
    explanation: "`ROWS` inspects the vertical dimensions of the filtered matrix directly in memory, providing a live count of matching records.",
    hint: "Use ROWS(FILTER(...)) to count filtered records.",
    level: "moderate",
    codeExample: "=ROWS(FILTER(A2:A20, C2:C20=\"Barrackpore\", \"\"))"
  },
  {
    question: "How can you build an interactive search filter connected to a user input cell (e.g. cell J1)?",
    shortAnswer: "Use `=FILTER(A2:H20, (J1=\"\") + ISNUMBER(SEARCH(J1, B2:B20)), \"No Matches\")`.",
    explanation: "The `(J1=\"\") +` clause ensures that if the search box is blank, the equation evaluates to TRUE and returns all records. When a keyword is typed into `J1`, it dynamically filters matching records.",
    hint: "Add (SearchCell=\"\") + to show all records when search box is empty.",
    level: "expert",
    codeExample: "=FILTER(A2:H20, (J1=\"\") + (C2:C20=J1), \"No Records Found\")"
  },
  {
    question: "How do you filter a dataset based on values contained in a secondary list of approved IDs?",
    shortAnswer: "Combine FILTER with ISNUMBER and MATCH: =FILTER(A2:D20, ISNUMBER(MATCH(A2:A20, ApprovedIDs, 0))).",
    explanation: "`MATCH(A2:A20, ApprovedIDs, 0)` checks each ID against the approved master list. `ISNUMBER` turns valid matches into TRUE and unmatched into FALSE, allowing FILTER to stream only approved rows.",
    hint: "Use ISNUMBER(MATCH(Keys, AllowedList, 0)) in the include argument.",
    level: "expert",
    codeExample: "=FILTER(A2:H20, ISNUMBER(MATCH(A2:A20, VIP_List, 0)))"
  },
  {
    question: "How do you calculate the total sum of filtered values without outputting the filtered rows onto the worksheet?",
    shortAnswer: "Wrap FILTER inside SUM: =SUM(FILTER(RevenueCol, Criteria)).",
    explanation: "Because `FILTER` returns an in-memory array, wrapping it in `=SUM()` computes the aggregate sum directly in a single cell without intermediate helper columns.",
    hint: "Pass FILTER directly into SUM() or AVERAGE().",
    level: "moderate",
    codeExample: "=SUM(FILTER(G2:G20, C2:C20=\"Barrackpore\"))"
  },
  {
    question: "What is the difference between =SUMIFS() and =SUM(FILTER()) in modern Excel?",
    shortAnswer: "SUMIFS supports simple range conditions; SUM(FILTER()) supports complex boolean logic, regex, substring searches, and array transformations.",
    explanation: "While `SUMIFS` is fast for standard criteria, `SUM(FILTER())` allows complex expressions like `SEARCH()`, `OR` logic, array reshaping, and dynamic criteria that `SUMIFS` cannot handle.",
    hint: "SUM(FILTER()) handles complex logical conditions impossible in SUMIFS.",
    level: "advanced",
    codeExample: "=SUM(FILTER(G2:G20, ISNUMBER(SEARCH(\"Excel\", D2:D20))))"
  },
  {
    question: "How do you extract the Top 5 highest revenue records using FILTER and SORT?",
    shortAnswer: "Use CHOOSEROWS or TAKE on the sorted filter: =TAKE(SORT(FILTER(A2:H20, C2:C20=\"Barrackpore\"), 7, -1), 5).",
    explanation: "`FILTER` gets Barrackpore rows, `SORT` ranks them by revenue descending (-1), and `TAKE(..., 5)` keeps strictly the top 5 records.",
    hint: "Use TAKE(SORT(FILTER(...), Col, -1), 5).",
    level: "expert",
    codeExample: "=TAKE(SORT(FILTER(A2:H20, C2:C20=\"Barrackpore\"), 7, -1), 5)"
  },
  {
    question: "How do you filter for records where numerical values are greater than the average of that column?",
    shortAnswer: "Use `=FILTER(A2:H20, G2:G20 > AVERAGE(G2:G20))`.",
    explanation: "Excel computes `AVERAGE(G2:G20)` dynamically, compares each row's revenue against that benchmark, and spills all above-average records.",
    hint: "Compare the column range directly against AVERAGE(Range).",
    level: "moderate",
    codeExample: "=FILTER(A2:H20, G2:G20 > AVERAGE(G2:G20))"
  },
  {
    question: "What happens if the destination for a FILTER output contains a merged cell?",
    shortAnswer: "The formula returns a #SPILL! error because dynamic arrays cannot populate merged cells.",
    explanation: "All dynamic arrays require individual rectangular grid cells. Any merged cell in the spill area halts calculation and raises `#SPILL!`.",
    hint: "Unmerge all destination cells.",
    level: "basic",
    codeExample: "// Unmerge cells in destination area to allow FILTER to spill"
  },
  {
    question: "Can you filter a table using multiple dropdown criteria where dropdowns can be optionally left blank?",
    shortAnswer: "Yes, using the pattern: `((Dropdown1=\"\") + (Col1=Dropdown1)) * ((Dropdown2=\"\") + (Col2=Dropdown2))`.",
    explanation: "Each criteria block evaluates to TRUE if the dropdown is blank OR if the column matches the dropdown selection. Multiplying them enforces multi-filter dashboard logic.",
    hint: "Use ((Cell=\"\") + (Range=Cell)) * ... for optional multi-select filters.",
    level: "expert",
    codeExample: "=FILTER(A2:H20, ((J1=\"\")+(C2:C20=J1)) * ((J2=\"\")+(D2:D20=J2)), \"No Matches\")"
  },
  {
    question: "How do you filter for odd or even numbered rows using the FILTER function?",
    shortAnswer: "Use ISODD or ISEVEN with ROW: =FILTER(A2:H20, ISODD(ROW(A2:A20))).",
    explanation: "`ROW(A2:A20)` generates row numbers, and `ISODD` creates an alternating boolean pattern [TRUE, FALSE, TRUE...], extracting every alternate row.",
    hint: "Combine ISODD(ROW(Range)) in the include parameter.",
    level: "advanced",
    codeExample: "=FILTER(A2:H20, ISODD(ROW(A2:A20)))"
  },
  {
    question: "How does FILTER handle error values (#N/A, #DIV/0!) present in the source array?",
    shortAnswer: "Errors in the source array are returned in their corresponding positions unless cleaned with IFERROR or IFNA.",
    explanation: "`FILTER` preserves raw values as-is. If row 5 has a `#DIV/0!` in the data, it will be included in the spilled output if that row meets the condition.",
    hint: "Clean data with IFERROR or FILTER(IFERROR(Data, 0), Criteria).",
    level: "moderate",
    codeExample: "=FILTER(IFERROR(A2:H20, \"N/A\"), C2:C20=\"Barrackpore\")"
  },
  {
    question: "Can you reference a filtered spilled array downstream using the '#' operator?",
    shortAnswer: "Yes, if the FILTER formula is in cell J2, referencing J2# dynamically binds to all filtered rows.",
    explanation: "Downstream formulas like `=SUM(J2#)` or `=CHOOSECOLS(J2#, 1)` will automatically adapt as different filter criteria are applied.",
    hint: "Use OriginCell# to reference all filtered rows.",
    level: "basic",
    codeExample: "=AVERAGE(CHOOSECOLS(J2#, 7))"
  },
  {
    question: "How do you filter text case-sensitively using the FILTER function?",
    shortAnswer: "Use the EXACT function in the include argument: =FILTER(A2:H20, EXACT(C2:C20, \"BARRACKPORE\")).",
    explanation: "While `=` is case-insensitive, `EXACT()` enforces binary case matching, returning TRUE only for identical character casing.",
    hint: "Use EXACT(Range, \"Target\") for strict case-sensitive filtering.",
    level: "advanced",
    codeExample: "=FILTER(A2:H20, EXACT(C2:C20, \"Barrackpore\"))"
  },
  {
    question: "How do you extract unique values from a filtered dataset in one step?",
    shortAnswer: "Nest FILTER inside UNIQUE: =UNIQUE(FILTER(A2:A100, Criteria)).",
    explanation: "`FILTER` extracts the subset of records matching the criteria, and `UNIQUE` deduplicates the resulting list.",
    hint: "Wrap FILTER inside UNIQUE.",
    level: "moderate",
    codeExample: "=SORT(UNIQUE(FILTER(B2:B20, C2:C20=\"Barrackpore\")))"
  },
  {
    question: "Why is the FILTER function considered the cornerstone of modern no-code interactive Excel applications?",
    shortAnswer: "It replaces complex VBA macro filtering and static AutoFilters with live, non-destructive, reactive data pipelines.",
    explanation: "With `FILTER`, business analysts can build real-time interactive search portals, dynamic drill-down reports, and executive KPI summaries that react instantaneously to user inputs with 100% calculation reliability.",
    hint: "FILTER enables fully reactive, live dashboard pipelines with zero VBA code.",
    level: "expert",
    codeExample: "// Complete Pipeline: Input Cell -> FILTER -> SORT -> KPI Cards (Zero VBA)"
  }
];

export default questions;
