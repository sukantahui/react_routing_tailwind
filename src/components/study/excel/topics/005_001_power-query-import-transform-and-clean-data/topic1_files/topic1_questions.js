// topic1_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 1
// Topic: Connecting to data sources: Excel workbooks, CSV/Text files, Folders, Web APIs, and SQL Databases
// Module: 005_001_power-query-import-transform-and-clean-data
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary function of Data Connectors in Power Query?",
    shortAnswer: "To establish secure, read-only authentication and streaming pipelines between external data storage systems and the Power Query M Engine.",
    explanation: "Standardizes ingestion across dozens of disparate file formats, cloud platforms, and relational databases.",
    hint: "Bridges external data systems with Power Query.",
    level: "basic",
    codeExample: "Excel Ribbon &rarr; Data Tab &rarr; Get Data &rarr; Select Connector"
  },
  {
    question: "What M function is generated when connecting to a local CSV file?",
    shortAnswer: "= Csv.Document(File.Contents(\"C:\\Data\\file.csv\"), [Delimiter=\",\", Columns=5, Encoding=65001])",
    explanation: "File.Contents reads binary bytes from disk and Csv.Document parses them into an M table.",
    hint: "Csv.Document(File.Contents(...)).",
    level: "basic",
    codeExample: "= Csv.Document(File.Contents(\"C:\\Data\\file.csv\"), [Delimiter=\",\"])"
  },
  {
    question: "What M function is generated when connecting to an external Excel workbook?",
    shortAnswer: "= Excel.Workbook(File.Contents(\"C:\\Data\\workbook.xlsx\"), null, true)",
    explanation: "Parses Excel sheets, tables, and defined names into an M navigation table.",
    hint: "Excel.Workbook(File.Contents(...)).",
    level: "basic",
    codeExample: "= Excel.Workbook(File.Contents(\"C:\\Data\\workbook.xlsx\"), null, true)"
  },
  {
    question: "How does the 'From Folder' connector automate multi-file consolidation?",
    shortAnswer: "It queries all files within a directory matching an extension filter, extracts their binary contents, and stacks them vertically into a master unified table.",
    explanation: "Dropping a new month's file into the folder automatically appends it upon clicking Refresh.",
    hint: "Auto-stacks all files in a folder into 1 master dataset.",
    level: "moderate",
    codeExample: "= Folder.Files(\"C:\\Enterprise\\Monthly_Sales\")"
  },
  {
    question: "What M function connects Power Query to a Microsoft SQL Server database?",
    shortAnswer: "= Sql.Database(\"server_name.corp.in\", \"DB_Sales\")",
    explanation: "Opens a native SQL connection with support for query folding.",
    hint: "Sql.Database(server, database).",
    level: "basic",
    codeExample: "= Sql.Database(\"sql-prod.corp.in\", \"DB_Sales\")"
  },
  {
    question: "How do you connect Power Query to a REST API returning JSON payloads?",
    shortAnswer: "Use `Json.Document(Web.Contents(\"https://api.domain.com/data\"))`.",
    explanation: "Web.Contents fetches the HTTP response stream and Json.Document unrolls JSON objects into records.",
    hint: "Json.Document(Web.Contents(...)).",
    level: "moderate",
    codeExample: "= Json.Document(Web.Contents(\"https://api.codernaccotax.co.in/gst/v1\"))"
  },
  {
    question: "Where do you manage, edit, and update connection credentials in Excel?",
    shortAnswer: "Under Data Tab &rarr; Get Data &rarr; Data Source Settings.",
    explanation: "Allows editing file paths, updating passwords, clearing caches, and modifying privacy levels.",
    hint: "Data &rarr; Get Data &rarr; Data Source Settings.",
    level: "basic",
    codeExample: "Data &rarr; Data Source Settings"
  },
  {
    question: "What are the 3 Data Privacy Levels in Power Query?",
    shortAnswer: "Public, Organizational, and Private.",
    explanation: "Public: sharable anywhere; Organizational: shared only within enterprise domain; Private: confidential and isolated from other sources.",
    hint: "Public, Organizational, Private.",
    level: "moderate",
    codeExample: "Data Source Settings &rarr; Edit Permissions &rarr; Privacy Level"
  },
  {
    question: "What causes the 'Formula.Firewall: Query references other queries' error?",
    shortAnswer: "Attempting to merge or combine two queries that have incompatible data privacy levels without explicit user permission.",
    explanation: "Protects sensitive data from accidentally being transmitted to external untrusted endpoints.",
    hint: "Incompatible data privacy levels between merged sources.",
    level: "advanced",
    codeExample: "Formula.Firewall: Query 'X' references other queries"
  },
  {
    question: "How do you parameterize a file path so queries work seamlessly across multiple team members' laptops?",
    shortAnswer: "Create a Parameter query in Power Query (or an Excel named range) holding the base folder path, and reference that parameter in the `File.Contents` step.",
    explanation: "Prevents hardcoding fixed personal paths like `C:\\Users\\swadeep\\...`.",
    hint: "Use a Power Query parameter for dynamic paths.",
    level: "advanced",
    codeExample: "= File.Contents(pFolderPath & \"\\Sales.csv\")"
  },
  {
    question: "How do you extract data from an HTML web table on a public URL?",
    shortAnswer: "Go to Data &rarr; Get Data &rarr; From Web &rarr; Enter URL &rarr; Select table in Navigator.",
    explanation: "Power Query parses DOM table elements automatically.",
    hint: "Get Data &rarr; From Web.",
    level: "basic",
    codeExample: "= Web.BrowserContents(\"https://codernaccotax.co.in/rates\")"
  },
  {
    question: "What is the difference between `Folder.Files` and `Folder.Contents` in M code?",
    shortAnswer: "`Folder.Files` traverses subfolders recursively to list all files; `Folder.Contents` lists only top-level items without entering subfolders.",
    explanation: "`Folder.Files` is preferred when organizing data by subdirectories like `Year/Month/`.",
    hint: "Folder.Files: Recursive; Folder.Contents: Top-level only.",
    level: "expert",
    codeExample: "Folder.Files(path) vs Folder.Contents(path)"
  },
  {
    question: "How do you pass API authorization headers (e.g. Bearer tokens) in Power Query Web connections?",
    shortAnswer: "Pass a record into the `Headers` option of `Web.Contents`: `= Web.Contents(url, [Headers=[#\"Authorization\"=\"Bearer Token123\"]])`.",
    explanation: "Enables programmatic access to secured enterprise REST APIs.",
    hint: "Web.Contents(url, [Headers=[Authorization='...']]).",
    level: "expert",
    codeExample: "= Web.Contents(\"https://api.corp.in\", [Headers=[#\"Authorization\"=\"Bearer ABC\"]])"
  },
  {
    question: "How do you import data from a Microsoft SharePoint Online list?",
    shortAnswer: "Go to Data &rarr; Get Data &rarr; From Other Sources &rarr; From SharePoint List &rarr; Sign in with Microsoft 365 Organizational Account.",
    explanation: "Syncs live collaborative lists directly into Excel models.",
    hint: "Get Data &rarr; From Other Sources &rarr; From SharePoint List.",
    level: "basic",
    codeExample: "= SharePoint.Tables(\"https://corp.sharepoint.com/sites/Finance\", [ApiVersion=15])"
  },
  {
    question: "What is the 'Navigator' window in Power Query?",
    shortAnswer: "A tree-view dialog displayed after selecting a source, allowing the user to select specific sheets, tables, or database views to load or transform.",
    explanation: "Provides live data previews before launching the editor.",
    hint: "Tree-view selection and preview dialog.",
    level: "basic",
    codeExample: "Navigator &rarr; Select Checkbox &rarr; Click 'Transform Data'"
  },
  {
    question: "Can Power Query connect directly to Microsoft Access database (.accdb) files?",
    shortAnswer: "Yes, using the 'From Microsoft Access Database' connector (`Access.Database`).",
    explanation: "Imports Access tables and queries into Excel without needing MS Access installed.",
    hint: "Get Data &rarr; From Database &rarr; From Microsoft Access Database.",
    level: "basic",
    codeExample: "= Access.Database(File.Contents(\"C:\\Data\\Inventory.accdb\"))"
  },
  {
    question: "How do you connect to a PostgreSQL or MySQL database from Excel Power Query?",
    shortAnswer: "Install the official database driver (Npgsql or MySQL Connector/NET) and select 'From PostgreSQL/MySQL Database'.",
    explanation: "Enables direct native relational querying against open-source SQL engines.",
    hint: "Install DB driver &rarr; Get Data &rarr; From Database.",
    level: "moderate",
    codeExample: "= PostgreSQL.Database(\"db.corp.in\", \"SalesDB\")"
  },
  {
    question: "How do you write a custom native SQL query inside the SQL connector dialog?",
    shortAnswer: "Expand 'Advanced options' in the SQL Server connection dialog and paste your custom SQL query statement into the 'SQL statement' box.",
    explanation: "Allows pre-aggregating or filtering on the server before data ingestion.",
    hint: "Advanced Options &rarr; SQL Statement.",
    level: "moderate",
    codeExample: "= Sql.Database(\"server\", \"db\", [Query=\"SELECT * FROM Sales WHERE Year=2026\"])"
  },
  {
    question: "Why does writing a custom SQL query disable subsequent Query Folding in Power Query?",
    shortAnswer: "Because Power Query wraps your custom SQL as a subquery, preventing the M engine from freely altering the outer query logic for downstream steps.",
    explanation: "Best practice is to let the GUI generate folding steps unless complex stored procedures are required.",
    hint: "Custom SQL blocks M engine from folding subsequent steps.",
    level: "expert",
    codeExample: "GUI Steps Fold Seamlessly vs Custom SQL Subquery Limits"
  },
  {
    question: "How do you connect to an XML data feed in Power Query?",
    shortAnswer: "Use `Xml.Tables(File.Contents(\"file.xml\"))` or select 'From XML' in the Get Data menu.",
    explanation: "Parses hierarchical XML nodes and attributes into flat relational tables.",
    hint: "Xml.Tables(File.Contents(...)).",
    level: "moderate",
    codeExample: "= Xml.Tables(File.Contents(\"C:\\Data\\tax_filing.xml\"))"
  },
  {
    question: "What is a 'Blank Query' in Power Query?",
    shortAnswer: "An empty query created from scratch where analysts can write custom M code, build reusable custom functions, or test API expressions.",
    explanation: "The starting point for advanced M programming.",
    hint: "Get Data &rarr; From Other Sources &rarr; Blank Query.",
    level: "basic",
    codeExample: "Home Tab &rarr; New Source &rarr; Other Sources &rarr; Blank Query"
  },
  {
    question: "How do you filter out temporary locked Excel backup files (`~$filename.xlsx`) when importing from a folder?",
    shortAnswer: "In the file list filter step, add a text filter: `does not start with '~$'`.",
    explanation: "Prevents query refresh crashes when someone has an Excel file open on a shared drive.",
    hint: "Filter Name: does not begin with '~$' and Extension: '.xlsx'.",
    level: "moderate",
    codeExample: "= Table.SelectRows(Source, each not Text.StartsWith([Name], \"~$\"))"
  },
  {
    question: "How do you refresh an individual query without refreshing the entire workbook?",
    shortAnswer: "Right-click the specific query in the 'Queries & Connections' pane on the right of Excel and select 'Refresh'.",
    explanation: "Saves time when testing single data pipeline modifications.",
    hint: "Right-click query &rarr; Refresh.",
    level: "basic",
    codeExample: "Queries & Connections &rarr; Right Click &rarr; Refresh"
  },
  {
    question: "Can Power Query connect to an OData feed (e.g. Microsoft Dynamics 365 or SAP)?",
    shortAnswer: "Yes, using the 'From OData Feed' connector (`OData.Feed(\"https://...\")`).",
    explanation: "Standard protocol for enterprise ERP and CRM data streams.",
    hint: "OData.Feed(url).",
    level: "advanced",
    codeExample: "= OData.Feed(\"https://services.odata.org/V4/Northwind/Northwind.svc/\")"
  },
  {
    question: "How do you configure a query to refresh automatically in the background every 30 minutes?",
    shortAnswer: "In the Queries & Connections pane, right-click the query &rarr; Properties &rarr; Check 'Refresh every X minutes' &rarr; Enter 30.",
    explanation: "Maintains live automated operational dashboards in Excel.",
    hint: "Query Properties &rarr; Refresh every 30 minutes.",
    level: "moderate",
    codeExample: "Query Properties &rarr; Usage Tab &rarr; Refresh Every 30 Minutes"
  },
  {
    question: "What is the function of the 'Binary' column when using file connectors?",
    shortAnswer: "It holds the raw file stream byte buffer, which can be expanded into tables using format parsers like `Csv.Document` or `Excel.Workbook`.",
    explanation: "Represents unparsed file data in the M memory buffer.",
    hint: "Holds raw file byte streams.",
    level: "advanced",
    codeExample: "[Content] column containing [Binary] objects"
  },
  {
    question: "How do you test database connectivity when setting up an enterprise SQL connector?",
    shortAnswer: "Enter the Server and Database name, click OK, and verify that the Navigator window displays the list of database tables without connection timeout errors.",
    explanation: "Confirms network port 1433 access and firewall rules.",
    hint: "Navigator displays database tables on successful handshake.",
    level: "basic",
    codeExample: "Successful Handshake &rarr; Navigator Displays Tables"
  },
  {
    question: "How do you extract data from an Excel Table located within the CURRENT active workbook?",
    shortAnswer: "Select any cell in the table &rarr; Data Tab &rarr; From Table/Range (`= Excel.CurrentWorkbook(){[Name=\"tbl_Data\"]}[Content]`).",
    explanation: "Ingests existing worksheet tables into Power Query memory instantly.",
    hint: "Data Tab &rarr; From Table/Range.",
    level: "basic",
    codeExample: "= Excel.CurrentWorkbook(){[Name=\"tbl_CustomerMaster\"]}[Content]"
  },
  {
    question: "What is the recommended practice for organizing 20+ queries in a complex enterprise workbook?",
    shortAnswer: "Group queries into logical folders in the Queries pane (e.g. `01 Staging`, `02 Dimensions`, `03 Facts`, `04 Parameters`).",
    explanation: "Ensures clean project architecture and team maintainability.",
    hint: "Group into folders: Staging, Dimensions, Facts, Parameters.",
    level: "basic",
    codeExample: "Right-Click Queries Pane &rarr; New Group"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for Power Query Data Connectors?",
    shortAnswer: "Never copy-paste raw files into worksheets! Always establish dedicated, non-destructive connectors: use 'From Folder' with extension filters for monthly CSV batches, leverage 'From Database' for server-side SQL folding, parameterize file paths with dynamic parameters, and set appropriate Privacy Levels to create bulletproof enterprise pipelines that refresh with 100% autonomy!",
    explanation: "Robust data connectors form the bedrock of scalable financial intelligence!",
    hint: "Dedicated Connectors + Folder Batch Ingestion + Parameterized Paths = Bulletproof Pipeline!",
    level: "expert",
    codeExample: "Rule: Data Ingestion &rarr; Deploy Dynamic Parameterized Connectors!"
  }
];

export default questions;
