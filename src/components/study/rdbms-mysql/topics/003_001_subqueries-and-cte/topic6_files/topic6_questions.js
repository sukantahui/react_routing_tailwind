// topic6_files/topic6_questions.js

const questions = [
  {
    question: "What is a Correlated UPDATE in SQL?",
    shortAnswer: "An `UPDATE` statement where the `SET` or `WHERE` clause contains a subquery referencing columns of the target table being modified.",
    explanation: "Allows dynamic per-row value assignments or conditional filtering based on related tables.",
    hint: "An UPDATE statement with a subquery referencing outer target table columns.",
    level: "basic"
  },
  {
    question: "What is a Correlated DELETE in SQL?",
    shortAnswer: "A `DELETE` statement where the `WHERE` clause contains a subquery (typically with `EXISTS` or `NOT EXISTS`) that references columns of the table from which rows are being deleted.",
    explanation: "Commonly used for selective orphan record purging.",
    hint: "A DELETE statement with a subquery referencing the target table to selectively purge rows.",
    level: "basic"
  },
  {
    question: "What causes MySQL `Error 1093 (HY000): You can't specify target table 'x' for update in FROM clause`?",
    shortAnswer: "Attempting to modify (UPDATE/DELETE) a table while directly reading from that exact same table inside a `FROM` or `WHERE` subquery in single-table syntax.",
    explanation: "MySQL prevents concurrent read/write locking conflicts on the same table.",
    hint: "Error 1093 occurs when selecting from the same table you are updating/deleting.",
    level: "expert"
  },
  {
    question: "How do you bypass Error 1093 using an intermediate Derived Table?",
    shortAnswer: "Wrap the inner subquery in an extra derived table (`(SELECT * FROM (SELECT ...) AS tmp)`), forcing MySQL to materialize the read result into a temporary buffer before modifying the target table.",
    explanation: "Materializing into a temporary buffer releases the read lock.",
    hint: "Wrap inner subquery in an extra derived table (SELECT * FROM (...) AS tmp).",
    level: "expert"
  },
  {
    question: "What is the modern, preferred alternative to bypassing Error 1093 in MySQL?",
    shortAnswer: "Using MySQL's Multi-Table `UPDATE ... JOIN` or `DELETE ... JOIN` syntax.",
    explanation: "Multi-table join syntax is cleaner, faster, and natively supported in MySQL.",
    hint: "Use Multi-Table UPDATE ... JOIN or DELETE ... JOIN syntax.",
    level: "expert"
  },
  {
    question: "How do you update student account balances dynamically from a `fee_payments` ledger table?",
    shortAnswer: "`UPDATE students s SET s.total_fees_paid_inr = (SELECT COALESCE(SUM(p.amount_paid_inr), 0.00) FROM fee_payments p JOIN enrollments e ON p.enrollment_id = e.enrollment_id WHERE e.student_id = s.student_id);`",
    explanation: "Correlated subquery in the SET clause computing per-student payment totals.",
    hint: "UPDATE students SET total_paid = (SELECT SUM(amount) WHERE student_id = s.student_id)",
    level: "basic"
  },
  {
    question: "How do you delete orphan student cart items that have no corresponding course in the catalog?",
    shortAnswer: "`DELETE FROM student_cart c WHERE NOT EXISTS (SELECT 1 FROM courses co WHERE co.course_id = c.course_id);`",
    explanation: "Safely purges orphan child records with NOT EXISTS.",
    hint: "DELETE FROM student_cart WHERE NOT EXISTS (SELECT 1 FROM courses ...)",
    level: "basic"
  },
  {
    question: "What happens if a correlated subquery in the `SET` clause evaluates to NULL for a row?",
    shortAnswer: "The target column is updated to `NULL` (or throws an error if the column is defined as `NOT NULL`).",
    explanation: "Always wrap aggregate subqueries in `COALESCE()` to provide safe fallback defaults like `0.00`.",
    hint: "Target column becomes NULL; use COALESCE to prevent unintended NULL assignments.",
    level: "moderate"
  },
  {
    question: "How do you update student statuses to 'Honors' only if they scored above their department's average score?",
    shortAnswer: "`UPDATE students s SET s.academic_tier = 'Honors' WHERE s.exam_score_pct > (SELECT AVG(i.exam_score_pct) FROM students_archive i WHERE i.dept_id = s.dept_id);`",
    explanation: "Correlated subquery in the WHERE clause.",
    hint: "UPDATE students s SET tier = 'Honors' WHERE score > (SELECT AVG(score) ... WHERE dept_id = s.dept_id)",
    level: "basic"
  },
  {
    question: "Can you update multiple columns simultaneously using separate correlated subqueries in MySQL?",
    shortAnswer: "YES; for example, `UPDATE students s SET s.last_payment_date = (SELECT MAX(...) ...), s.total_paid = (SELECT SUM(...) ...);`",
    explanation: "Multiple subqueries can appear in a single SET clause.",
    hint: "Yes, separate correlated subqueries can be assigned to different columns in SET.",
    level: "moderate"
  },
  {
    question: "Why should you wrap correlated DML operations inside explicit database transactions (`START TRANSACTION ... COMMIT`)?",
    shortAnswer: "To ensure atomicity: if an error occurs during multi-row updating, the transaction can be safely rolled back (`ROLLBACK`) without leaving the database in an inconsistent state.",
    explanation: "ACID transaction safety protects bulk DML updates.",
    hint: "Guarantees atomicity and allows rollback on failure.",
    level: "moderate"
  },
  {
    question: "What index is required to optimize `UPDATE students s SET total = (SELECT SUM(...) FROM fee_payments p WHERE p.student_id = s.student_id)`?",
    shortAnswer: "A secondary B-Tree index on `fee_payments(student_id, amount_paid_inr)`.",
    explanation: "Allows index-only aggregation seeks for each outer student row.",
    hint: "Covering index on fee_payments(student_id, amount_paid_inr).",
    level: "expert"
  },
  {
    question: "How do you write a multi-table UPDATE with a JOIN to synchronize department averages?",
    shortAnswer: "`UPDATE departments d JOIN (SELECT dept_id, AVG(exam_score_pct) AS avg_score FROM students GROUP BY dept_id) AS dt ON d.dept_id = dt.dept_id SET d.current_avg_score = dt.avg_score;`",
    explanation: "Multi-table JOIN UPDATE computes all averages in a single pass.",
    hint: "UPDATE departments d JOIN (SELECT ...) AS dt ON d.id = dt.id SET d.avg = dt.avg",
    level: "expert"
  },
  {
    question: "What is the syntax for a multi-table DELETE in MySQL?",
    shortAnswer: "`DELETE d FROM student_drafts d LEFT JOIN students s ON d.student_id = s.student_id WHERE s.student_id IS NULL;`",
    explanation: "Deletes rows from `student_drafts` matching the left anti-join condition.",
    hint: "DELETE d FROM drafts d LEFT JOIN students s ON d.id = s.id WHERE s.id IS NULL",
    level: "expert"
  },
  {
    question: "Can a correlated `DELETE` statement use `LIMIT` in MySQL?",
    shortAnswer: "A single-table `DELETE` can use `LIMIT`, but a multi-table `DELETE` syntax does NOT support the `LIMIT` clause in MySQL.",
    explanation: "Syntax constraint in MySQL multi-table DML.",
    hint: "Single-table DELETE supports LIMIT; multi-table DELETE does not.",
    level: "moderate"
  },
  {
    question: "How do student records for Mamata, Susmita, Abhronila, and Debangshu illustrate correlated UPDATEs?",
    shortAnswer: "By executing an end-of-term ledger batch update that calculates and stores lifetime tuition fee totals and academic tier statuses dynamically.",
    explanation: "Demonstrates practical production ledger synchronization.",
    hint: "Synchronizes lifetime fee totals and academic tier badges dynamically.",
    level: "basic"
  },
  {
    question: "What safety step should a developer take before executing a correlated `DELETE` in production?",
    shortAnswer: "Run an identical `SELECT` query first (e.g. `SELECT * FROM target WHERE NOT EXISTS (...)`) to inspect the exact candidate rows that will be deleted.",
    explanation: "Defensive database administration practice.",
    hint: "Run a SELECT query first with the identical WHERE clause to preview rows to be deleted.",
    level: "basic"
  },
  {
    question: "What happens if a correlated subquery in an `UPDATE ... WHERE` clause matches 0 rows for every outer row?",
    shortAnswer: "The `WHERE` condition evaluates to `FALSE` (or `UNKNOWN`) for all rows; zero rows are updated, and no error is raised.",
    explanation: "Safe no-op execution.",
    hint: "Zero rows are updated; no error is thrown.",
    level: "basic"
  },
  {
    question: "How do you archive and delete expired user sessions using `DELETE` with a correlated subquery?",
    shortAnswer: "`DELETE FROM user_sessions s WHERE s.last_activity < (SELECT MIN(login_time) FROM active_logins a WHERE a.user_id = s.user_id);`",
    explanation: "Deletes old session records based on correlated login milestones.",
    hint: "DELETE FROM sessions WHERE last_activity < (SELECT MIN(...) WHERE user_id = s.user_id)",
    level: "moderate"
  },
  {
    question: "Can a correlated subquery in an `UPDATE` statement reference tables in different database schemas?",
    shortAnswer: "YES; fully qualified table names (`db_name.table_name`) are permitted in subqueries across the same MySQL instance.",
    explanation: "Cross-schema DML references are supported.",
    hint: "Yes, using fully qualified schema.table syntax.",
    level: "moderate"
  },
  {
    question: "What is the row-locking behavior of a correlated `UPDATE` in InnoDB?",
    shortAnswer: "InnoDB places exclusive row locks (`X locks`) on all outer rows being updated, and shared read locks (`S locks`) on inner subquery rows.",
    explanation: "ACID concurrency locking mechanics during DML.",
    hint: "Exclusive locks on updated rows, shared read locks on subquery rows.",
    level: "expert"
  },
  {
    question: "How do you prevent deadlocks during massive bulk correlated UPDATEs?",
    shortAnswer: "Process updates in small chunked batches (e.g. 1,000 rows at a time) and ensure updates access rows in consistent Primary Key order.",
    explanation: "Batching and consistent ordering eliminate circular lock wait cycles.",
    hint: "Chunk updates into small batches and order by primary key.",
    level: "expert"
  },
  {
    question: "Can you use a Common Table Expression (CTE) inside an `UPDATE` statement in MySQL 8.0+?",
    shortAnswer: "YES; `WITH Summary AS (...) UPDATE students s JOIN Summary sum ON s.id = sum.id SET s.score = sum.avg_score;`",
    explanation: "CTEs are fully supported in MySQL 8.0+ multi-table UPDATE statements.",
    hint: "Yes, WITH CTE blocks can precede UPDATE ... JOIN statements.",
    level: "expert"
  },
  {
    question: "What does `ROW_COUNT()` return after executing a correlated UPDATE?",
    shortAnswer: "The number of rows that were actually modified (changed) by the UPDATE statement.",
    explanation: "Reports the DML affected row count.",
    hint: "Returns the number of rows actually changed by the UPDATE.",
    level: "basic"
  },
  {
    question: "How do you flag courses as 'INACTIVE' if they have received zero enrollments in the last 12 months?",
    shortAnswer: "`UPDATE courses c SET c.status = 'INACTIVE' WHERE NOT EXISTS (SELECT 1 FROM enrollments e WHERE e.course_id = c.course_id AND e.enrollment_date >= DATE_SUB(CURRENT_DATE, INTERVAL 12 MONTH));`",
    explanation: "Correlated DML state update with date range filter.",
    hint: "UPDATE courses SET status = 'INACTIVE' WHERE NOT EXISTS (SELECT 1 ... INTERVAL 12 MONTH)",
    level: "moderate"
  },
  {
    question: "Why should you never write unindexed correlated subqueries in large production `DELETE` operations?",
    shortAnswer: "It causes table-wide lock contention, long transaction runtimes, and massive redo/undo log bloat, degrading overall database responsiveness.",
    explanation: "DML operations hold locks for the entire duration of the query.",
    hint: "Causes long lock holding times and transaction log bloat.",
    level: "expert"
  },
  {
    question: "How do you delete duplicate student email records keeping only the lowest `student_id`?",
    shortAnswer: "`DELETE s1 FROM students s1 JOIN students s2 ON s1.email = s2.email AND s1.student_id > s2.student_id;`",
    explanation: "Multi-table self-join DELETE pattern for deduplication.",
    hint: "DELETE s1 FROM students s1 JOIN students s2 ON email matches AND s1.id > s2.id",
    level: "expert"
  },
  {
    question: "What check constraint or trigger is better than periodic correlated UPDATEs for keeping cached totals in sync?",
    shortAnswer: "An `AFTER INSERT/UPDATE/DELETE` trigger or an automated stored routine that updates parent ledger totals incrementally in real time.",
    explanation: "Incremental event-driven triggers eliminate the need for heavy periodic full-table scans.",
    hint: "AFTER INSERT/UPDATE/DELETE triggers for incremental real-time synchronization.",
    level: "expert"
  },
  {
    question: "What does `EXPLAIN UPDATE` show in MySQL 8.0+?",
    shortAnswer: "The execution plan for the DML statement, showing access types (`ALL`, `range`, `ref`) and lock evaluation paths.",
    explanation: "Profiles DML query execution prior to execution.",
    hint: "Displays access types and execution plans for UPDATE statements.",
    level: "moderate"
  },
  {
    question: "What is the senior architect's summary rule for Correlated UPDATE and DELETE statements?",
    shortAnswer: "Test queries with SELECT first, wrap DML in transactions, use Multi-Table JOIN syntax or derived tables to eliminate Error 1093, index subquery correlation keys, and batch large volume modifications to prevent lock contention.",
    explanation: "Authoritative architectural best practices for correlated database modifications.",
    hint: "Test with SELECT + wrap in transactions + eliminate Error 1093 + index keys + chunk in batches.",
    level: "expert"
  }
];

export default questions;
