// topic10_files/topic10_questions.js

const questions = [
  {
    question: "What is a NATURAL JOIN in SQL?",
    shortAnswer: "An implicit join syntax that automatically joins two tables based on ALL columns that share the exact same column name and data type in both tables.",
    explanation: "Standard definition of NATURAL JOIN.",
    hint: "Automatically joins tables on all shared column names.",
    level: "basic"
  },
  {
    question: "Does a NATURAL JOIN require an `ON` or `USING` clause?",
    shortAnswer: "NO. Specifying an `ON` or `USING` clause with `NATURAL JOIN` is a syntax error in SQL.",
    explanation: "Prohibition of ON/USING clauses with NATURAL JOIN.",
    hint: "No, it forbids ON and USING clauses.",
    level: "basic"
  },
  {
    question: "Why is `NATURAL JOIN` strictly banned or discouraged in production enterprise environments?",
    shortAnswer: "Because it creates fragile schema coupling: adding a new shared column (e.g. `created_at` or `status`) silently rewrites the join logic, causing queries to return 0 rows without throwing errors.",
    explanation: "Production fragility of NATURAL JOIN.",
    hint: "Adding audit columns silently breaks query results without syntax errors.",
    level: "basic"
  },
  {
    question: "Explain the 'Audit Column Catastrophe' associated with NATURAL JOIN.",
    shortAnswer: "When standard audit columns (like `created_at` or `updated_by`) are added to both tables, a NATURAL JOIN unexpectedly requires timestamps to match, returning 0 rows.",
    explanation: "The classic audit column failure scenario.",
    hint: "Adding created_at causes timestamp mismatches and 0 rows.",
    level: "basic"
  },
  {
    question: "What is the safe and recommended alternative to `NATURAL JOIN` when tables share identical key column names?",
    shortAnswer: "`USING (column_name)` (e.g. `FROM students JOIN courses USING (course_id)`).",
    explanation: "Safe alternative using the USING clause.",
    hint: "Use the USING (col_name) clause.",
    level: "basic"
  },
  {
    question: "What happens if two tables joined with `NATURAL JOIN` share NO common column names at all?",
    shortAnswer: "MySQL executes a full `CROSS JOIN` (Cartesian Product), multiplying all rows from both tables unconditionally.",
    explanation: "Zero shared columns in NATURAL JOIN becomes CROSS JOIN.",
    hint: "Degenerates into a CROSS JOIN (Cartesian Product).",
    level: "moderate"
  },
  {
    question: "How does `SELECT *` output format common columns in a NATURAL JOIN?",
    shortAnswer: "It coalesces the common columns, displaying each shared column only once at the beginning of the result set.",
    explanation: "Column coalescing in NATURAL JOIN.",
    hint: "Displays shared columns once at the leftmost position.",
    level: "basic"
  },
  {
    question: "Does MySQL support `NATURAL LEFT JOIN` and `NATURAL RIGHT JOIN`?",
    shortAnswer: "YES. MySQL supports both `NATURAL LEFT JOIN` and `NATURAL RIGHT JOIN`, though both share the same production risks as inner natural joins.",
    explanation: "Outer variations of NATURAL JOIN.",
    hint: "Yes, both NATURAL LEFT and NATURAL RIGHT joins exist.",
    level: "basic"
  },
  {
    question: "If Table A has columns `(id, name, dept_id)` and Table B has columns `(dept_id, name, location)`, what does `A NATURAL JOIN B` do?",
    shortAnswer: "It joins on BOTH `A.dept_id = B.dept_id` AND `A.name = B.name` (which is almost certainly a semantic bug).",
    explanation: "Accidental multi-column matching with generic names like 'name'.",
    hint: "Joins on BOTH dept_id AND name.",
    level: "basic"
  },
  {
    question: "Why does `A.name = B.name` in the previous question cause a semantic bug?",
    shortAnswer: "Because `A.name` represents an Employee Name (e.g. 'Mamata') while `B.name` represents a Department Name (e.g. 'Engineering'); they are completely unrelated semantics.",
    explanation: "Semantic mismatch bug in generic column names.",
    hint: "Employee name will be compared to department name.",
    level: "basic"
  },
  {
    question: "In code review standards, how should senior engineers handle a pull request containing `NATURAL JOIN`?",
    shortAnswer: "Reject the pull request and request replacing `NATURAL JOIN` with explicit `JOIN ... ON` or `JOIN ... USING ()`.",
    explanation: "Code review standards regarding NATURAL JOIN.",
    hint: "Request replacement with ON or USING syntax.",
    level: "basic"
  },
  {
    question: "What is the computational difference in MySQL between `A NATURAL JOIN B` and `A INNER JOIN B USING (shared_cols)`?",
    shortAnswer: "Zero computational difference in execution; the difference is purely in safety, maintainability, and resilience to schema changes.",
    explanation: "Execution equivalence vs safety disparity.",
    hint: "No execution difference, but massive difference in maintainability.",
    level: "basic"
  },
  {
    question: "Why is explicit `ON` syntax considered self-documenting compared to `NATURAL JOIN`?",
    shortAnswer: "Because a developer reading the query can immediately see which keys link the tables without having to look up the DDL schemas of both tables.",
    explanation: "Self-documenting SQL benefits.",
    hint: "Shows exact join keys directly in the SQL without checking schemas.",
    level: "basic"
  },
  {
    question: "Can `NATURAL JOIN` join 3 or more tables in a single query?",
    shortAnswer: "YES (e.g. `SELECT * FROM A NATURAL JOIN B NATURAL JOIN C;`), escalating schema coupling risks exponentially.",
    explanation: "Multi-table NATURAL JOIN chains.",
    hint: "Yes, but escalates schema breakage risks.",
    level: "moderate"
  },
  {
    question: "What happens if a column name in Table A is renamed during a schema refactoring when using `NATURAL JOIN`?",
    shortAnswer: "The column is no longer shared, so MySQL stops joining on it and either joins on remaining shared columns or defaults to a Cartesian Product.",
    explanation: "Column rename consequences in NATURAL JOIN.",
    hint: "Silently stops joining on that column, possibly causing a Cartesian product.",
    level: "moderate"
  },
  {
    question: "In academy management, what happens if `students` and `courses` both contain a `description` column under `NATURAL JOIN`?",
    shortAnswer: "MySQL requires `students.description = courses.description`, which will never match and return 0 rows.",
    explanation: "Unintended text column equality matching.",
    hint: "Student bio will be compared to course description.",
    level: "basic"
  },
  {
    question: "Why do automated database migration tools (e.g. Liquibase, Flyway) make `NATURAL JOIN` even more hazardous?",
    shortAnswer: "Because automated schema migrations frequently add standard metadata columns across tables, breaking natural joins in production without warning.",
    explanation: "CI/CD automated migrations vs NATURAL JOIN.",
    hint: "Automated migrations adding audit columns will silently break queries.",
    level: "moderate"
  },
  {
    question: "Does ANSI SQL define `NATURAL JOIN`?",
    shortAnswer: "YES. It was introduced in SQL-92 as a theoretical shorthand, but has been widely regarded as an architectural anti-pattern in practical database engineering.",
    explanation: "Historical standard origin vs industry reality.",
    hint: "Yes, SQL-92, but regarded as an anti-pattern.",
    level: "basic"
  },
  {
    question: "How does `NATURAL JOIN` impact automated unit testing in software CI/CD pipelines?",
    shortAnswer: "Tests may pass with minimal mock schemas but fail when deployed to staging environments with full audit columns.",
    explanation: "Discrepancies between mock test schemas and production schemas.",
    hint: "Mock schemas might work while production schemas with audit columns fail.",
    level: "moderate"
  },
  {
    question: "In healthcare, why would `patients NATURAL JOIN doctors` be disastrous if both tables have `gender` and `city` columns?",
    shortAnswer: "It would only match a patient to a doctor if they happen to have the exact same gender AND live in the exact same city.",
    explanation: "Unintended demographic matching in natural joins.",
    hint: "Forces patient and doctor to have identical gender and city.",
    level: "basic"
  },
  {
    question: "Can a `NATURAL JOIN` be combined with a `WHERE` clause?",
    shortAnswer: "YES. You can add `WHERE` conditions to filter the natural join result set.",
    explanation: "Filtering NATURAL JOIN with WHERE.",
    hint: "Yes, WHERE clauses are fully permitted.",
    level: "basic"
  },
  {
    question: "What is the primary psychological reason junior developers are tempted to use `NATURAL JOIN`?",
    shortAnswer: "It saves typing by avoiding explicit `ON` conditions in simple textbook homework assignments with pristine 2-column tables.",
    explanation: "Convenience in toy examples vs danger in enterprise.",
    hint: "Saves typing in simple academic toy examples.",
    level: "basic"
  },
  {
    question: "In banking, what happens if `accounts` and `transactions` both contain `status` columns ('ACTIVE', 'PENDING') under `NATURAL JOIN`?",
    shortAnswer: "A transaction with status 'PENDING' will fail to join to an 'ACTIVE' account, hiding pending transactions.",
    explanation: "Status column collision in natural joins.",
    hint: "Pending transactions will fail to match active accounts.",
    level: "basic"
  },
  {
    question: "Is there any performance benefit in MySQL for using `NATURAL JOIN` over `INNER JOIN ... ON`?",
    shortAnswer: "NO. The MySQL optimizer resolves both to identical internal relational operators with identical performance.",
    explanation: "Zero performance benefit of natural joins.",
    hint: "No performance benefit whatsoever.",
    level: "basic"
  },
  {
    question: "In e-commerce, how should `orders` and `order_items` be joined safely?",
    shortAnswer: "`SELECT * FROM orders JOIN order_items USING (order_id);` or `ON orders.order_id = order_items.order_id`.",
    explanation: "Safe e-commerce join syntax.",
    hint: "USING (order_id) or ON orders.order_id = order_items.order_id.",
    level: "basic"
  },
  {
    question: "What does `NATURAL CROSS JOIN` mean?",
    shortAnswer: "It is an invalid syntax in SQL; NATURAL and CROSS are mutually exclusive join types.",
    explanation: "Syntax contradiction.",
    hint: "Invalid syntax; they are mutually exclusive.",
    level: "basic"
  },
  {
    question: "How can SQL linters (e.g. SQLFluff) protect teams from `NATURAL JOIN`?",
    shortAnswer: "By configuring linter rules to flag and fail CI builds whenever `NATURAL JOIN` keywords are detected.",
    explanation: "Static analysis and linter enforcement.",
    hint: "Linter rules can automatically reject NATURAL JOIN in CI pipelines.",
    level: "moderate"
  },
  {
    question: "If two tables share columns `(user_id, is_active)`, what is the equivalent `USING` clause to `NATURAL JOIN`?",
    shortAnswer: "`USING (user_id, is_active)`.",
    explanation: "Explicit USING equivalent of natural join.",
    hint: "USING (user_id, is_active).",
    level: "basic"
  },
  {
    question: "Why does `NATURAL JOIN` violate the Principle of Explicit Design in software architecture?",
    shortAnswer: "Because it makes critical business logic implicit and dependent on external schema state rather than explicitly declared in source code.",
    explanation: "Software design principles and explicit architecture.",
    hint: "Hides business logic and couples queries to external schema states.",
    level: "moderate"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding `NATURAL JOIN`?",
    shortAnswer: "NATURAL JOIN is an architectural anti-pattern that couples query logic to schema naming conventions; always write explicit `ON` or `USING (col_name)` joins in production code.",
    explanation: "Final summary conclusion for Topic 10 in Module 5.",
    hint: "NATURAL JOIN is a production anti-pattern; always use explicit ON or USING clauses.",
    level: "basic"
  }
];

export default questions;
