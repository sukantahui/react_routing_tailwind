// topic9_files/topic9_questions.js

const questions = [
  {
    question: "What is the `USING` clause in SQL join operations?",
    shortAnswer: "An ANSI SQL shorthand syntax used to specify equi-join conditions when the join columns in both tables share the exact same column name.",
    explanation: "Standard definition of the USING clause.",
    hint: "Shorthand syntax when join column names are identical in both tables.",
    level: "basic"
  },
  {
    question: "What is the syntax for joining `students` and `enrollments` on `student_id` using the `USING` clause?",
    shortAnswer: "`SELECT * FROM students INNER JOIN enrollments USING (student_id);`",
    explanation: "Basic USING clause syntax.",
    hint: "USING (student_id).",
    level: "basic"
  },
  {
    question: "Must the column name in a `USING` clause be enclosed in parentheses?",
    shortAnswer: "YES. Standard ANSI SQL and MySQL require parentheses around the column list (e.g. `USING (col_name)`).",
    explanation: "Parentheses requirement in USING syntax.",
    hint: "Yes, parentheses are mandatory.",
    level: "basic"
  },
  {
    question: "How does `SELECT *` output differ between `ON s.student_id = e.student_id` and `USING (student_id)`?",
    shortAnswer: "`ON` outputs two separate `student_id` columns (one from each table), whereas `USING` automatically coalesces them into ONE single unified column.",
    explanation: "Column deduplication benefit of USING in SELECT *.",
    hint: "USING coalesces the join column into a single column.",
    level: "basic"
  },
  {
    question: "When using the `USING (student_id)` clause, do you qualify `student_id` in the `SELECT` list with a table alias (e.g. `s.student_id`)?",
    shortAnswer: "NO. You can write `SELECT student_id` directly without any table alias prefix because MySQL treats the coalesced column as unique.",
    explanation: "Column qualification rules with USING.",
    hint: "No alias is needed for the coalesced USING column.",
    level: "basic"
  },
  {
    question: "What error occurs if you try to use `USING (id)` on two tables where the column is named `id` in Table A but `student_id` in Table B?",
    shortAnswer: "ERROR 1054 (42S22): Unknown column 'id' in 'from clause' (because 'id' does not exist in Table B).",
    explanation: "Column name mismatch error with USING.",
    hint: "Error 1054: Unknown column in FROM clause.",
    level: "basic"
  },
  {
    question: "How do you specify multiple composite join columns using the `USING` clause?",
    shortAnswer: "By separating the column names with commas inside the parentheses: `USING (batch_id, semester_id)`.",
    explanation: "Composite keys in USING clause.",
    hint: "USING (col1, col2).",
    level: "basic"
  },
  {
    question: "Can the `USING` clause support Non-Equi comparison operators like `<`, `>`, or `BETWEEN`?",
    shortAnswer: "NO. The `USING` clause strictly performs exact equality (`=`) equi-joins.",
    explanation: "Equi-join limitation of USING.",
    hint: "No, USING only supports exact equality (=).",
    level: "basic"
  },
  {
    question: "Can the `USING` clause be used with `LEFT JOIN` and `RIGHT JOIN`?",
    shortAnswer: "YES. For example: `SELECT * FROM students s LEFT JOIN enrollments e USING (student_id);`.",
    explanation: "USING with outer joins.",
    hint: "Yes, fully compatible with outer joins.",
    level: "basic"
  },
  {
    question: "Can the `USING` clause evaluate expressions or functions (e.g. `UPPER(code)`)?",
    shortAnswer: "NO. `USING` only accepts literal column names; expressions must be written in the `ON` clause.",
    explanation: "No expressions allowed in USING.",
    hint: "No, expressions must use the ON clause.",
    level: "basic"
  },
  {
    question: "In e-commerce, write a 3-table join connecting `customers`, `orders`, and `order_items` using `USING` clauses.",
    shortAnswer: "`SELECT * FROM customers JOIN orders USING (customer_id) JOIN order_items USING (order_id);`",
    explanation: "Multi-table join using USING.",
    hint: "JOIN orders USING (customer_id) JOIN order_items USING (order_id).",
    level: "basic"
  },
  {
    question: "Why do some database architects prefer `ON` over `USING` in enterprise codebases?",
    shortAnswer: "Because `ON` is universal, works regardless of column naming differences, supports non-equi conditions, and makes explicit which table owns which column.",
    explanation: "Architectural preference for explicit ON clauses.",
    hint: "ON is universal and handles differing column names and complex conditions.",
    level: "moderate"
  },
  {
    question: "What happens if you join two tables with `USING (user_id)` and one table has `user_id` as `INT` and the other as `VARCHAR`?",
    shortAnswer: "MySQL attempts implicit type coercion on every row comparison, which degrades performance and disables index point lookups.",
    explanation: "Data type mismatch in USING joins.",
    hint: "Causes implicit type casting and slows performance.",
    level: "moderate"
  },
  {
    question: "In academy management, if `courses` and `schedules` both have `course_id` and `room_id`, what does `USING (course_id, room_id)` do?",
    shortAnswer: "It matches rows where both `courses.course_id = schedules.course_id` AND `courses.room_id = schedules.room_id`.",
    explanation: "Multi-column USING matching mechanics.",
    hint: "Matches both columns simultaneously with AND.",
    level: "basic"
  },
  {
    question: "In a `LEFT JOIN ... USING (id)`, what value is returned for the coalesced `id` column if the right table has no match?",
    shortAnswer: "The value from the left table is returned (it will NOT be NULL as long as the left row has a value).",
    explanation: "Coalescing behavior in outer joins with USING.",
    hint: "Returns the non-null ID from the left table.",
    level: "moderate"
  },
  {
    question: "Can you combine `ON` and `USING` in the same multi-table query across different join steps?",
    shortAnswer: "YES. For example: `FROM A JOIN B USING (id) JOIN C ON B.code = C.ref_code`.",
    explanation: "Mixing ON and USING in multi-table queries.",
    hint: "Yes, each join clause can independently use ON or USING.",
    level: "basic"
  },
  {
    question: "Why is `USING` considered safer than `NATURAL JOIN` in production codebases?",
    shortAnswer: "Because `USING` explicitly names the exact columns to join, whereas `NATURAL JOIN` automatically joins all matching column names blindly.",
    explanation: "USING vs NATURAL JOIN safety.",
    hint: "USING explicitly states column names, avoiding accidental column joins.",
    level: "basic"
  },
  {
    question: "In hospital management, how do you join `doctors` and `appointments` on `doctor_id` using `USING`?",
    shortAnswer: "`SELECT doctor_id, doc_name, appt_date FROM doctors JOIN appointments USING (doctor_id);`",
    explanation: "Healthcare USING example.",
    hint: "doctors JOIN appointments USING (doctor_id).",
    level: "basic"
  },
  {
    question: "Does the `USING` clause support table prefixes inside its parentheses (e.g. `USING (s.student_id)`)?",
    shortAnswer: "NO. Specifying a table prefix inside `USING ()` is a syntax error in SQL.",
    explanation: "No table prefixes inside USING parentheses.",
    hint: "No table prefixes allowed inside the parentheses.",
    level: "basic"
  },
  {
    question: "What position in the result set does MySQL place the coalesced `USING` column when executing `SELECT *`?",
    shortAnswer: "At the very beginning (leftmost column) of the result set.",
    explanation: "Column order in SELECT * with USING.",
    hint: "At the leftmost position of the output.",
    level: "moderate"
  },
  {
    question: "In payroll, how do you join `employees` and `salaries` on `emp_id` using `USING`?",
    shortAnswer: "`SELECT emp_id, emp_name, monthly_salary FROM employees JOIN salaries USING (emp_id);`",
    explanation: "Payroll USING query.",
    hint: "employees JOIN salaries USING (emp_id).",
    level: "basic"
  },
  {
    question: "If two tables share both `id` and `created_at` columns, but you only want to join on `id`, what happens if you write `USING (id)`?",
    shortAnswer: "It joins ONLY on `id`, keeping `created_at` as separate independent columns (unlike NATURAL JOIN which would join on both).",
    explanation: "Selective column joining with USING.",
    hint: "Joins only on id, leaving other shared columns untouched.",
    level: "basic"
  },
  {
    question: "What does standard ANSI SQL say about referencing `a.id` when joined with `USING (id)`?",
    shortAnswer: "Standard ANSI SQL disallows qualifying the join column with a table alias; MySQL allows it but recommends using the bare column name.",
    explanation: "ANSI standard rules for qualifying USING columns.",
    hint: "Standard ANSI SQL prefers the unqualified column name.",
    level: "expert"
  },
  {
    question: "How does `USING` improve JSON or REST API serialization from SQL queries?",
    shortAnswer: "By eliminating duplicate column keys in the result dictionary, preventing key collisions in JSON serializers.",
    explanation: "API JSON serialization benefits of USING.",
    hint: "Prevents duplicate key collisions in JSON output.",
    level: "moderate"
  },
  {
    question: "In university course scheduling, join `courses` and `rooms` on `building_id` using `USING`.",
    shortAnswer: "`SELECT * FROM courses JOIN rooms USING (building_id);`",
    explanation: "University schedule USING join.",
    hint: "courses JOIN rooms USING (building_id).",
    level: "basic"
  },
  {
    question: "Does using `USING` instead of `ON` provide any query execution speed advantage in MySQL?",
    shortAnswer: "NO. The MySQL query compiler generates the exact same execution plan and physical byte-code for both.",
    explanation: "Compiler equivalence of USING and ON.",
    hint: "No performance difference; identical execution plans.",
    level: "basic"
  },
  {
    question: "When refactoring a database schema, what is the primary prerequisite for adopting `USING` clauses?",
    shortAnswer: "A consistent naming convention where primary keys and foreign keys share identical column names across all tables (e.g. `customer_id`).",
    explanation: "Schema naming consistency requirement for USING.",
    hint: "Consistent primary and foreign key column naming.",
    level: "basic"
  },
  {
    question: "What happens if you write `USING ()` with empty parentheses?",
    shortAnswer: "MySQL throws a syntax error: 'ERROR 1064: You have an error in your SQL syntax near ')''.",
    explanation: "Empty USING clause syntax error.",
    hint: "Throws syntax error 1064.",
    level: "basic"
  },
  {
    question: "Can `USING` be used in a `CROSS JOIN`?",
    shortAnswer: "NO. A pure CROSS JOIN has no join predicate, and in MySQL adding `USING` converts it to an INNER JOIN.",
    explanation: "CROSS JOIN with USING behavior.",
    hint: "Converts the query to an INNER JOIN.",
    level: "moderate"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding the `USING` clause?",
    shortAnswer: "`USING (col)` provides clean, concise syntax and automatic column deduplication in `SELECT *` when tables share identical join column names; use `ON` when column names differ or complex non-equi predicates are required.",
    explanation: "Final summary conclusion for Topic 9 in Module 5.",
    hint: "Use USING for identical column names and clean deduplication; use ON for differing names or complex conditions.",
    level: "basic"
  }
];

export default questions;
