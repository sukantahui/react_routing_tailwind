// topic10_questions.js - 30 Comprehensive Practice & Viva Voce Questions for Topic 10
// Topic: Optimizing Power Query performance: Buffering tables (Table.Buffer), reducing memory footprint
// Module: 005_002_advanced-power-query-m-code-scripting-and-custom-functions
// Lead Academic Mentor: Sukanta Hui (Coder & AccoTax)

const questions = [
  {
    question: "What is `Table.Buffer` and what is its primary purpose in Power Query?",
    shortAnswer: "`Table.Buffer` caches an entire table into local client memory (RAM), preventing the Power Query engine from re-evaluating or re-fetching the underlying data stream multiple times during subsequent joins or row-by-row lookups.",
    explanation: "Forces immediate in-memory caching to eliminate redundant stream re-evaluations.",
    hint: "Loads the table into RAM cache to stop repeated recalculation.",
    level: "basic",
    codeExample: "BufferedDim = Table.Buffer(Source)"
  },
  {
    question: "Why does Power Query re-evaluate upstream steps multiple times by default?",
    shortAnswer: "Because M uses lazy, streaming evaluation; without buffering, each reference to a table in a custom function or loop streams the entire upstream source from scratch.",
    explanation: "Lazy streaming evaluates expressions on-demand for every consumer.",
    hint: "Lazy evaluation causes every downstream step to re-request source data.",
    level: "moderate",
    codeExample: "Table.AddColumn(Fact, \"Category\", each Table.SelectRows(Dim, ...)) → O(N*M) re-evaluations!"
  },
  {
    question: "When is buffering a Dimension table before a Merge/Join most beneficial?",
    shortAnswer: "When joining a large Fact table to a small-to-medium Dimension table or performing row-by-row lookups inside `Table.AddColumn`, buffering the Dimension table reduces time complexity from O(N*M) to O(N).",
    explanation: "Converts repeated disk/network scans into instant RAM lookups.",
    hint: "Buffer the smaller dimension table so lookups execute in memory.",
    level: "moderate",
    codeExample: "BufferedRates = Table.Buffer(ExchangeRates), #\"Added FX\" = Table.AddColumn(Sales, \"INR\", each [Amt] * BufferedRates{[Cur=[Cur]]}[Rate])"
  },
  {
    question: "What is `List.Buffer` and how does it differ from `Table.Buffer`?",
    shortAnswer: "`List.Buffer` loads a single 1D List into memory, which is faster and consumes far less RAM than buffering a multi-column table when only a single key column or lookup vector is needed.",
    explanation: "Specialized in-memory caching for scalar lists and deduplicated keys.",
    hint: "Buffers a single list instead of a full multi-column table.",
    level: "basic",
    codeExample: "BufferedKeyList = List.Buffer(DimCustomer[CustomerID])"
  },
  {
    question: "Why should you NEVER apply `Table.Buffer` to large multi-million-row Fact tables?",
    shortAnswer: "Because buffering forces the entire multi-gigabyte dataset into system RAM, causing high memory pressure, paging to disk, potential 'Out of Memory' crashes, and permanently breaking Query Folding.",
    explanation: "Overwhelms client memory and destroys database pushdown optimization.",
    hint: "Buffering huge tables exhausts RAM and prevents server-side query folding.",
    level: "advanced",
    codeExample: "Avoid: Table.Buffer(FactSales_10MillionRows)"
  },
  {
    question: "How does `Table.Buffer` affect sort order retention in Power Query?",
    shortAnswer: "Standard `Table.Sort` is lazy and can be discarded by downstream grouping or joining; wrapping the sort in `Table.Buffer(Table.Sort(...))` locks the explicit sort order in memory before aggregation.",
    explanation: "Forces the sorted order into RAM so subsequent `Table.Group` operations preserve row sequence.",
    hint: "Locks sorting in memory so Table.Group retains the top/first item.",
    level: "advanced",
    codeExample: "SortedBuffered = Table.Buffer(Table.Sort(Source, {{\"Date\", Order.Descending}}))"
  },
  {
    question: "What is `Binary.Buffer` used for in file ingestion pipelines?",
    shortAnswer: "It loads a raw binary file stream (such as an Excel, CSV, or PDF file) into memory so that multiple sheet extractions or schema inspections do not re-read the file from disk.",
    explanation: "Caches raw binary content in RAM for multi-table extraction.",
    hint: "Caches file binary in memory to avoid repeated disk I/O.",
    level: "advanced",
    codeExample: "BufferedWorkbook = Binary.Buffer(File.Contents(\"C:\\Data\\Master.xlsx\"))"
  },
  {
    question: "What is the single most effective way to reduce Power Query memory footprint?",
    shortAnswer: "Pruning unused columns immediately at the source step using `Table.SelectColumns` before applying any transformations or joins.",
    explanation: "Eliminating wide text columns (like comments or raw JSON) reduces memory allocation by up to 90%.",
    hint: "Remove unnecessary columns at step 1 to minimize memory usage.",
    level: "basic",
    codeExample: "Table.SelectColumns(Source, {\"TxID\", \"Date\", \"Amount\", \"Branch\"})"
  },
  {
    question: "How does setting appropriate data types early optimize memory usage?",
    shortAnswer: "Fixed types (e.g. `Int64.Type`, `Currency.Type`) use compact binary representations in RAM compared to the flexible but memory-heavy `type any` variant type.",
    explanation: "Typed columns enable columnar compression in memory.",
    hint: "Explicit integer and currency types consume significantly less RAM than `type any`.",
    level: "moderate",
    codeExample: "Table.TransformColumnTypes(Source, {{\"ID\", Int64.Type}, {\"Amount\", Currency.Type}})"
  },
  {
    question: "What is the performance drawback of using `Table.DuplicateColumn` vs modifying in-place?",
    shortAnswer: "Duplicating columns doubles the in-memory footprint for that text/numeric series; transforming in-place with `Table.TransformColumns` reuses existing memory allocations.",
    explanation: "Avoids redundant column instantiation in client memory.",
    hint: "Transform columns in-place rather than creating redundant duplicates.",
    level: "moderate",
    codeExample: "Table.TransformColumns(Source, {{\"Code\", Text.Upper}})"
  },
  {
    question: "How does `Table.StopFolding` differ from `Table.Buffer`?",
    shortAnswer: "`Table.StopFolding` explicitly instructs the engine to stop attempting SQL pushdown without forcing the entire dataset into memory immediately, whereas `Table.Buffer` forces an immediate, eager load into RAM.",
    explanation: "Terminates query folding without forcing immediate memory allocation.",
    hint: "StopFolding terminates folding lazily; Buffer terminates folding eagerly in RAM.",
    level: "expert",
    codeExample: "Table.StopFolding(Source)"
  },
  {
    question: "What diagnostic tool in Power BI Desktop measures memory consumption per query step?",
    shortAnswer: "Power Query Query Diagnostics (`Diagnostics.Session`) generates detailed trace tables containing `Exclusive Duration`, `CPU %`, and `Memory (KB)` allocations.",
    explanation: "Provides granular telemetry on step-by-step memory and CPU metrics.",
    hint: "Query Diagnostics tool records Memory (KB) and Exclusive Duration.",
    level: "expert",
    codeExample: "Tools → Start Diagnostics → View 'Detailed Diagnostics' output table."
  },
  {
    question: "Why does merging queries on high-cardinality text columns consume more memory than integer keys?",
    shortAnswer: "Because string hash comparisons require allocating variable-length Unicode byte arrays in the internal hash table, whereas integer keys fit into compact 64-bit CPU registers.",
    explanation: "Integer hashing is order-of-magnitude faster and uses fixed memory blocks.",
    hint: "Integer keys use compact fixed-width memory; strings require dynamic Unicode buffers.",
    level: "moderate",
    codeExample: "Join on [CustomerID] (Int64) vs [CustomerFullName] (Text)"
  },
  {
    question: "How does disabling 'Enable Load' on intermediate staging queries optimize memory?",
    shortAnswer: "It prevents Power BI / Excel from storing redundant intermediate transformation tables in the final data model cache, keeping only the final curated fact and dimension tables.",
    explanation: "Eliminates duplicate storage of staging data in the VertiPaq engine.",
    hint: "Uncheck 'Enable Load' so staging tables don't consume data model storage.",
    level: "basic",
    codeExample: "Staging_Query → Uncheck 'Enable Load' → Final_Fact → Enable Load"
  },
  {
    question: "What happens if `Table.Buffer` is used inside a custom function invoked across 100,000 rows?",
    shortAnswer: "If `Table.Buffer` is called inside the function definition, it evaluates and allocates a new buffer 100,000 separate times, causing catastrophic memory ballooning and crashing the engine.",
    explanation: "Buffer MUST be declared outside the function in the outer query scope.",
    hint: "Always buffer once in the outer query, never inside the row-by-row function loop.",
    level: "expert",
    codeExample: "Correct: Buf = Table.Buffer(Dim), fx = (x) => Buf{[ID=x]} | Wrong: fx = (x) => Table.Buffer(Dim){[ID=x]}"
  },
  {
    question: "How does `Table.FirstN` help during query development and debugging?",
    shortAnswer: "It limits the dataset to a small sample (e.g. 100 rows) during development, allowing instant transformation preview rendering without processing millions of rows.",
    explanation: "Speeds up UI design iteration before removing the step for full production load.",
    hint: "Limits preview to top N rows for rapid design feedback.",
    level: "basic",
    codeExample: "SampleData = Table.FirstN(Source, 100)"
  },
  {
    question: "What is the impact of excessive custom column additions on memory paging?",
    shortAnswer: "Each custom column evaluated sequentially in M increases the row width; wide rows exceed L1/L2 CPU cache lines and force paging to virtual memory on disk, degrading ETL throughput.",
    explanation: "Wide records trigger cache misses and disk paging.",
    hint: "Keep tables narrow to stay within fast CPU cache lines.",
    level: "advanced",
    codeExample: "Consolidate multiple scalar additions into single composite transformations."
  },
  {
    question: "How do you optimize folder ingestion of 500+ CSV files?",
    shortAnswer: "Filter the file list by `[Extension] = \".csv\"` and `[Date modified]` FIRST, prune all metadata columns except `[Content]`, and buffer the binary before expanding.",
    explanation: "Filters file inventory at the metadata level before opening file streams.",
    hint: "Filter file list by extension and date before reading binary content.",
    level: "moderate",
    codeExample: "Table.SelectRows(Folder.Files(\"C:\\Data\"), each [Extension] = \".csv\" and [Date modified] >= #datetime(2026,1,1,0,0,0))"
  },
  {
    question: "Can `Table.Buffer` resolve race conditions or fluctuating API data during refresh?",
    shortAnswer: "Yes; by taking an immediate immutable memory snapshot at the buffer step, subsequent branch queries reference the identical static snapshot even if the external source updates concurrently.",
    explanation: "Freezes source state in memory for consistent multi-branch evaluation.",
    hint: "Captures an immutable memory snapshot so multiple queries see identical data.",
    level: "advanced",
    codeExample: "StaticSnapshot = Table.Buffer(LiveAPIFeed)"
  },
  {
    question: "What is the relationship between `Table.Buffer` and Data Privacy Firewall?",
    shortAnswer: "Buffering can sometimes bypass Firewall performance bottlenecks by decoupling external queries and resolving data dependencies in local memory before cross-source merging.",
    explanation: "Isolates external evaluation from local mashup privacy checks.",
    hint: "Isolates external queries in local memory to prevent firewall stalls.",
    level: "expert",
    codeExample: "BufferedSource = Table.Buffer(ExternalQuery)"
  },
  {
    question: "How does `List.Contains` perform on buffered vs unbuffered lists?",
    shortAnswer: "On unbuffered lists, `List.Contains` may re-evaluate the generator expression for every row; on a `List.Buffer`, it performs an instant in-memory sequential or hash search.",
    explanation: "Eliminates generator recalculation on every filter predicate.",
    hint: "List.Buffer ensures List.Contains evaluates against a static in-memory list.",
    level: "moderate",
    codeExample: "ValidIDs = List.Buffer(DimBranches[BranchCode]), #\"Filtered\" = Table.SelectRows(Sales, each List.Contains(ValidIDs, [BranchCode]))"
  },
  {
    question: "Why should you avoid using `Table.ReverseRows` in high-volume ETL pipelines?",
    shortAnswer: "Reversing rows forces the engine to read the entire dataset to the very last row into memory before outputting the first row, completely disabling streaming evaluation.",
    explanation: "Requires full table buffering and breaks pipeline streaming.",
    hint: "Forces full dataset buffering before the first row can be returned.",
    level: "moderate",
    codeExample: "Avoid Table.ReverseRows; use Table.Sort with explicit descending order."
  },
  {
    question: "How does `Table.Max` / `Table.Min` performance compare on indexed SQL tables vs buffered tables?",
    shortAnswer: "On SQL tables with Query Folding, `Table.Max` executes instantly via `SELECT MAX(...)` using B-tree indexes; on buffered tables, M performs a full linear scan of all rows in RAM.",
    explanation: "Relational index lookups are orders of magnitude faster than full RAM scans.",
    hint: "Database indexes find MAX in O(1); local memory scans require O(N).",
    level: "advanced",
    codeExample: "Folded: SELECT MAX(Amount) FROM dbo.Sales"
  },
  {
    question: "What is the recommended buffer size limit in 64-bit Power BI Desktop?",
    shortAnswer: "While 64-bit processes can address large memory, buffering tables larger than 100MB–250MB in Power Query often causes garbage collection overhead and slower performance than direct streaming.",
    explanation: "Memory allocation overhead exceeds streaming throughput on very large tables.",
    hint: "Keep buffered tables under 100MB to avoid garbage collection pauses.",
    level: "expert",
    codeExample: "Optimal buffer candidates: 1,000 to 100,000 rows (Dimension/Lookup tables)."
  },
  {
    question: "How does column reordering (`Table.ReorderColumns`) impact memory performance?",
    shortAnswer: "Column reordering is purely metadata-driven and does not physically rearrange byte buffers in memory, incurring virtually zero CPU or memory penalty.",
    explanation: "Metadata projection update without data copying.",
    hint: "Column reordering modifies metadata pointers with zero memory copying overhead.",
    level: "basic",
    codeExample: "Table.ReorderColumns(Source, {\"ID\", \"Name\", \"Amount\"})"
  },
  {
    question: "How does `Table.SelectRows` streaming behavior work when filtering unbuffered streams?",
    shortAnswer: "It streams rows one-by-one through the predicate filter; matching rows are immediately yielded to downstream steps without storing preceding rows in memory.",
    explanation: "Zero-memory streaming pipeline architecture.",
    hint: "Streams matching rows immediately without caching the full dataset.",
    level: "moderate",
    codeExample: "Streaming: Row 1 → Filter → Downstream Step → Row 2 → Filter..."
  },
  {
    question: "When should you remove duplicate records in the ETL sequence for optimal performance?",
    shortAnswer: "As early as possible in the pipeline (immediately after initial filtering and column pruning) to reduce the volume of rows processed by subsequent joins and custom functions.",
    explanation: "Minimizes row count for downstream computational steps.",
    hint: "Deduplicate early to reduce workload for all subsequent transformations.",
    level: "basic",
    codeExample: "Source → Select Columns → Table.Distinct → Heavy Transformations"
  },
  {
    question: "How does `Record.Field` performance compare inside a custom function with and without a buffered record?",
    shortAnswer: "If the record is extracted from a buffered table, `Record.Field` lookup executes in nanoseconds in CPU cache; if the record is derived from an unbuffered query, it triggers a source query re-fetch.",
    explanation: "Direct RAM pointer dereferencing vs external I/O retrieval.",
    hint: "Buffered record access occurs in CPU cache in nanoseconds.",
    level: "advanced",
    codeExample: "Record.Field(BufferedConfigRecord, \"TaxRate\")"
  },
  {
    question: "What is the danger of referencing the same Staging query in 10 different Fact and Dimension queries?",
    shortAnswer: "If Staging is not loaded into memory or folded, Power Query will execute the Staging query's full ETL pipeline 10 independent times during dataset refresh.",
    explanation: "Multi-branch execution re-runs upstream queries for each dependent branch.",
    hint: "Each dependent query re-evaluates the shared staging query from scratch.",
    level: "expert",
    codeExample: "Use Power BI Dataflows or load Staging as an optimized model table."
  },
  {
    question: "What is the ultimate golden rule of Power Query performance optimization?",
    shortAnswer: "Prune columns and filter rows at step 1, preserve Query Folding on SQL sources, buffer small-to-medium lookup tables once, and keep staging pipelines narrow and typed.",
    explanation: "Holistic optimization combining server pushdown, RAM caching, and streaming.",
    hint: "Prune early, fold SQL, buffer small lookups, and streamline data types.",
    level: "basic",
    codeExample: "Golden Formula = Prune Early + Maximize Folding + Selective Buffering"
  }
];

export default questions;
