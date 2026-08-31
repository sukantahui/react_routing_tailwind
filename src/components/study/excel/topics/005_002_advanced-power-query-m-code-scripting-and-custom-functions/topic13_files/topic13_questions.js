// topic13_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 13
// Topic: Assessment: Advanced M Scripting & Enterprise ETL Engineering Challenge
// Module: 005_002_advanced-power-query-m-code-scripting-and-custom-functions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary objective of the Advanced M Scripting & Enterprise ETL Engineering Challenge?",
    shortAnswer: "To rigorously evaluate mastery of end-to-end M code scripting, recursive iteration, dynamic API token management, error handling, query folding pushdown, and memory optimization.",
    explanation: "Comprehensive capstone assessment of advanced Power Query skills.",
    hint: "Assesses comprehensive mastery across all 12 prior M scripting topics.",
    level: "basic",
    codeExample: "Assessment Challenge: 100-Point Comprehensive M Architecture Exam"
  },
  {
    question: "How does M's 'call-by-need' lazy evaluation differ from eager evaluation in SQL or Python?",
    shortAnswer: "In M, expressions and steps in the `let` block are calculated only when referenced in the final `in` clause or downstream calculations; unreferenced steps consume zero CPU cycles.",
    explanation: "Lazy evaluation evaluates steps on-demand rather than sequentially at declaration time.",
    hint: "M calculates steps only when needed by the final output expression.",
    level: "basic",
    codeExample: "let StepA = HeavyFetch(), StepB = 42 in StepB // StepA is NEVER executed!"
  },
  {
    question: "When should you use `List.Generate` over `List.Accumulate`?",
    shortAnswer: "Use `List.Generate` for dynamic while-loop conditions (e.g. API pagination until `next_token` is null); use `List.Accumulate` for folding over a fixed-length list to accumulate a single aggregate scalar or state.",
    explanation: "List.Generate is for while-loops; List.Accumulate is for fold/reduce operations.",
    hint: "List.Generate for while-loops; List.Accumulate for reduce/fold over fixed lists.",
    level: "moderate",
    codeExample: "List.Generate(initial, condition, next, selector) vs List.Accumulate(list, seed, accumulator)"
  },
  {
    question: "What is the correct syntax for declaring a recursive function in M?",
    shortAnswer: "Prefix the function name with `@` inside its own body (e.g. `fx_BOM = (id) => ... @fx_BOM(childID)`).",
    explanation: "The `@` scoping operator allows an M lambda to reference its own identifier.",
    hint: "Use `@FunctionName` to invoke a function recursively within its own definition.",
    level: "moderate",
    codeExample: "fx_Factorial = (n) => if n <= 1 then 1 else n * @fx_Factorial(n - 1)"
  },
  {
    question: "Why does `Table.AddIndexColumn` break Query Folding when querying a SQL Server backend?",
    shortAnswer: "Because ANSI SQL does not have a deterministic cross-platform concept of row index without an explicit `ROW_NUMBER() OVER (ORDER BY ...)` clause, forcing M to fall back to client RAM evaluation.",
    explanation: "Breaks contiguous SQL translation and forces full client-side table extraction.",
    hint: "SQL lacks a default row index, forcing client memory execution.",
    level: "advanced",
    codeExample: "Avoid Table.AddIndexColumn before Table.SelectRows on SQL sources."
  },
  {
    question: "How does `Value.NativeQuery` support downstream query folding?",
    shortAnswer: "By including the option `[EnableFolding = true]`, allowing Power Query to wrap the native SQL in outer subqueries during subsequent filtering and column selection steps.",
    explanation: "Enables UI steps to fold on top of handwritten SQL queries.",
    hint: "Pass `[EnableFolding = true]` inside `Value.NativeQuery`.",
    level: "advanced",
    codeExample: "Value.NativeQuery(Source, \"SELECT * FROM dbo.Sales\", null, [EnableFolding = true])"
  },
  {
    question: "What is the difference between `try...otherwise null` and `try...catch` error records?",
    shortAnswer: "`try...otherwise null` silently suppresses errors and destroys diagnostic context; evaluating `try [Step]` yields a structured record `[HasError=true/false, Value=..., Error=[Reason, Message, Detail]]` for root-cause analysis.",
    explanation: "Error records provide rich diagnostic telemetry for quarantine logging.",
    hint: "try...otherwise discards error details; try returns an inspection record.",
    level: "advanced",
    codeExample: "ErrorRec = try [Amount] / [Qty] // [HasError, Value, Error]"
  },
  {
    question: "How do you optimize a query that performs row-by-row lookups into a 5,000-row dimension table?",
    shortAnswer: "Buffer the dimension table in memory once in the outer `let` block using `BufferedDim = Table.Buffer(DimTable)` before invoking `Table.AddColumn`.",
    explanation: "Reduces computational complexity from O(N*M) down to O(N).",
    hint: "Buffer the dimension table in RAM to avoid repeated re-evaluations.",
    level: "moderate",
    codeExample: "BufferedDim = Table.Buffer(DimRates), #\"Added\" = Table.AddColumn(Fact, \"INR\", each [Amt] * BufferedDim{[Cur=[Cur]]}[Rate])"
  },
  {
    question: "What is the role of `MissingField.UseNull` in enterprise ETL engineering?",
    shortAnswer: "It prevents runtime schema crashes when expected columns are missing in source files, filling them with null values instead of throwing fatal errors.",
    explanation: "Provides schema drift resilience against unpredictable source format changes.",
    hint: "Safely injects nulls for missing columns inside Table.SelectColumns.",
    level: "moderate",
    codeExample: "Table.SelectColumns(Source, ExpectedList, MissingField.UseNull)"
  },
  {
    question: "How do you lock the sort order of a table before applying `Table.Group`?",
    shortAnswer: "Wrap the sort step in `Table.Buffer`: `Table.Buffer(Table.Sort(Source, {{\"Date\", Order.Descending}}))`.",
    explanation: "Locks row sequence in RAM so Table.Group reliably retains the first/latest row per group.",
    hint: "Use Table.Buffer around Table.Sort to prevent Table.Group from discarding order.",
    level: "advanced",
    codeExample: "BufferedSort = Table.Buffer(Table.Sort(Source, {{\"Timestamp\", Order.Descending}}))"
  },
  {
    question: "Why should sensitive credentials never be hardcoded into M query text?",
    shortAnswer: "Because `.xlsx` and `.pbix` files are unencrypted zip archives; anyone with file access can view plain-text passwords and API tokens in the Advanced Editor.",
    explanation: "Security vulnerability; credentials must be stored in Data Source Settings or Azure Key Vault.",
    hint: "M code is stored in plain text inside workbook archives.",
    level: "basic",
    codeExample: "Use Data Source Settings or environment parameters instead of hardcoded keys."
  },
  {
    question: "How does `Binary.Buffer` accelerate multi-worksheet extraction from a single workbook?",
    shortAnswer: "It caches the raw file binary in RAM once, preventing Power Query from re-reading the entire file across slow network drives for each individual worksheet.",
    explanation: "Eliminates repetitive network and disk I/O bottlenecks.",
    hint: "Caches the raw workbook binary stream in memory.",
    level: "moderate",
    codeExample: "BufferedBook = Binary.Buffer(File.Contents(\"C:\\Data\\Master.xlsx\"))"
  },
  {
    question: "What is the 'Reference' vs 'Duplicate' pattern in enterprise query architecture?",
    shortAnswer: "'Reference' creates a downstream query that branches off an upstream staging query (single source of truth); 'Duplicate' copies the full M script independently, creating technical debt.",
    explanation: "Reference ensures changes propagate dynamically to all child queries.",
    hint: "Reference branches from existing queries; Duplicate clones independent copies.",
    level: "basic",
    codeExample: "Dim_Customer = stg_MasterData (Reference)"
  },
  {
    question: "Why should intermediate staging queries have 'Enable Load' disabled?",
    shortAnswer: "To prevent storing redundant intermediate transformation tables in the VertiPaq data model, saving memory and keeping visual field lists clean.",
    explanation: "Staging queries process data in RAM without loading to the final model.",
    hint: "Disabling Enable Load prevents data model bloat.",
    level: "basic",
    codeExample: "stg_ERP_Extract → Uncheck 'Enable Load' (Italicized font)"
  },
  {
    question: "How do you attach custom UI documentation metadata to a user-defined M function?",
    shortAnswer: "Use `Value.ReplaceType` with a custom `type function` signature decorated with `meta [Documentation.Name=..., Documentation.Description=...]`.",
    explanation: "Creates native Power Query UI parameter input dialogs with captions and sample values.",
    hint: "Decorate the function type with `meta [Documentation.*]` via `Value.ReplaceType`.",
    level: "advanced",
    codeExample: "Value.ReplaceType(fxLogic, type function (x as number) as number meta [Documentation.Name=\"fx...\"])"
  },
  {
    question: "What is the purpose of the Power Query Query Dependencies view?",
    shortAnswer: "It displays a graphical Directed Acyclic Graph (DAG) of all queries, parameters, staging steps, and external data sources to verify architectural lineage and privacy firewall boundaries.",
    explanation: "Topological data lineage visualization tool.",
    hint: "View → Query Dependencies shows the complete graphical ETL lineage DAG.",
    level: "basic",
    codeExample: "View → Query Dependencies"
  },
  {
    question: "How does `Table.StopFolding` differ from `Table.Buffer`?",
    shortAnswer: "`Table.StopFolding` lazily terminates SQL pushdown without forcing data into memory; `Table.Buffer` eagerly forces the entire table into client RAM.",
    explanation: "StopFolding terminates folding lazily; Table.Buffer loads eagerly into RAM.",
    hint: "StopFolding is lazy; Buffer is eager in memory.",
    level: "expert",
    codeExample: "Table.StopFolding(Source) vs Table.Buffer(Source)"
  },
  {
    question: "How do you handle JSON API rate limits (HTTP 429) using `List.Generate`?",
    shortAnswer: "In the generator's `next` step, inspect `ResponseHeaders` for retry-after delays or pause execution before triggering the next page fetch.",
    explanation: "Rate-limit-aware pagination loop in M.",
    hint: "Inspect response headers and throttle request loops inside List.Generate.",
    level: "expert",
    codeExample: "List.Generate(..., each [RetryCount] < 5, each FetchWithBackoff(...), ...)"
  },
  {
    question: "What is the primary benefit of early column pruning in Power Query ETL?",
    shortAnswer: "Pruning unused columns at Step 1 via `Table.SelectColumns` reduces in-memory row width, fitting data into fast CPU L1/L2 caches and preventing disk paging.",
    explanation: "Slashes memory footprint by up to 90% before performing heavy joins.",
    hint: "Remove unused columns at Step 1 to keep data inside ultra-fast CPU caches.",
    level: "basic",
    codeExample: "Table.SelectColumns(Source, {\"ID\", \"Date\", \"Amount\"})"
  },
  {
    question: "How do you enforce deterministic two-digit numbering in enterprise query groups?",
    shortAnswer: "Prefix folder names with `01_Parameters`, `02_Custom_Functions`, `03_Staging_Queries`, `04_Dimension_Tables`, `05_Fact_Tables`, and `06_Utility_Audits`.",
    explanation: "Enforces logical ETL processing sequence and deterministic sorting in the UI.",
    hint: "Use numerical prefixes (01_, 02_, 03_) on all folder names.",
    level: "basic",
    codeExample: "01_Parameters → 02_Functions → 03_Staging → 04_Dimensions → 05_Facts"
  },
  {
    question: "How do you dynamically detect and remove shifted banner headers in raw worksheets?",
    shortAnswer: "Use `Table.Skip(Source, n)` or find the header row dynamically using `Table.SelectRows` or custom M condition before promoting headers.",
    explanation: "Dynamic header alignment for inconsistent spreadsheet layouts.",
    hint: "Skip non-tabular title rows dynamically before promoting headers.",
    level: "moderate",
    codeExample: "Table.PromoteHeaders(Table.Skip(RawSheet, 3), [PromoteAllScalars=true])"
  },
  {
    question: "What is the Formula.Firewall error and how is it resolved in enterprise architectures?",
    shortAnswer: "It occurs when a query combines data sources with differing privacy levels; resolved by setting privacy levels to 'Organizational' or staging sources in separate decoupled queries.",
    explanation: "Enforces data privacy boundaries between private and external queries.",
    hint: "Align Privacy Levels or stage data sources in separate intermediate queries.",
    level: "advanced",
    codeExample: "Data Source Settings → Set all sources to 'Organizational'"
  },
  {
    question: "How do you sanitize dirty numeric strings containing currency symbols without throwing errors?",
    shortAnswer: "Use `Number.FromText(Text.Select([RawText], {\"0\"..\"9\", \".\", \"-\"}))` to extract valid decimal digits.",
    explanation: "Whitelist character sanitization for robust data type conversion.",
    hint: "Use `Text.Select` with digit whitelists before converting to numeric types.",
    level: "moderate",
    codeExample: "Number.FromText(Text.Select(\"Rs. 54,200.50\", {\"0\"..\"9\", \".\"}))"
  },
  {
    question: "How do you calculate statutory Indian GST (CGST/SGST/IGST) in an automated M step?",
    shortAnswer: "If `[CustomerState] = [BranchState]`, calculate `CGST = [Taxable] * ([Rate]/2)` and `SGST = [Taxable] * ([Rate]/2)`; otherwise, calculate `IGST = [Taxable] * [Rate]`.",
    explanation: "Statutory interstate vs intrastate GST business logic implemented in M.",
    hint: "Split rate 50/50 for intrastate CGST/SGST; apply full rate for interstate IGST.",
    level: "moderate",
    codeExample: "if [State] = \"WB\" then [Amt]*0.09 else 0"
  },
  {
    question: "Why should you never call `Table.Buffer` inside a custom function invoked across 50,000 rows?",
    shortAnswer: "Because it instantiates 50,000 separate in-memory buffer allocations, instantly exhausting system RAM and freezing the computer.",
    explanation: "Buffers must always be scoped once in the outer query before invoking functions.",
    hint: "Buffer once in the outer scope, never inside row-by-row function loops.",
    level: "expert",
    codeExample: "Buffer in outer query → Pass reference to function"
  },
  {
    question: "How does `List.Contains` perform against a `List.Buffer` vs an unbuffered table column?",
    shortAnswer: "Against a `List.Buffer`, `List.Contains` evaluates in nanoseconds using fast in-memory lookups; on unbuffered streams, it may re-evaluate the generator on every row.",
    explanation: "In-memory list caching accelerates membership testing by orders of magnitude.",
    hint: "List.Buffer caches key vectors in RAM for instant membership checks.",
    level: "moderate",
    codeExample: "ValidCodes = List.Buffer(DimBranches[BranchCode]), #\"Filtered\" = Table.SelectRows(Sales, each List.Contains(ValidCodes, [BranchCode]))"
  },
  {
    question: "What is the recommended design pattern for archiving deprecated queries?",
    shortAnswer: "Move them into a `99_Deprecated_Archive` group, uncheck 'Enable Load', add a header comment with the retirement date, and re-point dependent models to the new pipeline.",
    explanation: "Graceful query lifecycle management without breaking production dependencies.",
    hint: "Archive in a `99_Deprecated` folder with disabled load and retirement notices.",
    level: "basic",
    codeExample: "99_Deprecated_Queries → stg_OldPipeline_Retire2026 (Enable Load: False)"
  },
  {
    question: "How do you verify data reconciliation between consolidated totals and individual branch reports?",
    shortAnswer: "Group the consolidated fact table by `BranchCode` using `Table.Group` and verify that the sum of amounts matches the source batch hash totals.",
    explanation: "Automated financial integrity and reconciliation audit.",
    hint: "Group consolidated table by branch to ensure sum matches source batch totals.",
    level: "advanced",
    codeExample: "Table.Group(Fact_Consolidated, {\"BranchCode\"}, {{\"TotalGross\", each List.Sum([GrossTotal])}})"
  },
  {
    question: "How do you export an enterprise Power Query pipeline as a reusable Power BI Template (.pbit)?",
    shortAnswer: "Navigate to `File → Export → Power BI Template (.pbit)`; users will be prompted for connection parameters when opening the template.",
    explanation: "Package enterprise ETL architectures for multi-client deployment.",
    hint: "Export as .pbit with parameterized connection prompts.",
    level: "moderate",
    codeExample: "File → Export → Power BI Template (.pbit)"
  },
  {
    question: "What is the ultimate golden rule of an Enterprise Power Query Architect?",
    shortAnswer: "Fold early, transform late, buffer selectively, quarantine errors gracefully, organize logically, and automate completely.",
    explanation: "The core architectural philosophy of advanced Power Query data engineering.",
    hint: "Fold early, buffer selectively, quarantine gracefully, and automate completely.",
    level: "basic",
    codeExample: "Architect Formula = Fold Early + Buffer Small + Quarantine Errors + Clean Groups"
  }
];

export default questions;
