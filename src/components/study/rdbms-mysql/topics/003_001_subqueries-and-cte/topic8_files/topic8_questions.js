// topic8_files/topic8_questions.js

const questions = [
  {
    question: "What is a Common Table Expression (CTE) in MySQL?",
    shortAnswer: "A temporary named result set defined within the execution scope of a single SQL statement using the `WITH` clause (introduced in MySQL 8.0).",
    explanation: "CTEs provide linear, modular query construction.",
    hint: "A temporary named result set defined with the WITH clause in a single query.",
    level: "basic"
  },
  {
    question: "Which keyword is used to declare a Common Table Expression in SQL?",
    shortAnswer: "The `WITH` keyword.",
    explanation: "Placed at the very beginning of the SQL statement.",
    hint: "The WITH keyword.",
    level: "basic"
  },
  {
    question: "What is the lifespan/scope of a Common Table Expression?",
    shortAnswer: "It exists ONLY for the duration of the single SQL statement in which it is defined; it is automatically discarded as soon as the query completes.",
    explanation: "Does not persist across subsequent queries or database sessions.",
    hint: "Exists only for the duration of that single query statement.",
    level: "basic"
  },
  {
    question: "What is the difference between a Database View and a Common Table Expression?",
    shortAnswer: "A View is a permanent stored schema catalog object accessible by all sessions; a CTE is an ephemeral, query-scoped construct defined inline.",
    explanation: "Views are permanent; CTEs are query-scoped.",
    hint: "Views are stored schema objects; CTEs exist only for one query.",
    level: "basic"
  },
  {
    question: "What is the major readability advantage of CTEs over nested derived tables?",
    shortAnswer: "CTEs structure complex transformations linearly from top to bottom, whereas nested derived tables require reading inside-out.",
    explanation: "Eliminates deeply nested parenthesis structures.",
    hint: "Reads linearly from top to bottom instead of nested inside-out.",
    level: "basic"
  },
  {
    question: "Can a single CTE be referenced multiple times within the same SQL statement?",
    shortAnswer: "YES; a single CTE can be referenced multiple times (e.g. self-joining against the CTE or in UNION blocks) without duplicating its definition.",
    explanation: "A major advantage over derived tables, which must be repeated.",
    hint: "Yes, can be referenced multiple times in the same query.",
    level: "basic"
  },
  {
    question: "What happens if you reference a derived table multiple times in a query vs a CTE?",
    shortAnswer: "A derived table must be copied and pasted in every clause where it is needed; a CTE is written once and referenced by its name everywhere.",
    explanation: "CTEs adhere to the DRY (Don't Repeat Yourself) principle.",
    hint: "Derived tables must be copy-pasted; CTEs are written once and reused.",
    level: "basic"
  },
  {
    question: "Which DML statements in MySQL 8.0 support the `WITH` CTE clause?",
    shortAnswer: "`SELECT`, `INSERT INTO ... SELECT`, `UPDATE ... JOIN`, and `DELETE ... JOIN` statements.",
    explanation: "CTEs are fully supported across all major SQL DML operations.",
    hint: "SELECT, INSERT, UPDATE, and DELETE statements.",
    level: "moderate"
  },
  {
    question: "How do you specify explicit column aliases in a CTE header?",
    shortAnswer: "`WITH cte_name (col1, col2, col3) AS (SELECT ...) SELECT ...`",
    explanation: "Defines output column names in the CTE header declaration.",
    hint: "WITH cte_name (alias1, alias2) AS (SELECT ...)",
    level: "moderate"
  },
  {
    question: "What is 'CTE Materialization' in MySQL 8.0?",
    shortAnswer: "The query optimizer evaluates the CTE once and writes the distinct result into an in-memory temporary table for fast reuse.",
    explanation: "Optimizes CTEs that are referenced multiple times or contain aggregates.",
    hint: "Evaluates the CTE once and caches the result in an in-memory temporary table.",
    level: "expert"
  },
  {
    question: "What is 'CTE Inlining / Merging' in MySQL 8.0?",
    shortAnswer: "The query optimizer merges the CTE definition directly into the outer query block without creating temporary tables in memory.",
    explanation: "Reduces overhead for simple CTEs.",
    hint: "Merges the CTE directly into the outer query block without temporary tables.",
    level: "expert"
  },
  {
    question: "How can a developer force MySQL to materialize a CTE in memory?",
    shortAnswer: "Using the optimizer hint `/*+ NO_MERGE(cte_name) */`.",
    explanation: "Prevents inlining and forces materialization.",
    hint: "Optimizer hint /*+ NO_MERGE(cte_name) */.",
    level: "expert"
  },
  {
    question: "How can a developer force MySQL to merge / inline a CTE?",
    shortAnswer: "Using the optimizer hint `/*+ MERGE(cte_name) */`.",
    explanation: "Forces the optimizer to merge the CTE into the outer query.",
    hint: "Optimizer hint /*+ MERGE(cte_name) */.",
    level: "expert"
  },
  {
    question: "How do student records for Mamata, Susmita, Abhronila, and Debangshu demonstrate basic CTEs?",
    shortAnswer: "By extracting active student scores and tuition fee payments in a `WITH StudentSummary AS (...)` block and performing final grading in the main query.",
    explanation: "Demonstrates modular separation of data extraction and presentation.",
    hint: "Extracts summary in a WITH block and projects final grades in the main SELECT.",
    level: "basic"
  },
  {
    question: "Can a CTE be used inside a View definition (`CREATE VIEW ... AS WITH ...`)?",
    shortAnswer: "YES; MySQL 8.0 allows `CREATE VIEW view_name AS WITH cte AS (...) SELECT ... FROM cte;`.",
    explanation: "Enables highly readable stored views.",
    hint: "Yes, Views can encapsulate WITH CTE queries.",
    level: "moderate"
  },
  {
    question: "What is the maximum number of non-recursive CTEs that can be defined in a single `WITH` clause?",
    shortAnswer: "There is no explicit hardcoded limit (subject only to query text length and server memory limits).",
    explanation: "Allows chaining dozens of modular transformation steps.",
    hint: "No explicit limit; bounded only by memory and query length.",
    level: "moderate"
  },
  {
    question: "What does `EXPLAIN` show for a materialized CTE?",
    shortAnswer: "The execution plan displays `select_type = MATERIALIZED` or references `<subqueryN>` / `<derivedN>` for the temporary table.",
    explanation: "Shows how the optimizer handled CTE evaluation.",
    hint: "Shows select_type = MATERIALIZED in EXPLAIN output.",
    level: "moderate"
  },
  {
    question: "How do you write a simple CTE to filter students with scores above 90%?",
    shortAnswer: "`WITH TopStudents AS (SELECT * FROM students WHERE exam_score_pct >= 90.00) SELECT student_name, exam_score_pct FROM TopStudents;`",
    explanation: "Clean two-stage query structure.",
    hint: "WITH TopStudents AS (SELECT ...) SELECT * FROM TopStudents;",
    level: "basic"
  },
  {
    question: "Can a CTE reference a table that has indexes?",
    shortAnswer: "YES; the inner query inside a CTE utilizes all existing indexes on physical base tables normally.",
    explanation: "Index seeks and scans work identically inside CTEs.",
    hint: "Yes, queries inside CTEs utilize base table indexes normally.",
    level: "basic"
  },
  {
    question: "Does an in-memory materialized CTE automatically have secondary indexes created on it?",
    shortAnswer: "NO; by default, temporary materialized tables created for CTEs do not have secondary B-Tree indexes unless automatically hashed for equality joins.",
    explanation: "Consider base table indexes or merging for large CTE datasets.",
    hint: "No, materialized CTE temporary tables do not have user-defined secondary indexes.",
    level: "expert"
  },
  {
    question: "Why was the introduction of CTEs in MySQL 8.0 considered a major milestone?",
    shortAnswer: "Because it brought MySQL up to full ANSI SQL standard compliance for advanced analytics, eliminating verbose nested derived tables and enabling recursive graph queries.",
    explanation: "Revolutionized query architecture in modern MySQL.",
    hint: "Enabled modern modular SQL and recursive hierarchical traversal.",
    level: "basic"
  },
  {
    question: "Can you perform a self-join on a CTE?",
    shortAnswer: "YES; for example, `WITH Emp AS (SELECT * FROM employees) SELECT e.name, m.name FROM Emp e JOIN Emp m ON e.manager_id = m.emp_id;`",
    explanation: "Reuses the single CTE definition twice in a self-join.",
    hint: "Yes, you can join a CTE against itself using distinct table aliases.",
    level: "moderate"
  },
  {
    question: "What happens if a CTE name matches an existing physical table name in the database?",
    shortAnswer: "The CTE shadows (overrides) the physical table name within the local scope of that query statement.",
    explanation: "Local lexical scope takes precedence over global schema tables.",
    hint: "The CTE overrides the physical table name within that query.",
    level: "expert"
  },
  {
    question: "How do you calculate the difference between each student's score and the department average using a CTE?",
    shortAnswer: "`WITH DeptAvg AS (SELECT dept_id, AVG(exam_score_pct) AS avg_s FROM students GROUP BY dept_id) SELECT s.first_name, s.exam_score_pct, (s.exam_score_pct - da.avg_s) AS diff FROM students s JOIN DeptAvg da ON s.dept_id = da.dept_id;`",
    explanation: "Pre-aggregates in CTE and joins in the main query.",
    hint: "Compute department average in CTE and join in main query.",
    level: "moderate"
  },
  {
    question: "Can you insert data into a physical table directly from a CTE?",
    shortAnswer: "YES; `INSERT INTO honors_students (id, name, score) WITH Ranked AS (SELECT id, name, score FROM students WHERE score >= 90) SELECT * FROM Ranked;`",
    explanation: "WITH clause precedes INSERT INTO ... SELECT in MySQL 8.0.",
    hint: "Yes, WITH clause can precede INSERT INTO ... SELECT.",
    level: "moderate"
  },
  {
    question: "What is the syntax error if you forget parentheses around the CTE query block?",
    shortAnswer: "MySQL throws `Error 1064 (42000): You have an error in your SQL syntax near ...` because the `AS (SELECT ...)` syntax requires enclosing parentheses.",
    explanation: "Parentheses are mandatory in CTE syntax.",
    hint: "Throws Error 1064; AS (SELECT ...) requires parentheses.",
    level: "basic"
  },
  {
    question: "Can a CTE query contain Window Functions?",
    shortAnswer: "YES; combining Window Functions inside CTEs is the primary industry standard pattern for Top-N per category and running total queries.",
    explanation: "The ultimate analytical SQL combination.",
    hint: "Yes, Window Functions inside CTEs are standard industry practice.",
    level: "moderate"
  },
  {
    question: "How does a CTE improve debugging during complex query development?",
    shortAnswer: "You can test each CTE block in isolation by simply writing `SELECT * FROM cte_step1;` or `SELECT * FROM cte_step2;` to verify intermediate results at each pipeline stage.",
    explanation: "Enables rapid incremental debugging.",
    hint: "Allows testing intermediate stages by querying individual CTE blocks directly.",
    level: "basic"
  },
  {
    question: "What is the difference between a Non-Recursive CTE and a Recursive CTE?",
    shortAnswer: "A Non-Recursive CTE executes a static query without referencing itself; a Recursive CTE references its own name to iteratively generate sequences or traverse hierarchies.",
    explanation: "Recursive CTEs include `RECURSIVE` keyword and anchor/recursive members.",
    hint: "Non-recursive CTEs evaluate once; recursive CTEs reference themselves iteratively.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for Common Table Expressions?",
    shortAnswer: "Use CTEs with the `WITH` clause to structure complex queries linearly, reuse intermediate sets without duplicating code, combine with window functions for analytics, and rely on MySQL 8.0 optimizer merging for high performance.",
    explanation: "Authoritative architectural best practices for CTE adoption.",
    hint: "Linear structure + single definition reuse + combine with window functions + optimizer merging.",
    level: "expert"
  }
];

export default questions;
