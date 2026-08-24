// topic1_files/topic1_questions.js

const questions = [
  {
    question: "What is a Single-Row Subquery in SQL?",
    shortAnswer: "An inner subquery that returns exactly ONE row and ONE column (a single 1x1 scalar value).",
    explanation: "Because it produces a single scalar value, it can be used with standard comparison operators.",
    hint: "Returns exactly one value (1 row by 1 column).",
    level: "basic"
  },
  {
    question: "Which comparison operators can be used with Single-Row Subqueries?",
    shortAnswer: "Standard scalar comparison operators: `=`, `<>`, `!=`, `>`, `>=`, `<`, and `<=`. ",
    explanation: "These operators expect a single scalar operand on either side.",
    hint: "=, !=, <>, >, >=, <, <=",
    level: "basic"
  },
  {
    question: "What error is triggered if a single-row subquery returns multiple rows when evaluated with `=`?",
    shortAnswer: "`Error 1242 (21000): Subquery returns more than 1 row`.",
    explanation: "MySQL cannot compare a single scalar value against a set of multiple rows using scalar operators.",
    hint: "Error 1242: Subquery returns more than 1 row.",
    level: "basic"
  },
  {
    question: "How do you write a query to find the student(s) with the highest exam score in the academy?",
    shortAnswer: "`SELECT student_name, exam_score_pct FROM students WHERE exam_score_pct = (SELECT MAX(exam_score_pct) FROM students);`",
    explanation: "Uses `MAX()` in a scalar subquery to find matching records dynamically.",
    hint: "WHERE exam_score_pct = (SELECT MAX(exam_score_pct) FROM students)",
    level: "basic"
  },
  {
    question: "How do you find all students enrolled in the same department as 'Mamata'?",
    shortAnswer: "`SELECT student_name FROM students WHERE dept_id = (SELECT dept_id FROM students WHERE first_name = 'Mamata' LIMIT 1);`",
    explanation: "Looks up Mamata's department ID dynamically in the subquery.",
    hint: "WHERE dept_id = (SELECT dept_id FROM students WHERE first_name = 'Mamata' LIMIT 1)",
    level: "basic"
  },
  {
    question: "What happens if the subquery in `WHERE exam_score > (SELECT ...)` returns zero rows (`EMPTY SET`)?",
    shortAnswer: "The subquery evaluates to `NULL`, and `WHERE exam_score > NULL` evaluates to `UNKNOWN`, resulting in zero matched rows in the outer query.",
    explanation: "In SQL three-valued logic, comparisons with NULL yield UNKNOWN.",
    hint: "Evaluates to NULL; comparison yields UNKNOWN and returns no rows.",
    level: "moderate"
  },
  {
    question: "How can you provide a safe fallback default if a single-row subquery might return zero rows?",
    shortAnswer: "Wrap the subquery in `COALESCE((SELECT ...), default_val)`.",
    explanation: "Ensures the outer query receives a valid non-null comparison operand.",
    hint: "Wrap with COALESCE((SELECT ...), default_val).",
    level: "moderate"
  },
  {
    question: "Why is `LIMIT 1` recommended when writing single-row subqueries on non-unique columns?",
    shortAnswer: "To prevent runtime Error 1242 if unexpected duplicate matching records exist in the database.",
    explanation: "Defensive SQL programming against unexpected duplicates.",
    hint: "Guarantees at most 1 row is returned to avoid Error 1242.",
    level: "moderate"
  },
  {
    question: "Can a single-row subquery be used in an `HAVING` clause?",
    shortAnswer: "YES; for example, `HAVING AVG(salary) > (SELECT AVG(salary) FROM employees)`.",
    explanation: "Allows filtering aggregated groups against global scalar benchmarks.",
    hint: "Yes, to filter aggregated groups against scalar benchmarks.",
    level: "moderate"
  },
  {
    question: "How do you find all courses whose tuition fee is strictly less than the average course fee?",
    shortAnswer: "`SELECT course_title, base_fee_inr FROM courses WHERE base_fee_inr < (SELECT AVG(base_fee_inr) FROM courses);`",
    explanation: "Computes the average course fee in the subquery and filters in the outer query.",
    hint: "WHERE base_fee_inr < (SELECT AVG(base_fee_inr) FROM courses)",
    level: "basic"
  },
  {
    question: "Can a single-row subquery be placed on the LEFT side of a comparison operator?",
    shortAnswer: "YES; `(SELECT AVG(score) FROM students) < 80.00` is syntactically valid in SQL, though placing the column on the left is more common.",
    explanation: "Scalar subqueries can appear on either side of comparison operators.",
    hint: "Yes, scalar subqueries can appear on either side of operators.",
    level: "moderate"
  },
  {
    question: "What is the difference between `= (SELECT ...)` and `IN (SELECT ...)`?",
    shortAnswer: "`=` requires the subquery to return at most ONE row (scalar), whereas `IN` can accept any number of rows (zero, one, or many).",
    explanation: "IN is safe for multi-row result sets; = causes Error 1242 on multi-row output.",
    hint: "= requires a single row; IN accepts multiple rows.",
    level: "basic"
  },
  {
    question: "How do you find students whose exam score is equal to the SECOND highest score in the academy?",
    shortAnswer: "`SELECT student_name, exam_score_pct FROM students WHERE exam_score_pct = (SELECT MAX(exam_score_pct) FROM students WHERE exam_score_pct < (SELECT MAX(exam_score_pct) FROM students));`",
    explanation: "Uses nested single-row subqueries to find the 2nd maximum.",
    hint: "Find MAX score that is strictly less than the global MAX score.",
    level: "expert"
  },
  {
    question: "How do you find the student who made the most recent fee payment in the academy?",
    shortAnswer: "`SELECT s.student_name, p.payment_date, p.amount_paid_inr FROM students s JOIN enrollments e ON s.student_id = e.student_id JOIN fee_payments p ON e.enrollment_id = p.enrollment_id WHERE p.payment_date = (SELECT MAX(payment_date) FROM fee_payments);`",
    explanation: "Matches the maximum payment timestamp.",
    hint: "WHERE payment_date = (SELECT MAX(payment_date) FROM fee_payments)",
    level: "basic"
  },
  {
    question: "What happens if you use `<> (SELECT col FROM table)` and the subquery returns multiple rows?",
    shortAnswer: "MySQL aborts execution with `Error 1242: Subquery returns more than 1 row`.",
    explanation: "To check if a value is not equal to any value in a multi-row set, `NOT IN` or `<> ALL` must be used.",
    hint: "Throws Error 1242; use NOT IN instead.",
    level: "basic"
  },
  {
    question: "Can a single-row subquery contain an `ORDER BY` clause?",
    shortAnswer: "YES; it is often used with `ORDER BY column DESC LIMIT 1` to pick the single top record.",
    explanation: "Selects the extreme record using explicit sorting.",
    hint: "Yes, frequently combined with ORDER BY and LIMIT 1.",
    level: "basic"
  },
  {
    question: "How do you find all employees who earn more than their department's manager?",
    shortAnswer: "Using a correlated single-row subquery: `WHERE e.salary > (SELECT m.salary FROM employees m WHERE m.emp_id = e.manager_id)`.",
    explanation: "Evaluates the manager's scalar salary per employee row.",
    hint: "Correlated subquery fetching the manager's salary for each employee.",
    level: "expert"
  },
  {
    question: "How do you write a single-row subquery in an `UPDATE` statement?",
    shortAnswer: "`UPDATE students SET scholarship_tier = 'Gold' WHERE exam_score_pct = (SELECT MAX(exam_score_pct) FROM students_archive);`",
    explanation: "Updates rows matching a dynamic scalar value from another table.",
    hint: "UPDATE ... WHERE col = (SELECT MAX(...) FROM ...)",
    level: "moderate"
  },
  {
    question: "What is the result of `WHERE (SELECT COUNT(*) FROM students WHERE status = 'ACTIVE') > 100`?",
    shortAnswer: "It acts as a table-level condition: if total active students exceed 100, the outer query evaluates normally; otherwise, it returns an empty set.",
    explanation: "Useful for conditional query execution gates.",
    hint: "Acts as a global gate condition based on student count.",
    level: "moderate"
  },
  {
    question: "Why is `SELECT * FROM students WHERE exam_score_pct > (SELECT AVG(exam_score_pct) FROM students)` executed efficiently in MySQL?",
    shortAnswer: "Because it is non-correlated; the inner average is calculated once in Phase 1 and cached, enabling a fast index range seek in Phase 2.",
    explanation: "Non-correlated subqueries avoid row-by-row re-evaluation.",
    hint: "Calculated once in Phase 1 and cached for the outer query.",
    level: "basic"
  },
  {
    question: "How do student scores for Mamata, Susmita, Abhronila, and Debangshu demonstrate single-row comparisons?",
    shortAnswer: "By comparing each student's score against the academy's dynamic benchmark score: Abhronila (96.20%) and Mamata (94.50%) qualify as above the 84.50% average.",
    explanation: "Demonstrates practical performance classification using scalar benchmarks.",
    hint: "Classifies students based on whether their score exceeds the scalar average.",
    level: "basic"
  },
  {
    question: "What index optimizes `WHERE exam_score_pct > (SELECT AVG(exam_score_pct) FROM students)`?",
    shortAnswer: "A secondary B-Tree index on `students(exam_score_pct)`.",
    explanation: "Allows both fast calculation of AVG() via index-only scan and fast range seek in the outer query.",
    hint: "B-Tree index on exam_score_pct.",
    level: "moderate"
  },
  {
    question: "Can a single-row subquery return multiple columns if used with tuple comparison?",
    shortAnswer: "YES; for example, `WHERE (dept_id, branch_id) = (SELECT dept_id, branch_id FROM students WHERE student_id = 101)` (Row Subquery).",
    explanation: "Compares multiple columns simultaneously as a single tuple.",
    hint: "Yes, when using row tuple comparisons like (colA, colB) = (SELECT ...).",
    level: "expert"
  },
  {
    question: "What is the danger of writing `WHERE fee_paid = (SELECT amount FROM payments WHERE student_id = 101)` if payments has multiple installments?",
    shortAnswer: "If student 101 has made 2 or more fee installments, the query crashes at runtime with Error 1242.",
    explanation: "Must use `SUM(amount)` or `IN` to handle multiple installment rows.",
    hint: "Crashes with Error 1242 if student made multiple payments.",
    level: "basic"
  },
  {
    question: "How do you fix the installment query above to get total paid fee?",
    shortAnswer: "`WHERE fee_paid = (SELECT SUM(amount) FROM payments WHERE student_id = 101)`",
    explanation: "The aggregate function `SUM()` guarantees a single scalar output.",
    hint: "Use SUM(amount) to aggregate multiple payments into a single scalar value.",
    level: "basic"
  },
  {
    question: "What does `EXPLAIN` show for a non-correlated single-row subquery in WHERE?",
    shortAnswer: "`select_type = SUBQUERY`, indicating the inner query is evaluated once independently of the outer query.",
    explanation: "Visualizes the non-correlated execution step.",
    hint: "Shows select_type = SUBQUERY in EXPLAIN output.",
    level: "moderate"
  },
  {
    question: "Can a single-row subquery be used in the `SET` clause of an `UPDATE` statement?",
    shortAnswer: "YES; for example, `UPDATE students SET bonus_points = (SELECT MAX(points) FROM gamification) WHERE student_id = 101;`",
    explanation: "Assigns dynamic scalar values directly in DML updates.",
    hint: "Yes, can set column values dynamically in UPDATE statements.",
    level: "moderate"
  },
  {
    question: "How do you find all students who enrolled on the earliest enrollment date recorded in the system?",
    shortAnswer: "`SELECT student_name, enrolled_date FROM students WHERE enrolled_date = (SELECT MIN(enrolled_date) FROM students);`",
    explanation: "Uses MIN() in a single-row scalar subquery.",
    hint: "WHERE enrolled_date = (SELECT MIN(enrolled_date) FROM students)",
    level: "basic"
  },
  {
    question: "What is the difference between a scalar subquery and a scalar user-defined function (UDF)?",
    shortAnswer: "A scalar subquery is an inline SQL SELECT query; a scalar UDF is a stored, reusable procedural routine created with `CREATE FUNCTION`.",
    explanation: "Both produce scalar outputs, but UDFs are stored schema objects.",
    hint: "Subqueries are inline SQL; UDFs are stored compiled routines.",
    level: "moderate"
  },
  {
    question: "What is the key takeaway for Single-Row Subqueries with Comparison Operators?",
    shortAnswer: "Single-row subqueries evaluate to a single atomic value and work with scalar comparison operators (`=, >, <`). Always ensure scalar safety with aggregate functions or `LIMIT 1` to prevent Error 1242.",
    explanation: "Essential rule for writing robust, error-free scalar subqueries.",
    hint: "Returns 1x1 value + used with =, >, < + protect against Error 1242.",
    level: "expert"
  }
];

export default questions;
