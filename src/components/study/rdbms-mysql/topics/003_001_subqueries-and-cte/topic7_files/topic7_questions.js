// topic7_files/topic7_questions.js

const questions = [
  {
    question: "What is the primary trade-off when choosing between a Subquery and a JOIN in SQL?",
    shortAnswer: "JOINs excel at retrieving projected columns from multiple tables and optimizing linear execution passes, while Subqueries excel at isolated pre-aggregation, existential presence checks, and avoiding row duplication.",
    explanation: "Both techniques have distinct performance and architectural strengths.",
    hint: "JOINs excel at multi-table projections and linear scans; subqueries excel at presence checks and pre-aggregations.",
    level: "basic"
  },
  {
    question: "Why does `WHERE id IN (SELECT id FROM child)` prevent row multiplication compared to `INNER JOIN child`?",
    shortAnswer: "Because `IN (subquery)` is evaluated as a Semi-Join that tests presence without duplicating parent rows, whereas an `INNER JOIN` outputs a duplicate row for every matching child record.",
    explanation: "Semi-joins eliminate the need for expensive post-join DISTINCT sorting.",
    hint: "Semi-join tests existence without duplicating rows for multiple child matches.",
    level: "expert"
  },
  {
    question: "When is a JOIN strictly required over a subquery in the WHERE clause?",
    shortAnswer: "When the final `SELECT` projection list needs to display columns belonging to the child table alongside the parent table.",
    explanation: "Subqueries in WHERE cannot expose their internal columns to the outer SELECT list.",
    hint: "When columns from both tables must be returned in the SELECT list.",
    level: "basic"
  },
  {
    question: "What is the performance advantage of a `LEFT JOIN ... GROUP BY` over a correlated subquery in the `SELECT` list?",
    shortAnswer: "The `LEFT JOIN` processes all records in a single linear pass ($O(N + M)$), whereas a correlated `SELECT` subquery triggers $N$ separate query lookups ($O(N \\times M)$).",
    explanation: "Eliminates repeated subquery invocations on large datasets.",
    hint: "Processes data in a single pass instead of N separate loop evaluations.",
    level: "expert"
  },
  {
    question: "How do `NOT EXISTS` and `LEFT JOIN ... WHERE right.id IS NULL` compare for Anti-Joins?",
    shortAnswer: "Both express anti-joins effectively; `NOT EXISTS` is more readable and explicitly conveys intent, while modern MySQL optimizers often execute both via identical hash anti-join plans.",
    explanation: "Both are standard patterns for finding unmatched records.",
    hint: "Both perform anti-joins; NOT EXISTS is generally more readable and intent-revealing.",
    level: "moderate"
  },
  {
    question: "What is the danger of writing `SELECT DISTINCT p.id FROM parent p JOIN child c ON ...` to fix row duplication?",
    shortAnswer: "`DISTINCT` forces MySQL to sort and hash the entire result set in memory or on disk (`Using temporary; Using filesort`), adding massive CPU and memory overhead.",
    explanation: "Using a semi-join subquery `WHERE id IN (...)` avoids the need for DISTINCT entirely.",
    hint: "DISTINCT incurs high memory and sorting overhead (Using filesort).",
    level: "expert"
  },
  {
    question: "What is 'Subquery Unnesting' (or Subquery Flattening)?",
    shortAnswer: "An optimizer rewrite where MySQL automatically converts a subquery in `WHERE ... IN` or `EXISTS` into an equivalent join (inner join or semi-join) before generating the query execution plan.",
    explanation: "Allows the optimizer to explore more join order permutations.",
    hint: "Optimizer automatically rewrites subqueries into joins or semi-joins.",
    level: "expert"
  },
  {
    question: "Why is isolated pre-aggregation in a derived table JOIN faster than grouping after a multi-table JOIN?",
    shortAnswer: "Pre-aggregating in a derived table reduces the row volume *before* the join takes place, preventing Cartesian row multiplication and buffer pool bloat.",
    explanation: "Reduces intermediate row volume early in the execution pipeline.",
    hint: "Reduces row count before joining, avoiding Cartesian row explosion.",
    level: "expert"
  },
  {
    question: "How does MySQL 8.0+ Hash Join optimize JOINs compared to legacy Block Nested Loop (BNL)?",
    shortAnswer: "Hash Join builds an in-memory hash table for the smaller table and probes it with the larger table in $O(N + M)$ linear time, completely replacing slow $O(N \\times M)$ nested loop joins.",
    explanation: "Significantly accelerates non-indexed equality joins.",
    hint: "Builds an in-memory hash table for O(N + M) linear join performance.",
    level: "expert"
  },
  {
    question: "How do student queries for Mamata, Susmita, Abhronila, and Debangshu illustrate Subquery vs JOIN selection?",
    shortAnswer: "By comparing a `WHERE student_id IN (SELECT ...)` presence filter (0 row duplication) against an `INNER JOIN` with student and course details projected together.",
    explanation: "Demonstrates when to preserve row cardinality vs when to expand attributes.",
    hint: "Presence checks use IN subqueries; multi-attribute projections use JOINs.",
    level: "basic"
  },
  {
    question: "What is the readability advantage of Common Table Expressions (CTEs) over deeply nested subqueries?",
    shortAnswer: "CTEs structure multi-stage data transformations linearly from top to bottom (`WITH Step1 AS (...), Step2 AS (...)`), whereas nested subqueries require reading inside-out.",
    explanation: "Improves code maintainability, debugging, and review velocity.",
    hint: "CTEs read top-to-bottom linearly; nested subqueries read inside-out.",
    level: "basic"
  },
  {
    question: "Can an `INNER JOIN` ever be slower than an `EXISTS` subquery?",
    shortAnswer: "YES; if the child table has millions of duplicate rows matching each parent, an `INNER JOIN` materializes and deduplicates millions of intermediate rows, whereas `EXISTS` halts on the first match.",
    explanation: "Short-circuiting in EXISTS avoids massive intermediate row generation.",
    hint: "Yes, when child table has high duplicate volume that causes row explosion.",
    level: "expert"
  },
  {
    question: "What does `EXPLAIN` show when a subquery is converted to a Semi-Join?",
    shortAnswer: "The execution plan displays access type `ref` or `range` and strategy markers like `FirstMatch(table)` or `Materialize`.",
    explanation: "Indicates successful semi-join transformation.",
    hint: "Shows FirstMatch or Materialize semi-join strategies in EXPLAIN.",
    level: "moderate"
  },
  {
    question: "How do you rewrite a multi-table `WHERE id IN (SELECT id FROM ...)` query as an `INNER JOIN`?",
    shortAnswer: "`SELECT DISTINCT p.* FROM parent p JOIN child c ON p.id = c.parent_id WHERE c.status = 'ACTIVE';`",
    explanation: "Requires DISTINCT to prevent duplicate parent rows.",
    hint: "JOIN on parent_id with DISTINCT to prevent duplicate rows.",
    level: "basic"
  },
  {
    question: "Why is `WHERE NOT EXISTS` generally preferred over `LEFT JOIN ... WHERE right.id IS NULL` for anti-joins?",
    shortAnswer: "Because `NOT EXISTS` explicitly communicates the business intent of testing non-existence, and eliminates any risk of outer column nullability confusion.",
    explanation: "Cleaner semantic readability and intentionality.",
    hint: "More explicit business intent and avoids column nullability ambiguity.",
    level: "moderate"
  },
  {
    question: "What is the impact of missing indexes on JOIN performance vs Correlated Subquery performance?",
    shortAnswer: "Missing indexes severely degrade both, but correlated subqueries suffer worse exponential degradation ($O(N \\times M)$ nested loop scans) than MySQL 8.0+ Hash Joins ($O(N + M)$).",
    explanation: "Hash joins mitigate missing indexes better than unindexed dependent subqueries.",
    hint: "Hash joins handle unindexed joins in linear time, while dependent subqueries loop.",
    level: "expert"
  },
  {
    question: "Can a query combine both Subqueries and JOINs simultaneously?",
    shortAnswer: "YES; combining pre-aggregated derived table subqueries with outer `INNER/LEFT JOIN`s is a standard pattern in enterprise analytical SQL.",
    explanation: "Hybrid patterns maximize both efficiency and expressiveness.",
    hint: "Yes, combining derived table subqueries with outer JOINs is standard practice.",
    level: "basic"
  },
  {
    question: "How do you calculate student payment summary without row duplication using a derived table JOIN?",
    shortAnswer: "`SELECT s.name, dt.total_paid FROM students s LEFT JOIN (SELECT student_id, SUM(amount) AS total_paid FROM payments GROUP BY student_id) AS dt ON s.id = dt.student_id;`",
    explanation: "Pre-aggregates in derived table to maintain 1:1 join cardinality.",
    hint: "Pre-aggregate payments in a derived table before joining to students.",
    level: "moderate"
  },
  {
    question: "What is the memory limit for MySQL Hash Joins?",
    shortAnswer: "Controlled by the `join_buffer_size` system variable; if the hash table exceeds this size, MySQL spills hash partitions to disk.",
    explanation: "Sizing join_buffer_size appropriately ensures in-memory join speed.",
    hint: "Controlled by join_buffer_size; spills to disk if exceeded.",
    level: "expert"
  },
  {
    question: "When should you replace a complex derived table JOIN with a temporary table?",
    shortAnswer: "When the intermediate pre-aggregated dataset is reused multiple times across separate queries in the same stored procedure or ETL session.",
    explanation: "Materializing once into a temporary table saves repeated re-evaluations.",
    hint: "When the intermediate dataset is queried multiple times in the session.",
    level: "moderate"
  },
  {
    question: "What happens if you write a subquery that returns a single column but the outer query expects a multi-column join?",
    shortAnswer: "The subquery can only filter on that single column; to project additional attributes, you must convert the subquery into a `JOIN`.",
    explanation: "Subqueries in WHERE do not expand the outer projection schema.",
    hint: "Convert to a JOIN to project additional attributes from the child table.",
    level: "basic"
  },
  {
    question: "Why does `EXPLAIN` show `Using where; Using join buffer (hash join)` in MySQL 8.0+?",
    shortAnswer: "It indicates that the optimizer is executing an in-memory Hash Join between non-indexed tables rather than a slow Block Nested Loop.",
    explanation: "Hash joins provide major acceleration for unindexed joins.",
    hint: "Indicates in-memory Hash Join execution between tables.",
    level: "moderate"
  },
  {
    question: "How do you optimize an `INNER JOIN` between `students` and `enrollments`?",
    shortAnswer: "Ensure `enrollments(student_id)` has a secondary B-Tree index, and `students(student_id)` has a Primary Key index.",
    explanation: "Enables fast indexed lookup joins.",
    hint: "Index on enrollments(student_id) and primary key on students(student_id).",
    level: "basic"
  },
  {
    question: "What is the maximum number of tables that can be joined in a single MySQL query?",
    shortAnswer: "61 tables in a single join query.",
    explanation: "The architectural limit in MySQL's query parser.",
    hint: "Maximum limit is 61 tables in a single query.",
    level: "moderate"
  },
  {
    question: "What is the difference between a Straight Join (`STRAIGHT_JOIN`) and a standard `JOIN`?",
    shortAnswer: "`STRAIGHT_JOIN` forces the optimizer to join tables in the exact order specified in the `FROM` clause, overriding the optimizer's cost-based join reordering.",
    explanation: "Used only for specialized query tuning when optimizer chooses poorly.",
    hint: "Forces optimizer to join tables in the exact written order.",
    level: "expert"
  },
  {
    question: "Why should developers avoid writing correlated subqueries inside `JOIN ON` clauses?",
    shortAnswer: "Because it forces nested loop evaluations for every candidate row pair during join processing, causing severe execution stalling.",
    explanation: "Keep join ON predicates simple and indexed.",
    hint: "Causes severe nested loop overhead; keep ON predicates simple.",
    level: "expert"
  },
  {
    question: "How do you decide between a Subquery and a JOIN when writing a new query?",
    shortAnswer: "1. Need multi-table columns? -> Use JOIN. 2. Need set existence/exclusion without row multiplication? -> Use `IN` / `NOT EXISTS` subquery. 3. Need multi-stage aggregation? -> Use Derived Table JOIN or CTE.",
    explanation: "The universal 3-point architectural decision rule.",
    hint: "Multi-table columns = JOIN; Set existence = Subquery; Multi-stage = Derived Table / CTE.",
    level: "expert"
  },
  {
    question: "What is the effect of `optimizer_switch='semijoin=off'` in MySQL?",
    shortAnswer: "Disables subquery unnesting into semi-joins, forcing MySQL to evaluate subqueries using legacy dependent subquery nested loops.",
    explanation: "Useful for benchmarking optimization improvements.",
    hint: "Disables semi-join transformations, forcing legacy subquery execution.",
    level: "expert"
  },
  {
    question: "How do CTEs bridge the gap between Subqueries and JOINs?",
    shortAnswer: "CTEs provide the modular isolation and pre-aggregation benefits of subqueries with the clean, reusable relational syntax of JOINs.",
    explanation: "CTEs represent the modern unified query design paradigm.",
    hint: "Combines subquery modularity with reusable JOIN syntax.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for Subquery vs JOIN?",
    shortAnswer: "Use JOINs when projecting columns from multiple tables, use Semi-Join subqueries (`IN`/`EXISTS`) to test presence without row multiplication, use `NOT EXISTS` for NULL-safe anti-joins, and isolate heavy aggregations in derived tables or CTEs before joining.",
    explanation: "Authoritative architectural best practices for relational query construction.",
    hint: "JOIN for multi-table projections + IN/EXISTS for presence + NOT EXISTS for anti-join + CTE for pre-aggregation.",
    level: "expert"
  }
];

export default questions;
