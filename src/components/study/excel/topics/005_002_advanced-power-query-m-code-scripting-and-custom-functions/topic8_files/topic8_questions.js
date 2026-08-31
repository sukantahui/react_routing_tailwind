// topic8_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 8
// Topic: Error handling in M: try...otherwise constructs and step-level validation
// Module: 005_002_advanced-power-query-m-code-scripting-and-custom-functions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "How does the `try...otherwise` construct work in the Power Query M language?",
    shortAnswer: "It attempts to evaluate an expression; if an error occurs during evaluation, it gracefully falls back to a default value specified after `otherwise`.",
    explanation: "Provides scalar fallback value when an expression throws a runtime error.",
    hint: "try <expression> otherwise <default_value>.",
    level: "basic",
    codeExample: "CleanAmount = try Number.FromText([RawText]) otherwise 0"
  },
  {
    question: "What does the `try` expression return when used without the `otherwise` clause?",
    shortAnswer: "It returns an error evaluation record containing two fields: `HasError` (logical true/false) and either `Value` (if successful) or `Error` (a record describing the error details).",
    explanation: "Returns [HasError = logical, Value = any, Error = record].",
    hint: "Returns a structured record with HasError and Value/Error fields.",
    level: "moderate",
    codeExample: "ResultRecord = try (10 / [Divisor])"
  },
  {
    question: "What sub-fields are present inside the `[Error]` record when `try` intercepts an exception?",
    shortAnswer: "The record contains `Reason` (text identifier like 'DataFormat.Error'), `Message` (human-readable error description), `Detail` (additional contextual payload), and `Message.Format`.",
    explanation: "Standard fields of the M Error record.",
    hint: "Reason, Message, Detail, Message.Format.",
    level: "moderate",
    codeExample: "ErrorReason = (try [Col])[Error][Reason]"
  },
  {
    question: "How does `Table.ReplaceErrorValues` handle errors across an entire table column?",
    shortAnswer: "It replaces all cell-level errors in specified columns with a predefined replacement value without failing the query.",
    explanation: "Column-level bulk error replacement.",
    hint: "Table.ReplaceErrorValues(table, {{\"ColumnName\", ReplacementValue}}).",
    level: "basic",
    codeExample: "Table.ReplaceErrorValues(Source, {{\"SalesAmount\", 0}, {\"Discount\", 0.0}})"
  },
  {
    question: "What is the difference between `Table.SelectRowsWithErrors` and `Table.RemoveRowsWithErrors`?",
    shortAnswer: "`Table.SelectRowsWithErrors` filters the table to keep ONLY rows containing errors (for auditing), while `Table.RemoveRowsWithErrors` strips out all erroneous rows.",
    explanation: "Audit isolation vs data sanitization.",
    hint: "Select keeps error rows for triage; Remove discards them for clean ingestion.",
    level: "moderate",
    codeExample: "AuditErrorsTable = Table.SelectRowsWithErrors(Source, {\"TaxID\", \"Amount\"})"
  },
  {
    question: "How can you raise a custom error in M using the `error` keyword?",
    shortAnswer: "By writing `error \"Custom Error Message\"` or `error Error.Record(\"ReasonText\", \"Detailed message\", DetailValue)`.",
    explanation: "Throws a structured exception in M.",
    hint: "error \"message\" or error Error.Record(...).",
    level: "advanced",
    codeExample: "if [Age] < 0 then error \"Invalid age: negative value not permitted\" else [Age]"
  },
  {
    question: "Why is swallowing errors blindly with `otherwise null` considered dangerous in financial modeling?",
    shortAnswer: "Because it masks upstream schema changes, corrupted currency symbols, or network failures, silently turning critical missing revenue into zero or null without warning.",
    explanation: "Silent data corruption vs explicit fail-fast validation.",
    hint: "Silent fallbacks obscure real bugs and corrupt downstream totals.",
    level: "moderate",
    codeExample: "Risky: try [Revenue] otherwise 0"
  },
  {
    question: "How do you implement an audit column that logs both parsed data and error reasons side-by-side?",
    shortAnswer: "Add a custom column using `try ...`, then expand `[HasError]`, `[Value]`, and `[Error][Message]` into separate dedicated audit columns.",
    explanation: "Non-destructive error triage column generation.",
    hint: "Add column with `try ...` and extract Error[Message].",
    level: "advanced",
    codeExample: "Table.AddColumn(Source, \"ParseAttempt\", each try Date.FromText([RawDate]))"
  },
  {
    question: "What function creates a standardized structured error record in M?",
    shortAnswer: "`Error.Record(reason, message, detail)`.",
    explanation: "Factory constructor for M Error records.",
    hint: "Error.Record(reason, message, detail).",
    level: "advanced",
    codeExample: "Error.Record(\"Validation.OutdatedSchema\", \"Missing expected GST column\", [Col=\"GSTIN\"])"
  },
  {
    question: "How does step-level assertion testing work in M pipelines?",
    shortAnswer: "By asserting conditions (e.g. `Table.RowCount(Step) > 0`) and raising an explicit `error` if the assertion fails before proceeding to downstream steps.",
    explanation: "Pipeline gatekeeping and contract enforcement.",
    hint: "if Table.RowCount(Source) = 0 then error \"Empty File\" else Source.",
    level: "expert",
    codeExample: "AssertDataNotEmpty = if Table.RowCount(Source) = 0 then error \"Ingestion Failed: Source dataset is empty\" else Source"
  },
  {
    question: "What is `Expression.Error` in Power Query?",
    shortAnswer: "A generic error thrown when M encounters syntax violations, undefined variable identifiers, or invalid operator types.",
    explanation: "Standard runtime exception classification.",
    hint: "Threw when evaluating an illegal expression.",
    level: "basic",
    codeExample: "Expression.Error: The name 'Sourc' wasn't recognized."
  },
  {
    question: "What is `DataFormat.Error` in Power Query?",
    shortAnswer: "An error thrown when text cannot be converted into the requested target data type (e.g. parsing \"ABC\" into a numeric type).",
    explanation: "Type conversion failure.",
    hint: "Occurs during invalid type casting.",
    level: "basic",
    codeExample: "DataFormat.Error: We couldn't convert to Number."
  },
  {
    question: "How do you handle division by zero safely in M calculations?",
    shortAnswer: "Use conditional logic `if [Units] = 0 or [Units] = null then 0 else [TotalCost] / [Units]` or wrap the division in `try ([TotalCost] / [Units]) otherwise 0`.",
    explanation: "Safe arithmetic division.",
    hint: "Check denominator for zero or null before dividing.",
    level: "basic",
    codeExample: "UnitCost = if [Qty] = null or [Qty] = 0 then null else [Amount] / [Qty]"
  },
  {
    question: "How can you validate that all required column headers exist in an ingested table before applying transformations?",
    shortAnswer: "Compare the required columns list with `Table.ColumnNames(Source)` using `List.Difference`; if differences exist, throw a custom schema error.",
    explanation: "Schema drift detection and validation.",
    hint: "List.Difference(RequiredCols, Table.ColumnNames(Source)).",
    level: "expert",
    codeExample: "MissingCols = List.Difference({\"ID\", \"Amount\", \"Date\"}, Table.ColumnNames(Source)), Check = if not List.IsEmpty(MissingCols) then error Error.Record(\"Schema.MissingColumns\", \"Missing headers\", MissingCols) else Source"
  },
  {
    question: "How does `try` interact with lazy evaluation in Power Query?",
    shortAnswer: "`try` forces immediate evaluation of the wrapped expression to determine whether it succeeds or fails, resolving deferred execution locally.",
    explanation: "Forces scalar evaluation to catch runtime exceptions.",
    hint: "Evaluates the expression eagerly to populate the result record.",
    level: "advanced",
    codeExample: "EvalResult = try Source[SalesAmount]{0}"
  },
  {
    question: "What happens if a custom function throws an uncaught error inside `Table.AddColumn`?",
    shortAnswer: "The specific cell in that row contains a cell-level error; the query continues to load unless that column is subsequently aggregated or sorted, at which point the entire query fails.",
    explanation: "Cell-level vs step-level error propagation.",
    hint: "Cell shows Error; full query fails only on strict aggregation.",
    level: "moderate",
    codeExample: "Table.AddColumn(Source, \"Bonus\", each fxCalculateBonus([Rating]))"
  },
  {
    question: "How do you sanitize null and blank text strings before applying text manipulation functions?",
    shortAnswer: "Use `Coalesce` logic: `Text.Trim(if [RawText] = null then \"\" else [RawText])` or `Text.Trim([RawText] ?? \"\")` in modern M syntax.",
    explanation: "Null coalescing operator (??) in modern M.",
    hint: "Use null coalescing operator `??` or explicit IF check.",
    level: "moderate",
    codeExample: "CleanText = Text.Trim([Comments] ?? \"\")"
  },
  {
    question: "How do you trap network timeout errors in `Web.Contents`?",
    shortAnswer: "Use `ManualStatusHandling` or wrap the `Web.Contents` call in a `try...otherwise` block that returns a cached offline table on connection failure.",
    explanation: "Resilient fallback for network ETL pipelines.",
    hint: "try Web.Contents(...) otherwise FallbackLocalCache.",
    level: "advanced",
    codeExample: "LiveFeed = try Json.Document(Web.Contents(\"https://api.site.com/data\")) otherwise LocalBackup"
  },
  {
    question: "How can you count the total number of rows with errors in a specific column?",
    shortAnswer: "Use `Table.RowCount(Table.SelectRowsWithErrors(Source, {\"TargetColumn\"}))`.",
    explanation: "Quantifies data quality defect rates.",
    hint: "Table.RowCount on Table.SelectRowsWithErrors.",
    level: "moderate",
    codeExample: "ErrorCount = Table.RowCount(Table.SelectRowsWithErrors(Source, {\"InvoiceAmt\"}))"
  },
  {
    question: "What is the role of `Diagnostics.Trace` in debugging and logging M errors?",
    shortAnswer: "It writes custom debug messages and timing metrics to the Power Query diagnostic trace log file when enabled in Power BI / Excel settings.",
    explanation: "Enterprise ETL logging and profiling.",
    hint: "Outputs trace events for developer diagnosis.",
    level: "expert",
    codeExample: "Diagnostics.Trace(TraceLevel.Information, \"Starting Ingestion Step\", () => Source, true)"
  },
  {
    question: "How do you handle invalid date strings (like \"31-02-2026\" or \"99/99/9999\") during ETL conversion?",
    shortAnswer: "Wrap `Date.FromText([RawDate], [Format=\"dd-MM-yyyy\"]` in `try...otherwise #date(1900, 1, 1)` or create an audit flag column indicating invalid date syntax.",
    explanation: "Defensive date serial parsing.",
    hint: "try Date.FromText(...) otherwise null.",
    level: "moderate",
    codeExample: "SafeDate = try Date.FromText([DateStr], \"en-GB\") otherwise null"
  },
  {
    question: "Can an M function return an error record as a valid output without breaking downstream queries?",
    shortAnswer: "Yes; by returning the record produced by `try` (e.g. `[HasError = true, ...]` as standard data), downstream steps can inspect and filter it as ordinary tabular records.",
    explanation: "Treating errors as first-class data objects.",
    hint: "Return the try record directly as a column value.",
    level: "advanced",
    codeExample: "fxSafeParser = (val) => try Number.FromText(val)"
  },
  {
    question: "How do you implement a retry mechanism in M for transient API errors?",
    shortAnswer: "Build a recursive function or `List.Generate` loop that checks `try Web.Contents(...)`; if `HasError = true` and retry count < 3, it waits and retries the request.",
    explanation: "Resilient automated retry loop in functional M.",
    hint: "Iterate with retry counter until HasError is false or max retries reached.",
    level: "expert",
    codeExample: "fxRetry = (url, count) => let res = try Web.Contents(url) in if res[HasError] and count < 3 then fxRetry(url, count + 1) else res[Value]"
  },
  {
    question: "What is the impact of cell errors on Query Folding when querying SQL databases?",
    shortAnswer: "Client-side error handling constructs (like `try...otherwise`) cannot be folded into native SQL `TRY_CONVERT` expressions in older connectors, breaking query folding at that step.",
    explanation: "Query folding limitation with client-side M error primitives.",
    hint: "Pushes evaluation to local client memory, breaking SQL delegation.",
    level: "expert",
    codeExample: "try [SQL_Col] → breaks folding; use SQL CAST in native query if possible."
  },
  {
    question: "How can you validate that numeric columns do not contain negative values in accounting pipelines?",
    shortAnswer: "Add a validation column: `if [DebitAmount] < 0 then error Error.Record(\"Accounting.NegativeDebit\", \"Debit cannot be negative\", [RowID = [TransID]]) else [DebitAmount]`.",
    explanation: "Domain-specific financial integrity validation.",
    hint: "Throw custom error on negative debit or credit amounts.",
    level: "moderate",
    codeExample: "ValidatedDebit = if [Debit] < 0 then error \"Negative debit detected\" else [Debit]"
  },
  {
    question: "How do you test error handling logic during unit testing in Power Query?",
    shortAnswer: "Create synthetic mock tables containing deliberate anomalies (nulls, text strings in number columns, malformed dates) and verify that the output matches expected sanitized values.",
    explanation: "Unit testing ETL pipelines with edge cases.",
    hint: "Feed deliberate edge cases and verify fallback behavior.",
    level: "moderate",
    codeExample: "MockTable = #table({\"Amt\"}, {{\"100\"}, {\"INVALID\"}, {null}})"
  },
  {
    question: "How does `Table.HasError` (if available via custom logic) help in pipeline branching?",
    shortAnswer: "By checking if any row contains errors, the query can conditionally branch to send an alert notification or route flawed records to a quarantine database.",
    explanation: "Data pipeline gatekeeping and automated quarantine routing.",
    hint: "Branch pipeline based on whether error count > 0.",
    level: "advanced",
    codeExample: "HasErrors = Table.RowCount(Table.SelectRowsWithErrors(Source)) > 0"
  },
  {
    question: "What is the difference between an Error and a Null in Power Query?",
    shortAnswer: "`null` represents the valid absence of a value, while an `error` represents a failure in computation, syntax, or data type casting that halts evaluation unless explicitly trapped.",
    explanation: "Missing data state vs computational exception.",
    hint: "Null is valid missing data; Error is an exception that stops execution.",
    level: "basic",
    codeExample: "Null: [Val] = null | Error: [Val] = 10 / 0"
  },
  {
    question: "How do you replace errors in multiple columns simultaneously with different default values?",
    shortAnswer: "Pass a list of column-replacement pairs to `Table.ReplaceErrorValues`: `Table.ReplaceErrorValues(Source, {{\"ColA\", 0}, {\"ColB\", \"Unknown\"}, {\"ColC\", #date(2026,1,1)}})`.",
    explanation: "Multi-column error replacement with heterogeneous defaults.",
    hint: "Pass list of pairs `{{\"Col1\", Def1}, {\"Col2\", Def2}}`.",
    level: "moderate",
    codeExample: "Table.ReplaceErrorValues(Source, {{\"Amount\", 0}, {\"City\", \"Barrackpore\"}})"
  },
  {
    question: "What is the golden rule of enterprise Power Query error handling?",
    shortAnswer: "Always isolate and log errors in dedicated audit queries rather than silently suppressing them, ensuring total data traceability and compliance with corporate auditing standards.",
    explanation: "Auditability and data governance best practice.",
    hint: "Isolate and audit defects; never hide them silently.",
    level: "basic",
    codeExample: "QuarantineQuery = Table.SelectRowsWithErrors(RawSource)"
  }
];

export default questions;
