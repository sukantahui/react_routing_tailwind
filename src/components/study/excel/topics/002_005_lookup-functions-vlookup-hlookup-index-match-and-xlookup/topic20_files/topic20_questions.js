// topic20_questions.js - 30 Comprehensive Assessment & Quiz Questions
// Topic 20: Test Your Skill: Lookup Functions (VLOOKUP, HLOOKUP, INDEX-MATCH & XLOOKUP)
// Module: 002_005_lookup-functions-vlookup-hlookup-index-match-and-xlookup

const questions = [
  {
    question: "What is the primary operational advantage of `XLOOKUP` over legacy `VLOOKUP`?",
    shortAnswer: "`XLOOKUP` defaults to exact match, searches in any direction (including left), does not break when columns are inserted, and handles errors with built-in `[if_not_found]`.",
    explanation: "Eliminates rigid column index numbering and defaults to safe exact matching.",
    hint: "Exact match by default, left lookup capability, and no column index numbers.",
    level: "basic",
    codeExample: "=XLOOKUP(A2, tbl_Staff[ID], tbl_Staff[Salary], \"Not Found\")"
  },
  {
    question: "Why does `VLOOKUP(A2, B2:E100, 3, FALSE)` return an error if the lookup key is in column C instead of column B?",
    shortAnswer: "`VLOOKUP` requires the lookup key to be in the very FIRST column (Column B) of the `table_array`; it cannot look left.",
    explanation: "VLOOKUP can only search column 1 and return columns to its right.",
    hint: "Lookup value must be located in the table_array's leftmost column.",
    level: "basic",
    codeExample: "VLOOKUP limitation: Searches leftmost column only."
  },
  {
    question: "How does `INDEX-MATCH` overcome `VLOOKUP`'s left-lookup limitation?",
    shortAnswer: "`MATCH` finds the row position in any key column, and `INDEX` retrieves the value from any separate return column, regardless of their left/right physical positions.",
    explanation: "Decouples the search array from the return array completely.",
    hint: "INDEX and MATCH operate on independent 1D column vectors.",
    level: "moderate",
    codeExample: "=INDEX(A2:A100, MATCH(E2, D2:D100, 0))"
  },
  {
    question: "What is the role of `0` as the third argument in `=MATCH(lookup_val, lookup_array, 0)`?",
    shortAnswer: "It specifies an EXACT match mode.",
    explanation: "1 = Less than (requires ascending sort), -1 = Greater than (requires descending sort), 0 = Exact match.",
    hint: "0 enforces exact matching in the MATCH function.",
    level: "basic",
    codeExample: "=MATCH(A2, Codes, 0)"
  },
  {
    question: "How do you construct a Two-Way Matrix Lookup in Excel using `INDEX-MATCH`?",
    shortAnswer: "`=INDEX(GridRange, MATCH(RowKey, RowHeaders, 0), MATCH(ColKey, ColHeaders, 0))`",
    explanation: "Dynamically resolves both the row coordinate and column coordinate of a 2D matrix.",
    hint: "INDEX(Matrix, MATCH(Row), MATCH(Col))",
    level: "moderate",
    codeExample: "=INDEX(B2:M50, MATCH(A2, A2:A50, 0), MATCH(B1, B1:M1, 0))"
  },
  {
    question: "How do you perform a Multi-Criteria Lookup in `XLOOKUP` using Boolean arrays?",
    shortAnswer: "`=XLOOKUP(1, (Range1=Crit1) * (Range2=Crit2), ReturnRange, \"Not Found\")`",
    explanation: "Multiplying conditions creates an array of 1s and 0s; searching for `1` finds the compound match.",
    hint: "XLOOKUP(1, (Cond1)*(Cond2), ReturnRange)",
    level: "advanced",
    codeExample: "=XLOOKUP(1, (tbl_Rates[Region]=\"BKP\") * (tbl_Rates[Tier]=\"Gold\"), tbl_Rates[Price])"
  },
  {
    question: "What does the `#N/A` error indicate in a lookup formula?",
    shortAnswer: "The lookup value does not exist in the search array (or there is a data type mismatch or hidden space).",
    explanation: "Most common causes: trailing spaces (`\"EMP-101 \"`), text vs number formatting (`\"100\"` vs `100`), or misspelled keys.",
    hint: "#N/A means Not Available / Value Not Found.",
    level: "basic",
    codeExample: "Remedy: Check data types and wrap in TRIM(CLEAN(...))"
  },
  {
    question: "How do you search from bottom-to-top (last occurrence) in `XLOOKUP`?",
    shortAnswer: "Set the 6th argument `[search_mode]` to `-1`.",
    explanation: "Extracts the latest transaction or chronological status entry.",
    hint: "Set search_mode to -1 in XLOOKUP.",
    level: "moderate",
    codeExample: "=XLOOKUP(CustomerID, Orders[CustID], Orders[Date], , 0, -1)"
  },
  {
    question: "How does `HLOOKUP` differ from `VLOOKUP`?",
    shortAnswer: "`HLOOKUP` searches horizontally across the top row of a table; `VLOOKUP` searches vertically down the leftmost column.",
    explanation: "Used for horizontally transposed tables where categories are column headers in row 1.",
    hint: "HLOOKUP = Horizontal row search; VLOOKUP = Vertical column search.",
    level: "basic",
    codeExample: "=HLOOKUP(QuarterKey, A1:F5, 3, FALSE)"
  },
  {
    question: "How do you return multiple adjacent columns from a single `XLOOKUP` in Excel 365?",
    shortAnswer: "Specify a multi-column range as `return_array` (e.g. `tbl_Staff[[Name]:[Salary]]`), and the results will automatically spill across the row.",
    explanation: "Dynamic array engine spills all requested columns horizontally.",
    hint: "Pass a multi-column range to return_array.",
    level: "moderate",
    codeExample: "=XLOOKUP(A2, tbl_Staff[ID], tbl_Staff[[Name]:[Salary]])"
  },
  {
    question: "What is the difference between Approximate Match in `VLOOKUP` vs `XLOOKUP`?",
    shortAnswer: "`VLOOKUP(..., TRUE)` requires data to be sorted ascending; `XLOOKUP(..., , -1)` (exact or next smaller) does NOT require data to be sorted.",
    explanation: "XLOOKUP match_mode -1 or 1 evaluates bounds accurately on unsorted lists.",
    hint: "XLOOKUP does not require sorted data for approximate matching.",
    level: "advanced",
    codeExample: "=XLOOKUP(Score, Scale, Grade, , -1)"
  },
  {
    question: "How do you perform a Wildcard Lookup in `XLOOKUP`?",
    shortAnswer: "Include wildcard characters `*` or `?` in the lookup value and set the 5th argument `[match_mode]` to `2`.",
    explanation: "Enables substring and fuzzy pattern matching across text keys.",
    hint: "Set match_mode to 2 for wildcard lookups.",
    level: "moderate",
    codeExample: "=XLOOKUP(\"*Server*\", tbl_SKU[Desc], tbl_SKU[Cost], \"Not Found\", 2)"
  },
  {
    question: "Why should you avoid using whole column references like `VLOOKUP(A2, A:F, 5, FALSE)`?",
    shortAnswer: "It forces Excel to evaluate 1,048,576 rows, causing recalculation lag and workbook freezing in large models.",
    explanation: "Use bounded ranges or structured tables (`tbl_Data`) to maintain workbook speed.",
    hint: "Whole-column references force evaluation of 1 million cells.",
    level: "moderate",
    codeExample: "Use tbl_Data instead of A:F."
  },
  {
    question: "How do you clean hidden spaces in lookup keys automatically inside a formula?",
    shortAnswer: "Wrap keys in `TRIM(CLEAN(...))`.",
    explanation: "`TRIM` strips leading/trailing spaces; `CLEAN` removes non-printable ASCII characters.",
    hint: "TRIM and CLEAN sanitize messy text keys.",
    level: "moderate",
    codeExample: "=XLOOKUP(TRIM(A2), TRIM(tbl_Data[Key]), tbl_Data[Val])"
  },
  {
    question: "How do you perform a Case-Sensitive Lookup in Excel?",
    shortAnswer: "Use `=XLOOKUP(TRUE, EXACT(LookupVal, KeyRange), ReturnRange, \"Not Found\")`.",
    explanation: "`EXACT` evaluates case (e.g. 'ABC' vs 'abc') and returns TRUE for exact matches.",
    hint: "Combine EXACT with XLOOKUP or INDEX-MATCH.",
    level: "advanced",
    codeExample: "=XLOOKUP(TRUE, EXACT(A2, tbl_SKU[Code]), tbl_SKU[Price])"
  },
  {
    question: "What is the return value of `=INDEX({\"Alpha\", \"Beta\", \"Gamma\"}, 2)`?",
    shortAnswer: "`\"Beta\"` (the item at 1-indexed position 2 in the array).",
    explanation: "INDEX extracts the cell value at the specified ordinal index.",
    hint: "INDEX returns the value at the given position.",
    level: "basic",
    codeExample: "INDEX(Array, 2) &rarr; \"Beta\""
  },
  {
    question: "How do you configure `XLOOKUP` to return `0` instead of `#N/A` for arithmetic formulas?",
    shortAnswer: "Set the 4th argument `[if_not_found]` to `0`: `=XLOOKUP(Key, Keys, Prices, 0)`.",
    explanation: "Prevents downstream arithmetic formulas (+, -) from propagating error values.",
    hint: "Set [if_not_found] to 0 in XLOOKUP.",
    level: "basic",
    codeExample: "=XLOOKUP(A2, tbl_Products[ID], tbl_Products[Price], 0)"
  },
  {
    question: "What happens if an Excel Table has columns added or deleted when using structured references vs VLOOKUP?",
    shortAnswer: "Structured references (`tbl_Staff[Salary]`) remain perfectly intact; VLOOKUP with static column numbers (`3`) breaks and returns wrong data.",
    explanation: "Structured references bind by column name, not physical column index.",
    hint: "Structured references bind dynamically by field name.",
    level: "basic",
    codeExample: "tbl_Staff[Salary] is immune to column shifts."
  },
  {
    question: "How do you perform a cross-workbook lookup in Excel?",
    shortAnswer: "Reference the workbook path in brackets followed by sheet and range: `=[Budget.xlsx]Sheet1!$A$2:$B$100`.",
    explanation: "Enables centralizing enterprise master dimension tables across separate files.",
    hint: "Use [WorkbookName.xlsx]SheetName!Range syntax.",
    level: "moderate",
    codeExample: "=XLOOKUP(A2, [Master.xlsx]Dim!$A$2:$A$100, [Master.xlsx]Dim!$B$2:$B$100)"
  },
  {
    question: "What is Binary Search mode in `XLOOKUP` and when should it be activated?",
    shortAnswer: "Set `search_mode = 2` (Ascending) or `-2` (Descending) to execute O(log n) binary search across millions of rows in milliseconds.",
    explanation: "Requires strictly sorted data but delivers maximum possible lookup performance.",
    hint: "Search mode 2 uses binary search on sorted data.",
    level: "advanced",
    codeExample: "=XLOOKUP(Key, LargeArray, ReturnArray, , 0, 2)"
  },
  {
    question: "How do you create a dynamic Data Validation dropdown list connected to a structured table column?",
    shortAnswer: "Data &rarr; Data Validation &rarr; List &rarr; `=INDIRECT(\"tbl_Products[SKU]\")`.",
    explanation: "Dropdown automatically expands as new SKUs are appended to the table.",
    hint: "Use INDIRECT(\"TableName[Column]\") in Data Validation.",
    level: "moderate",
    codeExample: "Data Validation &rarr; =INDIRECT(\"tbl_Products[SKU]\")"
  },
  {
    question: "Why should primary key columns always contain 100% unique values in dimension tables?",
    shortAnswer: "Because lookup functions return only the FIRST matching record; duplicate keys cause subsequent records to become permanently unreachable.",
    explanation: "Primary key hygiene is the foundation of relational data integrity.",
    hint: "Duplicate keys cause subsequent records to be ignored.",
    level: "basic",
    codeExample: "Rule: Primary keys must be strictly unique."
  },
  {
    question: "How do you convert numbers stored as text into true numeric values inside a lookup formula?",
    shortAnswer: "Wrap the key in `VALUE(A2)` or `A2 + 0` or `--A2`.",
    explanation: "Coerces text strings like '101' into numbers like 101 to resolve type mismatches.",
    hint: "Use VALUE(A2) or --A2 to coerce text into numbers.",
    level: "basic",
    codeExample: "=XLOOKUP(VALUE(A2), tbl_Data[Numeric_ID], tbl_Data[Value])"
  },
  {
    question: "How do you convert true numeric numbers into text strings inside a lookup formula?",
    shortAnswer: "Wrap the key in `TEXT(A2, \"@\")` or `A2 & \"\"`.",
    explanation: "Appends an empty string to convert numerical values to text without modifying cell formatting.",
    hint: "Use A2 & \"\" or TEXT(A2, \"@\").",
    level: "basic",
    codeExample: "=XLOOKUP(A2 & \"\", tbl_Data[Text_ID], tbl_Data[Value])"
  },
  {
    question: "What is a Left Lookup and why is it impossible with standard `VLOOKUP`?",
    shortAnswer: "Retrieving a value from a column located to the left of the lookup key column; VLOOKUP only searches column 1 and looks right.",
    explanation: "INDEX-MATCH and XLOOKUP allow left lookups effortlessly.",
    hint: "Left lookups retrieve data from columns before the key column.",
    level: "basic",
    codeExample: "=XLOOKUP(ID, tbl_Data[Key], tbl_Data[LeftColumn])"
  },
  {
    question: "How does `CHOOSEROWS` combine with `XLOOKUP` in modern dashboard modeling?",
    shortAnswer: "`CHOOSEROWS` extracts specific filtered row slices from a multi-row matrix returned by `XLOOKUP`.",
    explanation: "Enables dynamic matrix slicing in advanced financial dashboards.",
    hint: "CHOOSEROWS slices specific row indices from spilled arrays.",
    level: "advanced",
    codeExample: "=CHOOSEROWS(XLOOKUP(Key, Keys, Matrix), 1)"
  },
  {
    question: "What is the difference between `MATCH(..., 1)` and `MATCH(..., -1)`?",
    shortAnswer: "`1` finds the largest value &le; lookup value (requires ASCENDING sort); `-1` finds the smallest value &ge; lookup value (requires DESCENDING sort).",
    explanation: "Approximate match modes in legacy MATCH.",
    hint: "1 = Ascending sort (less than); -1 = Descending sort (greater than).",
    level: "advanced",
    codeExample: "=MATCH(Value, SortedArray, 1)"
  },
  {
    question: "How do you handle lookup formulas when multiple records match and all must be extracted?",
    shortAnswer: "Use `=FILTER(tbl_Data, tbl_Data[Category]=\"Electronics\")` instead of lookup functions.",
    explanation: "FILTER returns and spills all matching rows, whereas lookups return a single record.",
    hint: "Use FILTER to extract multiple matching records.",
    level: "moderate",
    codeExample: "=FILTER(tbl_Sales, tbl_Sales[Branch]=\"Barrackpore\")"
  },
  {
    question: "How do you safely wrap legacy `VLOOKUP` formulas to prevent `#N/A` errors?",
    shortAnswer: "Use `=IFERROR(VLOOKUP(A2, Table, 3, FALSE), \"Not Found\")`.",
    explanation: "Catches #N/A and other errors to display a friendly fallback message.",
    hint: "Wrap in IFERROR(VLOOKUP(...), \"Not Found\").",
    level: "basic",
    codeExample: "=IFERROR(VLOOKUP(A2, tbl_Data, 3, FALSE), \"Not Found\")"
  },
  {
    question: "What is the ultimate golden rule of enterprise data lookups in Microsoft Excel?",
    shortAnswer: "Maintain unique primary keys, clean text with TRIM, use XLOOKUP/INDEX-MATCH for resilient two-way retrieval, and configure explicit if_not_found fallbacks.",
    explanation: "Relational discipline ensures fast, accurate, and maintenance-free data retrieval across enterprise workbooks.",
    hint: "Unique keys + XLOOKUP + TRIM + explicit error fallbacks.",
    level: "basic",
    codeExample: "Lookup Mastery = Primary Keys + XLOOKUP + TRIM + Fallback Defaults"
  }
];

export default questions;
