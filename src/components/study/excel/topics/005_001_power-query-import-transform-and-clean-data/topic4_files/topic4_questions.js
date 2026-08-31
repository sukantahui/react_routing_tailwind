// topic4_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 4
// Topic: Core transformations: Promoting headers, changing data types, removing blanks, and replacing values
// Module: 005_001_power-query-import-transform-and-clean-data
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function of the 'Use First Row as Headers' (Promote Headers) transformation?",
    shortAnswer: "It elevates the first row of data values into official column header names, shifting row index 1 to the table schema definition.",
    explanation: "Standard initial step when ingesting CSVs, text files, and unformatted ERP extracts.",
    hint: "Elevates row 1 to column titles.",
    level: "basic",
    codeExample: "= Table.PromoteHeaders(Source, [PromoteAllScalars=true])"
  },
  {
    question: "What is the inverse operation of 'Use First Row as Headers' in Power Query?",
    shortAnswer: "'Use Headers as First Row' (Demote Headers / `Table.DemoteHeaders`).",
    explanation: "Pushes current column header names down into row 1 of the data grid and renames columns to Column1, Column2, etc.",
    hint: "Demotes column names down into row 1.",
    level: "moderate",
    codeExample: "= Table.DemoteHeaders(#\"Prior Step\")"
  },
  {
    question: "Why does Power Query often automatically add a 'Changed Type' step immediately after 'Promote Headers'?",
    shortAnswer: "Power Query automatically inspects the first 1,000 rows to infer and assign appropriate data types (text, number, date) to each column.",
    explanation: "Can be disabled in Query Options if strict manual type control is preferred.",
    hint: "Auto-type detection based on initial sample rows.",
    level: "basic",
    codeExample: "= Table.TransformColumnTypes(#\"Promoted\", {{\"Date\", type date}, {\"Amount\", type number}})"
  },
  {
    question: "What M function is used to change column data types in Power Query?",
    shortAnswer: "`Table.TransformColumnTypes(Table, {{\"ColName\", type}})`.",
    explanation: "Applies explicit type casting across one or multiple columns simultaneously in a single step.",
    hint: "Table.TransformColumnTypes.",
    level: "basic",
    codeExample: "= Table.TransformColumnTypes(Source, {{\"Amount\", type number}, {\"Tax\", Currency.Type}})"
  },
  {
    question: "What are the common primitive data types supported in Power Query M?",
    shortAnswer: "`type text`, `type number` (Double), `Int64.Type` (Whole Number), `Currency.Type` (Fixed Decimal), `type date`, `type datetime`, `type datetimezone`, `type logical` (Boolean), and `type binary`.",
    explanation: "Comprehensive type system matching modern database schemas.",
    hint: "text, number, Int64, Currency, date, datetime, logical, binary.",
    level: "moderate",
    codeExample: "Int64.Type, type number, type date, type text, type logical"
  },
  {
    question: "How do you parse international date formats (e.g. UK `DD/MM/YYYY` vs US `MM/DD/YYYY`) correctly without errors?",
    shortAnswer: "Right-click the column header → Change Type → 'Using Locale...' → Select Data Type 'Date' and choose the source region's Locale (e.g. English (United Kingdom) or English (India)).",
    explanation: "Guarantees 100% accurate date parsing regardless of your computer's local Windows OS regional settings.",
    hint: "Change Type → Using Locale → Select Source Country Locale.",
    level: "advanced",
    codeExample: "= Table.TransformColumnTypes(Source, {{\"Date\", type date}}, \"en-GB\")"
  },
  {
    question: "How do you parse European numbers that use periods for thousands separators and commas for decimals (e.g. `1.250,50`)?",
    shortAnswer: "Right-click column → Change Type → 'Using Locale...' → Select 'Decimal Number' and choose Locale (e.g. German (Germany)).",
    explanation: "Handles continental European decimal notation seamlessly.",
    hint: "Change Type → Using Locale → German (Germany).",
    level: "advanced",
    codeExample: "= Table.TransformColumnTypes(Source, {{\"Amount\", type number}}, \"de-DE\")"
  },
  {
    question: "How do you remove entirely blank rows from a table in Power Query?",
    shortAnswer: "Click 'Remove Rows' on the Home tab → 'Remove Blank Rows' (`Table.SelectRows(Source, each not List.IsEmpty(List.RemoveMatchingItems(Record.FieldValues(_), {\"\", null})))`).",
    explanation: "Eliminates rows where every single cell is empty or null.",
    hint: "Home Tab → Remove Rows → Remove Blank Rows.",
    level: "basic",
    codeExample: "= Table.SelectRows(Source, each not List.IsEmpty(List.RemoveMatchingItems(Record.FieldValues(_), {\"\", null})))"
  },
  {
    question: "How do you filter out rows where a SPECIFIC key column is blank or null?",
    shortAnswer: "Click the filter dropdown arrow on the specific column header → Uncheck '(null)' and '(blank)', or select 'Remove Empty'.",
    explanation: "Filters rows based on that specific column's values.",
    hint: "Column Filter Dropdown → Uncheck (null) or click Remove Empty.",
    level: "basic",
    codeExample: "= Table.SelectRows(#\"Prior\", each [Customer_ID] <> null and [Customer_ID] <> \"\")"
  },
  {
    question: "What M function is used to replace specific values across a column?",
    shortAnswer: "`Table.ReplaceValue(Table, OldValue, NewValue, Replacer.ReplaceText, {\"ColName\"})` (or `Replacer.ReplaceValue`).",
    explanation: "Substitutes text, numbers, or nulls with target replacement values.",
    hint: "Table.ReplaceValue.",
    level: "moderate",
    codeExample: "= Table.ReplaceValue(#\"Prior\", \"N/A\", \"0\", Replacer.ReplaceText, {\"Amount\"})"
  },
  {
    question: "What is the difference between `Replacer.ReplaceText` and `Replacer.ReplaceValue` in M?",
    shortAnswer: "`Replacer.ReplaceText` replaces substring parts within text strings; `Replacer.ReplaceValue` performs exact full-cell matching (essential for numbers and nulls).",
    explanation: "Using ReplaceText on numeric columns will trigger errors; use ReplaceValue for non-text data types.",
    hint: "ReplaceText: Substring text replacement; ReplaceValue: Full exact value replacement.",
    level: "expert",
    codeExample: "Replacer.ReplaceText (Substrings) vs Replacer.ReplaceValue (Exact Values/Nulls)"
  },
  {
    question: "How do you replace all `null` values in a numeric column with `0` in Power Query?",
    shortAnswer: "Right-click column header → Replace Values → Value to Find: `null` (or leave blank) → Replace With: `0`.",
    explanation: "Generates `= Table.ReplaceValue(#\"Prior\", null, 0, Replacer.ReplaceValue, {\"Amount\"})`.",
    hint: "Replace Values: Find `null` → Replace with `0`.",
    level: "basic",
    codeExample: "= Table.ReplaceValue(#\"Prior\", null, 0, Replacer.ReplaceValue, {\"Amount\"})"
  },
  {
    question: "What happens if you apply 'Promote Headers' on a table that already has official headers?",
    shortAnswer: "The first data row becomes the new column headers, and the previous header names are permanently overwritten and lost from the table schema.",
    explanation: "Always check if headers were already promoted before adding another promote step.",
    hint: "Overwrites existing headers with row 1 data.",
    level: "moderate",
    codeExample: "Avoid duplicate Table.PromoteHeaders steps!"
  },
  {
    question: "How do you rename a column directly in the Power Query grid?",
    shortAnswer: "Double-click the column header text, type the new name, and press Enter (generates `Table.RenameColumns`).",
    explanation: "Renames column in the table schema definition.",
    hint: "Double-click column header → Type new name → Enter.",
    level: "basic",
    codeExample: "= Table.RenameColumns(#\"Prior\", {{\"Cust_Name\", \"Customer_Name\"}})"
  },
  {
    question: "How do you rename MULTIPLE columns in a single Applied Step to keep the M recipe clean?",
    shortAnswer: "Pass a list of pair lists to `Table.RenameColumns`: `= Table.RenameColumns(Source, {{\"Col1\", \"New1\"}, {\"Col2\", \"New2\"}, {\"Col3\", \"New3\"}})`.",
    explanation: "Consolidates multiple renames into one compact step.",
    hint: "Table.RenameColumns(Source, {{'Old1', 'New1'}, {'Old2', 'New2'}}).",
    level: "moderate",
    codeExample: "= Table.RenameColumns(Source, {{\"Old_A\", \"New_A\"}, {\"Old_B\", \"New_B\"}})"
  },
  {
    question: "How do you change the order of columns in Power Query?",
    shortAnswer: "Click and drag the column header horizontally to the desired position, or right-click → Move → To Beginning / Left / Right / To End.",
    explanation: "Generates `= Table.ReorderColumns(Table, {\"Col1\", \"Col2\", ...})`.",
    hint: "Drag and drop header, or Right-Click → Move.",
    level: "basic",
    codeExample: "= Table.ReorderColumns(#\"Prior\", {\"Invoice_Date\", \"Customer_ID\", \"Amount\"})"
  },
  {
    question: "Why should you avoid putting 'Reorder Columns' steps early in a complex query?",
    shortAnswer: "Reordering lists all column names explicitly in M; if upstream source files add or remove columns later, an early reorder step may trigger schema errors.",
    explanation: "Best practice is to reorder columns at the very end of the ETL pipeline.",
    hint: "Perform column reordering as the final polishing step.",
    level: "advanced",
    codeExample: "Best Practice: Place Table.ReorderColumns as final step before Close & Load"
  },
  {
    question: "What is the difference between 'Remove Columns' and 'Remove Other Columns'?",
    shortAnswer: "'Remove Columns' explicitly lists columns to discard; 'Remove Other Columns' lists columns to keep and discards everything else.",
    explanation: "'Remove Other Columns' is vastly superior for production stability against unexpected future columns.",
    hint: "Remove Columns: Drops specified; Remove Other Columns: Retains specified (Resilient).",
    level: "moderate",
    codeExample: "Table.RemoveColumns vs Table.SelectColumns (Remove Other Columns)"
  },
  {
    question: "How do you duplicate an existing column to preserve the original before applying destructive transforms?",
    shortAnswer: "Right-click the column header → Duplicate Column (`Table.DuplicateColumn`).",
    explanation: "Creates an exact copy with ' - Copy' appended to the header.",
    hint: "Right-click → Duplicate Column.",
    level: "basic",
    codeExample: "= Table.DuplicateColumn(#\"Prior\", \"Gross_Amount\", \"Gross_Amount_Backup\")"
  },
  {
    question: "What happens when you change a Text column containing currency symbols (e.g. `₹ 45,000`) directly to Decimal Number?",
    shortAnswer: "Power Query returns red cell Errors because the text contains currency symbols (`₹`, `$`) and comma delimiters that cannot be parsed directly by basic type casting.",
    explanation: "You must strip currency symbols and trim spaces before coercing to numeric.",
    hint: "Triggers red cell Errors due to unparsed currency symbols.",
    level: "moderate",
    codeExample: "Fix: Replace '₹' with '' → Trim → Changed Type to Number"
  },
  {
    question: "How do you convert a Unix epoch timestamp (e.g. `1740614400`) into an Excel DateTime in Power Query?",
    shortAnswer: "Use `#datetime(1970, 1, 1, 0, 0, 0) + #duration(0, 0, 0, [EpochSeconds])` in a custom column.",
    explanation: "Standard formula to convert Unix epoch seconds into M DateTime.",
    hint: "#datetime(1970,1,1,0,0,0) + #duration(0,0,0, [Epoch]).",
    level: "expert",
    codeExample: "= Table.AddColumn(#\"Prior\", \"DateTime\", each #datetime(1970,1,1,0,0,0) + #duration(0,0,0,[Timestamp]))"
  },
  {
    question: "How do you replace all Errors in a column with `0` without breaking the query?",
    shortAnswer: "Right-click column header → Replace Errors → Enter `0` (`Table.ReplaceErrorValues`).",
    explanation: "Gracefully handles arithmetic or type conversion failures.",
    hint: "Right-Click Column → Replace Errors → Enter 0.",
    level: "basic",
    codeExample: "= Table.ReplaceErrorValues(#\"Prior\", {{\"Amount\", 0}})"
  },
  {
    question: "What is the 'Remove Top Rows' transformation used for?",
    shortAnswer: "To strip metadata header rows (e.g. company titles, export dates) that appear above the actual data table in raw ERP dumps.",
    explanation: "Clears top noise rows so row 1 becomes the real column header row.",
    hint: "Home Tab → Remove Rows → Remove Top Rows.",
    level: "basic",
    codeExample: "= Table.Skip(Source, 3) (Skips top 3 title rows)"
  },
  {
    question: "What is the 'Remove Bottom Rows' transformation used for?",
    shortAnswer: "To strip trailing summary rows (e.g. 'Total', 'Report Generated on...') from the bottom of ingested spreadsheets.",
    explanation: "Prevents summary rows from corrupting tabular fact tables.",
    hint: "Home Tab → Remove Rows → Remove Bottom Rows.",
    level: "basic",
    codeExample: "= Table.RemoveLastN(#\"Prior\", 2) (Removes 2 trailing total rows)"
  },
  {
    question: "What is the 'Remove Alternate Rows' transformation used for?",
    shortAnswer: "To remove alternating pattern rows (e.g. every second row containing duplicate comments or blank spacer lines).",
    explanation: "Specify first row to remove, number of rows to remove, and number of rows to keep.",
    hint: "Removes repeating periodic pattern rows.",
    level: "advanced",
    codeExample: "= Table.RemoveAlternateRows(Source, 1, 1, 1)"
  },
  {
    question: "How do you convert text containing boolean words ('TRUE', 'FALSE', 'Yes', 'No') into native M Booleans?",
    shortAnswer: "Replace 'Yes' with 'TRUE' and 'No' with 'FALSE', then change the column data type to `type logical`.",
    explanation: "Converts strings into true True/False boolean bit flags.",
    hint: "Replace values → Change type to Logical (Boolean).",
    level: "moderate",
    codeExample: "= Table.TransformColumnTypes(#\"Replaced\", {{\"Is_Active\", type logical}})"
  },
  {
    question: "Why should you never leave columns with the generic 'type any' data type in production queries?",
    shortAnswer: "'type any' consumes extra memory, disables specialized DAX time intelligence and numeric aggregations, and blocks Query Folding.",
    explanation: "Explicit typing is mandatory for high-performance data modeling.",
    hint: "Wastes RAM, blocks query folding, and prevents DAX calculations.",
    level: "expert",
    codeExample: "Rule: Always explicitly type every column (Text, Number, Date, Logical)"
  },
  {
    question: "How do you promote headers when raw data has headers spread across two rows (e.g. Category in Row 1, Metric in Row 2)?",
    shortAnswer: "Transpose the table, merge the two column rows with a delimiter, transpose back, and then apply 'Use First Row as Headers'.",
    explanation: "Classic Power Query technique for handling multi-level headers.",
    hint: "Transpose → Merge Columns → Transpose → Promote Headers.",
    level: "expert",
    codeExample: "Table.Transpose → Table.CombineColumns → Table.Transpose → Table.PromoteHeaders"
  },
  {
    question: "How do you replace case-sensitive text (e.g. replacing only 'kolkata' in lowercase without touching 'Kolkata')?",
    shortAnswer: "Use `Replacer.ReplaceText` in `Table.ReplaceValue`; M string matching is case-sensitive by default.",
    explanation: "Enables precise surgical text replacements.",
    hint: "M replace functions are case-sensitive by default.",
    level: "moderate",
    codeExample: "= Table.ReplaceValue(#\"Prior\", \"kolkata\", \"Kolkata\", Replacer.ReplaceText, {\"City\"})"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for Core Data Transformations?",
    shortAnswer: "Structure and type discipline are the twin pillars of enterprise data modeling! Always promote headers cleanly, use 'Remove Blank Rows' to eliminate spreadsheet noise, use 'Using Locale...' to guarantee immune date parsing across global regions, and never finish a query without explicitly typing every column into Number, Date, or Text!",
    explanation: "Rigorous core transformations prevent 99% of downstream calculation bugs in Power Pivot and DAX!",
    hint: "Promote Headers + Locale Type Coercion + Remove Blanks = Flawless Schema!",
    level: "expert",
    codeExample: "Rule: Clean → Promote Headers → Locale-Aware Type Coercion → Explicit Typing!"
  }
];

export default questions;
