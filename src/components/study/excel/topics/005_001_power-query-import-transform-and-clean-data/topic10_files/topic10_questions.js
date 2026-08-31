// topic10_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 10
// Topic: Appending queries (Union / Stacking datasets vertically from monthly files)
// Module: 005_001_power-query-import-transform-and-clean-data
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function of 'Append Queries' in Power Query?",
    shortAnswer: "It stacks two or more tables vertically into a single consolidated table, equivalent to a SQL `UNION ALL` operation.",
    explanation: "Generates `Table.Combine` to unify datasets having matching schema structures.",
    hint: "Stacks datasets vertically (`Table.Combine` / SQL UNION ALL).",
    level: "basic",
    codeExample: "= Table.Combine({Jan_Sales, Feb_Sales, Mar_Sales})"
  },
  {
    question: "How does Power Query match columns between appended tables during an append operation?",
    shortAnswer: "By EXACT column header name and CASE-SENSITIVITY, completely ignoring the physical positional order of columns.",
    explanation: "Position does not matter; names must match character-for-character.",
    hint: "Matches by exact column header name (case-sensitive), not position.",
    level: "moderate",
    codeExample: "Col 'Date' in Pos 1 matches Col 'Date' in Pos 5 of second table"
  },
  {
    question: "What happens if Table 1 has a column named `Cust_ID` and Table 2 has `CustomerID` when appending?",
    shortAnswer: "Power Query creates TWO separate columns (`Cust_ID` and `CustomerID`) in the output table, populating `null` in the rows from the opposite table.",
    explanation: "Produces a 'jagged schema' because names did not match exactly.",
    hint: "Creates 2 separate columns with nulls in alternating rows.",
    level: "moderate",
    codeExample: "Jagged Schema: [Cust_ID] and [CustomerID] both appear with nulls"
  },
  {
    question: "What is the difference between 'Append Queries' and 'Append Queries as New'?",
    shortAnswer: "'Append Queries' mutates the active query by appending other tables onto the end of its recipe; 'Append Queries as New' creates a brand-new 3rd query preserving original queries as isolated steps.",
    explanation: "'Append as New' is safer for query auditing and modular architecture.",
    hint: "Append mutates current query; Append as New creates a separate query.",
    level: "basic",
    codeExample: "Home → Append Queries vs Append Queries as New"
  },
  {
    question: "What M function is generated when appending queries?",
    shortAnswer: "`Table.Combine(ListOfTables)`.",
    explanation: "Passes a list of table variables enclosed in curly braces `{Tbl1, Tbl2, ...}`.",
    hint: "Table.Combine.",
    level: "basic",
    codeExample: "= Table.Combine({#\"Jan_Data\", #\"Feb_Data\", #\"Mar_Data\"})"
  },
  {
    question: "How many tables can you append simultaneously in the Power Query Append dialog?",
    shortAnswer: "You can select 'Three or more tables' and append dozens of tables simultaneously in a single step.",
    explanation: "Supports appending entire lists of annual or regional queries.",
    hint: "Select 'Three or more tables' in the dialog.",
    level: "basic",
    codeExample: "= Table.Combine({T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12})"
  },
  {
    question: "Does `Table.Combine` remove duplicate rows automatically like SQL `UNION`, or preserve all rows like `UNION ALL`?",
    shortAnswer: "It acts like `UNION ALL`: all rows from all tables are preserved; you must explicitly call `Table.Distinct` if duplicate removal is desired.",
    explanation: "Preserves every transaction record by default.",
    hint: "Acts as UNION ALL; preserves all rows without automatic deduplication.",
    level: "moderate",
    codeExample: "Table.Combine = UNION ALL; Table.Distinct(Table.Combine(...)) = UNION"
  },
  {
    question: "Why should you disable 'Enable Load' on individual monthly staging queries after appending them into a Master table?",
    shortAnswer: "To prevent Power BI/Excel from loading redundant duplicate data into memory, saving 50% RAM and reducing workbook file size.",
    explanation: "Only the final consolidated master query needs to load into the Data Model.",
    hint: "Right-click staging query → Uncheck 'Enable Load' to save RAM.",
    level: "expert",
    codeExample: "Disable 'Enable Load' on Staging → Loads only Consolidated Master"
  },
  {
    question: "What happens if one appended table has a column formatted as 'Text' and the other as 'Whole Number'?",
    shortAnswer: "The resulting appended column defaults to the generic `any` data type, which must be explicitly coerced back to `Int64.Type` or `Text.Type`.",
    explanation: "Heterogeneous types collapse to 'any' in M.",
    hint: "Defaults to 'any' data type; requires explicit type casting.",
    level: "moderate",
    codeExample: "Changed Type post-append: Table.TransformColumnTypes(tbl, {{\"Amount\", type number}})"
  },
  {
    question: "How do you add a 'Source_File' or 'Month' indicator column before appending multiple monthly queries?",
    shortAnswer: "In each staging query, add a custom column with the month label (e.g. `\"2026-01\"`) before appending.",
    explanation: "Allows filtering by source period in the unified consolidated table.",
    hint: "Add Custom Column: [Month] = 'Jan 2026' in each staging table.",
    level: "basic",
    codeExample: "= Table.AddColumn(Source, \"Source_Period\", each \"2026-Jan\")"
  },
  {
    question: "How does 'From Folder' connector automate the appending of 50 monthly CSV files?",
    shortAnswer: "It reads the entire folder directory, applies a sample transform function to each file, and automatically calls `Table.Combine` on the transformed binary streams!",
    explanation: "Automatic parameterized ETL folder ingestion.",
    hint: "From Folder → Combine Files auto-generates Table.Combine.",
    level: "expert",
    codeExample: "Folder Connector → Transform Sample → Table.Combine"
  },
  {
    question: "What happens if a column exists in Table 1 but is completely absent in Table 2 when appended?",
    shortAnswer: "The column is created in the combined output; all rows originating from Table 2 will contain `null` in that column.",
    explanation: "Power Query handles schema asymmetry gracefully.",
    hint: "Column is kept; Table 2 rows receive null.",
    level: "basic",
    codeExample: "Table 2 rows populated with null for missing columns"
  },
  {
    question: "How do you standardize column header names across 12 monthly queries before appending to avoid jagged schemas?",
    shortAnswer: "Rename columns in each staging query to identical names (e.g. `Invoice_Date`, `Amount_INR`) or use a shared custom M schema-harmonization function.",
    explanation: "Guarantees seamless vertical column alignment.",
    hint: "Rename headers to identical casing and spelling before appending.",
    level: "moderate",
    codeExample: "Rename 'CustID' → 'Customer_ID' across all staging tables"
  },
  {
    question: "What is the impact of appending queries on Query Folding when sources are in the SAME SQL database?",
    shortAnswer: "Power Query folds the append into a server-side SQL `UNION ALL` statement, executing the entire consolidation on the database server!",
    explanation: "Native server-side UNION execution.",
    hint: "Folds into SQL UNION ALL if both tables share the same SQL server.",
    level: "expert",
    codeExample: "M Table.Combine → SQL: SELECT * FROM T1 UNION ALL SELECT * FROM T2"
  },
  {
    question: "What happens to Query Folding if you append a SQL database table with a local Excel spreadsheet?",
    shortAnswer: "Query Folding breaks; Power Query queries the SQL server, transfers the data to local memory, and performs the append locally in the Mashup engine.",
    explanation: "Cross-source appends terminate query folding.",
    hint: "Breaks query folding; executes mashup append in local RAM.",
    level: "expert",
    codeExample: "Cross-Source Append (SQL + Excel) = Local Mashup Processing"
  },
  {
    question: "How do you append tables dynamically without hardcoding their names in the M formula?",
    shortAnswer: "Filter `#sections[Section1]` or use `Excel.CurrentWorkbook()` to dynamically select all tables matching a prefix (e.g. `StartsWith([Name], \"Sales_\")`), and pass `[Content]` to `Table.Combine`.",
    explanation: "Dynamic query reflection and meta-programming in M.",
    hint: "Table.Combine(List.Select(Excel.CurrentWorkbook()[Content], ...)).",
    level: "expert",
    codeExample: "= Table.Combine(Table.SelectRows(Excel.CurrentWorkbook(), each Text.StartsWith([Name], \"Tbl_\"))[Content])"
  },
  {
    question: "Why should you perform data type coercions AFTER the append step rather than inside 12 separate staging queries?",
    shortAnswer: "Because heterogeneous staging types will reset to `any` anyway, and doing it once on the consolidated table saves dozens of redundant query steps.",
    explanation: "Centralizes type coercion at the end of the pipeline.",
    hint: "Perform final Changed Type once on the consolidated table.",
    level: "advanced",
    codeExample: "Append Tables → 1 Single 'Changed Type' Step"
  },
  {
    question: "What is the row count of the appended table if Table 1 has 5,000 rows and Table 2 has 8,000 rows?",
    shortAnswer: "Exactly 13,000 rows (`5,000 + 8,000`), assuming no downstream filtering.",
    explanation: "Row counts are strictly additive in Table.Combine.",
    hint: "Strictly additive: 5,000 + 8,000 = 13,000 rows.",
    level: "basic",
    codeExample: "Total Rows = RowCount(T1) + RowCount(T2)"
  },
  {
    question: "How do you reorder columns after an append operation to maintain standard corporate layout?",
    shortAnswer: "Drag and drop column headers in the preview grid, generating `Table.ReorderColumns`.",
    explanation: "Establishes a uniform column layout.",
    hint: "Drag headers or use Table.ReorderColumns.",
    level: "basic",
    codeExample: "= Table.ReorderColumns(#\"Appended\", {\"Date\", \"Branch\", \"Customer\", \"Amount\"})"
  },
  {
    question: "How do you remove completely empty rows that might have been introduced during an append operation?",
    shortAnswer: "Home Tab → Remove Rows → Remove Blank Rows (`Table.SelectRows(tbl, each not List.IsEmpty(List.RemoveMatchingItems(Record.FieldValues(_), {\"\", null})))`).",
    explanation: "Purges blank rows from dirty monthly exports.",
    hint: "Remove Rows → Remove Blank Rows.",
    level: "basic",
    codeExample: "Remove Rows → Remove Blank Rows"
  },
  {
    question: "What is the difference between 'Appending' and 'Merging' queries in Power Query?",
    shortAnswer: "'Appending' stacks rows vertically (more rows, same columns; UNION); 'Merging' joins columns horizontally based on matching key values (more columns; JOIN).",
    explanation: "Append = Vertical Stacking; Merge = Horizontal Joining.",
    hint: "Append = Vertical Stacking (UNION); Merge = Horizontal Joining (JOIN).",
    level: "basic",
    codeExample: "Append: Stacks Rows (UNION) | Merge: Joins Columns (JOIN)"
  },
  {
    question: "Can you append tables that have completely different column structures?",
    shortAnswer: "Yes; Power Query combines all unique columns from all tables, filling non-overlapping cells with `null`.",
    explanation: "Results in a full outer union schema.",
    hint: "Yes; creates union of all columns, filling blanks with null.",
    level: "moderate",
    codeExample: "Full Outer Union of Columns with Null Population"
  },
  {
    question: "How do you verify data integrity across appended monthly tables during an audit?",
    shortAnswer: "Compare the sum of individual monthly revenue figures against `SUM(Consolidated[Amount])`; both totals must reconcile to 0.00 variance.",
    explanation: "Standard financial reconciliation procedure.",
    hint: "Reconcile sum of staging tables vs sum of consolidated table.",
    level: "basic",
    codeExample: "Audit: Sum(Jan) + Sum(Feb) + Sum(Mar) == Sum(Master)"
  },
  {
    question: "How do you handle leading or trailing spaces in column headers that cause append column misalignment (e.g. `'Amount '` vs `'Amount'`)?",
    shortAnswer: "Use `Table.TransformColumnNames(tbl, Text.Trim)` on both tables before appending.",
    explanation: "Automatically sanitizes header strings across all staging tables.",
    hint: "Table.TransformColumnNames(tbl, Text.Trim) cleans header spaces.",
    level: "expert",
    codeExample: "= Table.TransformColumnNames(Source, Text.Trim)"
  },
  {
    question: "Why does Power Query maintain the top-to-bottom row sequence of appended tables in the preview?",
    shortAnswer: "Because `Table.Combine` streams rows sequentially in the order tables were passed in the list `{T1, T2, T3}`.",
    explanation: "Preserves sequential chronological order of passed tables.",
    hint: "Streams rows in the exact sequence of the passed table list.",
    level: "moderate",
    codeExample: "Row Order: Table 1 Rows → Table 2 Rows → Table 3 Rows"
  },
  {
    question: "How do you append tables containing binary files stored in an Azure Blob or SharePoint folder?",
    shortAnswer: "Connect via SharePoint/Azure connector → Filter binary extensions → Click 'Combine Files' content button.",
    explanation: "Cloud folder ingestion pattern.",
    hint: "SharePoint Connector → Combine Files button.",
    level: "advanced",
    codeExample: "SharePoint.Files → Filter Path → Combine Files"
  },
  {
    question: "How do you handle missing columns in legacy year files (e.g. 2024 has 10 columns, but 2026 has 12 columns)?",
    shortAnswer: "Append directly; Power Query creates all 12 columns, and rows from 2024 will display `null` for the 2 new columns.",
    explanation: "Graceful evolution of enterprise schema structures.",
    hint: "Power Query populates null for the 2 new columns in 2024 rows.",
    level: "moderate",
    codeExample: "2024 Rows + 2026 Rows → 12 Columns Total"
  },
  {
    question: "What is the best way to name staging queries that feed an appended Master query?",
    shortAnswer: "Prefix staging queries with `stg_` or `src_` (e.g. `stg_Sales_Jan`, `stg_Sales_Feb`) and group them in a 'Staging' query folder.",
    explanation: "Maintains professional query navigator hygiene.",
    hint: "Use 'stg_' prefix and organize in a 'Staging' query group folder.",
    level: "basic",
    codeExample: "Folder: 'Staging' → stg_Jan, stg_Feb → Master: fct_Sales"
  },
  {
    question: "How do you optimize memory consumption when appending 100 historical daily CSV files?",
    shortAnswer: "Use the 'From Folder' connector, filter out unneeded files before combining, and remove unnecessary columns inside the 'Transform Sample File' helper query.",
    explanation: "Eliminating unused columns in the sample query reduces memory by 80%.",
    hint: "Remove unused columns in the 'Transform Sample File' query.",
    level: "expert",
    codeExample: "Transform Sample File → Remove Unused Columns → High-Speed Combine"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for Appending Queries?",
    shortAnswer: "Align schemas before stacking, and disable staging loads! Column matching in Table.Combine is 100% case-sensitive and name-dependent (position is ignored)—always trim and harmonize header names to avoid jagged null columns. Always use 'Append Queries as New' for modular traceability, and remember to uncheck 'Enable Load' on staging queries so only your pristine consolidated Master table loads into memory!",
    explanation: "Clean appending is the foundation of automated multi-period corporate consolidation!",
    hint: "Exact Header Matching + Case-Sensitivity + Append as New + Disable Staging Load = Pristine Master Table!",
    level: "expert",
    codeExample: "Rule: Harmonize Headers → Table.Combine → Disable Staging Load → Single Final Type Coerce!"
  }
];

export default questions;
