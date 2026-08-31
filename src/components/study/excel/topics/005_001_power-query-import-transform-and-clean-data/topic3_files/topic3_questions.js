// topic3_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 3
// Topic: Cleaning and profiling data: Column quality, Column distribution, and Column profile
// Module: 005_001_power-query-import-transform-and-clean-data
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "Where are the Data Profiling tools located in the Power Query Editor?",
    shortAnswer: "On the Ribbon under the 'View' tab, in the 'Data Preview' group.",
    explanation: "Allows toggling Column Quality, Column Distribution, Column Profile, and Monospaced font.",
    hint: "View Tab → Data Preview Group.",
    level: "basic",
    codeExample: "View Tab → Check [X] Column quality, [X] Column distribution, [X] Column profile"
  },
  {
    question: "What are the 3 metrics displayed in the 'Column Quality' bar at the top of each column?",
    shortAnswer: "1. Valid (Green percentage), 2. Error (Red percentage), and 3. Empty (Grey percentage).",
    explanation: "Provides an instant visual sanity check for data hygiene.",
    hint: "Valid, Error, and Empty percentages.",
    level: "basic",
    codeExample: "Column Quality: Valid 98% | Error 0% | Empty 2%"
  },
  {
    question: "What is the difference between 'Distinct' count and 'Unique' count in Column Distribution?",
    shortAnswer: "'Distinct' is the count of different values (including those repeated); 'Unique' is the count of values that appear exactly once in the entire column.",
    explanation: "If Distinct equals Unique and equals total rows, the column is a candidate primary key.",
    hint: "Distinct: Different values; Unique: Values appearing exactly once.",
    level: "moderate",
    codeExample: "Values [A, A, B, C] → Distinct = 3 (A, B, C), Unique = 2 (B, C)"
  },
  {
    question: "How do you know if a column qualifies as a unique Primary Key using Column Distribution?",
    shortAnswer: "When Distinct Count equals Unique Count and equals the total row count (100% unique, 0 duplicates, 0 empty).",
    explanation: "Essential for verifying one-to-many relationship keys in Power Pivot data models.",
    hint: "Distinct == Unique == Total Rows.",
    level: "moderate",
    codeExample: "Customer_ID: 10,000 distinct, 10,000 unique → Valid Primary Key"
  },
  {
    question: "What does the 'Column Profile' pane display when a column is selected?",
    shortAnswer: "A detailed statistical summary: Min, Max, Average, Standard Deviation, Even/Odd count, Null count, Distinct count, and a full frequency distribution bar chart.",
    explanation: "Deep exploratory data analysis panel at the bottom of the editor.",
    hint: "Statistical summary: Min, Max, Nulls, Distinct, and Value Distribution Chart.",
    level: "advanced",
    codeExample: "Column Profile: Min = 100, Max = 95000, Avg = 14250, Nulls = 0"
  },
  {
    question: "Why does Power Query profile only the 'Top 1000 rows' by default?",
    shortAnswer: "To ensure instantaneous UI responsiveness when opening multi-million row datasets.",
    explanation: "Calculating full statistics across millions of rows on every keystroke would freeze the interface.",
    hint: "Visual performance optimization for fast editing.",
    level: "basic",
    codeExample: "Status Bar: 'Column profiling based on top 1000 rows'"
  },
  {
    question: "How do you switch the profiling engine to evaluate the 'Entire dataset'?",
    shortAnswer: "Click the status text at the bottom left of the editor window and select 'Column profiling based on entire data set'.",
    explanation: "Ensures comprehensive anomaly detection across the entire dataset.",
    hint: "Click Status Bar → Profiling based on entire data set.",
    level: "moderate",
    codeExample: "Status Bar → Select 'Column profiling based on entire data set'"
  },
  {
    question: "What action can you take directly from the Column Quality hover tooltip on 'Error'?",
    shortAnswer: "Hover over the red error bar and click 'Remove Errors' or 'Keep Errors'.",
    explanation: "'Keep Errors' isolates all failing rows in a separate staging query for forensic debugging.",
    hint: "Hover over Red Error Bar → Click 'Keep Errors' or 'Remove Errors'.",
    level: "advanced",
    codeExample: "Quality Tooltip → Click [...] → Keep Errors (Isolates Failures)"
  },
  {
    question: "What is the purpose of the 'Keep Errors' transformation?",
    shortAnswer: "It filters the table to display ONLY rows that contain cell errors, allowing analysts to identify bad records and troubleshoot format issues.",
    explanation: "Standard enterprise audit protocol for error triage.",
    hint: "Filters table to retain ONLY rows containing errors.",
    level: "moderate",
    codeExample: "= Table.SelectRowsWithErrors(Source, {\"Amount_INR\"})"
  },
  {
    question: "What happens when you click 'Remove Empty' from the Column Quality dropdown?",
    shortAnswer: "Power Query adds a filter step that eliminates all `null` and blank rows from that column.",
    explanation: "Cleans out trailing empty rows from messy spreadsheet imports.",
    hint: "Eliminates all null and blank rows.",
    level: "basic",
    codeExample: "= Table.SelectRows(#\"Changed Type\", each [Customer_ID] <> null and [Customer_ID] <> \"\")"
  },
  {
    question: "What is the benefit of enabling 'Monospaced font' in the View tab?",
    shortAnswer: "It displays text in a fixed-width font (like Consolas), making trailing spaces, padding anomalies, and fixed-width alignment mismatches instantly visible.",
    explanation: "Essential for inspecting fixed-width ERP and banking logs.",
    hint: "View Tab → Check [X] Monospaced (Fixed-Width Alignment).",
    level: "basic",
    codeExample: "View Tab → Data Preview → Check [X] Monospaced"
  },
  {
    question: "How does the Value Distribution chart in Column Profile help detect skewness or outliers?",
    shortAnswer: "It plots value frequencies as horizontal bars, highlighting extreme values, unexpected categories, or rare anomalous codes.",
    explanation: "Visual exploratory data analysis directly inside Excel.",
    hint: "Visual bar chart of frequency distribution and outliers.",
    level: "advanced",
    codeExample: "Profile Chart: 'INR' (9,980 rows), 'USD' (18 rows), 'XXX' (2 rows - Outlier)"
  },
  {
    question: "How do you replace error values with a default fallback (e.g. 0 or 'N/A') in Power Query?",
    shortAnswer: "Right-click the column header → Replace Errors → Enter replacement value.",
    explanation: "Prevents entire report queries from crashing due to single corrupted cells.",
    hint: "Right-Click Column → Replace Errors.",
    level: "basic",
    codeExample: "= Table.ReplaceErrorValues(#\"Changed Type\", {{\"Amount\", 0}})"
  },
  {
    question: "What causes a green column quality bar to show 100% Valid, but downstream DAX formulas still fail?",
    shortAnswer: "The column was typed as 'Text' rather than 'Number' or 'Date'; text strings containing numbers appear valid but cannot be summed in DAX.",
    explanation: "Always check the data type icon badge next to the column header.",
    hint: "Column is typed as Text instead of Numeric/Date.",
    level: "moderate",
    codeExample: "Data Type Badge: ABC (Text) vs 1.2 (Decimal Number)"
  },
  {
    question: "What does the 'Show whitespace' option accomplish in data profiling?",
    shortAnswer: "It makes non-printing characters like spaces, tabs, and line breaks visually distinct.",
    explanation: "Helps catch hidden leading or trailing whitespace.",
    hint: "Makes invisible whitespace and line breaks visible.",
    level: "basic",
    codeExample: "View Tab → Show Whitespace Characters"
  },
  {
    question: "How do you isolate the top 10 most frequent values in a column using Column Profile?",
    shortAnswer: "Hover over the Value Distribution chart in the Column Profile pane to see exact counts and percentages for the most frequent values.",
    explanation: "Provides instant category ranking without writing pivot tables.",
    hint: "Hover over bars in Column Profile Value Distribution.",
    level: "basic",
    codeExample: "Profile Hover: 'Barrackpore': 4,200 (42.0%)"
  },
  {
    question: "What is the risk of profiling based on the 'Entire dataset' on a 50-million row SQL table?",
    shortAnswer: "It forces Power Query to read all 50 million rows from the database across the network, causing significant delay and memory usage.",
    explanation: "Best practice is to profile on Top 1,000 rows during design, then switch to Entire Dataset only before production deployment.",
    hint: "High network bandwidth and processing delay during design.",
    level: "expert",
    codeExample: "Design Phase: Top 1000 Rows | Final Audit: Entire Dataset"
  },
  {
    question: "How do you detect trailing space discrepancies (e.g. 'Kolkata ' vs 'Kolkata') using Column Distribution?",
    shortAnswer: "Notice that 'Kolkata' appears twice in the Value Distribution list as separate distinct entries.",
    explanation: "Signals that a `Text.Trim` transformation is required.",
    hint: "Duplicate distinct entries appear in the distribution list.",
    level: "moderate",
    codeExample: "Distribution: 'Kolkata ' (40 rows) + 'Kolkata' (960 rows) → Apply Trim!"
  },
  {
    question: "What does a grey Column Quality bar indicate?",
    shortAnswer: "The percentage of cells in that column that contain `null` or blank empty values.",
    explanation: "Helps assess missing data density before modeling.",
    hint: "Percentage of null or empty blank values.",
    level: "basic",
    codeExample: "Grey Bar = Empty / Null Percentage"
  },
  {
    question: "What is the difference between an empty string `\"\"` and a `null` value in Power Query?",
    shortAnswer: "`null` represents the complete absence of a value; `\"\"` is a valid text string with zero length.",
    explanation: "`null` values are ignored by aggregations, while empty strings can cause type conversion errors.",
    hint: "null = absence of value; '' = zero-length text string.",
    level: "moderate",
    codeExample: "null &ne; \"\""
  },
  {
    question: "How do you clean all leading and trailing whitespace from a column in one click?",
    shortAnswer: "Right-click column header → Transform → Trim (`= Table.TransformColumns(Source, {{\"Name\", Text.Trim, type text}})`).",
    explanation: "Standard data hygiene step for all ingested text fields.",
    hint: "Right-click → Transform → Trim.",
    level: "basic",
    codeExample: "= Table.TransformColumns(#\"Prior\", {{\"Customer\", Text.Trim, type text}})"
  },
  {
    question: "How do you remove non-printable ASCII/Unicode control characters in Power Query?",
    shortAnswer: "Right-click column header → Transform → Clean (`= Table.TransformColumns(Source, {{\"Field\", Text.Clean, type text}})`).",
    explanation: "Strips carriage returns, line feeds, and non-printable control bytes.",
    hint: "Right-click → Transform → Clean.",
    level: "moderate",
    codeExample: "= Table.TransformColumns(#\"Prior\", {{\"RawText\", Text.Clean, type text}})"
  },
  {
    question: "What is the recommended transformation sequence for sanitizing dirty text columns?",
    shortAnswer: "1. Clean (remove control characters) → 2. Trim (remove leading/trailing spaces) → 3. Capitalize Each Word / Proper Case.",
    explanation: "Standard 3-step text hygiene pipeline.",
    hint: "Clean → Trim → Capitalize Each Word.",
    level: "moderate",
    codeExample: "1. Text.Clean → 2. Text.Trim → 3. Text.Proper"
  },
  {
    question: "How do you identify duplicate rows across an entire table using Power Query profiling?",
    shortAnswer: "Select the primary key column, inspect Column Distribution (Distinct vs Total Count), and if Distinct < Total Rows, duplicates exist.",
    explanation: "Alerts the analyst to apply 'Remove Duplicates'.",
    hint: "Distinct Count < Total Rows indicates duplicates.",
    level: "moderate",
    codeExample: "Distinct (9,800) < Total Rows (10,000) → 200 Duplicates Exist!"
  },
  {
    question: "What happens when you apply 'Remove Duplicates' on multiple selected columns?",
    shortAnswer: "Power Query removes rows only when all selected columns share identical values simultaneously (composite key deduplication).",
    explanation: "Preserves records with identical names if their dates or IDs differ.",
    hint: "Deduplicates based on composite multi-column key.",
    level: "advanced",
    codeExample: "= Table.Distinct(#\"Prior\", {\"Customer_ID\", \"Invoice_Date\"})"
  },
  {
    question: "How do you copy column profile statistics to Excel for an audit documentation report?",
    shortAnswer: "Right-click anywhere inside the Column Profile pane and select 'Copy'.",
    explanation: "Pastes a formatted statistical table directly into your audit workbook.",
    hint: "Right-click Column Profile → Copy.",
    level: "basic",
    codeExample: "Right-Click Profile → Copy → Paste in Excel Worksheet"
  },
  {
    question: "What is the 'Fill Down' transformation, and when is it applied during data cleaning?",
    shortAnswer: "It copies the last non-null value down through consecutive null cells; essential for flattening hierarchically merged ERP report layouts.",
    explanation: "Transforms merged parent rows into normalized tabular records.",
    hint: "Fills null cells with the value from above.",
    level: "basic",
    codeExample: "= Table.FillDown(#\"Prior\", {\"Department_Category\"})"
  },
  {
    question: "How do you detect casing inconsistencies (e.g. 'MUMBAI', 'Mumbai', 'mumbai') using Column Profile?",
    shortAnswer: "The Value Distribution list displays each casing variation as a separate item because M is case-sensitive.",
    explanation: "Indicates that 'Capitalize Each Word' or 'Uppercase' transformation is required.",
    hint: "Case variations appear as separate items in Value Distribution.",
    level: "moderate",
    codeExample: "Apply: Transform → Format → Capitalize Each Word"
  },
  {
    question: "Why is data profiling critical before performing Table Merges (Joins)?",
    shortAnswer: "To verify that the join key column has 0% errors, 0% nulls, and 100% unique values on the dimension table side, preventing catastrophic cartesian row explosion.",
    explanation: "Prevents duplicate join key explosion in relational models.",
    hint: "Prevents cartesian product multiplication during merges.",
    level: "expert",
    codeExample: "Verify: Dim Key = 100% Unique & 0% Nulls before Merge!"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for Data Profiling & Quality Hygiene?",
    shortAnswer: "Never load raw data into production without profiling! Always turn on Column Quality and Column Distribution under the View tab, check for red error bars and unexpected grey nulls, verify that your primary key has Distinct == Unique == Total Rows, and apply the golden triad of Clean → Trim → Type Coercion before loading to the Data Model!",
    explanation: "Data profiling is the foundational quality gate of enterprise business intelligence!",
    hint: "Column Quality + Column Distribution + Clean/Trim/Type Coercion = Pristine Data Models!",
    level: "expert",
    codeExample: "Rule: Ingestion → View Tab → Enable Column Quality &amp; Distribution Profile!"
  }
];

export default questions;
