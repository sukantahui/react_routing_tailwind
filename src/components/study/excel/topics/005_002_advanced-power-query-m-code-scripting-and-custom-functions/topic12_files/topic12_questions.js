// topic12_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 12
// Topic: Real-world project: Building an automated multi-branch daily sales consolidation pipeline
// Module: 005_002_advanced-power-query-m-code-scripting-and-custom-functions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is the primary architectural goal of the Multi-Branch Daily Sales Consolidation Pipeline?",
    shortAnswer: "To automatically ingest, schema-validate, normalize, and consolidate disparate daily sales files across regional branch locations (Barrackpore, Shyamnagar, Ichapur, Naihati) into a unified, audit-ready enterprise data model.",
    explanation: "End-to-end automated enterprise ETL pipeline with schema resilience and quarantine routing.",
    hint: "Consolidates multi-branch sales data automatically while isolating schema deviations.",
    level: "basic",
    codeExample: "Folder.Files(pBranchDropFolder) → Schema Validation → Fact_ConsolidatedSales"
  },
  {
    question: "Why should you use parameter-driven folder paths in a multi-branch consolidation pipeline?",
    shortAnswer: "Parameters like `pSalesDropPath` decouple file system locations from ETL logic, allowing seamless environment migration from local testing directories to SharePoint/OneDrive enterprise locations.",
    explanation: "Eliminates hardcoded file paths and simplifies deployment.",
    hint: "Decouples physical folder paths from transformation code.",
    level: "basic",
    codeExample: "Source = Folder.Files(pSalesDropPath)"
  },
  {
    question: "How do you filter for valid active branch daily sales files while ignoring temporary Excel lock files?",
    shortAnswer: "Apply `Table.SelectRows` filtering for `[Extension] = \".xlsx\"` and `not Text.StartsWith([Name], \"~$\")` immediately after reading `Folder.Files`.",
    explanation: "Prevents pipeline crashes caused by hidden temporary Excel lock files (~$file.xlsx).",
    hint: "Filter out files starting with `~$` and keep only `.xlsx` extensions.",
    level: "moderate",
    codeExample: "Table.SelectRows(Source, each [Extension] = \".xlsx\" and not Text.StartsWith([Name], \"~$\"))"
  },
  {
    question: "How is `Binary.Buffer` utilized in multi-branch file ingestion?",
    shortAnswer: "Buffering the raw binary byte stream of each workbook with `Binary.Buffer([Content])` prevents re-reading large files across network drives during sheet schema inspection.",
    explanation: "Caches raw file streams in memory to optimize I/O performance.",
    hint: "Caches file binaries in RAM so multiple sheet operations don't re-read from disk.",
    level: "moderate",
    codeExample: "BufferedContent = Binary.Buffer([Content])"
  },
  {
    question: "What is the role of a Custom Ingestion Function (e.g. `fxIngestBranchSheet`) in the pipeline?",
    shortAnswer: "It encapsulates file opening, sheet selection, header promotion, and data type coercion into a standardized, reusable transformation block invoked across all branch files via `Table.AddColumn`.",
    explanation: "Enforces identical schema transformations across every branch file.",
    hint: "Applies a uniform cleansing and typing function to each file binary.",
    level: "moderate",
    codeExample: "Table.AddColumn(FileList, \"ParsedData\", each fxIngestBranchSheet([Content], [Name]))"
  },
  {
    question: "How does the pipeline dynamically extract Branch Name and Date from file names?",
    shortAnswer: "Using text parsing functions (`Text.BeforeDelimiter`, `Text.BetweenDelimiters`, `Date.FromText`) on the file name (e.g. `\"Sales_Barrackpore_2026-08-25.xlsx\"`).",
    explanation: "Derives dimensional attributes directly from standardized file naming conventions.",
    hint: "Extracts metadata directly from standardized file names using Text delimiter functions.",
    level: "moderate",
    codeExample: "Branch = Text.BetweenDelimiters([Name], \"Sales_\", \"_\"), TxDate = Date.FromText(Text.BetweenDelimiters([Name], \"_\", \".xlsx\"))"
  },
  {
    question: "How does the pipeline handle unexpected missing columns or schema drift across branch files?",
    shortAnswer: "By implementing `Table.SelectColumns(Source, ExpectedColumns, MissingField.UseNull)`, missing fields are safely populated with nulls instead of terminating the pipeline with a fatal error.",
    explanation: "Guarantees schema resilience against varying column configurations across branches.",
    hint: "Use `MissingField.UseNull` inside `Table.SelectColumns` to safely inject nulls for missing fields.",
    level: "advanced",
    codeExample: "Table.SelectColumns(TableData, {\"InvoiceID\", \"Date\", \"Amount\", \"TaxRate\"}, MissingField.UseNull)"
  },
  {
    question: "What is the Dual-Stream Quarantine Architecture implemented in this capstone project?",
    shortAnswer: "The pipeline splits into two distinct query streams: (1) `Fact_ConsolidatedSales` containing 100% clean, validated transactions, and (2) `Audit_QuarantineLog` capturing malformed, unparseable, or duplicate rows.",
    explanation: "Preserves clean reporting models while providing full audit trails for corrective operational action.",
    hint: "Routes valid rows to production Fact and defective rows to an Audit quarantine log.",
    level: "advanced",
    codeExample: "CleanStream = Table.SelectRows(All, each [HasError]=false) | Quarantine = Table.SelectRows(All, each [HasError]=true)"
  },
  {
    question: "How are currency conversions and GST tax calculations standardized across all branches?",
    shortAnswer: "By merging a buffered `Dim_TaxRates` and `Dim_CurrencyRates` table, calculating statutory CGST/SGST/IGST breakdown and net INR revenue in structured custom columns.",
    explanation: "Enforces central accounting and taxation rules during data consolidation.",
    hint: "Merges buffered tax and FX dimension tables to compute standardized GST and INR amounts.",
    level: "moderate",
    codeExample: "CGST = [TaxableValue] * ([Rate] / 2), SGST = [TaxableValue] * ([Rate] / 2)"
  },
  {
    question: "Why should duplicate transactions be flagged rather than silently deleted in corporate pipelines?",
    shortAnswer: "Silent deletion conceals potential point-of-sale software bugs or double billing fraud; routing duplicate records to the quarantine log enables management investigation.",
    explanation: "Maintains financial audit compliance and internal controls.",
    hint: "Quarantining duplicate transactions preserves audit evidence for accounting teams.",
    level: "advanced",
    codeExample: "DuplicateFlags = Table.AddColumn(Merged, \"IsDuplicate\", each Table.RowCount(...) > 1)"
  },
  {
    question: "How does `Table.Combine` consolidate multiple transformed branch tables?",
    shortAnswer: "`Table.Combine(ListOfTables)` appends all individual table objects in a list into a single unified table, aligning columns by exact name.",
    explanation: "High-speed M table union operation.",
    hint: "Appends all tables in a list into a single combined master table.",
    level: "basic",
    codeExample: "Consolidated = Table.Combine(ProcessedBranchFiles[ParsedData])"
  },
  {
    question: "How do you ensure numeric values with varying currency symbols (e.g. \"Rs. 5,000\", \"$120.00\") are cleansed uniformly?",
    shortAnswer: "Use `Text.Select([AmountRaw], {\"0\"..\"9\", \".\", \"-\"})` followed by `Number.FromText` to extract clean decimal values regardless of currency symbols.",
    explanation: "Character whitelist sanitization pattern for dirty financial strings.",
    hint: "Use `Text.Select` with digit whitelists to strip non-numeric currency symbols.",
    level: "moderate",
    codeExample: "Number.FromText(Text.Select([RawAmt], {\"0\"..\"9\", \".\", \"-\"}))"
  },
  {
    question: "How is incremental data ingestion supported in folder consolidation pipelines?",
    shortAnswer: "By filtering file metadata by `[Date modified] >= pCutoffDate` or tracking processed file IDs in an incremental state table.",
    explanation: "Prevents reprocessing historical archive files during daily scheduled refreshes.",
    hint: "Filter folder files by `[Date modified]` to ingest only new or updated files.",
    level: "advanced",
    codeExample: "Table.SelectRows(Source, each [Date modified] >= DateTime.From(pRefreshCutoff))"
  },
  {
    question: "Why should staging queries in this project have 'Enable Load' turned off?",
    shortAnswer: "Intermediate staging queries (`stg_Barrackpore_Raw`, `stg_FileInventory`) exist only to feed the consolidation pipeline; turning off Enable Load keeps the data model lean and clean.",
    explanation: "Prevents memory bloat and reporting visual canvas clutter.",
    hint: "Staging queries process data in RAM without loading to the final reporting model.",
    level: "basic",
    codeExample: "stg_BranchFiles (Enable Load: False) → Fact_ConsolidatedSales (Enable Load: True)"
  },
  {
    question: "How do you validate that every branch has submitted their daily sales file on time?",
    shortAnswer: "Create an `Audit_MissingBranchAlert` query that performs a full anti-join between `Dim_Branches` and the day's ingested branch list, outputting any missing branch names.",
    explanation: "Proactive automated compliance monitoring for corporate operations.",
    hint: "Perform an anti-join between Master Branch List and Ingested Files to find missing branches.",
    level: "advanced",
    codeExample: "MissingBranches = Table.NestedJoin(Dim_Branches, {\"BranchCode\"}, IngestedBranches, {\"BranchCode\"}, \"Join\", JoinKind.LeftAnti)"
  },
  {
    question: "What is the benefit of organizing the project into 6 standard query groups?",
    shortAnswer: "It categorizes 20+ queries into logical layers (Parameters, Functions, Staging, Dimensions, Facts, Audits), making the entire pipeline intuitive to audit and maintain.",
    explanation: "Enterprise codebase organization and operational clarity.",
    hint: "Numbered folders establish clear separation of concerns across the ETL pipeline.",
    level: "basic",
    codeExample: "01_Parameters, 02_Functions, 03_Staging, 04_Dimensions, 05_Facts, 06_Audits"
  },
  {
    question: "How do you verify date format consistency when branches use different regional formats (DD/MM/YYYY vs MM/DD/YYYY)?",
    shortAnswer: "Explicitly specify the regional culture inside `Date.FromText([DateRaw], \"en-IN\")` or `Date.FromText([DateRaw], \"en-US\")` depending on branch origin.",
    explanation: "Eliminates date ambiguity and month/day swapping errors.",
    hint: "Pass the regional culture code (e.g. `\"en-IN\"`) to `Date.FromText`.",
    level: "moderate",
    codeExample: "Date.FromText([DateStr], [Format=\"dd/MM/yyyy\", Culture=\"en-IN\"])"
  },
  {
    question: "What happens if a branch file is completely empty (0 rows of data)?",
    shortAnswer: "A robust custom function checks `Table.IsEmpty(Source)` and returns a 0-row typed schema skeleton rather than throwing an unhandled indexing error.",
    explanation: "Zero-row edge case handling in ingestion functions.",
    hint: "Check `Table.IsEmpty` and return an empty typed schema template.",
    level: "advanced",
    codeExample: "if Table.IsEmpty(RawData) then EmptyTypedTableTemplate else ProcessData(RawData)"
  },
  {
    question: "How do you attach custom UI documentation to the custom branch ingestion function?",
    shortAnswer: "Using `Value.ReplaceType` with `meta [Documentation.Name=\"fxIngestBranchSheet\", ...]` to provide field descriptions for junior developers.",
    explanation: "Self-documenting custom functions in enterprise workbooks.",
    hint: "Decorate the function with `Value.ReplaceType` and `meta [Documentation.*]`.",
    level: "moderate",
    codeExample: "fxDocumented = Value.ReplaceType(fxIngest, type function (...) meta [...])"
  },
  {
    question: "How do you benchmark pipeline execution time in Power BI Desktop?",
    shortAnswer: "Enable Power Query Diagnostics (`Tools → Start Diagnostics`), refresh the consolidation pipeline, and analyze `Exclusive Duration` and `Memory (KB)` in the generated diagnostics table.",
    explanation: "Empirical performance profiling of enterprise ETL queries.",
    hint: "Use Query Diagnostics to measure duration and memory consumption per step.",
    level: "moderate",
    codeExample: "Tools → Start Diagnostics → Refresh Pipeline → Stop Diagnostics"
  },
  {
    question: "How does `Table.AddIndexColumn` help in maintaining global transaction lineage?",
    shortAnswer: "Adding a deterministic composite index `GlobalTxID = [BranchCode] & \"-\" & Text.From([RowIndex])` establishes a unique, traceable primary key across all branches.",
    explanation: "Generates surrogate keys for consolidated multi-source datasets.",
    hint: "Creates a unique surrogate key combining branch code and row sequence.",
    level: "moderate",
    codeExample: "Table.AddColumn(Combined, \"GlobalID\", each [BranchCode] & \"-\" & Text.PadStart(Text.From([Index]), 6, \"0\"))"
  },
  {
    question: "Why is `Table.Buffer` applied to the master product catalog before consolidating 100k daily transactions?",
    shortAnswer: "Buffering `Dim_ProductCatalog` in memory ensures that SKU category and tax rate lookups evaluate in O(1) time without repeated re-queries.",
    explanation: "Eliminates computational bottlenecks during master data enrichment.",
    hint: "Buffers the product catalog in RAM to speed up row-by-row SKU lookups.",
    level: "moderate",
    codeExample: "BufferedProducts = Table.Buffer(Dim_ProductCatalog)"
  },
  {
    question: "How do you handle branch files with shifted headers (e.g. title banners in rows 1–3)?",
    shortAnswer: "Use `Table.Skip(Source, 3)` or dynamically find the header row by searching for `[Column1] = \"InvoiceID\"` using `Table.SelectRows` or custom M logic before promoting headers.",
    explanation: "Dynamic header detection for inconsistent worksheet layouts.",
    hint: "Skip banner rows dynamically until the row containing column header names is reached.",
    level: "advanced",
    codeExample: "Table.PromoteHeaders(Table.Skip(RawSheet, 3), [PromoteAllScalars=true])"
  },
  {
    question: "What is the recommended refresh schedule for a multi-branch consolidation pipeline?",
    shortAnswer: "Automated daily scheduled refresh via Power BI Gateway at 04:00 AM IST after all regional branches have completed their end-of-day file uploads.",
    explanation: "Aligns automated cloud refresh with business operating cycles.",
    hint: "Schedule automated refresh early morning after all branch closing uploads complete.",
    level: "basic",
    codeExample: "Power BI Gateway Scheduled Refresh: Daily @ 04:00 AM IST"
  },
  {
    question: "How does the pipeline prevent data loss if a branch file is corrupted or unreadable?",
    shortAnswer: "The file ingestion loop wraps binary extraction in a `try...otherwise` block; corrupted files return an error record logged into `Audit_QuarantineLog` while the remaining branches proceed uninterrupted.",
    explanation: "Non-blocking fault-tolerant pipeline architecture.",
    hint: "Wraps file reading in `try...otherwise` so bad files don't crash the entire pipeline.",
    level: "expert",
    codeExample: "try fxIngestBranchSheet([Content]) otherwise [Status=\"Corrupted File\", FileName=[Name]]"
  },
  {
    question: "How do you verify data reconciliation between consolidated totals and individual branch reports?",
    shortAnswer: "Build an `Audit_ReconciliationSummary` query that groups the consolidated fact table by `BranchCode` and compares totals against source file row counts and batch hash totals.",
    explanation: "Automated financial integrity and reconciliation check.",
    hint: "Group consolidated table by branch to verify that sum of amounts matches source totals.",
    level: "advanced",
    codeExample: "Table.Group(Fact_Consolidated, {\"BranchCode\"}, {{\"ConsolidatedTotal\", each List.Sum([Amount])}})"
  },
  {
    question: "What is the purpose of adding a `#\"PipelineRunTimestamp\"` metadata column?",
    shortAnswer: "It stamps every consolidated record with the exact `DateTime.LocalNow()` execution time, ensuring complete temporal traceability during statutory tax audits.",
    explanation: "Audit metadata stamping for enterprise data governance.",
    hint: "Appends execution timestamp to track exactly when each record was ingested.",
    level: "basic",
    codeExample: "Table.AddColumn(FinalTable, \"IngestionTimestamp\", each DateTime.LocalNow(), type datetime)"
  },
  {
    question: "How can this Power Query pipeline be converted into a reusable Power BI Template (.pbit)?",
    shortAnswer: "Export the model as a `.pbit` file; upon opening, users are prompted for parameters (`pSalesDropPath`, `pFiscalYear`), generating the entire pipeline instantly for any client.",
    explanation: "Rapid deployment and institutional reusability.",
    hint: "File → Export → Power BI Template (.pbit) with parameterized configuration prompts.",
    level: "moderate",
    codeExample: "File → Export → Power BI Template (.pbit)"
  },
  {
    question: "What are the key KPIs tracked in the final executive dashboard powered by this pipeline?",
    shortAnswer: "Total Consolidated Revenue (INR), Branch Sales Distribution, GST Tax Liability (CGST/SGST/IGST), Quarantine Anomaly Rate, and Daily On-Time Branch Submission Rate.",
    explanation: "Executive business intelligence metrics driven by clean consolidated data.",
    hint: "Consolidated Revenue, Branch Distribution, GST Liability, and Data Quality KPIs.",
    level: "basic",
    codeExample: "DAX Measures: Total Revenue, Total GST, Anomaly Rate %, Submission Compliance %"
  },
  {
    question: "What is the ultimate takeaway from completing this real-world consolidation capstone project?",
    shortAnswer: "Enterprise ETL is not just about appending spreadsheets; it is about engineering resilient, self-healing, parameterized, and audit-compliant data pipelines that power mission-critical corporate decisions.",
    explanation: "Capstone synthesis of advanced Power Query M engineering.",
    hint: "Resilient, self-healing, parameterized, and audit-compliant data engineering.",
    level: "basic",
    codeExample: "Professional Engineering = Resilience + Automation + Quarantine Auditing + Speed"
  }
];

export default questions;
