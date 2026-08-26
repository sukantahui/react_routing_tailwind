// topic5_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 5
// Topic: Ingesting data from entire folders: Dynamic multi-file consolidation with custom schema handling
// Module: 005_002_advanced-power-query-m-code-scripting-and-custom-functions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function in M used to scan and list all files in a folder directory?",
    shortAnswer: "`Folder.Files(FolderPath)`.",
    explanation: "Returns a table containing metadata and binary contents for all files located in the target folder and all subfolders recursively.",
    hint: "Folder.Files(path).",
    level: "basic",
    codeExample: "= Folder.Files(p_DataDirectory)"
  },
  {
    question: "What is the difference between `Folder.Files` and `Folder.Contents` in M?",
    shortAnswer: "`Folder.Files` performs a recursive flat scan listing every file across all nested subdirectories; `Folder.Contents` lists only the immediate top-level files and subfolders as a navigable hierarchy.",
    explanation: "Recursive flat scan vs single-level hierarchical browsing.",
    hint: "Folder.Files is recursive (all subfolders); Folder.Contents is single-level navigation.",
    level: "moderate",
    codeExample: "Files = Folder.Files(\"E:\\Data\") // All files recursively\nContents = Folder.Contents(\"E:\\Data\") // Top-level items"
  },
  {
    question: "Why should you always filter the `Extension` and `Attributes[Hidden]` columns immediately after `Folder.Files`?",
    shortAnswer: "To ignore temporary lock files (e.g. `~$Monthly_Sales.xlsx`), system files, or incompatible formats that would cause fatal data corruption during binary parsing.",
    explanation: "Defensive file metadata filtering prevents corrupt binary ingestion.",
    hint: "Excludes Excel temp lock files (~$...) and non-data extensions.",
    level: "basic",
    codeExample: "= Table.SelectRows(Source, each [Extension] = \".csv\" and not [Attributes][Hidden])"
  },
  {
    question: "What 4 helper objects does Power Query's graphical 'Combine Files' wizard automatically generate?",
    shortAnswer: "1. `Sample File` (Binary query), 2. `Parameter1` (Binary parameter), 3. `Transform Sample File` (Applied steps template), and 4. `Transform File` (Custom M function).",
    explanation: "The standard auto-generated architecture for multi-file folder pipelines.",
    hint: "Sample File, Parameter1, Transform Sample File, Transform File (fx).",
    level: "moderate",
    codeExample: "Helper Queries Folder: Sample File &rarr; fx_TransformFile"
  },
  {
    question: "How do you parse Excel workbooks stored in the `[Content]` binary column in M?",
    shortAnswer: "Using `Excel.Workbook([Content], true)` (where `true` automatically promotes the first row to column headers).",
    explanation: "Extracts sheets, tables, and named ranges from binary Excel streams.",
    hint: "Excel.Workbook([Content], true).",
    level: "basic",
    codeExample: "= Table.AddColumn(Filtered, \"Custom\", each Excel.Workbook([Content], true))"
  },
  {
    question: "How do you parse CSV files stored in the `[Content]` binary column in M?",
    shortAnswer: "Using `Csv.Document([Content], [Delimiter=\",\", Columns=10, Encoding=65001, QuoteStyle=QuoteStyle.None])`.",
    explanation: "Parses delimited text streams into structured tables.",
    hint: "Csv.Document([Content], [Delimiter=\",\"]).",
    level: "basic",
    codeExample: "= Table.AddColumn(Filtered, \"Custom\", each Csv.Document([Content]))"
  },
  {
    question: "What major problem occurs if monthly branch CSV files have inconsistent column header names or column order?",
    shortAnswer: "Static column expansion (`Table.ExpandTableColumn`) will produce missing columns or mismatched data; dynamic schema unioning is required to align mismatched headers.",
    explanation: "Schema drift across decentralized branch reporting.",
    hint: "Static expansion fails on mismatched column names; requires dynamic schema union.",
    level: "moderate",
    codeExample: "Branch 1 has [GrossAmt]; Branch 2 has [Gross_Amount]"
  },
  {
    question: "How do you dynamically compute all distinct column headers across all nested tables before expanding?",
    shortAnswer: "Use `List.Distinct(List.Combine(List.Transform(Source[Data], each Table.ColumnNames(_))))`.",
    explanation: "Discovers the global union of all distinct header keys across all files.",
    hint: "List.Distinct(List.Combine(List.Transform(Table[Data], each Table.ColumnNames(_)))).",
    level: "expert",
    codeExample: "AllCols = List.Distinct(List.Combine(List.Transform(#\"Added Custom\"[Data], each Table.ColumnNames(_))))"
  },
  {
    question: "How do you preserve the source filename alongside consolidated rows?",
    shortAnswer: "Keep the `[Name]` column from `Folder.Files` before removing other metadata columns and expanding the nested `[Data]` column.",
    explanation: "Provides file-level lineage and traceability for audits.",
    hint: "Keep [Name] column before expanding [Data].",
    level: "basic",
    codeExample: "= Table.SelectColumns(Source, {\"Name\", \"Data\"})"
  },
  {
    question: "How do you extract the reporting Month and Year from a filename like `\"Sales_2026_04_Barrackpore.xlsx\"` in M?",
    shortAnswer: "Use `Text.BetweenDelimiters([Name], \"Sales_\", \"_\")` for Year and `Text.BetweenDelimiters([Name], \"2026_\", \"_\")` for Month (or `Text.Split`).",
    explanation: "Extracts metadata dimensions directly from file naming taxonomy.",
    hint: "Use Text.Split or Text.BetweenDelimiters on [Name].",
    level: "moderate",
    codeExample: "Year = Text.BetweenDelimiters([Name], \"Sales_\", \"_\")"
  },
  {
    question: "What happens if a user opens one of the Excel files in the source folder while Power Query is refreshing?",
    shortAnswer: "Excel creates a hidden lock file starting with `~$`; if not filtered out, Power Query tries to parse it as data and crashes with a corrupted file error.",
    explanation: "Excel lock file conflict.",
    hint: "Excel creates hidden ~$ lock file; filter it out with not Text.StartsWith([Name], \"~$\").",
    level: "basic",
    codeExample: "= Table.SelectRows(Source, each not Text.StartsWith([Name], \"~$\"))"
  },
  {
    question: "How do you ingest only the latest file from a folder in M?",
    shortAnswer: "Sort `[Date modified]` descending (`Order.Descending`) &rarr; Keep first row (`Table.FirstN(Source, 1)`) &rarr; Parse binary content.",
    explanation: "Standard pattern for latest-snapshot extraction pipelines.",
    hint: "Sort [Date modified] Descending &rarr; Table.FirstN(1).",
    level: "moderate",
    codeExample: "Latest = Table.FirstN(Table.Sort(Source, {{\"Date modified\", Order.Descending}}), 1)"
  },
  {
    question: "How do you consolidate multi-tab workbooks where each tab represents a different branch?",
    shortAnswer: "Parse workbook binaries &rarr; Filter `[Kind] = \"Sheet\"` &rarr; Filter out summary sheets &rarr; Expand `[Data]` &rarr; Retain `[Item]` (Tab Name) as Branch dimension.",
    explanation: "Multi-tab multi-file consolidation pattern.",
    hint: "Filter [Kind]=\"Sheet\" and preserve [Item] column as Branch identifier.",
    level: "moderate",
    codeExample: "SheetsOnly = Table.SelectRows(ExpandedWorkbook, each [Kind] = \"Sheet\")"
  },
  {
    question: "Why is it important to filter the folder contents table BEFORE expanding binary data?",
    shortAnswer: "Filtering by file extension, folder path, or date modified early reduces the number of expensive file read operations from disk, dramatically accelerating refresh speed.",
    explanation: "Early reduction of I/O operations.",
    hint: "Reduces disk I/O; never read/parse files you intend to discard.",
    level: "moderate",
    codeExample: "Filter by Extension/Date &rarr; THEN Table.AddColumn(..., each Csv.Document(...))"
  },
  {
    question: "How do you handle schema variations where some branch files have extra unexpected columns?",
    shortAnswer: "In the custom transformation function `fx_TransformFile`, apply `Table.SelectColumns(CleanedTable, ExpectedColumnsList, MissingField.Ignore)` to discard extraneous columns safely.",
    explanation: "Defensive column projection using MissingField.Ignore.",
    hint: "Table.SelectColumns(Table, ExpectedCols, MissingField.Ignore).",
    level: "expert",
    codeExample: "= Table.SelectColumns(BranchData, {\"ID\", \"Date\", \"Amt\"}, MissingField.Ignore)"
  },
  {
    question: "What is `MissingField.UseNull` in `Table.SelectColumns`?",
    shortAnswer: "An optional enum argument that injects `null` for any expected columns that are missing from a specific branch file, preventing query failure.",
    explanation: "Schema tolerance parameter in column selection.",
    hint: "Injects nulls for missing columns instead of throwing an error.",
    level: "expert",
    codeExample: "= Table.SelectColumns(BranchData, {\"ID\", \"Tax\", \"Amt\"}, MissingField.UseNull)"
  },
  {
    question: "How do you consolidate JSON files from a folder in M?",
    shortAnswer: "Filter `[Extension] = \".json\"` &rarr; Apply `Json.Document([Content])` &rarr; Convert resulting Records/Lists to Table with `Record.ToTable` or `Table.FromList`.",
    explanation: "JSON multi-file ingestion pipeline.",
    hint: "Json.Document([Content]) &rarr; Record.ToTable / Table.FromList.",
    level: "moderate",
    codeExample: "= Table.AddColumn(Filtered, \"Data\", each Json.Document([Content]))"
  },
  {
    question: "What is the role of the `Transform Sample File` query in folder ingestion?",
    shortAnswer: "It serves as the visual staging canvas where you record data cleaning steps on a single sample file; Power Query automatically replicates those steps into the custom function applied to all files.",
    explanation: "Visual template for auto-generated M function.",
    hint: "Visual template query where you record steps on 1 sample file.",
    level: "basic",
    codeExample: "Record steps on Transform Sample File &rarr; Auto-replicated to all files"
  },
  {
    question: "How do you modify the data types of columns consolidated from multiple files without breaking when new columns appear?",
    shortAnswer: "Use `Table.TransformColumnTypes` on explicitly known core columns, or dynamically iterate over column names using `List.Transform`.",
    explanation: "Resilient type casting against dynamic schemas.",
    hint: "Cast core known columns explicitly; leave dynamic columns untyped or use loop.",
    level: "advanced",
    codeExample: "Table.TransformColumnTypes(Expanded, {{\"Date\", type date}, {\"Amt\", type number}})"
  },
  {
    question: "How do you consolidate files located across different subfolders while capturing the subfolder name as a region dimension?",
    shortAnswer: "Extract the subfolder name from the `[Folder Path]` metadata column using `Text.BeforeDelimiter` or `Text.Split`.",
    explanation: "Uses directory folder hierarchy as a data classification dimension.",
    hint: "Extract subfolder name from [Folder Path] column.",
    level: "moderate",
    codeExample: "Region = Text.BetweenDelimiters([Folder Path], \"Branches\\\", \"\\\")"
  },
  {
    question: "Can Power Query consolidate files stored on SharePoint Online or OneDrive for Business folders?",
    shortAnswer: "Yes; using the `SharePoint.Files(RootSharePointURL, [ApiVersion=15])` or `SharePoint.Contents` connector.",
    explanation: "Cloud enterprise folder consolidation.",
    hint: "Yes; using SharePoint.Files(RootURL).",
    level: "moderate",
    codeExample: "= SharePoint.Files(\"https://company.sharepoint.com/teams/Finance/\", [ApiVersion=15])"
  },
  {
    question: "What is the performance benefit of combining 12 monthly files in Power Query vs manual VBA copy-pasting?",
    shortAnswer: "Power Query streams and processes files in memory without opening visible Excel instances, running 50x faster with 100% automated refreshability upon new file arrival.",
    explanation: "Headless streaming memory processing vs COM automation overhead.",
    hint: "Processes in RAM without opening Excel UI; 50x faster and auto-refreshes.",
    level: "basic",
    codeExample: "Automated 1-Click Refresh vs Error-Prone VBA Macros"
  },
  {
    question: "How do you exclude corrupted files that fail during parsing without crashing the entire consolidation pipeline?",
    shortAnswer: "Wrap the file parsing call in `try...otherwise`: `Table.AddColumn(Files, \"Data\", each try fx_Extract([Content]) otherwise null)` &rarr; Filter out `null` rows.",
    explanation: "Error resilience in large enterprise file batches.",
    hint: "Use try fx([Content]) otherwise null &rarr; Filter out nulls.",
    level: "expert",
    codeExample: "= Table.AddColumn(Files, \"Data\", each try fx_Parse([Content]) otherwise null)"
  },
  {
    question: "How do you handle files where table headers start on row 4 instead of row 1?",
    shortAnswer: "In `Transform Sample File`, use `Table.Skip(Source, 3)` &rarr; `Table.PromoteHeaders(SkippedTable)` before expanding data.",
    explanation: "Standard header offset correction.",
    hint: "Table.Skip(3) &rarr; Table.PromoteHeaders.",
    level: "basic",
    codeExample: "Table.PromoteHeaders(Table.Skip(RawTable, 3))"
  },
  {
    question: "What is the maximum number of files Power Query can consolidate from a folder?",
    shortAnswer: "There is no theoretical limit to the number of files; practical limits depend on available RAM memory and total consolidated row count (which can reach tens of millions if loaded into Power Pivot).",
    explanation: "Scalability governed by RAM and Power Pivot xVelocity engine.",
    hint: "No hard limit; governed by RAM and Power Pivot capacity.",
    level: "moderate",
    codeExample: "Consolidates thousands of files into millions of rows in Power Pivot"
  },
  {
    question: "How do you eliminate duplicate rows when overlapping files are placed in the source folder?",
    shortAnswer: "Apply `Table.Distinct(ConsolidatedTable, {\"Transaction_ID\"})` after expanding data.",
    explanation: "Post-consolidation deduplication on unique primary keys.",
    hint: "Table.Distinct(Table, {\"Transaction_ID\"}).",
    level: "basic",
    codeExample: "= Table.Distinct(ExpandedData, {\"Invoice_Number\"})"
  },
  {
    question: "Why should you avoid using `Table.Combine` on a list of 500 individual table queries created manually?",
    shortAnswer: "Creating 500 manual queries bloats the workbook, slows down UI evaluation, and requires manual maintenance; `Folder.Files` automates 500 files in a single clean query pipeline.",
    explanation: "Dynamic folder ingestion vs manual query proliferation.",
    hint: "Manual queries bloat the model; Folder.Files ingests unlimited files dynamically.",
    level: "basic",
    codeExample: "Folder.Files dynamic scan vs 500 manual queries"
  },
  {
    question: "How do you parameterize the target folder path in a folder consolidation query?",
    shortAnswer: "Pass the `p_FolderPath` parameter directly into `Folder.Files(p_FolderPath)`.",
    explanation: "Enables dynamic redirection of folder sources across environments.",
    hint: "Folder.Files(p_FolderPath).",
    level: "basic",
    codeExample: "= Folder.Files(p_FolderPath)"
  },
  {
    question: "What happens when a new monthly file is added to the folder next month?",
    shortAnswer: "Clicking 'Refresh All' automatically picks up the new file, parses it through `fx_TransformFile`, and appends its rows to the consolidated dataset without any manual intervention.",
    explanation: "Zero-touch automated ETL maintenance.",
    hint: "Click 'Refresh All'; new file is ingested automatically.",
    level: "basic",
    codeExample: "Zero-Touch Maintenance: Add file &rarr; Click Refresh"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for Folder Data Ingestion?",
    shortAnswer: "Filter early, guard against lock files (`~$`), and master dynamic schema expansion! Always parameterize `Folder.Files(p_FolderPath)`, immediately filter out hidden/lock files and non-target extensions, extract filename dimensions (`[Name]`) for lineage, and use `MissingField.Ignore` with dynamic header lists to build invincible multi-branch consolidation pipelines!",
    explanation: "Dynamic folder consolidation is the bedrock of enterprise ETL engineering!",
    hint: "Filter Early + Exclude Lock Files (~$) + Filename Lineage + Dynamic Schema Union = Enterprise Dominance!",
    level: "expert",
    codeExample: "Rule: Folder.Files(p_Path) &rarr; Filter Extension/~$ &rarr; Extract Lineage &rarr; Dynamic Expand!"
  }
];

export default questions;
