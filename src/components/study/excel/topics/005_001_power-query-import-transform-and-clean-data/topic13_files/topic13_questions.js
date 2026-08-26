// topic13_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 13
// Topic: Loading options: Close & Load to Table, Connection Only, adding directly to Data Model
// Module: 005_001_power-query-import-transform-and-clean-data
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the difference between 'Close & Load' and 'Close & Load To...' in Power Query?",
    shortAnswer: "'Close & Load' immediately loads data to a new Excel worksheet table using default settings; 'Close & Load To...' opens a configuration dialog allowing you to select destination targets (Table, PivotTable, Connection Only, or Data Model).",
    explanation: "'Close & Load To...' provides full architectural control over query destinations.",
    hint: "Close & Load uses defaults; Close & Load To allows destination configuration.",
    level: "basic",
    codeExample: "Home Tab &rarr; Close & Load dropdown &rarr; Close & Load To..."
  },
  {
    question: "What are the 4 destination display options in the 'Import Data' dialog?",
    shortAnswer: "1. Table, 2. PivotTable Report, 3. PivotChart, and 4. Only Create Connection.",
    explanation: "Standard destination endpoints in Microsoft Excel.",
    hint: "Table, PivotTable Report, PivotChart, Only Create Connection.",
    level: "basic",
    codeExample: "Options: Table | PivotTable | PivotChart | Only Create Connection"
  },
  {
    question: "What does the 'Only Create Connection' option do in Power Query?",
    shortAnswer: "It saves the query definition in the workbook without dumping any data rows into worksheet cells, keeping the query available in memory for merging, appending, or downstream transformations.",
    explanation: "Essential for intermediate staging queries.",
    hint: "Keeps query in memory without creating worksheet grid tables.",
    level: "basic",
    codeExample: "Destination: 'Only Create Connection' (Saves RAM and sheet space)"
  },
  {
    question: "What is the primary benefit of checking 'Add this data to the Data Model'?",
    shortAnswer: "It loads the dataset directly into the high-speed xVelocity/VertiPaq in-memory engine, bypassing the 1,048,576 Excel worksheet row limit to support 100+ million rows for Power Pivot and DAX analytics.",
    explanation: "Overcomes Excel's 1-million row limit with column compression.",
    hint: "Bypasses the 1,048,576 row limit and enables Power Pivot DAX modeling.",
    level: "expert",
    codeExample: "Check: [X] 'Add this data to the Data Model' (Loads millions of rows)"
  },
  {
    question: "What happens if you load a 5-million row database table as an 'Excel Worksheet Table'?",
    shortAnswer: "Excel will crash or truncate the dataset at row 1,048,576, displaying an alert that the dataset exceeds the grid size limit.",
    explanation: "Excel worksheet grids cannot exceed 1,048,576 rows.",
    hint: "Truncates at row 1,048,576 or crashes Excel.",
    level: "moderate",
    codeExample: "Worksheet Grid Limit: Exactly 1,048,576 rows"
  },
  {
    question: "How do you combine 'Only Create Connection' with 'Add this data to the Data Model'?",
    shortAnswer: "Select 'Only Create Connection' and check 'Add this data to the Data Model' simultaneously in the Import Data dialog.",
    explanation: "The ultimate Power BI and Power Pivot best practice: loads into the high-performance Data Model with zero worksheet grid clutter.",
    hint: "Only Create Connection + [X] Add to Data Model (Zero grid clutter).",
    level: "expert",
    codeExample: "Select: Only Create Connection + Check: Add this data to the Data Model"
  },
  {
    question: "How do you change the load destination of an existing query from Table to Connection Only?",
    shortAnswer: "In the Queries & Connections pane &rarr; Right-click the query &rarr; Select 'Load To...' &rarr; Change selection to 'Only Create Connection'.",
    explanation: "Allows converting active worksheet tables back into lightweight staging queries.",
    hint: "Queries & Connections &rarr; Right-click query &rarr; Load To...",
    level: "basic",
    codeExample: "Right-Click Query &rarr; Load To... &rarr; Only Create Connection"
  },
  {
    question: "What warning does Excel display when changing a query from 'Table' to 'Only Create Connection'?",
    shortAnswer: "*'Changing the load settings will delete the existing worksheet table and any data in it.'*",
    explanation: "Excel deletes the physical worksheet table grid while preserving the underlying M query definition.",
    hint: "Warns that existing worksheet table and cell data will be deleted.",
    level: "moderate",
    codeExample: "Warning: Table will be deleted from worksheet"
  },
  {
    question: "What is 'Background Refresh' in Power Query, and why should it be disabled for automated VBA macros?",
    shortAnswer: "Background refresh allows Excel to remain responsive while queries run asynchronously; however, VBA macros that depend on refreshed data will execute prematurely before the refresh finishes unless Background Refresh is turned off.",
    explanation: "Disable background refresh to ensure synchronous VBA execution.",
    hint: "Disabling ensures queries finish completely before VBA code continues.",
    level: "expert",
    codeExample: "Connection Properties &rarr; Uncheck 'Enable background refresh'"
  },
  {
    question: "How do you set a query to refresh automatically every 15 minutes?",
    shortAnswer: "Data Tab &rarr; Queries & Connections &rarr; Right-click query &rarr; Properties &rarr; Check 'Refresh every' &rarr; Enter '15' minutes.",
    explanation: "Enables automated periodic operational dashboard polling.",
    hint: "Query Properties &rarr; Check 'Refresh every X minutes'.",
    level: "basic",
    codeExample: "Query Properties &rarr; [X] Refresh every 15 minutes"
  },
  {
    question: "How do you configure a workbook to refresh all Power Query models automatically when the file is opened?",
    shortAnswer: "Query Properties &rarr; Usage Tab &rarr; Check 'Refresh data when opening the file'.",
    explanation: "Ensures executives always see current live numbers upon opening.",
    hint: "Query Properties &rarr; [X] Refresh data when opening the file.",
    level: "basic",
    codeExample: "[X] Refresh data when opening the file"
  },
  {
    question: "What happens if a query loaded to the Data Model has a duplicate value in a primary key column when creating a 1-to-many relationship?",
    shortAnswer: "Power Pivot will reject the relationship with an error stating that the column contains duplicate values.",
    explanation: "Data Model 1-to-many relationships require unique primary keys on the 1-side.",
    hint: "Rejects relationship: column must contain unique values.",
    level: "moderate",
    codeExample: "Power Pivot Error: The column contains duplicate values"
  },
  {
    question: "How much file compression does the xVelocity Data Model achieve compared to standard worksheet tables?",
    shortAnswer: "Typically 5x to 10x compression (reducing a 500 MB CSV file to a 50 MB Excel workbook) due to columnar dictionary encoding and bit-packing.",
    explanation: "VertiPaq column compression efficiency.",
    hint: "5x to 10x compression via columnar dictionary encoding.",
    level: "expert",
    codeExample: "500 MB Raw CSV &rarr; 50 MB Compressed Data Model Workbook"
  },
  {
    question: "What is the difference between 'Refresh All' (Ctrl+Alt+F5) and refreshing a single query?",
    shortAnswer: "'Refresh All' refreshes all Power Query connections, Data Model tables, and PivotTables across the entire workbook simultaneously; refreshing a single query updates only that specific query stream.",
    explanation: "Global workbook sync vs isolated query refresh.",
    hint: "Ctrl+Alt+F5 refreshes all connections and Data Model tables globally.",
    level: "basic",
    codeExample: "Shortcut: Ctrl + Alt + F5 (Refresh All)"
  },
  {
    question: "How do you view and edit Power Query M code after closing the Power Query Editor?",
    shortAnswer: "Data Tab &rarr; Queries & Connections &rarr; Double-click the query (or right-click &rarr; Edit).",
    explanation: "Re-opens the Power Query Editor interface.",
    hint: "Double-click query in Queries & Connections pane.",
    level: "basic",
    codeExample: "Data &rarr; Queries & Connections &rarr; Double-Click Query"
  },
  {
    question: "Why should intermediate staging queries never be loaded into Excel worksheet tables?",
    shortAnswer: "Loading staging tables wastes workbook memory, clutters worksheets with duplicate grids, and slows down calculation speed.",
    explanation: "Only consolidated final tables should load to worksheets or Data Model.",
    hint: "Wastes RAM, creates sheet clutter, and degrades performance.",
    level: "moderate",
    codeExample: "Staging Queries = 'Only Create Connection' Always!"
  },
  {
    question: "What happens if a user accidentally types manual notes inside an Excel Table fed by Power Query and then clicks Refresh?",
    shortAnswer: "Power Query overwrites the table grid, which can misalign manually typed comments against dynamic changing row records.",
    explanation: "Power Query tables should not have ad-hoc manual columns typed beside dynamic rows.",
    hint: "Manual comments will misalign when rows shift on refresh.",
    level: "advanced",
    codeExample: "Warning: Do not type static notes beside dynamic query tables!"
  },
  {
    question: "How do you preserve custom formatting (e.g. column widths, cell fills) in an Excel Table when refreshing Power Query?",
    shortAnswer: "Table Design &rarr; External Table Data &rarr; Properties &rarr; Check 'Preserve column sort/filter/layout' and 'Preserve cell formatting'.",
    explanation: "Locks visual layout across dynamic refreshes.",
    hint: "External Table Properties &rarr; [X] Preserve cell formatting.",
    level: "moderate",
    codeExample: "Properties &rarr; [X] Preserve cell formatting"
  },
  {
    question: "What is the 'Data Model' window in Excel, and how do you access it?",
    shortAnswer: "The Power Pivot management window for defining star schema relationships and DAX measures; accessed via the Data Tab &rarr; 'Manage Data Model' icon.",
    explanation: "Opens the Power Pivot ribbon interface.",
    hint: "Data Tab &rarr; Manage Data Model (Power Pivot).",
    level: "basic",
    codeExample: "Data Tab &rarr; Manage Data Model"
  },
  {
    question: "Can a query loaded to 'Only Create Connection' be referenced as a source by other queries?",
    shortAnswer: "Yes; other queries can reference it via `= SourceQueryName` in M code without any requirement for worksheet loading.",
    explanation: "Core mechanism of modular multi-step ETL pipelines.",
    hint: "Yes; fully referenceable by downstream queries in memory.",
    level: "basic",
    codeExample: "= stg_Cleaned_Transactions (Reference in M code)"
  },
  {
    question: "How do you disable Fast Data Load in Power Query options, and when is it recommended?",
    shortAnswer: "File &rarr; Options &rarr; Data Load &rarr; Uncheck 'Fast Data Load'; recommended on low-RAM machines when loading massive datasets to prevent Excel from freezing.",
    explanation: "Allows background paging rather than greedy RAM allocation.",
    hint: "Options &rarr; Data Load &rarr; Uncheck Fast Data Load.",
    level: "advanced",
    codeExample: "File &rarr; Options &rarr; Data Load &rarr; Fast Data Load"
  },
  {
    question: "How do you delete a Power Query from a workbook completely?",
    shortAnswer: "Queries & Connections pane &rarr; Right-click the query &rarr; Delete (or press Delete key).",
    explanation: "Removes query recipe and metadata from the workbook.",
    hint: "Right-click query &rarr; Delete.",
    level: "basic",
    codeExample: "Queries & Connections &rarr; Right-Click &rarr; Delete"
  },
  {
    question: "What is the impact of checking 'Fast Data Load' on machine responsiveness?",
    shortAnswer: "Queries load significantly faster by allocating maximum CPU and RAM resources, but Excel may become temporarily unresponsive during the load.",
    explanation: "Resource trade-off between load speed and UI responsiveness.",
    hint: "Loads faster but consumes maximum CPU/RAM during refresh.",
    level: "moderate",
    codeExample: "Fast Data Load: Maximum Throughput vs UI Responsiveness"
  },
  {
    question: "How do you load a Power Query directly into a PivotTable Report without creating an intermediate grid table?",
    shortAnswer: "Close & Load To... &rarr; Select 'PivotTable Report' &rarr; Choose existing or new worksheet location.",
    explanation: "Streams data directly into the PivotTable cache.",
    hint: "Close & Load To... &rarr; PivotTable Report.",
    level: "basic",
    codeExample: "Close & Load To... &rarr; PivotTable Report"
  },
  {
    question: "What is the recommended staging-to-master loading architecture for enterprise workbooks?",
    shortAnswer: "Set all staging, raw extraction, and intermediate transformation queries to 'Only Create Connection'; load ONLY the final consolidated Fact and Dimension tables to the Data Model.",
    explanation: "The gold-standard corporate ETL architecture.",
    hint: "Staging = Connection Only; Final Master = Add to Data Model.",
    level: "expert",
    codeExample: "Architecture: Staging (Connection Only) &rarr; Final (Data Model)"
  },
  {
    question: "How do you check how many rows are currently loaded in the Data Model?",
    shortAnswer: "Data Tab &rarr; Manage Data Model &rarr; Look at the bottom status bar for each table tab (e.g. *'3,450,210 rows'*).",
    explanation: "Displays exact row counts in the Power Pivot status bar.",
    hint: "Manage Data Model &rarr; Status bar displays exact row count.",
    level: "basic",
    codeExample: "Power Pivot Status Bar: 3,450,210 rows"
  },
  {
    question: "What happens if you delete a worksheet that contains a query-loaded Excel Table?",
    shortAnswer: "The worksheet table is deleted, but the underlying Power Query definition remains in the workbook as an 'Only Create Connection' query.",
    explanation: "M queries are stored in the workbook package, not inside individual sheets.",
    hint: "Query is preserved as 'Only Create Connection'.",
    level: "moderate",
    codeExample: "Sheet deleted &rarr; Query automatically converts to Connection Only"
  },
  {
    question: "Can Power Query load data into an existing Excel table created manually?",
    shortAnswer: "No; Power Query creates and manages its own connected ListObject table in the worksheet.",
    explanation: "Power Query manages its own dedicated grid tables.",
    hint: "No; Power Query manages its own connected table.",
    level: "basic",
    codeExample: "Power Query creates its own connected ListObject table"
  },
  {
    question: "How do you prevent queries from automatically adding relationships in the Data Model?",
    shortAnswer: "File &rarr; Options &rarr; Data Load &rarr; Uncheck 'Create relationships between tables on first load'.",
    explanation: "Prevents automatic inaccurate relationship guessing.",
    hint: "Options &rarr; Data Load &rarr; Uncheck automatic relationships.",
    level: "advanced",
    codeExample: "Data Load &rarr; [ ] Create relationships on first load"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for Power Query Loading Options?",
    shortAnswer: "Never dump intermediate queries into worksheet grids, and embrace the Data Model! Always use 'Close & Load To...' rather than default Close & Load. Set all staging and transformation queries to 'Only Create Connection' to keep workbooks lightweight and uncluttered, and load consolidated tables directly into the Data Model (VertiPaq) to smash the 1-million-row limit and unlock high-speed DAX analytics!",
    explanation: "Smart loading options are the bridge between raw ETL pipelines and high-performance BI data models!",
    hint: "Close & Load To... + Staging (Connection Only) + Master (Add to Data Model) = 100M-Row Powerhouse!",
    level: "expert",
    codeExample: "Rule: Close & Load To... &rarr; Staging (Connection Only) &rarr; Master (Add to Data Model) &rarr; Fast Refresh!"
  }
];

export default questions;
