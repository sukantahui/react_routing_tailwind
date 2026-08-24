// topic2_files/topic2_questions.js

const questions = [
  {
    question: "Can you use `WHERE`, `ORDER BY`, and `LIMIT` clauses when querying a database view?",
    shortAnswer: "YES. Views can be queried with all standard SQL clauses exactly like physical base tables.",
    explanation: "The database query engine treats views as valid relational row sources (virtual relations).",
    hint: "Yes; views support SELECT, WHERE, ORDER BY, LIMIT, etc.",
    level: "basic"
  },
  {
    question: "What is 'View Merging' in relational query processing?",
    shortAnswer: "The query optimization process where MySQL combines the outer query's clauses with the view's internal `SELECT` definition into a single consolidated execution plan.",
    explanation: "View merging eliminates intermediate subquery layers and allows direct execution against base tables.",
    hint: "Combining the caller query and view definition into one unified query plan.",
    level: "moderate"
  },
  {
    question: "What is 'Predicate Pushdown' when querying a view?",
    shortAnswer: "The optimization technique where the query engine pushes outer `WHERE` conditions down into the base table scan, utilizing base table indexes before reading rows.",
    explanation: "Predicate pushdown drastically reduces the number of disk pages read from the physical storage engine.",
    hint: "Pushing outer WHERE filters down to the base table to use its indexes.",
    level: "expert"
  },
  {
    question: "Can a database view be joined with a physical base table?",
    shortAnswer: "YES: `SELECT * FROM view_students v JOIN payments p ON v.id = p.student_id;`",
    explanation: "Views can participate in INNER JOINs, LEFT JOINs, and subqueries alongside physical tables.",
    hint: "Yes; views can be freely joined with base tables using standard JOIN syntax.",
    level: "basic"
  },
  {
    question: "Can a view be joined with another view in a single query?",
    shortAnswer: "YES: `SELECT * FROM view_active_students v1 JOIN view_fee_receipts v2 ON v1.id = v2.id;`",
    explanation: "Relational algebra permits arbitrary composition of views and virtual relations.",
    hint: "Yes; views can be joined directly with other views.",
    level: "basic"
  },
  {
    question: "What happens if both the view definition and the outer query specify an `ORDER BY` clause?",
    shortAnswer: "The outer query's `ORDER BY` takes precedence and completely overrides the view's internal sort order.",
    explanation: "The SQL standard mandates that the calling query's explicit sorting dictates the final result presentation.",
    hint: "The outer query's ORDER BY overrides the view's internal ORDER BY.",
    level: "moderate"
  },
  {
    question: "How does pagination (`LIMIT ... OFFSET ...`) work when executed against a view?",
    shortAnswer: "MySQL applies the `LIMIT` to the final merged result set, returning only the requested page slice of records.",
    explanation: "Pagination works identically to base table queries.",
    hint: "Applies to the final result set just like a base table query.",
    level: "basic"
  },
  {
    question: "If a view definition includes `WHERE is_active = 1`, and the caller queries `WHERE centre_city = 'Barrackpore'`, what combined condition is executed?",
    shortAnswer: "`WHERE is_active = 1 AND centre_city = 'Barrackpore'`",
    explanation: "The query optimizer combines the filters using logical AND.",
    hint: "Combines both conditions with an AND operator.",
    level: "basic"
  },
  {
    question: "Under what condition does MySQL fail to use `ALGORITHM = MERGE` and fall back to `TEMPTABLE`?",
    shortAnswer: "When the view contains aggregate functions (SUM, AVG), `GROUP BY`, `HAVING`, `DISTINCT`, `UNION`, or non-mergeable subqueries.",
    explanation: "These operators require full evaluation of the group before outer filtering can occur.",
    hint: "When GROUP BY, DISTINCT, UNION, or aggregate functions are present.",
    level: "expert"
  },
  {
    question: "What is the performance consequence when a view is evaluated using `ALGORITHM = TEMPTABLE`?",
    shortAnswer: "MySQL materializes the view's full result into an internal in-memory temporary table first, preventing the outer `WHERE` clause from using base table indexes during the initial scan.",
    explanation: "The temporary table must be scanned sequentially (full scan) by the outer query.",
    hint: "Materializes an internal temp table, preventing index pushdown on the base table.",
    level: "expert"
  },
  {
    question: "How can you check whether MySQL merged a view or created a temporary table when executing a query?",
    shortAnswer: "Run `EXPLAIN` on the query and look for `<derived2>` or `<subquery2>` in the table column and `Using temporary` in the Extra column.",
    explanation: "EXPLAIN provides the query execution plan showing whether views were inlined or materialized.",
    hint: "Use EXPLAIN to inspect the execution plan for derived/temporary tables.",
    level: "expert"
  },
  {
    question: "Can you perform aggregate operations (`COUNT(*)`, `SUM()`) on a view that already contains aggregated data?",
    shortAnswer: "YES. You can aggregate the output of an aggregated view (e.g. `SUM(branch_total)` from a branch view).",
    explanation: "Relational engines allow multi-level aggregation over derived and virtual relations.",
    hint: "Yes; you can run SUM, AVG, COUNT on view outputs.",
    level: "moderate"
  },
  {
    question: "Can you use a Common Table Expression (CTE) to query a View?",
    shortAnswer: "YES: `WITH HighScorers AS (SELECT * FROM view_students WHERE marks >= 90) SELECT * FROM HighScorers;`",
    explanation: "Views can be queried inside CTE `WITH` blocks just like standard tables.",
    hint: "Yes; CTEs can query views seamlessly.",
    level: "basic"
  },
  {
    question: "Can you query a view inside a subquery `WHERE id IN (SELECT student_id FROM view_top_performers)`?",
    shortAnswer: "YES. Views can be used in scalar subqueries, `IN` subqueries, and `EXISTS` correlated subqueries.",
    explanation: "Views are first-class relational sources in all SQL subquery expressions.",
    hint: "Yes; views work inside all types of subqueries.",
    level: "basic"
  },
  {
    question: "How does MySQL resolve column name ambiguity when joining a view with a table having identical column names?",
    shortAnswer: "By qualifying columns with table and view aliases (e.g. `v.student_id` vs `p.student_id`).",
    explanation: "Standard SQL column qualification rules apply to avoid Error 1052 (Column in field list is ambiguous).",
    hint: "Use table/view aliases like v.col and t.col to qualify column references.",
    level: "basic"
  },
  {
    question: "If a base table has 1,000,000 rows and a view has `WHERE status = 'ACTIVE'` (10,000 rows), does querying the view scan 1,000,000 rows?",
    shortAnswer: "NO, provided an index exists on `status`; the optimizer uses the B-Tree index to read only the 10,000 active rows.",
    explanation: "Predicate pushdown utilizes the base table's index to seek active records directly.",
    hint: "No; it uses the base table index on status to scan only the matching rows.",
    level: "moderate"
  },
  {
    question: "Can a client application create a temporary table by selecting from a view (`CREATE TEMPORARY TABLE temp_st AS SELECT * FROM view_students`)?",
    shortAnswer: "YES. CTAS (CREATE TABLE AS SELECT) works seamlessly with views to snapshot data for batch processing.",
    explanation: "CTAS materializes the view's current query output into a temporary session table.",
    hint: "Yes; CREATE TEMPORARY TABLE ... AS SELECT * FROM view works as expected.",
    level: "moderate"
  },
  {
    question: "What happens if a user queries a column that was NOT included in the view's `SELECT` list?",
    shortAnswer: "MySQL throws Error 1054: `Unknown column 'column_name' in 'field list'`.",
    explanation: "A view exposes strictly the columns defined in its schema; unexposed base table columns cannot be accessed.",
    hint: "Throws Error 1054 because the column does not exist in the view's exposed schema.",
    level: "basic"
  },
  {
    question: "How do views assist business intelligence (BI) and reporting tools like PowerBI or Tableau?",
    shortAnswer: "By exposing clean, pre-joined dimensional models with intuitive column names, avoiding complex SQL queries in BI models.",
    explanation: "BI tools connect to views as if they were pre-modeled reporting tables.",
    hint: "Provides simplified pre-modeled tables with clear business column names.",
    level: "basic"
  },
  {
    question: "Why should you avoid querying a view that joins 8 tables when you only need columns from 2 tables?",
    shortAnswer: "Because unless the optimizer can perform Table Elimination, it may still execute all 8 joins, wasting significant CPU and I/O resources.",
    explanation: "Monolithic 'all-in-one' views degrade performance when only narrow subsets of columns are needed.",
    hint: "It forces the query engine to evaluate unnecessary joins, wasting CPU and I/O.",
    level: "expert"
  },
  {
    question: "What is Table Elimination (Join Elimination) in the MySQL optimizer when querying views?",
    shortAnswer: "The optimizer's ability to discard unreferenced tables from a view's `LEFT JOIN` if the join is guaranteed not to change the row count (e.g. joining on a unique foreign key).",
    explanation: "MySQL 8.0 can eliminate unnecessary tables from outer joins if no columns from those tables are referenced.",
    hint: "The optimizer removes unneeded LEFT JOIN tables from the execution plan.",
    level: "expert"
  },
  {
    question: "How does `LIKE` pattern matching perform when querying a text column through a view?",
    shortAnswer: "It performs identically to a base table query; leading-wildcard queries (`%text`) cause full scans, while prefix queries (`text%`) can use B-Tree indexes.",
    explanation: "Index utilization rules for string pattern matching apply transparently through the view layer.",
    hint: "Behaves like a base table; prefix searches use indexes, leading wildcards cause full scans.",
    level: "moderate"
  },
  {
    question: "Can you use window functions (`ROW_NUMBER()`, `RANK()`) when querying a view?",
    shortAnswer: "YES. You can apply window functions over view query results in the calling SQL statement.",
    explanation: "Window functions operate over the result stream produced by the merged view query.",
    hint: "Yes; window functions like ROW_NUMBER() work over view queries.",
    level: "basic"
  },
  {
    question: "What is the result of running `SHOW COLUMNS FROM view_name;`?",
    shortAnswer: "MySQL displays the field names, data types, nullability, and default values of the view's projected schema.",
    explanation: "SHOW COLUMNS treats views identically to physical base tables.",
    hint: "Outputs the column definitions and data types of the view.",
    level: "basic"
  },
  {
    question: "How do `NULL` comparisons behave when filtering view query results (`WHERE view_col IS NULL`)?",
    shortAnswer: "They follow standard SQL Three-Valued Logic; rows where the view column evaluates to NULL are matched by `IS NULL`.",
    explanation: "Calculated expressions or outer join nulls in views respect standard SQL NULL semantics.",
    hint: "Respects standard Three-Valued Logic using IS NULL.",
    level: "basic"
  },
  {
    question: "Can a database trigger be attached to fire on `SELECT` queries against a view?",
    shortAnswer: "NO. SQL triggers fire only on DML write operations (`INSERT`, `UPDATE`, `DELETE`), not on `SELECT` queries.",
    explanation: "Triggers do not support read-event interception in relational databases.",
    hint: "No; triggers only fire on INSERT, UPDATE, DELETE, never on SELECT.",
    level: "moderate"
  },
  {
    question: "How do you search for active students from Barrackpore or Kolkata with tuition fee greater than ₹20,000 using a view?",
    shortAnswer: "`SELECT * FROM view_students WHERE centre_city IN ('Barrackpore', 'Kolkata') AND tuition_fee_inr > 20000;`",
    explanation: "Standard boolean logic and IN predicates apply directly to view queries.",
    hint: "WHERE centre_city IN ('Barrackpore', 'Kolkata') AND tuition_fee_inr > 20000",
    level: "basic"
  },
  {
    question: "Can a transaction (`START TRANSACTION` ... `COMMIT`) wrap queries against a view?",
    shortAnswer: "YES. Read consistency and transaction isolation levels (e.g. REPEATABLE READ) apply to base tables accessed through views.",
    explanation: "InnoDB MVCC guarantees consistent snapshot reads through views within active transactions.",
    hint: "Yes; transaction isolation and MVCC apply transparently to view reads.",
    level: "moderate"
  },
  {
    question: "What happens if two client sessions query the same view simultaneously under high load?",
    shortAnswer: "Both sessions execute their query plans concurrently against the base tables using InnoDB shared read locks / MVCC snapshots without blocking each other.",
    explanation: "Views have zero physical lock footprint; concurrency is governed by base table InnoDB locking.",
    hint: "They execute concurrently without blocking, governed by base table InnoDB concurrency.",
    level: "expert"
  },
  {
    question: "What is the primary architectural rule when writing queries that consume views?",
    shortAnswer: "Treat views as logical abstractions, filter with indexed columns, avoid requesting unnecessary columns, and avoid joining huge unindexed TEMPTABLE views.",
    explanation: "Following standard query optimization principles ensures high-throughput view performance.",
    hint: "Filter on indexed base columns and avoid heavy unindexed TEMPTABLE views.",
    level: "expert"
  }
];

export default questions;
