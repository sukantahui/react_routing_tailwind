// topic4_questions.js
// 30 Structured Questions covering the SORT Function in Microsoft Excel 365

const questions = [
  {
    question: "What is the primary purpose of the SORT function in modern Excel?",
    shortAnswer: "To dynamically sort a range or spilled array in memory and output the sorted matrix without altering raw data.",
    explanation: "The `SORT` function takes an input table or array, sorts it based on a specified column/row index and order, and spills the sorted results dynamically, updating automatically whenever source data changes.",
    hint: "Think of an automated, formula-driven sorting engine.",
    level: "basic",
    codeExample: "=SORT(A2:D20, 1, 1)"
  },
  {
    question: "What is the complete syntax and argument structure of the SORT function?",
    shortAnswer: "=SORT(array, [sort_index], [sort_order], [by_col])",
    explanation: "`array` is the data to sort; `[sort_index]` is a 1-based integer indicating which column/row to sort by (default: 1); `[sort_order]` is 1 for ascending (default) or -1 for descending; `[by_col]` is a boolean indicating vertical row sorting (FALSE/omitted) or horizontal column sorting (TRUE).",
    hint: "Array, sort index, sort order (1 or -1), and by_col.",
    level: "basic",
    codeExample: "=SORT(SalesTable, 4, -1)"
  },
  {
    question: "What numerical value specifies descending sort order in the SORT function?",
    shortAnswer: "-1 (negative one).",
    explanation: "Passing `-1` as the 3rd argument sorts values from largest to smallest (numeric) or Z to A (text). Passing `1` (or omitting the argument) sorts ascending (smallest to largest / A to Z).",
    hint: "1 is Ascending; -1 is Descending.",
    level: "basic",
    codeExample: "=SORT(A2:D20, 4, -1) // Sorts by 4th column descending"
  },
  {
    question: "What happens if you omit the `[sort_index]` argument in `=SORT(A2:D20)`?",
    shortAnswer: "Excel defaults to sorting by the first column (column index 1) in ascending order.",
    explanation: "The default `[sort_index]` is 1 and the default `[sort_order]` is 1 (ascending). Therefore, `=SORT(A2:D20)` sorts the dataset alphabetically or numerically by column A.",
    hint: "Defaults to column 1, ascending.",
    level: "basic",
    codeExample: "=SORT(A2:D20) // Sorts by Column 1 ascending"
  },
  {
    question: "How does the SORT function handle text, numbers, booleans, and blank cells in ascending order?",
    shortAnswer: "Numbers are sorted first, followed by text (A to Z), booleans (FALSE then TRUE), and blank cells last.",
    explanation: "Excel follows standard data type precedence: Numbers (smallest to largest) -> Text (A-Z) -> Logical FALSE (0) -> Logical TRUE (1) -> Error values -> Blanks placed at the very end.",
    hint: "Numbers first, text second, booleans third, blanks last.",
    level: "moderate",
    codeExample: "// [-10, 0, 50, 'Apple', 'Zebra', FALSE, TRUE, blank]"
  },
  {
    question: "How do you sort a horizontal dataset across columns instead of down rows?",
    shortAnswer: "Set the 4th argument `[by_col]` to TRUE: =SORT(B1:M5, 1, 1, TRUE).",
    explanation: "When data is laid out horizontally across columns, passing `TRUE` as the 4th argument instructs the calculation engine to evaluate row 1 and rearrange columns left-to-right.",
    hint: "Pass TRUE as the 4th argument [by_col].",
    level: "moderate",
    codeExample: "=SORT(B1:M5, 1, 1, TRUE)"
  },
  {
    question: "How do you combine SORT with UNIQUE to create an alphabetized distinct list?",
    shortAnswer: "Nest UNIQUE inside SORT: =SORT(UNIQUE(A2:A100)).",
    explanation: "`UNIQUE` first extracts the distinct items in memory, and `SORT` orders the resulting unique vector alphabetically in a single formula.",
    hint: "Wrap UNIQUE inside SORT.",
    level: "basic",
    codeExample: "=SORT(UNIQUE(BranchNames))"
  },
  {
    question: "How do you sort only the records that meet a specific condition using FILTER and SORT?",
    shortAnswer: "Wrap FILTER inside SORT: =SORT(FILTER(A2:D20, C2:C20=\"Barrackpore\"), 4, -1).",
    explanation: "`FILTER` isolates the subset of matching rows, and `SORT` orders the filtered matrix by the 4th column (e.g. Revenue) from highest to lowest.",
    hint: "Wrap FILTER inside SORT(..., col_index, -1).",
    level: "moderate",
    codeExample: "=SORT(FILTER(A2:G20, C2:C20=\"Barrackpore\"), 7, -1)"
  },
  {
    question: "What error occurs if the `[sort_index]` exceeds the number of columns in the source array?",
    shortAnswer: "Excel returns a #VALUE! error.",
    explanation: "If `array` has 3 columns (`A2:C20`) and you specify `[sort_index]` as `4`, the index is out of bounds, triggering `#VALUE!`.",
    hint: "The sort index must be between 1 and the total column count.",
    level: "basic",
    codeExample: "=SORT(A2:C20, 5, 1) // Returns #VALUE! because only 3 columns exist"
  },
  {
    question: "How do you extract the Top 3 highest revenue records from a table using SORT and TAKE?",
    shortAnswer: "Use =TAKE(SORT(A2:D20, 4, -1), 3).",
    explanation: "`SORT(A2:D20, 4, -1)` ranks all records by revenue descending, and `TAKE(..., 3)` extracts strictly the top 3 rows.",
    hint: "Combine TAKE with SORT in descending order.",
    level: "moderate",
    codeExample: "=TAKE(SORT(SalesData, 4, -1), 3)"
  },
  {
    question: "How do you extract the Bottom 3 lowest performers using SORT and TAKE?",
    shortAnswer: "Use =TAKE(SORT(A2:D20, 4, 1), 3) or =TAKE(SORT(A2:D20, 4, -1), -3).",
    explanation: "Sorting ascending with `1` and taking the first 3 rows extracts the lowest values; alternatively, passing `-3` into `TAKE` grabs the last 3 rows.",
    hint: "Sort ascending and take top rows, or sort descending and take bottom rows.",
    level: "moderate",
    codeExample: "=TAKE(SORT(A2:D20, 4, 1), 3)"
  },
  {
    question: "Is the SORT function case-sensitive by default in Excel?",
    shortAnswer: "No, SORT is case-insensitive and treats uppercase and lowercase letters with equal rank.",
    explanation: "Excel's calculation engine sorts 'apple' and 'Apple' as equivalent in ranking, preserving their relative entry positions.",
    hint: "Standard SORT does not distinguish between upper and lower case.",
    level: "moderate",
    codeExample: "// 'apple' and 'Apple' share identical alphabetical rank"
  },
  {
    question: "How do you reference a sorted spilled array downstream using the '#' operator?",
    shortAnswer: "Append '#' to the top-left origin cell of the SORT formula (e.g., J2#).",
    explanation: "Referencing `J2#` binds downstream KPI cards and chart series dynamically to all sorted rows.",
    hint: "Use OriginCell#.",
    level: "basic",
    codeExample: "=INDEX(J2#, 1, 2) // Extracts the consultant name of the #1 top rank"
  },
  {
    question: "How do you extract the name of the #1 top performing consultant from a sorted spilled array?",
    shortAnswer: "Use =INDEX(J2#, 1, 2) or =CHOOSEROWS(J2#, 1).",
    explanation: "If `J2#` holds a table sorted by revenue descending, row 1 represents the top performer. `CHOOSEROWS(J2#, 1)` extracts the entire leader row.",
    hint: "Use CHOOSEROWS or INDEX on row 1 of the descending sorted array.",
    level: "moderate",
    codeExample: "=CHOOSEROWS(RankedTable#, 1)"
  },
  {
    question: "What happens if data in the source table is updated or appended?",
    shortAnswer: "The SORT function recalculates immediately and re-ranks all output rows automatically.",
    explanation: "Because dynamic arrays participate in Excel's live calculation graph, editing a revenue value instantly re-orders the output table without manual sorting.",
    hint: "Recalculation is live, non-destructive, and instantaneous.",
    level: "basic",
    codeExample: "// Change Swadeep's revenue -> Output table re-orders immediately"
  },
  {
    question: "Can you sort an array by a column that is not part of the returned output table using SORT?",
    shortAnswer: "No, SORT can only sort by a column that exists within the source array; for external column sorting, use SORTBY.",
    explanation: "`SORT` requires the `[sort_index]` to be inside the input `array`. When you need to sort by an auxiliary column that is omitted from the output, `SORTBY` must be used.",
    hint: "Use SORTBY when sorting by a column outside the returned range.",
    level: "advanced",
    codeExample: "// To sort A:C by Column D, use =SORTBY(A2:C20, D2:D20, -1)"
  },
  {
    question: "What happens if a SORT formula cannot spill due to an occupied cell in the destination range?",
    shortAnswer: "Excel outputs a #SPILL! error at the origin cell.",
    explanation: "A clean rectangular grid of empty cells is required. Clearing the obstructing cell allows the sorted array to spill.",
    hint: "Clear any data in the spill perimeter to fix #SPILL!.",
    level: "basic",
    codeExample: "// Delete values in the projected spill path to resolve #SPILL!"
  },
  {
    question: "How do you sort dates chronologically using the SORT function?",
    shortAnswer: "Specify the date column index with sort_order = 1 (oldest to newest) or -1 (newest to oldest).",
    explanation: "Because Excel dates are numeric serial integers, sorting by the date column organizes records from earliest date to latest date cleanly.",
    hint: "Dates sort as serial numbers: 1 for oldest to newest, -1 for newest to oldest.",
    level: "basic",
    codeExample: "=SORT(A2:D20, 2, 1) // Sorts by Date column ascending"
  },
  {
    question: "Can SORT be used with structured references from an Excel Table (`ListObject`)?",
    shortAnswer: "Yes, you can pass structured references to SORT (e.g. =SORT(SalesTable[#Data], 3, -1)).",
    explanation: "`SalesTable[#Data]` passes the body rows of the table into SORT, creating a dynamic sorted shadow table outside the table grid.",
    hint: "Use TableName[#Data] or TableName to sort structured tables.",
    level: "moderate",
    codeExample: "=SORT(ConsultantTable, 4, -1)"
  },
  {
    question: "How do you return only specific columns after sorting a wide dataset?",
    shortAnswer: "Wrap the SORT formula in CHOOSECOLS: =CHOOSECOLS(SORT(A2:H20, 7, -1), 2, 3, 7).",
    explanation: "`SORT` orders the 8-column matrix by column 7 descending, and `CHOOSECOLS` extracts only Name, Branch, and Revenue.",
    hint: "Combine CHOOSECOLS with SORT.",
    level: "advanced",
    codeExample: "=CHOOSECOLS(SORT(A2:H20, 7, -1), 2, 3, 7)"
  },
  {
    question: "How does SORT perform on large enterprise datasets (100,000+ rows)?",
    shortAnswer: "It executes in milliseconds in compiled memory, significantly outperforming legacy sorting scripts.",
    explanation: "Excel's modern calculation engine uses multi-threaded introsort algorithms that distribute sorting passes across CPU cores.",
    hint: "Native C++ sorting algorithms execute with high speed.",
    level: "expert",
    codeExample: "// 100,000 rows sorted in < 30ms"
  },
  {
    question: "How do you create a dynamic leaderboard where the user can toggle sorting order between Ascending and Descending via a dropdown?",
    shortAnswer: "Link `[sort_order]` to an IF statement or cell value: =SORT(A2:D20, 4, IF(J1=\"Highest First\", -1, 1)).",
    explanation: "Connecting the 3rd argument to a user cell creates an interactive leaderboard that flips ranking order dynamically.",
    hint: "Use IF(ToggleCell=\"Desc\", -1, 1) in the sort_order parameter.",
    level: "advanced",
    codeExample: "=SORT(A2:D20, 4, IF(J1=\"Desc\", -1, 1))"
  },
  {
    question: "Can you sort a 2D matrix by a specific row across columns?",
    shortAnswer: "Yes, by setting `[sort_index]` to the target row index and `[by_col]` to TRUE.",
    explanation: "`=SORT(MatrixRange, 2, 1, TRUE)` sorts the matrix horizontally based on the numerical values in row 2.",
    hint: "Set sort_index to row number and by_col to TRUE.",
    level: "advanced",
    codeExample: "=SORT(B1:M5, 2, 1, TRUE)"
  },
  {
    question: "What is the difference between =SORT(A2:A20) and =SORT(A2:D20, 1)?",
    shortAnswer: "`=SORT(A2:A20)` returns only the 1st column; `=SORT(A2:D20, 1)` sorts all 4 columns together based on column 1.",
    explanation: "When sorting a multi-column table, you must supply the full table range so that rows remain intact and columns stay aligned with their corresponding records.",
    hint: "Pass the full table range so data rows stay aligned.",
    level: "basic",
    codeExample: "=SORT(A2:D20, 1, 1) // Preserves multi-column row integrity"
  },
  {
    question: "How do you filter out empty rows before sorting to prevent blank entries from appearing in the sorted list?",
    shortAnswer: "Filter the data with `<>\"\"` before passing to SORT: =SORT(FILTER(A2:D20, A2:A20<>\"\"), 4, -1).",
    explanation: "`FILTER` removes empty rows from the stream, and `SORT` orders the clean records without trailing zero placeholders.",
    hint: "Filter out blanks before sorting.",
    level: "moderate",
    codeExample: "=SORT(FILTER(A2:D50, A2:A50<>\"\"), 1, 1)"
  },
  {
    question: "How do you sort a list of names by length (shortest to longest)?",
    shortAnswer: "Use SORTBY with the LEN function: =SORTBY(A2:A20, LEN(A2:A20), 1).",
    explanation: "While `SORT` sorts alphabetically, `SORTBY` allows sorting on computed criteria like string length `LEN(A2:A20)`.",
    hint: "Use SORTBY with LEN for string length sorting.",
    level: "advanced",
    codeExample: "=SORTBY(ConsultantNames, LEN(ConsultantNames), 1)"
  },
  {
    question: "How do you dynamically rank students by test scores in Excel without the legacy RANK function?",
    shortAnswer: "Sort the student table by score descending: =SORT(StudentsTable, ScoreColIndex, -1).",
    explanation: "The resulting spilled array is inherently ranked from 1st place to last place. Pairing with `=SEQUENCE(ROWS(Output#))` generates sequential rank numbers automatically.",
    hint: "Sorting descending creates an automatic live leaderboard.",
    level: "moderate",
    codeExample: "=SORT(A2:C20, 3, -1)"
  },
  {
    question: "What happens if a source dataset contains duplicate values in the sorted column?",
    shortAnswer: "Excel preserves all duplicate rows and groups them together in their stable arrival order.",
    explanation: "If three consultants earned ₹1,20,000, all three rows are grouped together in the sorted output.",
    hint: "Duplicates are preserved and grouped together.",
    level: "basic",
    codeExample: "// Identical values are grouped consecutively"
  },
  {
    question: "How do you sort an array inside a LET formula and perform calculations on the sorted top performer?",
    shortAnswer: "Assign the sorted table to a variable: =LET(sorted, SORT(A2:D20, 4, -1), topRevenue, INDEX(sorted, 1, 4), topRevenue * 0.10).",
    explanation: "`LET` holds the sorted array in memory, extracts the top revenue with `INDEX`, and computes a 10% performance bonus directly in one formula.",
    hint: "Store sorted matrix in LET variable.",
    level: "expert",
    codeExample: "=LET(s, SORT(A2:D20, 4, -1), INDEX(s, 1, 2))"
  },
  {
    question: "Why is the SORT function essential for automated executive reporting in corporate environments?",
    shortAnswer: "It creates live, automated leaderboards, top-N KPI widgets, and chronological transaction feeds with zero manual sorting maintenance.",
    explanation: "In fast-paced corporate environments across Barrackpore and Kolkata, `SORT` ensures management dashboards always present ranked, actionable business intelligence without error-prone manual user intervention.",
    hint: "SORT guarantees 100% automated live ranking for executive dashboards.",
    level: "expert",
    codeExample: "// Executive Pipeline: Raw Data -> FILTER -> SORT -> KPI Summary (Zero Maintenance)"
  }
];

export default questions;
