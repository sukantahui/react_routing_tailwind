// topic8_questions.js - 30 Comprehensive Assessment & Quiz Questions
// Topic 8: Test Your Skill: Structured Tables, Sorting, Filtering & Slicers
// Module: 002_001_tables-sorting-and-filtering

const questions = [
  {
    question: "What is the primary operational advantage of converting a range to an Excel Table (`Ctrl + T`)?",
    shortAnswer: "Tables automatically expand their boundaries when new rows or columns are added and automatically propagate formulas down calculated columns.",
    explanation: "Excel Tables convert static cell coordinates into dynamic relational entities with self-expanding ranges.",
    hint: "Auto-expansion and automatic formula propagation.",
    level: "basic",
    codeExample: "Ctrl + T → Create Table → Name: tbl_MasterData"
  },
  {
    question: "How do structured table references (`[@Gross] * 0.18`) improve formula reliability over `$E$2 * 0.18`?",
    shortAnswer: "Structured references use column names and maintain record row integrity even when data is sorted, filtered, or columns are reordered.",
    explanation: "Static coordinate formulas can break or reference wrong cells if columns are inserted or deleted.",
    hint: "Structured references are self-documenting and immune to column shifting.",
    level: "basic",
    codeExample: "=[@Salary] * [@Bonus_Rate]"
  },
  {
    question: "Why should `SUBTOTAL(109, ...)` be used on filtered tables instead of `SUM(...)`?",
    shortAnswer: "Because `SUBTOTAL(109)` calculates sums on visible rows only, whereas `SUM` includes hidden rows.",
    explanation: "Function codes 101-111 ignore rows hidden by AutoFilters and manual hiding.",
    hint: "SUBTOTAL 109 computes visible rows only.",
    level: "moderate",
    codeExample: "=SUBTOTAL(109, [Net_Amount])"
  },
  {
    question: "How do you open the Multi-Level Sort dialog box via keyboard?",
    shortAnswer: "Press `Alt + D + S` (or `Alt + A + S + S`).",
    explanation: "Allows adding multiple sorting levels (e.g. Branch, Department, Sales Descending).",
    hint: "Alt + D + S opens the Sort dialog.",
    level: "basic",
    codeExample: "Alt + D + S → Add Level → Configure Sort Order"
  },
  {
    question: "What is the difference between sorting by values vs sorting by cell color or font color?",
    shortAnswer: "Sorting by values orders data numerically/alphabetically; sorting by color brings cells with specific highlight fills to the top.",
    explanation: "Useful for reviewing conditionally formatted exceptions or audit flags.",
    hint: "Sort on 'Cell Color' to pull flagged rows to the top.",
    level: "basic",
    codeExample: "Sort On: Cell Color → Order: Red Fill On Top"
  },
  {
    question: "How does AutoFilter wildcard `*` differ from `?`?",
    shortAnswer: "`*` represents any number of characters (e.g. `*East*`); `?` represents exactly one single character (e.g. `B?P`).",
    explanation: "Enables flexible pattern matching in text filters.",
    hint: "* matches any character sequence; ? matches exactly one character.",
    level: "basic",
    codeExample: "Filter: SKU-??? (Matches 3-digit SKUs)"
  },
  {
    question: "How do you clear all active filters across a table instantly?",
    shortAnswer: "Press `Alt + A + C`.",
    explanation: "Resets all column filter criteria while keeping the filter dropdowns active.",
    hint: "Alt + A + C clears all applied filters.",
    level: "basic",
    codeExample: "Alt + A + C (Clear All Filters)"
  },
  {
    question: "What is Advanced Filter and when is it required over AutoFilter?",
    shortAnswer: "Advanced Filter evaluates complex multi-column AND/OR criteria ranges and can extract unique rows to a new location.",
    explanation: "Handles disjoint criteria across multiple fields that AutoFilter cannot model in one step.",
    hint: "Advanced Filter handles multi-row criteria ranges and separate destination extraction.",
    level: "moderate",
    codeExample: "Data → Advanced Filter → Criteria Range → Copy to location"
  },
  {
    question: "How is OR logic represented in an Advanced Filter criteria table?",
    shortAnswer: "By placing criteria conditions on different rows of the criteria range.",
    explanation: "Conditions in the same row evaluate as AND; conditions on separate rows evaluate as OR.",
    hint: "Different rows = OR in Advanced Filter criteria.",
    level: "moderate",
    codeExample: "Row 1: [Branch]='BKP' | Row 2: [Sales]>50000"
  },
  {
    question: "How do you extract a unique list of distinct records using Advanced Filter?",
    shortAnswer: "Data → Advanced → Check 'Unique records only' → Copy to another location.",
    explanation: "Deduplicates records without altering the original source data table.",
    hint: "Check 'Unique records only' in Advanced Filter.",
    level: "basic",
    codeExample: "Advanced Filter → Copy to → Unique records only = TRUE"
  },
  {
    question: "What is an Excel Table Slicer?",
    shortAnswer: "A visual, touch-friendly button panel that filters structured tables with a single click.",
    explanation: "Slicers provide clear visual indication of active filter criteria.",
    hint: "Insert Slicers from Table Design to create button-based visual filters.",
    level: "basic",
    codeExample: "Table Design → Insert Slicer → [Department]"
  },
  {
    question: "How do you format Slicer buttons into a multi-column horizontal toolbar?",
    shortAnswer: "Select Slicer → Slicer ribbon tab → Buttons group → Increase 'Columns' to 4 or 5.",
    explanation: "Creates a sleek horizontal dashboard filter ribbon.",
    hint: "Change Slicer Columns count on the Slicer ribbon tab.",
    level: "basic",
    codeExample: "Slicer Ribbon → Columns = 4"
  },
  {
    question: "How do you toggle the Table Total Row using a keyboard shortcut?",
    shortAnswer: "Press `Ctrl + Shift + T`.",
    explanation: "Toggles the dynamic aggregate Total Row at the bottom of the table.",
    hint: "Ctrl + Shift + T toggles the Total Row.",
    level: "basic",
    codeExample: "Ctrl + Shift + T"
  },
  {
    question: "What is the structured reference syntax for the entire data column of a table?",
    shortAnswer: "`TableName[ColumnName]`",
    explanation: "References all data body cells in that column, automatically expanding as rows are added.",
    hint: "TableName[ColumnName] references the full column data body.",
    level: "basic",
    codeExample: "=AVERAGE(tbl_Sales[Monthly_Revenue])"
  },
  {
    question: "How do you reference the current row's field in a calculated column?",
    shortAnswer: "`[@ColumnName]`",
    explanation: "The `@` operator indicates implicit intersection with the current row.",
    hint: "Use `[@ColumnName]` for current row referencing.",
    level: "basic",
    codeExample: "=[@Gross] * (1 - [@Tax_Rate])"
  },
  {
    question: "How do you reference the header cells of an Excel Table in a formula?",
    shortAnswer: "`TableName[[#Headers], [ColumnName]]` or `TableName[#Headers]`.",
    explanation: "Special table item specifiers include `#All`, `#Data`, `#Headers`, `#Totals`, and `#This Row`.",
    hint: "Use `#Headers` inside table structured references.",
    level: "moderate",
    codeExample: "=COUNTA(tbl_Staff[#Headers])"
  },
  {
    question: "How do you convert an Excel Table back to a normal range without losing formatting?",
    shortAnswer: "Right-click Table → Table → Convert to Range → Click 'Yes'.",
    explanation: "Preserves cell formats, fills, and values while removing structured table features.",
    hint: "Right-click → Table → Convert to Range.",
    level: "basic",
    codeExample: "Right-click → Table → Convert to Range"
  },
  {
    question: "Why should you avoid blank rows and blank columns inside structured tables?",
    shortAnswer: "Blank rows disrupt automatic fill sequences, cause AutoFilter range detection errors, and corrupt subtotal aggregations.",
    explanation: "Clean tabular hygiene requires unbroken contiguous data rows.",
    hint: "Blank rows break range detection and formula auto-fill.",
    level: "basic",
    codeExample: "Maintain 100% contiguous data rows without blank lines."
  },
  {
    question: "How do you select an entire table column's data with one click?",
    shortAnswer: "Hover over the top edge of the column header until a black downward arrow appears → Click once.",
    explanation: "Rapid column data body selection.",
    hint: "Click the column header's top border when the downward arrow cursor appears.",
    level: "basic",
    codeExample: "Downward Arrow Cursor → 1 Click"
  },
  {
    question: "How do you select an entire table including headers and total row with a shortcut?",
    shortAnswer: "Click inside table → Press `Ctrl + A` twice.",
    explanation: "Pressing Ctrl+A once selects the data body; pressing Ctrl+A again selects headers and totals.",
    hint: "Ctrl + A twice inside a table.",
    level: "basic",
    codeExample: "Ctrl + A (Data) → Ctrl + A (Headers + Totals)"
  },
  {
    question: "How do you rename an Excel Table to a meaningful name?",
    shortAnswer: "Click inside Table → Table Design tab → Type new name in 'Table Name' box (top-left) → Enter.",
    explanation: "Descriptive table names (e.g. `tbl_BranchSales`) make formulas self-documenting.",
    hint: "Table Design → Table Name box.",
    level: "basic",
    codeExample: "Table Design → Table Name = tbl_BranchSales"
  },
  {
    question: "What is the difference between SUBTOTAL function code 9 and 109?",
    shortAnswer: "Code 9 includes manually hidden rows; Code 109 ignores both filter-hidden and manually hidden rows.",
    explanation: "Both ignore AutoFiltered rows, but 109 also ignores rows hidden via right-click Hide.",
    hint: "Code 109 ignores both filter-hidden and manually hidden rows.",
    level: "advanced",
    codeExample: "SUBTOTAL(9, ...) vs SUBTOTAL(109, ...)"
  },
  {
    question: "How do you create a dynamic Top 5 filter on a table column?",
    shortAnswer: "AutoFilter arrow → Number Filters → Top 10... → Set count to 5.",
    explanation: "Quickly isolates the highest 5 values in the dataset.",
    hint: "Number Filters → Top 10 → Change 10 to 5.",
    level: "basic",
    codeExample: "Number Filters → Top 10 → Top 5 Items"
  },
  {
    question: "How do you filter date columns by 'This Quarter' or 'Next Month'?",
    shortAnswer: "AutoFilter arrow → Date Filters → Select 'This Quarter' or 'Next Month'.",
    explanation: "Excel automatically detects date data types and provides dynamic rolling time filters.",
    hint: "Use Date Filters submenu on date columns.",
    level: "basic",
    codeExample: "Date Filters → This Quarter"
  },
  {
    question: "How do you hide disabled Slicer buttons that have no matching data?",
    shortAnswer: "Right-click Slicer → Slicer Settings → Check 'Hide items with no data'.",
    explanation: "Prevents greyed-out inactive buttons from cluttering the interface.",
    hint: "Slicer Settings → Hide items with no data.",
    level: "moderate",
    codeExample: "Slicer Settings → Hide items with no data = TRUE"
  },
  {
    question: "Why should you never hardcode cell references (like `E2`) in calculated table columns?",
    shortAnswer: "Because sorting the table reorders row physical positions, causing hardcoded references to break or compute incorrect values.",
    explanation: "Structured references (`[@Column]`) bind to the record entity dynamically.",
    hint: "Always use `[@Column]` to preserve entity record binding.",
    level: "basic",
    codeExample: "Use `[@Revenue] * 0.18` instead of `E2 * 0.18`"
  },
  {
    question: "How do you magnetically align Slicers to worksheet cell boundaries?",
    shortAnswer: "Hold the `Alt` key while dragging or resizing the Slicer bounding box.",
    explanation: "The Alt key snaps the slicer edges to the underlying cell grid.",
    hint: "Hold Alt while dragging slicer borders.",
    level: "basic",
    codeExample: "Hold ALT + Drag Slicer"
  },
  {
    question: "How do you group multiple Slicers together for dashboard management?",
    shortAnswer: "Hold `Ctrl` and select all slicers → Slicer ribbon → Align / Group.",
    explanation: "Allows moving and formatting all slicers as a unified navigation toolbar.",
    hint: "Ctrl-click slicers → Slicer tab → Group.",
    level: "basic",
    codeExample: "Ctrl-click → Slicer → Group"
  },
  {
    question: "What happens when an Excel Table is used as the data source for a PivotTable?",
    shortAnswer: "When new transactions are added to the table, refreshing the PivotTable automatically includes the new data without changing the source range.",
    explanation: "Tables eliminate the need to update `A1:F100` ranges manually in PivotTables.",
    hint: "PivotTables bound to structured tables expand automatically on refresh.",
    level: "moderate",
    codeExample: "PivotTable Source: tbl_Transactions (Auto-Expanding)"
  },
  {
    question: "What is the ultimate golden rule of Excel Data Wrangling with Tables?",
    shortAnswer: "Convert every tabular dataset into an Excel Table: name it cleanly, write structured [@Column] formulas, and connect interactive visual Slicers.",
    explanation: "Structured tables provide the bedrock for resilient financial models, charts, and business intelligence pipelines.",
    hint: "Structured tables provide automated expansion, clear syntax, and dynamic filtering.",
    level: "basic",
    codeExample: "Data Wrangling Mastery = Structured Tables + Multi-Sort + Visual Slicers"
  }
];

export default questions;
