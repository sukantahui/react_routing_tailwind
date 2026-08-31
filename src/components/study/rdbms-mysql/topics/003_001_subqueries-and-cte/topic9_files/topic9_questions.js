// topic9_files/topic9_questions.js

const questions = [
  {
    question: "How do you declare multiple Common Table Expressions in a single SQL statement?",
    shortAnswer: "Write the `WITH` keyword once, followed by comma-separated CTE declarations: `WITH CTE_1 AS (...), CTE_2 AS (...), CTE_3 AS (...) SELECT ...`.",
    explanation: "Subsequent CTEs are separated with commas without repeating WITH.",
    hint: "Single WITH keyword followed by comma-separated CTE blocks.",
    level: "basic"
  },
  {
    question: "What is a 'Chained CTE' in SQL?",
    shortAnswer: "A CTE that references and builds upon one or more previously defined CTEs in the same `WITH` declaration list.",
    explanation: "Enables multi-stage pipeline transformations.",
    hint: "A CTE that queries a preceding CTE in the same statement.",
    level: "basic"
  },
  {
    question: "What is the Forward Reference Rule for chained CTEs in MySQL?",
    shortAnswer: "A CTE can reference any CTE defined BEFORE it in the declaration list, but CANNOT reference CTEs defined after it.",
    explanation: "CTEs must be declared in topological order.",
    hint: "Can reference earlier CTEs, but not later CTEs.",
    level: "basic"
  },
  {
    question: "What happens if you write the `WITH` keyword twice in the same query (e.g. `WITH A AS (...) WITH B AS (...)`)?",
    shortAnswer: "MySQL throws `Error 1064 (42000): You have an error in your SQL syntax` because `WITH` must appear only once at the start.",
    explanation: "Use a comma to separate multiple CTE definitions instead.",
    hint: "Throws Error 1064; WITH must only appear once.",
    level: "basic"
  },
  {
    question: "How do chained CTEs resemble ETL (Extract, Transform, Load) pipelines?",
    shortAnswer: "Stage 1 extracts and filters raw records, Stage 2 aggregates metrics, Stage 3 calculates variances/ranks, and the main query loads/formats the final report.",
    explanation: "Modularizes data processing into clear stages.",
    hint: "Stage 1 Extracts, Stage 2 Aggregates, Stage 3 Ranks, and Final Query formats.",
    level: "basic"
  },
  {
    question: "Can a chained CTE join two previously declared CTEs together?",
    shortAnswer: "YES; `WITH A AS (...), B AS (...), C AS (SELECT * FROM A JOIN B ON A.id = B.id) SELECT * FROM C;` is completely valid.",
    explanation: "Allows synthesizing multiple intermediate transformation streams.",
    hint: "Yes, subsequent CTEs can join multiple preceding CTEs together.",
    level: "basic"
  },
  {
    question: "How do chained CTEs improve code debugging in large enterprise queries?",
    shortAnswer: "Engineers can comment out downstream CTEs and run `SELECT * FROM TargetCTE;` at any stage to inspect and verify intermediate data transformations.",
    explanation: "Allows step-by-step isolated inspection.",
    hint: "Enables inspecting intermediate stages by querying any CTE block directly.",
    level: "moderate"
  },
  {
    question: "Can a non-recursive CTE reference itself?",
    shortAnswer: "NO; referencing its own name in a non-recursive CTE throws an error. Self-referencing requires the `WITH RECURSIVE` syntax.",
    explanation: "Self-referencing is strictly reserved for recursive CTEs.",
    hint: "No, self-referencing requires WITH RECURSIVE.",
    level: "moderate"
  },
  {
    question: "How do student records for Mamata, Susmita, Abhronila, and Debangshu demonstrate chained CTEs?",
    shortAnswer: "By chaining raw enrollment counts (`EnrollmentStage`), joining with payment totals (`PaymentStage`), and computing academic scholarship eligibility in the final report.",
    explanation: "Demonstrates practical multi-stage student analytics.",
    hint: "EnrollmentStage → PaymentStage → Final Scholarship Ranking.",
    level: "basic"
  },
  {
    question: "What is the optimizer behavior for a chain of 4 simple CTEs in MySQL 8.0?",
    shortAnswer: "MySQL's query optimizer attempts to inline and merge all 4 CTE blocks into a single unified query execution plan, eliminating intermediate temporary tables.",
    explanation: "Optimizer merging maximizes execution throughput.",
    hint: "Merges chained CTEs into a unified execution plan to avoid temporary tables.",
    level: "expert"
  },
  {
    question: "What happens if an earlier CTE in a chain contains a `GROUP BY` and a later CTE filters on its output?",
    shortAnswer: "MySQL materializes the aggregated CTE output in memory and applies the subsequent filter on the materialized result set.",
    explanation: "Evaluates multi-stage aggregations cleanly in memory.",
    hint: "Materializes intermediate aggregate in memory and filters subsequently.",
    level: "expert"
  },
  {
    question: "Can you define CTEs with explicit column headers when declaring multiple CTEs?",
    shortAnswer: "YES; for example, `WITH CTE_1 (id, total) AS (...), CTE_2 (id, avg_score) AS (...) SELECT ...`.",
    explanation: "Enforces explicit output column naming across all blocks.",
    hint: "Yes, explicit column aliases can be assigned to each CTE block.",
    level: "moderate"
  },
  {
    question: "How do chained CTEs eliminate Cartesian product explosion in multi-table reporting?",
    shortAnswer: "By pre-aggregating each child table independently in separate CTEs (e.g. `EnrollmentTotals` and `PaymentTotals`) before joining them on the parent primary key.",
    explanation: "Prevents M:N row explosion during multi-child joins.",
    hint: "Pre-aggregates child tables independently before joining on the parent key.",
    level: "expert"
  },
  {
    question: "What is the scope of column names declared inside earlier CTEs when accessed in downstream CTEs?",
    shortAnswer: "Downstream CTEs see only the projected column aliases defined in the earlier CTE's `SELECT` list (or explicit header list).",
    explanation: "Standard relational projection scoping applies.",
    hint: "Only projected column names from earlier CTEs are visible downstream.",
    level: "basic"
  },
  {
    question: "Can a chained CTE perform an `UNION ALL` between two preceding CTEs?",
    shortAnswer: "YES; for example, `WITH HighScorers AS (...), LowScorers AS (...), Combined AS (SELECT * FROM HighScorers UNION ALL SELECT * FROM LowScorers) SELECT * FROM Combined;`",
    explanation: "Combines multiple intermediate streams seamlessly.",
    hint: "Yes, subsequent CTEs can combine preceding CTEs using UNION ALL.",
    level: "moderate"
  },
  {
    question: "What is the memory limit for materialized chained CTEs in MySQL?",
    shortAnswer: "Bounded by `tmp_table_size` and `max_heap_table_size`; if materialized CTEs exceed these limits, MySQL spills intermediate tables to disk (InnoDB on-disk temporary tables).",
    explanation: "Monitoring memory sizing prevents disk I/O spilling.",
    hint: "Controlled by tmp_table_size and max_heap_table_size.",
    level: "expert"
  },
  {
    question: "How do you calculate Month-over-Month (MoM) revenue growth using chained CTEs?",
    shortAnswer: "CTE 1 aggregates monthly revenue (`MonthlyRevenue`); CTE 2 uses `LAG()` to pull prior month revenue (`GrowthStage`); the main query calculates percentage growth.",
    explanation: "Classic 3-stage financial analytics pipeline.",
    hint: "MonthlyRevenue CTE → GrowthStage with LAG() → Final % calculation.",
    level: "expert"
  },
  {
    question: "Can a chained CTE be used in an `INSERT INTO ... SELECT` statement?",
    shortAnswer: "YES; `INSERT INTO student_honors WITH Step1 AS (...), Step2 AS (...) SELECT * FROM Step2;` is fully supported in MySQL 8.0+.",
    explanation: "Chained CTEs are valid in all DML statements.",
    hint: "Yes, WITH chain can precede INSERT INTO ... SELECT.",
    level: "moderate"
  },
  {
    question: "How do you calculate the academy-wide median score using chained CTEs and `ROW_NUMBER()`?",
    shortAnswer: "CTE 1 assigns ordered row numbers (`RankedScores`), CTE 2 counts total rows (`TotalCount`), and the main query filters where `row_num IN (FLOOR((total+1)/2), CEIL((total+1)/2))`.",
    explanation: "Classic SQL median calculation without specialized extensions.",
    hint: "RankedScores CTE → TotalCount CTE → Middle row filter.",
    level: "expert"
  },
  {
    question: "Why should developers assign clear, domain-specific names to chained CTEs?",
    shortAnswer: "Descriptive names (e.g. `ActiveEnrollments`, `BranchRevenueSummary`) make complex queries self-documenting and intuitive for team maintenance.",
    explanation: "Avoid generic names like `cte1`, `cte2`, `temp_table`.",
    hint: "Descriptive names make the SQL pipeline self-documenting.",
    level: "basic"
  },
  {
    question: "What error occurs if CTE 'B' attempts to query CTE 'A' when 'A' is declared after 'B'?",
    shortAnswer: "`Error 1146 (42S02): Table 'database.A' doesn't exist` because forward declaration rules are violated.",
    explanation: "MySQL cannot resolve backward CTE references.",
    hint: "Error 1146: Table doesn't exist due to backward reference violation.",
    level: "basic"
  },
  {
    question: "Can chained CTEs contain `HAVING` and `ORDER BY` clauses?",
    shortAnswer: "`HAVING` is fully supported; `ORDER BY` is supported but only takes effect if paired with `LIMIT`, otherwise sorting in intermediate CTEs is disregarded by the optimizer.",
    explanation: "Intermediate relational sets are inherently unordered unless limited.",
    hint: "HAVING is valid; ORDER BY requires LIMIT in intermediate CTEs.",
    level: "moderate"
  },
  {
    question: "How do chained CTEs compare to multiple temporary tables created with `CREATE TEMPORARY TABLE`?",
    shortAnswer: "Chained CTEs execute in a single atomic statement without DDL overhead, metadata locking, or manual `DROP TABLE` cleanup, making them faster and safer.",
    explanation: "Zero DDL overhead and automatic memory lifecycle.",
    hint: "Single atomic statement with no DDL overhead or manual cleanup.",
    level: "expert"
  },
  {
    question: "Can a chained CTE be passed as an argument to a scalar subquery?",
    shortAnswer: "YES; inside downstream CTEs or the main query, `WHERE col > (SELECT AVG(col) FROM PrecedingCTE)` is valid.",
    explanation: "Preceding CTEs can be queried in scalar subqueries.",
    hint: "Yes, preceding CTEs can be referenced inside scalar subqueries.",
    level: "moderate"
  },
  {
    question: "What is the impact of placing a `DISTINCT` keyword inside an intermediate chained CTE?",
    shortAnswer: "It forces deduplication at that stage, triggering temporary table materialization and sorting before passing data downstream.",
    explanation: "Use DISTINCT in intermediate CTEs only when necessary.",
    hint: "Forces early deduplication and temporary table materialization.",
    level: "moderate"
  },
  {
    question: "How do you calculate customer Recency, Frequency, and Monetary (RFM) scores using chained CTEs?",
    shortAnswer: "CTE 1 aggregates raw transactions (`RawMetrics`), CTE 2 computes NTILE quartiles (`RFMScores`), and the main query concatenates RFM cell segments.",
    explanation: "Standard enterprise marketing segmentation pipeline.",
    hint: "RawMetrics CTE → RFMScores with NTILE → Final RFM segment.",
    level: "expert"
  },
  {
    question: "What is the maximum query length for a statement containing 10+ chained CTEs?",
    shortAnswer: "Bounded by the `max_allowed_packet` server configuration (default 64MB), allowing virtually unlimited SQL statement length.",
    explanation: "Practically unlimited for all enterprise queries.",
    hint: "Bounded only by max_allowed_packet (typically 64MB).",
    level: "basic"
  },
  {
    question: "Can you update a physical table by joining with a chained CTE in MySQL 8.0?",
    shortAnswer: "YES; `WITH Summary AS (...) UPDATE students s JOIN Summary sum ON s.id = sum.id SET s.benchmark = sum.avg_score;` is fully supported.",
    explanation: "Chained CTEs integrate seamlessly with multi-table DML.",
    hint: "Yes, WITH chains can precede multi-table UPDATE statements.",
    level: "expert"
  },
  {
    question: "What query profiling tool shows the execution cost of each chained CTE block?",
    shortAnswer: "`EXPLAIN ANALYZE`, which displays actual execution duration, loop counts, and memory materialization stats for each CTE block.",
    explanation: "Provides granular per-stage execution profiling.",
    hint: "EXPLAIN ANALYZE displays runtime cost and row counts for each CTE.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for Writing Multiple and Chained CTEs?",
    shortAnswer: "Use comma-separated `WITH` declarations to build multi-stage ETL pipelines, adhere to forward reference rules, isolate child aggregations in dedicated stages to prevent row explosion, and name stages descriptively for production maintainability.",
    explanation: "Authoritative architectural best practices for chained CTE query design.",
    hint: "Comma-separated WITH + forward reference order + isolate child aggregates + descriptive names.",
    level: "expert"
  }
];

export default questions;
