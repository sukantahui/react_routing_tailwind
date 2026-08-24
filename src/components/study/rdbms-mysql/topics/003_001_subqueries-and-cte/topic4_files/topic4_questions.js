// topic4_files/topic4_questions.js

const questions = [
  {
    question: "What is a Correlated Subquery in SQL?",
    shortAnswer: "An inner subquery that contains references to one or more columns declared in the outer parent query block.",
    explanation: "Because of this dependency, it cannot execute independently of the outer row context.",
    hint: "An inner query that references outer query columns and depends on its row context.",
    level: "basic"
  },
  {
    question: "Why cannot a correlated subquery be executed as a standalone independent query?",
    shortAnswer: "Because it contains outer column aliases (e.g. `o.dept_id`) that are undefined outside the enclosing parent query.",
    explanation: "Requires outer row parameter values to evaluate.",
    hint: "Contains outer column references that do not exist outside the parent query.",
    level: "basic"
  },
  {
    question: "How is a Correlated Subquery conceptually executed by the database engine?",
    shortAnswer: "It is evaluated iteratively row-by-row: for every candidate row fetched by the outer query, the inner query is executed with that row's parameter values.",
    explanation: "Operates like a nested for-loop in traditional programming.",
    hint: "Evaluated iteratively for each candidate row processed by the outer query.",
    level: "basic"
  },
  {
    question: "What is the computational time complexity of an unindexed correlated subquery on two tables of size $N$ and $M$?",
    shortAnswer: "$O(N \\times M)$ nested loop complexity.",
    explanation: "Without indexes, every outer row forces a full table scan of the inner table.",
    hint: "O(N x M) full table scan nested loop complexity.",
    level: "moderate"
  },
  {
    question: "How do you find all students who scored above their OWN department's average score?",
    shortAnswer: "`SELECT s.student_name, s.exam_score_pct FROM students s WHERE s.exam_score_pct > (SELECT AVG(i.exam_score_pct) FROM students i WHERE i.dept_id = s.dept_id);`",
    explanation: "Uses a correlated subquery linked on `i.dept_id = s.dept_id`.",
    hint: "Correlated subquery with WHERE i.dept_id = s.dept_id in the inner query.",
    level: "basic"
  },
  {
    question: "What index is required to optimize `WHERE s.score > (SELECT AVG(i.score) FROM students i WHERE i.dept_id = s.dept_id)`?",
    shortAnswer: "A composite B-Tree index on `students (dept_id, score)`.",
    explanation: "Enables fast index range seeks per outer department without full table scans.",
    hint: "Composite index on (dept_id, score).",
    level: "expert"
  },
  {
    question: "How did developers find the Top 2 students per department before MySQL 8.0 Window Functions were introduced?",
    shortAnswer: "Using a correlated subquery counting peers with higher scores: `WHERE (SELECT COUNT(*) FROM students i WHERE i.dept_id = s.dept_id AND i.score > s.score) < 2;`",
    explanation: "Classic relational division pattern for top-N ranking per category.",
    hint: "Count peers in the same department scoring higher than the current student (< N).",
    level: "expert"
  },
  {
    question: "How is the Top N per category query above refactored in modern MySQL 8.0+ for maximum performance?",
    shortAnswer: "Using the `DENSE_RANK()` window function inside a CTE: `WITH Ranked AS (SELECT *, DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY score DESC) AS rnk FROM students) SELECT * FROM Ranked WHERE rnk <= 2;`",
    explanation: "Executes in a single linear sorting pass ($O(N \\log N)$) instead of nested loops.",
    hint: "Refactor with DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY score DESC).",
    level: "expert"
  },
  {
    question: "What does `EXPLAIN` show for a correlated subquery in the `WHERE` clause?",
    shortAnswer: "`select_type = DEPENDENT SUBQUERY`.",
    explanation: "Indicates that the subquery depends on outer row variables and is evaluated per row.",
    hint: "Shows select_type = DEPENDENT SUBQUERY in EXPLAIN output.",
    level: "moderate"
  },
  {
    question: "What is the difference between `select_type = SUBQUERY` and `select_type = DEPENDENT SUBQUERY` in `EXPLAIN`?",
    shortAnswer: "`SUBQUERY` indicates a non-correlated subquery evaluated once; `DEPENDENT SUBQUERY` indicates a correlated subquery evaluated repeatedly per outer row.",
    explanation: "Key indicator for query optimization profiling.",
    hint: "SUBQUERY runs once; DEPENDENT SUBQUERY runs per outer row.",
    level: "moderate"
  },
  {
    question: "Can a correlated subquery be placed in the `SELECT` projection list?",
    shortAnswer: "YES; for example, `SELECT s.name, (SELECT MAX(p.payment_date) FROM fee_payments p JOIN enrollments e ON p.enrollment_id = e.enrollment_id WHERE e.student_id = s.student_id) AS last_paid FROM students s;`",
    explanation: "Fetches dynamic single attributes per outer row.",
    hint: "Yes, to compute scalar attributes per outer row.",
    level: "basic"
  },
  {
    question: "What is the performance danger of placing a correlated subquery in the `SELECT` list across 1,000,000 outer rows?",
    shortAnswer: "It triggers 1,000,000 individual query lookups, which can freeze application databases; it should be rewritten as a `LEFT JOIN` with `GROUP BY`.",
    explanation: "Avoids 1M round-trip evaluations by using a single join.",
    hint: "Fires 1M times; should be rewritten as a LEFT JOIN with GROUP BY.",
    level: "expert"
  },
  {
    question: "How do you find all employees who earn more than their own direct manager using a correlated subquery?",
    shortAnswer: "`SELECT e.emp_name, e.salary FROM employees e WHERE e.salary > (SELECT m.salary FROM employees m WHERE m.emp_id = e.manager_id);`",
    explanation: "Compares the employee's salary against their manager's salary dynamically.",
    hint: "WHERE e.salary > (SELECT m.salary FROM employees m WHERE m.emp_id = e.manager_id)",
    level: "basic"
  },
  {
    question: "Can a correlated subquery reference multiple nested outer query blocks?",
    shortAnswer: "YES; an inner subquery can reference column identifiers from any of its enclosing ancestor outer query blocks.",
    explanation: "Lexical scoping applies to nested SQL query blocks.",
    hint: "Yes, inner queries can reference any enclosing ancestor outer query block.",
    level: "moderate"
  },
  {
    question: "What is the role of table aliases in correlated subqueries?",
    shortAnswer: "Aliases (e.g. `s` for outer students, `i` for inner students) are mandatory to disambiguate identical column names between outer and inner tables.",
    explanation: "Without explicit aliases, MySQL defaults to resolving columns in the local inner scope.",
    hint: "Mandatory to distinguish outer columns from inner columns.",
    level: "basic"
  },
  {
    question: "What happens if you omit the outer alias in a correlated subquery like `WHERE score > (SELECT AVG(score) FROM students WHERE dept_id = dept_id)`?",
    shortAnswer: "`dept_id = dept_id` is resolved purely against the inner table, evaluating to TRUE for all rows, breaking the correlation link and calculating the global average instead!",
    explanation: "A classic SQL scoping bug resulting from missing outer aliases.",
    hint: "Resolves locally to inner table, breaking the correlation link.",
    level: "expert"
  },
  {
    question: "How do student scores for Mamata, Susmita, Abhronila, and Debangshu demonstrate department-level correlated subqueries?",
    shortAnswer: "Mamata (94.50%) and Susmita (88.00%) are compared against the Computer Science average (91.25%), while Abhronila (96.20%) is compared against the Information Tech average (89.30%).",
    explanation: "Demonstrates localized group benchmark evaluations.",
    hint: "Compares each student against their specific department's average rather than the global average.",
    level: "basic"
  },
  {
    question: "Can correlated subqueries be used in `UPDATE` statements?",
    shortAnswer: "YES; for example, `UPDATE students s SET s.dept_standing = 'Above Average' WHERE s.exam_score_pct > (SELECT AVG(i.exam_score_pct) FROM students_archive i WHERE i.dept_id = s.dept_id);`",
    explanation: "Updates records conditionally based on correlated aggregate lookups.",
    hint: "Yes, correlated WHERE subqueries are valid in UPDATE statements.",
    level: "moderate"
  },
  {
    question: "Can correlated subqueries be used in `DELETE` statements?",
    shortAnswer: "YES; for example, `DELETE FROM student_drafts d WHERE NOT EXISTS (SELECT 1 FROM students s WHERE s.student_id = d.student_id);`",
    explanation: "Prunes orphan records using correlated existence checks.",
    hint: "Yes, commonly used with NOT EXISTS to delete orphan records.",
    level: "moderate"
  },
  {
    question: "What is Subquery Correlation Elimination (Unnesting)?",
    shortAnswer: "An optimizer rewrite technique where the MySQL query optimizer automatically transforms a correlated subquery into an equivalent `INNER JOIN` or `SEMI-JOIN`.",
    explanation: "Converts nested loop execution plans into fast hash or merge joins.",
    hint: "Optimizer rewrites correlated subqueries into equivalent joins.",
    level: "expert"
  },
  {
    question: "How do you find the most recent fee payment record for each student using a correlated subquery?",
    shortAnswer: "`SELECT p.* FROM fee_payments p WHERE p.payment_date = (SELECT MAX(p2.payment_date) FROM fee_payments p2 WHERE p2.student_id = p.student_id);`",
    explanation: "Matches the maximum payment timestamp per student partition.",
    hint: "WHERE payment_date = (SELECT MAX(payment_date) WHERE student_id = p.student_id)",
    level: "moderate"
  },
  {
    question: "Why does `SELECT s.* FROM students s WHERE s.exam_score_pct = (SELECT MAX(i.exam_score_pct) FROM students i WHERE i.dept_id = s.dept_id)` execute faster with an index on `(dept_id, exam_score_pct)`?",
    shortAnswer: "The B-Tree index is sorted by `dept_id` first and `exam_score_pct` second; the engine can jump straight to the last key for that `dept_id` to find `MAX()` in $O(1)$ time.",
    explanation: "Leverages index ordering to find extreme values instantly.",
    hint: "Index is sorted, so MAX() is found instantly at the end of the department index partition.",
    level: "expert"
  },
  {
    question: "What is the difference between a Correlated Subquery and a Lateral Derived Table (`LATERAL`)?",
    shortAnswer: "A correlated subquery in WHERE/SELECT returns a scalar or boolean; a `LATERAL` derived table in `FROM` can return multiple correlated rows and columns per outer row.",
    explanation: "LATERAL enables table-valued correlated functions in SQL.",
    hint: "LATERAL allows correlated multi-row and multi-column tables in the FROM clause.",
    level: "expert"
  },
  {
    question: "Can a correlated subquery return multiple rows when used with the `=` comparison operator?",
    shortAnswer: "NO; it throws `Error 1242 (Subquery returns more than 1 row)`. Scalar comparison operators require at most 1 row returned per outer row evaluation.",
    explanation: "Scalar rules apply to correlated subqueries as well.",
    hint: "No, throws Error 1242; must return at most 1 row per outer row.",
    level: "basic"
  },
  {
    question: "How do you check if a correlated subquery in the `SELECT` list produces NULL values for some outer rows?",
    shortAnswer: "Wrap the subquery in `COALESCE((SELECT ...), 0.00)` to provide safe fallback defaults.",
    explanation: "Defends against empty correlation matches.",
    hint: "Wrap with COALESCE to handle unmatched outer rows safely.",
    level: "basic"
  },
  {
    question: "What is the memory impact of executing a correlated subquery across large datasets?",
    shortAnswer: "Correlated subqueries typically have low memory footprints because they evaluate per row, but they consume high CPU cycles due to repeated loop invocations.",
    explanation: "CPU-bound rather than memory-bound.",
    hint: "Low memory usage, but high CPU consumption from repeated executions.",
    level: "moderate"
  },
  {
    question: "Why should developers prefer `EXISTS` over `COUNT(*) > 0` in correlated subqueries?",
    shortAnswer: "`EXISTS` short-circuits on the FIRST matching row, whereas `COUNT(*) > 0` scans all matching rows in the inner table before returning.",
    explanation: "Short-circuiting saves significant I/O.",
    hint: "EXISTS short-circuits on the first match; COUNT(*) scans all matches.",
    level: "expert"
  },
  {
    question: "How do you find all courses that have a higher fee than the average fee of courses in the SAME category?",
    shortAnswer: "`SELECT c.course_title, c.base_fee_inr FROM courses c WHERE c.base_fee_inr > (SELECT AVG(c2.base_fee_inr) FROM courses c2 WHERE c2.category_id = c.category_id);`",
    explanation: "Correlates on `category_id`.",
    hint: "WHERE c.base_fee_inr > (SELECT AVG(c2.base_fee_inr) WHERE c2.category_id = c.category_id)",
    level: "basic"
  },
  {
    question: "What query rewrite tool in MySQL Workbench helps identify correlated subquery bottlenecks?",
    shortAnswer: "`Visual Explain` and `EXPLAIN ANALYZE`, which highlight `DEPENDENT SUBQUERY` nodes and count actual loop executions.",
    explanation: "Visualizes loop counts and execution cost.",
    hint: "Visual Explain and EXPLAIN ANALYZE display loop counts and cost.",
    level: "moderate"
  },
  {
    question: "What is the senior architect's summary rule for Correlated Subqueries?",
    shortAnswer: "Understand the nested loop row-by-row lifecycle, always alias outer and inner tables clearly to prevent scoping bugs, index correlation columns with composite indexes, and refactor heavy correlated subqueries into Window Functions or JOINs.",
    explanation: "Authoritative architectural summary of correlated subquery engineering.",
    hint: "Nested loop lifecycle + explicit aliases + composite index + refactor to Window Functions.",
    level: "expert"
  }
];

export default questions;
