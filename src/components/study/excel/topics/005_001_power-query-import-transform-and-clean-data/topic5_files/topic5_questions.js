// topic5_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 5
// Topic: Filtering rows, sorting columns, and removing duplicates at scale
// Module: 005_001_power-query-import-transform-and-clean-data
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What M function is generated when filtering rows in Power Query?",
    shortAnswer: "`Table.SelectRows(Table, each [Condition])`.",
    explanation: "Evaluates the row predicate expression for every record and keeps rows where condition is true.",
    hint: "Table.SelectRows.",
    level: "basic",
    codeExample: "= Table.SelectRows(Source, each [Amount] > 10000)"
  },
  {
    question: "What does the `each` keyword represent in Power Query M row filtering expressions?",
    shortAnswer: "It is syntactic sugar for an anonymous unary lambda function `(_) => ...` operating on the current row record.",
    explanation: "Allows concise row field references like `each [City] = \"Barrackpore\"`.",
    hint: "Syntactic shorthand for row-by-row lambda evaluation.",
    level: "moderate",
    codeExample: "each [Status] = \"Active\" &equiv; (_) => _[Status] = \"Active\""
  },
  {
    question: "How do you combine multiple filter conditions using logical AND and OR in M code?",
    shortAnswer: "Use lowercase `and` and `or` keywords: `= Table.SelectRows(Source, each [Amount] > 5000 and [City] = \"Kolkata\")`.",
    explanation: "M boolean operators must always be written in lowercase.",
    hint: "Use lowercase 'and' and 'or'.",
    level: "basic",
    codeExample: "= Table.SelectRows(Source, each [Amount] > 5000 and [Region] = \"East\")"
  },
  {
    question: "What M function is used to sort table columns in Power Query?",
    shortAnswer: "`Table.Sort(Table, {{\"Col1\", Order.Ascending}, {\"Col2\", Order.Descending}})`.",
    explanation: "Sorts records based on single or multi-column hierarchical criteria.",
    hint: "Table.Sort.",
    level: "basic",
    codeExample: "= Table.Sort(Source, {{\"Date\", Order.Ascending}, {\"Amount\", Order.Descending}})"
  },
  {
    question: "What is the difference between single-column and multi-column deduplication in Power Query?",
    shortAnswer: "Single-column deduplication removes rows where that one column matches; multi-column deduplication removes rows only when all selected columns match simultaneously (composite key).",
    explanation: "Allows keeping distinct transactions while deduplicating composite customer-date pairs.",
    hint: "Single: 1 column key; Multi: composite key of multiple columns.",
    level: "moderate",
    codeExample: "= Table.Distinct(Source, {\"Customer_ID\", \"Invoice_Date\"})"
  },
  {
    question: "What M function removes duplicate rows from a table?",
    shortAnswer: "`Table.Distinct(Table, [OptionalColumnsList])`.",
    explanation: "Eliminates duplicate records across the entire row or specified key columns.",
    hint: "Table.Distinct.",
    level: "basic",
    codeExample: "= Table.Distinct(Source, {\"Customer_ID\"})"
  },
  {
    question: "What is the 'Keep Duplicates' transformation, and why is it useful during financial audits?",
    shortAnswer: "It filters the table to display ONLY records that have duplicate keys, instantly surfacing double-billing or fraud anomalies for auditor review.",
    explanation: "Essential for duplicate invoice detection.",
    hint: "Filters table to show ONLY rows that appear more than once.",
    level: "moderate",
    codeExample: "Home Tab → Keep Rows → Keep Duplicates"
  },
  {
    question: "Why is placing Row Filter steps early in the Applied Steps list critical for SQL databases?",
    shortAnswer: "It maximizes Query Folding, allowing the database server to filter rows via `WHERE` clauses before transferring gigabytes of data over the network.",
    explanation: "Dramatically reduces network latency and local memory consumption.",
    hint: "Enables server-side SQL WHERE clause query folding.",
    level: "expert",
    codeExample: "Early Filter → SQL: SELECT * FROM Tbl WHERE Amount > 10000"
  },
  {
    question: "How do you filter text using wildcards or partial substring matches (e.g. contains 'Corp')?",
    shortAnswer: "Click the column filter dropdown → Text Filters → Contains → Enter 'Corp' (`Table.SelectRows(Source, each Text.Contains([Name], \"Corp\")))`.",
    explanation: "Filters rows based on substring presence.",
    hint: "Text Filters → Contains (`Text.Contains`).",
    level: "basic",
    codeExample: "= Table.SelectRows(Source, each Text.Contains([Company], \"Corp\"))"
  },
  {
    question: "Is `Text.Contains` case-sensitive in Power Query by default, and how do you make it case-insensitive?",
    shortAnswer: "Yes, it is case-sensitive by default; pass `Comparer.OrdinalIgnoreCase` as the 3rd argument to make it case-insensitive.",
    explanation: "Ensures matches regardless of upper/lowercase variations.",
    hint: "Pass Comparer.OrdinalIgnoreCase.",
    level: "advanced",
    codeExample: "= Table.SelectRows(Source, each Text.Contains([City], \"kolkata\", Comparer.OrdinalIgnoreCase))"
  },
  {
    question: "How do you filter for dates falling within the current calendar year dynamically?",
    shortAnswer: "Click Date filter dropdown → Date Filters → 'This Year' (`Date.IsInCurrentYear([Invoice_Date])`).",
    explanation: "Dynamic date predicate that automatically shifts when a new year begins.",
    hint: "Date Filters → This Year (`Date.IsInCurrentYear`).",
    level: "moderate",
    codeExample: "= Table.SelectRows(Source, each Date.IsInCurrentYear([Invoice_Date]))"
  },
  {
    question: "How do you filter for the previous 30 rolling days dynamically?",
    shortAnswer: "Click Date Filters → 'In the Previous...' → Enter 30 Days (`Date.IsInPreviousNDays([Date], 30)`).",
    explanation: "Creates live operational dashboard feeds for trailing month performance.",
    hint: "Date.IsInPreviousNDays([Date], 30).",
    level: "moderate",
    codeExample: "= Table.SelectRows(Source, each Date.IsInPreviousNDays([Date], 30))"
  },
  {
    question: "When applying `Table.Distinct`, which row is kept if two duplicate rows have different data in unselected columns?",
    shortAnswer: "Power Query retains the FIRST occurrence encountered in the table stream and discards all subsequent duplicate rows.",
    explanation: "If you want the latest record, sort the table descending by Date BEFORE applying Table.Distinct.",
    hint: "Retains the first occurrence; sort before deduplicating.",
    level: "advanced",
    codeExample: "1. Table.Sort(Date Descending) → 2. Table.Distinct(Cust_ID) = Keeps Latest Record!"
  },
  {
    question: "Why should you use `Table.Buffer` before deduplicating sorted rows to guarantee the latest record is preserved?",
    shortAnswer: "Because the M engine may optimize away the sort step during lazy evaluation; `Table.Buffer` forces the sorted order into RAM before `Table.Distinct` executes.",
    explanation: "Guarantees deterministic top-record retention.",
    hint: "Table.Buffer locks sorted table in memory before Distinct.",
    level: "expert",
    codeExample: "= Table.Distinct(Table.Buffer(Table.Sort(Source, {{\"Date\", Order.Descending}})), {\"ID\"})"
  },
  {
    question: "How do you filter out records with `null` or blank values in a text column?",
    shortAnswer: "Click filter dropdown → Uncheck '(null)' and '(blank)', generating `= Table.SelectRows(Source, each [Name] <> null and [Name] <> \"\")`.",
    explanation: "Removes missing customer or invoice records.",
    hint: "each [Col] <> null and [Col] <> ''.",
    level: "basic",
    codeExample: "= Table.SelectRows(Source, each [Cust_Name] <> null and [Cust_Name] <> \"\")"
  },
  {
    question: "What is the 'Keep Top Rows' transformation in Power Query?",
    shortAnswer: "It keeps a specified number of rows from the top of the table (e.g. top 100 sales) and discards all others (`Table.FirstN`).",
    explanation: "Used to create leaderboard reports.",
    hint: "Home Tab → Keep Rows → Keep Top Rows (`Table.FirstN`).",
    level: "basic",
    codeExample: "= Table.FirstN(Source, 100)"
  },
  {
    question: "What is the 'Keep Bottom Rows' transformation in Power Query?",
    shortAnswer: "It retains a specified number of rows from the bottom of the table (`Table.LastN`).",
    explanation: "Used for bottom-performer analysis.",
    hint: "Home Tab → Keep Rows → Keep Bottom Rows (`Table.LastN`).",
    level: "basic",
    codeExample: "= Table.LastN(Source, 50)"
  },
  {
    question: "What is the 'Keep Range of Rows' transformation in Power Query?",
    shortAnswer: "It keeps rows starting from a specific starting row index and spanning a specified row count (`Table.Range`).",
    explanation: "Extracts an exact slice of records.",
    hint: "Keep Rows → Keep Range of Rows (`Table.Range`).",
    level: "moderate",
    codeExample: "= Table.Range(Source, 50, 100) (Keeps 100 rows starting at row 50)"
  },
  {
    question: "How do you filter rows based on a list of approved values (e.g. City is in {Kolkata, Mumbai, Delhi})?",
    shortAnswer: "Use `List.Contains({\"Kolkata\", \"Mumbai\", \"Delhi\"}, [City])` in a custom filter expression.",
    explanation: "Equivalent to SQL `IN ('Kolkata', 'Mumbai', 'Delhi')`.",
    hint: "List.Contains({values}, [Column]).",
    level: "advanced",
    codeExample: "= Table.SelectRows(Source, each List.Contains({\"Kolkata\", \"Mumbai\", \"Delhi\"}, [City]))"
  },
  {
    question: "How do you filter a table using values from a dynamic Parameter query?",
    shortAnswer: "Reference the parameter variable in the filter step: `= Table.SelectRows(Source, each [Region] = pSelectedRegion)`.",
    explanation: "Allows users to change reporting region via a parameter dropdown without touching M code.",
    hint: "each [Region] = pSelectedRegion.",
    level: "moderate",
    codeExample: "= Table.SelectRows(Source, each [Region] = pSelectedRegion)"
  },
  {
    question: "How do you remove errors from an entire table in one step?",
    shortAnswer: "Home Tab → Remove Rows → Remove Errors (`Table.RemoveRowsWithErrors`).",
    explanation: "Discards any row containing a cell conversion error.",
    hint: "Remove Rows → Remove Errors.",
    level: "basic",
    codeExample: "= Table.RemoveRowsWithErrors(Source, {\"Amount\", \"Date\"})"
  },
  {
    question: "What is the difference between filtering in Excel worksheet auto-filters vs Power Query filtering?",
    shortAnswer: "Excel worksheet filters merely hide rows visually in the grid; Power Query permanently strips unneeded rows in memory before loading, dramatically reducing workbook file size and calculation overhead.",
    explanation: "RAM efficiency and file compression vs visual hiding.",
    hint: "Power Query purges rows from memory; Excel grid only hides rows.",
    level: "moderate",
    codeExample: "Power Query Memory Purge vs Worksheet Visual Hide"
  },
  {
    question: "How do you sort a table by multiple columns in different directions (e.g. Department Ascending, Amount Descending)?",
    shortAnswer: "Sort Department first by clicking Ascending, then hold Shift (or sort Amount Descending); Power Query combines both in `Table.Sort`.",
    explanation: "Hierarchical multi-column sorting.",
    hint: "Table.Sort with multiple column order pairs.",
    level: "moderate",
    codeExample: "= Table.Sort(Source, {{\"Dept\", Order.Ascending}, {\"Amount\", Order.Descending}})"
  },
  {
    question: "How do you filter text columns by character length (e.g. PAN number must be exactly 10 characters)?",
    shortAnswer: "Use `Text.Length([PAN]) = 10` in a custom filter step.",
    explanation: "Validates string length compliance.",
    hint: "Text.Length([Col]) = 10.",
    level: "basic",
    codeExample: "= Table.SelectRows(Source, each Text.Length([PAN_Number]) = 10)"
  },
  {
    question: "How do you perform a numerical range filter (e.g. Amount between ₹10,000 and ₹50,000)?",
    shortAnswer: "Click Amount filter → Number Filters → Between (`[Amount] >= 10000 and [Amount] <= 50000`).",
    explanation: "Restricts records to specific value intervals.",
    hint: "Number Filters → Between.",
    level: "basic",
    codeExample: "= Table.SelectRows(Source, each [Amount] >= 10000 and [Amount] <= 50000)"
  },
  {
    question: "Why is deduplication on composite keys preferred over single-column deduplication for transaction ledgers?",
    shortAnswer: "Because a customer may legitimately perform multiple transactions on different dates; single-column dedup on Customer ID would discard all valid subsequent sales.",
    explanation: "Preserves genuine transactions while stripping accidental duplicate submissions.",
    hint: "Prevents discarding valid repeat customer purchases.",
    level: "moderate",
    codeExample: "Table.Distinct(Source, {\"Customer_ID\", \"Invoice_No\"})"
  },
  {
    question: "How do you invert a filter condition to keep everything EXCEPT a specific criteria in M?",
    shortAnswer: "Prepend the `not` operator: `= Table.SelectRows(Source, each not Text.StartsWith([Code], \"TEMP\"))`.",
    explanation: "Excludes records matching the condition.",
    hint: "each not (condition).",
    level: "basic",
    codeExample: "= Table.SelectRows(Source, each not Text.StartsWith([Status], \"Canceled\"))"
  },
  {
    question: "What is the impact of sorting large 10-million row tables in Power Query if the source is not a SQL database?",
    shortAnswer: "Sorting large flat files locally in memory consumes significant RAM and CPU time; best practice is to sort at the source database level or defer sorting until final dashboard rendering.",
    explanation: "Local sorting of huge files slows down refresh performance.",
    hint: "Sorting large flat files consumes substantial local RAM.",
    level: "expert",
    codeExample: "Performance Tip: Defer heavy sorting to the database server"
  },
  {
    question: "How do you clear a filter step in the Power Query Editor without deleting other steps?",
    shortAnswer: "Click the funnel icon on the column header and click 'Clear filter', or delete that specific 'Filtered Rows' step from the Applied Steps pane.",
    explanation: "Restores filtered rows to the active data stream.",
    hint: "Column Header Funnel → Clear Filter, or delete step.",
    level: "basic",
    codeExample: "Click Funnel → Clear Filter"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for Filtering, Sorting & Deduplication?",
    shortAnswer: "Filter early and deduplicate with composite keys! Always place row filters as early as possible in your query to trigger server-side SQL Query Folding. Never deduplicate on customer ID alone unless building dimension tables; use composite keys (Customer + Invoice + Date) for transactions, and buffer sorted tables before distinct operations to deterministically lock in the latest records!",
    explanation: "Smart filtering and deduplication keep enterprise datasets ultra-lean and razor-sharp!",
    hint: "Early Filters (Query Folding) + Composite Key Dedup + Table.Buffer = Pristine Master Data!",
    level: "expert",
    codeExample: "Rule: Filter Early → Buffer Sorted Tables → Composite Key Dedup!"
  }
];

export default questions;
