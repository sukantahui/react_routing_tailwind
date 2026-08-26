// topic8_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 8
// Topic: Unpivoting columns: Transforming crosstab reports into normalized tabular data
// Module: 005_001_power-query-import-transform-and-clean-data
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function of the 'Unpivot Columns' transformation in Power Query?",
    shortAnswer: "It transforms wide, human-readable crosstab matrix reports (where data values exist across column headers) into tall, normalized tabular data suitable for PivotTables and Power Pivot.",
    explanation: "Converts column headers into an 'Attribute' column and cell values into a 'Value' column.",
    hint: "Flattens wide matrix reports into normalized tabular format.",
    level: "basic",
    codeExample: "= Table.UnpivotOtherColumns(Source, {\"Product\", \"Branch\"}, \"Month\", \"Revenue\")"
  },
  {
    question: "What are the 2 default column names created when you unpivot columns in Power Query?",
    shortAnswer: "'Attribute' (containing the former column header names) and 'Value' (containing the cell values).",
    explanation: "Both columns can be renamed immediately in the M formula or by double-clicking headers.",
    hint: "'Attribute' and 'Value'.",
    level: "basic",
    codeExample: "Generated Columns: [Attribute] and [Value]"
  },
  {
    question: "What are the 3 distinct variations of Unpivot available in the Transform menu?",
    shortAnswer: "1. Unpivot Columns, 2. Unpivot Other Columns, and 3. Unpivot Only Selected Columns.",
    explanation: "Allows flexible choice based on whether fixed keys or dynamic attributes are selected.",
    hint: "Unpivot Columns, Unpivot Other Columns, Unpivot Only Selected Columns.",
    level: "moderate",
    codeExample: "Right-Click Header &rarr; Unpivot Columns / Unpivot Other Columns"
  },
  {
    question: "Why is 'Unpivot Other Columns' considered the golden enterprise best practice?",
    shortAnswer: "Because it locks your key dimension columns (e.g. Product, Region) and dynamically unpivots all other columns—meaning future months (e.g. Nov, Dec) will be automatically unpivoted on refresh without editing queries!",
    explanation: "Dynamic column resilience and schema future-proofing.",
    hint: "Automatically unpivots new future month columns on refresh.",
    level: "expert",
    codeExample: "= Table.UnpivotOtherColumns(#\"Prior\", {\"Product_ID\", \"Region\"}, \"Month\", \"Amount\")"
  },
  {
    question: "What happens if you use 'Unpivot Columns' (selecting Jan through Oct) and next month November is added to the source file?",
    shortAnswer: "The November column will NOT be unpivoted and will appear as a static extra column on the right, corrupting your normalized table.",
    explanation: "Hardcoded column selections fail when new time periods are added.",
    hint: "Fails to include new columns added in future months.",
    level: "advanced",
    codeExample: "Failure: Table.Unpivot(tbl, {'Jan', 'Feb', ...}) misses 'Nov'!"
  },
  {
    question: "What M function is generated when 'Unpivot Other Columns' is applied?",
    shortAnswer: "`Table.UnpivotOtherColumns(Table, KeyColumnsList, AttributeColumnName, ValueColumnName)`.",
    explanation: "Flattens unselected columns into specified attribute and value fields.",
    hint: "Table.UnpivotOtherColumns.",
    level: "basic",
    codeExample: "= Table.UnpivotOtherColumns(Source, {\"Department\"}, \"Month\", \"Budget\")"
  },
  {
    question: "Why are wide crosstab reports (e.g. 12 months as columns) terrible for Power BI and DAX modeling?",
    shortAnswer: "Because DAX cannot perform dynamic time intelligence, slicing, or relationships across multiple separate column measures; data must be in 1 normalized 'Date' column.",
    explanation: "Star schemas require single numeric fact columns rather than 12 fragmented month measures.",
    hint: "DAX time intelligence requires a single normalized Date/Amount column.",
    level: "moderate",
    codeExample: "Wide 12-Month Matrix vs Normalized Fact Table (Date, Amount)"
  },
  {
    question: "How does unpivoting handle empty or `null` cells in the original matrix?",
    shortAnswer: "Power Query automatically discards `null` cells during unpivoting, producing an ultra-compact table without wasted empty rows.",
    explanation: "Saves memory by eliminating non-existent transaction rows.",
    hint: "Null cells are automatically omitted from output rows.",
    level: "moderate",
    codeExample: "Nulls in wide matrix are automatically omitted during Unpivot"
  },
  {
    question: "How do you unpivot a matrix that has MULTI-LEVEL headers (e.g. Year in Row 1, Month in Row 2, Metric in Row 3)?",
    shortAnswer: "1. Transpose the table, 2. Fill Down parent headers, 3. Merge header columns with a delimiter (e.g. ';'), 4. Transpose back, 5. Promote Headers, 6. Unpivot Other Columns, 7. Split the Attribute column by delimiter.",
    explanation: "The definitive 7-step Power Query algorithm for unpivoting complex stacked matrix headers.",
    hint: "Transpose &rarr; Fill Down &rarr; Merge &rarr; Transpose &rarr; Promote &rarr; Unpivot &rarr; Split.",
    level: "expert",
    codeExample: "Transpose &rarr; Fill Down &rarr; Combine Columns &rarr; Transpose &rarr; Unpivot &rarr; Split"
  },
  {
    question: "What is the difference between 'Unpivoting' and 'Transposing' a table?",
    shortAnswer: "'Transpose' simply rotates the entire grid 90 degrees (rows become columns and columns become rows); 'Unpivot' reorganizes cross-tabulated metric matrices into normalized relational record pairs.",
    explanation: "Transpose changes orientation; Unpivot normalizes schema structure.",
    hint: "Transpose rotates grid; Unpivot normalizes matrix metrics.",
    level: "moderate",
    codeExample: "Table.Transpose vs Table.UnpivotOtherColumns"
  },
  {
    question: "How do you convert unpivoted text month names (e.g. 'Jan', 'Feb') into true calendar Dates?",
    shortAnswer: "Merge with the Year column (e.g. 'Jan-2026') or add a custom column parsing the month text, then coerce to `type date` with locale.",
    explanation: "Enables DAX time intelligence functions (YTD, Prior Year).",
    hint: "Merge Month + Year &rarr; Change Type to Date.",
    level: "moderate",
    codeExample: "= Table.TransformColumnTypes(#\"Merged\", {{\"Month_Date\", type date}}, \"en-US\")"
  },
  {
    question: "Can you unpivot a table that contains multiple key dimension columns (e.g. Store, Department, Region)?",
    shortAnswer: "Yes, select all 3 key columns (Store, Dept, Region) &rarr; Right-click &rarr; Unpivot Other Columns.",
    explanation: "All 3 key columns remain fixed while all numeric columns unpivot.",
    hint: "Select all key columns &rarr; Unpivot Other Columns.",
    level: "basic",
    codeExample: "= Table.UnpivotOtherColumns(Source, {\"Store\", \"Dept\", \"Region\"}, \"Month\", \"Revenue\")"
  },
  {
    question: "What is the mathematical row count multiplication formula during an unpivot operation?",
    shortAnswer: "`Output Rows = Initial Rows &times; Unpivoted Columns` (minus any null cells).",
    explanation: "100 products across 12 months generates up to 1,200 normalized rows.",
    hint: "Rows = Initial Rows &times; Unpivoted Columns (minus nulls).",
    level: "basic",
    codeExample: "100 Rows &times; 12 Months = 1,200 Normalized Fact Rows"
  },
  {
    question: "How do you unpivot a table where the column headers contain actual transaction dates (e.g. `01/01/2026`, `02/01/2026`)?",
    shortAnswer: "Select key dimensions &rarr; Unpivot Other Columns &rarr; Change the resulting 'Attribute' column data type directly to `type date`.",
    explanation: "Creates a genuine Date fact table in 2 steps.",
    hint: "Unpivot Other Columns &rarr; Change Attribute type to Date.",
    level: "basic",
    codeExample: "Attribute &rarr; Changed Type: type date"
  },
  {
    question: "How do you preserve zero values during unpivoting when zeros represent valid zero-revenue days?",
    shortAnswer: "Ensure zeros are stored as `0` rather than `null`; Power Query preserves `0` while discarding `null`.",
    explanation: "Zero is a valid numeric value; null is the absence of data.",
    hint: "Zeros are preserved; only nulls are omitted.",
    level: "moderate",
    codeExample: "0 is kept as a valid fact row; null is discarded"
  },
  {
    question: "What is Third Normal Form (3NF) and why does unpivoting achieve it?",
    shortAnswer: "3NF is a database design standard where every non-key attribute depends strictly on the primary key and no values are repeated across column definitions.",
    explanation: "Unpivoting eliminates repeated column groups (Jan, Feb, Mar) into atomic attribute-value pairs.",
    hint: "Relational standard eliminating repeated column groups.",
    level: "advanced",
    codeExample: "Crosstab Matrix &rarr; 3NF Relational Fact Table"
  },
  {
    question: "How do you unpivot two different metric types simultaneously (e.g. Actuals and Budget columns for each month)?",
    shortAnswer: "1. Unpivot all columns, 2. Split the Attribute column into Month and MetricType, 3. Pivot the MetricType column using Value as the aggregation column.",
    explanation: "Generates a clean 4-column table: Product, Month, Actuals, Budget.",
    hint: "Unpivot all &rarr; Split Attribute &rarr; Pivot MetricType.",
    level: "expert",
    codeExample: "Unpivot All &rarr; Split 'Jan_Actual' into 'Jan' | 'Actual' &rarr; Pivot 'Actual' vs 'Budget'"
  },
  {
    question: "What is the risk of having trailing total columns (e.g. 'Full Year Total') in your matrix before unpivoting?",
    shortAnswer: "The 'Total' column will be unpivoted as if it were a regular month, doubling your overall aggregated revenue in downstream pivot tables!",
    explanation: "Always remove summary/total columns before unpivoting.",
    hint: "Doubles revenue totals; always remove summary columns first.",
    level: "advanced",
    codeExample: "Warning: Drop 'Total' column before applying Unpivot!"
  },
  {
    question: "How do you remove summary Total columns before applying Unpivot?",
    shortAnswer: "Select the 'Total' column &rarr; Right-click &rarr; Remove Columns (or filter out during column selection).",
    explanation: "Ensures only base period attributes are unpivoted.",
    hint: "Right-click 'Total' &rarr; Remove Column.",
    level: "basic",
    codeExample: "= Table.RemoveColumns(Source, {\"Total_FY26\"})"
  },
  {
    question: "Why does unpivoting dramatically simplify DAX measure creation in Power BI?",
    shortAnswer: "With unpivoted data, you write a single measure `= SUM(Sales[Revenue])` instead of 12 separate measures (`= SUM(Sales[Jan]) + SUM(Sales[Feb]) + ...`).",
    explanation: "Reduces 50 complex measures to 1 dynamic measure.",
    hint: "1 universal measure replaces 12 separate monthly formulas.",
    level: "moderate",
    codeExample: "1 Measure: SUM(Sales[Revenue]) vs 12 Separate Formulas"
  },
  {
    question: "How do you rename the resulting Attribute and Value columns directly inside the M `Table.UnpivotOtherColumns` step?",
    shortAnswer: "Pass custom strings as the 3rd and 4th arguments: `= Table.UnpivotOtherColumns(Source, {\"ID\"}, \"Fiscal_Period\", \"Gross_Revenue\")`.",
    explanation: "Eliminates an extra 'Rename Columns' step in the Applied Steps recipe.",
    hint: "Table.UnpivotOtherColumns(tbl, keys, 'Month', 'Revenue').",
    level: "moderate",
    codeExample: "= Table.UnpivotOtherColumns(Source, {\"Product\"}, \"Reporting_Month\", \"Amount_INR\")"
  },
  {
    question: "What happens if a row in the wide matrix contains nulls across ALL 12 months?",
    shortAnswer: "No unpivoted rows are generated for that product, automatically purging dead product records from the fact table.",
    explanation: "Cleanses non-active dimension records from transaction facts.",
    hint: "Product generates 0 output rows if all months are null.",
    level: "basic",
    codeExample: "100% null row generates 0 fact records"
  },
  {
    question: "How do you sort the unpivoted table chronologically when months are stored as text abbreviations ('Jan', 'Feb')?",
    shortAnswer: "Add a Month Number helper column (e.g. Jan=1, Feb=2) or convert to date, then sort by that numeric column.",
    explanation: "Prevents alphabetical sorting ('April', 'August', 'December').",
    hint: "Convert to Date or map to Month Number (1-12) before sorting.",
    level: "moderate",
    codeExample: "Add MonthNumber (1-12) &rarr; Sort Ascending"
  },
  {
    question: "Can Power Query unpivot an arbitrary number of dynamic columns (e.g. 50 regional store columns)?",
    shortAnswer: "Yes, by selecting the non-store key columns (Product, Date) and clicking 'Unpivot Other Columns'.",
    explanation: "Scales effortlessly to hundreds of unpivoted attribute columns.",
    hint: "Select fixed keys &rarr; Unpivot Other Columns.",
    level: "basic",
    codeExample: "Unpivots 50 Store columns into 1 [Store] attribute column"
  },
  {
    question: "What is the primary visual difference in Excel between a PivotTable and an Unpivoted table?",
    shortAnswer: "A PivotTable is a summarized reporting view (wide matrix); an Unpivoted table is the underlying raw normalized database feed (flat tabular rows).",
    explanation: "You unpivot to feed PivotTables, not the reverse.",
    hint: "Unpivoted = Raw Normalized Fact; PivotTable = Summarized View.",
    level: "basic",
    codeExample: "Flat Fact Feed &rarr; Powers Interactive PivotTables"
  },
  {
    question: "How do you handle currency symbols embedded inside wide matrix cells before unpivoting?",
    shortAnswer: "Unpivot first! It is 10x faster to clean 1 unpivoted 'Value' column than to clean 12 separate month columns.",
    explanation: "Always unpivot before applying column-level cleaning and numeric type casting.",
    hint: "Unpivot FIRST, then clean the single 'Value' column!",
    level: "expert",
    codeExample: "Unpivot First &rarr; Clean 1 Value Column (Saves 12 Steps!)"
  },
  {
    question: "Why should you unpivot before changing data types on matrix values?",
    shortAnswer: "Because changing types on 12 separate columns requires 12 type conversions; unpivoting first allows a single type conversion step on the 'Value' column.",
    explanation: "Massive reduction in M code complexity and calculation time.",
    hint: "Reduces 12 type conversion steps down to 1 single step.",
    level: "expert",
    codeExample: "Unpivot &rarr; 1 Single 'Changed Type' Step on [Value]"
  },
  {
    question: "How do you unpivot an ERP trial balance report that has Debit and Credit in separate column groups?",
    shortAnswer: "Unpivot all account periods, split the attribute into Period and Type (Debit/Credit), and calculate Net Amount (`[Debit] - [Credit]`).",
    explanation: "Standard accounting trial balance ETL pipeline.",
    hint: "Unpivot &rarr; Split Period/Type &rarr; Net Debit/Credit.",
    level: "advanced",
    codeExample: "Trial Balance Matrix &rarr; Normalized Journal Entry Ledger"
  },
  {
    question: "How do you verify that an unpivot operation did not lose or duplicate total revenue?",
    shortAnswer: "Calculate the SUM of the original matrix in Excel, then compare with `SUM(Unpivoted[Value])`; both numbers must match to the exact paisa.",
    explanation: "Reconciliation sanity check for financial audits.",
    hint: "Compare SUM of wide matrix vs SUM of unpivoted value column.",
    level: "basic",
    codeExample: "Reconciliation Check: Sum(Matrix) == Sum(Unpivoted[Value])"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for Unpivoting Data?",
    shortAnswer: "Never build models on crosstab matrices! Always use 'Unpivot Other Columns' (never Unpivot Columns) to make your queries 100% resilient to future month additions. Drop total summary columns before unpivoting, unpivot BEFORE changing numeric data types to save dozen of repetitive steps, and convert the resulting Attribute column into true calendar dates for seamless DAX time-intelligence analytics!",
    explanation: "Unpivoting is the ultimate gateway from amateur spreadsheets to professional data modeling!",
    hint: "Unpivot Other Columns (Resilience) + Drop Totals + Clean Value Post-Unpivot = Flawless Fact Table!",
    level: "expert",
    codeExample: "Rule: Drop Totals &rarr; Select Keys &rarr; Unpivot Other Columns &rarr; Type Coerce [Value]!"
  }
];

export default questions;
