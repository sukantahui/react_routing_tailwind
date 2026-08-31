// topic11_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 11
// Topic: Documenting and organizing complex enterprise ETL query groups
// Module: 005_002_advanced-power-query-m-code-scripting-and-custom-functions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "Why is query grouping and folder organization essential in enterprise Power Query projects?",
    shortAnswer: "Large corporate data models often contain dozens of staging queries, parameter objects, custom functions, and fact tables; grouping them into structured folders prevents cognitive overload, accidental editing, and simplifies team collaboration.",
    explanation: "Provides visual taxonomy and operational structure for scalable BI models.",
    hint: "Structures dozens of queries into logical folders like Parameters, Functions, Staging, and Facts.",
    level: "basic",
    codeExample: "Folder hierarchy: 01_Parameters → 02_Functions → 03_Staging → 04_DataModel"
  },
  {
    question: "How do you create a Query Group (Folder) in the Power Query Editor UI?",
    shortAnswer: "In the Queries pane on the left, right-click any blank area or existing query and select 'New Group...', assign a folder name and optional description.",
    explanation: "Standard UI query organization method.",
    hint: "Right-click Queries pane → New Group.",
    level: "basic",
    codeExample: "Right-click Queries Pane → 'New Group...' → Name: '01_Staging_Queries'"
  },
  {
    question: "What is the industry-standard folder numbering convention for enterprise Power Query models?",
    shortAnswer: "Prefixing folder names with two-digit sequences: `01_Parameters`, `02_Custom_Functions`, `03_Staging_Queries`, `04_Dimension_Tables`, `05_Fact_Tables`, and `06_Utility_Audits`.",
    explanation: "Guarantees deterministic alphanumeric sorting in the Power Query interface.",
    hint: "Use numerical prefixes like 01_, 02_, 03_ to enforce logical ETL processing order.",
    level: "moderate",
    codeExample: "01_Parameters, 02_Functions, 03_Staging, 04_Dimensions, 05_Facts"
  },
  {
    question: "What is the purpose of adding inline comments in Power Query M code?",
    shortAnswer: "Inline comments explain non-obvious business logic, regulatory rules, regex patterns, and data engineering decisions to facilitate maintenance and compliance audits.",
    explanation: "M supports single-line `//` and multi-line `/* ... */` comment syntaxes.",
    hint: "Use `//` for single-line notes and `/* ... */` for multi-line documentation blocks.",
    level: "basic",
    codeExample: "// Deduct 18% GST under Section 194C\nNetPayable = [Gross] * 0.82"
  },
  {
    question: "How do you attach custom UI documentation metadata to a user-defined M function?",
    shortAnswer: "By defining a custom `type` record with `meta [Documentation.*]` fields and applying it via `Value.ReplaceType(fxFunction, fxType)`.",
    explanation: "Generates native Power Query UI input dialogs with parameter descriptions, tooltips, and examples.",
    hint: "Use `Value.ReplaceType` with `meta [Documentation.Name=..., Documentation.Description=...]`.",
    level: "advanced",
    codeExample: "fxWithDocs = Value.ReplaceType(fxLogic, type function (amt as number) as number meta [Documentation.Name=\"fxGST\"])"
  },
  {
    question: "Which `Documentation.*` metadata fields are supported in Power Query custom functions?",
    shortAnswer: "`Documentation.Name`, `Documentation.Description`, `Documentation.LongDescription`, `Documentation.Category`, `Documentation.Examples`, and `Documentation.FieldDescription` for individual parameters.",
    explanation: "Standard metadata attributes recognized by Power Query's function documentation generator.",
    hint: "Name, Description, LongDescription, Category, Examples, FieldDescription.",
    level: "advanced",
    codeExample: "[Documentation.Name = \"fxFiscalQuarter\", Documentation.Description = \"Converts date into Indian Q1..Q4\"]"
  },
  {
    question: "How do you add step-level descriptions in the Applied Steps pane?",
    shortAnswer: "Right-click any step in the Applied Steps list, select 'Properties...', and enter a clear description in the Description text box; a visual information tooltip icon will appear beside the step.",
    explanation: "Step-level descriptions document why specific filtering or transformation logic was chosen.",
    hint: "Right-click step → Properties → Description.",
    level: "basic",
    codeExample: "Step Properties: 'Filters out pre-GST transactions prior to July 1, 2017.'"
  },
  {
    question: "What is the 'Reference' vs 'Duplicate' pattern when building multi-tier ETL queries?",
    shortAnswer: "'Reference' creates a downstream query that depends on the output of an upstream query without re-reading raw files; 'Duplicate' clones the full M script into a separate disconnected pipeline.",
    explanation: "Reference enforces DRY (Don't Repeat Yourself) architecture; Duplicate multiplies maintenance overhead.",
    hint: "Reference branches off existing queries; Duplicate copies entire script independently.",
    level: "moderate",
    codeExample: "Dim_Customer = Staging_MasterData (Reference) vs Staging_Copy (Duplicate)"
  },
  {
    question: "Why should intermediate staging queries have 'Enable Load' disabled?",
    shortAnswer: "To prevent storing redundant intermediate data tables in the Power BI VertiPaq / Excel data model, saving memory and preventing user confusion in reporting visual panes.",
    explanation: "Staging queries act purely as ETL pipeline processors, loading only the final curated models.",
    hint: "Uncheck 'Enable Load' so intermediate tables don't clutter the report canvas.",
    level: "basic",
    codeExample: "Staging_Raw_Sales → Uncheck 'Enable Load' (Italicized query name in Queries pane)"
  },
  {
    question: "How do you identify non-loading staging queries in the Queries pane?",
    shortAnswer: "Queries with 'Enable Load' disabled display their names in italicized font in the Power Query Queries pane.",
    explanation: "Visual indicator for intermediate data pipelines.",
    hint: "Italicized query titles represent queries that do not load to the data model.",
    level: "basic",
    codeExample: "Italicized: *stg_BarrackporeBranch* (ETL Only) vs Normal: FactSales (Loaded)"
  },
  {
    question: "What is the recommended naming convention for staging queries vs final data model tables?",
    shortAnswer: "Prefix staging queries with `stg_` or `src_` (e.g. `stg_Invoices_Raw`), dimension tables with `Dim_` (e.g. `Dim_Customer`), and fact tables with `Fact_` (e.g. `Fact_SalesTransactions`).",
    explanation: "Kimball dimensional modeling naming conventions.",
    hint: "Use `stg_` for staging, `Dim_` for dimensions, and `Fact_` for transactional tables.",
    level: "moderate",
    codeExample: "stg_ERP_Extract → Dim_Branch, Fact_Revenue"
  },
  {
    question: "How do query parameters help in organizing environment configurations (Dev, Test, Prod)?",
    shortAnswer: "By defining central parameters like `pServerName`, `pDatabaseName`, or `pRootFolder`, switching entire enterprise ETL models between Dev and Prod requires changing only a single parameter value.",
    explanation: "Centralizes environment variables without editing individual M scripts.",
    hint: "Central parameter values change source servers across all queries simultaneously.",
    level: "moderate",
    codeExample: "Sql.Database(pServerName, pDatabaseName) → Switch pServerName from 'DEV-SRV' to 'PROD-SRV'"
  },
  {
    question: "How do you organize reusable custom M functions in enterprise environments?",
    shortAnswer: "Store them in a dedicated `02_Functions` query group, or consolidate them into shared Power BI Dataflows or Power Query Custom Connector (.mez/.pq) extensions.",
    explanation: "Enables multi-project reuse and centralized function governance.",
    hint: "Group functions in a dedicated folder or deploy via Custom Connectors (.mez).",
    level: "advanced",
    codeExample: "Shared M Library in `02_Functions`: fxCleanGSTIN, fxFiscalPeriod, fxCalculateTDS"
  },
  {
    question: "What is Query Dependency View in Power Query Editor?",
    shortAnswer: "A visual architectural DAG (Directed Acyclic Graph) diagram accessible via `View → Query Dependencies` showing how queries, parameters, staging steps, and data sources connect together.",
    explanation: "Provides high-level topological visualization of the entire ETL lineage.",
    hint: "View → Query Dependencies displays the graphical data lineage tree.",
    level: "basic",
    codeExample: "View → Query Dependencies → Visual DAG graph of all sources, staging, and facts."
  },
  {
    question: "How does Query Dependency View assist during performance optimization and debugging?",
    shortAnswer: "It instantly reveals redundant data source connections, accidental duplicate branches, circular dependencies, and cross-source privacy boundary bottlenecks.",
    explanation: "Pinpoints redundant upstream paths and architectural anti-patterns.",
    hint: "Highlights multiple separate connections to the same database or file.",
    level: "moderate",
    codeExample: "Identifies if 5 queries are opening the same CSV independently instead of sharing a staging node."
  },
  {
    question: "Why should sensitive credentials never be hardcoded into M query comments or steps?",
    shortAnswer: "Because Power BI .pbix and Excel .xlsx files are unencrypted zip archives; anyone with read access can open the Advanced Editor or unzip the file and view plain-text passwords and API tokens.",
    explanation: "Security vulnerability; credentials must be managed via Data Source Settings or Azure Key Vault.",
    hint: "M code is visible in plain text inside workbook files; always use Data Source Settings.",
    level: "moderate",
    codeExample: "Never: APIKey = \"secret_12345\" // Plain text vulnerability"
  },
  {
    question: "How do you document deprecations or schema warnings inside an enterprise M query?",
    shortAnswer: "Add a prominent multi-line header comment block at the top of the `let` expression detailing author, version, last modified date, business owner, and deprecation roadmap.",
    explanation: "Enterprise header documentation standard.",
    hint: "Add header comment blocks with Author, Version, Date, and Scope at top of `let` block.",
    level: "basic",
    codeExample: "/* \n * Query: Fact_ConsolidatedRevenue\n * Author: Sukanta Hui | Coder & AccoTax\n * Version: 2.5.0 (Aug 2026)\n */"
  },
  {
    question: "How can you group related steps within a single complex M query?",
    shortAnswer: "Use structured step naming with category prefixes (e.g. `// --- 1. Extraction ---`, `// --- 2. Type Cleansing ---`, `// --- 3. Business Calculations ---`) and descriptive step names.",
    explanation: "Brings section-level modularity inside long Advanced Editor scripts.",
    hint: "Organize the `let` block into demarcated sections using banner comments.",
    level: "basic",
    codeExample: "// --------------------\n// 1. DATA SANITIZATION\n// --------------------\nCleanStep = ..."
  },
  {
    question: "What is the risk of having more than 50 ungrouped queries in a Power BI project?",
    shortAnswer: "Team members cannot easily discern which queries load into the data model versus which are intermediate staging helpers, leading to accidental deletion, duplicate logic, and broken reports.",
    explanation: "Cognitive overload and maintenance hazards in unorganized projects.",
    hint: "Lack of structure leads to accidental edits and maintenance chaos.",
    level: "basic",
    codeExample: "50 flat queries → Refactor into 5 structured numbered groups."
  },
  {
    question: "How do you enforce consistent datetime formatting across all enterprise queries?",
    shortAnswer: "Create a centralized date formatting custom function (e.g. `fxFormatIST`) in `02_Functions` and invoke it across all staging queries rather than applying ad-hoc formatting.",
    explanation: "Ensures uniform timezone and date serial representations across the entire data estate.",
    hint: "Centralize date transformation logic in a shared custom function.",
    level: "moderate",
    codeExample: "fxFormatIST = (dt) => DateTime.ToText(dt, \"yyyy-MM-dd HH:mm:ss\", \"en-IN\")"
  },
  {
    question: "How do you document the purpose of custom parameters for business users in Power BI Template (.pbit) files?",
    shortAnswer: "Fill in the 'Description' field in the 'Manage Parameters' dialog; when users open the .pbit template, this description appears as guidance in the parameter prompt modal.",
    explanation: "Guides non-technical users when instantiating new project templates.",
    hint: "Parameter descriptions appear in the template instantiation dialog.",
    level: "moderate",
    codeExample: "Parameter: pTaxYear | Description: 'Enter 4-digit Assessment Year (e.g. 2026)'"
  },
  {
    question: "What is the recommended approach for organizing queries when merging data from multiple regional branches?",
    shortAnswer: "Create individual staging queries for each branch in `03_Staging/Regional_Branches`, apply standardized schemas, and combine them in a single unified `Fact_AllBranches` query in `05_Facts`.",
    explanation: "Hierarchical sub-grouping isolates branch-specific quirks before consolidation.",
    hint: "Stage each branch separately in a subfolder before merging into the central Fact table.",
    level: "moderate",
    codeExample: "Staging/Branches: stg_Barrackpore, stg_Shyamnagar → Facts: Fact_Sales"
  },
  {
    question: "How does organizing queries into Dataflows improve enterprise report governance?",
    shortAnswer: "Power BI Dataflows extract the ETL logic into the cloud once, allowing multiple independent datasets and reports to connect to certified, pre-transformed entities without duplicating M scripts.",
    explanation: "Single version of the truth across the entire enterprise reporting ecosystem.",
    hint: "Dataflows host shared cloud ETL entities consumed by multiple reports.",
    level: "advanced",
    codeExample: "Power BI Dataflow (Cloud M ETL) → Model 1, Model 2, Model 3"
  },
  {
    question: "What is the benefit of keeping the Advanced Editor M script formatted with consistent indentation and variable naming?",
    shortAnswer: "It makes code reviews in Git version control straightforward, reduces syntax error rates, and ensures that junior developers and audit teams can maintain the codebase seamlessly.",
    explanation: "Code readability and version control diff hygiene.",
    hint: "Clean 2-space indentation and PascalCase/camelCase variable names simplify code reviews.",
    level: "basic",
    codeExample: "let\n  Source = ...,\n  CleanedData = ...\nin\n  CleanedData"
  },
  {
    question: "How do you handle deprecation when replacing an old staging query with a new optimized pipeline?",
    shortAnswer: "Move the old query into a `99_Deprecated_Archive` group, disable 'Enable Load', add a comment header with retirement date, and update downstream references to point to the new pipeline.",
    explanation: "Graceful query lifecycle retirement without breaking dependent assets.",
    hint: "Archive in a `99_Deprecated` folder with clear retirement notices.",
    level: "moderate",
    codeExample: "Folder: 99_Deprecated_Queries → stg_OldSales_RetireDec2026 (Enable Load: Off)"
  },
  {
    question: "Can Query Groups be nested in Power Query Editor?",
    shortAnswer: "Yes; you can create sub-groups inside parent groups (e.g. `03_Staging → ERP_Extracts`, `03_Staging → FlatFiles`) for deep hierarchical structure.",
    explanation: "Supports multi-tier folder taxonomy.",
    hint: "Right-click an existing group → New Group to create a nested subfolder.",
    level: "basic",
    codeExample: "03_Staging / 01_SQL_Databases, 03_Staging / 02_REST_APIs"
  },
  {
    question: "How do you document unit testing assertions directly within an M query?",
    shortAnswer: "Include an assertion step that evaluates business constraints (e.g. `RowCount > 0`, `NoNullKeys`) and throws an explicit `error` with a descriptive message if the assertion fails.",
    explanation: "Self-documenting fail-fast pipeline guards.",
    hint: "Insert assertion steps: `if [Check] = false then error \"Validation Failed\" else ...`",
    level: "expert",
    codeExample: "Assert_BalanceMatch = if TotalDebits <> TotalCredits then error \"Balance Mismatch\" else FinalTable"
  },
  {
    question: "What metadata function inspects the documentation attached to any native or custom M function?",
    shortAnswer: "`Value.Metadata(Value.Type(fxFunctionName))` or viewing the function directly in the Power Query formula bar.",
    explanation: "Programmatic inspection of function documentation records.",
    hint: "Value.Metadata extracts the record containing Documentation attributes.",
    level: "expert",
    codeExample: "DocRecord = Value.Metadata(Value.Type(fxGSTCompute))[Documentation.Description]"
  },
  {
    question: "How do you ensure that team members follow identical query architecture standards?",
    shortAnswer: "By publishing an official Enterprise Power Query Style Guide & Architecture Blueprint (such as Coder & AccoTax Course EXCEL-PRO-502) and providing starter `.pbit` template files.",
    explanation: "Institutional knowledge management and team alignment.",
    hint: "Standardize naming conventions, folder taxonomy, and code templates across the organization.",
    level: "basic",
    codeExample: "CNAT Standard ETL Starter Template (.pbit) with pre-built folder groups."
  },
  {
    question: "What is the ultimate golden rule of enterprise query organization?",
    shortAnswer: "Treat Power Query M code with the same rigor as production software: group logically, disable intermediate loads, document with metadata, and never leave mystery queries with default names like 'Table1'.",
    explanation: "Enterprise software engineering discipline applied to business intelligence.",
    hint: "Group logically, document clearly, name deliberately, and never leave default names.",
    level: "basic",
    codeExample: "Professional Rule: Meaningful Names + Folders + UI Metadata + Disabled Staging Loads"
  }
];

export default questions;
