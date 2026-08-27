// topic9_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 9
// Topic: Query Folding: Understanding how Power Query pushes ETL transformations to backend SQL servers
// Module: 005_002_advanced-power-query-m-code-scripting-and-custom-functions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is Query Folding in Power Query?",
    shortAnswer: "Query Folding is the capability of Power Query to translate M transformations into native database query language statements (such as T-SQL) and push their execution to the backend source server.",
    explanation: "Delegates data transformation and filtering to the database server rather than pulling raw tables into client RAM.",
    hint: "Translating M code into native SQL executed on the server.",
    level: "basic",
    codeExample: "Table.SelectRows(Source, each [Region] = \"East\") &rarr; WHERE [Region] = 'East'"
  },
  {
    question: "Why is Query Folding critical for enterprise dataset performance?",
    shortAnswer: "It prevents transferring massive raw tables over the network by filtering, joining, and aggregating rows on high-performance database servers, transferring only the final refined result set.",
    explanation: "Minimizes network latency, client RAM consumption, and data refresh duration.",
    hint: "Filtering at the server level drastically reduces bandwidth and memory footprint.",
    level: "basic",
    codeExample: "10M rows in SQL &rarr; Folded filter &rarr; Only 5k rows transferred to client"
  },
  {
    question: "How can you visually verify if a specific step is folding in Power Query Editor?",
    shortAnswer: "Right-click the step in the 'Applied Steps' list; if 'View Native Query' is enabled and clickable, that step is folding. If greyed out, folding has stopped.",
    explanation: "Native Query context menu inspection.",
    hint: "Right-click step &rarr; check if 'View Native Query' is enabled.",
    level: "basic",
    codeExample: "Right-click 'Filtered Rows' &rarr; 'View Native Query'"
  },
  {
    question: "What happens when a non-foldable transformation step is applied in an M query?",
    shortAnswer: "Query folding breaks permanently at that step; all subsequent steps are executed locally in Power Query's client mashup engine in RAM.",
    explanation: "Folding is continuous from the source; once broken, downstream steps cannot fold.",
    hint: "Folding is linear; once interrupted, no subsequent steps can fold back.",
    level: "moderate",
    codeExample: "Step1 (Folded) &rarr; Step2 (Broken: Text.Proper) &rarr; Step3 (Unfolded client filter)"
  },
  {
    question: "Which data source connectors natively support Query Folding?",
    shortAnswer: "Relational database management systems (SQL Server, Oracle, PostgreSQL, MySQL), OData feeds, SharePoint Lists, and Microsoft Dataverse.",
    explanation: "Requires a source with an underlying query processor engine.",
    hint: "Relational databases and structured endpoints with native query engines.",
    level: "moderate",
    codeExample: "Sql.Database(\"server\", \"db\"), PostgreSQL.Database(...), OData.Feed(...)"
  },
  {
    question: "Which common data sources do NOT support Query Folding?",
    shortAnswer: "Flat text files (.csv, .tsv), Excel workbooks (.xlsx), JSON files, XML files, and standard REST API endpoints.",
    explanation: "File systems and raw endpoints lack database query engines.",
    hint: "Flat files and static documents lacking a backend database query optimizer.",
    level: "basic",
    codeExample: "Csv.Document(File.Contents(...)), Excel.Workbook(File.Contents(...))"
  },
  {
    question: "Which M standard transformations typically fold into SQL without issues?",
    shortAnswer: "`Table.SelectRows` (WHERE), `Table.SelectColumns` (SELECT), `Table.RenameColumns` (AS), `Table.Join` (INNER/LEFT JOIN), `Table.Group` (GROUP BY), and `Table.Sort` (ORDER BY).",
    explanation: "Direct relational algebra primitives.",
    hint: "Row filtering, column projection, joins, grouping, and sorting.",
    level: "moderate",
    codeExample: "Table.SelectRows &rarr; WHERE | Table.Group &rarr; GROUP BY | Table.Join &rarr; JOIN"
  },
  {
    question: "Which common M transformations break Query Folding immediately?",
    shortAnswer: "Custom M functions without SQL translations, `Text.Proper`, `Table.Buffer`, `Table.AddIndexColumn`, `try...otherwise` constructs, and merging with flat CSV files.",
    explanation: "Operations lacking native SQL server function equivalents.",
    hint: "Capitalization functions, index column addition, buffering, and client-side try catches.",
    level: "moderate",
    codeExample: "Table.AddIndexColumn, Text.Proper, Table.Buffer"
  },
  {
    question: "What is the function `Value.NativeQuery` and when should it be used?",
    shortAnswer: "It executes a handwritten SQL query directly against the target database while allowing downstream M transformations to continue folding if `EnableFolding=true` is specified.",
    explanation: "Direct SQL passthrough with optional downstream folding capability.",
    hint: "Value.NativeQuery(targetSource, sqlString, null, [EnableFolding=true]).",
    level: "advanced",
    codeExample: "Value.NativeQuery(Source, \"SELECT * FROM FactSales WHERE Year=2026\", null, [EnableFolding=true])"
  },
  {
    question: "How does Query Folding interact with Incremental Refresh in Power BI Service?",
    shortAnswer: "Query Folding is a MANDATORY prerequisite for Incremental Refresh; RangeStart and RangeEnd date filter parameters MUST fold into the SQL WHERE clause to partition datasets in cloud storage.",
    explanation: "Without folding, Incremental Refresh pulls the entire database on every scheduled refresh.",
    hint: "RangeStart/RangeEnd date filtering must fold to partition tables in the cloud.",
    level: "expert",
    codeExample: "Table.SelectRows(Source, each [OrderDate] >= RangeStart and [OrderDate] < RangeEnd)"
  },
  {
    question: "Why should you order foldable steps before non-foldable steps in M scripts?",
    shortAnswer: "To ensure that as much filtering, column pruning, and joining occurs on the database server before client-side operations break the folding chain.",
    explanation: "Maximizes server-side processing before falling back to client memory.",
    hint: "Filter and prune columns in SQL before applying custom text transformations.",
    level: "moderate",
    codeExample: "Source &rarr; Filter Rows &rarr; Select Columns &rarr; [Folded] &rarr; Custom M Function [Unfolded]"
  },
  {
    question: "How does `Table.AddIndexColumn` affect Query Folding?",
    shortAnswer: "It breaks Query Folding because standard SQL lacks an ANSI deterministic 0-based row index generation primitive across all relational connectors.",
    explanation: "Index calculation forces data into local client memory.",
    hint: "Index generation is evaluated sequentially by the local Power Query engine.",
    level: "moderate",
    codeExample: "Table.AddIndexColumn(Source, \"Index\", 1, 1) &rarr; Folding Broken"
  },
  {
    question: "How can you inspect the generated SQL query when 'View Native Query' is greyed out but you suspect folding is occurring?",
    shortAnswer: "Use SQL Server Profiler, Extended Events, or Power BI Desktop Query Diagnostics (`Diagnostics.Session`) to inspect the actual T-SQL statement sent over the wire.",
    explanation: "Network/database telemetry logging captures the raw SQL payload.",
    hint: "SQL Profiler, Extended Events, or Power Query Query Diagnostics tool.",
    level: "advanced",
    codeExample: "Start Diagnostics in Power Query &rarr; View detailed telemetry trace table."
  },
  {
    question: "What is Partial Query Folding?",
    shortAnswer: "When the first several steps of an M query are folded into a single SQL statement, but subsequent steps are evaluated locally in client memory after a folding break occurs.",
    explanation: "Hybrid execution: Server handles first chunk; Mashup Engine handles remainder.",
    hint: "Server executes first steps; local engine processes remaining steps.",
    level: "moderate",
    codeExample: "SQL Server (Steps 1-3) &rarr; Network Stream &rarr; Mashup Engine (Steps 4-6)"
  },
  {
    question: "Does merging (joining) two separate SQL queries fold if both queries originate from the same database?",
    shortAnswer: "Yes; if both tables reside on the same database server and instance, Power Query generates a single SQL query containing an `INNER JOIN` or `LEFT OUTER JOIN`.",
    explanation: "Same-server relational joins fold seamlessly.",
    hint: "Joins between tables on the same database fold into SQL JOIN syntax.",
    level: "advanced",
    codeExample: "Table.NestedJoin(FactSales, {\"CustID\"}, DimCustomer, {\"CustID\"}, \"Cust\") &rarr; SQL JOIN"
  },
  {
    question: "Does merging two queries fold if one query is from SQL Server and the other is from an Excel spreadsheet?",
    shortAnswer: "No; cross-source queries cannot fold. Power Query pulls the SQL table into client memory and performs the hash join locally.",
    explanation: "Cross-system joins cannot be executed by a single backend engine.",
    hint: "Cross-source joins break folding and force local in-memory joins.",
    level: "basic",
    codeExample: "SQL Fact + Excel Budget &rarr; In-Memory Hash Join in Client Mashup Engine"
  },
  {
    question: "How does Privacy Levels (Data Privacy Firewall) impact Query Folding across multiple sources?",
    shortAnswer: "Strict Data Privacy settings prevent sending values from one data source as parameters or filter criteria to another data source, blocking folding to prevent data leakage.",
    explanation: "Privacy firewall enforces data isolation boundaries.",
    hint: "Formula Firewall isolates different privacy domains, stopping parameter injection.",
    level: "expert",
    codeExample: "Formula.Firewall: Query references other queries with incompatible privacy levels."
  },
  {
    question: "How does `Table.Buffer` affect Query Folding?",
    shortAnswer: "`Table.Buffer` deliberately breaks Query Folding by loading the entire table into client RAM, preventing any further server-side pushdown.",
    explanation: "Buffers data in memory, permanently decoupling from the server query planner.",
    hint: "Forces table into local RAM buffer, terminating folding.",
    level: "moderate",
    codeExample: "Table.Buffer(Source) &rarr; Evaluates and stores entire table in local memory."
  },
  {
    question: "How does `Table.Distinct` translate into SQL during Query Folding?",
    shortAnswer: "It translates into a `SELECT DISTINCT ...` clause or a `ROW_NUMBER() OVER (PARTITION BY ...)` construct in the generated SQL statement.",
    explanation: "Native deduplication pushdown.",
    hint: "Translates directly to SQL `SELECT DISTINCT`.",
    level: "basic",
    codeExample: "Table.Distinct(Source, {\"CustomerID\"}) &rarr; SELECT DISTINCT CustomerID..."
  },
  {
    question: "What is Query Folding in OData feeds and Web APIs?",
    shortAnswer: "Translating filter and select steps into OData URI query parameters such as `$filter`, `$select`, `$top`, and `$expand`.",
    explanation: "URL-level query parameter pushdown for RESTful OData services.",
    hint: "Pushes transformations into OData URL query params like $filter and $select.",
    level: "advanced",
    codeExample: "Table.SelectRows(Feed, each [Status]=\"Active\") &rarr; URL?$filter=Status eq 'Active'"
  },
  {
    question: "Can date and time transformations fold in SQL Server?",
    shortAnswer: "Yes; standard functions like `Date.Year`, `Date.Month`, and date comparisons translate into `DATEPART`, `YEAR()`, and `MONTH()` T-SQL functions.",
    explanation: "Direct SQL date scalar function mapping.",
    hint: "Standard date extractors fold into SQL DATEPART and YEAR functions.",
    level: "moderate",
    codeExample: "Date.Year([OrderDate]) &rarr; DATEPART(year, [OrderDate])"
  },
  {
    question: "Why does changing a column's data type sometimes break Query Folding?",
    shortAnswer: "If the target M data type has no exact SQL data type equivalent in the connector, or if the conversion requires client-side culture parsing, folding is disabled.",
    explanation: "Type mismatch between M engine and relational schema.",
    hint: "Complex culture-dependent conversions force client-side processing.",
    level: "advanced",
    codeExample: "Transforming custom formatted text strings into complex M types."
  },
  {
    question: "How can you force a SQL database to perform calculations that M cannot fold?",
    shortAnswer: "Create a SQL View or Stored Procedure directly in the database and connect Power Query to that View, letting SQL handle the complex calculations natively.",
    explanation: "Database view encapsulation pattern.",
    hint: "Encapsulate complex transformations inside database Views or SQL procedures.",
    level: "moderate",
    codeExample: "CREATE VIEW dbo.vw_CleanedSales AS SELECT ProperName, ... FROM FactSales"
  },
  {
    question: "How does Query Folding improve Power BI Scheduled Refresh speed on large enterprise datasets?",
    shortAnswer: "It reduces ETL refresh times from hours to minutes because the heavy computation is distributed across indexed database server cores rather than single-threaded client memory.",
    explanation: "Harnesses high-throughput enterprise SQL hardware and indexes.",
    hint: "Database indexes and parallel server query execution drastically accelerate ETL.",
    level: "basic",
    codeExample: "Server index seek (1.2s) vs Full table client scan (45s)"
  },
  {
    question: "What is the relationship between Query Folding and DirectQuery mode in Power BI?",
    shortAnswer: "DirectQuery relies 100% on Query Folding; every single user visual interaction must be completely translated into a native SQL query sent to the database in real time.",
    explanation: "DirectQuery has no local storage; all logic must fold into SQL.",
    hint: "In DirectQuery, 100% of transformations must fold into SQL queries.",
    level: "expert",
    codeExample: "DirectQuery: No local cache; every visual trigger generates a folded SQL query."
  },
  {
    question: "How does `Table.FirstN` translate into SQL during Query Folding?",
    shortAnswer: "It translates into a `TOP (N)` clause in T-SQL or `LIMIT N` in PostgreSQL/MySQL.",
    explanation: "Pushes row limit constraints to the database engine.",
    hint: "Translates to SQL `TOP N` or `LIMIT N`.",
    level: "basic",
    codeExample: "Table.FirstN(Source, 100) &rarr; SELECT TOP (100) * FROM dbo.Orders"
  },
  {
    question: "Does renaming a column break Query Folding in SQL Server?",
    shortAnswer: "No; column renaming folds cleanly as column aliasing in the `SELECT [OldName] AS [NewName]` SQL statement.",
    explanation: "Standard projection aliasing in relational SQL.",
    hint: "Folds as SQL `AS` alias without breaking server pushdown.",
    level: "basic",
    codeExample: "Table.RenameColumns(Source, {{\"CustName\", \"Customer_Name\"}}) &rarr; SELECT CustName AS Customer_Name"
  },
  {
    question: "Why does writing a custom SQL query in the connector's 'SQL Statement' box sometimes break downstream folding?",
    shortAnswer: "In older Power Query connector versions, entering a raw SQL statement wrapped the query in a subquery or disabled subsequent UI-generated step folding unless `EnableFolding=true` was specified.",
    explanation: "Subquery wrapping and connector limitations.",
    hint: "Custom SQL can disable subsequent visual step folding in older connectors.",
    level: "advanced",
    codeExample: "Sql.Database(\"server\", \"db\", [Query=\"SELECT ...\"]) &rarr; May block UI step folding."
  },
  {
    question: "What is Query Folding telemetry in Power BI Query Diagnostics?",
    shortAnswer: "A diagnostic logging tool that tracks the exact SQL queries generated per step, execution duration, and resource utilization across the Power Query evaluation pipeline.",
    explanation: "Enterprise ETL profiling and performance tuning.",
    hint: "Records execution traces, generated SQL queries, and processing duration.",
    level: "expert",
    codeExample: "Diagnostics.ActivityId, Query Diagnostic Detailed Trace Tables"
  },
  {
    question: "What is the golden architectural rule of Query Folding for Power Query developers?",
    shortAnswer: "Filter rows and select columns as early as possible in the query pipeline while folding is active, and postpone all non-foldable custom transformations to the very final steps.",
    explanation: "Maximizes server-side filtering and reduces dataset volume before breaking folding.",
    hint: "Filter and prune first; apply custom non-foldable transformations last.",
    level: "basic",
    codeExample: "Golden Rule: Fold early (Filter/Select/Join) &rarr; Transform late (Custom functions)"
  }
];

export default questions;
