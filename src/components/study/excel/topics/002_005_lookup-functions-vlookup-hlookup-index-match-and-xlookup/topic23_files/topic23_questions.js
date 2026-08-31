// topic23_questions.js - 30 Comprehensive Practice & Viva Questions
// Topic 19: Practice These Topics: Multi-Criteria Two-Way Dynamic Lookup Hub
// Module: 002_005_lookup-functions-vlookup-hlookup-index-match-and-xlookup

const questions = [
  {
    question: "What are the four essential arguments of the standard `VLOOKUP` function in Excel?",
    shortAnswer: "`=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])`",
    explanation: "1) lookup_value (key to find), 2) table_array (lookup range), 3) col_index_num (column position to return), 4) range_lookup (FALSE for exact match, TRUE for approximate).",
    hint: "lookup_value, table_array, col_index_num, range_lookup (FALSE for exact).",
    level: "basic",
    codeExample: "=VLOOKUP(A2, tbl_Staff, 3, FALSE)"
  },
  {
    question: "Why should you virtually always set the 4th argument of `VLOOKUP` to `FALSE` (or `0`) in business applications?",
    shortAnswer: "To enforce an exact match; setting it to `TRUE` or omitting it performs an approximate match, which returns incorrect records if data is not sorted ascending.",
    explanation: "Financial, employee, and inventory lookups demand exact key matches to avoid data corruption.",
    hint: "FALSE guarantees exact matching; prevents accidental approximate errors.",
    level: "basic",
    codeExample: "=VLOOKUP(E2, A2:D100, 4, FALSE)"
  },
  {
    question: "What is the primary architectural limitation of `VLOOKUP` compared to `INDEX-MATCH` and `XLOOKUP`?",
    shortAnswer: "`VLOOKUP` cannot look to the left (the lookup key must be in the first column of table_array) and hardcoded column numbers break when columns are inserted.",
    explanation: "Inserting a column into a VLOOKUP table array causes formulas referencing static numbers (e.g. 3) to return incorrect column data.",
    hint: "VLOOKUP cannot look left and static column numbers break on grid modifications.",
    level: "basic",
    codeExample: "VLOOKUP limitation: Static col_index_num and right-only lookups."
  },
  {
    question: "How does the `INDEX-MATCH` combination perform a dynamic lookup in Excel?",
    shortAnswer: "`MATCH` finds the row coordinate of the lookup value, and `INDEX` returns the cell value at that row position from the return column.",
    explanation: "`=INDEX(Return_Column, MATCH(Lookup_Value, Key_Column, 0))`",
    hint: "INDEX retrieves the value; MATCH finds the row coordinate.",
    level: "moderate",
    codeExample: "=INDEX(C2:C100, MATCH(E2, A2:A100, 0))"
  },
  {
    question: "How do you construct a Two-Way Matrix Lookup using `INDEX` with two `MATCH` functions?",
    shortAnswer: "`=INDEX(MatrixRange, MATCH(RowKey, RowHeaders, 0), MATCH(ColKey, ColHeaders, 0))`",
    explanation: "The first MATCH identifies the row index; the second MATCH identifies the column index in the 2D grid.",
    hint: "INDEX(Grid, MATCH(RowKey), MATCH(ColKey))",
    level: "moderate",
    codeExample: "=INDEX(B2:M50, MATCH(P2, A2:A50, 0), MATCH(Q2, B1:M1, 0))"
  },
  {
    question: "What makes `XLOOKUP` the universal successor to `VLOOKUP`, `HLOOKUP`, and `INDEX-MATCH`?",
    shortAnswer: "`XLOOKUP` defaults to exact match, looks in any direction (left, right, up, down), includes built-in `[if_not_found]` error handling, and supports reverse search.",
    explanation: "Introduced in Excel 365, XLOOKUP eliminates column index numbers and requires separate lookup and return vectors.",
    hint: "Defaults to exact match, looks in any direction, and handles errors natively.",
    level: "basic",
    codeExample: "=XLOOKUP(E2, A2:A100, D2:D100, \"Not Found\")"
  },
  {
    question: "How do you perform a multi-criteria lookup in `XLOOKUP` using Boolean array logic?",
    shortAnswer: "`=XLOOKUP(1, (Range1 = Crit1) * (Range2 = Crit2), ReturnRange, \"Not Found\")`",
    explanation: "Multiplying two Boolean arrays generates an array of 1s and 0s; searching for `1` finds the record matching both conditions.",
    hint: "XLOOKUP(1, (Range1=Val1)*(Range2=Val2), ReturnRange)",
    level: "advanced",
    codeExample: "=XLOOKUP(1, (tbl_Staff[Branch]=\"Barrackpore\") * (tbl_Staff[Dept]=\"IT\"), tbl_Staff[Salary])"
  },
  {
    question: "How do you return multiple adjacent columns simultaneously in a single `XLOOKUP` formula?",
    shortAnswer: "Specify a multi-column range as the `return_array` argument (e.g. `C2:F100`); XLOOKUP will dynamically spill all columns across the row.",
    explanation: "Excel 365 dynamic array engine spills all requested columns horizontally from a single formula.",
    hint: "Pass a multi-column range to return_array.",
    level: "moderate",
    codeExample: "=XLOOKUP(A2, tbl_Products[SKU], tbl_Products[[Name]:[Price]])"
  },
  {
    question: "What causes the `#N/A` error in lookup functions?",
    shortAnswer: "The lookup value was not found in the search range (or there are mismatched data types, e.g. text '101' vs number 101, or hidden trailing spaces).",
    explanation: "#N/A stands for 'Not Available'. Trailing spaces and data type mismatches are the leading causes.",
    hint: "#N/A indicates lookup value does not exist or has datatype/space mismatch.",
    level: "basic",
    codeExample: "Fix: Use TRIM(CLEAN(A2)) or check numeric vs text format."
  },
  {
    question: "How do you clean hidden spaces in lookup keys dynamically inside a formula?",
    shortAnswer: "Wrap the lookup value or range in `TRIM(CLEAN(...))` (e.g. `=XLOOKUP(TRIM(A2), TRIM(KeyRange), ReturnRange)`).",
    explanation: "TRIM eliminates leading, trailing, and excessive internal spaces; CLEAN strips non-printable ASCII characters.",
    hint: "TRIM removes spaces; CLEAN removes non-printable characters.",
    level: "moderate",
    codeExample: "=XLOOKUP(TRIM(A2), TRIM(tbl_Master[Code]), tbl_Master[Value])"
  },
  {
    question: "How do you perform an approximate match lookup for tax slab brackets in `VLOOKUP`?",
    shortAnswer: "Ensure the reference table's first column is sorted in ASCENDING order and set the 4th argument to `TRUE` (or `1`).",
    explanation: "Approximate VLOOKUP scans down the sorted list and stops at the largest value less than or equal to the lookup value.",
    hint: "Ascending sort required; 4th argument set to TRUE.",
    level: "moderate",
    codeExample: "=VLOOKUP(Income, TaxBracketTable, 2, TRUE)"
  },
  {
    question: "How does `XLOOKUP` handle approximate match search modes via its 5th argument `[match_mode]`?",
    shortAnswer: "`0` = Exact match (default), `-1` = Exact match or next smaller item, `1` = Exact match or next larger item, `2` = Wildcard match.",
    explanation: "Unlike VLOOKUP, XLOOKUP match_mode `-1` or `1` does NOT require the lookup table to be strictly sorted.",
    hint: "0=Exact, -1=Next Smaller, 1=Next Larger, 2=Wildcard.",
    level: "moderate",
    codeExample: "=XLOOKUP(Score, ScaleRange, GradeRange, , -1)"
  },
  {
    question: "How do you perform a Wildcard Lookup in `XLOOKUP`?",
    shortAnswer: "Include wildcard characters `*` or `?` in the lookup value and set the 5th argument `[match_mode]` to `2`.",
    explanation: "`*` matches any sequence of characters; `?` matches a single character.",
    hint: "Set match_mode to 2 for wildcard lookups in XLOOKUP.",
    level: "moderate",
    codeExample: "=XLOOKUP(\"*Precision*\", tbl_SKU[Desc], tbl_SKU[Price], \"Not Found\", 2)"
  },
  {
    question: "How do you search from bottom-to-top (last occurrence) in `XLOOKUP`?",
    shortAnswer: "Set the 6th argument `[search_mode]` to `-1` (Search last-to-first).",
    explanation: "Essential for extracting the most recent transaction or latest invoice date in chronological ledgers.",
    hint: "Set search_mode to -1 for reverse bottom-up lookup.",
    level: "moderate",
    codeExample: "=XLOOKUP(CustomerID, tbl_Orders[CustID], tbl_Orders[OrderDate], , 0, -1)"
  },
  {
    question: "What is the difference between `VLOOKUP` and `HLOOKUP`?",
    shortAnswer: "`VLOOKUP` searches vertically down the first column of a table; `HLOOKUP` searches horizontally across the first row of a table.",
    explanation: "HLOOKUP is used for horizontally transposed datasets where categories are headers in row 1.",
    hint: "VLOOKUP = Vertical; HLOOKUP = Horizontal.",
    level: "basic",
    codeExample: "=HLOOKUP(QuarterKey, Row1:Row5, 4, FALSE)"
  },
  {
    question: "Why should you avoid hardcoding range coordinates (`A2:D500`) instead of using structured tables in lookups?",
    shortAnswer: "Static ranges do not expand when new records are added, causing new transactions to be missed by lookup formulas.",
    explanation: "Referencing structured tables (`tbl_Staff[ID]`) ensures automatic inclusion of appended rows.",
    hint: "Tables automatically expand lookup boundaries when rows are added.",
    level: "basic",
    codeExample: "=XLOOKUP(A2, tbl_Staff[ID], tbl_Staff[Salary])"
  },
  {
    question: "How do you safely wrap legacy `VLOOKUP` formulas against missing key errors?",
    shortAnswer: "Wrap inside `IFERROR(...)` (e.g. `=IFERROR(VLOOKUP(A2, Table, 2, FALSE), \"Not Found\")`).",
    explanation: "Catches #N/A errors and displays a user-friendly default message.",
    hint: "Use IFERROR(VLOOKUP(...), \"Not Found\").",
    level: "basic",
    codeExample: "=IFERROR(VLOOKUP(A2, Table, 2, FALSE), \"Not Found\")"
  },
  {
    question: "What is Binary Search mode in `XLOOKUP` and when should it be used?",
    shortAnswer: "`search_mode = 2` (Ascending) or `-2` (Descending) uses binary search algorithm (O(log n)), executing lookups across 1,000,000 rows in milliseconds.",
    explanation: "Requires strictly sorted data but provides maximum possible lookup speed on massive enterprise datasets.",
    hint: "Binary search (mode 2) offers high-speed lookups on large sorted arrays.",
    level: "advanced",
    codeExample: "=XLOOKUP(ID, tbl_BigData[ID], tbl_BigData[Val], , 0, 2)"
  },
  {
    question: "How does `CHOOSEROWS` combine with `XLOOKUP` in dynamic dashboard modeling?",
    shortAnswer: "`CHOOSEROWS` extracts specific filtered rows from the dynamic array returned by `XLOOKUP` or `FILTER`.",
    explanation: "Allows precise matrix slicing in next-generation Excel 365 dashboards.",
    hint: "CHOOSEROWS slices specific row indices from spilled lookups.",
    level: "advanced",
    codeExample: "=CHOOSEROWS(XLOOKUP(Key, Keys, Matrix), 1)"
  },
  {
    question: "Why does converting a lookup table to an Excel Table (`Ctrl + T`) eliminate formula maintenance?",
    shortAnswer: "Because structured references update column bindings automatically even if columns are moved, inserted, or renamed.",
    explanation: "Eliminates broken formulas caused by static column index shifts.",
    hint: "Structured table references bind dynamically by field name.",
    level: "basic",
    codeExample: "Ctrl + T → Use Table[Column] syntax."
  },
  {
    question: "How do you perform a cross-sheet lookup in Excel?",
    shortAnswer: "Reference the sheet name followed by an exclamation mark before the range: `='SheetName'!A2:B100`.",
    explanation: "Enables centralizing reference dimension tables in separate dedicated master sheets.",
    hint: "Use SheetName!Range syntax.",
    level: "basic",
    codeExample: "=XLOOKUP(A2, MasterData!A2:A100, MasterData!C2:C100)"
  },
  {
    question: "What is the result of `=MATCH(\"Kolkata\", {\"Barrackpore\", \"Kolkata\", \"Shyamnagar\"}, 0)`?",
    shortAnswer: "`2` (the 1-indexed relative position of 'Kolkata' in the array).",
    explanation: "MATCH always returns the ordinal position index of the matching item.",
    hint: "MATCH returns the relative numerical position index.",
    level: "basic",
    codeExample: "MATCH(\"Kolkata\", Array, 0) → 2"
  },
  {
    question: "How do you perform a Case-Sensitive Lookup in Excel?",
    shortAnswer: "Use `=XLOOKUP(TRUE, EXACT(LookupValue, KeyRange), ReturnRange, \"Not Found\")`.",
    explanation: "`EXACT` evaluates case sensitivity (e.g. 'ABC' vs 'abc') and returns TRUE for exact case match.",
    hint: "Use EXACT(Val, Range) inside XLOOKUP or INDEX-MATCH.",
    level: "advanced",
    codeExample: "=XLOOKUP(TRUE, EXACT(A2, tbl_SKU[Code]), tbl_SKU[Price])"
  },
  {
    question: "Why should you never use whole-column references like `VLOOKUP(A2, A:D, 4, FALSE)` in large models?",
    shortAnswer: "Whole column references force Excel's calculation engine to evaluate over 1,048,576 cells, degrading workbook recalculation speed.",
    explanation: "Use structured table references (`tbl_Data`) or bounded ranges (`A2:D500`) to maintain performance.",
    hint: "Whole-column references force evaluation of 1 million cells.",
    level: "moderate",
    codeExample: "Use tbl_Data[Col] instead of A:D."
  },
  {
    question: "What is a Two-Way Left Lookup and why does `VLOOKUP` fail on it?",
    shortAnswer: "Retrieving data from a column located to the left of the lookup key column; VLOOKUP only searches column 1 and looks right.",
    explanation: "INDEX-MATCH and XLOOKUP decouple search and return vectors, allowing left lookups effortlessly.",
    hint: "Left lookup retrieves columns before the key column.",
    level: "basic",
    codeExample: "=XLOOKUP(ID, tbl_Data[Key_Col], tbl_Data[Left_Col])"
  },
  {
    question: "How do you link a Data Validation dropdown list to a dynamic lookup table?",
    shortAnswer: "Data → Data Validation → List → Source: `=INDIRECT(\"tbl_Products[SKU]\")` or `=Sheet1!$A$2:$A$50`.",
    explanation: "Constrains user input to valid keys, eliminating lookup #N/A typos.",
    hint: "Data Validation → List → Reference Key Column.",
    level: "moderate",
    codeExample: "Data Validation → List → =tbl_Products[SKU]"
  },
  {
    question: "What is the difference between `INDEX(Array, Row, Col)` when Col is omitted on a 1D vertical array?",
    shortAnswer: "When Array is a single 1D vertical column, the second argument acts as the row index, and the column argument is omitted.",
    explanation: "`=INDEX(C2:C50, 5)` returns the 5th cell in that column range.",
    hint: "In a single column array, INDEX only requires the row number.",
    level: "basic",
    codeExample: "=INDEX(C2:C50, 5)"
  },
  {
    question: "How do you perform a lookup that returns a default value of 0 instead of `#N/A` for arithmetic formulas?",
    shortAnswer: "In `XLOOKUP`, set the 4th argument `[if_not_found]` to `0`: `=XLOOKUP(Key, Keys, Amounts, 0)`.",
    explanation: "Returning 0 prevents downstream arithmetic formulas (+, -) from propagating #N/A errors.",
    hint: "Set [if_not_found] to 0 in XLOOKUP.",
    level: "basic",
    codeExample: "=XLOOKUP(A2, tbl_Items[SKU], tbl_Items[Qty], 0)"
  },
  {
    question: "How do you combine `FILTER` with `XLOOKUP` for dynamic multi-record extraction?",
    shortAnswer: "Use `FILTER` when multiple records match the key and need to spill; use `XLOOKUP` when a single unique record is needed.",
    explanation: "FILTER returns all matching rows; XLOOKUP returns the first (or last) matching record.",
    hint: "FILTER for all matches; XLOOKUP for single record retrieval.",
    level: "moderate",
    codeExample: "=FILTER(tbl_Sales, tbl_Sales[Branch]=\"Barrackpore\")"
  },
  {
    question: "What is the ultimate golden rule of enterprise data lookups in Microsoft Excel?",
    shortAnswer: "Design clean tables with unique primary keys, sanitize text with TRIM, use XLOOKUP/INDEX-MATCH for resilient two-way retrieval, and configure explicit if_not_found error handling.",
    explanation: "Relational discipline ensures that critical financial and operational lookups remain fast, accurate, and maintenance-free.",
    hint: "Unique keys + XLOOKUP + TRIM + explicit error defaults.",
    level: "basic",
    codeExample: "Lookup Mastery = Primary Keys + XLOOKUP + TRIM Sanitation + Error Defaults"
  }
];

export default questions;
