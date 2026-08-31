// topic2_questions.js
// 30 Structured Questions covering the UNIQUE Function in Excel 365

const questions = [
  {
    question: "What is the primary purpose of the UNIQUE function in modern Microsoft Excel?",
    shortAnswer: "To extract a non-destructive, dynamically updating list of distinct values or unique rows from a dataset.",
    explanation: "The `UNIQUE` function scans an input array or table range, eliminates duplicate occurrences in memory, and spills the distinct values across adjacent cells automatically, updating in real time when source records are added or modified.",
    hint: "Think of an automated, non-destructive replacement for 'Remove Duplicates'.",
    level: "basic",
    codeExample: "=UNIQUE(A2:A100)"
  },
  {
    question: "What is the full syntax and argument structure of the UNIQUE function?",
    shortAnswer: "=UNIQUE(array, [by_col], [exactly_once])",
    explanation: "The first argument `array` is required and specifies the data range. `[by_col]` is an optional boolean determining whether to compare rows (FALSE/omitted) or columns (TRUE). `[exactly_once]` is an optional boolean specifying whether to return distinct items (FALSE/omitted) or items that appear strictly once without repetition (TRUE).",
    hint: "Array is required; by_col and exactly_once are optional booleans.",
    level: "basic",
    codeExample: "=UNIQUE(C2:C50, FALSE, FALSE)"
  },
  {
    question: "How does the default behavior of UNIQUE differ when `[exactly_once]` is FALSE versus TRUE?",
    shortAnswer: "FALSE returns all distinct items (first occurrence of each); TRUE returns only items that occur strictly once without any duplicates.",
    explanation: "If a list contains `['Apple', 'Banana', 'Apple', 'Orange']`: `=UNIQUE(list, FALSE, FALSE)` returns `['Apple', 'Banana', 'Orange']`. In contrast, `=UNIQUE(list, FALSE, TRUE)` completely filters out 'Apple' (because it appeared twice) and returns only `['Banana', 'Orange']`.",
    hint: "Distinct list (FALSE) vs. Single-occurrence items (TRUE).",
    level: "moderate",
    codeExample: "=UNIQUE(CustomerList, FALSE, TRUE) // Finds one-time buyers"
  },
  {
    question: "Is the UNIQUE function case-sensitive by default in Excel?",
    shortAnswer: "No, UNIQUE is case-insensitive and treats 'Barrackpore', 'BARRACKPORE', and 'barrackpore' as identical duplicates.",
    explanation: "Excel's calculation engine performs case-insensitive comparisons for text in `UNIQUE`. It returns the text with the casing of the very first instance encountered in the source range.",
    hint: "Upper, lower, and proper case versions are considered duplicates.",
    level: "moderate",
    codeExample: "// ['Kolkata', 'kolkata'] → returns 'Kolkata'"
  },
  {
    question: "How does UNIQUE operate on a multi-column range like `=UNIQUE(B2:D20)`?",
    shortAnswer: "It evaluates entire rows as composite records, returning rows that have unique combinations across all specified columns.",
    explanation: "When passed a multi-column range, a row is only considered a duplicate if every single column in that row matches an earlier row. For example, `(Swadeep, Barrackpore, Excel)` and `(Swadeep, Barrackpore, Python)` are treated as two distinct unique rows.",
    hint: "Multi-column UNIQUE checks for distinct combined pairs/tuples.",
    level: "moderate",
    codeExample: "=UNIQUE(B2:D20) // Distinct Student + City + Course combinations"
  },
  {
    question: "What is the purpose of the `[by_col]` argument in the UNIQUE function?",
    shortAnswer: "It instructs Excel to deduplicate across horizontal columns (TRUE) rather than vertical rows (FALSE).",
    explanation: "When data is laid out horizontally across columns (e.g. `B1:M1`), setting `[by_col]` to `TRUE` compares column against column and spills unique horizontal columns across the row.",
    hint: "Use TRUE for horizontal data, FALSE/omitted for vertical tables.",
    level: "moderate",
    codeExample: "=UNIQUE(B1:M1, TRUE)"
  },
  {
    question: "How do you extract a sorted, alphabetical list of unique values in a single formula?",
    shortAnswer: "Nest the UNIQUE function inside the SORT function: =SORT(UNIQUE(A2:A100)).",
    explanation: "Because dynamic array functions compose seamlessly, passing `UNIQUE(A2:A100)` into `SORT()` creates an alphabetized list of distinct items in one dynamic formula without intermediate columns.",
    hint: "Wrap UNIQUE inside SORT.",
    level: "basic",
    codeExample: "=SORT(UNIQUE(BranchNames))"
  },
  {
    question: "How do you count the total number of distinct unique entries in a dataset?",
    shortAnswer: "Combine COUNTA or ROWS with UNIQUE (e.g., =COUNTA(UNIQUE(A2:A50)) or =ROWS(UNIQUE(A2:A50))).",
    explanation: "`UNIQUE(A2:A50)` extracts the distinct vector, and `=ROWS(UNIQUE(A2:A50))` counts the number of rows in the resulting spilled array in memory without outputting the list onto the worksheet.",
    hint: "Use ROWS(UNIQUE(...)) for structural row count.",
    level: "moderate",
    codeExample: "=ROWS(UNIQUE(C2:C21))"
  },
  {
    question: "What happens if the source range passed to UNIQUE contains blank cells?",
    shortAnswer: "UNIQUE returns 0 for empty cells as one of the unique distinct items.",
    explanation: "Excel treats blank cells as `0` in calculation array contexts. To remove blanks from the unique output, nest with FILTER: `=UNIQUE(FILTER(A2:A100, A2:A100<>\"\"))`.",
    hint: "Filter out empty strings before applying UNIQUE.",
    level: "advanced",
    codeExample: "=UNIQUE(FILTER(A2:A50, A2:A50<>\"\"))"
  },
  {
    question: "How do you link a Data Validation dropdown list directly to a UNIQUE formula output?",
    shortAnswer: "Set the Data Validation list Source to '=OriginCell#' (e.g. =J2# where J2 holds =UNIQUE(...)).",
    explanation: "By referencing the origin cell with `#`, the dropdown menu is dynamically bound to the spilled output. Whenever new categories appear in the raw data, the dropdown updates automatically.",
    hint: "Use the '#' operator on the top-left cell of the UNIQUE formula.",
    level: "moderate",
    codeExample: "Data Validation > Source: =$J$2#"
  },
  {
    question: "Can UNIQUE extract distinct records from a filtered subset of data?",
    shortAnswer: "Yes, by passing a FILTER function into UNIQUE: =UNIQUE(FILTER(A2:A100, B2:B100=\"Barrackpore\")).",
    explanation: "`FILTER` first isolates only rows where the branch is Barrackpore, and `UNIQUE` deduplicates the filtered stream, returning distinct records that meet the condition.",
    hint: "Filter first, then deduplicate with UNIQUE.",
    level: "moderate",
    codeExample: "=UNIQUE(FILTER(Student_Names, Branch=\"Barrackpore\"))"
  },
  {
    question: "How does UNIQUE compare to the legacy 'Remove Duplicates' button on the Data ribbon?",
    shortAnswer: "UNIQUE is non-destructive, dynamic, and formula-driven; 'Remove Duplicates' permanently deletes raw records and is static.",
    explanation: "'Remove Duplicates' modifies source worksheet rows permanently and requires manual re-execution when data changes. `UNIQUE` leaves raw data untouched and recalculates dynamically.",
    hint: "UNIQUE is non-destructive and live; Data ribbon tool is destructive and static.",
    level: "basic",
    codeExample: "// UNIQUE preserves original log intact on the raw sheet"
  },
  {
    question: "How can you identify duplicate values by comparing the output of UNIQUE with the original row count?",
    shortAnswer: "If =ROWS(UNIQUE(A2:A100)) < =ROWS(A2:A100), the dataset contains duplicate records.",
    explanation: "Comparing the distinct row count against the total row count provides an instant programmatic check for data hygiene and uniqueness violations.",
    hint: "Compare COUNTA(A2:A100) with COUNTA(UNIQUE(A2:A100)).",
    level: "moderate",
    codeExample: "=IF(ROWS(UNIQUE(A2:A50)) < ROWS(A2:A50), \"Duplicates Present\", \"All Unique\")"
  },
  {
    question: "How do you find all customer IDs that made ONLY ONE purchase using the UNIQUE function?",
    shortAnswer: "Use =UNIQUE(CustomerID_Column, FALSE, TRUE).",
    explanation: "Setting the 3rd argument `[exactly_once]` to `TRUE` filters out all repeating IDs, leaving strictly single-purchase customers.",
    hint: "Pass TRUE as the third argument.",
    level: "moderate",
    codeExample: "=UNIQUE(SalesTable[CustomerID], FALSE, TRUE)"
  },
  {
    question: "How do you extract unique values sorted by frequency (most frequent to least frequent)?",
    shortAnswer: "Combine SORTBY, UNIQUE, and COUNTIF across the spilled range.",
    explanation: "By placing `=UNIQUE(A2:A100)` in cell `D2`, you can sort it by occurrence count using `=SORTBY(D2#, COUNTIF(A2:A100, D2#), -1)`.",
    hint: "Use COUNTIF with D2# as criteria, sorted in descending order (-1).",
    level: "expert",
    codeExample: "=SORTBY(D2#, COUNTIF(A2:A100, D2#), -1)"
  },
  {
    question: "What happens if a UNIQUE formula cannot spill because a cell below it is occupied?",
    shortAnswer: "The origin cell displays a #SPILL! error until the obstruction is cleared.",
    explanation: "Excel requires clean, unobstructed cells for the entire unique output. If even one cell in the required range contains text or numbers, `#SPILL!` is returned.",
    hint: "Clear all obstructing data in the spill perimeter.",
    level: "basic",
    codeExample: "// Delete values in the projected spill path to resolve #SPILL!"
  },
  {
    question: "Can UNIQUE be used with Excel Tables (`ListObject`)?",
    shortAnswer: "UNIQUE can read from Excel Tables (e.g. =UNIQUE(Table1[City])), but the formula itself must reside outside the Table.",
    explanation: "Tables cannot contain spilled formulas in their columns, but they serve as ideal dynamic data sources for UNIQUE placed on standard worksheet grids.",
    hint: "Reference Table columns, but place the formula outside the Table.",
    level: "moderate",
    codeExample: "=UNIQUE(EnrollmentTable[Course_Track])"
  },
  {
    question: "How do you extract unique values from multiple non-contiguous columns into a single distinct list?",
    shortAnswer: "Stack columns with VSTACK or TOCOL first, then pass the consolidated array into UNIQUE: =UNIQUE(TOCOL(A2:D50, 1)).",
    explanation: "`TOCOL(A2:D50, 1)` flattens all 4 columns into a single 1D vertical column while ignoring blanks (`1`), and `UNIQUE` deduplicates the merged column stream.",
    hint: "Flatten with TOCOL, then deduplicate with UNIQUE.",
    level: "advanced",
    codeExample: "=UNIQUE(TOCOL(B2:E20, 1))"
  },
  {
    question: "How does UNIQUE handle numeric data, dates, and text in the same column?",
    shortAnswer: "It deduplicates all data types accurately, preserving the underlying data type of each unique item.",
    explanation: "Numbers, dates (stored as numeric serials), and text strings are evaluated according to Excel's equality rules. Dates like `2026-01-15` are deduplicated as serial numbers without converting to text.",
    hint: "Numeric serials and strings are preserved with their native types.",
    level: "moderate",
    codeExample: "=UNIQUE(TransactionDates)"
  },
  {
    question: "Can you use UNIQUE inside a LET function to avoid creating intermediate helper cells?",
    shortAnswer: "Yes, LET can store the unique array in a local variable for immediate downstream processing.",
    explanation: "`=LET(u, UNIQUE(A2:A100), s, SORT(u), FILTER(s, s<>\"))` encapsulates deduplication, sorting, and blank filtering entirely in memory.",
    hint: "Assign UNIQUE to a variable name inside LET.",
    level: "advanced",
    codeExample: "=LET(unq, UNIQUE(C2:C50), SORT(unq))"
  },
  {
    question: "How does the performance of UNIQUE compare to legacy array formulas on large datasets (50,000+ rows)?",
    shortAnswer: "UNIQUE calculates in milliseconds using compiled C++ hash tables, whereas legacy array formulas can take minutes.",
    explanation: "Legacy formulas like `{=INDEX(..., MATCH(0, COUNTIF(...), 0))}` operate with $O(N^2)$ quadratic complexity. Modern `UNIQUE` uses an optimized $O(N)$ hash set algorithm in Excel's native core.",
    hint: "Modern UNIQUE runs in O(N) linear time using native memory hashing.",
    level: "expert",
    codeExample: "// 50,000 rows deduplicated in under 20ms"
  },
  {
    question: "How do you extract unique records based on a single specific key column while returning multiple accompanying columns?",
    shortAnswer: "Use XLOOKUP with UNIQUE: =XLOOKUP(UNIQUE(A2:A100), A2:A100, B2:E100).",
    explanation: "`UNIQUE(A2:A100)` extracts distinct keys, and passing this spilled array into `XLOOKUP` retrieves the first matching row for each unique key across columns B through E.",
    hint: "Feed UNIQUE(Keys) into the lookup_value argument of XLOOKUP.",
    level: "expert",
    codeExample: "=XLOOKUP(UNIQUE(A2:A20), A2:A20, B2:G20)"
  },
  {
    question: "What is the result of `=UNIQUE({})` on an empty array?",
    shortAnswer: "It returns a #CALC! error indicating an empty array.",
    explanation: "If an upstream filter returns zero rows and feeds into `UNIQUE`, Excel returns `#CALC!`. Handle this by supplying the `[if_empty]` argument in the upstream `FILTER`.",
    hint: "Provide an [if_empty] fallback in the inner FILTER.",
    level: "advanced",
    codeExample: "=UNIQUE(FILTER(A2:A20, B2:B20=\"Unknown\", \"No Data\"))"
  },
  {
    question: "How do you extract unique values from a table and display them horizontally across columns instead of down rows?",
    shortAnswer: "Wrap UNIQUE in the TRANSPOSE function: =TRANSPOSE(UNIQUE(A2:A50)).",
    explanation: "`UNIQUE(A2:A50)` outputs a vertical column; `TRANSPOSE` converts the vertical spill into a horizontal row spanning across adjacent columns.",
    hint: "Use TRANSPOSE(UNIQUE(...)) to flip from vertical to horizontal.",
    level: "moderate",
    codeExample: "=TRANSPOSE(UNIQUE(Branch_Locations))"
  },
  {
    question: "How can you perform a case-sensitive unique extraction in Excel 365?",
    shortAnswer: "Combine EXACT, REDUCE, or FILTER with LAMBDA to enforce case-sensitive matching.",
    explanation: "Because native `UNIQUE` is case-insensitive, achieving strict case sensitivity requires comparing text with `=EXACT()` inside an iterative formula engine.",
    hint: "EXACT() provides strict case-sensitive binary string comparison.",
    level: "expert",
    codeExample: "=FILTER(A2:A20, MAP(A2:A20, LAMBDA(x, SUM(--EXACT(x, A2:x))=1)))"
  },
  {
    question: "Can UNIQUE be used with structured references in dynamic pivot-like summary tables?",
    shortAnswer: "Yes, you can build dynamic summary tables using UNIQUE for row headers and SUMIFS/COUNTIFS for metrics.",
    explanation: "Placing `=SORT(UNIQUE(Table1[Department]))` in cell `F2` generates dynamic row headers. Writing `=SUMIFS(Table1[Sales], Table1[Department], F2#)` in `G2` creates a dynamic summary table that updates automatically.",
    hint: "Combine UNIQUE for headers with SUMIFS pointing to F2#.",
    level: "advanced",
    codeExample: "=SUMIFS(Table1[Gross_Revenue], Table1[Branch_Location], F2#)"
  },
  {
    question: "What happens if you insert new rows in the middle of a range referenced by `=UNIQUE(A2:A50)`?",
    shortAnswer: "Excel's formula coordinates automatically expand to A2:A51 and recalculate the unique list instantly.",
    explanation: "Excel maintains standard coordinate tracking. Inserting rows inside the source range expands the formula boundary and updates the spilled unique array in memory.",
    hint: "Source range boundaries adapt automatically on row insertion.",
    level: "basic",
    codeExample: "// Inserting a row in A updates formula to =UNIQUE(A2:A51)"
  },
  {
    question: "How do you extract unique items from two different tables located on separate sheets?",
    shortAnswer: "Stack both tables with VSTACK and pass the combined array to UNIQUE: =UNIQUE(VSTACK(Sheet1!A2:A50, Sheet2!A2:A50)).",
    explanation: "`VSTACK` merges data vertically from multiple worksheets, and `UNIQUE` eliminates cross-sheet duplicate entries in one consolidated output.",
    hint: "Use VSTACK to merge ranges before deduplication.",
    level: "advanced",
    codeExample: "=SORT(UNIQUE(VSTACK(Barrackpore!B2:B30, Shyamnagar!B2:B30)))"
  },
  {
    question: "How do you remove leading/trailing spaces before deduplicating text with UNIQUE?",
    shortAnswer: "Wrap the range in the TRIM function: =UNIQUE(TRIM(A2:A100)).",
    explanation: "Cells containing `'Swadeep '` and `'Swadeep'` are treated as different values due to trailing spaces. Wrapping the range in `TRIM()` cleans whitespace before deduplication.",
    hint: "TRIM cleans invisible spaces so duplicates match properly.",
    level: "moderate",
    codeExample: "=UNIQUE(TRIM(Customer_Names))"
  },
  {
    question: "Why is the UNIQUE function considered a foundational pillar of modern Excel dashboard architecture?",
    shortAnswer: "It dynamically drives dynamic headers, interactive dropdown filters, and summary KPIs without fragile VBA or manual refreshes.",
    explanation: "By dynamically deriving master lookup dimensions directly from raw transaction logs, `UNIQUE` allows dashboards to scale automatically as business operations grow across branches, ensuring 100% data integrity with zero maintenance.",
    hint: "UNIQUE eliminates manual range maintenance across all reporting layers.",
    level: "expert",
    codeExample: "// Architecture: Raw Log → UNIQUE(Branches#) → Interactive Dropdown → Filtered Dashboard"
  }
];

export default questions;
