// topic7_questions.js - 30 Comprehensive Practice & Viva Questions
// Topic 7: Practice Session: Building a Dynamic Multi-Level Sort & Filter Dashboard
// Module: 002_001_tables-sorting-and-filtering

const questions = [
  {
    question: "What is an Excel Structured Table and how is it created from a raw range?",
    shortAnswer: "A dynamic container object created with `Ctrl + T` that treats rows and columns as structured relational fields with automatic expansion and formula propagation.",
    explanation: "Excel Tables convert static 2D cell grids into intelligent data entities that support structured references like `[@Salary]`.",
    hint: "Press Ctrl + T to convert any contiguous range into a table.",
    level: "basic",
    codeExample: "Ctrl + T &rarr; Check 'My table has headers' &rarr; Enter"
  },
  {
    question: "How do structured column references (e.g. `[@Tuition_Fee] * 0.18`) differ from standard A1 references?",
    shortAnswer: "Structured references use human-readable column header names instead of static cell coordinates ($E$2), automatically adjusting when columns are reordered.",
    explanation: "Structured formulas are self-documenting and immune to broken references caused by column insertions or deletions.",
    hint: "Use `[@ColumnName]` syntax inside table rows.",
    level: "basic",
    codeExample: "=[@Gross_Amount] - [@Discount_Amount]"
  },
  {
    question: "How do you activate the Total Row in an Excel Table with a keyboard shortcut?",
    shortAnswer: "Press `Ctrl + Shift + T` or check 'Total Row' on the Table Design ribbon tab.",
    explanation: "The Total Row inserts dynamic aggregate dropdowns at the bottom of the table using the `SUBTOTAL` function.",
    hint: "Ctrl + Shift + T toggles the Table Total Row.",
    level: "basic",
    codeExample: "Ctrl + Shift + T (Toggles Total Row)"
  },
  {
    question: "Why does the Total Row use `SUBTOTAL(109, ...)` instead of `SUM(...)`?",
    shortAnswer: "Because `SUBTOTAL(109)` calculates sums exclusively on visible rows, dynamically recalculating when the user filters the table.",
    explanation: "`SUM` includes hidden filtered rows in its calculation, producing misleading totals on filtered views.",
    hint: "Function code 109 ignores rows hidden by AutoFilter.",
    level: "moderate",
    codeExample: "=SUBTOTAL(109, [Net_Amount])"
  },
  {
    question: "How do you configure a 3-tier multi-level sort hierarchy in Excel?",
    shortAnswer: "Click inside table &rarr; Press `Alt + D + S` &rarr; Add Level 1 (Branch), Level 2 (Department), and Level 3 (Monthly Sales Descending).",
    explanation: "Multi-level sorting groups data categorically before ranking quantitative metrics within each subset.",
    hint: "Alt + D + S opens the Multi-Level Sort dialog box.",
    level: "basic",
    codeExample: "Level 1: Branch (A-Z) &rarr; Level 2: Sales (Largest to Smallest)"
  },
  {
    question: "How do you sort table data by custom list order (e.g. High, Medium, Low)?",
    shortAnswer: "In the Sort Dialog &rarr; Order dropdown &rarr; Select 'Custom List...' &rarr; Define custom sequence &rarr; OK.",
    explanation: "Custom lists override alphabetical sorting to respect corporate operational priorities.",
    hint: "Select 'Custom List...' from the Sort dialog Order dropdown.",
    level: "moderate",
    codeExample: "Custom List: High, Medium, Low, Critical"
  },
  {
    question: "What is the difference between AutoFilter wildcard characters `*` and `?`?",
    shortAnswer: "`*` represents any number of characters (e.g. `*Kolkata*`); `?` represents exactly one single character (e.g. `B?P-100`).",
    explanation: "Wildcards enable fuzzy text filtering in search boxes and structured criteria.",
    hint: "* matches any sequence; ? matches a single character.",
    level: "basic",
    codeExample: "Search: *Tech* (Contains 'Tech') | SKU-?? (Matches SKU-01, SKU-02)"
  },
  {
    question: "How do you filter for Top 10 items or Top 15% in a numeric table column?",
    shortAnswer: "Click AutoFilter arrow &rarr; Number Filters &rarr; Top 10... &rarr; Choose Top/Bottom, item count or percentage.",
    explanation: "Quickly isolates high-value outliers without sorting or manual calculation.",
    hint: "Number Filters &rarr; Top 10 &rarr; Select Items or Percent.",
    level: "basic",
    codeExample: "Number Filters &rarr; Top 10 &rarr; Top 5 Items"
  },
  {
    question: "What is Advanced Filter in Excel and when is it required over AutoFilter?",
    shortAnswer: "Advanced Filter uses separate worksheet criteria ranges to evaluate complex multi-column AND/OR logic and can extract results to a new location.",
    explanation: "AutoFilter cannot handle complex disjoint OR conditions across multiple disparate columns in one step.",
    hint: "Advanced Filter evaluates multi-row criteria ranges and copies to new locations.",
    level: "moderate",
    codeExample: "Data &rarr; Advanced Filter &rarr; List Range, Criteria Range, Copy to"
  },
  {
    question: "How are AND vs OR logic structured in an Advanced Filter criteria range?",
    shortAnswer: "Conditions placed on the SAME row evaluate as `AND`; conditions placed on DIFFERENT rows evaluate as `OR`.",
    explanation: "Row-based Boolean algebra allows modeling complex criteria tables in Excel.",
    hint: "Same row = AND; Different rows = OR in Advanced Filter criteria.",
    level: "moderate",
    codeExample: "Row 1: Branch='BKP', Sales>50000 (AND) | Row 2: Branch='SHY' (OR)"
  },
  {
    question: "How do you extract a unique list of distinct records using Advanced Filter?",
    shortAnswer: "Select Data &rarr; Advanced &rarr; Check 'Unique records only' &rarr; Select 'Copy to another location' &rarr; Specify destination cell.",
    explanation: "Deduplicates records across multiple columns without altering the primary source table.",
    hint: "Check 'Unique records only' in the Advanced Filter dialog.",
    level: "basic",
    codeExample: "Advanced Filter &rarr; Copy to another location &rarr; Check 'Unique records only'"
  },
  {
    question: "What is an Excel Table Slicer and what are its key advantages?",
    shortAnswer: "A visual, interactive button panel that filters structured tables with a single click, displaying active filter state prominently.",
    explanation: "Slicers replace small, hidden dropdown arrows with large, executive-friendly touchscreen filter buttons.",
    hint: "Insert Slicers from the Table Design ribbon tab.",
    level: "basic",
    codeExample: "Table Design &rarr; Insert Slicer &rarr; Select [Branch], [Department]"
  },
  {
    question: "How do you connect a single Slicer to multiple structured Excel Tables?",
    shortAnswer: "Standard Table Slicers connect to ONE table; to connect a slicer across multiple tables, convert tables to Pivot Tables or use the Data Model.",
    explanation: "Pivot Table slicers support Report Connections across multiple PivotTables sharing a cache.",
    hint: "Use PivotTables or Power Pivot Data Model for multi-table slicer sharing.",
    level: "advanced",
    codeExample: "Slicer &rarr; Report Connections &rarr; Check multiple PivotTables"
  },
  {
    question: "How do you format Slicer buttons into a multi-column horizontal layout?",
    shortAnswer: "Select Slicer &rarr; Slicer ribbon tab &rarr; Buttons group &rarr; Increase 'Columns' to 3, 4, or 5 &rarr; Resize horizontally.",
    explanation: "Horizontal slicers form sleek top-of-page dashboard navigation ribbons.",
    hint: "Change Slicer &rarr; Columns to 4 or 5 for horizontal toolbars.",
    level: "basic",
    codeExample: "Slicer Ribbon &rarr; Columns = 4"
  },
  {
    question: "How do you disable non-destructive Slicer item shading for missing combinations?",
    shortAnswer: "Right-click Slicer &rarr; Slicer Settings &rarr; Check 'Hide items with no data' or uncheck 'Visually indicate items with no data'.",
    explanation: "Hides greyed-out inactive buttons to prevent user confusion.",
    hint: "Slicer Settings &rarr; Hide items with no data.",
    level: "moderate",
    codeExample: "Slicer Settings &rarr; Hide items with no data = TRUE"
  },
  {
    question: "What is the structured reference syntax to sum an entire table column outside the table?",
    shortAnswer: "`=SUM(TableName[ColumnName])`",
    explanation: "Directly references the data body of the specified table column without enclosing row numbers.",
    hint: "Use TableName[ColumnName] to reference table columns anywhere in the workbook.",
    level: "basic",
    codeExample: "=SUM(SalesTable[Net_Amount])"
  },
  {
    question: "How do you reference the current row's value inside a calculated table column?",
    shortAnswer: "Prefix the column name with the `@` operator: `[@Salary]`.",
    explanation: "The `@` operator denotes the implicit intersection (current row) in Excel structured syntax.",
    hint: "Use `[@Column]` for current row referencing.",
    level: "basic",
    codeExample: "=[@Tuition_Fee] * 0.18"
  },
  {
    question: "How do you reference the entire header row of a table in a formula?",
    shortAnswer: "`TableName[[#Headers], [ColumnName]]` or `TableName[#Headers]` for all headers.",
    explanation: "Special table item specifiers include `#All`, `#Data`, `#Headers`, `#Totals`, and `#This Row`.",
    hint: "Use TableName[#Headers] to extract or count table headers.",
    level: "moderate",
    codeExample: "=COUNTA(SalesTable[#Headers])"
  },
  {
    question: "What happens when you add a new formula in an empty column adjacent to an Excel Table?",
    shortAnswer: "Excel automatically expands the table boundaries to incorporate the new column and propagates the calculated formula down all rows.",
    explanation: "Automatic table expansion eliminates manual fill-handle dragging and guarantees formula consistency.",
    hint: "Tables auto-expand and propagate formulas to all rows instantly.",
    level: "basic",
    codeExample: "Auto-Expansion = Seamless row/column boundary growth"
  },
  {
    question: "How do you convert an Excel Table back to a standard range without losing formatting?",
    shortAnswer: "Right-click anywhere inside the Table &rarr; Table &rarr; Convert to Range &rarr; Click 'Yes'.",
    explanation: "Removes structured table functionality while preserving cell styles, fills, and values.",
    hint: "Right-click Table &rarr; Table &rarr; Convert to Range.",
    level: "basic",
    codeExample: "Right-click &rarr; Table &rarr; Convert to Range"
  },
  {
    question: "How do you prevent Excel from automatically expanding tables when typing in adjacent cells?",
    shortAnswer: "File &rarr; Options &rarr; Proofing &rarr; AutoCorrect Options &rarr; AutoFormat As You Type &rarr; Uncheck 'Include new rows and columns in table'.",
    explanation: "Global Excel setting to disable automatic table boundary expansion if desired.",
    hint: "Options &rarr; Proofing &rarr; AutoCorrect &rarr; AutoFormat As You Type.",
    level: "advanced",
    codeExample: "File &rarr; Options &rarr; Proofing &rarr; AutoCorrect Options"
  },
  {
    question: "How do you highlight duplicate records in an Excel Table with Conditional Formatting?",
    shortAnswer: "Select table column &rarr; Home &rarr; Conditional Formatting &rarr; Highlight Cells Rules &rarr; Duplicate Values.",
    explanation: "Instantly applies a colored fill to identical records for audit identification.",
    hint: "Conditional Formatting &rarr; Highlight Cells Rules &rarr; Duplicate Values.",
    level: "basic",
    codeExample: "Conditional Formatting &rarr; Duplicate Values &rarr; Light Red Fill"
  },
  {
    question: "Why should you avoid using static cell coordinates (e.g. `E2*0.18`) inside Excel Table calculated columns?",
    shortAnswer: "Static references break when rows are sorted or moved, whereas structured references (`[@Fee]*0.18`) maintain row integrity dynamically.",
    explanation: "Structured references follow the record entity regardless of sorting order.",
    hint: "Always use structured references ([@Column]) in table calculations.",
    level: "basic",
    codeExample: "Use `[@Fee]*0.18` instead of `E2*0.18`"
  },
  {
    question: "How do you dynamically calculate the average of filtered rows while ignoring manually hidden rows?",
    shortAnswer: "Use `=SUBTOTAL(101, TableName[ColumnName])`.",
    explanation: "Function code 101 computes the arithmetic mean while ignoring both filter-hidden and manually hidden rows.",
    hint: "Code 101 averages visible rows only in SUBTOTAL.",
    level: "moderate",
    codeExample: "=SUBTOTAL(101, SalesTable[Monthly_Sales])"
  },
  {
    question: "How do you select an entire table column including its header with a single click?",
    shortAnswer: "Hover the mouse over the top edge of the column header until it turns into a black downward arrow &rarr; Click once for data, twice for data + header.",
    explanation: "Mouse selection shortcut for rapid table column management.",
    hint: "Click the column top edge when the cursor becomes a downward black arrow.",
    level: "basic",
    codeExample: "Downward Black Arrow Cursor &rarr; Click"
  },
  {
    question: "How do you select the entire active table with a keyboard shortcut?",
    shortAnswer: "Click inside the table &rarr; Press `Ctrl + A` once for data body; press `Ctrl + A` twice for entire table including headers and totals.",
    explanation: "Rapid table boundary selection accelerator.",
    hint: "Ctrl + A inside a table selects the data body; twice selects headers and totals.",
    level: "basic",
    codeExample: "Ctrl + A (Data Body) &rarr; Ctrl + A again (Headers + Totals)"
  },
  {
    question: "What is the risk of having blank rows inside an Excel Table?",
    shortAnswer: "Blank rows disrupt automatic fill sequences, cause AutoFilter to truncate range detection, and corrupt subtotal aggregations.",
    explanation: "Clean tabular hygiene requires removing completely blank rows from table bodies.",
    hint: "Blank rows disrupt range detection and corrupt table integrity.",
    level: "basic",
    codeExample: "Always delete completely empty rows from structured tables."
  },
  {
    question: "How do you clear all active AutoFilters across a table with a single shortcut?",
    shortAnswer: "Press `Alt + A + C` (or `Ctrl + Shift + L` twice to toggle filter off and on).",
    explanation: "`Alt + A + C` clears all active column filter criteria while leaving filter dropdown arrows enabled.",
    hint: "Alt + A + C clears all applied filters instantly.",
    level: "basic",
    codeExample: "Alt + A + C (Clear All Active Filters)"
  },
  {
    question: "How do you rename an Excel Table to a descriptive corporate name?",
    shortAnswer: "Click inside the Table &rarr; Table Design tab &rarr; Type new name in 'Table Name' box (top-left) &rarr; Press Enter.",
    explanation: "Renaming `Table1` to `tbl_BranchSales` makes downstream formulas readable and self-documenting.",
    hint: "Table Design &rarr; Table Name box (top-left).",
    level: "basic",
    codeExample: "Table Design &rarr; Table Name = tbl_BranchSales"
  },
  {
    question: "What is the ultimate golden rule of Excel Structured Tables?",
    shortAnswer: "Structure every data grid as an Excel Table: name it descriptively, use structured references, leverage Total Row subtotals, and filter with slicers.",
    explanation: "Excel Tables form the bedrock of robust, error-free financial modeling and business intelligence.",
    hint: "Tables provide dynamic expansion, self-documenting syntax, and robust data hygiene.",
    level: "basic",
    codeExample: "Table Architecture = Dynamic Expansion + Structured Syntax + Interactive Slicers"
  }
];

export default questions;
