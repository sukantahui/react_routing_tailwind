// topic4_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 4
// Topic: Parameterizing Power Query: Creating dynamic file path and date range parameters
// Module: 005_002_advanced-power-query-m-code-scripting-and-custom-functions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is a 'Parameter' in Power Query?",
    shortAnswer: "A named scalar value stored as a dedicated query object that can be dynamically referenced across multiple M queries to control file paths, date filters, thresholds, or connection strings.",
    explanation: "Parameters allow users to adjust query behavior without editing M code.",
    hint: "A named scalar query object used to control dynamic settings across queries.",
    level: "basic",
    codeExample: "Source = Csv.Document(File.Contents(p_FolderPath & \"sales.csv\"))"
  },
  {
    question: "How do you create a new parameter using the Power Query Editor UI?",
    shortAnswer: "Home Tab → Manage Parameters → Click 'New Parameter' → Enter Name, Type, Suggested Values, and Current Value.",
    explanation: "Standard graphical parameter manager interface.",
    hint: "Home → Manage Parameters → New Parameter.",
    level: "basic",
    codeExample: "Home Tab → Manage Parameters → New Parameter"
  },
  {
    question: "What are the 3 'Suggested Values' configuration options available for parameters?",
    shortAnswer: "1. Any value, 2. List of values (static dropdown list), and 3. Query (dynamic list populated by another M query).",
    explanation: "Controls parameter input validation rules.",
    hint: "Any value, List of values, Query.",
    level: "basic",
    codeExample: "Suggested Values: Any value | List of values | Query"
  },
  {
    question: "How is a parameter query represented in M code?",
    shortAnswer: "As a scalar literal with metadata: `\"E:\\Data\\\" meta [IsParameterQuery=true, Type=\"Text\", IsParameterQueryRequired=true]`.",
    explanation: "M metadata attributes distinguish parameter queries from standard values.",
    hint: "Scalar value with meta [IsParameterQuery=true].",
    level: "expert",
    codeExample: "p_FolderPath = \"E:\\Sales\\\" meta [IsParameterQuery=true, Type=\"Text\"]"
  },
  {
    question: "How do you parameterize a dynamic date range filter in M code?",
    shortAnswer: "Use `Table.SelectRows(Source, each [Transaction_Date] >= p_StartDate and [Transaction_Date] <= p_EndDate)`.",
    explanation: "Filters rows between two dynamic date parameter bounds.",
    hint: "each [Date] >= p_StartDate and [Date] <= p_EndDate.",
    level: "moderate",
    codeExample: "= Table.SelectRows(Source, each [Date] >= p_StartDate and [Date] <= p_EndDate)"
  },
  {
    question: "How do you dynamically fetch a parameter value from an Excel worksheet table?",
    shortAnswer: "Use `Excel.CurrentWorkbook(){[Name=\"tbl_Parameters\"]}[Content]{[ParamName=\"FolderPath\"]}[ParamValue]`.",
    explanation: "Allows non-technical users to change query parameters by editing worksheet cells.",
    hint: "Excel.CurrentWorkbook(){[Name=\"tbl_Params\"]}[Content] lookup.",
    level: "expert",
    codeExample: "p_Path = Excel.CurrentWorkbook(){[Name=\"tbl_Config\"]}[Content]{0}[RootPath]"
  },
  {
    question: "What is the primary benefit of parameterizing file paths in corporate workbooks?",
    shortAnswer: "It prevents queries from breaking when workbooks are moved across different user machines, network drives, or SharePoint/OneDrive folders.",
    explanation: "Eliminates hardcoded local path errors.",
    hint: "Prevents breaking when files move between different user paths/SharePoint.",
    level: "basic",
    codeExample: "p_RootDirectory & \"Monthly_Extract.csv\""
  },
  {
    question: "How do you bind a parameter's suggested dropdown values to a dynamic database query?",
    shortAnswer: "Set 'Suggested Values' to 'Query' → Select an M query that outputs a 1D List of distinct values (e.g. `List.Distinct(DimBranches[BranchName])`).",
    explanation: "Dynamic parameter lists update automatically as data changes.",
    hint: "Set Suggested Values to 'Query' and select a query returning a List.",
    level: "moderate",
    codeExample: "Suggested Values = Query: qry_DistinctBranchesList"
  },
  {
    question: "What happens if a required parameter (`IsParameterQueryRequired = true`) is left blank?",
    shortAnswer: "Power Query will block query execution and prompt the user to supply a valid parameter value before refreshing.",
    explanation: "Enforces mandatory input validation.",
    hint: "Blocks refresh and prompts user to enter a value.",
    level: "basic",
    codeExample: "Error: Parameter value is required"
  },
  {
    question: "How do you change parameter values directly from the main Excel ribbon without opening Power Query?",
    shortAnswer: "Data Tab → Queries & Connections → Click the small arrow on 'Get Data' → 'Edit Parameters' (or manage via Excel Parameter table cells).",
    explanation: "Allows end-users to adjust parameters without launching Power Query Editor.",
    hint: "Data Tab → Get Data → Edit Parameters.",
    level: "moderate",
    codeExample: "Data → Get Data → Edit Parameters"
  },
  {
    question: "How do parameters interact with Power BI Template (`.pbit`) files?",
    shortAnswer: "When a user opens a `.pbit` file, Power BI immediately displays a modal dialog prompting the user to enter parameter values (e.g. Server Name, Date Range) before loading data.",
    explanation: "Core architecture for distributing reusable enterprise BI dashboards.",
    hint: "Prompts user to enter parameter values immediately upon opening template.",
    level: "advanced",
    codeExample: "Power BI Template (.pbit) Parameter Prompt"
  },
  {
    question: "Can a parameter store a List or Table instead of a scalar value?",
    shortAnswer: "No; Power Query parameters in the UI are designed to hold single scalar primitive values (Text, Number, Date, Logical, Binary).",
    explanation: "Parameters represent atomic scalar configuration settings.",
    hint: "No; UI parameters hold scalar primitive values only.",
    level: "basic",
    codeExample: "Scalar types: Text, Number, Date, DateTime, Logical"
  },
  {
    question: "How do you concatenate a folder path parameter with a filename safely in M?",
    shortAnswer: "Ensure the path ends with a backslash: `if Text.EndsWith(p_Path, \"\\\") then p_Path else p_Path & \"\\\"` before concatenating the filename.",
    explanation: "Defensive path concatenation prevents missing backslash errors.",
    hint: "Check Text.EndsWith(path, \"\\\") before concatenating filename.",
    level: "moderate",
    codeExample: "SafePath = (if Text.EndsWith(p_Path, \"\\\") then p_Path else p_Path & \"\\\") & \"sales.csv\""
  },
  {
    question: "How do you parameterize a SQL Server database connection in M code?",
    shortAnswer: "Pass parameters into the `Sql.Database` function: `Sql.Database(p_ServerName, p_DatabaseName)`.",
    explanation: "Allows switching between Dev, Staging, and Production databases dynamically.",
    hint: "= Sql.Database(p_Server, p_Database).",
    level: "moderate",
    codeExample: "= Sql.Database(p_ServerName, p_DatabaseName, [Query=\"SELECT * FROM Sales\"])"
  },
  {
    question: "What is the difference between an M Parameter and an M Custom Function?",
    shortAnswer: "A Parameter is a static scalar value configured prior to query execution; a Custom Function is callable logic executed repeatedly row-by-row during query execution.",
    explanation: "Configuration setting vs iterative transformation logic.",
    hint: "Parameter is a static setting; Function is executable row-by-row logic.",
    level: "basic",
    codeExample: "Parameter: p_TaxRate = 0.18 vs Function: fx_CalcTax(100)"
  },
  {
    question: "How do you parameterize a web API URL query string in M code?",
    shortAnswer: "Using the `Query` option in `Web.Contents`: `Web.Contents(p_BaseURL, [Query = [symbol = p_StockSymbol, apikey = p_APIKey]])`.",
    explanation: "Power Query automatically URL-encodes parameters passed in the Query record.",
    hint: "Web.Contents(p_URL, [Query = [param1 = p_Val1]]).",
    level: "expert",
    codeExample: "= Web.Contents(p_API_Base, [Query=[from=\"USD\", to=p_TargetCurrency]])"
  },
  {
    question: "What is the security risk of storing API keys or passwords inside Power Query parameter queries?",
    shortAnswer: "Parameter values are stored as plain text inside the workbook package (`customXml/` or M definitions) and are visible to anyone with read access to the file.",
    explanation: "Use Windows Credential Manager or OAuth authentication instead of plain-text parameters for secrets.",
    hint: "Stored as plain text; visible to anyone who opens the workbook.",
    level: "expert",
    codeExample: "Warning: Never store production passwords in plain-text parameters!"
  },
  {
    question: "How do you create a Yes/No boolean toggle parameter?",
    shortAnswer: "Create a parameter with 'Type' set to `Logical` (`true` / `false`) and 'Suggested Values' set to `List of values` with `TRUE` and `FALSE`.",
    explanation: "Provides a clean binary toggle switch in the UI.",
    hint: "Type = Logical, Suggested Values = {true, false}.",
    level: "basic",
    codeExample: "p_IncludeAuditExceptions = true (Logical)"
  },
  {
    question: "How do you conditionally execute an Applied Step based on a boolean parameter in M?",
    shortAnswer: "Use `if p_EnableTaxFilter then Table.SelectRows(...) else PreviousStep`.",
    explanation: "Conditional step execution based on parameter state.",
    hint: "if p_Toggle then StepA else StepB.",
    level: "advanced",
    codeExample: "= if p_FilterHighValue then Table.SelectRows(PrevStep, each [Amt] > 50000) else PrevStep"
  },
  {
    question: "Can Query Folding still occur when filtering SQL tables with Power Query parameters?",
    shortAnswer: "Yes; scalar parameters are folded directly into the generated SQL query's `WHERE` clause (e.g. `WHERE [Date] >= '2026-01-01'`).",
    explanation: "Native parameters preserve complete Query Folding capability.",
    hint: "Yes; parameters fold directly into the SQL WHERE clause.",
    level: "advanced",
    codeExample: "Query Folding: WHERE [Amount] >= @p_Threshold"
  },
  {
    question: "How do you convert a hardcoded file path step in M into a parameterized step?",
    shortAnswer: "Replace the literal quoted file path string with the parameter identifier: change `File.Contents(\"C:\\Data\\sales.csv\")` to `File.Contents(p_FolderPath & \"sales.csv\")`.",
    explanation: "Simple variable injection in Advanced Editor.",
    hint: "Replace hardcoded path string with parameter variable name.",
    level: "basic",
    codeExample: "File.Contents(p_FolderPath & \"monthly_sales.csv\")"
  },
  {
    question: "What is the recommended naming convention for Power Query parameters?",
    shortAnswer: "Prefixing parameter query names with `p_` or `param_` (e.g. `p_StartDate`, `p_ServerName`, `p_MinThreshold`).",
    explanation: "Distinguishes configuration parameters from standard data table queries.",
    hint: "Prefix with p_ (e.g. p_StartDate, p_FolderPath).",
    level: "basic",
    codeExample: "p_TargetBranch, p_FiscalYearCutoff, p_FolderPath"
  },
  {
    question: "How do you dynamically filter for the 'Last N Days' using a parameter in M?",
    shortAnswer: "Combine `DateTime.LocalNow()` with `#duration`: `Table.SelectRows(Source, each [Date] >= Date.AddDays(DateTime.Date(DateTime.LocalNow()), -p_NumberOfDays))`.",
    explanation: "Calculates rolling date boundary relative to current system clock.",
    hint: "Date.AddDays(DateTime.Date(DateTime.LocalNow()), -p_Days).",
    level: "moderate",
    codeExample: "Cutoff = Date.AddDays(DateTime.Date(DateTime.LocalNow()), -p_DaysBack)"
  },
  {
    question: "What happens if a user enters a text string into a Number parameter?",
    shortAnswer: "Power Query rejects the input with a validation error stating that the value cannot be converted to type Number.",
    explanation: "Type validation is enforced upon parameter assignment.",
    hint: "Rejects input with type conversion validation error.",
    level: "basic",
    codeExample: "Error: Value cannot be converted to Number"
  },
  {
    question: "How do you parameterize the number of rows to preview in an extraction query?",
    shortAnswer: "Use `Table.FirstN(Source, p_PreviewSize)` where `p_PreviewSize` is a numeric parameter.",
    explanation: "Allows rapid development testing on small sample sizes before full refresh.",
    hint: "Table.FirstN(Source, p_SampleSize).",
    level: "basic",
    codeExample: "= Table.FirstN(Source, p_TopRowsLimit)"
  },
  {
    question: "How do you organize multiple parameters in large enterprise Power Query projects?",
    shortAnswer: "Create a dedicated Query Group folder named `00_Parameters` in the Queries pane and move all `p_*` parameters into it.",
    explanation: "Standard enterprise project organization.",
    hint: "Group parameters into a dedicated '00_Parameters' folder.",
    level: "basic",
    codeExample: "Queries Pane → New Group → '00_Parameters'"
  },
  {
    question: "How do you parameterize column selection in M code?",
    shortAnswer: "Pass a list parameter to `Table.SelectColumns(Source, p_RequiredColumnsList)`.",
    explanation: "Enables dynamic column projections based on user settings.",
    hint: "Table.SelectColumns(Table, p_ColumnsList).",
    level: "advanced",
    codeExample: "= Table.SelectColumns(Source, p_ColumnsToKeep)"
  },
  {
    question: "Can an Excel formula compute the parameter values passed to Power Query?",
    shortAnswer: "Yes; if parameters are read from an Excel Table using `Excel.CurrentWorkbook()`, worksheet formulas (e.g. `=TODAY()-30`) dynamically drive Power Query parameters!",
    explanation: "Worksheet calculation engine feeds Power Query parameter table.",
    hint: "Yes; worksheet formulas in Excel parameter tables feed Power Query.",
    level: "expert",
    codeExample: "Excel Cell Formula: =TODAY()-30 → Feeds Power Query p_StartDate"
  },
  {
    question: "Why should you avoid hardcoding the current year (e.g. `2026`) in date filters?",
    shortAnswer: "Because hardcoded years will break automated reports when transitioning into the next calendar year; use dynamic parameters or `Date.Year(DateTime.LocalNow())` instead.",
    explanation: "Eliminates year-end report maintenance overhead.",
    hint: "Hardcoding breaks on New Year; use dynamic parameters or DateTime.LocalNow().",
    level: "basic",
    codeExample: "DynamicYear = Date.Year(DateTime.LocalNow())"
  },
  {
    question: "What is Instructor Sukanta Hui's golden rule for Power Query Parameterization?",
    shortAnswer: "Zero hardcoding in production! Never hardcode absolute file paths, server names, or date thresholds in M scripts. Prefix all parameter queries with `p_`, organize them in a `00_Parameters` folder, use suggested lists/queries for validation, and connect parameters to Excel parameter tables so non-technical stakeholders can control reports without touching a single line of M code!",
    explanation: "Dynamic parameterization transforms rigid static scripts into agile enterprise applications!",
    hint: "Zero Hardcoding + p_ Prefix + Excel Parameter Tables + Query Folding Compatibility = Elite Architecture!",
    level: "expert",
    codeExample: "Rule: Never hardcode 'C:\\Data\\'! Use p_FolderPath & Excel.CurrentWorkbook()!"
  }
];

export default questions;
