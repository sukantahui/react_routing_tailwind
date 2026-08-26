// topic0_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 0
// Topic: Introduction to Power Query and Modern Automated ETL Architecture
// Module: 005_001_power-query-import-transform-and-clean-data
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is Power Query in Microsoft Excel and Power BI?",
    shortAnswer: "A powerful, self-service data ingestion and automated ETL (Extract, Transform, Load) engine.",
    explanation: "Allows business analysts to connect to heterogeneous sources, transform data via repeatable visual steps, and load clean models without code.",
    hint: "Automated ETL and data preparation engine.",
    level: "basic",
    codeExample: "Excel Ribbon &rarr; Data Tab &rarr; Get Data (Power Query)"
  },
  {
    question: "What do the letters ETL stand for in modern enterprise data architecture?",
    shortAnswer: "Extract, Transform, and Load.",
    explanation: "Extract: ingest raw data; Transform: clean, filter, and reshape; Load: output to tables or data models.",
    hint: "Extract &rarr; Transform &rarr; Load.",
    level: "basic",
    codeExample: "Extract &rarr; Transform &rarr; Load"
  },
  {
    question: "What underlying programming language powers all Power Query transformations?",
    shortAnswer: "The M Language (formally Power Query Formula Language).",
    explanation: "A functional, case-sensitive, declarative language specifically optimized for streaming data transformations.",
    hint: "The M functional programming language.",
    level: "basic",
    codeExample: "= Table.TransformColumnTypes(Source, {{\"Amount\", type number}})"
  },
  {
    question: "Why is Power Query described as a 'non-destructive' data transformation tool?",
    shortAnswer: "It never modifies or overwrites the original source files; it imports a cached snapshot, records recipe steps, and applies them in memory.",
    explanation: "Guarantees raw data immutability and complete forensic audit trails.",
    hint: "Raw source files remain completely untouched.",
    level: "basic",
    codeExample: "Source File (Read-Only) &rarr; Memory Stream &rarr; Output Model"
  },
  {
    question: "What is the 'Applied Steps' pane in the Power Query Editor?",
    shortAnswer: "A sequential list of recorded transformation actions that execute chronologically from top to bottom every time the query is refreshed.",
    explanation: "Allows analysts to reorder, delete, edit, or inspect intermediate data states like a recorded cooking recipe.",
    hint: "Sequential transformation recipe pane.",
    level: "basic",
    codeExample: "Source &rarr; Promoted Headers &rarr; Changed Type &rarr; Filtered Rows"
  },
  {
    question: "How does Power Query compare with legacy VBA macros for data cleaning?",
    shortAnswer: "Power Query is 10x faster, resilient to structural column changes, requires zero code for 95% of tasks, works on Web/Mac, and avoids macro security blocks.",
    explanation: "Modern declarative ETL vs procedural VBA scripting.",
    hint: "10x faster, declarative, cross-platform, zero macro security warnings.",
    level: "moderate",
    codeExample: "Visual Repeatable Applied Steps vs Brittle VBA Loops"
  },
  {
    question: "What happens when you click 'Refresh All' in an Excel workbook powered by Power Query?",
    shortAnswer: "Excel re-connects to all underlying sources, replays all recorded Applied Steps sequentially, and repopulates destination tables automatically.",
    explanation: "Entire multi-file ETL pipelines update in seconds with a single click.",
    hint: "Replays recorded Applied Steps on fresh source data.",
    level: "basic",
    codeExample: "Excel Ribbon &rarr; Data Tab &rarr; Refresh All (Ctrl + Alt + F5)"
  },
  {
    question: "What are the 3 primary 'Close & Load' destination options in Power Query?",
    shortAnswer: "1. Table (in a new or existing worksheet), 2. Only Create Connection, and 3. Add this data to the Data Model.",
    explanation: "Connection Only saves RAM, Table dumps to grid, and Data Model connects to Power Pivot VertiPaq.",
    hint: "Table, Only Create Connection, and Add to Data Model.",
    level: "moderate",
    codeExample: "Close & Load &rarr; Close & Load To..."
  },
  {
    question: "What is Query Folding in Power Query?",
    shortAnswer: "The capability of the Power Query engine to translate M transformation steps into native source database queries (like SQL SELECT/WHERE) to execute on the server.",
    explanation: "Dramatically reduces network traffic and speeds up execution by offloading work to database servers.",
    hint: "Translates M steps into server-side SQL.",
    level: "expert",
    codeExample: "M Filter Step &rarr; Server SQL: WHERE [Status] = 'Active'"
  },
  {
    question: "Can Power Query connect to multiple different file formats (e.g. SQL Server, CSV, Excel, Web API) within the same workbook?",
    shortAnswer: "Yes, Power Query seamlessly ingests and joins data across diverse heterogeneous sources.",
    explanation: "Acts as a universal data gateway across enterprise silos.",
    hint: "Universal heterogeneous data ingestion.",
    level: "basic",
    codeExample: "SQL + CSV + Web API &rarr; Unified Fact Table"
  },
  {
    question: "What is the difference between Power Query and Power Pivot?",
    shortAnswer: "Power Query handles data ingestion, cleaning, and ETL (Data Prep); Power Pivot handles relational modeling, DAX measures, and star schemas (Analytics).",
    explanation: "Power Query prepares the food; Power Pivot hosts the dinner.",
    hint: "Power Query = ETL / Cleaning; Power Pivot = Data Modeling & DAX.",
    level: "moderate",
    codeExample: "Power Query (ETL) &rarr; Data Model &rarr; Power Pivot (DAX)"
  },
  {
    question: "Where is the Power Query button located in Microsoft Excel 2016, 2019, 2021, and 365?",
    shortAnswer: "On the Ribbon under the 'Data' tab, in the 'Get & Transform Data' group.",
    explanation: "Fully built-in native feature in modern Excel.",
    hint: "Data Tab &rarr; Get & Transform Data.",
    level: "basic",
    codeExample: "Data &rarr; Get Data"
  },
  {
    question: "What is a 'Connection Only' query, and when should you use it?",
    shortAnswer: "A query that defines the ETL pipeline in memory without dumping rows onto an Excel worksheet grid; used for intermediate staging queries or Data Model loading.",
    explanation: "Prevents worksheet row limit issues and saves megabytes of RAM.",
    hint: "Defines query in memory without loading rows onto grid.",
    level: "moderate",
    codeExample: "Close & Load To &rarr; Only Create Connection"
  },
  {
    question: "How does Power Query handle data volumes exceeding Excel's 1,048,576 row worksheet limit?",
    shortAnswer: "By loading data directly into the Power Pivot Data Model (VertiPaq Engine), which can compress and analyze tens of millions of rows in memory.",
    explanation: "Bypasses the 1-million row grid barrier completely.",
    hint: "Loads into VertiPaq Data Model (millions of rows).",
    level: "advanced",
    codeExample: "Check: 'Add this data to the Data Model' (Up to 100M+ Rows)"
  },
  {
    question: "What is the Formula Bar in the Power Query Editor used for?",
    shortAnswer: "To inspect, write, and customize the underlying M code expression generated by the current Applied Step.",
    explanation: "Enables advanced formula adjustments beyond standard GUI ribbon buttons.",
    hint: "Displays and edits underlying M code.",
    level: "basic",
    codeExample: "View Tab &rarr; Check 'Formula Bar'"
  },
  {
    question: "Why is Power Query essential for modern financial reporting and tax audits?",
    shortAnswer: "It automates monthly trial balance reconciliations, GST compliance validations, and multi-branch ledger consolidations into a single-click refresh.",
    explanation: "Replaces 20 hours of monthly manual copy-pasting with a 5-second refresh.",
    hint: "Single-click monthly audit and ledger reconciliations.",
    level: "basic",
    codeExample: "Automated Monthly Close Pipeline"
  },
  {
    question: "What happens when you delete an intermediate Applied Step in the Power Query Editor?",
    shortAnswer: "Power Query removes that transformation; however, subsequent dependent steps may error if they reference columns created or modified by the deleted step.",
    explanation: "Sequential dependency chain requires careful deletion.",
    hint: "May break downstream steps referencing deleted columns.",
    level: "moderate",
    codeExample: "Warning: 'Deleting this step may affect subsequent steps'"
  },
  {
    question: "Can you rename Applied Steps in Power Query to make the recipe readable for auditors?",
    shortAnswer: "Yes, right-click any step and select 'Rename' or press F2 to give it a descriptive business name.",
    explanation: "Best practice for enterprise governance and documentation.",
    hint: "Right-click step &rarr; Rename (or press F2).",
    level: "basic",
    codeExample: "#\"Changed Type\" &rarr; #\"Coerce Amount To Numeric\""
  },
  {
    question: "What is the function of the 'Queries Pane' on the left side of the Power Query Editor?",
    shortAnswer: "It lists all active queries, staging tables, parameters, and custom functions in the current workbook.",
    explanation: "Enables organizing queries into folders and managing data dependencies.",
    hint: "Lists all queries, staging tables, and parameters.",
    level: "basic",
    codeExample: "Left Sidebar: Queries [5 Queries]"
  },
  {
    question: "What is the primary benefit of Power Query's 'Combine Files from Folder' connector?",
    shortAnswer: "It automatically scans a designated directory, extracts data from all matching CSV or Excel files, and stacks them vertically into a master dataset.",
    explanation: "Adding a new month's file to the folder automatically includes it upon clicking Refresh.",
    hint: "Auto-stacks all files in a folder into 1 master table.",
    level: "advanced",
    codeExample: "Get Data &rarr; From File &rarr; From Folder"
  },
  {
    question: "Is M code case-sensitive in Power Query?",
    shortAnswer: "Yes, M is strictly case-sensitive: `Table.SelectRows` works, while `table.selectrows` triggers an error.",
    explanation: "Unlike Excel grid formulas, M language keywords, function names, and column identifiers require exact casing.",
    hint: "M code is strictly case-sensitive.",
    level: "moderate",
    codeExample: "Table.AddColumn() &ne; table.addcolumn()"
  },
  {
    question: "How does Power Query maintain data privacy between external data sources?",
    shortAnswer: "Through Data Privacy Levels (Public, Organizational, Private) to prevent unauthorized cross-source data leaks during query execution.",
    explanation: "Enterprise security architecture protecting database credentials and confidential streams.",
    hint: "Privacy Levels: Public, Organizational, Private.",
    level: "expert",
    codeExample: "Data &rarr; Data Source Settings &rarr; Edit Permissions &rarr; Privacy Level"
  },
  {
    question: "What is the Advanced Editor in Power Query?",
    shortAnswer: "A full-screen code editor window that displays the entire complete M script (`let ... in ...`) for the active query.",
    explanation: "Used by power users to copy, paste, debug, and author complex custom M ETL pipelines.",
    hint: "Home Tab &rarr; Advanced Editor (Full M Script).",
    level: "advanced",
    codeExample: "let Source = ..., Clean = ... in Clean"
  },
  {
    question: "Can Power Query extract and clean data from HTML tables on public websites?",
    shortAnswer: "Yes, using the 'From Web' connector, Power Query parses web pages and isolates structured HTML tables automatically.",
    explanation: "Ideal for scraping exchange rates, economic indicators, and stock indices.",
    hint: "Get Data &rarr; From Web.",
    level: "basic",
    codeExample: "Get Data &rarr; From Web &rarr; Enter URL"
  },
  {
    question: "What is the purpose of the 'Promote Headers' transformation?",
    shortAnswer: "To elevate the first row of data values into official column header titles.",
    explanation: "Essential for CSV and raw ERP dumps where column names are read as record row 1.",
    hint: "Elevates row 1 to column titles.",
    level: "basic",
    codeExample: "= Table.PromoteHeaders(Source, [PromoteAllScalars=true])"
  },
  {
    question: "How does Power Query optimize memory when transforming a 5-million row database table?",
    shortAnswer: "Power Query streams data lazily in chunks through an in-memory pipeline rather than loading the full dataset at once.",
    explanation: "Streaming iterator architecture enables processing multi-gigabyte datasets with low RAM usage.",
    hint: "Lazy streaming iterator pipeline in memory.",
    level: "expert",
    codeExample: "In-Memory Streaming Iterator Pipeline"
  },
  {
    question: "Can Power Query transformations be shared directly with Power BI Desktop?",
    shortAnswer: "Yes, Power Query in Excel and Power BI use the identical M engine; M scripts can be copied and pasted directly between both platforms.",
    explanation: "100% code portability across the entire Microsoft Business Intelligence stack.",
    hint: "Identical M engine; scripts are 100% portable.",
    level: "basic",
    codeExample: "Excel Power Query M Code &harr; Power BI Desktop M Code"
  },
  {
    question: "What is the keyboard shortcut to open the Power Query Editor in Microsoft Excel?",
    shortAnswer: "Press Alt + F12 (or Alt &rarr; A &rarr; P &rarr; N in sequence).",
    explanation: "Instant shortcut to launch the editor window.",
    hint: "Alt + F12.",
    level: "basic",
    codeExample: "Alt + F12"
  },
  {
    question: "What is the 'View Native Query' option in the Applied Steps context menu?",
    shortAnswer: "An option that displays the server-side SQL statement generated by Query Folding for that step.",
    explanation: "If 'View Native Query' is greyed out, query folding has stopped at that step.",
    hint: "Shows SQL generated by Query Folding.",
    level: "expert",
    codeExample: "Right-Click Step &rarr; View Native Query"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for Power Query ETL architecture?",
    shortAnswer: "Never touch raw data files, and never clean data with manual copy-pasting or brittle macros! Build automated, repeatable ETL pipelines in Power Query where every transformation is recorded as a clean Applied Step. Connect directly to sources, unpivot and cleanse in memory, and let a single 'Refresh All' click run your entire enterprise reporting pipeline!",
    explanation: "Power Query represents the single greatest productivity leap in modern spreadsheet history!",
    hint: "Automated Repeatable Applied Steps + Non-Destructive Ingestion = Single-Click Enterprise Reporting!",
    level: "expert",
    codeExample: "Rule: Data Ingestion &rarr; Deploy Power Query Automated ETL Pipelines!"
  }
];

export default questions;
